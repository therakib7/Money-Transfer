<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\PasswordSecurity;
use Google2FA;

class PasswordSecurityController extends Controller { 

    public function show2faForm(Request $request){
        $user = Auth::user();

        $google2fa_qr = "";
        $google2fa_secret_key = ""; 
            
        if ( $user->passwordSecurity()->exists() ) {
            $user_id = ( $user->mobile ) ? $user->mobile : $user->email;

            $google2fa = app('pragmarx.google2fa');
            $google2fa_qr = $google2fa->getQRCodeInline(
                'Oxyzone Money Transfer',
                $user_id,
                $user->passwordSecurity->google2fa_secret
            );

            $google2fa_secret_key = $user->passwordSecurity->google2fa_secret;

            if ( !$user->passwordSecurity->google2fa_enable ) {

                $two_fa = [
                    'user_id' => $user_id,
                    'google2fa_qr' => $google2fa_qr,
                    'google2fa_secret_key' => $google2fa_secret_key,
                ]; 
            } else {
                $two_fa = [ 
                    'google2fa_enable' => true, 
                ];
            } 
        } else {
            $two_fa = [];
        }   
        
        return compact('two_fa'); 
    }

    public function generate2faSecret(Request $request){

        $validatedData = $request->validate([
            'current_pass' => 'required',
        ]);

        if ( !(Hash::check($request->current_pass, Auth::user()->password)) ) { 
            abort(403, 'Your password does not matches with your account password. Please try again.');
        } 

        $trusted_devices = \App\Models\TrustedDevice::where('user_id', Auth::id())->delete();  
         
        // Initialise the 2FA class
        $google2fa = app('pragmarx.google2fa');

        // Add the secret key to the registration data
        //$prefix = str_pad(Auth::id(), 10, 'X'); // custom adding prefix

        $check_qr = PasswordSecurity::where('user_id', Auth::id())->first('id');  
        if ( $check_qr ) {
            $check_qr->delete();
        }

        PasswordSecurity::create([
            'user_id' => Auth::id(),
            'google2fa_enable' => 0,
            'google2fa_secret' => $google2fa->generateSecretKey(32),
        ]);
    }

    public function enable2fa(Request $request){
        $user = Auth::user();
        $google2fa = app('pragmarx.google2fa');
        $secret = $request->input('verify_code');
        $valid = $google2fa->verifyKey($user->passwordSecurity->google2fa_secret, $secret);
        if ( $valid ) {
            $user->passwordSecurity->google2fa_enable = 1;
            $user->passwordSecurity->save(); 
            Google2FA::login();
        } else {
            abort(403, 'Invalid Verification Code, Please try again.');
        }
    }

    public function disable2fa(Request $request){

            $validatedData = $request->validate([
                'current_pass' => 'required',
            ]);

            if ( !(Hash::check($request->current_pass, Auth::user()->password)) ) { 
                abort(403, 'Your password does not matches with your account password. Please try again.');
            } 
            
            $user = Auth::user();
            $user->passwordSecurity->google2fa_enable = 0;
            $user->passwordSecurity->save(); 
        }

}
