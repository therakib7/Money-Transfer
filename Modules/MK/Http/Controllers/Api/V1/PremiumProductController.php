<?php

namespace Modules\MK\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use Carbon\Carbon;

use Modules\MK\Models\PremiumProduct;  

class PremiumProductController extends Controller {

    public function index( Request $request ) { 

        $site_url = $request->header('Site-URL');
        $access_token = $request->header('Access-Token');
        $purchase_code = $request->header('Purchase-Code');
        $premium_product = PremiumProduct::where('status', null)->where('access_token', $access_token)->where('purchase_code', $purchase_code)->first(['id', 'access_token', 'purchase_code', 'valid_year']); 

        if ( $premium_product ) {
            $pre_pro = PremiumProduct::find( $premium_product['id'] );  

            $pre_pro->update([
                'status' => 1,
                'site_url' => $site_url,   
                'verify_at' => date('Y-m-d H:i:s'),   
                'valid_till' => date('Y-m-d H:i:s', strtotime('+'.$premium_product['valid_year'].' years')),   
                'updated_at' => date('Y-m-d H:i:s'),   
            ]);  

            return [  
                'status' => 'success',
                'item_name' => $premium_product['name'],
                'access_token' => $premium_product['access_token'],
                'purchase_code' => $premium_product['purchase_code'], 
            ];
        } else {
            return [
                'status' => 'failed',
            ];
        } 
        
    } 

}
