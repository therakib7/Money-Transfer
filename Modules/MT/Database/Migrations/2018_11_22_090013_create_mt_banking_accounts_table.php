<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTBankingAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_banking_accounts', function (Blueprint $table) {
            $table->increments('id'); 
            $table->boolean('status');
            $table->unsignedInteger('banking_provider_id')->index(); 
            $table->string('ac_holder_name');
            $table->string('ac_no');
            $table->string('ac_type');
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
        Schema::dropIfExists('mt_banking_accounts');
    }
}

