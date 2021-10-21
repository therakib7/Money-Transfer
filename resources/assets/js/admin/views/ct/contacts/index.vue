<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               {{ $t('conntact_list') }} 
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body"> 

            <!-- Modal Create-->
            <div v-can="'contact-create'" class="modal fade" id="createModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ (formType) ? $t('new') : $t('update') }} {{ $t('contact') }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">
                                    <div class="col-12 mb-2"> 
                                        <label for="status">{{ $t('status') }}</label> 
                                        <label class="switch">
                                          <input type="checkbox" v-model="contact.status">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-12 mb-2 -->

                                    <div class="col-md-6 mb-3 outline-group" > 
                                        <input placeholder=" " type="text" class="form-control outline" id="name" v-model="contact.name">
                                        <label for="name">{{ $t('name') }}</label>
                                    </div><!--  /.col-md-6 mb-3 --> 

                                    <div class="col-md-6 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="Name" v-model="contact.address">
                                        <label for="Name">{{ $t('address') }}</label> 
                                    </div><!--  /.col-md-6 mb-3 -->  

                                    <div class="mt-number-list">
                                        <div class="mt-numbers" v-for="(service, key) in contact.services"> 
                                            <div class="mt-title">
                                                {{ $t('operator') }}: {{ key+1 }}
                                            </div><!--  /.mt-title mb-3 -->
                                            <div class="mt-control"> 
                                                <span class="btn btn-primary btn-sm" @click="addService(key)"><i class="icon-plus"></i></span>
                                                <span class="btn btn-danger btn-sm" @click="removeService(key)"><i class="icon-minus"></i></span>
                                            </div><!--  /.mt-control mb-3 --> 

                                            <div class="form-row">
                                                
                                                <div class="col-md-12">  
                                                    <div class="input-group outline-group mobile-number mt-4"> 
                                                        <input placeholder="Mobile Number" v-on:keyup="numberChange(key)" type="text" class="form-control outline" :id="'mobile-number'+key" v-model="service.number">
                                                        <label :for="'mobile-number'+key">{{ $t('m_n') }}</label>

                                                        <div class="input-group-append" v-if="service.number">
                                                          <span @click="removeNumber(key)" class="input-group-text cursor-pointer"><i class="icon-cancel"></i></span> 
                                                        </div>
                                                    </div> 
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3">
                                                    <ul v-if="service.number_list" class="contact-suggestion">
                                                        <li v-for="number, index in service.number_list" @click="selectedNumber(key, number)">{{number.number}}  {{ (number.name) ? '- '+number.name : ''}} {{ (number.provider_id) ? '- '+number.provider_id.name : ''}}</li>
                                                    </ul> 
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3">
                                                    <div class="form-row">  
                                                        <div class="col-sm-7 col-xs-12 mb-16">
                                                            <label class="o-s-l">{{ $t('operator') }}</label> 
                                                            <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="service.provider_id" :options="providers" :preserve-search="true" label="name" track-by="name" :placeholder="$t('s_o')" :preselect-first="false" @input="providerChanged(key)">
                                                                <template slot="singleLabel" slot-scope="props">
                                                                    <template v-if="props.option.logo_small_src">
                                                                        <img class="option__image" :src="'/uploads/imgs/'+props.option.logo_small_src.resized_name" :alt="props.option.name">
                                                                    </template> 
                                                                    <span class="option__title"> {{ props.option.name }}</span>
                                                                </template>
                                                                <template slot="option" slot-scope="props">
                                                                    <template v-if="props.option.logo_small_src">
                                                                       <img class="option__image" :src="'/uploads/imgs/'+props.option.logo_small_src.resized_name" :alt="props.option.name"> 
                                                                    </template> 
                                                                    <span class="option__title"> {{ props.option.name }}</span>
                                                                </template>
                                                            </multiselect>  
                                                        </div><!--  /.col-sm-7 col-xs-12 -->

                                                        <div class="col-sm-5 col-xs-12">
                                                            <label for="service_id" class="o-s-l">{{ $t('type') }}</label>
                                                            <select class="form-control" id="service_id" v-model="service.service_id">  
                                                                <option v-for="service in service.services" :value="service.id">{{service.name}}</option>
                                                            </select>  
                                                        </div><!--  /.col-sm-5 col-xs-12 -->
                                                    </div><!--  /.form-row --> 
                                                </div><!--  /.col-md-12 mb-3 -->  
                                                 
                                            </div><!--  /.form-row --> 
                                        </div><!--  /.mt-numbers -->
                                    </div> <!-- /.mt-number-list -->  

                                    <div class="mt-number-list">
                                        <div class="mt-numbers" v-for="(identity, key) in contact.identities"> 
                                            <div class="mt-title">
                                                {{ $t('identity') }}: {{ key+1 }}
                                            </div><!--  /.mt-title mb-3 -->
                                            <div class="mt-control"> 
                                                <span class="btn btn-primary btn-sm" @click="addIdentity(key)"><i class="icon-plus"></i></span>
                                                <span class="btn btn-danger btn-sm" @click="removeIdentity(key)"><i class="icon-minus"></i></span>
                                            </div><!--  /.mt-control mb-3 --> 

                                            <div class="form-row">  

                                                <div class="col-md-12 mb-3 mt-4">
                                                    <div class="form-row"> 
                                                        <div class="col-sm-7 col-xs-12 mb-16">
                                                            <input type="number" placeholder="Security ID" class="form-control big-font outline" :id="'id_number'+key" v-model="identity.id_number">
                                                            <label :for="'id_number'+key">{{ $t('id_number') }}</label>
                                                        </div><!--  /.col-sm-7 col-xs-12 -->

                                                        <div class="col-sm-5 col-xs-12">
                                                            <label for="id_type" class="o-s-l">{{ $t('type') }}</label>
                                                            <select class="form-control" id="id_type" v-model="identity.id_type">  
                                                                <option value="1">{{ $t('nid') }}</option>
                                                                <option value="2">{{ $t('passport') }}</option>
                                                                <option value="3">{{ $t('birth_crt') }}</option> 
                                                            </select>  
                                                        </div><!--  /.col-sm-5 col-xs-12 -->
                                                    </div><!--  /.form-row --> 
                                                </div><!--  /.col-md-12 mb-3 -->  
                                                 
                                            </div><!--  /.form-row --> 
                                        </div><!--  /.mt-numbers -->
                                    </div> <!-- /.mt-number-list -->  
    
                                    <div class="col-12 mb-3 mt-3">  
                                        <label class="o-s-l">{{ $t('category') }}</label>
                                        <multiselect v-model="contact.categories" :options="categories" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" label="name" track-by="name" :placeholder="$t('s_cat')" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span class="custom__tag">
                                                    <span>{{ props.option.name }}</span>
                                                    <span @click="props.remove(props.option)">x</span> 
                                                </span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-12 mb-3 -->  
     
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('close') }}</button>
                                <button v-if="viewForm" class="btn btn-primary" type="submit">
                                {{ (formType) ? $t('create') : $t('update') }}
                                </button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal --> 
            
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
                                        <label class="o-s-l">{{ $t("show") }}</label> 
                                        <select class="form-control" v-model="perPage">
                                            <option v-for="option in perPageOptions" v-bind:value="option.value">
                                                {{ option.text }}
                                            </option>
                                        </select>  
                                    </div><!--  /.col-12 mb-3 -->
        
                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-number" v-model="contactSearch.number">
                                        <label for="search-number">{{ $t("number") }}</label>
                                    </div><!--  /.col-12 mb-3 -->
                                    
                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-name" v-model="contactSearch.name">
                                        <label for="search-name">{{ $t("name") }}</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-address" v-model="contactSearch.address">
                                        <label for="search-address">{{ $t("address") }}</label>
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3">
                                        <label class="o-s-l">{{ $t("operator") }}</label> 
                                        <multiselect deselect-label="" select-label="" v-model="contactSearch.provider_id" :options="providers" :preserve-search="true" label="name" :placeholder="$t('s_o')" track-by="name" :preselect-first="false">
                                            <template slot="singleLabel" slot-scope="props">
                                                <template v-if="props.option.logo_small_src">
                                                    <img class="option__image" :src="'/uploads/imgs/'+props.option.logo_small_src.resized_name" :alt="props.option.name">
                                                </template> 
                                                <span class="option__title"> {{ props.option.name }}</span>
                                            </template>
                                            <template slot="option" slot-scope="props">
                                                <template v-if="props.option.logo_small_src">
                                                   <img class="option__image" :src="'/uploads/imgs/'+props.option.logo_small_src.resized_name" :alt="props.option.name"> 
                                                </template> 
                                                <span class="option__title"> {{ props.option.name }}</span>
                                            </template>
                                        </multiselect>  
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3" v-if="contactSearch.provider_id">
                                        <label for="search-service_id" class="o-s-l">Type</label>
                                        <select class="form-control" id="search-service_id" v-model="contactSearch.service_id">  
                                            <option value="">All</option>
                                            <option v-for="service in contactSearch.services" :value="service.id">{{service.name}}</option>
                                        </select>  
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3">  
                                        <label class="o-s-l">{{ $t('category') }}</label>
                                        <multiselect v-model="contactSearch.category" :options="categories" deselect-label="" select-label="" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" label="name" track-by="name" :placeholder="$t('s_cat')" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span class="custom__tag">
                                                    <span>{{ props.option.name }}</span>
                                                    <span @click="props.remove(props.option)">x</span> 
                                                </span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-12 mb-3 --> 
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="contactSearch.date_from" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_from') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="contactSearch.date_to" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t("order_by") }}</label>
                                        <select id="search-order-by" class="form-control" v-model="contactSearch.order_by" >
                                            <option value="">{{ $t("newer_first") }}</option>
                                            <option value="1">{{ $t("newer_last") }}</option>
                                        </select> 
                                    </div><!--  /.col-12 mb-3 -->
                                        
                                    <div class="col-12 mb-3"> 
                                        <button class="btn btn-primary btn-sm" type="submit">{{ $t("search") }}</button>
                                        <button class="btn btn-dark float-right btn-sm" type="reset">{{ $t("reset") }}</button>
                                    </div><!--  /.col-12 mb-3 --> 
            
                                </div><!--  /.form-row -->  
                            </div><!--  /.modal-body --> 
                        </form>
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal search -->

            <div class="table-actions"> 
                <button v-can="'contact-create'" type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i>{{ $t("contact") }}
                </button> 

                <button v-can="'contact-delete'" v-if="selected.length" class="btn btn-sm btn-danger " v-on:click="deleteSelected()"><i class="icon-trash-empty"></i> {{ $t("d_s") }}</button>

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">{{ $t("search") }}</span>
                </button>

            </div><!--  /.table-actions -->

            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr>
                            <th style="width: 20px;"><input type="checkbox" id="check-all" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all">{{ $t("number") }}</label></th>
                            <th>{{ $t("operator") }}</th> 
                            <th>{{ $t("name") }}</th> 
                            <th>{{ $t("address") }}</th>
                            <th>{{ $t("category") }}</th>
                            <th>{{ $t("status") }}</th>
                            <th>{{ $t("date") }}</th>   
                            <th>{{ $t("action") }}</th>  
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="contact, index in contacts.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+contact.id" :value="contact.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+contact.id">{{ ( contact.services.length ) ? contact.services[0].number : '' }}</label></td> 
                            <td class="taxonomies">
                                <template v-if="contact.services">
                                    <span v-for="service in contact.services">{{service.provider_id.name}}</span> 
                                </template>
                            </td>
                            <td>{{ contact.name }}</td> 
                            <td>{{ contact.address }}</td>   
                            <td class="taxonomies">
                                <template v-if="contact.categories">
                                    <span v-for="category in contact.categories">{{category.name}}</span> 
                                </template>
                            </td>
                            <td> 
                                <template v-if="contact.status">
                                    <span class="bg-success active-status">{{ $t('active') }}</span>
                                </template>
                                <template v-else>
                                    <span class="bg-danger active-status">{{ $t('block') }}</span>
                                </template>
                            </td>   
                            <td>{{ contact.created_at | moment("DD-MM-YYYY, h:mm a") }}</td>     
                            <td>
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                    <a v-can="'contact-view'" href="#" class="dropdown-item" v-on:click.prevent="editForm(contact, false)" data-toggle="modal" data-target="#createModal">
                                       {{ $t("view") }} 
                                    </a>
                                    <a v-can="'contact-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(contact)" data-toggle="modal" data-target="#createModal">
                                       {{ $t("edit") }} 
                                    </a>
                                    <a v-can="'contact-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(contact.id, index)">
                                        {{ $t("delete") }}
                                    </a>
                                  </div>
                                </div> 
                            </td>
                        </tr>

                        <template v-if="noData"><tr class="bg-white" v-html="noData"></tr></template>
                       
                    </tbody>
                    <tfoot>
                        <tr>
                            <th><input type="checkbox" id="check-all-bottom" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all-bottom">{{ $t("number") }}</label></th>
                            <th>{{ $t("operator") }}</th> 
                            <th>{{ $t("name") }}</th> 
                            <th>{{ $t("address") }}</th>
                            <th>{{ $t("category") }}</th>
                            <th>{{ $t("status") }}</th>
                            <th>{{ $t("date") }}</th> 
                            <th>{{ $t("action") }}</th> 
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="contacts" :limit="2" @pagination-change-page="getLists"></pagination> 
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
            formType: false,
            viewForm: true,
            contact: {  
                status: 1,
                name: '',
                services: [
                    { number: null, name: null, number_list: null, provider_id: '', services: [], service_id: '' }
                ],   
                identities: [
                    { id_number: null, id_type: 1 }
                ], 
                address: '',
                categories: [],
            }, 
            contactConst: {  
                status: 1,
                name: '',
                services: [
                    { number: null, name: null, number_list: null, provider_id: '', services: [], service_id: '' }
                ],  
                identities: [
                    { id_number: null, id_type: 1 }
                ], 
                address: '',
                categories: [],
            }, 
            contactSearch: {
                number: null,
                name: '',
                provider_id: '', 
                services: [], 
                service_id: '',
                address: '',
                category: [],
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            contacts: {},
            categories: [],   
            providers: [],
            perPage: this.$route.query.per_page, 
            perPageOptions: this.$store.state.perPageOptions,
            selected: [],
            selectAll: false,
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
        'contact.provider_id': function( val ) { 
            if ( this.contact.provider_id ) {
                this.contact.service_id = this.contact.provider_id.services[0].id;  
                this.contact.services = this.contact.provider_id.services; 
            }
        },
        'contactSearch.provider_id': function (val) {  
            this.contactSearch.services = ( this.contactSearch.provider_id ) ? this.contactSearch.provider_id.services : [];  
            this.contactSearch.service_id = '';  
        },  
    },
    created() {
        this.getLists();  

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
    updated() {   
        this.$root.dropdownModal(); 
    },
    methods: {
        addService(index) {
            this.contact.services.splice(index + 1, 0, { number: null, name: null, number_list: null, provider_id: '', services: [], service_id: '' } ); 
        },
        removeService(index) {
            if (this.contact.services.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.contact.services.splice(index, 1); 
            }
        },
        addIdentity(index) {
            this.contact.identities.splice(index + 1, 0, { id_number: null, id_type: 1 } ); 
        },
        removeIdentity(index) {
            if (this.contact.identities.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.contact.identities.splice(index, 1); 
            }
        },
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.contacts.data) {
                    this.selected.push(this.contacts.data[key].id);
                }
            }
        }, 
        dataSearch() { 
            var data_search = this.contactSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) {
                    if ( key != 'services' ) {
                        if ( key == 'category' ) {
                            if ( data_search[key].length ) {
                                let cat_ids = data_search[key].map(function (el) { return el.id; });
                                query[key] = cat_ids.join();  
                            } else {
                                query[key] = ''; 
                            }
                        } else { 
                            query[key] = ( key != 'provider_id' ) ? data_search[key] : data_search[key]['id'];  
                        }                         
                    }
                } else {
                    if ( this.$route.query[key] ) {
                        query[key] = '';
                    }
                } 
            }   
            this.$router.push( { path: document.location.search, query: query } );   
            this.getLists(); 
        }, 
        numberChange(key) { 
            var query = this.contact.services[key].number; 
            /* Auto select Operator by prefix */
            if ( query.length >= 3 ) {  
                var prefix = query.substring(0, 3);  

                var operator = this.providers.filter(function(itm) {  
                    if ( itm.prefix ) {
                        if ( itm.prefix.indexOf(':') > -1 ) { 
                            let res = itm.prefix.split(":");  
                            for (let key of res ) { 
                                if ( prefix == key ) { 
                                    return true; 
                                }
                            }  
                        } else {
                            return prefix.indexOf(itm.prefix) > -1;
                        }
                    }  
                });   
            
                if ( operator.length ) {
                    this.contact.services[key].provider_id = operator[0];  
                    if ( operator[0].services ) {
                        this.contact.services[key].service_id = operator[0].services[0].id;  
                        this.contact.services[key].services = operator[0].services; 
                    } 
                } 
            } else {
                this.contact.services[key].provider_id = ''; 
                this.contact.services[key].service_id = ''; 
            }

            /* Suggest contact number */
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }

            this.timer = setTimeout(() => { 
                if ( query.length <= 5 ) {
                    this.contact.services[key].name = ''; 
                    this.contact.services[key].number_list = ''; 
                    return;
                }
                axios.get('/api/v1/ct/contacts?'+ 'number=' + query)
                    .then( resp => {  
                        this.contact.services[key].number_list = resp.data.contacts.data;  
                    })
                    .catch( resp => {
                        this.$store.commit('errorMessages', resp); 
                    }); 
            }, 600);            
        },
        providerChanged( key ) {  
            if ( this.contact.services[key].provider_id.services ) {
                this.contact.services[key].service_id = this.contact.services[key].provider_id.services[0].id;  
                this.contact.services[key].services = this.contact.services[key].provider_id.services; 
            } 
        },
        selectedNumber(key, number) {
            this.contact.services[key].number = number.number; 
            this.contact.services[key].number_list = null; 
            this.contact.services[key].name = number.name; 
            var result = number.provider_id;  
            if ( result ) {
               this.contact.services[key].provider_id = result; 
               this.contact.services[key].services = result.services; 
               this.contact.services[key].service_id = number.service_id.id;  
            } 
        },
        removeNumber(key) { 
            this.contact.services[key].name = null; 
            this.contact.services[key].number = null;  
            this.contact.services[key].number_list = null;  
            this.contact.services[key].provider_id = ''; 
            this.contact.services[key].service_id = '';  
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
                queryString += '&type=1&identities=1';
            
            axios.get('/api/v1/ct/contacts?'+ queryString)
                .then( resp => {  
                    app.preloader = false;

                    app.contacts = resp.data.contacts;  
                    app.categories = resp.data.categories;   
                    app.providers = resp.data.providers;

                    if(app.contacts.data.length == 0) {                                 
                        app.noData = app.$store.state.noData;
                    } else {
                        app.noData = '';
                    }
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        }, 
        newForm() { 
            this.formType = true; 
            this.contact = this.contactConst;  
        }, 
        saveForm() { 
            document.getElementById('createModal').style.display = 'none';
            var app = this;
            var newContact = app.contact;
            this.$set( newContact, 'type', 1 );
            if ( this.formType ) {
                axios.post('/api/v1/ct/contacts', newContact)
                    .then( resp => {  
                        this.contact = this.contactConst; 
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else { 
                axios.patch('/api/v1/ct/contacts/' + newContact.id, newContact)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm( contact, viewForm = true ) {
            this.formType = false;  
            this.viewForm = viewForm;  
            this.contact = contact;  
            for (let key in contact.services) { 
                contact.services[key].services = contact.services[key].provider_id.services;
            }

            if ( !contact.identities.length ) {
                this.contact.identities = [
                    { id_number: null, id_type: 1 }
                ];
            }  
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/ct/contacts/' + id)
                    .then( resp => {
                        app.contacts.data.splice(index, 1); 
                        app.$store.commit('submitMsg', 'delete');  
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp);
                    });
            }
        },
        deleteSelected() { 
            var app = this;
            if( app.selected.length == 0 ) {
                app.$store.commit('noSelectedMsg');
                return;
            }
            if (confirm(app.$store.state.confirmDel)) {
                var selectedItem = this.selected.toString();
                axios.delete('/api/v1/ct/contacts/' + selectedItem)
                    .then( resp => {
                        app.$store.commit('submitMsg', 'selectedDelete'); 
                        app.selectAll = false;
                        app.selected = [];
                        app.getLists(); 
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
                conntact_list: 'Contact Lists', 
                contact: 'Contact',  
                category: 'Category', 
                identity: 'Identity', 
                active: 'Active', 
                block: 'Block', 
                //modal-content
                id_number: 'ID Number', 
                nid: 'NID',  
                passport: 'Passport',  
                birth_crt: 'Birth crt',  
                mobile_recharge: 'Mobile Recharge', 
                new: 'New', 
            },
            bn: { 
                conntact_list: 'ফোনবুক তালিকা',  
                contact: 'ফোনবুক',  
                category: 'শ্রেণী', 
                identity: 'পরিচয়', 
                active: 'সক্রিয়', 
                block: 'ব্লক', 
                //modal-content 
                id_number: 'পরিচয় পত্র নাম্বার', 
                nid: 'জাতীয় পরিচয় পত্র', 
                passport: 'পাসপোর্ট', 
                birth_crt: 'জম্ম সনদ',
                mobile_recharge: 'মোবাইল রিচার্জ', 
                new: 'নতুন', 
            },  
        },
        sharedMessages: commonMessages
    },
} //export default
</script>