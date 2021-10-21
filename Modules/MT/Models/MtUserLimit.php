<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtUserLimit extends Model {

    protected $fillable = ['user_id', 'max_amount_day', 'max_number_day', 'max_amount_month', 'max_number_month', 'for', 'created_by']; 

    public function user() {
        return $this->belongsTo('App\Models\User', 'user_id');
    } 

    public function service_limits() {
        return $this->hasMany(self::class, 'user_id', 'user_id'); 
    }
   
}  