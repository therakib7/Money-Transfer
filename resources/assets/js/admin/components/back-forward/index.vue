<template>
    <div class="back-forward float-right">
        <button class="btn btn-sm btn-info" :title="$t('c_h_go_b')"><a @click="$router.go(-1)"><i class="icon-left" aria-hidden="true"></i></a></button> 
        <button class="btn btn-sm btn-info" :title="$t('c_h_go_f')"><a @click="$router.go(1)"><i class="icon-right" aria-hidden="true"></i></a></button> 
    </div><!-- /.float-right -->
</template>

<script>
import commonMessages from '@admin/locales/shared-i18n-setup'    
export default {
    components: {   
        //ContentLoader
    },
    props: { 
         
    }, 
    data() {
        return {      
            //selected_id: '', 
        }
    },  
    mounted() {   
        this.$root.popupModal(); 
    },
    updated() {   
        this.$root.dropdownModal(); 
    },
    methods: {
        
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: { 
            },
            bn: { 

            },  
        },
        sharedMessages: commonMessages
    },
} //export default
</script>