import Vue from 'vue'
import Router from 'vue-router' 

Vue.use(Router)   

export default new Router({
    mode: 'history',
    routes: [ 
        //{ path: '/admin/home', meta:{ title: 'Home' }, name: 'home', component: () => import(/* webpackChunkName: "home-recharge" */ './views/mt/home/index.vue') },  
        { path: '/admin/home', meta:{ title: 'Home' }, name: 'home', component: () => import( './views/mt/home/index.vue') },  
        { path: '/admin/mt/summary', meta:{ title: 'Summary' }, name: 'mtSummary', component: () => import('./views/mt/summary/index.vue') },  
        { path: '/admin/users', meta:{ title: 'Users' }, name: 'users', component: () => import('./views/users/index.vue') }, 
        { path: '/admin/user-change-histories', meta:{ title: 'Users' }, name: 'userChangeHistories', component: () => import('./views/user-change-histories/index.vue') }, 
        { path: '/admin/roles', meta:{ title: 'Roles' }, name: 'roles', component: () => import('./views/roles/index.vue') }, 
        { path: '/admin/permissions', meta:{ title: 'Permissions' }, name: 'permissions', component: () => import('./views/permissions/index.vue') },  
        { path: '/admin/media', meta:{ title: 'Media' }, name: 'media', component: () => import('./views/media/index.vue') },  
        //{ path: '/admin/geolocations/:name', name: 'geolocations', component: () => import('./views/geolocations/index.vue') }, 
        { path: '/admin/404', meta:{ title: 'None' }, name: 'none', component: () => import('./views/404/index.vue') },  
        //{ path: '*', redirect: '/admin/404' },  
        // if I on 404 route path in login page credentials error not showing

        /* Account Route */
        { path: '/admin/ac/balance-transfer', meta:{ title: 'Balance Transfer' }, name: 'acBalanceTransfer', component: () => import('./views/ac/balance-transfer/index.vue') },

        /* Message Route */
        { path: '/admin/msg/inbox', meta:{ title: 'Messages' }, name: 'msgInbox', component: () => import('./views/msg/inbox/index.vue') },

        /* MT Route */  
        { path: '/admin/mt/services', meta:{ title: 'Services' }, name: 'mtServices', component: () => import('./views/mt/services/index.vue') },
        { path: '/admin/mt/providers', meta:{ title: 'Providers' }, name: 'mtProviders', component: () => import('./views/mt/providers/index.vue') }, 
        { path: '/admin/mt/sims', meta:{ title: 'Sims' }, name: 'mtSims', component: () => import('./views/mt/sims/index.vue') },
        { path: '/admin/mt/sim-balances', meta:{ title: 'Sim Balances' }, name: 'mtSimBalances', component: () => import('./views/mt/sim-balances/index.vue') },
        { path: '/admin/mt/sim-balance-histories', meta:{ title: 'Sim Bal history' }, name: 'mtSimBalanceHistories', component: () => import('./views/mt/sim-balance-histories/index.vue') },
        { path: '/admin/mt/sim-live-balances', meta:{ title: 'Sim Live Balance' }, name: 'mtSimLiveBalances', component: () => import('./views/mt/sim-live-balances/index.vue') },
 
        { path: '/admin/mt/pack/:type', meta:{ title: 'Package' }, name: 'mtPackData', component: () => import('./views/mt/pack/index.vue') },  

        { path: '/admin/mt/cards', meta:{ title: 'Cards' }, name: 'mtCards', component: () => import('./views/mt/cards/index.vue') },
        { path: '/admin/mt/mobile-recharges', meta:{ title: 'Mobile Recharges' }, name: 'mobileRecharges', component: () => import( './views/mt/mobile-recharges/index.vue') }, 
        { path: '/admin/mt/mobile-bankings', meta:{ title: 'Mobile Bankings' }, name: 'mobileBankings', component: () => import('./views/mt/mobile-bankings/index.vue') }, 
        { path: '/admin/mt/mt-dues', meta:{ title: 'Money Transfer Dues' }, name: 'mtMtDues', component: () => import('./views/mt/mt-dues/index.vue') },
        { path: '/admin/mt/ubp-dues', meta:{ title: 'Utility Bill Dues' }, name: 'mtUtilityDues', component: () => import('./views/mt/ubp-dues/index.vue') },
        { path: '/admin/mt/referral-commissions', meta:{ title: 'Referral Commissions' }, name: 'mtReferralCommissions', component: () => import('./views/mt/referral-commissions/index.vue') },
        { path: '/admin/mt/cashout-mbs', meta:{ title: 'CashOut MB' }, name: 'mtCashoutMB', component: () => import('./views/mt/cashout-mbs/index.vue') },
        { path: '/admin/mt/ubps', meta:{ title: 'Utility' }, name: 'mtUbps', component: () => import('./views/mt/ubps/index.vue') },
        { path: '/admin/mt/commission-custom-users', meta:{ title: 'Commission Custom User' }, name: 'mtCommissionCustomUsers', component: () => import('./views/mt/commission-custom-users/index.vue') }, 
        { path: '/admin/mt/limits/:name', meta:{ title: 'Limits' }, name: 'mtLimits', component: () => import('./views/mt/transection-limit/limits/index.vue') },  
        { path: '/admin/mt/helps', meta:{ title: 'Helps' }, name: 'mtHelps', component: () => import('./views/mt/help/helps/index.vue') }, 
        { path: '/admin/mt/help-cats', meta:{ title: 'Help Cats' }, name: 'mtHelpCats', component: () => import('./views/mt/help/help-cats/index.vue') },

        { path: '/admin/mt/taxonomies/:name', meta:{ title: 'Service Category' }, name: 'mtTaxonomies', component: () => import('./views/mt/taxonomies/index.vue') },

        { path: '/admin/mt/banking-accounts', meta:{ title: 'Banking Accounts' }, name: 'mtBankingAccounts', component: () => import('./views/mt/banking-accounts/index.vue') },
        { path: '/admin/mt/banking-providers', meta:{ title: 'Banking Providers' }, name: 'mtBankingProviders', component: () => import('./views/mt/banking-providers/index.vue') },
        { path: '/admin/mt/transfer-requests', meta:{ title: 'Transfer Request' }, name: 'mtTransferRequests', component: () => import('./views/mt/transfer-requests/index.vue') },

        /* MT Help Route */
        { path: '/admin/mt/help', meta:{ title: 'Helper Guide' }, name: 'mtUserHelps', component: () => import('./views/helps/mt/index.vue'), }, 

        /* Contact Route */  
        { path: '/admin/ct/contacts', meta:{ title: 'Contacts' }, name: 'ctContacts', component: () => import('./views/ct/contacts/index.vue') }, 
        { path: '/admin/ct/ubps', meta:{ title: 'Utility Bill Contact' }, name: 'ctUbps', component: () => import('./views/ct/ubps/index.vue') }, 
        { path: '/admin/ct/taxonomies/:name', meta:{ title: 'Contact Category' }, name: 'ctTaxonomies', component: () => import('./views/ct/taxonomies/index.vue') },  

        /* Doc Route */   
        { path: '/admin/doc/documents', meta:{ title: 'Documents' }, name: 'mtDocuments', component: () => import('./views/doc/docs/index.vue') }, 
        { path: '/admin/doc/document-cats', meta:{ title: 'Document Cats' }, name: 'mtDocumentCats', component: () => import('./views/doc/doc-cats/index.vue') }, 

        /* Doc Route */   
        { path: '/admin/nb/notices', name: 'nbNotices', component: () => import('./views/nb/notices/index.vue') }, 
        { path: '/admin/nb/notice-board', name: 'nbNoticeBoard', component: () => import('./views/nb/notice-board/index.vue') }, 

        /* Geo/Location Route */
        { path: '/admin/geo/country-stages', name: 'geoCountryStages', component: () => import('./views/geo/country-stages/index.vue') }, 
        { path: '/admin/geo/locations', name: 'geoLocations', component: () => import('./views/geo/locations/index.vue') }, 

        /* MK Route */
        { path: '/admin/mk/providers', meta:{ title: 'Providers' }, name: 'mkProviders', component: () => import('./views/mk/providers/index.vue') }, 
        { path: '/admin/mk/generated-numbers', meta:{ title: 'Generated Numbers' }, name: 'mkGeneratedNumbers', component: () => import('./views/mk/generated-numbers/index.vue') }, 
        { path: '/admin/mk/provider-numbers', meta:{ title: 'Provider Numbers' }, name: 'mkProviderNumbers', component: () => import('./views/mk/provider-numbers/index.vue') }, 

        /* MT Setting Route */
        { path: '/admin/mt/setting', meta:{ title: 'Setting' }, name: 'mtSettings', component: () => import('./views/setting/mt/index.vue'), 
            children: [
                { 
                    path: 'profile',
                    meta:{ title: 'Setting profile' },
                    name: 'mtSettingProfile', 
                    component: () => import('./views/setting/mt/profile/index.vue')
                },
                { 
                    path: 'security',
                    meta:{ title: 'Setting Security' },
                    name: 'mtSettingSecurity', 
                    component: () => import('./views/setting/mt/security/index.vue')
                }, 
                { 
                    path: 'mobile-recharge',
                    meta:{ title: 'Setting Mobile Recharge' },
                    name: 'mtSettingMobileRecharge', 
                    component: () => import('./views/setting/mt/mobile-recharge/index.vue')
                }, 
                { 
                    path: 'mobile-banking',
                    meta:{ title: 'Setting Mobile Banking' },
                    name: 'mtSettingMobileBanking', 
                    component: () => import('./views/setting/mt/mobile-banking/index.vue')
                }, 
                { 
                    path: 'ubps',
                    meta:{ title: 'Setting Utility' },
                    name: 'mtSettingUbps', 
                    component: () => import('./views/setting/mt/ubps/index.vue')
                },
                { 
                    path: 'admin-setting',
                    meta:{ title: 'Setting Admin' },
                    name: 'mtSettingAdmin',
                    component: () => import('./views/setting/mt/admin-setting/index.vue')
                },                
                { 
                    path: 'appreances',
                    meta:{ title: 'Setting Appreances' },
                    name: 'mtSettingAppreances', 
                    component: () => import('./views/setting/mt/appreances/index.vue')
                },
            ]
        }, 

    ],
});
 