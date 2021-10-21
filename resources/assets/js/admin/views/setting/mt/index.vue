<template>
    <div class="component">
        <div class="row d-block d-md-none mt-4">
            <div class="col-md-12 mb-3">   
                <button type="button" class="btn btn-md d-block w-100 mb-3 btn-info setting-menu" >
                    <i class="icon-menu"></i> <span>{{ $t('set_menu') }}</span>
                </button>
            </div><!--  /.col-md-12 mb-3 --> 
        </div><!--  /.row -->

        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               {{ $t('setting') }} : {{ title() }}
            </h2>  
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body settings"> 
            <div class="row">
                <div class="col-lg-3 pr-0"> 
                    <div class="custom-menu-modal">
                        <div class="custom-header d-block d-md-none">
                            <h5 class="modal-title">{{ $t('set_menu') }}</h5>
                            <button type="button" class="close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div> 
                        <div class="list-group">  
                            <router-link v-can="'setting-profile-view'" :to="{ name: 'mtSettingProfile' }" class="list-group-item">
                                <span class="icon-user"></span>{{ $t("profile") }} 
                            </router-link>
                            <router-link v-can="'setting-security-view'" :to="{ name: 'mtSettingSecurity' }" class="list-group-item">
                                <span class="icon-shield"></span>{{ $t("s_l") }}
                            </router-link>  
                            <router-link v-can="'setting-money-transfer-view'" :to="{ name: 'mtSettingMobileRecharge' }" class="list-group-item">
                                <span class="icon-mobile"></span>{{ $t("mr") }}
                            </router-link>
                            <router-link v-can="'setting-money-transfer-view'" :to="{ name: 'mtSettingMobileBanking' }" class="list-group-item">
                                <span class="icon-bank"></span>{{ $t("mb") }}
                            </router-link>
                            <router-link v-can="'utility-bill-view'" :to="{ name: 'mtSettingUbps' }" class="list-group-item">
                                <span class="icon-lightbulb"></span>{{ $t("u_bill_pay") }}
                            </router-link>  
                            <router-link v-can="'setting-commission-view'" :to="{ name: 'mtSettingAdmin' }" class="list-group-item">
                                <span class="icon-cogs"></span>Admin Settings 
                            </router-link>
                            <router-link v-can="'setting-appreance-view'" :to="{ name: 'mtSettingAppreances' }" class="list-group-item">
                                <span class="icon-chart-bar"></span>{{ $t("appearance") }}
                            </router-link>  
                        </div><!-- /.list-group -->
                    </div><!--  /.modal-content -->
                </div><!-- /.col-md-3 --> 

                <div class="col-lg-9">
                    <router-view></router-view>
                </div><!-- /.col-md-9 -->
            </div><!-- /.row -->             
        </div><!--  /.component-body --> 
    </div><!--  /.component --> 
</template>  

<script>
export default { 
    data() {
        return {    
            dateOptions: this.$store.state.dateOptions,   
            name: this.$route.name,  
        }
    },
    watch: {  
        '$route.name': function (name) { 
            this.name = name;   
        }, 
    },
    created() {   
    },
    mounted() {  
        this.$root.popupModal(); 

        let setting_menu = document.querySelector(".setting-menu");
        var cus_modal = document.querySelector('.custom-menu-modal');
        setting_menu.addEventListener('click', function(e){  
            cus_modal.classList.toggle("left"); 
        });

        let close_menu = document.querySelector(".custom-header .close");
        close_menu.addEventListener('click', function(e){  
            cus_modal.classList.remove("left"); 
        });   

        var close_menu_click = document.querySelectorAll(".custom-menu-modal .list-group-item");  
        for (var i = 0; i < close_menu_click.length; i++) {
            close_menu_click[i].onclick = function(e) { 
               cus_modal.classList.remove("left"); 
            }
        }

        window.addEventListener('mouseup', function(e){   
            if ( document.querySelector('.custom-menu-modal') && !document.querySelector('.custom-menu-modal').contains(e.target) ) { 
                cus_modal.classList.remove("left"); 
            }  
        }); 
         
    }, 
    methods: { 
        title() {
            var app = this;  
            switch(this.name) { 

                case 'mtSettingProfile':
                    return this.$t('profile');
                    break;

                case 'mtSettingSecurity':
                    return this.$t('security');
                    break; 

                case 'mtSettingMobileRecharge':
                    return this.$t('mr');
                    break;

                case 'mtSettingMobileBanking':
                    return this.$t('mb');
                    break;

                case 'mtSettingUbps':
                    return this.$t('u_bill_pay');
                    break;

                case 'mtSettingAdmin':
                    return 'Admin Setting';
                    break; 
            }
        },  
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: { 
                setting: 'Setting', 
                security: 'Security', 
                profile: 'Profile', 
                s_l: 'Security & Login', 
                mr: 'Mobile Recharge', 
                mb: 'Mobile Banking', 
                u_bill_pay: 'Utility Bill Pay',  
                appearance: 'Appearance', 
                //mobile menu
                set_menu: 'Settings Menu', 

            },
            bn: { 
                setting: 'সেটিং',
                security: 'নিরাপত্তা',
                profile: 'প্রোফাইল',  
                s_l: 'নিরাপত্তা ও লগইন',  
                mr: 'মোবাইল রিচার্জ',
                mb: 'মোবাইল ব্যাংকিং',
                u_bill_pay: 'প্রয়োজনীয় বিল প্রদান',   
                appearance: 'সাজসজ্জা', 
                //mobile menu
                set_menu: 'সেটিং মেনু', 
            },  
        }
    },
} //export default
</script>