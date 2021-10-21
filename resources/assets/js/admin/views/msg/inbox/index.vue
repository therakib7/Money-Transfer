<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
                {{ $t('message_list') }}
            </h2>  
            <template v-if="!backMsg"> 
                <back-forward></back-forward>
            </template>
            <template v-else>
                <div class="back-forward float-right">
                    <button class="btn btn-sm btn-info" :title="$t('c_h_go_b')"><a @click="$router.push({name: 'msgInbox', query: { page: 1, per_page: 20 } })"><i class="icon-left" aria-hidden="true"></i></a></button>  
                </div><!-- /.float-right -->
            </template>
        </div><!--  /.component-heading -->

        <div class="component-body settings"> 
            <div class="row">
                <div class="col-md-3 pr-0" v-if="userList">
                    <ul class="message-content">
                        <li class="header">
                            <multiselect  id="ajax" v-model="search_user" :options="accounts" :custom-label="customLabel" :preserve-search="true" :placeholder="$t('search_user')" selectLabel="" :loading="isLoading" deselectLabel="" :internal-search="false" :searchable="true" label="name" track-by="name" @search-change="asyncFind" :preselect-first="true" @input="searchUserSelected()">
                                <template slot="tag" slot-scope="props">
                                    <span>{{ props.option.name }}</span>
                                    <span @click="props.remove(props.option)">x</span> 
                                </template>
                            </multiselect> 
                            <small>{{ $t('s_u_h') }}</small>
                        </li>
                        <li><!-- messages item -->
                            <ul class="message-menu">
                                <li v-for="user, index in inbox_users">
                                    <a v-on:click.prevent="selectedUser( user )" href="#">
                                        <div class="float-left">
                                            <img :src="user_image( user )" class="img-circle" alt="User Image">
                                        </div>
                                        <div class="float-right">
                                            <h4>
                                                {{ u_n( user ) }}
                                                <small class="d-none"><i class="icon-clock-o"></i> {{ user.created_at | moment('h:mm a, DD-MM-YYYY') }}</small>
                                            </h4>
                                            <p>{{ user_msg( user.msg ) }}</p>
                                        </div>
                                    </a>
                                </li>
                            </ul><!-- /.messages menu -->
                        </li><!--/. messages item -->
                        <li class="footer">
                            <a href="#" onclick="event.preventDefault();">{{ $t('load_more') }}</a>
                        </li>
                    </ul><!-- /.message-content -->
                </div><!-- /.col-md-3 --> 

                <div class="col-md-9" v-if="chatList">
                    <div class="card chat chat-primary">
                        <div class="card-header">
                            <h3 class="card-title">{{ ( $route.query.id ) ? to_u_n : $t('select_user_chat') }}</h3>
                            <div class="card-tools" v-if="0">
                                <span data-toggle="tooltip" title="3 New Messages" class="badge badge-primary">3</span>
                                <button type="button" class="btn btn-tool" data-widget="collapse">
                                    <i class="icon-minus"></i>
                                </button>
                                <button type="button" class="btn btn-tool" data-toggle="tooltip" title="Contacts" data-widget="chat-pane-toggle">
                                    <i class="icon-comment"></i>
                                </button>
                            </div><!-- /.card-tools -->
                        </div><!-- /.card-header -->
                        <div class="card-body chat-box" >
                            <div class="chat-messages">  
                                <div v-for="inbox, index in inboxes" :class="( auth_id == inbox.from_user_id) ? 'chat-msg right' : 'chat-msg'" > 
                                    <div class="chat-info clearfix">
                                        <span :class="( auth_id == inbox.from_user_id) ? 'chat-timestamp float-right' : 'chat-timestamp float-left'"></span>
                                    </div><!-- /.chat-info -->

                                    <img v-if="auth_id != inbox.from_user_id" class="chat-img img-circle" src="/default/imgs/user.jpg" alt="User Image"><!-- /.chat-img -->
                                    
                                    <div :class="( auth_id == inbox.from_user_id) ? 'chat-text' : 'chat-text bg-chat-gray'">
                                        {{inbox.msg}}
                                    </div><!-- /.chat-text -->
                                </div><!-- /.chat-msg -->
                            </div><!--/.chat-messages-->
                        </div><!-- /.card-body -->
                        <div class="card-footer">
                            <form v-on:submit.prevent="saveForm()">
                                <div class="input-group">
                                    <input type="text" v-model="inbox.msg" :placeholder="$t('type_message')" class="form-control">
                                    <span class="input-group-append">
                                        <button type="submit" class="btn btn-primary">{{ $t('send') }}</button>
                                    </span>
                                </div>
                            </form>
                        </div><!-- /.card-footer-->
                    </div><!-- /.card -->
                </div><!-- /.col-md-9 -->
            </div><!-- /.row -->             
        </div><!--  /.component-body --> 
    </div><!--  /.component --> 
