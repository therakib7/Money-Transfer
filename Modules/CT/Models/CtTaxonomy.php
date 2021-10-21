<?php

namespace Modules\CT\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class CtTaxonomy extends Model {

    protected $fillable = ['name', 'slug', 'taxonomy', 'parent_id', 'order', 'user_id']; 

    public function parent() {
        return $this->belongsTo(self::class, 'parent_id');
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
