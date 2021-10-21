<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtMobileBankingSecurity extends Model {

    protected $fillable = ['mt_id', 'id_number', 'id_type'];

    public function mt_id() {
    	return $this->belongsTo('Modules\MT\Models\MtMt', 'mt_id');
    }
} 