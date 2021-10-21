<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon; 
use Cache; 
use Illuminate\Support\Facades\Storage;

use App\Models\User;
use App\Models\UserChangeHistory;
use App\Models\Profile;
use Modules\AC\Models\AcBalance;  
use App\Models\Role;
use App\Models\PasswordSecurity;

use Modules\MT\Models\MtSettingUser; 

class UserController extends Controller {

    public function profile_info( Request $request ) { 
        $profile = new User;  
        //$profile = $profile->with('profile.avatar_src', 'profile.pre_address', 'profile.per_address');
        $profile = $profile->with('profile.avatar_src');
        $profile = $profile->where('id', Auth::id());
        $profile = $profile->first();  

        $img_dir = '';
        //Todo: temp
        $img_dir = Storage::disk('s3')->url('avatar/');

        return compact('profile', 'img_dir');
    }  

    public function profile_update( Request $request ) {   

        if ( Gate::denies('setting-profile-edit') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'name' => 'required|string|max:255',     
            'profile.bday' => 'string|nullable',
            'profile.avatar' => 'integer|nullable',
            'profile.occupation' => 'string|nullable',
            'profile.nid' => 'string|nullable',
            'profile.birth_crt' => 'string|nullable',
            'profile.passport' => 'string|nullable',
            'profile.pre_address' => 'integer|nullable',
            'profile.per_address' => 'integer|nullable',
        ]); 

