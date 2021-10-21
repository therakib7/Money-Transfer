<?php

namespace Modules\DOC\Models;

use Illuminate\Database\Eloquent\Model;

class Doc extends Model {

    protected $connection = 'oz_doc';

    protected $fillable = ['status', 'order', 'title', 'content', 'user_id'];

    /**
     * Insert and get taxonomy
     */
    public function categories() {
        return $this->morphToMany('Modules\DOC\Models\Taxonomy', 'taxable');
    }  

    public function scopeWithAndWhereHas($query, $relation, $constraint){
        return $query->whereHas($relation, $constraint)
                     ->with([$relation => $constraint]);
    }  
 
} 
 