<template>
    <div class="component"> 
        <div class="component-body"> 

            <div id="accordion">
                <div class="list-group mb-2">
                    <div class="list-group-item cursor-pointer">
                       <div class="panel-heading collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            {{ $t("general_info") }}
                        </div>
                    </div>

                    <div id="collapseOne" class="collapse bg-white border" aria-labelledby="headingOne" data-parent="#accordion">
                        <media id="avatar" @select-image="onSelectImage"></media> 
                        <form v-on:submit.prevent="updateForm()">
                            <div class="modal-body"> 
                        
                                <div class="form-row"> 
                        
                                    <div class="col-md-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="Name" v-model="profile.name">
                                        <label for="Name">{{ $t("name") }}</label>
                                    </div><!--  /.col-md-4 mb-3 -->  

                                    <div class="col-md-4 mb-3">
                                        <date-time-picker v-model="profile.profile.bday" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"> 
                                            <template v-slot:choose-date>{{ $t('birth_day') }}</template>
                                        </date-time-picker>    
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-4 mb-3">
                                        <div v-if="!profile.profile.avatar">
                                            <span class="btn btn-sm bg-success" data-toggle="modal" data-target="#avatar">
                                                {{ $t("insert_image") }}
                                            </span>
                                        </div>
                                        <div v-else>
                                            <img :src="profile.profile.avatar_src" class="upload-img rounded-circle"/>
                                            <span class="btn btn-sm btn-danger h-i" @click="removeImage">x</span>
                                        </div>
                                    </div><!--  /.col-md-4 --> 

                                    <div class="col-md-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="occupation" v-model="profile.profile.occupation">
                                        <label for="occupation">{{ $t("occupation") }}</label>
                                    </div><!--  /.col-md-4 mb-3 -->  

                                    <div class="col-md-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="nid" v-model="profile.profile.nid">
                                        <label for="nid">{{ $t("nid") }}</label>
                                    </div><!--  /.col-md-4 mb-3 -->  

                                </div><!--  /.form-row -->  

                                <div class="form-row">
                                    <div class="col-md-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="birth_crt" v-model="profile.profile.birth_crt">
                                        <label for="birth_crt">{{ $t("birth_certificate") }}</label>
                                    </div><!--  /.col-md-4 mb-3 --> 
                                    <div class="col-md-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="passport" v-model="profile.profile.passport">
                                        <label for="passport">{{ $t("passport_id") }}</label>
                                    </div><!--  /.col-md-4 mb-3 -->
                                </div><!-- /.form-row -->
                                
                            </div><!--  /.modal-body -->

                            <div v-can="'setting-profile-edit'" class="modal-footer"> 
                                <button class="btn btn-primary" type="submit">{{ $t("update_general_info") }}</button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.collapse -->  
                </div><!--  /.list-group -->  

                <div class="list-group mb-2">
                    <div class="list-group-item cursor-pointer">
                       <div class="panel-heading collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                            {{ $t("address") }}
                        </div>
                    </div>

                    <div id="collapseTwo" class="collapse bg-white border" aria-labelledby="headingOne" data-parent="#accordion">
                        <form v-on:submit.prevent="updateForm()">
                            <div class="modal-body">  

                                <div class="form-row">  
                                    <div class="col-12 mb-2">
                                        <h4>{{ $t("present_address") }}</h4>
                                    </div><!--  /.col-12 -->  
                                </div><!--  /.form-row -->  
                                <location :location_id="profile.profile.pre_address" v-model="profile.profile.pre_address"></location>

                                <div class="form-row">  
                                    <div class="col-12 mb-2">
                                        <h4>{{ $t("permanent_address") }}</h4>
                                    </div><!--  /.col-12 -->  
                                </div><!--  /.form-row -->  
                                <location :location_id="profile.profile.per_address" v-model="profile.profile.per_address"></location>
                                
                            </div><!--  /.modal-body -->

                            <div v-can="'setting-profile-edit'" class="modal-footer"> 
                                <button class="btn btn-primary" type="submit">{{ $t("update_address") }}</button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.collapse -->  
                </div><!--  /.list-group --> 
            </div><!-- /#accordion  -->    
            
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script>    
export default {
    components: {    
        'media': () => import('@components/media/index.vue'),
        'location': () => import('@components/location/index.vue'),
        'date-time-picker': () => import('vue-vanilla-datetime-picker'), 
    }, 
    data() {
        return {    
            dateOptions: this.$store.state.dateOptions,  
            profile: {  
                name: '',   
                profile: {
                    bday: null,   
                    avatar: null, 
                    avatar_src: null,   
                    occupation: null,   
                    nid: null,   
                    birth_crt: null,  
                    passport: null,  
                    pre_address: null,   
                    per_address: null,                    
                }  
            }, 
            img_dir: null,  
        }
    },
    created() {
        this.getProfile(); 
    }, 
    mounted() {   
        this.$root.popupModal(); 
        this.accordion(); 
    },
    methods: {  
        accordion() {
            var collapse_item = document.querySelectorAll("[data-toggle='collapse']"); 
            // When the user clicks the button, open the modal
            for (var i = 0; i < collapse_item.length; i++) {
                collapse_item[i].onclick = function(e) {
                    e.preventDefault(); 
                    let modal = document.querySelector(this.getAttribute("data-target")); 
                    
                    if (modal.classList.contains('show')) { 
                       modal.classList.remove('show');
                       return;
                    }

                    var accordions = document.querySelectorAll('.collapse.show');
                    for (var i = 0; i < accordions.length; i++) {
                      accordions[i].classList.remove('show'); 
                    }
                    modal.classList.add("show");

                    //collapse_item[i].classList.add('collapsed');
                    //this.classList.remove('collapsed'); 
                 
                }
            }
        },
        onSelectImage(data) {   
            this.profile.profile.avatar = data.id;
            this.profile.profile.avatar_src = this.img_dir + data.resized_name; 
        },  
        removeImage() {   
            this.profile.profile.avatar = '';
            this.profile.profile.avatar_src = '';
        },   
        getProfile() { 
            var app = this; 
            
            axios.post('/api/v1/profiles', this.profile)
                .then( resp => {   
                    this.profile = resp.data.profile;  
                    app.img_dir = resp.data.img_dir; 
                    if ( this.profile.profile.avatar_src ) {
                        this.profile.profile.avatar_src = app.img_dir + this.profile.profile.avatar_src.resized_name; 
                    }     
                              
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        }, 
        updateForm() { 
            var app = this; 

            var newProfile = app.profile;  
            axios.post('/api/v1/profiles_update', newProfile)
                .then( resp => {  
                    app.$store.commit('submitMsg', 'update');  
                    app.getProfile(); 
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        },  
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: { 
                general_info: 'General Info', 
                    name: 'Name', 
                    birth_day: 'Birth Day', 
                    insert_image: 'Insert Image', 
                    occupation: 'Occupation', 
                    nid: 'NID', 
                    birth_certificate: 'Birth Certificate', 
                    passport_id: 'Passport ID', 
                    update_general_info: 'Update General Info',
                address: 'Address', 
                    present_address: 'Present Address', 
                        country: 'Country', 
                        location: 'Location', 
                    permanent_address: 'Permanent Address', 
                        update_address: 'Update Address', 
            },
            bn: { 
                general_info: 'সাধারণ তথ্য',  
                    name: 'নাম',
                    birth_day: 'জম্মদিন', 
                    insert_image: 'ছবি সংযুক্ত করুন', 
                    occupation: 'পেশা', 
                    nid: 'জাতীয় পরিচয় পত্র',
                    birth_certificate: 'জন্ম সনদ',  
                    passport_id: 'পাসপোর্ট আইডি', 
                    update_general_info: 'সাধারণ তথ্য পরিবর্তন', 
                address: 'ঠিকানা', 
                    present_address: 'বর্তমান ঠিকানা', 
                        country: 'দেশ',
                        location: 'স্থান',
                    permanent_address: 'স্থায়ী ঠিকানা', 
                        update_address: 'ঠিকানা পরিবর্তন', 
            },  
        }
    },
} //export default
</script>

<style lang="scss" scoped> 
    /* Accordion with arrow */ 
    #accordion .panel-heading {
      position: relative;
    }
    #accordion .panel-heading[data-toggle="collapse"]:after {
      content: "\f106";  
      font-family: fontello;  
      position: absolute; 
      font-size: 18px;
      line-height: 22px;
      right: 0;
      top: calc(50% - 10px);
      transition: all 0.5s; 
    }
    #accordion .panel-heading[data-toggle="collapse"].collapsed:after { 
      -webkit-transform: rotate(180deg);
      -moz-transform:    rotate(180deg);
      -ms-transform:     rotate(180deg);
      -o-transform:      rotate(180deg);
      transform:         rotate(180deg);
    }

    .address-suggestion ul li span:not(:first-child):before, .address-warning span:not(:first-child):before {
        padding-right: 5px !important;
        content: ", ";
    }
    .address-suggestion ul li span:last-child:after, .address-warning span:last-child:after { 
        content: ".";
    }
</style>