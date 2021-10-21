<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model; 

class MtPack extends Model {

    protected $fillable = ['status', 'provider_id', 'service_id', 'name', 'price', 'pl_status', 'co_com', 'user_com', 'desc', 'pack_type', 'data_type', 'offer_type', 'to_take', 'taking_way', 'order', 'source', 'user_id', 'sim_pack_id'];
    protected $appends = ['last_checked'];

    public function provider_id() {
    	return $this->belongsTo('Modules\MT\Models\MtProvider', 'provider_id');
    }

    public function provider() {
        return $this->belongsTo('Modules\MT\Models\MtProvider', 'provider_id');
    }

    public function service_id() {
        return $this->belongsTo('Modules\MT\Models\MtService', 'service_id');
    }

    /**
     * Get all service in this provider
     */
    public function services() {
        return $this->hasMany('Modules\MT\Models\MtService', 'provider_id')->where('status', 1);
    }

    public function sim_pack_id() {
        return $this->belongsTo(self::class, 'sim_pack_id');
    }
    
    public function pack_data() {
        return $this->hasMany('Modules\MT\Models\MtPackData', 'pack_id'); 
    }

    public function scopeWithAndWhereHas($query, $relation, $constraint){
        return $query->whereHas($relation, $constraint)
                     ->with([$relation => $constraint]);
    } 
    
    public function getPriceAttribute($value) {
        return floatval( $value );
    }

    public function getLastCheckedAttribute() { 
        if ( $this->updated_at )  {
            //date_default_timezone_set('Asia/Dhaka');  
            return $this->updated_at->diffForHumans();  
        } 
    }

} 
 