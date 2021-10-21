<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProviderNumbersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('oz_mk')->create('provider_numbers', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('status'); 
            $table->unsignedInteger('provider_id');
            $table->unsignedInteger('generated_number_id');
            $table->unsignedInteger('location_id')->index()->nullable();  
            $table->timestamps();
            $table->index(['provider_id', 'generated_number_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('oz_mk')->dropIfExists('provider_numbers');
    }
}
