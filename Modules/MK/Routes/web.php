<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group([ 'prefix' => 'api/v1/mk', 'middleware' => ['auth', 'clearance', '2fa'],  'namespace' => 'Api\V1'], function () { 
    Route::apiResources([ 
        'providers' => 'ProviderController',
        'generated-numbers' => 'GeneratedNumberController',    
        'provider-numbers' => 'ProviderNumberController',    
    ]); 

    Route::post('download-numbers', 'GeneratedNumberController@download'); 
 
});

/* Product purchase verify like amazon affiliate plugin */
Route::group([ 'prefix' => 'api/v1/mk', 'namespace' => 'Api\V1'], function () {  
    Route::get('verify_purchase', 'PremiumProductController@index');  
});
