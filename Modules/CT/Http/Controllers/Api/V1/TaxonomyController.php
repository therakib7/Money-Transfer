<?php

namespace Modules\CT\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;

use Modules\CT\Models\CtTaxonomy;

class TaxonomyController extends Controller { 

    public function index(Request $request, $tax_name) { 

        $this->validate($request, [ 
            'page' => 'integer|nullable',
            'name' => 'alpha_dash|nullable',  
            'date_from' => 'date_format:d-m-Y h:i a|nullable',         
            'date_to' => 'date_format:d-m-Y h:i a|nullable',
            'order_by' => 'integer|nullable',   
        ]);

        if ( Gate::denies('contact-taxonomy-view') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $categories = new CtTaxonomy;

        if ( !$request->order_by ) {
            $categories = $categories->orderBy('id', 'DESC');  
        }

        $categories = $categories->whereIn('user_id', [Auth::id(), 0] );
    
        $categories = $categories->where('taxonomy', 'contact-category');  

        if ( $name = $request->name ) {
            $names = explode(' ', $name);

            $categories = $categories->where( function ($query) use($names) {
                foreach($names as $name) {
                    $query->orWhere('name', 'LIKE', '%' . $name . '%');
                }
            }); 
        }

        if ( $date_from = $request->date_from ) { 
            $categories = $categories->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $categories = $categories->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }  

        $categories = $categories->get();
 
        $taxonomiesPaged = CtTaxonomy::buildArray($categories->toArray()); 

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

        $taxonomies = ($taxonomy) ? $taxonomies : ['data' => '', 'data_all' => '']; 
        return $taxonomies; 
    }

    public function store(Request $request) {

        if ( Gate::denies('contact-taxonomy-create') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $this->validate($request, [ 
            'name' => 'string|required', 
            'parent_id' => 'array|nullable',   
        ]);


        //$slug = ($request->slug) ? $request->slug : make_slug($request->name);

        $parent_id = ($request->parent_id['id']) ? $request->parent_id['id'] : null;
        return CtTaxonomy::create([
            'name' => $request->name, 
            //'slug' => $slug,
            'taxonomy' => 'contact-category',
            'parent_id' => $parent_id, 
            'user_id' => Auth::id(),  
        ]); 
    } 

    public function update(Request $request, $id) {

        $this->validate($request, [
            'name' => 'string|required',     
            //'slug' => 'string|nullable',  
            'parent_id' => 'array|nullable',      
        ]);  

        $taxonomy = CtTaxonomy::find($id); 
        if ( Gate::denies('contact-taxonomy-edit', $taxonomy) ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $parent_id = ($request->parent_id['id']) ? $request->parent_id['id'] : null;
        $taxonomy->update([
            'name' => $request->name, 
            //'slug' => $request->slug, 
            'parent_id' => $parent_id,     
        ]);
    }

    public function destroy($id) {  
        $ids = explode(',', $id);
        foreach ($ids as $id) {
            $mt_taxonomy = CtTaxonomy::find($id); 
            if ( Gate::denies('contact-taxonomy-delete', $mt_taxonomy) ) {
                abort(403, 'Sorry! You do not have permission');
            }
        } 
        return CtTaxonomy::destroy( $ids );
    }
}
