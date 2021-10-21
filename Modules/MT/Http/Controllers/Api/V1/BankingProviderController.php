<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use Modules\MT\Models\MtBankingProvider; 
use Modules\MT\Models\MtTaxonomy;

class BankingProviderController extends Controller {

    public function index( Request $request ) { 

        if ( Gate::denies('banking-provider-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [ 
            'page' => 'integer|nullable',      
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',   
            'order_by' => 'integer|nullable',      
        ]); 

        $banking_providers = new MtBankingProvider; 

        if ( !$request->order_by ) {
            $banking_providers = $banking_providers->orderBy('id', 'DESC');  
        } 

        $banking_providers = $banking_providers->with('logo_small_src', 'logo_big_src');

        if ( $date_from = $request->date_from ) { 
            $banking_providers = $banking_providers->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $banking_providers = $banking_providers->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        } 

        $banking_providers = $banking_providers->paginate( $request->per_page ); 

        return compact('banking_providers');
    } 

    public function store(Request $request) {

        if ( Gate::denies('banking-provider-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'status' => 'boolean|required',             
            'name' => 'string|required',    
            'type' => 'integer|nullable',    
            'order' => 'string|nullable',          
            'logo_small' => 'integer|nullable',         
            'logo_big' => 'integer|nullable',              
        ]);           

        $provider = MtBankingProvider::create([
            'status' => $request->status,
            'name' => $request->name,   
            'type' => $request->type,   
            'order' => $request->order, 
            'logo_small' => ( $request->logo_small ) ? $request->logo_small : null, 
            'logo_big' => ( $request->logo_big ) ? $request->logo_big : null,  
            'user_id' => Auth::id(), 
        ]);  
    }  

    public function update(Request $request, $id) { 

        $this->validate($request, [
            'status' => 'boolean|required',             
            'name' => 'string|required',
            'type' => 'integer|nullable',      
            'order' => 'string|nullable',          
            'logo_small' => 'integer|nullable',         
            'logo_big' => 'integer|nullable',              
        ]);

        $provider = MtBankingProvider::find($id); 
        if ( Gate::denies('banking-provider-edit', $provider) ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $provider->update([
            'status' => $request->status,
            'name' => $request->name,  
            'type' => $request->type, 
            'order' => $request->order,
            'logo_small' => ( $request->logo_small ) ? $request->logo_small : null, 
            'logo_big' => ( $request->logo_big ) ? $request->logo_big : null,   
        ]);

    }  

    public function destroy( $id ) {  
        DB::transaction( function() use ($id) {
            $ids = explode(',', $id);
            foreach ($ids as $id) {
                $provider = MtBankingProvider::find($id); 
                if ( Gate::denies('banking-provider-delete', $provider) ) {
                    abort(403, 'Sorry! You do not have permission');
                }   
                $provider->delete();
            }   
        });
    }
}
