<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Geo Country Stage Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body"> 

            <!-- Modal Create-->
            <div class="modal fade" id="createModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ (formType) ? 'New' : 'Update' }} Geo Country Stage</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">

                                    <div class="col-12">  
                                        <label class="o-s-l">Country</label> 
                                        <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="countrystage.country_id" :options="countries" :preserve-search="true" label="name" track-by="name" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect>  
                                    </div><!--  /.col-12 --> 

                                    <div class="mt-number-list mt-3">  
                                        <div class="mt-numbers" v-for="(countrystage, key) in countrystage.countrystages"> 
                                            <div class="mt-title">
                                                Country Stage {{ key+1 }}
                                            </div><!--  /.mt-title mb-3 -->
                                            <div class="mt-control"> 
                                                <span class="btn btn-primary btn-sm" @click="addRow(key)"><i class="icon-plus"></i></span>
                                                <span class="btn btn-danger btn-sm" @click="removeRow(key)"><i class="icon-minus"></i></span>
                                            </div><!--  /.mt-control mb-3 -->

                                            <div class="form-row mt-4">   

                                                <div class="col-md-6 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'name'+key" v-model="countrystage.name">
                                                    <label :for="'name'+key">Name</label>
                                                </div><!--  /.col-md-6 mb-3 -->

                                                <div class="col-md-6 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'native_name'+key" v-model="countrystage.native_name">
                                                    <label :for="'native_name'+key">Native Name</label>
                                                </div><!--  /.col-md-6 mb-3 --> 
                                                        
                                            </div><!--  /.form-row --> 
                                        </div><!--  /.mt-numbers -->
                                    </div> <!-- /.mt-number-list --> 

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
                                        <label class="o-s-l">Select Status</label>
                                        <select id="search-status" class="form-control" v-model="countrystageSearch.status" >
                                            <option value="">Select Status</option>
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option> 
                                        </select> 
                                    </div><!--  /.col-12 mb-3 --> 
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="countrystageSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="countrystageSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="countrystageSearch.order_by" >
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
                <button type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> Geo Country Stage
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
                            <th>Native Name</th>
                            <th>Stage</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>  
                        <tr  v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="countrystage, index in countrystages.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+countrystage.id" :value="countrystage.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+countrystage.id">
                            {{ countrystage.name }}</label></td>  

                            <td>{{ countrystage.native_name }}</td>
                            <td>
                                <template v-for="value, index in countrystage.countrystages">
                                    <span class="btn btn-sm btn-dark mr-2">
                                    {{ index+1 }}: {{ value.name }}
                                    </span>
                                </template> 
                            </td>
                            <td>
                                <div class="dropdown action-items">
                                    <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="icon-ellipsis"></i>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                        <a href="#" class="dropdown-item" v-on:click.prevent="editForm(countrystage)" data-toggle="modal" data-target="#createModal">
                                           Edit 
                                        </a>
                                        <a href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(countrystage.id, index)">
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
                            <th>Native Name</th>
                            <th>Stage</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->

            <div class="table-actions">   
                <pagination :data="countrystages" :limit="2" @pagination-change-page="getLists"></pagination> 
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
            timeOptions: { 
                format: 'hh:mm a',
                useCurrent: false,
                showClear: true,
                showClose: true,
            },
            formType: false, 
            countrystage: { 
                country_id: null,
                countrystages: [ { name: null, native_name: null } ],
            }, 
            countrystageConst: { 
                country_id: null,
                countrystages: [ { name: null, native_name: null } ],
            }, 
            countrystageSearch: {
                country_id: null,
                countrystage_id: null,
                status: null,
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            countrystages: {}, 
            countries: [],    
            type: this.$route.params.type,
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
            this.$router.push( { path: document.countrystage.search, query: { page: page, per_page: val } } ); 
            this.getLists(); 
        }, 
        '$route.params.type': function (type) { 
            this.type = type;
            this.getLists(); 
        },  
    },
    created() {

        /* Fix tinymce popup modal input typing problem */
        /*$(document).on('focusin', function(e) {
            if ($(e.target).closest(".mce-window").length || $(e.target).closest(".moxman-window").length) {
                e.stopImmediatePropagation();
            }
        });*/

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
        addRow(index) {
            this.countrystage.countrystages.splice(index + 1, 0, { name: null, native_name: null } ); 
        },
        removeRow(index) {
            if (this.countrystage.countrystages.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.countrystage.countrystages.splice(index, 1); 
            } 
        },
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.countrystages.data) {
                    this.selected.push(this.countrystages.data[key].id);
                }
            }
        },  
        dataSearch() { 
            var data_search = this.countrystageSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) { 
                    query[key] = ( key != 'country_id' && key != 'countrystage_id') ? data_search[key] : data_search[key]['id']; 
                } else {
                    if ( this.$route.query[key] ) {
                        query[key] = '';
                    }
                } 
            }   
            this.$router.push( { path: document.countrystage.search, query: query } );   
            this.getLists(); 
        },
        getLists(page = 1, click = false) {

            var app = this;    
            let per_page = this.$route.query.per_page;  
            
            let current_page = (click) ? page : this.$route.query.page ;
            if ( click ) {
                this.$router.push( { path: document.countrystage.search, query: { page: current_page, per_page: per_page } } );  
            }

            let allQuery = this.$route.query;

            var queryString = Object.keys(allQuery).map(key => key + '=' + allQuery[key]).join('&'); 
            
            axios.get('/api/v1/geo/country-stages?'+ queryString)
                .then( resp => {
                    app.preloader = false; 
                    app.countrystages = resp.data.countrystages;  
                    app.countries = resp.data.countries;  
 
                    if(app.countrystages.data.length == 0) {                                 
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
            this.countrystage = this.countrystageConst;
        }, 
        saveForm() { 
            document.getElementById('createModal').style.display = 'none';
            var app = this;
            var newPackage = app.countrystage;
            if ( this.formType ) {
                axios.post('/api/v1/geo/country-stages', newPackage)
                    .then( resp => {  
                        this.countrystage = this.countrystageConst;
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                axios.patch('/api/v1/geo/country-stages/' + newPackage.id, newPackage)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm(countrystage) { 
            this.formType = false;   
            this.countrystage = countrystage;  
            this.countrystage.country_id = { id: countrystage.id, name: countrystage.name }; 
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/geo/country-stages/' + id)
                    .then( resp => {
                        app.countrystages.data.splice(index, 1); 
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
                axios.delete('/api/v1/geo/country-stages/' + selectedItem)
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