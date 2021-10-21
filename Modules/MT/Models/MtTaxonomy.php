<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtTaxonomy extends Model
{
    protected $fillable = ['name', 'slug', 'taxonomy', 'parent_id', 'order', 'user_id'];

    /**
    * Get all of the providers with service that are assigned this taxonomy.
    */
    public function providers() {
        return $this->morphedByMany('Modules\MT\Models\MtProvider', 'mt_taxable')->where('status', 1)->with('services:id,name,slug,min_amount,max_amount,provider_id'); 
    }

    /**
    * Get all of the providers that are assigned this taxonomy.
    */
    public function provider_without_services() {
        return $this->morphedByMany('Modules\MT\Models\MtProvider', 'mt_taxable')->where('status', 1); 
    }

    /**
    * Get all of the providers and service and fees that are assigned this taxonomy.
    */
    public function provider_with_fees() { 
        return $this->morphedByMany('Modules\MT\Models\MtProvider', 'mt_taxable')->where('status', 1)->with(['services:id,name,slug,min_amount,max_amount,provider_id', 'categories', 'services.service_fees']);
    } 

    /**
    * Get all of the providers and service and fees that are assigned this taxonomy.
    */
    public function provider_with_cats() { 
        return $this->morphedByMany('Modules\MT\Models\MtProvider', 'mt_taxable')->where('status', 1)->with(['services:id,name,slug,min_amount,max_amount,provider_id', 'logo_small_src:id,resized_name', 'categories']);
    } 

    /**
    * Not Mobile Banking Cashout
    */
    public function provider_with_fees_not_co() { 
        return $this->morphedByMany('Modules\MT\Models\MtProvider', 'mt_taxable')->where('status', 1)->with([ 
                'services' => function ($query) {
                    $query->select(['id', 'name', 'slug', 'min_amount', 'max_amount', 'provider_id']);  
                    $query->where('slug', 'cash-in');  
                }, 
                'categories', 
                'services.service_fees'
                ]);
    }

    /**
     * The role that belong to the help or help cat.
     */
    public function roles() { 
        return $this->belongsToMany('App\Models\Role', 'mt_help_roles', 'id', 'role_id')->where('type', 'cat');
    } 
    
    public function parent() {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function childs() {
        return $this->hasMany(self::class, 'parent_id')->with('childs');
    } 

    public static function lists( $taxonomy ) {
        $taxonomies = MtTaxonomy::where('taxonomy', $taxonomy)->get();
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
