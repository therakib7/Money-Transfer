<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;
 
use App\Models\UserChangeHistory; 

class ChangeHistoryController extends Controller {

    public function index( Request $request ) {  

        if ( Gate::denies('user-view') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $this->validate($request, [    
            'page' => 'integer|nullable', 
            'user_id' => 'integer|nullable',   
            'old' => 'string|nullable',   
            'new' => 'string|nullable',   
            'date_from' => 'date_format:d-m-Y h:i a|nullable',         
            'date_to' => 'date_format:d-m-Y h:i a|nullable', 
            'order_by' => 'integer|nullable',         
        ]); 

        $userchangehistories = new UserChangeHistory; 

        if ( !$request->order_by ) {
            $userchangehistories = $userchangehistories->orderBy('id', 'DESC');  
        }

        $userchangehistories = $userchangehistories->with('user:id,username,name,email,mobile');  

        if ( $user_id = $request->user_id ) { 
            $userchangehistories = $userchangehistories->where('user_id', $user_id); 
        }

        if ( $old = $request->old ) {
            $referralcommissions = $referralcommissions->where('old', $old); 
        } 

        if ( $new = $request->new ) {
            $referralcommissions = $referralcommissions->where('new', $new); 
        } 
 
        if ( $date_from = $request->date_from ) {
            $userchangehistories = $userchangehistories->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $userchangehistories = $userchangehistories->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }   

        $userchangehistories = $userchangehistories->paginate( $request->per_page ); 

        return compact('userchangehistories');
    } 

    public function store(Request $request) { }  

    public function update(Request $request, $id) { } 
    
    public function destroy( $id ) { }
}