        DB::transaction( function() use ($request) {

            $profile = new User;  
            $profile = $profile->with('profile.avatar_src');
            $profile = $profile->where('id', Auth::id());
            $profile = $profile->first();  

            if ( $profile['profile']['nid'] && ( $request['profile']['nid'] != $profile['profile']['nid'] ) ) {
                UserChangeHistory::create([ 
                    'key' => 'nid',            
                    'old' => $profile['profile']['nid'],            
                    'new' => $request['profile']['nid'],            
                    'user_id' => Auth::id(),            
                ]); 
            }

            if ( $profile['profile']['birth_crt'] && ( $request['profile']['birth_crt'] != $profile['profile']['birth_crt'] ) ) {
                UserChangeHistory::create([ 
                    'key' => 'birth_crt',            
                    'old' => $profile['profile']['birth_crt'],            
                    'new' => $request['profile']['birth_crt'],            
                    'user_id' => Auth::id(),            
                ]); 
            }

            if ( $profile['profile']['passport'] && ( $request['profile']['passport'] != $profile['profile']['passport'] ) ) {
                UserChangeHistory::create([ 
                    'key' => 'passport',            
                    'old' => $profile['profile']['passport'],            
                    'new' => $request['profile']['passport'],            
                    'user_id' => Auth::id(),            
                ]); 
            }
     
            User::where('id', Auth::id())->update([ 
                'name' => $request['name'],            
            ]); 

            date_default_timezone_set('Asia/Dhaka');         
            $bday = ( $request['profile']['bday'] ) ? date('Y-m-d H:i:s', strtotime( $request['profile']['bday'] ) ) : null; 
            
            Profile::where('user_id', Auth::id())->update([
                'bday' => $bday,  
                'avatar' => $request['profile']['avatar'],  
                'occupation' => $request['profile']['occupation'],  
                'nid' => $request['profile']['nid'],  
                'birth_crt' => $request['profile']['birth_crt'],  
                'passport' => $request['profile']['passport'],  
                'pre_address' => $request['profile']['pre_address'],  
                'per_address' => $request['profile']['per_address'],    
            ]); 
        });   
    
    } 

    public function index(Request $request) { 

        if ( Gate::denies('user-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [    
            'page' => 'integer|nullable', 
            'status' => 'integer|nullable',             
            'user_id' => 'integer|nullable',   
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',  
            'order_by' => 'integer|nullable',                      
        ]);  

        $users = new User; 

        if ( !$request->order_by ) {
            $users = $users->orderBy('id', 'DESC');  
        } 
        
        $users = $users->with('profile.avatar_src', 'role', 'balance'); 
       // $users = $users->with('role'); 

        if ( isset( $request->status ) ) {
            $users = $users->where('status', $request->status); 
        } 

        if ( $user_id = $request->user_id ) {
            $users = $users->where('id', $user_id); 
        }  

        if ( $date_from = $request->date_from ) {    
            $users = $users->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {    
            $users = $users->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        } 

        $users = $users->paginate( $request->per_page ); 
        $roles = Role::get();
        return compact('users', 'roles');
    }

    public function store(Request $request) {
        
        if ( Gate::denies('user-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'status' => 'required|boolean', 
            'name' => 'required|string|max:255',
            'username' => 'nullable|string|max:255|unique:users',
            'email' => 'nullable|email|max:255|unique:users', 
            'password' => [
                'required',
                'string',
                'confirmed',             
                'min:8',             // must be at least 6 characters in length
                'regex:/[a-zA-Z]/',      // must contain at least one alphabet letter
                //'regex:/[a-z]/',      // must contain at least one lowercase letter
                //'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                //'regex:/[@$!%*#?&]/', // must contain a special character
            ],
            'pin' => [
                'required',           
                'string',
                'min:4',             
            ],
            'mobile' => 'nullable|numeric|unique:users', 
            'role' => 'required|array', 

            'profile.bday' => 'string|nullable',
            'profile.avatar' => 'integer|nullable',
            'profile.occupation' => 'string|nullable',
            'profile.nid' => 'string|nullable',
            'profile.birth_crt' => 'string|nullable',
            'profile.passport' => 'string|nullable',
            'profile.pre_address' => 'string|nullable',
            'profile.per_address' => 'string|nullable',
        ]); 

        DB::transaction( function() use ( $request ) { 

            $user = User::create([
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'mobile' => $request->mobile,
                'password' => Hash::make( $request->password ),
                'pin' => $request->pin ? Hash::make( $request->pin ) : Hash::make( $request->pin ),
                'status' => $request->status,
            ]);

            date_default_timezone_set('Asia/Dhaka');         
            $bday = ( $request['profile']['bday'] ) ? date('Y-m-d H:i:s', strtotime( $request['profile']['bday'] ) ) : null;  

            $profile = Profile::create([
                'user_id' => $user->id,
                'bday' => $bday,  
                'avatar' => $request['profile']['avatar'],  
                'occupation' => $request['profile']['occupation'],  
                'nid' => $request['profile']['nid'],  
                'birth_crt' => $request['profile']['birth_crt'],  
                'passport' => $request['profile']['passport'],  
                'pre_address' => $request['profile']['pre_address'],  
                'per_address' => $request['profile']['per_address'], 
            ]); 

            AcBalance::create([
                'user_id' => $user->id, 
                'balance' => 0, 
            ]); 

            /* It it has, hasOne it will help if future need role many*/
            $roles = [
                [
                    'user_id' => $user->id, 
                    'role_id' => $request->role['id'], 
                ]
            ]; 

            $user->roles()->createMany( $roles );  

        }); // end DB Transection
    } 

    public function update(Request $request, $id) {
        /* Disable OTP */
        if ( $request->type == 'otp' ) {
            if ( Gate::denies('user-view') ) {
                abort(403, 'Sorry! You do not have permission');
            }
            
            $user_otp = PasswordSecurity::where('user_id', $id)->first();
            if ( $user_otp ) {
                return PasswordSecurity::where('user_id', $id)->delete(); 
            } else {
                abort(403, 'Sorry! There is no OTP found');
            }
            
        }

        $user = User::find($id);  
        if ( Gate::denies('user-edit', $user) ) {
            abort(403, 'Sorry! You do not have permission');
        }
        
        $this->validate($request, [
            'status' => 'required|boolean', 
            'name' => 'required|string|max:255', 
            'password' => [
                'nullable',
                'string',
                'confirmed',             
                'min:8',             // must be at least 8 characters in length
                'regex:/[a-zA-Z]/',      // must contain at least one lowercase letter
                //'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                //'regex:/[@$!%*#?&]/', // must contain a special character
            ],
            'pin' => [
                'nullable',             
                'string',
                'min:4',              
            ],
            'role' => 'required|array',  
            'profile.bday' => 'string|nullable',
            'profile.avatar' => 'integer|nullable',
            'profile.occupation' => 'string|nullable',
            'profile.nid' => 'string|nullable',
            'profile.birth_crt' => 'string|nullable',
            'profile.passport' => 'string|nullable',
            'profile.pre_address' => 'integer|nullable',
            'profile.per_address' => 'integer|nullable',
        ]);  

        if ( $request->username ) {
            $this->validate($request, [
                'username' => 'required|string|max:255|unique:users', 
            ]);
        }

        if ( $request->email ) {
            $this->validate($request, [
                'email' => 'required|email|nullable|max:255|unique:users',
            ]);
        }

        if ( $request->mobile ) {
            $this->validate($request, [
                'mobile' => 'nullable|numeric|unique:users', 
            ]);
        }         

        $user_info = [
            'name' => $request->name,  
            'status' => $request->status,
        ];

        if ( $request->username ) {
            $user_info['username'] = $request->username;
        }

        if ( $request->email ) {
            $user_info['email'] = $request->email;
        }

        if ( $request->mobile ) {
            $user_info['mobile'] = $request->mobile;
        } 
 
        if ( $request->password ) {
            $user_info['password'] = Hash::make( $request->password );
        }

        if ( $request->pin ) {
            $user_info['pin'] = Hash::make( $request->pin );
        } 

        $user->update( $user_info );
        
        date_default_timezone_set('Asia/Dhaka');         
        $bday = ( $request['profile']['bday'] ) ? date('Y-m-d H:i:s', strtotime( $request['profile']['bday'] ) ) : null; 
        
        $profile = Profile::where('user_id' , $user->id)->first();
        $profile->update([    
            'bday' => $bday,  
            'avatar' => $request['profile']['avatar'],  
            'occupation' => $request['profile']['occupation'],  
            'nid' => $request['profile']['nid'],  
            'birth_crt' => $request['profile']['birth_crt'], 
            'passport' => $request['profile']['passport'], 
            'pre_address' => $request['profile']['pre_address'],  
            'per_address' => $request['profile']['per_address'], 
        ]); 
 
        /* It it has, hasOne it will help if future need role many*/
        $roles = [
            [
                'user_id' => $user->id, 
                'role_id' => $request->role['id'], 
            ]
        ]; 
        $user->roles()->delete();
        $user->roles()->createMany( $roles ); 

        /**
         * Delete user cache 
         */
        Cache::forget('settinguser_' . $user->id);
        /* If not create user cache */
        User::createUserCache( $user->id );
    }

    public function destroy( $id ) { }

}
