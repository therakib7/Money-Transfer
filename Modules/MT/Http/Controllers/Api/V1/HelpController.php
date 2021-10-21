<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use Modules\MT\Models\MtHelp; 
use Modules\MT\Models\MtTaxonomy;
use App\Models\Role; 
use Modules\MT\Models\MtHelpRole; 
use App\Models\UserHasRole;

class HelpController extends Controller {

    public function userIndex( Request $request ) {  

        $this->validate($request, [       
            'page' => 'integer|nullable', 
            'cat_id' => 'string|nullable',      
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',   
            'post_id' => 'integer|nullable',      
            'order_by' => 'integer|nullable',      
            'search' => 'string|nullable',      
        ]); 

        $auth_role = UserHasRole::where('user_id', Auth::id())->first('role_id');  
        /* Role id 0 means all role */
        $help_role = MtHelpRole::whereIn('role_id', [$auth_role->role_id, 0] )->get(['type','id'])->groupBy('type');  

        $role_cat_ids = [];

        if ( isset( $help_role['cat'] ) ) {
           $cat_collection = collect($help_role['cat']);
           $cat_plucked = $cat_collection->pluck('id');
           $role_cat_ids = $cat_plucked->all(); 
        }
        
        $role_help_ids = [];
        if ( isset( $help_role['help'] ) ) {
            $help_collection = collect($help_role['help']);
            $help_plucked = $help_collection->pluck('id');
            $role_help_ids = $help_plucked->all();
        }         

        $helps = new MtHelp;  
        $single_post = ( $request->post_id ) ? true : false;

        if ( $search = $request->search ) {
            $searches = explode(' ', $search);

            $helps = $helps->where( function ($query) use($searches) {
                foreach($searches as $search) {
                    $query->orWhere('title', 'LIKE', '%' . $search . '%');
                }
            }); 
        }

        $helps = $helps->where('status', 1 );
        $helps = $helps->orderBy( DB::raw('-`order`'), 'desc' );
        $helps = $helps->orderBy('updated_at', 'desc');

        $cat_ids = $request->cat_id;
        if ( array_filter( explode(',', $cat_ids) ) && !$request->search ) {
            $helps = $helps->withAndWhereHas('categories', function($query) use ($cat_ids) { 
                $query->whereIn('mt_taxonomy_id', explode(',', $cat_ids ));
            }); 
        }

        if ( $single_post ) {
            $helps = $helps->with( 'categories' );
        }

        if ( isset( $help_role['help'] ) ) {
            $helps = $helps->whereIn( 'id', $role_help_ids );
        }

        if ( $date_from = $request->date_from ) { 
            $helps = $helps->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $helps = $helps->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        } 

        if ( $post_id = $request->post_id ) { 
            if ( !$request->search ) {
                $helps = $helps->where('id', $post_id );
            }
        } else { 
            $helps = $helps->select('id', 'title');
        }

        $helps = $helps->paginate( $request->per_page ); 
        
        $helpcats = MtTaxonomy::where('taxonomy', 'help-category')->whereIn( 'id', $role_cat_ids )->where('parent_id', null) 
        ->orderBy( DB::raw('-`order`'), 'desc' )
        ->orderBy('updated_at', 'desc')
        ->with([ 
            'childs' => function ($query) use ($role_cat_ids) {
                $query->whereIn( 'id', $role_cat_ids );  
                $query->orderBy( DB::raw('-`order`'), 'desc' );
                $query->orderBy('updated_at', 'desc');                
            },  
            'childs.childs' => function ($query) use ($role_cat_ids) {
                $query->whereIn( 'id', $role_cat_ids );  
                $query->orderBy( DB::raw('-`order`'), 'desc' );
                $query->orderBy('updated_at', 'desc');                
            },  
        ])
        ->get(); 

        $related_helps = [];
        if ( $single_post && !empty( $helps->toArray()['data'] ) ) {
            $related_helps = new MtHelp;   
            $related_helps = $related_helps->where('status', 1 );
            $related_helps = $related_helps->select('id', 'title');
            $related_helps = $related_helps->where('id', '!=', $helps->toArray()['data'][0]['id'] );
            $related_helps = $related_helps->orderBy( DB::raw('-`order`'), 'desc' );
            $cat_id = $helps->toArray()['data'][0]['categories'][0]['id'];
            $related_helps = $related_helps->whereHas('categories', function($query) use ($cat_id) { 
                $query->where('mt_taxonomy_id', $cat_id );
            });
            $related_helps = $related_helps->limit(10);  
            $related_helps = $related_helps->get();  
        }
       
        $prev_help = '';
        $next_help = '';
        if ( $single_post && !empty( $helps->toArray()['data'] ) ) {             
            $prev_help = MtHelp::where('order', '<', $helps->toArray()['data'][0]['order'])->orderBy('order','desc')->first(['id', 'title']);
            $next_help = MtHelp::where('order', '>', $helps->toArray()['data'][0]['order'])->first(['id', 'title']); 
        } 

        return compact('helps', 'helpcats', 'related_helps', 'prev_help', 'next_help');
    }

