<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon; 
use Illuminate\Support\Str;
use App\Models\Permission;

class PermissionController extends Controller { 

    public function index(Request $request) { 

        if ( Gate::denies('user-permission-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }
        
        $this->validate($request, [    
            'page' => 'integer|nullable',               
            'name' => 'string|nullable',   
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',  
            'order_by' => 'integer|nullable',                      
        ]); 

        $permissions = new Permission; 
        
        if ( !$request->order_by ) {
            $permissions = $permissions->orderBy('id', 'DESC');  
        }

        if ( $date_from = $request->date_from ) {    
            $permissions = $permissions->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {    
            $permissions = $permissions->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        } 

        if ( $name = $request->name ) {
            $names = explode(' ', $name); 
            $permissions = $permissions->where( function ($query) use($names) {
                foreach($names as $name) {
                    $query->orWhere('name', 'LIKE', '%' . $name . '%');
                }
            }); 
        }

        $permissions = $permissions->get();
 
        $taxonomiesPaged = Permission::lists($permissions->toArray()); 

        $page_no = ! empty( $request->page ) ? (int) $request->page : 1; 
        $total = count( $taxonomiesPaged ); //total items in array    
        $limit = ! empty( $request->per_page ) ? (int) $request->per_page : 20; //per page    
        $totalPages = ceil( $total/ $limit ); //calculate total pages 
        $offset = ($page_no - 1) * $limit;
        if( $offset < 0 ) $offset = 0;

        $taxonomy = array_slice( $taxonomiesPaged, $offset, $limit );

        $from = ($offset + 1);

        $to = ( $from  - 1 ) + count($taxonomy);

        $prev_page = ($page_no > 1) ? true : false;
        $next_page = ($page_no < $totalPages) ? true : false;

        $taxonomies = [
            'off' => $offset,
            'lll' => $limit,
            'current_page' => $page_no,
            'data' => $taxonomy, 
            'data_all' => $taxonomiesPaged, // this is for select parent taxonomy
            'from' => $from,
            'last_page' => $totalPages,
            'per_page' => $limit,
            'to' => $to,
            'total' => $total,
            'prev_page_url' => $prev_page,
            'next_page_url' => $next_page,
        ];

        $taxonomies = ($taxonomy) ? $taxonomies : ['data' => '']; 
        return $taxonomies; 
    }

    public function store(Request $request) {

        if ( Gate::denies('user-permission-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'name' => 'string|required',     
            'group' => 'boolean|nullable',     
        ]);  
        $guard_name = ($request->guard_name) ? $request->guard_name : make_slug($request->name);
        $parent_id = ($request->parent_id['id']) ? $request->parent_id['id'] : null;
        if ( $request->group ) {
            $group_params = ['view' => 'View', 'create' => 'Create', 'edit' => 'Edit', 'delete' => 'Delete', 'super' => 'Super', 'top-super' => 'Top Super'];
            $group = Permission::create([
                'name' => Str::plural($request->name), 
                'guard_name' => Str::plural($guard_name),
                'parent_id' => null,  
            ]); 

            foreach ($group_params as $key => $value) {
                Permission::create([
                    'name' => $request->name.' '.$value, 
                    'guard_name' => $guard_name.'-'.$key,
                    'parent_id' => $group->id,  
                ]);
            }

        } else {
            return Permission::create([
                'name' => $request->name, 
                'guard_name' => $guard_name,
                'parent_id' => $parent_id,  
            ]); 
        } 
    } 

    public function update(Request $request, $id) {

        $permission = Permission::find($id);  
        if ( Gate::denies('user-permission-edit') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'name' => 'string|required',     
            'guard_name' => 'alpha_dash|required',     
        ]);  
        $parent_id = ($request->parent_id['id']) ? $request->parent_id['id'] : null; 

        $permission->name = $request->name;
        $permission->guard_name = $request->guard_name; 
        $permission->parent_id = $parent_id;
        $permission->save();
    }

    public function destroy($id) { 
        if ( Gate::denies('user-permission-delete') ) {
            abort(403, 'Sorry! You do not have permission');
        }
        return Permission::destroy( explode(',', $id) ); 
    } 

}
