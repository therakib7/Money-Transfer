<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTaxablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('oz_doc')->create('taxables', function (Blueprint $table) {
            $table->unsignedInteger('taxonomy_id'); 
            $table->string('taxable_type'); 
            $table->unsignedInteger('taxable_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('oz_doc')->dropIfExists('taxables');
    }
}
