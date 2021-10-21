<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTSimBalanceHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_sim_balance_histories', function (Blueprint $table) {
            $table->increments('id');   
            $table->string('number'); 
            $table->unsignedInteger('provider_id'); 
            $table->decimal('amount', 12, 2); 
            $table->string('statement_id')->nullable();  
            $table->string('note')->nullable();  
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
        Schema::dropIfExists('mt_sim_balance_histories');
    }
}
