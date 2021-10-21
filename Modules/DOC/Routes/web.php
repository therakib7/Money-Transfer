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

Route::group([ 'prefix' => 'api/v1/doc', 'middleware' => ['auth', 'clearance', '2fa'],  'namespace' => 'Api\V1'], function () { 
    Route::apiResources([  
        'docs' => 'DocController',    
    ]); 

    Route::get('taxonomies/{tax_name}', 'TaxonomyController@index')->where('tax_name', '[a-z-]+');
    Route::resource('taxonomies', 'TaxonomyController', ['except' => ['index', 'create', 'edit']]);
 
});
