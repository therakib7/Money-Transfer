<template>
    <div class="pagination-content mt-2">
        <ul class="pagination">
            <li class="page-item pagination-prev-nav mr-3" v-if="data.prev_page_url && data.current_page != 1">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="selectPage(--data.current_page)">
                    <slot name="prev-nav"> 
                        <span class="">{{ $t('previous') }}</span>
                    </slot>
                </a>
            </li>
            <li class="page-item pagination-next-nav" v-if="data.next_page_url">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="selectPage(++data.current_page)">
                    <slot name="next-nav"> 
                        <span class="">{{ $t('next') }}</span>
                    </slot>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>  
import commonMessages from '@admin/locales/shared-i18n-setup' 
export default { 
    props: {
        data: {
            type: Object,
            default: function() {
                return {
                    current_page: 1,
                    data: [],
                    from: 1,
                    last_page: 1,
                    next_page_url: null,
                    per_page: 10,
                    prev_page_url: null,
                    to: 1,  
                }
            }
        }, 
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
        selectPage: function(page, click = true) {
            
            if (page === '...') {
                return;
            } 

            this.$emit('pagination-change-page', page, click);
        },
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