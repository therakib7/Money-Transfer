<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableRelationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {  

        /* Relational table arrange by latters */
        /*Schema::table('ac_balances', function($table) { 
            //$table->foreign('user_id')->references('id')->on('users'); because we need 0 user for main account balance
        }); 

        Schema::table('ac_balance_histories', function($table) { 
            $table->foreign('from_user_id')->references('id')->on('users'); 
            $table->foreign('to_user_id')->references('id')->on('users'); 
        });

        Schema::table('ct_contacts', function($table) { 
            $table->foreign('user_id')->references('id')->on('users');  
        });

        Schema::table('ct_contact_services', function($table) { 
            $table->foreign('contact_id')->references('id')->on('ct_contacts'); 
            $table->foreign('provider_id')->references('id')->on('mt_providers'); 
            $table->foreign('service_id')->references('id')->on('mt_services'); 
            $table->foreign('user_id')->references('id')->on('users'); 
        });

        Schema::table('ct_taxonomies', function($table) {  
            $table->foreign('parent_id')->references('id')->on('ct_taxonomies');
        });

        Schema::table('ct_taxonomy_metas', function($table) {
            $table->foreign('ct_taxonomy_id')->references('id')->on('ct_taxonomies'); 
        });

        Schema::table('ct_taxables', function($table) {
            $table->foreign('ct_taxonomy_id')->references('id')->on('ct_taxonomies');
        }); 

        Schema::table('media', function($table) { 
            $table->foreign('user_id')->references('id')->on('users');  
        });

        Schema::table('msg_inboxes', function($table) { 
            $table->foreign('from_user_id')->references('id')->on('users'); 
            $table->foreign('to_user_id')->references('id')->on('users'); 
        });

        Schema::table('mt_commission_users', function($table) { 
            $table->foreign('user_id')->references('id')->on('users');  
        });

        Schema::table('mt_commission_user_services', function($table) { 
            $table->foreign('user_id')->references('id')->on('users'); 
            $table->foreign('service_id')->references('id')->on('mt_services');  
        });

        Schema::table('mt_commission_user_statuses', function($table) { 
            $table->foreign('user_id')->references('id')->on('users');  
        });

        Schema::table('mt_docs', function($table) {  
            $table->foreign('user_id')->references('id')->on('users'); 
        });

        Schema::table('mt_dues', function($table) { 
            $table->foreign('contact_id')->references('id')->on('ct_contacts');
            $table->foreign('user_id')->references('id')->on('users'); 
        });

        Schema::table('mt_due_payments', function($table) { 
            $table->foreign('due_id')->references('id')->on('mt_dues'); 
            $table->foreign('provider_id')->references('id')->on('mt_providers'); 
            $table->foreign('service_id')->references('id')->on('mt_services');  
        });

        Schema::table('mt_cashout_m_bankings', function($table) { 
            $table->foreign('provider_id')->references('id')->on('mt_providers');
            $table->foreign('service_id')->references('id')->on('mt_services');  
            $table->foreign('used_by')->references('id')->on('users'); 
        });

        Schema::table('mt_mobile_banking_securities', function($table) { 
            $table->foreign('mt_id')->references('id')->on('mt_mts');  
        });

        Schema::table('mt_mts', function($table) {  
            $table->foreign('provider_id')->references('id')->on('mt_providers'); 
            $table->foreign('service_id')->references('id')->on('mt_services'); 
            $table->foreign('user_id')->references('id')->on('users'); 
        });

        Schema::table('mt_packs', function($table) {  
            $table->foreign('provider_id')->references('id')->on('mt_providers'); 
            $table->foreign('service_id')->references('id')->on('mt_services');
            $table->foreign('sim_pack_id')->references('id')->on('mt_packs'); 
            $table->foreign('user_id')->references('id')->on('users'); 
        });

        Schema::table('mt_pack_datas', function($table) {  
            $table->foreign('pack_id')->references('id')->on('mt_packs'); 
        }); 

        Schema::table('mt_providers', function($table) {   
            $table->foreign('logo_small')->references('id')->on('media')->onDelete('set null'); 
            $table->foreign('logo_big')->references('id')->on('media')->onDelete('set null');   
            $table->foreign('user_id')->references('id')->on('users'); 
        }); 

        Schema::table('mt_referral_balances', function($table) { 
            $table->foreign('from_user_id')->references('id')->on('users'); 
            $table->foreign('to_user_id')->references('id')->on('users'); 
        });

        Schema::table('mt_referral_commissions', function($table) { 
            $table->foreign('from_user_id')->references('id')->on('users'); 
            $table->foreign('to_user_id')->references('id')->on('users'); 
            $table->foreign('mt_id')->references('id')->on('mt_mts'); 
        });

        Schema::table('mt_services', function($table) { 
            $table->foreign('provider_id')->references('id')->on('mt_providers'); 
            $table->foreign('user_id')->references('id')->on('users'); 
        });

        Schema::table('mt_service_fees', function($table) { 
            $table->foreign('service_id')->references('id')->on('mt_services'); 
            $table->foreign('user_id')->references('id')->on('users'); 
        });

        Schema::table('mt_settings', function($table) {  
            $table->foreign('updated_by')->references('id')->on('users'); 
        });

        Schema::table('mt_setting_users', function($table) {  
            $table->foreign('user_id')->references('id')->on('users'); 
        });

        Schema::table('mt_sims', function($table) {  
            $table->foreign('user_id')->references('id')->on('users'); 
        }); 
        
        Schema::table('mt_sim_balance_histories', function($table) {   
             $table->foreign('provider_id')->references('id')->on('mt_providers');  
            $table->foreign('user_id')->references('id')->on('users'); 
        });

        Schema::table('mt_sim_providers', function($table) {   
            $table->foreign('sim_id')->references('id')->on('mt_sims'); 
            $table->foreign('provider_id')->references('id')->on('mt_providers'); 
        });

        Schema::table('mt_taxonomies', function($table) {  
            $table->foreign('parent_id')->references('id')->on('mt_taxonomies');
        });

        Schema::table('mt_taxonomy_metas', function($table) {
            $table->foreign('mt_taxonomy_id')->references('id')->on('mt_taxonomies'); 
        });

        Schema::table('mt_taxables', function($table) {
            $table->foreign('mt_taxonomy_id')->references('id')->on('mt_taxonomies');
        });

        Schema::table('permissions', function($table) { 
            $table->foreign('parent_id')->references('id')->on('permissions')->onDelete('set null'); 
        }); 

        Schema::table('profiles', function($table) { 
            $table->foreign('user_id')->references('id')->on('users'); 
        }); 

        Schema::table('roles', function($table) { 
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::table('role_has_permissions', function($table) { 
            $table->foreign('role_id')->references('id')->on('roles'); 
            $table->foreign('permission_id')->references('id')->on('permissions'); 
        }); 

        Schema::table('users', function($table) { 
            $table->foreign('ref_user_id')->references('id')->on('users');  
        });

        Schema::table('user_change_histories', function($table) { 
            $table->foreign('user_id')->references('id')->on('users');  
        });

        Schema::table('user_has_roles', function($table) { 
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('role_id')->references('id')->on('roles'); 
        });   */

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    { 
        //
    }
}
