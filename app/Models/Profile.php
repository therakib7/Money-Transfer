<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model {

	protected $fillable = ['user_id', 'avatar', 'nid', 'birth_crt', 'passport', 'bday', 'occupation', 'pre_address', 'per_address'];
	 
    public function user() {
    	return $this->belongsTo('App\Models\User');
    }

    public function avatar_src() { 
    	return $this->belongsTo('App\Models\Media', 'avatar');
    } 

    public function parent() {
        return $this->belongsTo('Modules\GEO\Models\Location', 'parent_id')->select('id', 'name', 'native_name', 'parent_id')->with('parent');
    }

    public function pre_address() {
        return $this->belongsTo('Modules\GEO\Models\Location', 'pre_address')->select('id', 'name', 'native_name', 'parent_id', 'stage_id')->with('parent');
    }

    public function per_address() {
        return $this->belongsTo('Modules\GEO\Models\Location', 'per_address')->select('id', 'name', 'native_name', 'parent_id', 'stage_id')->with('parent');
    }

}
