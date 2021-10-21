<?php

namespace Modules\GEO\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model {

    protected $connection = 'oz_geo';

    protected $fillable = ['status', 'country_id', 'name', 'parent_id', 'stage_id', 'order', 'user_id', 'native_name', 'code', 'lat', 'long', 'web'];

    /**
     * Get all country stage
     */
    public function countrystages() {
        return $this->hasMany('Modules\GEO\Models\CountryStage', 'country_id');
    }

    /* Get Only One Step Parent */
    public function one_parents() {
        return $this->belongsTo(self::class, 'parent_id')->select('id', 'name', 'native_name', 'parent_id');
    } 

    public function parent() {
        return $this->belongsTo(self::class, 'parent_id')->select('id', 'name', 'native_name', 'parent_id')->with('parent');
    }

    public function parent_ids() {
        return $this->belongsTo(self::class, 'parent_id')->select('id', 'parent_id')->with('parent_ids');
    }

    public function childs() {
        return $this->hasMany(self::class, 'parent_id')->with('childs');
    } 

    public static function lists( $taxonomy ) {
        //$categories = $categories->where('user_id', Auth::id());
        $taxonomies = CTTaxonomy::where('taxonomy', $taxonomy)->whereIn('user_id', [Auth::id(), 0])->get();
        return self::buildArray($taxonomies->toArray());
    }

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
