<template>
    <div class="component">
        <div class="component-heading clearfix">
            <h2 class="heading float-left">
               {{ $t('mr_list') }}
            </h2> 
            <back-forward></back-forward>
        </div><!--  /.component-heading -->

        <div class="component-body"> 

            <!-- Modal Create-->
            <div class="modal fade" id="createModal" >
                <div class="modal-dialog">
                    <div class="modal-content"> 
                        
                        <form v-on:submit.prevent="saveForm()">
                            <div class="modal-body"> 
        
                                <div class="form-row">  

                                    <div class="mt-number-list">
                                        <div class="mt-numbers" v-for="(flex, key) in mr.mr"> 
                                            <div class="mt-title">
                                                {{ $t("no") }} {{ key+1 }} 
                                            </div><!--  /.mt-title mb-3 -->

                                            <div class="mt-control"> 
                                                <template v-if="flex.extra_info">
                                                    <span :class="flex.add_name ? 'btn bg-success btn-sm' : 'btn btn-info btn-sm'" @click="flex.add_name = !flex.add_name" :title="$t('a_n_n')"><i class="icon-address-book"></i></span>
                                                    <span :class="flex.add_new_schedule ? 'btn bg-success btn-sm' : 'btn btn-info btn-sm'"  @click="flex.add_new_schedule = !flex.add_new_schedule" :title="$t('a_s')"><i class="icon-clock"></i></span>
                                                    <span :class="flex.add_new_due ? 'btn bg-success btn-sm' : 'btn btn-info btn-sm'"  @click="flex.add_new_due = !flex.add_new_due" :title="$t('add_due')"><i class="icon-money"></i></span> 
                                                    <span v-can="'mobile_recharge_multi_recharge'" class="btn btn-primary btn-sm" @click="addFlexi(key)" :title="$t('add_new_mr')"><i class="icon-plus"></i></span>
                                                    <span v-can="'mobile_recharge_multi_recharge'" class="btn btn-danger btn-sm" @click="removeFlexi(key)" :title="$t('remove_this_mr')"><i class="icon-minus"></i></span> 
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
                                                            <span @click="flex.search_name = !flex.search_name" class="input-group-text cursor-pointer font-weight-bold" :title="( flex.search_name ) ? $t('to_type_number') : $t('to_search_by_name')">{{ ( flex.search_name ) ? '0' : 'A' }}</span> 
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
                                                            <label class="o-s-l">{{ $t("operator") }}</label> 
                                                            <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="flex.provider_id" :options="providers" :preserve-search="true" label="name" track-by="name" :placeholder="$t('s_o')" :preselect-first="false" @input="providerChanged(key)">
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
                                                            <label for="service_id" class="o-s-l">{{ $t("type") }}</label>
                                                            <select class="form-control" id="service_id" v-model="flex.service_id">  
                                                                <option v-for="service in flex.services" :value="service.id">{{service.name}}</option>
                                                            </select>  
                                                        </div><!--  /.col-sm-5 col-xs-12 -->
                                                    </div><!--  /.form-row -->  
                                                </div><!--  /.col-md-12 mb-3 -->   
                                                
                                                <div class="col-md-12 mb-3"> 
                                                    <div class="form-row">
                                                        <div class="col-7 outline-group"> 
                                                            <input type="number" placeholder=" " v-on:keyup="amountChange(key)" class="form-control big-font outline" :id="'amount'+key" v-model="flex.amount" required >
                                                            <label :for="'amount'+key">{{ $t("tk") }}</label> 
                                                        </div><!--  /.col-7 -->
                                                        <div class="col-5">
                                                            <div class="btn btn-info d-block" v-on:click.prevent="loadPack(null, null, key, true)" data-toggle="modal" data-target="#packModal">{{ $t("package") }}</div>
                                                        </div><!--  /.col-5 -->
                                                    </div><!--  /.form-row --> 

                                                    <span class="text-danger mt-2 d-block" v-if="flex.warning_msg">{{flex.warning_msg}}</span>

                                                    <div class="amount-suggestion" v-if="flex.suggestions">

                                                        <div class="suggestion-curent" v-if="flex.suggestions.curent">
                                                            <span class="cursor-pointer text-success" v-on:click.prevent="packDetails(flex.suggestions.curent)" data-toggle="modal" data-target="#packDetailsModal">                                                              
                                                                ({{ flex.suggestions.curent.name }}) 
                                                                <template v-if="flex.suggestions.curent.taking_way == 1">
                                                                    (Recharge) 
                                                                </template>
                                                                <template v-else-if="flex.suggestions.curent.taking_way == 2">
                                                                    (Dial)
                                                                </template>
                                                                <i class="icon-doc text-info"></i>
                                                            </span>  
                                                        </div><!--  /.suggestion-curent -->

                                                        <div class="suggestion-higher" v-if="flex.suggestions.suggestion_higher">
                                                            <span class="cursor-pointer text-primary" @click="addSuggestion(key, flex.suggestions.suggestion_higher)"><i class="icon-plus"></i> {{ parseFloat(flex.suggestions.suggestion_higher.distance) }}</span> to get  
                                                             
                                                                ({{ flex.suggestions.suggestion_higher.name }}) 
                                                                <template v-if="flex.suggestions.suggestion_higher.taking_way == 1">
                                                                    (Recharge) 
                                                                </template>
                                                                <template v-else-if="flex.suggestions.suggestion_higher.taking_way == 2">
                                                                    (Dial)
                                                                </template>

                                                            <a href="#" v-on:click.prevent="packDetails(flex.suggestions.suggestion_higher)" data-toggle="modal" data-target="#packDetailsModal"><i class="icon-doc cursor-pointer text-info"></i></a>
                                                        </div><!--  /.suggestion-higher -->

                                                        <div class="suggestion-lower" v-if="flex.suggestions.suggestion_lower">
                                                            <span class="cursor-pointer text-danger" @click="addSuggestion(key, flex.suggestions.suggestion_lower)"><i class="icon-minus"></i> {{ parseFloat(flex.suggestions.suggestion_lower.distance) }}</span> to get 

                                                            ({{ flex.suggestions.suggestion_lower.name }}) 
                                                            <template v-if="flex.suggestions.suggestion_lower.taking_way == 1">
                                                                (Recharge) 
                                                            </template>
                                                            <template v-else-if="flex.suggestions.suggestion_lower.taking_way == 2">
                                                                (Dial)
                                                            </template>

                                                            <a href="#" v-on:click.prevent="packDetails(flex.suggestions.suggestion_lower)" data-toggle="modal" data-target="#packDetailsModal"><i class="icon-doc cursor-pointer text-info"></i></a>
                                                        </div><!--  /.suggestion-lower -->
                                                    </div><!--  /.amount-suggestion --> 

                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3" v-if="flex.add_new_schedule"> 
                                                    <date-time-picker v-model="flex.schedule_time" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('schedule_time') }}</template></date-time-picker>
                                                </div><!--  /.col-md-12 mb-3 --> 

                                                <div class="col-md-12 mb-3 outline-group" v-if="flex.add_new_due">
                                                    <input type="number" placeholder="Paid Amount" class="form-control outline" :id="'paid'+key" v-model="flex.paid" required >
                                                    <label :for="'paid'+key">{{ $t("p_a") }} </label>
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
                                            <div class="col-7" v-can="'mr_pin_status'">  
                                                <!-- fake fields are a workaround for chrome autofill getting the wrong fields -->
                                                <input style="display:none" type="text" name="fakeusernameremembered"/>
                                                <input style="display:none" type="password" name="fakepasswordremembered"/>
                                                
                                                <div class="input-group outline-group mobile-number"> 
                                                    <input :type="(showPass) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="pin" v-model="mr.pin" required>
                                                    <label for="pin">{{ $t("pin") }}</label>  
                                                    <div class="input-group-append">
                                                        <span class="input-group-text cursor-pointer" @click="showPass = !showPass" :title="( showPass ) ? $t('hide_pin') : $t('show_pin')">
                                                            <i :class="showPass ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                        </span>
                                                    </div>
                                                </div><!-- /.input-group outline-group mobile-number -->
                                                
                                            </div><!--  /.col-7 --> 

                                            <div :class=" ( $root.can('mr_pin_status') ) ? 'col-5' : 'col-12'">
                                                <button class="btn btn-primary d-block w-100" type="submit">{{ $t("recharge") }}</button> 
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
                            <h5 class="modal-title" id="editModalLongTitle">{{ $t("c_l") }}</h5>  
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
                                    <label class="o-s-l">{{ $t("s_cat") }}</label>
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
                            <button type="button" class="btn btn-sm bg-success float-left" data-toggle="modal" data-target="#createContactModal">
                                <i class="icon-plus-squared"></i>{{ $t("contact") }}
                            </button> 
                            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">{{ $t("close") }}</button> 
                        </div><!--  /.modal-footer --> 
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal --> 

            <!-- Modal Create Create -->
            <div class="modal fade" id="createContactModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ $t("n_c") }}</h5>
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
                                                    <ul v-if="service.number_list" class="contactCreate-suggestion">
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
                                                            <label for="contact-service_id" class="o-s-l">{{ $t('type') }}</label>
                                                            <select class="form-control" id="contact-service_id" v-model="service.service_id">  
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

            <!-- Modal Package -->
            <div class="modal fade" id="packModal">
                <div class="modal-dialog modal-lg big-modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editModalLongTitle">{{ $t('c_p') }}</h5>  
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                         
                        <div class="modal-body"> 
                            <div class="row">
                                <div class="col-md-3">

                                    <div class="row d-block d-md-none">
                                        <div class="col-md-12 mb-3">   
                                            <button type="button" class="btn btn-sm d-block w-100 mb-3 btn-info package-menu">
                                                <i class="icon-search"></i> <span>{{ $t('p_f') }}</span>
                                            </button>
                                        </div><!--  /.col-md-12 mb-3 --> 
                                    </div><!--  /.row -->
                                <div class="custom-menu-modal mt-90">
                                    <div class="custom-header d-block d-md-none">
                                        <h5 class="modal-title">{{ $t('p_f') }}</h5>
                                        <button type="button" class="close">
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div> 
                                    <div class="form-row list-group"> 

                                        <div class="col-12 mb-3">   
                                            <label class="o-s-l">{{ $t('operator') }}</label>
                                            <multiselect deselect-label="" select-label="" v-model="pack_filter.provider_id" :options="pack.providers" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" label="name" track-by="name" :placeholder="$t('s_o')" :preselect-first="true">
                                                <template slot="tag" slot-scope="props">
                                                    <span class="custom__tag">
                                                        <span>{{ props.option.name }}</span>
                                                        <span @click="props.remove(props.option)">x</span> 
                                                    </span>
                                                </template>
                                            </multiselect> 
                                        </div><!--  /.col-12 mb-3 -->  

                                        <div class="col-12 mb-3">  
                                            <label class="o-s-l">{{ $t('pack_type') }}</label>
                                            <select id="filter-pack_type" class="form-control" v-model="pack_filter.pack_type"> 
                                                <option value="0">{{ $t('a_p') }}</option>
                                                <option value="1">{{ $t('i_p') }}</option>
                                                <option value="2">{{ $t('v_p') }}</option>
                                                <option value="3">{{ $t('sms_p') }}</option>
                                                <option value="4">{{ $t('b_p') }}</option>
                                                <option value="5">{{ $t('sim_pack') }}</option>
                                            </select>
                                        </div><!--  /.col-12 mb-3 -->

                                        <div class="col-12 mb-3">  
                                            <label class="o-s-l">{{ $t('validity') }}</label>
                                            <select id="filter-validity" class="form-control" v-model="pack_filter.validity"> 
                                                <option value="">{{ $t('all') }}</option>
                                                <option value="1">{{ $t('daily') }}</option>
                                                <option value="7">{{ $t('weekly') }}</option>
                                                <option value="15">{{ $t('f_d') }}</option>
                                                <option value="30">{{ $t('monthly') }}</option> 
                                            </select>
                                        </div><!--  /.col-12 mb-3 -->

                                        <template v-if="pack_filter.advance_search">  
                                            <div class="col-12 mb-3" v-if="pack_filter.pack_type == 1 || pack_filter.pack_type == 4"> 
                                                <select id="data_type" class="form-control" v-model="pack_filter.data_type" > 
                                                    <option value="1">{{ $t('any_data') }}</option>
                                                    <option value="0">{{ $t('s_d') }}</option> 
                                                </select> 
                                            </div><!--  /.col-12 mb-3 -->

                                            <div class="col-12 mb-3"> 
                                                <label class="o-s-l">{{ $t('offer_type') }}</label>
                                                <select id="offer_type" class="form-control" v-model="pack_filter.offer_type" > 
                                                    <option value="1">{{ $t('all_offer') }}</option>
                                                    <option value="0">{{ $t('o_sim_o') }}</option> 
                                                    <option value="2">{{ $t('n_sim_o') }}</option> 
                                                </select> 
                                            </div><!--  /.col-12 mb-3 --> 

                                            <div class="col-12 mb-3"> 
                                                <label class="o-s-l">{{ $t('n_or_b') }}</label>
                                                <select class="form-control" v-model="pack_filter.is_bonus"> 
                                                    <option value="0">{{ $t('n_p') }}</option>
                                                    <option value="1">{{ $t('b_p') }}</option>  
                                                </select>  
                                            </div><!--  /.col-12 mb-3 -->   

                                            <div class="col-12 mb-3" v-if="pack_filter.pack_type"> 
                                                <div class="form-row">   
                                                    <div class="col-4">  
                                                        <input type="text" placeholder=" " id="data-from" class="form-control outline" v-model="pack_filter.data_from"> 
                                                        <label for="data-from">{{ $t('from') }}</label>
                                                    </div><!--  /.col-4 -->
                                                    <div class="col-4">
                                                        <input type="text" id="data-to" placeholder=" " class="form-control outline" v-model="pack_filter.data_to">  
                                                        <label for="data-to">{{ $t('to') }}</label>
                                                    </div><!--  /.col-4 -->

                                                    <div class="col-4"> 
                                                        <select class="form-control">  
                                                            <template v-if="pack_filter.pack_type == 1 || pack_filter.pack_type == 4">  
                                                                <option value="gb">{{ $t('gb') }}</option>
                                                                <option value="mb">{{ $t('mb') }}</option> 
                                                            </template>

                                                            <template v-if="pack_filter.pack_type == 2 || pack_filter.pack_type == 4">  
                                                                <option value="min">{{ $t('min') }}</option>
                                                                <option value="sec">{{ $t('sec') }}</option>
                                                            </template>

                                                            <template v-if="pack_filter.pack_type == 3 || pack_filter.pack_type == 4">  
                                                                <option value="sms">SMS</option> 
                                                            </template> 
                                                            <template v-if="pack_filter.pack_type == 5">  
                                                                <option value="p">Paisha</option> 
                                                            </template> 
                                                        </select>   
                                                    </div><!--  /.col-4 -->
                                                </div><!--  /.form-row -->
                                            </div><!--  /.col-12 mb-3 --> 

                                            <div class="col-12 mb-3"> 
                                                <div class="form-row">   
                                                    <div class="col-md-6 m-b-16">  
                                                        <input type="text" placeholder="Price From" class="form-control outline" id="price-form" v-model="pack_filter.price_from">
                                                        <label for="price-form">{{ $t('price_from') }}</label>
                                                    </div><!--  /.col-md-6 -->
                                                    <div class="col-md-6">
                                                        <input type="text" placeholder="Price To" class="form-control outline" id="price-to" v-model="pack_filter.price_to">
                                                        <label for="price-to">{{ $t('price_to') }}</label>
                                                    </div><!--  /.col-md-6 -->
                                                </div><!--  /.form-row -->
                                            </div><!--  /.col-12 mb-3 --> 

                                            <div class="col-12 mb-3"> 
                                                <div class="form-row">   

                                                    <div class="col-4">  
                                                        <input type="text" placeholder=" " class="form-control outline" id="validity_from" v-model="pack_filter.validity_from">
                                                        <label for="validity_from">{{ $t('from') }}</label>
                                                    </div><!--  /.col-4 -->
                                                    <div class="col-4">
                                                        <input type="text" placeholder=" " class="form-control outline" id="validity_to" v-model="pack_filter.validity_to">
                                                        <label for="validity_to">{{ $t('to') }}</label> 
                                                    </div><!--  /.col-4 -->

                                                    <div class="col-4"> 
                                                        <select class="form-control">  
                                                            <template v-if="pack_filter.pack_type != 5">  
                                                                <option value="days">{{ $t('days') }}</option>
                                                                <option value="hours">{{ $t('hours') }}</option> 
                                                                <option value="mins">{{ $t('minutes') }}</option> 
                                                            </template>

                                                            <template v-else>  
                                                                <option value="sec">{{ $t('sec') }}</option>  
                                                                <option value="min">{{ $t('min') }}</option>  
                                                            </template>  
                                                        </select> 
                                                    </div><!--  /.col-4 -->
                                                </div><!--  /.form-row -->
                                            </div><!--  /.col-12 mb-3 -->  

                                            <div class="col-12 mb-3">
                                                <label class="o-s-l">{{ $t('sort_by') }}</label> 
                                                <select id="sort_by" class="form-control" v-model="pack_filter.sort_by" > 
                                                    <option value="">{{ $t('default') }}</option>
                                                    <option value="price-asc">{{ $t('p_l_h') }}</option>
                                                    <option value="price-dsc">{{ $t('p_h_l') }}</option> 
                                                    <option value="data-asc">{{ $t('d_l_h') }}</option>
                                                    <option value="data-dsc">{{ $t('d_h_l') }}</option> 
                                                    <option value="validity-asc">{{ $t('v_l_h') }}</option>
                                                    <option value="validity-dsc">{{ $t('v_h_l') }}</option> 
                                                </select> 
                                            </div><!--  /.col-12 mb-3 --> 

                                            <div class="col-12 mb-3">
                                                <label class="o-s-l">{{ $t('tak_way') }}</label> 
                                                <select id="taking_way" class="form-control" v-model="pack_filter.taking_way" > 
                                                    <option value="">{{ $t('all') }}</option>
                                                    <option value="1">{{ $t('recharge') }}</option> 
                                                    <option value="2">{{ $t('dial') }}</option>   
                                                </select> 
                                            </div><!--  /.col-12 mb-3 --> 

                                            <div class="col-12 mb-3" v-if="pack_filter.provider_id && sim_packs.length"> 
                                                <multiselect v-model="pack_filter.sim_pack_id" :options="sim_packs" :preserve-search="true" placeholder="Sim Package" label="name" track-by="name" :preselect-first="false">
                                                    <template slot="tag" slot-scope="props">
                                                        <span>{{ props.option.name }}</span>
                                                        <span @click="props.remove(props.option)">x</span> 
                                                    </template>
                                                </multiselect>
                                            </div><!--  /.col-md-4 mb-3 -->  

                                            <div class="col-12 mb-3">   
                                                <label class="o-s-l">{{ $t('show_pack') }}</label>
                                                <select class="form-control" v-model="packPerPage">
                                                    <option v-for="option in packPerPageOptions" v-bind:value="option.value">
                                                      {{ $t('show') }} {{ option.text }} {{ $t('pack') }}
                                                    </option>
                                                </select>  
                                            </div><!--  /.col-12 mb-3 -->

                                        </template>

                                        <div class="col-12 mb-3">
                                            <button class="btn btn-info btn-sm" v-on:click.prevent="pack_filter.advance_search = !pack_filter.advance_search"><i v-if="pack_filter.advance_search" class="icon-minus"></i>{{ $t('advance_op') }}</button> 
                                            <button class="btn btn-primary btn-sm float-right" v-on:click.prevent="packSearch()">{{ $t('search') }}</button> 
                                        </div><!--  /.col-12 mb-3 --> 

                                    </div><!--  /.row -->  
                                </div><!--  /.modal-content -->
                                </div><!--  /.col-md-3 -->

                                <div class="col-md-9">
                                    <div class="row">    
                                        <div class="col-md-12" v-if="packPreloader" > 
                                            <preloader></preloader>
                                        </div><!--  /.col-md-12 --> 

                                        <div class="col-md-12" v-if="!packPreloader" > 
                                            <div class="row">   
                                                <div class="col-md-4 mb-3" v-for="pack, index in pack.packs.data" >
                                                    <div class="card cursor-pointer" v-on:click="packSeleted(pack)">
                                                        <div class="card-header"> 
                                                            <template v-if="pack.provider_id.logo_small_src">
                                                                <span class="logo"><img :src="pack.provider_id.logo_small_src" :alt="pack.provider_id.name"></span>
                                                            </template>
                                                            
                                                            <span class="name">{{ pack.provider_id.name }}</span>
                                                            <i v-if="pack.id == pack_selected_id" class="icon-ok float-right text-success"></i>
                                                        </div>
                                                        <div class="card-body">
                                                            <h5 class="card-title">{{ pack.name }}</h5>
                                                            <div class="card-text">
                                                                <div class="pack-data-validity">{{ $t('data') }}: 
                                                                    <template v-if="pack.pack_data">
                                                                        <span v-for="net in pack.pack_data">
                                                                        {{ net.data + ' ' + net.data_type }} {{ net.validity + ' ' + net.validity_type }} 
                                                                            <template v-if="net.network == 2 && net.network == 1">
                                                                                Onnet    
                                                                            </template>
                                                                            <template v-if="net.network == 2 && net.network == 2">
                                                                                Offnet
                                                                            </template>
                                                                        </span> 
                                                                    </template>
                                                                </div><!-- /.pack-data-validity -->    
                                                                <div class="pack-price" v-if="pack.price">{{ $t('price') }}: {{ pack.price }}</div>   
                                                                <div class="pack-validity">{{ $t('validity') }}: 
                                                                    <template v-if="pack.pack_data">
                                                                        <span v-for="net in pack.pack_data">
                                                                            {{ net.validity + ' ' + net.validity_type }}  
                                                                        </span> 
                                                                    </template>
                                                                </div><!-- /.pack-validity --> 
                                                                <div class="to-take" v-if="pack.to_take">{{ $t('to_take') }}: 
                                                                    {{ pack.to_take }}
                                                                </div><!-- /.to-take --> 
                                                                <span class="btn btn-info btn-sm" v-on:click.stop="packDetails(pack)" data-toggle="modal" data-target="#packDetailsModal">{{ $t('details') }}</span>
                                                            </div>
                                                        </div>
                                                        <div class="card-footer text-muted">
                                                          {{ $t('last_checked') }}: {{ pack.last_checked }}
                                                        </div>
                                                    </div>
                                                </div><!--  /.col-md-4 -->
                                            </div><!--  /.row --> 
                                        </div><!--  /.col-md-12 -->

                                        <div class="col-md-12"> 
                                            <pagination :data="pack.packs" :limit="2" @pagination-change-page="loadPack"></pagination>  
                                            <template v-if="packNoData && !packPreloader"><tr class="bg-white" v-html="packNoData"></tr></template>
                                        </div><!--  /.col-md-12 -->
                                                
                                    </div><!--  /.row -->
                                </div><!--  /.col-md-9 -->
                            </div><!--  /.row -->
                        </div><!--  /.modal-body -->

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t("close") }}</button> 
                        </div><!--  /.modal-footer --> 
                    </div><!--  /.modal-content -->
                </div><!--  /.modal-dialog -->
            </div><!--  /.modal -->  

            <!-- Modal Pack Details -->
            <div class="modal fade" id="packDetailsModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content" v-if="pack.pack_details">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editModalLongTitle">
                            <template v-if="pack.pack_details.provider_id.logo_small_src">
                                <span class="logo"><img :src="pack.pack_details.provider_id.logo_small_src" :alt="pack.pack_details.provider_id.name"></span>
                            </template>
                            <span class="name">{{ pack.pack_details.provider_id.name }}</span>
                            </h5>

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                         
                        <div class="modal-body"> 
        
                            <div class="row">

                                <div class="col-md-12 mb-3"> 
                                    <div class="pack">
                                        <div class="pack-body">
                                            <h5 class="pack-title">{{ pack.pack_details.name }}</h5>
                                            <div class="pack-text">
                                                <div class="pack-data-validity">Data: 
                                                    <template v-if="pack.pack_details.pack_data">
                                                        <span v-for="net in pack.pack_details.pack_data">
                                                        {{ net.data + ' ' + net.data_type }} {{ net.validity + ' ' + net.validity_type }} 
                                                            <template v-if="net.network == 2 && net.network == 1">
                                                                Onnet    
                                                            </template>
                                                            <template v-if="net.network == 2 && net.network == 2">
                                                                Offnet
                                                            </template>
                                                        </span> 
                                                    </template>
                                                </div><!-- /.pack-data-validity -->    
                                                <div class="pack-price">Price: {{ pack.pack_details.price }}</div>   
                                                <div class="pack-validity mb-2">{{ $t('validity') }}: 
                                                    <template v-if="pack.pack_details.pack_data">
                                                        <span v-for="net in pack.pack_details.pack_data">
                                                            {{ net.validity + ' ' + net.validity_type }}  
                                                        </span> 
                                                    </template>
                                                </div><!-- /.pack-validity --> 
                                                <div class="to-take mb-2">{{ $t('to_take') }}: 
                                                    {{ pack.pack_details.to_take }}
                                                </div><!-- /.to-take --> 
                                                <div class="source-from mb-2" v-if="pack.pack_details.source">Source From: 
                                                    <a target="_blank" :href="pack.pack_details.source">{{ pack.pack_details.source }}</a>
                                                </div><!-- /.source-from -->
                                                <div class="pack-last-update">   
                                                    {{ $t('last_checked') }}: {{ pack.pack_details.last_checked }}
                                                </div><!-- /.pack-last-update -->
                                                <div class="pack-desc" v-html="pack.pack_details.desc"> 
                                                </div><!--  /.pack-desc --> 
                                            </div> 
                                        </div> 
                                    </div>
                                </div><!--  /.col-md-12 mb-3 -->  
                            </div><!--  /.row -->
                        </div><!--  /.modal-body -->

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t("close") }}</button> 
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
                                        <date-time-picker placeholder=" " v-model="mrUpdate.schedule_time" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"></date-time-picker>
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

                                    <div class="col-12 mb-3" v-if="mr_super_role">
                                        <multiselect v-model="mrSearch.user_id" :options="accounts" :custom-label="customLabel" :preserve-search="true" :placeholder="$t('search_user')" selectLabel="" :loading="isLoading" deselectLabel="" :internal-search="false" :searchable="true" label="name" track-by="name" @search-change="asyncFind" :preselect-first="false">
                                            <template slot="tag" slot-scope="props">
                                                <span>{{ props.option.name }}</span>
                                                <span @click="props.remove(props.option)">x</span> 
                                            </template>
                                        </multiselect> 
                                        <small>{{ $t('s_u_h') }}</small>
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t("operator") }}</label>
                                        <multiselect deselect-label="" select-label="" v-model="mrSearch.provider_id" :options="providers" :placeholder="$t('s_o')" :preserve-search="true" label="name" track-by="name" :preselect-first="false">
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

                                    <div class="col-12 mb-3" v-if="mrSearch.provider_id"> 
                                        <label for="search-service_id" class="o-s-l">{{ $t('type') }}</label>
                                        <select class="form-control" id="search-service_id" v-model="mrSearch.service_id">  
                                            <option value="">{{ $t('all') }}</option>
                                            <option v-for="service in mrSearch.services" :value="service.id">{{service.name}}</option>
                                        </select>                                                   
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t("select_status") }}</label>
                                        <select id="search-status" class="form-control" v-model="mrSearch.status" >
                                            <option value="">{{ $t("select_status") }}</option>
                                            <option value="0">{{ $t("pending") }}</option>
                                            <option value="1">{{ $t("success") }}</option>
                                            <option value="2">{{ $t("cancel") }}</option>
                                            <option value="4">{{ $t("failed") }}</option>
                                            <option value="5">{{ $t("schedule") }}</option>
                                        </select> 
                                    </div><!--  /.col-12 mb-3 -->

                                    <div class="col-12 mb-3 outline-group"> 
                                        <input placeholder=" " type="text" class="form-control outline" id="search-number" v-model="mrSearch.number">
                                        <label for="search-number">{{ $t("number") }}</label> 
                                    </div><!--  /.col-12 mb-3 -->    

                                    <div class="col-12 mb-3 outline-group"> 
                                        <input placeholder=" " type="text" class="form-control outline" id="search-amount-from" v-model="mrSearch.amount_from">
                                        <label for="search-amount-from">{{ $t("amount_from") }}</label>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="search-amount-to" v-model="mrSearch.amount_to">
                                        <label for="search-amount-to">{{ $t("amount_to") }}</label> 
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <date-time-picker v-model="mrSearch.date_from" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_from') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 --> 

                                    <div class="col-12 mb-3">  
                                        <date-time-picker v-model="mrSearch.date_to" value-format="yyyy-LL-dd HH:mm:ss" format="dd-LLLL-yyyy hh:mm a" :today-button="true" :close-button="true" :hour-time="12"><template v-slot:choose-date>{{ $t('date_to') }}</template></date-time-picker>
                                    </div><!--  /.col-12 mb-3 -->  

                                    <div class="col-12 mb-3"> 
                                        <label class="o-s-l">{{ $t("order_by") }}</label>
                                        <select id="search-order-by" class="form-control" v-model="mrSearch.order_by" >
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
            <div v-if="mr_super_role" class="modal fade" id="msgDetails" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="">{{ $t("message") }}</h5>
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
                    <i class="icon-plus-squared"></i>{{ $t("mr") }}   
                </button>   

                <template v-if="selected.length && mr_super_role">
                    <button class="btn btn-info btn-sm dropdown-toggle" type="button" id="mrsModify" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span class="cursor-pointer">{{ $t('m_s') }} </span>
                    </button>
                    <div class="dropdown-menu m-l" aria-labelledby="mrsModify">
                      <a href="#" class="dropdown-item" v-on:click.prevent="mrsModify(1)">
                         {{ $t("success") }}
                      </a>
                      <a href="#" class="dropdown-item" v-on:click.prevent="mrsModify(0)">
                          {{ $t("failed") }}
                      </a>
                      <a href="#" class="dropdown-item" v-on:click.prevent="mrsModify(2)">
                          {{ $t("cancelled") }}
                      </a>
                    </div>
                </template>

                <button type="button" class="btn btn-sm btn-info float-right btn-search" data-toggle="modal" data-target="#dataSearch">
                    <i class="icon-search"></i> <span class="d-none d-sm-inline">{{ $t("search") }}</span>
                </button> 

                <button type="button" class="btn btn-sm btn-info float-right mr-2" :title="$t('refresh_list')" v-on:click="getLists()">
                    <i class="icon-arrows-cw"></i>
                </button>

            </div><!--  /.table-actions -->

            <div class="table-responsive">
                <table class="table table-striped bg-white">
                    <thead>
                        <tr> 
                            <th v-if="mr_super_role" style="width: 20px;"><input type="checkbox" id="check-all" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all">{{ $t("status") }}</label></th>  
                            <th v-if="mr_super_role">{{ $t("user_id") }}</th>
                            <th v-if="mr_super_role">{{ $t("u_n") }}</th> 
                            <th>{{ $t("number") }}</th> 
                            <th>{{ $t("operator") }}</th>
                            <th>{{ $t("type") }}</th> 
                            <th>{{ $t("amount") }}</th> 
                            <th title="Commission" v-if="mr_agent_mer_role || mr_super_role">{{ $t("com") }}</th>
                            <th title="Power Com" v-if="mr_agent_mer_role || mr_super_role">{{ $t("power_com") }}</th> 
                            <th>{{ $t("trx_id") }}</th>
                            <th v-if="mr_super_role">{{ $t("modem_id") }}</th>
                            <th v-if="mr_super_role">{{ $t("message") }}</th> 
                            <th>{{ $t("date") }}</th>    
                        </tr>
                    </thead>
                    <tbody>  
                        <tr v-if="preloader" style="background: none;">
                            <td colspan="5">
                                <preloader></preloader>
                            </td>
                        </tr>
                        
                        <tr v-for="mr, index in mrs.data">  
                            <td v-if="mr_super_role"><input type="checkbox" v-bind:id="'checkbox-id-'+mr.id" :value="mr.id" v-model="selected"/></td>
                            <td>
                                <template v-if="mr.status == 5">
                                    <div class="dropdown action-items">
                                      <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="cursor-pointer" :title="mr.schedule_time | moment('DD-MM-YYYY hh:mm a')">{{ $t('schedule') }}</span>
                                      </button>
                                      <div class="dropdown-menu ml-63" aria-labelledby="actionItemButtons">
                                        <a href="#" class="dropdown-item" v-on:click.prevent="editForm(mr)" data-toggle="modal" data-target="#editModal">
                                           {{ $t('edit_schedule') }}
                                        </a>
                                        <a href="#" class="dropdown-item" v-on:click.prevent="cancelEntry(mr.id, index)">
                                            {{ $t('cancel') }}
                                        </a>
                                      </div>
                                    </div>
                                </template>
                                <template v-else-if="mr.status == 4 || mr.status == 1">
                                    <div class="dropdown action-items">
                                      <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="actionItemButtons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="cursor-pointer"> {{ ( mr.status == 4) ? $t('failed') : $t('success') }}</span>
                                      </button>
                                      <div class="dropdown-menu ml-63" aria-labelledby="actionItemButtons">
                                        <a href="#" class="dropdown-item" v-on:click.prevent="tryAgain(mr)" data-toggle="modal" data-target="#createModal">
                                           {{ $t("try_again") }}
                                        </a> 
                                      </div>
                                    </div>
                                </template>
                                <template v-else> 
                                    <label v-bind:for="'checkbox-id-'+mr.id">{{ status(mr) }}</label>
                                </template>
                            </td>

                            <td v-if="mr_super_role">{{ user( mr.user ) }}</td> 
                            <td v-if="mr_super_role">{{ mr.user.name }}</td> 
                            <td><label v-bind:for="'checkbox-id-'+mr.id">{{ mr.number }}</label></td> 
                            <td>{{ mr.provider_id.name }}</td>
                            <td>{{ mr.service_id.name }}</td> 
                            <td>{{ mr.amount }}</td>  
                            <td v-if="mr_agent_mer_role || mr_super_role">{{ ( mr.status != 4 ) ? mr.user_com : '' }}</td>   
                            <td v-if="mr_agent_mer_role || mr_super_role">{{ mr.user_fee }}</td>   
                            <td>{{ mr.id }}</td>   
                            <td v-if="mr_super_role">{{ mr.trxid }}</td>   
                            <td v-if="mr_super_role">{{ ( mr.msg ) ? mr.msg.substr(0, 40) : null }}
                                <template v-if="mr.msg">
                                    <span v-on:click="msgDetails(mr.msg)" class="cursor-pointer" data-toggle="modal" data-target="#msgDetails">(More)</span>
                                </template>
                            </td>   
                            <td>{{ mr.updated_at | moment("YYYY-MM-DD hh:mm a") }}</td>    
                        </tr> 

                        <template v-if="noData"><tr class="bg-white" v-html="noData"></tr></template>
                       
                    </tbody>
                    <tfoot>
                        <tr>  
                            <th v-if="mr_super_role"><input type="checkbox" id="check-all-bottom" v-model="selectAll" @click="select"/></th>
                            <th><label for="check-all-bottom">{{ $t("status") }}</label></th> 
                            <th v-if="mr_super_role">{{ $t("user_id") }}</th>
                            <th v-if="mr_super_role">{{ $t("u_n") }}</th>
                            <th>{{ $t("number") }}</th> 
                            <th>{{ $t("operator") }}</th> 
                            <th>{{ $t("type") }}</th>
                            <th>{{ $t("amount") }}</th> 
                            <th title="Commission" v-if="mr_agent_mer_role || mr_super_role">{{ $t("com") }}</th>
                            <th title="Power Com" v-if="mr_agent_mer_role || mr_super_role">{{ $t("power_com") }}</th>
                            <th>{{ $t("trx_id") }}</th>
                            <th v-if="mr_super_role">{{ $t("modem_id") }}</th>
                            <th v-if="mr_super_role">{{ $t("message") }}</th> 
                            <th>{{ $t("date") }}</th>    
                        </tr>
                    </tfoot>
                </table> 
            </div><!--  /.table-responsive -->
            <div class="table-actions">    
                <pagination-simple :data="mrs" @pagination-change-page="getLists"></pagination-simple> 
                <div class="float-right amount-summery" v-if="!noData">
                    <span class="total-amount">{{ $t('t_a') }}: <b>{{t_a}}</b></span> 
                    <span class="total-commision d-inline-block" v-if="mr_agent_mer_role || mr_super_role">{{ $t('t_com') }}: <b>{{total_user_com}}</b></span>
                </div>
            </div><!--  /.table-actions -->
        </div><!--  /.component-body -->  
    </div><!--  /.component -->

