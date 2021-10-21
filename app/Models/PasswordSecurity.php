<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordSecurity extends Model {
    
    protected $fillable = ['user_id', 'google2fa_enable', 'google2fa_secret']; 

    public function user() {
        return $this->belongsTo('App\Models\User');
    }
}