    public function index( Request $request ) { 

        if ( Gate::denies('help-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [      
            'title' => 'string|nullable',      
            'category' => 'string|nullable',      
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',   
            'order_by' => 'integer|nullable',      
        ]); 

        $helps = new MtHelp; 

        $helps = $helps->orderBy( DB::raw('-`order`'), 'desc' );
        $helps = $helps->orderBy('updated_at', 'desc');

        if ( !$request->order_by ) {
            $helps = $helps->orderBy('id', 'DESC');  
        } 

        if ( $title = $request->title ) {
            $titles = explode(' ', $title);
            $helps = $helps->where( function ($query) use($titles) {
                foreach($titles as $title) {
                    $query->orWhere('title', 'LIKE', '%' . $title . '%');
                }
            }); 
        }
 
        $helps = $helps->with('categories', 'roles');

        $cat_ids = $request->category;
        if ( array_filter( explode(',', $cat_ids) ) ) {
            $helps = $helps->withAndWhereHas('categories', function($query) use ($cat_ids) { 
                $query->whereIn('mt_taxonomy_id', explode(',', $cat_ids ));
            }); 
        }

        if ( $date_from = $request->date_from ) { 
            $helps = $helps->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $helps = $helps->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }  

        $helps = $helps->paginate( $request->per_page ); 
 
        $helpcats = MtTaxonomy::lists('help-category'); 
        
        $roles = Role::all(['id', 'name']);     
        $roles[] = [ 'id' => 0, 'name' => 'All' ];   

        return compact('helps', 'helpcats', 'roles'); 
    } 

    public function store(Request $request) {

        if ( Gate::denies('help-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'status' => 'boolean|required', 
            'title' => 'string|required',             
            'basic_video' => 'string|nullable',               
            'basic_text' => 'string|nullable',  
            'medium_video' => 'string|nullable',               
            'medium_text' => 'string|nullable',  
            'advance_video' => 'string|nullable',               
            'advance_text' => 'string|nullable',           
            'categories' => 'array|required', 
            'roles' => 'array|required',    
            'order' => 'integer|nullable|min:1',        
        ]);  
        
        $slug = ($request->slug) ? $request->slug : str_slug($request->title);
        $max_order = MtHelp::max('order');
        $order = ($request->order) ? $request->order : $max_order+20;

        $help = MtHelp::create([
            'status' => $request->status, 
            'title' => $request->title,  
            'slug' => $slug,  
            'basic_video' => $request->basic_video,  
            'basic_text' => $request->basic_text,  
            'medium_video' => $request->medium_video,  
            'medium_text' => $request->medium_text,  
            'advance_video' => $request->advance_video,  
            'advance_text' => $request->advance_text, 
            'user_id' => Auth::id(), 
            'order' => $order,
        ]); 

        if ( $request->categories ) {
            $help_cats = [];
            foreach ($request->categories as $category) {
                $help_cats[] = $category['id'];
            } 
            if ( $request->cat_id ) {
                $help_cats[] = $request->cat_id['id']; 
            }
            $help->categories()->attach( $help_cats ); 
        }

        if ( isset( $request->roles ) ) { 
            $help_role = []; 
            foreach ($request->roles as $key => $value ) {   
                $help_role[$key]['role_id'] = $value['id'];  
                $help_role[$key]['type'] = 'help'; 
                $help_role[$key]['id'] = $help->id;  
            }  
            MtHelpRole::insert($help_role);  
        } 

    }  

    public function update(Request $request, $id) { 

        $this->validate($request, [
            'status' => 'boolean|required', 
            'title' => 'string|required',             
            'slug' => 'string|required',             
            'basic_video' => 'string|nullable',               
            'basic_text' => 'string|nullable',  
            'medium_video' => 'string|nullable',               
            'medium_text' => 'string|nullable',  
            'advance_video' => 'string|nullable',               
            'advance_text' => 'string|nullable',                   
            'categories' => 'array|required', 
            'roles' => 'array|required',   
            'order' => 'integer|required|min:1',           
        ]);  

        $help = MtHelp::find($id); 
        if ( Gate::denies('help-edit', $help) ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $slug = ($request->slug) ? $request->slug : str_slug($request->name);

        $help->update([
            'status' => $request->status, 
            'title' => $request->title,  
            'slug' => $slug,  
            'basic_video' => $request->basic_video,  
            'basic_text' => $request->basic_text,  
            'medium_video' => $request->medium_video,  
            'medium_text' => $request->medium_text,  
            'advance_video' => $request->advance_video,  
            'advance_text' => $request->advance_text, 
            'order' => $request->order,
        ]);

        if ( $request->categories ) {
            $help_cats = [];
            foreach ($request->categories as $category) {
                $help_cats[] = $category['id'];
            } 
            if ( $request->cat_id ) {
                $help_cats[] = $request->cat_id['id']; 
            }
            $help->categories()->sync( $help_cats ); 
        }

        if ( isset( $request->roles ) ) {
            MtHelpRole::where('id', $help->id)->where('type', 'help')->delete();
            $help_role = []; 
            foreach ($request->roles as $key => $value ) {   
                $help_role[$key]['role_id'] = $value['id'];  
                $help_role[$key]['type'] = 'help'; 
                $help_role[$key]['id'] = $help->id;  
            }  
            MtHelpRole::insert($help_role);  
        } 

    } 

    public function destroy( $id ) { 
        DB::transaction( function() use ($id) {
            $ids = explode(',', $id);
            foreach ($ids as $id) {
                $help = MtHelp::find($id); 
                if ( Gate::denies('help-delete', $help) ) {
                    abort(403, 'Sorry! You do not have permission');
                }   
                $help->categories()->detach(); 
                $help->delete();
            }   
        });
    }
}
