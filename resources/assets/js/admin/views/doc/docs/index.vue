<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Document Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body">  

            <!-- Modal Create-->
            <div v-can="'doc-create'" class="modal fade" id="createModal">
                <div class="modal-dialog modal-lg big-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">  {{ (formType) ? 'New' : 'Update' }} Document</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">
                                    <div class="col-12 mb-3"> 
                                        <label for="status">Status</label> 
                                        <label class="switch">
                                          <input type="checkbox" v-model="doc.status">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-4 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="title" v-model="doc.title">
                                        <label for="title">Title</label>
                                    </div><!--  /.col-md-4 mb-4 --> 

                                    <div class="col-12 mb-4">
                                        <tinymce id="d1" :other_options="tinyOptions" v-model="doc.content"></tinymce> 
                                    </div><!--  /.col-12 mb-4 --> 
    
                                    <div class="col-md-6 mb-4"> 
                                        <label class="o-s-l">Document Category</label>
                                        <multiselect v-model="doc.categories" :options="docCats" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" label="name" track-by="name" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span class="custom__tag">
                                                    <span>{{ props.option.name }}</span>
                                                    <span @click="props.remove(props.option)">x</span> 
                                                </span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-md-6 mb-4 --> 

                                    <div class="col-md-6 mb-3"> 
                                        <input placeholder=" " type="number" class="form-control outline" id="order" v-model="doc.order">
                                        <label for="order">Serial</label>
                                    </div><!--  /.col-md-6 mb-3 --> 
                                     
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

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-title" v-model="docSearch.title">
                                        <label for="search-title">Title</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3">  
                                        <label class="o-s-l">Select Category</label>
                                        <multiselect v-model="docSearch.category" :options="docCats" deselect-label="" select-label="" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" label="name" track-by="name" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span class="custom__tag">
                                                    <span>{{ props.option.name }}</span>
                                                    <span @click="props.remove(props.option)">x</span> 
                                                </span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-12 mb-3 --> 
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="docSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="docSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="docSearch.order_by" >
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
                <button v-can="'doc-create'" type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> Document
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
                            <th><label for="check-all">Title</label></th>
                            <th>Category</th>
                            <th>Status</th>
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
                        
                        <tr v-for="doc, index in docs.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+doc.id" :value="doc.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+doc.id">{{ doc.title }}</label></td> 
                            <td class="taxonomies">
                                <template v-if="doc.categories">
                                    <span v-for="category in doc.categories">{{category.name}}</span> 
                                </template>
                            </td> 
                            <td> 
                                <template v-if="doc.status">
                                    <span class="bg-success active-status">Active</span>
                                </template>
                                <template v-else>
                                    <span class="bg-danger active-status">Inactive</span>
                                </template>
                            </td>  
                            <td>{{ doc.order }}</td>    
                            <td>
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                    <a v-can="'doc-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(doc)" data-toggle="modal" data-target="#createModal">
                                       Edit 
                                    </a>
                                    <a v-can="'doc-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(doc.id, index)">
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
                            <th><label for="check-all-bottom">Title</label></th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Serial</th>   
                            <th>Actions</th> 
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="docs" :limit="2" @pagination-change-page="getLists"></pagination> 
            </div><!--  /.table-actions -->
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script>   
export default { 
    components: {   
        'date-time-picker': () => import('vue-vanilla-datetime-picker'), 
        'tinymce': () => import('vue-tinymce-editor'),
    },
    data() {
        return {    
            dateOptions: this.$store.state.dateOptions, 
            tinyOptions: {
                'height': 300
            },
            formType: false,
            user_type: 'basic',
            doc_type: 'video',
            doc: { 
                status: 1,
                title: '',
                content: '', 
                categories: [], 
                order: null,
            }, 
            docConst: { 
                status: 1,
                title: '',
                content: '',  
                categories: [], 
                order: null,
            },  
            docSearch: { 
                title: '',
                category: [],
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            docs: {},  
            docCats: [], 
            roles: [], 
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
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.docs.data) {
                    this.selected.push(this.docs.data[key].id);
                }
            }
        }, 
        dataSearch() { 
            var data_search = this.docSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) {
                    if ( key == 'category' ) {
                        if ( data_search[key].length ) {
                            let cat_ids = data_search[key].map(function (el) { return el.id; });
                            query[key] = cat_ids.join();  
                        } else {
                            query[key] = ''; 
                        }
                    } else { 
                        query[key] = data_search[key]; 
                    }                    
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
            
            axios.get('/api/v1/doc/docs?'+ queryString)
                .then( resp => {  
                    app.preloader = false; 
                    app.docs = resp.data.docs;    
                    app.docCats = resp.data.doccats;   

                    if(app.docs.data.length == 0) {                                 
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
            this.doc = this.docConst; 
        }, 
        saveForm() { 
            var app = this;
            var newDoc = app.doc;
 
            document.getElementById('createModal').style.display = 'none';

            if ( this.formType ) {
                axios.post('/api/v1/doc/docs', newDoc)
                    .then( resp => {  
                        this.doc = this.docConst;
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                axios.patch('/api/v1/doc/docs/' + newDoc.id, newDoc)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm(doc) {
            this.formType = false;
            this.doc = doc;  

            //this is to fix error of tinymce = Error in callback for watcher "value": "TypeError: Cannot read property 'replace' of null"
            if ( !this.doc.content ) this.doc.content = ''; 
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/doc/docs/' + id)
                    .then( resp => {
                        app.docs.data.splice(index, 1); 
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
                axios.delete('/api/v1/doc/docs/' + selectedItem)
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
 