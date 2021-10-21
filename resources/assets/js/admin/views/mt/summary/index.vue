<template>
    <div class="component">
        <div class="component-body">
            <div class="row">
                <div class="col-9">
                    <div class="content-heading">
                        <h2 class="heading">
                           {{ $t('db_summary') }}
                           <small>{{ month_text() }}</small>
                        </h2>
                    </div><!--  /.content-heading -->
                </div><!--  /.col-9 -->
                <div class="col-3"> 
                    <button type="button" class="btn btn-sm btn-info float-right mt-4" data-toggle="modal" data-target="#dataSearch">
                        <i class="icon-search"></i> <span class="d-none d-sm-inline">{{ $t('search') }}</span>
                    </button>
                </div><!--  /.col-3 -->
            </div><!--  /.row -->
            
            <!-- Modal Search -->
            <div class="modal right fade" id="dataSearch">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ $t('search') }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="dataSearch()">
                            <div class="modal-body">  
                                <div class="form-row">  
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="board_item_search.date_from" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_from') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="board_item_search.date_to" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->   

                                    <div class="col-12 mb-3"> 
                                        <button class="btn btn-primary btn-sm" type="submit">{{ $t('search') }}</button>
                                        <button class="btn btn-dark float-right btn-sm" type="reset">{{ $t('reset') }}</button>
                                    </div><!--  /.col-12 mb-3 --> 
            
                                </div><!--  /.form-row -->  
                            </div><!--  /.modal-body --> 
                        </form>
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal search -->

            <div class="form-row">  
                <div class="col-md-6 col-lg-3">
                    <!-- small box -->
                    <div class="small-box bg-success">
                        <div class="inner"> 
                            <h3>{{board_item.balance}}</h3>
                            <p>{{ $t("curent_balance") }}</p>
                        </div>
                        <div class="icon">
                            <i class="icon-money"></i>
                        </div>
                        <router-link class="small-box-footer" :to="{ name: 'acBalanceTransfer', query: { page: 1, per_page: 10 } }">
                            {{ $t("more_info") }}<i class="icon-right-circled"></i>
                        </router-link>
                    </div>
                </div>

                <div class="col-md-6 col-lg-3" v-if="$root.can('referral-view')">
                    <!-- small box -->
                    <div class="small-box bg-success">
                        <div class="inner">
                            <h3>{{board_item.ref_com}}</h3>
                            <p>{{ $t("t_ref_coms") }}</p>
                        </div>
                        <div class="icon">
                            <i class="icon-percent"></i>
                        </div>
                        <router-link class="small-box-footer" :to="{ name: 'mtReferralCommissions', query: { page: 1, per_page: 10 } }">
                            {{ $t("more_info") }}<i class="icon-right-circled"></i>
                        </router-link>
                    </div>
                </div><!-- / .col-md-3 -->  
                
            </div><!--  /.row --> 

            <div class="row">
                <div class="col-12">
                    <div class="content-heading">
                        <h2 class="heading">
                           {{ $t("mr") }}
                        </h2>
                    </div><!--  /.content-heading -->
                </div><!--  /.col-12 --> 
            </div><!--  /.row -->
            
            <div class="form-row">  
                <div class="col-md-6 col-lg-3">
                    <!-- small box -->
                    <div class="small-box bg-info">
                        <div class="inner">
                            <h3>{{board_item.mr}}</h3>
                            <p>{{ $t("t_mr") }}</p>
                        </div>
                        <div class="icon">
                            <i class="icon-share"></i>
                        </div>
                        <router-link class="small-box-footer" :to="{ name: 'mobileRecharges', query: { page: 1, per_page: 10 } }">
                            {{ $t("more_info") }}<i class="icon-right-circled"></i>
                        </router-link>
                    </div>
                </div>  

                <div class="col-md-6 col-lg-3" v-if="$root.can({ name: 'personal', if: false })">
                    <!-- small box -->
                    <div class="small-box bg-success">
                        <div class="inner">
                            <h3>{{board_item.mr_com}}</h3>
                            <p>{{ $t("t_mr_com") }}</p>
                        </div>
                        <div class="icon">
                            <i class="icon-percent"></i>
                        </div>
                        <router-link class="small-box-footer" :to="{ name: 'mobileRecharges', query: { page: 1, per_page: 10 } }">
                            {{ $t("more_info") }}<i class="icon-right-circled"></i>
                        </router-link>
                    </div>
                </div> 
                
                <div class="col-md-6 col-lg-3" v-if="$root.can('due-amount-view')">
                    <!-- small box -->
                    <div class="small-box amber">
                        <div class="inner">
                            <h3>{{board_item.mb_due}}</h3>
                            <p>{{ $t("t_mb_due") }}</p>
                        </div>
                        <div class="icon">
                            <i class="icon-adjust"></i>
                        </div>
                        <router-link class="small-box-footer" :to="{ name: 'mtMtDues', query: { page: 1, per_page: 10 } }">
                            {{ $t("more_info") }}<i class="icon-right-circled"></i>
                        </router-link>
                    </div>
                </div><!-- / .col-md-3 -->  
            </div><!--  /.row --> 

            <div class="row" v-if="$root.can('mobile-banking-view')">
                <div class="col-12">
                    <div class="content-heading">
                        <h2 class="heading">
                            {{ $t("mb") }}
                        </h2>
                    </div><!--  /.content-heading -->
                </div><!--  /.col-12 --> 
            </div><!--  /.row -->
            
            <div class="form-row" v-if="$root.can('mobile-banking-view')">  
                <div class="col-md-6 col-lg-3">
                    <!-- small box -->
                    <div class="small-box bg-info">
                        <div class="inner">
                            <h3>{{board_item.mb}}</h3>
                            <p>{{ $t("t_mb") }}</p>
                        </div>
                        <div class="icon">
                            <i class="icon-share"></i>
                        </div>
                        <router-link class="small-box-footer" :to="{ name: 'mobileBankings', query: { page: 1, per_page: 10 } }">
                            {{ $t("more_info") }}<i class="icon-right-circled"></i>
                        </router-link>
                    </div>
                </div>  

                <div class="col-md-6 col-lg-3" v-if="$root.can({ name: 'personal', if: false })">
                    <!-- small box -->
                    <div class="small-box bg-success">
                        <div class="inner">
                            <h3>{{board_item.mb_com}}</h3>
                            <p>{{ $t("t_mb_com") }}</p>
                        </div>
                        <div class="icon">
                            <i class="icon-percent"></i>
                        </div>
                        <router-link class="small-box-footer" :to="{ name: 'mobileBankings', query: { page: 1, per_page: 10 } }">
                            {{ $t("more_info") }}<i class="icon-right-circled"></i>
                        </router-link>
                    </div>
                </div> 

                <div class="col-md-6 col-lg-3" v-if="$root.can('cashout-banking-view')">
                    <!-- small box -->
                    <div class="small-box bg-info">
                        <div class="inner">
                            <h3>{{board_item.co_mb}}</h3>
                            <p>{{ $t("t_co_mb") }}</p>
                        </div>
                        <div class="icon">
                            <i class="icon-reply"></i>
                        </div>
                        <router-link class="small-box-footer" :to="{ name: 'mtCashoutMB', query: { page: 1, per_page: 10 } }">
                            {{ $t("more_info") }}<i class="icon-right-circled"></i>
                        </router-link>
                    </div>
                </div>
                 
            </div><!--  /.row --> 

            <div class="row" v-can="'utility-bill-view'">
                <div class="col-12">
                    <div class="content-heading">
                        <h2 class="heading">
                            {{ $t("ubp") }}
                        </h2>
                    </div><!--  /.content-heading -->
                </div><!--  /.col-12 --> 
            </div><!--  /.row -->

            <div class="form-row" v-can="'utility-bill-view'">  
                <div class="col-md-6 col-lg-3" v-if="$root.can('utility-bill-view')">
                    <!-- small box -->
                    <div class="small-box bg-info">
                        <div class="inner">
                            <h3>{{board_item.ubp}}</h3>
                            <p>{{ $t("t_ubp") }}</p>
                        </div>
                        <div class="icon">
                            <i class="icon-share"></i>
                        </div>
                        <router-link class="small-box-footer" :to="{ name: 'mtUbps', query: { page: 1, per_page: 10 } }">
                            {{ $t("more_info") }}<i class="icon-right-circled"></i>
                        </router-link>
                    </div>
                </div>  

                <div class="col-md-6 col-lg-3" v-if="$root.can({ name: 'personal', if: false })">
                    <!-- small box -->
                    <div class="small-box bg-success">
                        <div class="inner">
                            <h3>{{board_item.ubp_com}}</h3>
                            <p>{{ $t("t_ubp_com") }}</p>
                        </div>
                        <div class="icon">
                            <i class="icon-percent"></i>
                        </div>
                        <router-link class="small-box-footer" :to="{ name: 'mtUbps', query: { page: 1, per_page: 10 } }">
                            {{ $t("more_info") }}<i class="icon-right-circled"></i>
                        </router-link>
                    </div>
                </div>  
                
                <div class="col-md-6 col-lg-3" v-if="$root.can('due-amount-view')">
                    <!-- small box -->
                    <div class="small-box amber">
                        <div class="inner">
                            <h3>{{board_item.ubp_due}}</h3>
                            <p>{{ $t("t_ubp_due") }}</p>
                        </div>
                        <div class="icon">
                            <i class="icon-adjust"></i>
                        </div>
                        <router-link class="small-box-footer" :to="{ name: 'mtUtilityDues', query: { page: 1, per_page: 10 } }">
                            {{ $t("more_info") }}<i class="icon-right-circled"></i>
                        </router-link>
                    </div>
                </div><!-- / .col-md-3 -->  
            </div><!--  /.row --> 
        </div><!--  /.component-body --> 
    </div><!--  /.component -->
