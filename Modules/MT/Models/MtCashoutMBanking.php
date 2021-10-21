<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtCashoutMBanking extends Model {

    protected $fillable = ['service_id', 'number', 'amount', 'co_com', 'user_com', 'status', 'trxid', 'used_by', 'msg'];

    public function service_id() {
    	return $this->belongsTo('Modules\MT\Models\MtService', 'service_id');
    }

    public function user() {
    	return $this->belongsTo('App\Models\User', 'used_by');
    } 
} 