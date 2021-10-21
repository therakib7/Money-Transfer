<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Auth;

use App\Models\Role;
use App\Models\User;
use Modules\AC\Models\AcBalance;  
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller {
    public function __construct() {
        //$this->middleware(['auth', 'verified']);
    }
     
    public function index() {
        
        //$per = User::permissions('all'); 

        $user = new User;  
        $user = $user->with('profile.avatar_src', 'roles');
        $user = $user->where('id', Auth::id());
        $user = $user->first();  

        // $auth_image = ( $user['profile']['avatar_src'] ) ? Storage::disk('s3')->url('avatar/' . $user['profile']['avatar_src']['resized_name'] ) : '/default/imgs/user.jpg'; 
        //Todo: temp
        $auth_image = ( $user['profile']['avatar_src'] ) ? '/default/imgs/user.jpg' : '/default/imgs/user.jpg'; 

        $auth_balance = AcBalance::balance();

        $auth_role = $user['role'][0]['name'];

        $date = $user['created_at'];
        $auth_since = $date->format('d-M-Y');

        return view('home', [
            'auth_name' => $user['name'],
            'auth_since' => $auth_since,
            'auth_role' => $auth_role, 
            //'per' => $per, 
            'auth_image' => $auth_image,
            'auth_balance' => $auth_balance,
        ]);
    }
}
