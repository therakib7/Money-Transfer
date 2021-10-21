<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon; 
use Illuminate\Support\Facades\Auth;

use App\Models\Role; 
use App\Models\Permission;
use Cache; 

class RoleController extends Controller {

    public function index(Request $request) {   

        if ( Gate::denies('user-role-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }
        
        $this->validate($request, [    
            'page' => 'integer|nullable',               
            'title' => 'string|nullable',  
            'desc' => 'string|nullable',  
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',  
            'order_by' => 'integer|nullable',                      
        ]); 

        $roles = new Role;

        if ( !$request->order_by ) {
            $roles = $roles->orderBy('id', 'DESC');  
        }

        $roles = $roles->with('permissions'); 

        if ( $date_from = $request->date_from ) {    
            $roles = $roles->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {    
            $roles = $roles->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }        

        if ( $id = $request->id ) {
            $roles = $roles->where('id', $id); 
        }   

        /* Exlcude Column when needed */
        //$roles = $roles->exclude('created_at');

        if ( $title = $request->title ) {
            $titles = explode(' ', $title);

            $roles = $roles->where( function ($query) use($titles) {
                foreach($titles as $title) {
                    $query->orWhere('title', 'LIKE', '%' . $title . '%');
                }
            }); 
        } 

        if ( $desc = $request->desc ) {
            $descs = explode(' ', $desc);

            $roles = $roles->where( function ($query) use($descs) {
                foreach($descs as $desc) {
                    $query->orWhere('desc', 'LIKE', '%' . $desc . '%');
                }
            }); 
        } 

        $roles = $roles->paginate( $request->per_page ); 
        $permissions = Permission::where('parent_id', null)->with('childs')->get(); 
        return compact('roles', 'permissions');
    }

    public function store(Request $request) { 

        if ( Gate::denies('user-role-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'name' => 'string|required',     
            'desc' => 'string|required',     
            'permission' => 'array|required',     
        ]);  

        $slug = str_slug($request->name);
        $role = Role::create([
            'name' => $request->name, 
            'slug' => $slug, 
            'desc' => $request->desc, 
            'user_id' => Auth::id(),    
        ]); 

        $permissions = [];
        foreach ($request->permission as $key => $value) { 
            $permissions[$key]['role_id'] = $role->id;
            $permissions[$key]['permission_id'] = $value;
        }
        
        $role->permissions()->createMany( $permissions );  

        /* Add role permission in cache */
        $role_cache = new Role;
        $role_cache = $role_cache->with('permission'); 
        $role_cache = $role_cache->get(['id', 'slug']); 

        foreach ($role_cache as $per) { 
            $collection = collect($per['permission']); 
            $plucked = $collection->pluck('guard_name'); 

            Cache::forget('role_id_' . $per['slug']);

            Cache::rememberForever('role_id_' . $per['slug'], function() use ( $plucked ) { 
                return $plucked->all();
            });
        }  
    }

    public function update(Request $request, $id) {

        $role = Role::find($id);  
        if ( Gate::denies('user-role-edit', $role) ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'name' => 'string|required',     
            'desc' => 'string|required',     
            'permission' => 'array|required',    
        ]);  

        $role->name = $request->name;
        $role->desc = $request->desc; 
        $role->save(); 

        $permissions = [];
        foreach ($request->permission as $key => $value) { 
            $permissions[$key]['role_id'] = $role->id;
            $permissions[$key]['permission_id'] = $value;
        }

        $role->permissions()->delete();
        $role->permissions()->createMany( $permissions );

        /* Add role permission in cache */
        $role_cache = new Role;
        $role_cache = $role_cache->with('permission'); 
        $role_cache = $role_cache->get(['id', 'slug']); 

        foreach ($role_cache as $per) { 
            $collection = collect($per['permission']); 
            $plucked = $collection->pluck('guard_name'); 

            Cache::forget('role_id_' . $per['slug']);

            Cache::rememberForever('role_id_' . $per['slug'], function() use ( $plucked ) { 
                return $plucked->all();
            });
        }  
    }

    public function destroy( $id ) {
        DB::transaction( function() use ($id) {
            $ids = explode(',', $id);
            foreach ($ids as $id) {
                $role = Role::find($id); 
                if ( Gate::denies('user-role-delete', $role) ) {
                    abort(403, 'Sorry! You do not have permission');
                }
            }   
            Role::destroy( $ids );  
            RoleHasPermission::whereIn('role_id', $ids)->delete();  
        }); 
    }

}
