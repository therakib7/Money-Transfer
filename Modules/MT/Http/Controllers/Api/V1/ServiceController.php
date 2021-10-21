<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;

use Modules\MT\Models\MtService; 
use Modules\MT\Models\MtServiceFee; 
use Modules\MT\Models\MtProvider; 

class ServiceController extends Controller {

    public function index( Request $request ) { 

        if ( Gate::denies('service-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [    
            'page' => 'integer|nullable',   
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',   
            'order_by' => 'integer|nullable',      
        ]); 

        $services = new MtService; 

        $services = $services->with('provider_id:id,name', 'service_fees');

        if ( !$request->order_by ) {
            $services = $services->orderBy('id', 'DESC');  
        }

        if ( $date_from = $request->date_from ) { 
            $services = $services->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $services = $services->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        } 

        $services = $services->paginate( $request->per_page );  

        $providers = MtProvider::where('status', '1')->get();  

        return compact('services', 'providers');
    } 

    public function store(Request $request) {

        if ( Gate::denies('service-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'status' => 'boolean|required',             
            'provider_id' => 'array|required',             
            'name' => 'string|required',             
            'slug' => 'string|nullable',             
            'operator_code' => 'string|required',             
            'min_amount' => 'integer|required',         
            'max_amount' => 'integer|required',          
            'co_com' => 'numeric|nullable',         
            'user_com' => 'numeric|nullable',  
            'service_fees.*.from' => 'numeric|nullable',
            'service_fees.*.to' => 'numeric|nullable',          
            'service_fees.*.co_fee' => 'numeric|nullable',          
            'service_fees.*.user_fee' => 'numeric|nullable',          
            'service_fees.*.percent' => 'boolean|nullable',          
        ]);  
        
        DB::transaction( function() use ( $request ) {
            $service = MtService::create([
                'status' => $request->status,
                'provider_id' => $request->provider_id['id'],  
                'name' => $request->name,  
                'slug' => ($request->slug) ? $request->slug : str_slug($request->name),   
                'operator_code' => $request->operator_code,  
                'min_amount' => $request->min_amount, 
                'max_amount' => $request->max_amount,
                'co_com' => $request->co_com, 
                'user_com' => $request->user_com, 
                'user_id' => Auth::id(),
            ]); 

            $service_fees = [];
            foreach ($request->service_fees as $fee) { 
                if ( $fee['from'] && $fee['to'] ) {
                    $service_fees[] = [
                        'service_id' => $service->id,  
                        'from' => $fee['from'], 
                        'to' => $fee['to'],  
                        'co_fee' => $fee['co_fee'],  
                        'user_fee' => $fee['user_fee'],  
                        'percent' => $fee['percent'],  
                        'user_id' => Auth::id(),
                    ]; 
                } 
            }   

            MtServiceFee::insert($service_fees); 

        }); // end DB Transection
    }  

    public function update(Request $request, $id) { 

        $service = MtService::find($id); 
        if ( Gate::denies('service-edit', $service) ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'status' => 'boolean|required',             
            'provider_id' => 'array|required',             
            'name' => 'string|required',             
            'slug' => 'string|required',             
            'operator_code' => 'string|required',             
            'min_amount' => 'integer|required',         
            'max_amount' => 'integer|required',           
            'co_com' => 'required|numeric',         
            'user_com' => 'required|numeric', 
            'service_fees.*.from' => 'numeric|nullable',
            'service_fees.*.to' => 'numeric|nullable',          
            'service_fees.*.co_fee' => 'numeric|nullable',          
            'service_fees.*.user_fee' => 'numeric|nullable',          
            'service_fees.*.percent' => 'boolean|nullable',        
        ]);    

        DB::transaction( function() use ( $request, $service, $id ) {

            $service->update([
                'status' => $request->status,
                'provider_id' => $request->provider_id['id'],   
                'name' => $request->name,  
                'slug' => $request->slug,  
                'operator_code' => $request->operator_code,
                'min_amount' => $request->min_amount, 
                'max_amount' => $request->max_amount, 
                'co_com' => $request->co_com, 
                'user_com' => $request->user_com,   
            ]); 

            MtServiceFee::where('service_id', $id)->delete();

            $service_fees = [];
            foreach ($request->service_fees as $fee) { 
                if ( $fee['from'] && $fee['to'] ) {
                    $service_fees[] = [
                        'service_id' => $service->id,  
                        'from' => $fee['from'], 
                        'to' => $fee['to'],  
                        'co_fee' => $fee['co_fee'],  
                        'user_fee' => $fee['user_fee'],  
                        'percent' => $fee['percent'],  
                        'user_id' => Auth::id(),
                    ]; 
                } 
            }   

            MtServiceFee::insert($service_fees);

        }); // end DB Transection
    } 

    public function destroy( $id ) { 
        $ids = explode(',', $id);
        foreach ($ids as $id) {
            $service = MtService::find($id); 
            if ( Gate::denies('service-delete', $service) ) {
                abort(403, 'Sorry! You do not have permission');
            }
        } 
        MtServiceFee::whereIn('service_id', $ids)->delete(); 
        MtService::destroy( $ids ); 
    }
}
