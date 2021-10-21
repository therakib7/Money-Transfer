<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('status'); 
            $table->string('name', 150);
            $table->string('username', 100)->unique()->nullable();
            $table->string('email')->unique()->nullable(); 
            $table->dateTime('email_verified_at')->nullable(); 
            $table->string('mobile', 20)->unique()->nullable();
            $table->dateTime('mobile_verified_at')->nullable(); 
            $table->string('password');  
            $table->string('pin')->nullable(); 
            $table->rememberToken();
            $table->unsignedInteger('ref_user_id')->nullable(); 
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
        Schema::dropIfExists('users'); 
    }
}
