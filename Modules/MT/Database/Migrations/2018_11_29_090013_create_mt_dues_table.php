<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTDuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_dues', function (Blueprint $table) {
            $table->increments('id');  
            $table->smallInteger('type')->nullable(); // mts null utility 1  
            $table->unsignedInteger('contact_id')->nullable();
            $table->decimal('amount', 12, 2);   
            $table->decimal('paid')->nullable();   
            $table->decimal('due')->nullable();    
            $table->unsignedInteger('user_id'); 
            $table->index(['user_id', 'type']);
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
        Schema::dropIfExists('mt_dues');
    }
}
