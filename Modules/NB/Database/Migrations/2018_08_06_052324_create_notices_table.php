<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNoticesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('oz_nb')->create('notices', function (Blueprint $table) {
            $table->increments('id');  
            $table->unsignedInteger('app_id')->nullable();
            $table->dateTime('schedule_from');
            $table->dateTime('schedule_to');   
            $table->boolean('status'); 
            $table->unsignedInteger('in_board')->nullable();  
            $table->string('title')->nullable();
            $table->string('native_title')->nullable();
            $table->longText('content')->nullable(); 
            $table->longText('native_content')->nullable(); 
            $table->string('type')->nullable();
            $table->string('for')->nullable();
            $table->unsignedInteger('user_id'); 
            $table->timestamps(); 
            $table->index(['app_id', 'schedule_from', 'schedule_to']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('oz_nb')->dropIfExists('notices');
    }
}
