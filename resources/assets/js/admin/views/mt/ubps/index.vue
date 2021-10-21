<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               {{ $t('ubp_bill_list') }}
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body"> 

            <!-- Modal Create-->
            <div class="modal fade" id="createModal">
                <div class="modal-dialog">
                    <div class="modal-content"> 
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">  

                                    <div class="mt-number-list">
                                        <div class="mt-numbers" v-for="(flex, key) in ubp.ubp"> 
                                            <div class="mt-title">
                                                {{ $t('no') }} {{ key+1 }}
                                            </div><!--  /.mt-title mb-3 -->

                                            <div class="mt-control"> 
                                                <template v-if="flex.extra_info">
                                                    <span :class="flex.add_name  ? 'btn bg-success btn-sm' : 'btn btn-info btn-sm'" @click="flex.add_name = !flex.add_name" :title="$t('add_new_name')"><i class="icon-address-book"></i></span>
                                                    <span :class="flex.add_new_schedule  ? 'btn bg-success btn-sm' : 'btn btn-info btn-sm'"  @click="flex.add_new_schedule = !flex.add_new_schedule" :title="$t('add_schedule')"><i class="icon-clock"></i></span>
                                                    <span :class="flex.add_new_due  ? 'btn bg-success btn-sm' : 'btn btn-info btn-sm'"  @click="flex.add_new_due = !flex.add_new_due" :title="$t('add_due')"><i class="icon-money"></i></span> 
                                                    <span v-can="'ubp_multi_recharge'" class="btn btn-primary btn-sm" @click="addFlexi(key)" :title="$t('add_new_ubp')"><i class="icon-plus"></i></span>
                                                    <span v-can="'ubp_multi_recharge'" class="btn btn-danger btn-sm" @click="removeFlexi(key)" :title="$t('remove_this_mr')"><i class="icon-minus"></i></span> 
                                                </template>  
                                                
                                                <span :class="flex.extra_info  ? 'btn bg-success btn-sm' : 'btn btn-info btn-sm'" @click="flex.extra_info = !flex.extra_info" :title="$t('extra_info')"><i class="icon-cogs"></i></span> 

                                                <span :title="$t('close')" class="btn btn-dark btn-sm" data-dismiss="modal" aria-label="Close"><i class="icon-cancel"></i></span> 

                                            </div><!--  /.mt-control mb-3 --> 

                                            <div class="form-row mt-4"> 

                                                <div class="col-md-12">  
                                                    <div class="input-group outline-group mobile-number"> 
                                                        <input :type="( flex.search_name ) ? 'text' : 'number'" autocomplete="off" placeholder=" " v-on:keyup="numberChange(key, flex.search_name)" class="form-control big-font outline" :id="'number'+key" v-model="flex.number" required>
                                                        <label :for="'number'+key">{{ ( flex.search_name ) ? $t('contact_name') : $t('contact_num') }} {{ ( flex.name ) ? `(${flex.name})` : '&nbsp;'}}</label>

                                                        <div class="input-group-append" v-if="flex.number">
                                                          <span @click="removeNumber(key)" class="input-group-text cursor-pointer"><i class="icon-cancel"></i></span> 
                                                        </div>
                                                        <div class="input-group-append" v-if="!flex.number">
                                                            <span @click="flex.search_name = !flex.search_name" class="input-group-text cursor-pointer font-weight-bold" :title="( flex.search_name ) ? $t('to_type_number') : $t('to_search_by_name')">{{ ( flex.search_name ) ? '0' : 'A' }}</span> 
                                                        </div>
                                                        <div class="input-group-append" v-if="!flex.number">
                                                            <span class="input-group-text cursor-pointer font-weight-bold" :title="$t('contact_list')" v-on:click.prevent="loadContact(null, null, key)" data-toggle="modal" data-target="#contactModal"><i class="icon-address-book"></i></span>  
                                                        </div>
                                                    </div> 
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3">
                                                    <ul v-if="flex.number_list" class="contact-suggestion">
                                                        <template v-for="number, index in flex.number_list">  
                                                        <li v-for="service in number.ubp_services" @click="selectedNumber(key, number, service)"> 
                        
                                                            {{ number.services[0].number }} {{ (number.name) ? '- '+number.name : ''}}

                                                            {{ (service.provider_id) ? '- '+service.provider_id.name : ''}} 
                                                            {{ '- '+service.number}} 
                                                        </li>
                                                        </template>
                                                    </ul> 
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3 outline-group" v-if="flex.add_name">
                                                    <input placeholder=" " type="text" class="form-control outline" id="name" v-model="flex.name">
                                                    <label for="name">{{ $t('name') }}</label>
                                                </div><!--  /.col-md-12 mb-3 -->  

                                                <div class="col-md-12 mb-3"> 
                                                    <label class="o-s-l">{{ $t('bill_type') }}</label> 
                                                    <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="flex.provider_id" :options="providers" :preserve-search="true" label="name" track-by="name" :placeholder="$t('s_b_t')" :preselect-first="false" @input="providerChanged(key)">
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
                                                    <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="flex.service_id" :options="flex.services" :placeholder="$t('s_s')" :preserve-search="true" label="name" track-by="name" :preselect-first="false">
                                                        <template slot="singleLabel" slot-scope="props">
                                                            <span class="option__title"> {{ props.option.name }}</span>
                                                        </template>
                                                        <template slot="option" slot-scope="props">
                                                            <span class="option__title"> {{ props.option.name }}</span>
                                                        </template>
                                                    </multiselect>   
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3 outline-group"> 
                                                    <input type="number" placeholder=" " class="form-control big-font outline" id="contact-number" v-model="flex.ac_number" required >
                                                    <label for="contact-number">{{ numberTitle(key) }}</label>
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-12 mb-3 outline-group" v-if="due_date_show(key)"> 
                                                    <input type="number" placeholder=" " class="form-control outline" id="due-date" v-model="flex.due_date" required >
                                                    <label for="due-date">Due Date</label>
                                                    <small>Format: MMYYYY</small>
                                                </div><!--  /.col-12 mb-3 --> 

                                                <div class="col-md-12 mb-3 outline-group" v-if="number_two_show(key)"> 
                                                    <input type="number" placeholder="Contact Number" class="form-control big-font outline" id="contact-number-two" v-model="flex.ac_number_two" required >
                                                    <label for="contact-number-two">{{ numberTwoTitle(key) }}</label>
                                                </div><!--  /.col-md-12 mb-3 --> 
                                                
                                                <div class="col-12 mb-2">
                                                    <div class="form-row">
                                                        <div class="col-7 outline-group"> 
                                                            <input type="number" placeholder=" " class="form-control big-font outline" :id="'amount'+key" v-model="flex.amount" required >
                                                            <label :for="'amount'+key">{{ $t('tk') }}</label>
                                                        </div><!--  /.col-7 mb-3 --> 

                                                        <div class="col-5"> 
                                                            <p class="mt-1">{{ $t('fee') }} :<span v-if="flex.service_id" class="text-info">{{ serviceFee(key) }}</span></p>
                                                        </div><!--  /.col-5 mb-3 --> 
                                                    </div><!-- /.form-row -->
                                                    <span class="text-danger" v-if="flex.warning_msg">{{flex.warning_msg}}</span>
                                                </div><!-- /.col-12 -->
 

                                                <div class="col-md-12 mb-3" v-if="flex.add_new_schedule"> 
                                                    <date-time-picker v-model="flex.schedule_time" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('schedule_time') }}</template></date-time-picker>
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3 outline-group" v-if="flex.add_new_due">
                                                    <input type="number" placeholder="Paid Amount" class="form-control outline" id="paid" v-model="flex.paid" required >
                                                    <label for="paid">{{ $t('paid_amount') }}</label>
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3 outline-group" v-if="flex.add_new_due">
                                                    <input type="text" placeholder="Due Note" class="form-control outline" id="due_note" v-model="flex.due_note" >
                                                    <label for="due_note">{{ $t('due_note') }}</label>
                                                </div><!--  /.col-md-12 mb-3 --> 
                                            </div><!--  /.form-row --> 
                                        </div><!--  /.mt-numbers -->
                                    </div> <!-- /.mt-number-list -->  

                                    <div class="col-md-12 mb-3">                                        
                                        <div class="form-row">
                                            <div class="col-7" v-can="'ubp_pin_status'">  
                                                <!-- fake fields are a workaround for chrome autofill getting the wrong fields -->
                                                <input style="display:none" type="text" name="fakeusernameremembered"/>
                                                <input style="display:none" type="password" name="fakepasswordremembered"/>
                                                
                                                <div class="input-group outline-group mobile-number">
                                                    <input :type="(showPass) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="pin" v-model="ubp.pin" required>
                                                    <label for="pin">{{ $t('pin') }}</label> 

                                                    <div class="input-group-append">
                                                        <span class="input-group-text cursor-pointer" @click="showPass = !showPass" :title="( showPass ) ? $t('hide_pin') : $t('show_pin')">
                                                            <i :class="showPass ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                        </span>
                                                    </div>
                                                </div><!-- /.input-group outline-group mobile-number -->
                                                
                                            </div><!--  /.col-7 --> 

                                            <div :class=" ( $root.can('ubp_pin_status') ) ? 'col-5' : 'col-12'">
                                                <button class="btn btn-primary d-block w-100" type="submit">{{ $t('pay_bill') }}</button> 
                                            </div><!--  /.col-5 -->
                                        </div><!--  /.form-row --> 
                                    </div><!--  /.col-md-12 mb-3 --> 
     
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body --> 
                        </form>
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal -->

            <!-- Modal Contact -->
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
                            <div class="form-row">    
                                <div class="col-md-12" v-if="contactPreloader"> 
                                    <preloader></preloader>
                                </div><!--  /.col-md-12 --> 

                                <div class="col-12 mb-3 mt-3" v-if="!contactPreloader">  
                                    <label class="o-s-l">{{ $t('s_cat') }}</label>
                                    <multiselect v-model="contact.contact_cat_id" :options="contact.categories" :close-on-select="false" :preserve-search="true" label="name" track-by="name" >
                                        <template slot="tag" slot-scope="props">
                                            <span class="custom__tag">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </span>
                                        </template>
                                    </multiselect>
                                </div><!--  /.col-12 mb-3 -->

                                <div class="col-md-12 mb-3">  
                                    <ul v-if="contact.contacts.data" class="list-group">
                                        <template v-for="number, index in contact.contacts.data">  
                                        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="service in number.ubp_services"> 

                                            {{ number.services[0].number }} {{ (number.name) ? '- '+number.name : ''}}

                                            {{ (service.provider_id) ? '- '+service.provider_id.name : ''}} 
                                            {{ '- '+service.number}} 
                                            <span class="badge badge-dark p-2 cursor-pointer" @click="contactSeleted(number, service)"><i class="icon-ok"></i></span>
                                        </li>
                                        </template>
                                    </ul> 
                                    <template v-if="contactNoData && !contactPreloader">There is no contacts</template>
                                </div><!--  /.col-md-12 -->

                                <div class="col-md-12 mb-3"> 
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

            <!-- Modal Edit -->
            <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="">{{ $t('edit_schedule') }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="updateForm()">
                            <div class="modal-body">  
                                <div class="form-row"> 
                                    <div class="col-md-12 mb-3">
                                        <label>{{ $t('schedule_time') }}</label> 
                                        <date-time-picker placeholder=" " v-model="ubpUpdate.schedule_time" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"></date-time-picker>
                                    </div><!--  /.col-md-12 mb-3 -->  
                                </div><!--  /.form-row -->
                            </div><!--  /.modal-body -->

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('close') }}</button>
                                <button class="btn btn-primary" type="submit">
                                {{ $t('update') }}
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
                                        <label class="o-s-l">{{ $t('show') }}</label>
                                        <select class="form-control" v-model="perPage">
                                            <option v-for="option in perPageOptions" v-bind:value="option.value">
                                                {{ option.text }}
                                            </option>
                                        </select>  
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3" v-if="ubp_super_role">
                                        <multiselect v-model="ubpSearch.user_id" :options="accounts" :custom-label="customLabel" :preserve-search="true" :placeholder="$t('search_user')" selectLabel="" :loading="isLoading" deselectLabel="" :internal-search="false" :searchable="true" label="name" track-by="name" @search-change="asyncFind" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect> 
                                        <small>{{ $t('s_u_h') }}</small>
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t('operator') }}</label>
                                        <multiselect deselect-label="" select-label="" v-model="ubpSearch.provider_id" :options="providers" :preserve-search="true" label="name" :placeholder="$t('s_o')" track-by="name" :preselect-first="false">
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

                                    <div class="col-12 mb-3" v-if="ubpSearch.provider_id"> 
                                        <label for="search-service_id" class="o-s-l">{{ $t('type') }}</label>
                                        <select class="form-control" id="search-service_id" v-model="ubpSearch.service_id">  
                                            <option value="">{{ $t('all') }}</option>
                                            <option v-for="service in ubpSearch.services" :value="service.id">{{service.name}}</option>
                                        </select>                                                   
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t('select_status') }}</label>
                                        <select id="search-status" class="form-control" v-model="ubpSearch.status" >
                                            <option value="">{{ $t('select_status') }}</option>
                                            <option value="0">{{ $t('pending') }}</option>
                                            <option value="1">{{ $t('success') }}</option>
                                            <option value="2">{{ $t('cancel') }}</option>
                                            <option value="4">{{ $t('failed') }}</option>
                                            <option value="5">{{ $t('schedule') }}</option>
                                        </select> 
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-number" v-model="ubpSearch.number">
                                        <label for="search-number">{{ $t('account_info') }}</label>
                                    </div><!--  /.col-12 mb-3 -->    

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-amount-from" v-model="ubpSearch.amount_from">
                                        <label for="search-amount-from">{{ $t('account_form') }}</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-amount-to" v-model="ubpSearch.amount_to">
                                        <label for="search-amount-to">{{ $t('account_to') }}</label>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="ubpSearch.date_from" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_from') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="ubpSearch.date_to" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t('order_by') }}</label>
                                        <select id="search-order-by" class="form-control" v-model="ubpSearch.order_by" >
                                            <option value="">{{ $t('newer_first') }}</option>
                                            <option value="1">{{ $t('newer_last') }}</option> 
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

            <!-- Modal msgDetails -->
            <div v-if="ubp_super_role" class="modal fade" id="msgDetails" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="">{{ $t('message') }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <div class="modal-body"> 
                                    
                            <div class="form-row"> 
                                <div class="col-md-12 mb-3">
                                    {{msg_details}}
                                </div><!--  /.col-md-12 mb-3 -->  
                            </div><!--  /.form-row -->
                        </div><!--  /.modal-body -->

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('close') }}</button> 
                        </div><!--  /.modal-footer -->
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal --> 

            <div class="table-actions"> 
                <button type="button" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i>{{ $t('pay_bill') }}
                </button>   

                <template v-if="selected.length && ubp_super_role">
                  <button class="btn btn-info btn-sm dropdown-toggle" type="button" id="ubpsModify" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="cursor-pointer">{{ $t('m_s') }}</span>
                  </button>
                  <div class="dropdown-menu margin-left" aria-labelledby="ubpsModify">
                    <a href="#" class="dropdown-item" v-on:click.prevent="ubpsModify(1)">
                       {{ $t('success') }}
                    </a>
                    <a href="#" class="dropdown-item" v-on:click.prevent="ubpsModify(0)">
                        {{ $t('failed') }}
                    </a>
                    <a href="#" class="dropdown-item" v-on:click.prevent="ubpsModify(2)">
                        {{ $t('cancelled') }}
                    </a>
                  </div>
                </template>

                <button type="button" class="btn btn-sm btn-info float-right btn-search" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">{{ $t('search') }}</span>
                </button> 

                <button type="button" class="btn btn-sm btn-info float-right mr-2" :title="$t('refresh_list')" v-on:click="getLists()">
                    <i class="icon-arrows-cw"></i>
                </button>

            </div><!--  /.table-actions -->

            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr> 
                            <th v-if="ubp_super_role" style="width: 20px;"><input type="checkbox" id="check-all" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all">{{ $t('status') }}</label></th>  
                            <th v-if="ubp_super_role">{{ $t('user_id') }}</th>
                            <th v-if="ubp_super_role">{{ $t('u_n') }}</th> 
                            <th>{{ $t('bill_type') }}</th>
                            <th>{{ $t('service') }}</th> 
                            <th>{{ $t('account_info') }}</th> 
                            <th>{{ $t('amount') }}</th>
                            <th>{{ $t('fee') }}</th> 
                            <th title="Commission" v-if="mt_agent_mer_role">{{ $t('com') }}</th> 
                            <th>{{ $t('trx_id') }}</th>
                            <th v-if="ubp_super_role">{{ $t('modemId') }}</th>
                            <th v-if="ubp_super_role">{{ $t('message') }}</th> 
                            <th>{{ $t('date') }}</th>    
                        </tr>
                    </thead>
                    <tbody>  
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="ubp, index in ubps.data">  
                            <td v-if="ubp_super_role"><input type="checkbox" v-bind:id="'checkbox-id-'+ubp.id" :value="ubp.id" v-model="selected"/></td>
                            <td>
                                <template v-if="ubp.status == 5">
                                    <div class="dropdown action-items">
                                      <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="cursor-pointer" :title="ubp.schedule_time | moment('DD-MM-YYYY hh:mm a')">Schedule</span>
                                      </button>
                                      <div class="dropdown-menu" aria-labelledby="actionItemButtons">
                                        <a href="#" class="dropdown-item" v-on:click.prevent="editForm(ubp)" data-toggle="modal" data-target="#editModal">
                                           {{ $t('edit_schedule') }}
                                        </a>
                                        <a href="#" class="dropdown-item" v-on:click.prevent="cancelEntry(ubp.id, index)">
                                            {{ $t('cancel') }}
                                        </a>
                                      </div>
                                    </div>
                                </template>
                                <template v-else-if="ubp.status == 4 || ubp.status == 1">
                                    <div class="dropdown action-items">
                                      <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="cursor-pointer"> {{ ( ubp.status == 4) ? 'Failed' : 'Success' }}</span>
                                      </button>
                                      <div class="dropdown-menu ml-63" aria-labelledby="actionItemButtons">
                                        <a href="#" class="dropdown-item" v-on:click.prevent="tryAgain(ubp)" data-toggle="modal" data-target="#createModal">
                                           {{ $t('try_again') }}
                                        </a> 
                                      </div>
                                    </div>
                                </template>
                                <template v-else> 
                                    <label v-bind:for="'checkbox-id-'+ubp.id">{{ status(ubp) }}</label>
                                </template>
                            </td>

                            <td v-if="ubp_super_role">{{ user( ubp.user ) }}</td> 
                            <td v-if="ubp_super_role">{{ ubp.user.name }}</td>                             
                            <td>{{ ubp.provider_id.name }}</td>
                            <td>{{ ubp.service_id.name }}</td> 
                            <td><label v-bind:for="'checkbox-id-'+ubp.id">{{ accountInfo( ubp ) }}</label></td>  
                            <td>{{ ubp.amount }}</td>  
                            <td>{{ ( ubp.status != 4 ) ? ubp.user_fee : '' }}</td>   
                            <td v-if="mt_agent_mer_role">{{ ( ubp.status != 4 ) ? ubp.user_com : '' }}</td>   
                            <td>{{ ubp.id }}</td>   
                            <td v-if="ubp_super_role">{{ ubp.trxid }}</td>   
                            <td v-if="ubp_super_role">{{ ( ubp.msg ) ? ubp.msg.substr(0, 40) : null }}
                                <template v-if="ubp.msg">
                                    <span v-on:click="msgDetails(ubp.msg)" class="cursor-pointer" data-toggle="modal" data-target="#msgDetails">(More)</span>
                                </template>
                            </td>   
                            <td>{{ ubp.updated_at | moment("YYYY-MM-DD hh:mm a") }}</td>    
                        </tr> 

                        <template v-if="noData"><tr class="bg-white" v-html="noData"></tr></template>
                       
                    </tbody>
                    <tfoot>
                        <tr>  
                            <th v-if="ubp_super_role"><input type="checkbox" id="check-all-bottom" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all-bottom">{{ $t('status') }}</label></th> 
                            <th v-if="ubp_super_role">{{ $t('user_id') }}</th>
                            <th v-if="ubp_super_role">{{ $t('u_n') }}</th>
                            <th>{{ $t('bill_type') }}</th> 
                            <th>{{ $t('service') }}</th>
                            <th>{{ $t('account_info') }}</th> 
                            <th>{{ $t('amount') }}</th>
                            <th>{{ $t('fee') }}</th> 
                            <th title="Commission" v-if="mt_agent_mer_role">{{ $t('com') }}</th>
                            <th>{{ $t('trx_id') }}</th>
                            <th v-if="ubp_super_role">{{ $t('modemId') }}</th>
                            <th v-if="ubp_super_role">{{ $t('message') }}</th> 
                            <th>{{ $t('date') }}</th>    
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">    
                <pagination-simple :data="ubps" @pagination-change-page="getLists"></pagination-simple>
                <div class="float-right amount-summery" v-if="!noData">
                    <span class="total-amount">{{ $t('t_a') }}: <b>{{t_a}}</b></span> 
                    <span class="total-commision d-inline-block" v-if="mt_agent_mer_role">{{ $t('t_com') }}: <b>{{total_user_com}}</b></span>
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
            ubp_super_role: false,
            mt_agent_mer_role: false,
            dateOptions: this.$store.state.dateOptions,  
            ubp: {  
                ubp: [ 
                    { provider_id: '', warning_msg: '', services: [], service_id: '', number: '', ac_number: '', ac_number_two: '', due_date: null, name: null, search_name: false, add_name: false, add_new_due: false, add_new_schedule: false, extra_info: false, name: null, number_list: null, amount: '',  suggestions: null, paid: null, due_note: '', schedule_time: null, }, 
                ],
                pin: '',
            }, 
            showPass: false,
            ubpConst: {  
                ubp: [ 
                    { provider_id: '', warning_msg: '', services: [], service_id: '', number: '', ac_number: '', ac_number_two: '', due_date: null, name: null, search_name: false, add_name: false, add_new_due: false, add_new_schedule: false, extra_info: false, name: null, number_list: null, amount: '',  suggestions: null, paid: null, due_note: '', schedule_time: null, }, 
                ],
                pin: '',
            }, 
            ubpUpdate: {  
                schedule_time: null,  
            }, 
            contact: {
                ubp_key: '',
                contact_cat_id: '',
                contacts: {}, 
                categories: [],  
            }, 
            ubpSearch: {
                status: '',
                number: '',
                user_id: '',
                provider_id: '',
                services: [],
                service_id: '',
                amount_from: '',
                amount_to: '',
                date_from: '',  
                date_to: '',     
                order_by: '',  
            }, 
            ubps: {}, 
            accounts: [],
            isLoading: false, 
            t_a: 0, 
            total_user_com: 0,    
            msg_details: '',
            providers: [],  
            sim_packs: [],
            perPage: this.$route.query.per_page, 
            perPageOptions: this.$store.state.perPageOptions,   
            noData: '',
            contactNoData: '', 
            preloader: true,
            contactPreloader: true, 
            selected: [],
            selectAll: false,
            pending_waiting_no: '',
            pending_waiting_count: 0, 
        }
    },
    watch: {
        perPage: function (val) {
            let page = this.$route.query.page;  
            this.$router.push( { path: document.location.search, query: { page: page, per_page: val } } ); 
            this.getLists(); 
        },  
        'contact.contact_cat_id': function (val) {   
            this.$router.push( { path: document.location.search, query: { contact_cat_id: ( val ) ? val.id : '' } } ); 
            this.loadContact();  
        },
        'ubpSearch.provider_id': function (val) {  
            this.ubpSearch.services = ( this.ubpSearch.provider_id ) ? this.ubpSearch.provider_id.services : []; 
            this.ubpSearch.service_id = '';   
        }, 
    },
    created() {

        /* Money Transfer Super */
        this.ubp_super_role = this.$root.can('utility-bill-super');
        this.mt_agent_mer_role = this.$root.can(['agent', 'merchant']);

        this.getLists();    

        let per_page = this.$route.query.per_page;  

        var perPageOptions =  this.perPageOptions.find( function( ele ) { 
            return ele.value == per_page;
        } );

        if( !perPageOptions ) {
            this.perPageOptions.splice(0, 0, { text: per_page, value: per_page } ); 
        } 

        /* Mts Real time Update */
        Echo.private(`mts-updated.${this.$store.state.auth_id}`)
            .listen('MtsUpdated', (e) => { 
                //console.log(e.data) fired two times same event 
                var items = this.ubps.data;
                var foundIndex = items.findIndex(x => x.id == e.data.id);
                this.ubps.data[foundIndex].status = e.data.status;

                if ( e.data.status == 4 ) { // failed status
                    this.$root.acBalance();  
                }
            }); 

        // if socket faild to showing waitng and success
        this.pending_waiting();
        this.pending_waiting_no = setInterval(this.pending_waiting, 2000) // check every 2 seconds 
 
    }, 
    mounted() {   
        this.$root.popupModal(); 
    },
    updated() {   
        this.$root.dropdownModal(); 
    },
    methods: {  
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
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let key in this.ubps.data) {
                    this.selected.push(this.ubps.data[key].id);
                }
            }
        },
        dataSearch() { 
            var data_search = this.ubpSearch;   
            var query = {};  
            data_search.date_from = ( data_search.date_from ) ? data_search.date_from.toString() : ''; 
            data_search.date_to = ( data_search.date_to ) ? data_search.date_to.toString() : '';  

            for (let key in data_search ) {  
                if ( data_search[key] ) {
                    if ( key != 'services' ) {
                        query[key] = ( key != 'user_id' && key != 'provider_id' ) ? data_search[key] : data_search[key]['id'];  
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
        addFlexi(index) {
            try {
                this.ubp.ubp.splice(index + 1, 0, { provider_id: '', warning_msg: '', services: [], service_id: '', number: '', ac_number: '', ac_number_two: '', due_date: null, name: null, search_name: false, add_name: false, add_new_due: false, add_new_schedule: false, extra_info: true, name: null, number_list: null, amount: '',  suggestions: null, paid: null, due_note: '', schedule_time: null, } );
            } catch(e) {
                console.log(e);
            }
        },
        removeFlexi(index) {
            if (this.ubp.ubp.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.ubp.ubp.splice(index, 1); 
            }
        },
        numberTitle(key) {
            if ( this.ubp.ubp[key].provider_id.slug == 'palli-bidyut' ) {
                return 'Consumer Number';
            } else if ( this.ubp.ubp[key].provider_id.slug == 'bpdb'  && this.ubp.ubp[key].service_id.slug == 'prepaid' ) {
                return 'Meter No';
            } else {
                return this.$t('consumer_number');
            } 
        },
        due_date_show(key) {
            if ( this.ubp.ubp[key].provider_id.slug == 'palli-bidyut' && this.ubp.ubp[key].service_id.slug == 'postpaid' ) {
                return true;
            } else {
                return false;
            }
        },
        number_two_show(key) {
            if ( this.ubp.ubp[key].provider_id.slug == 'palli-bidyut' && this.ubp.ubp[key].service_id.slug == 'postpaid' ) {
                return false;
            } else {
                return true;
            }
        },
        numberTwoTitle(key) {
            if ( this.ubp.ubp[key].provider_id.slug == 'bpdb' && this.ubp.ubp[key].service_id.slug == 'postpaid' ) {
                return 'Bill Id';
            } else if ( this.ubp.ubp[key].provider_id.slug == 'bpdb' && this.ubp.ubp[key].service_id.slug == 'prepaid' ) {
                return 'Contact Mobile No';
            } else {
                return this.$t('bill_id');
            }
        },
        serviceFee(key) {
            //return null; // for test

            if ( this.ubp.ubp[key].service_id.service_fees.length && this.ubp.ubp[key].amount ) {
                var ranges = this.ubp.ubp[key].service_id.service_fees;    

                function isInRange(range, amount) {
                    return range.from <= amount && (range.to === '*' || range.to >= amount)
                }

                var amount = this.ubp.ubp[key].amount;
                var priceFound = false;
                for (var i = 0; i < ranges.length && !priceFound; i++) {
                    var range = ranges[i];
                    if (isInRange(range, amount)) {
                        if ( range.percent ) {
                            let co_fee = amount * parseFloat( range.co_fee ) / 100;
                            let user_fee = amount * parseFloat( range.user_fee ) / 100;
                            return co_fee + user_fee;
                        } else {
                            return parseInt( range.co_fee ) + parseInt( range.user_fee );
                        }
                        
                        priceFound = true;
                    }
                } 
            } else {
                return null;
            }
        },
        numberChange(key, searchName = false ) { 
            var query = this.ubp.ubp[key].number;  

            /* Suggest contact number */
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }

            this.timer = setTimeout(() => { 
                if ( query.length <= 5 ) {
                    this.ubp.ubp[key].name = ''; 
                    this.ubp.ubp[key].number_list = ''; 
                    return;
                }
                let search_key = (searchName) ? 'name' : 'number';
                axios.get('/api/v1/ct/contacts?'+ search_key +'=' + query + '&type=2')
                    .then( resp => {  
                        this.ubp.ubp[key].number_list = resp.data.contacts.data;  
                    })
                    .catch( resp => {
                        this.$store.commit('errorMessages', resp); 
                    }); 
            }, 600);            
        },
        providerChanged( key ) {  
            if ( this.ubp.ubp[key].provider_id.services ) {
                this.ubp.ubp[key].service_id = this.ubp.ubp[key].provider_id.services[0];  
                this.ubp.ubp[key].services = this.ubp.ubp[key].provider_id.services; 
            }
        },  
        selectedNumber(key, number, service) {
            this.ubp.ubp[key].number = number.services[0].number; 
            this.ubp.ubp[key].number_list = null; 
            this.ubp.ubp[key].name = number.name; 
            this.ubp.ubp[key].ac_number = service.number; 
            var result = service.provider_id;  
            if ( result ) {
                this.ubp.ubp[key].provider_id = result; 
                this.ubp.ubp[key].services = result.services; 
                let item = result.services.find(item => item.id === service.service_id);  
                this.ubp.ubp[key].service_id = item; 

                if ( this.ubp.ubp[key].provider_id.slug == 'bpdb' && this.ubp.ubp[key].service_id.slug == 'prepaid' ) {
                    this.ubp.ubp[key].ac_number_two = number.services[0].number; 
                }
            } 
        },
        removeNumber(key) { 
            this.ubp.ubp[key].name = null; 
            this.ubp.ubp[key].number = null;  
            this.ubp.ubp[key].number_list = null;  
            this.ubp.ubp[key].provider_id = ''; 
            this.ubp.ubp[key].service_id = ''; 
            this.ubp.ubp[key].ac_number = ''; 
            this.ubp.ubp[key].due_date = ''; 
            this.ubp.ubp[key].ac_number_two = ''; 
            this.ubp.ubp[key].amount = ''; 
            this.ubp.ubp[key].suggestions = '';  
        },   
        loadContact(page = 1, click = false, key = null) {
            var app = this; 
            app.contact.ubp_key = key;

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
                if ( app.contact.contact_cat_id ) {
                    queryString += '&contact_cat_id='+app.contact.contact_cat_id.id;                    
                }
                queryString += '&type=2';
            
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
            let key = this.contact.ubp_key;
            
            this.ubp.ubp[key].number = number.services[0].number; 
            this.ubp.ubp[key].number_list = null; 
            this.ubp.ubp[key].name = number.name; 
            this.ubp.ubp[key].ac_number = service.number; 
            var result = service.provider_id;  
            if ( result ) {
                this.ubp.ubp[key].provider_id = result; 
                this.ubp.ubp[key].services = result.services; 
                let item = result.services.find(item => item.id === service.service_id);  
                this.ubp.ubp[key].service_id = item; 

                if ( this.ubp.ubp[key].provider_id.slug == 'bpdb' && this.ubp.ubp[key].service_id.slug == 'prepaid' ) {
                    this.ubp.ubp[key].ac_number_two = number.services[0].number; 
                }
            } 
        },
        user( user ) {  
            if ( user.mobile ) {
                return user.mobile;
            } else if ( user.email ) {
                return user.email;
            } else {
                return user.username;
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
            
            //app.preloader = true; 
            this.$Progress.start();

            axios.get('/api/v1/mt/ubps?'+ queryString)
                .then( resp => {  
                    app.preloader = false; 
                    app.$Progress.finish();
                    
                    app.ubps = resp.data.ubps;    
                    app.providers = resp.data.providers;

                    var t_a = 0;
                    var total_user_com = 0;
                    resp.data.ubps.data.forEach(function(item) {
                        if ( item.status != 2 || item.status != 4 ) {
                            t_a += item.amount; 
                            if ( item.user_com != null ) {
                                total_user_com += parseFloat(item.user_com); // user_com field is user commision, co_com and user_com is fee in utitlity
                            }                                
                        }
                    }); 
                    app.t_a = t_a;
                    app.total_user_com = total_user_com.toFixed(2);

                    if ( app.ubps.data.length == 0 ) {                                 
                        app.noData = app.$store.state.noData;
                    } else {
                        app.noData = '';
                    } 

                    // reset counting
                    app.pending_waiting_count = 0;
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
        msgDetails( msg ) {
            this.msg_details = msg;
        },
        status(val) { 
            switch(val.status) {
                case 0:
                    return this.$t('pending');
                    break;
                case 1:
                    return this.$t('success');
                    break;
                case 2:
                    return this.$t('cancelled');
                    break;
                case 3:
                    return this.$t('waiting');
                    break;
                case 4:
                    return this.$t('failed');
                    break; 
                default: 
            }   
        },  
        saveForm() { 
            var app = this;
            
            for( let key in app.ubp.ubp) {
                if ( !app.ubp.ubp[key].provider_id ) {
                    app.ubp.ubp[key].warning_msg = 'Please Select Utility Type';
                    return;
                } else {
                    /* Check min and max number */
                    let numberRange = app.ubp.ubp[key].provider_id;
                    if ( ( numberRange.min_number == numberRange.max_number ) && app.ubp.ubp[key].ac_number.toString().length != numberRange.min_number ) {
                        app.ubp.ubp[key].warning_msg = `${app.numberTitle(key)} must ${numberRange.min_number} digit`; 
                        return;
                    } else if ( ( numberRange.min_number != numberRange.max_number ) && app.ubp.ubp[key].ac_number.toString().length < numberRange.min_number || app.ubp.ubp[key].ac_number.toString().length > numberRange.max_number ) {
                        app.ubp.ubp[key].warning_msg = `${app.numberTitle(key)} must between ${numberRange.min_number} to ${numberRange.max_number} digit`; 
                        return;
                    }

                    /* Check min and max amount */
                    let amountRange = app.ubp.ubp[key].service_id;
                    if ( app.ubp.ubp[key].amount < amountRange.min_amount || app.ubp.ubp[key].amount > amountRange.max_amount ) {
                        app.ubp.ubp[key].warning_msg = `Amount must between ${amountRange.min_amount} to ${amountRange.max_amount} TK`; 
                        return;
                    }  
                }
            } 

            document.getElementById('createModal').style.display = 'none'; 

            var ubp = app.ubp;   
             
            const newubp = JSON.parse(JSON.stringify(ubp));
            const delLists = [
                'search_name', 
                'suggestions', 
                //'sender_nuubper_list',
                'extra_info',
            ];
            for ( let key in newubp.ubp ) {
                delLists.forEach(e => delete newubp.ubp[key][e]);
                newubp.ubp[key].service_id = newubp.ubp[key].service_id.id;
                if ( newubp.ubp[key].schedule_time ) {
                    newubp.ubp[key].schedule_time = this.$moment(newubp.ubp[key].schedule_time).format('YYYY-MM-DD HH:mm:ss');
                }
            }

            axios.post('/api/v1/mt/ubps', newubp)
                .then( resp => {   
                    this.ubp = this.ubpConst; 
                    app.$store.commit('submitMsg', 'add');
                    this.$root.acBalance();  
                    app.getLists(); 

                    // reset counting
                    app.pending_waiting_count = 0;
                })
                .catch( resp => {  
                    app.$store.commit('errorMessages', resp); 
                }); 
        },
        editForm(ubps) { 
            this.ubpUpdate.id = ubps.id;
            this.ubpUpdate.schedule_time = ubps.schedule_time;
        }, 
        tryAgain(ubps) { // if failed than try again   
            let num_account = ubps.number.split('*');

            this.ubp.ubp[0].provider_id = ubps.provider_id;
            this.ubp.ubp[0].services = [ubps.service_id];
            this.ubp.ubp[0].service_id = ubps.service_id; 
            this.ubp.ubp[0].ac_number = num_account[0];

            if ( ubps.provider_id.slug == 'palli-bidyut' && ubps.service_id.slug == 'postpaid' ) {
                this.ubp.ubp[0].due_date = num_account[1]; 
            } else {
                this.ubp.ubp[0].ac_number_two = num_account[1]; 
            } 

            this.ubp.ubp[0].amount = ubps.amount;
            
        }, 
        updateForm() { 
            document.getElementById('editModal').classList.toggle('show');
            var app = this;
            var newubp = app.ubpUpdate; 
             
            axios.patch('/api/v1/mt/ubps/' + newubp.id, newubp)
                .then( resp => { 
                    app.$store.commit('submitMsg', 'update');  
                    this.$root.acBalance(); 
                    app.getLists(); 
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                }); 
        }, 
        cancelEntry(id, index) {
            var app = this;
            if ( confirm('Do you really want to cancel it?') ) {
                axios.delete('/api/v1/mt/ubps/' + id)
                    .then( resp => {
                        app.getLists();
                        app.$root.acBalance(); 
                        app.$store.commit('submitMsg', 'You have successfully canceled.');  
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp);
                    });
            }
        }, 
        ubpsModify( status ) { 
            var app = this;
            if (confirm('Are you sure to modify?')) {         
                var data = { 
                    status: status, 
                    ids: this.selected 
                };    
                axios.post('/api/v1/mt/ubp-modifystatus', data)
                    .then( resp => { 
                        app.$store.commit('submitMsg', 'update');  
                        this.$root.acBalance(); 
                        app.selectAll = false;
                        app.selected = [];
                        app.getLists(); 
                    })
                    .catch( resp => {
                        app.$store.commit('errorMessages', resp); 
                    }); 
            }
        }, 
        pending_waiting() {
            var app = this; 
            if ( app.pending_waiting_count < 30 ) {
                
                if ( app.ubps.data != 'undefined' && app.ubps.data) {
                    var pending_item = []; 
                    app.ubps.data.forEach(function(item) {
                        if ( item.status == 0 || item.status == 3 ) {
                            pending_item.push(item.id);                  
                        }
                    });  
                     
                    if ( pending_item.length ) {
                        var data = {  
                            ids: pending_item 
                        };    
                        axios.post('/api/v1/mt/mt-checkstatus', data)
                            .then( resp => { 
                                if ( resp.data.length ) {
                                    resp.data.forEach(function(item) { 
                                        var foundIndex = app.ubps.data.findIndex(x => x.id == item.id);
                                        app.ubps.data[foundIndex].status = item.status;
                                    });
                                } 
                            })
                            .catch( resp => {
                                app.$store.commit('errorMessages', resp); 
                            });
                    }
                }

                app.pending_waiting_count++;
            }
        }, 
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: { 
                ubp_bill_list: 'Utility Bill Lists', 
                pay_bill: 'Pay Bill',  
                bill_type: 'Bill Type', 
                account_info: 'Account Info',  
                modemId: 'ModemId',  
                try_again: 'Try Again',  
                //modal-content
                paid_amount: 'Paid Amount', 
                due_note: 'Due Note', 
                contact_num: 'Contact number', 
                contact_name: 'Contact Nane', 
                contact_list: 'Contact List', 
                consumer_number: 'Consumer Number', 
                bill_id: 'Bill Id', 
                s_b_t: 'Select Bill Type',
                //search-content
                account_form: 'Account Form',  
                account_to: 'Account To',  
                //hover text
                add_new_name: 'Add new name', 
                add_schedule: 'Add Schedule', 
                add_due: 'Add due', 
                extra_info: 'Extra Info', 
                to_search_by_name: 'To search by name',
                add_new_ubp: 'Add new ubp',
                remove_this_mr: 'Remove this mobile recharge', 
            },
            bn: { 
                ubp_bill_list: 'প্রয়োজনীয় বিল তালিকা',  
                pay_bill: 'বিল প্রদান',  
                bill_type: 'বিলের ধরন', 
                account_info: 'একাউন্ট তথ্য', 
                modemId: 'মডেম আইডি', 
                try_again: 'আবার চেষ্টা করুন',  
                //modal-content 
                paid_amount: 'পরিশোধিত টাকা', 
                due_note: 'বাকির কারন', 
                contact_num: 'ফোনবুক নাম্বার',  
                contact_name: 'ফোনবুক নাম',  
                contact_list: 'ফোনবুক তালিকা',  
                consumer_number: 'গ্রাহক মোবাইল নাম্বার', 
                bill_id: 'বিল নং', 
                s_b_t: 'বিলের ধরন নির্বাচন', 
                //search-content
                account_form: 'কত টাকা হতে', 
                account_to: 'কত টাকা পর্যন্ত', 
                //hover text
                add_new_name: 'নতুন নাম যোগ করুন', 
                add_schedule: 'সময় যোগ করুন',
                add_due: 'বাকি যোগ করুন', 
                extra_info: 'আরও তথ্য', 
                to_search_by_name: 'নাম দিয়ে সন্ধান করতে', 
                add_new_ubp: 'নতুন বিল যোগ করুন',
                remove_this_mr: 'বাদ দিন', 
            },  
        },
        sharedMessages: commonMessages
    },
} //export default
</script>

<style lang="scss" scoped>
 
</style>