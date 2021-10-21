<template>
    <div class="component">

        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               {{ $t('documentation') }}
            </h2>  
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body settings"> 
            <div class="row"> 

                <div class="col-md-3 pr-0"> 
                    <div class="d-block d-lg-none">   
                        <button type="button" class="btn btn-md d-block w-100 mb-3 btn-info category-menu">
                            <i class="icon-menu"></i> <span>{{ $t('categories') }}</span>
                        </button>
                    </div> 
                
                    <div class="custom-menu-modal menu-top">
                        <div class="custom-header d-block d-md-none">
                            <h5 class="modal-title">{{ $t('help_cat') }}</h5>
                            <button type="button" class="close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div> 

                        <ul class="sidebar-menu bg-white">
                             
                            <template v-for="cat, index in helpCats">
                                {{showSubMenu()}} 
                                <li class="menu-item" v-if="!cat.childs.length">
                                    <a :class="( $route.query.cat_id && $route.query.cat_id == cat.id ) ? 'router-link-active' : ''" href="#" @click.prevent="selectedCat(cat.id)">  
                                        <span>{{cat.name}}</span> 
                                    </a> 
                                </li> 
                                <li class="menu-item" v-else>
                                    <a href="#" class="has-sub-menu" onclick="event.preventDefault();"> 
                                        <span>{{cat.name}}</span>
                                        <i class="icon-angle-down right" aria-hidden="true"></i> 
                                    </a> 
                                    <ul class="sub-menu" style="display: none;"> 
                                        <template v-for="catChild in cat.childs">
                                            <li class="menu-item" v-if="!catChild.childs.length">
                                                <a :class="( $route.query.cat_id && $route.query.cat_id == catChild.id ) ? 'router-link-active' : ''" href="#" @click.prevent="selectedCat(catChild.id)">
                                                    <i class="icon-circle-empty" aria-hidden="true"></i><span>{{catChild.name}}</span>
                                                </a>
                                            </li> 
                                            <li class="menu-item" v-else>
                                                <a href="#" class="has-sub-menu" onclick="event.preventDefault();"> 
                                                    <i class="icon-circle-empty" aria-hidden="true"></i><span>{{catChild.name}}</span>
                                                    <i class="icon-angle-down right" aria-hidden="true"></i> 
                                                </a> 
                                                <ul class="sub-menu" style="display: none;"> 
                                                    <template v-for="catChild2 in catChild.childs">
                                                        <li>
                                                            <a :class="( $route.query.cat_id && $route.query.cat_id == catChild2.id ) ? 'router-link-active' : ''" href="#" @click.prevent="selectedCat(catChild2.id)">
                                                                <i class="icon-circle-empty" aria-hidden="true"></i><span>{{catChild2.name}}</span>
                                                            </a>
                                                        </li> 
                                                    </template>   
                                                </ul>
                                            </li>
                                        </template>    
                                    </ul>
                                </li>  
                            </template> 
                            
                            <li class="menu-item">  
                                <router-link class="nav-link" :to="{ name: 'nbNoticeBoard' }">
                                    <span>{{ $t('n_b') }}</span> 
                                </router-link>
                            </li>
                            <li class="menu-item">  
                                <router-link class="nav-link" :to="{ name: 'msgInbox', query: { id: 1, page: 1, per_page: 20 } }">
                                    <span>{{ $t('live_s') }}</span> 
                                </router-link>
                            </li>
                        </ul> <!-- /.sidebar-menu --> 
                    </div><!--  /.modal-content -->
                </div><!-- /.col-md-3 --> 

                <div class="col-md-9">
                    <div id="accordion">
                        <div v-if="preloader"> 
                            {{ $t('loading') }}...
                        </div>  

                        <div class="list-group mb-2" v-if="!preloader">
                            <div class="list-group-item cursor-pointer">
                               <div class="panel-heading mb-2 mt-2">
                                    <input placeholder=" " type="text" class="form-control" id="search" v-on:keyup="getLists(null, null, true)" v-model="searchTitle">
                                </div>
                            </div> 
                        </div><!--  /.list-group --> 

                        <div class="browsing-category bg-white p-2 mb-2" v-if="$route.query.cat_id && !preloader">
                            <span class="font-weight-bold">{{ $t('browsing_cat') }}:</span> {{ catTitle( $route.query.cat_id) }}
                        </div><!-- /.browsing-category -->

                        <div class="list-group mb-2" v-for="help, index in helps.data">
                            <div class="list-group-item cursor-pointer" @click.prevent="selectedPost(help.id)">
                               <div class="panel-heading collapsed" data-toggle="collapse" aria-expanded="true" aria-controls="collapseOne">
                                    {{ help.title }}
                                </div>
                            </div>  
                            <div class="modal-body bg-white" style="margin-top: 1px" v-if="$route.query.post_id && singlePreloader && !searchTitle">  
                                <div class="row">  
                                    <div class="col-12 mb-4">  
                                        <button type="button" :class="(help_type == 'video') ? 'btn btn-sm btn-dark mb-1' : 'btn btn-sm btn-light border mb-1'" @click="help_type = 'video'">Video Document</button>
                                        <button type="button" :class="(help_type == 'text') ? 'btn btn-sm btn-dark mb-1' : 'btn btn-sm btn-light border mb-1'" @click="help_type = 'text'">Text Document</button>
                                        <select class="user-type" v-model="user_type">
                                            <option value="basic">{{ $t('basic_user') }}</option>
                                            <option value="medium">{{ $t('medium_user') }}</option>
                                            <option value="advance">{{ $t('advance_user') }}</option>
                                        </select>
                                    </div><!--  /.col-12 mb-4 --> 

                                    <template v-if=" user_type == 'basic' && help_type == 'video' ">
                                        <div class="col-12 mb-3 help-content" v-if="help.basic_video" v-html="help.basic_video"></div>
                                        <div class="col-12 mb-3 no-help" v-else> There is no basic user video document</div> 
                                    </template>
                                    
                                    <template v-else-if=" user_type == 'basic' && help_type == 'text' ">
                                        <div class="col-12 mb-3 help-content" v-if="help.basic_text" v-html="help.basic_text"></div>
                                        <div class="col-12 mb-3 no-help" v-else> There is no basic user text document</div> 
                                    </template> 

                                    <template v-if=" user_type == 'medium' && help_type == 'video' ">
                                        <div class="col-12 mb-3 help-content" v-if="help.medium_video" v-html="help.medium_video"></div>
                                        <div class="col-12 mb-3 no-help" v-else> There is no medium user video document</div> 
                                    </template>
                                    
                                    <template v-else-if=" user_type == 'medium' && help_type == 'text' ">
                                        <div class="col-12 mb-3 help-content" v-if="help.medium_text" v-html="help.medium_text"></div>
                                        <div class="col-12 mb-3 no-help" v-else> There is no medium user text document</div> 
                                    </template>

                                    <template v-if=" user_type == 'advance' && help_type == 'video' ">
                                        <div class="col-12 mb-3 help-content" v-if="help.advance_video" v-html="help.advance_video"></div>
                                        <div class="col-12 mb-3 no-help" v-else> There is no advance user video document</div> 
                                    </template>
                                    
                                    <template v-else-if=" user_type == 'advance' && help_type == 'text' ">
                                        <div class="col-12 mb-3 help-content" v-if="help.advance_text" v-html="help.advance_text"></div>
                                        <div class="col-12 mb-3 no-help" v-else> There is no advance user text document</div> 
                                    </template>                                     

                                </div><!--  /.form-row -->  
                            </div><!--  /.modal-body -->

                            <div class="modal-body bg-white" style="margin-top: 1px" v-if="$route.query.post_id && !singlePreloader">
                                <div class="row">
                                    <div class="col-12"><p>Loading...</p></div><!-- /.col-12 -->
                                </div><!-- /.row -->
                            </div><!-- /.modal-body bg-white -->    

                        </div><!--  /.list-group --> 

                        <div class="row mt-3" v-if="( $route.query.post_id && singlePreloader && !searchTitle ) && ( prev_help || next_help )">  
                            <div class="col-12">
                                <nav class="post-navigation clearfix ">
                                    <div class="post-previous" v-if="prev_help">
                                        <a href="#" @click.prevent="selectedPost(prev_help.id)" rel="prev"><i class="fa fa-angle-double-left"></i> <h3> <span>পূর্বের ডকুমেন্ট </span> {{ prev_help.title }}</h3></a>                
                                    </div>                                                 

                                    <div class="post-next" v-if="next_help">
                                        <a href="#" @click.prevent="selectedPost(next_help.id)" rel="next"><i class="fa fa-angle-double-right"></i> <h3> <span>পরবর্তি ডকুমেন্ট</span> {{ next_help.title }}</h3></a>                
                                    </div>        
                                </nav>
                            </div><!--  /.col-12 mb-3 -->  
                        </div><!--  /.form-row -->  

                        <div class="modal-body bg-white mb-3 mt-3" v-if="$route.query.post_id && singlePreloader && related_helps.length && !searchTitle">  
                            <div class="row">  
                                <div class="col-12">
                                    <h4>এই সম্পর্কিত আরো ডকুমেন্ট</h4>
                                    <ul type="square">
                                        <li v-for="help in related_helps"><a href="#" @click.prevent="selectedPost(help.id)">{{help.title}}</a></li> 
                                    </ul>
                                </div><!--  /.col-12 mb-3 -->  
                            </div><!--  /.form-row -->  
                        </div><!--  /.modal-body -->

                        <div class="modal-body bg-white" v-if="noData">  
                            <div class="row">  
                                <div class="col-12 mb-3">
                                    <template v-if="$route.query.cat_id">
                                        No documentation found in this category.
                                    </template>
                                    <template v-else>
                                        {{ $t('no_doc') }}
                                    </template> 
                                </div><!--  /.col-12 mb-3 -->  
                            </div><!--  /.form-row -->  
                        </div><!--  /.modal-body -->

                        <pagination :data="helps" :limit="2" @pagination-change-page="getLists"></pagination> 
                        
                    </div><!-- /#accordion  -->  
                </div><!-- /.col-md-9 -->
            </div><!-- /.row -->             
        </div><!--  /.component-body -->
    </div><!--  /.component --> 
