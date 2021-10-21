<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTTaxonomyMetasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_taxonomy_metas', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('mt_taxonomy_id'); 
            $table->string('meta_key');
            $table->string('meta_value');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mt_taxonomy_metas');
    }
}
