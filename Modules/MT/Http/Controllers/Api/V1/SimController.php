<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

use Modules\MT\Models\MtSim;
use Modules\MT\Models\MtSimProvider;
use Modules\MT\Models\MtProvider; 

class SimController extends Controller {

    public function index( Request $request ) { 

        if ( Gate::denies('sim-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [  
            'page' => 'integer|nullable',     
            'date_from' => 'date_format:d-m-Y h:i a|nullable',         
            'date_to' => 'date_format:d-m-Y h:i a|nullable', 
            'order_by' => 'integer|nullable',        
        ]); 

        $sims = new MtSim; 

        if ( !$request->order_by ) {
            $sims = $sims->orderBy('id', 'DESC');  
        }

        $sims = $sims->with('providers.provider_id:id,name');        

        if ( $date_from = $request->date_from ) { 
            $sims = $sims->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $sims = $sims->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }  

        $sims = $sims->paginate( $request->per_page ); 
  
        $providers = MtProvider::where('status', 1)->get();

        return compact('sims', 'providers');
    } 

    public function store(Request $request) {

        $this->validate($request, [
            'terminal_id' => 'integer|required',     
            'providers.*.number' => 'numeric|required',
            'providers.*.balance_code' => 'string|nullable',
            'providers.*.provider_id' => 'array|required',             
            'type' => 'string|required',            
        ]); 

        if ( Gate::denies('sim-create') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        DB::transaction( function() use ( $request ) {

            $sim = MtSim::create([
                'terminal_id' => $request->terminal_id,    
                'type' => $request->type,   
                'user_id' => Auth::id(),  
            ]); 

            $sim_providers = [];
            foreach ($request->providers as $provider) { 
                $sim_providers[] = [
                    'sim_id' => $sim->id, 
                    'terminal_id' => $request->terminal_id,
                    'number' => $provider['number'], 
                    'balance_code' => $provider['balance_code'], 
                    'provider_id' => $provider['provider_id']['id'], 
                    'created_at' => date('Y-m-d H:i:s'), 
                    'updated_at' => date('Y-m-d H:i:s'),
                ];
            }   

            MtSimProvider::insert($sim_providers);  
             
        }); // end DB Transection

    }  

    public function update(Request $request, $id) { 

        $this->validate($request, [
            'terminal_id' => 'integer|required',     
            'providers.*.number' => 'numeric|required',
            'providers.*.provider_id' => 'array|required',             
            'type' => 'string|required',            
        ]); 

        $sim = MtSim::find($id); 
        if ( Gate::denies('sim-edit', $sim) ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        DB::transaction( function() use ( $request, $sim, $id ) {

            MtSimProvider::where('sim_id', $id)->delete();

            $sim->update([
                'terminal_id' => $request->terminal_id, 
                'type' => $request->type,   
            ]);

            $sim_providers = [];
            foreach ($request->providers as $provider) { 
                $sim_providers[] = [
                    'sim_id' => $sim->id, 
                    'terminal_id' => $request->terminal_id,
                    'number' => $provider['number'], 
                    'balance_code' => $provider['balance_code'], 
                    'provider_id' => $provider['provider_id']['id'],   
                    'created_at' => date('Y-m-d H:i:s'), 
                    'updated_at' => date('Y-m-d H:i:s'),
                ];
            }   

            MtSimProvider::insert($sim_providers);  
             
        }); // end DB Transection
    } 


    public function destroy( $id ) {
        /*DB::transaction( function() use ($id) {
            $ids = explode(',', $id);
            foreach ($ids as $id) {
                $package = MtSim::find($id); 
                if ( Gate::denies('package-delete', $package) ) {
                    abort(403, 'Sorry! You do not have permission');
                }
            } 
            MtSim::destroy( $ids );  
            MtSimProvider::whereIn('sim_id', $ids)->delete(); 
            //MtPackGettingWay::whereIn('pack_id', $ids)->delete(); 
        });*/ 
    }
}
