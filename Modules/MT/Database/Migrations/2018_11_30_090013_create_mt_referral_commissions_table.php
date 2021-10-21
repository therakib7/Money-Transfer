<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTReferralCommissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {  
        Schema::create('mt_referral_commissions', function (Blueprint $table) {
            $table->increments('id');  
            $table->unsignedInteger('from_user_id')->index();   
            $table->unsignedInteger('to_user_id')->index();   
            $table->decimal('amount', 12, 2); 
            $table->unsignedInteger('mt_id');   
            $table->string('note'); 
            $table->boolean('status');   
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
        Schema::dropIfExists('mt_referral_commissions');
    }
}
