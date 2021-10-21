<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;

use Modules\MT\Models\MtProvider;
use Modules\MT\Models\MtTaxonomy; 
use Modules\MT\Models\MtDue; 
use Modules\MT\Models\MtDuePayment; 
use Modules\CT\Models\CtContact; 
use Modules\CT\Models\CtContactService; 

class DueController extends Controller {

    public function index( Request $request ) { 

        if ( Gate::denies('due-amount-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [ 
            'page' => 'integer|nullable',
            'status' => 'boolean|nullable',   
            'type' => 'integer|nullable',             
            'number' => 'numeric|nullable',           
            'name' => 'string|nullable',           
            'amount_from' => 'numeric|nullable',           
            'amount_to' => 'numeric|nullable',    
            'due_from' => 'numeric|nullable',           
            'due_to' => 'numeric|nullable', 
            'date_from' => 'date_format:d-m-Y h:i a|nullable',         
            'date_to' => 'date_format:d-m-Y h:i a|nullable', 
            'order_by' => 'integer|nullable',         
        ]);  

        $dues = new MtDue; 

        if ( !$request->order_by ) {
            $dues = $dues->orderBy('id', 'DESC');  
        } 

        if ( $request->type ) { //utility
            $dues = $dues->where('type', 1);
        } else {
            $dues = $dues->where('type', null);
        } 

        //$dues = $dues->with('contact.service_id.provider', 'due_payments');
        $dues = $dues->with('contact.services.provider_id.services', 'due_payments');

        $dues = $dues->where('user_id', Auth::id()); 

        if ( $status = $request->status ) {
            if ( $status ) {
                $dues = $dues->where('due', 0);
            } elseif ( $status == -1 ) {
                $dues = $dues->where('due', '<', 0); 
            } else {
                $dues = $dues->where('due', '>', 0);
            } 
        }  

        if ( $type = $request->type ) {
            $dues = $dues->where('type', $type); 
        } 

        if ( $number = $request->number ) { 
            if ( $con_id = CtContact::where('user_id', Auth::id())->where('number', $number )->first() ) { 
                $dues = $dues->where('contact_id', $con_id['id']);  
            }
        }

        if ( $name = $request->name ) { 
            if ( $con_ids = CtContact::where('user_id', Auth::id())->where('name', 'LIKE', '%' . $name . '%' )->get() ) { 

                $dues = $dues->where( function ($query) use($con_ids) {
                    foreach($con_ids as $id) {
                        $query->orWhere('contact_id', $id['id']);
                    }
                });  
            }
        } 
        
        if ( $amount_from = $request->amount_from ) {
            $dues = $dues->where('amount', '>=', $amount_from); 
        } 

        if ( $amount_to = $request->amount_to ) {
            $dues = $dues->where('amount', '<=', $amount_to); 
        } 

        if ( $due_from = $request->due_from ) {
            $dues = $dues->where('amount', '>=', $due_from); 
        } 

        if ( $due_to = $request->due_to ) {
            $dues = $dues->where('amount', '<=', $due_to); 
        } 

        if ( $date_from = $request->date_from ) { 
            $dues = $dues->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $dues = $dues->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }     

        $dues = $dues->paginate( $request->per_page );  

        /* Get Provider Only Flexiload Mobile Banking Category */

        if ( $request->type ) { //utility
            $category = MtTaxonomy::where('taxonomy', 'provider-category')->where('slug', 'utility')->first(['id']); 
            $providers = $category->provider_with_cats;
        } else {
            $category = MtTaxonomy::where('taxonomy', 'provider-category')->where('slug', 'mobile-recharge-banking')->first(['id']); 
            $providers = $category->provider_with_cats;
        } 

        return compact('dues', 'providers'); 
    } 

    public function store(Request $request) {

        if ( Gate::denies('due-amount-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }
 
        $this->validate($request, [ 
            'number' => 'numeric|nullable',           
            'provider_id' => 'array|required',   
            'service_id' => 'array|required',   
            'name' => 'string|nullable',           
            'amount' => 'numeric|required|min:1',           
            'paid' => 'numeric|required|min:1',              
        ]);  

        DB::transaction( function() use ( $request ) {  
           
            /* Add Contact */
            $name = ( $request->name ) ? $request->name : null; 
            $contact_id = null; 

            $con_id = CtContactService::where('user_id', Auth::id())
                                ->where('number', $request['number'] )
                                ->where('provider_id', $request['provider_id']['id'] )
                                ->where('service_id', $request['service_id']['id'] )
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
                                    ->where('number', 'LIKE', '%' . $request['number'] . '%')
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
                    'number' => $request['number'],
                    'provider_id' => $request['provider_id'],
                    'provider_id' => $request['provider_id']['id'],
                    'service_id' => $request['service_id']['id'],
                    'user_id' => Auth::id(), 
                ]);  
                
                if ( !$con_id ) {
                    $contact->categories()->attach( [$request['provider_id']['categories'][0]['id']] );
                } 
                $contact_id = $cont_id; 
            }  
     
            /* Add Due Amount */
            $paid = $request->paid ?? 0;

            $due_amount = $request->amount - $paid;
            
            $due = [
                'contact_id' => $contact_id, 
                'amount' => $request->amount, 
                'paid' => $paid, 
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

                $new_amount = $old_due->amount + $request->amount;
                $new_paid = $old_due->paid + $request->paid;
                $current_due = $request->amount - $request->paid;
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
                'provider_id' => $request['provider_id']['id'],
                'service_id' => $request['service_id']['id'],   
                'amount' => $due_amount,          
                'type' => 0,
                'note' => $request->note,     
                'date_time' => date('Y-m-d H:i:s'),    
            ]);  
        }); // end DB Transection
    }  

    public function update(Request $request, $id) { } 
    
    public function destroy( $id ) {
        DB::transaction( function() use ($id) {
            $ids = explode(',', $id);
            foreach ($ids as $id) {
                $due = MtDue::find($id); 
                if ( Gate::denies('due-amount-delete', $due) ) {
                    abort(403, 'Sorry! You do not have permission');
                }
            } 
            MtDuePayment::whereIn('due_id', $ids)->delete();   
            MtDue::destroy( $ids );  
        });
    }
}
