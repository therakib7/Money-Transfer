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
                                        <input :type="(showPin) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="current_pin" v-model="pin.current_pin">
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
                                        <span class="btn btn-primary" @click="pinStatusUpdate()">{{ ( mr.mr_pin_status ) ? $t('disable_pin') : $t('enable_pin') }}</span>
                                    </div>
                                </div><!-- /.col-md-3 -->
                            </div><!-- /.row -->
                        </div><!--  /.col-md-4 mb-4 -->  

                        <div class="col-md-12 mb-3"> 
                            <label for="multi-recharge">{{ $t("multi_recharge") }}</label> 
                            <label class="switch">
                              <input type="checkbox" v-model="mr.mr_multi_recharge">
                              <span class="slider round"></span>
                            </label> 
                        </div><!--  /.col-md-12 mb-3 -->   

                        <div class="col-md-12 mb-3"> 
                            <label for="pack-suggestion">{{ $t("auto_package_suggestion") }}</label> 
                            <label class="switch">
                              <input type="checkbox" v-model="mr.mr_auto_pack_suggestion">
                              <span class="slider round"></span>
                            </label> 
                        </div><!--  /.col-md-12 mb-3 -->  

                        <div class="col-md-12 mb-3"> 
                            <label for="pack-suggestion">{{ $t("recharge_pack_only") }}</label> 
                            <label class="switch">
                              <input type="checkbox" v-model="mr.mr_recharge_pack_only">
                              <span class="slider round"></span>
                            </label> 
                        </div><!--  /.col-md-12 mb-3 -->  

                        <div class="col-md-12 mb-3"> 
                            <div class="row">
                                <div class="col-md-6 setting-providers">
                                    <label for="all-provider">{{ $t("available_operator") }}</label>  
                                    <draggable v-model="mr_providers" tag="ul" v-bind="sortOptions">
                                        <li class="list-group-item" v-for="(element, index) in mr_providers" :key="index">
                                            <span>{{index+1}} - {{ element.name }}</span> 
                                        </li>
                                    </draggable>
                                </div><!--  /.col-md-6 -->
                                <div class="col-md-6 setting-providers">
                                    <label for="active-provider">{{ $t("active_operator") }}</label> 
                                    <draggable v-model="mr.active_mr_providers" tag="ul" v-bind="sortOptions">
                                        <li class="list-group-item" v-for="(element, index) in mr.active_mr_providers" :key="index">
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
            mr_providers: [], 
            pin: {
                type: 'mr',
                current_pin: '',
            },
            mr: {  
                type: 'mr',
                mr_pin_status: 0,   
                mr_multi_recharge: 1,  
                mr_auto_pack_suggestion: 1,  
                mr_recharge_pack_only: 0,  
                active_mr_providers: [],  
            },  
        }
    },
    created() {
        this.getLists(); 
    },  
    methods: { 
        pinStatusUpdate() { 
            var app = this; 
            
            app.$set( app.pin, 'pin_status', app.mr.mr_pin_status );

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
            
            axios.post('/api/v1/mt/settingusers', this.mr)
                .then( resp => {   
                    app.mr_providers = resp.data.mr_providers;
                    app.mr.active_mr_providers = resp.data.active_mr_providers;

                    for (let key in resp.data.settingusers) {
                        if ( resp.data.settingusers[key].key == 'mr_pin_status') {
                            app.mr.mr_pin_status = parseInt( resp.data.settingusers[key].value ); 
                        } 

                        if ( resp.data.settingusers[key].key == 'mr_multi_recharge') {
                            app.mr.mr_multi_recharge = parseInt( resp.data.settingusers[key].value ); 
                        }

                        if ( resp.data.settingusers[key].key == 'mr_auto_pack_suggestion') {
                            app.mr.mr_auto_pack_suggestion = parseInt( resp.data.settingusers[key].value ); 
                        } 

                        if ( resp.data.settingusers[key].key == 'mr_recharge_pack_only') {
                            app.mr.mr_recharge_pack_only = parseInt( resp.data.settingusers[key].value ); 
                        } 
                    } 
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        },
        updateForm() { 
            var app = this;
            var newSettings = app.mr;
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
                auto_package_suggestion: 'Auto Package Suggestion',
                recharge_pack_only: 'Show Only Recharge Package',
                available_operator: 'Available Operator',
                active_operator: 'Active Operator',
            },
            bn: {  
                pin: 'পিন',
                current_pin: 'বর্তমান পিন',
                enable_pin: 'পিন সক্রিয় করুন',
                disable_pin: 'পিন বন্ধ করুন',
                multi_recharge: 'একাধিক রিচার্জ',
                auto_package_suggestion: 'অটো প্যাকেজ পরামর্শ',
                recharge_pack_only: 'শুধুমাত্র রিচার্জ প্যাকেজ দেখুন',
                available_operator: 'সকল অপারেটর',
                active_operator: 'সক্রিয় অপারেটর',
            },  
        },
        sharedMessages: commonMessages
    },
} //export default
</script>