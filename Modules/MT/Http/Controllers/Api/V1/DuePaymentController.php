<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Pagination\Paginator;
use Carbon\Carbon;

use Modules\MT\Models\MtDue;  
use Modules\MT\Models\MtDuePayment;  

class DuePaymentController extends Controller {

    public function index( Request $request ) {
        $this->validate($request, [ 
            'page' => 'integer|nullable',
            'due_id' => 'integer|required',    
            'provider_id' => 'integer|nullable',                   
            'service_id' => 'integer|nullable',
            'amount_from' => 'numeric|nullable',           
            'amount_to' => 'numeric|nullable',    
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',         
            'type' => 'integer|nullable',           
        ]);  

        if ( Gate::denies('due-amount-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $due = MtDue::find($request->due_id); 
        if ( Gate::denies('due-amount-edit', $due) ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $due_histories = new MtDuePayment;  

        $due_histories = $due_histories->where('due_id', $request->due_id); 

        if ( $provider_id = $request->provider_id ) {
            $due_histories = $due_histories->where('provider_id', $provider_id); 
        } 

        if ( $service_id = $request->service_id ) {
            $due_histories = $due_histories->where('service_id', $service_id); 
        }

        $due_histories = $due_histories->with('provider_id:id,name', 'service_id:id,name');

        if ( isset( $request->type ) ) {
            $due_histories = $due_histories->where('type', $request->type ); 
        } 

        if ( $amount_from = $request->amount_from ) {
            $due_histories = $due_histories->where('amount', '>=', $amount_from); 
        } 

        if ( $amount_to = $request->amount_to ) {
            $due_histories = $due_histories->where('amount', '<=', $amount_to); 
        }  

        if ( $date_from = $request->date_from ) { 
            $due_histories = $due_histories->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $due_histories = $due_histories->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }

        if ( $page = $request->history_page ) { 
            Paginator::currentPageResolver(function() use ($page) {
                return $page;
            });
        }
        
        $due_histories = $due_histories->paginate( $request->history_per_page ); 
        
        return compact('due_histories');
    } 

    public function store(Request $request) {

        if ( Gate::denies('due-amount-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [ 
            'due_id' => 'integer|required',   
            'amount' => 'required|numeric|min:1',                   
            'type' => 'integer|required',    
            'date_time' => 'date_format:d-m-Y h:i a|nullable',       
        ]);  

        DB::transaction( function() use ( $request ) {
   
            $date_time = ( $request->date_time ) ? Carbon::parse( $request->date_time )->format('Y-m-d H:i') : date('Y-m-d H:i');           

            $due_payment = [  
                'due_id' => $request->due_id,  
                'amount' => $request->amount,  
                'note' => $request->note,  
                'type' => $request->type,    
                'date_time' => $date_time,    
            ];

            MtDuePayment::create($due_payment);  

            $old_due = MtDue::select('paid', 'due')->where('id', $request->due_id)->first(); 

            if ( $request->type ) {
                $new_paid = $old_due->paid + $request->amount;
                $new_due = $old_due->due - $request->amount;
            } else {
                $new_paid = $old_due->paid - $request->amount;
                $new_due = $old_due->due + $request->amount;
            } 
     
            $due_id = MtDue::find( $request->due_id );  
            $due_id->update([ 
                'paid' => $new_paid,     
                'due' => $new_due,     
            ]); 
        }); // end DB Transection

    }  

    public function update(Request $request, $id) {
 
    } 
    
    public function destroy( $id ) { 

    }
}
