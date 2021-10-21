<?php

namespace Modules\MK\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use Modules\MK\Models\Provider;  

class ProviderController extends Controller {

    public function index( Request $request ) { 

        if ( Gate::denies('provider-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [ 
            'page' => 'integer|nullable',      
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',   
            'order_by' => 'integer|nullable',      
        ]); 

        $providers = new Provider; 

        if ( !$request->order_by ) {
            $providers = $providers->orderBy('id', 'DESC');  
        }  

        if ( $date_from = $request->date_from ) { 
            $providers = $providers->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $providers = $providers->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        } 

        $providers = $providers->paginate( $request->per_page );  

        return compact('providers');
    } 

    public function store(Request $request) {

        if ( Gate::denies('provider-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'status' => 'boolean|required',               
            'name' => 'string|required',  
            'prefix' => 'string|nullable',             
            'length' => 'integer|nullable',
            'type' => 'integer|nullable',
            'location_id' => 'integer|nullable',       
        ]);  
        
        $slug = ($request->slug) ? $request->slug : str_slug($request->name);

        $provider = Provider::create([
            'status' => $request->status,
            'name' => $request->name,
            'prefix' => $request->prefix,  
            'length' => $request->length,  
            'type' => $request->type,   
            'location_id' => $request->location_id,   
            'user_id' => Auth::id(), 
        ]);  

    }  

    public function update(Request $request, $id) { 

        $this->validate($request, [
            'status' => 'boolean|required',               
            'name' => 'string|required',  
            'prefix' => 'string|nullable',             
            'length' => 'integer|nullable',
            'type' => 'integer|nullable',
            'location_id' => 'integer|nullable',              
        ]);  

        $provider = Provider::find($id); 
        if ( Gate::denies('provider-edit', $provider) ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $slug = ($request->slug) ? $request->slug : str_slug($request->name);

        $provider->update([
            'status' => $request->status,
            'name' => $request->name,
            'prefix' => $request->prefix,  
            'length' => $request->length,  
            'type' => $request->type,   
            'location_id' => $request->location_id,   
        ]); 

    }  

    public function destroy( $id ) {  
        DB::transaction( function() use ($id) {
            $ids = explode(',', $id);
            foreach ($ids as $id) {
                $provider = Provider::find($id); 
                if ( Gate::denies('provider-delete', $provider) ) {
                    abort(403, 'Sorry! You do not have permission');
                }    
                $provider->delete();
            }   
        });
    }
}
