<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use Modules\MT\Models\UserLimit;
use Modules\MT\Models\Role; 
use Illuminate\Support\Facades\DB;

class UserLimitController extends Controller {

    public function index( Request $request ) {  

        if ( Gate::denies('commission-custom-user-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [   
            'page' => 'integer|nullable',    
            'user_id' => 'integer|nullable',     
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',    
            'order_by' => 'integer|nullable',     
        ]); 

        $user_limits = new UserLimit; 

        if ( !$request->order_by ) {
            $user_limits = $user_limits->orderBy('id', 'DESC');  
        }

        if ( $user_id = $request->user_id ) { 
            $user_limits = $user_limits->where('user_id', $user_id);
        } 

        if ( $date_from = $request->date_from ) { 
            $user_limits = $user_limits->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $user_limits = $user_limits->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }    

        $user_limits = $user_limits->paginate( $request->per_page );  

        return compact('user_limits');
    } 

    public function store(Request $request) {
        
        if ( Gate::denies('commission-custom-user-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [   
            'username' => 'array|required',  
            'username.id' => 'required|integer|unique:mt_commission_users,user_id',               
            'status' => 'boolean|required',   

            'mobile_recharge' => 'numeric|nullable',                 
            'mobile_recharge_pl' => 'numeric|nullable',  
            'mobile_banking' => 'numeric|nullable',  
            'utility_bill_pay' => 'numeric|nullable',  

            'mobile_recharge_service' => 'array|nullable',    
            'mobile_recharge_service.*.provider_id' => 'array|nullable',            
            'mobile_recharge_service.*.service_id' => 'integer|nullable',            
            'mobile_recharge_service.*.commission' => 'numeric|nullable',            
            'mobile_recharge_service.*.from_service' => 'numeric|nullable',   

            'mobile_recharge_pl_service' => 'array|nullable',  
            'mobile_recharge_pl_service.*.provider_id' => 'array|nullable',            
            'mobile_recharge_pl_service.*.service_id' => 'integer|nullable',            
            'mobile_recharge_pl_service.*.commission' => 'numeric|nullable',            
            'mobile_recharge_pl_service.*.from_service' => 'numeric|nullable',  

            'mobile_banking_service' => 'array|nullable',    
            'mobile_banking_service.*.provider_id' => 'array|nullable',            
            'mobile_banking_service.*.service_id' => 'integer|nullable',            
            'mobile_banking_service.*.commission' => 'numeric|nullable',            
            'mobile_banking_service.*.from_service' => 'numeric|nullable', 

            'utility_bill_apy_service' => 'array|nullable',    
            'utility_bill_apy_service.*.provider_id' => 'array|nullable',            
            'utility_bill_apy_service.*.service_id' => 'integer|nullable',            
            'utility_bill_apy_service.*.commission' => 'numeric|nullable',            
            'utility_bill_apy_service.*.from_service' => 'numeric|nullable', 

        ]);  
        
        DB::transaction( function() use ($request) {          

            $commission_user = []; 

            if ( $request->mobile_recharge ) {
                $commission_user[] = [
                    'user_id' => $request->username['id'],
                    'commission' => $request->mobile_recharge,  
                    'type' => 'mobile_recharge',
                    'updated_by' => Auth::id(), 
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ];
            }
             
            if ( $request->mobile_recharge_pl ) {
                $commission_user[] = [
                    'user_id' => $request->username['id'],
                    'commission' => $request->mobile_recharge_pl,  
                    'type' => 'mobile_recharge_pl', 
                    'updated_by' => Auth::id(), 
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]; 
            }
             
            if ( $request->mobile_banking ) {
                $commission_user[] = [
                    'user_id' => $request->username['id'],
                    'commission' => $request->mobile_banking,  
                    'type' => 'mobile_banking', 
                    'updated_by' => Auth::id(), 
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ];
            }
            
            if ( $request->utility_bill_pay ) {
                $commission_user[] = [
                    'user_id' => $request->username['id'],
                    'commission' => $request->utility_bill_pay,  
                    'type' => 'utility_bill_pay', 
                    'updated_by' => Auth::id(), 
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ];
            }            

            UserLimit::insert($commission_user); 

            $ser_com = [];
            $key_id = 0;
 
            foreach ($request->mobile_recharge_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'mobile_recharge'; 
                    $ser_com[$key_id]['updated_by'] = $request->user_id; 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }
            
            foreach ($request->mobile_recharge_pl_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'mobile_recharge_pl'; 
                    $ser_com[$key_id]['updated_by'] = Auth::id(); 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }

            foreach ($request->mobile_banking_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'mobile_banking'; 
                    $ser_com[$key_id]['updated_by'] = $request->user_id; 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }

            foreach ($request->utility_bill_pay_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'utility_bill_pay'; 
                    $ser_com[$key_id]['updated_by'] = $request->user_id; 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }
      
            if ( !empty( $ser_com ) ) {  
                UserLimitService::insert($ser_com);  
            } 

            UserLimitStatus::create([
                'user_id' => $request->username['id'],  
                'status' => $request->status,     
                'updated_by' => Auth::id(),  
            ]);       
        });  // db transection   
    }  

