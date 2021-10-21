<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\DB;
use Carbon\Carbon; 

// Modify Status
use Modules\MT\Models\MtReferralCommission; 
use Modules\MT\Models\MtReferralBalance; 
use Modules\AC\Models\AcBalance; 
// Limit User
use Modules\MT\Models\MtSetting;
use App\Models\UserHasRole;
use Modules\MT\Models\MtRoleLimit;
use Modules\MT\Models\MtUserLimit;
use Modules\MT\Models\MtUserDayLimit;
use Modules\MT\Models\MtUserMonthLimit; 

class MtMt extends Model {

    protected $fillable = ['type', 'terminal_id', 'modem_id', 'status', 'provider_id', 'service_id', 'operator_code', 'number', 'amount', 'balance', 'co_com', 'user_com', 'co_fee', 'user_fee', 'trxid', 'msg', 'user_id', 'schedule_time']; 

    public function provider_id() {
    	return $this->belongsTo('Modules\MT\Models\MtProvider', 'provider_id');
    }

    public function service_id() {
    	return $this->belongsTo('Modules\MT\Models\MtService', 'service_id');
    }

    public function user() {
    	return $this->belongsTo('App\Models\User', 'user_id');
    } 

    public function getMsgAttribute($value) {
        if ( $this->type == 1 ) { 
            if ( auth_role(['super-admin']) ) {
                return $value;
            } else {
                return preg_replace('/\bBalance Tk\D\d+(?:,[0-9]+)*/', 'Balance Tk xxxxx', $value );
            }            
        } else {
            return $value;
        }
    }

    public static function check_trx_limit($recharge_amount, $for = null) {
        /**
          * First check company enable trx for all
          * Check User Limit 
          * check user limit
          * if not than check role limit
          * check day and month limit
          */ 

        $check_trx_disable = MtSetting::where('key', 'trx_disable')->first(); 
        if ( $check_trx_disable['value'] ) {
            $trx_disable_msg = MtSetting::where('key', 'trx_disable_msg')->first();
            abort(403, $trx_disable_msg['value']); 
        } 

        $trx_limit = MtUserLimit::where(['status' => 1, 'user_id' => Auth::id(), 'for' => $for ])->first(); 
        if ( !$trx_limit ) {
            $user_role_id = UserHasRole::where('user_id', Auth::id())->first('role_id');   
            $trx_limit = MtRoleLimit::where(['role_id' => $user_role_id['role_id'], 'for' => $for ])->first(); 
        } 

        if ( $trx_limit  ) {
            $day_amount_exceded = false;
            $day_number_exceded = false;
            $month_amount_exceded = false;
            $month_number_exceded = false;

            $day_limit = MtUserDayLimit::where(['user_id' => Auth::id(), 'for' => $for, 'date' => Carbon::today() ])->first();
            if ( $day_limit ) {
                $unused_amount = $trx_limit['max_amount_day'] - $day_limit['used_amount'];
                if ( $recharge_amount > $unused_amount ) {
                    $day_amount_exceded = true;
                } else if ( $trx_limit['max_number_day'] == $day_limit['used_number'] ) {
                    $day_number_exceded = true;
                }
            } else {
                if ( $recharge_amount > $trx_limit['max_amount_day'] ) {
                    $day_amount_exceded = true;
                }
            } 

            if ( $day_amount_exceded ) {
                abort(403, 'Sorry! Your day transection amount limit has exceded'); 
            } else if ( $day_number_exceded ) {
                abort(403, 'Sorry! Your day transection number limit has exceded');
            } 
 
            $month_limit = MtUserMonthLimit::where(['user_id' => Auth::id(), 'for' => $for ])->whereMonth('date', Carbon::today()->month)->whereYear('date', Carbon::today()->year)->first();
            if ( $month_limit ) {
                $unused_amount = $trx_limit['max_amount_month'] - $month_limit['used_amount'];
                if ( $recharge_amount > $unused_amount ) {
                    $month_amount_exceded = true;
                } else if ( $trx_limit['max_number_month'] == $month_limit['used_number'] ) {
                    $month_number_exceded = true;
                }
            } else {
                if ( $recharge_amount > $trx_limit['max_amount_month'] ) {
                    $month_amount_exceded = true;
                }
            } 

            if ( $month_amount_exceded ) {
                abort(403, 'Sorry! Your month transection amount limit has exceded'); 
            } else if ( $month_number_exceded ) {
                abort(403, 'Sorry! Your month transection number limit has exceded');
            } 
        }           
    }

