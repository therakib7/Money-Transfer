<?php

namespace App\Providers;
use Illuminate\Support\Facades\Gate; 

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider {
    
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        //'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot() {

        $this->registerPolicies(); 
        
        /* User */
        Gate::define('user-view', function () {
            return auth_can(['user-view']); 
        });
        Gate::define('user-create', function () {
            return auth_can(['user-create']); 
        });
        Gate::define('user-edit', function ($user, $model) {
            return auth_can(['user-edit']) && $user->id == $model->id || auth_can(['user-super']); 
        });
        Gate::define('user-delete', function ($user, $model) {
            return auth_can(['user-delete']) && $user->id == $model->id || auth_can(['user-super']); 
        });

        /* User Role */
        Gate::define('user-role-view', function () {
            return auth_can(['user-role-view']); 
        });
        Gate::define('user-role-create', function () {
            return auth_can(['user-role-create']); 
        });
        Gate::define('user-role-edit', function ($user, $model) {
            return auth_can(['user-role-edit']) && $user->id == $model->id || auth_can(['user-role-super']); 
        });
        Gate::define('user-role-delete', function ($user, $model) {
            return auth_can(['user-role-delete']) && $user->id == $model->id || auth_can(['user-role-super']); 
        });

        /* User Permission */
        Gate::define('user-permission-view', function () {
            return auth_can(['user-permission-view']); 
        });
        Gate::define('user-permission-create', function () {
            return auth_can(['user-permission-create']); 
        });
        Gate::define('user-permission-edit', function () {
            return auth_can(['user-permission-super']); 
        });
        Gate::define('user-permission-delete', function () {
            return auth_can(['user-permission-super']); 
        });

        /* Media Permission */
        Gate::define('media-view', function () {
            return auth_can(['media-view']); 
        });
        Gate::define('media-create', function () {
            return auth_can(['media-create']); 
        });
        Gate::define('media-edit', function ($user, $model) {
            return auth_can(['media-edit']) && $user->id == $model->user_id || auth_can(['media-super']); 
        });
        Gate::define('media-delete', function ($user, $model) {
            return auth_can(['media-delete']) && $user->id == $model->user_id || auth_can(['media-super']); 
        });

        /* Service */
        Gate::define('service-view', function () {
            return auth_can(['service-view']); 
        });
        Gate::define('service-create', function () {
            return auth_can(['service-create']); 
        });
        Gate::define('service-edit', function ($user, $model) {
            return auth_can(['service-edit']) && $user->id == $model->user_id || auth_can(['service-super']);  
        });
        Gate::define('service-delete', function ($user, $model) {
            return auth_can(['service-delete']) && $user->id == $model->user_id || auth_can(['service-super']);  
        });

        /* Service Provider */
        Gate::define('provider-view', function () {
            return auth_can(['provider-view']); 
        });
        Gate::define('provider-create', function () {
            return auth_can(['provider-create']); 
        });
        Gate::define('provider-edit', function ($user, $model) {
            return auth_can(['provider-edit']) && $user->id == $model->user_id || auth_can(['provider-super']);  
        });
        Gate::define('provider-delete', function ($user, $model) {
            return auth_can(['provider-delete']) && $user->id == $model->user_id || auth_can(['provider-super']);  
        });
 
        /* Service Taxonomy */
        Gate::define('provider-taxonomy-view', function () {
            return auth_can(['provider-taxonomy-view']); 
        });
        Gate::define('provider-taxonomy-create', function () {
            return auth_can(['provider-taxonomy-create']); 
        });
        Gate::define('provider-taxonomy-edit', function ($user, $model) {
            return auth_can(['provider-taxonomy-edit']) && $user->id == $model->user_id || auth_can(['provider-taxonomy-super']);  
        });
        Gate::define('provider-taxonomy-delete', function ($user, $model) {
            return auth_can(['provider-taxonomy-delete']) && $user->id == $model->user_id || auth_can(['provider-taxonomy-super']);  
        });

        /* Banking Provider */
        Gate::define('banking-provider-view', function () {
            return auth_can(['banking-provider-view']); 
        });
        Gate::define('banking-provider-create', function () {
            return auth_can(['banking-provider-create']); 
        });
        Gate::define('banking-provider-edit', function ($user, $model) {
            return auth_can(['banking-provider-edit']) && $user->id == $model->user_id || auth_can(['banking-provider-super']);  
        });
        Gate::define('banking-provider-delete', function ($user, $model) {
            return auth_can(['banking-provider-delete']) && $user->id == $model->user_id || auth_can(['banking-provider-super']);  
        });

        /* Banking Account */
        Gate::define('banking-account-view', function () {
            return auth_can(['banking-account-view']); 
        });
        Gate::define('banking-account-create', function () {
            return auth_can(['banking-account-create']); 
        });
        Gate::define('banking-account-edit', function ($user, $model) {
            return auth_can(['banking-account-edit']) && $user->id == $model->user_id || auth_can(['banking-account-super']);  
        });
        Gate::define('banking-account-delete', function ($user, $model) {
            return auth_can(['banking-account-delete']) && $user->id == $model->user_id || auth_can(['banking-account-super']);  
        });

        /* Transfer Request */
        Gate::define('transfer-request-view', function () {
            return auth_can(['transfer-request-view']); 
        });
        Gate::define('transfer-request-create', function () {
            return auth_can(['transfer-request-create']); 
        });
        Gate::define('transfer-request-edit', function ($user, $model) {
            return auth_can(['transfer-request-edit']) && $user->id == $model->user_id || auth_can(['transfer-request-super']);  
        });
        Gate::define('transfer-request-delete', function ($user, $model) {
            return auth_can(['transfer-request-delete']) && $user->id == $model->user_id || auth_can(['transfer-request-super']);  
        });

        /* Sim */
        Gate::define('sim-view', function () {
            return auth_can(['sim-view']); 
        });
        Gate::define('sim-create', function () {
            return auth_can(['sim-create']); 
        });
        Gate::define('sim-edit', function ($user, $model) {
            return auth_can(['sim-edit']) && $user->id == $model->user_id || auth_can(['sim-super']);  
        });
        Gate::define('sim-delete', function ($user, $model) {
            return auth_can(['sim-delete']) && $user->id == $model->user_id || auth_can(['sim-super']);  
        });

        /* Sim Balance */
        Gate::define('sim-balance-view', function () {
            return auth_can(['sim-balance-view']); 
        });
        Gate::define('sim-balance-create', function () {
            return auth_can(['sim-balance-create']); 
        });
        Gate::define('sim-balance-edit', function ($user, $model) {
            return auth_can(['sim-balance-edit']) && $user->id == $model->user_id || auth_can(['sim-balance-super']);  
        });
        Gate::define('sim-balance-delete', function ($user, $model) {
            return auth_can(['sim-balance-delete']) && $user->id == $model->user_id || auth_can(['sim-balance-super']);  
        });

        /* Sim Balance History */
        Gate::define('sim-balance-history-view', function () {
            return auth_can(['sim-balance-history-view']); 
        });
        Gate::define('sim-balance-history-create', function () {
            return auth_can(['sim-balance-history-create']); 
        });
        Gate::define('sim-balance-history-edit', function ($user, $model) {
            return auth_can(['sim-balance-history-edit']) && $user->id == $model->user_id || auth_can(['sim-balance-history-super']);  
        });
        Gate::define('sim-balance-history-delete', function ($user, $model) {
            return auth_can(['sim-balance-history-delete']) && $user->id == $model->user_id || auth_can(['sim-balance-history-super']);  
        });

        /* Mobile Recharge */
        Gate::define('mobile-recharge-view', function () {
            return auth_can(['mobile-recharge-view']); 
        });
        Gate::define('mobile-recharge-create', function () {
            return auth_can(['mobile-recharge-create']); 
        });
        Gate::define('mobile-recharge-edit', function ($user, $model) {
            return auth_can(['mobile-recharge-edit']) && $user->id == $model->user_id || auth_can(['mobile-recharge-super']);  
        });
        Gate::define('mobile-recharge-delete', function ($user, $model) {
            return auth_can(['mobile-recharge-delete']) && $user->id == $model->user_id || auth_can(['mobile-recharge-super']);  
        });

        /* Mobile Banking */
        Gate::define('mobile-banking-view', function () {
            return auth_can(['mobile-banking-view']); 
        });
        Gate::define('mobile-banking-create', function () {
            return auth_can(['mobile-banking-create']); 
        });
        Gate::define('mobile-banking-edit', function ($user, $model) {
            return auth_can(['mobile-banking-edit']) && $user->id == $model->user_id || auth_can(['mobile-banking-super']);  
        });
        Gate::define('mobile-banking-delete', function ($user, $model) {
            return auth_can(['mobile-banking-delete']) && $user->id == $model->user_id || auth_can(['mobile-banking-super']);  
        });

        /* Cashout Banking */
        Gate::define('cashout-banking-view', function () {
            return auth_can(['cashout-banking-view']); 
        });
        Gate::define('cashout-banking-create', function () {
            return auth_can(['cashout-banking-create']); 
        });
        Gate::define('cashout-banking-edit', function ($user, $model) {
            return auth_can(['cashout-banking-edit']) && $user->id == $model->user_id || auth_can(['cashout-banking-super']);  
        });
        Gate::define('cashout-banking-delete', function ($user, $model) {
            return auth_can(['cashout-banking-delete']) && $user->id == $model->user_id || auth_can(['cashout-banking-super']);  
        });

        /* Due Amount */
        Gate::define('due-amount-view', function () {
            return auth_can(['due-amount-view']); 
        });
        Gate::define('due-amount-create', function () {
            return auth_can(['due-amount-create']); 
        });
        Gate::define('due-amount-edit', function ($user, $model) {
            return auth_can(['due-amount-edit']) && $user->id == $model->user_id || auth_can(['due-amount-super']);  
        });
        Gate::define('due-amount-delete', function ($user, $model) {
            return auth_can(['due-amount-delete']) && $user->id == $model->user_id || auth_can(['due-amount-super']);  
        });

        /* Balance Transfer */
        Gate::define('balance-transfer-view', function () {
            return auth_can(['balance-transfer-view']); 
        });
        Gate::define('balance-transfer-create', function () {
            return auth_can(['balance-transfer-create']); 
        });
        Gate::define('balance-transfer-edit', function ($user, $model) {
            return auth_can(['balance-transfer-edit']) && $user->id == $model->user_id || auth_can(['balance-transfer-super']);  
        });
        Gate::define('balance-transfer-delete', function ($user, $model) {
            return auth_can(['balance-transfer-delete']) && $user->id == $model->user_id || auth_can(['balance-transfer-super']);  
        });
        Gate::define('balance-transfer-super', function () {
            return auth_can(['balance-transfer-super']); 
        });
        Gate::define('balance-transfer-top-suer', function () {
            return auth_can(['balance-transfer-top-suer']); 
        });

        /* Contact */
        Gate::define('contact-view', function () {
            return auth_can(['contact-view']); 
        });
        Gate::define('contact-create', function () {
            return auth_can(['contact-create']); 
        });
        Gate::define('contact-edit', function ($user, $model) {
            return auth_can(['contact-edit']) && $user->id == $model->user_id || auth_can(['contact-super']);  
        });
        Gate::define('contact-delete', function ($user, $model) {
            return auth_can(['contact-delete']) && $user->id == $model->user_id || auth_can(['contact-super']);  
        });

        /* Contact Taxonomy */
        Gate::define('contact-taxonomy-view', function () {
            return auth_can(['contact-taxonomy-view']); 
        });
        Gate::define('contact-taxonomy-create', function () {
            return auth_can(['contact-taxonomy-create']); 
        });
        Gate::define('contact-taxonomy-edit', function ($user, $model) {
            return auth_can(['contact-taxonomy-edit']) && $user->id == $model->user_id || auth_can(['contact-taxonomy-super']);  
        });
        Gate::define('contact-taxonomy-delete', function ($user, $model) {
            return auth_can(['contact-taxonomy-delete']) && $user->id == $model->user_id || auth_can(['contact-taxonomy-super']);  
        }); 

        /* Utility Bill */
        Gate::define('utility-bill-view', function () {
            return auth_can(['utility-bill-view']); 
        });
        Gate::define('utility-bill-create', function () {
            return auth_can(['utility-bill-create']); 
        });
        Gate::define('utility-bill-edit', function ($user, $model) {
            return auth_can(['utility-bill-edit']) && $user->id == $model->user_id || auth_can(['utility-bill-super']);  
        });
        Gate::define('utility-bill-delete', function ($user, $model) {
            return auth_can(['utility-bill-delete']) && $user->id == $model->user_id || auth_can(['utility-bill-super']);  
        });

        /* Utility Contact */
        Gate::define('utility-contact-view', function () {
            return auth_can(['utility-contact-view']); 
        });
        Gate::define('utility-contact-create', function () {
            return auth_can(['utility-contact-create']); 
        });
        Gate::define('utility-contact-edit', function ($user, $model) {
            return auth_can(['utility-contact-edit']) && $user->id == $model->user_id || auth_can(['utility-contact-super']);  
        });
        Gate::define('utility-contact-delete', function ($user, $model) {
            return auth_can(['utility-contact-delete']) && $user->id == $model->user_id || auth_can(['utility-contact-super']);  
        });

        /* Utility Contact Taxonomy */
        Gate::define('utility-contact-taxonomy-view', function () {
            return auth_can(['utility-contact-taxonomy-view']); 
        });
        Gate::define('utility-contact-taxonomy-create', function () {
            return auth_can(['utility-contact-taxonomy-create']); 
        });
        Gate::define('utility-contact-taxonomy-edit', function ($user, $model) {
            return auth_can(['utility-contact-taxonomy-edit']) && $user->id == $model->user_id || auth_can(['utility-contact-taxonomy-super']);  
        });
        Gate::define('utility-contact-taxonomy-delete', function ($user, $model) {
            return auth_can(['utility-contact-taxonomy-delete']) && $user->id == $model->user_id || auth_can(['utility-contact-taxonomy-super']);  
        });

        /* Package */
        Gate::define('package-view', function () {
            return auth_can(['package-view']); 
        });
        Gate::define('package-create', function () {
            return auth_can(['package-create']); 
        });
        Gate::define('package-edit', function ($user, $model) {
            return auth_can(['package-edit']) && $user->id == $model->user_id || auth_can(['package-super']);  
        });
        Gate::define('package-delete', function ($user, $model) {
            return auth_can(['package-delete']) && $user->id == $model->user_id || auth_can(['package-super']);  
        });

        /* Message */
        Gate::define('message-view', function () {
            return auth_can(['message-view']); 
        });
        Gate::define('message-create', function () {
            return auth_can(['message-create']); 
        });
        Gate::define('message-edit', function ($user, $model) {
            return auth_can(['message-edit']) && $user->id == $model->user_id || auth_can(['message-super']);  
        });
        Gate::define('message-delete', function ($user, $model) {
            return auth_can(['message-delete']) && $user->id == $model->user_id || auth_can(['message-super']);  
        });
        
        /* Referral */
        Gate::define('referral-view', function () {
            return auth_can(['referral-view']); 
        });
        Gate::define('referral-create', function () {
            return auth_can(['referral-create']); 
        });
        Gate::define('referral-edit', function ($user, $model) {
            return auth_can(['referral-edit']) && $user->id == $model->user_id || auth_can(['referral-super']);  
        });
        Gate::define('referral-delete', function ($user, $model) {
            return auth_can(['referral-delete']) && $user->id == $model->user_id || auth_can(['referral-super']);  
        });
         
        /* Card */
        Gate::define('card-view', function () {
            return auth_can(['card-view']); 
        });
        Gate::define('card-create', function () {
            return auth_can(['card-create']); 
        });
        Gate::define('card-edit', function ($user, $model) {
            return auth_can(['card-edit']) && $user->id == $model->user_id || auth_can(['card-super']);  
        });
        Gate::define('card-delete', function ($user, $model) {
            return auth_can(['card-delete']) && $user->id == $model->user_id || auth_can(['card-super']);  
        });

        /* Commission */
        Gate::define('commission-view', function () {
            return auth_can(['commission-view']); 
        });
        Gate::define('commission-create', function () {
            return auth_can(['commission-create']); 
        });
        Gate::define('commission-edit', function ($user, $model) {
            return auth_can(['commission-edit']) && $user->id == $model->user_id || auth_can(['commission-super']);  
        });
        Gate::define('commission-delete', function ($user, $model) {
            return auth_can(['commission-delete']) && $user->id == $model->user_id || auth_can(['commission-super']);  
        });

        /* Commission Custom User */
        Gate::define('commission-custom-user-view', function () {
            return auth_can(['commission-custom-user-view']); 
        });
        Gate::define('commission-custom-user-create', function () {
            return auth_can(['commission-custom-user-create']); 
        });
        Gate::define('commission-custom-user-edit', function ($user) {
            return auth_can(['commission-custom-user-edit']) || auth_can(['commission-custom-user-super']);  
        });
        Gate::define('commission-custom-user-delete', function ($user) {
            return auth_can(['commission-custom-user-delete']) || auth_can(['commission-custom-user-super']);  
        });

        /* Help */
        Gate::define('help-view', function () {
            return auth_can(['help-view']); 
        });
        Gate::define('help-create', function () {
            return auth_can(['help-create']); 
        });
        Gate::define('help-edit', function ($user, $model) {
            return auth_can(['help-edit']) && $user->id == $model->user_id || auth_can(['help-super']);  
        });
        Gate::define('help-delete', function ($user, $model) {
            return auth_can(['help-delete']) && $user->id == $model->user_id || auth_can(['help-super']);  
        });

        /* Doc */
        Gate::define('doc-view', function () {
            return auth_can(['doc-view']); 
        });
        Gate::define('doc-create', function () {
            return auth_can(['doc-create']); 
        });
        Gate::define('doc-edit', function ($user, $model) {
            return auth_can(['doc-edit']) && $user->id == $model->user_id || auth_can(['doc-super']);  
        });
        Gate::define('doc-delete', function ($user, $model) {
            return auth_can(['doc-delete']) && $user->id == $model->user_id || auth_can(['doc-super']);  
        });

        /* Notice */
        Gate::define('notice-view', function () {
            return auth_can(['notice-view']); 
        });
        Gate::define('notice-create', function () {
            return auth_can(['notice-create']); 
        });
        Gate::define('notice-edit', function ($user, $model) {
            return auth_can(['notice-edit']) && $user->id == $model->user_id || auth_can(['notice-super']);  
        });
        Gate::define('notice-delete', function ($user, $model) {
            return auth_can(['notice-delete']) && $user->id == $model->user_id || auth_can(['notice-super']);  
        });

        /* Geo Type */
        Gate::define('geo-type-view', function () {
            return auth_can(['geo-type-view']); 
        });
        Gate::define('geo-type-create', function () {
            return auth_can(['geo-type-create']); 
        });
        Gate::define('geo-type-edit', function ($user, $model) {
            return auth_can(['geo-type-edit']) && $user->id == $model->user_id || auth_can(['geo-type-super']);  
        });
        Gate::define('geo-type-delete', function ($user, $model) {
            return auth_can(['geo-type-delete']) && $user->id == $model->user_id || auth_can(['geo-type-super']);  
        });

        /* Geo Location */
        Gate::define('geo-location-view', function () {
            return auth_can(['geo-location-view']); 
        });
        Gate::define('geo-location-create', function () {
            return auth_can(['geo-location-create']); 
        });
        Gate::define('geo-location-edit', function ($user, $model) {
            return auth_can(['geo-location-edit']) && $user->id == $model->user_id || auth_can(['geo-location-super']);  
        });
        Gate::define('geo-location-delete', function ($user, $model) {
            return auth_can(['geo-location-delete']) && $user->id == $model->user_id || auth_can(['geo-location-super']);  
        });

        /* Setting */
        Gate::define('setting-view', function () {
            return auth_can(['setting-view']); 
        });
        Gate::define('setting-create', function () {
            return auth_can(['setting-create']); 
        });
        Gate::define('setting-edit', function ($user, $model) {
            return auth_can(['setting-edit']) && $user->id == $model->user_id || auth_can(['setting-super']);  
        });
        Gate::define('setting-delete', function ($user, $model) {
            return auth_can(['setting-delete']) && $user->id == $model->user_id || auth_can(['setting-super']);  
        });

        /* Setting Profile */
        Gate::define('setting-profile-view', function () {
            return auth_can(['setting-profile-view']); 
        }); 
        Gate::define('setting-profile-edit', function() {
            return auth_can(['setting-profile-edit']) || auth_can(['setting-profile-super']);  
        }); 

        /* Setting Security */
        Gate::define('setting-security-view', function () {
            return auth_can(['setting-security-view']); 
        }); 
        Gate::define('setting-security-edit', function() {
            return auth_can(['setting-security-edit']) || auth_can(['setting-security-super']);  
        }); 

        /* Setting Money Transfer */
        Gate::define('setting-money-transfer-view', function () {
            return auth_can(['setting-money-transfer-view']); 
        }); 
        Gate::define('setting-money-transfer-edit', function() {
            return auth_can(['setting-money-transfer-edit']) || auth_can(['setting-money-transfer-super']);  
        }); 

        /* Setting Commission */
        Gate::define('setting-commission-view', function () {
            return auth_can(['setting-commission-view']); 
        }); 
        Gate::define('setting-commission-edit', function() {
            return auth_can(['setting-commission-edit']) || auth_can(['setting-commission-super']);  
        }); 

        Gate::define('setting-commission-super', function() {
            return auth_can(['setting-commission-super']);  
        }); 
        
        /* Setting Appreance */
        Gate::define('setting-appreance-view', function () {
            return auth_can(['setting-appreance-view']); 
        }); 
        Gate::define('setting-appreance-edit', function() {
            return auth_can(['setting-appreance-edit']) || auth_can(['setting-appreance-super']);  
        }); 

        /* Modem */
        Gate::define('modem-view', function () {
            return auth_can(['modem-view']); 
        }); 
        Gate::define('modem-edit', function() {
            return auth_can(['modem-edit']) || auth_can(['modem-super']);  
        }); 

    }
}