</template>  

<script>   
export default { 
    data() {
        return {    
            dateOptions: this.$store.state.dateOptions,  
            searchTitle: '',
            user_type: 'basic',
            help_type: 'video',
            singlePreloader: true,
            helps: {},  
            related_helps: null,  
            prev_help: null,  
            next_help: null,  
            helpCats: [], 
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
        '$route': function (route) { 
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
        let setting_menu = document.querySelector(".category-menu");
        var cus_modal = document.querySelector('.custom-menu-modal');
        setting_menu.addEventListener('click', function(e){  
            cus_modal.classList.toggle("left"); 
        });

        let close_menu = document.querySelector(".custom-header .close");
        close_menu.addEventListener('click', function(e){  
            cus_modal.classList.remove("left"); 
        });   

        var close_menu_click = document.querySelectorAll(".custom-menu-modal .menu-item");  
        for (var i = 0; i < close_menu_click.length; i++) {
            close_menu_click[i].onclick = function(e) { 
               cus_modal.classList.remove("left"); 
            }
        }

        window.addEventListener('mouseup', function(e) {    
            if ( document.querySelector('.custom-menu-modal') && !document.querySelector('.custom-menu-modal').contains(e.target) ) { 
                cus_modal.classList.remove("left"); 
            }  
        }); 
    }, 
    methods: {   
        showSubMenu() {  
            var menu = document.querySelectorAll(".has-sub-menu"); 
            // When the user clicks the button, open the modal
            for (var i = 0; i < menu.length; i++) { 
                menu[i].onclick = function(e) { 
                    e.preventDefault(); 
                    let drop = this.parentElement.querySelector('.sub-menu');  
                    drop.classList.toggle("d-block");  
                }  
            }  
        },
        selectedCat(cat_id) {
            this.searchTitle = '';
            this.$router.push({name: 'mtUserHelps', query: { cat_id: cat_id, page: 1, per_page: 20, search: '' } })
            this.getLists();
        },
        catTitle( cat_id ) {
            for ( let cat of this.helpCats) {
                if ( cat.childs.length ) {
                    for ( let catChild of cat.childs) {
                        if ( catChild.childs.length) {
                            for ( let catChild2 of catChild.childs) {
                                if ( cat_id == catChild2.id ) {
                                    return catChild2.name; 
                                    break;
                                }
                            }
                        } else {
                            if ( cat_id == catChild.id ) {
                                return catChild.name; 
                                break;
                            }
                        } 
                    }
                } else {
                    if ( cat_id == cat.id ) {
                        return cat.name; 
                        break;
                    }
                } 
            } 
        },
        selectedPost(post_id) { 
            var arr = this.helps.data;

            /* Remove all without clicked help */
            this.helps.data = arr.filter(function(el) { return el.id == post_id; }); 
            this.searchTitle = '';

            this.$router.push({name: 'mtUserHelps', query: { post_id: post_id, page: 1, per_page: 20 } })

            this.getLists();
            //this.singlePreloader = true;
        },
        getLists(page = 1, click = false, search = false ) {

            if ( search ) {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                } 

                this.timer = setTimeout(() => { 
                    var query = this.searchTitle; 
                    if ( query.length < 5 && query.length != 0 ) { 
                        return;
                    } 
                    this.getListsFunc(page, click);
                }, 600); 
            } else {
                this.getListsFunc(page, click);
            } 
        }, 
        getListsFunc(page = 1, click = false ) {
            
            var app = this; 
            let per_page = this.$route.query.per_page;   
            
            let current_page = (click) ? page : this.$route.query.page; 

            let searchTitle = ( app.searchTitle.length > 1 ) ? app.searchTitle : ''; 

            var query = { 
                page: current_page, 
                per_page: per_page, 
                search: searchTitle 
            }

            if ( click ) { 
                this.$router.push( { path: document.location.search, query: query } );
            } else {
                this.$router.push( { path: document.location.search, query: query } );
            }

            let allQuery = this.$route.query;

            var queryString = Object.keys(allQuery).map(key => key + '=' + allQuery[key]).join('&');
                if ( app.searchTitle ) {
                    queryString += '&search='+app.searchTitle;
                }
            
            axios.get('/api/v1/mt/userhelps?'+ queryString)
                .then( resp => {  
                    app.preloader = false; 
                    app.helps = resp.data.helps;   
                    app.prev_help = resp.data.prev_help;   
                    app.next_help = resp.data.next_help;   
                    app.related_helps = resp.data.related_helps;   

                    if ( this.$route.query.post_id ) {
                        this.singlePreloader = true;
                    } else {
                        this.singlePreloader = false;
                    } 

                    app.helpCats = resp.data.helpcats;  
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
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: { 
                live_s: 'Live Support', 
                documentation: 'Documentation', 
                n_b: 'Notice Board', 
                no_doc: 'There is no documentation.', 
                categories: 'Categories', 
                help_cat: 'Help Categories', 
                loading: 'Loading', 
                browsing_cat: 'Browsing Category', 
                basic_user: 'Basic User', 
                medium_user: 'medium User', 
                advance_user: 'Advance User', 
            },
            bn: { 
                live_s: 'গ্রাহক সাহায্য', 
                documentation: 'ব্যবহার বিধি', 
                n_b: 'নোটিস বোর্ড', 
                no_doc: 'কোন ব্যবহার বিধি পাওয়া যায়নি।', 
                categories: 'শ্রেণী সমূহ', 
                help_cat: 'ব্যবহার বিধির শ্রেণী', 
                loading: 'লোডিং',
                browsing_cat: 'ব্রউজিং শ্রেনী',
                basic_user: 'সাধারন ইউজার',
                medium_user: 'মধ্যম ইউজার',
                advance_user: 'এডভান্সড ইউজার',
            },  
        }
    },
} //export default
</script>

<style lang="scss" scoped>
    .post-navigation {
      background-color: white;
      border: 1px solid #f0f0f0;
      display: table;
      position: relative;
      table-layout: fixed;
      width: 100%;
    }
    .post-navigation .post-previous,
    .post-navigation .post-next {
      display: table-cell;
      position: relative;
      vertical-align: middle;
      width: 50%;
      border-left: 1px solid #f0f0f0;
      border-right: 1px solid #f0f0f0;
      @media only screen and (max-width: 414px) {
        width: 100% !important;
        display: inherit;
        text-align: left !important;
      }
    }
    .post-navigation .post-previous i.fa {
      left: 15px;
    }
    .post-navigation .post-next i.fa {
      right: 15px;
    }
    .post-navigation i.fa {
      font-size: 40px;
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    .post-navigation .post-previous {
      padding: 15px 10px 15px 0px;
      text-align: left;
      border-left: 0 none;
      border-right: 0 none;
    }
    .post-navigation .post-next {
      padding: 15px 0px 15px 10px;
      text-align: right;
      border-right: 0 none;
    }
    .post-navigation h3 {
      font-size: 1.25em;
      font-weight: normal;
      margin: 0;
      -webkit-transition: all 0.2s linear 0s;
      transition: all 0.2s linear 0s;
    }
    .post-navigation h3 span {
      display: block;
      font-size: 15px; 
      color: #969696;
    }
    .post-navigation .post-previous h3 {
      margin-left: 20px;
      @media only screen and (max-width: 414px) {
         margin-left: 10px;
      }
    }
    .post-navigation .post-next h3 {
      margin-right: 20px;
    }
    .post-navigation.no-next-link .post-previous {
      float: left;
      border-right: 1px solid #f0f0f0;
    }
    .post-navigation.post-navigation.no-next-link .post-next {
      float: right;
      border-left: 1px solid #f0f0f0;
    }
    .user-type {
        border: 1px solid #dfdfdf;
        background: #f7f7f7;
        padding: 3px;        
    }
</style>