    public static function update_trx_limit($recharge_amount, $for = null, $type = 'plus', $user_id = null ) { //
        $user_id = ( $user_id ) ? $user_id : Auth::id(); // this peramter for modify mts status

        $check_day_limit = MtUserDayLimit::where(['user_id' => $user_id, 'for' => $for, 'date' => Carbon::today() ])->first();
        if ( $check_day_limit ) { 
            if ( $type == 'plus') {
                $check_day_limit->update([
                       'used_amount' => DB::raw("used_amount + $recharge_amount"),
                       'used_number' => DB::raw('used_number + 1'),
                   ]);
            } else {
                $check_day_limit->update([
                       'used_amount' => DB::raw("used_amount - $recharge_amount"),
                       'used_number' => DB::raw('used_number - 1'),
                   ]);
            }
        } else {
            if ( $type == 'plus') {
                MtUserDayLimit::create([  
                    'user_id' => $user_id,   
                    'used_amount' => $recharge_amount,   
                    'used_number' => 1,   
                    'for' => $for,
                    'date' => Carbon::today()    
                ]);
            } 
        }

        $check_month_limit = MtUserMonthLimit::where(['user_id' => $user_id, 'for' => $for ])->whereMonth('date', Carbon::today()->month)->whereYear('date', Carbon::today()->year)->first();
        if ( $check_month_limit ) { 
            if ( $type == 'plus') {
                $check_month_limit->update([
                       'used_amount' => DB::raw("used_amount + $recharge_amount"),
                       'used_number' => DB::raw('used_number + 1'),
                   ]);
            } else {
                $check_month_limit->update([
                       'used_amount' => DB::raw("used_amount - $recharge_amount"),
                       'used_number' => DB::raw('used_number - 1'),
                   ]);
            }
        } else {
            if ( $type == 'plus') {
                MtUserMonthLimit::create([  
                    'user_id' => $user_id,   
                    'used_amount' => $recharge_amount,   
                    'used_number' => 1,   
                    'for' => $for,
                    'date' => Carbon::today()    
                ]); 
            }
        }
    }

