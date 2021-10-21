<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /*Schema::create('mt_cards', function (Blueprint $table) {
            $table->increments('id'); 
            $table->unsignedInteger('service_id')->nullable();
            $table->string('bundle_name')->nullable();
            $table->string('pin')->nullable();
            $table->unsignedInteger('amount')->nullable();
            $table->unsignedInteger('created_by')->nullable();
            $table->unsignedInteger('used_by')->nullable();
            $table->dateTime('used_time')->nullable(); 
            $table->timestamps();
        });*/
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //Schema::dropIfExists('mt_cards');
    }
}
