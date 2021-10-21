<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Sim Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body"> 

            <!-- Modal Create-->
            <div v-can="'sim-create'" class="modal fade" id="createModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">  {{ (formType) ? 'New' : 'Update' }} Sim</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">
                                    <div class="col-md-12 mb-3 outline-group">
                                        <input placeholder=" " type="number" class="form-control outline" id="terminal_id" v-model="sim.terminal_id">
                                        <label for="terminal_id">Terminal ID</label>
                                    </div><!--  /.col-md-12 mb-3 -->

                                    <div class="mt-number-list">
                                        <div class="mt-numbers" v-for="(provider, key) in sim.providers"> 
                                            <div class="mt-title">
                                                Provider: {{ key+1 }}
                                            </div><!--  /.mt-title mb-3 -->
                                            <div class="mt-control"> 
                                                <span class="btn btn-primary btn-sm" @click="addNumber(key)"><i class="icon-plus"></i></span>
                                                <span class="btn btn-danger btn-sm" @click="removeNumber(key)"><i class="icon-minus"></i></span>
                                            </div><!--  /.mt-control mb-3 --> 

                                            <div class="form-row mt-4">
                                                
                                                <div class="col-md-12 mb-3 outline-group">
                                                    <input placeholder=" " type="text" v-on:keyup="numberChange(key)"  class="form-control outline" :id="'sim_number'+key" v-model="provider.number">
                                                    <label :for="'sim_number'+key">Sim Number</label>
                                                </div><!--  /.col-md-12 mb-3 -->    

                                                <div class="col-12 mb-3">
                                                    <label class="o-s-l">Provider</label> 
                                                    <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="provider.provider_id" :options="providers" :preserve-search="true" label="name" track-by="name" :preselect-first="false">
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
                                                </div><!--  /.col-12 mb-3-->

                                                <div class="col-md-12 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'balance_code'+key" v-model="provider.balance_code">
                                                    <label :for="'balance_code'+key">Live Balance Code</label>
                                                </div><!--  /.col-md-12 mb-3 --> 
                                                 
                                            </div><!--  /.form-row --> 
                                        </div><!--  /.mt-numbers -->
                                    </div> <!-- /.mt-number-list -->

                                    <div class="col-md-12 mb-3 mt-3">
                                        <label class="o-s-l">Select Type</label>
                                        <select v-model="sim.type" id="type" class="form-control">
                                            <option value="agent">Agent</option>
                                            <option value="dealer">Dealer</option>
                                        </select>
                                    </div><!--  /.col-md-12 mb-3 -->
     
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
                                        <date-time-picker v-model="simSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="simSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="simSearch.order_by" >
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
                <button v-can="'sim-create'" type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> Sim
                </button> 

                <button v-can="'sim-delete'" v-if="selected.length" class="btn btn-sm btn-danger " v-on:click="deleteSelected()"><i class="icon-trash-empty"></i> Delete Selected</button>

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">Search</span>
                </button>

            </div><!--  /.table-actions -->

            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr>
                            <th style="width: 20px;"><input type="checkbox" id="check-all" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all">Terminal ID</label></th>
                            <th>Number & Provider</th>
                            <th>Type</th>  
                            <th>Actions</th>  
                        </tr>
                    </thead>
                    <tbody> 

                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="sim, index in sims.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+sim.id" :value="sim.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+sim.id">{{ sim.terminal_id }}</label></td>  
                            <td class="taxonomies">
                                <template v-if="sim.providers">
                                    <span v-for="provider in sim.providers"> {{provider.number}} - {{provider.provider_id.name}}</span> 
                                </template>
                            </td> 
                            <td class="text-capitalize">{{ sim.type }}</td>  
                            <td>
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                    <a v-can="'sim-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(sim)" data-toggle="modal" data-target="#createModal">
                                       Edit 
                                    </a>
                                    <a v-can="'sim-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(sim.id, index)">
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
                            <th><label for="check-all-bottom">Terminal ID</label></th>
                            <th>Number & Provider</th>
                            <th>Type</th>
                            <th>Actions</th> 
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="sims" :limit="2" @pagination-change-page="getLists"></pagination> 
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
            sim: { 
                terminal_id: null,
                providers: [
                    { number: null, provider_id: '', balance_code: '' }
                ], 
                type: 'agent',
            }, 
            simConst: { 
                terminal_id: null,
                providers: [
                    { number: null, provider_id: '', balance_code: '' }
                ],
                type: 'agent',
            }, 
            simSearch: { 
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            sims: {}, 
            providers: [], 
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
                for (let key in this.sims.data) {
                    this.selected.push(this.sims.data[key].id);
                }
            }
        },  
        addNumber(index) {
            this.sim.providers.splice(index + 1, 0, { number: null, provider_id: '', balance_code: '' } ); 
        },
        removeNumber(index) {
            if (this.sim.providers.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.sim.providers.splice(index, 1); 
            }
        },
        numberChange(key) { 
            var query = this.sim.providers[key].number; 
            /* Auto select Operator by prefix */
            if ( query.length >= 3 ) {  
                var prefix = query.substring(0, 3);  

                var operator = this.providers.filter(function(itm) {  
                    if ( itm.prefix ) {
                        if ( itm.prefix.indexOf(':') > -1 ) { 
                            let res = itm.prefix.split(":");  
                            for (let key of res ) { 
                                if ( prefix == key ) { 
                                    return true; 
                                }
                            }  
                        } else {
                            return prefix.indexOf(itm.prefix) > -1;
                        }
                    }  
                });   
            
                if ( operator.length ) {
                    this.sim.providers[key].provider_id = operator[0];   
                } 
            } else {
                this.sim.providers[key].provider_id = '';  
            }        
        },
        dataSearch() { 
            var data_search = this.simSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) {
                    query[key] = ( key != 'sim_id') ? data_search[key] : data_search[key]['id']; 
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
            
            axios.get('/api/v1/mt/sims?'+ queryString)
                .then( resp => {  
                    app.preloader = false;
                    
                    app.sims = resp.data.sims;  
                    app.providers = resp.data.providers; 
                    if(app.sims.data.length == 0) {                                 
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
            this.sim = this.simConst; 
        }, 
        saveForm() { 
            document.getElementById('createModal').style.display = 'none';
            var app = this;
            var newSim = app.sim;
            if ( this.formType ) {
                axios.post('/api/v1/mt/sims', newSim)
                    .then( resp => {  
                        this.sim = this.simConst;
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                axios.patch('/api/v1/mt/sims/' + newSim.id, newSim)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm(sim) {
            this.formType = false;
            this.sim = sim;
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/mt/sims/' + id)
                    .then( resp => {
                        app.sims.data.splice(index, 1); 
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
                axios.delete('/api/v1/mt/sims/' + selectedItem)
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