</template>

<script> 
import commonMessages from '@admin/locales/shared-i18n-setup' 
export default {
    components: {    
        //'lazy-asset': () => import('./lazy-asset.vue'), 
        'date-time-picker': () => import('vue-vanilla-datetime-picker'), 
    },   
    data() {
        return {  
            mr_super_role: false,
            mr_agent_mer_role: false,
            try_again: false,
            dateOptions: this.$store.state.dateOptions,  
            mr: {  
                mr: [ 
                    { provider_id: '', warning_msg: '', services: [], service_id: '', number: '', name: null, search_name: false, add_name: false, add_new_due: false, add_new_schedule: false, extra_info: false, name: null, number_list: null, amount: '', pack_selected_key: null, pack_selected_id: null, suggestions: null, paid: null, due_note: '', schedule_time: null, }, 
                ],
                pin: '',
            }, 
            showPass: false,
            mr_Const: {  
                mr: [ 
                    { provider_id: '', warning_msg: '', services: [], service_id: '', number: '', name: null, search_name: false, add_name: false, add_new_due: false, add_new_schedule: false, extra_info: false, name: null, number_list: null, amount: '', pack_selected_key: null, pack_selected_id: null, suggestions: null, paid: null, due_note: '', schedule_time: null, }, 
                ],
                pin: '',
            }, 
            mrUpdate: {  
                schedule_time: null,  
            }, 
            contact: {
                mr_key: '', 
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
            pack: {
                packs: {}, 
                providers: [],
                pack_details: null,
            },
            pack_selected_key: null,
            pack_selected_id: null,
            pack_filter: {
                provider_id: '',
                pack_type: 0,
                validity: '',
                advance_search: 0,
                data_type: 1, 
                offer_type: 1, 
                is_bonus: 0,
                data_from: '',
                data_to: '',
                price_from: '',
                price_to: '',
                sort_by: '',
                taking_way: '',
                validity_from: '',
                validity_to: '',
                sim_pack_id: '',  
            },
            mrSearch: {
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
            mrs: {}, 
            accounts: [],
            isLoading: false, 
            t_a: 0, 
            total_user_com: 0,    
            msg_details: '',
            providers: [],     
            sim_packs: [],
            perPage: this.$route.query.per_page, 
            perPageOptions: this.$store.state.perPageOptions, 
            packPerPage: (this.$route.query.pack_per_page) ? this.$route.query.pack_per_page : 20, 
            packPerPageOptions: this.$store.state.perPageOptions, 
            noData: '',
            contactNoData: '',
            packNoData: '',
            preloader: true,
            contactPreloader: true,
            packPreloader: true,
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
        packPerPage: function (val) { 
            let pack_page = this.$route.query.pack_page;  
            this.$router.push( { path: document.location.search, query: { pack_page: pack_page, pack_per_page: val } } ); 
            this.loadPack(); 
        },  
        'contact.contact_cat_id': function (val) {   
            this.$router.push( { path: document.location.search, query: { contact_cat_id: ( val ) ? val.id : '' } } ); 
            this.loadContact();  
        },
        'pack_filter.provider_id': function (val) { 
            var sim_packs = []; 
            var id = [val.id]; 
            var filteredArray = this.sim_packs_const.filter(function(itm) {
                return id.indexOf(itm.provider_id) > -1;
            }); 
            this.sim_packs = filteredArray; 
        }, 
        'pack_filter.validity': function (val) { 
            switch(val) {
                case '1':
                    this.pack_filter.validity_from = 1; 
                    this.pack_filter.validity_to = 1; 
                    break;
                case '7':
                    this.pack_filter.validity_from = 6; 
                    this.pack_filter.validity_to = 8; 
                    break;
                case '15':
                    this.pack_filter.validity_from = 12; 
                    this.pack_filter.validity_to = 18; 
                    break;
                case '30':
                    this.pack_filter.validity_from = 25; 
                    this.pack_filter.validity_to = 31; 
                    break; 
                default: 
                    this.pack_filter.validity_from = ''; 
                    this.pack_filter.validity_to = ''; 
                    break; 
            }
        }, 
        'mrSearch.provider_id': function (val) {  
            this.mrSearch.services = ( this.mrSearch.provider_id ) ? this.mrSearch.provider_id.services : []; 
            this.mrSearch.service_id = '';   
        }, 
    },
    created() {

        /* Money Transfer Super */
        this.mr_super_role = this.$root.can('mobile-recharge-super');
        this.mr_agent_mer_role = this.$root.can(['agent', 'merchant']); 

        this.getLists();    

        let per_page = this.$route.query.per_page;  

        var perPageOptions =  this.perPageOptions.find( function( ele ) { 
            return ele.value == per_page;
        } );

        if( !perPageOptions ) {
            this.perPageOptions.splice(0, 0, { text: per_page, value: per_page } ); 
        }

        /* Pack Search */ 
        let pack_per_page = this.packPerPage;  

        var packPerPageOptions =  this.packPerPageOptions.find( function( ele ) { 
            return ele.value == pack_per_page;
        } );

        if( !packPerPageOptions ) {
            this.packPerPageOptions.splice(0, 0, { text: pack_per_page, value: pack_per_page } ); 
        }

        /* Mts Real time Update */
        Echo.private(`mts-updated.${this.$store.state.auth_id}`)
            .listen('MtsUpdated', (e) => { 
                //console.log(e.data) fired two times same event 
                var items = this.mrs.data;
                var foundIndex = items.findIndex(x => x.id == e.data.id);

                if ( e.data.status == 99 ) {
                    
                    this.$store.commit('submitMsg', 'Congratulations!!! You have got extra commission TK: '+ e.data.power_com);   
                    if( typeof this.mrs.data[foundIndex].user_fee !== "undefined" ) { 
                        this.mrs.data[foundIndex].user_fee = e.data.power_com; 
                    } 
                    this.$root.acBalance();

                } else { 
                    this.mrs.data[foundIndex].status = e.data.status;
                } 

                if ( e.data.status == 4 ) { // failed status
                    this.$root.acBalance();  
                }
            });  

        // if socket faild to showing waitng and success
        this.pending_waiting();
        this.pending_waiting_no = setInterval(this.pending_waiting, 1500) // check every 1.5 seconds 
 
    }, 
    mounted() {   
        this.$root.popupModal();

        let setting_menu = document.querySelector(".package-menu");
        var cus_modal = document.querySelector('.custom-menu-modal');
        setting_menu.addEventListener('click', function(e){  
            cus_modal.classList.toggle("left"); 
        });

        let close_menu = document.querySelector(".custom-header .close");
        close_menu.addEventListener('click', function(e){  
            cus_modal.classList.remove("left"); 
        });   

        window.addEventListener('mouseup', function(e){   
            if ( document.querySelector('.custom-menu-modal') && !document.querySelector('.custom-menu-modal').contains(e.target) ) { 
                cus_modal.classList.remove("left"); 
            }  
        });  
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
                for (let key in this.mrs.data) {
                    this.selected.push(this.mrs.data[key].id);
                }
            }
        },
        dataSearch() { 
            var data_search = this.mrSearch;   
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
                this.mr.mr.splice(index + 1, 0, { provider_id: '', warning_msg: '', services: [], service_id: '', number: '', name: null, search_name: false, add_name: false, add_new_due: false, add_new_schedule: false, extra_info: true, name: null, number_list: null, amount: '', pack_selected_key: null, pack_selected_id: null, suggestions: null, paid: null, due_note: '', schedule_time: null, } );
            } catch(e) {
                console.log(e);
            }
        },
        removeFlexi(index) {
            if (this.mr.mr.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.mr.mr.splice(index, 1); 
            }
        },
        numberChange(key, searchName = false ) { 
            var query = this.mr.mr[key].number; 
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
                    this.mr.mr[key].provider_id = operator[0];  
                    if ( operator[0].services ) {
                        this.mr.mr[key].service_id = operator[0].services[0].id;  
                        this.mr.mr[key].services = operator[0].services; 
                    } 
                } 
            } else {
                this.mr.mr[key].provider_id = ''; 
                this.mr.mr[key].service_id = ''; 
            } 

            /* Suggest contact number */
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }

            this.timer = setTimeout(() => { 
                if ( query.length <= 5 ) {
                    this.mr.mr[key].name = ''; 
                    this.mr.mr[key].number_list = ''; 
                    return;
                }

                let search_key = (searchName) ? 'name' : 'number';
                axios.get('/api/v1/ct/contacts?'+ search_key +'=' + query )
                    .then( resp => {  
                        this.mr.mr[key].number_list = resp.data.contacts.data;                          
                    })
                    .catch( resp => {
                        this.$store.commit('errorMessages', resp); 
                    }); 
            }, 600);            
        },
        providerChanged( key ) {  
            if ( this.mr.mr[key].provider_id.services ) {
                this.mr.mr[key].service_id = this.mr.mr[key].provider_id.services[0].id;  
                this.mr.mr[key].services = this.mr.mr[key].provider_id.services; 
            }

            this.amountChange(key);
        }, 
        amountChange(key) { 
            if ( !this.$root.can('mr_auto_pack_suggestion') ) return;

            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                var amount = this.mr.mr[key].amount; 
                if ( amount == '' ) {
                    this.mr.mr[key].suggestions = '';
                    return;
                }
                var provider_id = ( this.mr.mr[key].provider_id ) ? this.mr.mr[key].provider_id.id : ''; 

                if ( provider_id ) {
                    axios.get('/api/v1/mt/suggestions?'+ 'amount=' + amount + '&provider_id=' + provider_id)
                        .then( resp => {  
                            this.mr.mr[key].suggestions = resp.data.suggestions;  
                        })
                        .catch( resp => {
                            this.$store.commit('errorMessages', resp); 
                        }); 
                }
                
            }, 600);            
        }, 
        addSuggestion(key, value) {
            this.mr.mr[key].amount = parseFloat( value.price );
            this.mr.mr[key].suggestions = '';
            this.amountChange(key);
        },
        selectedNumber(key, number, service) {
            this.mr.mr[key].number = service.number; 
            this.mr.mr[key].number_list = null; 
            this.mr.mr[key].name = number.name; 
            var result = service.provider_id;  
            if ( result ) {
               this.mr.mr[key].provider_id = result; 
               this.mr.mr[key].services = result.services; 
               this.mr.mr[key].service_id = service.service_id;  
            } 
        },
        removeNumber(key ) { 
            this.mr.mr[key].name = null; 
            this.mr.mr[key].number = null;  
            this.mr.mr[key].number_list = null;  
            this.mr.mr[key].provider_id = ''; 
            this.mr.mr[key].service_id = ''; 
            this.mr.mr[key].amount = ''; 
            this.mr.mr[key].suggestions = '';  
        },  
        packSearch() { 
            let data_search = this.pack_filter;   
            var provider_id; 
            var sim_pack_id = ( data_search.sim_pack_id ) ? data_search.sim_pack_id['id'] : ''; 

            if ( data_search.provider_id.length ) {
                let cat_ids = data_search.provider_id.map(function (el) { return el.id; });
                provider_id = cat_ids.join();  
            } else {
                provider_id = ''; 
            }

            this.$router.push( { path: document.location.search, query: {
                pack_type: data_search.pack_type,  
                sort_by: data_search.sort_by,  
                pack_provider_id: provider_id, 
                pack_sim_pack_id: sim_pack_id, 
                taking_way: data_search.taking_way,  
                pack_data_from: data_search.data_from, pack_data_to: data_search.data_to,
                pack_price_from: data_search.price_from, pack_price_to: data_search.price_to,
                pack_validity_from: data_search.validity_from, pack_validity_to: data_search.validity_to,
            } } );  

            this.loadPack(); 
        },  
        loadContact(page = 1, click = false, key = null) {
            var app = this; 
            app.contact.mr_key = key; 

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
            document.getElementById('createContactModal').style.display = 'none'; 

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
            document.getElementById('contactModal').style.display = 'none';
            //document.getElementById('contactModal').classList.toggle('show');  

            let key = this.contact.mr_key; 

            this.mr.mr[key].number = service.number; 
            this.mr.mr[key].name = number.name; 
            this.mr.mr[key].number_list = null; 
            var result = service.provider_id;  
            if ( result ) {
               this.mr.mr[key].provider_id = result; 
               this.mr.mr[key].services = result.services; 
               this.mr.mr[key].service_id = service.service_id;  
            }  
        },
        loadPack(page = 1, click = false, key = null, first_load = false ) { 
            
            var app = this; 
            
            if ( key != null ) {
                app.pack_selected_key = key; 
            }
            app.pack_selected_id = ''; 

            if ( !this.$route.query.pack_per_page && !this.$route.query.pack_page) {   
                this.$router.push( { path: document.location.search, query: { pack_page: 1, pack_per_page: 20 } } ); 
            }
            
            if ( first_load ) {
                var provider_id = this.mr.mr[app.pack_selected_key].provider_id;
                if ( provider_id ) {   
                    this.$router.push( { path: document.location.search, query: { pack_provider_id: provider_id['id'] } } );
                    this.pack_filter.provider_id = provider_id; 
                } else {
                    this.$router.push( { path: document.location.search, query: { pack_provider_id: '' } } ); 
                    this.pack_filter.provider_id = ''; 
                }
            }

            app.pack.packs = {};
            app.packPreloader = true; 
            let pack_per_page = this.$route.query.pack_per_page;  

            var pack_type = this.pack_filter.pack_type;  
            
            let current_page = (click) ? page : this.$route.query.pack_page ;
            if ( click ) {
                this.$router.push( { path: document.location.search, query: { pack_page: current_page, pack_per_page: pack_per_page } } );  
            }

            let allQuery = this.$route.query;

            var queryString = Object.keys(allQuery).map(key => key + '=' + allQuery[key]).join('&');
                queryString += '&pack_type='+pack_type;
            
            axios.get('/api/v1/mt/packsearch?'+ queryString)
                .then( resp => {
                    app.packPreloader = false; 
                    app.pack.packs = resp.data.packs;  
                    app.pack.providers = resp.data.providers;  
                    app.sim_packs = resp.data.sim_packs;
                    app.sim_packs_const = resp.data.sim_packs; 
                    if(app.pack.packs.data.length == 0) {                                 
                        app.packNoData = app.$store.state.noData;
                    } else {
                        app.packNoData = '';
                    }
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                }); 
        }, 
        packDetails( pack ) { 
            this.pack.pack_details = pack;  
        }, 
        packSeleted( pack ) {   
            if ( this.pack_selected_id == pack.id ) {
                this.mr.mr[this.pack_selected_key].price = '';
                this.mr.mr[this.pack_selected_key].provider_id = '';
                this.pack_selected_id = null;
                this.amountChange(this.pack_selected_key);
            } else {
                this.mr.mr[this.pack_selected_key].amount = pack.price;
                this.mr.mr[this.pack_selected_key].provider_id = pack.provider_id;
                this.mr.mr[this.pack_selected_key].service_id = pack.service_id;
                this.mr.mr[this.pack_selected_key].services = pack.provider_id.services; 

                this.pack_selected_id = pack.id;
                this.amountChange(this.pack_selected_key);
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

            axios.get('/api/v1/mt/mobilerecharges?'+ queryString)
                .then( resp => {  
                    app.preloader = false; 
                    app.$Progress.finish();
                    
                    app.mrs = resp.data.mrs;    
                    app.providers = resp.data.providers;

                    var t_a = 0;
                    var total_user_com = 0;
                    resp.data.mrs.data.forEach(function(item) {
                        if ( item.status != 2 || item.status != 4 ) {
                            t_a += item.amount; 
                            if ( item.user_com != null ) {
                                total_user_com += parseFloat(item.user_com);
                            }                                
                        }
                    }); 
                    app.t_a = t_a;
                    app.total_user_com = total_user_com.toFixed(2);

                    if ( app.mrs.data.length == 0 ) {                                 
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
            this.mr = this.mr_Const; 
        },
        saveForm() { 
            var app = this;
             
            for( let key in app.mr.mr) {
                if ( !app.mr.mr[key].provider_id ) {
                    app.mr.mr[key].warning_msg = 'Please select operator';
                    return;
                } else {
                    /* Check min and max number */
                    if ( !this.try_again ) {
                        //console.log(this.try_again )
                        let numberRange = app.mr.mr[key].provider_id;
                        if ( ( numberRange.min_number == numberRange.max_number ) && app.mr.mr[key].number.toString().length != numberRange.min_number ) {
                            app.mr.mr[key].warning_msg = `Mobile Number must ${numberRange.min_number} digit`; 
                            return;
                        } else if ( ( numberRange.min_number != numberRange.max_number ) && app.mr.mr[key].number.toString().length < numberRange.min_number || app.mr.mr[key].number.toString().length > numberRange.max_number ) {
                            app.mr.mr[key].warning_msg = `Mobile Number must between ${numberRange.min_number} to ${numberRange.max_number} digit`; 
                            return;
                        }

                        /* Check min and max amount */
                        let amountRange =  app.mr.mr[key].provider_id.services.find( function( ele ) { 
                            return ele.id == app.mr.mr[key].service_id;
                        } );
                        if ( app.mr.mr[key].amount < amountRange.min_amount || app.mr.mr[key].amount > amountRange.max_amount ) {
                            app.mr.mr[key].warning_msg = `Amount must between ${amountRange.min_amount} to ${amountRange.max_amount} TK`; 
                            return;
                        }  
                    }
                }
            } 

            document.getElementById('createModal').style.display = 'none'; 

            var mr = app.mr;   
             
            const newmr = JSON.parse(JSON.stringify(mr));
            const delLists = [
                'search_name', 
                'suggestions', 
                //'sender_numrer_list',
                'extra_info',
            ];
            for ( let key in newmr.mr ) {
                delLists.forEach(e => delete newmr.mr[key][e]); 
                if ( newmr.mr[key].schedule_time ) {
                    newmr.mr[key].schedule_time = this.$moment(newmr.mr[key].schedule_time).format('YYYY-MM-DD HH:mm:ss');
                } 
            }                

            axios.post('/api/v1/mt/mobilerecharges', newmr)
                .then( resp => {    
                    app.mr = app.mr_Const; 
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
        editForm(mr) { 
            this.mrUpdate.id = mr.id;
            this.mrUpdate.schedule_time = mr.schedule_time;
        }, 
        tryAgain(mr) { // if failed than try again  
            this.try_again = true;
            this.mr.mr[0].number = mr.number;
            this.mr.mr[0].amount = mr.amount;
            this.mr.mr[0].provider_id = mr.provider_id;
            this.mr.mr[0].services = [mr.service_id];
            this.mr.mr[0].service_id = mr.service_id.id; 
        }, 
        updateForm() { 
            //document.getElementById('editModal').classList.toggle('show');
            document.getElementById('editModal').style.display = 'none';
            var app = this;
            var newmr = app.mrUpdate; 
             
            axios.patch('/api/v1/mt/mobilerecharges/' + newmr.id, newmr)
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
                axios.delete('/api/v1/mt/mobilerecharges/' + id)
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
        mrsModify( status ) { 
            var app = this;
            if (confirm('Are you sure to modify?')) {         
                var data = { 
                    status: status, 
                    ids: this.selected 
                };    
                axios.post('/api/v1/mt/mr-modifystatus', data)
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
                
                if ( app.mrs.data != 'undefined' && app.mrs.data) {
                    var pending_item = []; 
                    app.mrs.data.forEach(function(item) {
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
                                        var foundIndex = app.mrs.data.findIndex(x => x.id == item.id);
                                        app.mrs.data[foundIndex].status = item.status;
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
                mr_list: 'Mobile Recharge Lists', 
                mr: 'Mobile Recharge', 
                power_com: 'Power Com', 
                modem_id: 'ModemID', 
                try_again: 'Try Again', 
                schedule: 'Schedule',
                //modal-content
                package: 'Package', 
                p_a: 'Paid Amount', 
                due_note: 'Due Note', 
                recharge: 'Recharge', 
                c_n: 'Contact Name', 
                c_l: 'Contact List', 
                contact: 'Contact', 
                n_c: 'New Contact', 
                identity: 'Identity', 
                id_number: 'ID Number', 
                nid: 'NID', 
                passport: 'Passport', 
                birth_crt: 'Birth CRT', 
                //package
                c_p: 'Choose Package',
                pack_type: 'Pack Type',
                a_p: 'All Pack',
                i_p: 'Internet Pack',
                v_p: 'Voice Pack',
                sms_p: 'SMS Pack',
                b_p: 'Bundle pack',
                sim_pack: 'Sim pack',
                p_f: 'Package Filter',

                validity: 'Validity',
                all: 'All',
                daily: 'Daily',
                weekly: 'Weekly',
                f_d: 'Fifteen Days',
                monthly: 'Monthly',

                offer_type: 'Offer Type',
                all_offer: 'All Offer',
                o_sim_o: 'Off Sim Offer',
                n_sim_o: 'New Sim Offer',

                n_or_b: 'Normal or Bonus',
                n_p: 'Normal Pack',
                b_p: 'Bonus Pack',
                price_from: 'Price From',
                price_to: 'Price From',

                from: 'From',
                to: 'To',
                days: 'Days',
                hours: 'Hours',
                minutes: 'Minutes',

                sort_by: 'Sort By',
                default: 'Default',
                p_l_h: 'Price (Low  -> High)',
                p_h_l: 'Price (High -> Low)',
                d_l_h: 'Data (Low  -> High)',
                d_h_l: 'Data (High -> Low)',
                v_l_h: 'Validity (Low  -> High)',
                v_h_l: 'Validity (High -> Low)',

                tak_way: 'Taking Way',
                dial: 'Dial',

                show_pack: 'Show Packs',
                pack: 'Packs',
                advance_op: 'Advance Option',

                any_data: 'Any Data',
                s_d: 'Social Data',
                gb: 'GB',
                mb: 'MB',
                min: 'Min',
                sec: 'Sec',

                last_checked: 'Last checked',
                details: 'Details',
                to_take: 'To take',
                to_take: 'To take',
                price: 'Price',
                data: 'Data',
                //hover text
                a_n_n: 'Add new name', 
                a_s: 'Add Schedule', 
                add_due: 'Add due', 
                add_new_mr: 'Add new mobile recharge', 
                remove_this_mr: 'Remove this mobile recharge', 
                extra_info: 'Extra Info', 
                to_search_by_name: 'To search by name',
                show_pin: 'Show Pin',
            },
            bn: { 
                mr_list: 'মোবাইল রিচার্জ তালিকা',  
                mr: 'মোবাইল রিচার্জ',  
                power_com: 'পাওয়ার কমিশন', 
                modem_id: 'মডেম আইডি',  
                try_again: 'আবার চেষ্টা করুন',  
                schedule: 'সময়',
                //modal-content 
                package: 'প্যাকেজ', 
                p_a: 'পরিশধিত টাকা', 
                due_note: 'বাকির কারণ',
                recharge: 'রিচার্জ',
                c_n: 'ফোনবুক নাম',
                c_l: 'ফোনবুক তালিকা',
                contact: 'ফোনবুক',
                n_c: 'নতুন ফোনবুক',
                identity: 'পরিচয়',
                id_number: 'আইডি নাম্বার',
                nid: 'জাতীয় পরিচয় পত্র',
                passport: 'পসপোর্ট',
                birth_crt: 'জম্ম সনদ',
                //package
                c_p: 'প্যাকেজ পছন্দ করুন',
                pack_type: 'প্যাকের ধরন',
                a_p: 'সমস্ত প্যাক',
                i_p: 'ইন্টারনেট প্যাক',
                v_p: 'ভয়েস প্যাক',
                sms_p: 'এসএমএস প্যাক',
                b_p: 'বান্ডিল প্যাক',
                sim_pack: 'সিম প্যাক',
                p_f: 'প্যাকেজ ফিল্টার',

                validity: 'মেয়াদ',
                all: 'সব',
                daily: 'দৈনিক',
                weekly: 'সাপ্তাহিক',
                f_d: '১৫ দিনের জন্য',
                monthly: 'মাসিক',

                offer_type: 'অফারের ধরন',
                all_offer: 'সমস্ত অফার',
                o_sim_o: 'বন্ধ সিম অফার',
                n_sim_o: 'নতুন সিম অফার',

                n_or_b: 'সাধারণ বা বোনাস',
                n_p: 'সাধারণ প্যাক',
                b_p: 'বোনাস প্যাক',
                price_from: 'কত টাকা হতে',
                price_to: 'কত টাকা পর্যন্ত',

                from: 'কত হতে',
                to: 'কত পর্যন্ত',
                days: 'দিন',
                hours: 'ঘন্টা',
                minutes: 'মিনিট',

                sort_by: 'ক্রমানুসার',
                default: 'ডিফল্ট',
                p_l_h: 'টাকা (কম  -> বেশি)',
                p_h_l: 'টাকা (বেশি -> কম)',
                d_l_h: 'ডেটা (কম -> বেশি)',
                d_h_l: 'ডেটা (বেশি -> কম)',
                v_l_h: 'মেয়াদ (কম -> বেশি)',
                v_h_l: 'মেয়াদ (বেশি -> কম)',

                tak_way: 'নেওয়ার উপায়',
                dial: 'ডায়াল',

                show_pack: 'প্যাকেজ পর্দশন',
                pack: 'প্যাকেজ',
                advance_op: 'আরও বিকল্প',

                any_data: 'যে কোন ডেটা',
                s_d: 'সামাজিক ডেটা',
                gb: 'জিবি',
                mb: 'এমবি',
                min: 'মিনিট',
                sec: 'সেকেন্ড',

                last_checked: 'সর্বশেষ চেক',
                details: 'বিস্তারিত',
                to_take: 'নিতে',
                price: 'টাকা',
                data: 'ডেটা',
                //hover text
                a_n_n: 'নতুন নাম যোগ করুন', 
                a_s: 'সময় যোগ করুন',
                add_due: 'বাকি যোগ করুন', 
                add_new_mr: 'নতুন মোবাইল রিচার্জ যোগ করুন', 
                remove_this_mr: 'বাদ দিন', 
                extra_info: 'আরও তথ্য', 
                to_search_by_name: 'নাম দিয়ে সন্ধান করতে', 
                show_pin: 'পিন দেখুন', 
            },  
        },
        sharedMessages: commonMessages
    },
} //export default
</script>

<style lang="scss" scoped> 
 
</style>