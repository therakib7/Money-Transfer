<?php
namespace App\Http\Middleware;
use App\Support\Google2FAAuthenticator;
use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie; 

class Google2FAMiddleware {

	/**
	* Handle an incoming request.
	*
	* @param  \Illuminate\Http\Request  $request
	* @param  \Closure  $next
	* @return mixed
	*/

	public function handle($request, Closure $next) { 

		$user = Auth::user();
		if ( $user->passwordSecurity()->exists() && $user->passwordSecurity->google2fa_enable ) {
			$authenticator = app(Google2FAAuthenticator::class)->boot($request);
			if ( $authenticator->isAuthenticated() ) {  
				return $next($request);
			}

			$oz_device_key = Cookie::get('oz_device_key'); 
			if ( $oz_device_key ) {
				$check_key = \App\Models\TrustedDevice::where('user_id', Auth::id())->where('oz_device_key', $oz_device_key)->first('oz_device_key');  
				if ( !$check_key ) {
					return $authenticator->makeRequestOneTimePasswordResponse();
				}
				return $next($request);
			} else {
				return $authenticator->makeRequestOneTimePasswordResponse();
			} 
		} else {
			return $next($request);
		}
	}
}