<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Commission Custom User Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body"> 

            <!-- Modal Create-->
            <div v-can="'commission-custom-user-create'" class="modal fade" id="createModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">  {{ (formType) ? 'New' : 'Update '+this.commissionuser.name }} Commission</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
                                
                                <div class="form-row">    
                                    <div class="col-md-12 mb-2"> 
                                        <label for="status">Status</label> 
                                        <label class="switch">
                                          <input type="checkbox" v-model="commissionuser.status">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-12 mb-3" v-if="this.formType">
                                        <multiselect v-model="commissionuser.username" :options="accounts" :custom-label="customLabel" :preserve-search="true" placeholder="Search User" selectLabel="" :loading="isLoading" deselectLabel="" :internal-search="false" :searchable="true" label="name" track-by="name" @search-change="asyncFind" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect> 
                                        <small>You can search a user by mobile number, email or user name</small>
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-12">
                                        <label>Main Commission</label> 
                                    </div><!--  /.col-md-12 --> 

                                    <div class="col-md-6 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="mr" v-model="commissionuser.mr">
                                        <label for="mr">Mobile Recharge (%)</label>
                                    </div><!--  /.col-md-6 mb-3 -->  

                                    <div class="col-md-6 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="mr_pl" v-model="commissionuser.mr_pl">
                                        <label for="mr_pl">Mobile Recharge Powerload (%)</label>
                                    </div><!--  /.col-md-6 mb-3 --> 

                                    <div class="col-md-6 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="mb" v-model="commissionuser.mb">
                                        <label for="mb">Mobile Banking (%)</label>
                                    </div><!--  /.col-md-6 mb-3 -->  

                                    <div class="col-md-6 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="ubp" v-model="commissionuser.ubp">
                                        <label for="ubp">Utility Bill Pay (%)</label>
                                    </div><!--  /.col-md-6 mb-3 --> 

                                    <template v-for="service_name in service_lists"> 
                                        <div class="col-md-12 mt-2">
                                            <label>{{service_name.value}} Service</label> 
                                        </div><!--  /.col-md-12 mb-3 --> 

                                        <div class="mt-number-list"> 
                                            <div class="mt-numbers" v-for="(service, key) in commissionuser[service_name.key+'_service']">  
                                                <div class="mt-title">
                                                    Service: {{ key+1 }}
                                                </div><!--  /.mt-title mb-3 -->
                                                <div class="mt-control"> 
                                                    <span class="btn btn-primary btn-sm" @click="addServices(key, service_name.key)"><i class="icon-plus"></i></span>
                                                    <span class="btn btn-danger btn-sm" @click="removeServices(key, service_name.key)"><i class="icon-minus"></i></span>
                                                </div><!--  /.mt-control mb-3 -->
                                                <div class="form-row">  

                                                    <div class="col-md-12 mt-4 mb-3">
                                                        <div class="form-row">  
                                                            <div class="col-sm-7 col-xs-12">
                                                                <label class="o-s-l">Operator</label> 
                                                                <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="service.provider_id" :options="providerLists(service_name.key)" :preserve-search="true" label="name" track-by="name" :preselect-first="false" @input="providerChanged(key, service_name.key)">
                                                                    <template slot="singleLabel" slot-scope="props">
                                                                        <template v-if="props.option.logo_small_src">
                                                                            <img class="option__image" :src="'/uploads/imgs/'+props.option.logo_small_src.resized_name" :alt="props.option.name">
                                                                        </template> 
                                                                        <span class="option__title"> {{ props.option.name }}</span>
                                                                    </template>
                                                                    <template slot="option" slot-scope="props">
                                                                        <template v-if="props.option.logo_small_src">
                                                                           <img class="option__image" :src="'/uploads/imgs/'+props.option.logo_small_src.resized_name" :alt="props.option.name"> 
                                                                        </template> 
                                                                        <span class="option__title"> {{ props.option.name }}</span>
                                                                    </template>
                                                                </multiselect>  
                                                            </div><!--  /.col-sm-7 col-xs-12 -->

                                                            <div class="col-sm-5 col-xs-12">
                                                                <label :for="'service_id'+key" class="o-s-l">Type</label>
                                                                <select class="form-control" :id="'service_id'+key" v-model="service.service_id">  
                                                                    <option v-for="service in service.services" :value="service.id">{{service.name}}</option>
                                                                </select>  
                                                            </div><!--  /.col-sm-5 col-xs-12 -->
                                                        </div><!--  /.form-row -->  
                                                    </div><!--  /.col-md-12 mb-3 -->  
                                                    
                                                    <div class="col-md-6 mb-3 outline-group mar-b-25">
                                                        <input placeholder=" " type="text" class="form-control outline" :id="'commission'+key" v-model="service.commission">
                                                        <label :for="'commission'+key">Commission (%)</label>
                                                    </div><!--  /.col-md-3 mb-3 --> 

                                                    <div class="col-md-6 mb-3 outline-group">
                                                        <input placeholder=" " type="text" class="form-control outline" :id="'from_service'+key" v-model="service.from_service">
                                                        <label :for="'from_service'+key">From Service (%)</label>
                                                    </div><!--  /.col-md-3 mb-3 -->  

                                                </div><!--  /.form-row --> 
                                            </div><!--  /.mt-numbers -->
                                        </div> <!-- /.mt-number-list -->
                                    </template> 
                                </div><!--  /.form-row -->  
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button class="btn btn-primary" type="submit">
                                {{ (formType) ? 'Create' : 'Update' }}
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
                            <h5 class="modal-title">Search</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="dataSearch()">
                            <div class="modal-body"> 
            
                                <div class="form-row"> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Show</label>
                                        <select class="form-control" v-model="perPage">
                                            <option v-for="option in perPageOptions" v-bind:value="option.value">
                                                {{ option.text }}
                                            </option>
                                        </select>  
                                    </div><!--  /.col-12 mb-3 -->
        
                                    <div class="col-12 mb-3">
                                        <multiselect v-model="commissionuserSearch.user_id" :options="accounts" :custom-label="customLabel" :preserve-search="true" placeholder="Search User" selectLabel="" :loading="isLoading" deselectLabel="" :internal-search="false" :searchable="true" label="name" track-by="name" @search-change="asyncFind" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect> 
                                        <small>Search by mobile, email or username</small>
                                    </div><!--  /.col-md-12 mb-3 --> 
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="commissionuserSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="commissionuserSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="commissionuserSearch.order_by" >
                                            <option value="">Newer First</option>
                                            <option value="1">Newer Last</option> 
                                        </select> 
                                    </div><!--  /.col-12 mb-3 -->
                                        
                                    <div class="col-12 mb-3"> 
                                        <button class="btn btn-primary btn-sm" type="submit">Search</button>
                                        <button class="btn btn-dark float-right btn-sm" type="reset">Reset</button>
                                    </div><!--  /.col-12 mb-3 -->
            
                                </div><!--  /.form-row -->  
                            </div><!--  /.modal-body --> 
                        </form>
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal search -->

            <div class="table-actions"> 
                <button v-can="'commission-custom-user-create'" type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> Commission
                </button> 

                <button v-can="'commission-custom-user-delete'" v-if="selected.length" class="btn btn-sm btn-danger " v-on:click="deleteSelected()"><i class="icon-trash-empty"></i> Delete Selected</button>

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">Search</span>
                </button> 
            </div><!--  /.table-actions --> 

            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr>
                            <th style="width: 20px;"><input type="checkbox" id="check-all" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all">User Id</label></th>
                            <th>Name</th>   
                            <th>Status</th>   
                            <th>Main Commission (%)</th>      
                            <th>Actions</th>  
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="commissionuser, index in commissionusers.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+commissionuser.id" :value="commissionuser.user.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+commissionuser.id">{{ user( commissionuser.user ) }}</label></td> 
                            <td>{{commissionuser.user.name}}</td>                 
                            <td> 
                                <template v-if="commissionuser.status.status">
                                    <span class="bg-success active-status">Active</span>
                                </template>
                                <template v-else>
                                    <span class="bg-danger active-status">Inactive</span>
                                </template>
                            </td>         
                            <td>
                                <template v-if="commissionuser.commissions">

                                    <template v-for="value, index in commissionuser.commissions">
                                        <span class="btn btn-sm btn-dark mr-2">
                                        <template v-if="value.type == 'mr'">Mobile Recharge</template> 
                                        <template v-else-if="value.type == 'mr_pl'">Mobile Recharge Powerload</template> 
                                        <template v-else-if="value.type == 'mb'">Mobile Banking</template> 
                                        <template v-else-if="value.type == 'ubp'">Utility Bill Pay</template> 
                                         : {{ value.commission }}
                                        </span>
                                    </template> 
                                </template>
                            </td>  
                            <td>
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                    <a v-can="'commission-custom-user-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(commissionuser)" data-toggle="modal" data-target="#createModal">
                                       Edit / View
                                    </a>
                                    <a v-can="'commission-custom-user-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(commissionuser.id, index, commissionuser.user.id)">
                                        Delete
                                    </a>
                                  </div>
                                </div> 
                            </td>
                        </tr>

                        <template v-if="noData"><tr class="bg-white" v-html="noData"></tr></template>
                       
                    </tbody>
                    <tfoot>
                        <tr>
                            <th><input type="checkbox" id="check-all-bottom" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all-bottom">User Id</label></th>
                            <th>Name</th>  
                            <th>Status</th>  
                            <th>Main Commission (%)</th>     
                            <th>Actions</th> 
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="commissionusers" :limit="2" @pagination-change-page="getLists"></pagination> 
            </div><!--  /.table-actions -->
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script>  
export default {
    components: {     
        'date-time-picker': () => import('vue-vanilla-datetime-picker'), 
    },   
    data() {
        return {    
            dateOptions: this.$store.state.dateOptions,
            formType: false,
            service_lists: [
                { key : 'mr', value : 'Mobile Recharge', },
                { key : 'mr_pl', value : 'Mobile Recharge Powerload', },
                { key : 'mb', value : 'Mobile Banking', },
                { key : 'ubp', value : 'Utility Bill Pay', },
            ],
            commissionuser: { 
                status: true,
                name: '',
                username: '',
                mr: null,
                mr_pl: null,   
                mb: null,
                ubp: null,     
                mr_service: [
                    { provider_id: null, services: [], service_id: '', commission: null, from_service: null }
                ], 
                mr_pl_service: [
                    { provider_id: null, services: [], service_id: '', commission: null, from_service: null }
                ], 
                mb_service: [
                    { provider_id: null, services: [], service_id: '', commission: null, from_service: null }
                ], 
                ubp_service: [
                    { provider_id: null, services: [], service_id: '', commission: null, from_service: null }
                ], 
            }, 
            commissionuser_const: { 
                status: true,
                name: '',
                username: '',
                mr: null,
                mr_pl: null,   
                mb: null,
                ubp: null,     
                mr_service: [
                    { provider_id: null, services: [], service_id: '', commission: null, from_service: null }
                ], 
                mr_pl_service: [
                    { provider_id: null, services: [], service_id: '', commission: null, from_service: null }
                ], 
                mb_service: [
                    { provider_id: null, services: [], service_id: '', commission: null, from_service: null }
                ], 
                ubp_service: [
                    { provider_id: null, services: [], service_id: '', commission: null, from_service: null }
                ], 
            },
            commissionuserSearch: {
                user_id: '', 
                date_from: '',  
                date_to: '',     
                order_by: '',  
            }, 
            mr_providers: [],
            mb_providers: [],
            ubp_providers: [],
            accounts: [], 
            isLoading: false, 
            commissionusers: {},    
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
        addServices(index, service) { 
            this.commissionuser[service+'_service'].splice(index + 1, 0, { provider_id: null, services: [], service_id: '', commission: null, from_service: null } ); 
        },
        removeServices(index, service) {             
            if (this.commissionuser[service+'_service'].length == 1) {
                // first remove
                this.commissionuser[service+'_service'].splice(index, 1); 
                // than add empty
                this.commissionuser[service+'_service'].splice(index + 1, 0, { provider_id: null, services: [], service_id: '', commission: null, from_service: null } );
            } else {
                this.commissionuser[service+'_service'].splice(index, 1); 
            }   
        },
        customLabel({ name = '' }) { 
            return name;
        },
        providerLists( key ) { 
            if ( key == 'mr' ) {
                return this.mr_providers;
            } else if ( key == 'mb' ) {
                return this.mb_providers;
            } else if ( key == 'ubp' ) {
                return this.ubp_providers;
            } else {
                return this.mr_providers;
            }
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
                        app.$store.commit('errorMessages', resp); 
                    });  
            }, 600); 
            
        }, 
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.commissionusers.data) {
                    this.selected.push(this.commissionusers.data[key].user.id);
                }
            }
        },
        dataSearch() { 
            var data_search = this.commissionuserSearch;   
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
            
            axios.get('/api/v1/mt/commissionusers?'+ queryString)
                .then( resp => {  
                    app.preloader = false;
                    
                    app.commissionusers = resp.data.commissionusers;   
                    app.allProviders = resp.data.providers;

                    if(app.commissionusers.data.length == 0) {                                 
                        app.noData = app.$store.state.noData;
                    } else {
                        app.noData = '';
                    }

                    /* Providers By Category */
                    app.mr_providers = this.allProviders.filter(function(itm) { 
                        for( let val of itm.categories ) {
                            if ( val.slug == 'mobile-recharge' ) {
                                return true;
                                break;
                            }
                        }
                    });  

                    app.mb_providers = this.allProviders.filter(function(itm) { 
                        for( let val of itm.categories ) {
                            if ( val.slug == 'mobile-banking' ) {
                                return true;
                                break;
                            }
                        }
                    }); 

                    app.ubp_providers = this.allProviders.filter(function(itm) { 
                        for( let val of itm.categories ) {
                            if ( val.slug == 'utility' ) {
                                return true;
                                break;
                            }
                        }
                    });   

                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        },
        providerChanged( key, service ) {   
            if ( this.commissionuser[service+'_service'][key].provider_id.services ) {
                this.commissionuser[service+'_service'][key].services = this.commissionuser[service+'_service'][key].provider_id.services; 
                this.commissionuser[service+'_service'][key].service_id = this.commissionuser[service+'_service'][key].provider_id.services[0].id;  
            } 
        }, 
        newForm() { 
            this.formType = true;  
            this.commissionuser = this.commissionuser_const; 
        }, 
        saveForm() { 
            document.getElementById('createModal').style.display = 'none';
            var app = this;
            var newCommission = app.commissionuser;
            if ( this.formType ) {
                axios.post('/api/v1/mt/commissionusers', newCommission)
                    .then( resp => {  
                        app.commissionuser = app.commissionuser_const; 
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                axios.patch('/api/v1/mt/commissionusers/' + newCommission.user_id, newCommission)
                    .then( resp => { 
                        app.commissionuser = app.commissionuser_const;
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm(commissionusers) {
            this.formType = false;   

            var mr = null;
            var mr_pl = null;   
            var mb = null;
            var ubp = null;  

            var mr_service = [];
            var mr_pl_service = [];
            var mb_service = [];
            var ubp_service = [];

            for (let val of commissionusers.commissions) {  
                if ( val.type == 'mr' ) {
                   mr = val.commission; 
                } 
                if ( val.type == 'mr_pl' ) {
                   mr_pl = val.commission; 
                }
                if ( val.type == 'mb' ) {
                   mb = val.commission; 
                }
                if ( val.type == 'ubp' ) {
                   ubp = val.commission; 
                }
            }  
            
            for (let val of commissionusers.services) {  
                let result = this.allProviders.find(obj => {
                    return obj.id == val.provider_id;
                }); 

                val.provider_id = result;  
                val.services = result.services;  

                if ( val.type == 'mr' ) {  
                   mr_service.push(val);
                } 
                if ( val.type == 'mr_pl' ) { 
                   mr_pl_service.push(val);  
                }  
                if ( val.type == 'mb' ) {  
                   mb_service.push(val);
                } 
                if ( val.type == 'ubp' ) {  
                   ubp_service.push(val);
                }  
            } 

            /* If not Mobile Recharge */
            if ( !mr_service.length ) {
                mr_service = [
                    { provider_id: null, services: [], service_id: '', commission: null, from_service: null }
                ];  
            }
            /* If not Mobile Recharge powerload */
            if ( !mr_pl_service.length ) {
                mr_pl_service = [
                    { provider_id: null, services: [], service_id: '', commission: null, from_service: null }
                ];
            }
            /* If not Mobile Banking */
            if ( !mb_service.length ) {
                mb_service = [
                    { provider_id: null, services: [], service_id: '', commission: null, from_service: null }
                ];  
            }
            /* If not Utility Bill Pay */
            if ( !ubp_service.length ) {
                ubp_service = [
                    { provider_id: null, services: [], service_id: '', commission: null, from_service: null }
                ];
            }

            this.commissionuser = { 
                user_id: commissionusers.user.id,
                status: commissionusers.status.status,
                name: commissionusers.user.name,
                mr: mr, 
                mr_pl: mr_pl,   
                mb: mb, 
                ubp: ubp,  
                mr_service: mr_service, 
                mr_pl_service: mr_pl_service, 
                mb_service: mb_service, 
                ubp_service: ubp_service, 
            };   
        }, 
        deleteEntry(id, index, user_id) { 
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/mt/commissionusers/' + user_id)
                    .then( resp => {
                        app.commissionusers.data.splice(index, 1); 
                        app.$store.commit('submitMsg', 'delete');  
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp);
                    });
            }
        },
        deleteSelected() { 
            var app = this;
            if( app.selected.length == 0 ) {
                app.$store.commit('noSelectedMsg');
                return;
            }
            if (confirm(app.$store.state.confirmDel)) {
                var selectedItem = this.selected.toString();
                axios.delete('/api/v1/mt/commissionusers/' + selectedItem)
                    .then( resp => {
                        app.$store.commit('submitMsg', 'selectedDelete'); 
                        app.selectAll = false;
                        app.selected = [];
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp);
                    });
            }
        }, 
    } //methods
} //export default
</script>