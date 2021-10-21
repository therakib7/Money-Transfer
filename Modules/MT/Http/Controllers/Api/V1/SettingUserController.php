<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use Modules\MT\Models\MtProvider; 
use Modules\MT\Models\MtSettingUser; 
use App\Models\User;

use Modules\MT\Models\MtTaxonomy; 
use Cache;

class SettingUserController extends Controller {

    public function index( Request $request ) {

        $this->validate($request, [
            'type' => 'string|required',                 
        ]); 

        $settting_keys = []; 
        foreach ($request->except('_token') as $key => $val) { 
            $settting_keys[] = $key;
        } 

        $settingusers = new MtSettingUser;   

        $settingusers = $settingusers->where('user_id', Auth::id());

        $settingusers = $settingusers->select('key', 'value');

        $settingusers = $settingusers->where( function ($query) use($settting_keys) {
            foreach($settting_keys as $key) {
                $query->orWhere('key', 'LIKE', $key);
            }
        });   

        $settingusers = $settingusers->get();   

        if ( $request->type == 'mr' ) {

            $user_active_mr_providers = MtSettingUser::where('key', 'active_mr_providers')->where('user_id', Auth::id())->first(); 
            $active_provider_ids = ( $user_active_mr_providers ) ? unserialize($user_active_mr_providers->value) : [];  

            /* Get Provider Only Flexiload Mobile Banking Category */
            $category = MtTaxonomy::where('taxonomy', 'provider-category')->where('slug', 'mobile-recharge')->first(['id']); 
            $mr_providers = $category->provider_without_services;  
            $mr_providers = $mr_providers->except($active_provider_ids); 

            if ( $active_provider_ids ) {
                $active_mr_providers = MtProvider::whereIn('id', $active_provider_ids)
                    ->orderByRaw('FIELD(`id`, '.implode(',', $active_provider_ids).')') // work only mysql database
                    ->get();
            } else {
                $active_mr_providers = [];
            }
            return compact('settingusers', 'mr_providers', 'active_mr_providers');

        } else if ( $request->type == 'mb' ) {

            $user_active_mb_providers = MtSettingUser::where('key', 'active_mb_providers')->where('user_id', Auth::id())->first(); 
            $active_provider_ids = ( $user_active_mb_providers ) ? unserialize($user_active_mb_providers->value) : [];  

            /* Get Provider Only Flexiload Mobile Banking Category */
            $category = MtTaxonomy::where('taxonomy', 'provider-category')->where('slug', 'mobile-banking')->first(['id']); 
            $mb_providers = $category->provider_without_services;  
            $mb_providers = $mb_providers->except($active_provider_ids); 

            if ( $active_provider_ids ) {
                $active_mb_providers = MtProvider::whereIn('id', $active_provider_ids)
                    ->orderByRaw('FIELD(`id`, '.implode(',', $active_provider_ids).')') // work only mysql database
                    ->get();
            } else {
                $active_mb_providers = [];
            }
            return compact('settingusers', 'mb_providers', 'active_mb_providers');

        } else if ( $request->type == 'ubp' ) {

            $user_active_ubp_providers = MtSettingUser::where('key', 'active_ubp_providers')->where('user_id', Auth::id())->first(); 
            $active_provider_ids = ( $user_active_ubp_providers ) ? unserialize($user_active_ubp_providers->value) : [];  

            /* Get Provider Only Utility Category */
            $category = MtTaxonomy::where('taxonomy', 'provider-category')->where('slug', 'utility')->first(['id']); 
            $ubp_providers = $category->provider_without_services;  
            $ubp_providers = $ubp_providers->except($active_provider_ids); 

            if ( $active_provider_ids ) {
                $active_ubp_providers = MtProvider::whereIn('id', $active_provider_ids)
                    ->orderByRaw('FIELD(`id`, '.implode(',', $active_provider_ids).')') // work only mysql database
                    ->get();
            } else {
                $active_ubp_providers = [];
            }
            return compact('settingusers', 'ubp_providers', 'active_ubp_providers');

        }
        
    } 

    public function store(Request $request) { }  

