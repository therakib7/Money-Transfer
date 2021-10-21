<?php 

namespace App\Http\Middleware;

use RuntimeException;
use Illuminate\Routing\Middleware\ThrottleRequests;

class ThrottleRequestsByRoute extends ThrottleRequests {

    protected function resolveRequestSignature($request)
    {
        if ($route = $request->route()) {
            return sha1($route->getDomain().'|'.$request->ip());
        }
        throw new RuntimeException('Unable to generate the request signature. Route unavailable.');
    }
}