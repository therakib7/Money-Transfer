<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use Modules\MT\Models\MtSetting; 

class SettingController extends Controller {

    public function index( Request $request ) {

        if ( Gate::denies('setting-commission-super') ) {
            abort(403, 'Sorry! You do not have permission');
        }
        
        $settting_keys = []; 
        foreach ($request->except('_token') as $key => $val) { 
            $settting_keys[] = $key;
        } 

        $settings = new MtSetting;   

        $settings = $settings->select('key', 'value');

        $settings = $settings->where( function ($query) use($settting_keys) {
            foreach($settting_keys as $key) {
                $query->orWhere('key', 'LIKE', $key);
            }
        });   

        $settings = $settings->get();  

        return compact('settings');
    } 

    public function store(Request $request) {
     
    }  

    public function update(Request $request) {

        if ( Gate::denies('setting-commission-super') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [           
            'for' => 'string|required',             
        ]);

        /* Update disable trx form */
        if ( $request->for == 'trx' ) {
            $this->validate($request, [      
                'trx_disable' => 'boolean|nullable',     
                'trx_disable_msg' => 'string|nullable',             
                'trx_disable_native_msg' => 'string|nullable',             
            ]); 

            $com_key = ['trx_disable', 'trx_disable_msg', 'trx_disable_native_msg'];
            foreach ($com_key as $value) {
                MtSetting::updateOrCreate(
                    [
                        'key' => $value,    
                        //'updated_by' => Auth::id(),  
                    ],
                    [
                        'key' => $value,  
                        'value' => $request[$value],  
                        'updated_by' => Auth::id(),  
                    ]
                ); 
            } 
        }

        /* Update user com form */
        if ( $request->for == 'com' ) {
            $this->validate($request, [      
                'mr_com' => 'numeric|nullable',     
                'mr_pl_com' => 'numeric|nullable',           
                'mb_com' => 'numeric|nullable',           
                'ubp_com' => 'numeric|nullable',            
            ]); 

            $com_key = ['mr_com', 'mr_pl_com', 'mb_com', 'ubp_com'];
            foreach ($com_key as $value) {
                MtSetting::updateOrCreate(
                    [
                        'key' => $value,    
                        'updated_by' => Auth::id(),  
                    ],
                    [
                        'key' => $value,  
                        'value' => $request[$value],  
                        'updated_by' => Auth::id(),  
                    ]
                ); 
            } 

        }  
 
    } 
     
}
