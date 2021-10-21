<?php

namespace Modules\MK\Models;

use Illuminate\Database\Eloquent\Model;

class GeneratedNumber extends Model {

    protected $connection = 'oz_mk';

    protected $fillable = ['status', 'provider_id', 'name', 'prefix', 'number'];

    public function provider_id() {
        return $this->belongsTo('Modules\MK\Models\Provider', 'provider_id');
    }
    
}
