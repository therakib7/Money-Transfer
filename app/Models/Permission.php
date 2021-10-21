<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model {

	protected $fillable = ['name', 'guard_name', 'parent_id']; 

	public function childs() {
	    return $this->hasMany(self::class, 'parent_id')->with('childs');
	} 

	public static function lists(array $objects, array &$result = array(), $parent = 0, $depth = 0 ) {
	    foreach ($objects as $key => $object) {
	        if ($object['parent_id'] == $parent) {
	            $object['depth'] = $depth;
	            array_push($result, $object);
	            unset($objects[$key]);
	            self::lists($objects, $result, $object['id'], $depth + 1);
	        }
	    }
	    return $result;
	} 
 
}
