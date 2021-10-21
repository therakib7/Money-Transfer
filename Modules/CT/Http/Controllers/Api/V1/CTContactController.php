<?php

namespace Modules\CT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Pagination\Paginator;

use Modules\CT\Models\CtContact;  
use Modules\CT\Models\CtContactService;  
use Modules\CT\Models\CtContactIdentity;  
use Modules\CT\Models\CtTaxonomy;  
use Modules\MT\Models\MtService;  
use Modules\MT\Models\MtProvider;  
use Modules\MT\Models\MtTaxonomy;  

class CTContactController extends Controller {

    public function index( Request $request ) {

        if ( Gate::denies('contact-view') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $this->validate($request, [   
            'page' => 'integer|nullable', 
            'type' => 'integer|nullable',    
            'name' => 'string|nullable',      
            'category' => 'string|nullable', 
            'identities' => 'integer|nullable',     
            'sender' => 'boolean|nullable', // this is for mobile banking sender identity   
            'title' => 'alpha_dash|nullable',     
            'contact_cat_id' => 'integer|nullable',            
            'number' => 'string|nullable',             
            'service_id' => 'integer|nullable',  
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',  
            'order_by' => 'integer|nullable',            
        ]);  

        /**
         * Here is theee types of contact
         * Mobile Recharge = null, Mobile Banking = 1, Utility = 2
         * Mobile Banking Has Identities
         */

        $contacts = new CtContact; 
        $contacts = $contacts->where('user_id', Auth::id());

        if ( !$request->order_by ) {
            $contacts = $contacts->orderBy('id', 'DESC');  
        } 
        
        if ( $request->type == null ) {
            $contacts = $contacts->with([
                'services' => function ($query) use ($request) {  
                    $query->where('type', null);
                    $query->where('user_id', Auth::id());
                },
                'services.provider_id.services',  
                'services.provider_id.categories', 
                'categories']); 
        } else if ( $request->type == 1 ) { //mobile banking and utility  

            $contacts = $contacts->with(['services' => function ($query) use ($request) {  
                    if ( $request->identities ) {
                        $query->where('type', null);
                        $query->orWhere('type', 1);
                    } else {
                        $query->where('type', 1);
                    }
                    $query->where('user_id', Auth::id());
                },
                'services.provider_id.services.service_fees', 
                'services.provider_id.categories', 
                'categories']); 

            if ( $request->identities ) {
                $contacts = $contacts->with('identities'); 
            } 

        } else if ( $request->type == 2 ) { //mobile banking and utility 

            $contacts = $contacts->with([
                'services' => function ($query) use ($request) {  
                    $query->where('type', null);
                    $query->orWhere('type', 1);
                    $query->where('user_id', Auth::id());
                },
                'services.provider_id.services.service_fees', 
                'services.provider_id.categories', 
                'categories']); 

            $contacts = $contacts->with(['utility_services' => function ($query) use ($request) { 
                $query->where('type', 2);
                $query->where('user_id', Auth::id());
            }, 'utility_services.provider_id.services.service_fees']);
        }

        $contacts = $contacts->whereHas('services', function ($query) use ($request) { 
            if ( $number = $request->number ) {  
                $query->where('number', 'LIKE', '%' . $number . '%');
            }  

            if ( $request->type == null ) {
                $query->where('type', null);
            } else if ( $request->type == 1 ) {
                if ( $request->identities ) {
                    $query->where('type', null);
                    $query->orWhere('type', 1);
                } else {
                    $query->where('type', 1);
                }
            } else if ( $request->type == 2 ) {
                $query->where('type', null);
                $query->orWhere('type', 1);
            } 
            $query->where('user_id', Auth::id());
        }); 

        if ( $name = $request->name ) {
            $names = explode(' ', $name);
            $contacts = $contacts->where( function ($query) use($names) {
                foreach($names as $name) {
                    $query->orWhere('name', 'LIKE', '%' . $name . '%');
                }
            }); 
        }

        $category_ids = $request->category;
        if ( array_filter( explode(',', $category_ids) ) ) {
            $contacts = $contacts->withAndWhereHas('categories', function($query) use ($category_ids) { 
                $query->whereIn('ct_taxonomy_id', explode(',', $category_ids ));
            }); 
        }

        if ( $request->sender ) {
            $number = $request->number;
            $contacts = $contacts->orWhereHas('identities', function ($query) use ($number) { 
                $query->where('id_number', 'LIKE', '%' . $number . '%');
                $query->where('user_id', Auth::id());
            }); 
        }

        if ( $provider_id = $request->provider_id ) { 
            $contacts = $contacts->whereHas('services', function ($query) use ($provider_id) { 
                $query->where('provider_id', $provider_id);
                $query->where('user_id', Auth::id());
            }); 
        }

        if ( $service_id = $request->service_id ) { 
            $contacts = $contacts->whereHas('services', function ($query) use ($service_id) { 
                $query->where('service_id', $service_id);
                $query->where('user_id', Auth::id());
            }); 
        }
        
        $cat_ids = $request->contact_cat_id;
        if ( array_filter( explode(',', $cat_ids) ) ) {
            $contacts = $contacts->withAndWhereHas('categories', function($query) use ($cat_ids) { 
                $query->whereIn('ct_taxonomy_id', explode(',', $cat_ids ));
            }); 
        }

        if ( $date_from = $request->date_from ) { 
            $contacts = $contacts->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $contacts = $contacts->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }      

        $contacts = $contacts->paginate( $request->per_page ); 

        $categories = CtTaxonomy::lists('contact-category');

        /* Get Provider */
        if ( $request->type == 2 ) { //utility 
            $category = MtTaxonomy::where('taxonomy', 'provider-category')->where('slug', 'mobile-recharge-banking')->first(['id']); 
            $providers = $category->provider_with_cats; 

            $category = MtTaxonomy::where('taxonomy', 'provider-category')->where('slug', 'utility')->first(['id']); 
            $utility_providers = $category->providers; 
        } else {
            $category = MtTaxonomy::where('taxonomy', 'provider-category')->where('slug', 'mobile-recharge-banking')->first(['id']); 
            $providers = $category->provider_with_cats; 
            $utility_providers = null; 
        } 
        
        return compact('contacts', 'providers', 'utility_providers', 'categories'); 
    } 

    public function store(Request $request) {  

        if ( Gate::denies('contact-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [   
            'type' => 'integer|nullable',   
            'status' => 'boolean|required',      
            'name' => 'string|nullable',             
            'address' => 'string|nullable',       
            'services.*.number' => 'numeric|required',
            'services.*.provider_id' => 'array|required',                   
            'services.*.service_id' => 'integer|required', 
            'identities' => 'array|nullable',                   
            'identities.*.id_number' => 'numeric|nullable',                   
            'identities.*.id_type' => 'integer|nullable', 
            'utility_services.*.number' => 'numeric|nullable',
            'utility_services.*.provider_id' => 'array|nullable',                   
            'utility_services.*.service_id' => 'array|nullable',              
            'categories' => 'array|nullable',             
        ]); 

        DB::transaction( function() use ($request) {  

            $name = ($request->name) ? $request->name : null;
            $address = ($request->address) ? $request->address : null;  
            
            $ct_insert = [
                'status' => $request->status, 
                'name' => $name, 
                'address' => $address, 
                'user_id' => Auth::id(),    
            ]; 

            $contact = CtContact::create( $ct_insert );

            /* Contact Service */
            $contact_services = [];
            foreach ($request->services as $service) :
                if ( $service['provider_id'] ) {
                    $con_id = CtContactService::where('user_id', Auth::id())
                                        ->where('number', $service['number'] )
                                        ->where('provider_id', $service['provider_id']['id'] )
                                        ->where('service_id', $service['service_id'] )
                                        ->first();
                    
                    if ( $con_id ) {
                        abort(403, 'Sorry! Following number and operator already exist.');
                    } 
                }

                $type = null;
                $mobile_recharge = array_search( 'mobile-recharge', array_column( $service['provider_id']['categories'], 'slug' ) );
                if ( $mobile_recharge !== false ) {
                    $type = null; 
                }

                $mobile_banking = array_search( 'mobile-banking', array_column( $service['provider_id']['categories'], 'slug' ) );
                if ( $mobile_banking !== false ) {
                    $type = 1; 
                }

                $contact_services[] = [
                    'type' => $type,
                    'contact_id' => $contact['id'],
                    'number' => $service['number'],
                    'provider_id' => $service['provider_id']['id'],
                    'service_id' => $service['service_id'],
                    'user_id' => Auth::id(), 
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]; 
            endforeach; 
            CtContactService::insert($contact_services); 

            /* Contact Identity */
            $contact_identities = [];
            if ( $request->identities ) {
                foreach ($request->identities as $identity) :
                    if ( $identity['id_number'] ) {
                        $con_id = CtContactIdentity::where('user_id', Auth::id())
                                            ->where('id_number', $identity['id_number'] ) 
                                            ->where('id_type', $identity['id_type'] )
                                            ->first();
                        
                        if ( $con_id ) {
                            abort(403, 'Sorry! Following ID and Type already exist.');
                        }  

                        $contact_identities[] = [
                            'contact_id' => $contact['id'],
                            'id_number' => $identity['id_number'], 
                            'id_type' => $identity['id_type'],
                            'user_id' => Auth::id(), 
                            'created_at' => date('Y-m-d H:i:s'),
                            'updated_at' => date('Y-m-d H:i:s')
                        ]; 
                    }
                endforeach; 
            }            
            
            if ( !empty( $contact_identities ) ) {  
                CtContactIdentity::insert($contact_identities); 
            } 

            /* Utility Service */
            if ( $request->type == 2 ) {
                $utility_services = [];
                if ( $request->utility_services ) {
                    foreach ($request->utility_services as $service) :
                        if ( $service['provider_id'] ) {
                            $con_id = CtContactService::where('user_id', Auth::id())
                                                ->where('number', $service['number'] )
                                                ->where('provider_id', $service['provider_id']['id'] )
                                                ->where('service_id', $service['service_id']['id'] )
                                                ->first();
                            
                            if ( $con_id ) {
                                abort(403, 'Sorry! Following number and provider already exist.');
                            } 
                        } 

                        $utility_services[] = [
                            'type' => 2,
                            'contact_id' => $contact['id'],
                            'number' => $service['number'],
                            'provider_id' => $service['provider_id']['id'],
                            'service_id' => $service['service_id']['id'],
                            'user_id' => Auth::id(), 
                            'created_at' => date('Y-m-d H:i:s'),
                            'updated_at' => date('Y-m-d H:i:s')
                        ]; 
                    endforeach; 
                }

                if ( !empty( $utility_services ) ) {  
                    CtContactService::insert($utility_services); 
                }  
            }

            if ( $request->categories ) {
                $contact_cats = [];
                foreach ($request->categories as $category) {
                    $contact_cats[] = $category['id'];
                } 
                if ( $request->cat_id ) {
                    $contact_cats[] = $request->cat_id['id']; 
                }
                $contact->categories()->attach( $contact_cats ); 
            }
        });  // db transection 
    }  

    public function update(Request $request, $id) { 

        $contact = CtContact::find($id); 
        if ( Gate::denies('contact-edit', $contact) ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $this->validate($request, [    
            'type' => 'integer|nullable',      
            'status' => 'boolean|required',      
            'name' => 'string|nullable',             
            'address' => 'string|nullable',       
            'services.*.number' => 'numeric|required',
            'services.*.provider_id' => 'array|required',                   
            'services.*.service_id' => 'integer|required', 
            'identities' => 'array|nullable',                   
            'identities.*.id_number' => 'numeric|nullable',                   
            'identities.*.id_type' => 'integer|nullable', 
            'utility_services.*.number' => 'numeric|nullable',
            'utility_services.*.provider_id' => 'array|nullable',                   
            'utility_services.*.service_id' => 'array|nullable',               
            'categories' => 'array|nullable',             
        ]); 

        DB::transaction( function() use ($request, $id) {  

            $name = ($request->name) ? $request->name : null;
            $address = ($request->address) ? $request->address : null;  
            
            $ct_insert = [
                'status' => $request->status, 
                'name' => $name, 
                'address' => $address,     
            ]; 

            $contact = CtContact::find( $id ); 
            $contact->update( $ct_insert ); 

            /* Contact Service */
            CtContactService::where([ 'contact_id' => $id, 'type' => null ])
            ->orWhere([ 'contact_id' => $id, 'type' => 1 ]) 
            ->delete(); 

            $contact_services = [];
            foreach ($request->services as $service) :

                if ( $service['provider_id'] ) {
                    $con_id = CtContactService::where('user_id', Auth::id())
                                        ->where('number', $service['number'] )
                                        ->where('provider_id', $service['provider_id']['id'] )
                                        ->where('service_id', $service['service_id'] )
                                        ->first();
                    
                    if ( $con_id ) {
                        abort(403, 'Sorry! Following number and operator already exist.');
                    } 
                }

                $type = null;
                $mobile_recharge = array_search( 'mobile-recharge', array_column( $service['provider_id']['categories'], 'slug' ) );
                if ( $mobile_recharge !== false ) {
                    $type = null; 
                }

                $mobile_banking = array_search( 'mobile-banking', array_column( $service['provider_id']['categories'], 'slug' ) );
                if ( $mobile_banking !== false ) {
                    $type = 1; 
                }

                $contact_services[] = [
                    'type' => $type,
                    'contact_id' => $contact['id'],
                    'number' => $service['number'],
                    'provider_id' => $service['provider_id'],
                    'provider_id' => $service['provider_id']['id'],
                    'service_id' => $service['service_id'],
                    'user_id' => Auth::id(), 
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]; 
            endforeach; 
            CtContactService::insert($contact_services); 

            /* Contact Identity */
            CtContactIdentity::where('contact_id', $id)->delete(); 
            $contact_identities = [];
            if ( $request->identities ) {
                foreach ($request->identities as $identity) :
                    if ( $identity['id_number'] ) {
                        $con_id = CtContactIdentity::where('user_id', Auth::id())
                                            ->where('id_number', $identity['id_number'] ) 
                                            ->where('id_type', $identity['id_type'] )
                                            ->first();
                        
                        if ( $con_id ) {
                            abort(403, 'Sorry! Following ID and Type already exist.');
                        } 

                        $contact_identities[] = [
                            'contact_id' => $contact['id'],
                            'id_number' => $identity['id_number'], 
                            'id_type' => $identity['id_type'],
                            'user_id' => Auth::id(), 
                            'created_at' => date('Y-m-d H:i:s'),
                            'updated_at' => date('Y-m-d H:i:s')
                        ]; 
                    }
                endforeach; 
            }

            if ( !empty( $contact_identities ) ) {  
                CtContactIdentity::insert($contact_identities); 
            } 

            /* Utility Service */            
            if ( $request->type == 2 ) {
                CtContactService::where([ 'contact_id' => $id, 'type' => 2 ]) 
                ->delete();
                $utility_services = [];
                
                if ( $request->utility_services ) {
                    foreach ($request->utility_services as $service) :
                        if ( $service['provider_id'] ) {
                            $con_id = CtContactService::where('user_id', Auth::id())
                                                ->where('number', $service['number'] )
                                                ->where('provider_id', $service['provider_id']['id'] )
                                                ->where('service_id', $service['service_id']['id'] )
                                                ->first();
                            
                            if ( $con_id ) {
                                abort(403, 'Sorry! Following number and provider already exist.');
                            } 
                        } 

                        $utility_services[] = [
                            'type' => 2,
                            'contact_id' => $contact['id'],
                            'number' => $service['number'],
                            'provider_id' => $service['provider_id']['id'],
                            'service_id' => $service['service_id']['id'],
                            'user_id' => Auth::id(), 
                            'created_at' => date('Y-m-d H:i:s'),
                            'updated_at' => date('Y-m-d H:i:s')
                        ]; 
                    endforeach; 
                }

                if ( !empty( $utility_services ) ) {  
                    CtContactService::insert($utility_services); 
                }  
            }

            if ( $request->categories ) {
                $contact_cats = [];
                foreach ($request->categories as $category) {
                    $contact_cats[] = $category['id'];
                } 
                if ( $request->cat_id ) {
                    $contact_cats[] = $request->cat_id['id']; 
                }
                $contact->categories()->sync( $contact_cats ); 
            }
        });  // db transection 
    } 
    
    public function destroy( $id ) {
        DB::transaction( function() use ($id) {
            $ids = explode(',', $id);
            foreach ($ids as $id) {
                $contact = CtContact::find($id); 
                if ( Gate::denies('contact-delete', $contact) ) {
                    abort(403, 'Sorry! You do not have permission');
                } 
                CtContactService::where('contact_id', $id)->delete(); 
                CtContactIdentity::where('contact_id', $id)->delete(); 
                $contact->categories()->detach(); 
                $contact->delete();
            }   
        });
    }
}
