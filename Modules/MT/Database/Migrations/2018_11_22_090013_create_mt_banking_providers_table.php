<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTBankingProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_banking_providers', function (Blueprint $table) {
            $table->increments('id'); 
            $table->boolean('status');  
            $table->string('name');
            $table->tinyInteger('type')->nullable();
            $table->unsignedInteger('order')->nullable();
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
        Schema::dropIfExists('mt_banking_providers');
    }
}

