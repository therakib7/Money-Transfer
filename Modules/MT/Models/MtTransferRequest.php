<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtTransferRequest extends Model {

    protected $fillable = ['status', 'banking_provider_id', 'to_ac_no', 'from_ac_no', 'amount', 'received_amount', 'user_note', 'checker_note', 'statement_id', 'user_id', 'checked_by'];

    public function banking_provider_id() {
    	return $this->belongsTo('Modules\MT\Models\MtBankingProvider', 'banking_provider_id');
    }

    public function user() {
    	return $this->belongsTo('App\Models\User', 'user_id');
    }
} 

