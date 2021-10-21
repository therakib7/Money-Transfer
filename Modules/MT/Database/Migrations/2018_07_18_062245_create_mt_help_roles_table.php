<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTHelpRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_help_roles', function (Blueprint $table) {
            $table->unsignedInteger('role_id');  
            $table->string('type'); // help or cat
            $table->unsignedInteger('id'); // cat or post id
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mt_help_roles');
    }
}
