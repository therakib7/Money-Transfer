<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePremiumProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //https://passwordsgenerator.net/ select all option password length 20
        Schema::connection('oz_mk')->create('premium_products', function (Blueprint $table) {
            $table->increments('id'); 
            $table->boolean('status')->nullable();  
            $table->string('name');
            $table->string('site_url')->nullable();
            $table->string('access_token');  
            $table->string('purchase_code');  
            $table->dateTime('valid_till')->nullable();  
            $table->dateTime('verify_at')->nullable();  
            $table->unsignedInteger('valid_year'); 
            $table->unsignedInteger('user_id'); 
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
        Schema::connection('oz_mk')->dropIfExists('premium_products');
    }
} 