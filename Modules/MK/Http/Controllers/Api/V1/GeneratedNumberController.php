<?php

namespace Modules\MK\Http\Controllers\Api\V1;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use Modules\MK\Models\Provider; 
use Modules\MK\Models\GeneratedNumber; 

use File;
use Response;

class GeneratedNumberController extends Controller {

    public function download( Request $request ) {  

        if ( Gate::denies('provider-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [ 
            'provider_id' => 'array|required',             
            'from' => 'numeric|required',              
            'to' => 'numeric|required'              
        ]); 
    
        $providers = Provider::where('status', '1')->whereId($request->provider_id['id'])->first(['name', 'prefix']);  

        $generated_numbers = new GeneratedNumber; 
        $generated_numbers = $generated_numbers->where('provider_id', $request->provider_id['id']);
        $generated_numbers = $generated_numbers->where('number', '>=', $request->from);
        $generated_numbers = $generated_numbers->where('number', '<=', $request->to); 
        $generated_numbers = $generated_numbers->get(['prefix', 'number']); 

        $download_numbers = "";

        if ( $generated_numbers ) {
            foreach ($generated_numbers as $key => $value) {
                $download_numbers .= "BEGIN:VCARD\nVERSION:3.0\nTEL:{$value['prefix']}{$value['number']}\nEND:VCARD\n"; 
            }
        } 

        $data = $download_numbers; 
        $fileName = "{$providers['name']}-{$providers['prefix']}{$request->from}-{$providers['prefix']}{$request->to}-numbers.vcf";
        File::put( public_path('/download/generated-numbers/'.$fileName), $data);

        //$headers = array('Content-type'=> 'application/vcf');
        //return Response::download( public_path( '/download/generated-numbers/'.$fileName ), $headers );

        return "success";
    } 

    public function index( Request $request ) {  

        if ( Gate::denies('provider-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [ 
            'page' => 'integer|nullable',      
            'provider_id' => 'integer|nullable',      
            'date_from' => 'date_format:Y-m-d H:i:s|nullable',         
            'date_to' => 'date_format:Y-m-d H:i:s|nullable',   
            'order_by' => 'integer|nullable',      
        ]); 

        $generated_numbers = new GeneratedNumber;  
  
        $generated_numbers = $generated_numbers->with('provider_id:id,name');

        if ( $provider_id = $request->provider_id ) { 
            $generated_numbers = $generated_numbers->where('provider_id', $provider_id ); 
            $generated_numbers = $generated_numbers->orderBy('number', 'DESC');
        } else {
            if ( !$request->order_by ) {  
                $generated_numbers = $generated_numbers->orderBy('id', 'DESC');  
            }
        }         

        if ( $date_from = $request->date_from ) { 
            $generated_numbers = $generated_numbers->where('created_at', '>=', Carbon::parse($date_from)->format('Y-m-d H:i') );
        }  

        if ( $date_to = $request->date_to ) {
            $generated_numbers = $generated_numbers->where('created_at', '<=', Carbon::parse($date_to)->format('Y-m-d H:i') );
        } 

        $generated_numbers = $generated_numbers->simplePaginate( $request->per_page ); 

        $providers = Provider::where('status', '1')->whereType(1)->get(['id', 'name', 'length']);  

        return compact('generated_numbers', 'providers'); 

    } 

    public function store(Request $request) {

        if ( Gate::denies('provider-create') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [ 
            'provider_id' => 'array|required',             
            'total' => 'integer|required'              
        ]);   
          
        $provider_id = $request->provider_id['id'];

        $providers = Provider::where('status', '1')->whereId($provider_id)->first(['prefix', 'length']);  

        $provider_old_generated = GeneratedNumber::where('provider_id', $provider_id)->orderBy('id', 'DESC')->first(['id', 'number']);  

        if ( $provider_old_generated ) {
            $name_number = $provider_old_generated['id'];
            $number = $provider_old_generated['number'];
        } else {
            if ( $last_id = GeneratedNumber::orderBy('id', 'DESC')->first('id') ) {
                $name_number = $last_id['id'];
            } else {
                $name_number = 0;
            }
            
            $number = str_repeat(0, $providers['length']);
        }
 
        $insert_numbers = []; 

        for ( $i = 0; $i < $request->total ; $i++ ) { 
            $name_number++;
            $number++;
            $insert_numbers[$i]['status'] = 1;
            $insert_numbers[$i]['name'] = 'Unknown'.$name_number;
            $insert_numbers[$i]['provider_id'] = $provider_id;
            $insert_numbers[$i]['prefix'] = $providers['prefix'];
            if ( $number > 99999999 ) {
                abort(403, 'Provider number already exists');
            }

            $insert_numbers[$i]['number'] = str_pad($number, 8, "0", STR_PAD_LEFT);
            $insert_numbers[$i]['created_at'] = date('Y-m-d H:i:s'); 
            $insert_numbers[$i]['updated_at'] = date('Y-m-d H:i:s');  
        }

        /* Chunk value by 10000 because more than 10000 showing too many placeholder error */
        foreach ( array_chunk( $insert_numbers, 9000 ) as $chunk ) {
            $provider = GeneratedNumber::insert( $chunk );  
        }
 
    }  

    public function update(Request $request, $id) { 

        $provider = GeneratedNumber::find($id); 
        if ( Gate::denies('provider-edit', $provider) ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [
            'status' => 'boolean|required',
            'provider_id' => 'array|required',           
            'name' => 'string|required',             
            'number' => 'string|required',             
        ]);    

        $provider->update([
            'status' => $request->status,
            'provider_id' => $request->provider_id['id'],   
            'name' => $request->name,   
            'number' => $request->number,     
        ]); 

    }  

    public function destroy( $id ) {  
        DB::transaction( function() use ($id) {
            $ids = explode(',', $id);
            foreach ($ids as $id) {
                $provider = GeneratedNumber::find($id); 
                if ( Gate::denies('provider-delete', $provider) ) {
                    abort(403, 'Sorry! You do not have permission');
                }    
                $provider->delete();
            }   
        });
    }
}
