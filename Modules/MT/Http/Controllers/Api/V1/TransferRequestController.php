<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash; 
use Carbon\Carbon;

use Modules\MT\Models\MtTransferRequest;
use Modules\MT\Models\MtBankingProvider;  
use Modules\MT\Models\MtTaxonomy; 
use Modules\AC\Models\AcBalance;
use Modules\AC\Models\AcBalanceHistory; 

class TransferRequestController extends Controller {

    /**
     * Enforce middleware.
     */
    public function __construct()
    {
        $this->middleware('throttle:5,1,transfer-request', ['only' => ['store']]);
    }

    public function index( Request $request ) { 

        if ( Gate::denies('transfer-request-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [   
            'page' => 'integer|nullable',    
            'id' => 'integer|nullable',    
            'status' => 'string|nullable',      
            'banking_provider_id' => 'integer|nullable',           
            'from_ac_no' => 'numeric|nullable',           
            'to_ac_no' => 'numeric|nullable',
            'amount' => 'numeric|nullable',           
            'date_from' => 'date_format:d-m-Y h:i a|nullable',         
            'date_to' => 'date_format:d-m-Y h:i a|nullable',
            'order_by' => 'integer|nullable',           
        ]);  

        $transfer_requests = new MtTransferRequest;  

        if ( !$request->order_by ) {
            $transfer_requests = $transfer_requests->orderBy('id', 'DESC');  
        } 

        $transfer_requests = $transfer_requests->with('banking_provider_id:id,name,type'); 

        if ( auth_can(['transfer-request-super']) ) {
            $transfer_requests = $transfer_requests->with('user:id,username,name,mobile,email'); 

            if ( $user_id = $request->user_id ) {  
                $transfer_requests = $transfer_requests->where('user_id', $user_id); 
            } 
        } else {
            $transfer_requests = $transfer_requests->where('user_id', Auth::id()); 
        } 

        if ( isset( $request->status ) ) {
            if ( $request->status == 'pending' ) {
                $status = null;
            } else {
                $status = $request->status;
            }
            $transfer_requests = $transfer_requests->where('status', $status); 
        }

        if ( $banking_provider_id = $request->banking_provider_id ) {
            $transfer_requests = $transfer_requests->where('banking_provider_id', $banking_provider_id);             
        } 

        if ( $id = $request->id ) {
            $transfer_requests = $transfer_requests->where('id', $id); 
        }

        if ( $to_ac_no = $request->to_ac_no ) {
            $transfer_requests = $transfer_requests->where('to_ac_no', $to_ac_no); 
        }  

        if ( $from_ac_no = $request->from_ac_no ) {
            $transfer_requests = $transfer_requests->where('from_ac_no', $from_ac_no); 
        }

        if ( $amount = $request->amount ) {
            $transfer_requests = $transfer_requests->where('amount', $amount); 
        }          

        if ( $date_from = $request->date_from ) { 
            $transfer_requests = $transfer_requests->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $transfer_requests = $transfer_requests->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }  

        $transfer_requests = $transfer_requests->paginate( $request->per_page ); 

       /* $category = MtTaxonomy::where('taxonomy', 'provider-category')->where('slug', 'mobile-banking')->first(['id']); 
        $providers = $category->providers; */

        $banking_providers = new MtBankingProvider;  
        $banking_providers = $banking_providers->where('status', 1); 
        $banking_providers = $banking_providers->with('accounts:id,banking_provider_id,ac_no'); 
        $banking_providers = $banking_providers->orderBy('id', 'DESC'); 
        $banking_providers = $banking_providers->get(); 

        return compact('transfer_requests', 'banking_providers');
    } 

    public function store(Request $request) {

        if ( Gate::denies('transfer-request-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'banking_provider_id' => 'array|required',             
            //'to_ac_no' => 'numeric|required',           
            'from_ac_no' => 'numeric|required',           
            'amount' => 'numeric|min:10|required',           
            'user_note' => 'string|nullable',           
            'checker_note' => 'string|nullable',           
            'pin' => [
                'required',           
                'string',
                'min:4',         
            ],        
        ]);  

        if ( !Hash::check( $request->pin, Auth::user()->pin ) ) {
            abort(403, 'Sorry! You entered wrong pin');
        } 

        MtTransferRequest::create([ 
            'banking_provider_id' => $request->banking_provider_id['id'],   
            'to_ac_no' => $request->to_ac_no,   
            'from_ac_no' => $request->from_ac_no,   
            'amount' => $request->amount,   
            'user_note' => $request->user_note,   
            'user_id' => Auth::id(), 
        ]);

    }  

    public function update(Request $request, $id) { 

        $this->validate($request, [                      
            'statement_id' => 'string|nullable',           
            'checker_note' => 'string|nullable',           
            'pin' => [
                'required',           
                'string',
                'min:4',         
            ],        
        ]);

        if ( !Hash::check( $request->pin, Auth::user()->pin ) ) {
            abort(403, 'Sorry! You entered wrong pin');
        } 

        DB::transaction( function() use ( $request, $id ) { 

            $transfer_request = MtTransferRequest::find($id); 

            if ( $transfer_request->status != null ) {
                abort(403, 'Sorry! Already Received Or Rejected');  
            }

            $received_amount = ( $request->received_amount ) ? $request->received_amount : $request->amount;

            $transfer_request->update([  
                'status' => $request->status, 
                'received_amount' => $received_amount, 
                'statement_id' => $request->statement_id, 
                'checker_note' => $request->checker_note,   
                'checked_by' => Auth::id(), 
            ]); 

            if ( $request->status == 2 ) {
                $from_user_balance = AcBalance::select('balance')->where('user_id', Auth::id())->first(); 

                if ( $from_user_balance->balance < $request->amount ) {
                    abort(403, 'Sorry! You do not have enough balance');
                } 

                $from_user_id = Auth::id();

                if ( $from_user_id == $request->user_id ) {
                    abort(403, 'Sorry! You can\'t send balance own account');
                } 

                $ac_bal_history = [
                    'from_user_id' => $from_user_id,   
                    'to_user_id' => $request->user_id,   
                    'amount' => $received_amount, 
                    'statement_id' => $request->statement_id,  
                    'note' => $request->checker_note, 
                ];

                /* Balance History */
                AcBalance::where('user_id', $from_user_id)->decrement('balance', $request->amount); 
                AcBalance::where('user_id', $request->user_id)->increment('balance', $request->amount); 

                $balance_transfer = AcBalanceHistory::create( $ac_bal_history );
            } 
            

        }); // end DB Transection 
    } 
    
    public function destroy( $id ) {  
    }
}
