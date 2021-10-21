<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use Modules\MT\Models\MtRoleLimit;
use Modules\MT\Models\MtUserLimit;
use App\Models\Role;  

class LimitController extends Controller {

    public function index( Request $request ) {  

        if ( Gate::denies('commission-custom-user-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [   
            'page' => 'integer|nullable',    
            'limit_for' => 'string|required',    
            'user_id' => 'integer|nullable',     
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',    
            'order_by' => 'integer|nullable',     
        ]); 

        if ( $request->limit_for == 'role' ) {
            $limits = new MtRoleLimit; 
        } else {
            $limits = new MtUserLimit; 
        }
        

        if ( !$request->order_by ) {
            $limits = $limits->orderBy('id', 'DESC');  
        }

        if ( $request->limit_for == 'role' ) {
            $limits = $limits->groupBy('role_id');  
            $limits = $limits->select('role_id');  
            $limits = $limits->with('role:id,name', 'service_limits');
        } else {
            $limits = $limits->groupBy('user_id');  
            $limits = $limits->select('user_id', 'status');  
            $limits = $limits->with('user:id,name,mobile', 'service_limits'); 
        }

          

        if ( $user_id = $request->user_id ) { 
            $limits = $limits->where('user_id', $user_id);
        } 

        if ( $date_from = $request->date_from ) { 
            $limits = $limits->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $limits = $limits->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }    

        $limits = $limits->paginate( $request->per_page ); 

        $roles = Role::all(['id', 'name']);   

        return compact('limits', 'roles');
    } 

    public function store(Request $request) {
        
        if ( Gate::denies('commission-custom-user-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [   
            'limit_for' => 'string|required', 
            'role' => 'array|nullable', 
            'username' => 'array|nullable',  
            'username.id' => 'nullable|integer|unique:mt_user_limits,user_id',               
            'status' => 'boolean|nullable',    

            'service_limits' => 'array|nullable',    
            'service_limits.*.for' => 'integer|required',            
            'service_limits.*.max_amount_day' => 'numeric|nullable',            
            'service_limits.*.max_number_day' => 'integer|nullable',    
            'service_limits.*.max_amount_month' => 'numeric|nullable',            
            'service_limits.*.max_number_month' => 'integer|nullable',  
        ]);  
        
        $ser_limit = [];
        $key = 0;
        
        foreach ($request->service_limits as $service) { 
            if ( $request->limit_for == 'role' ) {
                $ser_limit[$key]['role_id'] = $request['role']['id'];
                $ser_limit[$key]['user_id'] = Auth::id(); 
            } else {
                $ser_limit[$key]['status'] = $request['status'];
                $ser_limit[$key]['user_id'] = $request['user']['id'];
                $ser_limit[$key]['created_by'] = Auth::id(); 
            }
            
            $ser_limit[$key]['max_amount_day'] = $service['max_amount_day']; 
            $ser_limit[$key]['max_number_day'] = $service['max_number_day']; 
            $ser_limit[$key]['max_amount_month'] = $service['max_amount_month']; 
            $ser_limit[$key]['max_number_month'] = $service['max_number_month'];
            $ser_limit[$key]['for'] = $service['for']; 
            $ser_limit[$key]['created_at'] = date('Y-m-d H:i:s'); 
            $ser_limit[$key]['updated_at'] = date('Y-m-d H:i:s'); 
            $key++;
        } 
        
        if ( !empty( $ser_limit ) ) {  
            if ( $request->limit_for == 'role' ) {
                MtRoleLimit::insert($ser_limit);   
            } else {
                MtUserLimit::insert($ser_limit);  
            } 
        } 

    }  

    public function update(Request $request, $id) {

        if ( Gate::denies('commission-custom-user-edit') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [   
            'limit_for' => 'string|required', 
            'role' => 'array|nullable', 
            'username' => 'array|nullable',  
            'username.id' => 'nullable|integer|unique:mt_user_limits,user_id',               
            'status' => 'boolean|nullable',    

            'service_limits' => 'array|nullable',    
            'service_limits.*.for' => 'integer|required',            
            'service_limits.*.max_amount_day' => 'numeric|nullable',            
            'service_limits.*.max_number_day' => 'integer|nullable',    
            'service_limits.*.max_amount_month' => 'numeric|nullable',            
            'service_limits.*.max_number_month' => 'integer|nullable',  
        ]);  
        
        $ser_limit = [];
        $key = 0;
        
        foreach ($request->service_limits as $service) { 
            if ( $request->limit_for == 'role' ) {
                $ser_limit[$key]['role_id'] = $request['role']['id'];
                $ser_limit[$key]['user_id'] = Auth::id(); 
            } else {
                $ser_limit[$key]['status'] = $request['status'];
                $ser_limit[$key]['user_id'] = $request['user']['id'];
                $ser_limit[$key]['created_by'] = Auth::id(); 
            }
            
            $ser_limit[$key]['max_amount_day'] = $service['max_amount_day']; 
            $ser_limit[$key]['max_number_day'] = $service['max_number_day']; 
            $ser_limit[$key]['max_amount_month'] = $service['max_amount_month']; 
            $ser_limit[$key]['max_number_month'] = $service['max_number_month'];
            $ser_limit[$key]['for'] = $service['for'];
            $ser_limit[$key]['created_at'] = date('Y-m-d H:i:s'); 
            $ser_limit[$key]['updated_at'] = date('Y-m-d H:i:s'); 
            $key++;
        }  
        
        if ( !empty( $ser_limit ) ) {  
            if ( $request->limit_for == 'role' ) {
                MtRoleLimit::where('role_id', $request['role']['id'])->delete();
                MtRoleLimit::insert($ser_limit);   
            } else {
                MtUserLimit::where('user_id', $request['user']['id'])->delete();
                MtUserLimit::insert($ser_limit);  
            } 
        }  
 
    } 
    
    public function destroy(Request $request, $id ) {
        if ( Gate::denies('commission-custom-user-delete') ) {
            abort(403, 'Sorry! You do not have permission');
        }
        
        $ids = explode(',', $id);   
        if ( $request->limit_for == 'role' ) {
            MtRoleLimit::whereIn('role_id', $ids)->delete(); 
        } else {
            MtUserLimit::whereIn('user_id', $ids)->delete(); 
        }  
    }
}
