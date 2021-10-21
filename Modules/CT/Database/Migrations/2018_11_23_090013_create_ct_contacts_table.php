<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCTContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ct_contacts', function (Blueprint $table) {
            $table->increments('id'); 
            $table->smallInteger('type')->nullable(); // mts null utility 1
            $table->boolean('status'); 
            $table->string('name')->nullable();
            $table->string('address')->nullable();  
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
        Schema::dropIfExists('ct_contacts');
    }
}
