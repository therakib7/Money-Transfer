<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;
 
use Modules\MT\Models\MtReferralCommission; 

class ReferralCommissionController extends Controller {

    public function index( Request $request ) {  

        if ( Gate::denies('referral-view') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $this->validate($request, [    
            'page' => 'integer|nullable',   
            'user_id' => 'integer|nullable',
            'date_from' => 'date_format:d-m-Y h:i a|nullable',         
            'date_to' => 'date_format:d-m-Y h:i a|nullable', 
            'order_by' => 'integer|nullable',         
        ]); 

        $referralcommissions = new MtReferralCommission; 

        if ( !$request->order_by ) {
            $referralcommissions = $referralcommissions->orderBy('id', 'DESC');  
        }

        $referralcommissions = $referralcommissions->with('user:id,username,name,email,mobile'); 

        if ( $user_id = $request->user_id ) { 
            $referralcommissions = $referralcommissions->where('from_user_id', $user_id); 
        }        

        if ( !auth_can(['referral-super']) ) {
            $referralcommissions = $referralcommissions->where('to_user_id', Auth::id()); 
        } else {
            $referralcommissions = $referralcommissions->with('user_to:id,username,name,email,mobile');
        }

        if ( $amount_from = $request->amount_from ) {
            $referralcommissions = $referralcommissions->where('amount', '>=', $amount_from); 
        } 

        if ( $amount_to = $request->amount_to ) {
            $referralcommissions = $referralcommissions->where('amount', '<=', $amount_to); 
        } 

        if ( $date_from = $request->date_from ) {
            $referralcommissions = $referralcommissions->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $referralcommissions = $referralcommissions->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }   

        $referralcommissions = $referralcommissions->paginate( $request->per_page ); 

        $ref_url = 'https://mt.oxyzone.net/register?ref_id=' . base64_encode( Auth::id() );

        return compact('referralcommissions', 'ref_url');
    } 

    public function store(Request $request) { }  

    public function update(Request $request, $id) { } 
    
    public function destroy( $id ) { }
}
