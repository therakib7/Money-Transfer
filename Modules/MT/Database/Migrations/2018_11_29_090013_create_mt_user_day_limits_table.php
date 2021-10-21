<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTUserDayLimitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_user_day_limits', function (Blueprint $table) {
            $table->increments('id');    
            $table->unsignedInteger('user_id')->nullable();
            $table->decimal('used_amount', 12, 2)->nullable();   
            $table->integer('used_number')->nullable();     
            $table->unsignedInteger('for')->nullable(); // (mobile_rechare = null, mobile_banking = 1, utility_bill_pay = 2, balance_transfer = 3 ) 
            $table->date('date');  
            $table->index(['user_id', 'for']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mt_user_day_limits');
    }
}
