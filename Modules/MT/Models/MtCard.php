<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtCard extends Model {
	
    protected $fillable = ['service_id', 'bundle_name', 'amount', 'pin', 'created_by', 'used_by', 'used_time'];

    public function service_id() {
    	return $this->belongsTo('Modules\MT\Models\MtService', 'service_id');
    }
} 