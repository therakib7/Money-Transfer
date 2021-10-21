<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash; 
use Carbon\Carbon;

use Modules\MT\Models\MtCashoutMBanking;
use Modules\MT\Models\MtService; 
use Modules\MT\Models\MtTaxonomy; 
use Modules\AC\Models\AcBalance;

//commission
use Modules\MT\Models\MtSetting; 
use Modules\MT\Models\MtCommissionUser;
use Modules\MT\Models\MtCommissionUserStatus; 

class CashoutMBankingController extends Controller {

    public function index( Request $request ) {   
        if ( Gate::denies('cashout-banking-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [   
            'page' => 'integer|nullable',         
            'provider_id' => 'integer|nullable',           
            'number' => 'numeric|nullable',           
            'amount_from' => 'numeric|nullable',           
            'amount_to' => 'numeric|nullable',
            'date_from' => 'date_format:d-m-Y h:i a|nullable',         
            'date_to' => 'date_format:d-m-Y h:i a|nullable',
            'order_by' => 'integer|nullable',           
        ]);  

        $co_mbs = new MtCashoutMBanking;  

        if ( !$request->order_by ) {
            $co_mbs = $co_mbs->orderBy('id', 'DESC');  
        }  

        $co_mbs = $co_mbs->with([ 
            'service_id' => function ($query) {  
                $query->select('id', 'provider_id');
            },
            'service_id.provider' => function ($query) {  
                $query->select('id', 'name');
            }
        ]);

        if ( auth_can(['cashout-banking-super']) ) {
            $co_mbs = $co_mbs->with('user:id,username,name,mobile,email'); 

            if ( $user_id = $request->user_id ) {  
                $co_mbs = $co_mbs->where('used_by', $user_id); 
            } 
        } else {
            $co_mbs = $co_mbs->where('used_by', Auth::id() ); 
            $co_mbs = $co_mbs->where('status', 1 );  
        }
        
        

        if ( $provider_id = $request->provider_id ) {
            $co_mbs = $co_mbs->where('provider_id', $provider_id); 

            if ( $type = $request->type ) {
                $co_mbs = $co_mbs->where('type', $type); 
            } 
        }  

        if ( $number = $request->number ) {
            $co_mbs = $co_mbs->where('number', $number); 
        }  
        
        if ( $amount_from = $request->amount_from ) {
            $co_mbs = $co_mbs->where('amount', '>=', $amount_from); 
        } 

        if ( $amount_to = $request->amount_to ) {
            $co_mbs = $co_mbs->where('amount', '<=', $amount_to); 
        }  

        if ( $date_from = $request->date_from ) { 
            $co_mbs = $co_mbs->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $co_mbs = $co_mbs->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }  

        $co_mbs = $co_mbs->paginate( $request->per_page ); 

        /* $category = MtTaxonomy::where('taxonomy', 'provider-category')->where('slug', 'mobile-banking')->first(['id']); 
        $providers = $category->providers; */

        $services = new MtService;  
        $services = $services->where('status', 1); 
        $services = $services->where('slug', 'cash-out'); 
        $services = $services->with('provider:id,name'); 
        $services = $services->orderBy('id', 'DESC'); 
        $services = $services->get(); 

        return compact('co_mbs', 'services');
    } 

