<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMsgInboxesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('msg_inboxes', function (Blueprint $table) {
            $table->increments('id');  
            $table->unsignedInteger('from_user_id');   
            $table->unsignedInteger('to_user_id');    
            $table->longText('msg'); 
            $table->boolean('read')->default(0); 
            $table->boolean('from_deleted')->nullable();    
            $table->boolean('to_deleted')->nullable();    
            $table->timestamp('created_at'); 
            $table->index(['from_user_id', 'to_user_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('msg_inboxes');
    }
}
