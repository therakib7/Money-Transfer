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
use Mail; 
use Modules\MT\Models\MtSettingUser; 

use App\Models\User;  
use App\Models\PinReset; 

class SecurityController extends Controller {

    public function pin_status_update( Request $request ) { 

        if ( Gate::denies('setting-security-edit') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [ 
            'type' => 'string|required',  
            'current_pin' => 'required|string|min:4',
        ]); 

        if ( Auth::user()->pin ) {
            if ( !Hash::check( $request->current_pin, Auth::user()->pin ) ) {
                abort(403, 'Sorry! You entered wrong pin');
            } 
        }  
        
        $pin_status = !$request->pin_status;


        if ( $request->type == 'mr' ) { 

            MtSettingUser::updateOrCreate(
                [
                    'key' => 'mr_pin_status',  
                    'user_id' => Auth::id(),   
                ],
                [
                    'key' => 'mr_pin_status',  
                    'value' => $pin_status,  
                    'user_id' => Auth::id(),   
                ]
            ); 
        } else if ( $request->type == 'mb' ) { 
            MtSettingUser::updateOrCreate(
                [
                    'key' => 'mb_pin_status',  
                    'user_id' => Auth::id(),   
                ],
                [
                    'key' => 'mb_pin_status',  
                    'value' => $pin_status,  
                    'user_id' => Auth::id(),   
                ]
            ); 
        } else if ( $request->type == 'ubp' ) { 
            MtSettingUser::updateOrCreate(
                [
                    'key' => 'ubp_pin_status',  
                    'user_id' => Auth::id(),   
                ],
                [
                    'key' => 'ubp_pin_status',  
                    'value' => $pin_status,  
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

    public function password_update( Request $request ) { 

        if ( Gate::denies('setting-security-edit') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [ 
            'current' => 'required', 
            'password' => [
                'required',
                'string',
                'confirmed',             
                'min:8',             // must be at least 6 characters in length
                'regex:/[a-zA-Z]/',      // must contain at least one alphabet letter 
                'regex:/[0-9]/',      // must contain at least one digit
                //'regex:/[@$!%*#?&]/', // must contain a special character
            ],
        ]); 

        if ( !Hash::check( $request->current, Auth::user()->password ) ) {
            abort(403, 'Sorry! You entered wrong password');
        } 

        if ( $request->current == $request->password ) {
            abort(403, 'Sorry! You entered curent password as new password');
        }
    
        User::where('id', Auth::id())->update([ 
            'password' => Hash::make( $request->password ),        
        ]);   

        Auth::logoutOtherDevices( $request->current );
    } 

    public function pin_update( Request $request ) { 

        if ( Gate::denies('setting-security-edit') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [ 
            'current' => 'string|min:4|nullable', 
            'pin' => 'required|string|min:4|confirmed',
        ]); 

        if ( Auth::user()->pin ) {
            if ( !Hash::check( $request->current, Auth::user()->pin ) ) {
                abort(403, 'Sorry! You entered wrong pin');
            } 
        } 

        if ( $request->current == $request->pin ) { 
            abort(403, 'Sorry! You entered curent pin as new pin');
        }
    
        User::where('id', Auth::id())->update([ 
            'pin' => Hash::make( $request->pin ),        
        ]);   
    }  

    public function get_pin_generate_code( Request $request ) { 

        if ( Gate::denies('setting-security-edit') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $pin_reset = PinReset::where('user_id', Auth::id())->first('user_id');
        $pin_reset = ( $pin_reset ) ? 'true' : 'false';
        $email_exits = Auth::user()->email;

        return compact('pin_reset', 'email_exits');
    }

    public function pin_generate_code( Request $request ) { 

        if ( Gate::denies('setting-security-edit') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [ 
            'current_pass' => 'required|string',
        ]); 

        if ( !Hash::check( $request->current_pass, Auth::user()->password ) ) {
            abort(403, 'Sorry! You entered wrong password');
        }   

        DB::transaction( function() use ( $request ) { 
            $six_digit = mt_rand(100000, 999999);
            $data = [
                'app'=> config('app.name'),
                'url'=> config('app.url'),
                'name'=> Auth::user()->name,
                'reset_code'=> $six_digit,
            ];
            Mail::send('emails.pin_code', $data, function($message) {
                $message->to( Auth::user()->email, Auth::user()->name)->subject('Reset Pin Notification');
            });

            PinReset::updateOrCreate([
                    'user_id' => Auth::id(),  
                ],
                [
                    'user_id' => Auth::id(),   
                    'code' => $six_digit,    
                    'created_at' => date('Y-m-d H:i:s'),    
                ]
            );

        }); // end DB Transection 
    }

    public function pin_reset( Request $request ) { 

        if ( Gate::denies('setting-security-edit') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [ 
            'type' => 'string|required',  
            'pin' => 'string|min:4|confirmed|required',
            'otp_code' => 'string|max:6|required',
        ]);  

        DB::transaction( function() use ( $request ) {
            $verify_code = false;
            if ( $request->type == 'email' ) {
                $pin_reset = PinReset::where('code', $request->otp_code)->first();

                if ( empty( $pin_reset ) ) { 
                    abort(403, 'Sorry! your recovery code doesn\'t match');
                } else {
                    if ( $pin_reset->created_at <= Carbon::now()->subMinutes(10)->toDateTimeString() ) {
                        abort(403, 'Sorry! your recovery code expired');
                    } else {
                        $verify_code = true;
                        $pin_reset->delete();
                    }
                } 
            } else if ( $request->type == 'otp' ) {
                $user = Auth::user();
                $google2fa = app('pragmarx.google2fa');
                $secret = $request->otp_code;
                $valid = $google2fa->verifyKey($user->passwordSecurity->google2fa_secret, $secret);
                if ( $valid ) {
                    $verify_code = true;
                } else {
                    abort(403, 'Sorry! your otp code doesn\'t match');
                }
            } 

            if ( $verify_code ) {
                User::where('id', Auth::id())->update([ 
                    'pin' => Hash::make( $request->pin ),        
                ]);
            }
               
        }); // end DB Transection
    }  

    public function mobile_update( Request $request ) { 

        if ( Gate::denies('setting-security-edit') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [ 
            'current' => 'string|nullable', 
            'mobile' => 'required|string|min:10|confirmed|unique:users', 
        ]); 

        if ( !Hash::check( $request->current, Auth::user()->password ) ) {
            abort(403, 'Sorry! You entered wrong password');
        }
    
        User::where('id', Auth::id())->update([ 
            'mobile' => $request->mobile,        
        ]);   
    } 

    public function email_update( Request $request ) {

        if ( Gate::denies('setting-security-edit') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $this->validate($request, [ 
            'current' => 'email|nullable', 
            'email' => 'required|email|confirmed|unique:users', 
        ]); 

        if ( !Hash::check( $request->current, Auth::user()->password ) ) {
            abort(403, 'Sorry! You entered wrong password');
        }
    
        User::where('id', Auth::id())->update([ 
            'email' => $request->email,        
        ]);   
    } 

    public function username_update( Request $request ) { 

        if ( Gate::denies('setting-security-edit') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [ 
            'current' => 'alpha_dash|nullable', 
            'username' => 'required|alpha_dash|min:4|confirmed|unique:users', 
        ]); 

        if ( !Hash::check( $request->current, Auth::user()->password ) ) {
            abort(403, 'Sorry! You entered wrong password');
        }
    
        User::where('id', Auth::id())->update([ 
            'username' => $request->username,        
        ]);   
    }

}
