<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTCommissionUserServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mt_commission_user_services', function (Blueprint $table) {
            $table->increments('id');  
            $table->unsignedInteger('user_id')->index();  
            $table->unsignedInteger('provider_id');  
            $table->unsignedInteger('service_id');  
            $table->decimal('commission')->nullable();  
            $table->decimal('from_service')->nullable();  
            $table->string('type');  
            $table->unsignedInteger('updated_by')->nullable();   
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
        Schema::dropIfExists('mt_commission_user_services');
    }
}
