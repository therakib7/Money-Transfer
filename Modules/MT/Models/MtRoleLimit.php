<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtRoleLimit extends Model {

    protected $fillable = ['role_id', 'max_amount_day', 'max_number_day', 'max_amount_month', 'max_number_month', 'for', 'user_id']; 
   	

   	public function role() {
   	    return $this->belongsTo('App\Models\Role', 'role_id');
   	} 

   	public function service_limits() {
   	    return $this->hasMany(self::class, 'role_id', 'role_id'); 
   	}
}  