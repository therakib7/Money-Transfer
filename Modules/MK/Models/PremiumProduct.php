<?php

namespace Modules\MK\Models;

use Illuminate\Database\Eloquent\Model;

class PremiumProduct extends Model {

	protected $connection = 'oz_mk';
	
	protected $fillable = ['status', 'name', 'site_url', 'verify_at', 'valid_till', 'user_id'];

	 

}

 