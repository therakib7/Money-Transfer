<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCTTaxablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ct_taxables', function (Blueprint $table) {
            $table->unsignedInteger('ct_taxonomy_id'); 
            $table->string('ct_taxable_type'); 
            $table->unsignedInteger('ct_taxable_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ct_taxables');
    }
}
