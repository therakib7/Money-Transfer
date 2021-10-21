<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('oz_doc')->create('docs', function (Blueprint $table) {
            $table->increments('id');  
            $table->boolean('status'); 
            $table->unsignedInteger('order')->nullable(); 
            $table->string('title');  
            $table->longText('content')->nullable(); 
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
        Schema::connection('oz_doc')->dropIfExists('docs');
    }
}
 