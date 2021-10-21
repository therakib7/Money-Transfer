<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               {{ $t('r_com_lists') }}
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body">  
            
            <!-- Modal Search -->
            <div class="modal right fade" id="dataSearch">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ $t('search') }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="dataSearch()">
                            <div class="modal-body"> 
            
                                <div class="form-row"> 

                                    <div class="col-12 mb-3"> 
                                        <select class="form-control" v-model="perPage">
                                            <option v-for="option in perPageOptions" v-bind:value="option.value">
                                                {{ option.text }}
                                            </option>
                                        </select>  
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3">
                                        <multiselect v-model="referralcommissionSearch.user_id" :options="accounts" :custom-label="customLabel" :preserve-search="true" :placeholder="$t('search_user')" selectLabel="" :loading="isLoading" deselectLabel="" :internal-search="false" :searchable="true" label="name" track-by="name" @search-change="asyncFind" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect> 
                                        <small>{{ $t('s_u_h') }}</small>
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t('select_status') }}</label>
                                        <select id="search-type" class="form-control" v-model="referralcommissionSearch.type" >
                                            <option value="">{{ $t('all') }}</option>
                                            <option value="1">{{ $t('success') }}</option>
                                            <option value="0">{{ $t('refund') }}</option> 
                                        </select> 
                                    </div><!--  /.col-12 mb-3 -->
        
                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-amount-from" v-model="referralcommissionSearch.amount_from">
                                        <label for="search-amount-from">{{ $t('amount_from') }}</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-amount-to" v-model="referralcommissionSearch.amount_to">
                                        <label for="search-amount-to">{{ $t('amount_to') }}</label>
                                    </div><!--  /.col-12 mb-3 -->  
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="referralcommissionSearch.date_from" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_from') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="referralcommissionSearch.date_to" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t('order_by') }}</label>
                                        <select id="search-order-by" class="form-control" v-model="referralcommissionSearch.order_by" >
                                            <option value="">{{ $t("newer_first") }}</option>
                                            <option value="1">{{ $t("newer_last") }}</option>  
                                        </select> 
                                    </div><!--  /.col-12 mb-3 -->
                                        
                                    <div class="col-12 mb-3"> 
                                        <button class="btn btn-primary btn-sm" type="submit">{{ $t('search') }}</button>
                                        <button class="btn btn-dark float-right btn-sm" type="reset">{{ $t('reset') }}</button>
                                    </div><!--  /.col-12 mb-3 -->
            
                                </div><!--  /.form-row -->  
                            </div><!--  /.modal-body --> 
                        </form>
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal search -->

            <div class="table-actions">   
                <div class="float-left">
                    <div class="bg-white pl-2">
                        <span class="pr-1 font-weight-bold">{{ $t('referral_url') }}:</span>
                        <span class="pr-1">{{ refferalUrl }}</span>
                        <span class="btn btn-sm btn-info" @click.stop.prevent="copyReferralUrl">{{ $t('copy') }}</span>
                        <input type="hidden" id="referral_id" :value="refferalUrl">
                    </div>
                </div>

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">{{ $t('search') }}</span>
                </button>

            </div><!--  /.table-actions -->
 
            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr> 
                            <th>{{ $t('from_user') }}</th> 
                            <th>{{ $t('name') }}</th> 
                            <th v-if="referral_super_role">{{ $t('to_user') }}</th>
                            <th>{{ $t('amount') }}</th> 
                            <th>{{ $t('date') }}</th>     
                            <th>{{ $t('status') }}</th> 
                            <th>{{ $t('note') }}</th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr  v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>                        
                        
                        <tr v-for="referralcommission, index in referralcommissions.data">  
                            <td>{{ user( referralcommission.user ) }}</td> 
                            <td>{{ referralcommission.user.name }}</td>  
                            <td v-if="referral_super_role">{{ user( referralcommission.user_to ) }}</td>  
                            <td>{{ referralcommission.amount }}</td> 
                            <td>{{ referralcommission.created_at | moment("DD-MM-YYYY, h:mm a") }}</td> 
                            <td> 
                                <template v-if="referralcommission.status">
                                    <span class="bg-success active-status">{{ $t('success') }}</span>
                                </template>
                                <template v-else>
                                    <span class="bg-danger active-status">{{ $t('refund') }}</span>
                                </template>
                            </td>
                            <td>{{ referralcommission.note }}</td>  
                        </tr>

                        <template v-if="noData"><tr class="bg-white" v-html="noData"></tr></template>
                       
                    </tbody>
                    <tfoot>
                        <tr> 
                            <th>{{ $t('from_user') }}</th> 
                            <th>{{ $t('name') }}</th> 
                            <th v-if="referral_super_role">{{ $t('to_user') }}</th> 
                            <th>{{ $t('amount') }}</th> 
                            <th>{{ $t('date') }}</th>    
                            <th>{{ $t('status') }}</th> 
                            <th>{{ $t('note') }}</th>
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="referralcommissions" :limit="2" @pagination-change-page="getLists"></pagination> 
                <div class="float-right amount-summery" v-if="!noData">
                    <span class="total-amount">{{ $t('t_a') }}: <b>{{t_a}}</b></span> 
                </div>
            </div><!--  /.table-actions -->
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script> 
import commonMessages from '@admin/locales/shared-i18n-setup' 
export default {
    components: {     
        'date-time-picker': () => import('vue-vanilla-datetime-picker'), 
    },   
    data() {
        return {    
            dateOptions: this.$store.state.dateOptions, 
            refferalUrl: null,
            referralcommissionSearch: {
                user_id: '', 
                type: '',
                amount_from: '',
                amount_to: '',
                date_from: '',  
                date_to: '',     
                order_by: '',  
            }, 
            accounts: [],
            referralcommissions: {}, 
            t_a: 0,
            isLoading: false,  
            perPage: this.$route.query.per_page, 
            perPageOptions: this.$store.state.perPageOptions, 
            noData: '',
            preloader: true,
        }
    },
    watch: {
        perPage: function (val) {
            let page = this.$route.query.page;  
            this.$router.push( { path: document.location.search, query: { page: page, per_page: val } } ); 
            this.getLists(); 
        },   
    },
    created() {
        this.getLists();  

        this.referral_super_role = this.$root.can('referral-super');

        let per_page = this.$route.query.per_page;  

        var perPageOptions =  this.perPageOptions.find( function( ele ) { 
            return ele.value == per_page;
        } );

        if( !perPageOptions ) {
            this.perPageOptions.splice(0, 0, { text: per_page, value: per_page } ); 
        }
    }, 
    mounted() {   
        this.$root.popupModal(); 
    },
    updated() {   
        this.$root.dropdownModal(); 
    },
    methods: {
        copyReferralUrl () {
            let refferalUrlToCopy = document.querySelector('#referral_id')
            refferalUrlToCopy.setAttribute('type', 'text')    // 不是 hidden 才能複製
            refferalUrlToCopy.select()

            try {
              var successful = document.execCommand('copy');
              var msg = successful ? 'Successfully' : 'Unsuccessful'; 
              toastr.success(msg + ' copied');
            } catch (err) {
              alert('Oops, unable to copy');
            }

            /* unselect the range */
            refferalUrlToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        },
        customLabel({ name = '' }) { 
            return name;
        },
        asyncFind(query) {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                if ( query.length < 4 ) return;
                this.isLoading = true;
                axios.get('/api/v1/ac/accounts?'+ 'title=' + query)
                    .then( resp => {  
                        this.accounts = resp.data.users;   
                        this.isLoading = false
                    })
                    .catch( resp => {
                        this.$store.commit('errorMessages', resp); 
                    });  
            }, 600); 
            
        },
        dataSearch() { 
            var data_search = this.referralcommissionSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) {
                    query[key] = ( key != 'user_id' ) ? data_search[key] : data_search[key]['id'];
                } else {
                    if ( this.$route.query[key] ) {
                        query[key] = '';
                    }
                } 
            }   
            this.$router.push( { path: document.location.search, query: query } );   
            this.getLists(); 
        },
        user( user ) {
            if ( user.username ) {
                return user.username;
            } else if ( user.mobile ) {
                return user.mobile;
            } else {
                return user.email;
            }
        }, 
        getLists(page = 1, click = false) {

            var app = this;  
            let per_page = this.$route.query.per_page;   
            
            let current_page = (click) ? page : this.$route.query.page ;
            if ( click ) {
                this.$router.push( { path: document.location.search, query: { page: current_page, per_page: per_page } } );  
            }

            let allQuery = this.$route.query;

            var queryString = Object.keys(allQuery).map(key => key + '=' + allQuery[key]).join('&');
            
            axios.get('/api/v1/mt/referralcommissions?'+ queryString)
                .then( resp => {  
                    app.preloader = false;

                    app.referralcommissions = resp.data.referralcommissions;  
                    app.refferalUrl = resp.data.ref_url;  

                    var t_a = 0;
                    resp.data.referralcommissions.data.forEach(function(item) {
                        if ( item.status ) {
                            t_a += parseFloat(item.amount);   
                        }
                    }); 
                    app.t_a = t_a.toFixed(2); 

                    if(app.referralcommissions.data.length == 0) {                                 
                        app.noData = app.$store.state.noData;
                    } else {
                        app.noData = '';
                    }
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        }, 
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: { 
                r_com_lists: 'Referral Commission Lists', 
                referral_url: 'Referral URL',  
                from_user: 'From User',  
                to_user: 'To User',  
                //search-content 
                refund: 'Refund',  
                copy: 'Copy',  
            },
            bn: { 
                r_com_lists: 'রেফারেল কমিশন তালিকা',  
                referral_url: 'রেফারেল ঠিকানা',  
                from_user: 'কার থেকে',  
                to_user: 'কাকে',  
                //search-content
                refund: 'ফেরত নেওয়া',  
                copy: 'কপি করুন',  
            },  
        },
        sharedMessages: commonMessages
    },
} //export default
</script>