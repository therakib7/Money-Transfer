<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;  
use Modules\MT\Models\MtMt;  

class MTController extends Controller { 
    public function check_status(Request $request) {  
        $this->validate($request, [     
            'ids' => 'array|required',                 
        ]);

        $mts = new MtMt;   
        $mts = $mts->whereIn('id', $request->ids);    
        return $mts->get(['id', 'status']); 
    }
}
