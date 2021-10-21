<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtBankingAccount extends Model {

    protected $fillable = ['status', 'banking_provider_id', 'ac_holder_name', 'ac_no', 'ac_type', 'user_id'];

    public function banking_provider_id() {
        return $this->belongsTo('Modules\MT\Models\MtBankingProvider', 'banking_provider_id');
    } 
     
} 
