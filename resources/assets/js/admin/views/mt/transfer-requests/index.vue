<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               {{ $t('t_r_list') }}
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body"> 

            <!-- Modal Create-->
            <div v-can="'transfer-request-create'" class="modal fade" id="createModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ $t('n_t_r') }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                         
                        <div class="modal-body"> 
    
                            <div class="form-row">
                                <div class="col-md-6 mb-3"> 
                                    <label class="o-s-l">{{ $t('type') }}</label>
                                    <select class="form-control" id="type" v-model="transfer_request.type">
                                        <option :value="null">{{ $t('bank') }}</option>
                                        <option :value="1">{{ $t('mb') }}</option>
                                    </select>
                                </div><!--  /.col-md-6 mb-3 -->

                                <div class="col-md-6 mb-3">
                                    <label class="o-s-l">{{ $t('bank') }}</label> 
                                    <multiselect v-model="transfer_request.banking_provider_id" deselect-label="" select-label="" :options="banking_providers" :preserve-search="true" :placeholder="$t('select_bank')" label="name" track-by="name" :preselect-first="true">
                                        <template slot="tag" slot-scope="props">
                                            <span>{{ props.option.name }}</span>
                                            <span @click="props.remove(props.option)">x</span> 
                                        </template>
                                    </multiselect>
                                </div><!--  /.col-md-6 mb-3 -->

                                <template v-if="transfer_request.banking_provider_id && transfer_request.banking_provider_id.type == null && formType">
                                    <div class="col-md-6 mb-3">
                                        <label class="o-s-l">{{ $t('to_account_no') }}</label> 
                                        <multiselect v-model="transfer_request.to_ac_no" deselect-label="" select-label="" :options="provider_accounts" :preserve-search="true" placeholder="Select Account" label="ac_no" track-by="ac_no" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.ac_no }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-md-6 mb-3 --> 
                                </template>
                                <template v-else>
                                    <div class="col-md-6 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="to_ac_no" v-model="transfer_request.to_ac_no">
                                        <label for="to_ac_no">{{ $t('to_account_no') }}</label>
                                    </div><!--  /.col-md-6 mb-3 -->  
                                </template>                                                                         
                            
                                <div class="col-md-6 mb-3 outline-group">
                                    <input placeholder=" " type="text" class="form-control outline" id="from_ac_no" v-model="transfer_request.from_ac_no">
                                    <label for="from_ac_no">{{ $t('from_account_no') }}</label>
                                </div><!--  /.col-md-6 mb-3 -->                                       
                                
                                <div class="col-md-6 mb-3 outline-group">
                                    <input placeholder=" " type="number" class="form-control outline" id="amount" v-model="transfer_request.amount">
                                    <label for="amount">{{ $t('r_a') }}</label>
                                </div><!--  /.col-md-6 mb-3 -->  

                                <div class="col-md-6 mb-3 outline-group" v-if="!formType && transfer_request_super_role">
                                    <input placeholder=" " type="number" class="form-control outline" id="received_amount" v-model="transfer_request.received_amount">
                                    <label for="received_amount">{{ $t('received_amount') }}</label>
                                </div><!--  /.col-md-6 mb-3 --> 

                                <div class="col-md-6 mb-3 outline-group">
                                    <input placeholder=" " type="text" class="form-control outline" id="user_note" v-model="transfer_request.user_note">
                                    <label for="user_note">{{ $t('note') }}</label>
                                </div><!--  /.col-md-6 mb-3 --> 

                                <div class="col-md-6 mb-3 outline-group" v-if="!formType && transfer_request_super_role">
                                    <input placeholder=" " type="text" class="form-control outline" id="statement_id" v-model="transfer_request.statement_id">
                                    <label for="statement_id">{{ $t('statement_id') }}</label>
                                </div><!--  /.col-md-6 mb-3 --> 

                                <div class="col-md-6 mb-3 outline-group" v-if="!formType && transfer_request_super_role">
                                    <input placeholder=" " type="text" class="form-control outline" id="checker_note" v-model="transfer_request.checker_note">
                                    <label for="checker_note">{{ $t('checker_note') }}</label>
                                </div><!--  /.col-md-6 mb-3 -->  

                                <div class="col-md-6 mb-3">  
                                    <!-- fake fields are a workaround for chrome autofill getting the wrong fields -->
                                    <input style="display:none" type="text" name="fakeusernameremembered"/>
                                    <input style="display:none" type="password" name="fakepasswordremembered"/>
                                    
                                    <div class="input-group outline-group mobile-number">
                                        <input :type="(showPass) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="pin" v-model="transfer_request.pin" required>
                                        <label for="pin">{{ $t('pin') }}</label> 

                                        <div class="input-group-append">
                                            <span class="input-group-text cursor-pointer" @click="showPass = !showPass" :title="( showPass ) ? $t('hide_pin') : $t('show_pin')">
                                                <i :class="showPass ? 'icon-eye-off' : 'icon-eye'" ></i>
                                            </span>
                                        </div>
                                    </div><!-- /.input-group outline-group mobile-number -->
                                    
                                </div><!--  /.col-md-6 mb-3 --> 
 
                            </div><!--  /.form-row -->  
                            
                        </div><!--  /.modal-body -->

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('close') }}
                            </button>  

                            <template v-if="!formType && transfer_request_super_role">
                                <button class="btn btn-danger" v-on:click.prevent="saveForm(0)">
                                   {{ $t('rejected') }}
                                </button>
                                <button class="btn btn-primary" v-on:click.prevent="saveForm(1)">
                                   {{ $t('received') }}
                                </button>
                                <button class="btn btn-success" v-on:click.prevent="saveForm(2)">
                                   {{ $t('r_t') }} 
                                </button>
                            </template>

                            <template v-else>
                                <button v-can="'transfer-request-create'" class="btn btn-primary" v-on:click.prevent="saveForm()">
                                   {{ $t('transfer_request') }}
                                </button>
                            </template>
                            
                        </div><!--  /.modal-footer --> 
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
                                        <label class="o-s-l">{{ $t('show') }}</label>
                                        <select class="form-control" v-model="perPage">
                                            <option v-for="option in perPageOptions" v-bind:value="option.value">
                                                {{ option.text }}
                                            </option>
                                        </select>  
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="number" class="form-control outline" id="search-id" v-model="transfer_requestSearch.id">
                                        <label for="search-id">{{ $t('id') }}</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t('select_status') }}</label>
                                        <select id="search-status" class="form-control" v-model="transfer_requestSearch.status" >
                                            <option value="">{{ $t('select_status') }}</option>
                                            <option value="pending">{{ $t('pending') }}</option>
                                            <option value="1">{{ $t('received') }}</option>
                                            <option value="2">{{ $t('r_and_t') }}</option> 
                                            <option value="0">{{ $t('reject') }}</option>
                                        </select> 
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3" v-if="transfer_request_super_role">
                                        <multiselect v-model="transfer_requestSearch.user_id" :options="accounts" :custom-label="customLabel" :preserve-search="true" :placeholder="$t('search_user')"  selectLabel="" :loading="isLoading" deselectLabel="" :internal-search="false" :searchable="true" label="name" track-by="name" @search-change="asyncFind" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect> 
                                        <small>{{ $t('s_u_h') }}</small>
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-12 mb-3">
                                        <label class="o-s-l">{{ $t('select_bank') }}</label>
                                        <multiselect v-model="transfer_requestSearch.banking_provider_id" :options="banking_providers" :preserve-search="true" :placeholder="$t('s_s')" label="name" track-by="name" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-to-ac-no" v-model="transfer_requestSearch.to_ac_no">
                                        <label for="search-to-ac-no">{{ $t('to_ac_no') }}</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-from-ac-no" v-model="transfer_requestSearch.from_ac_no">
                                        <label for="search-from-ac-no">{{ $t('from_ac_no') }}</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="number" class="form-control outline" id="search-amount" v-model="transfer_requestSearch.amount">
                                        <label for="search-amount">{{ $t('received_amount') }}</label>
                                    </div><!--  /.col-12 mb-3 -->    
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="transfer_requestSearch.date_from" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_from') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="transfer_requestSearch.date_to" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t("order_by") }}</label>
                                        <select id="search-order-by" class="form-control" v-model="transfer_requestSearch.order_by" >
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

            <!-- Modal userDetails -->
            <div v-if="transfer_request_super_role" class="modal fade" id="userDetails" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="">{{ $t("user_details") }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <div class="modal-body"> 
                        
                            <div class="form-row"> 
                                <div class="col-md-12 mb-3">
                                    <table>
                                        <tr>
                                            <th>{{ $t('name') }}: </th>
                                            <td>{{ user_details.name }}</td>
                                        </tr>
                                        <tr>
                                            <th>{{ $t('mobile') }}: </th>
                                            <td>{{ user_details.mobile }}</td>
                                        </tr>
                                        <tr>
                                            <th>{{ $t('email') }}: </th>
                                            <td>{{ user_details.email }}</td>
                                        </tr>
                                    </table>
                                </div><!--  /.col-md-12 mb-3 -->  
                            </div><!--  /.form-row -->
                        </div><!--  /.modal-body -->

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('close') }}</button> 
                        </div><!--  /.modal-footer -->
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal --> 

            <div class="table-actions"> 
                <button v-can="'transfer-request-create'" type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i>{{ $t('transfer_request') }}
                </button>  

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">{{ $t('search') }}</span>
                </button>

            </div><!--  /.table-actions -->

            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr>  
                            <th>{{ $t('id') }}</th> 
                            <th v-if="transfer_request_super_role">{{ $t("u_n") }}</th>
                            <th>{{ $t('bank') }}</th> 
                            <th>{{ $t('status') }}</th> 
                            <th>{{ $t('to_ac_no') }}</th> 
                            <th>{{ $t('from_ac_no') }}</th> 
                            <th>{{ $t('r_a') }}</th>
                            <th>{{ $t('p_note') }}</th>   
                            <th>{{ $t('received_amount') }}</th>   
                            <th>{{ $t('admin_note') }}</th>
                            <th v-if="transfer_request_super_role">{{ $t('statement_id') }}</th>
                            <th>{{ $t('date') }}</th>
                            <th v-if="transfer_request_super_role">{{ $t('account') }}</th>   
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="transfer_request, index in transfer_requests.data">  
                            <td>{{ transfer_request.id }}</td> 
                            <td v-if="transfer_request_super_role">
                                <span v-on:click="userDetails(transfer_request.user)" class="cursor-pointer" data-toggle="modal" data-target="#userDetails">{{ transfer_request.user.name }}</span>
                            </td> 
                            <td>{{ transfer_request.banking_provider_id.name }}</td> 
                            <td>
                                <template v-if="transfer_request.status == null">
                                    <span class="bg-info active-status">{{ $t("pending") }}</span>
                                </template>
                                <template v-if="transfer_request.status == 1">
                                    <span class="bg-success active-status">{{ $t("received") }}</span>
                                </template>
                                <template v-if="transfer_request.status == 2">
                                    <span class="bg-success active-status">{{ $t("r_t") }}</span>
                                </template>
                                <template v-if="transfer_request.status == 0">
                                    <span class="bg-danger active-status">{{ $t("rejected") }}</span>
                                </template>
                            </td> 
                            <td>{{ transfer_request.to_ac_no }}</td> 
                            <td>{{ transfer_request.from_ac_no }}</td> 
                            <td>{{ transfer_request.amount }}</td>   
                            <td>{{ transfer_request.user_note }}</td>   
                            <td>{{ transfer_request.received_amount }}</td>   
                            <td>{{ transfer_request.checker_note }}</td>   
                            <td v-if="transfer_request_super_role">{{ transfer_request.statement_id }}</td>   
                            <td>{{ transfer_request.created_at | moment("DD-MM-YYYY, h:mm a") }}</td>  
                            <td v-if="transfer_request_super_role">
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu mr-l" aria-labelledby="actionItemButtons">
                                    <a href="#" class="dropdown-item" v-on:click.prevent="editForm(transfer_request)" data-toggle="modal" data-target="#createModal">
                                       {{ $t('check') }} 
                                    </a>
                                  </div>
                                </div> 
                            </td>
                        </tr>

                        <template v-if="noData"><tr class="bg-white" v-html="noData"></tr></template>
                       
                    </tbody>
                    <tfoot>
                        <tr> 
                            <th>{{ $t('id') }}</th> 
                            <th v-if="transfer_request_super_role">{{ $t("u_n") }}</th>
                            <th>{{ $t('bank') }}</th> 
                            <th>{{ $t('status') }}</th> 
                            <th>{{ $t('to_ac_no') }}</th> 
                            <th>{{ $t('from_ac_no') }}</th> 
                            <th>{{ $t('received_amount') }}</th>
                            <th>{{ $t('p_note') }}</th>  
                            <th>{{ $t('received_amount') }}</th>   
                            <th>{{ $t('admin_note') }}</th>
                            <th v-if="transfer_request_super_role">{{ $t('statement_id') }}</th>
                            <th>{{ $t('date') }}</th>
                            <th v-if="transfer_request_super_role">{{ $t('account') }}</th>  
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="transfer_requests" :limit="2" @pagination-change-page="getLists"></pagination> 
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
            formType: false, 
            transfer_request: {  
                type: '', 
                banking_provider_id: '', 
                to_ac_no: '', 
                from_ac_no: '',
                amount: '',
                received_amount: '', 
                statement_id: '',
                user_note: '',
                checker_note: '',
                pin: '',
            }, 
            showPass: false,
            transfer_requestConst: {  
                type: '', 
                banking_provider_id: '', 
                to_ac_no: '', 
                from_ac_no: '',
                amount: '',
                received_amount: '', 
                statement_id: '',
                user_note: '',
                checker_note: '',
                pin: '',
            }, 
            user_details: {
                name: '',
                phone: '',
                email: '',
            },
            provider_accounts: [],
            transfer_requestSearch: {
                id: '', 
                status: '', 
                user_id: '', 
                banking_provider_id: '', 
                to_ac_no: '', 
                from_ac_no: '', 
                amount: '',
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            accounts: [],
            isLoading: false,  
            transfer_requests: {}, 
            banking_providers: [],  
            const_banking_providers: [],  
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
        'transfer_request.type': function (val) {  
            if ( val == null || val == 1 ) {
                var id = [val]; 
                var filteredArray = this.const_banking_providers.filter(function(itm) {
                    return id.indexOf(itm.type) > -1;
                }); 
                this.banking_providers = filteredArray; 
            } else {
                this.banking_providers = this.const_banking_providers;
            }             
        }, 
        'transfer_request.banking_provider_id': function (val) {  
            if ( this.formType ) {
                if ( val.type == null ) {
                    this.provider_accounts = val.accounts;                
                } else {
                    this.transfer_request.to_ac_no = '';
                }
            }
        }, 
    },
    created() {
        this.getLists();  

        this.transfer_request_super_role = this.$root.can('transfer-request-super'); 

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
                axios.get('/api/v1/ac/accounts?'+ 'title=' + query)
                    .then( resp => {  
                        this.accounts = resp.data.users;   
                        this.isLoading = false
                    })
                    .catch( resp => {
                        this.$store.commit('errorMessages', resp); 
                    });  
            }, 600); 
            
        }, 
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.transfer_requests.data) {
                    this.selected.push(this.transfer_requests.data[key].id);
                }
            }
        },  
        dataSearch() { 
            var data_search = this.transfer_requestSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) {
                    query[key] = ( key != 'user_id' && key != 'banking_provider_id'  ) ? data_search[key] : data_search[key]['id'];
                } else {
                    if ( this.$route.query[key] ) {
                        query[key] = '';
                    }
                } 
            }   
            this.$router.push( { path: document.location.search, query: query } );   
            this.getLists(); 
        }, 
        userDetails( user ) {
            this.user_details = user;
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
            
            axios.get('/api/v1/mt/transfer-request?'+ queryString)
                .then( resp => { 
                    app.preloader = false;
                     
                    app.transfer_requests = resp.data.transfer_requests;  
                    app.banking_providers = resp.data.banking_providers;
                    app.const_banking_providers = resp.data.banking_providers;
                    if(app.transfer_requests.data.length == 0) {                                 
                        app.noData = app.$store.state.noData;
                    } else {
                        app.noData = '';
                    }
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        }, 
        newForm() { 
            this.formType = true;
            this.transfer_request = this.transfer_requestConst; 
        }, 
        saveForm(status = null) {  
            document.getElementById('createModal').style.display = 'none';
            var app = this;
            var newTransferRequest = app.transfer_request;
            if ( this.formType ) {
                axios.post('/api/v1/mt/transfer-request', newTransferRequest)
                    .then( resp => {  
                        this.transfer_request = this.transfer_requestConst;
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                if ( status != null ) {
                    newTransferRequest.status = status;
                } 

                axios.patch('/api/v1/mt/transfer-request/' + newTransferRequest.id, newTransferRequest)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        },   
        editForm(transfer_request) {
            this.formType = false;  
            this.transfer_request = transfer_request;   
            this.transfer_request.type = transfer_request.banking_provider_id.type;    
        }, 
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: { 
                t_r_list: 'Transfer Request Lists', 
                transfer_request: 'Transfer Request',  
                id: 'ID', 
                bank: 'Bank', 
                to_ac_no: 'To AC NO', 
                to_account_no: 'To Account No', 
                from_ac_no: 'From AC NO', 
                from_account_no: 'From Account NO', 
                r_a: 'Request Amount', 
                p_note: 'Personal Note', 
                received_amount: 'Received Amount', 
                admin_note: 'Admin Note', 
                statement_id: 'Statement ID', 
                account: 'Account', 
                //modal-content
                n_t_r: 'New Transfer Request', 
                optional: 'Optional',  
                transfer: 'Transfer',  
                mb: 'Mobile Banking',  
                transfer_request: 'Transfer Request', 
                checker_note: 'Checker Note', 
                check: 'Check', 
                rejected: 'Rejected', 
                received: 'Received', 
                user_details: 'User Details', 
                mobile: 'Mobile', 
                email: 'Email', 
                //search-content
                received: 'Received', 
                r_and_t: 'Received & Transfered', 
                r_t: 'Received & Transfer', 
                reject: 'Rejected', 
                select_bank: 'Select Bank', 
                s_s: 'Select Service', 
            },
            bn: { 
                t_r_list: 'ট্রান্সফার অনুরোধ তালিকা', 
                transfer_request: 'ট্রান্সফার অনুরোধ',   
                id: 'আইডি', 
                bank: 'ব্যাংক',  
                to_ac_no: 'পাঠানো একাউন্ট নং',  
                to_account_no: 'পাঠানো একাউন্ট নং',  
                from_ac_no: 'কোন একাউন্ট নং হতে',  
                from_account_no: 'কোন একাউন্ট নং হতে',  
                r_a: 'অনুরোধের টাকার পরিমান',  
                p_note: 'ব্যক্তিগত নোট',  
                received_amount: 'প্রাপ্ত টাকার পরিমাণ', 
                admin_note: 'কোম্পানী নোট', 
                statement_id: 'লেনদেন আইডি', 
                account: 'একাউন্ট', 
                //modal-content 
                n_t_r: 'নতুন ট্রান্সফার অনুরোধ', 
                optional: 'অতিরিক্ত',  
                transfer: 'ট্রান্সফার',  
                mb: 'মোবাইল ব্যাংকিং',  
                transfer_request: 'ট্রান্সফার অনুরোধ', 
                checker_note: 'যাচাই করুন', 
                check: 'যাচাই করুন', 
                rejected: 'বাতিল', 
                received: 'গৃহীত',
                user_details: 'ব্যবহারকারীর বিস্তারিত', 
                mobile: 'মোবাইল',
                email: 'ইমেইল',
                //search-content
                received: 'গৃহীত', 
                r_and_t: 'প্রাপ্ত এবং স্থানান্তরিত', 
                r_t: 'প্রাপ্ত এবং স্থানান্তর', 
                reject: 'বাতিল', 
                select_bank: 'ব্যাংক নির্বাচন', 
                s_s: 'সেবা নির্বাচন', 
            },  
        },
        sharedMessages: commonMessages
    },
} //export default
</script>