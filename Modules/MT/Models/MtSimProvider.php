<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtSimProvider extends Model {
	
    protected $fillable = ['sim_id', 'terminal_id', 'number', 'balance_code', 'provider_id'];

    public function provider_id() {
    	return $this->belongsTo('Modules\MT\Models\MtProvider', 'provider_id');
    }
    
    public function sim_id() {
    	return $this->belongsTo('Modules\MT\Models\MtSim', 'sim_id');
    }
} 