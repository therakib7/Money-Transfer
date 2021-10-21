<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtServiceFee extends Model {

    protected $fillable = ['service_id', 'from', 'to', 'co_fee', 'user_fee', 'percent', 'user_id'];
    
} 