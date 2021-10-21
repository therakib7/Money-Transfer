<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTDuePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_due_payments', function (Blueprint $table) {
            $table->increments('id');   
            $table->unsignedInteger('due_id')->index();  
            $table->unsignedInteger('provider_id')->nullable();
            $table->unsignedInteger('service_id')->nullable();
            $table->decimal('amount', 12, 2); 
            $table->string('note')->nullable(); 
            $table->unsignedInteger('type')->comment('0 is Due, 1 is Paid');
            $table->dateTime('date_time'); 
            $table->timestamp('created_at');  
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mt_due_payments');
    }
}
