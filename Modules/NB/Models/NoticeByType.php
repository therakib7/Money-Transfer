<?php

namespace Modules\NB\Models;

use Illuminate\Database\Eloquent\Model;

class NoticeByType extends Model {

    protected $connection = 'oz_nb';

    public $timestamps = false;

    protected $fillable = ['notice_id', 'role_id', 'location_id'];
   
} 