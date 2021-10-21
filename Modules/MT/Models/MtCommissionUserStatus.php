<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtCommissionUserStatus extends Model {

    protected $fillable = ['user_id', 'status', 'updated_by'];

}  