<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_services', function (Blueprint $table) {
            $table->increments('id'); 
            $table->boolean('status'); 
            $table->unsignedInteger('provider_id'); 
            $table->string('name');
            $table->string('slug');
            $table->string('operator_code');
            $table->unsignedInteger('min_amount');
            $table->unsignedInteger('max_amount');  
            $table->decimal('co_com')->nullable();
            $table->decimal('user_com')->nullable();
            $table->unsignedInteger('user_id')->index();  
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
        Schema::dropIfExists('mt_services');
    }
}
