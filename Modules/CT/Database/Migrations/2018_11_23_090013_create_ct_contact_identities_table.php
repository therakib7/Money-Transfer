<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCTContactIdentitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ct_contact_identities', function (Blueprint $table) {
            $table->increments('id');  
            $table->unsignedInteger('contact_id');  
            $table->string('id_number'); 
            $table->smallInteger('id_type'); // 1 nid, 2 passport, 3 birth_crt
            $table->unsignedInteger('user_id')->index();   
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
        Schema::dropIfExists('ct_contact_identities');
    }
}
