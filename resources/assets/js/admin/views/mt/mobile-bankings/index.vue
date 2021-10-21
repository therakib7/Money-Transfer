<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               {{ $t('mb_list') }}
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
                                        <div class="mt-numbers" v-for="(flex, key) in mb.mb"> 
                                            <div class="mt-title">
                                                {{ $t('no') }} {{ key+1 }}
                                            </div><!--  /.mt-title mb-3 -->

                                            <div class="mt-control"> 
                                                <template v-if="flex.extra_info">
                                                    <span :class="flex.add_name ? 'btn bg-success btn-sm' : 'btn btn-info btn-sm'" @click="flex.add_name = !flex.add_name" :title="$t('a_n_n')"><i class="icon-address-book"></i></span>
                                                    <span :class="flex.add_new_schedule ? 'btn bg-success btn-sm' : 'btn btn-info btn-sm'"  @click="flex.add_new_schedule = !flex.add_new_schedule" :title="$t('add_s')"><i class="icon-clock"></i></span>
                                                    <span :class="flex.add_new_due ? 'btn bg-success btn-sm' : 'btn btn-info btn-sm'"  @click="flex.add_new_due = !flex.add_new_due" :title="$t('add_due')"><i class="icon-money"></i></span> 
                                                    <span v-can="'mobile_banking_multi_banking'" class="btn btn-primary btn-sm" @click="addFlexi(key)" title="Add new mobile banking"><i class="icon-plus"></i></span>
                                                    <span v-can="'mobile_banking_multi_banking'" class="btn btn-danger btn-sm" @click="removeFlexi(key)" title="Remove this mobile banking"><i class="icon-minus"></i></span> 
                                                </template>  
                                                
                                                <span :class="flex.extra_info ? 'btn bg-success btn-sm' : 'btn btn-info btn-sm'" @click="flex.extra_info = !flex.extra_info" :title="$t('extra_info')"><i class="icon-cogs"></i></span> 

                                                <span :title="$t('close')" class="btn btn-dark btn-sm" data-dismiss="modal" aria-label="Close"><i class="icon-cancel"></i></span> 

                                            </div><!--  /.mt-control mb-3 --> 

                                            <div class="form-row"> 

                                                <div class="col-md-12">  
                                                    <div class="input-group outline-group mobile-number mt-4"> 
                                                        <input :type="( flex.search_name ) ? 'text' : 'number'" autocomplete="off" placeholder="Mobile Number" v-on:keyup="numberChange(key, flex.search_name)" class="form-control big-font outline" :id="'number'+key" v-model="flex.number" required>
                                                        <label :for="'number'+key">{{ ( flex.search_name ) ? $t('c_n') : $t('m_n') }} {{ ( flex.name ) ? `(${flex.name})` : ''}}</label>

                                                        <div class="input-group-append" v-if="flex.number">
                                                          <span @click="removeNumber(key)" class="input-group-text cursor-pointer"><i class="icon-cancel"></i></span> 
                                                        </div>
                                                        <div class="input-group-append" v-if="!flex.number">
                                                            <span @click="flex.search_name = !flex.search_name" class="input-group-text cursor-pointer font-weight-bold" :title="( flex.search_name ) ? $t('to_type_number') : $t('to_s_by_n')">{{ ( flex.search_name ) ? '0' : 'A' }}</span> 
                                                        </div>
                                                        <div class="input-group-append" v-if="!flex.number">
                                                            <span class="input-group-text cursor-pointer font-weight-bold" :title="$t('c_l')" v-on:click.prevent="loadContact(null, null, key)" data-toggle="modal" data-target="#contactModal"><i class="icon-address-book"></i></span>  
                                                        </div>
                                                    </div> 
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3">
                                                    <ul v-if="flex.number_list" class="contact-suggestion">
                                                        <template v-for="number, index in flex.number_list"> 
                                                        <li v-for="service in number.services" @click="selectedNumber(key, number, service)">{{service.number}} {{ (service.provider_id) ? '- '+service.provider_id.name : ''}}  {{ (number.name) ? '- '+number.name : ''}}</li>
                                                        </template>
                                                    </ul> 
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3 outline-group" v-if="flex.add_name"> 
                                                    <input placeholder=" " type="text" class="form-control outline" id="name" v-model="flex.name">
                                                    <label for="name">{{ $t("name") }}</label> 
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3">
                                                    <div class="form-row"> 

                                                        <div class="col-sm-7 col-xs-12 mb-16">
                                                            <label class="o-s-l">{{ $t("provider") }}</label> 
                                                            <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="flex.provider_id" :options="providers" :preserve-search="true" label="name" track-by="name" :placeholder="$t('s_p')" :preselect-first="false" @input="providerChanged(key)">
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
                                                            <label class="o-s-l">{{ $t("service") }}</label>
                                                            <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="flex.service_id" :options="flex.services" :preserve-search="true" label="name" track-by="name" :placeholder="$t('s_s')" :preselect-first="false">
                                                                <template slot="singleLabel" slot-scope="props">
                                                                    <span class="option__title"> {{ props.option.name }}</span>
                                                                </template>
                                                                <template slot="option" slot-scope="props">
                                                                    <span class="option__title"> {{ props.option.name }}</span>
                                                                </template>
                                                            </multiselect>   
                                                        </div><!--  /.col-sm-5 col-xs-12 -->
                                                    </div><!--  /.form-row -->  
                                                </div><!--  /.col-md-12 mb-3 -->   

                                                <div class="col-md-12 mb-3">  
                                                    <div class="input-group outline-group mobile-number sender_number"> 
                                                        <input :type="( flex.sender_search_name ) ? 'text' : 'number'" autocomplete="off" placeholder="Mobile Number" v-on:keyup="numberChange(key, flex.sender_search_name, 'sender')" class="form-control big-font outline" :id="'sender_number'+key" v-model="flex.sender_number">
                                                        <label :for="'sender_number'+key">{{ ( flex.sender_search_name ) ? $t('s_c_n') : $t('s_mo_n') }} {{ ( flex.sender_name ) ? `(${flex.sender_name})` : '&nbsp;'}}</label>

                                                        <div class="input-group-append" v-if="flex.sender_number">
                                                          <span @click="removeNumber(key, 'sender')" class="input-group-text cursor-pointer"><i class="icon-cancel"></i></span> 
                                                        </div>
                                                        <div class="input-group-append" v-if="!flex.sender_number">
                                                            <span @click="flex.sender_search_name = !flex.sender_search_name" class="input-group-text cursor-pointer font-weight-bold" :title="( flex.sender_search_name ) ? $t('to_type_s_n') : $t('to_s_by_n')">{{ ( flex.sender_search_name ) ? '0' : 'A' }}</span> 
                                                        </div>
                                                        <div class="input-group-append" v-if="!flex.sender_number">
                                                            <span class="input-group-text cursor-pointer font-weight-bold" :title="$t('c_l')" v-on:click.prevent="loadContact(null, null, key, 'sender')" data-toggle="modal" data-target="#contactModal"><i class="icon-address-book"></i></span>  
                                                        </div>
                                                    </div> 
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3" v-if="flex.sender_number_list">
                                                    <ul class="contact-suggestion">
                                                        <template v-for="number, index in flex.sender_number_list"> 
                                                            <template v-if="!number.identities.length">
                                                                <li v-for="service in number.services">{{service.number}} {{ (service.provider_id) ? '- '+service.provider_id.name : ''}}  {{ (number.name) ? '- '+number.name : ''}}
                                                                    <span class="badge badge-danger p-2"><i class="icon-user" title="This contact has no identities"></i></span>
                                                                </li> 
                                                            </template>
                                                            <template v-else>
                                                                <li v-for="service in number.services" @click="selectedNumber(key, number, service, 'sender')">{{service.number}} {{ (service.provider_id) ? '- '+service.provider_id.name : ''}}  {{ (number.name) ? '- '+number.name : ''}}</li>
                                                            </template> 
                                                        </template>
                                                    </ul> 
                                                </div><!--  /.col-md-12 mb-3 --> 
                                                
                                                <div class="col-12 mb-2">
                                                    <div class="form-row">
                                                        <div class="col-7 outline-group">  
                                                            <input type="number" placeholder=" " class="form-control big-font outline" :id="'amount'+key" v-model="flex.amount" required >
                                                            <label :for="'amount'+key">{{ $t("tk") }}</label> 
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
                                                    <label for="paid">{{ $t("p_a") }}</label>
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3 outline-group" v-if="flex.add_new_due">
                                                    <input type="text" placeholder="Due Note" class="form-control outline" id="due_note" v-model="flex.due_note" >
                                                    <label for="due_note">{{ $t("due_note") }}</label>
                                                </div><!--  /.col-md-12 mb-3 --> 

                                            </div><!--  /.form-row --> 
                                        </div><!--  /.mt-numbers -->
                                    </div> <!-- /.mt-number-list -->  

                                    <div class="col-md-12 mb-3">        

                                        <div class="form-row"> 

                                            <div class="col-7" v-can="'mb_pin_status'">  
                                                <!-- fake fields are a workaround for chrome autofill getting the wrong fields -->
                                                <input style="display:none" type="text" name="fakeusernameremembered"/>
                                                <input style="display:none" type="password" name="fakepasswordremembered"/>
                                                
                                                <div class="input-group outline-group mobile-number"> 
                                                    <input :type="(showPass) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="pin" v-model="mb.pin" required>
                                                    <label for="pin">{{ $t("pin") }}</label>  
                                                    <div class="input-group-append">
                                                        <span class="input-group-text cursor-pointer" @click="showPass = !showPass" :title="( showPass ) ? $t('hide_pin') : $t('show_pin')">
                                                            <i :class="showPass ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                        </span>
                                                    </div>
                                                </div><!-- /.input-group outline-group mobile-number -->
                                                
                                            </div><!--  /.col-7 --> 

                                            <div :class=" ( $root.can('mb_pin_status') ) ? 'col-5' : 'col-12'">
                                                <button class="btn btn-primary d-block w-100" type="submit">{{ $t("transfer") }}</button> 
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
                            <h5 class="modal-title" id="editModalLongTitle">{{ $t('c_l') }}</h5>  
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
                                    <ul class="list-group">
                                        <template v-for="number, index in contact.contacts.data"> 
                                        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="service in number.services">{{service.number}} {{ (service.provider_id) ? '- '+service.provider_id.name : ''}}  {{ (number.name) ? '- '+number.name : ''}}
                                        <template v-if="contact.mb_sender && !number.identities.length">
                                            <span class="badge badge-danger p-2"><i class="icon-user" title="This contact has no identities"></i></span>
                                        </template>
                                        <template v-else>
                                            <span class="badge badge-dark p-2 cursor-pointer" @click="contactSeleted(number, service)"><i class="icon-ok"></i></span>
                                        </template> 
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
                            <button type="button" class="btn btn-sm bg-success float-left" data-toggle="modal" data-target="#createContactModal">
                                <i class="icon-plus-squared"></i>{{ $t('contact') }}
                            </button> 
                            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">{{ $t('close') }}</button> 
                        </div><!--  /.modal-footer --> 
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal --> 

            <!-- Modal Create Create -->
            <div class="modal fade" id="createContactModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ $t('n_c') }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <form v-on:submit.prevent="contactSaveForm()">
                            <div class="modal-body"> 
            
                                <div class="form-row">
                                    <div class="col-12 mb-2"> 
                                        <label for="status">{{ $t('status') }}</label> 
                                        <label class="switch">
                                          <input type="checkbox" v-model="contactCreate.status">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-12 mb-2 -->

                                    <div class="col-12 mb-3 outline-group" >
                                        <input placeholder=" " type="text" class="form-control outline" id="name" v-model="contactCreate.name">
                                        <label for="name">{{ $t('name') }}</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="Name" v-model="contactCreate.address">
                                        <label for="Name">{{ $t('address') }}</label>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="mt-number-list">
                                        <div class="mt-numbers" v-for="(service, key) in contactCreate.services"> 
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
                                                        <input placeholder="Mobile Number" v-on:keyup="contactNumberChange(key)" type="text" class="form-control outline" :id="'mobile-number'+key" v-model="service.number">
                                                        <label :for="'mobile-number'+key">{{ $t('m_n') }}</label>

                                                        <div class="input-group-append" v-if="service.number">
                                                          <span @click="contactRemoveNumber(key)" class="input-group-text cursor-pointer"><i class="icon-cancel"></i></span> 
                                                        </div>
                                                    </div> 
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3">
                                                    <ul v-if="service.number_list" class="PcontactCreate-suggestion">
                                                        <li v-for="number, index in service.number_list" @click="ContactSelectedNumber(key, number)">{{number.number}}  {{ (number.name) ? '- '+number.name : ''}} {{ (number.provider_id) ? '- '+number.provider_id.name : ''}}</li>
                                                    </ul> 
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3">
                                                    <div class="form-row">  
                                                        <div class="col-sm-7 col-xs-12 mb-16">
                                                            <label class="o-s-l">{{ $t('operator') }}</label> 
                                                            <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="service.provider_id" :options="contact.providers" :preserve-search="true" label="name" track-by="name" :preselect-first="false" @input="contactProviderChanged(key)">
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
                                                            <label for="contact_service_id" class="o-s-l">{{ $t('type') }}</label>
                                                            <select class="form-control" id="contact_service_id" v-model="service.service_id">  
                                                                <option v-for="service in service.services" :value="service.id">{{service.name}}</option>
                                                            </select>  
                                                        </div><!--  /.col-sm-5 col-xs-12 -->
                                                    </div><!--  /.form-row --> 
                                                </div><!--  /.col-md-12 mb-3 -->  
                                                 
                                            </div><!--  /.form-row --> 
                                        </div><!--  /.mt-numbers -->
                                    </div> <!-- /.mt-number-list -->  

                                    <div class="mt-number-list">
                                        <div class="mt-numbers" v-for="(identity, key) in contactCreate.identities"> 
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
                                                            <label :for="'id_number'+key">{{ $t('id_no') }}</label>
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
                                        <label class="o-s-l">{{ $t('s_cat') }}</label>
                                        <multiselect v-model="contactCreate.categories" :options="contact.categories" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" label="name" track-by="name" :preselect-first="true">
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
                                <button class="btn btn-primary" type="submit">{{ $t('create') }}</button>
                            </div><!--  /.modal-footer -->
                        </form>
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
                                        <date-time-picker placeholder=" " v-model="mb_Update.schedule_time" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"></date-time-picker>
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
                            <h5 class="modal-title">{{ $t("search") }}</h5>
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

                                    <div class="col-12 mb-3" v-if="mb_super_role">
                                        <multiselect v-model="mb_Search.user_id" :options="accounts" :custom-label="customLabel" :preserve-search="true" :placeholder="$t('search_user')" selectLabel="" :loading="isLoading" deselectLabel="" :internal-search="false" :searchable="true" label="name" track-by="name" @search-change="asyncFind" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect> 
                                        <small>{{ $t("s_u_h") }}</small>
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t("operator") }}</label>
                                        <multiselect deselect-label="" select-label="" v-model="mb_Search.provider_id" :options="providers" :preserve-search="true" label="name" track-by="name" :placeholder="$t('s_o')" :preselect-first="false">
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

                                    <div class="col-12 mb-3" v-if="mb_Search.provider_id"> 
                                        <label for="search-service_id" class="o-s-l">{{ $t('type') }}</label>
                                        <select class="form-control" id="search-service_id" v-model="mb_Search.service_id">  
                                            <option value="">{{ $t('all') }}</option>
                                            <option v-for="service in mb_Search.services" :value="service.id">{{service.name}}</option>
                                        </select>                                                   
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t("select_status") }}</label>
                                        <select id="search-status" class="form-control" v-model="mb_Search.status" >
                                            <option value="">{{ $t("select_status") }}</option>
                                            <option value="0">{{ $t("pending") }}</option>
                                            <option value="1">{{ $t("success") }}</option>
                                            <option value="2">{{ $t("cancel") }}</option>
                                            <option value="4">{{ $t("failed") }}</option>
                                            <option value="5">{{ $t("schedule") }}</option>
                                        </select> 
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3 outline-group"> 
                                        <input placeholder=" " type="text" class="form-control outline" id="search-number" v-model="mb_Search.number">
                                        <label for="search-number">{{ $t("number") }}</label>
                                    </div><!--  /.col-12 mb-3 -->    

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder="search-amount-from" type="text" class="form-control outline" id="search-amount-from" v-model="mb_Search.amount_from">
                                        <label for="search-amount-from">{{ $t("amount_from") }}</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-amount-to" v-model="mb_Search.amount_to">
                                        <label for="search-amount-to">{{ $t("amount_to") }}</label> 
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="mb_Search.date_from" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_from') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="mb_Search.date_to" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>

                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t("order_by") }}</label>
                                        <select id="search-order-by" class="form-control" v-model="mb_Search.order_by" >
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

            <!-- Modal msgDetails -->
            <div class="modal fade" id="msgDetails" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
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
                <button @click="newForm()" type="button" class="btn btn-sm bg-success" data-toggle="modal" data-target="#createModal">
                    <i class="icon-plus-squared"></i>{{ $t('mb') }}
                </button>   

                <template v-if="selected.length && mb_super_role">
                  <button class="btn btn-info btn-sm dropdown-toggle" type="button" id="mbsModify" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="cursor-pointer">{{ $t('m_s') }}</span>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="mbsModify">
                    <a href="#" class="dropdown-item" v-on:click.prevent="mbsModify(1)">
                       {{ $t('success') }}
                    </a>
                    <a href="#" class="dropdown-item" v-on:click.prevent="mbsModify(0)">
                        {{ $t('failed') }}
                    </a>
                    <a href="#" class="dropdown-item" v-on:click.prevent="mbsModify(2)">
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
                            <th v-if="mb_super_role" style="width: 20px;"><input type="checkbox" id="check-all" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all">{{ $t("status") }}</label></th>  
                            <th v-if="mb_super_role">{{ $t("user_id") }}</th>
                            <th v-if="mb_super_role">{{ $t("u_n") }}</th> 
                            <th>{{ $t("number") }}</th> 
                            <th>{{ $t("provider") }}</th>
                            <th>{{ $t("service") }}</th> 
                            <th>{{ $t("amount") }}</th>
                            <th title="Commission" v-if="mt_agent_mer_role || mb_super_role">{{ $t("com") }}</th> 
                            <th>{{ $t("fee") }}</th> 
                            <th>{{ $t("trx_id") }}</th>
                            <th v-if="mb_super_role">{{ $t("modem_id") }}</th>
                            <th>{{ $t("message") }}</th> 
                            <th>{{ $t("date") }}</th>    
                        </tr>
                    </thead>
                    <tbody>  
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="mb, index in mbs.data">  
                            <td v-if="mb_super_role"><input type="checkbox" v-bind:id="'checkbox-id-'+mb.id" :value="mb.id" v-model="selected"/></td>
                            <td>
                                <template v-if="mb.status == 5">
                                    <div class="dropdown action-items">
                                      <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="cursor-pointer" :title="mb.schedule_time | moment('DD-MM-YYYY hh:mm a')">{{ $t('schedule') }}</span>
                                      </button>
                                      <div class="dropdown-menu ml-63" aria-labelledby="actionItemButtons">
                                        <a href="#" class="dropdown-item" v-on:click.prevent="editForm(mb)" data-toggle="modal" data-target="#editModal">
                                           {{ $t('edit_schedule') }}
                                        </a>
                                        <a href="#" class="dropdown-item" v-on:click.prevent="cancelEntry(mb.id, index)">
                                            {{ $t('cancel') }}
                                        </a>
                                      </div>
                                    </div>
                                </template>
                                <template v-else-if="mb.status == 4 || mb.status == 1">
                                    <div class="dropdown action-items">
                                      <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="cursor-pointer"> {{ ( mb.status == 4) ? $t('failed') : $t('success') }}</span>
                                      </button>
                                      <div class="dropdown-menu ml-63" aria-labelledby="actionItemButtons">
                                        <a href="#" class="dropdown-item" v-on:click.prevent="tryAgain(mb)" data-toggle="modal" data-target="#createModal">
                                           {{ $t("try_again") }}
                                        </a> 
                                      </div>
                                    </div>
                                </template>
                                <template v-else> 
                                    <label v-bind:for="'checkbox-id-'+mb.id">{{ status(mb) }}</label>
                                </template>
                            </td>

                            <td v-if="mb_super_role">{{ user( mb.user ) }}</td> 
                            <td v-if="mb_super_role">{{ mb.user.name }}</td>  
                            <td><label v-bind:for="'checkbox-id-'+mb.id">{{ mb.number }}</label></td> 
                            <td>{{ mb.provider_id.name }}</td>
                            <td>{{ mb.service_id.name }}</td>  
                            <td>{{ mb.amount }}</td>  
                            <td v-if="mt_agent_mer_role || mb_super_role">{{ ( mb.status != 4 ) ? mb.user_com : '' }}</td>   
                            <td>{{ mb.user_fee }}</td>   
                            <td>{{ mb.id }}</td>   
                            <td v-if="mb_super_role">{{ mb.trxid }}</td>   
                            <td>{{ ( mb.msg ) ? mb.msg.substr(0, 40) : null }}
                                <template v-if="mb.msg">
                                    <span v-on:click="msgDetails(mb.msg)" class="cursor-pointer" data-toggle="modal" data-target="#msgDetails">(More)</span>
                                </template>
                            </td>   
                            <td>{{ mb.updated_at | moment("YYYY-MM-DD hh:mm a") }}</td>    
                        </tr> 

                        <template v-if="noData"><tr class="bg-white" v-html="noData"></tr></template>
                       
                    </tbody>
                    <tfoot>
                        <tr>  
                            <th v-if="mb_super_role"><input type="checkbox" id="check-all-bottom" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all-bottom">{{ $t("status") }}</label></th> 
                            <th v-if="mb_super_role">{{ $t("user_id") }}</th>
                            <th v-if="mb_super_role">{{ $t("u_n") }}</th>
                            <th>{{ $t("number") }}</th> 
                            <th>{{ $t("provider") }}</th> 
                            <th>{{ $t("service") }}</th>
                            <th>{{ $t("amount") }}</th>
                            <th title="Commission" v-if="mt_agent_mer_role || mb_super_role">{{ $t("com") }}</th>
                            <th>{{ $t("fee") }}</th> 
                            <th>{{ $t("trx_id") }}</th>
                            <th v-if="mb_super_role">{{ $t("modem_id") }}</th>
                            <th>{{ $t("message") }}</th> 
                            <th>{{ $t("date") }}</th>    
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">    
                <pagination-simple :data="mbs" @pagination-change-page="getLists"></pagination-simple>
                <div class="float-right amount-summery" v-if="!noData">
                    <span class="total-amount">{{ $t('t_a') }}: <b>{{t_a}}</b></span> 
                    <span class="total-commision d-inline-block" v-if="mt_agent_mer_role || mb_super_role">{{ $t('t_com') }}: <b>{{total_user_com}}</b></span>
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
            scheduleDateOptions: { 
                format: 'YYYY-MM-DD hh:mm a',
                useCurrent: false,
                showClear: true,
                showClose: true,
                minDate: new Date()
            },  
            mb_super_role: false,
            mt_agent_mer_role: false,
            try_again: false,
            dateOptions: this.$store.state.dateOptions,  
            mb: {  
                mb: [ 
                    { provider_id: '', warning_msg: '', services: [], service_id: '', number: '', number_two: '', due_date: null, name: null, search_name: false, add_name: false, add_new_due: false, add_new_schedule: false, extra_info: false, name: null, number_list: null, amount: '',  suggestions: null, paid: null, due_note: '', schedule_time: null, sender: false, sender_name: null, sender_search_name: false, sender_number: null, sender_number_list: null }, 
                ],
                pin: '',
            }, 
            showPass: false,
            mb_Const: {  
                mb: [ 
                    { provider_id: '', warning_msg: '', services: [], service_id: '', number: '', number_two: '', due_date: null, name: null, search_name: false, add_name: false, add_new_due: false, add_new_schedule: false, extra_info: false, name: null, number_list: null, amount: '',  suggestions: null, paid: null, due_note: '', schedule_time: null, sender: false, sender_name: null, sender_search_name: false, sender_number: null, sender_number_list: null }, 
                ],
                pin: '',
            }, 
            mb_Update: {  
                schedule_time: null,  
            }, 
            contact: {
                mb_key: '',
                mb_sender: null,
                contact_cat_id: '',
                contacts: {}, 
                providers: [],  
                categories: [],  
            }, 
            contactCreate: {  
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
            mb_Search: {
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
            mbs: {}, 
            accounts: [],
            isLoading: false, 
            t_a: 0, 
            total_user_com: 0,    
            msg_details: '',
            providers: [],  
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
        'mb_Search.provider_id': function (val) {  
            this.mb_Search.services = ( this.mb_Search.provider_id ) ? this.mb_Search.provider_id.services : []; 
            this.mb_Search.service_id = '';   
        }, 
    },
    created() {

        /* Money Transfer Super */
        this.mb_super_role = this.$root.can('mobile-banking-super');
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
                var items = this.mbs.data;
                var foundIndex = items.findIndex(x => x.id == e.data.id);
                this.mbs.data[foundIndex].status = e.data.status;

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
                for (let key in this.mbs.data) {
                    this.selected.push(this.mbs.data[key].id);
                }
            }
        },
        dataSearch() { 
            var data_search = this.mb_Search;   
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
                this.mb.mb.splice(index + 1, 0, { provider_id: '', warning_msg: '', services: [], service_id: '', number: '', number_two: '', due_date: null, name: null, search_name: false, add_name: false, add_new_due: false, add_new_schedule: false, extra_info: true, name: null, number_list: null, amount: '',  suggestions: null, paid: null, due_note: '', schedule_time: null, sender: false, sender_name: null, sender_search_name: false, sender_number: null, sender_number_list: null } );
            } catch(e) {
                console.log(e);
            }
        },
        removeFlexi(index) {
            if (this.mb.mb.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.mb.mb.splice(index, 1); 
            }
        }, 
        serviceFee(key) {
            return null;
            if ( this.mb.mb[key].service_id.service_fees != 'undefined' ) {
                if ( this.mb.mb[key].service_id.service_fees.length && this.mb.mb[key].amount ) {
                    var ranges = this.mb.mb[key].service_id.service_fees;    

                    function isInRange(range, amount) {
                        return range.from <= amount && (range.to === '*' || range.to >= amount)
                    }

                    var amount = this.mb.mb[key].amount;
                    var priceFound = false;
                    for (var i = 0; i < ranges.length && !priceFound; i++) {
                        var range = ranges[i];
                        if (isInRange(range, amount)) {
                            if ( range.percent ) {
                                let co_fee = amount * parseFloat( range.co_fee ) / 100;
                                let user_fee = amount * parseFloat( range.user_fee ) / 100; 
                                return (co_fee + user_fee).toFixed(2);
                            } else {
                                return parseInt( range.co_fee ) + parseInt( range.user_fee );
                            }
                            
                            priceFound = true;
                        }
                    } 
                }
            } else {
                return null;
            }
        },
        numberChange(key, searchName = false, sender = null ) { 
            var query = ( sender ) ? this.mb.mb[key].sender_number : this.mb.mb[key].number; 
            /* Auto select Operator by prefix */
            if ( sender == null ) {
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
                        this.mb.mb[key].provider_id = operator[0];  
                        if ( operator[0].services ) {
                            this.mb.mb[key].service_id = operator[0].services[0].id;  
                            this.mb.mb[key].services = operator[0].services; 
                        } 
                    } 
                } else {
                    this.mb.mb[key].provider_id = ''; 
                    this.mb.mb[key].service_id = ''; 
                }
            } 

            /* Suggest contact number */
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }

            this.timer = setTimeout(() => { 
                if ( query.length <= 5 ) {
                    if ( sender ) {
                        this.mb.mb[key].sender_name = ''; 
                        this.mb.mb[key].sender_number_list = ''; 
                    } else {
                        this.mb.mb[key].name = ''; 
                        this.mb.mb[key].number_list = ''; 
                    } 
                    return;
                }

                let search_key = (searchName) ? 'name' : 'number';
                let sender_query = ( sender ) ? '&sender=1' : '';
                axios.get('/api/v1/ct/contacts?'+ search_key +'=' + query + sender_query + '&type=1')
                    .then( resp => {  
                        if ( sender ) {
                            this.mb.mb[key].sender_number_list = resp.data.contacts.data;  
                        } else {
                            this.mb.mb[key].number_list = resp.data.contacts.data;  
                        }
                        
                    })
                    .catch( resp => {
                        this.$store.commit('errorMessages', resp); 
                    }); 
            }, 600);            
        },
        providerChanged( key ) {  
            if ( this.mb.mb[key].provider_id.services ) {
                this.mb.mb[key].service_id = this.mb.mb[key].provider_id.services[0];  
                this.mb.mb[key].services = this.mb.mb[key].provider_id.services; 
            }
        },  
        selectedNumber(key, number, service, sender = null) {
            if ( sender ) {
                this.mb.mb[key].sender_number = service.number; 
                this.mb.mb[key].sender_number_list = null; 
                this.mb.mb[key].sender_name = number.name;  
            } else {
                this.mb.mb[key].number = service.number; 
                this.mb.mb[key].number_list = null; 
                this.mb.mb[key].name = number.name; 
                var result = service.provider_id;  
                if ( result ) {
                   this.mb.mb[key].provider_id = result; 
                   this.mb.mb[key].services = result.services;  
                   let item = result.services.find(item => item.id === service.service_id);  
                   this.mb.mb[key].service_id = item;  
                } 
            }
        },
        removeNumber(key, sender = null ) { 
            if ( sender == null ) {
                this.mb.mb[key].name = null; 
                this.mb.mb[key].number = null;  
                this.mb.mb[key].number_list = null;  
                this.mb.mb[key].provider_id = ''; 
                this.mb.mb[key].service_id = ''; 
                this.mb.mb[key].amount = ''; 
                this.mb.mb[key].suggestions = '';  
            } else {
                this.mb.mb[key].sender_name = null; 
                this.mb.mb[key].sender_number = null;  
                this.mb.mb[key].sender_number_list = null;    
            }
        },   
        loadContact(page = 1, click = false, key = null, sender = null) {
            var app = this; 
            app.contact.mb_key = key;
            app.contact.mb_sender = sender;

            if ( !this.$route.query.contact_per_page && !this.$route.query.contact_page ) {   
                this.$router.push( { path: document.location.search, query: { contact_page: 1, contact_per_page: 20 } } ); 
            }

            app.contact.contacts = {}; 
            let contact_per_page = this.$route.query.contact_per_page;  
            
            let current_page = (click) ? page : this.$route.query.contact_page ;
            if ( click ) {
                this.$router.push( { path: document.location.search, query: { contact_page: current_page, contact_per_page: contact_per_page } } );  
            }

            let allQuery = this.$route.query;

            var queryString = Object.keys(allQuery).map(key => key + '=' + allQuery[key]).join('&');
                queryString += '&type=1';
            if ( sender ) { 
                queryString += '&identities=1';
            }
            if ( app.contact.contact_cat_id ) {
                queryString += '&contact_cat_id='+app.contact.contact_cat_id.id;
            }
            
            axios.get('/api/v1/ct/contacts?'+ queryString)
                .then( resp => {
                    app.contactPreloader = false; 
                    app.contact.contacts = resp.data.contacts;   
                    app.contact.providers = resp.data.providers;   
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
        contactSaveForm() { 
            document.getElementById('createContactModal').classList.toggle('show');
            var app = this;
            var newContact = app.contactCreate;
            axios.post('/api/v1/ct/contacts', newContact)
                .then( resp => {  
                    this.contact = this.contactConst; 
                    app.$store.commit('submitMsg', 'add');  
                    app.loadContact(); 
                })
                .catch( resp => {  
                    app.$store.commit('errorMessages', resp); 
                });
        },
        contactNumberChange(key) { 
            var query = this.contactCreate.services[key].number; 
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
                    this.contactCreate.services[key].provider_id = operator[0];  
                    if ( operator[0].services ) {
                        this.contactCreate.services[key].service_id = operator[0].services[0].id;  
                        this.contactCreate.services[key].services = operator[0].services; 
                    } 
                } 
            } else {
                this.contactCreate.services[key].provider_id = ''; 
                this.contactCreate.services[key].service_id = ''; 
            }

            /* Suggest contact number */
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }

            this.timer = setTimeout(() => { 
                if ( query.length <= 5 ) {
                    this.contactCreate.services[key].name = ''; 
                    this.contactCreate.services[key].number_list = ''; 
                    return;
                }
                axios.get('/api/v1/ct/contacts?'+ 'number=' + query)
                    .then( resp => {  
                        this.contactCreate.services[key].number_list = resp.data.contacts.data;  
                    })
                    .catch( resp => {
                        this.$store.commit('errorMessages', resp); 
                    }); 
            }, 600);            
        },
        contactProviderChanged( key ) {  
            if ( this.contactCreate.services[key].provider_id.services ) {
                this.contactCreate.services[key].service_id = this.contactCreate.services[key].provider_id.services[0].id;  
                this.contactCreate.services[key].services = this.contactCreate.services[key].provider_id.services; 
            } 
        },
        contactSelectedNumber(key, number) {
            this.contactCreate.services[key].number = number.number; 
            this.contactCreate.services[key].number_list = null; 
            this.contactCreate.services[key].name = number.name; 
            var result = number.provider_id;  
            if ( result ) {
               this.contactCreate.services[key].provider_id = result; 
               this.contactCreate.services[key].services = result.services; 
               this.contactCreate.services[key].service_id = number.service_id.id;  
            } 
        },
        contactRemoveNumber(key) { 
            this.contactCreate.services[key].name = null; 
            this.contactCreate.services[key].number = null;  
            this.contactCreate.services[key].number_list = null;  
            this.contactCreate.services[key].provider_id = ''; 
            this.contactCreate.services[key].service_id = '';  
        }, 
        addService(index) {
            this.contactCreate.services.splice(index + 1, 0, { number: null, name: null, number_list: null, provider_id: '', services: [], service_id: '' } ); 
        },
        removeService(index) {
            if (this.contactCreate.services.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.contactCreate.services.splice(index, 1); 
            }
        },
        addIdentity(index) {
            this.contactCreate.identities.splice(index + 1, 0, { id_number: null, id_type: 1 } ); 
        },
        removeIdentity(index) {
            if (this.contactCreate.identities.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.contactCreate.identities.splice(index, 1); 
            }
        },
        contactSeleted( number, service ) {  
            document.getElementById('contactModal').classList.toggle('show');  

            let key = this.contact.mb_key; 

            this.mb.mb[key].number = service.number; 
            this.mb.mb[key].name = number.name; 
            this.mb.mb[key].number_list = null; 
            var result = service.provider_id;  
            if ( result ) {
               this.mb.mb[key].provider_id = result; 
               this.mb.mb[key].services = result.services; 
               this.mb.mb[key].service_id = service.service_id;  
            }  
        },
        contactSeleted( number, service ) {   
            document.getElementById('contactModal').classList.toggle('show');  
            if ( this.contact.mb_sender ) {
                let key = this.contact.mb_key;
                this.mb.mb[key].sender_number = service.number; 
                this.mb.mb[key].sender_number_list = null; 
                this.mb.mb[key].sender_name = number.name; 
            } else {
                let key = this.contact.mb_key;
                this.mb.mb[key].number = service.number; 
                this.mb.mb[key].number_list = null; 
                this.mb.mb[key].name = number.name; 
                var result = service.provider_id;  
                if ( result ) {
                   this.mb.mb[key].provider_id = result; 
                   this.mb.mb[key].services = result.services;  
                   let item = result.services.find(item => item.id === service.service_id);  
                   this.mb.mb[key].service_id = item;  
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

            axios.get('/api/v1/mt/mobilebankings?'+ queryString)
                .then( resp => {  
                    app.preloader = false; 
                    app.$Progress.finish();
                    
                    app.mbs = resp.data.mbs;    
                    app.providers = resp.data.providers;

                    var t_a = 0;
                    var total_user_com = 0;
                    resp.data.mbs.data.forEach(function(item) {
                        if ( item.status != 2 || item.status != 4 ) {
                            t_a += item.amount; 
                            if ( item.user_com != null ) {
                                total_user_com += parseFloat(item.user_com); // user_com field is user commision, co_com and user_com is fee in utitlity
                            }                                
                        }
                    }); 
                    app.t_a = t_a;
                    app.total_user_com = total_user_com.toFixed(2);

                    if ( app.mbs.data.length == 0 ) {                                 
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
        newForm() { 
            this.try_again = false;   
            this.mb = this.mb_Const; 
        },
        saveForm() { 
            var app = this;
            
            for( let key in app.mb.mb) {
                if ( !app.mb.mb[key].provider_id ) {
                    app.mb.mb[key].warning_msg = 'Please Select Provider';
                    return;
                } else {
                    /* Check min and max number */
                    if ( !this.try_again ) {
                        let numberRange = app.mb.mb[key].provider_id;
                        if ( ( numberRange.min_number == numberRange.max_number ) && app.mb.mb[key].number.toString().length != numberRange.min_number ) {
                            app.mb.mb[key].warning_msg = `Mobile Number must ${numberRange.min_number} digit`; 
                            return;
                        } else if ( ( numberRange.min_number != numberRange.max_number ) && app.mb.mb[key].number.toString().length < numberRange.min_number || app.mb.mb[key].number.toString().length > numberRange.max_number ) {
                            app.mb.mb[key].warning_msg = `Mobile Number must between ${numberRange.min_number} to ${numberRange.max_number} digit`; 
                            return;
                        }

                        /* Check min and max amount */
                        let amountRange = app.mb.mb[key].service_id;
                        if ( app.mb.mb[key].amount < amountRange.min_amount || app.mb.mb[key].amount > amountRange.max_amount ) {
                            app.mb.mb[key].warning_msg = `Amount must between ${amountRange.min_amount} to ${amountRange.max_amount} TK`; 
                            return;
                        }  
                    }
                }
            } 

            document.getElementById('createModal').style.display = 'none';
            var mb = app.mb;   
             
            const newmb = JSON.parse(JSON.stringify(mb));
            const delLists = [
                'search_name', 
                'suggestions', 
                'sender_number_list',
                'extra_info',
            ];
            for ( let key in newmb.mb ) {
                delLists.forEach(e => delete newmb.mb[key][e]);
                newmb.mb[key].service_id = newmb.mb[key].service_id.id;
                if ( newmb.mb[key].schedule_time ) {
                    newmb.mb[key].schedule_time = this.$moment(newmb.mb[key].schedule_time).format('YYYY-MM-DD HH:mm:ss');
                }
            } 
            
            axios.post('/api/v1/mt/mobilebankings', newmb)
                .then( resp => {   
                    this.mb = this.mb_Const; 
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
        editForm(mb) { 
            this.mb_Update.id = mb.id;
            this.mb_Update.schedule_time = mb.schedule_time;
        }, 
        tryAgain(mb) { // if failed than try again  
            this.try_again = true;
            this.mb.mb[0].number = mb.number;
            this.mb.mb[0].amount = mb.amount;
            this.mb.mb[0].provider_id = mb.provider_id;
            this.mb.mb[0].services = [mb.service_id];
            this.mb.mb[0].service_id = mb.service_id; 
        }, 
        updateForm() { 
            document.getElementById('editModal').classList.toggle('show');
            var app = this;
            var newmb = app.mb_Update; 
             
            axios.patch('/api/v1/mt/mobilebankings/' + newmb.id, newmb)
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
                axios.delete('/api/v1/mt/mobilebankings/' + id)
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
        mbsModify( status ) { 
            var app = this;
            if (confirm('Are you sure to modify?')) {         
                var data = { 
                    status: status, 
                    ids: this.selected 
                };    
                axios.post('/api/v1/mt/mb-modifystatus', data)
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
                
                if ( app.mbs.data != 'undefined' && app.mbs.data) {
                    var pending_item = []; 
                    app.mbs.data.forEach(function(item) {
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
                                        var foundIndex = app.mbs.data.findIndex(x => x.id == item.id);
                                        app.mbs.data[foundIndex].status = item.status;
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
                mb_list: 'Mobile Banking Lists', 
                mb: 'Mobile Banking',  
                provider: 'Provider',  
                power_com: 'Power Com', 
                modem_id: 'ModemID', 
                try_again: 'Try Again', 
                s_s: 'Select Service',
                schedule: 'Schedule',
                //modal-content
                p_a: 'Paid Amount', 
                due_note: 'Due Note', 
                transfer: 'Transfer', 
                s_mo_n: 'Sender Mobile Number', 
                s_c_n: 'Sender Contact Name', 
                c_n: 'Contact Name', 
                schedule_time: 'Schedule Time', 
                s_p: 'Select Provider', 
                //contact list
                c_l: 'Contact List', 
                contact: 'Contact',
                //new contact
                n_c: 'New Contact',
                identity: 'Identity',
                id_no: 'ID Number',
                nid: 'NID',
                passport: 'Passport',
                birth_crt: 'Birth CRT',
                //hover text
                a_n_n: 'Add new name', 
                add_s: 'Add Schedule', 
                add_due: 'Add due', 
                extra_info: 'Extra Info', 
                to_s_by_n: 'To search by name',
                to_type_s_n: 'To type sender number',
            },
            bn: { 
                mb_list: 'মোবাইল ব্যাংকিং তালিকা',  
                mb: 'মোবাইল ব্যাংকিং',  
                provider: 'প্রদানকারী',
                power_com: 'পাওয়ার কমিশন', 
                modem_id: 'মডেম আইডি', 
                try_again: 'আবার চেষ্টা করুন',
                s_p: 'প্রদানকারী নির্বাচন',
                s_s: 'সেবা নির্বাচন',
                schedule: 'সময়',
                //modal-content 
                p_a: 'পরিশধিত টাকা', 
                due_note: 'বাকির কারণ',
                transfer: 'ট্রান্সফার',
                s_mo_n: 'প্রেরকের মোবাইল নম্বর',
                s_c_n: 'প্রেরকের ফোনবুকের নাম', 
                c_n: 'ফোনবুকের নাম', 
                //contact list
                c_l: 'ফোনবুক তালিকা', 
                contact: 'ফোনবুক', 
                //new contact
                n_c: 'নতুন ফোনবুক',
                identity: 'পরিচয়',
                id_no: 'আইডি নাম্বার',
                nid: 'জাতীয় পরিচয় পত্র',
                passport: 'পাসপোর্ট',
                birth_crt: 'জম্ম সনদ',
                //hover text
                a_n_n: 'নতুন নাম যোগ করুন', 
                add_s: 'সময় যোগ করুন',
                add_due: 'বাকি যোগ করুন', 
                extra_info: 'আরও তথ্য', 
                to_s_by_n: 'নাম দিয়ে সন্ধান করতে', 
                to_type_s_n: 'প্রেরক নম্বর টাইপ করতে',
            },  
        },
        sharedMessages: commonMessages
    },
} //export default
</script>

<style lang="scss" scoped>
 
</style>