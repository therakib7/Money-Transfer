<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               {{ title() }} Limit Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body">  

            <!-- Modal Create-->
            <div v-can="'doc-create'" class="modal fade" id="createModal">
                <div class="modal-dialog modal-lg big-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">  {{ (formType) ? 'New' : 'Update' }} {{ title() }} Limit</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">
                                    <div class="col-12 mb-3" v-if="limit_for == 'role'">
                                        <label class="o-s-l">Role</label> 
                                        <multiselect v-model="limit.role" :options="roles" :preserve-search="true" label="name" track-by="name">
                                            <template slot="tag" slot-scope="props">
                                                <span class="custom__tag">
                                                    <span>{{ props.option.name }}</span>
                                                    <span @click="props.remove(props.option)">x</span> 
                                                </span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-md-12 mb-2" v-if="limit_for == 'user'"> 
                                        <label for="status">Status</label> 
                                        <label class="switch">
                                          <input type="checkbox" v-model="limit.status">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-md-12 mb-3 --> 


                                    <div class="col-md-12 mb-3" v-if="limit_for == 'user'">
                                        <multiselect v-model="limit.user" :options="accounts" :custom-label="customLabel" :preserve-search="true" placeholder="Search User" selectLabel="" :loading="isLoading" deselectLabel="" :internal-search="false" :searchable="true" label="name" track-by="name" @search-change="asyncFind" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect> 
                                        <small>You can search a user by mobile number, email or user name</small>
                                    </div><!--  /.col-md-12 mb-3 --> 
                                     
                                    <div class="mt-number-list mb-2"> 
                                        <div class="mt-numbers" v-for="(limit, key) in limit.service_limits"> 
                                            <div class="mt-title">
                                                Service Limit: {{key+1}}
                                            </div><!--  /.mt-title mb-3 -->
                                            <div class="mt-control"> 
                                                <span class="btn btn-primary btn-sm" @click="addForIDs(key)"><i class="icon-plus"></i></span>
                                                <span class="btn btn-danger btn-sm" @click="removeForIDs(key)"><i class="icon-minus"></i></span>
                                            </div><!--  /.mt-control mb-3 -->
                                            <div class="form-row">   
                                                <div class="col-md-12 mb-3 mt-4">
                                                    <label :for="'limit_for-'+key" class="o-s-l">For</label>
                                                    <select class="form-control" :id="'limit_for-'+key" v-model="limit.for">  
                                                        <option v-for="sfor in fors" :value="sfor.id">{{sfor.name}}</option>
                                                    </select>  
                                                </div><!--  /.col-md-12 --> 

                                                <div class="col-md-6 mb-3 outline-group">
                                                    <input placeholder=" " type="number" class="form-control outline" :id="'max_amount_day-'+key" v-model="limit.max_amount_day">
                                                    <label :for="'max_amount_day-'+key">Max Amount Day</label>
                                                </div><!--  /.col-md-6 mb-3 -->

                                                <div class="col-md-6 mb-3 outline-group">
                                                    <input placeholder=" " type="number" class="form-control outline" :id="'max_number_day-'+key" v-model="limit.max_number_day">
                                                    <label :for="'max_number_day-'+key">Max Number Day</label>
                                                </div><!--  /.col-md-6 mb-3 -->

                                                <div class="col-md-6 mb-3 outline-group">
                                                    <input placeholder=" " type="number" class="form-control outline" :id="'max_amount_month-'+key" v-model="limit.max_amount_month">
                                                    <label :for="'max_amount_month-'+key">Max Amount Month</label>
                                                </div><!--  /.col-md-6 mb-3 -->

                                                <div class="col-md-6 mb-3 outline-group">
                                                    <input placeholder=" " type="number" class="form-control outline" :id="'max_number_month-'+key" v-model="limit.max_number_month">
                                                    <label :for="'max_number_month-'+key">Max Number Month</label>
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
                                        <date-time-picker v-model="limitSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="limitSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="limitSearch.order_by" >
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
                    <i class="icon-plus-squared"></i> {{ title() }} Limit
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
                            <th><label for="check-all">{{ ( limit_for == 'role' ) ? 'Role' : 'User' }}</label></th>
                            <th v-if="limit_for == 'user'">Status</th>
                            <th>Actions</th>  
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr> 
                        <tr v-for="limit, index in limits.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+limit.id" :value="( limit_for == 'role' ) ? limit.role.id : limit.user.id" v-model="selected"/></td>
                            <td v-if="limit_for == 'role'"><label v-bind:for="'checkbox-id-'+limit.id">{{ limit.role.name }}</label></td> 
                            <td v-if="limit_for == 'user'"><label v-bind:for="'checkbox-id-'+limit.id">{{ ( limit.user ) ? limit.user.name : '' }}</label></td> 
                            <td v-if="limit_for == 'user'"> 
                                <template v-if="limit.status">
                                    <span class="bg-success active-status">Active</span>
                                </template>
                                <template v-else>
                                    <span class="bg-danger active-status">Inactive</span>
                                </template>
                            </td>  
                            <td>
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                    <a v-can="'doc-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(limit)" data-toggle="modal" data-target="#createModal">
                                       Edit 
                                    </a>
                                    <a v-can="'doc-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry( ( limit_for == 'role' ) ? limit.role.id : limit.user.id, index)">
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
                            <th><label for="check-all-bottom">{{ ( limit_for == 'role' ) ? 'Role' : 'User' }}</label></th>
                            <th v-if="limit_for == 'user'">Status</th>
                            <th>Actions</th> 
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="limits" :limit="2" @pagination-change-page="getLists"></pagination> 
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
            limit: { 
                role: [],
                status: true,  
                user: null,  
                service_limits: [{ for: null, max_amount_day: null, max_number_day: null, max_amount_month: null, max_number_month: null, }],  
            }, 
            fors: [
                { id: 1, name: 'Mobile Recharge'},
                { id: 2, name: 'Mobile Banking'},
                { id: 3, name: 'Utility Bill Pay'},
                { id: 4, name: 'Balance Transfer'},
            ],
            limitConst: { 
                role: [],
                status: true,  
                user: null, 
                service_limits: [{ for: null, max_amount_day: null, max_number_day: null, max_amount_month: null, max_number_month: null, }],  
            },   
            limitSearch: { 
                title: '', 
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            limit_for: this.$route.params.name, 
            limits: {},   
            roles: [],   
            accounts: [], 
            isLoading: false, 
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
        '$route.params.name': function (name) { 
            this.limit_for = name;
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
        title() {
            var app = this;  
            switch(app.limit_for) {   

                case 'role':
                    return 'Role';
                    break;
 
                case 'user':
                    return 'User';
                    break;
            }
        },
        customLabel({ name = '' }) { 
            return name;
        },
        asyncFind(query) {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                if ( query.length < 4 ) return;
                this.isLoading = true;
                axios.get('/api/v1/ac/accounts?'+ 'title=' + query)
                    .then( resp => {  
                        this.accounts = resp.data.users;  
                        this.isLoading = false
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });  
            }, 600); 
            
        }, 
        addForIDs(index) {
            this.limit.service_limits.splice(index + 1, 0, { for: null, max_amount_day: null, max_number_day: null, max_amount_month: null, max_number_month: null, } ); 
        },
        removeForIDs(index) {
            if (this.limit.service_limits.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.limit.service_limits.splice(index, 1); 
            } 
        }, 
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.limits.data) {
                    this.selected.push(this.limits.data[key].id);
                }
            }
        },  
        dataSearch() { 
            var data_search = this.limitSearch;   
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
                queryString += '&limit_for='+app.limit_for; 
            
            axios.get('/api/v1/mt/limits?'+ queryString)
                .then( resp => {  
                    app.preloader = false; 
                    app.limits = resp.data.limits;     
                    app.roles = resp.data.roles;     

                    if(app.limits.data.length == 0) {                                 
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
            this.limit = this.limitConst; 
        }, 
        saveForm() { 
            var app = this;
            var newNotice = app.limit; 

            document.getElementById('createModal').style.display = 'none';

            this.$set(newNotice, 'limit_for', app.limit_for)

            if ( this.formType ) {
                axios.post('/api/v1/mt/limits', newNotice)
                    .then( resp => {  
                        this.limit = this.limitConst;
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                axios.patch('/api/v1/mt/limits/' + newNotice.id, newNotice)
                    .then( resp => { 
                        this.limit = this.limitConst;
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm(limit) {
            this.formType = false;
            this.limit = limit;  
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/mt/limits/' + id + '?limit_for='+app.limit_for)
                    .then( resp => {
                        app.limits.data.splice(index, 1); 
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
                axios.delete('/api/v1/mt/limits/' + selectedItem + '?limit_for='+app.limit_for )
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
 