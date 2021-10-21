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

// Mobile Recharge
use Modules\AC\Models\AcBalance;  
use Modules\CT\Models\CtContact;    
use Modules\CT\Models\CtContactService;      
use Modules\MT\Models\MtMt;
use Modules\MT\Models\MtService; 
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

class MobileRechargeController extends Controller { 

    public function index( Request $request ) {    
 
        if ( Gate::denies('mobile-recharge-view') ) {
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

        $mrs = new MtMt; 

        $mrs = $mrs->with('provider_id:id,name', 'service_id:id,name'); 

        if ( !$request->order_by ) { 
            $mrs = $mrs->orderBy('id', 'DESC');  
        } 

        $mrs = $mrs->where('type', null);

        if ( auth_can(['mobile-recharge-super']) ) {
            $mrs = $mrs->with('user:id,username,name,mobile,email'); 

            if ( $user_id = $request->user_id ) {  
                $mrs = $mrs->where('user_id', $user_id); 
            } 
        } else {
            $mrs = $mrs->where('user_id', Auth::id()); 
        }

        if ( $date_from = $request->date_from ) {    
            $mrs = $mrs->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {    
            $mrs = $mrs->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }  
        
        if ( isset( $request->status ) ) {
            $mrs = $mrs->where('status', $request->status); 
        }
        
        if ( $amount_from = $request->amount_from ) {
            $mrs = $mrs->where('amount', '>=', $amount_from); 
        } 

        if ( $amount_to = $request->amount_to ) {
            $mrs = $mrs->where('amount', '<=', $amount_to); 
        } 

        if ( $number = $request->number ) {
            $mrs = $mrs->where('number', $number); 
        }  

        if ( $provider_id = $request->provider_id ) {
            $mrs = $mrs->where('provider_id', $provider_id); 
        } 

        if ( $service_id = $request->service_id ) {
            $mrs = $mrs->where('service_id', $service_id); 
        }        

        $mrs = $mrs->simplePaginate( $request->per_page );  

        /* Get User Active Service */
        $user_active_mr_providers = MtSettingUser::where('key', 'active_mr_providers')->where('user_id', Auth::id())->first();  
        $active_provider_ids = ( $user_active_mr_providers ) ? unserialize($user_active_mr_providers->value) : null; 
        if ( $active_provider_ids ) {
            $providers = MtProvider::with(['services:id,name,slug,min_amount,max_amount,provider_id', 'logo_small_src:id,resized_name', 'categories'])->whereIn('id', $active_provider_ids)
                ->orderByRaw('FIELD(`id`, '.implode(',', $active_provider_ids).')') // work only mysql database 
                ->get();
        } else {
            /* Get Provider Only Flexiload Mobile Banking Category */
            $category = MtTaxonomy::where('taxonomy', 'provider-category')->where('slug', 'mobile-recharge')->first(['id']); 
            $providers = $category->provider_with_cats;
        }

        /* Hide sensisive data if not super admin */
        if ( auth_role(['personal', 'foreigner'], false) ) {
            $data = $mrs->makeHidden(['co_com', 'user_com', 'user_fee']);
            $mrs->data = $data;
        } else if ( auth_role(['agent', 'merchant'], false) ) {
            $data = $mrs->makeHidden(['co_com']);
            $mrs->data = $data;
        } 

        return compact('mrs', 'providers');

    } 

    public function store(Request $request) {

        if ( Gate::denies('mobile-recharge-create') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $this->validate($request, [ 
            'mr' => 'array|required',   
            'mr.*.provider_id' => 'array|required',                   
            'mr.*.service_id' => 'integer|required',               
            'mr.*.number' => 'numeric|required',            
            'mr.*.name' => 'string|nullable',            
            'mr.*.amount' => 'integer|required|min:1|max:500000',     
            'mr.*.paid' => 'integer|nullable|min:1',     
            'mr.*.due_note' => 'string|nullable',           
            'mr.*.schedule_time' => 'date_format:Y-m-d H:i:s|nullable|after:'.date('Y-m-d H:i'),     
            'pin' => [
                'nullable',           
                'string',
                'min:4',              
            ],       
        ]);

        $settinguser = MtSettingUser::where('user_id', Auth::id())->where('key', 'mr_pin_status')->first();

        $need_pin = false;
        $need_pin = ( $settinguser && $settinguser['value'] == '1' ) ? true : false;
        if ( $need_pin ) {
            if ( !Hash::check( $request->pin, Auth::user()->pin ) ) {
                abort(403, 'Sorry! You entered wrong pin');
            } 
        }           

        $balance = AcBalance::select('balance')->where('user_id', Auth::id())->first(); 
        $ac_balance = $balance->balance;

        $mr_amount = collect( $request->mr );
        $mr_amount = $mr_amount->sum('amount'); 

        if ( $ac_balance < $mr_amount ) {
            abort(403, 'Sorry! You do not have enough balance');
        }          

        DB::transaction( function() use ( $request, $ac_balance, $mr_amount ) {  

            /* Check User Limit */
            MtMt::check_trx_limit($mr_amount); 
             
            $user_commission = 0; 
            foreach ($request->mr as $mr_key => $mr) { 

                /* Check active contact */
                $block_status = CtContactService::where('user_id', Auth::id()) 
                                    ->where('number', $mr['number'])
                                    ->first();
                                    
                if ( $block_status ) {
                    if ( CtContact::where('id', $block_status->contact_id )->where('status', 0)->first() ) {
                        abort(403, 'Sorry! Something Wrong, Error Code: 420');
                    }
                }                 
 
                $services = new MtService;   
                $services = $services->where('provider_id', $mr['provider_id']['id']);  
                $services = $services->where('id', $mr['service_id']);  
                $services = $services->where('status', 1);  
                $services = $services->first(); 

                if ( empty( $services ) ) { 
                    abort(403, 'Sorry! this service curently is not available');
                }

                if ( $services['max_amount'] < $mr['amount'] ) { 
                    abort(403, 'Sorry! Max amount is '.$services['max_amount']. ' for this operator');
                }

                /* 
                 * Commission divider start 
                 * @ First check customer user id service is active
                 * @ Than check user custom service commision
                 * @ Than check user custom commision
                 * @ Than check main commission for all user
                 * @ Commission added in balance only for agent
                */ 
               
                $service_mr_com = 0;
                $service_mr_com_from_service = 0;
                $service_pl_com = 0;
                $service_pl_com_from_service = 0;
                $user_mr_com = 0;
                $user_pl_com = 0;
                $mr_com = 0;
                $pl_com = 0;   
                $user_com = 0;        
                $p_user_com = 0;
 
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

                    $settting_keys = ['mr_com', 'mr_pl_com'];  
                    $settings = new MtSetting;    
                    $settings = $settings->select('key', 'value');

                    $settings = $settings->where( function ($query) use($settting_keys) {
                        foreach($settting_keys as $key) {
                            $query->orWhere('key', $key);
                        }
                    });   

                    $settings = $settings->get(); 

                    foreach ($settings as $value) {
                        if ( $value['key'] == 'mr_com' ) {
                            $mr_com = $value['value'];
                        }

                        if ( $value['key'] == 'mr_pl_com' ) {
                            $pl_com = $value['value'];
                        }
                    }  
                /* Custom Personal Commission */
                } else {  
                    if ( $commissionusers['services'] ) {
                        foreach ($commissionusers['services'] as $key => $value) { 
                            if ( $value['service_id'] == $services['id'] && $value['type'] == 'mr' ) { 
                                $service_mr_com = $value['commission'];
                                $service_mr_com_from_service = $value['from_service']; // from_service main company main commission
                            }

                            if ( $value['service_id'] == $services['id'] && $value['type'] == 'mr_pl' ) {
                                $service_pl_com = $value['commission'];
                                $service_pl_com_from_service = $value['from_service'];
                            } 
                        } 
                    }       

                    if ( $commissionusers['commissions'] ) {
                        foreach ($commissionusers['commissions'] as $key => $value) {
                            if ( $value['type'] == 'mr' ) {
                                $user_mr_com = $value['commission'];
                            }

                            if ( $value['type'] == 'mr_pl' ) {
                                $user_pl_com = $value['commission'];
                            } 
                        } 
                    }                  
                }   

                /* Comission calculate */
                $co_com = $mr['amount'] * $services['co_com'] / 100;
               
                $service_user_com = $mr['amount'] * $services['user_com'] / 100;
                if ( $service_mr_com ) {
                    if ( $service_mr_com_from_service ) { 
                        $user_com = $mr['amount'] * $service_mr_com_from_service / 100;
                    } else {
                        $user_com = $service_user_com * $service_mr_com / 100;                        
                    }
                } else if ( $user_mr_com ) {
                    $user_com = $service_user_com * $user_mr_com / 100;
                } else {
                    $user_com = $service_user_com * $mr_com / 100;
                } 
              
                /* Commission divider end */  
                
                /* Add MTs */
                $schedule_time = ( $mr['schedule_time'] ) ? Carbon::parse( $mr['schedule_time'] )->format('Y-m-d H:i') : null;  
                $status = ( $schedule_time ) ? 5 : 0; //status 5 means it is in schedule 

                $user_commission += $user_com; //this is for update user balance 

                $mr_create = [
                    'operator_code' => $services['operator_code'],
                    'number' => $mr['number'], 
                    'amount' => $mr['amount'],
                    'provider_id' => $mr['provider_id']['id'],  
                    'service_id' => $services['id'],  
                    'co_com' => $co_com, 
                    'user_com' => $user_com,  
                    'status' => $status, 
                    'user_id' => Auth::id(), 
                    'schedule_time' => $schedule_time, 
                    'created_at' => date('Y-m-d H:i'),
                    'updated_at' => date('Y-m-d H:i')
                ];               

                $mr_data = MtMt::create($mr_create);   

                /* Add Contact */
                $name = ( $mr['name'] ) ? $mr['name'] : null; 
                $contact_id = null; 

                $con_id = CtContactService::where('user_id', Auth::id())
                                    ->where('number', $mr['number'] )
                                    ->where('provider_id', $mr['provider_id']['id'] )
                                    ->where('service_id', $mr['service_id'] )
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

                    /* check if semilar number already exist in contact under auth user */
                    $con_id = CtContactService::where('user_id', Auth::id()) 
                                        ->where('number', 'LIKE', '%' . $mr['number'] . '%')
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
                        'contact_id' => $cont_id,
                        'number' => $mr['number'],
                        'provider_id' => $mr['provider_id'],
                        'provider_id' => $mr['provider_id']['id'],
                        'service_id' => $mr['service_id'],
                        'user_id' => Auth::id(), 
                    ]);  
                    
                    if ( !$con_id ) {
                        /**
                         * Provider Category and Contact Category are different
                         * But both table has maching slug
                         */
                        if ( isset( $mr['provider_id']['categories']) ) {
                            $cat_slug_id = array_search( 'mobile-recharge', array_column( $mr['provider_id']['categories'], 'slug' ) );
                            if ( $cat_slug_id !== false ) {
                                $ct_cat = CtTaxonomy::where('taxonomy', 'contact-category')
                                ->where('slug', $mr['provider_id']['categories'][$cat_slug_id]['slug'])
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
                if ( $mr['paid'] >= 0 && $mr['paid'] != null ) {
                    $due_amount = $mr['amount'] - $mr['paid'];  
                    $due = [
                        'contact_id' => $contact_id, 
                        'amount' => $mr['amount'], 
                        'paid' => $mr['paid'], 
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

                        $new_amount = $old_due->amount + $mr['amount'];
                        $new_paid = $old_due->paid + $mr['paid'];
                        $current_due = $mr['amount'] - $mr['paid'];
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
                        'provider_id' => $mr['provider_id']['id'],  
                        'service_id' => $services['id'],     
                        'amount' => $mr['amount'] - $mr['paid'],     
                        'type' => 0,
                        'note' => $mr['due_note'],     
                        'date_time' => date('Y-m-d H:i:s'),    
                    ]);  
                } // if mr due        
                
            } // end for 

            if ( auth_role(['agent', 'merchant'], false) ) {
                $new_balance = $ac_balance - $mr_amount + $user_commission;
            } else {
                $new_balance = $ac_balance - $mr_amount;
            }
            ACBalance::where('user_id', Auth::id())->update(['balance' => $new_balance]);

            /* Update User Limit */
            MtMt::update_trx_limit($mr_amount); 

        }); // end DB Transection

    }  

    public function update(Request $request, $id) {
        $this->validate($request, [ 
            'schedule_time' => 'date_format:Y-m-d H:i:s|required|after:'.date('Y-m-d H:i'),           
        ]);  
        
        $mr = MtMt::find($id); 
        if ( Gate::denies('mobile-recharge-edit', $mr) ) {
            abort(403, 'Sorry! You do not have permission');
        }
       
        $schedule_time = ( $request->schedule_time ) ? Carbon::parse( $request->schedule_time )->format('Y-m-d H:i') : null; 

        $mr->update([ 
            'schedule_time' => $schedule_time,   
        ]); 
    } 
    
    public function destroy( Request $request, $id ) {  

        DB::transaction( function() use ( $request, $id ) {

            $old_mr = MtMt::where('id', $id)->where('status', 5)->first();
            if ( Gate::denies('mobile-recharge-delete', $old_mr) ) {
                abort(403, 'Sorry! You do not have permission');
            }

            if ( !$old_mr ) {
                abort(403, 'Something Wrong');
            }

            $amount = $old_mr['amount'];
            $user_com = $old_mr['user_com'];

            $user_amount = $amount - $user_com;

            ACBalance::where('user_id', Auth::id())->increment('balance', $user_amount);

            $mr = MtMt::find($id);   
            $mr->update([ 
                'status' => 2,   
                'schedule_time' => null,   
                'user_com' => 0,   
            ]); 

        }); // end DB Transection   
    }
 
    public function modifystatus(Request $request) {
        /* Modify success or failed status */
        MtMt::modifystatus( $request ); 
    } 
}
