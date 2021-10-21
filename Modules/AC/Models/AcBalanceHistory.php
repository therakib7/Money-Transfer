<?php

namespace Modules\AC\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class AcBalanceHistory extends Model {

    protected $fillable = ['type', 'from_user_id', 'to_user_id', 'amount', 'statement_id', 'note'];

    protected $appends = ['transection_type'];

    public function user_from() {
    	return $this->belongsTo('App\Models\User', 'from_user_id')->where('id', '!=', Auth::id());
    }

    public function user_to() {
    	return $this->belongsTo('App\Models\User', 'to_user_id')->where('id', '!=', Auth::id());
    }
 
    public function getTransectionTypeAttribute() {   	
    	return ( $this->attributes['to_user_id'] == Auth::id() ) ? 'Income' : 'Expense';
    }

} 