<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtSettingUser extends Model {

    protected $fillable = ['key', 'value', 'user_id'];

}  