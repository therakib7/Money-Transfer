<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtDue extends Model {

    protected $fillable = ['type', 'contact_id', 'amount', 'paid', 'due', 'user_id']; 

    public function contact() {
    	return $this->belongsTo('Modules\CT\Models\CtContact', 'contact_id');
    }

    public function due_payments() {
    	return $this->hasMany('Modules\MT\Models\MtDuePayment', 'due_id');
    } 
   
} 

 