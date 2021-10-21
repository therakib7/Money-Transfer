<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTServiceFeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_service_fees', function (Blueprint $table) {
            $table->increments('id');   
            $table->unsignedInteger('service_id')->index();  
            $table->unsignedInteger('from');
            $table->unsignedInteger('to');  
            $table->decimal('co_fee')->default(0);
            $table->decimal('user_fee')->default(0);
            $table->boolean('percent')->nullable(); 
            $table->unsignedInteger('user_id');   
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mt_service_fees');
    }
}