    public static function modifystatus($request, $for = null ) { 
        $per_name = null;
        if ( $for == null ) {
            $per_name = 'mobile-recharge-super';
        } else if ( $for == 1 ) {
            $per_name = 'mobile-banking-super';
        } else if ( $for == 2 ) {
            $per_name = 'utility-bill-super';
        }

        if ( !auth_can([$per_name]) ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        /*$this->validate($request, [ 
            'status' => 'integer|required',           
            'ids' => 'array|required',           
        ]);*/  

        if ( $request->status == 1 ) {
            /* 
             * Request to success 
             * @ First check request id already failed or waiting
             * @ Than check persoanal or agent
             * @ If Personal need to give commission to referral
             * @ If agent sustruct money and give commission
            */
            DB::transaction( function() use ( $request ) {  
                foreach ($request->ids as $id) { 
                    $mt = self::find($id);  

                    if ( $mt->status == 4 ) { // check already failded

                        if ( role_by_user_id( $mt->user_id, ['personal'] ) ) { 
                            
                            $referral_balance = new MtReferralBalance;  
                            $referral_balance = $referral_balance->where('to_user_id', $mt->user_id);
                            $referral_balance = $referral_balance->whereColumn('used_amount', '<', 'amount');
                            $referral_balance = $referral_balance->select( [ DB::raw("amount - used_amount  as remain_amount"), 'id', 'from_user_id' ] );
                            $referral_balance = $referral_balance->first();  

                            $mt_ref_com = new MtReferralCommission;  
                            $mt_ref_com = $mt_ref_com->where('mt_id', $mt->id);
                            $mt_ref_com = $mt_ref_com->first(); 
                            if ( $referral_balance && $referral_balance['remain_amount'] >= $mt->amount && !$mt_ref_com) { 
                                /* Update Main Balance */
                                if ( role_by_user_id( $referral_balance['from_user_id'], ['agent'] ) ) { 
                                    ACBalance::where('user_id', $referral_balance['from_user_id'])->increment('balance', $mt->user_com);

                                    /* Update Referral Commission */
                                    MtReferralCommission::create([
                                        'from_user_id' => $mt->user_id,   
                                        'to_user_id' => $referral_balance['from_user_id'],   
                                        'amount' => $mt->user_com,   
                                        'mt_id' => $mt->id,   
                                        'status' => 1,   
                                    ]); 

                                    /* Substruction Used Amount */
                                    if ( $mt->type == 2 ) { // 2 = ubp
                                        $used_amount = $mt->amount + $mt->user_fee; 
                                    } else {
                                        $used_amount = $mt->amount;   
                                    }   
                                    MtReferralBalance::where('id', $referral_balance['id'])->increment('used_amount', $used_amount);
                                }
                            }

                            /* Substruction Main Balance */ 
                            
                            if ( $mt->type == 2 ) { // 2 = ubp
                                $amount = $mt->amount + $mt->user_fee; 
                            } else {
                                $amount = $mt->amount;   
                            } 

                        } else if ( role_by_user_id( $mt->user_id, ['foreigner'] ) ) {   
                            if ( $mt->type == 2 ) { // 2 = ubp
                                $amount = $mt->amount + $mt->user_fee; 
                            } else {
                                $amount = $mt->amount;  
                            } 
                        } else { // else agent 
                            if ( $mt->type == 2 ) { // 2 = ubp
                                $amount = $mt->amount + $mt->user_fee - $mt->user_com;  
                            } else {
                                $amount = $mt->amount - $mt->user_com; 
                            } 
                        }   
                        ACBalance::where('user_id', $mt->user_id)->decrement('balance', $amount);

                        self::where('id', $mt->id)->update(['status' => 1]);    

                        /* Update User Limit */ 
                        self::update_trx_limit($mt->amount, $mt->type, 'plus', $mt->user_id); 

                    } else if ( $mt->status == 3 ) { // check already waiting

                        if ( role_by_user_id( $mt->user_id, ['personal'] ) ) { 
                            
                            $referral_balance = new MtReferralBalance;  
                            $referral_balance = $referral_balance->where('to_user_id', $mt->user_id);
                            $referral_balance = $referral_balance->whereColumn('used_amount', '<', 'amount');
                            $referral_balance = $referral_balance->select( [ DB::raw("amount - used_amount  as remain_amount"), 'id', 'from_user_id' ] );
                            $referral_balance = $referral_balance->first();  

                            $mt_ref_com = new MtReferralCommission;  
                            $mt_ref_com = $mt_ref_com->where('mt_id', $mt->id);
                            $mt_ref_com = $mt_ref_com->first(); 
                            if ( $referral_balance && $referral_balance['remain_amount'] >= $mt->amount && !$mt_ref_com) { 
                                /* Update Main Balance */
                                if ( role_by_user_id( $referral_balance['from_user_id'], ['agent'] ) ) { 
                                    ACBalance::where('user_id', $referral_balance['from_user_id'])->increment('balance', $mt->user_com);

                                    /* Update Referral Commission */
                                    MtReferralCommission::create([
                                        'from_user_id' => $mt->user_id,   
                                        'to_user_id' => $referral_balance['from_user_id'],   
                                        'amount' => $mt->user_com,   
                                        'mt_id' => $mt->id,   
                                        'status' => 1,   
                                    ]); 

                                    /* Substruction Used Amount */
                                    if ( $mt->type == 2 ) { // 2 = ubp
                                        $used_amount = $mt->amount + $mt->user_fee; 
                                    } else {
                                        $used_amount = $mt->amount;   
                                    }   
                                    MtReferralBalance::where('id', $referral_balance['id'])->increment('used_amount', $used_amount);
                                }
                            }

                        } 

                        self::where('id', $mt->id)->update(['status' => 1]);    

                    }
                } // end for  
            }); // end DB Transection*/
        } else if ( $request->status == 0 ) { 
            /* 
             * Request to failed 
             * @ First check request id already success
             * @ Than check persoanal or agent
             * @ If Personal need to money back from referral and reduce used_amount
             * @ If agent refund balance without commision 
            */
            DB::transaction( function() use ( $request ) {  
                foreach ($request->ids as $id) { 
                    $mt = self::find($id);  

                    if ( $mt->status == 1 || $mt->status == 3 || $mt->status == 0 ) { //if success, waiting for pending
                        $amount = $mt['amount'];  

                        if ( role_by_user_id( $mt->user_id, ['personal'] ) ) {  
                            if ( $mt->type == 2 ) { // 2 = ubp
                                $user_amount = $amount + $mt->user_fee;
                            } else {
                                $user_amount = $amount;
                            }
                            /* Find Referral and get refund */
                            $referral_commission = MtReferralCommission::select('amount', 'to_user_id')->where('mt_id', $mt['id'])->first(); 
                            if ( $referral_commission ) {
                                MtReferralCommission::where('mt_id', $mt['id'])->update( [ 'status' => 0 ]);   
                                ACBalance::where('user_id', $referral_commission['to_user_id'])->decrement('balance', $referral_commission['amount']);

                                /* Remove Used Amount */
                                $referral_balance = new MtReferralBalance;  
                                $referral_balance = $referral_balance->where('to_user_id', $mt['user_id']);
                                $referral_balance = $referral_balance->where('used_amount', '>=', $amount);
                                $referral_balance = $referral_balance->select( [ DB::raw("amount - used_amount  as remain_amount"), 'id', 'from_user_id','used_amount' ] );
                                $referral_balance = $referral_balance->first(); 

                                /* Substruction Used Amount */
                                if ( $mt->type == 2 ) { // 2 = ubp
                                    $used_amount = $mt->amount + $mt->user_fee; 
                                } else {
                                    $used_amount = $mt->amount;   
                                }   
                                MtReferralBalance::where('id', $referral_balance['id'])->decrement('used_amount', $used_amount);
                            }

                        } else if ( role_by_user_id( $mt->user_id, ['foreigner'] ) ) {   
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

                        ACBalance::where('user_id', $mt['user_id'])->increment('balance', $user_amount);

                        /* Null field when failed */
                        $mt_insert = [];
                        $mt_insert['status'] = 4; // 4 = failed
                        // to modify failed to successs
                        //$mt_insert['co_com'] = null;
                        //$mt_insert['user_com'] = null;
                        //$mt_insert['user_fee'] = null;

                        $mt->update( $mt_insert );

                        /* Update User Limit */  
                        self::update_trx_limit($mt->amount, $mt->type, 'minus', $mt->user_id); 
                    }  
                    
                } // end for  
            }); // end DB Transection
        } else if ( $request->status == 2 ) { 
            /* 
             * Request to canncelled 
             * @ First check request id already success
             * @ Than check persoanal or agent
             * @ If Personal need to money back from referral and reduce used_amount
             * @ If agent refund balance without commision 
            */
            DB::transaction( function() use ( $request ) {  
                foreach ($request->ids as $id) { 
                    $mt = self::find($id);  

                    if ( $mt->status == 3 || $mt->status == 0 ) { //if waiting for pending
                        $amount = $mt['amount'];  

                        if ( role_by_user_id( $mt->user_id, ['personal'] ) ) { 
                            if ( $mt->type == 2 ) { // 2 = ubp
                                $user_amount = $amount + $mt->user_fee;
                            } else {
                                $user_amount = $amount;
                            }  
                        } else if ( role_by_user_id( $mt->user_id, ['foreigner'] ) ) {   
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

                        ACBalance::where('user_id', $mt['user_id'])->increment('balance', $user_amount);

                        /* Null field when failed */
                        $mt_insert = [];
                        $mt_insert['status'] = 2; // 2 = canncelled
                        // to modify failed to successs
                        //$mt_insert['co_com'] = null;
                        //$mt_insert['user_com'] = null;
                        //$mt_insert['user_fee'] = null;

                        $mt->update( $mt_insert );

                        /* Update User Limit */
                        self::update_trx_limit($mt->amount, $mt->type, 'minus', $mt->user_id);  
                    }  
                    
                } // end for  
            }); // end DB Transection
        } 
    }
} 
