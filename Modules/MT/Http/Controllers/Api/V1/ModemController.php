<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

use Modules\MT\Models\MtMt; 
use Modules\MT\Models\MtReferralCommission; 
use Modules\AC\Models\AcBalance;  
use Modules\MT\Models\MtReferralBalance; 

use Modules\MT\Models\MtSimProvider; 

use App\Events\MtsUpdated;

// for powerload commission
use Modules\MT\Models\MtCommissionUserStatus;
use Modules\MT\Models\MtCommissionUser;
use Modules\MT\Models\MtSetting; 
use Modules\MT\Models\MtSettingUser;  

// cashout mobile banking
use Modules\MT\Models\MtCashoutMBanking;
use Modules\MT\Models\MtService; 

class ModemController extends Controller {

    public function index( Request $request ) { 

        $this->validate($request, [ 
            'email' => 'email|required',   
            'pass' => 'string|required',             
        ]); 

        $secret_key="not4all";  
        $pass = openssl_decrypt($request->pass, "AES-256-ECB", $secret_key);

        if ( Auth::attempt(['email' => $request->email, 'password' => $pass, 'status' => 1]) ) {
            if ( Gate::denies('modem-view') ) {
                abort(403, 'Sorry! You have entered wrong email or password');
            }  

            $mts = new MtMt;  
            $mts = $mts->whereIn('status', [0, 3]); 
            $mts = $mts->orWhere([
                ['status', 5],
                ['schedule_time', '<=', Carbon::now('Asia/Dhaka')], 
            ]); 
            $mts = $mts->get(['id', 'status', 'operator_code', 'number', 'amount', 'created_at']);  
            
            $collection = collect($mts);

            $grouped = $collection->groupBy('status')->toArray();

            if ( isset( $grouped[5] ) ) {
                if ( isset( $grouped[0] ) ) {
                    $grouped[0] = array_merge( $grouped[0], $grouped[5] );
                    unset( $grouped[5] );
                } else {
                    $grouped[0] = $grouped[5];
                    unset( $grouped[5] );
                } 
            } 

            if ( isset( $grouped[3] ) ) {
                $collection = collect($grouped[3]); 
                $grouped[3] = implode( ',', $collection->pluck('id')->toArray() ); 
            } 

            return $grouped;  

        } else {
            abort(403, 'Sorry! You have entered wrong email or password');
        } 

    } 