    public function store(Request $request) {

        if ( Gate::denies('cashout-banking-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'service_id' => 'array|required',             
            'trx_id' => 'string|nullable|min:4',           
            'number' => 'numeric|nullable',           
            'amount' => 'nullable|numeric|min:10', 
        ]);  


        DB::transaction( function() use ( $request ) {  

            $services = new MtService;    
            $services = $services->where('id', $request->service_id['id']);  
            $services = $services->where('status', 1);  
            $services = $services->first(); 

            if ( empty( $services ) ) { 
                abort(403, 'Sorry! this service curently is not available');
            }

            if ( $request->number && $request->amount ) {
                if ( $services['min_amount'] > $request['amount'] || $services['max_amount'] < $request['amount'] ) { 
                    abort(403, "Amount must between {$services['min_amount']} to {$services['max_amount']} TK");
                }
            }

            $data_match = false; 
            $amount = 0; 
            if ( $request->trx_id ) {

                $co_banking = MtCashoutMBanking::where('service_id', $request->service_id['id']) 
                        ->where('status', null)
                        ->where('trxid', 'LIKE', '%'.$request->trx_id.'%')
                        ->get();

                if ( count( $co_banking ) > 1 ) {
                    abort(403, 'Please add some more letter in TrxID');
                }

                if ( count( $co_banking ) ) {
                    $co_banking = $co_banking[0]; // get first row

                    $data_match = true; 
                    $amount = $co_banking['amount'];
                }

            } elseif ( $request->number && $request->amount ) {
                $co_banking = MtCashoutMBanking::where('service_id', $request->service_id['id']) 
                        ->where('status', null)
                        ->where('created_at', '<=', Carbon::now()->subMinutes(10)->toDateTimeString() )
                        ->where('number', $request->number)
                        ->where('amount', $request->amount)
                        ->first();  

                if ( $co_banking ) {
                    $data_match = true; 
                    $amount = $co_banking['amount'];
                }
            } 

            if ( $data_match ) { 

                /* 
                 * Commission divider start 
                 * @ First check customer user id service is active
                 * @ Than check user custom service commision
                 * @ Than check user custom commision
                 * @ Than check main commission for all user
                 * @ Commission added in balance only for agent
                */ 
                
                $service_co_mb_com = 0;
                $service_co_mb_com_from_service = 0;
                $user_co_mb_com = 0; 
                $co_mb_com = 0;
                $user_com = 0;  
                
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
                            $co_mb_com = $value['value'];
                        }
                    }  
                /* Custom Personal Commission */
                } else {  
                    if ( $commissionusers['services'] ) {
                        foreach ($commissionusers['services'] as $key => $value) { 
                            if ( $value['service_id'] == $services['id'] && $value['type'] == 'mb' ) { 
                                $service_co_mb_com = $value['commission'];
                                $service_co_mb_com_from_service = $value['from_service']; // from_service main company main commission
                            }
                        } 
                    }       

                    if ( $commissionusers['commissions'] ) {
                        foreach ($commissionusers['commissions'] as $key => $value) {
                            if ( $value['type'] == 'mb' ) {
                                $user_co_mb_com = $value['commission'];
                            }
                        } 
                    }                  
                }    

                /* Comission calculate */
                $co_com = $co_banking['amount'] * $services['co_com'] / 100;
                
                $service_user_com = $co_banking['amount'] * $services['user_com'] / 100;
                if ( $service_co_mb_com ) {
                    if ( $service_co_mb_com_from_service ) { 
                        $user_com = $co_banking['amount'] * $service_co_mb_com_from_service / 100;
                    } else {
                        $user_com = $service_user_com * $service_co_mb_com / 100;                        
                    }
                } else if ( $user_co_mb_com ) {
                    $user_com = $service_user_com * $user_co_mb_com / 100;
                } else {
                    $user_com = $service_user_com * $co_mb_com / 100;
                } 

                /* Commission divider end */  

                if ( auth_role(['agent', 'merchant'], false) ) { // both match false 
                    $total_amount = $co_banking['amount'] + $user_com;
                } else {
                    $total_amount = $co_banking['amount'];
                    $user_com = null; // remove com not for agent and mer
                }

                MtCashoutMBanking::where('id', $co_banking['id'] )->update([
                    'status' => 1,
                    'co_com' => $co_com,
                    'user_com' => $user_com,
                    'used_by' => Auth::id()
                ]); 
                
                AcBalance::where('user_id', Auth::id())->increment('balance', $total_amount);

            } else {
                abort(403, 'Sorry! No data found by your info');
            }
        }); // end DB Transection 

    }  

    public function update(Request $request, $id) { 
    } 
    
    public function destroy( $id ) { 
    }
}
