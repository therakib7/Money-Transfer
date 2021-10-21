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

Route::group([ 'prefix' => 'api/v1/ac', 'middleware' => ['auth', 'clearance', '2fa'],  'namespace' => 'Api\V1'], function () { 
    Route::apiResources([
        //'balancetransfers' => 'ACBalanceTransferController',   
        'accounts' => 'ACController',   
    ]); 
    Route::get('ac_balance','ACController@ac_balance');

    Route::get('balancetransfers', 'ACBalanceTransferController@index'); 
    Route::post('balancetransfers', 'ACBalanceTransferController@store')->middleware('throttle:5,60,balance-transfer');  // 5 request in 60 minute


});