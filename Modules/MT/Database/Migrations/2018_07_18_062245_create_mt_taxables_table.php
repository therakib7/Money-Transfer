<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTTaxablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_taxables', function (Blueprint $table) {
            $table->unsignedInteger('mt_taxonomy_id'); 
            $table->string('mt_taxable_type'); 
            $table->unsignedInteger('mt_taxable_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mt_taxables');
    }
}
