<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Card Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body"> 

            <!-- Modal Create-->
            <div v-can="'card-create'" class="modal fade" id="createModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">  {{ (formType) ? 'New' : 'Update' }} Card</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">
                                    <div class="col-md-6 mb-3">
                                        <label for="service_id">Service</label> 
                                        <multiselect v-model="card.service_id" :options="allServices" :preserve-search="true" placeholder="Select Service" label="name" track-by="name" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-md-6 mb-3 --> 
    
                                    <div class="col-md-6 mb-3">
                                        <label for="bundle_name">Bundle Name</label>
                                        <input type="text" class="form-control" id="bundle_name" v-model="card.bundle_name">
                                    </div><!--  /.col-md-6 mb-3 -->  

                                    <div class="col-md-12 mb-3">
                                        <label for="amount">Amount</label>
                                        <input type="text" class="form-control" id="amount" v-model="card.amount">
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-12 mb-3" v-if="formType">
                                        <label for="total">How Many</label>
                                        <input type="text" class="form-control" id="total" v-model="card.total">
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

                                    <div class="col-12 mb-2"> 
                                        <select class="form-control" v-model="perPage">
                                            <option v-for="option in perPageOptions" v-bind:value="option.value">
                                                {{ option.text }}
                                            </option>
                                        </select>  
                                    </div><!--  /.col-12 mb-2 -->
        
                                    <div class="col-12 mb-2">
                                        <label for="search-title">Text</label>
                                        <input type="text" class="form-control" id="search-title" v-model="cardSearch.title">
                                    </div><!--  /.col-12 mb-2 -->

                                    <div class="col-12 mb-2">
                                        <label for="search-content">Content</label>
                                        <input type="text" class="form-control" id="search-content" v-model="cardSearch.content">
                                    </div><!--  /.col-12 mb-2 --> 
        
                                    <div class="col-12 mb-2"> 
                                        <date-time-picker v-model="cardSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-2 --> 

                                    <div class="col-12 mb-2"> 
                                        <date-time-picker placeholder="Date To" v-model="cardSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-2 -->  
                                        
                                    <div class="col-12 mb-2"> 
                                        <button class="btn btn-primary btn-sm" type="submit">Search</button>
                                        <button class="btn btn-dark float-right btn-sm" type="reset">Reset</button>
                                    </div><!--  /.col-12 mb-2 --> 
            
                                </div><!--  /.form-row -->  
                            </div><!--  /.modal-body --> 
                        </form>
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal search -->

            <div class="table-actions"> 
                <button v-can="'card-create'" type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> Card
                </button> 

                <button v-can="'card-delete'" v-if="selected.length" class="btn btn-sm btn-danger " v-on:click="deleteSelected()"><i class="icon-trash-empty"></i> Delete Selected</button>

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">Search</span>
                </button>

            </div><!--  /.table-actions -->

            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr>
                            <th style="width: 20px;"><input type="checkbox" id="check-all" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all">Service</label></th>
                            <th>Bundle Name</th> 
                            <th>Amount</th>    
                            <th>Actions</th> 
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="card, index in cards.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+card.id" :value="card.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+card.id">{{ card.service_id.name }}</label></td>
                            <td>{{ card.bundle_name }}</td> 
                            <td>{{ card.amount }}</td> 
                            <td>
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                    <a v-can="'card-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(card)" data-toggle="modal" data-target="#createModal">
                                       Edit 
                                    </a>
                                    <a v-can="'card-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(card.id, index)">
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
                            <th><label for="check-all-bottom">Service</label></th>
                            <th>Bundle Name</th> 
                            <th>Amount</th>  
                            <th>Actions</th> 
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="cards" :limit="2" @pagination-change-page="getLists"></pagination> 
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
            card: { 
                service_id: '',
                bundle_name: '',
                amount: '',  
                total: '',  
            }, 
            cardSearch: {
                title: '',
                content: '',
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            cards: {},  
            allServices: [], 
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
                for (let key in this.cards.data) {
                    this.selected.push(this.cards.data[key].id);
                }
            }
        }, 
        dataSearch() { 
            var data_search = this.cardSearch;   
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
            
            axios.get('/api/v1/mt/cards?'+ queryString)
                .then( resp => {  
                    app.preloader = false;
                    
                    app.cards = resp.data.cards;  
                    app.allServices = resp.data.services;
                    if(app.cards.data.length == 0) {                                 
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
            var emptyForm = {};
            for (let key in this.card ) {
                emptyForm[ key ] = '';
            }  
            this.card = emptyForm;  
        }, 
        saveForm() { 
            document.getElementById('createModal').style.display = 'none';
            var app = this;
            var newCard = app.card;
            if ( this.formType ) {
                axios.post('/api/v1/mt/cards', newCard)
                    .then( resp => {  
                        app.$store.commit('nullForm', app.card); 
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                axios.patch('/api/v1/mt/cards/' + newCard.id, newCard)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm(card) {
            this.formType = false;
            this.card = card;
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/mt/cards/' + id)
                    .then( resp => {
                        app.cards.data.splice(index, 1); 
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
                axios.delete('/api/v1/mt/cards/' + selectedItem)
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