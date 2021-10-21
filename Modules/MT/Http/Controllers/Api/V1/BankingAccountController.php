<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;

use Modules\MT\Models\MtBankingAccount;  
use Modules\MT\Models\MtBankingProvider; 

class BankingAccountController extends Controller {

    public function index( Request $request ) { 

        if ( Gate::denies('banking-account-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [    
            'page' => 'integer|nullable',   
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',   
            'order_by' => 'integer|nullable',      
        ]); 

        $banking_accounts = new MtBankingAccount; 

        $banking_accounts = $banking_accounts->with('banking_provider_id:id,name');

        if ( !$request->order_by ) {
            $banking_accounts = $banking_accounts->orderBy('id', 'DESC');  
        }

        if ( $date_from = $request->date_from ) { 
            $banking_accounts = $banking_accounts->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $banking_accounts = $banking_accounts->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        } 

        $banking_accounts = $banking_accounts->paginate( $request->per_page );  

        $banking_providers = MtBankingProvider::where('status', 1)->get();  

        return compact('banking_accounts', 'banking_providers');
    } 

    public function store(Request $request) {

        if ( Gate::denies('banking-account-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'status' => 'boolean|required',             
            'banking_provider_id' => 'array|required',             
            'ac_holder_name' => 'string|required',             
            'ac_no' => 'string|nullable',             
            'ac_type' => 'string|required',                
        ]);          
        
        MtBankingAccount::create([
            'status' => $request->status,
            'banking_provider_id' => $request->banking_provider_id['id'],  
            'ac_holder_name' => $request->ac_holder_name,  
            'ac_no' => $request->ac_no,   
            'ac_type' => $request->ac_type,   
            'user_id' => Auth::id(),
        ]);   
    }  

    public function update(Request $request, $id) { 

        $account = MtBankingAccount::find($id); 
        if ( Gate::denies('banking-account-edit', $account) ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'status' => 'boolean|required',             
            'banking_provider_id' => 'array|required',             
            'ac_holder_name' => 'string|required',             
            'ac_no' => 'string|nullable',             
            'ac_type' => 'string|required',        
        ]);    

        DB::transaction( function() use ( $request, $account, $id ) {

            $account->update([
                'status' => $request->status,
                'banking_provider_id' => $request->banking_provider_id['id'],  
                'ac_holder_name' => $request->ac_holder_name,  
                'ac_no' => $request->ac_no,   
                'ac_type' => $request->ac_type,   
                'user_id' => Auth::id(), 
            ]);   

        }); // end DB Transection
    } 

    public function destroy( $id ) { 
        $ids = explode(',', $id);
        foreach ($ids as $id) {
            $account = MtBankingAccount::find($id); 
            if ( Gate::denies('banking-account-delete', $account) ) {
                abort(403, 'Sorry! You do not have permission');
            }
        }  
        MtBankingAccount::destroy( $ids ); 
    }
}
