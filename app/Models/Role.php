<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 

use App\Traits\Excludable;


class Role extends Model {

    use Excludable;
    
    protected $fillable = ['name', 'slug', 'desc', 'user_id']; 

    /**
     * The users that belong to the role.
     */
    public function users() {
        return $this->belongsToMany('App\Models\User');
    }

    /**
     * The insert permission pivot with role
     */
    public function permissions() { 
        return $this->hasMany(RoleHasPermission::class);
    } 

    /**
     * Get Role Permission
     */
    public function permission() {
       return $this->belongsToMany(Permission::class, 'role_has_permissions');
    }  

}