    public function update(Request $request, $id) {

        if ( Gate::denies('commission-custom-user-edit') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [                    
            'status' => 'boolean|required',   

            'mobile_recharge' => 'numeric|nullable',                 
            'mobile_recharge_pl' => 'numeric|nullable',  
            'mobile_banking' => 'numeric|nullable',  
            'utility_bill_pay' => 'numeric|nullable',  

            'mobile_recharge_service' => 'array|nullable',    
            'mobile_recharge_service.*.provider_id' => 'array|nullable',            
            'mobile_recharge_service.*.service_id' => 'integer|nullable',            
            'mobile_recharge_service.*.commission' => 'numeric|nullable',            
            'mobile_recharge_service.*.from_service' => 'numeric|nullable',   

            'mobile_recharge_pl_service' => 'array|nullable',  
            'mobile_recharge_pl_service.*.provider_id' => 'array|nullable',            
            'mobile_recharge_pl_service.*.service_id' => 'integer|nullable',            
            'mobile_recharge_pl_service.*.commission' => 'numeric|nullable',            
            'mobile_recharge_pl_service.*.from_service' => 'numeric|nullable',  

            'mobile_banking_service' => 'array|nullable',    
            'mobile_banking_service.*.provider_id' => 'array|nullable',            
            'mobile_banking_service.*.service_id' => 'integer|nullable',            
            'mobile_banking_service.*.commission' => 'numeric|nullable',            
            'mobile_banking_service.*.from_service' => 'numeric|nullable', 

            'utility_bill_apy_service' => 'array|nullable',    
            'utility_bill_apy_service.*.provider_id' => 'array|nullable',            
            'utility_bill_apy_service.*.service_id' => 'integer|nullable',            
            'utility_bill_apy_service.*.commission' => 'numeric|nullable',            
            'utility_bill_apy_service.*.from_service' => 'numeric|nullable',                
        ]); 

        DB::transaction( function() use ($request, $id) {    

            if ( $request->mobile_recharge ) {
                UserLimit::updateOrCreate(
                    [
                        'type' => 'mobile_recharge',  
                        'user_id' => $id,   
                    ],
                    [
                        'user_id' => $id, 
                        'type' => 'mobile_recharge',  
                        'commission' => $request->mobile_recharge, 
                        'updated_by' => Auth::id(),   
                    ]
                );
            }

            if ( $request->mobile_recharge_pl ) {
                UserLimit::updateOrCreate(
                    [
                        'type' => 'mobile_recharge_pl',  
                        'user_id' => $id,   
                    ],
                    [
                        'user_id' => $id, 
                        'type' => 'mobile_recharge_pl',  
                        'commission' => $request->mobile_recharge_pl, 
                        'updated_by' => Auth::id(),   
                    ]
                );
            } 

            if ( $request->mobile_banking ) {
                UserLimit::updateOrCreate(
                    [
                        'type' => 'mobile_banking',  
                        'user_id' => $id,   
                    ],
                    [
                        'user_id' => $id, 
                        'type' => 'mobile_banking',  
                        'commission' => $request->mobile_banking, 
                        'updated_by' => Auth::id(),   
                    ]
                );
            } 

            if ( $request->utility_bill_pay ) {
                UserLimit::updateOrCreate(
                    [
                        'type' => 'utility_bill_pay',  
                        'user_id' => $id,   
                    ],
                    [
                        'user_id' => $id, 
                        'type' => 'utility_bill_pay',  
                        'commission' => $request->utility_bill_pay, 
                        'updated_by' => Auth::id(),   
                    ]
                );
            }   

            UserLimitService::where('user_id', $id)->delete();

            $ser_com = [];
            $key_id = 0;

            foreach ($request->mobile_recharge_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'mobile_recharge'; 
                    $ser_com[$key_id]['updated_by'] = $request->user_id; 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }
            
            foreach ($request->mobile_recharge_pl_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'mobile_recharge_pl'; 
                    $ser_com[$key_id]['updated_by'] = Auth::id(); 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }

            foreach ($request->mobile_banking_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'mobile_banking'; 
                    $ser_com[$key_id]['updated_by'] = $request->user_id; 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }

            foreach ($request->utility_bill_pay_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'utility_bill_pay'; 
                    $ser_com[$key_id]['updated_by'] = $request->user_id; 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }
        
            if ( !empty( $ser_com ) ) {  
                UserLimitService::insert($ser_com);  
            }  

            UserLimitStatus::where('user_id', $id)->update([
                'status' => $request->status, 
                'updated_by' => Auth::id(), 
                'updated_at' => date('Y-m-d H:i:s')  
            ]);      
        });   
 
    } 
    
    public function destroy( $id ) {
        if ( Gate::denies('commission-custom-user-delete') ) {
            abort(403, 'Sorry! You do not have permission');
        }
        DB::transaction( function() use ($id) {
            $ids = explode(',', $id);   
            UserLimit::whereIn('user_id', $ids)->delete();
            UserLimitService::whereIn('user_id', $ids)->delete();
            UserLimitStatus::whereIn('user_id', $ids)->delete();
        }); 
    }
}
