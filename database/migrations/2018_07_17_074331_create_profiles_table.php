<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id')->index(); 
            $table->integer('avatar')->nullable(); 
            $table->dateTime('bday')->nullable();
            $table->string('nid')->nullable();
            $table->string('birth_crt')->nullable();
            $table->string('passport')->nullable();
            $table->string('occupation')->nullable();
            $table->integer('pre_address')->nullable(); 
            $table->integer('per_address')->nullable();
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
        Schema::dropIfExists('profiles');
    }
}
