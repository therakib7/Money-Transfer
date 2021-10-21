<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateACBalanceTransfersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ac_balances', function (Blueprint $table) {
            $table->increments('id');  
            $table->unsignedInteger('user_id')->index();   
            $table->decimal('balance', 12, 2); 
            $table->timestamps();
        });

        Schema::create('ac_balance_histories', function (Blueprint $table) {
            $table->increments('id');  
            $table->smallInteger('type')->nullable(); // null for personal and 1 for our compnay balance
            $table->unsignedInteger('from_user_id');   
            $table->unsignedInteger('to_user_id');   
            $table->decimal('amount', 12, 2);   
            $table->string('statement_id')->nullable(); 
            $table->string('note')->nullable(); 
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
        Schema::dropIfExists('ac_balances');
        Schema::dropIfExists('ac_balance_histories');
    }
}
