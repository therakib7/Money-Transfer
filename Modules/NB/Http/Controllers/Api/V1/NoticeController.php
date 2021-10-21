<?php

namespace Modules\NB\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Models\Profile;
use Modules\NB\Models\Notice;  
use Modules\NB\Models\NoticeByType; 
use App\Models\Role; 
use App\Models\UserHasRole;
use Modules\GEO\Models\Location;  

class NoticeController extends Controller { 

    /* Marge Location Parent id in single array */
    private $parent_ids = []; 
    private function parent_ids( $location_id = null ) {
        $this->parent_ids[] = $location_id->id;
        if ( $location_id->parent_ids ) {
            $this->parent_ids( $location_id->parent_ids );
        }
    }

    public function index(Request $request) {  

        $this->validate($request, [ 
            'page' => 'integer|nullable',
            'user_notice' => 'integer|nullable', 
            'notice_ids' => 'string|nullable', 
            'date_from' => 'date_format:d-m-Y h:i a|nullable',         
            'date_to' => 'date_format:d-m-Y h:i a|nullable',
            'order_by' => 'integer|nullable',   
        ]);  

        /**
         * Query User Notice
         * Notice for all
         * Notice by role
         * Notice by location
         * Notice by role & location
         *
         */ 
        if ( $request->user_notice ) {

            $get_notices = new Notice;  

            $get_notices = $get_notices->with('notice_by_types'); 
            $get_notices = $get_notices->where('status', 1);  

            $get_notices = $get_notices->where([ 
                [ 'schedule_from', '<=', Carbon::now() ],
                [ 'schedule_to', '>=', Carbon::now() ],
            ]); 
            
            $notice_ids = explode(',', $request->notice_ids);
            $get_notices = $get_notices->whereNotIn('id', $notice_ids);  

            $get_notices = $get_notices->get(['id', 'title', 'native_title', 'content', 'native_content', 'type']);

            $notices = [];
            if ( $get_notices ) { 

                $load_role = false;
                $load_location = false;

                foreach ( $get_notices as $notice ) {
                    foreach ( $notice->notice_by_types as $type ) {
                        
                        if ( !$type->role_id && !$type->location_id ) {
                            /* For All */ 
                            $notices[] = $notice;

                        } elseif ( $type->role_id && !$type->location_id ) {
                            /* For Role */
                            if ( !$load_role ) {
                                $user_role = new UserHasRole; 
                                $user_role = $user_role->where('user_id', Auth::id()); 
                                $user_role = $user_role->with('role:id'); 
                                $user_role = $user_role->first('role_id'); 
                                $role_id = $user_role->role_id;
                                $load_role = true;
                            }

                            if ( $type->role_id == $role_id ) {
                                $notices[] = $notice;
                            }
                            
                        } elseif ( !$type->role_id && $type->location_id ) {
                            /* For Location */
                            if ( !$load_location ) {
                                /* If user has present address set */ 
                                $pre_address = new Profile;   
                                $pre_address = $pre_address->where('user_id', Auth::id());
                                $pre_address = $pre_address->first('pre_address');  

                                if ( $pre_address_id = $pre_address->pre_address ) {
                                    $location_id = new Location;    
                                    $location_id = $location_id->where('id', $pre_address_id ); 
                                    $location_id = $location_id->with('parent_ids');   
                                    $location_id = $location_id->first(['id', 'parent_id']);

                                    $this->parent_ids[] = $location_id->id;
                                    if ( $location_id->parent_ids ) { 
                                        $this->parent_ids( $location_id->parent_ids );
                                    } 

                                    // if location_id match with user location
                                    if ( in_array( $type->location_id, $this->parent_ids ) ) {
                                        $notices[] = $notice;
                                    }

                                }

                                $load_location = true;
                            }


                            
                        } elseif ( $type->role_id && $type->location_id ) {
                            /* For Role & Location */
                            if ( !$load_role ) {
                                $user_role = new UserHasRole; 
                                $user_role = $user_role->where('user_id', Auth::id()); 
                                $user_role = $user_role->with('role:id'); 
                                $user_role = $user_role->first('role_id'); 
                                $role_id = $user_role->role_id;

                                $load_role = true;
                            }

                            if ( !$load_location ) {
                                /* If user has present address set */ 
                                $pre_address = new Profile;   
                                $pre_address = $pre_address->where('user_id', Auth::id());
                                $pre_address = $pre_address->first('pre_address');  

                                if ( $pre_address_id = $pre_address->pre_address ) {
                                    $location_id = new Location;    
                                    $location_id = $location_id->where('id', $pre_address_id ); 
                                    $location_id = $location_id->with('parent_ids');   
                                    $location_id = $location_id->first(['id', 'parent_id']);

                                    $this->parent_ids[] = $location_id->id;
                                    if ( $location_id->parent_ids ) { 
                                        $this->parent_ids( $location_id->parent_ids );
                                    } 

                                    // if match location_id and user role  with user location
                                    if ( in_array( $type->location_id, $this->parent_ids ) && $type->role_id == $role_id ) {
                                        $notices[] = $notice;
                                    } 
                                }

                                $load_location = true;
                            }
                            
                        }
                    }
                }
            } 

            return compact('notices');
        }
        
        if ( Gate::denies('notice-view') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        
        $notices = new Notice; 

        if ( !$request->order_by ) {
            $notices = $notices->orderBy('id', 'DESC');  
        } 

        $notices = $notices->with('notice_by_types');  

        if ( $name = $request->name ) {
            $names = explode(' ', $name);

            $notices = $notices->where( function ($query) use($names) {
                foreach($names as $name) {
                    $query->orWhere('name', 'LIKE', '%' . $name . '%');
                }
            }); 
        }

        if ( $date_from = $request->date_from ) { 
            $notices = $notices->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $notices = $notices->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }  

        $notices = $notices->paginate( $request->per_page );

        $roles = Role::all(['id', 'name']);  

        return compact('notices', 'roles');

    }

    public function store(Request $request) {

        if ( Gate::denies('notice-create') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $this->validate($request, [   
            'status' => 'boolean|required',    
            'title' => 'string|nullable',    
            'native_title' => 'string|nullable',  
            'content' => 'string|nullable',    
            'native_content' => 'string|nullable',  
            'type' => 'string|required',  
            'for' => 'string|required',     
            'in_board' => 'boolean|nullable',    
            'for' => 'string|nullable',    
            'for_id' => 'array|nullable',   
            'schedule_from' => 'date_format:Y-m-d\TH:i:s.\0\0\0\Z|required',  
            'schedule_to' => 'date_format:Y-m-d\TH:i:s.\0\0\0\Z|required',  
        ]);
 
        DB::transaction( function() use ($request) { 

            $schedule_from = ( $request['schedule_from'] ) ? Carbon::parse( $request['schedule_from'] )->format('Y-m-d H:i') : null;  
            $schedule_to = ( $request['schedule_to'] ) ? Carbon::parse( $request['schedule_to'] )->format('Y-m-d H:i') : null;   

            $notice = Notice::create([ 
                'app_id' => 5,  
                'schedule_from' => $schedule_from, 
                'schedule_to' => $schedule_to, 
                'status' => $request->status, 
                'in_board' => $request->in_board, 
                'title' => $request->title, 
                'native_title' => $request->native_title, 
                'content' => $request->content, 
                'native_content' => $request->native_content,   
                'type' => $request->type,
                'for' => $request->for,   
                'user_id' => Auth::id(), 
            ]); 

            $notice_by_type = [];
            $key = 0;
            if ( !$request->for ) {
                $notice_by_type[$key]['notice_id'] = $notice->id;
            } elseif ( $request->for == 'role' ) { 

                foreach ( $request->role_ids as $role ) {      
                    $notice_by_type[$key]['notice_id'] = $notice->id;  
                    $notice_by_type[$key]['role_id'] = $role['id']; 
                    $key++;
                }   

            } elseif ( $request->for == 'location' ) {

                foreach ( $request->location_ids as $location ) {      
                    $notice_by_type[$key]['notice_id'] = $notice->id;  
                    $notice_by_type[$key]['location_id'] = $location['id']; 
                    $key++;
                }   

            } elseif ( $request->for == 'role-location' ) {

                foreach ( $request->role_ids as $role ) {      
                    foreach ( $request->location_ids as $location ) {      
                        $notice_by_type[$key]['notice_id'] = $notice->id;  
                        $notice_by_type[$key]['role_id'] = $role['id']; 
                        $notice_by_type[$key]['location_id'] = $location['id']; 
                        $key++;
                    }
                }  

            } 

            NoticeByType::insert($notice_by_type); 

        });
 
    } 

    public function update(Request $request, $id) { 
       
        $notice = Notice::find($id); 
        if ( Gate::denies('notice-edit', $notice) ) {
            abort(403, 'Sorry! You do not have permission');
        }  

        $this->validate($request, [   
            'status' => 'boolean|required',    
            'title' => 'string|nullable',    
            'native_title' => 'string|nullable',  
            'content' => 'string|nullable',    
            'native_content' => 'string|nullable',  
            'type' => 'string|required',  
            'for' => 'string|required',    
            'in_board' => 'boolean|nullable',    
            'for' => 'string|nullable',    
            'for_id' => 'array|nullable',   
            'schedule_from' => 'date_format:Y-m-d H:i:s|required',  
            'schedule_to' => 'date_format:Y-m-d H:i:s|required',  
        ]);
 
        DB::transaction( function() use ( $request, $notice, $id ) {    

            $schedule_from = ( $request['schedule_from'] ) ? Carbon::parse( $request['schedule_from'] )->format('Y-m-d H:i') : null;  
            $schedule_to = ( $request['schedule_to'] ) ? Carbon::parse( $request['schedule_to'] )->format('Y-m-d H:i') : null; 

            Notice::where('id', $id)->update([  
                'app_id' => 5,  
                'schedule_from' => $schedule_from, 
                'schedule_to' => $schedule_to, 
                'status' => $request->status, 
                'in_board' => $request->in_board, 
                'title' => $request->title, 
                'native_title' => $request->native_title, 
                'content' => $request->content, 
                'native_content' => $request->native_content,   
                'type' => $request->type,
                'for' => $request->for,  
            ]); 

            $notice_by_type = [];
            $key = 0;
            if ( !$request->for ) {
                $notice_by_type[$key]['notice_id'] = $notice->id;  
            } elseif ( $request->for == 'role' ) { 

                foreach ( $request->role_ids as $role ) {      
                    $notice_by_type[$key]['notice_id'] = $notice->id;  
                    $notice_by_type[$key]['role_id'] = $role['id']; 
                    $key++;
                }   

            } elseif ( $request->for == 'location' ) {

                foreach ( $request->location_ids as $location ) {      
                    $notice_by_type[$key]['notice_id'] = $notice->id;  
                    $notice_by_type[$key]['location_id'] = $location['id']; 
                    $key++;
                }   

            } elseif ( $request->for == 'role-location' ) {

                foreach ( $request->role_ids as $role ) {      
                    foreach ( $request->location_ids as $location ) {      
                        $notice_by_type[$key]['notice_id'] = $notice->id;  
                        $notice_by_type[$key]['role_id'] = $role['id']; 
                        $notice_by_type[$key]['location_id'] = $location['id']; 
                        $key++;
                    }
                }  
            } 

            NoticeByType::where('notice_id', $id)->delete();
            NoticeByType::insert($notice_by_type);  
                

        });
    } 

    public function destroy( $id ) {
        DB::transaction( function() use ($id) {
            $ids = explode(',', $id);
            foreach ($ids as $id) {
                $notice = Notice::find($id); 
                if ( Gate::denies('notice-delete', $notice) ) {
                    abort(403, 'Sorry! You do not have permission');
                }
            } 
            NoticeByType::whereIn('notice_id', $ids)->delete();  
            Notice::destroy( $ids );  
        }); 
    }
}
