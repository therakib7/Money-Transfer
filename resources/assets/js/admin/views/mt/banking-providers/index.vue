<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Banking Provider Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body">  
            
            <media id="logoSmall" @select-image="logoSmallInsert"></media>
            <media id="logoBig" @select-image="logoBigInsert"></media>

            <!-- Modal Create-->
            <div v-can="'banking-provider-create'" class="modal fade" id="createModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">  {{ (formType) ? 'New' : 'Update' }} Banking Provider</h5>
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
                                          <input type="checkbox" v-model="banking_provider.status">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="name" v-model="banking_provider.name">
                                        <label for="name">Name</label>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-4 mb-3"> 
                                        <label class="o-s-l">Type</label>
                                        <select class="form-control" id="type" v-model="banking_provider.type">
                                            <option :value="null">Bank</option>
                                            <option value="1">Mobile Banking</option>
                                        </select>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-4 mb-3 outline-group">
                                        <input placeholder=" " type="number" class="form-control outline" id="order" v-model="banking_provider.order">
                                        <label for="order">Serial</label>
                                    </div><!--  /.col-md-4 mb-3 -->   


                                    <div class="col-md-6 mb-3">
                                        <div v-if="!banking_provider.logo_small">
                                            <span class="btn btn-sm bg-success" data-toggle="modal" data-target="#logoSmall">
                                                Insert Small Logo
                                            </span>
                                        </div>
                                        <div v-else>
                                            <img :src="banking_provider.logo_small_src" class="upload-img rounded-circle sm-img"/>
                                            <span class="btn btn-sm btn-danger sm-btn" @click="logoSmallRemove()">x</span>
                                        </div>
                                    </div><!--  /.col-md-6 --> 

                                    <div class="col-md-6 mb-3 mb-90">
                                        <div v-if="!banking_provider.logo_big">
                                            <span class="btn btn-sm bg-success" data-toggle="modal" data-target="#logoBig">
                                                Insert Big Logo
                                            </span>
                                        </div>
                                        <div v-else>
                                            <img :src="banking_provider.logo_big_src" class="upload-img rounded-circle"/>
                                            <span class="btn btn-sm btn-danger h-i" @click="logoBigRemove()">x</span>
                                        </div>
                                    </div><!--  /.col-md-6 -->  
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
                                        <date-time-picker v-model="banking_providerSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="banking_providerSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="banking_providerSearch.order_by" >
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
                <button v-can="'banking-provider-create'" type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> Banking Provider
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
                            <th><label for="check-all">Name</label></th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Serial</th>  
                            <th>Actions</th>  
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="banking_provider, index in banking_providers.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+banking_provider.id" :value="banking_provider.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+banking_provider.id">{{ banking_provider.name }}</label></td>
                            <td> 
                                <template v-if="banking_provider.status">
                                    <span class="bg-success active-status">Active</span>
                                </template>
                                <template v-else>
                                    <span class="bg-danger active-status">Inactive</span>
                                </template>
                            </td>    
                            <td>{{ ( banking_provider.type ) ? 'Mobile Banking' : 'Bank' }}</td>        
                            <td>{{ banking_provider.order }}</td>        
                            <td>
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                    <a v-can="'banking-provider-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(banking_provider)" data-toggle="modal" data-target="#createModal">
                                       Edit 
                                    </a>
                                    <a v-can="'banking-provider-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(banking_provider.id, index)">
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
                            <th><label for="check-all-bottom">Name</label></th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Serial</th> 
                            <th>Actions</th> 
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="banking_providers" :limit="2" @pagination-change-page="getLists"></pagination> 
            </div><!--  /.table-actions -->
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script>   
export default {
    components: {   
        'media': () => import('@components/media/index.vue'),
        'date-time-picker': () => import('vue-vanilla-datetime-picker'), 
    },
    data() {
        return {    
            dateOptions: this.$store.state.dateOptions, 
            formType: false,
            banking_provider: { 
                status: 1,
                name: null,
                type: null, 
                order: null, 
                logo_small: null, 
                logo_small_src: null, 
                logo_big: null, 
                logo_big_src: null,  
            }, 
            banking_providerConst: { 
                status: 1,
                name: null,
                type: null, 
                order: null, 
                logo_small: null, 
                logo_small_src: null, 
                logo_big: null, 
                logo_big_src: null,   
            },  
            banking_providerSearch: { 
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            banking_providers: {},  
            banking_providerCats: [], 
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
        afterComplete(file) { 
            this.getMediaLists(); 
        },
        logoSmallInsert(data) {   
            this.banking_provider.logo_small = data.id;
            this.banking_provider.logo_small_src = '/uploads/imgs/'+data.resized_name;            
        }, 
        logoBigInsert(data) {  
            this.banking_provider.logo_big = data.id;
            this.banking_provider.logo_big_src = '/uploads/imgs/'+data.resized_name; 
        }, 
        logoSmallRemove(data) {   
            this.banking_provider.logo_small = null;
            this.banking_provider.logo_small_src = null;           
        }, 
        logoBigRemove(data) {  
            this.banking_provider.logo_big = null;
            this.banking_provider.logo_big_src = null;
        },  
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.banking_providers.data) {
                    this.selected.push(this.banking_providers.data[key].id);
                }
            }
        }, 
        dataSearch() { 
            var data_search = this.banking_providerSearch;   
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
            
            axios.get('/api/v1/mt/banking-providers?'+ queryString)
                .then( resp => {  
                    app.preloader = false; 
                    app.banking_providers = resp.data.banking_providers;    
                    if ( app.banking_providers.logo_small_src ) {
                        app.banking_providers.logo_small_src = '/uploads/imgs/'+app.banking_providers.logo_small_src.filename; 
                    }
                    if ( app.banking_providers.logo_big_src ) {
                        app.banking_providers.logo_big_src = '/uploads/imgs/'+app.banking_providers.logo_big_src.filename; 
                    }
  
                    if(app.banking_providers.data.length == 0) {                                 
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
            this.banking_provider = this.banking_providerConst; 
        }, 
        saveForm() { 
            document.getElementById('createModal').style.display = 'none';
            var app = this;
            var newProvider = app.banking_provider;
            if ( this.formType ) {
                axios.post('/api/v1/mt/banking-providers', newProvider)
                    .then( resp => {  
                        this.banking_provider = this.banking_providerConst;
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                axios.patch('/api/v1/mt/banking-providers/' + newProvider.id, newProvider)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm(banking_provider) {
            this.formType = false;
            this.banking_provider = banking_provider; 
            if ( banking_provider.logo_small_src ) {
                this.banking_provider.logo_small_src = '/uploads/imgs/'+banking_provider.logo_small_src.resized_name; 
            }
            if ( banking_provider.logo_big_src ) {
                this.banking_provider.logo_big_src = '/uploads/imgs/'+banking_provider.logo_big_src.resized_name; 
            }
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/mt/banking-providers/' + id)
                    .then( resp => {
                        app.banking_providers.data.splice(index, 1); 
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
                axios.delete('/api/v1/mt/banking-providers/' + selectedItem)
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