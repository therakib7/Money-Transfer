<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserChangeHistoriesTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_change_histories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('key')->nullable();
            $table->string('old')->nullable();  
            $table->string('new')->nullable(); 
            $table->unsignedInteger('user_id')->index(); 
            $table->timestamp('created_at'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_change_histories');
    }
}
