<?php

namespace App\Models;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Cache; 
use Carbon\Carbon; 
use Modules\MT\Models\MtSettingUser; 
use App\Models\UserHasRole;
use App\Models\Role;  

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [ 'status', 'name', 'username', 'email', 'email_verified_at', 'mobile', 'mobile_verified_at', 'password', 'pin', 'ref_user_id' ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'pin', 'remember_token' 
    ];

    /* Password Security */
    public function passwordSecurity() {
        return $this->hasOne('App\Models\PasswordSecurity');
    }

    public function profile() {
        return $this->hasOne('App\Models\Profile');
    } 

    public function balance() {
        return $this->hasOne('Modules\AC\Models\AcBalance');
    }

    /* Create Role Pivot */
    public function roles() {
        return $this->hasMany('App\Models\UserHasRole');
    } 
    
    /**
     * The role that belong to the user.
     */
    public function role() { 
        return $this->belongsToMany('App\Models\Role', 'user_has_roles', 'user_id', 'role_id');
    } 

    public static function keyExists( $arr, $key) {

        foreach ($arr as $value) {  
            if ( $key == $value['key'] ) {
                return true;
            } 
        }
        return false;
    }

    public static function createUserCache( $user_id = null ) {

        $user_id = ( $user_id ) ? $user_id : Auth::id(); // this peramter added for user role update

        /* Add role permission in cache */
        if ( !Cache::has('role_id_personal') ) { // its means has role in cache not only personal
            $role_cache = new Role;
            $role_cache = $role_cache->with('permission'); 
            $role_cache = $role_cache->get(['id', 'slug']); 

            foreach ($role_cache as $per) { 
                $collection = collect($per['permission']); 
                $plucked = $collection->pluck('guard_name'); 

                Cache::forget('role_id_' . $per['slug']);

                Cache::rememberForever('role_id_' . $per['slug'], function() use ( $plucked ) { 
                    return $plucked->all();
                });
            }
        } 


        /* If not cache create cache */
        if ( !Cache::has('settinguser_' . $user_id ) ) { 

            $settinguser = MtSettingUser::where('user_id', $user_id )->get();

            $settings_key = [
                //'mr_pin_status', 
                'mr_multi_recharge', 
                'mr_auto_pack_suggestion', 
                //'mb_pin_status', 
                'mb_multi_recharge', 
                //'ubp_pin_status', 
                'ubp_multi_recharge' 
            ]; 

            foreach ($settings_key as $value) {
                if ( !User::keyExists($settinguser, $value)  ) {
                    $settinguser[] = [
                        'key' => $value,
                        'value' => '1'
                    ];
                }
            }

            $permissions = [];
            foreach ($settinguser as $value) {                
                if ( $value['value'] == '1' ) {
                    $permissions[] = $value['key'];
                }
            }

            $user_role = new UserHasRole; 
            $user_role = $user_role->where('user_id', $user_id); 
            $user_role = $user_role->with('role:id,slug'); 
            $user_role = $user_role->get();  
            $collection = collect($user_role); 
            $plucked = $collection->pluck('role.slug'); 
            $user_role = $plucked->all();

            Cache::remember('settinguser_' . $user_id, now()->addMinutes(20), function() use ( $permissions, $user_role ) { 
                $settings_permission = [];
                $settings_permission['permission'] = $permissions;
                $settings_permission['roles'] = $user_role;
                return $settings_permission;
            });  
        } 
    }

    public static function permissions( $args = null, $match_all = true ) {

        /* If not create user cache */
        User::createUserCache();

        /* Check permission from cache */
        $permissions = [];
        if ( Cache::has('settinguser_' . Auth::id()) ) {             

            $settinguser = Cache::get('settinguser_' . Auth::id()); 
            
            foreach ( $settinguser['roles'] as $value ) {
                $permissions[] = $value;
            } 

            foreach ( $settinguser['permission'] as $value ) {
                $permissions[] = $value;
            } 

            foreach ( $settinguser['roles'] as $role ) { 
                foreach ( Cache::get('role_id_' . $role) as $value ) {
                    $permissions[] = $value;
                } 
            }
        }  
 
        if ( $args == 'all' ) { //this is for to get array permission 
            return $permissions; 
        }

        // check custom args 
        if ( $args ) {
            // martch all args
            if ( $match_all ) { 
                return empty(array_diff($args, $permissions));
            // match single args
            } else {
                return !empty(array_intersect($args, $permissions));
            } 
        // get all permissions 
        } else {
            return implode(",", array_unique($permissions) );            
        }  
    } 

    public static function auth_role( $roles = null, $match_all = true ) {

        /* If not create user cache */
        User::createUserCache();
        
        $settinguser = Cache::get('settinguser_' . Auth::id()); 
        $user_role = $settinguser['roles'];

        // check custom roles 
        if ( $roles ) {
            // martch all roles
            if ( $match_all ) { 
                return empty(array_diff($roles, $user_role));
            // match single roles
            } else {
                return !empty(array_intersect($roles, $user_role));
            } 
        // get all user_role 
        } else {
            return array_unique($user_role);            
        }  
    } 

    public static function role_by_user_id( $id, $roles = null, $match_all = true ) {
        
        $user_role = new UserHasRole; 
        $user_role = $user_role->where('user_id', $id); 
        $user_role = $user_role->with('role:id,slug'); 
        $user_role = $user_role->get();  
        $user_role = collect($user_role); 
        $user_role = $user_role->pluck('role.slug')->toArray(); //wow, nested pluck 

        // check custom roles 
        if ( $roles ) {
            // martch all roles
            if ( $match_all ) { 
                return empty(array_diff($roles, $user_role));
            // match single roles
            } else {
                return !empty(array_intersect($roles, $user_role));
            } 
        // get all user_role 
        } else {
            return array_unique($user_role);            
        }  
    }  
 
}
