<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrustedDevice extends Model {
    
    protected $fillable = ['app_id', 'user_id', 'oz_device_key', 'user_agent']; 

    public function user() {
        return $this->belongsTo('App\Models\User');
    }
} 