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
use Modules\MT\Models\MtSimProvider;
use Modules\AC\Models\AcBalance; 

class SimBalanceController extends Controller {

    public function index( Request $request ) { 

        if ( Gate::denies('sim-balance-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [    
            'page' => 'integer|nullable',   
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',    
            'order_by' => 'integer|nullable',     
        ]); 

        $simbalances = new MtSimProvider; 

        if ( !$request->order_by ) {
            $simbalances = $simbalances->orderBy('id', 'DESC');  
        }

        $simbalances = $simbalances->with('provider_id:id,name', 'sim_id:id,type'); 

        if ( $date_from = $request->date_from ) { 
            $simbalances = $simbalances->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $simbalances = $simbalances->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }  

        $simbalances = $simbalances->paginate( $request->per_page ); 

        return compact('simbalances');
    } 

    public function store(Request $request) {

        $this->validate($request, [      
            'id' => 'integer|required',     
            'number' => 'string|required',   
            'provider_id' => 'integer|required',   
            'amount' => 'numeric|required',   
            'note' => 'string|nullable',             
        ]); 

        if ( Gate::denies('sim-balance-create') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        DB::transaction( function() use ( $request ) { 
            MtSimProvider::where('id', $request->id)->increment('balance', $request->amount);

            MtSimBalanceHistory::create([     
                'number' => $request->number,  
                'provider_id' => $request->provider_id,  
                'amount' => $request->amount,  
                'note' => $request->note,  
                'user_id' =>  Auth::id(),      
            ]);   

            AcBalance::where('user_id', 0)->increment('balance', $request->amount);
        }); // end DB Transection
    }  

    public function update(Request $request, $id) { 
       
    } 
    
    public function destroy( $id ) { 
        
    }
}
