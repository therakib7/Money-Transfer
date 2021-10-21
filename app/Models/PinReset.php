<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PinReset extends Model {
    
    public $timestamps = false;

    protected $fillable = ['user_id', 'code', 'created_at']; 

    public function user() {
        return $this->belongsTo('App\Models\User');
    }
}
