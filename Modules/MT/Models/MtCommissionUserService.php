<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtCommissionUserService extends Model {

    protected $fillable = ['user_id', 'provider_id', 'service_id', 'commission', 'from_service', 'type', 'updated_by'];

 	public function user_info() {
 		return $this->belongsTo('App\Models\User', 'user_id');
 	} 
}  