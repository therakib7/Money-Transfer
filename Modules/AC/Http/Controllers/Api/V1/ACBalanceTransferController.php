<?php

namespace Modules\AC\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash; 
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;
use App\Models\User;

use Modules\AC\Models\AcBalance; 
use Modules\AC\Models\AcBalanceHistory; 
use Modules\MT\Models\MtReferralBalance; 

use App\Events\BalanceTransfer;

class ACBalanceTransferController extends Controller {

    public function index( Request $request ) {  

        if ( Gate::denies('balance-transfer-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [       
            'page' => 'integer|nullable', 
            'type' => 'integer|nullable', 
            'transection_type' => 'integer|nullable', 
            'user_id' => 'integer|nullable', 
            'amount_from' => 'numeric|nullable',           
            'amount_to' => 'numeric|nullable',   
            'statement_id' => 'string|nullable', 
            'date_from' => 'date_format:d-m-Y h:i a|nullable',         
            'date_to' => 'date_format:d-m-Y h:i a|nullable', 
            'order_by' => 'integer|nullable',         
        ]); 

        $balancetransfers = new AcBalanceHistory; 

        if ( !$request->order_by ) {
            $balancetransfers = $balancetransfers->orderBy('id', 'DESC');  
        }

        if ( $request->type ) { //super balance
            if ( Gate::denies('balance-transfer-super') ) {
                abort(403, 'Sorry! You do not have permission');
            }

            $ac_balance = new AcBalance;  
            $ac_balance = $ac_balance->select('balance'); 
            $ac_balance = $ac_balance->where('user_id', 0);  
            $ac_balance = $ac_balance->first();  

            $balancetransfers = $balancetransfers->where('type', 1);
        } else {
            $balancetransfers = $balancetransfers->where('type', null);
            $ac_balance = null;
        } 

        if ( $user_id = $request->user_id ) { 
            $balancetransfers = $balancetransfers->where('from_user_id', $user_id);
            $balancetransfers = $balancetransfers->orWhere('to_user_id', $user_id);
        } 
 
        $balancetransfers = $balancetransfers->with('user_from:id,username,name,email,mobile'); 
        $balancetransfers = $balancetransfers->with('user_to:id,username,name,email,mobile'); 

        /* Top super can see all statement */
        if ( !$request->type ) { //super balance
            if ( isset( $request->transection_type ) && $request->transection_type != '' ) {
                if ( $request->transection_type ) {
                    $balancetransfers = $balancetransfers->orWhere('to_user_id', Auth::id());
                } else {
                    $balancetransfers = $balancetransfers->where('from_user_id', Auth::id());
                }
            } else {
                $balancetransfers = $balancetransfers->where('from_user_id', Auth::id());
                $balancetransfers = $balancetransfers->orWhere('to_user_id', Auth::id());
            }            
        } 

        if ( $statement_id = $request->statement_id ) {
            $balancetransfers = $balancetransfers->where('amount', '>=', $statement_id); 
        } 

        if ( $amount_from = $request->amount_from ) {
            $balancetransfers = $balancetransfers->where('amount', '>=', $amount_from); 
        } 

        if ( $amount_to = $request->amount_to ) {
            $balancetransfers = $balancetransfers->where('amount', '<=', $amount_to); 
        } 

        if ( $date_from = $request->date_from ) {
            $balancetransfers = $balancetransfers->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $balancetransfers = $balancetransfers->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }   

        $balancetransfers = $balancetransfers->paginate( $request->per_page ); 



        return compact('balancetransfers', 'ac_balance');
    } 

