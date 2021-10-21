<?php

namespace Modules\GEO\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;

use Modules\GEO\Models\CountryStage; 
use Modules\GEO\Models\Location;  

class LocationController extends Controller { 

    public function index(Request $request) {  

        $this->validate($request, [ 
            'page' => 'integer|nullable',
            'country' => 'string|nullable',
            'country_id' => 'integer|nullable',
            'parent_id' => 'integer|nullable',
            'location_id' => 'integer|nullable',
            'type' => 'string|nullable',
            'address' => 'string|nullable',
            'stage_id' => 'integer|nullable',
            'name' => 'alpha_dash|nullable',  
            'date_from' => 'date_format:d-m-Y h:i a|nullable',         
            'date_to' => 'date_format:d-m-Y h:i a|nullable',
            'order_by' => 'integer|nullable',   
        ]);

        if ( Gate::denies('geo-location-view') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        /* Show sub location in selected address */ 
        if ( $request->location_id ) {    
            $location = new Location;    
            $location = $location->where('id', $request->location_id ); 
            $location = $location->with('parent');   
            return $location = $location->first(['id', 'name', 'native_name', 'parent_id', 'stage_id']);
        } 


        /* Suggestion to select child stage */
        if ( $request->country == 'stage' ) {
        
            $suggestion_location = new Location;  
            $suggestion_location = $suggestion_location->where('country_id', $request->country_id );  
            $suggestion_location = $suggestion_location->where('parent_id', $request->parent_id );  
            //$suggestion_location = $suggestion_location->with('parent');  
            $suggestion_location = $suggestion_location->get(['id', 'name', 'native_name', 'parent_id', 'stage_id']);

            $country_stages = new CountryStage;   
            $country_stages = $country_stages->where('country_id', $request->country_id ); 
            $country_stages = $country_stages->where('stage', '>', $request->stage_id ); 
            $country_stages = $country_stages->get();

            return compact('suggestion_location', 'country_stages');
        }

        
        /* Show sub location in selected address */ 
        if ( $request->country_id && $request->parent_id ) {   
            //$parent_id =  $request->parent_id - 1;
            $child_locations = new Location;   
            $child_locations = $child_locations->where('country_id', $request->country_id ); 
            $child_locations = $child_locations->where('parent_id', $request->parent_id ); 
            //$child_locations = $child_locations->with('one_childs'); 
            return $child_locations = $child_locations->get(['id', 'name', 'native_name']);
        }         

        /* Suggest Address */
        if ( $address = $request->address ) {
            if ( $request->country == 'only' ) {
                $addresss = explode(' ', $address);
                $suggestion_location = new Location;  
                $suggestion_location = $suggestion_location->where('status', 1 ); 
                $suggestion_location = $suggestion_location->where('parent_id', null ); 
                $suggestion_location = $suggestion_location->where( function ($query) use( $addresss ) {
                    foreach( $addresss as $address ) {
                        $query->orWhere('name', 'LIKE', '%' . $address . '%');
                        $query->orWhere('native_name', 'LIKE', '%' . $address . '%');
                    }
                });  
                return $suggestion_location = $suggestion_location->get(['id', 'name', 'native_name']);
            } else {
                $addresss = explode(' ', $address);
                $suggestion_location = new Location;  
                $suggestion_location = $suggestion_location->where('country_id', $request->country_id ); 
                $suggestion_location = $suggestion_location->where( function ($query) use( $addresss ) {
                    foreach( $addresss as $address ) {
                        $query->orWhere('name', 'LIKE', '%' . $address . '%');
                        $query->orWhere('native_name', 'LIKE', '%' . $address . '%');
                    }
                }); 
                $suggestion_location = $suggestion_location->with('parent');  
                $suggestion_location = $suggestion_location->get(['id', 'name', 'native_name', 'parent_id', 'stage_id']);

                $country_stages = new CountryStage;   
                $country_stages = $country_stages->where('country_id', $request->country_id ); 
                $country_stages = $country_stages->get();

                return compact('suggestion_location', 'country_stages');
            } 
            
        }

        if ( $request->country_id && $request->stage_id ) {   
            $stage_id =  $request->stage_id - 1;
            $parent_locations = new Location;   
            $parent_locations = $parent_locations->where('country_id', $request->country_id ); 
            $parent_locations = $parent_locations->where('stage_id', $stage_id ); 
            $parent_locations = $parent_locations->with('one_parents'); 
            return $parent_locations = $parent_locations->get(['id', 'name', 'native_name', 'parent_id']);
        }


        $geolocations = new Location; 

        if ( !$request->order_by ) {
            $geolocations = $geolocations->orderBy('id', 'DESC');  
        } 

        if ( $name = $request->name ) {
            $names = explode(' ', $name);

            $geolocations = $geolocations->where( function ($query) use($names) {
                foreach($names as $name) {
                    $query->orWhere('name', 'LIKE', '%' . $name . '%');
                }
            }); 
        }

        if ( $date_from = $request->date_from ) { 
            $geolocations = $geolocations->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $geolocations = $geolocations->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }  

        $geolocations = $geolocations->get();
        
        $geolocationsPaged = Location::buildArray($geolocations->toArray()); 

        $page_no = ! empty( $request->page ) ? (int) $request->page : 1; 
        $total = count( $geolocationsPaged ); //total items in array    
        $limit = ! empty( $request->per_page ) ? (int) $request->per_page : 20; //per page    
        $totalPages = ceil( $total/ $limit ); //calculate total pages 
        $offset = ($page_no - 1) * $limit;
        if( $offset < 0 ) $offset = 0;

        $location = array_slice( $geolocationsPaged, $offset, $limit );

        $from = ($offset + 1);

        $to = ( $from  - 1 ) + count($location);

        $prev_page = ($page_no > 1) ? true : false;
        $next_page = ($page_no < $totalPages) ? true : false;

        $countries = new Location;
        $countries = $countries->where('parent_id', null);  
        $countries = $countries->get();

        $geolocations = [
            'off' => $offset,
            'lll' => $limit,
            'current_page' => $page_no,
            'data' => $location, 
            'data_all' => $countries, // this is for select parent location
            'from' => $from,
            'last_page' => $totalPages,
            'per_page' => $limit,
            'to' => $to,
            'total' => $total,
            'prev_page_url' => $prev_page,
            'next_page_url' => $next_page,
        ];

        $geolocations = ($location) ? $geolocations : ['data' => '', 'data_all' => ''];

        return compact('geolocations');

    }

    public function store(Request $request) {

        if ( Gate::denies('geo-location-create') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $this->validate($request, [ 
            'country_id' => 'array|nullable',    
            'stage_id' => 'array|nullable',  
            'location_id' => 'array|nullable',  
            'location_data' => 'array|required', 
            'location_data.*.status' => 'boolean|required',    
            'location_data.*.name' => 'string|required',    
            'location_data.*.order' => 'integer|nullable',    
            'location_data.*.native_name' => 'string|nullable',     
            'location_data.*.lat' => 'decimal|nullable',     
            'location_data.*.long' => 'decimal|nullable',     
            'location_data.*.web' => 'string|nullable',     
        ]);
 
        $location_data = [];
        $key = 0; 

        $parent_id = ( $request->stage_id['stage'] == 1 ) ? $request->country_id['id'] : $request->location_id['id'];
        $stage_id = ( $request->stage_id ) ? $request->stage_id['stage'] : null;
        $country_id = ( $request->country_id ) ? $request->country_id['id'] : null;

        foreach ( $request->location_data as $location ) {   

            $location_data[$key]['status'] = $location['status'];  
            $location_data[$key]['country_id'] = $country_id;  
            $location_data[$key]['name'] = $location['name'];  
            $location_data[$key]['parent_id'] = $parent_id;  
            $location_data[$key]['stage_id'] = $stage_id; 
            $location_data[$key]['native_name'] = $location['native_name'];  
            $location_data[$key]['order'] = $location['order'];  
            $location_data[$key]['lat'] = $location['lat'];  
            $location_data[$key]['long'] = $location['long'];  
            $location_data[$key]['web'] = $location['web'];  
            $location_data[$key]['user_id'] = Auth::id();
            $location_data[$key]['created_at'] = date('Y-m-d H:i:s'); 
            $location_data[$key]['updated_at'] = date('Y-m-d H:i:s'); 
            $key++;
        } 
        
        Location::insert($location_data);  
 
    } 

    public function update(Request $request, $id) {

        $this->validate($request, [ 
            'status' => 'boolean|nullable',    
            'name' => 'string|required',    
            'order' => 'integer|nullable',    
            'native_name' => 'string|nullable',     
            'lat' => 'decimal|nullable',     
            'long' => 'decimal|nullable',     
            'web' => 'string|nullable',     
        ]); 
       
        $location = Location::find($id); 
        if ( Gate::denies('geo-location-edit', $location) ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $location->update([
            'status' => $request['status'],     
            'name' => $request['name'],     
            'order' => $request['order'],     
            'native_name' => $request['native_name'],     
            'lat' => $request['lat'],     
            'long' => $request['long'],     
            'web' => $request['web'],     
        ]);
    }

    public function destroy($id) {  
        $ids = explode(',', $id);
        foreach ($ids as $id) {
            $mt_location = Location::find($id); 
            if ( Gate::denies('geo-location-delete', $mt_location) ) {
                abort(403, 'Sorry! You do not have permission');
            }
        } 
        return Location::destroy( $ids );
    }
}
