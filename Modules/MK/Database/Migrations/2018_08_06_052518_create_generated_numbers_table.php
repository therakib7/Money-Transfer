<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGeneratedNumbersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('oz_mk')->create('generated_numbers', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('status'); 
            $table->unsignedInteger('provider_id');
            $table->string('name')->nullable();           
            $table->string('prefix')->nullable();           
            $table->string('number');  
            $table->timestamps();
            //$table->index(['id', 'provider_id']);  
            $table->unique(['provider_id', 'number']); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('oz_mk')->dropIfExists('generated_numbers');
    }
}
