<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('oz_mk')->create('providers', function (Blueprint $table) {
            $table->increments('id'); 
            $table->boolean('status');  
            $table->string('name');
            $table->string('prefix')->nullable();
            $table->unsignedInteger('length')->nullable();
            $table->unsignedInteger('type'); // 1=social, 2=telcom
            $table->unsignedInteger('location_id')->index()->nullable();  
            $table->unsignedInteger('user_id'); 
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
        Schema::connection('oz_mk')->dropIfExists('providers');
    }
} 