<template>
    <div class="component">
        <!-- Sidebar  --> 
        <nav class="home sidebar light" :class="{ 'active left' : !$root.show_sidebar_left }">
            <div class="sidebar-header light">
                <h3>
                    <router-link class="brand-link" :to="{ name: 'home' }">
                        <img src="/default/imgs/logo.png" alt="" class="brand-image img-circle elevation-3" style="opacity: .8">
                        <span class="brand-text font-weight-light">Money Transfer</span>
                    </router-link> 
                </h3>
            </div>
            <div class="sidebar-scroll-content"> 
                <div class="dropdown" data-toggle="dropdown">
                    <ul class="dropdown-menu">
                        <!-- User image -->
                        <li class="user-header pelorous clearfix">
                            <img :src="$root.profile.image" class="user-image" alt="User Image">

                            <p class="clearfix">
                                {{ $root.profile.name }} <br />
                                <small>{{ $root.profile.role }} Account</small> <br />
                                <small>Member since {{ $root.profile.since }}</small>
                            </p>
                        </li><!-- /.user-header --> 
                        <!-- Menu Footer-->
                        <li class="user-footer clearfix">
                            <div class="float-left">
                                <router-link :to="{ name: 'mtSettingProfile' }" class="btn btn-default btn-flat bg-gray">
                                    {{ $t('profile') }}
                                </router-link>
                            </div>
                            <div class="float-right">
                                <a href="#" @click="$root.logout()" class="btn btn-default btn-flat bg-gray">{{ $t('sign_out') }}</a>
                            </div>
                        </li><!-- /.user-footer --> 
                    </ul><!-- /.dropdown-menu -->
                    
                    <div class="user-panel">
                        <div class="float-left image">
                            <img :src="$root.profile.image" class="img-circle user-img" alt="User Image">
                        </div>
                        <div class="info">
                            <p>  
                                <span class="user-name">{{ $root.profile.name }}</span> <br /> <i class="icon-money" aria-hidden="true"></i> 
                                <span id="user-balance">{{ $root.profile.balance }}</span>
                            </p> 
                        </div>
                    </div><!-- /.user-panel -->
                </div><!--  /.dropdown -->

                <ul class="sidebar-menu"> 
                    <template v-for="menu, key in menus">
                        <template v-if="!menu.submenu.length">
                            <li class="menu-item" v-if="checkPer(menu.per)">
                                <router-link :to="menu.url_to">
                                    <i :class="menu.icon" aria-hidden="true"></i> 
                                    <span>{{ ( menu.t_name ) ? $t(menu.name) : menu.name }}</span>
                                </router-link>
                            </li>
                        </template>
                        <template v-else>  
                            <li class="menu-item" v-if="checkPer(menu.per)">
                                <a href="#" :class="{ 'menu-active': menu.active }" @click.prevent="menu.active =! menu.active">
                                    <i :class="menu.icon" aria-hidden="true"></i>
                                    <span>{{ ( menu.t_name ) ? $t(menu.name) : menu.name }}</span>
                                    <i class="icon-angle-down right" :class="{ roted: menu.active }" aria-hidden="true"></i>
                                </a> 
                                <transition name="slide">
                                    <ul class="sub-menu" v-if="menu.active"> 
                                        <template v-for="submenu, subkey in menu.submenu"> 
                                            <li v-if="checkPer(submenu.per)">
                                                <router-link :to="submenu.url_to">
                                                    <i class="icon-circle-empty" aria-hidden="true"></i>
                                                    <span>{{ ( submenu.t_name ) ? $t(submenu.name) : submenu.name }}</span>
                                                </router-link>
                                            </li>
                                        </template>   
                                    </ul>
                                </transition>
                            </li> 
                        </template> 
                    </template> 
                </ul> <!-- /.sidebar-menu -->
            </div><!--  /.sidebar-scroll-content -->
        </nav><!-- /.sidebar-->  
    </div><!--  /.component -->
</template> 

<script>  

