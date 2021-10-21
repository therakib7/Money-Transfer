<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtPackData extends Model {

    protected $fillable = ['pack_id', 'data', 'data_type', 'network', 'policy', 'validity', 'validity_type', 'period_from', 'period_to', 'comment', 'is_bonus'];

    protected $table = 'mt_pack_datas';

    public function service_id() {
    	return $this->belongsTo('Modules\MT\Models\MtService', 'service_id');
    }

} 