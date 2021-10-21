<?php

namespace Modules\CT\Models;

use Illuminate\Database\Eloquent\Model;

class CtContact extends Model {

    protected $fillable = ['type', 'status', 'name', 'address', 'user_id']; 
    
    /**
     * Insert Taxonomy
     */
    public function categories() {
        return $this->morphToMany('Modules\CT\Models\CtTaxonomy', 'ct_taxable');
    }

    public function scopeWithAndWhereHas($query, $relation, $constraint){
        return $query->whereHas($relation, $constraint)
                     ->with([$relation => $constraint]);
    }  

    /**
     * Get all service in this provider
     */
    public function services() {
        return $this->hasMany('Modules\CT\Models\CtContactService', 'contact_id');
    }

    /**
     * Get all utility service in this provider
     */
    public function utility_services() {
        return $this->hasMany('Modules\CT\Models\CtContactService', 'contact_id');
    }

    /**
     * Get all service in this provider
     */
    public function identities() {
        return $this->hasMany('Modules\CT\Models\CtContactIdentity', 'contact_id');
    }
} 