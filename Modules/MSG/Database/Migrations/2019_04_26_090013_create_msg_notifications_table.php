<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMsgNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('msg_notifications', function (Blueprint $table) {
            $table->increments('id');     
            $table->unsignedInteger('to_user_id')->index();    
            $table->smallInteger('type'); //type (1 success, 0 danger, 2 info etc for icon and color)
            $table->longText('msg'); 
            $table->boolean('read')->default(0);    
            $table->timestamp('created_at');  
        });
    } 
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('msg_notifications');
    }
}
