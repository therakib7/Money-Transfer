<template>
    <div class="component">
        <div id="top-menu">
            <nav class="menu-bar navbar navbar-expand-lg bg-w">
                <div class="container-fluid p-0">
                    <ul class="navbar-nav menu">
                        <li class="nav-item menu-btn">
                            <a class="nav-link " data-widget="pushmenu" href="#" @click.prevent="$root.show_sidebar_left =! $root.show_sidebar_left"><i class="icon-menu"></i></a>
                        </li> 
                        <li class="nav-item"> 
                            <router-link :to="{ name: 'home' }">
                                {{ $t('home') }}
                            </router-link>
                        </li>
                        <li class="nav-item"> 
                            <router-link class="nav-link" :to="{ name: 'mtUserHelps', query: { page: 1, per_page: 20 } }">
                               {{ $t('help') }}
                            </router-link>
                        </li> 
                    </ul><!-- /.navbar-nav --> 

                    <div class="navbar-collapse" id="navbarSupportedContent">
                        <nav class="site-nav site-header nav navbar-nav ml-auto p-0"> 
                            <div class="menu-content">
                                <ul class="mainmenu">  
                                     
                                    <li class="dropdown messages-menu open active" v-if="0">
                                        <a href="#" class="dropdown-toggle" data-toggle="dropdownd" aria-expanded="true">
                                            <i class="icon-mail"></i>
                                            <span class="nunber bg-success right">4</span>
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li class="header">You have 4 messages</li>
                                            <li><!-- messages item -->
                                                <ul class="menu">
                                                    <li>
                                                        <a href="#">
                                                            <div class="float-left">
                                                                <img src="/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                                                            </div>
                                                            <div class="float-right">
                                                                <h4>
                                                                    Support Team
                                                                    <small><i class="icon-clock"></i> 5 mins</small>
                                                                </h4>
                                                                <p>Why not buy a new awesome theme?</p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <div class="float-left">
                                                                <img src="/img/user3-128x128.jpg" class="img-circle" alt="User Image">
                                                            </div>
                                                            <div class="float-right">
                                                                <h4>
                                                                    AdminLTE Design Team
                                                                    <small><i class="icon-clock"></i> 2 hours</small>
                                                                </h4>
                                                                <p>Why not buy a new awesome theme?</p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <div class="float-left">
                                                                <img src="/img/user4-128x128.jpg" class="img-circle" alt="User Image">
                                                            </div>
                                                            <div class="float-right">
                                                                <h4>
                                                                    Developers
                                                                    <small><i class="icon-clock"></i> Today</small>
                                                                </h4>
                                                                <p>Why not buy a new awesome theme?</p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <div class="float-left">
                                                                <img src="/img/user3-128x128.jpg" class="img-circle" alt="User Image">
                                                            </div>
                                                            <div class="float-right">
                                                                <h4>
                                                                    Sales Department
                                                                    <small><i class="icon-clock"></i> Yesterday</small>
                                                                </h4>
                                                                <p>Why not buy a new awesome theme?</p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <div class="float-left">
                                                                <img src="/img/user4-128x128.jpg" class="img-circle" alt="User Image">
                                                            </div>
                                                            <div class="float-right">
                                                                <h4>
                                                                    Reviewers
                                                                    <small><i class="icon-clock"></i> 2 days</small>
                                                                </h4>
                                                                <p>Why not buy a new awesome theme?</p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul><!-- /.menu -->
                                            </li><!--/. messages item -->
                                            <li class="footer">
                                                <a href="#">See All Messages</a>
                                            </li>
                                        </ul>
                                    </li><!-- /.messages-menu -->
                                    <!-- notifications-menu -->
                                    <li class="dropdown notifications-menu open" v-if="0">
                                        <a href="#" class="dropdown-toggle" data-toggle="dropdownd" aria-expanded="true">
                                            <i class="icon-bell"></i>
                                            <span class="nunber amber">10</span>
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li class="header">You have 10 notifications</li>
                                            <li><!--notifications item -->
                                                <ul class="menu">
                                                    <li>
                                                        <a href="#">
                                                            <i class="icon-users"></i> 5 new members joined today
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i class="icon-attention"></i> Very long description here that may not fit into the
                                                            page and may cause design problems
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i class="icon-users"></i> 5 new members joined
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i class="icon-basket"></i> 25 sales made
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i class="icon-user text-red"></i> You changed your username
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li><!--/.notifications item -->
                                            <li class="footer"><a href="#">View all</a></li>
                                        </ul>
                                    </li><!-- /.notifications-menu -->
                                    
                                    <!-- tasks-menu -->
                                    <li class="dropdown tasks-menu open" v-if="0">
                                        <a href="#" class="dropdown-toggle" data-toggle="dropdownd" aria-expanded="true">
                                            <i class="icon-flag-empty"></i>
                                            <span class="nunber amaranth">9</span>
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li class="header">You have 9 tasks</li>
                                            <li>
                                                <ul class="menu">
                                                    <li><!-- Task item -->
                                                        <a href="#">
                                                            <h4>
                                                                Design some buttons
                                                                <small class="float-right">20%</small>
                                                            </h4>
                                                            <div class="progress xs">
                                                                <div class="progress-bar pelorous progress-bar-aqua" style="width: 20%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                                    <span class="sr-only">20% Complete</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li><!-- end task item -->
                                                    <li><!-- Task item -->
                                                        <a href="#">
                                                            <h4>
                                                                Create a nice theme
                                                                <small class="float-right">40%</small>
                                                            </h4>
                                                            <div class="progress xs">
                                                                <div class="progress-bar  bg-success right" style="width: 40%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                                    <span class="sr-only">40% Complete</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li><!-- end task item -->
                                                    <li><!-- Task item -->
                                                        <a href="#">
                                                            <h4>
                                                                Some task I need to do
                                                                <small class="float-right">60%</small>
                                                            </h4>
                                                            <div class="progress xs">
                                                                <div class="progress-bar amber" style="width: 60%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                                    <span class="sr-only">60% Complete</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li><!-- end task item -->
                                                    <li><!-- Task item -->
                                                        <a href="#">
                                                            <h4>
                                                                Make beautiful transitions
                                                                <small class="float-right">80%</small>
                                                            </h4>
                                                            <div class="progress xs">
                                                                <div class="progress-bar amaranth" style="width: 80%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                                    <span class="sr-only">80% Complete</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li><!-- end task item -->
                                                </ul><!-- /.menu -->
                                            </li>
                                            <li class="footer">
                                                <a href="#">View all tasks</a>
                                            </li>
                                        </ul>
                                    </li><!-- /.tasks-menu --> 

                                    <li class="d-none d-md-inline-block">
                                        <a href="#" class="dropdown" data-toggle="dropdown">
                                            <img :src="$root.profile.image" class="user-image" alt="Img">
                                            <span>{{ $root.profile.name }}</span>

                                            <ul class="dropdown-menu">
                                                <!-- User image -->
                                                <li class="user-header pelorous clearfix">
                                                    <img :src="$root.profile.image" class="user-image" alt="User Image">

                                                    <p class="clearfix">
                                                        {{ $root.profile.name }} <br />
                                                        <small>{{ $root.profile.role }} Account</small> <br />
                                                        <small>Member since {{ $root.profile.since }}</small>
                                                    </p>
                                                </li><!-- /.user-header --> 
                                                <!-- Menu Footer-->
                                                <li class="user-footer clearfix">
                                                    <div class="float-left">
                                                        <router-link :to="{ name: 'mtSettingProfile' }" class="btn btn-default btn-flat bg-gray">
                                                            {{ $t('profile') }} 
                                                        </router-link>
                                                    </div>
                                                    <div class="float-right">
                                                        <a href="#" @click.prevent="$root.logout()" class="btn btn-default btn-flat bg-gray">{{ $t('sign_out') }}</a>
                                                    </div>
                                                </li><!-- /.user-footer --> 
                                            </ul><!-- /.dropdown-menu -->
                                        </a><!-- /.dropdown -->
                                    </li>
                                    <!-- right-bar -->
                                    <li class="right-bar">
                                        <a href="#" class="control-sidebar" @click.prevent="toggle_sidebar =! toggle_sidebar">
                                            <i class="icon-cogs"></i>
                                        </a>
                                        <div :class="(toggle_sidebar) ? 'right-sidebar slide-left' : 'right-sidebar'">
                                            <div class="close-menu" @click="toggle_sidebar =! toggle_sidebar">
                                                <i class="icon-cancel"></i>
                                            </div><!-- /.close-menu -->
                                            <nav>
                                                <div class="nav nav-tabs" id="nav-tab"> 
                                                    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home">
                                                        <i class="icon-wrench"></i>
                                                    </a>
                                                    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile">
                                                        <i class="icon-home"></i>
                                                    </a>
                                                    <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact">
                                                        <i class="icon-cogs"></i>
                                                    </a>
                                                </div>
                                            </nav><!-- /.nav -->

                                            <div class="tab-content" id="nav-tabContent">
                                                <div class="tab-pane fade show active" id="nav-home">
                                                    <select v-model="$root.$i18n.locale">
                                                      <option v-for="locale, key in localeStrings" :value="key">{{locale}}</option> 
                                                    </select>
                                                </div>
                                                <div class="tab-pane fade" id="nav-profile">
                                                    <p>Comming Soon</p>
                                                </div>

                                                <div class="tab-pane fade" id="nav-contact">
                                                    <div class="color-content">
                                                        <h4>{{ $t('dashboard_theme') }}</h4>
                                                        <div id="dashboard-theme">
                                                            <input type="radio" name="dashboard-theme" class="mb-3" value="dashboard-one" /> 
                                                            <input type="radio" name="dashboard-theme" class="mb-3" value="dashboard-two" /> 
                                                            <input type="radio" name="dashboard-theme" class="mb-3" value="dashboard-three" /> 
                                                            <input type="radio" name="dashboard-theme" class="mb-3" value="dashboard-four" /> 
                                                            <input type="radio" name="dashboard-theme" class="mb-3" value="dashboard-five" />  
                                                        </div><!-- /#dashboard-theme  --> 
                                                    </div>
                                                </div><!-- /.tab-pane -->
                                            </div><!-- /.tab-content -->
                                        </div><!--  /.right-sidebar -->
                                        <div class="control-sidebar-bg"></div>
                                    </li><!-- /.right-bar -->
                                </ul> <!-- /.mainmenu -->
                            </div> <!-- /.menu-content-->
                        </nav><!-- /.site-nav -->
                    </div><!-- /.navbar-collapse -->
                </div><!-- /.container-fluid -->
            </nav><!-- /.menu-bar -->
        </div><!-- /#top-menu"  -->
    </div><!--  /.component -->
