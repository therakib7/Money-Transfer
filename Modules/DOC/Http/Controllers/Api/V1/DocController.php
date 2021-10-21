<?php

namespace Modules\DOC\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use Modules\DOC\Models\Doc; 
use Modules\DOC\Models\Taxonomy; 

class DocController extends Controller { 

    public function index( Request $request ) { 

        if ( Gate::denies('doc-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [      
            'title' => 'string|nullable',      
            'category' => 'string|nullable',      
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',   
            'order_by' => 'integer|nullable',      
        ]); 

        $docs = new Doc; 

        $docs = $docs->orderBy( DB::raw('-`order`'), 'desc' );
        $docs = $docs->orderBy('updated_at', 'desc');

        if ( !$request->order_by ) {
            $docs = $docs->orderBy('id', 'DESC');  
        } 

        if ( $title = $request->title ) {
            $titles = explode(' ', $title);
            $docs = $docs->where( function ($query) use($titles) {
                foreach($titles as $title) {
                    $query->orWhere('title', 'LIKE', '%' . $title . '%');
                }
            }); 
        }
 
        $docs = $docs->with('categories');

        $cat_ids = $request->category;
        if ( array_filter( explode(',', $cat_ids) ) ) {
            $docs = $docs->withAndWhereHas('categories', function($query) use ($cat_ids) { 
                $query->whereIn('mt_taxonomy_id', explode(',', $cat_ids ));
            }); 
        }

        if ( $date_from = $request->date_from ) { 
            $docs = $docs->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $docs = $docs->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }  

        $docs = $docs->paginate( $request->per_page ); 
 
        $doccats = Taxonomy::lists('doc-category');    

        return compact('docs', 'doccats'); 
    } 

    public function store(Request $request) {

        if ( Gate::denies('doc-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'status' => 'boolean|required', 
            'title' => 'string|required',             
            'content' => 'string|nullable', 
            'order' => 'integer|nullable|min:1',        
        ]);  
        
        $slug = ($request->slug) ? $request->slug : str_slug($request->title);
        $max_order = Doc::max('order');
        $order = ($request->order) ? $request->order : $max_order+20;

        $doc = Doc::create([
            'status' => $request->status, 
            'title' => $request->title,  
            'slug' => $slug,  
            'content' => $request->content,   
            'user_id' => Auth::id(), 
            'order' => $order,
        ]); 

        if ( $request->categories ) {
            $doc_cats = [];
            foreach ($request->categories as $category) {
                $doc_cats[] = $category['id'];
            }  
            $doc->categories()->attach( $doc_cats ); 
        } 

    }  

    public function update(Request $request, $id) { 

        $this->validate($request, [
            'status' => 'boolean|required', 
            'title' => 'string|required',             
            'slug' => 'string|required',             
            'content' => 'string|nullable',  
            'order' => 'integer|required|min:1',           
        ]);  

        $doc = Doc::find($id); 
        if ( Gate::denies('doc-edit', $doc) ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $slug = ($request->slug) ? $request->slug : str_slug($request->name);

        $doc->update([
            'status' => $request->status, 
            'title' => $request->title,  
            'slug' => $slug,  
            'content' => $request->content,  
            'order' => $request->order,
        ]);

        if ( $request->categories ) {
            $doc_cats = [];
            foreach ($request->categories as $category) {
                $doc_cats[] = $category['id'];
            }  
            $doc->categories()->sync( $doc_cats ); 
        } 

    } 

    public function destroy( $id ) { 
        DB::transaction( function() use ($id) {
            $ids = explode(',', $id);
            foreach ($ids as $id) {
                $doc = Doc::find($id); 
                if ( Gate::denies('doc-delete', $doc) ) {
                    abort(403, 'Sorry! You do not have permission');
                }   
                $doc->categories()->detach(); 
                $doc->delete();
            }   
        });
    }
}
