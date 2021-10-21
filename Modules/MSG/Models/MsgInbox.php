<?php

namespace Modules\MSG\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth; 

class MsgInbox extends Model {

    protected $fillable = ['from_user_id', 'to_user_id', 'msg', 'read', 'from_deleted', 'to_deleted'];
    const UPDATED_AT = null;

    public function user_from() {
    	return $this->belongsTo('App\Models\User', 'from_user_id')->where('id', '!=', Auth::id());
    }

    public function user_to() {
    	return $this->belongsTo('App\Models\User', 'to_user_id')->where('id', '!=', Auth::id());
    }

 
    
} 