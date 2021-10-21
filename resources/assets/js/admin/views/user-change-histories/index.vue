<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               User Change History Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body">  
            
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
                                        <select class="form-control" v-model="perPage">
                                            <option v-for="option in perPageOptions" v-bind:value="option.value">
                                                {{ option.text }}
                                            </option>
                                        </select>  
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3">
                                        <multiselect v-model="userchangehistoriesSearch.user_id" :options="accounts" :custom-label="customLabel" :preserve-search="true" placeholder="Search User" selectLabel="" :loading="isLoading" deselectLabel="" :internal-search="false" :searchable="true" label="name" track-by="name" @search-change="asyncFind" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect> 
                                        <small>Search by mobile, email or username</small>
                                    </div><!--  /.col-md-12 mb-3 --> 
        
                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-old" v-model="userchangehistoriesSearch.old">
                                        <label for="search-old">Old Value</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-new" v-model="userchangehistoriesSearch.new">
                                        <label for="search-new">New Value</label>
                                    </div><!--  /.col-12 mb-3 -->  
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="userchangehistoriesSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="userchangehistoriesSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="userchangehistoriesSearch.order_by" >
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

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">Search</span>
                </button>

            </div><!--  /.table-actions -->
 
            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr> 
                            <th>User</th> 
                            <th>Name</th>
                            <th>Key</th> 
                            <th>Old Value</th>
                            <th>New Value</th> 
                            <th>Date</th>     
                        </tr>
                    </thead>
                    <tbody> 
                        <tr  v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>                        
                        
                        <tr v-for="userchangehistory, index in userchangehistories.data">  
                            <td>{{ user( userchangehistory.user ) }}</td> 
                            <td>{{ userchangehistory.user.name }}</td>   
                            <td>{{ keyTitle( userchangehistory.key ) }}</td> 
                            <td>{{ userchangehistory.old }}</td> 
                            <td>{{ userchangehistory.new }}</td> 
                            <td>{{ userchangehistory.created_at | moment("DD-MM-YYYY, h:mm a") }}</td>  
                        </tr>

                        <template v-if="noData"><tr class="bg-white" v-html="noData"></tr></template>
                       
                    </tbody>
                    <tfoot>
                        <tr> 
                            <th>User</th> 
                            <th>Name</th>
                            <th>Key</th> 
                            <th>Old Value</th>
                            <th>New Value</th> 
                            <th>Date</th>    
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="userchangehistories" :limit="2" @pagination-change-page="getLists"></pagination> 
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
            userchangehistoriesSearch: {
                user_id: '', 
                old: '',
                new: '',
                date_from: '',  
                date_to: '',     
                order_by: '',  
            }, 
            accounts: [],
            userchangehistories: {}, 
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
        dataSearch() { 
            var data_search = this.userchangehistoriesSearch;   
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
            if ( user.username ) {
                return user.username;
            } else if ( user.mobile ) {
                return user.mobile;
            } else {
                return user.email;
            }
        }, 
        keyTitle( key ) {
            if ( key == 'nid' ) {
                return 'NID';
            } else if ( key == 'birth_crt' ) {
                return 'Birth CRT';
            } else if ( key == 'passport' ) {
                return 'Passport';
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
            
            axios.get('/api/v1/userchangehistories?'+ queryString)
                .then( resp => {  
                    app.preloader = false;

                    app.userchangehistories = resp.data.userchangehistories;  
                    app.refferalUrl = resp.data.ref_url;  
                    if(app.userchangehistories.data.length == 0) {                                 
                        app.noData = app.$store.state.noData;
                    } else {
                        app.noData = '';
                    }
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        }, 
    } //methods
} //export default
</script>