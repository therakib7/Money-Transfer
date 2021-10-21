<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               {{ $t('bal_transfer') }} <span v-if="$route.query.type">{{ $t('co') }}</span> {{ $t('list') }}
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body"> 

            <!-- Modal Create-->
            <div v-can="'balance-transfer-create'" class="modal fade" id="createModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ $t('new_balance_tan') }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row"> 

                                    <div class="col-md-12 mb-3"> 
                                        <multiselect v-model="balancetransfer.username" :options="accounts" :custom-label="customLabel" :preserve-search="true" :placeholder="$t('search_user')" selectLabel="" :loading="isLoading" deselectLabel="" :internal-search="false" :searchable="true" label="name" track-by="name" @search-change="asyncFind" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect> 
                                        <small>{{ $t('s_u_h') }}</small>
                                    </div><!--  /.col-md-12 mb-3 -->                                    
                                    
                                    <div class="col-md-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" required class="form-control outline" id="amount" v-model="balancetransfer.amount">
                                        <label for="amount">{{ $t('tk') }}</label>
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="statement_id" v-model="balancetransfer.statement_id">
                                        <label for="statement_id">{{ $t('statement_id') }} ({{ $t('optional') }})</label>
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="note" v-model="balancetransfer.note">
                                        <label for="note">{{ $t('note') }}</label>
                                    </div><!--  /.col-md-12 mb-3 -->   

                                    <div class="col-md-12 mb-3">  
                                        <!-- fake fields are a workaround for chrome autofill getting the wrong fields -->
                                        <input style="display:none" type="text" name="fakeusernameremembered"/>
                                        <input style="display:none" type="password" name="fakepasswordremembered"/>
                                        
                                        <div class="input-group outline-group mobile-number">
                                            <input :type="(showPass) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="pin" v-model="balancetransfer.pin" required>
                                            <label for="pin">{{ $t('pin') }}</label> 

                                            <div class="input-group-append">
                                                <span class="input-group-text cursor-pointer" @click="showPass = !showPass" :title="( showPass ) ? $t('hide_pin') : $t('show_pin')">
                                                    <i :class="showPass ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                </span>
                                            </div>
                                        </div><!-- /.input-group outline-group mobile-number -->
                                        
                                    </div><!--  /.col-md-12 mb-3 --> 
     
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('close') }}</button>
                                <button class="btn btn-primary" type="submit">
                                {{ $t('transfer') }}
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
                            <h5 class="modal-title">{{ $t('search') }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="dataSearch()">
                            <div class="modal-body"> 
            
                                <div class="form-row"> 

                                    <div class="col-12 mb-3"> 
                                        <select class="form-control" v-model="perPage">
                                            <option v-for="option in perPageOptions" v-bind:value="option.value">
                                                {{ option.text }}
                                            </option>
                                        </select>  
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t('select_type') }}</label>
                                        <select id="search-transection_type" class="form-control" v-model="balancetransferSearch.transection_type" >
                                            <option value="">{{ $t('select_type') }}</option>
                                            <option value="1">{{ $t('income') }}</option>
                                            <option value="0">{{ $t('expense') }}</option> 
                                        </select> 
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3">
                                        <multiselect v-model="balancetransferSearch.user_id" :options="accounts" :custom-label="customLabel" :preserve-search="true" :placeholder="$t('search_user')" selectLabel="" :loading="isLoading" deselectLabel="" :internal-search="false" :searchable="true" label="name" track-by="name" @search-change="asyncFind" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect> 
                                        <small>{{ $t('s_u_h') }}</small>
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" required class="form-control outline" id="search-statement_id" v-model="balancetransferSearch.statement_id">
                                        <label for="search-statement_id">{{ $t('statement_id') }}</label>
                                    </div><!--  /.col-12 mb-3 --> 
        
                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-amount-from" v-model="balancetransferSearch.amount_from">
                                        <label for="search-amount-from">{{ $t('amount_from') }}</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-amount-to" v-model="balancetransferSearch.amount_to">
                                        <label for="search-amount-to">{{ $t('amount_to') }}</label>
                                    </div><!--  /.col-12 mb-3 -->  
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="balancetransferSearch.date_from" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_from') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="balancetransferSearch.date_to" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t("order_by") }}</label>
                                        <select id="search-order-by" class="form-control" v-model="balancetransferSearch.order_by" >
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
            
            <button v-if="0" data-toggle="modal" data-target="#searchModal" @click="searchModal = true">{{ $t('search') }}</button> 
            <search v-if="searchModal"></search>

            <div class="table-actions"> 
                <button v-can="'balance-transfer-create'" type="button" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i>{{ $t('bal_transfer') }}<span v-if="$route.query.type"> {{ $t("from_company") }}</span>
                </button>  
                
                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">{{ $t("search") }}</span>
                </button>

                <span v-if="$route.query.type" class="float-right mr-4"><b>Company Balance:</b> {{co_balance}}</span> 
            </div><!--  /.table-actions -->
 
            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr> 
                            <th>{{ $t('user_id') }}</th> 
                            <th>{{ $t('name') }}</th> 
                            <th>{{ $t('type') }}</th> 
                            <th>{{ $t('amount') }}</th> 
                            <th>{{ $t('statement_id') }}</th>
                            <th>{{ $t('note') }}</th> 
                            <th>{{ $t('date') }}</th>     
                        </tr>
                    </thead>
                    <tbody> 
                        <tr  v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>                        
                        
                        <tr v-for="balancetransfer, index in balancetransfers.data">  
                            <td>{{ user( balancetransfer ) }}</td> 
                            <td>{{ u_n( balancetransfer ) }}</td> 
                            <td>{{ balancetransfer.transection_type }}</td> 
                            <td>{{ balancetransfer.amount }}</td> 
                            <td>{{ balancetransfer.statement_id }}</td>  
                            <td>{{ balancetransfer.note }}</td>  
                            <td>{{ balancetransfer.created_at | moment("DD-MM-YYYY, h:mm a") }}</td> 
                        </tr>

                        <template v-if="noData"><tr class="bg-white" v-html="noData"></tr></template>
                       
                    </tbody>
                    <tfoot>
                        <tr> 
                            <th>{{ $t('user_id') }}</th> 
                            <th>{{ $t('name') }}</th> 
                            <th>{{ $t('type') }}</th> 
                            <th>{{ $t('amount') }}</th> 
                            <th>{{ $t('statement_id') }}</th>
                            <th>{{ $t('note') }}</th> 
                            <th>{{ $t('date') }}</th>    
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="balancetransfers" :limit="2" @pagination-change-page="getLists"></pagination> 
            </div><!--  /.table-actions -->
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script>
import commonMessages from '@admin/locales/shared-i18n-setup'  
export default {  
    components: {    
        'search': () => import('@components/search/index.vue'), 
        'date-time-picker': () => import('vue-vanilla-datetime-picker'), 
    },
    data() {
        return {    
            searchModal: false,
            dateOptions: this.$store.state.dateOptions, 
            balancetransfer: { 
                username: '', 
                amount: '', 
                note: '', 
                statement_id: '', 
                pin: '', 
            }, 
            showPass: false,
            co_balance: 0,
            balancetransferSearch: {
                user_id: '', 
                transection_type: '',
                statement_id: '', 
                amount_from: '',
                amount_to: '',
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            accounts: [],
            balancetransfers: {},
            isLoading: false,  
            perPage: this.$route.query.per_page, 
            perPageOptions: this.$store.state.perPageOptions, 
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
        '$route.query.type': function (type) {  
            this.getLists();
        },  
    },
    created() {
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
        customLabel({ name = '' }) { 
            return name;
        },
        asyncFind(query) {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                if ( query.length < 4 ) return;
                this.isLoading = true;
                axios.get('/api/v1/ac/accounts?'+ 'title=' + query + '&match=1')
                    .then( resp => {  
                        this.accounts = resp.data.users;   
                        this.isLoading = false
                    })
                    .catch( resp => {
                        this.$store.commit('errorMessages', resp); 
                    });  
            }, 600); 
            
        },  
        dataSearch() { 
            var data_search = this.balancetransferSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) {
                    query[key] = ( key != 'user_id' ) ? data_search[key] : data_search[key]['id'];
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
            if ( user.user_from ) {
                if ( user.user_from.mobile ) {
                    return user.user_from.mobile;
                } else if ( user.user_from.email ) {
                    return user.user_from.email;
                } else {
                    return user.user_from.username;
                }
            } else if ( user.user_to ) {
                if ( user.user_to.mobile ) {
                    return user.user_to.mobile;
                } else if ( user.user_to.email ) {
                    return user.user_to.email;
                } else {
                    return user.user_to.username;
                }
            }
        }, 
        u_n( user ) {
            return ( user.user_from != null ) ? user.user_from.name : user.user_to.name; 
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
            if ( this.$route.query.type ) {
                queryString += '&type=1';
            }
            
            axios.get('/api/v1/ac/balancetransfers?'+ queryString)
                .then( resp => {  
                    app.preloader = false;

                    app.balancetransfers = resp.data.balancetransfers;  
                    if(app.balancetransfers.data.length == 0) {                                 
                        app.noData = app.$store.state.noData;
                    } else {
                        app.noData = '';
                    }

                    //company balance
                    if ( resp.data.ac_balance ) {
                        app.co_balance = resp.data.ac_balance.balance;
                    }
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        }, 
        saveForm() { 
            document.getElementById('createModal').style.display = 'none';
            var app = this; 
            if ( this.$route.query.type != null ) {
                this.$set( app.balancetransfer, 'type', 1 );
            }

            var newPackage = app.balancetransfer;
            
            axios.post('/api/v1/ac/balancetransfers', newPackage)
                .then( resp => {  
                    app.$store.commit('nullForm', app.balancetransfer); 
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
                bal_transfer: 'Balance Transfer', 
                list: 'Lists',  
                statement_id: 'Statement ID', 
                from_company: 'From Company', 
                co: 'Company', 
                //modal-content
                new_balance_tan: 'New Balance Transfer', 
                optional: 'Optional',  
                transfer: 'Transfer',  
                //search-content
                select_type: 'Select Type', 
                income: 'Income', 
                expense: 'Expense', 
            },
            bn: { 
                bal_transfer: 'ব্যালেন্স ট্রান্সফার', 
                list: 'তালিকা',   
                statement_id: 'লেনদেন আইডি', 
                from_company: 'কোম্পানী হতে ',  
                co: 'কোম্পানী ',  
                //modal-content 
                new_balance_tan: 'নতুন ব্যালেন্স ট্রান্সফার', 
                optional: 'অতিরিক্ত',  
                transfer: 'ট্রান্সফার',  
                //search-content
                select_type: 'ধরন নির্বাচন',
                income: 'আয়', 
                expense: 'ব্যয়', 
            },  
        },
        sharedMessages: commonMessages
    },
} //export default
</script>