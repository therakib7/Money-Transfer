<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTCashoutMBankingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_cashout_m_bankings', function (Blueprint $table) {
            $table->increments('id');    
            $table->unsignedInteger('service_id');   
            $table->string('number');
            $table->decimal('amount', 12, 2);
            $table->float('co_com')->nullable();
            $table->float('user_com')->nullable();
            $table->boolean('status')->nullable();
            $table->string('trxid');
            $table->unsignedInteger('used_by')->nullable();  
            $table->string('msg');
            $table->timestamps(); //updated at will be used time
            $table->index(['service_id', 'status']);
            $table->index(['service_id', 'used_by']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mt_cashout_m_bankings');
    }
}
