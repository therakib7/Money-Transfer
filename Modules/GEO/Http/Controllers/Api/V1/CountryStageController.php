<?php

namespace Modules\GEO\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

use Modules\GEO\Models\CountryStage; 
use Modules\GEO\Models\Location;  

class CountryStageController extends Controller { 

    public function index(Request $request) {   

        $this->validate($request, [ 
            'page' => 'integer|nullable',
            'country_id' => 'integer|nullable',
            'name' => 'alpha_dash|nullable',  
            'date_from' => 'date_format:d-m-Y h:i a|nullable',         
            'date_to' => 'date_format:d-m-Y h:i a|nullable',
            'order_by' => 'integer|nullable',   
        ]);

        if ( Gate::denies('geo-type-view') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        if ( $request->country_id ) {   
            $country_stages = new CountryStage;   
            $country_stages = $country_stages->where('country_id', $request->country_id ); 
            return $country_stages = $country_stages->get();
        }

        $countrystages = new Location; 
        $countrystages = $countrystages->where('parent_id', null);  
        $countrystages = $countrystages->whereHas('countrystages')->with('countrystages');  

        if ( !$request->order_by ) {
            $countrystages = $countrystages->orderBy('id', 'DESC');  
        }  

        if ( $date_from = $request->date_from ) { 
            $countrystages = $countrystages->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $countrystages = $countrystages->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        } 

        $countrystages = $countrystages->paginate( $request->per_page ); 
        
        $countries = Location::where('parent_id', null)->get();  

        return compact('countrystages', 'countries');

    }

    public function store(Request $request) {

        if ( Gate::denies('geo-type-create') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $this->validate($request, [ 
            'country_id' => 'array|required',      
            'countrystages.*.name' => 'string|required',       
            'countrystages.*.native_name' => 'string|nullable', 
        ]);
        
        $countrystages = [];
        $key = 0; 

        foreach ( $request->countrystages as $stage ) {    
            $countrystages[$key]['country_id'] = $request->country_id['id'];  
            $countrystages[$key]['stage'] = $key+1;  
            $countrystages[$key]['name'] = $stage['name'];  
            $countrystages[$key]['native_name'] = $stage['native_name'];   
            $countrystages[$key]['user_id'] = Auth::id();
            $countrystages[$key]['created_at'] = date('Y-m-d H:i:s'); 
            $countrystages[$key]['updated_at'] = date('Y-m-d H:i:s'); 
            $key++;
        } 
        
        CountryStage::insert($countrystages);  
    } 

    public function update(Request $request, $id) {

        $countrystage = Location::find($id); 
        if ( Gate::denies('geo-type-edit', $countrystage) ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $this->validate($request, [ 
            'country_id' => 'array|required',      
            'countrystages.*.name' => 'string|required',       
            'countrystages.*.native_name' => 'string|nullable', 
        ]);
        
        $countrystages = [];
        $key = 0; 

        foreach ( $request->countrystages as $stage ) {    
            $countrystages[$key]['country_id'] = $request->country_id['id'];  
            $countrystages[$key]['stage'] = $key+1;  
            $countrystages[$key]['name'] = $stage['name'];  
            $countrystages[$key]['native_name'] = $stage['native_name'];   
            $countrystages[$key]['user_id'] = Auth::id();
            $countrystages[$key]['created_at'] = date('Y-m-d H:i:s'); 
            $countrystages[$key]['updated_at'] = date('Y-m-d H:i:s'); 
            $key++;
        } 
        
        CountryStage::where('country_id', $id)->delete();
        CountryStage::insert($countrystages); 
    }

    public function destroy($id) {  
        $ids = explode(',', $id);
        foreach ($ids as $id) {
            $countrystage = Location::find($id); 
            if ( Gate::denies('geo-type-delete', $countrystage) ) {
                abort(403, 'Sorry! You do not have permission');
            }
        }  
        return CountryStage::whereIn('country_id', $ids)->delete();
    }
}
