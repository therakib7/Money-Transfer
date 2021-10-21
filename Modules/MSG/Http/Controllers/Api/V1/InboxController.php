<?php

namespace Modules\MSG\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;  
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

use App\Models\User;

use App\Events\Message;
 
use Modules\MSG\Models\MsgInbox;  

class InboxController extends Controller {

    public function inboxusers( Request $request ) {  

        if ( Gate::denies('message-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [       
            'date_from' => 'date_format:d-m-Y h:i a|nullable',         
            'date_to' => 'date_format:d-m-Y h:i a|nullable', 
            'order_by' => 'integer|nullable',         
        ]);  

        /* Get User List */ 
        $inboxusers = MsgInbox::whereIn('id', function($query) {
                        $query->selectRaw('max(`id`)')
                        ->from('msg_inboxes')
                        ->where('from_user_id', '=', Auth::id())        
                        ->where('from_deleted', '=', null)   
                        ->orWhere('to_user_id', '=', Auth::id())
                        ->where('to_deleted', '=', null)    
                        ->groupBy(DB::raw('if (from_user_id = '.Auth::id().', to_user_id, from_user_id)'));
                    })
                    //->select('id', 'from_user_id', 'to_user_id', 'msg', 'created_at')
                    ->orderBy('id', 'desc')
                    //->skip(10)
                    ->take(10)
                    ->with('user_from.profile.avatar_src')
                    ->with('user_to.profile.avatar_src')
                    ->get(); 
        $bucket_url =  Storage::disk('s3')->url('avatar/');

        return compact('inboxusers', 'bucket_url');
    } 

    public function index( Request $request ) {  

        if ( Gate::denies('message-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [        
            'id' => 'integer|required',         
        ]); 

        $inboxes = new MsgInbox; 

        /* Get Personal MSG*/

        $inboxes = $inboxes->where([
            ['from_user_id', '=', Auth::id()],  
            ['to_user_id', '=', $request->id],  
        ]);

        $inboxes = $inboxes->orWhere([
            ['to_user_id', '=', Auth::id()],  
            ['from_user_id', '=', $request->id],  
        ]); 

        $inboxes = $inboxes->where('from_deleted', '=', null);   
        $inboxes = $inboxes->where('to_deleted', '=', null);  
                             

        $inboxes = $inboxes->orderBy('id', 'DESC');
        //$inboxes = $inboxes->skip(5);
        $inboxes = $inboxes->take(100);
        $inboxes = $inboxes->get();

        $collection = collect($inboxes); 
        $sorted = $collection->sortBy('id');
        $inboxes = $sorted->values()->all(); 

        $user_info = User::select( 'name')->find($request->id); 
   

        return compact('inboxes', 'user_info');
    } 

    public function store(Request $request) { 

        if ( Gate::denies('message-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'to_user_id' => 'integer|required',                    
            'msg' => 'min:1|required',        
        ]);   

        if ( Auth::id() == $request->to_user_id ) {
            abort(403, 'Sorry! You cann\'t sent msg yourself!');
        } 

        $message = MsgInbox::create([
            'from_user_id' => Auth::id(),   
            'to_user_id' => $request->to_user_id,  
            'msg' => $request->msg,  
        ]); 

        /* Message event fired */
        event(new Message($message)); 
        
    }  

    public function update(Request $request, $id) { } 
    
    public function destroy( $id ) { }
}
