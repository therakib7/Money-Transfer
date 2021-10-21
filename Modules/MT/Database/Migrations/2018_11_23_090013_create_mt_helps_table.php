<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTHelpsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_helps', function (Blueprint $table) {
            $table->increments('id');  
            $table->boolean('status'); 
            $table->unsignedInteger('order')->nullable(); 
            $table->string('title'); 
            $table->string('slug'); 
            $table->longText('basic_video')->nullable(); //basic user and video help
            $table->longText('basic_text')->nullable(); 
            $table->longText('medium_video')->nullable(); 
            $table->longText('medium_text')->nullable(); // medium user and text help
            $table->longText('advance_video')->nullable(); 
            $table->longText('advance_text')->nullable(); 
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
        Schema::dropIfExists('mt_helps');
    }
}
  