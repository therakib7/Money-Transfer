<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

use App\Models\Role;
use App\Models\Session;

use Illuminate\Http\Request; 

class Clearance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) {

        /* Registration Referral */ 
        //$request->merge( array("ref_id" => $request['ref_id'] ?? null  ) );
        if ( !Auth::user()->status ) {
            abort(403, 'Sorry! You are temporary blocked. please contact to admin');
        }
        
        return $next($request);

    }
}
