<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               {{ $t('utility_due_list') }}
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body"> 

            <!-- Modal Create-->
            <div v-can="'due-amount-create'" class="modal fade" id="createModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ $t('new_due_amount') }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">    

                                    <div class="col-md-12 mb-3"> 
                                        <label class="o-s-l">{{ $t('bill_type') }}</label> 
                                        <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="due.provider_id" :options="providers" :preserve-search="true" label="name" :placeholder="$t('select_bill_type')" track-by="name" :preselect-first="false" @input="providerChanged()">
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
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-12 mb-3">  
                                        <label class="o-s-l">{{ $t('service') }}</label>
                                        <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="due.service_id" :options="due.services" :preserve-search="true" label="name" :placeholder="$t('s_s')" track-by="name" :preselect-first="false">
                                            <template slot="singleLabel" slot-scope="props">
                                                <span class="option__title"> {{ props.option.name }}</span>
                                            </template>
                                            <template slot="option" slot-scope="props">
                                                <span class="option__title"> {{ props.option.name }}</span>
                                            </template>
                                        </multiselect>   
                                    </div><!--  /.col-md-12 mb-3 -->       

                                    <div class="col-md-12">  
                                        <div class="input-group outline-group mobile-number"> 
                                            <input :type="( due.search_name ) ? 'text' : 'number'" autocomplete="off" placeholder="Mobile Number" v-on:keyup="numberChange()" class="form-control big-font outline" id="number" v-model="due.number" required>
                                            <label for="number">
                                            {{ ( due.search_name ) ? $t('con_name') : numberTitle() }} {{ ( due.name ) ? `(${due.name})` : '&nbsp;'}}  
                                            </label>

                                            <div class="input-group-append" v-if="due.number">
                                              <span @click="removeNumber()" class="input-group-text cursor-pointer"><i class="icon-cancel"></i></span> 
                                            </div>
                                            <div class="input-group-append" v-if="!due.number">
                                                <span @click="due.search_name = !due.search_name" class="input-group-text cursor-pointer font-weight-bold" :title="( due.search_name ) ? $t('to_type_number') : $t('to_search_by_name')">{{ ( due.search_name ) ? '0' : 'A' }}</span> 
                                            </div>
                                            <div class="input-group-append" v-if="!due.number">
                                                <span class="input-group-text cursor-pointer font-weight-bold" :title="$t('contact_list')" v-on:click.prevent="loadContact(null, null)" data-toggle="modal" data-target="#contactModal"><i class="icon-address-book"></i></span>  
                                            </div>
                                            <div class="input-group-append">
                                                <span class="input-group-text cursor-pointer font-weight-bold" :title="( due.add_name ) ? $t('remove_name') : $t('add_new_name')" @click="due.add_name = !due.add_name"><i class="icon-user-plus"></i></span>  
                                            </div>
                                        </div> 
                                    </div><!--  /.col-md-12 mb-3 -->  

                                    <div class="col-md-12 mb-3">
                                        <ul v-if="due.number_list" class="contact-suggestion">
                                            <template v-for="number, index in due.number_list"> 
                                            <li v-for="service in number.services" @click="selectedNumber(number, service)">{{service.number}} {{ (service.provider_id) ? '- '+service.provider_id.name : ''}}  {{ (number.name) ? '- '+number.name : ''}}</li>
                                            </template>
                                        </ul> 
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-12 mb-3 outline-group" v-if="due.add_name">
                                        <input placeholder=" " type="text" class="form-control outline" id="name" v-model="due.name">
                                        <label for="name">{{ $t('name') }}</label>
                                    </div><!--  /.col-md-12 mb-3 -->                       
                                    
                                    <div class="col-md-12 mb-3 outline-group">
                                        <input placeholder=" " type="number" class="form-control outline" id="amount" v-model="due.amount">
                                        <label for="amount">{{ $t('tk') }}</label>
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-12 mb-3 outline-group">
                                        <input placeholder=" " type="number" class="form-control outline" id="paid" v-model="due.paid">
                                        <label for="paid">{{ $t('paid') }}</label>
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="note" v-model="due.note">
                                        <label for="note">{{ $t('note') }}</label>
                                    </div><!--  /.col-md-12 mb-3 -->  
     
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('close') }}</button>
                                <button class="btn btn-primary" type="submit">
                                {{ $t('create') }}
                                </button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal -->

            <!-- Modal Package -->
            <div class="modal fade" id="contactModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editModalLongTitle">{{ $t('contact_list') }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                         
                        <div class="modal-body">  
                            <div class="row">    
                                <div class="col-md-12" v-if="contactPreloader"> 
                                    <preloader></preloader>
                                </div><!--  /.col-md-12 --> 

                                <div class="col-md-12 mb-3" v-if="!contactPreloader"> 
                                    <select id="filter-ct-cat" class="form-control" v-model="contact.contact_cat_id"> 
                                        <option value="">{{ $t('s_cat') }}</option>
                                        <option v-for="category, index in contact.categories" :value="category.id">{{category.name}}</option> 
                                    </select>
                                </div><!--  /.col-md-12 -->

                                <div class="col-md-12 mb-3"> 
                                    <ul class="list-group">
                                        <template v-for="number, index in contact.contacts.data"> 
                                        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="service in number.services">{{service.number}} {{ (service.provider_id) ? '- '+service.provider_id.name : ''}}  {{ (number.name) ? '- '+number.name : ''}}
                                        <span class="badge badge-dark p-2 cursor-pointer" @click="contactSeleted(number, service)"><i class="icon-ok"></i></span>
                                        </li>
                                        </template>
                                    </ul>
                                    <template v-if="contactNoData && !contactPreloader">There is no contacts</template>
                                </div><!--  /.col-md-12 -->

                                <div class="col-md-12"> 
                                    <pagination :data="contact.contacts" :limit="2" @pagination-change-page="loadContact"></pagination>  
                                </div><!--  /.col-md-12 -->
                                        
                            </div><!--  /.row -->
                        </div><!--  /.modal-body -->

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">{{ $t('close') }}</button> 
                        </div><!--  /.modal-footer --> 
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal --> 

            <!-- Modal Due Paid -->
            <div v-can="'due-amount-create'" class="modal fade" id="createPaidModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ $t('new_paid_due') }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="savePaidForm()">
                            <div class="modal-body"> 
            
                                <div class="form-row">  
                                    <div class="col-md-12 mb-3"> 
                                        <b>{{ $t('due_amount') }}: </b>{{paid.due}}
                                    </div><!--  /.col-md-12 mb-3 -->  
            
                                    <div class="col-md-12 mb-3">
                                        <input placeholder=" " type="number" class="form-control outline" id="amount" v-model="paid.amount">
                                        <label for="amount">{{ $t('amount') }}</label>
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-12 mb-3">
                                        <input placeholder=" " type="text" class="form-control outline" id="note" v-model="paid.note">
                                        <label for="note">{{ $t('note') }}</label>
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-12 mb-3">
                                        <label class="o-s-l">{{ $t('type') }}</label> 
                                        <select v-model="paid.type" id="paid-type" class="form-control">
                                            <option :value="1">{{ $t('paid') }}</option>
                                            <option :value="0">{{ $t('due') }}</option>
                                        </select>
                                    </div><!--  /.col-md-12 mb-3 -->  

                                    <div class="col-md-12 mb-3">
                                        <date-time-picker placeholder="Date Time" v-model="paid.date_time"></date-time-picker>
                                    </div><!--  /.col-md-12 mb-3 -->  
            
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('close') }}</button>
                                <button class="btn btn-primary" type="submit">
                                {{ $t('paid_due') }}
                                </button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal -->

            <!-- Modal Payment History --> 
            <div class="modal fade" id="historyModal">
                <div class="modal-dialog modal-lg big-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editModalLongTitle">{{ $t('choose_package') }}</h5>  
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                         
                        <div class="modal-body"> 
                            <div class="row">
                                <div class="col-md-3">

                                    <div class="row d-block d-sm-none">
                                        <div class="col-md-12 mb-3">   
                                            <button type="button" class="btn btn-sm d-block w-100 mb-3 btn-info" data-toggle="modal" data-target="#historyFilterMobile">
                                                <i class="icon-search"></i> <span>{{ $t('history_filter') }}</span>
                                            </button>
                                        </div><!--  /.col-md-12 mb-3 --> 
                                    </div><!--  /.row -->

                                    <div class="form-row d-none d-md-block">  

                                        <div class="col-12 mb-3">  
                                            <label class="o-s-l">{{ $t('type') }}</label>
                                            <select id="filter-history_type" class="form-control" v-model="history_filter.type"> 
                                                <option value="">{{ $t('all') }}</option>
                                                <option :value="1">{{ $t('paid') }}</option> 
                                                <option :value="0">{{ $t('due') }}</option>
                                            </select>
                                        </div><!--  /.col-12 mb-3 --> 

                                        <div class="col-12 mb-3"> 
                                            <label class="o-s-l">{{ $t('operator') }}</label>
                                            <multiselect deselect-label="" select-label="" v-model="history_filter.provider_id" :options="providers" :preserve-search="true" label="name" track-by="name" :preselect-first="false">
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

                                        <div class="col-12 mb-3" v-if="history_filter.provider_id"> 
                                            <label for="search-service_id" class="o-s-l">{{ $t('operator_type') }}</label>
                                            <select class="form-control" id="search-service_id" v-model="history_filter.service_id">  
                                                <option value="">{{ $t('all') }}</option>
                                                <option v-for="service in history_filter.services" :value="service.id">{{service.name}}</option>
                                            </select>                                                   
                                        </div><!--  /.col-12 mb-3 --> 

                                        <div class="col-12 mb-2"> 
                                            <date-time-picker v-model="history_filter.date_from" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_from') }}</template></date-time-picker>
                                        </div><!--  /.col-12 mb-2 --> 

                                        <div class="col-12 mb-2"> 
                                            <date-time-picker v-model="history_filter.date_to" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                        </div><!--  /.col-12 mb-2 --> 

                                        <div class="col-12 mb-3"> 
                                            <div class="form-row">   
                                                <div class="col-md-6">  
                                                    <input placeholder="Amount From" type="text" class="form-control outline" id="filter-amount" v-model="history_filter.amount_from">
                                                    <label for="filter-amount">{{ $t('amount_from') }}</label>
                                                </div><!--  /.col-md-6 -->
                                                <div class="col-md-6">
                                                    <input placeholder="Amount To" type="text" class="form-control outline" id="filter-amount-to" v-model="history_filter.amount_to">
                                                    <label for="filter-amount-to">{{ $t('amount_to') }}</label>
                                                </div><!--  /.col-md-6 -->
                                            </div><!--  /.form-row -->
                                        </div><!--  /.col-12 mb-3 -->

                                        <div class="col-12"> 
                                            <button class="btn btn-primary btn-sm w-100" v-on:click.prevent="loadDueHistory()">{{ $t('search') }}</button> 
                                        </div><!--  /.col-12 mb-3 --> 

                                    </div><!--  /.row -->  
                                </div><!--  /.col-md-3 -->

                                <div class="col-md-9">
                                    <div class="row">    
                                        <div class="col-md-12" v-if="historyPreloader" > 
                                            <preloader></preloader>
                                        </div><!--  /.col-md-12 --> 

                                        <div class="col-md-12" v-if="!historyPreloader" > 
                                            <table class="table table-striped bg-white">
                                                <tr>
                                                    <th>{{ $t('amount') }}</th>
                                                    <th>{{ $t('operator') }}</th>
                                                    <th>{{ $t('type') }}</th>
                                                    <th>{{ $t('note') }}</th>
                                                    <th>{{ $t('type') }}</th> 
                                                    <th>{{ $t('data') }}</th>
                                                </tr>
                                                <tr  v-for="history, index in due_histories.data">
                                                    <td>{{history.amount}}</td>
                                                    <td>{{ ( history.provider_id ) ? history.provider_id.name : '' }}</td>
                                                    <td>{{ ( history.service_id ) ? history.service_id.name : '' }}</td> 
                                                    <td>{{history.note}}</td>
                                                    <td>{{history.type ? 'Paid' : 'Due' }}</td>
                                                    <td>{{ history.created_at | moment("DD-MM-YYYY, h:mm a") }}</td> 
                                                </tr> 
                                            </table>
                                        </div><!--  /.col-md-12 -->

                                        <div class="col-md-12"> 
                                            <pagination :data="due_histories" :limit="2" @pagination-change-page="loadDueHistory"></pagination>  
                                            <template v-if="historyNoData && !historyPreloader"><tr class="bg-white" v-html="historyNoData"></tr></template>
                                        </div><!--  /.col-md-12 -->
                                                
                                    </div><!--  /.row -->
                                </div><!--  /.col-md-9 -->
                            </div><!--  /.row -->
                        </div><!--  /.modal-body -->

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('close') }}</button> 
                        </div><!--  /.modal-footer --> 
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal --> 

            <!-- Package Filter Mobile -->
            <div class="modal left fade" id="historyFilterMobile"> 
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ $t('history_filter') }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div> 

                        <div class="modal-body">  
                            <div class="form-row"> 
                                <div class="col-12 mb-3">  
                                    <label class="o-s-l">{{ $t('type') }}</label>
                                    <select id="filter-history_type" class="form-control" v-model="history_filter.type"> 
                                        <option value="">{{ $t('all') }}</option>
                                        <option :value="1">{{ $t('paid') }}</option> 
                                        <option :value="0">{{ $t('due') }}</option>
                                    </select>
                                </div><!--  /.col-12 mb-3 --> 

                                <div class="col-12 mb-3"> 
                                    <label class="o-s-l">{{ $t('operator') }}</label>
                                    <multiselect deselect-label="" select-label="" v-model="history_filter.provider_id" :options="providers" :preserve-search="true" label="name" track-by="name" :preselect-first="false">
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

                                <div class="col-12 mb-3" v-if="history_filter.provider_id"> 
                                    <label for="search-service_id" class="o-s-l">Operator Type</label>
                                    <select class="form-control" id="search-service_id" v-model="history_filter.service_id">  
                                        <option value="">{{ $t('all') }}</option>
                                        <option v-for="service in history_filter.services" :value="service.id">{{service.name}}</option>
                                    </select>                                                   
                                </div><!--  /.col-12 mb-3 -->  

                                <div class="col-12 mb-2"> 
                                    <date-time-picker v-model="history_filter.date_from" ><template v-slot:choose-date>{{ $t('date_from') }}</template></date-time-picker>
                                </div><!--  /.col-12 mb-2 --> 

                                <div class="col-12 mb-2"> 
                                    <date-time-picker v-model="history_filter.date_to"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                </div><!--  /.col-12 mb-2 --> 

                                <div class="col-12 mb-3"> 
                                    <div class="form-row">   
                                        <div class="col-md-6">  
                                            <input type="text" placeholder="Amount From" id="filter-amount" class="form-control" v-model="history_filter.amount_from"> 
                                        </div><!--  /.col-md-6 -->
                                        <div class="col-md-6">
                                            <input type="text" placeholder="Amount To" class="form-control" v-model="history_filter.amount_to">  
                                        </div><!--  /.col-md-6 -->
                                    </div><!--  /.form-row -->
                                </div><!--  /.col-12 mb-3 -->  

                                <div class="col-12 mb-3"> 
                                    <button class="btn btn-primary btn-sm w-100" v-on:click.prevent="loadDueHistory()">{{ $t('search') }}</button> 
                                </div><!--  /.col-12 mb-3 --> 

                            </div><!--  /.row --> 
                        </div><!--  /.modal-body -->  
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal search -->
            
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
                                        <label class="o-s-l">{{ $t('show') }}</label>
                                        <select class="form-control" v-model="perPage">
                                            <option v-for="option in perPageOptions" v-bind:value="option.value">
                                                {{ option.text }}
                                            </option>
                                        </select>  
                                    </div><!--  /.col-12 mb-3 -->
        
                                    <div class="col-12 mb-3">
                                        <label class="o-s-l">{{ $t('select_status') }}</label>
                                        <select id="search-status" class="form-control" v-model="dueSearch.status" >
                                            <option value="">{{ $t('select_status') }}</option>
                                            <option value="1">{{ $t('paid') }}</option>
                                            <option value="0">{{ $t('due') }}</option>
                                            <option value="-1">{{ $t('to_give') }}</option> 
                                        </select> 
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3">
                                        <label class="o-s-l">{{ $t('select_type') }}</label>
                                        <select id="search-status" class="form-control" v-model="dueSearch.type" >
                                            <option value="">{{ $t('select_type') }}</option>
                                            <option value="1">{{ $t('to_take') }}</option>
                                            <option value="0">{{ $t('to_give') }}</option> 
                                        </select> 
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-number" v-model="dueSearch.number">
                                        <label for="search-number">{{ $t('number') }}</label>
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-number" v-model="dueSearch.name">
                                        <label for="search-number">{{ $t('name') }}</label>
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-amount-from" v-model="dueSearch.amount_from">
                                        <label for="search-amount-from">{{ $t('amount_from') }}</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-amount-to" v-model="dueSearch.amount_to">
                                        <label for="search-amount-to">{{ $t('amount_to') }}</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-due-from" v-model="dueSearch.due_from">
                                        <label for="search-due-from">{{ $t('due_from') }}</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-due-to" v-model="dueSearch.due_to">
                                        <label for="search-due-to">{{ $t('due_to') }}</label>
                                    </div><!--  /.col-12 mb-3 --> 
        
                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="dueSearch.date_from" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_from') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="dueSearch.date_to" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t("order_by") }}</label>
                                        <select id="search-order-by" class="form-control" v-model="dueSearch.order_by" >
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
                <button v-can="'due-amount-create'" type="button" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i>{{ $t('due_amount') }}
                </button> 

                <button v-can="'due-amount-delete'" v-if="selected.length" class="btn btn-sm btn-danger " v-on:click="deleteSelected()"><i class="icon-trash-empty"></i> {{ $t('d_s') }}</button>

                <button type="button" class="btn btn-sm btn-info float-right" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">{{ $t('search') }}</span>
                </button>
            </div><!--  /.table-actions -->

            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr>
                            <th style="width: 20px;"><input type="checkbox" id="check-all" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all">{{ $t('name') }}</label></th>
                            <th>{{ $t('account') }}</th>
                            <th>{{ $t('amount') }}</th>
                            <th>{{ $t('paid') }}</th>
                            <th>{{ $t('due') }}</th>
                            <th>{{ $t('status') }}</th> 
                            <th>{{ $t('paid_due') }}</th>
                            <th>{{ $t('history') }}</th> 
                            <th>{{ $t('date') }}</th>   
                            <th>{{ $t('action') }}</th>  
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="due, index in dues.data"> 
                            <td><input type="checkbox" v-bind:id="'checkbox-id-'+due.id" :value="due.id" v-model="selected"/></td>
                            <td><label v-bind:for="'checkbox-id-'+due.id">{{ due.contact.name }}</label></td> 
                            <td>{{ due.contact.services[0].number }}</td> 
                            <td>{{ due.amount }}</td> 
                            <td>{{ due.paid }}</td>  
                            <td>{{ due.due }}</td>  
                            <td>{{ status( due.due ) }}</td>  
                            <td><button type="button" class="btn btn-sm btn-default table-button" data-toggle="modal" v-on:click.prevent="createPaidForm(due)" data-target="#createPaidModal">
                                <i class="icon-plus-squared"></i> {{ $t('paid_due') }}
                            </button></td> 
                            <td><button type="button" class="btn btn-sm btn-default table-button" data-toggle="modal" v-on:click.prevent="loadDueHistory(null, null, due.id)" data-target="#historyModal">
                                <i class="icon-book"></i> {{ $t('history') }}
                            </button></td>  
                            <td>{{ due.created_at | moment("DD-MM-YYYY, h:mm a") }}</td> 
                            <td>
                                <div class="dropdown action-items">
                                  <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-ellipsis"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="actionItemButtons"> 
                                    <a v-can="'due-amount-delete'" href="#" class="dropdown-item" v-on:click.prevent="deleteEntry(due.id, index)">
                                        {{ $t('delete') }}
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
                            <th><label for="check-all-bottom">{{ $t('name') }}</label></th>
                            <th>{{ $t('account') }}</th>
                            <th>{{ $t('amount') }}</th>
                            <th>{{ $t('paid') }}</th>
                            <th>{{ $t('due') }}</th>
                            <th>{{ $t('status') }}</th> 
                            <th>{{ $t('paid_due') }}</th>
                            <th>{{ $t('history') }}</th> 
                            <th>{{ $t('date') }}</th>   
                            <th>{{ $t('action') }}</th> 
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">   
                <pagination :data="dues" :limit="2" @pagination-change-page="getLists"></pagination> 
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
            due: { 
                provider_id: '', 
                services: [], 
                service_id: '', 
                number: '', 
                name: null, 
                search_name: false, 
                add_name: false, 
                name: null, 
                number_list: null, 
                amount: '',
                paid: '', 
                note: '', 
            },   
            dueConst: { 
                provider_id: '', 
                services: [], 
                service_id: '', 
                number: '', 
                name: null, 
                search_name: false, 
                add_name: false, 
                name: null, 
                number_list: null, 
                amount: '',
                paid: '', 
                note: '', 
            },
            paid: {  
                amount: '', 
                note: '', 
                type: 1, 
                date_time: '', 
            }, 
            contact: { 
                contact_cat_id: '',
                contacts: {}, 
                categories: [],  
            },
            due_selected_id: null,
            due_histories: {},
            history_filter: {  
                type: '',  
                provider_id: '',
                services: [],
                service_id: '',
                data_from: '',
                data_to: '',
                amount_from: '',
                amount_to: '',
            },
            dueSearch: {
                status: '',
                type: '',
                number: '',
                name: '',
                amount_from: '',
                amount_to: '',
                due_from: '',
                due_to: '', 
                date_from: '',  
                date_to: '',     
                order_by: '',  
            },  
            dues: {},
            providers: [],  
            perPage: this.$route.query.per_page, 
            perPageOptions: this.$store.state.perPageOptions,
            selected: [],
            selectAll: false,
            noData: '',
            contactNoData: '',
            historyNoData: '',
            preloader: true,
            contactPreloader: true,
            historyPreloader: true,
        }
    },
    watch: {
        perPage(val) {
            let page = this.$route.query.page;  
            this.$router.push( { path: document.location.search, query: { page: page, per_page: val } } ); 
            this.getLists(); 
        },   
        'contact.contact_cat_id': function (val) {   
            this.$router.push( { path: document.location.search, query: { contact_cat_id: val } } ); 
            this.loadContact(); 
        },
        'history_filter.provider_id': function (val) {  
            this.history_filter.services = ( this.history_filter.provider_id ) ? this.history_filter.provider_id.services : []; 
            this.history_filter.service_id = '';   
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
                for (let key in this.dues.data) {
                    this.selected.push(this.dues.data[key].id);
                }
            }
        }, 
        dataSearch() { 
            var data_search = this.dueSearch;   
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
        status( due ) {
            if ( due == 0 ) {
                return this.$t('paid');
            } else if ( due > 0 ) {
                return this.$t('due');
            } else {
                return this.$t('to_give');
            }
        }, 
        numberTitle() {
            if ( this.due.provider_id.slug == 'palli-bidyut' ) {
                return 'Consumer Number';
            } else if ( this.due.provider_id.slug == 'bpdb'  && this.due.service_id.slug == 'prepaid' ) {
                return 'Meter No';
            } else {
                return this.$t('consumer_number');
            } 
        }, 
        numberChange(key, searchName = false ) { 
            var query = this.due.number;  

            /* Suggest contact number */
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }

            this.timer = setTimeout(() => { 
                if ( query.length <= 5 ) {
                    this.due.name = ''; 
                    this.due.number_list = ''; 
                    return;
                }
                let search_key = (searchName) ? 'name' : 'number';
                axios.get('/api/v1/ct/contacts?'+ search_key +'=' + query + '&type=1') 
                    .then( resp => {  
                        this.due.number_list = resp.data.contacts.data;  
                    })
                    .catch( resp => {
                        this.$store.commit('errorMessages', resp); 
                    }); 
            }, 600);            
        },        
        providerChanged() {  
            if ( this.due.provider_id.services ) {
                this.due.service_id = this.due.provider_id.services[0];  
                this.due.services = this.due.provider_id.services; 
            } 
        },   
        selectedNumber(number, service) {
            this.due.number = service.number; 
            this.due.number_list = null; 
            this.due.name = number.name; 
            var result = service.provider_id;  
            if ( result ) {
               this.due.provider_id = result; 
               this.due.services = result.services;  
               let item = result.services.find(item => item.id === service.service_id);  
               this.due.service_id = item; 
            } 
        }, 
        removeNumber() { 
            this.due.name = null; 
            this.due.number = null;  
            this.due.number_list = null;  
            this.due.provider_id = ''; 
            this.due.service_id = ''; 
            this.due.amount = '';  
        },
        loadContact(page = 1, click = false) {
            var app = this;  

            if ( !this.$route.query.contact_per_page && !this.$route.query.contact_page) {   
                this.$router.push( { path: document.location.search, query: { contact_page: 1, contact_per_page: 20 } } ); 
            }

            app.contact.contacts = {};
            app.contactPreloader = true; 
            let contact_per_page = this.$route.query.contact_per_page;  
            
            let current_page = (click) ? page : this.$route.query.contact_page ;
            if ( click ) {
                this.$router.push( { path: document.location.search, query: { contact_page: current_page, contact_per_page: contact_per_page } } );  
            }

            let allQuery = this.$route.query;

            var queryString = Object.keys(allQuery).map(key => key + '=' + allQuery[key]).join('&');
                queryString += '&contact_cat_id='+app.contact.contact_cat_id;
                queryString += '&type=1';
            axios.get('/api/v1/ct/contacts?'+ queryString)
                .then( resp => {
                    app.contactPreloader = false; 
                    app.contact.contacts = resp.data.contacts;   
                    app.contact.categories = resp.data.categories;   
                    if(app.contact.contacts.data.length == 0) {                                 
                        app.contactNoData = app.$store.state.noData;
                    } else {
                        app.contactNoData = '';
                    }
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                }); 
        },  
        contactSeleted( number, service ) {  
            document.getElementById('contactModal').classList.toggle('show');  
            this.due.number = service.number; 
            this.due.number_list = null; 
            this.due.name = number.name; 
            var result = service.provider_id;  
            if ( result ) {
               this.due.provider_id = result; 
               this.due.services = result.services; 
               this.due.service_id = service.service_id;  
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
                queryString += '&type=1';
            
            axios.get('/api/v1/mt/dues?'+ queryString)
                .then( resp => {  
                    app.preloader = false; 
                    app.dues = resp.data.dues; 
                    app.providers = resp.data.providers;

                    if(app.dues.data.length == 0) {                                 
                        app.noData = app.$store.state.noData;
                    } else {
                        app.noData = '';
                    }
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        }, 
        accountInfo( data ) { 
            let res = data.number.split("*");
            if ( data.provider_id.slug == 'palli-bidyut' && data.service_id.slug == 'postpaid' ) {
                return `Consumer Number: ${res[0]} Due Date: ${res[1]}`;
            } else if ( data.provider_id.slug == 'bpdb' && data.service_id.slug == 'prepaid' ) {
                return `Meter Number: ${res[0]} Contact Number: ${res[1]}`;
            } else if ( data.provider_id.slug == 'bpdb' && data.service_id.slug == 'postpaid' ) {
                return `Consumer Number: ${res[0]} Bill Id: ${res[1]}`;
            } else {
                return '';
            }
        },
        saveForm() { 
            document.getElementById('createModal').style.display = 'none';
            var app = this;
            var newPackage = app.due;
            
            axios.post('/api/v1/mt/dues', newPackage)
                .then( resp => {  
                    this.due = this.dueConst;
                    app.$store.commit('submitMsg', 'add');  
                    app.getLists(); 
                })
                .catch( resp => {  
                    app.$store.commit('errorMessages', resp); 
                });
        }, 
        createPaidForm(info) {  
            var due = info.amount - info.paid;
            this.paid = {  
                due_id: info.id, 
                due: due,   
                amount: '', 
                note: '', 
                type: 1, 
                date_time: '',
            };   
        },
        savePaidForm() { 
            document.getElementById('createPaidModal').classList.toggle('show');            
            axios.post('/api/v1/mt/paiddues', this.paid)
                .then( resp => {   
                    this.paid = {  
                        due_id: '', 
                        due: '',  
                        amount: '', 
                        note: '', 
                        type: 1, 
                        date_time: '', 
                    };
                    this.$store.commit('submitMsg', 'add');  
                    this.getLists(); 
                })
                .catch( resp => {  
                    this.$store.commit('errorMessages', resp); 
                }); 
        },  
        loadDueHistory(page = 1, click = false, key = null ) {
            document.getElementById('historyFilterMobile').classList.toggle('show');

            var app = this;  

            if ( key != null ) {
                app.due_selected_id = key; 
            }

            if ( !this.$route.query.history_per_page && !this.$route.query.history_page) {   
                this.$router.push( { path: document.location.search, query: { history_page: 1, history_per_page: 20 } } ); 
            }            
           
            app.due_histories = {};
            app.historyPreloader = true; 
            let history_per_page = this.$route.query.history_per_page;   
            
            let current_page = (click) ? page : this.$route.query.history_page ;
            if ( click ) {
                this.$router.push( { path: document.location.search, query: { history_page: current_page, history_per_page: history_per_page } } );  
            }

            let allQuery = this.$route.query;

            let data_search = this.history_filter; 

            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] !== '') {
                    if ( key == 'type' ) { 
                        query[key] = ( data_search[key] == 0 ) ? 0 : 1; 
                    } else {
                        /* This is added for if provider null than ['id'] cannot find*/
                        if ( key != 'provider_id' ) {
                            query[key] = data_search[key]; 
                        } else {
                            query[key] = query[key] = ( data_search[key] ) ? data_search[key]['id'] : ''; 
                        }
                    } 
                } else {
                    if ( this.$route.query[key] ) {
                        query[key] = '';
                    }
                } 
            }  

            var queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');
                queryString += '&due_id='+app.due_selected_id;
            
            axios.get('/api/v1/mt/paiddues?'+ queryString)
                .then( resp => {
                    app.historyPreloader = false; 
                    app.due_histories = resp.data.due_histories;  
                    if(app.due_histories.data.length == 0) {                                 
                        app.historyNoData = app.$store.state.noData;
                    } else {
                        app.historyNoData = '';
                    }
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                }); 
        }, 
        deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/mt/dues/' + id)
                    .then( resp => {
                        app.dues.data.splice(index, 1); 
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
                axios.delete('/api/v1/mt/dues/' + selectedItem)
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
                utility_due_list: 'Utility Due List', 
                due_amount: 'Due Amount',  
                bill_type: 'Bill Type',
                d_s: 'Delete Selected', 
                //account_info: 'একাউন্ট তথ্য', 
                account: 'Account',  
                paid: 'Paid',  
                due: 'Due',  
                paid_due: 'Paid/Due',  
                history: 'History', 
                //modal-content
                new_due_amount: 'New Due Amount', 
                paid_amount: 'Paid Amount', 
                due_note: 'Due Note', 
                note: 'Note',
                s_cat: 'Select Category',
                contact_list: 'Contact List', 
                con_name: 'Contact Name', 
                consumer_number: 'Consumer Number',
                new_paid_due: 'New Paid/Due',
                select_bill_type: 'Select Bill Type',

                choose_package: 'Choose Package',  
                //Package Filter Mobile
                history_filter: 'History Filter', 
                history: 'History', 
                operator_type: 'Operator Type',
                //search-content
                select_type: 'Select Type',
                to_take: 'To Take',
                to_give: 'To give',
                due_from: 'Due From', 
                due_to: 'Due To',   
                //hover text
                add_new_name: 'Add new name', 
                to_search_by_name: 'To search by name',
                contact_list: 'Contact List',
                remove_name: 'Remove name',
            },
            bn: { 
                utility_due_list: 'বাকি বিলের তালিকা',  
                due_amount: 'বাকি টাকার পরিমান',  
                bill_type: 'বিলের ধরন', 
                d_s: 'নির্বাচিত তথ্য মুছুন',
                //account_info: 'একাউন্ট তথ্য', 
                account: 'একাউন্ট',
                paid: 'পরিশোধ',    
                due: 'পাওনা',    
                paid_due: 'দেনা/পাওনা',    
                history: 'ইতিহাস',    
                //modal-content 
                new_due_amount: 'নতুন বাকির পরিমাণ', 
                paid_amount: 'পরিশোধিত টাকা', 
                due_note: 'বাকির কারন',
                note: 'নোট',
                s_cat: 'শ্রেনী নির্বাচন',
                contact_list: 'ফোনবুক তালিকা',
                con_name: 'ফোনবুক নাম',
                consumer_number: 'গ্রাহক নাম্বার',
                new_paid_due: 'নতুন বাকি পরিশোধ',
                select_bill_type: 'বিলের ধরন নির্বাচন', 
                choose_package: 'প্যাকেজ পছন্দ করুন',
                //Package Filter Mobile
                history_filter: 'ইতিহাস ফিল্টার',
                history: 'ইতিহাস',
                operator_type: 'অপারেটার ধরন',
                //search-content
                select_type: 'ধরন নির্বচন',
                to_take: 'নিতে', 
                to_give: 'দিতে', 
                due_from: 'বাকি কত হতে',
                due_to: 'বাকি কত পর্যন্ত',  
                //hover text
                add_new_name: 'নতুন নাম যোগ করুন', 
                to_search_by_name: 'নাম দিয়ে সন্ধান করতে', 
                contact_list: 'ফোনবুক তালিকা',
                remove_name: 'নাম সরান',
            },  
        },
        sharedMessages: commonMessages
    },
} //export default
</script>