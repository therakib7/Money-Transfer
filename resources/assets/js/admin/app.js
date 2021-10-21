
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap') 
require('./main') 

import Vue from 'vue'
import { i18n } from '@admin/locales/i18n-setup'
import router from './router'
import store from './store' 
import './directive'  

import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

// from https://www.npmjs.com/package/vue-moment
import VueMoment from 'vue-moment'
// from https://www.npmjs.com/package/moment-timezone
import moment from 'moment-timezone' 

Vue.use(VueMoment, {
    moment,
}) 

//https://www.npmjs.com/package/vue-progressbar
import VueProgressBar from 'vue-progressbar' 
const options = {
    color: '#007bff', 
    thickness: '4px', 
} 
Vue.use(VueProgressBar, options) 

// https://www.npmjs.com/package/vue-multiselect
import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)
require('vue-multiselect/dist/vue-multiselect.min.css')
 
Vue.component('pagination', () => import('./components/pagination/laravel-vue-pagination') ); 
Vue.component('pagination-simple', () => import('@components/pagination-simple/index.vue') );  
Vue.component('preloader', require('@components/preloader/index.vue') );  
Vue.component('back-forward', () => import('@components/back-forward/index.vue') );  

Vue.component('app', require('./views/layout/app/index.vue') );  

const app = new Vue({
    el: '#app', 
    router,
    i18n,
    store, 
    data: { 
        show_sidebar_left: true,  
        user_permissions: null,
        profile: {
            name: null,
            image: null,
            role: null,
            since: null,
            balance: null,
        }
    },
    mounted () {

        this.popupModal(); 

        //  [App.vue specific] When App.vue is finish loading finish the progress bar
        this.$Progress.finish()

        this.$nextTick(() => {
            
        })

        // load js 
        this.main_js();  
    },   
    created () {   
        /* This warning for user security */
        console.log("%cStop! Don't do this", "color: red; text-stroke: 1px black; font-size: 3em");
        console.log("%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a Oxyzone feature or \"hack\" someone's account, it is a scam and will give them access to your Oxyzone account.", "color: blue; font-size: 2em");

        // personal info
        this.profile.name = document.head.querySelector('meta[name="name"]').content; 
        this.profile.image = document.head.querySelector('meta[name="image"]').content; 
        this.profile.role = document.head.querySelector('meta[name="role"]').content; 
        this.profile.since = document.head.querySelector('meta[name="since"]').content; 
        this.profile.balance = document.head.querySelector('meta[name="balance"]').content; 

        // set user define language
        this.$i18n.locale = VueCookie.get('locale') || 'en'; 

        /* Permissions */
        let permission = document.head.querySelector('meta[name="permission"]').content; 
        this.user_permissions = permission.split(",");

        //  [App.vue specific] When App.vue is first loaded start the progress bar
        this.$Progress.start()
        //  hook the progress bar to start before we move router-view
        this.$router.beforeEach((to, from, next) => { 
            //  does the page we want to go to have a meta.progress object
            if (to.meta.progress !== undefined) {
                let meta = to.meta.progress
                // parse meta tags
                this.$Progress.parseMeta(meta)
            }
            //  start the progress bar
            this.$Progress.start()
            //  continue to next page
            next()
        })

        // hook the progress bar to finish after we've finished moving router-view
        this.$router.afterEach((to, from) => {
            //  finish the progress bar
            this.$Progress.finish()
        }) 
 
        if ( permission ) {
            this.acBalance();
        } 

        /* Broadcasting */ 
        Echo.private(`message.${this.$store.state.auth_id}`)
            .listen('Message', (e) => { 
                //console.log(e.data) 
            }); 

        Echo.private(`balance-transfer.${this.$store.state.auth_id}`)
            .listen('BalanceTransfer', (e) => {  
                //console.log(e.data)  
                this.acBalance(); 
            }); 

        /* Browser back button */
        window.addEventListener('popstate', function(event) {
            var modals = document.querySelectorAll('.modal');
            for (var index in modals) {
                if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
            } 
        }, false);
 
    },  
    watch: { 
        '$route': function (route) {   
            var dropdowns = document.querySelectorAll('.dropdown-menu.show');
            for (var i = 0; i < dropdowns.length; i++) {
              dropdowns[i].classList.remove('show'); 
            }
        }, 
        '$i18n.locale': function(locale) { 
            this.$cookie.set('locale', locale) 
        }  
    }, 
    methods: {   
        acBalance() {  
            var app = this;
            axios.get('/api/v1/ac/ac_balance')
            .then( resp => {
                this.profile.balance = resp.data.ac_balance.balance; 
            })
            .catch( resp => {
                app.$store.commit('errorMessages', resp); 
            });
        },
        logout() {
           axios.post('/logout').then(response => {
               //this.$router.push("/login"); 
               location.reload();
           }).catch(error => {
               location.reload();
           });
        },
        can( params ) {           
            var per = this.user_permissions;
            var index = -1;
            
            if ( typeof params == 'string' ) {
                index = per.findIndex(t => t == params);
            } else if ( Array.isArray( params ) ) {
                for (let val of params) {  
                    if ( per.findIndex(t => t == val) != -1 ) { 
                        index = 1; break;
                    }
                } 
            } else if ( typeof params == 'object' ) {
                index = per.findIndex(t => t == params.name);  
                if ( params.if == false) {
                    if ( index != -1 ) { 
                        index = -1;
                    } else {
                        index = 1;
                    }
                }
            } else { // number and others
                index = per.findIndex(t => t == params);
            } 

            return ( index == -1 ) ? false : true;  
        }, 
        popupModal() {  
            /* Popup Modal */ 
            var btn = document.querySelectorAll("[data-toggle='modal']"); 
            // When the user clicks the button, open the modal
            for (var i = 0; i < btn.length; i++) {
                btn[i].onclick = function(e) { 
                   //console.log('modal')
                   e.preventDefault();
                   //console.log(this.getAttribute("data-target"))
                   let modal = document.querySelector(this.getAttribute("data-target"));
                   //console.log(modal)
                   modal.style.display = "block";
                   modal.classList.add("show");
                }
            }

            // When the user clicks on <span> (x), close the modal
            // Get the <span> element that closes the modal 
            var spans = document.querySelectorAll("[data-dismiss='modal']");
            for (var i = 0; i < spans.length; i++) {
                spans[i].onclick = function(e) {
                    e.target.closest('.modal').style.display = "none"
                }
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(e) {
                if ( e.target.classList.contains('modal') ) { 
                    e.target.style.display = "none"; 
                } 
            }     
        }, 
        dropdownModal() { 
            this.popupModal();

            window.addEventListener('mouseup', function(e){   
                var dropdowns = document.querySelectorAll('.dropdown-menu.show');
                for (var i = 0; i < dropdowns.length; i++) {
                  dropdowns[i].classList.remove('show'); 
                }
            });

            /* Edit dropdown */  
            var dropdown = document.querySelectorAll("[data-toggle='dropdown']"); 
            // When the user clicks the button, open the modal
            for (var i = 0; i < dropdown.length; i++) { 
                dropdown[i].onclick = function(e) { 
                    e.preventDefault();
                    let drop = this.parentElement.querySelector('.dropdown-menu');  
                    drop.classList.toggle("show"); 
                }  
            }    
        }, 
        main_js() {  
            // browser back button 
        }
    },
}); 