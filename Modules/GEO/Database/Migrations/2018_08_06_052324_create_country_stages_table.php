<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCountryStagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('oz_geo')->create('country_stages', function (Blueprint $table) {
            $table->increments('id'); 
            $table->unsignedInteger('country_id'); 
            $table->unsignedInteger('stage');
            $table->string('name');
            $table->string('native_name')->nullable();
            $table->unsignedInteger('user_id'); 
            $table->timestamps();
            $table->index(['country_id', 'stage']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('oz_geo')->dropIfExists('country_stages');
    }
}