</template> 

<script>  

export default { 
    data() { 
        return {   
            toggle_sidebar: false, 
            localeStrings: {
                en: "English",
                bn: "বাংলা", 
            }
        }
    },
    watch: {
         
    }, 
    created() { 
    },  
    mounted() {   
        this.$root.dropdownModal();     
        
        var app = this;
        window.addEventListener('mouseup', function(e){ 
            let right_sidebar = document.querySelector('.right-sidebar');
            if ( right_sidebar && !right_sidebar.contains(e.target) ) { 
                right_sidebar.classList.remove("slide-left");
                app.toggle_sidebar = false; 
            }  
        }); 
    },
    updated() {   
    },
    methods: {  
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: { 
                money_transfer: 'Money Transfer', 
                mobile_rechage: 'Mobile Recharge', 
                mobile_banking: 'Mobile Banking',  
                home: 'Home',  
                help: 'Help',  
                profile: 'Profile', 
                sign_out: 'Sign out', 
                dashboard_theme: 'Dashboard Theme',  
            },
            bn: { 
                money_transfer: 'টাকা ট্রান্সফার', 
                mobile_rechage: 'মোবাইল রিচার্জ', 
                mobile_banking: 'মোবাইল ব্যাংকিং',  
                home: 'বাড়ি',  
                help: 'সাহায্য',  
                profile: 'প্রোফাইল',  
                sign_out: 'বাহির হন',  
                dashboard_theme: 'ড্যাশবোর্ড থিম', 
            },  
        }
    },
} //export default
</script>

