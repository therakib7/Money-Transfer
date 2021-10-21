<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTTransferRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_transfer_requests', function (Blueprint $table) {
            $table->increments('id'); 
            $table->boolean('status')->nullable(); 
            $table->unsignedInteger('banking_provider_id'); 
            $table->string('to_ac_no');
            $table->string('from_ac_no');
            $table->float('amount');
            $table->float('received_amount')->nullable();
            $table->string('user_note')->nullable(); 
            $table->string('checker_note')->nullable(); 
            $table->unsignedInteger('user_id')->index();  
            $table->string('statement_id')->nullable(); // admin will fill up
            $table->unsignedInteger('checked_by')->index();  
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
        Schema::dropIfExists('mt_transfer_requests');
    }
}

