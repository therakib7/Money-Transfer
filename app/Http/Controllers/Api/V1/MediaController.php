<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

use Intervention\Image\Facades\Image;
use App\Models\Media;

use Illuminate\Support\Facades\Storage;

class MediaController extends Controller {

    private $photos_path;

    public function __construct() {
        $this->photos_path = public_path('uploads/imgs');
    }

    public function index( Request $request ) {  
 
        if ( Gate::denies('media-view') ) {
            abort(403, 'Sorry! You do not have permission');
        }

        $this->validate($request, [    
            'page' => 'integer|nullable',           
        ]); 
        
        $medias = new Media;    

        $medias = $medias->where('user_id', Auth::id()); 

        $medias = $medias->paginate( $request->per_page );

        $img_dir = Storage::disk('s3')->url('avatar/');

        return compact('medias', 'img_dir');  

    } 

    public function store( Request $request ) {

        if ( Gate::denies('media-create') ) {
            abort(403, 'Sorry! You do not have permission');
        } 

        $this->validate($request, [
            'file' => 'image|mimes:jpeg,png,jpg|max:512', // max upload size 0.5 MB
        ]);

        $photos = $request->file('file');

        if (!is_array($photos)) {
            $photos = [$photos];
        } 

        for ($i = 0; $i < count($photos); $i++) {

            $countMedia = Media::where('user_id', Auth::id() )->count();
            if ( $countMedia > 4 ) {
                abort(403, 'Sorry! you can\'t upload more than 5 files');
            } 
            
            $photo = $photos[$i];
            $name = sha1(date('YmdHis') . str_random(15));
            $big_size = $name . str_random(2) . '.' . $photo->getClientOriginalExtension(); 
            $small_size = $name . '.' . $photo->getClientOriginalExtension();

            $big_resize_img = Image::make($photo)->resize(500, null, function ($constraint) {
                            $constraint->aspectRatio();
                            $constraint->upsize();
                        });

            $small_resize_img = Image::make($photo)->resize(200, null, function ($constraint) {
                            $constraint->aspectRatio();
                            $constraint->upsize();
                        });

            $big_upload = Storage::disk('s3')->put('avatar/'.$big_size, $big_resize_img->stream()->detach(), 'public');
            $small_upload = Storage::disk('s3')->put('avatar/'.$small_size, $small_resize_img->stream()->detach(), 'public'); 

            $upload = new Media();
            $upload->filename = $big_size;
            $upload->resized_name = $small_size;
            $upload->user_id =  Auth::id();
            $upload->original_name = basename($photo->getClientOriginalName());
            $upload->save();
        }
       
    } 

    public function update(Request $request, $id) { 
    }

    public function destroy($id) { 
         
        $ids = explode(',', $id);

        foreach ($ids as $id) {
            $uploaded_image = Media::find($id); 
            if ( Gate::denies('media-delete', $uploaded_image) ) {
                abort(403, 'Sorry! You do not have permission');
            }

            $uploaded_image = Media::find($id);

            if (empty($uploaded_image)) {
                return response()->json(['message' => 'Sorry file does not exist'], 400);
            }

            $big_size = $uploaded_image->filename;
            $small_size = $uploaded_image->resized_name;

            $big_upload = Storage::disk('s3')->delete( 'avatar/' . $big_size );
            $small_upload = Storage::disk('s3')->delete( 'avatar/' . $small_size ); 

            if (!empty($uploaded_image)) {
                $uploaded_image->delete();
            } 
        }  
    }
}
