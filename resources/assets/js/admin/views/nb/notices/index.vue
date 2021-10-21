<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               Notice Lists
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body">  

            <!-- Modal Create-->
            <div v-can="'doc-create'" class="modal fade" id="createModal">
                <div class="modal-dialog modal-lg big-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">  {{ (formType) ? 'New' : 'Update' }} Notice</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">
                                    <div class="col-12 mb-3"> 
                                        <label for="status">Status</label> 
                                        <label class="switch">
                                          <input type="checkbox" v-model="notice.status">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-4 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="title" v-model="notice.title">
                                        <label for="title">Title</label>
                                    </div><!--  /.col-md-4 mb-4 -->

                                    <div class="col-12 mb-4 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="native_title" v-model="notice.native_title">
                                        <label for="native_title">Native Title</label>
                                    </div><!--  /.col-md-4 mb-4 -->  

                                    <div class="col-12 mb-4">  
                                        <button type="button" :class="(notice_type == 'int') ? 'btn btn-sm btn-dark mb-1' : 'btn btn-sm btn-light border mb-1'" @click="notice_type = 'int'">Content</button>
                                        <button type="button" :class="(notice_type == 'native') ? 'btn btn-sm btn-dark mb-1' : 'btn btn-sm btn-light border mb-1'" @click="notice_type = 'native'">Native Content</button>
                                    </div><!--  /.col-12 mb-4 --> 

                                    <div class="col-12 mb-4">
                                        <template v-if="notice_type == 'int' "><tinymce id="d1" :other_options="tinyOptions" v-model="notice.content"></tinymce></template>
                                        
                                        <template v-else-if="notice_type == 'native' "><tinymce id="d2" :other_options="tinyOptions" v-model="notice.native_content"></tinymce></template>  
                                    </div><!--  /.col-12 mb-4 -->  

                                    <div class="col-md-6 mb-3"> 
                                        <label class="o-s-l">Type</label>
                                        <select class="form-control" v-model="notice.type">
                                            <option value="primary">Primary</option>
                                            <option value="secondary">Secondary</option>
                                            <option value="success">Success</option>
                                            <option value="danger">Danger</option> 
                                            <option value="warning">warning</option> 
                                        </select>  
                                    </div><!--  /.col-md-6 mb-3 -->  

                                    <div class="col-md-6 mb-3"> 
                                        <label for="status">In Notice Board</label> 
                                        <label class="switch">
                                          <input type="checkbox" v-model="notice.in_board">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-md-6 mb-3 -->

                                    <div class="col-md-6 mb-3">   
                                        <date-time-picker v-model="notice.schedule_from" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>Schedule From</template></date-time-picker>
                                    </div><!--  /.col-md-6 mb-3 -->

                                    <div class="col-md-6 mb-3"> 
                                        <date-time-picker v-model="notice.schedule_to" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>Schedule To</template></date-time-picker>
                                    </div><!--  /.col-md-6 mb-3 -->

                                    <div class="col-md-6 mb-3"> 
                                        <label class="o-s-l">Notice For</label>
                                        <select class="form-control" v-model="notice.for">
                                            <option :value="null">All</option>
                                            <option value="role">Role</option>
                                            <option value="location">Location</option> 
                                            <option value="role-location">Role & Location</option> 
                                        </select>  
                                    </div><!--  /.col-md-6 mb-3 -->  

                                    <div class="col-12 mb-3" v-if="notice.for == 'role' || notice.for == 'role-location'">
                                        <label class="o-s-l">For Role</label> 
                                        <multiselect v-model="notice.role_ids" :options="roles" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" label="name" track-by="name">
                                            <template slot="tag" slot-scope="props">
                                                <span class="custom__tag">
                                                    <span>{{ props.option.name }}</span>
                                                    <span @click="props.remove(props.option)">x</span> 
                                                </span>
                                            </template>
                                        </multiselect>
                                    </div><!--  /.col-12 mb-3 --> 
                                     
                                    <div class="mt-number-list" v-if="notice.for == 'location' || notice.for == 'role-location'"> 
                                        <div class="mt-numbers" v-for="(id, key) in notice.location_ids"> 
                                            <div class="mt-title">
                                                For Location: {{key+1}}
                                            </div><!--  /.mt-title mb-3 -->
                                            <div class="mt-control"> 
                                                <span class="btn btn-primary btn-sm" @click="addForIDs(key)"><i class="icon-plus"></i></span>
                                                <span class="btn btn-danger btn-sm" @click="removeForIDs(key)"><i class="icon-minus"></i></span>
                                            </div><!--  /.mt-control mb-3 -->
                                            <div class="form-row">   
                                                <div class="col-12 mb-3 mt-40 mar-b-25"> 
                                                    <location :warning="false" :location_id="id.id" v-model="id.id"></location> 
                                                </div><!--  /.col-12 mb-3 -->  
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

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-title" v-model="noticeSearch.title">
                                        <label for="search-title">Title</label>
                                    </div><!--  /.col-12 mb-3 -->   
        
                                    <div class="col-12 mb-3">  
                                        <date-time-picker v-model="noticeSearch.date_from"><template v-slot:choose-date>Date From</template></date-time-picker> 
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="noticeSearch.date_to"><template v-slot:choose-date>Date To</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">Order By</label>
                                        <select id="search-order-by" class="form-control" v-model="noticeSearch.order_by" >
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
                <button v-can="'doc-create'" type="button" @click="newForm()" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i> Notice
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
                            <th><label for="check-all">Title</label></th>
                            <th>Native Title</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>For</th> 
                            <th>Schedule From</th> 
                            <th>Schedule To</th> 
                            <th>Actions</th>  
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="notice, index in notices.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+notice.id" :value="notice.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+notice.id">{{ notice.title }}</label></td>  
                            <td>{{ notice.native_title }}</td>    
                            <td> 
                                <template v-if="notice.status">
                                    <span class="bg-success active-status">Active</span>
                                </template>
                                <template v-else>
                                    <span class="bg-danger active-status">Inactive</span>
                                </template>
                            </td> 
                            <td class="text-capitalize">{{ notice.type }}</td>     
                            <td class="text-capitalize">
                                <template v-if="!notice.for">All</template>
                                <template v-else>{{ notice.for }}</template>
                            </td>     
                            <td>{{ notice.schedule_from | moment('DD-MMM-YYYY hh:mm a') }}</td>   
                            <td>{{ notice.schedule_to | moment("DD-MMM-YYYY hh:mm a") }}</td>   
                            <td>
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                    <a v-can="'doc-edit'" href="#" class="dropdown-item" v-on:click.prevent="editForm(notice)" data-toggle="modal" data-target="#createModal">
                                       Edit 
                                    </a>
                                    <a v-can="'doc-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(notice.id, index)">
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
                            <th><label for="check-all-bottom">Title</label></th>
                            <th>Native Title</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>For</th> 
                            <th>Schedule From</th> 
                            <th>Schedule To</th> 
                            <th>Actions</th> 
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="notices" :limit="2" @pagination-change-page="getLists"></pagination> 
            </div><!--  /.table-actions -->
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script>   
export default { 
    components: {   
        'tinymce': () => import('vue-tinymce-editor'),
        'location': () => import('@components/location/index.vue'),
        'date-time-picker': () => import('vue-vanilla-datetime-picker'),
    },
    data() {
        return {     
            tinyOptions: {
                'height': 300
            },
            formType: false, 
            notice_type: 'int', // international
            notice: { 
                status: 1,
                title: '',
                native_title: '', 
                content: '', 
                native_content: '', 
                type: 'primary', 
                in_board: 1,
                schedule_from: null, 
                schedule_to: null,
                for: null,  
                role_ids: [],  
                location_ids: [{ id: null }],  
            }, 
            noticeConst: { 
                status: 1,
                title: '',
                native_title: '', 
                content: '', 
                native_content: '', 
                type: 'primary', 
                in_board: 1,
                schedule_from: null, 
                schedule_to: null,  
                for: null,  
                role_ids: [],  
                location_ids: [{ id: null }],  
            },   
            noticeSearch: { 
                title: '', 
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },
            notices: {},   
            roles: [],   
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
        //console.log(this.pre_address)

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
        addForIDs(index) {
            this.notice.location_ids.splice(index + 1, 0, { id: null } ); 
        },
        removeForIDs(index) {
            if (this.notice.location_ids.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.notice.location_ids.splice(index, 1); 
            } 
        }, 
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.notices.data) {
                    this.selected.push(this.notices.data[key].id);
                }
            }
        }, 
        dataSearch() { 
            var data_search = this.noticeSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) {
                    if ( key == 'category' ) {
                        if ( data_search[key].length ) {
                            let cat_ids = data_search[key].map(function (el) { return el.id; });
                            query[key] = cat_ids.join();  
                        } else {
                            query[key] = ''; 
                        }
                    } else { 
                        query[key] = data_search[key]; 
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
        getLists(page = 1, click = false) {

            var app = this; 
            let per_page = this.$route.query.per_page;   
            
            let current_page = (click) ? page : this.$route.query.page ;
            if ( click ) {
                this.$router.push( { path: document.location.search, query: { page: current_page, per_page: per_page } } );  
            }

            let allQuery = this.$route.query;

            var queryString = Object.keys(allQuery).map(key => key + '=' + allQuery[key]).join('&'); 
            
            axios.get('/api/v1/nb/notices?'+ queryString)
                .then( resp => {  
                    app.preloader = false; 
                    app.notices = resp.data.notices;     
                    app.roles = resp.data.roles;     

                    if(app.notices.data.length == 0) {                                 
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
            this.notice = this.noticeConst; 
        }, 
        saveForm() { 
            var app = this;
            var newNotice = app.notice; 

            document.getElementById('createModal').style.display = 'none';

            if ( this.formType ) {
                axios.post('/api/v1/nb/notices', newNotice)
                    .then( resp => {  
                        this.notice = this.noticeConst;
                        app.$store.commit('submitMsg', 'add');  
                        app.getLists(); 
                    })
                    .catch( resp => {  
                        app.$store.commit('errorMessages', resp); 
                    });
            } else {
                axios.patch('/api/v1/nb/notices/' + newNotice.id, newNotice)
                    .then( resp => { 
                        this.notice = this.noticeConst;
                        app.$store.commit('submitMsg', 'update');  
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    });
            }
        }, 
        editForm(notice) {
            this.formType = false;
            this.notice = notice;   

            //this is to fix error of tinymce = Error in callback for watcher "value": "TypeError: Cannot read property 'replace' of null"
            if ( !this.notice.content ) this.notice.content = '';
            if ( !this.notice.native_content ) this.notice.native_content = ''; 

            let notice_datas = notice.notice_by_types;
            this.notice.location_ids = [];
            this.notice.role_ids = [];
            for (let key in notice_datas) { 
                if ( notice_datas[key].location_id ) {
                    this.notice.location_ids.push({ id: notice_datas[key].location_id })
                } 

                if ( notice_datas[key].role_id ) {
                    var id = [notice_datas[key].role_id]; 
                    var filteredArray = this.roles.filter(function(itm) {
                        return id.indexOf(itm.id) > -1;
                    }); 
                    this.notice.role_ids.push(filteredArray[0])
                } 
            }
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/nb/notices/' + id)
                    .then( resp => {
                        app.notices.data.splice(index, 1); 
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
                axios.delete('/api/v1/nb/notices/' + selectedItem)
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
 