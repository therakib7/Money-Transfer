<?php

namespace Modules\CT\Models;

use Illuminate\Database\Eloquent\Model;

class CtContactService extends Model {

    protected $fillable = ['type', 'contact_id', 'number', 'provider_id', 'service_id', 'user_id']; 
    

    public function provider_id() {
        return $this->belongsTo('Modules\MT\Models\MtProvider', 'provider_id');
    } 


} 