    public function update( Request $request ) {  
        /*
        Comment: For this method we updated VerifyCsrfToken.php
        with protected $except = [ 'api/v1/mt/mts_waiting',];
        */
        $this->validate($request, [ 
            'email' => 'email|required',   
            'pass' => 'string|required', 
            'type' => 'string|required', 
            'modem_id' => 'integer|required', 
            'mts.*.type' => 'string|nullable',                      
            'mts.*.status' => 'integer|nullable',                      
            'mts.*.ref_id' => 'integer|nullable',                      
            'mts.*.kode' => 'integer|nullable',                      
            //'mts.*.msg' => 'string|nullable',                      
        ]); 

        $secret_key="not4all"; 
        //$encrypted_string=openssl_encrypt($string_to_encrypt,"AES-256-ECB",$secret_key);

        $pass = openssl_decrypt($request->pass, "AES-256-ECB", $secret_key);

        if ( Auth::attempt( ['email' => $request->email, 'password' => $pass, 'status' => 1] ) ) {
            if ( Gate::denies('modem-edit') ) {
                abort(403, 'Sorry! You do not have permission');
            } 

            DB::transaction( function() use ( $request ) { 

                foreach ($request->mts as $main_key => $value) {
                    if ( $request->type == 'waiting' ) {
                        $mt = MtMt::find( $value['id'] );   
                        $mt->update([ 
                            'status' => 3,       
                            'modem_id' => $request->modem_id,       
                            'updated_at' => Carbon::now('Asia/Dhaka'),   
                        ]);

                        /* MtsUpdated event fired */ 
                        event( new MtsUpdated(['user_id' => $mt->user_id, 'id' => $mt->id, 'status' => $mt->status]) ); 

                    } else if ( $request->type == 'inbox' ) {
                        /* Check Cashout and Powerload Commission Together */
                        if ( $value['type'] == 'cash_out' ) { 
                            $service = MtService::where('operator_code', $value['operator_code'])->first(['id', 'operator_code']);  
                            $check_old_inbox = MtCashoutMBanking::select('id', 'trxid')->where('trxid', $value['trxid'])->first(['id', 'trxid']);  
                           
                            if ( !$check_old_inbox && $service ) {
                                MtCashoutMBanking::create([
                                    'service_id' => $service['id'], 
                                    'amount' => $value['amount'], 
                                    'number' => $value['number'], 
                                    'trxid' => $value['trxid'], 
                                    'msg' => $value['msg'], 
                                ]);
                            } 

                        } elseif ( $value['type'] == 'pw_com' ) {
                            //powerload com   

                            $mt = MtMt::select('id', 'status', 'type', 'co_com', 'user_com', 'co_fee', 'user_fee', 'user_id')->where('trxid', $value['trxid'])->first(); 
                            
                            $total_pl_com = 0;  
                            $powerload_user_com = 0;  

                            /*  
                             * @ Check mt id is personal user 
                             * @ If Success give commission to referral  
                             * @ Find Referal Balance where used amount less than amount and order by desc  
                             * @ Add data to comission history table
                             * @ Add balance to main account
                            */   

                            if ( $mt && $mt->status == 1 && $mt->user_fee == null ) {                            
                                /* Check Powerload Commission */
                                $pw_com = $value['pw_com'];
                                if ( $pw_com < 100 ) { 

                                    $total_pl_com = $pw_com;
                                    /* Powerload Commission */

                                    /* Check user percent and update $powerload_user_com */
                                    /* 
                                     * Commission divider start 
                                     * @ First check customer user id service is active
                                     * @ Than check user custom service commision
                                     * @ Than check user custom commision
                                     * @ Than check main commission for all user
                                     * @ Commission added in balance only for agent
                                    */  
                                   
                                    $service_pl_com = 0;
                                    $user_pl_com = 0;
                                    $pl_com = 0;     
                                    
                                    $com_user_status = MtCommissionUserStatus::where('user_id', $mt->user_id)->first();  
                                    if ( $com_user_status && $com_user_status['status'] ) {
                                        $commissionusers = new MtCommissionUser; 
                                        $commissionusers = $commissionusers->groupBy('user_id'); 
                                        $commissionusers = $commissionusers->where('user_id', $mt->user_id);  
                                        $commissionusers = $commissionusers->with('services', 'commissions'); 
                                        $commissionusers = $commissionusers->first(); // empty return [] null array 
                                    } else {
                                        $commissionusers = [];
                                    } 

                                    /* Global Powerload Commission */
                                    $settings = new MtSetting;     
                                    $settings = $settings->where('key', 'mr_pl_com'); 
                                    $settings = $settings->first('value'); 

                                    if ( $settings ) {
                                        $pl_com = $settings['value'];  
                                    } 
                                        
                                    /* Custom Personal Commission */
                                    if ( $commissionusers ) { 
                                        if ( $commissionusers['services'] ) {
                                            foreach ($commissionusers['services'] as $key => $com_user) {  

                                                if ( $com_user['service_id'] == $mt->service_id && $com_user['type'] == 'mr_pl' ) {
                                                    $service_pl_com = $com_user['commission']; 
                                                    break;
                                                } 
                                            } 
                                        }       

                                        if ( $commissionusers['commissions'] ) {
                                            foreach ($commissionusers['commissions'] as $key => $com_user) { 
                                                if ( $com_user['type'] == 'mr_pl' ) {
                                                    $user_pl_com = $com_user['commission'];
                                                    break;
                                                } 
                                            } 
                                        }                  
                                    }    

                                    if ( $service_pl_com ) {   
                                        $powerload_user_com = $total_pl_com * $service_pl_com / 100; 
                                    } else if ( $user_pl_com ) {
                                        $powerload_user_com = $total_pl_com * $user_pl_com / 100;
                                    } else {
                                        $powerload_user_com = $total_pl_com * $pl_com / 100;
                                    }  
                                }

                                if ( role_by_user_id( $mt->user_id, ['personal'] ) ) {  

                                    /* Only Agent will get referral commission */ 
                                    if ( role_by_user_id( $referral_balance['from_user_id'], ['agent'] ) ) {  

                                        if ( $mt->type == null && $powerload_user_com ) { // powerload commission only for mobile recharge
                                            $user_ref_com = $powerload_user_com;

                                            AcBalance::where('user_id', $referral_balance['from_user_id'])->increment('balance', $user_ref_com);

                                            /* Update Referral Commission */
                                            MtReferralCommission::create([
                                                'from_user_id' => $mt->user_id,   
                                                'to_user_id' => $referral_balance['from_user_id'],   
                                                'amount' => $user_ref_com,   
                                                'mt_id' => $mt->id,   
                                                'status' => 1,   
                                            ]);  
                                        } 
                                    }
                                }  

                                /* Add amount to sim balance */ 
                                //MtSimProvider::where('terminal_id', $value['terminal']['kode'])->where('provider_id', $mt->provider_id)->decrement('balance', $new_sim_balance);

                                $mt_insert = [];

                                if ( $powerload_user_com ) { // if has powerload commission
                                    $mt_insert['co_com'] = $mt->co_com + $total_pl_com;
                                    $mt_insert['user_com'] = $mt->user_com + $powerload_user_com;
                                    $mt_insert['user_fee'] = $powerload_user_com; // powerload user commission history
                                    $mt_insert['co_fee'] = $total_pl_com; // powerload company commission history

                                    if ( role_by_user_id( $mt->user_id, ['merchant', 'agent'], false ) ) { 
                                        
                                        AcBalance::where('user_id', $mt->user_id)->increment('balance', $powerload_user_com);
                                    }
                                }

                                $mt->update( $mt_insert );

                                /* MtsUpdated event fired */
                                event( new MtsUpdated(['user_id' => $mt->user_id, 'id' => $mt->id, 'status' => 99, 'power_com' => $powerload_user_com]) );  
                            } // if has id  
                             
                        } // end power load   commission                     
                    } else { 
                        $modem_status = (int) $value['status'];
                        if ( $modem_status == 20) {
                            $status = 1; //success
                        } elseif ( $modem_status == 40) {
                            $status = 4; //failed
                        } elseif ( $modem_status == 3) {
                            $status = 4; // processed failed
                        } else {
                            $status = 1; //other wise success
                        }

                        $mt = MtMt::select('id', 'type', 'status', 'provider_id', 'service_id', 'amount', 'user_com', 'co_com', 'user_fee', 'user_id')->find( $value['ref_id'] );   
                        /*  
                         * @ Check mt id is personal user 
                         * @ If Success give commission to referral  
                         * @ Find Referal Balance where used amount less than amount and order by desc  
                         * @ Add data to comission history table
                         * @ Add balance to main account
                        */   

                        if ( $mt->status != 1 && $status == 1 ) {     

                            if ( role_by_user_id( $mt->user_id, ['personal'] ) ) { 
                                
                                $referral_balance = new MtReferralBalance;  
                                $referral_balance = $referral_balance->where('to_user_id', $mt->user_id);
                                $referral_balance = $referral_balance->whereColumn('used_amount', '<', 'amount');
                                $referral_balance = $referral_balance->select( [ DB::raw("amount - used_amount  as remain_amount"), 'id', 'from_user_id' ] );
                                $referral_balance = $referral_balance->first();   

                                /* Only Agent will get referral commission */ 
                                if ( $referral_balance  && role_by_user_id( $referral_balance['from_user_id'], ['agent'] ) ) { 
                                    $mt_ref_com = new MtReferralCommission;  
                                    $mt_ref_com = $mt_ref_com->where('mt_id', $mt->id);
                                    $mt_ref_com = $mt_ref_com->first(); 

                                    /* 
                                     * Check MTs or Utility 
                                     * Type 2 is ubp and com field is user_com is user_fee. and it will amount for ubp
                                    */
                                    if ( $mt->type == 2) { //ubp
                                        $remain_amount = $mt->amount + $mt->user_com;  
                                    } else {
                                        $remain_amount = $mt->amount;  
                                    } 

                                    if ( $referral_balance && $referral_balance['remain_amount'] >= $remain_amount && !$mt_ref_com) { 
                                        /* Update Main Balance */ 

                                        /* 
                                         * Check MTs or Utility 
                                         * Type 2 is ubp and com field is user_fee
                                        */
                                        if ( $mt->type == 2 ) { //ubp
                                            $user_ref_com = $mt->user_com;
                                        } else {
                                            $user_ref_com = $mt->user_com;
                                        } 
                                        
                                        AcBalance::where('user_id', $referral_balance['from_user_id'])->increment('balance', $user_ref_com);

                                        /* Update Referral Commission */
                                        MtReferralCommission::create([
                                            'from_user_id' => $mt->user_id,   
                                            'to_user_id' => $referral_balance['from_user_id'],   
                                            'amount' => $user_ref_com,   
                                            'mt_id' => $mt->id,   
                                            'status' => 1,   
                                        ]); 

                                        /* Substruction Used Amount */
                                        /* 
                                         * Check MTs or Utility 
                                         * Type 2 is ubp and com field is user_com is user_fee. and it will be subtruct
                                        */
                                        if ( $mt->type == 2) { //ubp
                                            $used_amount = $mt->amount + $mt->user_com;  
                                        } else {
                                            $used_amount = $mt->amount;  
                                        } 
                                        
                                        MtReferralBalance::where('id', $referral_balance['id'])->increment('used_amount', $used_amount);
                                    } 
                                }
                            }  

                            /* Subtract amount from sim balance */
                            if ( $mt->user_fee ) {
                                $new_sim_balance = $mt->amount - $mt->user_fee; 
                            } else {
                                $new_sim_balance = $mt->amount; 
                            }

                            MtSimProvider::where('terminal_id', $value['terminal']['kode'])->where('provider_id', $mt->provider_id)->decrement('balance', $new_sim_balance);
                        }
                        
                        $msg = null;
                        $success_bal = null;
                        if ( $value['inbox'] ) {
                            $msg = $value['inbox']['pesan']; 
                            preg_match_all('/\bbalance is \D*\K\d+(?:\.\d+)?/i', $msg, $has_bal);
                            if ( !empty( $has_bal[0] ) ) {
                                $success_bal = (float) $has_bal[0][0];
                            }
                        } 

                        $mt_insert = [ 
                            'status' => $status,     
                            'modem_id' => $request->modem_id,    
                            'trxid' => $value['kode'],       
                            'balance' => $success_bal,       
                            'msg' => $msg,       
                            'updated_at' => Carbon::now('Asia/Dhaka'),   
                        ];

                        /*  
                         * @ Refund Faild Transection
                         * @ if previously refund than escape it  
                        */  
                        if ( $mt->status != 4 && $status == 4 ) { 

                            if ( $value['inbox'] == null ) {
                                abort(403, 'confused');
                                //Need to wait for administrator to check process failed transaction
                            } else {
                                if ( $value['inbox']['pesan'] == '') {
                                    abort(403, 'confused');
                                    //Need to wait for administrator to check process failed transaction
                                } 
                            }

                            $amount = $mt['amount']; 

                            if ( role_by_user_id( $mt->user_id, ['personal', 'foreigner'], false ) ) {  
                                if ( $mt->type == 2 ) { // 2 = ubp
                                    $user_amount = $amount + $mt->user_fee;
                                } else {
                                    $user_amount = $amount;
                                } 
                            } else {
                                if ( $mt->type == 2 ) { // 2 = ubp
                                    $user_amount = $amount + $mt->user_fee - $mt->user_com; 
                                } else {
                                    $user_amount = $amount - $mt->user_com; 
                                }                              
                            }

                            AcBalance::where('user_id', $mt['user_id'])->increment('balance', $user_amount);

                            /* Null field when failed */
                            // to modify failed to successs
                            //$mt_insert['co_com'] = null;
                            //$mt_insert['user_com'] = null; 

                            /* Update User Limit */
                            MtMt::update_trx_limit($user_amount, $mt['type'], 'minus', $mt['user_id']); 
                        } 

                        if ( $mt->status != 1 && $status == 1 ) {  
                            $mt_insert['terminal_id'] = $value['terminal']['kode']; //success from
                        }
                        
                        $mt->update( $mt_insert );

                        /* MtsUpdated event fired */
                        event( new MtsUpdated(['user_id' => $mt->user_id, 'id' => $mt->id, 'status' => $mt->status]) );  
                    } // end $request->type  
                } // end for each
            }); // end DB Transection
              
        } else {
            abort(403, 'Sorry! You do not have permission');
        }  
    }  
}
