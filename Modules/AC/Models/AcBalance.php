<?php

namespace Modules\AC\Models;

use Illuminate\Database\Eloquent\Model;

class AcBalance extends Model {

    protected $fillable = ['user_id', 'balance'];

  	public static function balance() {
  	    $auth_id =  auth()->user()->id;   	    
  	    $balance = AcBalance::select('balance')->where('user_id', $auth_id)->first(); 
  	    return $balance->balance;
  	}

} 