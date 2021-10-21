<?php

namespace Modules\NB\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Notice extends Model {

	protected $connection = 'oz_nb';
	
	protected $fillable = ['app_id', 'schedule_from', 'schedule_to', 'status', 'in_board', 'title', 'native_title', 'content', 'native_content', 'type', 'for', 'user_id'];

	/**
	 * Get all service in this provider
	 */
	public function notice_by_types() {
	    return $this->hasMany('Modules\NB\Models\NoticeByType', 'notice_id');
	}

	/*public function getScheduleFromAttribute($date) {
	    return Carbon::parse($date)->format('d-M-Y H:i:s');
	}

	public function getScheduleToAttribute($date) {
	    return Carbon::parse($date)->format('d-M-Y H:i:s');
	}*/
 
} 