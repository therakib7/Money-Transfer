<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;

use Modules\MT\Models\MtSettingUser; 
use Modules\MT\Models\MtPack; 
use Modules\MT\Models\MtPackData;  
use Modules\MT\Models\MtService;
use Modules\MT\Models\MtTaxonomy;  

use Modules\MT\Models\MtMt; 

class PackController extends Controller {

    /* MT suggestion package by amount and operator */
    public function suggestions( Request $request ) { 
        $this->validate($request, [
            'provider_id' => 'integer|required',     
            'amount' => 'integer|required',               
        ]); 

        $suggestions = new MtPack; 
        $suggestions = $suggestions->where('status', 1);  

        $settinguser = MtSettingUser::where('user_id', Auth::id())->where('key', 'mr_recharge_pack_only')->first(); 
        $mr_recharge_pack_only = false;
        $mr_recharge_pack_only = ( $settinguser && $settinguser['value'] == '1' ) ? true : false;
        if ( $mr_recharge_pack_only ) { 
            $suggestions = $suggestions->where('taking_way', null);  
            $suggestions = $suggestions->orWhere('taking_way', 1);  
        }

        $suggestions = $suggestions->where('provider_id', $request->provider_id);  
        $suggestions = $suggestions->with('provider_id:id,name', 'pack_data');  
        $suggestions = $suggestions->select('*', DB::raw("ABS(price - $request->amount) AS distance"))->orderBy('distance'); 

        $suggestions = $suggestions->take(3); 
        $suggestions = $suggestions->get();   
        
        $curent = '';
        $suggestion_lower = '';
        $suggestion_higher = '';

        foreach ($suggestions as $value) {  
            if ( !$curent ) {
                if ( $request->amount == $value->price ) {
                    $curent = $value;
                }
            }

            if ( !$suggestion_lower ) {
                if ( $request->amount > $value->price ) {
                    $suggestion_lower = $value;
                }
            }

            if ( !$suggestion_higher ) {
                if ( $request->amount < $value->price ) {
                    $suggestion_higher = $value;
                }
            }            
        }

        $suggestions = [
            'curent' => $curent,
            'suggestion_higher' => $suggestion_higher,
            'suggestion_lower' => $suggestion_lower,
        ];

        return compact('suggestions');
    }

