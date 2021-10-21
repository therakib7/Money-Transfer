<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTRoleLimitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_role_limits', function (Blueprint $table) {
            $table->increments('id');   
            $table->unsignedInteger('role_id')->nullable();
            $table->decimal('max_amount_day', 12, 2)->nullable();   
            $table->integer('max_number_day')->nullable();  
            $table->decimal('max_amount_month', 12, 2)->nullable();   
            $table->integer('max_number_month')->nullable();   
            $table->unsignedInteger('for')->nullable(); // (mobile_rechare = null, mobile_banking = 1, utility_bill_pay = 2, balance_transfer = 3 ) 
            $table->unsignedInteger('user_id'); 
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
        Schema::dropIfExists('mt_role_limits');
    }
}
