<template>
    <div class="component">
        <div class="home sidebar light" v-if="!$data">  
        </div><!-- /.main-preloader -->
            
        <sidebar-nav></sidebar-nav>

        <!-- Page Content  -->
        <div id="content" :class="($root.show_sidebar_left) ? 'bg-gray' : 'bg-gray toggle'">
            <header-nav></header-nav>

            <div class="main-content bg-gray"> 
                <div class="row"> 
                    <notice-board v-if="$route.name != 'nbNoticeBoard'"></notice-board>

                    <div class="col-12">
                        <div class="router-view-preloader" v-if="!$data">
                            Loading ... 
                        </div><!-- /.router-view-preloader -->

                        <router-view></router-view>
                        <!-- set progressbar -->
                        <vue-progress-bar></vue-progress-bar>
                    </div><!--  /.col--12 --> 
                </div><!--  /.row -->
            </div><!--  /.main content -->

        </div><!--  /.content -->
    </div><!--  /.component -->
</template> 

<script>  
export default {  
    components: {   
        'header-nav': () => import('@views/layout/header-nav/index.vue'),
        'sidebar-nav': () => import('@views/layout/sidebar-nav/index.vue'),
        'notice-board': () => import('@views/nb/notice-board/index.vue'),
    },
    data() { 
        return {   
        }
    },
    watch: { }, 
    mounted() {  
    },  
    created() { },   
    methods: { 
         
    }, //methods 
} //export default
</script>
