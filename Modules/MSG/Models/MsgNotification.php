<?php

namespace Modules\MSG\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth; 

class MsgNotification extends Model {

    protected $fillable = ['to_user_id', 'type', 'msg', 'read'];
    const UPDATED_AT = null;
 
    
} 
 