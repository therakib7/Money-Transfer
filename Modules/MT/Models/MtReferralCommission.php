<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class MtReferralCommission extends Model {

    protected $fillable = ['from_user_id', 'to_user_id', 'amount', 'mt_id', 'note', 'status'];

    public function user() {
    	return $this->belongsTo('App\Models\User', 'from_user_id');
    }

    public function user_to() {
    	return $this->belongsTo('App\Models\User', 'to_user_id');
    }

} 