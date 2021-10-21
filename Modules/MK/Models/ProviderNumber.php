<?php

namespace Modules\MK\Models;

use Illuminate\Database\Eloquent\Model;

class ProviderNumber extends Model {

    protected $connection = 'oz_mk';

    protected $fillable = ['status', 'provider_id', 'generated_number_id', 'location_id'];

    
}
