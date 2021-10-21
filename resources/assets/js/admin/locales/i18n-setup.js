
import Vue from 'vue'
import VueI18n from 'vue-i18n' 
import axios from 'axios'
import router from '@admin/router'

Vue.use(VueI18n)

export const i18n = new VueI18n({
	locale: 'en', // set locale
	fallbackLocale: 'en', 
	silentFallbackWarn: true, 
	messages: {
	    en: {
            //form
            form_add: 'You have successfully added.',
            form_updated: 'You have successfully updated.',
            form_delete: 'You have successfully deleted.',
            selected_delete: 'You have successfully deleted seleted item.',
	    	//search-content
            search: 'Search',
            show: 'Show',
            search_user: 'Search User',
            select_status: 'Select Status',
                pending: 'Pending',
                success: 'Success',
                cancel: 'Cancel',
                failed: 'Failed',
                schedule: 'Schedule',
            number: 'Number', 
	    	amount_from: 'Amount From',
	    	amount_to: 'Amount To',
	    	date_from: 'Date From',
	    	date_to: 'Date To',
	    	order_by: 'Order By',
	    	newer_first: 'Newer First',
	    	newer_last: 'Newer Last',
	    	reset: 'Reset',  
	    },
	    bn: {
            //form
            form_add: 'আপনি সফলভাবে যোগ করেছেন।',
            form_updated: 'আপনি সফলভাবে আপডেট করেছেন।',
            form_delete: 'আপনি সফলভাবে বাদ দিয়েছেন।',
            selected_delete: 'আপনি নির্বাচিত আইটেমটি সফল ভাবে মুছে ফেলেছেন।',
            //search-content
	    	search: 'অনুসন্ধান',
            show: 'প্রদর্শন',
            search_user: 'ব্যবহারকারীর সন্ধান',
            select_status: 'অবস্থা নির্বাচন',
                pending: 'বিচারাধীন',
                success: 'সফল',
                cancel: 'বাতিল',
                failed: 'ব্যর্থ হয়েছে',
                schedule: 'ক্রমানুসারে',
            number: 'নাম্বার', 
	    	amount_from: 'কত টাকা হতে',
            amount_to: 'কত টাকা পর্যন্ত',
            date_from: 'কত তারিখ হতে',
            date_to: 'কত তারিখ পর্যন্ত',
            order_by: 'ক্রমানুসারে',
            newer_first: 'নতুন আগে',
            newer_last: 'নতুন শেষে',
            reset: 'পুনঃ স্থাপন', 
    	}
	}
}) 
 