    public function update(Request $request) {
       
        $this->validate($request, [
            'type' => 'string|required',                 
        ]); 

        if ( $request->type == 'mr' ) {
            $this->validate($request, [
                'type' => 'string|required',     
                'mr_pin_status' => 'boolean|nullable',     
                'mr_multi_recharge' => 'boolean|nullable',           
                'active_mr_providers' => 'array|nullable',            
            ]);

            MtSettingUser::updateOrCreate(
                [
                    'key' => 'mr_pin_status',  
                    'user_id' => Auth::id(),   
                ],
                [
                    'key' => 'mr_pin_status',  
                    'value' => $request->mr_pin_status,  
                    'user_id' => Auth::id(),   
                ]
            );

            MtSettingUser::updateOrCreate(
                [
                    'key' => 'mr_multi_recharge',  
                    'user_id' => Auth::id(),   
                ],
                [
                    'key' => 'mr_multi_recharge',  
                    'value' => $request->mr_multi_recharge,  
                    'user_id' => Auth::id(),   
                ]
            ); 

            MtSettingUser::updateOrCreate(
                [
                    'key' => 'mr_auto_pack_suggestion',  
                    'user_id' => Auth::id(),   
                ],
                [
                    'key' => 'mr_auto_pack_suggestion',  
                    'value' => $request->mr_auto_pack_suggestion,  
                    'user_id' => Auth::id(),   
                ]
            );   

            MtSettingUser::updateOrCreate(
                [
                    'key' => 'mr_recharge_pack_only',  
                    'user_id' => Auth::id(),   
                ],
                [
                    'key' => 'mr_recharge_pack_only',  
                    'value' => $request->mr_recharge_pack_only,  
                    'user_id' => Auth::id(),   
                ]
            );           

            $collection = collect($request->active_mr_providers); 
            $active_mr_providers = $collection->pluck('id')->toArray(); 
            MtSettingUser::updateOrCreate(
                [
                    'key' => 'active_mr_providers',  
                    'user_id' => Auth::id(),   
                ],
                [
                    'key' => 'active_mr_providers',  
                    'value' => serialize( $active_mr_providers ),  
                    'user_id' => Auth::id(),   
                ]
            );
        } else if ( $request->type == 'mb' ) {
            $this->validate($request, [
                'type' => 'string|required',     
                'mb_pin_status' => 'boolean|nullable',     
                'mb_multi_recharge' => 'boolean|nullable',           
                'active_mb_providers' => 'array|nullable',            
            ]);

            MtSettingUser::updateOrCreate(
                [
                    'key' => 'mb_pin_status',  
                    'user_id' => Auth::id(),   
                ],
                [
                    'key' => 'mb_pin_status',  
                    'value' => $request->mb_pin_status,  
                    'user_id' => Auth::id(),   
                ]
            );

            MtSettingUser::updateOrCreate(
                [
                    'key' => 'mb_multi_recharge',  
                    'user_id' => Auth::id(),   
                ],
                [
                    'key' => 'mb_multi_recharge',  
                    'value' => $request->mb_multi_recharge,  
                    'user_id' => Auth::id(),   
                ]
            );          

            $collection = collect($request->active_mb_providers); 
            $active_mb_providers = $collection->pluck('id')->toArray(); 
            MtSettingUser::updateOrCreate(
                [
                    'key' => 'active_mb_providers',  
                    'user_id' => Auth::id(),   
                ],
                [
                    'key' => 'active_mb_providers',  
                    'value' => serialize( $active_mb_providers ),  
                    'user_id' => Auth::id(),   
                ]
            );
        } else if ( $request->type == 'ubp' ) {

            $this->validate($request, [
                'type' => 'string|required',     
                'ubp_pin_status' => 'boolean|nullable',     
                'ubp_multi_recharge' => 'boolean|nullable',           
                'active_ubp_providers' => 'array|nullable',            
            ]);

            MtSettingUser::updateOrCreate(
                [
                    'key' => 'ubp_pin_status',  
                    'user_id' => Auth::id(),   
                ],
                [
                    'key' => 'ubp_pin_status',  
                    'value' => $request->ubp_pin_status,  
                    'user_id' => Auth::id(),   
                ]
            );

            MtSettingUser::updateOrCreate(
                [
                    'key' => 'ubp_multi_recharge',  
                    'user_id' => Auth::id(),   
                ],
                [
                    'key' => 'ubp_multi_recharge',  
                    'value' => $request->ubp_multi_recharge,  
                    'user_id' => Auth::id(),   
                ]
            ); 

            $collection = collect($request->active_ubp_providers); 
            $active_ubp_providers = $collection->pluck('id')->toArray(); 
            MtSettingUser::updateOrCreate(
                [
                    'key' => 'active_ubp_providers',  
                    'user_id' => Auth::id(),   
                ],
                [
                    'key' => 'active_ubp_providers',  
                    'value' => serialize( $active_ubp_providers ),  
                    'user_id' => Auth::id(),   
                ]
            );
        }  

        /**
         * Delete user cache 
         */
        Cache::forget('settinguser_' . Auth::id());
        /* If not create user cache */
        User::createUserCache();
 
    }  
}
