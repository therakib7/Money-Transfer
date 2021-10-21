<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               {{ $t('co_m_b_list') }} 
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body"> 

            <!-- Modal Create-->
            <div v-can="'cashout-banking-create'" class="modal fade" id="createModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ $t('new_co_v') }} </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">
                                    <div class="col-md-12 mb-3 text-danger" v-if="!co_mb.receive_msg">
                                        You need to try after 10 minutes to verify by number and amount.
                                    </div><!--  /.col-md-12 -->   

                                    <div class="col-md-12 mb-3"> 
                                        <label class="o-s-l">{{ $t("provider") }}</label> 
                                        <multiselect v-model="co_mb.service_id" deselect-label="" select-label="" :options="services" :custom-label="labelService" :preserve-search="true" :placeholder="$t('s_p')"  
                                        label="id" track-by="id" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-md-12 mb-3 -->
    
                                    <div class="col-md-12 mb-3 outline-group" v-if="co_mb.receive_msg">
                                        <input placeholder=" " type="text" class="form-control outline" id="trx_id" v-model="co_mb.trx_id">
                                        <label for="trx_id">{{ $t("trx_id") }}</label>
                                    </div><!--  /.col-md-12 mb-3 -->  
                                    
                                    <template v-else> 
                                        <div class="col-md-12 mb-3 outline-group">
                                            <input placeholder=" " type="text" class="form-control outline" id="number" v-model="co_mb.number">
                                            <label for="number">{{ $t("number") }}</label>
                                        </div><!--  /.col-md-12 mb-3 -->                                       
                                        
                                        <div class="col-md-12 mb-3 outline-group">
                                            <input placeholder=" " type="text" class="form-control outline" id="amount" v-model="co_mb.amount">
                                            <label for="amount">{{ $t("amount") }}</label>
                                        </div><!--  /.col-md-12 mb-3 -->  
                                    </template>

                                    <div class="col-md-12 mb-3 outline-group">
                                        <span class="text-primary cursor-pointer" @click="co_mb.receive_msg = !co_mb.receive_msg" >{{ ( co_mb.receive_msg ) ? $t('did_not_r_m') : $t('r_m') }}</span> 
                                    </div><!--  /.col-md-12 mb-3 -->  
     
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t("close") }}</button>
                                <button class="btn btn-primary" type="submit">
                                {{ $t("verify") }}
                                </button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal --> 
            
            <!-- Modal Search -->
            <div class="modal right fade" id="dataSearch">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ $t("search") }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="dataSearch()">
                            <div class="modal-body"> 
            
                                <div class="form-row"> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t("show") }}</label>
                                        <select class="form-control" v-model="perPage">
                                            <option v-for="option in perPageOptions" v-bind:value="option.value">
                                                {{ option.text }}
                                            </option>
                                        </select>  
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-md-12 mb-3">
                                        <label class="o-s-l">{{ $t("provider") }}</label> 
                                        <multiselect v-model="co_mbSearch.service_id" deselect-label="" select-label="" :options="services" :custom-label="labelService" :preserve-search="true" :placeholder="$t('s_p')" 
                                        label="id" track-by="id" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-md-12 mb-3 -->
                                    
                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-number" v-model="co_mbSearch.number">
                                        <label for="search-number">{{ $t("number") }}</label>
                                    </div><!--  /.col-12 mb-3 -->    

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder="search-amount-from" type="text" class="form-control outline" id="search-amount-from" v-model="co_mbSearch.amount_from">
                                        <label for="search-amount-from">{{ $t("amount_from") }}</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-amount-to" v-model="co_mbSearch.amount_to">
                                        <label for="search-amount-to">{{ $t("amount_to") }}</label>
                                    </div><!--  /.col-12 mb-3 -->  
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="co_mbSearch.date_from" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_from') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="co_mbSearch.date_to" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t("order_by") }}</label>
                                        <select id="search-order-by" class="form-control" v-model="co_mbSearch.order_by" >
                                            <option value="">{{ $t("newer_first") }}</option>
                                            <option value="1">{{ $t("newer_last") }}</option> 
                                        </select> 
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3"> 
                                        <button class="btn btn-primary btn-sm" type="submit">{{ $t("search") }}</button>
                                        <button class="btn btn-dark float-right btn-sm" type="reset">{{ $t("reset") }}</button>
                                    </div><!--  /.col-12 mb-3 --> 
            
                                </div><!--  /.form-row -->  
                            </div><!--  /.modal-body --> 
                        </form>
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal search -->

            <div class="table-actions"> 
                <button v-can="'cashout-banking-create'" type="button" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i>{{ $t("co_v") }}
                </button>  

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">{{ $t("search") }}</span>
                </button>

            </div><!--  /.table-actions -->

            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr>  
                            <th v-if="co_mb_super_role">{{ $t("user_id") }}</th>
                            <th v-if="co_mb_super_role">{{ $t("u_n") }}</th> 
                            <th v-if="co_mb_super_role">Status</th>
                            <th>{{ $t("provider") }}</th> 
                            <th>{{ $t("number") }}</th> 
                            <th>{{ $t("amount") }}</th>   
                            <th title="Commission" v-if="co_mb_agent_mer_role || co_mb_super_role">{{ $t("com") }}</th>
                            <th>{{ $t("used_time") }}</th>   
                            <th>{{ $t("c_t") }}</th>   
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="co_mb, index in co_mbs.data">  
                            <td v-if="co_mb_super_role">{{ (co_mb.status) ? user( co_mb.user ) : null }}</td> 
                            <td v-if="co_mb_super_role">{{ (co_mb.status) ? co_mb.user.name : null }}</td> 
                            <td v-if="co_mb_super_role">
                                <template v-if="co_mb.status">
                                    <span class="bg-success active-status">Success</span>
                                </template>
                                <template v-else>
                                    <span class="bg-danger active-status">Pending</span>
                                </template>
                            </td> 
                            <td>{{ co_mb.service_id.provider.name }}</td> 
                            <td>{{ co_mb.number }}</td> 
                            <td>{{ co_mb.amount }}</td>  
                            <td v-if="co_mb_agent_mer_role || co_mb_super_role">{{ co_mb.user_com }}</td>  
                            <td>{{ co_mb.updated_at | moment("DD-MM-YYYY, h:mm a") }}</td>  
                            <td>{{ co_mb.created_at | moment("DD-MM-YYYY, h:mm a") }}</td>  
                        </tr>

                        <template v-if="noData"><tr class="bg-white" v-html="noData"></tr></template>
                       
                    </tbody>
                    <tfoot>
                        <tr> 
                            <th v-if="co_mb_super_role">{{ $t("user_id") }}</th>
                            <th v-if="co_mb_super_role">{{ $t("u_n") }}</th>
                            <th v-if="co_mb_super_role">Status</th>
                            <th>{{ $t("provider") }}</th> 
                            <th>{{ $t("number") }}</th> 
                            <th>{{ $t("amount") }}</th>   
                            <th title="Commission" v-if="co_mb_agent_mer_role || co_mb_super_role">{{ $t("com") }}</th>
                            <th>{{ $t("used_time") }}</th>   
                            <th>{{ $t("c_t") }}</th>  
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">    
                <pagination-simple :data="co_mbs" @pagination-change-page="getLists"></pagination-simple> 
                <div class="float-right amount-summery" v-if="!noData">
                    <span class="total-amount">{{ $t('t_a') }}: <b>{{t_a}}</b></span> 
                    <span class="total-commision d-inline-block" v-if="co_mb_agent_mer_role || co_mb_super_role">{{ $t('t_com') }}: <b>{{total_user_com}}</b></span>
                </div>
            </div><!--  /.table-actions -->
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script>  
import commonMessages from '@admin/locales/shared-i18n-setup' 
export default {
    components: {    
        'date-time-picker': () => import('vue-vanilla-datetime-picker'), 
    },
    data() {
        return {    
            dateOptions: this.$store.state.dateOptions, 
            co_mb: { 
                receive_msg: true,
                service_id: '', 
                trx_id: '', 
                number: '',
                amount: '',  
            }, 
            co_mb_Const: { 
                receive_msg: true,
                service_id: '', 
                trx_id: '', 
                number: '',
                amount: '',  
            },
            showPass: false,
            co_mbSearch: {
                service_id: '', 
                number: '',
                amount_from: '', 
                amount_to: '', 
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            co_mbs: {}, 
            services: [],  
            t_a: 0, 
            total_user_com: 0,   
            perPage: this.$route.query.per_page, 
            perPageOptions: this.$store.state.perPageOptions,
            selected: [],
            selectAll: false,
            noData: '',
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

        /* Money Transfer Super */
        this.co_mb_super_role = this.$root.can('cashout-banking-super');
        this.co_mb_agent_mer_role = this.$root.can(['agent', 'merchant']); 

        this.getLists();  

        let per_page = this.$route.query.per_page;   
        var perPageOptions =  this.perPageOptions.find( function( ele ) { 
            return ele.value == per_page;
        } );

        if( !perPageOptions ) {
            this.perPageOptions.splice(0, 0, { text: per_page, value: per_page } ); 
        }
    }, 
    mounted() {   
        this.$root.popupModal(); 
    },
    updated() {   
        this.$root.dropdownModal(); 
    },
    methods: {
        labelService({ provider }) {
            return `${provider.name}`
        },
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.co_mbs.data) {
                    this.selected.push(this.co_mbs.data[key].id);
                }
            }
        },  
        dataSearch() { 
            var data_search = this.co_mbSearch;   
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
        user( user ) {  
            if ( user.mobile ) {
                return user.mobile;
            } else if ( user.email ) {
                return user.email;
            } else {
                return user.username;
            }
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
            
            axios.get('/api/v1/mt/co-mbs?'+ queryString)
                .then( resp => { 
                    app.preloader = false;
                     
                    app.co_mbs = resp.data.co_mbs;  
                    app.services = resp.data.services;

                    var t_a = 0;
                    var total_user_com = 0;
                    resp.data.co_mbs.data.forEach(function(item) {
                        t_a += parseFloat(item.amount); 
                        if ( item.user_com != null ) {
                            total_user_com += parseFloat(item.user_com);
                        }
                    }); 
                    app.t_a = t_a;
                    app.total_user_com = total_user_com.toFixed(2);

                    if(app.co_mbs.data.length == 0) {                                 
                        app.noData = app.$store.state.noData;
                    } else {
                        app.noData = '';
                    }
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        }, 
        saveForm() { 
            document.getElementById('createModal').style.display = 'none';
            var app = this;
            var newPackage = app.co_mb;

            axios.post('/api/v1/mt/co-mbs', newPackage)
                .then( resp => {  
                    app.co_mb = app.co_mb_Const 
                    app.$store.commit('submitMsg', 'add');  
                    this.$root.acBalance();
                    app.getLists(); 
                })
                .catch( resp => {  
                    app.$store.commit('errorMessages', resp); 
                });
        },   
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: { 
                co_m_b_list: 'Cash Out Mob Banking Lists', 
                co_v: 'Cash Out Verify', 
                used_time: 'Used Time', 
                c_t: 'Coming Time', 
                s_p: 'Select Provider', 
                provider: 'Provider',
                //modal-content 
                new_co_v: 'New Cash Out Verify',
                verify: 'Verify',
                did_not_r_m: 'Didn\'t receive message?',
                r_m: 'Received Message?',
            },
            bn: { 
                co_m_b_list: 'ক্যাশ আউট মোবাঃ ব্যাংকিং তালিকা',  
                co_v: 'ক্যাশ আউট যাচাই', 
                used_time: 'ব্যবহৃত সময়',
                c_t: 'আসার সময়',
                s_p: 'প্রদানকারী নির্বাচন',
                provider: 'প্রদানকারী',
                //modal-content 
                new_co_v: 'নতুন ক্যাশ আউট যাচাই',
                verify: 'যাচাই',
                did_not_r_m: 'মেসেজ পাইনি',
                r_m: 'মেসেজ পেয়েছি',
            },  
        },
        sharedMessages: commonMessages
    },
} //export default
</script>