export default {  
    data() { 
        return {   
            per_page: 10, 
            menus: [], 
        } 
    },
    watch: { 
        '$route': function (route) {  
            var app = this;
            if ( window.innerWidth < 992 ) { 
                if ( app.$root.show_sidebar_left == false ) {
                    app.$root.show_sidebar_left = true;
                }
            }
        },  
    }, 
    created() {  
        /* Per Page */
        if ( window.innerWidth <= 768) {
            this.per_page = 5;
        }  
        
        /* Menu Items */
        this.menus = [
            {
                icon: 'icon-home',
                active: false,
                t_name: true, // translate_name
                name: 'home', // key_name
                url_to: { name: 'home' },
                per: [],
                submenu: []
            },
            {
                icon: 'icon-gauge',
                active: false,
                t_name: true,
                name: 'summary',
                url_to: { name: 'mtSummary' },
                per: [],
                submenu: []
            },
            {
                icon: 'icon-user',
                active: false,
                t_name: false,
                name: 'Users',
                url_to: null,
                per: ['user-view'],
                submenu: [
                    { 
                        active: false,
                        t_name: false,
                        name: 'Users',
                        url_to: { name: 'users', query: { page: 1, per_page: this.per_page } },
                        per: ['user-view'],
                    },
                    { 
                        active: false,
                        t_name: false,
                        name: 'Roles',
                        url_to: { name: 'roles', query: { page: 1, per_page: this.per_page } },
                        per: ['user-role-view'],
                    },
                    { 
                        active: false,
                        t_name: false,
                        name: 'Permissions',
                        url_to: { name: 'permissions', query: { page: 1, per_page: this.per_page } },
                        per: ['user-permission-view'],
                    },
                    { 
                        active: false,
                        t_name: false,
                        name: 'Change Histories', 
                        url_to: { name: 'userChangeHistories', query: { page: 1, per_page: this.per_page } },
                        per: ['user-permission-view'],
                    },
                ]
            },
            {
                icon: 'icon-database',
                active: false,
                t_name: false,
                name: 'Services',
                url_to: null,
                per: ['service-view'],
                submenu: [
                    { 
                        active: false,
                        t_name: false,
                        name: 'Services', 
                        url_to: { name: 'mtServices', query: { page: 1, per_page: this.per_page } },
                        per: ['service-view'],
                    },
                    { 
                        active: false,
                        t_name: false,
                        name: 'Providers', 
                        url_to: { name: 'mtProviders', query: { page: 1, per_page: this.per_page } },
                        per: ['service-view'],
                    }, 
                    { 
                        active: false,
                        t_name: false,
                        name: 'Provider Category', 
                        url_to: { name: 'mtTaxonomies',  params: { name: 'provider-category' }, query: { page: 1, per_page: this.per_page } },
                        per: ['service-view'],
                    }, 
                ]
            },
            {
                icon: 'icon-bank',
                active: false,
                t_name: false,
                name: 'Banking Accounts',
                url_to: null,
                per: ['banking-account-view'],
                submenu: [
                    { 
                        active: false,
                        t_name: false,
                        name: 'Banking Accounts', 
                        url_to: { name: 'mtBankingAccounts', query: { page: 1, per_page: this.per_page } },
                        per: ['banking-account-view'],
                    },
                    { 
                        active: false,
                        t_name: false,
                        name: 'Banking Providers', 
                        url_to: { name: 'mtBankingProviders', query: { page: 1, per_page: this.per_page } },
                        per: ['banking-account-view'],
                    },  
                ]
            },
            {
                icon: 'icon-tasks',
                active: false,
                t_name: false,
                name: 'Sims',
                url_to: null,
                per: ['sim-view'],
                submenu: [
                    { 
                        active: false,
                        t_name: false,
                        name: 'Sim Balances', 
                        url_to: { name: 'mtSimBalances', query: { page: 1, per_page: this.per_page } },
                        per: ['sim-view'],
                    },
                    { 
                        active: false,
                        t_name: false,
                        name: 'Sims', 
                        url_to: { name: 'mtSims', query: { page: 1, per_page: this.per_page } },
                        per: ['sim-view'],
                    }, 
                    { 
                        active: false,
                        t_name: false,
                        name: 'Sim Balance Histories', 
                        url_to: { name: 'mtSimBalanceHistories', query: { page: 1, per_page: this.per_page } },
                        per: ['sim-view'],
                    }, 
                    { 
                        active: false,
                        t_name: false,
                        name: 'Sim Live Balance', 
                        url_to: { name: 'mtSimLiveBalances', query: { page: 1, per_page: this.per_page } },
                        per: ['sim-view'],
                    }, 
                ]
            },
            {
                icon: 'icon-money',
                active: false,
                t_name: true,
                name: 'money_transfer',
                url_to: null,
                per: ['mobile-recharge-view'],
                submenu: [
                    { 
                        active: false,
                        t_name: true,
                        name: 'mob_re', 
                        url_to: { name: 'mobileRecharges', query: { page: 1, per_page: this.per_page } },
                        per: ['mobile-recharge-view'],
                    },
                    { 
                        active: false,
                        t_name: true,
                        name: 'mobile_banking', 
                        url_to: { name: 'mobileBankings', query: { page: 1, per_page: this.per_page } },
                        per: ['mobile-banking-view'],
                    }, 
                    { 
                        active: false,
                        t_name: true,
                        name: 'cashout_mobile_banking', 
                        url_to: { name: 'mtCashoutMB', query: { page: 1, per_page: this.per_page } },
                        per: ['cashout-banking-view'],
                    }, 
                    { 
                        active: false,
                        t_name: true,
                        name: 'due_amount', 
                        url_to: { name: 'mtMtDues', query: { page: 1, per_page: this.per_page } },
                        per: ['due-amount-view'],
                    }, 
                    { 
                        active: false,
                        t_name: true,
                        name: 'contacts', 
                        url_to: { name: 'ctContacts', query: { page: 1, per_page: this.per_page } },
                        per: ['due-amount-view'],
                    },
                    { 
                        active: false,
                        t_name: true,
                        name: 'contacts_category', 
                        url_to: { name: 'ctTaxonomies', params: { name: 'contact-category' }, query: { page: 1, per_page: this.per_page } },
                        per: ['due-amount-view'],
                    }, 
                ]
            },
            {
                icon: 'icon-money',
                active: false,
                t_name: true,
                name: 'u_bill_pay',
                url_to: null,
                per: ['utility-bill-view'],
                submenu: [
                    { 
                        active: false,
                        t_name: true,
                        name: 'bill_pay', 
                        url_to: { name: 'mtUbps', query: { page: 1, per_page: this.per_page } },
                        per: ['utility-bill-view'],
                    }, 
                    { 
                        active: false,
                        t_name: true,
                        name: 'due_amount', 
                        url_to: { name: 'mtUtilityDues', query: { page: 1, per_page: this.per_page } },
                        per: ['due-amount-view'],
                    }, 
                    { 
                        active: false,
                        t_name: true,
                        name: 'contacts', 
                        url_to: { name: 'ctUbps', query: { page: 1, per_page: this.per_page } },
                        per: ['utility-contact-view'],
                    },
                    { 
                        active: false,
                        t_name: true,
                        name: 'contacts_category', 
                        url_to: { name: 'ctTaxonomies', params: { name: 'utility-contact-category' }, query: { page: 1, per_page: this.per_page } },
                        per: ['utility-contact-taxonomy-view'],
                    }, 
                ]
            },
            {
                icon: 'icon-share',
                active: false,
                t_name: true,
                name: 'balance_transfer', 
                url_to: { name: 'acBalanceTransfer', query: { page: 1, per_page: this.per_page } },
                per: ['balance-transfer-view'],
                submenu: []
            },
            {
                icon: 'icon-share',
                active: false,
                t_name: false,
                name: 'Balance Transfer Super', 
                url_to: { name: 'acBalanceTransfer', query: { type: 1, page: 1, per_page: this.per_page } },
                per: ['balance-transfer-super'],
                submenu: []
            },
            {
                icon: 'icon-bank',
                active: false,
                t_name: true,
                name: 't_r', 
                url_to: { name: 'mtTransferRequests', query: { page: 1, per_page: this.per_page } },
                per: ['transfer-request-view'],
                submenu: []
            }, 
            {
                icon: 'icon-mail',
                active: false,
                t_name: true,
                name: 'messages', 
                url_to: { name: 'msgInbox', query: { page: 1, per_page: this.per_page } },
                per: ['message-view'],
                submenu: []
            },
            {
                icon: 'icon-percent',
                active: false,
                t_name: true,
                name: 'r_comm', 
                url_to: { name: 'mtReferralCommissions', query: { page: 1, per_page: this.per_page } },
                per: ['referral-view'],
                submenu: []
            },
            {
                icon: 'icon-shopping-bag',
                active: false,
                t_name: false,
                name: 'Packages',
                url_to: null,
                per: ['package-view'],
                submenu: [
                    { 
                        active: false,
                        t_name: false,
                        name: 'Internet', 
                        url_to: { name: 'mtPackData', params: { type: 'net' }, query: { page: 1, per_page: this.per_page } },
                        per: ['package-view'],
                    }, 
                    { 
                        active: false,
                        t_name: false,
                        name: 'Minute', 
                        url_to: { name: 'mtPackData', params: { type: 'min' }, query: { page: 1, per_page: this.per_page } },
                        per: ['package-view'],
                    },
                    { 
                        active: false,
                        t_name: false,
                        name: 'SMS', 
                        url_to: { name: 'mtPackData', params: { type: 'sms' }, query: { page: 1, per_page: this.per_page } },
                        per: ['package-view'],
                    }, 
                    { 
                        active: false,
                        t_name: false,
                        name: 'Bundle', 
                        url_to: { name: 'mtPackData', params: { type: 'bundle' }, query: { page: 1, per_page: this.per_page } },
                        per: ['package-view'],
                    },
                    { 
                        active: false,
                        t_name: false,
                        name: 'Sim', 
                        url_to: { name: 'mtPackData', params: { type: 'sim' }, query: { page: 1, per_page: this.per_page } },
                        per: ['package-view'],
                    },
                ]
            },
            {
                icon: 'icon-percent',
                active: false,
                t_name: false,
                name: 'Com Custom Users', 
                url_to: { name: 'mtCommissionCustomUsers', query: { page: 1, per_page: this.per_page } },
                per: ['commission-custom-user-view'],
                submenu: []
            },
            {
                icon: 'icon-doc',
                active: false,
                t_name: false,
                name: 'Helps',
                url_to: null,
                per: ['help-view'],
                submenu: [
                    { 
                        active: false,
                        t_name: false,
                        name: 'Helps', 
                        url_to: { name: 'mtHelps', query: { page: 1, per_page: this.per_page } },
                        per: ['help-view'],
                    }, 
                    { 
                        active: false,
                        t_name: false,
                        name: 'Help Category', 
                        url_to: { name: 'mtHelpCats', params: { name: 'help-category' }, query: { page: 1, per_page: this.per_page } },
                        per: ['help-view'],
                    }, 
                ]
            },
            {
                icon: 'icon-money',
                active: false,
                t_name: false,
                name: 'Transection Limits',
                url_to: null,
                per: ['geo-location-view'],
                submenu: [
                    { 
                        active: false,
                        t_name: false,
                        name: 'Role Limits', 
                        url_to: { name: 'mtLimits', params: { name: 'role' }, query: { page: 1, per_page: this.per_page } },
                        per: ['geo-location-view'],
                    },  
                    { 
                        active: false,
                        t_name: false,
                        name: 'User Limits', 
                        url_to: { name: 'mtLimits', params: { name: 'user' }, query: { page: 1, per_page: this.per_page } },
                        per: ['geo-location-view'],
                    },  
                ]
            },
            {
                icon: 'icon-doc',
                active: false,
                t_name: false,
                name: 'Documents',
                url_to: null,
                per: ['doc-view'],
                submenu: [
                    { 
                        active: false,
                        t_name: false,
                        name: 'Documents', 
                        url_to: { name: 'mtDocuments', query: { page: 1, per_page: this.per_page } },
                        per: ['doc-view'],
                    }, 
                    { 
                        active: false,
                        t_name: false,
                        name: 'Doc Category', 
                        url_to: { name: 'mtDocumentCats', params: { name: 'doc-category' }, query: { page: 1, per_page: this.per_page } },
                        per: ['doc-view'],
                    }, 
                ]
            },
            {
                icon: 'icon-doc',
                active: false,
                t_name: false,
                name: 'Notice Board', 
                url_to: { name: 'nbNotices', query: { page: 1, per_page: this.per_page } },
                per: ['notice-view'],
                submenu: []
            }, 
            {
                icon: 'icon-globe',
                active: false,
                t_name: false,
                name: 'Geo Locations',
                url_to: null,
                per: ['geo-location-view'],
                submenu: [
                    { 
                        active: false,
                        t_name: false,
                        name: 'Geo Locations', 
                        url_to: { name: 'geoLocations', query: { page: 1, per_page: this.per_page } },
                        per: ['geo-location-view'],
                    }, 
                    { 
                        active: false,
                        t_name: false,
                        name: 'Geo Country Stages', 
                        url_to: { name: 'geoCountryStages', query: { page: 1, per_page: this.per_page } },
                        per: ['geo-location-view'],
                    }, 
                ]
            },
            {
                icon: 'icon-mail',
                active: false,
                t_name: false,
                name: 'Marketing',
                url_to: null,
                per: ['super-admin'],
                submenu: [
                    { 
                        active: false,
                        t_name: false,
                        name: 'Provider Numbers', 
                        url_to: { name: 'mkProviderNumbers', query: { page: 1, per_page: this.per_page } },
                        per: ['super-admin'],
                    }, 
                    { 
                        active: false,
                        t_name: false,
                        name: 'Generated Numbers', 
                        url_to: { name: 'mkGeneratedNumbers', query: { page: 1, per_page: this.per_page } },
                        per: ['super-admin'],
                    }, 
                    { 
                        active: false,
                        t_name: false,
                        name: 'Providers', 
                        url_to: { name: 'mkProviders', query: { page: 1, per_page: this.per_page } },
                        per: ['super-admin'],
                    }, 
                ]
            },
            {
                icon: 'icon-cogs',
                active: false,
                t_name: true,
                name: 'settings', 
                url_to: { name: 'mtSettingProfile' },
                per: [],
                submenu: []
            },
        ];  

        var app = this;
        if ( window.innerWidth < 992 ) { 
            window.addEventListener('mouseup', function(e){   
                if ( document.querySelector('.sidebar') && !document.querySelector('.sidebar').contains(e.target) ) { 
                    if ( app.$root.show_sidebar_left == false ) {
                        app.$root.show_sidebar_left = true;
                    }
                }  
            });
        }         
    },  
    mounted() {   
        this.$root.popupModal(); 
    },
    updated() {   
        this.$root.dropdownModal(); 
    },
    methods: { 
        checkPer( per ) {
            if ( !per.length ) {
                return true;
            } else {
                var per_lists = this.$root.user_permissions;
                let checker = (arr, target) => target.every(v => arr.includes(v));
                return checker(per_lists, per);
            } 
        }, 
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: { 
                home: 'Home', 
                summary: 'Summary', 
                money_transfer: 'Money Transfer', 
                    mob_re: 'Mobile Recharge', 
                    mobile_banking: 'Mobile Banking', 
                    cashout_mobile_banking: 'Cash Out Mobile Banking', 
                    due_amount: 'Due Amount', 
                    contacts: 'Contacts', 
                    contacts_category: 'Contacts Category', 
                mobile_banking: 'Mobile Banking',  
                u_bill_pay: 'Utility Bill Pay',  
                    bill_pay: 'Bill Pay',  
                balance_transfer: 'Balance Transfer',  
                t_r: 'Transfer Requests',  
                messages: 'Messages',  
                r_comm: 'Referral Commissions', 
                settings: 'Settings', 
                profile: 'Profile', 
                sign_out: 'Sign out', 
            },
            bn: { 
                home: 'বাড়ি', 
                summary: 'সারাংশ', 
                money_transfer: 'টাকা ট্রান্সফার', 
                    mob_re: 'মোবাইল রিচার্জ', 
                    mobile_banking: 'মোবাইল ব্যাংকিং', 
                    cashout_mobile_banking: 'ক্যাশ আউট মোবাঃ ব্যাংকিং', 
                    due_amount: 'বাকি টাকা',
                    contacts: 'ফোনবুক',
                    contacts_category: 'ফোনবুক শ্রেনী', 
                mobile_banking: 'মোবাইল ব্যাংকিং',  
                u_bill_pay: 'প্রয়োজনীয় বিল প্রদান',  
                    bill_pay: 'বিল প্রদান',
                balance_transfer: 'ব্যালেন্স ট্রান্সফার',  
                t_r: 'ট্রান্সফার অনুরোধ',  
                messages: 'মেসেজ',  
                r_comm: 'রেফারেল কমিশন', 
                settings: 'সেটিং', 
                profile: 'প্রোফাইল', 
                sign_out: 'বাহির হন', 
            },  
        }
    },
} //export default
</script>

<style lang="scss" scoped>

    .slide-enter-active {
       -moz-transition-duration: 0.3s;
       -webkit-transition-duration: 0.3s;
       -o-transition-duration: 0.3s;
       transition-duration: 0.3s;
       -moz-transition-timing-function: ease-in;
       -webkit-transition-timing-function: ease-in;
       -o-transition-timing-function: ease-in;
       transition-timing-function: ease-in;
    }

    .slide-leave-active {
       -moz-transition-duration: 0.3s;
       -webkit-transition-duration: 0.3s;
       -o-transition-duration: 0.3s;
       transition-duration: 0.3s;
       -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
       -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
       -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
       transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }

    .slide-enter-to, .slide-leave {
       max-height: 100px;
       overflow: hidden;
    }

    .slide-enter, .slide-leave-to {
       overflow: hidden;
       max-height: 0;
    }
</style>