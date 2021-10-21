<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTMobileBankingSecuritiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_mobile_banking_securities', function (Blueprint $table) {
            $table->increments('id');  
            $table->unsignedInteger('mt_id');   
            $table->string('id_number');
            $table->string('id_type'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mt_mobile_banking_securities');
    }
}
