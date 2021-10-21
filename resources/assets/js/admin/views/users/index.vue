<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               User Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body"> 
            <media id="avatar" @select-image="avatarInsert"></media>

            <!-- Modal Create-->
            <div v-can="'user-create'" class="modal fade" id="createModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">  {{ (formType) ? 'New' : 'Update' }} User</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body">  
                                <div class="form-row"> 
                                    <div class="col-md-12 mb-3"> 
                                        <label for="status">Status</label> 
                                        <label class="switch">
                                          <input type="checkbox" v-model="user.status">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="name" v-model="user.name">
                                        <label for="name">Name</label>
                                    </div><!--  /.col-md-4 mb-3 -->  

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="email" class="form-control outline" id="email" v-model="user.email">
                                        <label for="email">Email</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="password" class="form-control outline" id="password" v-model="user.password">
                                        <label for="password">Password</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="password" class="form-control outline" id="password_confirmation" v-model="user.password_confirmation">
                                        <label for="password_confirmation">Confirm Password</label>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="username" v-model="user.username">
                                        <label for="username">User Name</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="password" class="form-control outline" id="pin-password" v-model="user.pin">
                                        <label for="pin-password">Pin Number</label>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="mobile" v-model="user.mobile">
                                        <label for="mobile">Mobile</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3">
                                        <date-time-picker v-model="user.profile.bday" placeholder="Birth Day"></date-time-picker>
                                    </div><!--  /.col-md-4 mb-3 -->  

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="occupation" v-model="user.occupation">
                                        <label for="occupation">Occupation</label>
                                    </div><!--  /.col-md-4 mb-3 -->  

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="nid" v-model="user.profile.nid">
                                        <label for="nid">NID</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="birth_crt" v-model="user.profile.birth_crt">
                                        <label for="birth_crt">Birth Certificate</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="passport" v-model="user.profile.passport">
                                        <label for="passport">Passport</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="pre_address" v-model="user.pre_address">
                                        <label for="pre_address">Present Address</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="per_address" v-model="user.per_address">
                                        <label for="per_address">Parmanent Address</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3">
                                        <label for="per_address" class="o-s-l">Select User Role</label> 
                                        <multiselect v-model="user.role" :options="roles" :preserve-search="true" label="name" track-by="name" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span class="custom__tag">
                                                    <span>{{ props.option.name }}</span>
                                                    <span @click="props.remove(props.option)">x</span> 
                                                </span>
                                            </template>
                                        </multiselect>  
                                    </div><!--  /.col-md-4 mb-3 -->  

                                    <div class="col-md-4 mb-3">
                                        <div v-if="!user.profile.avatar">
                                            <span class="btn btn-sm bg-success" data-toggle="modal" data-target="#avatar">
                                                Insert Image
                                            </span>
                                        </div>
                                        <div v-else>
                                            <img :src="user.profile.avatar_src" class="upload-img rounded-circle sm-img p-a"/>
                                            <span class="btn btn-sm btn-danger sm-btn" @click="avatarRemove">x</span>
                                        </div>
                                    </div><!--  /.col-md-4 --> 
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

            <!-- Modal Create-->
            <div v-can="'user-create'" class="modal fade" id="otpModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Disable User OTP</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="otpDisable()">
                            <div class="modal-body"> 
            
                                <div class="form-row"> 

                                    <div class="col-md-12 mb-3"> 
                                        <multiselect v-model="otp_user.user_id" :options="accounts" :custom-label="customLabel" :preserve-search="true" placeholder="Search User" selectLabel="" :loading="isLoading" deselectLabel="" :internal-search="false" :searchable="true" label="name" track-by="name" @search-change="asyncFind" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect> 
                                        <small>You can search a user by mobile number, email or user name</small>
                                    </div><!--  /.col-md-12 mb-3 -->     
            
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button class="btn btn-danger" type="submit">
                                Disable OTP
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
                                        <select id="search-status" class="form-control" v-model="userSearch.status">
                                            <option value="">Select Status</option>
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option> 
                                        </select> 
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3"> 
                                        <multiselect v-model="userSearch.user_id" :options="accounts" :custom-label="customLabel" :preserve-search="true" placeholder="Search User" selectLabel="" :loading="isLoading" deselectLabel="" :internal-search="false" :searchable="true" label="name" track-by="name" @search-change="asyncFind" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect> 
                                        <small>You can search a user by mobile number, email or user name</small>
                                    </div><!--  /.col-12 mb-3 --> 
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="userSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="userSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="userSearch.order_by" >
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
                <button v-can="'user-create'" type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> User
                </button> 

                <button v-can="'user-create'" type="button" @click="newForm()" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#otpModal">
                    <i class="icon-cogs"></i> Disable OTP
                </button>

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">Search</span>
                </button>

            </div><!--  /.table-actions -->

            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr>  
                            <th>Name</th> 
                            <th>Status</th> 
                            <th>Email</th>
                            <th>User Name</th>
                            <th>Mobile</th>
                            <th>Role</th>
                            <th>Balance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>

                        <tr v-for="user, index in users.data">   
                            <td>{{ user.name }}</td>
                            <td> 
                                <template v-if="user.status">
                                    <span class="bg-success active-status">Active</span>
                                </template>
                                <template v-else>
                                    <span class="bg-danger active-status">Inactive</span>
                                </template>
                            </td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.username }}</td> 
                            <td>{{ user.mobile }}</td>  
                            <td class="taxonomies"> 
                                <template v-if="user.role.length">
                                    <span v-for="role in user.role">{{ role.name }}</span>
                                </template>
                            </td> 
                            <td>{{ user.balance.balance }}</td>
                            <td> 
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                    <a v-can="'user-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(user)" data-toggle="modal" data-target="#createModal">
                                       Edit / View 
                                    </a> 
                                  </div>
                                </div> 
                            </td>
                        </tr>

                        <template v-if="noData"><tr class="bg-white" v-html="noData"></tr></template>
                       
                    </tbody>
                    <tfoot>
                        <tr>  
                            <th>Name</th> 
                            <th>Status</th> 
                            <th>Email</th>
                            <th>User Name</th>
                            <th>Mobile</th>
                            <th>Role</th>
                            <th>Balance</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="users" :limit="2" @pagination-change-page="getLists"></pagination> 
            </div><!--  /.table-actions -->
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script>   
export default {
    components: {   
        'media': () => import('@components/media/index.vue'),
        'date-time-picker': () => import('vue-vanilla-datetime-picker'),
    },
    data() {
        return {    
            dateOptions: this.$store.state.dateOptions,
            formType: false,
            user: { 
                status: 1,
                name: null,
                email: null,   
                password: '',
                password_confirmation: '',
                username: null,   
                pin: null, 
                mobile: null, 
                role: [],  
                profile: {
                    bday: null,   
                    avatar: null,   
                    avatar_src: null,   
                    occupation: null,   
                    nid: null,   
                    birth_crt: null,  
                    passport: null,   
                    pre_address: null,   
                    per_address: null,                    
                },  
            }, 
            userConst: { 
                status: 1,
                name: null,
                email: null,   
                password: '',
                password_confirmation: '',
                username: null,   
                pin: null, 
                mobile: null, 
                role: [],  
                profile: {
                    bday: null,   
                    avatar: null,   
                    avatar_src: null,   
                    occupation: null,   
                    nid: null,   
                    birth_crt: null,  
                    passport: null,  
                    pre_address: null,   
                    per_address: null,                    
                },  
            },
            otp_user: {
                user_id: null,
            },
            accounts: [], 
            isLoading: false,  
            userSearch: {
                status: '',
                user_id: '', 
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            users: {},  
            accounts: [],
            roles: [],  
            perPage: this.$route.query.per_page, 
            perPageOptions: this.$store.state.perPageOptions, 
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
                        this.$store.commit('errorMessages', resp); 
                    });  
            }, 600); 
            
        },
        avatarInsert(data) {   
            this.user.profile.avatar = data.id;
            this.user.profile.avatar_src = '/uploads/imgs/'+data.resized_name;
        }, 
        avatarRemove() {  
            this.user.profile.avatar = null;
            this.user.profile.avatar_src = null;
        },   
        dataSearch() { 
            var data_search = this.userSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) {
                    query[key] = ( key != 'user_id' ) ? data_search[key] : data_search[key]['id'];
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
            
            axios.get('/api/v1/users?'+ queryString)
                .then( resp => {  
                    app.preloader = false;
                                        
                    app.users = resp.data.users;  
                    app.roles = resp.data.roles;  
                    if(app.users.data.length == 0) {                                 
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
            this.user = this.userConst; 
        }, 
        saveForm() { 
            document.getElementById('createModal').style.display = 'none';
            var app = this;
            var newUser = app.user;
            if ( this.formType ) {
                axios.post('/api/v1/users', newUser)
                    .then( resp => {  
                        this.user = this.userConst; 
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                axios.patch('/api/v1/users/' + newUser.id, newUser)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm(user) {
            this.formType = false;
            this.user = user;
            this.user.role = this.user.role[0];
            /* null unique field, for checking unique users */
            this.user.username = null; 
            this.user.email = null; 
            this.user.mobile = null; 
            if ( user.profile.avatar_src ) {
                this.user.profile.avatar_src = '/uploads/imgs/'+user.profile.avatar_src.resized_name; 
            }
        },   
        otpDisable() { 
            var app = this;
            if ( !app.otp_user.user_id ) {
                alert('Please select user'); return;
            }
            document.getElementById('otpModal').classList.toggle('show');
            axios.patch('/api/v1/users/' + this.otp_user.user_id.id, { type: 'otp' })
                .then( resp => { 
                    app.$store.commit('submitMsg', 'update');  
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        },
    } //methods
} //export default
</script>