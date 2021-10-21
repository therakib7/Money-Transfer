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

// Mobile Banking
use Modules\AC\Models\AcBalance;  
use Modules\CT\Models\CtContact;    
use Modules\CT\Models\CtContactService;  
use Modules\CT\Models\CtContactIdentity;    
use Modules\MT\Models\MtMt;
use Modules\MT\Models\MtService; 
use Modules\MT\Models\MtServiceFee; 
use Modules\MT\Models\MtProvider; 
use Modules\MT\Models\MtTaxonomy;  
use Modules\CT\Models\CtTaxonomy; 
use Modules\MT\Models\MtDue; 
use Modules\MT\Models\MtDuePayment; 
use Modules\MT\Models\MtCommissionUser;
use Modules\MT\Models\MtCommissionUserStatus; 
use Modules\MT\Models\MtSetting; 
use Modules\MT\Models\MtSettingUser; 
use Modules\MT\Models\MtMobileBankingSecurity;  

class MobileBankingController extends Controller { 

    public function index( Request $request ) {    

        if ( Gate::denies('mobile-banking-view') ) {
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

        $mbs = new MtMt; 

        $mbs = $mbs->with('provider_id:id,name', 'service_id:id,name'); 

        if ( !$request->order_by ) {
            $mbs = $mbs->orderBy('id', 'DESC');  
        } 

        $mbs = $mbs->where('type', 1);

        if ( auth_can(['mobile-banking-super']) ) {
            $mbs = $mbs->with('user:id,username,name,mobile,email'); 

            if ( $user_id = $request->user_id ) {  
                $mbs = $mbs->where('user_id', $user_id); 
            } 
        } else {
            $mbs = $mbs->where('user_id', Auth::id()); 
        }

        if ( $date_from = $request->date_from ) {    
            $mbs = $mbs->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {    
            $mbs = $mbs->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }  
        
        if ( isset( $request->status ) ) {
            $mbs = $mbs->where('status', $request->status); 
        }
        
        if ( $amount_from = $request->amount_from ) {
            $mbs = $mbs->where('amount', '>=', $amount_from); 
        } 

        if ( $amount_to = $request->amount_to ) {
            $mbs = $mbs->where('amount', '<=', $amount_to); 
        } 

        if ( $number = $request->number ) {
            $mbs = $mbs->where('number', $number); 
        }  

        if ( $provider_id = $request->provider_id ) {
            $mbs = $mbs->where('provider_id', $provider_id); 
        } 

        if ( $service_id = $request->service_id ) {
            $mbs = $mbs->where('service_id', $service_id); 
        }        

        $mbs = $mbs->simplePaginate( $request->per_page );  

        /* Get User Active Service */
        $user_active_mb_providers = MtSettingUser::where('key', 'active_mb_providers')->where('user_id', Auth::id())->first();  
        $active_provider_ids = ( $user_active_mb_providers ) ? unserialize($user_active_mb_providers->value) : null; 
        if ( $active_provider_ids ) {
            $providers = MtProvider::with([ 
                'services' => function ($query) {
                    $query->select(['id', 'name', 'slug', 'min_amount', 'max_amount', 'provider_id']);  
                    $query->where('slug', 'cash-in');  
                }, 
                'logo_small_src:id,resized_name', 
                'categories', 
                'services.service_fees'
                ])->whereIn('id', $active_provider_ids)
                ->orderByRaw('FIELD(`id`, '.implode(',', $active_provider_ids).')') // work only mysql database 
                ->get();
        } else {
            /* Get Provider Only Flexiload Mobile Banking Category */
            $category = MtTaxonomy::where('taxonomy', 'provider-category')->where('slug', 'mobile-banking')->first(['id']); 
            $providers = $category->provider_with_fees_not_co; //not cashout
        }

        /* Hide sensisive data if not super admin */
        if ( auth_role(['personal', 'foreigner'], false) ) {
            $data = $mbs->makeHidden(['co_com', 'user_com', 'user_fee']);
            $mbs->data = $data;
        } else if ( auth_role(['agent', 'merchant'], false) ) {
            $data = $mbs->makeHidden(['co_com', 'co_fee']);
            $mbs->data = $data;
        } 

        return compact('mbs', 'providers');

    } 

    public function store(Request $request) {

        if ( Gate::denies('mobile-banking-create') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $this->validate($request, [ 
            'mb' => 'array|required',   
            'mb.*.provider_id' => 'array|required',                   
            'mb.*.service_id' => 'integer|required',               
            'mb.*.number' => 'numeric|required',            
            'mb.*.name' => 'string|nullable',            
            'mb.*.amount' => 'integer|required|min:1|max:500000',     
            'mb.*.paid' => 'integer|nullable|min:1',     
            'mb.*.due_note' => 'string|nullable',    
            'mb.*.sender_number' => 'numeric|nullable',       
            'mb.*.schedule_time' => 'date_format:Y-m-d H:i:s|nullable|after:'.date('Y-m-d H:i'),     
            'pin' => [
                'nullable',           
                'string',
                'min:4',         
            ],       
        ]);

        $settinguser = MtSettingUser::where('user_id', Auth::id())->where('key', 'mb_pin_status')->first();

        $need_pin = false;
        $need_pin = ( $settinguser && $settinguser['value'] == '1' ) ? true : false;
        if ( $need_pin ) {
            if ( !Hash::check( $request->pin, Auth::user()->pin ) ) {
                abort(403, 'Sorry! You entered wrong pin');
            } 
        }           

        $balance = AcBalance::select('balance')->where('user_id', Auth::id())->first(); 
        $ac_balance = $balance->balance;

        $mb_amount = collect( $request->mb );
        $mb_amount = $mb_amount->sum('amount'); 

        $co_fee = 0;
        $user_fee = 0;   
        $co_fee_lists = [];
        $user_fee_lists = [];

        foreach ($request->mb as $mb_key => $mb) { 
            /* 
             * Service fee start
             * @ Check service fee exits by amount and check fees by percent or not
             * @ Check global mb commision 
            */ 
            $service_fee = MtServiceFee::where([
                                    [ 'service_id', $mb['service_id'] ],
                                    [ 'from', '<=', $mb['amount'] ],
                                    [ 'to', '>=', $mb['amount'] ]
                                ])  
                                ->select('co_fee','user_fee', 'percent')
                                ->first();  
            
            if ( $service_fee ) {
                if ( $service_fee->percent ) {
                    $co_fee = $mb['amount'] * $service_fee->co_fee / 100;
                    $user_fee = $mb['amount'] * $service_fee->user_fee / 100;

                    $user_fee = $co_fee + $service_fee->user_fee;

                } else {
                    $co_fee = $service_fee->co_fee;
                    $user_fee = $service_fee->co_fee + $service_fee->user_fee;
                }

                $co_fee_lists[] = $co_fee;
                $user_fee_lists[] = $user_fee;
            }
        }

        $mb_amount = $mb_amount + $user_fee;

        if ( $ac_balance < $mb_amount ) {
            abort(403, 'Sorry! You do not have enough balance');
        }         

        DB::transaction( function() use ( $request, $ac_balance, $mb_amount, $co_fee_lists, $user_fee_lists ) {  
             
            $user_commission = 0;

            foreach ($request->mb as $mb_key => $mb) { 

                /* Check active contact */
                $block_status = CtContactService::where('user_id', Auth::id()) 
                                    ->where('number', $mb['number'])
                                    ->first();
                                    
                if ( $block_status ) {
                    if ( CtContact::where('id', $block_status->contact_id )->where('status', 0)->first() ) {
                        abort(403, 'Sorry! Something Wrong, Error Code: 420');
                    }
                }                 
 
                $services = new MtService;   
                $services = $services->where('provider_id', $mb['provider_id']['id']);  
                $services = $services->where('id', $mb['service_id']);  
                $services = $services->where('status', 1);  
                $services = $services->first(); 

                if ( empty( $services ) ) { 
                    abort(403, 'Sorry! this service curently is not available');
                }

                if ( $services['min_amount'] > $mb['amount'] || $services['max_amount'] < $mb['amount'] ) { 
                    abort(403, "Amount must between {$services['min_amount']} to {$services['max_amount']} TK");
                }

                /* 
                 * Commission divider start 
                 * @ First check customer user id service is active
                 * @ Than check user custom service commision
                 * @ Than check user custom commision
                 * @ Than check main commission for all user
                 * @ Commission added in balance only for agent
                */ 
               
                $service_mb_com = 0;
                $service_mb_com_from_service = 0;
                $user_mb_com = 0;
                $mb_com = 0;
                $user_com = 0;        
                $p_com = 0;
 
                $com_user_status = MtCommissionUserStatus::where('user_id', Auth::id())->first();  
                if ( $com_user_status && $com_user_status['status'] ) {
                    $commissionusers = new MtCommissionUser; 
                    $commissionusers = $commissionusers->groupBy('user_id'); 
                    $commissionusers = $commissionusers->where('user_id', Auth::id());  
                    $commissionusers = $commissionusers->with('services', 'commissions', 'status'); 
                    $commissionusers = $commissionusers->first(); // empty return [] null array 
                } else {
                    $commissionusers = [];
                } 

                /* Global Commission */
                if ( empty( $commissionusers ) ) {               

                    $settting_keys = ['mb_com'];  
                    $settings = new MtSetting;    
                    $settings = $settings->select('key', 'value');

                    $settings = $settings->where( function ($query) use($settting_keys) {
                        foreach($settting_keys as $key) {
                            $query->orWhere('key', $key);
                        }
                    });   

                    $settings = $settings->get(); 

                    foreach ($settings as $value) {
                        if ( $value['key'] == 'mb_com' ) {
                            $mb_com = $value['value'];
                        }
                    }  
                /* Custom Personal Commission */
                } else {  
                    if ( $commissionusers['services'] ) {
                        foreach ($commissionusers['services'] as $key => $value) { 
                            if ( $value['service_id'] == $services['id'] && $value['type'] == 'mb' ) { 
                                $service_mb_com = $value['commission'];
                                $service_mb_com_from_service = $value['from_service']; // from_service main company main commission
                            }
                        } 
                    }       

                    if ( $commissionusers['commissions'] ) {
                        foreach ($commissionusers['commissions'] as $key => $value) {
                            if ( $value['type'] == 'mb' ) {
                                $user_mb_com = $value['commission'];
                            }
                        } 
                    }                  
                }    

                /* Comission calculate */
                $co_com = $mb['amount'] * $services['co_com'] / 100;
               
                $service_user_com = $mb['amount'] * $services['user_com'] / 100;
                if ( $service_mb_com ) {
                    if ( $service_mb_com_from_service ) { 
                        $user_com = $mb['amount'] * $service_mb_com_from_service / 100;
                    } else {
                        $user_com = $service_user_com * $service_mb_com / 100;                        
                    }
                } else if ( $user_mb_com ) {
                    $user_com = $service_user_com * $user_mb_com / 100;
                } else {
                    $user_com = $service_user_com * $mb_com / 100;
                } 

                /* Commission divider end */  
                
                /* Add MTs */
                $schedule_time = ( $mb['schedule_time'] ) ? Carbon::parse( $mb['schedule_time'] )->format('Y-m-d H:i') : null;  
                $status = ( $schedule_time ) ? 5 : 0; //status 5 means it is in schedule 

                $user_commission += $user_com; //this is for update user balance 

                $mb_create = [
                    'type' => 1, // type 1 is mobile banking null is mobile recharge
                    'operator_code' => $services['operator_code'],
                    'number' => $mb['number'], 
                    'amount' => $mb['amount'],
                    'provider_id' => $mb['provider_id']['id'],  
                    'service_id' => $services['id'],  
                    'co_com' => $co_com, 
                    'user_com' => $user_com, 
                    'status' => $status, 
                    'user_id' => Auth::id(), 
                    'schedule_time' => $schedule_time, 
                    'created_at' => date('Y-m-d H:i'),
                    'updated_at' => date('Y-m-d H:i')
                ];           

                if ( isset( $user_fee_lists[$mb_key] ) ) {
                    $mb_create['co_fee'] = $co_fee_lists[$mb_key]; // co fees 
                    $mb_create['user_fee'] = $user_fee_lists[$mb_key]; // user fees 
                }    

                $mb_data = MtMt::create($mb_create);  

                /* Add Security ID for mobile banking sender */ 
                if ( $mb['sender_number'] ) {            

                    $sender_con_id = CtContactService::where('user_id', Auth::id())
                                        ->where('number', $mb['sender_number'] ) 
                                        ->first(['contact_id']);

                    $sender_id = CtContactIdentity::where('contact_id', $sender_con_id['contact_id'] ) 
                                        ->orderBy('id_type')
                                        ->first(['id_number', 'id_type']);

                    if ( $sender_id ) {
                        MtMobileBankingSecurity::insert([
                            'mt_id' => $mb_data->id, 
                            'id_number' => $sender_id['id_number'], 
                            'id_type' => $sender_id['id_type'], 
                        ]);
                    } else { 
                        abort(403, 'Sorry! Sender No ' . $mb_key . ' does not have any identities' );
                    }                 
                } 

                /* Add Contact */
                $name = ( $mb['name'] ) ? $mb['name'] : null; 
                $contact_id = null; 

                $con_id = CtContactService::where('user_id', Auth::id())
                                    ->where('number', $mb['number'] )
                                    ->where('provider_id', $mb['provider_id']['id'] )
                                    ->where('service_id', $mb['service_id'] )
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
                        'status' => 1, 
                        'user_id' => Auth::id(),    
                    ];

                    if ( $name ) {
                        $contact['name'] = $name;
                    }

                    /* Rocket 'LIKE', '%' . $mb['number'] . '%' Search Not working that's why i check 12 manually */
                    $num =  $mb['number']; 
                    if ( strlen((string) $num) == 12 ) {
                        $num = substr($num, 0, 11); 
                    } else {
                        $num = $mb['number']; 
                    }

                    /* check if semilar number already exist in contact under auth user */
                    $con_id = CtContactService::where('user_id', Auth::id()) 
                                        ->where('number', 'LIKE', '%' . $num . '%')
                                        ->first();
                    $cont_id = null;
                    if ( !$con_id ) {
                        $contact = CtContact::create( $contact ); 
                        $cont_id = $contact->id;
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
                        'type' => 1, 
                        'contact_id' => $cont_id,
                        'number' => $mb['number'],
                        'provider_id' => $mb['provider_id'],
                        'provider_id' => $mb['provider_id']['id'],
                        'service_id' => $mb['service_id'],
                        'user_id' => Auth::id(), 
                    ]);  
                    
                    if ( !$con_id ) {
                        if ( isset( $mr['provider_id']['categories']) ) {
                            $cat_slug_id = array_search( 'mobile-banking', array_column( $mb['provider_id']['categories'], 'slug' ) );
                            if ( $cat_slug_id !== false ) {
                                $ct_cat = CtTaxonomy::where('taxonomy', 'contact-category')
                                ->where('slug', $mb['provider_id']['categories'][$cat_slug_id]['slug'])
                                ->first(['id']);
                                if ( $ct_cat ) {
                                    $contact->categories()->attach( [$ct_cat['id']] );                                 
                                } 
                            }
                        }
                    } 
                    $contact_id = $cont_id; 
                }  

                /* Add Due Amount */
                if ( $mb['paid'] >= 0 && $mb['paid'] != null ) {
                    $due_amount = $mb['amount'] - $mb['paid'];  
                    $due = [ 
                        'contact_id' => $contact_id, 
                        'amount' => $mb['amount'], 
                        'paid' => $mb['paid'], 
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

                        $new_amount = $old_due->amount + $mb['amount'];
                        $new_paid = $old_due->paid + $mb['paid'];
                        $current_due = $mb['amount'] - $mb['paid'];
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
                        'provider_id' => $mb['provider_id']['id'],  
                        'service_id' => $services['id'],     
                        'amount' => $mb['amount'] - $mb['paid'],     
                        'type' => 0,
                        'note' => $mb['due_note'],     
                        'date_time' => date('Y-m-d H:i:s'),    
                    ]);  
                } // if mb due        
                
            } // end for 

            if ( auth_role(['agent', 'merchant'], false) ) { // both match false 
                $new_balance = $ac_balance - $mb_amount + $user_commission;
            } else {
                $new_balance = $ac_balance - $mb_amount;
            }
            ACBalance::where('user_id', Auth::id())->update(['balance' => $new_balance]);

        }); // end DB Transection

    }  

    public function update(Request $request, $id) {
        $this->validate($request, [ 
            'schedule_time' => 'date_format:Y-m-d H:i:s|required|after:'.date('Y-m-d H:i'),           
        ]);  
        
        $mb = MtMt::find($id); 
        if ( Gate::denies('mobile-banking-edit', $mb) ) {
            abort(403, 'Sorry! You do not have permission');
        }
       
        $schedule_time = ( $request->schedule_time ) ? Carbon::parse( $request->schedule_time )->format('Y-m-d H:i') : null; 

        $mb->update([ 
            'schedule_time' => $schedule_time,   
        ]); 
    } 
    
    public function destroy( Request $request, $id ) {  

        DB::transaction( function() use ( $request, $id ) {

            $old_mb = MtMt::where('id', $id)->where('status', 5)->first();
            if ( Gate::denies('mobile-banking-delete', $old_mb) ) {
                abort(403, 'Sorry! You do not have permission');
            }

            if ( !$old_mb ) {
                abort(403, 'Something Wrong');
            }

            $amount = $old_mb['amount'];
            $user_com = $old_mb['user_com'];

            $user_amount = $amount - $user_com;

            ACBalance::where('user_id', Auth::id())->increment('balance', $user_amount);

            $mb = MtMt::find($id);   
            $mb->update([ 
                'status' => 2,   
                'schedule_time' => null,   
                'user_com' => 0,   
            ]); 

        }); // end DB Transection   
    }

    public function modifystatus(Request $request) {
        /* Modify success or failed status */
        MtMt::modifystatus( $request, 1 ); 
    } 
}
