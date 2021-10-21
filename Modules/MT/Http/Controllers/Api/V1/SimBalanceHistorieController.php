<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;

use Modules\MT\Models\MtSimBalanceHistory;  
use Modules\MT\Models\MtProvider;
use Modules\MT\Models\MtSim;

class SimBalanceHistorieController extends Controller {

    public function index( Request $request ) {

        if ( Gate::denies('sim-balance-history-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [  
            'page' => 'integer|nullable',     
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',  
            'provider_id' => 'integer|nullable',       
            'order_by' => 'integer|nullable',       
        ]);  
         

        $simbalancehistories = new MtSimBalanceHistory; 

        if ( !$request->order_by ) {
            $simbalancehistories = $simbalancehistories->orderBy('id', 'DESC');  
        }

        $simbalancehistories = $simbalancehistories->with('provider_id:id,name');

        if ( $provider_id = $request->provider_id ) {
            $simbalancehistories = $simbalancehistories->where('provider_id', $provider_id);
        }  

        if ( $date_from = $request->date_from ) { 
            $simbalancehistories = $simbalancehistories->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $simbalancehistories = $simbalancehistories->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }  

        $simbalancehistories = $simbalancehistories->paginate( $request->per_page ); 
 
        $providers = MtProvider::where('status', 1)->get(['id','name','slug']);

        return compact('simbalancehistories', 'providers');
    } 

    public function store(Request $request) {  

    }  

    public function update(Request $request, $id) {
 
    } 
    
    public function destroy( $id ) { 

    }
}
