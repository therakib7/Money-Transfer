<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Sim Balance Live Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body"> 

            <!-- Modal Create-->
            <div class="modal fade" id="createModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Check Sim Live Balance</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">
                                    <div class="col-md-12 mb-3 outline-group">
                                        <label class="o-s-l">Sim Numbers</label>
                                        <multiselect v-model="simbalance.sim_numbers" :options="sim_number_lists" :custom-label="customLabel" selectLabel="" deselectLabel="" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" label="number" track-by="number" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span class="custom__tag">
                                                    <span>{{ props.option.number }} - {{ props.option.provider_id.name }} - {{ props.option.sim_id.type }}</span>
                                                    <span @click="props.remove(props.option)">x</span> 
                                                </span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-md-12 mb-3 -->  
     
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button class="btn btn-primary" type="submit">
                                Check Balance
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
                                        <date-time-picker v-model="simbalanceSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="simbalanceSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->   

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="simbalanceSearch.order_by" >
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

                <button type="button" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> Check Balance
                </button> 

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">Search</span>
                </button>

            </div><!--  /.table-actions -->

            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr>
                            <th>Provider</th>    
                            <th>Number</th> 
                            <th>Type</th>    
                            <th>Balance</th>    
                            <th>Date</th>    
                        </tr>
                    </thead>
                    <tbody>  
                        <tr  v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                                                
                        <tr v-for="simbalance, index in simbalances.data"> 
                            <td>{{ simbalance.provider_id.name }}</td>    
                            <td>{{ simbalance.number }}</td>    
                            <td class="text-capitalize">{{ simbalance.sim_id.type }}</td>    
                            <td>{{ simbalance.balance }}</td>  
                            <td>{{ simbalance.updated_at | moment("DD-MM-YYYY, h:mm a") }}</td>  
                        </tr>

                        <template v-if="noData"><tr class="bg-white" v-html="noData"></tr></template>
                       
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Provider</th>  
                            <th>Number</th> 
                            <th>Type</th>  
                            <th>Balance</th> 
                            <th>Date</th>  
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="simbalances" :limit="2" @pagination-change-page="getLists"></pagination> 
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
            simbalance: { 
                sim_numbers: [],  
            }, 
            sim_number_lists: [],
            simbalanceSearch: { 
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            simbalances: {}, 
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
        'simbalance.sim_id': function (val) { 
            var simProvider = [];
            for (let key in val.providers) { 
                var provider_id = [val.providers[key].provider_id]; 
                var filteredArray = this.allProvidersCons.filter(function(itm) {
                    return provider_id.indexOf(itm.id) > -1;
                });
                simProvider.push(filteredArray[0]);
            } 
            this.allProviders = simProvider;
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
        customLabel({ number = '', provider_id = '', sim_id = '' }) { 
            return `${number} — ${provider_id.name} — ${sim_id.type}`;
        },
        dataSearch() { 
            var data_search = this.simbalanceSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) {
                    query[key] = ( key != 'provider_id' && key != 'sim_id') ? data_search[key] : data_search[key]['id']; 
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
            
            axios.get('/api/v1/mt/simbalances?'+ queryString)
                .then( resp => {  
                    app.preloader = false;
                    app.simbalances = resp.data.simbalances; 

                    app.sim_number_lists = resp.data.simbalances.data; 

                    if(app.simbalances.data.length == 0) {                                 
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
            var newSimBalance = app.simbalance;
            axios.post('/api/v1/mt/simbalances', newSimBalance)
                    .then( resp => {  
                        app.$store.commit('nullForm', app.simbalance); 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
        }, 
    } //methods
} //export default
</script>