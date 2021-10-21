<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtHelp extends Model {

    protected $fillable = ['status', 'order', 'title', 'slug', 'basic_video', 'basic_text', 'medium_video', 'medium_text', 'advance_video', 'advance_text', 'user_id'];

    /**
     * Insert and get taxonomy
     */
    public function categories() {
        return $this->morphToMany('Modules\MT\Models\MtTaxonomy', 'mt_taxable');
    } 

    /**
     * The role that belong to the help or help cat.
     */
    public function roles() { 
        return $this->belongsToMany('App\Models\Role', 'mt_help_roles', 'id', 'role_id')->where('type', 'help');
    } 

    public function scopeWithAndWhereHas($query, $relation, $constraint){
        return $query->whereHas($relation, $constraint)
                     ->with([$relation => $constraint]);
    }  
 
} 
 