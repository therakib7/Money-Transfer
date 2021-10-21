<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtUserDayLimit extends Model {

	public $timestamps = false;

    protected $fillable = ['user_id', 'used_amount', 'used_number', 'for', 'date']; 
   
}  