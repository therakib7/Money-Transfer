<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleHasPermission extends Model {
    protected $fillable = ['role_id', 'permission_id'];

    public $timestamps = false;

    public function permissions() {
    	return $this->belongsToMany('App\Models\Permission', 'permission_id');
    }
 
}
