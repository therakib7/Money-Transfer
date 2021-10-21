<template>
    <div> 
        <div :class="($route.name != 'nbNoticeBoard') ? 'col-12 mt-3 warning-content' : 'mt-3 warning-content'" v-if="notices.length && show_notice"> 
            <div id="notice-board" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators" v-if="notices.length > 1">
                  <li v-for="notice, index in notices" :class="(index == 0) ? 'active' : ''" data-target="#notice-board" :data-slide-to="index"></li> 
                </ol>
                <div class="carousel-inner">
                    <div v-for="notice, index in notices" :class="(index == 0) ? 'carousel-item active' : 'carousel-item'">
                        <div :class="'alert alert-'+notice.type+' alert-dismissible fade show'" role="alert">
                            <h3 class="alert-heading">{{notice.title}}</h3>
                            <div v-html="notice.content"></div>

                            <button v-if="$route.name != 'nbNoticeBoard'" type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeNotice(notice.id)">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div><!-- /.alert --> 
                    </div><!-- /.carousel-item -->  
                </div><!-- /.carousel-inner --> 
            </div><!-- /.carousel -->  
            
        </div><!-- /.col-12 -->
        <div v-else class="mt-3"><p v-if="($route.name == 'nbNoticeBoard' && preloader == false)">There is no notice</p></div>
    </div>
</template>

<script>   
export default {
    components: {     
        'date-time-picker': () => import('vue-vanilla-datetime-picker'), 
    },   
    data() {
        return {     
            show_notice: true,
            notices: [], 
            preloader: true, 
        }
    },
    watch: { 
    },
    created() {     
        var app = this;
        setTimeout(function() {
            app.get_notice();
        }, 1000);
    }, 
    mounted () {  
    }, 
    mounted() {   
        this.$root.popupModal(); 
    },
    updated() {   
        this.$root.dropdownModal(); 
    },
    methods: {   
        get_notice() {
            let seen_notices = '';
            if ( this.$route.name != 'nbNoticeBoard' ) {
                let notice_ids = JSON.parse( this.$cookie.get('closed_notices') ) 
                seen_notices = (notice_ids) ? '&notice_ids=' + notice_ids.join(',') : '';
            }  

            var app = this;
            axios.get('/api/v1/nb/notices?user_notice=1' + seen_notices)
            .then( resp => { 
                app.notices = resp.data.notices; 
                app.preloader = false;
            })
            .catch( resp => {
                app.$store.commit('errorMessages', resp); 
            });
        },
        closeNotice( id ) {   
            this.show_notice = false;
            let notice_ids = JSON.parse( this.$cookie.get('closed_notices') );

            if ( !notice_ids) {
                this.$cookie.set('closed_notices', JSON.stringify([id]) )
            } else {
                if ( notice_ids.indexOf(id) == -1 ) {
                    notice_ids.push(id)
                    this.$cookie.set('closed_notices', JSON.stringify(notice_ids) ) 
                }
            }  
        }
    } //methods
} //export default
</script>
 