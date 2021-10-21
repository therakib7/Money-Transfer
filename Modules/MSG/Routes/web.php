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

Route::group([ 'prefix' => 'api/v1/msg', 'middleware' => ['auth', 'clearance', '2fa'],  'namespace' => 'Api\V1'], function () { 
    Route::apiResources([
        'inboxes' => 'InboxController',     
    ]); 

    Route::get('inboxusers', 'InboxController@inboxusers'); 
});
