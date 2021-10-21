<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtDuePayment extends Model {

    protected $fillable = ['due_id', 'provider_id', 'service_id', 'amount', 'note', 'type', 'date_time'];

    const UPDATED_AT = null;

    public function provider_id() {
    	return $this->belongsTo('Modules\MT\Models\MtProvider', 'provider_id');
    }

    public function service_id() {
    	return $this->belongsTo('Modules\MT\Models\MtService', 'service_id');
    }

    public function setCreatedAtAttribute($value) { 
        $this->attributes['created_at'] = \Carbon\Carbon::now(); 
    }
    
}  