    /* View all pack by pack search */
    public function packsearch( Request $request ) {  

        $this->validate($request, [ 
            'page' => 'integer|nullable',
            'pack_provider_id' => 'string|nullable',    
            'pack_sim_pack_id' => 'integer|nullable',            
            'pack_type' => 'integer|nullable',      
            'pack_price_from' => 'numeric|nullable',           
            'pack_price_to' => 'numeric|nullable',    
            'pack_data_from' => 'numeric|nullable',           
            'pack_data_to' => 'numeric|nullable',  
            'validity_from' => 'integer|nullable',           
            'validity_to' => 'integer|nullable',           
            'sort_by' => 'string|nullable',           
            'taking_way' => 'integer|nullable',           
        ]);  

        $packs = new MtPack; 
        $packs = $packs->where('status', 1); 

        $packs = $packs->with('provider_id.services', 'pack_data');  

        if ( $provider_id = $request->pack_provider_id ) {
            $provider_ids = explode(',', $provider_id);
            $packs = $packs->whereIn('provider_id', $provider_ids); 
        } 

        if ( $sim_pack_id = $request->pack_sim_pack_id ) {
            $packs = $packs->where('sim_pack_id', $sim_pack_id); 
        }   

        if ( $price_from = $request->pack_price_from ) {
            $packs = $packs->where('price', '>=', $price_from); 
        } 

        if ( $price_to = $request->pack_price_to ) {
            $packs = $packs->where('price', '<=', $price_to); 
        }  

        if ( $validity_from = $request->pack_validity_from ) {
            $packs = $packs->withAndWhereHas('pack_data', function($query) use ($validity_from) {  
                $query->where('validity', '>=', $validity_from); 
            }); 
        }

        if ( $validity_to = $request->pack_validity_to ) {
            $packs = $packs->withAndWhereHas('pack_data', function($query) use ($validity_to) {  
                $query->where('validity', '<=', $validity_to); 
            }); 
        } 

        if ( $pack_type = $request->pack_type ) {
            $packs = $packs->where('pack_type', $pack_type); 
        }   

        if ( $sort_by = $request->sort_by ) {
            switch ( $sort_by ) {
                case 'price-asc':
                    $packs = $packs->orderBy('price'); 
                    break;

                case 'price-dsc':
                    $packs = $packs->orderBy('price', 'DESC'); 
                    break;

                case 'data-asc':
                    $packs = $packs->join('mt_pack_datas', 'mt_packs.id', '=', 'mt_pack_datas.pack_id')->orderBy('mt_pack_datas.data')->select('mt_packs.*'); 
                    break;

                case 'data-dsc':
                    $packs = $packs->join('mt_pack_datas', 'mt_packs.id', '=', 'mt_pack_datas.pack_id')->orderBy('mt_pack_datas.data', 'desc')->select('mt_packs.*'); 
                    break;

                case 'validity-asc':
                    $packs = $packs->join('mt_pack_datas', 'mt_packs.id', '=', 'mt_pack_datas.pack_id')->orderByRaw("FIELD(mt_pack_datas.validity_type, 'mins', 'hours', 'days')")->orderBy('mt_pack_datas.validity')->select('mt_packs.*'); 
                    break;

                case 'validity-dsc':
                    $packs = $packs->join('mt_pack_datas', 'mt_packs.id', '=', 'mt_pack_datas.pack_id')->orderByRaw("FIELD(mt_pack_datas.validity_type, 'days', 'hours', 'mins')")->orderBy('mt_pack_datas.validity', 'desc')->select('mt_packs.*'); 
                    break;
                
                default:
                    // code...
                    break;
            } 
        } else {
            $packs = $packs->join('mt_pack_datas', 'mt_packs.id', '=', 'mt_pack_datas.pack_id')->orderByRaw("FIELD(mt_pack_datas.validity_type, 'days', 'hours', 'mins')")->orderBy('mt_pack_datas.validity', 'desc')->select('mt_packs.*'); 
        }

        if ( $taking_way = $request->taking_way ) {
            $packs = $packs->where('taking_way', $taking_way); 
        } else {
            $settinguser = MtSettingUser::where('user_id', Auth::id())->where('key', 'mr_recharge_pack_only')->first(); 
            $mr_recharge_pack_only = false;
            $mr_recharge_pack_only = ( $settinguser && $settinguser['value'] == '1' ) ? true : false;
            if ( $mr_recharge_pack_only ) {
                $packs = $packs->where('taking_way', null);  
                $packs = $packs->orWhere('taking_way', 1);  
            }
        }
         

        if ( $page = $request->pack_page ) { 
            Paginator::currentPageResolver(function() use ($page) {
                return $page;
            });
        }
 
        $packs = $packs->paginate( $request->pack_per_page );

        //$packs->data->pack_data->sortBy('data'); 
        //$packs->data = $data; 

        $sim_packs = MtPack::where('status', 1)->where('pack_type', 5)->get();

        /* Get Provider Only Flexiload Mobile Banking Category */
        $category = MtTaxonomy::where('taxonomy', 'provider-category')->where('slug', 'mobile-recharge')->first(['id']); 
        $providers = $category->provider_without_services;
 
        return compact('packs', 'sim_packs', 'providers');
    }

