import Vue from 'vue'
import Vuex from 'vuex'
import { i18n } from '@admin/locales/i18n-setup'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { 
        auth_id: document.head.querySelector('meta[name="auth_id"]').content,
        confirmDel: "Do you really want to delete it?",
        invoiceRowDel: "You need at least one row",
        needOne: "You need at least one", 
        noData: '<td></td><td><span>There is no data</span></td>',
        perPageOptions: [  
            { text: '10', value: '10' },
            { text: '20', value: '20' },
            { text: '30', value: '30' },
            { text: '50', value: '50' },
            { text: '100', value: '100' }, 
            { text: '500', value: '500' }, 
        ],
        dateOptions: { 
            format: 'DD-MM-YYYY hh:mm a',
            useCurrent: false,
            showClear: true,
            showClose: true,
        },
    }, 
    mutations: { 
        nullForm(state, form_data) { 
            for (let key in form_data ) {
                form_data[key] = '';
            }
        },
        submitMsg(state, type) { 
            switch(type) {
                case 'add':
                    toastr.success( i18n.t('form_add') );
                    break;
                case 'update':
                    toastr.success( i18n.t('form_updated') );
                    break;
                case 'delete':
                    toastr.success( i18n.t('form_delete') );
                    break;
                case 'selectedDelete':
                    toastr.success( i18n.t('selected_delete') );
                    break; 

                default:
                    toastr.success(type);
            }
        },
        noSeletedMsg() { 
            toastr.info('Sorry!, You don\'t select any checkbox.');
        },
        nofileSeletedMsg() { 
            toastr.info('Sorry!, You don\'t select any file.');
        },
        errorMessages(state, resp) {
            let message = resp.response.data.message;
            let errorsData = resp.response.data.errors;
            let errors = '';
            for (var key in errorsData) {
                if (errorsData.hasOwnProperty(key)) { 
                    errors += errorsData[key] + '<br>';
                }
            }
            if(message) {
                toastr.error(errors, message); 
            } 
        }
    },
    getters: { }
});