</template>  

<script>  
import commonMessages from '@admin/locales/shared-i18n-setup'
export default {
    components: {     
        'date-time-picker': () => import('vue-vanilla-datetime-picker'), 
    },   
    data() {
        return {     
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            userList: true,
            chatList: true,
            backMsg: false,
            dateOptions: this.$store.state.dateOptions,
            search_user: null,
            to_user_id: null,
            to_u_n: null,
            auth_id: this.$store.state.auth_id,
            inbox: { 
                to_user_id: null,
                msg: '', 
            },  
            accounts: [],
            inboxSearch: { 
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            inboxes: [],   
            inbox_users: [],  
            bucket_url: null,
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
        '$route.query.id': function (id) { 
            this.inbox.to_user_id = id;
            this.getInbox(); 
        },  
        /* To match chat and user list height with windows */
        windowHeight(newHeight, oldHeight) { 
            this.boxHeight();
        }, 
        windowWidth(newWidth, oldWidth) { 
            this.boxWidth();
        },
        '$route': function (route) { 
            this.boxWidth();
            this.boxHeight();
        },
    },
    created() {
        this.inbox.to_user_id = this.$route.query.id;
        this.getLists();  

        let per_page = this.$route.query.per_page;  

        var perPageOptions =  this.perPageOptions.find( function( ele ) { 
            return ele.value == per_page;
        } );

        if( !perPageOptions ) {
            this.perPageOptions.splice(0, 0, { text: per_page, value: per_page } ); 
        }
      
        Echo.private(`message.${this.auth_id}`)
            .listen('Message', (e) => {
                this.inboxes.push(e.data); 
            }); 
    },
    mounted() {
        this.scrollToEnd();  

        /* To match chat and user list height with windows */
        this.boxHeight();
        this.boxWidth();

        if ( this.$route.query.id ) {
            this.getInbox();
        }

        this.$nextTick(() => {
            window.addEventListener('resize', () => {
              this.windowHeight = window.innerHeight
            });
        })

        this.$nextTick(() => {
            window.addEventListener('resize', () => {
              this.windowWidth = window.innerWidth
            });
        })
    },
    updated() {
        this.scrollToEnd(); 
        this.boxHeight();
        this.boxWidth();
    },   
    methods: {
        boxWidth() {   
            if ( this.windowWidth < 768) {
                if ( this.$route.query.id ) {
                    this.chatList = true; 
                    this.userList = false;

                    this.backMsg = true;  
                } else {
                    this.chatList = false; 
                    this.userList = true;
                } 
            } else {
                this.chatList = true; 
                this.userList = true;
            }  
        },
        boxHeight() {  
            let firstDivHeight = this.windowHeight - 265;
            let secondDivHeight = this.windowHeight - 265;
            document.querySelector('.message-content .message-menu').style.height = firstDivHeight+'px';
            document.querySelector('.chat .card-body').style.height = secondDivHeight+'px'; 
        }, 
        searchUserSelected() {  
            let user = this.search_user;
            if ( user ) {
                this.to_u_n = user.name;
                var page = this.$route.query['page'];
                var per_page = this.$route.query['per_page']; 
                this.$router.replace({ name: "msgInbox", query: { id: user.id, page: page, per_page: per_page } });

                this.inbox_users.unshift({ to_user_id: user.id, user_to: user });

                this.getInbox();
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
                        this.$store.commit('errorMessages', resp); 
                    });  
            }, 600); 
            
        }, 
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.inboxes) {
                    this.selected.push(this.inboxes[key].id);
                }
            }
        },  
        u_n( user ) {
            return ( user.user_from != null ) ? user.user_from.name : user.user_to.name; 
        },
        user_msg( msg ) {
            if ( msg ) {
                if ( msg.length < 40 ) {
                    return msg;
                } else {
                    return msg.substring(0, 40)+'...';
                } 
            } else {
                return '';
            }                        
        },
        user_image( user ) {
            var default_img = '/default/imgs/user.jpg';
            if ( user.user_from ) {
                if ( user.user_from.profile.avatar_src ) {
                    return this.bucket_url+user.user_from.profile.avatar_src.resized_name;
                } else {
                    return default_img;
                }
            } else if ( user.user_to ) {
                if ( user.user_to.profile.avatar_src ) {
                    return this.bucket_url+user.user_to.profile.avatar_src.resized_name;
                } else {
                    return default_img;
                }
            } else {
                return default_img;
            }
        },
        selectedUser( user ) { 
            this.to_u_n = ( user.user_from != null ) ? user.user_from.name : user.user_to.name;
            var page = this.$route.query['page'];
            var per_page = this.$route.query['per_page'];
            if ( user.user_from != null ) {
                this.$router.replace({ name: "msgInbox", query: { id: user.user_from.id, page: page, per_page: per_page } });
            } else {
                this.$router.replace({ name: "msgInbox", query: { id: user.user_to.id, page: page, per_page: per_page } });
            }
            this.boxWidth();
            this.boxHeight();
            this.getInbox();
        },  
        dataSearch() { 
            var data_search = this.inboxSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) {
                    query[key] = ( key != 'inbox_id') ? data_search[key] : data_search[key]['id']; 
                } else {
                    if ( this.$route.query[key] ) {
                        query[key] = '';
                    }
                } 
            }   
            this.$router.push( { path: document.location.search, query: query } );   
            this.getLists(); 
        }, 
        getInbox(page = 1, click = false) {

            var app = this;            
          
            let per_page = this.$route.query.per_page;   
            
            let current_page = (click) ? page : this.$route.query.page ;
            if ( click ) {
                this.$router.push( { path: document.location.search, query: { page: current_page, per_page: per_page } } );  
            }

            let allQuery = this.$route.query;

            var queryString = Object.keys(allQuery).map(key => key + '=' + allQuery[key]).join('&');
            
            axios.get('/api/v1/msg/inboxes?'+ queryString)
                .then( resp => {  
                    app.preloader = false;                    
                    app.inboxes = resp.data.inboxes;                      
                    app.to_u_n = resp.data.user_info.name;      
                    if(app.inboxes.length == 0) {                                 
                        app.noData = app.$store.state.noData;
                    } else {
                        app.noData = '';
                    }
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
             
        },
        getLists() {
            var app = this;   
            axios.get('/api/v1/msg/inboxusers')
                .then( resp => {  
                    app.preloader = false;                    
                    app.inbox_users = resp.data.inboxusers;  
                    app.bucket_url = resp.data.bucket_url;   

                    /*if ( app.inbox_users.length ) {                                 
                        var page = this.$route.query['page'];
                        var per_page = this.$route.query['per_page'];

                        if ( app.inbox_users[0].user_from != null ) {
                            var last_inbox_id = app.inbox_users[0].user_from.id;
                            this.to_u_n = app.inbox_users[0].user_from.name;
                        } else {
                            var last_inbox_id = app.inbox_users[0].user_to.id;
                            this.to_u_n = app.inbox_users[0].user_to.name;
                        } 


                        this.$router.replace({ name: "msgInbox", query: {id: last_inbox_id, page: page, per_page: per_page } }); 
                        this.getInbox();
                    } */
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        },
        scrollToEnd() {
            let container = document.querySelector(".chat-box"); 
            if ( container ) {
                let scrollHeight = container.scrollHeight;
                container.scrollTop = scrollHeight;
            }
        },
        saveForm() { 
            var app = this;
            var newInbox = app.inbox;
            var MSG = newInbox.msg;
            app.inboxes.push({from_user_id: this.auth_id, to_user_id: newInbox.to_user_id, msg: newInbox.msg, created_at: new Date() }); 
            newInbox.msg = '';
            
            var inbox = {
                msg: MSG,
                to_user_id: newInbox.to_user_id,
            };

            axios.post('/api/v1/msg/inboxes', inbox)
                .then( resp => {  
                    //app.inbox.msg = '';
                    //app.$store.commit('submitMsg', 'add');  
                    //app.getLists(); 
                })
                .catch( resp => {  
                    app.$store.commit('errorMessages', resp); 
                });
        },  
        /*deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/msg/inboxes/' + id)
                    .then( resp => {
                        app.inboxes.splice(index, 1); 
                        app.$store.commit('submitMsg', 'delete');  
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp);
                    });
            }
        },*/ 
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: { 
                message_list: 'Messages List', 
                select_user_chat: 'Select User To Chat', 
                load_more: 'Load More', 
                type_message: 'Type Message ...', 
                send: 'Send', 
            },
            bn: { 
                message_list: 'মেসেজের তালিকা', 
                select_user_chat: 'চ্যাট ব্যবহারকারী নির্বাচন করুন', 
                load_more: 'আরও দেখুন', 
                type_message: 'মেসেজ লিখুন', 
                send: 'পাঠান', 
            },  
        },
        sharedMessages: commonMessages
    },
} //export default
</script>