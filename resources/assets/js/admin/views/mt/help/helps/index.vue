<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Help Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body">  

            <!-- Modal Create-->
            <div v-can="'help-create'" class="modal fade" id="createModal">
                <div class="modal-dialog modal-lg big-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">  {{ (formType) ? 'New' : 'Update' }} Help</h5>
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
                                          <input type="checkbox" v-model="help.status">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-4 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="title" v-model="help.title">
                                        <label for="title">Title</label>
                                    </div><!--  /.col-md-4 mb-4 -->

                                    <div class="col-12 mb-4 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="slug" v-model="help.slug">
                                        <label for="slug">Slug</label>
                                    </div><!--  /.col-md-4 mb-4 --> 

                                    <div class="col-12 mb-2">
                                        <button type="button" :class="(user_type == 'basic') ? 'btn btn-sm btn-dark mb-1' : 'btn btn-sm btn-light border mb-1'" @click="user_type = 'basic'">Basic User</button>
                                        <button type="button" :class="(user_type == 'medium') ? 'btn btn-sm btn-dark mb-1' : 'btn btn-sm btn-light border mb-1'" @click="user_type = 'medium'">Medium User</button>
                                        <button type="button" :class="(user_type == 'advance') ? 'btn btn-sm btn-dark mb-1' : 'btn btn-sm btn-light border mb-1'" @click="user_type = 'advance'">Advance User</button>   
                                    </div><!--  /.col-12 mb-2 --> 

                                    <div class="col-12 mb-4">  
                                        <button type="button" :class="(help_type == 'video') ? 'btn btn-sm btn-dark mb-1' : 'btn btn-sm btn-light border mb-1'" @click="help_type = 'video'">Video Help</button>
                                        <button type="button" :class="(help_type == 'text') ? 'btn btn-sm btn-dark mb-1' : 'btn btn-sm btn-light border mb-1'" @click="help_type = 'text'">Text Help</button>
                                    </div><!--  /.col-12 mb-4 --> 

                                    <div class="col-12 mb-4">
                                        <template v-if=" user_type == 'basic' && help_type == 'video' "><tinymce id="d1" :other_options="tinyOptions" v-model="help.basic_video"></tinymce></template>
                                        
                                        <template v-else-if=" user_type == 'basic' && help_type == 'text' "><tinymce id="d2" :other_options="tinyOptions" v-model="help.basic_text"></tinymce></template>

                                        <template v-else-if=" user_type == 'medium' && help_type == 'video' "><tinymce id="d3" :other_options="tinyOptions" v-model="help.medium_video"></tinymce></template>
                                        
                                        <template v-else-if=" user_type == 'medium' && help_type == 'text' "><tinymce id="d4" :other_options="tinyOptions" v-model="help.medium_text"></tinymce></template>

                                        <template v-else-if=" user_type == 'advance' && help_type == 'video' "><tinymce id="d5" :other_options="tinyOptions" v-model="help.advance_video"></tinymce></template>
                                        
                                        <template v-else-if=" user_type == 'advance' && help_type == 'text' "><tinymce id="d6" :other_options="tinyOptions" v-model="help.advance_text"></tinymce></template>
                                        
                                    </div><!--  /.col-12 mb-4 --> 
    
                                    <div class="col-md-4 mb-4"> 
                                        <label class="o-s-l">Help Category</label>
                                        <multiselect v-model="help.categories" :options="helpCats" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" label="name" track-by="name" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span class="custom__tag">
                                                    <span>{{ props.option.name }}</span>
                                                    <span @click="props.remove(props.option)">x</span> 
                                                </span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-md-4 mb-4 -->

                                    <div class="col-md-4 mb-3"> 
                                        <label class="o-s-l">Help Roles</label>
                                        <multiselect v-model="help.roles" :options="roles" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" label="name" track-by="name" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span class="custom__tag">
                                                    <span>{{ props.option.name }}</span>
                                                    <span @click="props.remove(props.option)">x</span> 
                                                </span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-4 mb-3"> 
                                        <input placeholder=" " type="number" class="form-control outline" id="order" v-model="help.order">
                                        <label for="order">Serial</label>
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

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-title" v-model="helpSearch.title">
                                        <label for="search-title">Title</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3">  
                                        <label class="o-s-l">Select Category</label>
                                        <multiselect v-model="helpSearch.category" :options="helpCats" deselect-label="" select-label="" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" label="name" track-by="name" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span class="custom__tag">
                                                    <span>{{ props.option.name }}</span>
                                                    <span @click="props.remove(props.option)">x</span> 
                                                </span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-12 mb-3 --> 
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="helpSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="helpSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="helpSearch.order_by" >
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
                <button v-can="'help-create'" type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> Help
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
                            <th>Status</th>
                            <th>Category</th>
                            <th>Role</th>
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
                        
                        <tr v-for="help, index in helps.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+help.id" :value="help.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+help.id">{{ help.title }}</label></td>
                            <td> 
                                <template v-if="help.status">
                                    <span class="bg-success active-status">Active</span>
                                </template>
                                <template v-else>
                                    <span class="bg-danger active-status">Inactive</span>
                                </template>
                            </td> 
                            <td class="taxonomies">
                                <template v-if="help.categories">
                                    <span v-for="category in help.categories">{{category.name}}</span> 
                                </template>
                            </td> 
                            <td class="taxonomies">
                                <template v-if="help.roles.length">
                                    <span v-for="role in help.roles">{{role.name}}</span> 
                                </template>
                                <template v-else>
                                    All
                                </template>
                            </td>  
                            <td>{{ help.order }}</td>    
                            <td>
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                    <a v-can="'help-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(help)" data-toggle="modal" data-target="#createModal">
                                       Edit 
                                    </a>
                                    <a v-can="'help-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(help.id, index)">
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
                            <th>Status</th>
                            <th>Category</th>
                            <th>Role</th>
                            <th>Serial</th>   
                            <th>Actions</th> 
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="helps" :limit="2" @pagination-change-page="getLists"></pagination> 
            </div><!--  /.table-actions -->
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script>   
export default { 
    components: {   
        'tinymce': () => import('vue-tinymce-editor'),
        'date-time-picker': () => import('vue-vanilla-datetime-picker'),
    },
    data() {
        return {    
            dateOptions: this.$store.state.dateOptions, 
            tinyOptions: {
                'height': 300
            },
            formType: false,
            user_type: 'basic',
            help_type: 'video',
            help: { 
                status: 1,
                title: '',
                slug: '', 
                basic_video: '', 
                basic_text: '', 
                medium_video: '', 
                medium_text: '',
                advance_video: '', 
                advance_text: '',   
                categories: [], 
                roles: [],
                order: null,
            }, 
            helpConst: { 
                status: 1,
                title: '',
                slug: '', 
                basic_video: '', 
                basic_text: '', 
                medium_video: '', 
                medium_text: '',
                advance_video: '', 
                advance_text: '',  
                categories: [], 
                roles: [],
                order: null,
            },  
            helpSearch: { 
                title: '',
                category: [],
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            helps: {},  
            helpCats: [], 
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
                for (let key in this.helps.data) {
                    this.selected.push(this.helps.data[key].id);
                }
            }
        }, 
        dataSearch() { 
            var data_search = this.helpSearch;   
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
            
            axios.get('/api/v1/mt/helps?'+ queryString)
                .then( resp => {  
                    app.preloader = false; 
                    app.helps = resp.data.helps;    
                    app.helpCats = resp.data.helpcats;  
                    app.roles = resp.data.roles;  

                    if(app.helps.data.length == 0) {                                 
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
            this.help = this.helpConst; 
        }, 
        saveForm() { 
            var app = this;
            var newHelp = app.help;

            if ( !newHelp.categories.length ) {  
                alert('Select Category');  
                return;         
            }

            if ( !newHelp.roles.length ) {  
                alert('Select Role');  
                return;         
            }            

            document.getElementById('createModal').style.display = 'none';

            if ( this.formType ) {
                axios.post('/api/v1/mt/helps', newHelp)
                    .then( resp => {  
                        this.help = this.helpConst;
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                axios.patch('/api/v1/mt/helps/' + newHelp.id, newHelp)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm(help) {
            this.formType = false;
            this.help = help;  

            //this is to fix error of tinymce = Error in callback for watcher "value": "TypeError: Cannot read property 'replace' of null"
            if ( !this.help.basic_video ) this.help.basic_video = '';
            if ( !this.help.basic_text ) this.help.basic_text = '';

            if ( !this.help.medium_video ) this.help.medium_video = '';
            if ( !this.help.medium_text ) this.help.medium_text = '';

            if ( !this.help.advance_video ) this.help.advance_video = '';
            if ( !this.help.advance_text ) this.help.advance_text = '';

            if ( !this.help.roles.length ) {  
                this.help.roles = [ { id: 0, name: 'All' } ];           
            }
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/mt/helps/' + id)
                    .then( resp => {
                        app.helps.data.splice(index, 1); 
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
                axios.delete('/api/v1/mt/helps/' + selectedItem)
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
 