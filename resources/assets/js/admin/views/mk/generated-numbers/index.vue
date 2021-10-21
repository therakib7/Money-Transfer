<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Generated Number Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body">  

            <!-- Modal Create -->
            <div v-can="'provider-create'" class="modal fade" id="createModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">  New Generate Number</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body">  
                                <div class="form-row">    
                                    <div class="col-12 mb-3"> 
                                        <label for="type" class="o-s-l">Provider</label>
                                        <multiselect v-model="generated_number_new.provider_id" selectLabel="" deselectLabel="" :options="allProviders" :preserve-search="true" label="name" track-by="name" :preselect-first="true"> 
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="number" class="form-control outline" id="total" v-model="generated_number_new.total">
                                        <label for="total">Total</label>
                                        <small>Give value 10000, 20000 etc</small>
                                    </div><!--  /.col-md-4 mb-3 --> 
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button class="btn btn-primary" type="submit">
                                Generate
                                </button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal --> 

            <!-- Modal Edit -->
            <div v-can="'provider-create'" class="modal fade" id="editModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">  Update Generated Number</h5>
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
                                          <input type="checkbox" v-model="generated_number.status">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3"> 
                                        <label for="type" class="o-s-l">Provider</label>
                                        <multiselect v-model="generated_number.provider_id" selectLabel="" deselectLabel="" :options="allProviders" :preserve-search="true" label="name" track-by="name" :preselect-first="true"> 
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="name" v-model="generated_number.name">
                                        <label for="name">Name</label>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="number" v-model="generated_number.number">
                                        <label for="number">Number</label>
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

            <!-- Modal Create -->
            <div v-can="'provider-create'" class="modal fade" id="downloadModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"> Download Generated Number</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="downloadForm()">
                            <div class="modal-body">  
                                <div class="form-row">     

                                    <div class="col-12 mb-3"> 
                                        <label for="type" class="o-s-l">Provider</label>
                                        <multiselect v-model="download_generated_number.provider_id" selectLabel="" deselectLabel="" :options="allProviders" :preserve-search="true" label="name" track-by="name" :preselect-first="true"> 
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                            </template>
                                        </multiselect>
                                        <template v-if="download_generated_number.provider_id">
                                            ID lenth is {{download_generated_number.provider_id.length}} digit
                                        </template>
                                    </div><!--  /.col-md-4 mb-3 --> 
                                    
                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="number" class="form-control outline" id="from" v-model="download_generated_number.from">
                                        <label for="from">From ID</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="number" class="form-control outline" id="to" v-model="download_generated_number.to">
                                        <label for="to">To ID</label>
                                    </div><!--  /.col-md-4 mb-3 --> 
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button class="btn btn-success" type="submit">
                                Download
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
                                        <label class="o-s-l">Select Provider</label>
                                        <multiselect v-model="generated_numberSearch.provider_id" :options="allProviders" deselect-label="" select-label="" :preserve-search="true" label="name" track-by="name" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span class="custom__tag">
                                                    <span>{{ props.option.name }}</span>
                                                    <span @click="props.remove(props.option)">x</span> 
                                                </span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-12 mb-3 -->
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="generated_numberSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="generated_numberSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="generated_numberSearch.order_by" >
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
                <button v-can="'provider-create'" type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> Generate Number
                </button> 

                <button v-if="selected.length" class="btn btn-sm btn-danger " v-on:click="deleteSelected()"><i class="icon-trash-empty"></i> Delete Selected</button>

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">Search</span>
                </button>

                <button type="button" class="btn btn-sm btn-info float-right mr-2" data-toggle="modal" data-target="#downloadModal">
                    <i class="dicon-search"></i> <span class="d-none d-sm-inline">Download</span>
                </button>

            </div><!--  /.table-actions -->

            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr>
                            <th style="width: 20px;"><input type="checkbox" id="check-all" v-model="selectAll" @click="select"/></th>
                            <th>ID</th>
                            <th><label for="check-all">Provider</label></th>
                            <th>Status</th>
                            <th>Name</th>  
                            <th>Number</th>   
                            <th>Actions</th>  
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="generated_number, index in generated_numbers.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+generated_number.id" :value="generated_number.id" v-model="selected"/></td>
                            <td>{{generated_number.id}}</td>
                            <td><label v-bind:for="'checkbox-id-'+generated_number.id">{{ generated_number.provider_id.name }}</label></td>
                            <td> 
                                <template v-if="generated_number.status">
                                    <span class="bg-success active-status">Active</span>
                                </template>
                                <template v-else>
                                    <span class="bg-danger active-status">Inactive</span>
                                </template>
                            </td>
                            <td>{{ generated_number.name }}</td>   
                            <td>{{ generated_number.prefix+generated_number.number }}</td>        
                            <td>
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                    <a v-can="'provider-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(generated_number)" data-toggle="modal" data-target="#editModal">
                                       Edit 
                                    </a>
                                    <a v-can="'provider-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(generated_number.id, index)">
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
                            <th>ID</th>
                            <th><label for="check-all-bottom">Provider</label></th>
                            <th>Status</th>
                            <th>Name</th>   
                            <th>Number</th>       
                            <th>Actions</th> 
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">    
                <pagination-simple :data="generated_numbers" @pagination-change-page="getLists"></pagination-simple> 
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
            generated_number_new: {  
                provider_id: null,
                total: '',  
            }, 
            generated_number: { 
                status: 1,
                provider_id: null,
                name: '', 
                number: '',  
            }, 
            generated_numberConst: { 
                status: 1,
                provider_id: null,
                name: '', 
                number: '', 
            },  
            download_generated_number: {  
                provider_id: null,
                from: '',  
                to: '',  
            },
            generated_numberSearch: { 
                provider_id: '', 
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            generated_numbers: {},  
            allProviders: [], 
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
                for (let key in this.generated_numbers.data) {
                    this.selected.push(this.generated_numbers.data[key].id);
                }
            }
        },  
        dataSearch() { 
            var data_search = this.generated_numberSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) { 
                    query[key] = ( key != 'provider_id' ) ? data_search[key] : data_search[key]['id'];  
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
            
            axios.get('/api/v1/mk/generated-numbers?'+ queryString)
                .then( resp => {  
                    app.preloader = false; 
                    app.generated_numbers = resp.data.generated_numbers;    

                    app.allProviders = resp.data.providers;  

                    if(app.generated_numbers.data.length == 0) {                                 
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
            this.generated_number = this.generated_numberConst; 
        }, 
        saveForm() { 
            var app = this;
            if ( this.formType ) {
            document.getElementById('createModal').style.display = 'none';
                //for (var i = 1; i <= 500; i++) {  
                    axios.post('/api/v1/mk/generated-numbers', app.generated_number_new)
                        .then( resp => {  
                            this.generated_number = this.generated_numberConst;
                            app.$store.commit('submitMsg', 'add');  
                            //app.getLists(); 
                        })
                        .catch( resp => {  
                            app.$store.commit('errorMessages', resp); 
                        });
                //}
            } else {
             document.getElementById('editModal').classList.toggle('show');
                var editService = app.generated_number;
                axios.patch('/api/v1/mk/generated-numbers/' + editService.id, editService)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        },
        downloadForm() { 
            var app = this; 
            document.getElementById('downloadModal').classList.toggle('show');
            axios.post('/api/v1/mk/download-numbers', app.download_generated_number)
                .then( resp => {   
                    app.$store.commit('submitMsg', 'add');  
                })
                .catch( resp => {  
                    app.$store.commit('errorMessages', resp); 
                });
        },  
        editForm(generated_number) {
            this.formType = false;
            this.generated_number = generated_number;   
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/mk/generated-numbers/' + id)
                    .then( resp => {
                        app.generated_numbers.data.splice(index, 1); 
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
                axios.delete('/api/v1/mk/generated-numbers/' + selectedItem)
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