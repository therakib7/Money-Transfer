<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserChangeHistory extends Model {
	
    protected $fillable = ['key', 'old', 'new', 'user_id'];
    const UPDATED_AT = null;

    public function user() {
    	return $this->belongsTo('App\Models\User', 'user_id');
    }
    
}
