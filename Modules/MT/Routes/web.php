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

Route::group([ 'prefix' => 'api/v1/mt', 'middleware' => ['cors'], 'namespace' => 'Api\V1'], function () {   
    Route::get('mts_queue', 'ModemController@index');    
    Route::post('mts_status', 'ModemController@update');   
});

Route::group([ 'prefix' => 'api/v1/mt', 'middleware' => ['auth', 'clearance', '2fa'], 'namespace' => 'Api\V1'], function () { 
    
    Route::get('dashboards','DashboardController@index');

    Route::resources([
        'services' => 'ServiceController',  
        'providers' => 'ProviderController',  
        'banking-accounts' => 'BankingAccountController',  
        'banking-providers' => 'BankingProviderController', 
        'transfer-request' => 'TransferRequestController', 
        'sims' => 'SimController', 
        'simbalances' => 'SimBalanceController',  
        'packs' => 'PackController',    
        'cards' => 'CardController', 
        'dues' => 'DueController', 
        'paiddues' => 'DuePaymentController',   
        'commissionusers' => 'CommissionCustomUserController',  
        'limits' => 'LimitController',     
        'helps' => 'HelpController',  
    ]);    
    Route::get('simbalancehistories', 'SimBalanceHistorieController@index'); 
    Route::get('userhelps', 'HelpController@userIndex'); 

    //pack last checked
    Route::post('lastchecked', 'PackController@lastchecked');

    Route::post('mt-checkstatus', 'MTController@check_status');
    
    Route::post('mobilerecharges', 'MobileRechargeController@store')->middleware('throttle:5,1,mobile-recharge'); // can request 5 times every one minute
    Route::resource('mobilerecharges', 'MobileRechargeController', ['except' => ['store', 'create', 'edit']]);

    //mobile recharge status update by manually
    Route::post('mr-modifystatus', 'MobileRechargeController@modifystatus'); 

    Route::post('mobilebankings', 'MobileBankingController@store')->middleware('throttle:5,1,mobile-banking');  // can request 5 times every one minute
    Route::resource('mobilebankings', 'MobileBankingController', ['except' => ['store', 'create', 'edit']]);

    //mobile banking status update by manually
    Route::post('mb-modifystatus', 'MobileBankingController@modifystatus'); 

    Route::get('co-mbs', 'CashoutMBankingController@index'); 
    Route::post('co-mbs', 'CashoutMBankingController@store')->middleware('throttle:5,1,cashout-mb');  // can request 5 times every one minute

    Route::post('ubps', 'UtilityBillController@store')->middleware('throttle:5,1,utility-bill-pay');  // can request 5 times every one minute
    Route::resource('ubps', 'UtilityBillController', ['except' => ['store', 'create', 'edit']]); 

    //utility bill pay status update by manually
    Route::post('ubp-modifystatus', 'UtilityBillController@modifystatus'); 

    Route::get('referralcommissions', 'ReferralCommissionController@index');  

    Route::get('packsearch','PackController@packsearch');

    Route::get('suggestions','PackController@suggestions');

    Route::post('settings', 'SettingController@index'); 
    Route::post('settings_update', 'SettingController@update'); 

    Route::post('settingusers', 'SettingUserController@index'); 
    Route::post('settingusers_update', 'SettingUserController@update');  

    Route::get('taxonomies/{tax_name}', 'TaxonomyController@index')->where('tax_name', '[a-z-]+');
    Route::resource('taxonomies', 'TaxonomyController', ['except' => ['index', 'create', 'edit']]);
});