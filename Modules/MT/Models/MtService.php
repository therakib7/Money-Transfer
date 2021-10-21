<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtService extends Model {

    protected $fillable = ['status', 'provider_id', 'name', 'slug', 'operator_code', 'min_amount', 'max_amount', 'co_com', 'user_com', 'user_id'];

    public function provider() {
        return $this->belongsTo('Modules\MT\Models\MtProvider', 'provider_id');
    } 

    public function provider_id() {
        return $this->belongsTo('Modules\MT\Models\MtProvider', 'provider_id');
    }

    public function service_fees() {
        return $this->hasMany('Modules\MT\Models\MtServiceFee', 'service_id'); 
    }
} 