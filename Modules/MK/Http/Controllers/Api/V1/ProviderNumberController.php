<?php

namespace Modules\MK\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use Modules\MK\Models\ProviderNumber; 

class ProviderNumberController extends Controller {

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

        $providers = new ProviderNumber; 

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
            'categories' => 'array|required',             
            'name' => 'string|required',             
            'slug' => 'string|nullable',
            'prefix' => 'string|nullable',
            'start_one' => 'boolean|nullable',             
            'min_number' => 'integer|required',         
            'max_number' => 'integer|required',          
            'logo_small' => 'integer|nullable',         
            'logo_big' => 'integer|nullable',              
        ]);  
        
        $slug = ($request->slug) ? $request->slug : str_slug($request->name);

        $provider = ProviderNumber::create([
            'status' => $request->status,
            'name' => $request->name,  
            'slug' => $slug,  
            'prefix' => $request->prefix,
            'start_one' => $request->start_one,  
            'min_number' => $request->min_number, 
            'max_number' => $request->max_number, 
            'logo_small' => ( $request->logo_small ) ? $request->logo_small : null, 
            'logo_big' => ( $request->logo_big ) ? $request->logo_big : null,  
            'user_id' => Auth::id(), 
        ]); 

        if ( $request->categories ) {
            $provider_cats = [];
            foreach ($request->categories as $category) {
                $provider_cats[] = $category['id'];
            } 
            if ( $request->cat_id ) {
                $provider_cats[] = $request->cat_id['id']; 
            }
            $provider->categories()->attach( $provider_cats ); 
        }

    }  

    public function update(Request $request, $id) { 

        $this->validate($request, [
            'status' => 'boolean|required',            
            'name' => 'string|required',             
            'slug' => 'string|required',             
            'prefix' => 'string|nullable',
            'start_one' => 'boolean|nullable',             
            'min_number' => 'integer|required',         
            'max_number' => 'integer|required',           
            'logo_small' => 'integer|nullable',         
            'logo_big' => 'integer|nullable',              
        ]);  

        $provider = ProviderNumber::find($id); 
        if ( Gate::denies('provider-edit', $provider) ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $slug = ($request->slug) ? $request->slug : str_slug($request->name);

        $provider->update([
            'status' => $request->status,
            'name' => $request->name,   
            'slug' => $slug, 
            'prefix' => $request->prefix,
            'start_one' => $request->start_one,  
            'min_number' => $request->min_number, 
            'max_number' => $request->max_number, 
            'logo_small' => ( $request->logo_small ) ? $request->logo_small : null, 
            'logo_big' => ( $request->logo_big ) ? $request->logo_big : null,   
        ]);

        if ( $request->categories ) {
            $provider_cats = [];
            foreach ($request->categories as $category) {
                $provider_cats[] = $category['id'];
            } 
            if ( $request->cat_id ) {
                $provider_cats[] = $request->cat_id['id']; 
            }
            $provider->categories()->sync( $provider_cats ); 
        }

    }  

    public function destroy( $id ) {  
        DB::transaction( function() use ($id) {
            $ids = explode(',', $id);
            foreach ($ids as $id) {
                $provider = ProviderNumber::find($id); 
                if ( Gate::denies('provider-delete', $provider) ) {
                    abort(403, 'Sorry! You do not have permission');
                }   
                $provider->categories()->detach(); 
                $provider->delete();
            }   
        });
    }
}
