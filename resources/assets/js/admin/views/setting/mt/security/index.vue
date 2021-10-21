<template>
    <div class="component"> 
        <div class="component-body">  

            <div id="accordion">
                <div class="list-group mb-2">
                    <div class="list-group-item cursor-pointer">
                       <div class="panel-heading collapsed" data-toggle="collapse" data-target="#otp_collapse" aria-expanded="true" aria-controls="otp_collapse">
                            {{ $t('otp') }}
                        </div>
                    </div>

                    <div id="otp_collapse" class="collapse bg-white border" data-parent="#accordion"> 
                        <div class="modal-body">  
                            <p>{{ $t('security') }}</p>
                            <template v-if="!two_fa.google2fa_qr && otp_loaded && !two_fa.google2fa_enable">
                                <p>{{ $t('enabl_two_factor') }}</p>
                                <strong>
                                    <ol>
                                        <li>{{ $t('click_on_generate') }}</li>
                                        <li>{{ $t('verify_the_otp') }}</li>
                                    </ol>
                                </strong>
                            </template>
                            <hr />
                            <!-- fake fields are a workaround for chrome autofill getting the wrong fields -->
                            <input style="display:none" type="text" name="fakeusernameremembered"/>
                            <input style="display:none" type="password" name="fakepasswordremembered"/>

                            <div class="form-row">   
                                <div class="col-md-6 mb-3" v-if="!two_fa.google2fa_qr && otp_loaded && !two_fa.google2fa_enable"> 
                                    
                                    <div class="input-group outline-group mobile-number"> 
                                        <input :type="(showPass) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="cur_pass" v-model="otp.current_pass" required>
                                        <label for="cur_pass">{{ $t("current_password") }}</label>  
                                        <div class="input-group-append">
                                            <span class="input-group-text cursor-pointer" @click="showPass = !showPass" :title="( showPass ) ? $t('hide_pass') : $t('show_pass')">
                                                <i :class="showPass ? 'icon-eye-off' : 'icon-eye'" ></i>
                                            </span>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="btn btn-primary" @click="generateKey()">{{ $t("generated_qr_code") }}</span>
                                        </div>
                                    </div><!-- /.input-group outline-group mobile-number --> 

                                </div><!--  /.col-md-6 mb-3 --> 
                                
                                <template v-if="two_fa.google2fa_qr">

                                    <div class="col-md-12 mb-4 mt-3"> 
                                        <div class="form-row">
                                            <div class="col-12">   
                                                <div class="row">
                                                    <div class="col-md-6 mb-2 pr-0">  
                                                        <div class="input-group outline-group mobile-number"> 
                                                            <input :type="(showPass) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="cur_pass" v-model="otp.current_pass" required>
                                                            <label for="cur_pass">{{ $t("current_password") }}</label>  
                                                            <div class="input-group-append">
                                                                <span class="input-group-text cursor-pointer" @click="showPass = !showPass" :title="( showPass ) ? $t('hide_pass') : $t('show_pass')">
                                                                    <i :class="showPass ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                                </span>
                                                            </div>
                                                        </div><!-- /.input-group outline-group mobile-number -->
                                                    </div><!-- /.col-md-6 -->
                                                    <div class="col-md-3 pad-0">  
                                                        <div class="input-group-append">
                                                            <span class="btn btn-primary" @click="generateKey()">{{ $t("generated_new_qr_code") }}</span>
                                                        </div>
                                                    </div><!-- /.col-md-3 -->
                                                </div><!-- /.row -->
                                            </div><!--  /.col-12 -->
                                        </div><!--  /.form-row -->
                                    </div><!--  /.col-md-12 mb-4 -->  

                                    <div class="col-md-6 mb-3">
                                        <p>{{ $t('scan_qr') }}</p>
                                        <img :src="two_fa.google2fa_qr" alt="2fa image" />
                                    </div><!--  /.col-md-6 mb-3 --> 

                                    <div class="col-md-6 mb-3"> 
                                        <p>{{ $t('your_one_mobile') }}</p>
                                        <strong>Account name: </strong> OZ_MT {{ two_fa.user_id }} 
                                        <br />
                                        <strong>Secret Key: </strong>{{ two_fa.google2fa_secret_key }} <br />
                                    </div><!--  /.col-md-6 mb-3 --> 

                                    <div class="col-md-6 mb-4 "> 
                                        <div class="input-group outline-group mobile-number">
                                            <input placeholder=" " type="text" class="form-control outline" id="otp" v-model="otp.verify_code">
                                            <label for="otp">{{ $t('enter_code') }}</label>  
                                            <div class="input-group-append">
                                                <span class="btn btn-primary" @click="otpEnable()">{{ $t('enable_opt') }}</span>
                                            </div>
                                        </div><!--  /.input-group --> 
                                    </div><!--  /.col-md-6 mb-4 --> 
                                </template> 
                            </div><!--  /.form-row -->  

                            <div class="form-row" v-if="otp_loaded && two_fa.google2fa_enable">   
                                <div class="col-md-4 mb-4"> 
                                    <div class="input-group outline-group mobile-number"> 
                                        <input placeholder=" " type="password" class="form-control outline" id="cur_pass" v-model="otp.current_pass">
                                        <label for="cur_pass">{{ $t('current_password') }}</label>  
                                        <div class="input-group-append">
                                            <span class="btn btn-primary" @click="otpDisable()">{{ $t('disable_otp') }}</span>
                                        </div>
                                    </div> 
                                </div><!--  /.col-md-4 mb-4 -->     
                            </div><!--  /.form-row -->  

                        </div><!--  /.modal-body --> 
                    </div><!--  /.collapse -->  
                </div><!--  /.list-group -->

                <div class="list-group mb-2">
                    <div class="list-group-item cursor-pointer">
                       <div class="panel-heading collapsed" data-toggle="collapse" data-target="#password_collapse" aria-expanded="true" aria-controls="password_collapse">
                            {{ $t("update_password") }}
                        </div>
                    </div>

                    <div id="password_collapse" class="collapse bg-white border" data-parent="#accordion">
                        <form v-on:submit.prevent="updatePassword()">
                            <div class="modal-body"> 
                        
                                <div class="form-row">   
                                    <div class="col-md-4 mb-3">   
                                        <div class="input-group outline-group mobile-number"> 
                                            <input :type="(showPass) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="cur-pass-for-pass" v-model="password.current" required>
                                            <label for="cur-pass-for-pass">{{ $t("current_password") }}</label>  
                                            <div class="input-group-append">
                                                <span class="input-group-text cursor-pointer" @click="showPass = !showPass" :title="( showPass ) ? $t('hide_pass') : $t('show_pass')">
                                                    <i :class="showPass ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                </span>
                                            </div>
                                        </div><!-- /.input-group outline-group mobile-number --> 
                                    </div><!--  /.col-md-4 --> 

                                    <div class="col-md-4 mb-3">   
                                        <div class="input-group outline-group mobile-number"> 
                                            <input :type="(showPass) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="password" v-model="password.password" required>
                                            <label for="password">{{ $t("new_password") }}</label>  
                                            <div class="input-group-append">
                                                <span class="input-group-text cursor-pointer" @click="showPass = !showPass" :title="( showPass ) ? $t('hide_pass') : $t('show_pass')">
                                                    <i :class="showPass ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                </span>
                                            </div>
                                        </div><!-- /.input-group outline-group mobile-number --> 
                                    </div><!--  /.col-md-4 --> 

                                    <div class="col-md-4 mb-3">   
                                        <div class="input-group outline-group mobile-number"> 
                                            <input :type="(showPass) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="password_confirmation" v-model="password.password_confirmation" required>
                                            <label for="password_confirmation">{{ $t("confirm_password") }}</label>  
                                            <div class="input-group-append">
                                                <span class="input-group-text cursor-pointer" @click="showPass = !showPass" :title="( showPass ) ? $t('hide_pass') : $t('show_pass')">
                                                    <i :class="showPass ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                </span>
                                            </div>
                                        </div><!-- /.input-group outline-group mobile-number --> 
                                    </div><!--  /.col-md-4 -->  
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div v-can="'setting-security-edit'" class="modal-footer"> 
                                <button class="btn btn-primary" type="submit">{{ $t("update_password") }}</button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.collapse -->  
                </div><!--  /.list-group -->  

                <div class="list-group mb-2">
                    <div class="list-group-item cursor-pointer">
                       <div class="panel-heading collapsed" data-toggle="collapse" data-target="#pin_collapse" aria-expanded="true" aria-controls="pin_collapse">
                            {{ $t("update_pin") }}
                        </div>
                    </div>

                    <div id="pin_collapse" class="collapse bg-white border" data-parent="#accordion">
                        <form v-on:submit.prevent="updatePin()">
                            <div class="modal-body"> 
                            
                                <div class="form-row">   
                                    <div class="col-md-4 mb-3">   
                                        <div class="input-group outline-group mobile-number"> 
                                            <input :type="(showPin) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="cur-pin" v-model="pin.current">
                                            <label for="cur-pin">{{ $t("current_pin") }}</label>  
                                            <div class="input-group-append">
                                                <span class="input-group-text cursor-pointer" @click="showPin = !showPin" :title="( showPin ) ? $t('hide_pin') : $t('show_pin')">
                                                    <i :class="showPin ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                </span>
                                            </div>
                                        </div><!-- /.input-group outline-group mobile-number --> 
                                    </div><!--  /.col-md-4 --> 

                                    <div class="col-md-4 mb-3">   
                                        <div class="input-group outline-group mobile-number"> 
                                            <input :type="(showPin) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="pin" v-model="pin.pin" required>
                                            <label for="pin">{{ $t("new_pin") }}</label>  
                                            <div class="input-group-append">
                                                <span class="input-group-text cursor-pointer" @click="showPin = !showPin" :title="( showPin ) ? $t('hide_pin') : $t('show_pin')">
                                                    <i :class="showPin ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                </span>
                                            </div>
                                        </div><!-- /.input-group outline-group mobile-number --> 
                                    </div><!--  /.col-md-4 --> 

                                    <div class="col-md-4 mb-3">   
                                        <div class="input-group outline-group mobile-number"> 
                                            <input :type="(showPin) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="pin_confirmation" v-model="pin.pin_confirmation" required>
                                            <label for="pin_confirmation">{{ $t("confirm_pin") }}</label>  
                                            <div class="input-group-append">
                                                <span class="input-group-text cursor-pointer" @click="showPin = !showPin" :title="( showPin ) ? $t('hide_pin') : $t('show_pin')">
                                                    <i :class="showPin ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                </span>
                                            </div>
                                        </div><!-- /.input-group outline-group mobile-number --> 
                                    </div><!--  /.col-md-4 -->  
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body --> 

                            <div v-can="'setting-security-edit'" class="modal-footer"> 
                                <button class="btn btn-primary" type="submit">{{ $t("update_pin") }}</button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.collapse -->  
                </div><!--  /.list-group --> 

                <div class="list-group mb-2">
                    <div class="list-group-item cursor-pointer">
                       <div class="panel-heading collapsed" data-toggle="collapse" data-target="#forgot_pin_collapse" aria-expanded="true" aria-controls="forgot_pin_collapse">
                            {{ $t('forgot_pin') }}
                        </div>
                    </div>

                    <div id="forgot_pin_collapse" class="collapse bg-white border" data-parent="#accordion"> 
                        <div class="modal-body">  
                             
                            <div class="form-row">   
                                <template v-if="otp_loaded && !two_fa.google2fa_enable && !pin_email_exist">
                                    <div class="col-md-12 mb-3">
                                        {{ $t('email_reset_pin') }}
                                    </div><!--  /.col-md-12 mb-3 -->
                                </template>

                                <template v-if="pin_email_exist">
                                    <div class="col-md-12 mb-3">
                                        <div class="form-row">
                                            <div class="col-12">   
                                                <div class="row">
                                                    <div class="col-md-6 mb-2 pr-0">
                                                        <div class="input-group outline-group mobile-number"> 
                                                            <input :type="(showPass) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="cur-pass-for-pass" v-model="pin_reset_email.current_pass" required>
                                                            <label for="cur-pass-for-pass">{{ $t("current_password") }}</label>  
                                                            <div class="input-group-append">
                                                                <span class="input-group-text cursor-pointer" @click="showPass = !showPass" :title="( showPass ) ? $t('hide_pass') : $t('show_pass')">
                                                                    <i :class="showPass ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                                </span>
                                                            </div>
                                                        </div><!-- /.input-group outline-group mobile-number -->
                                                    </div><!-- /.col-md-6 -->
                                                    <div class="col-md-3 pad-0"> 
                                                        <div class="input-group-append">
                                                            <span class="btn btn-primary" @click="pinGenerateCode()">{{ $t('recovery_code') }}</span>
                                                        </div>
                                                    </div><!-- /.col-md-3 -->
                                                </div><!-- /.row -->
                                            </div><!--  /.col-12 -->  
                                        </div><!--  /.form-row -->
                                    </div><!--  /.col-md-12 mb-3 -->

                                    <template v-if="pin_recovery_loaded && pin_recovery_exist">  

                                        <div class="col-md-4 mb-3">   
                                            <div class="input-group outline-group mobile-number"> 
                                                <input :type="(showPin) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="email-pin" v-model="pin_reset_email.pin" required>
                                                <label for="email-pin">{{ $t("new_pin") }}</label>  
                                                <div class="input-group-append">
                                                    <span class="input-group-text cursor-pointer" @click="showPin = !showPin" :title="( showPin ) ? $t('hide_pin') : $t('show_pin')">
                                                        <i :class="showPin ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                    </span>
                                                </div>
                                            </div><!-- /.input-group outline-group mobile-number --> 
                                        </div><!--  /.col-md-4 --> 

                                        <div class="col-md-4 mb-3">   
                                            <div class="input-group outline-group mobile-number"> 
                                                <input :type="(showPin) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="email_pin_confirmation" v-model="pin_reset_email.pin_confirmation" required>
                                                <label for="email_pin_confirmation">{{ $t("confirm_pin") }}</label>  
                                                <div class="input-group-append">
                                                    <span class="input-group-text cursor-pointer" @click="showPin = !showPin" :title="( showPin ) ? $t('hide_pin') : $t('show_pin')">
                                                        <i :class="showPin ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                    </span>
                                                </div>
                                            </div><!-- /.input-group outline-group mobile-number --> 
                                        </div><!--  /.col-md-4 --> 

                                        <div class="col-md-4 outline-group mb-3">
                                            <input placeholder=" " required type="text" class="form-control outline" id="email-otp-code" v-model="pin_reset_email.otp_code">
                                            <label for="email-otp-code">{{ $t('e_r_c') }}</label>
                                        </div><!--  /.col-md-4 mb-3 --> 

                                        <div class="col-md-4 outline-group mb-3">
                                            <span class="btn btn-primary" @click="pinReset('email')">{{ $t('reset_pin') }}</span>
                                        </div><!--  /.col-md-4 mb-3 --> 
                                    </template> 
                                </template> 

                                <template v-if="otp_loaded && two_fa.google2fa_enable"> 
                                    <div class="col-md-12">
                                        <p>{{ $t('recover_otp') }}</p> 
                                    </div><!--  /.col-md-12 -->  
                                
                                    <div class="col-md-4 outline-group mb-3">
                                        <input placeholder=" " required type="password" class="form-control outline" id="otp-pin" v-model="pin_reset_otp.pin" required>
                                        <label for="otp-pin">{{ $t("new_pin") }}</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-4 outline-group mb-3">
                                        <input placeholder=" " required type="password" class="form-control outline" id="otp-pin_confirmation" v-model="pin_reset_otp.pin_confirmation" required>
                                        <label for="otp-pin_confirmation">{{ $t("confirm_pin") }}</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-4 outline-group mb-3">
                                        <input placeholder=" " required type="text" class="form-control outline" id="otp-code" v-model="pin_reset_otp.otp_code">
                                        <label for="otp-code">{{ $t("enter_otp_code") }}</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-4 outline-group mb-3">
                                        <span class="btn btn-primary" @click="pinReset('otp')">{{ $t('reset_pin') }}</span>
                                    </div><!--  /.col-md-4 mb-3 --> 
                                </template> 
                               
                            </div><!--  /.form-row -->   

                        </div><!--  /.modal-body --> 
                    </div><!--  /.collapse -->  
                </div><!--  /.list-group --> 

                <div class="list-group mb-2">
                    <div class="list-group-item cursor-pointer">
                       <div class="panel-heading collapsed" data-toggle="collapse" data-target="#mobile_collapse" aria-expanded="true" aria-controls="mobile_collapse">
                            {{ $t("update_mobile") }}
                        </div>
                    </div>

                    <div id="mobile_collapse" class="collapse bg-white border" data-parent="#accordion">
                        <form v-on:submit.prevent="updateMobile()">
                            <div class="modal-body"> 
                        
                                <div class="form-row">     

                                    <div class="col-md-4 mb-3">   
                                        <div class="input-group outline-group mobile-number"> 
                                            <input :type="(showPass) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="cur-pass-for-mob" v-model="mobile.current" required>
                                            <label for="cur-pass-for-mob">{{ $t("current_password") }}</label>  
                                            <div class="input-group-append">
                                                <span class="input-group-text cursor-pointer" @click="showPass = !showPass" :title="( showPass ) ? $t('hide_pass') : $t('show_pass')">
                                                    <i :class="showPass ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                </span>
                                            </div>
                                        </div><!-- /.input-group outline-group mobile-number --> 
                                    </div><!--  /.col-md-4 --> 

                                    <div class="col-md-4 outline-group mb-3">
                                        <input placeholder=" " type="number" class="form-control outline" id="mobile" v-model="mobile.mobile" required>
                                        <label for="mobile">{{ $t("new_mobile") }}</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-4 outline-group mb-3">
                                        <input placeholder=" " type="number" class="form-control outline" id="mobile_confirmation" v-model="mobile.mobile_confirmation" required>
                                        <label for="mobile_confirmation">{{ $t("confirm_mobile") }}</label>
                                    </div><!--  /.col-md-4 mb-3 -->  
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div v-can="'setting-security-edit'" class="modal-footer"> 
                                <button class="btn btn-primary" type="submit">{{ $t("update_mobile") }}</button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.collapse -->  
                </div><!--  /.list-group -->  

                <div class="list-group mb-2">
                    <div class="list-group-item cursor-pointer">
                       <div class="panel-heading collapsed" data-toggle="collapse" data-target="#email_collapse" aria-expanded="true" aria-controls="email_collapse">
                            {{ $t("update_email") }}
                        </div>
                    </div>
                    <div id="email_collapse" class="collapse bg-white border" data-parent="#accordion">
                        <form v-on:submit.prevent="updateEmail()">
                            <div class="modal-body"> 
                        
                                <div class="form-row">    

                                    <div class="col-md-4 mb-3">   
                                        <div class="input-group outline-group mobile-number"> 
                                            <input :type="(showPass) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="cur-pass-for-email" v-model="email.current" required>
                                            <label for="cur-pass-for-email">{{ $t("current_password") }}</label>  
                                            <div class="input-group-append">
                                                <span class="input-group-text cursor-pointer" @click="showPass = !showPass" :title="( showPass ) ? $t('hide_pass') : $t('show_pass')">
                                                    <i :class="showPass ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                </span>
                                            </div>
                                        </div><!-- /.input-group outline-group mobile-number --> 
                                    </div><!--  /.col-md-4 -->  

                                    <div class="col-md-4 outline-group mb-3">
                                        <input placeholder=" " type="text" class="form-control outline" id="email" v-model="email.email" required>
                                        <label for="email">{{ $t("new_email") }}</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-4 outline-group mb-3">
                                        <input placeholder=" " type="text" class="form-control outline" id="email_confirmation" v-model="email.email_confirmation" required>
                                        <label for="email_confirmation">{{ $t("confirm_email") }}</label>
                                    </div><!--  /.col-md-4 mb-3 -->  
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div v-can="'setting-security-edit'" class="modal-footer"> 
                                <button class="btn btn-primary" type="submit">{{ $t("update_email") }}</button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.collapse -->  
                </div><!--  /.list-group --> 

                <div class="list-group mb-2">
                    <div class="list-group-item cursor-pointer">
                       <div class="panel-heading collapsed" data-toggle="collapse" data-target="#username_collapse" aria-expanded="true" aria-controls="username_collapse">
                            {{ $t("update_username") }}
                        </div>
                    </div>

                    <div id="username_collapse" class="collapse bg-white border" data-parent="#accordion">
                        <form v-on:submit.prevent="updateUsername()">
                            <div class="modal-body"> 
                        
                                <div class="form-row">   
                                    <div class="col-md-4 mb-3">   
                                        <div class="input-group outline-group mobile-number"> 
                                            <input :type="(showPass) ? 'text' : 'password'" placeholder=" " autocomplete="off" class="form-control outline" id="cur-pass-for-uname" v-model="username.current" required>
                                            <label for="cur-pass-for-uname">{{ $t("current_password") }}</label>  
                                            <div class="input-group-append">
                                                <span class="input-group-text cursor-pointer" @click="showPass = !showPass" :title="( showPass ) ? $t('hide_pass') : $t('show_pass')">
                                                    <i :class="showPass ? 'icon-eye-off' : 'icon-eye'" ></i>
                                                </span>
                                            </div>
                                        </div><!-- /.input-group outline-group mobile-number --> 
                                    </div><!--  /.col-md-4 -->  

                                    <div class="col-md-4 outline-group mb-3">
                                        <input placeholder=" " type="text" class="form-control outline" id="username" v-model="username.username" required>
                                        <label for="username">{{ $t("new_username") }}</label>
                                    </div><!--  /.col-md-4 mb-3 --> 

                                    <div class="col-md-4 outline-group mb-3">
                                        <input placeholder=" " type="text" class="form-control outline" id="username_confirmation" v-model="username.username_confirmation" required>
                                        <label for="username_confirmation">{{ $t("confirm_username") }}</label>
                                    </div><!--  /.col-md-4 mb-3 -->  
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div v-can="'setting-security-edit'" class="modal-footer"> 
                                <button class="btn btn-primary" type="submit">{{ $t("update_username") }}</button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.collapse -->  
                </div><!--  /.list-group --> 

            </div><!-- /#accordion  -->    
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script>    
export default { 
    data() {
        return {    
            showPass: false, 
            showPin: false, 
            otp_loaded: false,
            pin_recovery_loaded: false,
            pin_recovery_exist: false,
            pin_email_exist: false,
            otp: {
                verify_code: null, 
                current_pass: null, 
            },
            two_fa: { 
                user_id: null,
                google2fa_enable: null,
                google2fa_qr: null,
                google2fa_secret_key: null,
            },
            password: {
                current: '',   
                password: '', 
                password_confirmation: '',                       
            },
            passwordConst: {
                current: '',   
                password: '', 
                password_confirmation: '',                       
            },
            pin: {
                current: '',   
                pin: '', 
                pin_confirmation: '',                       
            }, 
            pinConst: {
                current: '',   
                pin: '', 
                pin_confirmation: '',                       
            },  
            pin_reset_email: {
                type: '',   
                current_pass: '',   
                pin: '', 
                pin_confirmation: '', 
                otp_code: '',                      
            },
            pin_reset_otp: {
                type: '',   
                current_pass: '',   
                pin: '', 
                pin_confirmation: '', 
                otp_code: '',                      
            },
            pin_resetConst: {
                type: '',   
                current_pass: '',   
                pin: '', 
                pin_confirmation: '', 
                otp_code: '',                      
            },
            mobile: {
                current: '',   
                mobile: '', 
                mobile_confirmation: '',                       
            },
            mobileConst: {
                current: '',   
                mobile: '', 
                mobile_confirmation: '',                       
            }, 
            username: {
                current: '',   
                username: '', 
                username_confirmation: '',                       
            },
            usernameConst: {
                current: '',   
                username: '', 
                username_confirmation: '',                       
            }, 
            email: {
                current: '',   
                email: '', 
                email_confirmation: '',                       
            },
            emailConst: {
                current: '',   
                email: '', 
                email_confirmation: '',                       
            },  
        }
    },  
    created() {
        this.two_fa_info(); 
        this.getPinGenerateCode(); 
    }, 
    mounted() {   
        this.$root.popupModal(); 
        this.accordion(); 
    },
    methods: {  
        accordion() {
            var collapse_item = document.querySelectorAll("[data-toggle='collapse']"); 
            // When the user clicks the button, open the modal
            for (var i = 0; i < collapse_item.length; i++) {
                collapse_item[i].onclick = function(e) {
                    e.preventDefault();
                    //console.log(this.getAttribute("data-target"))
                    let modal = document.querySelector(this.getAttribute("data-target"));
                    //console.log(modal)
                    //modal.style.display = "block";
                    if (modal.classList.contains('show')) {
                       modal.classList.remove('show');
                       return;
                    }

                    var accordions = document.querySelectorAll('.collapse.show');
                    for (var i = 0; i < accordions.length; i++) {
                      accordions[i].classList.remove('show');
                    }

                    modal.classList.add("show");
                }
            }
        },
        two_fa_info() { 
            var app = this; 
            
            axios.get('/2fa')
                .then( resp => {    
                    app.two_fa = resp.data.two_fa;                    
                    app.otp_loaded = true;
                }) 
        }, 
        generateKey() { 
            var app = this; 
            
            axios.post('/generate2faSecret', this.otp)
                .then( resp => {    
                    this.two_fa_info();   
                    app.$store.commit('submitMsg', 'You have successfully generated');                         
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        }, 
        otpEnable() { 
            var app = this; 
            
            axios.post('/2fa', this.otp)
                .then( resp => {   
                    app.two_fa_info(); 
                    app.$store.commit('submitMsg', 'You have successfully enabled');                        
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        }, 
        otpDisable() { 
            var app = this; 
            
            axios.post('/disable2fa', this.otp)
                .then( resp => {   
                    app.two_fa_info(); 
                    app.$store.commit('submitMsg', 'You have successfully disabled');                        
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        },
        updatePassword() { 
            var app = this;
            var newPassword = app.password;
            axios.post('/api/v1/security/password-update', newPassword)
                .then( resp => { 
                    app.$store.commit('submitMsg', 'update'); 
                    this.password = this.passwordConst;    
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        },  
        updatePin() { 
            var app = this;
            var newPin = app.pin;
            axios.post('/api/v1/security/pin-update', newPin)
                .then( resp => { 
                    app.$store.commit('submitMsg', 'update'); 
                    this.pin = this.pinConst;  
                })
                .catch( resp => { 
                    app.$store.commit('errorMessages', resp); 
                });
        },
        getPinGenerateCode() { 
            var app = this; 
            
            axios.get('/api/v1/security/pin-generate-code')
                .then( resp => {   
                    if ( resp.data.pin_reset ) {
                        app.pin_recovery_exist = true;
                    }    

                    if ( resp.data.email_exits ) {
                        app.pin_email_exist = true;
                    }  

                    app.pin_recovery_loaded = true;
                }) 
        },
        pinGenerateCode() {  
            var app = this;
            axios.post('/api/v1/security/pin-generate-code', app.pin_reset_email)
                .then( resp => {  
                    app.pin_reset_email = app.pin_resetConst;
                    this.getPinGenerateCode();   
                    app.$store.commit('submitMsg', 'You have successfully generated');                         
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        },
        pinReset( type ) {  
            var app = this; 
            var resetData = ( type == 'email' ) ? app.pin_reset_email :  app.pin_reset_otp;
                resetData.type = type;
            axios.post('/api/v1/security/pin-reset', resetData)
                .then( resp => {  
                    if ( type == 'email' ) {
                        app.pin_reset_email = app.pin_resetConst;
                    } else {
                        app.pin_reset_otp = app.pin_resetConst;
                    }
                    
                    app.$store.commit('submitMsg', 'update');  
                })
                .catch( resp => { 
                    app.$store.commit('errorMessages', resp); 
                });
        },
        updateMobile() { 
            var app = this;
            var newMobile = app.mobile;
            axios.post('/api/v1/security/mobile-update', newMobile)
                .then( resp => { 
                    app.$store.commit('submitMsg', 'update'); 
                    this.mobile = this.pinConst;  
                })
                .catch( resp => { 
                    app.$store.commit('errorMessages', resp); 
                });
        },
        updateUsername() { 
            var app = this;
            var newUsername = app.username;
            axios.post('/api/v1/security/username-update', newUsername)
                .then( resp => { 
                    app.$store.commit('submitMsg', 'update'); 
                    this.username = this.usernameConst;  
                })
                .catch( resp => { 
                    app.$store.commit('errorMessages', resp); 
                });
        },
        updateEmail() { 
            var app = this;
            var newEmail = app.email;
            axios.post('/api/v1/security/email-update', newEmail)
                .then( resp => { 
                    app.$store.commit('submitMsg', 'update'); 
                    this.email = this.emailConst;  
                })
                .catch( resp => { 
                    app.$store.commit('errorMessages', resp); 
                });
        },
    }, //methods
     i18n: { // `i18n` option, setup locale info for component
        messages: {
            /*en: () => import('./local/en.json'), // not working
            en: require('./local/en.json'),*/
            en: { 
                enabl_two_factor: 'To Enable Two Factor Authentication on your Account, you need to do following steps', 
                click_on_generate: 'Click on Generate Secret Button , To Generate a Unique secret QR code for your profile', 
                verify_the_otp: 'Verify the OTP from Google Authenticator Mobile App', 
                disable_otp: 'Disable OTP', 
                otp: 'Two Factor Authentication', 
                    verify_otp: 'Veriry OTP', 
                security: 'Two factor authentication (2FA) strengthens access security by requiring two methods (also referred to as factors) to verify your identity. Two factor authentication protects against phishing, social engineering and password brute force attacks and secures your logins from attackers exploiting weak or stolen credentials.', 
                generated_new_qr_code: 'Generate New QR Code', 
                generated_qr_code: 'Generated QR Code', 
                scan_qr: 'Scan this QR code by google authenticator app', 
                your_one_mobile: 'Or, If you want to add from your own mobile', 
                enable_opt: 'Enable OTP', 
                enter_code: 'Enter Code', 
                email_reset_pin: 'To reset pin, you need to set email or active Two Factor Authentication.', 
                recovery_code: 'Send Recovery Code To E-mail', 
                e_r_c: 'Enter Recovery Code', 
                reset_pin: 'Reset Pin', 
                recover_otp: 'Or you can recover your code by OTP', 
                enter_otp_code: 'Enter OTP Code', 
                //password
                    current_password: 'Current Password', 
                    new_password: 'New Password', 
                    confirm_password: 'Confirm Password', 
                    update_password: 'Update Password',
                    show_pass: 'Show Password', 
                    hide_pass: 'Hide Password', 
                //pin
                    current_pin: 'Current Pin',
                    new_pin: 'New Pin',
                    confirm_pin: 'Confirm Pin',
                    update_pin: 'Update Pin',

                    show_pin: 'Show Pin', 
                    hide_pin: 'Hide Pin',  
                //forgot update
                    forgot_pin: 'Forgot Pin',
                //mobile 
                    new_mobile: 'New Mobile',
                    confirm_mobile: 'Confirm Mobile',
                    update_mobile: 'Update Mobile',
                //username 
                    new_username: 'New Username',
                    confirm_username: 'Confirm Username',
                    update_username: 'Update Username',
                //email 
                    new_email: 'New Email',
                    confirm_email: 'Confirm Email',
                    update_email: 'Update Email',
            },
            bn: { 
                enabl_two_factor: 'আপনার অ্যাকাউন্টে দুটি ফ্যাক্টর প্রমাণীকরণ সক্ষম করতে, আপনাকে নিম্নলিখিত পদক্ষেপগুলি করতে হবে', 
                click_on_generate: 'জেনারেট সিক্রেট বোতামটিতে ক্লিক করুন, আপনার প্রোফাইলের জন্য একটি অনন্য গোপন কিউআর কোড তৈরি করতে', 
                verify_the_otp: 'গুগল প্রমাণীকরণকারী মোবাইল অ্যাপ্লিকেশন থেকে ওটিপি যাচাই করুন', 
                disable_otp: 'অক্ষম OTP',
                otp: 'লগিন দুই ধাপে যাচাই', 
                    verify_otp: 'যাচাই এককালিন পাসওয়ার্ড', 
                security: 'দুই ধাপে পরিচয়পত্র যাচাই আপনার একাউন্টের নিরাপত্তাকে অনেক বেশি সুরক্ষীত ও শক্তিশালী করে। আপনার পাসওয়ার্ড অন্য কেউ জেনে গেলেও আপনার একাউন্টে ডুকতে পারবে না এবং এটি আপনাকে বিভিন্ন হ্যাকার এবং হ্যাকিং টুল হতে সুরক্ষীত রাখবে।', 
                generated_new_qr_code: 'জেনারেট নতুন QR কোড',  
                generated_qr_code: 'জেনারেট QR কোড',  
                scan_qr: 'Google Authenticator অ্যাপ দ্বারা এই QR কোডটি স্ক্যান করুন',  
                your_one_mobile: 'অথবা, আপনি যদি নিজের মোবাইল থেকে যুক্ত করতে চান',  
                enable_opt: 'OTP চালূ করুন', 
                enter_code: 'কোড লিখুন', 
                email_reset_pin: 'পিনটি পুনরায় সেট করতে আপনার ইমেল বা সক্রিয় দুটি Factor Authentication সেট করতে হবে।', 
                recovery_code: 'ই-মেইলে রিকভারি কোডটি পাঠান', 
                e_r_c: 'রিকভারি কোড প্রবেশ করান', 
                reset_pin: 'পিন পরিবর্তন', 
                recover_otp: 'অথবা আপনি ওটিপি দ্বারা আপনার কোডটি পুনরুদ্ধার করতে পারেন', 
                enter_otp_code: 'OTP কোড লিখুন', 
                //password
                    current_password: 'বর্তমান পাসওয়ার্ড', 
                    new_password: 'নতুন পাসওয়ার্ড', 
                    confirm_password: 'পাসওয়ার্ড নিশ্চিত করুন',
                    update_password: 'পাসওয়ার্ড পরিবর্তন',
                    show_pass: 'পাসওয়ার্ড দেখুন', 
                    hide_pass: 'পাসওয়ার্ড অদৃশ্য',
                //pin
                    current_pin: 'বর্তমান পিন',
                    new_pin: 'নতুন পিন',
                    confirm_pin: 'পিন নিশ্চিত করুন',
                    update_pin: 'পিন পরিবর্তন',
                    show_pin: 'পিন দেখুন', 
                    hide_pin: 'পিন অদৃশ্য',
                //forgot update
                    forgot_pin: 'পিন ভূলে গেছি',
                //mobile 
                    new_mobile: 'নতুন মোবাইল',
                    confirm_mobile: 'মোবাইল নিশ্চিত করুন',
                    update_mobile: 'মোবাইল পরিবর্তন',
                //username 
                    new_username: 'নতুন ইউজার নাম',
                    confirm_username: 'ইউজার নাম নিশ্চিত করুন',
                    update_username: 'ইউজার নাম পরিবর্তন',
                //email 
                    new_email: 'নতুন ইমেইল',
                    confirm_email: 'ইমেইল নিশ্চিত করুন',
                    update_email: 'ইমেইল পরিবর্তন',
            },  
        }
    },
} //export default
</script>

<style lang="scss" scoped> 
    /* Accordion with arrow */ 
    #accordion .panel-heading {
      position: relative;
    }
    #accordion .panel-heading[data-toggle="collapse"]:after {
      content: "\f106";  
      font-family: fontello;  
      position: absolute; 
      font-size: 18px;
      line-height: 22px;
      right: 0;
      top: calc(50% - 10px);
      transition: all 0.5s; 
    }
    #accordion .panel-heading[data-toggle="collapse"].collapsed:after { 
      -webkit-transform: rotate(180deg);
      -moz-transform:    rotate(180deg);
      -ms-transform:     rotate(180deg);
      -o-transform:      rotate(180deg);
      transform:         rotate(180deg);
    }
</style>