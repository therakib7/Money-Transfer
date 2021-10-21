<template>
    <div class="sub-component">  
        <template v-if="design == 'list' ">
            <div class="preloader"> 
                <content-loader
                    :height="130"
                    :width="400"
                    :speed="2"
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb" >
                    <circle cx="10" cy="20" r="8" /> 
                    <rect x="25" y="15" rx="5" ry="5" width="220" height="10" /> 
                    <circle cx="10" cy="50" r="8" /> 
                    <rect x="25" y="45" rx="5" ry="5" width="220" height="10" /> 
                    <circle cx="10" cy="80" r="8" /> 
                    <rect x="25" y="75" rx="5" ry="5" width="220" height="10" /> 
                    <circle cx="10" cy="110" r="8" /> 
                    <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
                </content-loader> 
            </div><!-- /.preloader --> 
        </template> 
    </div><!--  /.component --> 
</template>

<script>  
import { ContentLoader } from "vue-content-loader"
export default {
    components: {   
        ContentLoader
    },
    props: { 
        design: {
            type: String,
            default: 'list'
        }
    }, 
    data() {
        return {    
            dateOptions: this.$store.state.dateOptions,  
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
        
    } //methods
} //export default
</script>