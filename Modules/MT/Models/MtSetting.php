<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtSetting extends Model {

    protected $fillable = ['key', 'value', 'updated_by'];

}  