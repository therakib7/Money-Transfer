<template>
    <div class="component"> 
        <div class="component-body bg-white"> 
            <form v-on:submit.prevent="updateForm()">
                <div class="modal-body"> 
            
                    <div class="form-row">      

                        <div class="col-12 mt-3 mb-4">  
                            <div class="row">
                                <div class="col-md-6 mb-2 pr-0">
                                    <div class="input-group outline-group mobile-number"> 
                                        <input :type="(showPin) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="current_pin" v-model="pin.current_pin" >
                                        <label for="current_pin">{{ $t("current_pin") }}</label>  
                                        <div class="input-group-append">
                                            <span class="input-group-text cursor-pointer" @click="showPin = !showPin" :title="( showPin ) ? $t('hide_pin') : $t('show_pin')">
                                                <i :class="showPin ? 'icon-eye-off' : 'icon-eye'" ></i>
                                            </span>
                                        </div>
                                    </div><!-- /.input-group outline-group mobile-number -->  
                                </div><!-- /.col-md-6 -->
                                <div class="col-md-3 pad-0">
                                    <div class="input-group-append">
                                        <span class="btn btn-primary" @click="pinStatusUpdate()">{{ ( ubp.ubp_pin_status ) ? $t('disable_pin') : $t('enable_pin') }}</span>
                                    </div>
                                </div><!-- /.col-md-3 -->
                            </div><!-- /.row -->
                        </div><!--  /.col-md-4 mb-4 -->  

                        <div class="col-md-12 mb-3"> 
                            <label for="multi-recharge">{{ $t("multi_recharge") }}</label> 
                            <label class="switch">
                              <input type="checkbox" v-model="ubp.ubp_multi_recharge">
                              <span class="slider round"></span>
                            </label> 
                        </div><!--  /.col-md-12 mb-3 -->   

                        <div class="col-md-12 mb-3"> 
                            <div class="row">
                                <div class="col-md-6 setting-providers">
                                    <label for="all-provider">{{ $t("available_operator") }}</label>  
                                    <draggable v-model="ubp_providers" tag="ul" v-bind="sortOptions">
                                        <li class="list-group-item" v-for="(element, index) in ubp_providers" :key="index">
                                            <span>{{index+1}} - {{ element.name }}</span> 
                                        </li>
                                    </draggable>
                                </div><!--  /.col-md-6 -->
                                <div class="col-md-6 setting-providers">
                                    <label for="active-provider">{{ $t("active_operator") }}</label> 
                                    <draggable v-model="ubp.active_ubp_providers" tag="ul" v-bind="sortOptions">
                                        <li class="list-group-item" v-for="(element, index) in ubp.active_ubp_providers" :key="index">
                                            <span>{{index+1}} - {{ element.name }}</span> 
                                        </li>
                                    </draggable>
                                </div><!--  /.col-md-6 -->
                            </div><!--  /.form-row -->
                        </div><!--  /.col-md-12 --> 

                    </div><!--  /.form-row -->  
                    
                </div><!--  /.modal-body -->

                <div v-can="'setting-money-transfer-edit'" class="modal-footer"> 
                    <button class="btn btn-primary" type="submit">{{ $t('update') }}</button>
                </div><!--  /.modal-footer -->
            </form>
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script> 
import commonMessages from '@admin/locales/shared-i18n-setup' 
import draggable from 'vuedraggable'
 
export default {
    components: {
        draggable,
    },
    data() {
        return {    
            showPin: false, 
            sortOptions: { 
                group: 'active_provider',
                animation: 150,
            },
            ubp_providers: [], 
            pin: {
                type: 'ubp',
                current_pin: '',
            },
            ubp: {  
                type: 'ubp',
                ubp_pin_status: 0,  
                ubp_multi_recharge: 1,  
                active_ubp_providers: [],  
            },  
        }
    },
    created() {
        this.getLists(); 
    }, 
    mounted() {   
        this.$root.popupModal(); 
    },
    updated() {   
        this.$root.dropdownModal(); 
    },
    methods: { 
        pinStatusUpdate() { 
            var app = this; 
            
            app.$set( app.pin, 'pin_status', app.ubp.ubp_pin_status );

            axios.post('/api/v1/pin-status-update', app.pin)
                .then( resp => {    
                    app.$store.commit('submitMsg', 'You have successfully updated'); 
                    app.pin.current_pin = ''; 
                    app.getLists();       
                    location.reload();               
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        },
        getLists() { 
            var app = this; 
            
            axios.post('/api/v1/mt/settingusers', this.ubp)
                .then( resp => {   
                    app.ubp_providers = resp.data.ubp_providers;
                    app.ubp.active_ubp_providers = resp.data.active_ubp_providers;

                    for (let key in resp.data.settingusers) {
                        if ( resp.data.settingusers[key].key == 'ubp_pin_status') {
                            app.ubp.ubp_pin_status = parseInt( resp.data.settingusers[key].value ); 
                        } 

                        if ( resp.data.settingusers[key].key == 'ubp_multi_recharge') {
                            app.ubp.ubp_multi_recharge = parseInt( resp.data.settingusers[key].value ); 
                        } 
                    } 
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        },
        updateForm() { 
            var app = this;
            var newSettings = app.ubp;
            axios.post('/api/v1/mt/settingusers_update', newSettings)
                .then( resp => { 
                    app.$store.commit('submitMsg', 'update');  
                    location.reload();
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        },  
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: { 
                pin: 'Pin',
                current_pin: 'Current Pin',
                enable_pin: 'Enable Pin',
                disable_pin: 'Disable Pin',
                multi_recharge: 'Multi Recharge',
                available_operator: 'Available Operator',
                active_operator: 'Active Operator',
            },
            bn: { 
               pin: 'পিন',
                current_pin: 'বর্তমান পিন',
                enable_pin: 'পিন সক্রিয় করুন',
                disable_pin: 'পিন বন্ধ করুন',
                multi_recharge: 'একাধিক রিচার্জ',
                available_operator: 'সকল অপারেটর',
                active_operator: 'সক্রিয় অপারেটর',
            },  
        },
        sharedMessages: commonMessages
    },
} //export default
</script>