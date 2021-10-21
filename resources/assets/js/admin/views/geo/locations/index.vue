<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Geo Location Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body"> 

            <!-- Modal Create-->
            <div class="modal fade" id="createModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">New Geo Location</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">

                                    <div class="col-md-6 col-lg-4 mb-3"> 
                                        <label class="o-s-l">Country</label> 
                                        <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="location.country_id" :options="countries" :preserve-search="true" label="name" track-by="name" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect>  
                                    </div><!--  /.col-md-4 --> 

                                    <div class="col-md-6 col-lg-4 mb-3">  
                                        <label class="o-s-l">Country Stage</label>
                                        <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="location.stage_id" :options="country_stages" :preserve-search="true" :loading="country_stage_loading" label="name" track-by="name" :preselect-first="false">
                                            <template slot="singleLabel" slot-scope="props">
                                                <span class="option__title"> {{ props.option.name }}</span>
                                            </template>
                                            <template slot="option" slot-scope="props">
                                                <span class="option__title"> {{ props.option.name }}</span>
                                            </template>
                                        </multiselect>   
                                    </div><!--  /.col-md-4 -->

                                    <div class="col-md-6 col-lg-4">
                                        <label class="o-s-l">Parent Location</label>
                                        <multiselect v-model="location.location_id" deselect-label="" select-label="" :custom-label="customLocationLabel" :options="parent_locations" :preserve-search="true" :loading="parent_location_loading" label="name" track-by="name" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-md-4 -->

                                    <div class="mt-number-list mrt-15">  
                                        <div class="mt-numbers" v-for="(location, key) in location.location_data"> 
                                            <div class="mt-title">
                                                Location {{ key+1 }}
                                            </div><!--  /.mt-title mb-3 -->
                                            <div class="mt-control"> 
                                                <span class="btn btn-primary btn-sm" @click="addRow(key)"><i class="icon-plus"></i></span>
                                                <span class="btn btn-danger btn-sm" @click="removeRow(key)"><i class="icon-minus"></i></span>
                                            </div><!--  /.mt-control mb-3 -->

                                            <div class="form-row mt-4">  
                                              
                                                <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'name'+key" v-model="location.name">
                                                    <label :for="'name'+key">Name</label>
                                                </div><!--  /.col-md-4 mb-3 -->

                                                <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'native_name'+key" v-model="location.native_name">
                                                    <label :for="'native_name'+key">Native Name</label>
                                                </div><!--  /.col-md-4 mb-3 -->

                                                <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                                    <input placeholder=" " type="number" class="form-control outline" :id="'order'+key" v-model="location.order">
                                                    <label :for="'order'+key">Serial</label>
                                                </div><!--  /.col-md-4 mb-3 -->

                                                <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'lat'+key" v-model="location.lat">
                                                    <label :for="'lat'+key">Latitude</label>
                                                </div><!--  /.col-md-4 mb-3 -->

                                                <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'long'+key" v-model="location.long">
                                                    <label :for="'long'+key">Longitude</label>
                                                </div><!--  /.col-md-4 mb-3 -->

                                                <div class="col-md-6 col-lg-4 mb-3 outline-group">
                                                    <input placeholder=" " type="text" class="form-control outline" :id="'web'+key" v-model="location.web">
                                                    <label :for="'web'+key">Web</label>
                                                </div><!--  /.col-md-4 mb-3 -->

                                                <div class="col-md-6 col-lg-4 mb-3"> 
                                                    <label class="o-s-l">Status</label>
                                                    <select class="form-control" v-model="location.status"> 
                                                        <option :value="1">Active</option>
                                                        <option :value="null">Inactive</option>  
                                                    </select>  
                                                </div><!--  /.col-md-4 mb-3 -->  
                                                        
                                            </div><!--  /.form-row --> 
                                        </div><!--  /.mt-numbers -->
                                    </div> <!-- /.mt-number-list --> 

                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button class="btn btn-primary" type="submit">
                                Create
                                </button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal -->

            <!-- Modal Create-->
            <div class="modal fade" id="editModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Update Geo Location</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
            
                                <div class="form-row">  
                                  
                                    <div class="col-md-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" :id="'name-edit'" v-model="locationUpdate.name">
                                        <label :for="'name-edit'">Name</label>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" :id="'native_name-edit'" v-model="locationUpdate.native_name">
                                        <label :for="'native_name-edit'">Native Name</label>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-4 mb-3 outline-group">
                                        <input placeholder=" " type="number" class="form-control outline" :id="'order-edit'" v-model="locationUpdate.order">
                                        <label :for="'order-edit'">Serial</label>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" :id="'lat-edit'" v-model="locationUpdate.lat">
                                        <label :for="'lat-edit'">Latitude</label>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" :id="'long-edit'" v-model="locationUpdate.long">
                                        <label :for="'long-edit'">Longitude</label>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-4 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" :id="'web-edit'" v-model="locationUpdate.web">
                                        <label :for="'web-edit'">Web</label>
                                    </div><!--  /.col-md-4 mb-3 -->

                                    <div class="col-md-4 mb-3"> 
                                        <label class="o-s-l">Status</label>
                                        <select class="form-control" v-model="locationUpdate.status"> 
                                            <option :value="1">Active</option>
                                            <option :value="null">Inactive</option>  
                                        </select>  
                                    </div><!--  /.col-md-4 mb-3 -->  
                                            
                                </div><!--  /.form-row --> 
                                
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button class="btn btn-primary" type="submit">
                                Update
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
                                        <label class="o-s-l">Select Status</label>
                                        <select id="search-status" class="form-control" v-model="locationSearch.status" >
                                            <option value="">Select Status</option>
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option> 
                                        </select> 
                                    </div><!--  /.col-12 mb-3 --> 
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="locationSearch.date_from" placeholder="Date From"></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker placeholder="Date To" v-model="locationSearch.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="locationSearch.order_by" >
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
                    <i class="icon-plus-squared"></i> Geo Location
                </button>  

                <button v-can="'locationage-delete'" v-if="selected.length" class="btn btn-sm btn-danger " v-on:click="deleteSelected()"><i class="icon-trash-empty"></i> Delete Selected</button> 

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">Search</span>
                </button>

            </div><!--  /.table-actions -->

            <div class="table-responsive"> 
                <table class="table table-striped bg-white">
                    <thead>
                        <tr>
                            <th style="width: 20px;"><input type="checkbox" id="check-all" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all">Name</label></th>
                            <th>Native Name</th>
                            <th>Serial</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Web</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>  
                        <tr  v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="location, index in geolocations.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+location.id" :value="location.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+location.id"><span v-html="dash_icon(location.depth)"></span> {{ location.name }}</label></td>  
                            <td>{{ location.native_name }}</td>  
                            <td>{{ location.order }}</td>  
                            <td>{{ location.lat }}</td>  
                            <td>{{ location.long }}</td>  
                            <td>{{ location.web }}</td>   
                            <td> 
                                <template v-if="location.status">
                                    <span class="bg-success active-status">Active</span>
                                </template>
                                <template v-else>
                                    <span class="bg-danger active-status">Inactive</span>
                                </template>
                            </td>  
                            <td>
                                <div class="dropdown action-items">
                                    <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="icon-ellipsis"></i>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                        <a href="#" class="dropdown-item" v-on:click.prevent="editForm(location)" data-toggle="modal" data-target="#editModal">
                                           Edit 
                                        </a>
                                        <a href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(location.id, index)">
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
                            <th><label for="check-all-bottom">Name</label></th>
                            <th>Native Name</th>
                            <th>Serial</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Web</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->

            <div class="table-actions">   
                <pagination :data="geolocations" :limit="2" @pagination-change-page="getLists"></pagination> 
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
            timeOptions: { 
                format: 'hh:mm a',
                useCurrent: false,
                showClear: true,
                showClose: true,
            },
            formType: false, 
            location: { 
                country_id: null,
                stage_id: null,
                location_id: null,
                location_data: [ { name: null, native_name: null, order: null, lat: null, long: null, web: null, status: 1 } ],
            }, 
            locationConst: { 
                country_id: null,
                stage_id: null,
                location_id: null,
                location_data: [ { name: null, native_name: null, order: null, lat: null, long: null, web: null, status: 1 } ],
            }, 
            locationUpdate: { 
                name: null, 
                native_name: null, 
                order: null, 
                lat: null, 
                long: null, 
                web: null, 
                status: 1,
            }, 
            locationSearch: {
                country_id: null,
                location_id: null,
                status: null,
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            geolocations: {}, 
            countries: [],   
            country_stages: [],   
            country_stage_loading: false,
            parent_locations: [],   
            parent_location_loading: false,
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
        'location.country_id': function (value) {  
            var app = this;     
            var country_id = this.location.country_id.id;
            this.country_stage_loading = true;

            axios.get('/api/v1/geo/country-stages?country_id='+ country_id)
                .then( resp => {
                    app.country_stage_loading = false;
                    app.country_stages = resp.data;                     
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                }); 
        },  
        'location.stage_id': function (value) {  
            var app = this;     
            var country_id = this.location.country_id.id;
            var stage_id = this.location.stage_id.stage;
            if ( stage_id == 1 ) return;

            this.parent_location_loading = true;

            axios.get('/api/v1/geo/locations?country_id='+ country_id + '&stage_id='+stage_id)
                .then( resp => {
                    app.parent_location_loading = false;
                    app.parent_locations = resp.data;                     
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                }); 
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
        customLocationLabel({ name = '', one_parents = '' }) { 
            return `${name} — ${one_parents.name}`;
        },
        dash_icon( depth ) {  
            return "<i class='sub-taxonomy icon-minus'></i>".repeat(depth);
        },
        addRow(index) {
            this.location.location_data.splice(index + 1, 0, { name: null, native_name: null, order: null, lat: null, long: null, web: null, status: 1 } ); 
        },
        removeRow(index) {
            if (this.location.location_data.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.location.location_data.splice(index, 1); 
            } 
        },
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.geolocations.data) {
                    this.selected.push(this.geolocations.data[key].id);
                }
            }
        },  
        dataSearch() { 
            var data_search = this.locationSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) { 
                    query[key] = ( key != 'country_id' && key != 'location_id') ? data_search[key] : data_search[key]['id']; 
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
            
            axios.get('/api/v1/geo/locations?'+ queryString)
                .then( resp => {
                    app.preloader = false; 
                    app.geolocations = resp.data.geolocations; 
                    app.countries = resp.data.geolocations.data_all; 
 
                    if(app.geolocations.data.length == 0) {                                 
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
            this.location = this.locationConst;
        }, 
        saveForm() {  
            var app = this;
            var newLocation = app.location;
            if ( this.formType ) {
                document.getElementById('createModal').style.display = 'none';
                axios.post('/api/v1/geo/locations', newLocation)
                    .then( resp => {  
                        app.location = app.locationConst;
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                document.getElementById('editModal').classList.toggle('show');
                var updateLocation = app.locationUpdate;
                axios.patch('/api/v1/geo/locations/' + updateLocation.id, updateLocation)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm(location) { 
            this.formType = false;   
            this.locationUpdate = location;   
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/geo/locations/' + id)
                    .then( resp => {
                        app.geolocations.data.splice(index, 1); 
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
                axios.delete('/api/v1/geo/locations/' + selectedItem)
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