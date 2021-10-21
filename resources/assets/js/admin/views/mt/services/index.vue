<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Service Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body">  

            <!-- Modal Create-->
            <div v-can="'service-create'" class="modal fade" id="createModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">  {{ (formType) ? 'New' : 'Update' }} Service</h5>
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
                                          <input type="checkbox" v-model="service.status">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3"> 
                                        <label for="type" class="o-s-l">Provider</label>
                                        <multiselect v-model="service.provider_id" selectLabel="" deselectLabel="" :options="allProviders" :preserve-search="true" label="name" track-by="name" :preselect-first="true"> 
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="name" v-model="service.name">
                                        <label for="name">Name</label>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="slug" v-model="service.slug">
                                        <label for="slug">Slug</label>
                                    </div><!--  /.col-md-4 mb-3 -->   

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="operator_code" v-model="service.operator_code">
                                        <label for="operator_code">Operator Code</label>
                                    </div><!--  /.col-md-4 mb-3 -->  

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="min_amount" v-model="service.min_amount">
                                        <label for="min_amount">Minimum Amount</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="max_amount" v-model="service.max_amount">
                                        <label for="max_amount">Maximum Amount</label>
                                    </div><!--  /.col-md-4 mb-3 -->  

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="co_com" v-model="service.co_com">
                                        <label for="co_com">Company Commission (%)</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="user_com" v-model="service.user_com">
                                        <label for="user_com">User Commission (%)</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="mt-number-list">
                                        <div class="mt-numbers" v-for="(fee, key) in service.service_fees"> 
                                            <div class="mt-title">
                                                Fees Ranage: {{ key+1 }}
                                            </div><!--  /.mt-title mb-3 -->
                                            <div class="mt-control"> 
                                                <span class="btn btn-primary btn-sm" @click="addNumber(key)"><i class="icon-plus"></i></span>
                                                <span class="btn btn-danger btn-sm" @click="removeNumber(key)"><i class="icon-minus"></i></span>
                                            </div><!--  /.mt-control mb-3 --> 

                                            <div class="form-row mt-4">
                                                
                                                <div class="col-md-6 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'amount_from'+key" v-model="fee.from">
                                                    <label :for="'amount_from'+key">Amount From</label>
                                                </div><!--  /.col-md-12 mb-3 -->    

                                                <div class="col-md-6 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'amount_to'+key" v-model="fee.to">
                                                    <label :for="'amount_to'+key">Amount To</label>
                                                </div><!--  /.col-md-12 mb-3 -->  
                                                 
                                                <div class="col-md-6 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'co_fee'+key" v-model="fee.co_fee">
                                                    <label :for="'co_fee'+key">Co Fee</label>
                                                </div><!--  /.col-md-12 mb-3 -->    

                                                <div class="col-md-6 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'user_fee'+key" v-model="fee.user_fee">
                                                    <label :for="'user_fee'+key">User Fee</label>
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3"> 
                                                    <label for="status">Is fee is percent?</label> 
                                                    <label class="switch">
                                                      <input type="checkbox" v-model="fee.percent">
                                                      <span class="slider round"></span>
                                                    </label> 
                                                </div><!--  /.col-md-12 mb-3 -->  

                                                <div class="col-md-6 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'co_fee'+key" v-model="fee.co_com">
                                                    <label :for="'co_com'+key">Co Com</label>
                                                </div><!--  /.col-md-12 mb-3 -->    

                                                <div class="col-md-6 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'user_com'+key" v-model="fee.user_com">
                                                    <label :for="'user_com'+key">User Com</label>
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-2"> 
                                                    <label for="status">Is Com is percent?</label> 
                                                    <label class="switch">
                                                      <input type="checkbox" v-model="fee.com_percent">
                                                      <span class="slider round"></span>
                                                    </label> 
                                                </div><!--  /.col-md-12 mb-3 -->  

                                            </div><!--  /.form-row --> 
                                        </div><!--  /.mt-numbers -->
                                    </div> <!-- /.mt-number-list -->

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
                                        <date-time-picker v-model="serviceSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="serviceSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="serviceSearch.order_by" >
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
                <button v-can="'service-create'" type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> Service
                </button> 

                <button v-if="selected.length" class="btn btn-sm btn-danger " v-on:click="deleteSelected()"><i class="icon-trash-empty"></i> Delete Selected</button>

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">Search</span>
                </button>

            </div><!--  /.table-actions -->

            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr>
                            <th style="width: 20px;"><input type="checkbox" id="check-all" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all">Provider</label></th>
                            <th>Status</th>
                            <th>Name</th>  
                            <th>Slug</th>  
                            <th title="Operator Code">Code</th>  
                            <th title="Min Amount">Min</th> 
                            <th title="Max Amount">Max</th>   
                            <th>Co Com</th>  
                            <th>User Com</th>  
                            <th>Actions</th>  
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="service, index in services.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+service.id" :value="service.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+service.id">{{ service.provider_id.name }}</label></td>
                            <td> 
                                <template v-if="service.status">
                                    <span class="bg-success active-status">Active</span>
                                </template>
                                <template v-else>
                                    <span class="bg-danger active-status">Inactive</span>
                                </template>
                            </td>
                            <td>{{ service.name }}</td>   
                            <td>{{ service.slug }}</td>      
                            <td>{{ service.operator_code }}</td>   
                            <td>{{ service.min_amount }}</td> 
                            <td>{{ service.max_amount }}</td>  
                            <td>{{ service.co_com }} %</td>  
                            <td>{{ service.user_com }} %</td>  
                            <td>
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                    <a v-can="'service-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(service)" data-toggle="modal" data-target="#createModal">
                                       Edit 
                                    </a>
                                    <a v-can="'service-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(service.id, index)">
                                        Delete
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
                            <th><label for="check-all-bottom">Provider</label></th>
                            <th>Status</th>
                            <th>Name</th>   
                            <th>Slug</th>   
                            <th title="Operator Code">Code</th>   
                            <th title="Min Amount">Min</th> 
                            <th title="Max Amount">Max</th>  
                            <th>Co Com</th>  
                            <th>User Com</th>   
                            <th>Actions</th> 
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="services" :limit="2" @pagination-change-page="getLists"></pagination> 
            </div><!--  /.table-actions -->
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script>  
export default {
    components: {     
        'date-time-picker': () => import('vue-vanilla-datetime-picker'), 
    },   
    data() {
        return {    
            dateOptions: this.$store.state.dateOptions, 
            formType: false,
            service: { 
                status: 1,
                provider_id: '',
                servicecatid: '', 
                type: '', 
                operator_code: '', 
                min_amount: '',
                max_amount: '', 
                co_com: '',
                user_com: '',
                service_fees: [
                    { from: null, to: null, co_fee: null, user_fee: null, percent: '', co_com: null, user_com: null, com_percent: '', }
                ],
            }, 
            serviceConst: { 
                status: 1,
                provider_id: '',
                servicecatid: '', 
                type: '', 
                operator_code: '', 
                min_amount: '',
                max_amount: '', 
                co_com: '',
                user_com: '',
                service_fees: [
                    { from: null, to: null, co_fee: null, user_fee: null, percent: '', co_com: null, user_com: null, com_percent: '', }
                ],
            },  
            serviceSearch: { 
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            services: {},  
            allProviders: [], 
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
    methods: {
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.services.data) {
                    this.selected.push(this.services.data[key].id);
                }
            }
        }, 
        addNumber(index) {
            this.service.service_fees.splice(index + 1, 0, { from: null, to: null, co_fee: null, user_fee: null, percent: '' } ); 
        },
        removeNumber(index) {
            if (this.service.service_fees.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.service.service_fees.splice(index, 1); 
            }
        },
        dataSearch() { 
            var data_search = this.serviceSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) {
                    query[key] = data_search[key]; 
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
            
            let current_page = (click) ? page : this.$route.query.page ;
            if ( click ) {
                this.$router.push( { path: document.location.search, query: { page: current_page, per_page: per_page } } );  
            }

            let allQuery = this.$route.query;

            var queryString = Object.keys(allQuery).map(key => key + '=' + allQuery[key]).join('&');
            
            axios.get('/api/v1/mt/services?'+ queryString)
                .then( resp => {  
                    app.preloader = false; 
                    app.services = resp.data.services;    

                    app.allProviders = resp.data.providers;  
                    if(app.services.data.length == 0) {                                 
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
            this.service = this.serviceConst; 
        }, 
        saveForm() { 
            document.getElementById('createModal').style.display = 'none';
            var app = this;
            var newService = app.service;
            if ( this.formType ) {
                axios.post('/api/v1/mt/services', newService)
                    .then( resp => {  
                        this.service = this.serviceConst;
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                axios.patch('/api/v1/mt/services/' + newService.id, newService)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm(service) {
            this.formType = false;
            this.service = service;  
            if ( service.service_fees.length == 0 ) { 
                this.service.service_fees = [
                    { from: null, to: null, co_fee: null, user_fee: null, percent: '', co_com: null, user_com: null, com_percent: '', }
                ];
            }
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/mt/services/' + id)
                    .then( resp => {
                        app.services.data.splice(index, 1); 
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
                axios.delete('/api/v1/mt/services/' + selectedItem)
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
    } //methods
} //export default
</script>