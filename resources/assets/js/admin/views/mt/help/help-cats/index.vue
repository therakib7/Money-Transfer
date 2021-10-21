<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Help Category Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body">

            <!-- Modal Create-->
            <div v-can="'provider-taxonomy-create'" class="modal fade" id="createModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ (formType) ? 'New' : 'Update' }} Help Category</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row"> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="Name" v-model="taxonomy.name">
                                        <label for="Name">Name</label>
                                    </div><!--  /.col-12 mb-3 -->

    
                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="slug" v-model="taxonomy.slug">
                                        <label for="slug">Slug</label>
                                    </div><!--  /.col-12 mb-3 -->   
    
 
                                    <div class="col-12 mb-3"  v-if="allTaxonomies.length">
                                        <label for="parent_id" class="o-s-l">Parent Help Category</label> 
                                        <multiselect v-model="taxonomy.parent_id" :options="allTaxonomies" :preserve-search="true" placeholder="" selectLabel="" deselectLabel="" label="name" track-by="name" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect>  
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Category Roles</label>
                                        <multiselect v-model="taxonomy.roles" :options="roles" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" label="name" track-by="name" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span class="custom__tag">
                                                    <span>{{ props.option.name }}</span>
                                                    <span @click="props.remove(props.option)">x</span> 
                                                </span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3"> 
                                        <input placeholder=" " type="number" class="form-control outline" id="order" v-model="taxonomy.order">
                                        <label for="order">Serial</label>
                                    </div><!--  /.col-12 mb-3 --> 
     
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button class="btn btn-primary" type="submit">{{ (formType) ? 'Create' : 'Update' }}</button>
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
         
                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-name" v-model="taxonomySearch.name">
                                        <label for="search-name">Name</label>
                                    </div><!--  /.col-12 mb-3 --> 
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="taxonomySearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="taxonomySearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="taxonomySearch.order_by" >
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
            </div><!--  /.modal -->

            <div class="table-actions">
                <button v-can="'provider-taxonomy-create'" type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> Help Category
                </button> 

                <button v-can="'provider-taxonomy-delete'" v-if="selected.length" class="btn btn-sm btn-danger " v-on:click="deleteSelected()"><i class="icon-trash-empty"></i> Delete Selected</button>

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
                            <th>Slug</th>
                            <th>Roles</th>
                            <th>Serial</th>  
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>  
                        <tr  v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="taxonomy, index in taxonomies.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+taxonomy.id" :value="taxonomy.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+taxonomy.id"><span v-html="dash_icon(taxonomy.depth)"></span> {{ taxonomy.name }}</label></td> 
                            <td>{{ taxonomy.slug }}</td>    
                            <td class="taxonomies">
                                <template v-if="taxonomy.roles.length">
                                    <span v-for="role in taxonomy.roles">{{role.name}}</span> 
                                </template>
                                <template v-else>
                                    All
                                </template>
                            </td>  
                            <td>{{ taxonomy.order }}</td> 
                            <td>
                                <div class="dropdown action-items">
                                    <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="icon-ellipsis"></i>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                        <a v-can="'provider-taxonomy-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(taxonomy)" data-toggle="modal" data-target="#createModal">
                                           Edit 
                                        </a>
                                        <a v-can="'provider-taxonomy-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(taxonomy.id, index)">
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
                            <th>Slug</th>
                            <th>Roles</th>
                            <th>Serial</th> 
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="taxonomies" :limit="2" @pagination-change-page="getLists"></pagination> 
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
            taxonomy: { 
                name: '',
                slug: '',
                roles: [],
                parent_id: null,
                order: null, 
            },
            taxonomyConst: { 
                name: '',
                slug: '',
                roles: [],
                parent_id: null,
                order: null, 
            }, 
            taxonomySearch: {
                name: '', 
                date_from: '',  
                date_to: '',     
                order_by: '',  
            }, 
            taxonomies: {}, 
            roles: [], 
            allTaxonomies: [], 
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
        dash_icon( depth ) {  
            return "<i class='sub-taxonomy icon-minus'></i>".repeat(depth);
        },
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let taxonomy in this.taxonomies.data) {
                    this.selected.push(this.taxonomies.data[taxonomy].id);
                }
            }
        }, 
        dataSearch() { 
            var data_search = this.taxonomySearch;   
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
        getLists( page = 1, click = false ) {
            var app = this;    
                         
            let per_page = this.$route.query.per_page;   
            
            let current_page = (click) ? page : this.$route.query.page ;
            if ( click ) {
                this.$router.push( { path: document.location.search, query: { page: current_page, per_page: per_page } } );  
            }

            let allQuery = this.$route.query;

            var queryString = Object.keys(allQuery).map(key => key + '=' + allQuery[key]).join('&'); 
                queryString += '&role=1';
            axios.get('/api/v1/mt/taxonomies/help-category?'+ queryString)
                .then(function (resp) {
                    app.preloader = false;

                    app.taxonomies = resp.data; 
                    app.allTaxonomies = resp.data.data_all; 
                    app.roles = resp.data.roles; 

                    if(app.taxonomies.data.length == 0) {                                 
                        app.noData = app.$store.state.noData;
                    } else {
                        app.noData = '';
                    }
                })
                .catch(function (resp) {
                    app.$store.commit('errorMessages', resp); 
                });
        },
        newForm() { 
            this.formType = true;
            this.taxonomy = this.taxonomyConst; 
        }, 
        saveForm() { 
            var app = this; 
            this.$set( app.taxonomy, 'taxonomy', 'help-category' );
            var newTaxonomy = app.taxonomy; 

            if ( !newTaxonomy.roles.length ) {  
                alert('Select Role');  
                return;         
            }
            document.getElementById('createModal').style.display = 'none'; 

            if ( this.formType ) {
                axios.post('/api/v1/mt/taxonomies', newTaxonomy)
                    .then( resp => {  
                        this.taxonomy = this.taxonomyConst;
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                axios.patch('/api/v1/mt/taxonomies/' + newTaxonomy.id, newTaxonomy)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm(taxonomy) {
            this.formType = false;
            var id = [taxonomy.parent_id]; 
            var parentTax = this.allTaxonomies.filter(function(itm) {
                return id.indexOf(itm.id) > -1;
            });  

            this.taxonomy = taxonomy;
            if ( parentTax.length ) {  
                this.taxonomy.parent_id = parentTax[0];           
            }

            if ( !this.taxonomy.roles.length ) {  
                this.taxonomy.roles = [ { id: 0, name: 'All' } ];           
            }
        },  
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/mt/taxonomies/' + id)
                    .then(function (resp) {
                        app.taxonomies.data.splice(index, 1);
                        app.$store.commit('submitMsg', 'delete'); 
                    })
                    .catch(function (resp) {
                        app.$store.commit('errorMessages', resp);
                    });
            }
        },
        deleteSelected() { 
            var app = this;
            if( app.selected.length == 0 ) {
                app.$store.commit('noSeletedMsg');
                return;
            }
            if (confirm(app.$store.state.confirmDel)) {
                var selectedItem = this.selected.toString();
                axios.delete('/api/v1/mt/taxonomies/' + selectedItem)
                    .then(function (resp) {
                        app.$store.commit('submitMsg', 'selectedDelete');  
                        app.selectAll = false;
                        app.selected = [];
                        app.getLists(); 
                    })
                    .catch(function (resp) {
                        app.$store.commit('errorMessages', resp);
                    });
            }
        }, 
    } //methods
} //export default
</script>