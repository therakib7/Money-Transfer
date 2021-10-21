<template>
    <!-- Create Media Model -->
    <div class="modal media-modal fade" :id="id">
        <div class="modal-dialog modal-lg big-modal" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ $t('insert_new_media') }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div> 
                
                <div class="modal-body"> 

                    <div :class="'tab-area'+id">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" :data-target="'#upload-media'+id" role="tab" aria-controls="upload-media" aria-selected="true">{{ $t('uplode_media') }}</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" :data-target="'#media-list'+id" role="tab" aria-controls="media-list" aria-selected="false" v-on:click="getMediaLists()">{{ $t('media_list') }}</a>
                            </li>  
                        </ul>
                        <div class="tab-content" id="mediaTabContent">
                            <div class="tab-pane fade show active" :id="'upload-media'+id" role="tabpanel" >
                                <br />
                                <vue-dropzone ref="myVueDropzone" :id="'dropzone'+id" :options="dropzoneOptions" @vdropzone-complete="afterComplete"></vue-dropzone>
                                <br />
                            </div><!--  /.upload-media -->
                            <div class="tab-pane fade" :id="'media-list'+id" role="tabpanel">
                                <div class="media-list">   
                                    <template v-if="preloader">
                                        <preloader></preloader>
                                    </template>
                                    
                                    <div class="row" v-else>
                                        <div class="card-columns">
                                            <div class="card" v-for="media, index in medias.data":class="activeClass(media.id)"> 
                                                <img class="card-img-top" :src="img_dir+media.resized_name" @click="onSelectImage(media)">
                                                <div class="card-body">
                                                    <p class="card-text text-center">{{media.original_name.substr(0, 20) + '...'}} <br /> </p>
                                                    <p class="float-right text-danger cursor-pointer" @click="deleteEntry(media.id, index)"><i class="icon-trash-empty"></i></p>
                                                </div>
                                            </div><!--  /.card -->
                                        </div><!--  /.card-columns --> 
                                    </div><!--  /.row --> 

                                    <template v-if="noData"><tr class="bg-white" v-html="noData"></tr></template> 
                                     
                                    <div class="table-actions">   
                                        <pagination :data="medias" :limit="2" @pagination-change-page="getMediaLists"></pagination> 
                                    </div><!--  /.table-actions -->
                                    
                                </div><!--  /.media-list --> 
                            </div><!--  /.media-list -->
                        </div><!--  /.tab-content -->
                    </div><!--  /.tab-area -->  
                    
                </div><!--  /.modal-body -->

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('close') }}</button>
                </div><!--  /.modal-footer -->
              
            </div><!--  /.modal-content -->
        </div><!--  /.modal-dialog -->
    </div><!--  /.modal -->
</template>

<script> 
import commonMessages from '@admin/locales/shared-i18n-setup'
// add vue2Dropzonee
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'   
export default {
    components: {  
        vueDropzone: vue2Dropzone,  
    },
    props: ['id'],
    data() {
        return {    
            dateOptions: this.$store.state.dateOptions,
            dropzoneOptions: {
                url: '/api/v1/medias',
                thumbnailWidth: 300,
                thumbnailHeight: 300,
                maxFiles: 5, // number of files
                maxFilesize: .5, // MB
                // addRemoveLinks: true,
                acceptedFiles: ".jpeg,.jpg,.png",
                // dictRemoveFile: 'Remove file',
                dictFileTooBig: 'Image is larger than 512KB',
                dictDefaultMessage : this.$t('dict_default_message'),
                headers: { 
                    "X-CSRF-TOKEN": document.head.querySelector('meta[name="csrf-token"]').content, 
                    //"Accept": "application/json",  
                    //"file_category": "avatar", 
                } 
            },
            medias: {},  
            img_dir: null,  
            selected_id: '',
            noData: '',
            preloader: true,
        }
    },
    watch: { },
    created() { }, 
    mounted() {   
        this.$root.popupModal(); 
        var app = this;

        var btn = document.querySelectorAll(".tab-area"+app.id+" [data-toggle='tab']"); 
        // When the user clicks the button, open the tab
        for (var i = 0; i < btn.length; i++) { 

            btn[i].onclick = function(e) { 
                e.preventDefault(); 

                var btn_two = document.querySelectorAll(".tab-area"+app.id+" [data-toggle='tab']"); 
                for (var i = 0; i < btn_two.length; i++) {
                    btn_two[i].classList.remove('show');
                    btn_two[i].classList.remove('active');
                }

                var tab_panel = document.querySelectorAll(".tab-area"+app.id+" .tab-content .tab-pane"); 
                for (var i = 0; i < tab_panel.length; i++) {
                    tab_panel[i].classList.remove('show');
                    tab_panel[i].classList.remove('active');
                } 
                
                let tab = document.querySelector(this.getAttribute("data-target")); 
                tab.classList.add("show");
                tab.classList.add("active");
                e.target.classList.add("active");
            }
        }
    },
    updated() {   
        this.$root.dropdownModal(); 
    },
    methods: {
        afterComplete(file) { 
            this.getMediaLists(); 
        },
        onSelectImage(data) {  
            this.selected_id = data.id;
            this.$emit('select-image', data);
        },
        activeClass(id) { 
            return (this.selected_id == id) ? 'file-seleted' : '';  
        },  
        getMediaLists(page = 1, click = false) { 
            var app = this;   
            let per_page = this.$route.query.per_page;   
            
            let current_page = (click) ? page : this.$route.query.page ;
            if ( click ) {
                this.$router.push( { path: document.location.search, query: { page: current_page, per_page: per_page } } );  
            }

            let allQuery = this.$route.query;

            var queryString = Object.keys(allQuery).map(key => key + '=' + allQuery[key]).join('&');

            app.preloader = true;
            
            axios.get('/api/v1/medias?'+ queryString)
                .then( resp => {  
                    app.preloader = false;
                    
                    app.medias = resp.data.medias;  
                    app.img_dir = resp.data.img_dir; 

                    if ( app.medias.data.length == 0 ) {                                 
                        app.noData = app.$store.state.noData;
                    } else {
                        app.noData = '';
                    }
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        },
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/medias/' + id)
                    .then( resp => {
                        app.medias.data.splice(index, 1); 
                        app.$store.commit('submitMsg', 'delete');  
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp);
                    });
            }
        }, 
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: { 
                insert_new_media: 'Create Or Insert New Media', 
                uplode_media: 'Upload Media', 
                media_list: 'Media List', 
                dict_default_message: 'Drop files here or click to upload', 
            },
            bn: { 
                insert_new_media: 'নতুন মিডিয়া সংযুক্ত করুন',  
                uplode_media: 'মিডিয়া আপলোড করুন',  
                media_list: 'মিডিয়া তালিকা',  
                dict_default_message: 'এখানে ফাইল দিন অথবা আপলোড করুন', 
            },  
        },
        sharedMessages: commonMessages
    },
} //export default
</script>