    public function index( Request $request ) {  

        $this->validate($request, [ 
            'page' => 'integer|nullable',
            'provider_id' => 'integer|nullable',    
            'sim_pack_id' => 'integer|nullable',            
            'pack_type' => 'integer|nullable',      
            'price_from' => 'numeric|nullable',           
            'price_to' => 'numeric|nullable',    
            'due_from' => 'numeric|nullable',           
            'due_to' => 'numeric|nullable',  
            'validity_from' => 'integer|nullable',           
            'validity_to' => 'integer|nullable',
            'date_from' => 'date_format:d-m-Y h:i a|nullable',         
            'date_to' => 'date_format:d-m-Y h:i a|nullable', 
            'order_by' => 'integer|nullable',           
        ]); 

        if ( Gate::denies('package-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $packs = new MtPack; 

        $packs = $packs->orderBy( DB::raw('-`order`'), 'desc' );
        $packs = $packs->orderBy('updated_at', 'desc');

        if ( !$request->order_by ) {
            $packs = $packs->orderBy('id', 'DESC');  
        }

        //$packs = $packs->where('user_id', Auth::id()); 

        $packs = $packs->with('provider_id:id,name', 'provider_id.services:id,name,provider_id', 'service_id:id,name', 'sim_pack_id:id,name', 'pack_data'); 

        if ( $provider_id = $request->provider_id ) {
            $packs = $packs->where('provider_id', $provider_id); 
        } 

        if ( $sim_pack_id = $request->sim_pack_id ) {
            $packs = $packs->where('sim_pack_id', $sim_pack_id); 
        } 

        if ( isset( $request->status ) ) {
            $packs = $packs->where('status', $request->status); 
        }  

        if ( $price_from = $request->price_from ) {
            $packs = $packs->where('price', '>=', $price_from); 
        } 

        if ( $price_to = $request->price_to ) {
            $packs = $packs->where('price', '<=', $price_to); 
        } 

        if ( $pack_type = $request->pack_type ) {
            $packs = $packs->where('pack_type', $pack_type); 
        }  

        if ( $validity_from = $request->validity_from ) {
            $packs = $packs->withAndWhereHas('pack_data', function($query) use ($validity_from) {  
                $query->where('validity', '>=', $validity_from); 
            }); 
        }

        if ( $validity_to = $request->validity_to ) {
            $packs = $packs->withAndWhereHas('pack_data', function($query) use ($validity_to) {  
                $query->where('validity', '<=', $validity_to); 
            }); 
        }

        if ( $date_from = $request->date_from ) { 
            $packs = $packs->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $packs = $packs->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }    

        $packs = $packs->paginate( $request->per_page );

        $sim_packs = MtPack::where('status', 1)->where('pack_type', 5)->get();

        /* Get Provider Only Flexiload Mobile Banking Category */
        $category = MtTaxonomy::where('taxonomy', 'provider-category')->where('slug', 'mobile-recharge')->first(['id']); 
        $providers = $category->providers;

        return compact('packs', 'sim_packs', 'providers');
    } 

    public function store(Request $request) {

        if ( Gate::denies('package-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'status' => 'boolean|required',     
            'provider_id' => 'array|required', 
            'service_id' => 'array|required', 
            'sim_pack_id' => 'array|nullable',     
            'name' => 'string|required',         
            'desc' => 'string|nullable',
            'price' => 'numeric|nullable',                 
            'offer_type' => 'integer|required',  
            'to_take' => 'string|nullable', 
            'taking_way' => 'integer|nullable', 
            'order' => 'numeric|nullable', 
            'source' => 'active_url|required', 

            'pack_data' => 'array|required', 
            'pack_data.*.data' => 'numeric|required', 
            'pack_data.*.data_type' => 'string|required', 
            'pack_data.*.network' => 'integer|nullable', 
            'pack_data.*.validity' => 'numeric|required', 
            'pack_data.*.validity_type' => 'string|required',
            'pack_data.*.period_from' => 'date_format:h:i a|nullable',
            'pack_data.*.period_to' => 'date_format:h:i a|nullable',
            'pack_data.*.is_bonus' => 'boolean|nullable', 
            'pack_data.*.comment' => 'string|nullable', 
            'pack_data.*.policy' => 'string|nullable',   
        ]);  

        DB::transaction( function() use ($request) {   

            $pack = MtPack::create([
                'status' => $request->status, 
                'provider_id' => $request->provider_id['id'], 
                'service_id' => $request->service_id['id'], 
                'name' => $request->name, 
                'price' => $request->price, 
                'desc' => $request->desc, 
                'pack_type' => $request->pack_type,  
                'data_type' => $request->data_type,
                'offer_type' => $request->offer_type,  
                'to_take' => $request->to_take,  
                'taking_way' => $request->taking_way,  
                'order' => $request->order,
                'source' => $request->source,  
                'sim_pack_id' => ( $request->sim_pack_id ) ? $request->sim_pack_id['id'] : null,  
                'user_id' => Auth::id(), 
            ]); 

            $pack_data = [];
            $key = 0; 

            foreach ($request->pack_data as $net) {      
                $period_from = ( $net['period_from'] ) ? Carbon::parse( $net['period_from'] )->format('H:i') : null;  
                $period_to = ( $net['period_to'] ) ? Carbon::parse( $net['period_to'] )->format('H:i') : null;
                 
                $pack_data[$key]['pack_id'] = $pack->id; 
                $pack_data[$key]['data'] = $net['data']; 
                $pack_data[$key]['data_type'] = $net['data_type']; 
                $pack_data[$key]['network'] = $net['network'];  
                $pack_data[$key]['validity'] = $net['validity']; 
                $pack_data[$key]['validity_type'] = $net['validity_type']; 
                $pack_data[$key]['period_from'] = $period_from; 
                $pack_data[$key]['period_to'] = $period_to; 
                $pack_data[$key]['is_bonus'] = $net['is_bonus']; 
                $pack_data[$key]['comment'] = $net['comment'];
                $pack_data[$key]['policy'] = $net['policy']; 
                $pack_data[$key]['created_at'] = date('Y-m-d H:i:s'); 
                $pack_data[$key]['updated_at'] = date('Y-m-d H:i:s'); 
                $key++;
            } 
            
            MtPackData::insert($pack_data);    

        });
    }  

    public function update(Request $request, $id) { 

        $this->validate($request, [
            'status' => 'boolean|required',     
            'provider_id' => 'array|required', 
            'service_id' => 'array|required',  
            'sim_pack_id' => 'array|nullable',     
            'name' => 'string|required',         
            'desc' => 'string|nullable',
            'price' => 'numeric|nullable',                 
            'offer_type' => 'integer|required', 
            'to_take' => 'string|nullable', 
            'taking_way' => 'integer|nullable',
            'order' => 'integer|nullable', 
            'source' => 'active_url|required', 

            'pack_data' => 'array|required', 
            'pack_data.*.data' => 'numeric|required', 
            'pack_data.*.data_type' => 'string|required', 
            'pack_data.*.network' => 'integer|nullable', 
            'pack_data.*.validity' => 'numeric|required', 
            'pack_data.*.validity_type' => 'string|required',
            'pack_data.*.period_from' => 'date_format:h:i a|nullable',
            'pack_data.*.period_to' => 'date_format:h:i a|nullable',
            'pack_data.*.is_bonus' => 'boolean|nullable', 
            'pack_data.*.comment' => 'string|nullable', 
            'pack_data.*.policy' => 'string|nullable',          
        ]); 

        $pack = MtPack::find($id); 
        if ( Gate::denies('package-edit', $pack) ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        DB::transaction( function() use ($request, $id, $pack) {          

            MtPack::where('id', $id)->update([ 
                'status' => $request->status, 
                'provider_id' => $request->provider_id['id'], 
                'service_id' => $request->service_id['id'],
                'name' => $request->name, 
                'price' => $request->price, 
                'desc' => $request->desc, 
                'pack_type' => $request->pack_type,  
                'data_type' => $request->data_type,
                'offer_type' => $request->offer_type,
                'to_take' => $request->to_take,  
                'taking_way' => $request->taking_way,  
                'order' => $request->order,
                'source' => $request->source,   
                'sim_pack_id' => ( $request->sim_pack_id ) ? $request->sim_pack_id['id'] : null,   
                'user_id' => Auth::id(), 
            ]); 

            $pack_data = [];
            $key = 0; 

            foreach ($request->pack_data as $net) {       
                $period_from = ( $net['period_from'] ) ? Carbon::parse( $net['period_from'] )->format('H:i') : null;  
                $period_to = ( $net['period_to'] ) ? Carbon::parse( $net['period_to'] )->format('H:i') : null;
                 
                $pack_data[$key]['pack_id'] = $pack->id; 
                $pack_data[$key]['data'] = $net['data']; 
                $pack_data[$key]['data_type'] = $net['data_type']; 
                $pack_data[$key]['network'] = $net['network'];  
                $pack_data[$key]['validity'] = $net['validity']; 
                $pack_data[$key]['validity_type'] = $net['validity_type']; 
                $pack_data[$key]['period_from'] = $period_from; 
                $pack_data[$key]['period_to'] = $period_to; 
                $pack_data[$key]['is_bonus'] = $net['is_bonus']; 
                $pack_data[$key]['comment'] = $net['comment'];
                $pack_data[$key]['policy'] = $net['policy']; 
                $pack_data[$key]['created_at'] = date('Y-m-d H:i:s'); 
                $pack_data[$key]['updated_at'] = date('Y-m-d H:i:s'); 
                $key++;
            } 
            
            MtPackData::where('pack_id', $id)->delete();
            MtPackData::insert($pack_data);   

        });
    } 

    public function lastchecked(Request $request) {

        if ( !auth_can(['package-super']) ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $this->validate($request, [            
            'ids' => 'array|required',           
        ]);  

        DB::transaction( function() use ( $request ) {  
            foreach ($request->ids as $id) { 
                MtPack::where('id', $id)->update([ 'updated_at' => date('Y-m-d H:i') ]);  
            } // end for  
        }); // end DB Transection 
    } 
    
    public function destroy( $id ) {
        DB::transaction( function() use ($id) {
            $ids = explode(',', $id);
            foreach ($ids as $id) {
                $package = MtPack::find($id); 
                if ( Gate::denies('package-delete', $package) ) {
                    abort(403, 'Sorry! You do not have permission');
                }
            } 
            MtPackData::whereIn('pack_id', $ids)->delete();  
            MtPack::destroy( $ids );  
        }); 
    }
}
