<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCTContactServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ct_contact_services', function (Blueprint $table) {
            $table->increments('id');  
            $table->smallInteger('type')->nullable(); // mts null utility 2
            $table->unsignedInteger('contact_id');  
            $table->string('number'); 
            $table->unsignedInteger('provider_id')->nullable();  
            $table->unsignedInteger('service_id')->nullable();  
            $table->unsignedInteger('user_id');  
            $table->index(['user_id', 'type']); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ct_contact_services');
    }
}
