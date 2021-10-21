<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTSimProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_sim_providers', function (Blueprint $table) { 
            $table->increments('id'); 
            $table->unsignedInteger('sim_id'); 
            $table->unsignedInteger('terminal_id'); // ternimal id added two time because so that less query in modem controller
            $table->string('number'); 
            $table->string('balance_code')->nullable(); 
            $table->unsignedInteger('provider_id'); 
            $table->decimal('balance', 12, 2)->default(0);    
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
        Schema::dropIfExists('mt_sim_providers');
    }
}
