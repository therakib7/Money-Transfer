<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Str;

use Modules\AC\Models\AcBalance;

use Modules\CT\Models\CtContact; 

use Modules\MT\Models\MtMt;
use Modules\MT\Models\MtService; 
use Modules\MT\Models\MtTaxonomy;  
use Modules\MT\Models\MtDue; 
use Modules\MT\Models\MtCashoutMBanking; 
use Modules\MT\Models\MtReferralCommission; 
use Modules\MT\Models\MtCommissionUser;
use Modules\MT\Models\MtCommissionUserStatus; 
use Modules\MT\Models\MtSetting; 
 

class DashboardController extends Controller {

    public function index( Request $request ) {
        //return Str::plural('net');

        $this->validate($request, [       
            'page' => 'integer|nullable',
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',        
        ]); 
      
        $auth_id = Auth::id();   
        $ac_balance = new AcBalance;  
        $ac_balance = $ac_balance->select('balance'); 
        $ac_balance = $ac_balance->where('user_id', $auth_id);  
        $ac_balance = $ac_balance->first();  

        /* Total Mobile Recharge = 0, Mobile Banking = 1, Utility = 2 */
        $mt = new MtMt;  
        $mt = $mt->select( [ DB::raw("SUM(amount) as total_amount"), DB::raw("SUM(user_com) as total_user_com"), 'type' ] ); 
        $mt = $mt->where('user_id', $auth_id);  
        $mt = $mt->where('status', 1);  
        $mt = $mt->groupBy('type');  
        if ( $date_from = $request->date_from ) { 
            $mt = $mt->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  
        if ( $date_to = $request->date_to ) {
            $mt = $mt->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        } 
        if ( !$request->date_from && !$request->date_to) {
            $mt = $mt->whereMonth('created_at', Carbon::now()->month );
        } 
        $mt = $mt->get(); 

        /* Due Mobile Recharge = 0, Mobile Banking = 1, Utility = 2 */
        $mt_due = new MtDue;  
        $mt_due = $mt_due->select( [ DB::raw("SUM(due) as total_due"), 'type' ] ); 
        $mt_due = $mt_due->where('user_id', $auth_id);  
        $mt_due = $mt_due->groupBy('type');   
        if ( $date_from = $request->date_from ) { 
            $mt_due = $mt_due->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  
        if ( $date_to = $request->date_to ) {
            $mt_due = $mt_due->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }   
        if ( !$request->date_from && !$request->date_to) {
            $mt_due = $mt_due->whereMonth('created_at', Carbon::now()->month );
        } 
        $mt_due = $mt_due->get(); 

        /* Mobile Banking Cashout */
        $co_mb = new MtCashoutMBanking;  
        $co_mb = $co_mb->select( [ DB::raw("SUM(amount) as total_amount") ] ); 
        $co_mb = $co_mb->where('used_by', $auth_id); 
        if ( $date_from = $request->date_from ) { 
            $co_mb = $co_mb->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  
        if ( $date_to = $request->date_to ) {
            $co_mb = $co_mb->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        } 
        if ( !$request->date_from && !$request->date_to) {
            $co_mb = $co_mb->whereMonth('created_at', Carbon::now()->month );
        }    
        $co_mb = $co_mb->first(); 

        /* Referral Commission */
        $ref_com = new MtReferralCommission;  
        $ref_com = $ref_com->select( [ DB::raw("SUM(amount) as total_amount") ] ); 
        $ref_com = $ref_com->where('to_user_id', $auth_id); 
        $ref_com = $ref_com->where('status', 1); 
        if ( $date_from = $request->date_from ) { 
            $ref_com = $ref_com->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  
        if ( $date_to = $request->date_to ) {
            $ref_com = $ref_com->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        } 
        if ( !$request->date_from && !$request->date_to) {
            $ref_com = $ref_com->whereMonth('created_at', Carbon::now()->month );
        }    
        $ref_com = $ref_com->first();
 
        return compact('ac_balance', 'mt', 'mt_due', 'co_mb', 'ref_com'); 
    } 

    public function store(Request $request) { 
    }  

    public function update(Request $request, $id) { 
    } 
    
    public function destroy( Request $request, $id ) {
    }
}
