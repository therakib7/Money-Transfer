<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtCommissionUser extends Model {

    protected $fillable = ['user_id', 'commission', 'type', 'updated_by'];

 	public function user() {
 		return $this->belongsTo('App\Models\User', 'user_id');
 	} 

 	public function services() {
 		return $this->hasMany('Modules\MT\Models\MtCommissionUserService', 'user_id', 'user_id');
 	}

 	public function commissions() {
 		return $this->hasMany('Modules\MT\Models\MtCommissionUser', 'user_id', 'user_id');
 	}

 	public function status() {
 		return $this->belongsTo('Modules\MT\Models\MtCommissionUserStatus', 'user_id', 'user_id');
 	} 
}  