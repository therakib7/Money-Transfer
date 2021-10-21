<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Permission Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body">

            <!-- Modal Create-->
            <div v-can="'user-permission-create'" class="modal fade" id="createModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">New Permission</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row"> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="Name" v-model="permission.name">
                                        <label for="Name">Name</label>
                                    </div><!--  /.col-12 mb-3 -->
    
                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="guard_name" v-model="permission.guard_name">
                                        <label for="guard_name">Guard Name</label>
                                    </div><!--  /.col-12 mb-3 -->   

                                    <div class="col-12 mb-3"> 
                                        <label for="group">Create group by name</label> 
                                        <label class="switch">
                                          <input type="checkbox" v-model="permission.group">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-12 mb-3 -->     
 
                                    <div class="col-12 mb-3">
                                        <label for="guard_name" class="o-s-l">Select Permission</label>
                                        <multiselect v-model="permission.parent_id" :options="allPermissions" :preserve-search="true" selectLabel="" deselectLabel="" label="name" track-by="name" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect>  
                                    </div><!--  /.col-12 mb-3 -->
     
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button class="btn btn-primary" type="submit">Create</button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal -->

            <!-- Modal Update-->
            <div v-can="'user-permission-edit'" class="modal fade" id="updateModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Update Permission</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="updateForm()">
                            <div class="modal-body"> 
            
                                <div class="form-row">
        
                                    <div class="col-12 mb-3">
                                        <label for="edit-name">Name</label>
                                        <input type="text" class="form-control" id="edit-name" v-model="permissionUpdate.name" required>
                                    </div><!--  /.col-12 mb-3 -->
        
                                    <div class="col-12 mb-3">
                                        <label for="edit-guard_name">Guard Name</label>
                                        <input type="text" class="form-control" id="edit-guard_name" v-model="permissionUpdate.guard_name" required>
                                    </div><!--  /.col-12 mb-3 -->
 
                                    <div class="col-12 mb-3">
                                        <label for="edit-parent_id">Parent Permission</label> 
                                        <multiselect v-model="permissionUpdate.parent_id" :options="allPermissions" :preserve-search="true" placeholder="Select Permission" selectLabel="" deselectLabel="" label="name" track-by="name" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span class="custom__tag">
                                                    <span>{{ props.option.name }}</span>
                                                    <span @click="props.remove(props.option)">x</span> 
                                                </span>
                                            </template>
                                        </multiselect>    
                                                                           
                                    </div><!--  /.col-12 mb-3 -->
        
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button class="btn btn-primary" type="submit">Update</button>
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
                                        <input placeholder=" " type="text" class="form-control outline" id="search-name" v-model="perSearch.name">
                                        <label for="search-name">Name</label>
                                    </div><!--  /.col-12 mb-3 --> 
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="perSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="perSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="perSearch.order_by" >
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
                <button v-can="'user-permission-create'" type="button" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> Permission
                </button> 

                <button v-can="'user-permission-delete'" v-if="selected.length" class="btn btn-sm btn-danger " v-on:click="deleteSelected()"><i class="icon-trash-empty"></i> Delete Selected</button>

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
                            <th>Guard Name</th>  
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>   
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>

                        <tr v-for="permission, index in permissions.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+permission.id" :value="permission.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+permission.id"><span v-html="dash_icon(permission.depth)"></span> {{ permission.name }}</label></td> 
                            <td>{{ permission.guard_name }}</td>    
                            <td>
                                <div class="dropdown action-items">
                                    <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="icon-ellipsis"></i>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                        <a v-can="'user-permission-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(permission)" data-toggle="modal" data-target="#updateModal">
                                           Edit 
                                        </a>
                                        <a v-can="'user-permission-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(permission.id, index)">
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
                            <th>Guard Name</th> 
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="permissions" :limit="2" @pagination-change-page="getLists"></pagination> 
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
            permission: { 
                name: '',
                guard_name: '',
                parent_id: null, 
                group: false, 
            },
            permissionUpdate: {
                name: '',
                guard_name: '',
                parent_id: null,
            },
            perSearch: {
                name: '', 
                date_from: '',  
                date_to: '',     
                order_by: '',  
            }, 
            permissions: {}, 
            allPermissions: [], 
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
            return "<i class='sub-permission icon-minus'></i>".repeat(depth);
        },
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let permission in this.permissions.data) {
                    this.selected.push(this.permissions.data[permission].id);
                }
            }
        }, 
        dataSearch() { 
            var data_search = this.perSearch;   
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
            
            axios.get('/api/v1/permissions?'+ queryString)
                .then(function (resp) {
                    app.preloader = false;
                    
                    app.permissions = resp.data; 
                    app.allPermissions = resp.data.data_all;
                    if(app.permissions.data.length == 0) {                                 
                        app.noData = app.$store.state.noData;
                    } else {
                        app.noData = '';
                    }
                })
                .catch(function (resp) {
                    app.$store.commit('errorMessages', resp); 
                });
        },
        saveForm() { 
            document.getElementById('createModal').style.display = 'none'; 
            var app = this;  
            var newTaxonomy = app.permission;
            axios.post('/api/v1/permissions', newTaxonomy) 
                .then(function (resp) { 
                    app.$store.commit('nullForm', app.permission); 
                    app.$store.commit('submitMsg', 'add');  
                    app.getLists(); 
                })
                .catch(function (resp) { 
                    app.$store.commit('errorMessages', resp); 
                });
        },
        editForm(permission) { 
            this.permissionUpdate.parent_id = null;
            for (let key in permission) { 
                if(key !== 'parent_id') {
                    this.permissionUpdate[key] = permission[key];
                } else {  
                    let result = this.allPermissions.find(obj => {
                      return obj.id === permission[key]
                    }) 
                    this.permissionUpdate.parent_id = result; 
                }
            } 
        },
        updateForm() {
            document.getElementById('updateModal').classList.toggle('show');
            var app = this;  
            var newTaxonomy = app.permissionUpdate;

            axios.patch('/api/v1/permissions/' + newTaxonomy.id, newTaxonomy)
                .then(function (resp) {  
                    app.$store.commit('submitMsg', 'update'); 
                    app.getLists(); 
                })
                .catch(function (resp) {
                    app.$store.commit('errorMessages', resp); 
                });
        },
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/permissions/' + id)
                    .then(function (resp) {
                        app.permissions.data.splice(index, 1);
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
                axios.delete('/api/v1/permissions/' + selectedItem)
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