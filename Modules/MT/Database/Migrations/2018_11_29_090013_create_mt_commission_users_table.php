<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTCommissionUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_commission_users', function (Blueprint $table) {
            $table->increments('id');  
            $table->unsignedInteger('user_id')->index();  
            $table->decimal('commission')->nullable();  
            $table->string('type');  
            $table->unsignedInteger('updated_by');   
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
        Schema::dropIfExists('mt_commission_users');
    }
}