</template> 

<script>  
    import moment from 'moment'
    export default {
        components: {     
            'date-time-picker': () => import('vue-vanilla-datetime-picker'), 
        },   
        data() {
            return {    
                dateOptions: this.$store.state.dateOptions, 
                board_item: {  
                    balance: 0,
                    ref_com: 0,  
                    mr: 0,
                    mr_com: 0, 
                    mb_due: 0, 
                    mb: 0,
                    mb_com: 0, 
                    co_mb: 0, 
                    ubp: 0,
                    ubp_com: 0, 
                    ubp_due: 0, 
                },  
                board_item_search: { 
                    date_from: '',  
                    date_to: '',     
                    order_by: '',  
                },  
                preloader: true,
            }
        },
        watch: {
            perPage: function (val) {
                let page = this.$route.query.page;  
                this.$router.push( { path: document.location.search, query: { page: page, per_page: val } } ); 
                this.getLists(); 
            },   
        },
        created() {
            this.getLists();    
        }, 
        mounted() {   
            this.$root.popupModal(); 
        },
        updated() {   
            this.$root.dropdownModal(); 
        },
        methods: { 
            month_text() { 
                if ( this.$route.query.date_from && this.$route.query.date_to ) {
                    return 'From: '+moment( this.$route.query.date_from ).format('DD-MM-YYYY hh:mm')+' To: '+moment( this.$route.query.date_to ).format('DD-MM-YYYY hh:mm');
                }

                if ( this.$route.query.date_from  ) {
                    return 'From: '+moment( this.$route.query.date_from ).format('DD-MM-YYYY hh:mm');
                }  

                if ( this.$route.query.date_to  ) {
                    return 'To: '+moment( this.$route.query.date_to ).format('DD-MM-YYYY hh:mm');
                } 

                //return 'current month';
                return this.$t('current_month');
            },
            dataSearch() { 
                var data_search = this.board_item_search;   
                var query = {};  
                data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
                data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

                for (let key in data_search ) {  
                    if ( data_search[key] ) {
                        query[key] = data_search[key]; 
                    } else {
                        if ( this.$route.query[key] ) {
                            query[key] = '';
                        }
                    } 
                }   
                this.$router.push( { path: document.location.search, query: query } );   
                this.getLists(); 
            },
            getLists(page = 1, click = false) {

                var app = this; 
                let per_page = this.$route.query.per_page;   
                
                let current_page = (click) ? page : this.$route.query.page ;
                if ( click ) {
                    this.$router.push( { path: document.location.search, query: { page: current_page, per_page: per_page } } );  
                }

                let allQuery = this.$route.query;

                var queryString = Object.keys(allQuery).map(key => key + '=' + allQuery[key]).join('&');
                
                axios.get('/api/v1/mt/dashboards?'+ queryString)
                    .then( resp => {  
                        app.preloader = false; 

                        app.board_item.balance = ( resp.data.ac_balance.balance ) ? resp.data.ac_balance.balance : 0;
                        app.board_item.ref_com = ( resp.data.ref_com.total_amount ) ? resp.data.ref_com.total_amount : 0;  

                        app.board_item.co_mb = ( resp.data.co_mb.total_amount ) ? resp.data.co_mb.total_amount : 0; 
                        
                        // total mt and commssion
                        if ( resp.data.mt.length ) {
                            for (let key in resp.data.mt) {
                                if ( resp.data.mt[key].type === null ) { //mobile recharge
                                    app.board_item.mr = resp.data.mt[key].total_amount; 
                                    if ( resp.data.mt[key].total_user_com ) {
                                        app.board_item.mr_com = resp.data.mt[key].total_user_com; 
                                    }
                                } 
                                
                                if ( resp.data.mt[key].type === 1 ) { //mobile banking
                                    app.board_item.mb = resp.data.mt[key].total_amount;
                                    if ( resp.data.mt[key].total_user_com ) {
                                        app.board_item.mb_com = resp.data.mt[key].total_user_com; 
                                    }
                                }

                                if ( resp.data.mt[key].type === 2 ) { //ubp
                                    app.board_item.ubp = resp.data.mt[key].total_amount;
                                    if ( resp.data.mt[key].total_user_com ) {
                                        app.board_item.ubp_com = resp.data.mt[key].total_user_com; 
                                    }
                                }
                            }
                        }

                        // total mt due
                        if ( resp.data.mt_due.length ) {
                            for (let key in resp.data.mt_due) {
                                if ( resp.data.mt_due[key].type === null ) { //mobile recharge and banking
                                    app.board_item.mb_due = resp.data.mt_due[key].total_due; 
                                } 

                                if ( resp.data.mt_due[key].type === 1 ) { //ubp
                                    app.board_item.ubp_due = resp.data.mt_due[key].total_due; 
                                }
                            }
                        } 

                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }, 
        }, //methods
        i18n: { // `i18n` option, setup locale info for component
            messages: {
                en: { 
                    current_month: 'current month',  
                    mr: 'Mobile Recharge',  
                    db_summary: 'Dashboard Summary', 
                        curent_balance: 'Curent Balance',   
                        t_ref_coms: 'Total Referral Commision',   
                    mr: 'Mobile Recharge',  
                        t_mr: 'Total Mobile Recharge',
                        t_mr_com: 'Total Mobile Recharge Commision',
                        t_mb_due: 'Total Mobile Recharge & Banking Due',
                        t_co_mb: 'Total CashOut Mobile Banking',
                    mb: 'Mobile Banking',  
                        t_mb: 'Total Mobile Banking',  
                        t_mb_com: 'Total Mobile Banking Commission',  
                    ubp: 'Utility Bill Pay',  
                        t_ubp: 'Total Utility Bill',  
                        t_ubp_com: 'Total Utility Bill Commission',  
                        t_ubp_due: 'Total Utility Bill Due',  
                    more_info: 'More Info',  
                },
                bn: { 
                    current_month: 'বর্তমান মাস',
                    mr: 'মোবাইল রিচার্জ',
                    db_summary: 'ডেসবোর্ড সারাংশ',
                        curent_balance: 'বর্তমান টাকা',
                        t_ref_coms: 'মোট রেফারেল কমিশন',
                    mr: 'মোবাইল রিচার্জ',
                        t_mr: 'মোট মোবাইল রিচার্জ',
                        t_mr_com: 'মোট মোবাইল রিচার্জ কমিশন',
                        t_mb_due: 'মোট মোবাইল রিচার্জ এন্ড ব্যাংকিং বাকি',
                    mb: 'মোবাইল ব্যাংকিং',
                        t_mb: 'মোট মোবাইল ব্যাংকিং',     
                        t_mb_com: 'মোট মোবাইল ব্যাংকিং কমিশন',     
                        t_co_mb: 'মোট ক্যাশআউট মোবাইল ব্যাংকিং',    
                    ubp: 'প্রয়োজনীয় বিল প্রদান',  
                        t_ubp: 'মোট প্রয়োজনীয় বিল ',  
                        t_ubp_com: 'মোট প্রয়োজনীয় বিল কমিশন',  
                        t_ubp_due: 'মোট প্রয়োজনীয় বিল বাকি',
                    more_info: 'আরও তথ্য',  
                },  
            }
        },
    } //export default
</script>
