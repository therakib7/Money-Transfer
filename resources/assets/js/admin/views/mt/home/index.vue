<template>
    <div class="component">
        <div class="component-body">
            <div class="bg-color">
                <div class="user-panel d-block d-lg-none" @click="$root.acBalance()">
                    <div class="float-left image">
                        <img :src="$root.profile.image" class="img-circle" alt="Img">
                    </div>
                    <div class="info">
                        <p>
                            {{ $root.profile.name }} <br /> <i class="icon-money" aria-hidden="true"></i> 
                            <span id="user-balance">{{ $root.profile.balance }}</span>
                        </p> 
                    </div>
                </div><!-- /.user-panel -->
            </div><!--  /.bg-color -->

            <div class="common-menu">
                <div class="form-row">
                    <div class="col-6 col-sm-4 col-lg-3 mb-3">
                        <router-link :to="{ name: 'mobileRecharges', query: { page: 1, per_page: per_page } }">
                            <div class="c-content">
                                <i class="icon-mobile" aria-hidden="true"></i>  
                                <span>{{ $t("mr") }}</span>  
                            </div>
                        </router-link>
                    </div><!--  /.col-md-3 -->
                    <div class="col-6 col-sm-4 col-lg-3 mb-3" v-can="'mobile-banking-view'">
                        <router-link :to="{ name: 'mobileBankings', query: { page: 1, per_page: per_page } }">
                            <div class="c-content">
                                <i class="icon-bank" aria-hidden="true"></i>
                                <span>{{ $t("mb") }}</span>
                            </div>
                        </router-link>
                    </div><!--  /.col-md-3 -->                    
                    <div class="col-6 col-sm-4 col-lg-3 mb-3" v-can="'cashout-banking-view'">
                        <router-link :to="{ name: 'mtCashoutMB', query: { page: 1, per_page: per_page } }">
                            <div class="c-content">
                                <i class="icon-reply" aria-hidden="true"></i>
                                <span>{{ $t("co_mb") }}</span>
                            </div>
                        </router-link>
                    </div><!--  /.col-md-3 -->
                    <div class="col-6 col-sm-4 col-lg-3 mb-3" v-can="'utility-bill-view'">
                        <router-link :to="{ name: 'mtUbps', query: { page: 1, per_page: per_page } }">
                            <div class="c-content">
                                <i class="icon-lightbulb " aria-hidden="true"></i>
                                <span>{{ $t("ubp") }}</span>
                            </div>
                        </router-link>
                    </div><!--  /.col-md-3 -->
                    <div class="col-6 col-sm-4 col-lg-3 mb-3">
                        <router-link :to="{ name: 'ctContacts', query: { page: 1, per_page: per_page } }">
                            <div class="c-content">
                                <i class="icon-address-book" aria-hidden="true"></i>
                                <span>{{ $t("ct") }}</span>
                            </div>
                        </router-link>
                    </div><!--  /.col-md-3 -->
                    <div class="col-6 col-sm-4 col-lg-3 mb-3">
                        <router-link :to="{ name: 'acBalanceTransfer', query: { page: 1, per_page: per_page } }">
                            <div class="c-content">
                                <i class="icon-share" aria-hidden="true"></i>
                                <span>{{ $t("bt") }}</span>
                            </div>
                        </router-link>
                    </div><!--  /.col-md-3 -->
                    <div class="col-6 col-sm-4 col-lg-3 mb-3">
                        <router-link :to="{ name: 'msgInbox', query: { page: 1, per_page: per_page } }">
                            <div class="c-content">
                                <i class="icon-mail" aria-hidden="true"></i>
                                <span>{{ $t("msg") }}</span>
                            </div>
                        </router-link>
                    </div><!--  /.col-md-3 -->
                </div><!--  /.row -->
            </div><!-- /.common-menu -->
        </div><!--  /.component-body --> 
    </div><!--  /.component -->
</template> 

<script>  

export default { 
    data() { 
        return { 
            per_page: 10,   
        }
    },
    watch: { 
    }, 
    created() {    
        /* Per Page */
        if ( window.innerWidth <= 768) {
            this.per_page = 5;
        }
    },  
    mounted() {   
        this.$root.popupModal(); 
        this.$root.dropdownModal(); 
    },
    updated() {   
        this.$root.dropdownModal(); 
    },
    methods: { 
        
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: { 
                mr: 'Mobile Recharge', 
                mb: 'Mobile Banking',  
                co_mb: 'CashOut M Banking',  
                ubp: 'Utility Bill Pay',  
                ct: 'Contact',  
                bt: 'Balance Transfer',  
                msg: 'Messages',  
            },
            bn: { 
                mr: 'মোবাইল রিচার্জ', 
                mb: 'মোবাইল ব্যাংকিং',
                co_mb: 'ক্যাশআউট মোবাইল ব্যাংকিং', 
                ubp: 'প্রয়োজনীয় বিল প্রদান',   
                ct: 'ফোনবুক',  
                bt: 'ব্যালেন্স ট্রান্সফার', 
                msg: 'মেসেজ', 
            },  
        }
    },
} //export default
</script>

