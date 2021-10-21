<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtSimBalanceHistory extends Model {
	
    protected $fillable = ['number', 'provider_id', 'amount', 'note', 'user_id'];

    public function provider_id() {
    	return $this->belongsTo('Modules\MT\Models\MtProvider', 'provider_id');
    }
 
} 