<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtBankingProvider extends Model {

    protected $fillable = ['status', 'name', 'type', 'order', 'logo_small', 'logo_big', 'user_id'];

    /**
     * Get all service in this provider
     */
    public function accounts() {
        return $this->hasMany('Modules\MT\Models\MtBankingAccount', 'banking_provider_id')->where('status', 1);
    }
    
    public function logo_small_src() { 
        return $this->belongsTo('App\Models\Media', 'logo_small');
    }  

    public function logo_big_src() { 
        return $this->belongsTo('App\Models\Media', 'logo_big');
    }  

} 