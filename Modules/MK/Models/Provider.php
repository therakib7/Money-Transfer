<?php

namespace Modules\MK\Models;

use Illuminate\Database\Eloquent\Model;

class Provider extends Model {

	protected $connection = 'oz_mk';
	
	protected $fillable = ['status', 'name', 'prefix', 'length', 'type', 'location_id', 'user_id'];

	 

}

 