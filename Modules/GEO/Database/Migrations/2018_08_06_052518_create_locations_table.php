<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('oz_geo')->create('locations', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('status'); 
            $table->unsignedInteger('country_id')->nullable();
            $table->string('name')->nullable();           
            $table->unsignedInteger('parent_id')->index()->nullable();
            $table->smallInteger('stage_id')->unsigned()->nullable();
            $table->unsignedInteger('order')->nullable();
            $table->unsignedInteger('user_id'); 
            $table->string('native_name')->nullable(); 
            $table->string('code')->nullable(); 
            $table->string('lat')->nullable();
            $table->string('long')->nullable();
            $table->string('web')->nullable();
            $table->timestamps();
            $table->index(['country_id', 'stage_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('oz_geo')->dropIfExists('locations');
    }
}
