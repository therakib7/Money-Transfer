<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    public function user() {
    	return $this->belongsTo('App\Models\User');
    }

    public static function ApiToken() {
        return collect(session()->getDrivers())->first()->getId();
    }
}
