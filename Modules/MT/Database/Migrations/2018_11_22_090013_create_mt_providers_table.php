<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_providers', function (Blueprint $table) {
            $table->increments('id'); 
            $table->boolean('status');  
            $table->string('name');
            $table->string('slug'); 
            $table->string('prefix')->nullable(); // add multiple by clone 
            $table->unsignedInteger('min_number');
            $table->unsignedInteger('max_number');  
            $table->unsignedInteger('logo_small')->nullable();
            $table->unsignedInteger('logo_big')->nullable(); 
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
        Schema::dropIfExists('mt_providers');
    }
}
