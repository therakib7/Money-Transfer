<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               {{ pack_title() }} Package Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body"> 

            <!-- Modal Create-->
            <div class="modal fade" id="createModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ (formType) ? 'New' : 'Update' }} {{ pack_title() }} Package</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">

                                    <div class="col-md-12 mb-3"> 
                                        <label for="status">Status</label> 
                                        <label class="switch">
                                          <input type="checkbox" v-model="pack.status">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-md-12 mb-3 -->  

                                    <div class="col-md-6 col-lg-4 mb-3"> 
                                        <label class="o-s-l">Select Providers</label> 
                                        <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="pack.provider_id" :options="providers" :preserve-search="true" label="name" track-by="name" :preselect-first="false" @input="providerChanged()">
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
                                    </div><!--  /.col-md-6 col-lg-4 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3">  
                                        <label class="o-s-l">Service</label>
                                        <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="pack.service_id" :options="pack.services" :preserve-search="true" label="name" track-by="name" :preselect-first="false">
                                            <template slot="singleLabel" slot-scope="props">
                                                <span class="option__title"> {{ props.option.name }}</span>
                                            </template>
                                            <template slot="option" slot-scope="props">
                                                <span class="option__title"> {{ props.option.name }}</span>
                                            </template>
                                        </multiselect>   
                                    </div><!--  /.col-md-6 col-lg-4 mb-3 -->

                                    <div class="col-md-6 col-lg-4 mb-3" v-if="type != 'sim'">
                                        <label class="o-s-l">Select Sim Package</label>
                                        <multiselect v-model="pack.sim_pack_id" deselect-label="" select-label="" :options="sim_packs" :preserve-search="true" label="name" track-by="name" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="title" v-model="pack.name">
                                        <label for="title">Title</label>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="price" v-model="pack.price">
                                        <label for="price">Price</label>
                                    </div><!--  /.col-md-4 mb-3 -->  

                                    <div class="col-md-6 col-lg-4 mb-3" v-if="pack.pack_type == 1 || pack.pack_type == 4">
                                        <label class="o-s-l">Data Type</label> 
                                        <select id="data_type" class="form-control" v-model="pack.data_type" > 
                                            <option value="1">All</option>
                                            <option value="0">Social</option> 
                                        </select> 
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-6 col-lg-4 mb-3">
                                        <label class="o-s-l">Offer Type</label> 
                                        <select id="offer_type" class="form-control" v-model="pack.offer_type" > 
                                            <option value="1">All</option>
                                            <option value="0">Off Sim</option> 
                                            <option value="2">New Sim</option> 
                                        </select> 
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="to_take" v-model="pack.to_take">
                                        <label for="to_take">How to Take</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3">
                                        <label class="o-s-l">Taking Way</label> 
                                        <select id="taking_way" class="form-control" v-model="pack.taking_way" > 
                                            <option :value="null">All</option>
                                            <option value="1">Recharge</option> 
                                            <option value="2">Dial</option>   
                                        </select> 
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-4 mb-3 outline-group">
                                        <input placeholder=" " type="number" class="form-control outline" id="order" v-model="pack.order">
                                        <label for="order">Serial</label>
                                    </div><!--  /.col-md-4 mb-3 -->   

                                    <div class="col-md-8 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="source" v-model="pack.source">
                                        <label for="source">Source From</label>
                                    </div><!--  /.col-md-8 mb-3 -->   

                                    <div class="mt-number-list"> 
                                        <br />
                                        <div class="mt-numbers" v-for="(net, key) in pack.pack_data"> 
                                            <div class="mt-title">
                                                Data and network
                                            </div><!--  /.mt-title mb-3 -->
                                            <div class="mt-control"> 
                                                <span class="btn btn-primary btn-sm" @click="addData(key)"><i class="icon-plus"></i></span>
                                                <span class="btn btn-danger btn-sm" @click="removeData(key)"><i class="icon-minus"></i></span>
                                            </div><!--  /.mt-control mb-3 -->
                                            <div class="form-row"> 

                                                <div class="col-lg-4 mb-3 mt-30 mar-b-15"> 
                                                    <div class="form-row">
                                                        <div class="col-6 outline-group">
                                                            <input placeholder=" " type="text" class="form-control outline" :id="'data'+key" v-model="net.data">
                                                            <label :for="'data'+key">Data</label>
                                                        </div><!--  /.col-6 -->
                                                        <div class="col-6"> 
                                                            <label class="o-s-l">Select</label>
                                                            <select class="form-control" v-model="net.data_type"> 
                                                                <option value="">Select</option>
                                                                <template v-if="pack.pack_type == 1 || pack.pack_type == 4">  
                                                                    <option value="gb">GB</option>
                                                                    <option value="mb">MB</option> 
                                                                </template>

                                                                <template v-if="pack.pack_type == 2 || pack.pack_type == 4">  
                                                                    <option value="min">Min</option>
                                                                    <option value="sec">Sec</option>
                                                                </template>

                                                                <template v-if="pack.pack_type == 3 || pack.pack_type == 4">  
                                                                    <option value="sms">SMS</option> 
                                                                </template> 
                                                                <template v-if="pack.pack_type == 5">  
                                                                    <option value="p">Paisha</option> 
                                                                </template> 
                                                            </select>   
                                                        </div><!--  /.col-6 -->
                                                    </div><!--  /.form-row -->
                                                </div><!--  /.col-lg-4 mb-3 -->  
                                                
                                                <div class="col-lg-4 mb-3 mt-30 mar-b-15">
                                                    <label class="o-s-l">Network</label>
                                                    <select class="form-control" v-model="net.network"> 
                                                        <option value="0">All</option> 
                                                        <template v-if="pack.pack_type != 2 || pack.pack_type != 3">  
                                                            <option value="4">4G</option> 
                                                            <option value="3">3G</option> 
                                                            <option value="2">2G</option>
                                                            <option value="5">5G</option> 
                                                        </template>

                                                        <template v-if="pack.pack_type != 1">  
                                                            <option value="1">Onnet</option> 
                                                            <option value="2">Offnet</option> 
                                                        </template> 
                                                    </select>  
                                                </div><!--  /.col-lg-4 mb-3 --> 

                                                <div class="col-lg-4 mb-3 mt-30"> 
                                                    <div class="form-row">
                                                        <div class="col-6">
                                                            <input placeholder=" " type="text" class="form-control outline" :id="'validity'+key" v-model="net.validity">
                                                            <label :for="'validity'+key">Data Validity</label>
                                                        </div><!--  /.col-6 -->
                                                        <div class="col-6">
                                                            <label class="o-s-l">Select</label>
                                                            <select class="form-control" v-model="net.validity_type"> 
                                                                <option value="">Select</option>
                                                                <template v-if="pack.pack_type != 5">  
                                                                    <option value="days">Days</option>
                                                                    <option value="hours">Hours</option> 
                                                                    <option value="mins">Minutes</option> 
                                                                </template>

                                                                <template v-else>  
                                                                    <option value="sec">Second</option>  
                                                                    <option value="min">Min</option>  
                                                                </template> 
                                                                
                                                            </select> 
                                                        </div><!--  /.col-6 -->
                                                    </div><!--  /.form-row -->
                                                </div><!--  /.col-lg-4 mb-3 --> 

                                                <div class="col-md-6 col-lg-4 mb-3"> 
                                                    <date-time-picker :config="timeOptions" v-model="net.period_from" placeholder="Period From"></date-time-picker>
                                                </div><!--  /.col-lg-4 mb-3 -->

                                                <div class="col-md-6 col-lg-4 mb-3">
                                                    <date-time-picker :config="timeOptions" v-model="net.period_to" placeholder="Period To"></date-time-picker> 
                                                </div><!--  /.col-md-4 mb-3 --> 

                                                <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'comment'+key" v-model="net.comment">
                                                    <label :for="'comment'+key">Comment</label>
                                                </div><!--  /.col-md-4 mb-3 -->  

                                               
                                                <div class="col-md-6 col-lg-4 mb-3">
                                                    <label class="o-s-l">Is Bonus?</label>
                                                    <select class="form-control" v-model="net.is_bonus"> 
                                                        <option value="0">Normal</option>
                                                        <option value="1">Bonus</option>  
                                                    </select>  
                                                </div><!--  /.col-md-4 mb-3 -->   

                                                <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'policy'+key" v-model="net.policy">
                                                    <label :for="'policy'+key">Fair Uses Policy</label>
                                                </div><!--  /.col-md-4 mb-3 -->  

                                            </div><!--  /.form-row --> 
                                        </div><!--  /.mt-numbers -->
                                    </div> <!-- /.mt-number-list -->
 
                                    <div class="col-md-12 mb-3 mt-3">
                                        <tinymce id="d1" :other_options="tinyOptions" v-model="pack.desc"></tinymce>
                                    </div><!--  /.col-md-12 mb-3 -->

                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button class="btn btn-primary" type="submit">
                                {{ (formType) ? 'Create' : 'Update' }}
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
                            <h5 class="modal-title">Search</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="dataSearch()">
                            <div class="modal-body"> 
            
                                <div class="form-row"> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Show</label>
                                        <select class="form-control" v-model="perPage">
                                            <option v-for="option in perPageOptions" v-bind:value="option.value">
                                                {{ option.text }}
                                            </option>
                                        </select>  
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3">
                                        <label class="o-s-l">Select Provider</label>
                                        <multiselect v-model="packSearch.provider_id" deselect-label="" select-label="" :options="providers" :preserve-search="true" placeholder="Select Provider" label="name" track-by="name" :preselect-first="true">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3" v-if="type != 'sim'">
                                        <label class="o-s-l">Select Sim Package</label>
                                        <multiselect v-model="packSearch.sim_pack_id" deselect-label="" select-label="" :options="sim_packs" :preserve-search="true" label="name" track-by="name" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3">
                                        <label class="o-s-l">Select Status</label>
                                        <select id="search-status" class="form-control" v-model="packSearch.status" >
                                            <option value="">Select Status</option>
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option> 
                                        </select> 
                                    </div><!--  /.col-12 mb-3 --> 
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="packSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="packSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="packSearch.order_by" >
                                            <option value="">Newer First</option>
                                            <option value="1">Newer Last</option> 
                                        </select> 
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3"> 
                                        <button class="btn btn-primary btn-sm" type="submit">Search</button>
                                        <button class="btn btn-dark float-right btn-sm" type="reset">Reset</button>
                                    </div><!--  /.col-12 mb-3 --> 
            
                                </div><!--  /.form-row -->  
                            </div><!--  /.modal-body --> 
                        </form>
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal search -->

            <div class="table-actions"> 
                <button type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> {{ pack_title() }} Package
                </button>  

                <button v-can="'package-delete'" v-if="selected.length" class="btn btn-sm btn-danger " v-on:click="deleteSelected()"><i class="icon-trash-empty"></i> Delete Selected</button>

                <button v-if="selected.length" class="btn btn-sm btn-info" v-on:click="lastChecked()"> Update Last Checked</button>

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">Search</span>
                </button>

            </div><!--  /.table-actions -->

            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr>
                            <th style="width: 20px;"><input type="checkbox" id="check-all" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all">Title</label></th>  
                            <th>Serial</th>
                            <th>Actions</th>  
                            <th>Provider</th> 
                            <th>Service</th>
                            <th v-if="type != 'sim'">Package</th>
                            <th>Status</th>
                            <th>Data</th>   
                            <th>Price</th>   
                            <th>Validity</th>
                        </tr>
                    </thead> 

                    <tbody>  
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr> 
                        <tr v-for="pack, index in packs.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+pack.id" :value="pack.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+pack.id">{{ pack.name }}</label></td>
                            <td>{{ pack.order }}</td>  
                            <td>
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                    <a v-can="'package-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(pack)" data-toggle="modal" data-target="#createModal">
                                       Edit / View
                                    </a>
                                    <a v-can="'package-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(pack.id, index)">
                                        Delete
                                    </a>
                                  </div>
                                </div> 
                            </td>                            
                            <td>{{ pack.provider_id.name }}</td>  
                            <td>{{ pack.service_id.name }}</td> 
                            <td v-if="type != 'sim'">{{ ( pack.sim_pack_id ) ? pack.sim_pack_id.name : '' }}</td>  
                            <td> 
                                <template v-if="pack.status">
                                    <span class="bg-success active-status">Active</span>
                                </template>
                                <template v-else>
                                    <span class="bg-danger active-status">Inactive</span>
                                </template>
                            </td>  
                            <td class="taxonomies">
                                <template v-if="pack.pack_data">
                                    <span v-for="net in pack.pack_data">
                                    {{ net.data + ' ' + net.data_type }} {{ net.validity + ' ' + net.validity_type }} 
                                        <template v-if="pack.network == 2 && net.network == 1">
                                            Onnet    
                                        </template>
                                        <template v-if="pack.network == 2 && net.network == 2">
                                            Offnet
                                        </template>
                                    </span> 
                                </template>
                            </td>    
                            <td>{{ pack.price }}</td>   
                            <td class="taxonomies">
                                <template v-if="pack.pack_data">
                                    <span v-for="net in pack.pack_data">
                                        {{ net.validity + ' ' + net.validity_type }}  
                                    </span> 
                                </template>
                            </td>    

                        </tr>

                        <template v-if="noData"><tr class="bg-white" v-html="noData"></tr></template>
                       
                    </tbody>
                    <tfoot>
                        <tr>
                            <th><input type="checkbox" id="check-all-bottom" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all-bottom">Title</label></th>  
                            <th>Serial</th>
                            <th>Actions</th> 
                            <th>Provider</th> 
                            <th>Service</th>
                            <th v-if="type != 'sim'">Package</th>
                            <th>Status</th>
                            <th>Data</th>  
                            <th>Price</th>  
                            <th>Validity</th>
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="packs" :limit="2" @pagination-change-page="getLists"></pagination> 
            </div><!--  /.table-actions -->
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script>  
export default {  
    components: {   
        'tinymce': () => import('vue-tinymce-editor'),
        'date-time-picker': () => import('vue-vanilla-datetime-picker'),
    }, 
    data() {
        return {     
            dateOptions: this.$store.state.dateOptions, 
            tinyOptions: {
                'height': 300
            },
            timeOptions: { 
                format: 'hh:mm a',
                useCurrent: false,
                showClear: true,
                showClose: true,
            },
            formType: false, 
            pack: {
                status: 1,
                provider_id: '',
                services: [],
                service_id: '',
                sim_pack_id: '',
                name: '',
                price: '',
                desc: '', 
                pack_type: 1, 
                data_type: 1, 
                offer_type: 1, 
                to_take: '',
                taking_way: null,
                order: null,
                source: '', 
                pack_data: [ { data: null, data_type: '', network: 0, validity: null, validity_type: '', period_from: '', period_to: '', comment: '', is_bonus: 0, policy: null } ],
            }, 
            packConst: {
                status: 1,
                provider_id: '',
                services: [],
                service_id: '',
                sim_pack_id: '',
                name: '',
                price: '',
                desc: '', 
                pack_type: 1, 
                data_type: 1, 
                offer_type: 1, 
                to_take: '',
                taking_way: null,
                order: null,
                source: '', 
                pack_data: [ { data: null, data_type: '', network: 0, validity: null, validity_type: '', period_from: '', period_to: '', comment: '', is_bonus: 0, policy: null } ],
            }, 
            packSearch: {
                provider_id: '',
                sim_pack_id: '',
                status: '',
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            packs: {}, 
            providers: [],   
            sim_packs: [],
            type: this.$route.params.type,
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
        '$route.params.type': function (type) { 
            this.type = type;
            this.getLists(); 
        },  
    },
    created() {

        /* Fix tinymce popup modal input typing problem */
        /*$(document).on('focusin', function(e) {
            if ($(e.target).closest(".mce-window").length || $(e.target).closest(".moxman-window").length) {
                e.stopImmediatePropagation();
            }
        });*/

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
    methods: {
        pack_title() { 
            switch(this.type) {  
                case 'net':
                    this.pack.pack_type = 1;
                    this.packConst.pack_type = 1;
                    return 'Internet';
                    break; 

                case 'min':
                    this.pack.pack_type = 2;
                    this.packConst.pack_type = 2;
                    return 'Minute';
                    break; 

                case 'sms':
                    this.pack.pack_type = 3;
                    this.packConst.pack_type = 3;
                    return 'SMS';
                    break; 

                case 'bundle':
                    this.pack.pack_type = 4;
                    this.packConst.pack_type = 4;
                    return 'Bundle';
                    break; 

                case 'sim':
                    this.pack.pack_type = 5;
                    this.packConst.pack_type = 5;
                    return 'Sim';
                    break; 
            }
        },
        addData(index) {
            this.pack.pack_data.splice(index + 1, 0, { data: null, data_type: '', network: 0, validity: null, validity_type: '', period_from: '', period_to: '', comment: '', is_bonus: 0, policy: null } ); 
        },
        removeData(index) {
            if (this.pack.pack_data.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.pack.pack_data.splice(index, 1); 
            } 
        },
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.packs.data) {
                    this.selected.push(this.packs.data[key].id);
                }
            }
        }, 
        providerChanged() {  
            if ( this.pack.provider_id.services ) {
                this.pack.service_id = this.pack.provider_id.services[0];  
                this.pack.services = this.pack.provider_id.services; 
            }
        },
        dataSearch() { 
            var data_search = this.packSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) { 
                    query[key] = ( key != 'provider_id' && key != 'sim_pack_id') ? data_search[key] : data_search[key]['id']; 
                } else {
                    if ( this.$route.query[key] ) {
                        query[key] = '';
                    }
                } 
            }   
            this.$router.push( { path: document.location.search, query: query } );   
            this.getLists(); 
        },
        getLists(page = 1, click = false) {

            var app = this;    
            let per_page = this.$route.query.per_page;  

            switch(this.type) {  
                case 'net':
                    var pack_type = 1;
                    break; 

                case 'min':
                    var pack_type = 2;
                    break; 

                case 'sms':
                    var pack_type = 3;
                    break; 

                case 'bundle':
                    var pack_type = 4;
                    break; 

                case 'sim':
                    var pack_type = 5;
                    break; 
            }  
            
            let current_page = (click) ? page : this.$route.query.page ;
            if ( click ) {
                this.$router.push( { path: document.location.search, query: { page: current_page, per_page: per_page } } );  
            }

            let allQuery = this.$route.query;

            var queryString = Object.keys(allQuery).map(key => key + '=' + allQuery[key]).join('&');
             queryString += '&pack_type='+pack_type;
            
            axios.get('/api/v1/mt/packs?'+ queryString)
                .then( resp => {
                    app.preloader = false; 
                    app.packs = resp.data.packs;   
                    app.providers = resp.data.providers;

                    app.sim_packs = resp.data.sim_packs;
                    app.sim_packs_const = resp.data.sim_packs;
                    if(app.packs.data.length == 0) {                                 
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
            this.pack = this.packConst;
        }, 
        saveForm() {   
            document.getElementById('createModal').classList.toggle('show');

            var app = this;
            var newPackage = app.pack;
            if ( this.formType ) {
                axios.post('/api/v1/mt/packs', newPackage)
                    .then( resp => {  
                        this.pack = this.packConst;
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                axios.patch('/api/v1/mt/packs/' + newPackage.id, newPackage)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm(pack) { 
            this.formType = false;   
            this.pack = pack;  
            if ( !this.pack.desc ) this.pack.desc = '';
            if ( pack.provider_id.services ) { 
                this.pack.services = pack.provider_id.services; 
            }
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/mt/packs/' + id)
                    .then( resp => {
                        app.packs.data.splice(index, 1); 
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
                axios.delete('/api/v1/mt/packs/' + selectedItem)
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
        lastChecked() { 
            var app = this;
            if (confirm('Are you sure to update?')) {         
                var data = { 
                    ids: this.selected 
                };    
                axios.post('/api/v1/mt/lastchecked', data)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.selectAll = false;
                        app.selected = [];
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    }); 
            }
        }, 
    } //methods
} //export default
</script>