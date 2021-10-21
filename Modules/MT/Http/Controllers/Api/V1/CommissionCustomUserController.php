<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use Modules\MT\Models\MtCommissionUser;
use Modules\MT\Models\MtCommissionUserService;
use Modules\MT\Models\MtCommissionUserStatus;
use Modules\MT\Models\MtProvider;  
use Modules\MT\Models\MtService;  
use Modules\MT\Models\MtTaxonomy;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CommissionCustomUserController extends Controller {

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

        $commissionusers = new MtCommissionUser; 

        if ( !$request->order_by ) {
            $commissionusers = $commissionusers->orderBy('id', 'DESC');  
        }

        if ( $user_id = $request->user_id ) { 
            $commissionusers = $commissionusers->where('user_id', $user_id);
        }
        
        $commissionusers = $commissionusers->groupBy('user_id');  
        $commissionusers = $commissionusers->with('user:id,username,name,mobile,email', 'services', 'commissions', 'status'); 

        if ( $date_from = $request->date_from ) { 
            $commissionusers = $commissionusers->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $commissionusers = $commissionusers->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }    

        $commissionusers = $commissionusers->paginate( $request->per_page ); 

        $providers = MtProvider::where('status', 1)->with('services', 'categories')->get(); 

        return compact('commissionusers', 'providers');
    } 

    public function store(Request $request) {
        
        if ( Gate::denies('commission-custom-user-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [   
            'username' => 'array|required',  
            'username.id' => 'required|integer|unique:mt_commission_users,user_id',               
            'status' => 'boolean|required',   

            'mr' => 'numeric|nullable',                 
            'mr_pl' => 'numeric|nullable',  
            'mb' => 'numeric|nullable',  
            'ubp' => 'numeric|nullable',  

            'mr_service' => 'array|nullable',    
            'mr_service.*.provider_id' => 'array|nullable',            
            'mr_service.*.service_id' => 'integer|nullable',            
            'mr_service.*.commission' => 'numeric|nullable',            
            'mr_service.*.from_service' => 'numeric|nullable',   

            'mr_pl_service' => 'array|nullable',  
            'mr_pl_service.*.provider_id' => 'array|nullable',            
            'mr_pl_service.*.service_id' => 'integer|nullable',            
            'mr_pl_service.*.commission' => 'numeric|nullable',            
            'mr_pl_service.*.from_service' => 'numeric|nullable',  

            'mb_service' => 'array|nullable',    
            'mb_service.*.provider_id' => 'array|nullable',            
            'mb_service.*.service_id' => 'integer|nullable',            
            'mb_service.*.commission' => 'numeric|nullable',            
            'mb_service.*.from_service' => 'numeric|nullable', 

            'ubp_service' => 'array|nullable',    
            'ubp_service.*.provider_id' => 'array|nullable',            
            'ubp_service.*.service_id' => 'integer|nullable',            
            'ubp_service.*.commission' => 'numeric|nullable',            
            'ubp_service.*.from_service' => 'numeric|nullable', 

        ]);  
        
        DB::transaction( function() use ($request) {          

            $commission_user = []; 

            if ( $request->mr ) {
                $commission_user[] = [
                    'user_id' => $request->username['id'],
                    'commission' => $request->mr,  
                    'type' => 'mr',
                    'updated_by' => Auth::id(), 
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ];
            }
             
            if ( $request->mr_pl ) {
                $commission_user[] = [
                    'user_id' => $request->username['id'],
                    'commission' => $request->mr_pl,  
                    'type' => 'mr_pl', 
                    'updated_by' => Auth::id(), 
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]; 
            }
             
            if ( $request->mb ) {
                $commission_user[] = [
                    'user_id' => $request->username['id'],
                    'commission' => $request->mb,  
                    'type' => 'mb', 
                    'updated_by' => Auth::id(), 
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ];
            }
            
            if ( $request->ubp ) {
                $commission_user[] = [
                    'user_id' => $request->username['id'],
                    'commission' => $request->ubp,  
                    'type' => 'ubp', 
                    'updated_by' => Auth::id(), 
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ];
            }            

            MtCommissionUser::insert($commission_user); 

            $ser_com = [];
            $key_id = 0;
 
            foreach ($request->mr_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'mr'; 
                    $ser_com[$key_id]['updated_by'] = $request->user_id; 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }
            
            foreach ($request->mr_pl_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'mr_pl'; 
                    $ser_com[$key_id]['updated_by'] = Auth::id(); 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }

            foreach ($request->mb_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'mb'; 
                    $ser_com[$key_id]['updated_by'] = $request->user_id; 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }

            foreach ($request->ubp_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'ubp'; 
                    $ser_com[$key_id]['updated_by'] = $request->user_id; 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }
      
            if ( !empty( $ser_com ) ) {  
                MtCommissionUserService::insert($ser_com);  
            } 

            MtCommissionUserStatus::create([
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

            'mr' => 'numeric|nullable',                 
            'mr_pl' => 'numeric|nullable',  
            'mb' => 'numeric|nullable',  
            'ubp' => 'numeric|nullable',  

            'mr_service' => 'array|nullable',    
            'mr_service.*.provider_id' => 'array|nullable',            
            'mr_service.*.service_id' => 'integer|nullable',            
            'mr_service.*.commission' => 'numeric|nullable',            
            'mr_service.*.from_service' => 'numeric|nullable',   

            'mr_pl_service' => 'array|nullable',  
            'mr_pl_service.*.provider_id' => 'array|nullable',            
            'mr_pl_service.*.service_id' => 'integer|nullable',            
            'mr_pl_service.*.commission' => 'numeric|nullable',            
            'mr_pl_service.*.from_service' => 'numeric|nullable',  

            'mb_service' => 'array|nullable',    
            'mb_service.*.provider_id' => 'array|nullable',            
            'mb_service.*.service_id' => 'integer|nullable',            
            'mb_service.*.commission' => 'numeric|nullable',            
            'mb_service.*.from_service' => 'numeric|nullable', 

            'ubp_service' => 'array|nullable',    
            'ubp_service.*.provider_id' => 'array|nullable',            
            'ubp_service.*.service_id' => 'integer|nullable',            
            'ubp_service.*.commission' => 'numeric|nullable',            
            'ubp_service.*.from_service' => 'numeric|nullable',                
        ]); 

        DB::transaction( function() use ($request, $id) {    

            if ( $request->mr ) {
                MtCommissionUser::updateOrCreate(
                    [
                        'type' => 'mr',  
                        'user_id' => $id,   
                    ],
                    [
                        'user_id' => $id, 
                        'type' => 'mr',  
                        'commission' => $request->mr, 
                        'updated_by' => Auth::id(),   
                    ]
                );
            }

            if ( $request->mr_pl ) {
                MtCommissionUser::updateOrCreate(
                    [
                        'type' => 'mr_pl',  
                        'user_id' => $id,   
                    ],
                    [
                        'user_id' => $id, 
                        'type' => 'mr_pl',  
                        'commission' => $request->mr_pl, 
                        'updated_by' => Auth::id(),   
                    ]
                );
            } 

            if ( $request->mb ) {
                MtCommissionUser::updateOrCreate(
                    [
                        'type' => 'mb',  
                        'user_id' => $id,   
                    ],
                    [
                        'user_id' => $id, 
                        'type' => 'mb',  
                        'commission' => $request->mb, 
                        'updated_by' => Auth::id(),   
                    ]
                );
            } 

            if ( $request->ubp ) {
                MtCommissionUser::updateOrCreate(
                    [
                        'type' => 'ubp',  
                        'user_id' => $id,   
                    ],
                    [
                        'user_id' => $id, 
                        'type' => 'ubp',  
                        'commission' => $request->ubp, 
                        'updated_by' => Auth::id(),   
                    ]
                );
            }   

            MtCommissionUserService::where('user_id', $id)->delete();

            $ser_com = [];
            $key_id = 0;

            foreach ($request->mr_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'mr'; 
                    $ser_com[$key_id]['updated_by'] = $request->user_id; 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }
            
            foreach ($request->mr_pl_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'mr_pl'; 
                    $ser_com[$key_id]['updated_by'] = Auth::id(); 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }

            foreach ($request->mb_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'mb'; 
                    $ser_com[$key_id]['updated_by'] = $request->user_id; 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }

            foreach ($request->ubp_service as $service) {
                if ( $service['service_id'] ) { // if service id selected
                    $ser_com[$key_id]['user_id'] =      $id; 
                    $ser_com[$key_id]['provider_id'] =   $service['provider_id']['id'];
                    $ser_com[$key_id]['service_id'] =   $service['service_id']; 
                    $ser_com[$key_id]['commission'] =   $service['commission']; 
                    $ser_com[$key_id]['from_service'] = $service['from_service']; 
                    $ser_com[$key_id]['type'] = 'ubp'; 
                    $ser_com[$key_id]['updated_by'] = $request->user_id; 
                    $ser_com[$key_id]['created_at'] = date('Y-m-d H:i:s'); 
                    $ser_com[$key_id]['updated_at'] = date('Y-m-d H:i:s'); 
                    $key_id++;
                }
            }
        
            if ( !empty( $ser_com ) ) {  
                MtCommissionUserService::insert($ser_com);  
            }  

            MtCommissionUserStatus::where('user_id', $id)->update([
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
            MtCommissionUser::whereIn('user_id', $ids)->delete();
            MtCommissionUserService::whereIn('user_id', $ids)->delete();
            MtCommissionUserStatus::whereIn('user_id', $ids)->delete();
        }); 
    }
}
