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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes(['verify' => true]);

Route::group( [ 'prefix' => 'admin', 'middleware' => ['auth', 'clearance', 'super-admin'] ], function() { 
    Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index'); 
});  

Route::get('/terms-and-conditions', '\App\Http\Controllers\Auth\RegisterController@terms_n_conditions')->name('terms_n_conditions'); 
Route::get('/privacy-policy', '\App\Http\Controllers\Auth\RegisterController@privacy_policy')->name('privacy_policy'); 

Route::group( [ 'prefix' => 'admin', 'middleware' => ['auth', 'clearance', '2fa'] ], function() { 
	// common route 
    Route::get('/{any}', 'HomeController@index')->where('any', '.*'); 
});  

Route::group([ 'prefix' => 'api/v1', 'middleware' => ['auth', 'clearance', '2fa'], 'namespace' => 'Api\V1'], function () {
     
    Route::apiResources([
        'users' => 'UserController',
        'roles' => 'RoleController',
        'permissions' => 'PermissionController',
        'medias' => 'MediaController', 
    ]); 

    Route::get('userchangehistories', 'ChangeHistoryController@index'); 

    Route::post('profiles', 'UserController@profile_info'); 
    Route::post('profiles_update', 'UserController@profile_update');

    Route::post('pin-status-update', 'SecurityController@pin_status_update')->middleware('throttle:5,60, pin-status-update');
     
});

Route::group([ 'prefix' => 'api/v1/security', 'middleware' => ['auth', 'clearance', '2fa'], 'namespace' => 'Api\V1'], function () {     
    Route::post('password-update', 'SecurityController@password_update')->middleware('throttle:5,60, password-update'); 
    Route::post('pin-update', 'SecurityController@pin_update')->middleware('throttle:5,60, pin-update');  
    Route::get('pin-generate-code', 'SecurityController@get_pin_generate_code');  
    Route::post('pin-generate-code', 'SecurityController@pin_generate_code')->middleware('throttle:5,60, pin-generate-code');  
    Route::post('pin-reset', 'SecurityController@pin_reset')->middleware('throttle:5,60, pin-reset');  
    Route::post('mobile-update', 'SecurityController@mobile_update');
    Route::post('username-update', 'SecurityController@username_update');
    Route::post('email-update', 'SecurityController@email_update'); 
});

/* Two Step Authentication */
Route::group( [ 'middleware' => ['auth', 'clearance', '2fa'] ], function() { 
    Route::get('/2fa','PasswordSecurityController@show2faForm');
    Route::post('/generate2faSecret','PasswordSecurityController@generate2faSecret')->name('generate2faSecret');
    Route::post('/2fa','PasswordSecurityController@enable2fa')->name('enable2fa')->middleware(['throttle:5,60,otp-verify', '2fa']);
    Route::post('/disable2fa','PasswordSecurityController@disable2fa')->name('disable2fa');

    Route::post('/2faVerify', function ( Illuminate\Http\Request $request ) { 

        if ( $request->save_device ) {
            $device_key = Hash::make( uniqid( rand(), true ) ); 
            Illuminate\Support\Facades\Cookie::queue('oz_device_key', $device_key, 10080); // save cookie for 7 days
            $check_key = \App\Models\TrustedDevice::where('oz_device_key', '$device_key')->first('oz_device_key');
            if ( ! $check_key ) {
                App\Models\TrustedDevice::create([
                    'user_id' => Auth::id(),
                    'oz_device_key' => $device_key,
                    'user_agent' => $request->header('User-Agent'),
                ]);
            } 
        }
        
        return redirect('admin/home');
    })->name('2faVerify')->middleware(['throttle:5,60,otp-verify', '2fa']);

});  
