<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTMtsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_mts', function (Blueprint $table) {
            $table->increments('id');   
            $table->smallInteger('type')->nullable(); // (mobile_rechare = null, mobile_banking = 1, utility_bill_pay = 2)  sim balance 9 ( I give it 9 because other service will be added before) 
            $table->smallInteger('terminal_id')->nullable(); //success from
            $table->smallInteger('modem_id')->nullable(); //success from
            $table->unsignedInteger('status');
            $table->string('number');
            $table->string('operator_code');
            $table->dateTime('schedule_time')->nullable();
            $table->unsignedInteger('provider_id');
            $table->unsignedInteger('service_id');
            $table->unsignedInteger('amount');
            $table->decimal('balance', 12, 2)->nullable();
            $table->decimal('co_com', 12, 2)->nullable();
            $table->decimal('user_com', 12, 2)->nullable();  
            $table->float('co_fee')->nullable(); 
            $table->float('user_fee')->nullable(); // if mobile recharge it will as powerload commission
            $table->string('trxid')->nullable();
            $table->string('msg')->nullable();
            $table->unsignedInteger('user_id'); 
            $table->timestamps();
            $table->index(['user_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mt_mts');
    }
}
