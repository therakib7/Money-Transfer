<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Role Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body">

            <!-- Modal Create-->
            <div v-can="'user-role-create'" class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="CreateModalLongTitle" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="CreateModalLongTitle">{{ (formType) ? 'New' : 'Update' }}  Role</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">
                                    <div class="col-md-6 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="name" v-model="role.name">
                                        <label for="name">Name</label>
                                    </div><!--  /.col-md-6 mb-3 -->

                                    <div class="col-md-6 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="desc" v-model="role.desc">
                                        <label for="desc">Description</label>
                                    </div><!--  /.col-md-6 mb-3 -->

                                    <div class="col-12 mb-3">
                                        <div class="table-responsive">
                                            <table class="table table-striped bg-white">
                                                <thead>
                                                    <tr>  
                                                        <th><input type="checkbox" v-model="allPermission" @click="allPermissionCheck()"></th>   
                                                        <th>Group</th> 
                                                        <th>Name</th> 
                                                        <th>View</th> 
                                                        <th>Create</th> 
                                                        <th>Edit</th> 
                                                        <th>Delete</th>    
                                                        <th>Super</th>
                                                        <th>Top Super</th>    
                                                    </tr>
                                                </thead>
                                                <tbody>   
                                                    <template v-for="permission in permissions">  
                                                        <template v-for="(n, index) in permission.childs.length/6"> 
                                                            <tr v-if="n == 1">   
                                                                <td><input type="checkbox" :value="permission.id" v-model="role.permission" @click="perSelect(permission.id)" ></td>     
                                                                <td>{{permission.name}}</td>       
                                                                <template v-for="(per, key) in permission.childs.slice(0,6)">
                                                                    <td v-if="key < 1">{{ child_name( per.name ) }}</td> 
                                                                    <td><input type="checkbox" :value="per.id" v-model="role.permission"/></td>
                                                                </template>     
                                                            </tr> 
                                                            <tr v-if="n >= 1 && n != permission.childs.length/6">   
                                                                <td></td>     
                                                                <td></td>       
                                                                <template v-for="(per, key) in permission.childs.slice(n*6,n*6+6)">
                                                                    <td v-if="key < 1">{{ child_name( per.name ) }}</td> 
                                                                    <td><input type="checkbox" :value="per.id" v-model="role.permission"/></td>
                                                                </template>     
                                                            </tr> 
                                                        </template>  
                                                    </template> 
                                                </tbody>
                                                <tfoot>
                                                    <tr>  
                                                        <th><input type="checkbox" v-model="allPermission" @click="allPermissionCheck()"></th>   
                                                        <th>Group</th> 
                                                        <th>Name</th> 
                                                        <th>View</th> 
                                                        <th>Create</th> 
                                                        <th>Edit</th> 
                                                        <th>Delete</th>    
                                                        <th>Super</th>
                                                        <th>Top Super</th>    
                                                    </tr>
                                                </tfoot>
                                            </table> 
                                        </div><!--  /.table-responsive -->
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
                                        <input placeholder=" " type="text" class="form-control outline" id="search-title" v-model="roleSearch.title">
                                        <label for="search-title">Text</label>
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-content" v-model="roleSearch.content">
                                        <label for="search-content">Content</label>
                                    </div><!--  /.col-12 mb-3 --> 
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="roleSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="roleSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3">
                                        <label class="o-s-l">Order By</label> 
                                        <select id="search-order-by" class="form-control" v-model="roleSearch.order_by" >
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
                <button v-can="'user-role-create'" type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> Role
                </button> 

                <button v-can="'user-role-delete'" v-if="selected.length" class="btn btn-sm btn-danger " v-on:click="deleteSelected()"><i class="icon-trash-empty"></i> Delete Selected</button>

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
                            <th>Description</th> 
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>

                        <tr v-for="role, index in roles.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+role.id" :value="role.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+role.id">{{ role.name }}</label></td>
                            <td>{{ role.desc }}</td>    
                            <td>
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                    <a v-can="'user-role-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(role)" data-toggle="modal" data-target="#createModal">
                                       Edit 
                                    </a>
                                    <a v-can="'user-role-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(role.id, index)">
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
                            <th>Description</th> 
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="roles" :limit="2" @pagination-change-page="getLists"></pagination> 
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
            role: {
                name: '',
                desc: '',
                permission: [], 
            }, 
            roleConst: {
                name: '',
                desc: '',
                permission: [], 
            }, 
            allPermission: false,
            editAllPermission: false,
            roleSearch: {
                title: '',
                content: '',
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            roles: {},  
            permissions: [],  
            permission_sublist: [],  
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
    updated() {   
        this.$root.popupModal(); 
        this.$root.dropdownModal();
    },
    methods: {
        perSelect(id) {  
            let checkValue = this.role.permission.indexOf(id);  
            for (let key in this.permissions) {  
                if ( this.permissions[key].id == id ) { 
                    if (checkValue == -1 ) { 
                        for (let key2 in this.permissions[key].childs) { 
                            this.role.permission.push(this.permissions[key].childs[key2].id);  
                        } // endfor
                    } else {  
                        for (let key2 in this.permissions[key].childs) { 
                            let index = this.role.permission.indexOf(this.permissions[key].childs[key2].id);
                            this.role.permission.splice(index, 1); 
                        } // endfor
                    }
                } // endif
 
            } // endfor 
        },
        allPermissionCheck() {  
            if ( !this.allPermission ) { 
                for (let key in this.permissions) {  
                    this.role.permission.push(this.permissions[key].id);
                    for (let key2 in this.permissions[key].childs) { 
                        this.role.permission.push(this.permissions[key].childs[key2].id);  
                    } // endfor 
                } // endfor 
            } else {
                this.role.permission = [];
            }  
        }, 
        child_name( val ) {
            return val.replace(" View", "");
        },
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.roles.data) {
                    this.selected.push(this.roles.data[key].id);
                }
            }
        }, 
        dataSearch() { 
            var data_search = this.roleSearch;   
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
            
            axios.get('/api/v1/roles?'+ queryString)
                .then( resp => {  
                    app.preloader = false;

                    app.roles = resp.data.roles;  
                    app.permissions = resp.data.permissions;

                    if(app.roles.data.length == 0) {                                 
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
            this.role = this.roleConst; 
        }, 
        saveForm() { 
            document.getElementById('createModal').style.display = 'none';
            var app = this;
            var newRole = app.role;
            if ( this.formType ) {
                axios.post('/api/v1/roles', newRole)
                    .then( resp => {  
                        app.$store.commit('nullForm', app.role); 
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                axios.patch('/api/v1/roles/' + newRole.id, newRole)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    }); 
            }
            
        }, 
        editForm(role) {  
            this.formType = false;
            this.role.permission = [];
            for (let key in role) { 
                if(key !== 'permissions') {
                    this.role[key] = role[key];
                } else {  
                    for (let key2 in role[key]) {  
                        this.role.permission.push(role[key][key2].permission_id);
                    }
                }
            } 
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/roles/' + id)
                    .then( resp => {
                        app.roles.data.splice(index, 1); 
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
                axios.delete('/api/v1/roles/' + selectedItem)
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