    public function store(Request $request) { 

        if ( Gate::denies('balance-transfer-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'type' => 'integer|nullable', 
            'username' => 'array|required',                   
            'amount' => 'required|numeric|min:1',                   
            'note' => 'string|nullable',           
            'statement_id' => 'string|nullable',           
            'pin' => [
                'required',
                'string',          
                'min:4',        
            ],        
        ]);   

        if ( !Hash::check( $request->pin, Auth::user()->pin ) ) {
            abort(403, 'Sorry! You entered wrong pin');
        }  

        if ( $request->type ) { //super balance
            if ( Gate::denies('balance-transfer-super') ) {
                abort(403, 'Sorry! fdfds You do not have permission');
            }
        } 
 
        /* To user id must fill security identity */ 

        $user = User::where('id', $request->username['id'])
                    ->with(['profile'=>function($query) {
                        $query->select('id', 'user_id', 'nid','birth_crt', 'passport');
                    }])
                    ->first(['id']);
        $profile = $user['profile'];

        if ( empty( $profile['nid'] ) && empty( $profile['birth_crt'] ) && empty( $profile['passport'] ) ) {
            abort(403, 'Sorry! To user must fill up NID, Birth Certificate Or Passport to transaction');
        }

        /*
         * If type super account cut from company account otherwise personal account
        */

        DB::transaction( function() use ($request) {
 
            $from_user_id = Auth::id();

            if ( $request->type ) { //super balance
                $company_balance = AcBalance::select('balance')->where('user_id', 0)->first(); 

                if ( $company_balance->balance < $request->amount ) {
                    abort(403, 'Sorry! Company does not have enough balance');
                } 

            } else {
                $from_user_balance = AcBalance::select('balance')->where('user_id', $from_user_id)->first(); 

                if ( $from_user_balance->balance < $request->amount ) {
                    abort(403, 'Sorry! You do not have enough balance');
                } 
            }  
            
            $to_user_id = $request->username['id']; 
            if ( $to_user_id == $from_user_id ) {
                abort(403, 'Sorry! You can\'t send balance own account');
            } 

            $ac_bal_history = [
                'from_user_id' => $from_user_id,   
                'to_user_id' => $to_user_id,   
                'amount' => $request->amount, 
                'statement_id' => $request->statement_id,  
                'note' => $request->note, 
            ];

            /* Balance History */
            if ( $request->type ) { //super balance  
                AcBalance::where('user_id', 0)->decrement('balance', $request->amount); 
                AcBalance::where('user_id', $to_user_id)->increment('balance', $request->amount);
                $ac_bal_history['type'] = 1;
            } else {  
                AcBalance::where('user_id', $from_user_id)->decrement('balance', $request->amount); 
                AcBalance::where('user_id', $to_user_id)->increment('balance', $request->amount); 
            } 

            $balance_transfer = AcBalanceHistory::create( $ac_bal_history );

            /* Message event fired */
            event(new BalanceTransfer($balance_transfer)); 

            /* 
            * Referral Balance
            * Only agent will get referral balance
            * If agent sent to personal and personal sent to another personal agent also get commission
            */ 

            if ( !$request->type ) { //super balance
                if ( role_by_user_id( $from_user_id, ['agent'] ) ) { //not personal account
                    $referral_id = MtReferralBalance::where('from_user_id', $from_user_id)
                                        ->where('to_user_id', $to_user_id ) 
                                        ->first();
                    
                    if ( $referral_id ) {    
                        MtReferralBalance::where('id', $referral_id['id'])->increment('amount', $request->amount);
                    } else {
                        MtReferralBalance::create([
                            'from_user_id' => $from_user_id,   
                            'to_user_id' => $to_user_id,   
                            'amount' => $request->amount,   
                        ]); 
                    }                     
                } else if ( role_by_user_id( $from_user_id, ['personal'] ) ) {
                    if ( role_by_user_id( $to_user_id, ['personal'] ) ) {
                        $referral_balance = new MtReferralBalance;  
                        $referral_balance = $referral_balance->where('to_user_id', $from_user_id);
                        $referral_balance = $referral_balance->whereColumn('used_amount', '<', 'amount');
                        $referral_balance = $referral_balance->select( [ DB::raw("amount - used_amount  as remain_amount"), 'id', 'from_user_id' ] );
                        $referral_balance = $referral_balance->first(); 

                        /* Merchant never get any referral commission */ 
                        if ( $referral_balance && !role_by_user_id( $referral_balance['from_user_id'], ['merchant'] ) ) { 
                            if ( $referral_balance && $referral_balance['remain_amount'] >= $request->amount ) {

                                MtReferralBalance::where('id', $referral_balance['id'])->decrement('amount', $request->amount);

                                $referral_id = MtReferralBalance::where('from_user_id', $referral_balance['from_user_id'])
                                                    ->where('to_user_id', $to_user_id ) 
                                                    ->first();
                                
                                if ( $referral_id ) {    
                                    MtReferralBalance::where('id', $referral_id['id'])->increment('amount', $request->amount);
                                } else {
                                    MtReferralBalance::create([
                                        'from_user_id' => $referral_balance['from_user_id'],   
                                        'to_user_id' => $to_user_id,   
                                        'amount' => $request->amount,   
                                    ]); 
                                }    
                            }
                        }  
                    } // end if to personal user 

                } // end from personal user
            } 

        }); 
        
    }  

    public function update(Request $request, $id) { } 
    
    public function destroy( $id ) { }
}
