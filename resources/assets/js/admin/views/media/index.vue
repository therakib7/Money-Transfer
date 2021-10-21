<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Content Media
            </h2> 
        </div><!--  /.component-heading -->

        <div class="component-body bg-white" style="padding: 20px;"> 
            <div class="tab-area">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a href="#">dsf</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" id="upload-media-tab" data-toggle="tab" href="#upload-media" role="tab" aria-controls="upload-media" aria-selected="true">Upload Media</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="media-list-tab" data-toggle="tab" href="#media-list" role="tab" aria-controls="media-list" aria-selected="false" v-on:click="loadAllMedia()">Media List</a>
                    </li> 
                    <div v-if="selectedFiles.length">
                        <span class="btn btn-sm btn-danger float-right" v-on:click="deleteSeleted()" style="position: relative; left: 120px; top: -10px; margin-bottom: -4px;"><i class="icon-trash-empty"></i> Delete Seleted</span>
                    </div>
                </ul>
                <div class="tab-content" id="mediaTabContent">
                    <div class="tab-pane fade show active" id="upload-media" role="tabpanel" aria-labelledby="upload-media-tab">
                        <br />
                        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-complete="afterComplete"></vue-dropzone>
                        <br />
                    </div><!--  /.upload-media -->
                    <div class="tab-pane fade" id="media-list" role="tabpanel" aria-labelledby="media-list-tab">
                        <div class="row media-list">
                            <div class="col-lg-3" v-for="img, index in dataImages">
                                <div class="single-img" :class="activeClass(img.id)">
                                    <img :src="img.src" v-on:click="onSelectMultipleImage(img.id)">
                                </div><!--  /.single-img -->
                            </div><!--  /.col-lg-3 --> 
                        </div><!--  /.row --> 
                    </div><!--  /.media-list -->
                </div><!--  /.tab-content -->
            </div><!--  /.tab-area -->  
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script> 
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default { 
    components: {
        vueDropzone: vue2Dropzone,
    },
    data() {
        return {    
            dateOptions: this.$store.state.dateOptions,
            dropzoneOptions: {
                url: '/api/v1/media',
                thumbnailWidth: 300,
                thumbnailHeight: 200,
                maxFiles: 50, // number of files
                maxFilesize: 2, // MB
                // addRemoveLinks: true,
                acceptedFiles: ".jpeg,.jpg,.png,.gif",
                // dictRemoveFile: 'Remove file',
                dictFileTooBig: 'Image is larger than 2MB',
                dictDefaultMessage : 'Drop files here or click to upload dgreetreytre', 
                headers: { 
                    "X-CSRF-TOKEN": document.head.querySelector('meta[name="csrf-token"]').content, 
                }
            },
            dataImages: [], 
            selectedFiles: [], 
        }
    },
    created() {
        //this.loadAllMedia();
        //console.log(document.head.querySelector('meta[name="csrf-token"]').content)
    },
    mounted() {   
        this.$root.popupModal(); 
    },
    updated() {   
        this.$root.dropdownModal(); 
    },
    methods: {
        afterComplete(file) { 
            this.loadAllMedia(); 
        },  
        onSelectMultipleImage(id){
            let index = this.selectedFiles.findIndex(t => t == id) 
            if (index >= 0) {
                this.selectedFiles.splice(index, 1);
            } else {
                this.selectedFiles.push(id);
            } 
        },
        activeClass(id){
            let index = this.selectedFiles.findIndex(t => t == id) 
            return (index >= 0) ? 'file-seleted' : ''; 
        }, 
        loadAllMedia() {    
            this.selectedFiles = [];
            var app = this; 
            axios.get('/api/v1/media')
                .then( resp => { 
                    app.dataImages = resp.data;  
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        },
        deleteSeleted() { 
            var app = this;
            if( app.selectedFiles.length == 0 ) {
                app.$store.commit('nofileSeletedMsg');
                return;
            }
            if (confirm(app.$store.state.confirmDel)) {
                var selectedItem = this.selectedFiles.toString();
                axios.delete('/api/v1/media/' + selectedItem)
                    .then(function (resp) { 
                        app.$store.commit('submitMsg', 'selectedDelete');  
                        app.loadAllMedia(); 
                    })
                    .catch(function (resp) {
                        app.$store.commit('errorMessages', resp);
                    });
            }
        }, 
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: { 
                //ut_due_list: '', 
            },
            bn: { 
                //ut_due_list: 'বাকি বিলের তালিকা',  
            },  
        }
    },
} //export default
</script>