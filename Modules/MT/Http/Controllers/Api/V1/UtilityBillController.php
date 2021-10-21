<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash; 
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon; 

// Modify Status
use Modules\MT\Models\MtReferralCommission; 
use Modules\MT\Models\MtReferralBalance; 

// Utility Bill Pay
use Modules\AC\Models\AcBalance;  
use Modules\CT\Models\CtContact;    
use Modules\CT\Models\CtContactService;    
use Modules\MT\Models\MtMt;
use Modules\MT\Models\MtService; 
use Modules\MT\Models\MtServiceFee; 
use Modules\MT\Models\MtProvider; 
use Modules\MT\Models\MtTaxonomy;  
use Modules\CT\Models\CtTaxonomy; 
use Modules\MT\Models\MtDue; 
use Modules\MT\Models\MtDuePayment;  
use Modules\MT\Models\MtSetting; 
use Modules\MT\Models\MtSettingUser;  

class UtilityBillController extends Controller { 

    public function index( Request $request ) {  

        if ( Gate::denies('utility-bill-view') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $this->validate($request, [ 
            'page' => 'integer|nullable',
            'status' => 'integer|nullable',   
            'provider_id' => 'integer|nullable',                   
            'service_id' => 'integer|nullable',                   
            'type' => 'string|nullable',               
            'number' => 'numeric|nullable',            
            'amount_from' => 'numeric|nullable',           
            'amount_to' => 'numeric|nullable',         
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',  
            'order_by' => 'integer|nullable',     
        ]);   

        $ubps = new MtMt; 

        $ubps = $ubps->with('provider_id:id,name,slug', 'service_id:id,name,slug'); 

        if ( !$request->order_by ) {
            $ubps = $ubps->orderBy('id', 'DESC');  
        } 

        $ubps = $ubps->where('type', 2);

        if ( auth_can(['utility-bill-super']) ) {
            $ubps = $ubps->with('user:id,username,name,mobile,email'); 

            if ( $user_id = $request->user_id ) {  
                $ubps = $ubps->where('user_id', $user_id); 
            } 
        } else {
            $ubps = $ubps->where('user_id', Auth::id()); 
        }

        if ( $date_from = $request->date_from ) {    
            $ubps = $ubps->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {    
            $ubps = $ubps->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }  
        
        if ( isset( $request->status ) ) {
            $ubps = $ubps->where('status', $request->status); 
        }
        
        if ( $amount_from = $request->amount_from ) {
            $ubps = $ubps->where('amount', '>=', $amount_from); 
        } 

        if ( $amount_to = $request->amount_to ) {
            $ubps = $ubps->where('amount', '<=', $amount_to); 
        } 

        if ( $number = $request->number ) {
            $ubps = $ubps->where('number', 'LIKE', '%' . $number . '%'); 
        }  

        if ( $provider_id = $request->provider_id ) {
            $ubps = $ubps->where('provider_id', $provider_id); 
        } 

        if ( $service_id = $request->service_id ) {
            $ubps = $ubps->where('service_id', $service_id); 
        }        

        $ubps = $ubps->simplePaginate( $request->per_page );  

        /* Get User Active Service */
        $user_active_ubp_providers = MtSettingUser::where('key', 'active_ubp_providers')->where('user_id', Auth::id())->first();  
        $active_provider_ids = ( $user_active_ubp_providers ) ? unserialize($user_active_ubp_providers->value) : null; 
        if ( $active_provider_ids ) { 
            $providers = MtProvider::with(['services:id,name,slug,min_amount,max_amount,provider_id', 'logo_small_src:id,resized_name', 'categories', 'services.service_fees'])->whereIn('id', $active_provider_ids)
                ->orderByRaw('FIELD(`id`, '.implode(',', $active_provider_ids).')') // work only mysql database 
                ->get();
        } else {
            /* Get Provider Only Utility Category */
            $category = MtTaxonomy::where('taxonomy', 'provider-category')->where('slug', 'utility')->first(['id']); 
            $providers = $category->provider_with_fees;
        }

        /* Hide sensisive data if not super admin */
        if ( auth_role(['personal', 'foreigner'], false) ) {
            $data = $ubps->makeHidden(['co_com', 'user_com']);
            $ubps->data = $data;
        } else if ( auth_role(['agent', 'merchant'], false) ) {
            $data = $ubps->makeHidden(['co_com']);
            $ubps->data = $data;
        } 

        return compact('ubps', 'providers');

    } 

    public function store(Request $request) {

        if ( Gate::denies('utility-bill-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }  

        $this->validate($request, [ 
            'ubp' => 'array|required',   
            'ubp.*.provider_id' => 'array|required',                   
            'ubp.*.service_id' => 'array|required',               
            'ubp.*.number' => 'numeric|nullable',  
            'ubp.*.ac_number' => 'numeric|required',  
            'ubp.*.ac_number_two' => 'required_without:ubp.*.due_date|numeric|nullable',  
            'ubp.*.due_date' => 'required_without:ubp.*.ac_number_two|numeric|nullable',         
            'ubp.*.name' => 'string|nullable',            
            'ubp.*.amount' => 'integer|required|min:1|max:500000',     
            'ubp.*.paid' => 'integer|nullable|min:1',     
            'ubp.*.due_note' => 'string|nullable',     
            'ubp.*.schedule_time' => 'date_format:Y-m-d H:i:s|nullable|after:'.date('Y-m-d H:i'),     
            'pin' => [
                'nullable',           
                'string',
                'min:4',          
            ],       
        ]); 

        $settinguser = MtSettingUser::where('user_id', Auth::id())->where('key', 'ubp_pin_status')->first();

        $need_pin = false;
        $need_pin = ( $settinguser && $settinguser['value'] == '1' ) ? true : false;
        if ( $need_pin ) {
            if ( !Hash::check( $request->pin, Auth::user()->pin ) ) {
                abort(403, 'Sorry! You entered wrong pin');
            } 
        }           

        $balance = AcBalance::select('balance')->where('user_id', Auth::id())->first(); 
        $ac_balance = $balance->balance;

        $ubp_amount = collect( $request->ubp );
        $ubp_amount = $ubp_amount->sum('amount'); 

        if ( $ac_balance < $ubp_amount ) {
            abort(403, 'Sorry! You do not have enough balance');
        }     

        DB::transaction( function() use ( $request, $ac_balance, $ubp_amount ) {              

            $ubps = [];
            $dues = [];
            $user_coms = 0;
            $user_fees = 0;

            foreach ($request->ubp as $ubp) { 

                /* Check active contact */
                $block_status = CtContactService::where('user_id', Auth::id()) 
                                    ->where('number', $ubp['ac_number'])
                                    ->first();
                                    
                if ( $block_status ) {
                    if ( CtContact::where('id', $block_status->contact_id )->where('status', 0)->first() ) {
                        abort(403, 'Sorry! Something Wrong, Error Code: 420');
                    }
                }                 
 
                $services = new MtService;   
                $services = $services->where('provider_id', $ubp['provider_id']['id']);  
                $services = $services->where('id', $ubp['service_id']['id']);  
                $services = $services->where('status', 1);  
                $services = $services->first(); 

                if ( empty( $services ) ) { 
                    abort(403, 'Sorry! this service curently is not available');
                }

                if ( $services['max_amount'] < $ubp['amount'] ) { 
                    abort(403, 'Sorry! Max amount is '.$services['max_amount']. ' for this operator');
                }
                 
                /* 
                 * Service fee start
                 * @ Check service fee exits by amount and check fees by percent or not
                 * @ Check global ubp commision 
                */ 
                $service_fee = MtServiceFee::where([
                                        [ 'service_id', $ubp['service_id']['id'] ],
                                        [ 'from', '<=', $ubp['amount'] ],
                                        [ 'to', '>=', $ubp['amount'] ]
                                    ])  
                                    ->select('co_fee','user_fee', 'percent')
                                    ->first();  

                $co_fee = 0;
                $user_fee = 0; 
                $user_com = 0; 
                
                if ( $service_fee ) {
                    if ( $service_fee->percent ) {
                        $com_fee = $ubp['amount'] * $service_fee->co_fee / 100;
                        $user_fee = $ubp['amount'] * $service_fee->user_fee / 100;

                        $co_fee = $com_fee;
                        $user_fee = $com_fee + $service_fee->user_fee;

                    } else {
                        $co_fee = $service_fee->co_fee;
                        $user_fee = $service_fee->co_fee + $service_fee->user_fee;
                    }
                } 

                /* Global Utility Commision */ 
                $ubp_com = new MtSetting;    
                $ubp_com = $ubp_com->select('value');
                $ubp_com = $ubp_com->where('key', 'ubp_com'); 
                $ubp_com = $ubp_com->first(); 

                $user_com = $user_fee * $ubp_com->value / 100;

                $user_coms += $user_com;
                $user_fees += $user_fee;

                /* Service fee end */

                /* Add Ubps */
                $schedule_time = ( $ubp['schedule_time'] ) ? Carbon::parse( $ubp['schedule_time'] )->format('Y-m-d H:i') : null;  
                $status = ( $schedule_time ) ? 5 : 0; //status 5 means it is in schedule  

                $ac_number = null; 

                if ( $ubp['due_date'] ) {
                    $ac_number = $ubp['ac_number'].'*'.$ubp['due_date'];
                } else {
                    $ac_number = $ubp['ac_number'].'*'.$ubp['ac_number_two'];
                } 

                $ubps[] = [
                    'type' => 2, 
                    'operator_code' => $services['operator_code'],
                    'number' => $ac_number, 
                    'amount' => $ubp['amount'],
                    'provider_id' => $ubp['provider_id']['id'],  
                    'service_id' => $services['id'],  
                    'co_com' => $co_fee, 
                    'user_com' => $user_com, 
                    'user_fee' => $user_fee, 
                    'status' => $status, 
                    'user_id' => Auth::id(), 
                    'schedule_time' => $schedule_time, 
                    'created_at' => date('Y-m-d H:i'),
                    'updated_at' => date('Y-m-d H:i')
                ];

                /* Add Contact */
                if ( $ubp['number'] ) {
                    $name = ( $ubp['name'] ) ? $ubp['name'] : null; 
                    $contact_id = null; 

                    $con_id = CtContactService::where('user_id', Auth::id())
                                        ->where('number', $ubp['ac_number'] )
                                        ->where('provider_id', $ubp['provider_id']['id'] )
                                        ->where('service_id', $ubp['service_id']['id'] )
                                        ->first();
                    
                    if ( $con_id ) { 
                       
                        if ( $name ) {
                            $contact = CtContact::find( $con_id['contact_id'] ); 
                            $contact->update([ 
                                'name' => $name,     
                            ]);
                        }

                        $contact_id = $con_id['contact_id'];

                    } else {
                        $contact = [
                            //'type' => null, 
                            'status' => 1, 
                            'user_id' => Auth::id(),    
                        ];

                        if ( $name ) {
                            $contact['name'] = $name;
                        }

                        /* check if semilar number already exist in contact under auth user */
                        $con_id = CtContactService::where('user_id', Auth::id()) 
                                            ->where('number', 'LIKE', '%' . $ubp['number'] . '%')
                                            ->first();
                        $cont_id = null;
                        if ( !$con_id ) {
                            $contact = CtContact::create( $contact ); 
                            $cont_id = $contact->id;
                            /* Create New Contact by this number */
                            $prefix = substr($ubp['number'], 0, 3);
                            $provider = new MtProvider;     
                            $provider = $provider->with('services:id,slug,provider_id');  
                            $provider = $provider->where('prefix', 'LIKE', '%' . $prefix . '%');  
                            $provider = $provider->first('id'); 

                            $service_index = array_search( 'prepaid', array_column( $provider['services']->toArray(), 'slug' ) ); 

                            CtContactService::create([
                                'type' => null, 
                                'contact_id' => $cont_id,
                                'number' => $ubp['number'], 
                                'provider_id' => $provider['id'],
                                'service_id' => $provider['services'][$service_index]['id'],
                                'user_id' => Auth::id(), 
                            ]); 
                        } else {
                            $cont_id = $con_id->contact_id;
                            if ( $name ) {
                                $contact = CtContact::find( $con_id['contact_id'] ); 
                                $contact->update([ 
                                    'name' => $name,     
                                ]);
                            }
                        }

                        CtContactService::create([
                            'type' => 2, 
                            'contact_id' => $cont_id,
                            'number' => $ubp['ac_number'], 
                            'provider_id' => $ubp['provider_id']['id'],
                            'service_id' => $ubp['service_id']['id'],
                            'user_id' => Auth::id(), 
                        ]);  
                        
                        if ( !$con_id ) {
                            $ct_cat = CtTaxonomy::where('taxonomy', 'contact-category')
                            ->where('slug', $ubp['provider_id']['categories'][0]['slug'])
                            ->first(['id']);
                            if ( $ct_cat ) {
                                $contact->categories()->attach( [$ct_cat['id']] );                                 
                            } 
                        } 
                        $contact_id = $cont_id; 
                    }                  

                    /* Add Due Amount */
                    if ( $ubp['paid'] >= 0 && $ubp['paid'] != null ) {
                        $due_amount = $ubp['amount'] - $ubp['paid'];  
                        $due = [
                            'type' => 2, 
                            'contact_id' => $contact_id, 
                            'amount' => $ubp['amount'], 
                            'paid' => $ubp['paid'], 
                            'due' => $due_amount,   
                            'user_id' => Auth::id(),  
                        ];

                        $due_id = null;
                        if ( $con_id ) {
                            $due_id = MtDue::where('user_id', Auth::id())
                                                ->where('contact_id', $contact_id )
                                                ->first();
                        } 

                        if ( $due_id ) {
                            $old_due = MtDue::select('amount', 'paid', 'due')->where('id', $due_id->id)->first(); 

                            $new_amount = $old_due->amount + $ubp['amount'];
                            $new_paid = $old_due->paid + $ubp['paid'];
                            $current_due = $ubp['amount'] - $ubp['paid'];
                            $new_due = $old_due->due + $current_due;

                            $due_id = MtDue::find( $due_id->id );  
                            $due_id->update([ 
                                'amount' => $new_amount,     
                                'paid' => $new_paid,     
                                'due' => $new_due,     
                            ]);
                        } else {
                            $due_id = MtDue::create($due); 
                        }                     

                        MtDuePayment::create([  
                            'due_id' => $due_id->id,  
                            'provider_id' => $ubp['provider_id']['id'],  
                            'service_id' => $services['id'],     
                            'amount' => $ubp['amount'] - $ubp['paid'],     
                            'type' => 0,
                            'note' => $ubp['due_note'],     
                            'date_time' => date('Y-m-d H:i:s'),    
                        ]);  
                    } // if ubp due     
                } // end if number  
                
            } // end for
            
            MtMt::insert($ubps);  

            if ( auth_role(['agent', 'merchant'], false) ) {
                $new_balance = $ac_balance - $ubp_amount - $user_fees + $user_coms;
            } else {
                $new_balance = $ac_balance - $ubp_amount - $user_fees;
            }
            ACBalance::where('user_id', Auth::id())->update(['balance' => $new_balance]);

        }); // end DB Transection

    }  

    public function update(Request $request, $id) {
        $this->validate($request, [ 
            'schedule_time' => 'date_format:Y-m-d H:i:s|required|after:'.date('Y-m-d H:i'),           
        ]);  
        
        $ubp = MtMt::find($id); 
        if ( Gate::denies('utility-bill-delete', $ubp) ) {
            abort(403, 'Sorry! You do not have permission');
        }
       
        $schedule_time = ( $request->schedule_time ) ? Carbon::parse( $request->schedule_time )->format('Y-m-d H:i') : null; 

        $ubp->update([ 
            'schedule_time' => $schedule_time,   
        ]); 
    } 
    
    public function destroy( Request $request, $id ) {  

        DB::transaction( function() use ( $request, $id ) {

            $old_ubp = MtMt::where('id', $id)->where('status', 5)->first();
            if ( Gate::denies('utility-bill-delete', $old_ubp) ) {
                abort(403, 'Sorry! You do not have permission');
            }

            if ( !$old_ubp ) {
                abort(403, 'Something Wrong');
            }

            $amount = $old_ubp['amount'];
            $user_com = $old_ubp['user_com'];

            $user_amount = $amount - $user_com;

            ACBalance::where('user_id', Auth::id())->increment('balance', $user_amount);

            $ubp = MtMt::find($id);   
            $ubp->update([ 
                'status' => 2,   
                'schedule_time' => null,   
                'user_com' => 0,   
            ]); 

        }); // end DB Transection   
    }

    public function modifystatus(Request $request) {
        /* Modify success or failed status */
        MtMt::modifystatus( $request, 2 ); 
    } 
}
