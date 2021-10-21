<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNoticeByTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('oz_nb')->create('notice_by_types', function (Blueprint $table) { 
            $table->unsignedInteger('notice_id')->index(); 
            $table->unsignedInteger('role_id')->nullable(); 
            $table->unsignedInteger('location_id')->nullable(); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('oz_nb')->dropIfExists('notice_by_types');
    }
}
