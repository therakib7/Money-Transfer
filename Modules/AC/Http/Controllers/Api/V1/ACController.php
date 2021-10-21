<?php

namespace Modules\AC\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use Modules\AC\Models\AcBalance; 
use Modules\AC\Models\AcBalanceHistory; 
use App\Models\User;

class ACController extends Controller {

    public function ac_balance() { 
        $ac_balance = AcBalance::select('balance')->where('user_id', Auth::id() )->first();  
        return compact('ac_balance');
    }

    public function index( Request $request ) { 

        $title = $request->title;

        $this->validate($request, [
            'match' => 'boolean|nullable',  
        ]);

        if (strpos($title, '@') !== false) {
            $this->validate($request, [
                'title' => 'email|nullable',  
            ]);
        } else {
            $this->validate($request, [
                'title' => 'alpha_dash|nullable',  
            ]);
        }  

        $users = new User; 

        $users = $users->where('id', '!=', Auth::id()); 
        $users = $users->with('profile:user_id,avatar', 'profile.avatar_src'); 

        if ( $title ) {
            $titles = explode(' ', $title);

            $users = $users->where( function ($query) use($titles, $request) {
                foreach($titles as $title) {
                    if ( $request->match ) {
                        $query->orWhere('username', $title );
                        $query->orWhere('email', $title );
                        $query->orWhere('mobile', $title );
                    } else {
                        $query->orWhere('username', 'LIKE', '%'.$title.'%');
                        $query->orWhere('email', 'LIKE', '%'.$title.'%');
                        $query->orWhere('mobile', 'LIKE', '%'.$title.'%'); 
                    } 
                }
            }); 
        } 

        $users = $users->get(['id', 'name']); 

        return compact('users');
    } 

    public function store(Request $request) { }  

    public function update(Request $request, $id) { } 
    
    public function destroy( $id ) { }
}
