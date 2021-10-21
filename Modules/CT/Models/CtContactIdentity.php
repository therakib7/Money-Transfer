<?php

namespace Modules\CT\Models;

use Illuminate\Database\Eloquent\Model;

class CtContactIdentity extends Model {

    protected $fillable = ['contact_id', 'id_number', 'id_type', 'user_id']; 
    
} 