<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtProvider extends Model {

    protected $fillable = ['status', 'name', 'slug', 'prefix', 'min_number', 'max_number', 'logo_small', 'logo_big', 'user_id'];

    /**
     * Insert Taxonomy
     */
    public function categories() {
        return $this->morphToMany('Modules\MT\Models\MtTaxonomy', 'mt_taxable');
    } 

    public function scopeWithAndWhereHas($query, $relation, $constraint){
        return $query->whereHas($relation, $constraint)
                     ->with([$relation => $constraint]);
    } 

    /**
     * Get all service in this provider
     */
    public function services() {
        return $this->hasMany('Modules\MT\Models\MtService', 'provider_id')->where('status', 1);
    }
    
    public function logo_small_src() { 
        return $this->belongsTo('App\Models\Media', 'logo_small');
    }  

    public function logo_big_src() { 
        return $this->belongsTo('App\Models\Media', 'logo_big');
    }  

} 