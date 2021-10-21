<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtSim extends Model {

    protected $fillable = ['terminal_id', 'type', 'user_id'];

    /**
     * Insert and get taxonomy
     */
    public function providers() {
        return $this->hasMany('Modules\MT\Models\MtSimProvider', 'sim_id');
    }
 
} 