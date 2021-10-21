<template>
    <!-- Modal Create-->
    <div v-can="'balance-transfer-create'" class="modal fade" id="searchModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">New Bal</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <form v-on:submit.prevent="saveForm()">
                    <div class="modal-body"> 
    
                    <p>this is the test content this is the test content </p>
                        
                    </div><!--  /.modal-body -->

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('close') }}</button>
                        <button class="btn btn-primary" type="submit">
                        {{ $t('transfer') }}
                        </button>
                    </div><!--  /.modal-footer -->
                </form>
            </div><!--  /.modal-content -->
        </div><!--  /.modal-dialog -->
    </div><!--  /.modal --> 
</template>

<script>     
export default {
    components: {  
        //vueDropzone: vue2Dropzone,  
    },
    props: ['id'],
    data() {
        return {      
            preloader: true,
        }
    },
    watch: { },
    mounted() { 
        document.getElementById('searchModal').classList.toggle('show');
        this.$root.popupModal(); 
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
    },
} //export default
</script>