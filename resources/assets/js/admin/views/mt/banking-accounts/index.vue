<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Banking Account Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body">  

            <!-- Modal Create-->
            <div v-can="'banking-account-create'" class="modal fade" id="createModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">  {{ (formType) ? 'New' : 'Update' }} Banking Account</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">
                                    <div class="col-md-12 mb-3"> 
                                        <label for="status">Status</label> 
                                        <label class="switch">
                                          <input type="checkbox" v-model="banking_account.status">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3"> 
                                        <label for="type" class="o-s-l">Banking Provider</label>
                                        <multiselect v-model="banking_account.banking_provider_id" selectLabel="" deselectLabel="" :options="bankingProviders" :preserve-search="true" label="name" track-by="name" :preselect-first="true"> 
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="ac_holder_name" v-model="banking_account.ac_holder_name">
                                        <label for="ac_holder_name">AC Holder Name</label>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="ac_no" v-model="banking_account.ac_no">
                                        <label for="ac_no">AC NO</label>
                                    </div><!--  /.col-md-4 mb-3 -->  

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="ac_type" v-model="banking_account.ac_type">
                                        <label for="ac_type">AC Type</label>
                                    </div><!--  /.col-md-4 mb-3 -->  

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
                                        <date-time-picker v-model="banking_accountSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="banking_accountSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="banking_accountSearch.order_by" >
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
                <button v-can="'banking-account-create'" type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> Banking Account
                </button> 

                <button v-if="selected.length" class="btn btn-sm btn-danger " v-on:click="deleteSelected()"><i class="icon-trash-empty"></i> Delete Selected</button>

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">Search</span>
                </button>

            </div><!--  /.table-actions -->

            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr>
                            <th style="width: 20px;"><input type="checkbox" id="check-all" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all">Banking Provider</label></th>
                            <th>Status</th>
                            <th>AC Holder Name</th>  
                            <th>AC NO</th>    
                            <th>AC Type</th>  
                            <th>Actions</th>  
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="banking_account, index in banking_accounts.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+banking_account.id" :value="banking_account.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+banking_account.id">{{ banking_account.banking_provider_id.name }}</label></td>
                            <td> 
                                <template v-if="banking_account.status">
                                    <span class="bg-success active-status">Active</span>
                                </template>
                                <template v-else>
                                    <span class="bg-danger active-status">Inactive</span>
                                </template>
                            </td>
                            <td>{{ banking_account.ac_holder_name }}</td>   
                            <td>{{ banking_account.ac_no }}</td>      
                            <td>{{ banking_account.ac_type }}</td>   
                            <td>
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                    <a v-can="'banking-account-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(banking_account)" data-toggle="modal" data-target="#createModal">
                                       Edit 
                                    </a>
                                    <a v-can="'banking-account-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(banking_account.id, index)">
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
                            <th><label for="check-all-bottom">Banking Provider</label></th>
                            <th>Status</th>
                            <th>AC Holder Name</th>   
                            <th>AC NO</th>    
                            <th>AC Type</th>  
                            <th>Actions</th> 
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="banking_accounts" :limit="2" @pagination-change-page="getLists"></pagination> 
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
            banking_account: { 
                status: 1,
                banking_provider_id: '',
                ac_holder_name: '', 
                ac_no: '', 
                ac_type: '',  
            }, 
            banking_accountConst: { 
                status: 1,
                banking_provider_id: '',
                ac_holder_name: '', 
                ac_no: '', 
                ac_type: '',  
            },  
            banking_accountSearch: { 
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            banking_accounts: {},  
            bankingProviders: [], 
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
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.banking_accounts.data) {
                    this.selected.push(this.banking_accounts.data[key].id);
                }
            }
        }, 
        dataSearch() { 
            var data_search = this.banking_accountSearch;   
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
            
            axios.get('/api/v1/mt/banking-accounts?'+ queryString)
                .then( resp => {  
                    app.preloader = false; 
                    app.banking_accounts = resp.data.banking_accounts;    

                    app.bankingProviders = resp.data.banking_providers;  
                    if(app.banking_accounts.data.length == 0) {                                 
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
            this.banking_account = this.banking_accountConst; 
        }, 
        saveForm() { 
            document.getElementById('createModal').style.display = 'none';
            var app = this;
            var newService = app.banking_account;
            if ( this.formType ) {
                axios.post('/api/v1/mt/banking-accounts', newService)
                    .then( resp => {  
                        this.banking_account = this.banking_accountConst;
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                axios.patch('/api/v1/mt/banking-accounts/' + newService.id, newService)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm(banking_account) {
            this.formType = false;
            this.banking_account = banking_account;  
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/mt/banking-accounts/' + id)
                    .then( resp => {
                        app.banking_accounts.data.splice(index, 1); 
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
                axios.delete('/api/v1/mt/banking-accounts/' + selectedItem)
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