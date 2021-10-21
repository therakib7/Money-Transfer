<?php

namespace Modules\GEO\Models;

use Illuminate\Database\Eloquent\Model;

class CountryStage extends Model {

	protected $connection = 'oz_geo';
	
	protected $fillable = ['country_id', 'stage', 'name', 'native_name', 'user_id'];

	public static function buildArray(array $objects, array &$result = array(), $parent = 0, $depth = 0 ) {
	    foreach ($objects as $key => $object) {
	        if ($object['parent_id'] == $parent) {
	            $object['depth'] = $depth;
	            array_push($result, $object);
	            unset($objects[$key]);
	            self::buildArray($objects, $result, $object['id'], $depth + 1);
	        }
	    }
	    return $result;
	} 

}

 