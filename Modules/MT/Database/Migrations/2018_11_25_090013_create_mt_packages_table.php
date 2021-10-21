<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTPackagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    { 

        Schema::create('mt_packs', function (Blueprint $table) {
            $table->increments('id');  
            $table->boolean('status'); 
            $table->unsignedInteger('order')->nullable(); 
            $table->unsignedInteger('provider_id');
            $table->unsignedInteger('service_id');
            $table->decimal('price');  
            $table->string('name');
            $table->boolean('pl_status'); 
            $table->decimal('co_com')->nullable();
            $table->decimal('user_com')->nullable();
            $table->longText('desc')->nullable();
            $table->integer('pack_type')->nullable(); // sms or min or net or bundle
            $table->integer('data_type')->nullable(); //all-1, social-0, religion
            $table->integer('offer_type')->nullable(); //all-1, off_sim-0, new_sim-2
            $table->string('to_take')->nullable(); 
            $table->unsignedInteger('taking_way')->nullable(); 
            $table->string('source')->nullable(); 
            $table->unsignedInteger('sim_pack_id')->nullable(); 
            $table->unsignedInteger('user_id')->index(); 
            $table->timestamps();
        });

        Schema::create('mt_pack_datas', function (Blueprint $table) {
            $table->increments('id');  
            $table->unsignedInteger('pack_id'); 
            $table->float('data')->nullable(); 
            $table->string('data_type')->nullable(); 
            $table->integer('network')->nullable(); // 1 onnet, 2 offnet, 0 all
            $table->string('policy')->nullable(); // fair useses policy
            $table->unsignedInteger('validity')->nullable(); 
            $table->string('validity_type')->nullable(); 
            $table->time('period_from')->nullable(); 
            $table->time('period_to')->nullable();  
            $table->boolean('is_bonus')->nullable(); 
            $table->string('comment')->nullable(); 
            $table->timestamps();
        });  
        
        /*
        call, sms, pulse, fnf, superfnf = onnet, offnet,
        */
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() { 
        Schema::dropIfExists('mt_packs');
        Schema::dropIfExists('mt_pack_datas');  
    }
}
 