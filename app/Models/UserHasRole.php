<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserHasRole extends Model {
    protected $fillable = ['user_id', 'role_id']; 

    public $timestamps = false; 

    /**
     * The role that belong to the user.
     */
    public function role() { 
        return $this->belongsTo('App\Models\Role');
    } 
}
