<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePermissionTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // default permission list will stay here
        Schema::create('permissions', function (Blueprint $table) {
            $table->increments('id'); 
            $table->string('name');
            $table->string('guard_name');
            $table->unsignedInteger('parent_id')->nullable();  
            $table->timestamps();
        });

        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('slug');
            $table->string('desc'); 
            $table->unsignedInteger('user_id')->index();   
            $table->timestamps();
        });

        Schema::create('role_has_permissions', function (Blueprint $table) {
            $table->unsignedInteger('role_id'); 
            $table->unsignedInteger('permission_id');
        });

        Schema::create('user_has_roles', function (Blueprint $table) { 
            $table->unsignedInteger('user_id')->index(); 
            $table->unsignedInteger('role_id');  
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permissions');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('role_has_permissions');
        Schema::dropIfExists('user_has_roles');
    }
}
