<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    /** * Set how many failed logins are allowed before being locked out. */ 
    public $maxAttempts = 5; 

    /** * Set how many minutes a lockout will last. */
    public $decayMinutes = 60; 

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/admin/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('guest')->except('logout');
    } 

    protected function credentials(Request $request) {
        
        if ( is_numeric($request->email ) ) {
            return [ 'mobile' => $request->email, 'password' => $request->password ];
        } elseif ( filter_var($request->email, FILTER_VALIDATE_EMAIL) ) {
            return [ 'email' => $request->email, 'password' => $request->password ];
        } else {
            return [ 'username' => $request->email, 'password' => $request->password ]; 
        }
    } 

    /**
     * Check active account
     */
    protected function authenticated(Request $request, $user) {
        if ($user->status == 0) {  
            Auth::logout($request);
         
            return redirect()->back() 
                ->withErrors([
                    'email' => 'Sorry! You are temporary blocked. please contact to admin',
                ]);
        }
    }

}
