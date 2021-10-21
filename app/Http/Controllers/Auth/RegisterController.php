<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon; 

use App\Models\User;
use App\Models\Profile;
use Modules\AC\Models\AcBalance;  
use App\Models\Role;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/admin/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['guest']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    { 

        if ( is_numeric($data['email'] ) ) {
            return Validator::make($data, [
                'ref_id' => 'string|nullable',
                'name' => ['required', 'string', 'max:255'],
                'email' => 'required|numeric|unique:users,mobile',
                'terms_and_conditions' =>'accepted',
                'password' => [
                    'required',
                    'string',
                    'confirmed',             
                    'min:8',             // must be at least 6 characters in length
                    'regex:/[a-zA-Z]/',      // must contain at least one alphabet letter
                    'regex:/[0-9]/',      // must contain at least one digit
                ],
                //'g-recaptcha-response' => 'required|recaptcha',
            ]); 
        } elseif ( filter_var($data['email'] , FILTER_VALIDATE_EMAIL) ) {
            return Validator::make($data, [
                'ref_id' => 'string|nullable',
                'name' => ['required', 'string', 'max:255'],
                'email' => 'required|string|email|max:255|unique:users',
                'terms_and_conditions' =>'accepted',
                'password' => [
                    'required',
                    'string',
                    'confirmed',             
                    'min:8',             
                    'regex:/[a-zA-Z]/',     
                    'regex:/[0-9]/',    
                ],
                //'g-recaptcha-response' => 'required|recaptcha',
            ]); 
        } else {
            return Validator::make($data, [
                'ref_id' => 'string|nullable',
                'name' => ['required', 'string', 'max:255'],
                'email' => 'required|string|max:100|unique:users,username',
                'terms_and_conditions' =>'accepted',
                'password' => [
                    'required',
                    'string',
                    'confirmed',             
                    'min:8',            
                    'regex:/[a-zA-Z]/',      
                    'regex:/[0-9]/',      
                ],
                //'g-recaptcha-response' => 'required|recaptcha',
            ]); 
        } 
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data) { 

        $user = null;
        DB::transaction( function() use ($data, &$user ) {

            $user_data = [
                'name' => $data['name'], 
                'password' => Hash::make($data['password']), 
                'status' => 1,
            ];

            if ( is_numeric($data['email'] ) ) {
                $user_data['mobile'] = $data['email'];
            } elseif (filter_var($data['email'] , FILTER_VALIDATE_EMAIL)) {
                $user_data['email'] = $data['email'];
            } else {
                $user_data['username'] = $data['email'];
            } 

            if ( $data['ref_id'] ) {
                $user_data['ref_user_id'] = base64_decode( $data['ref_id'] );
            }

            $user = User::create($user_data);  

            $profile = Profile::create([
                'user_id' => $user->id,  
            ]); 

            AcBalance::create([
                'user_id' => $user->id, 
                'balance' => 0, 
            ]); 

            $role = Role::select('id')->where('slug', 'personal')->first(); 

            $user_role = [
                'user_id' => $user->id, 
                'role_id' => $role->id, 
            ]; 
            $user->roles()->create( $user_role ); 

        }); // end DB Transection

        return $user; 
    }

    public function terms_n_conditions() { 
        return view('auth/terms_n_conditions');
    }

    public function privacy_policy() { 
        return view('auth/privacy_policy');
    }
}
