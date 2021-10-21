<?php

namespace Modules\MT\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;

use Modules\MT\Models\MtCard;
use Modules\MT\Models\MtService;

class CardController extends Controller {

    public function index( Request $request ) {  

        $this->validate($request, [
            'page' => 'integer|nullable',
            'title' => 'string|nullable',         
            'desc' => 'string|nullable',
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',   
            'order_by' => 'integer|nullable',        
        ]);

        if ( Gate::denies('card-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $cards = new MtCard; 

        if ( !$request->order_by ) {
            $cards = $cards->orderBy('id', 'DESC');  
        }

        $cards = $cards->with('service_id:id,name');

        if ( $date_from = $request->date_from ) { 
            $cards = $cards->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $cards = $cards->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        }     

        if ( $title = $request->title ) {
            $titles = explode(' ', $title);

            $cards = $cards->where( function ($query) use($titles) {
                foreach($titles as $title) {
                    $query->orWhere('title', 'LIKE', '%' . $title . '%');
                }
            }); 
        } 

        if ( $desc = $request->desc ) {
            $descs = explode(' ', $desc);

            $cards = $cards->where( function ($query) use($descs) {
                foreach($descs as $desc) {
                    $query->orWhere('desc', 'LIKE', '%' . $desc . '%');
                }
            }); 
        } 

        $cards = $cards->paginate( $request->per_page ); 

        $services = MtService::whereNotIn('type', ['postpaid', 'agent'])->get();

        return compact('cards', 'services');
    } 

    public function store(Request $request) { 

        $this->validate($request, [
            'service_id' => 'array|required',     
            'bundle_name' => 'string|required', 
            'amount' => 'required|numeric|min:1',              
        ]); 

        if ( Gate::denies('card-create') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        return MtCard::create([
            'service_id' => $request->service_id['id'], 
            'bundle_name' => $request->bundle_name, 
            'amount' => $request->amount, 
            'pin' => '16digitpin',  
        ]); 
    }  

    public function update(Request $request, $id) {

        $this->validate($request, [
            'service_id' => 'array|required',     
            'bundle_name' => 'string|required', 
            'amount' => 'required|numeric|min:1',              
        ]); 

        $card = MtCard::find($id); 
        if ( Gate::denies('card-edit', $card) ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $card->update([
            'service_id' => $request->service_id['id'], 
            'bundle_name' => $request->bundle_name, 
            'amount' => $request->amount, 
            'pin' => '16digitpin',  
        ]);
    } 
    
    public function destroy( $id ) {
        $ids = explode(',', $id);
        foreach ($ids as $id) {
            $card = MtCard::find($id); 
            if ( Gate::denies('card-delete', $card) ) {
                abort(403, 'Sorry! You do not have permission');
            }
        } 
        return MtCard::destroy( $ids );
    }
}
