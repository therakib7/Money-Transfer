<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class MtReferralBalance extends Model {

    protected $fillable = ['from_user_id', 'to_user_id', 'amount', 'used_amount'];

    public function user() {
    	return $this->belongsTo('App\Models\User', 'to_user_id');
    }

} 