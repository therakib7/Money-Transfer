<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth; 

use Illuminate\Http\Request; 

class SuperAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) { 
        
        if ( !auth_role(['super-admin']) ) {
            abort(403, 'Sorry! You don\'t have permission');
        }
        
        return $next($request);

    }
}
