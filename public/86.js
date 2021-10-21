webpackJsonp([86],{

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(538)
/* template */
var __vue_template__ = __webpack_require__(539)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\admin\\views\\setting\\mt\\security\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-86becbd6", Component.options)
  } else {
    hotAPI.reload("data-v-86becbd6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            dateOptions: this.$store.state.dateOptions,
            otp_loading: false,
            otp: {
                verify_code: null,
                current_pass: null
            },
            two_fa: {
                user_id: null,
                google2fa_enable: null,
                google2fa_qr: null,
                google2fa_secret_key: null
            },
            password: {
                current: '',
                password: '',
                password_confirmation: ''
            },
            passwordConst: {
                current: '',
                password: '',
                password_confirmation: ''
            },
            pin: {
                current: '',
                pin: '',
                pin_confirmation: ''
            },
            pinConst: {
                current: '',
                pin: '',
                pin_confirmation: ''
            },
            mobile: {
                current: '',
                mobile: '',
                mobile_confirmation: ''
            },
            mobileConst: {
                current: '',
                mobile: '',
                mobile_confirmation: ''
            },
            username: {
                current: '',
                username: '',
                username_confirmation: ''
            },
            usernameConst: {
                current: '',
                username: '',
                username_confirmation: ''
            },
            email: {
                current: '',
                email: '',
                email_confirmation: ''
            },
            emailConst: {
                current: '',
                email: '',
                email_confirmation: ''
            }
        };
    },
    created: function created() {
        this.two_fa_info();
    },

    methods: {
        two_fa_info: function two_fa_info() {
            var app = this;

            axios.get('/2fa').then(function (resp) {
                app.two_fa = resp.data.two_fa;
                app.otp_loading = true;
            });
        },
        generateKey: function generateKey() {
            var _this = this;

            var app = this;

            axios.post('/generate2faSecret', this.otp).then(function (resp) {
                _this.two_fa_info();
                app.$store.commit('submitMsg', 'You have successfully generated');
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        },
        otpEnable: function otpEnable() {
            var app = this;

            axios.post('/2fa', this.otp).then(function (resp) {
                app.two_fa_info();
                app.$store.commit('submitMsg', 'You have successfully enabled');
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        },
        otpDisable: function otpDisable() {
            var app = this;

            axios.post('/disable2fa', this.otp).then(function (resp) {
                app.two_fa_info();
                app.$store.commit('submitMsg', 'You have successfully disabled');
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        },
        updatePassword: function updatePassword() {
            var _this2 = this;

            var app = this;
            var newPassword = app.password;
            axios.post('/api/v1/password-update', newPassword).then(function (resp) {
                app.$store.commit('submitMsg', 'update');
                _this2.password = _this2.passwordConst;
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        },
        updatePin: function updatePin() {
            var _this3 = this;

            var app = this;
            var newPin = app.pin;
            axios.post('/api/v1/pin-update', newPin).then(function (resp) {
                app.$store.commit('submitMsg', 'update');
                _this3.pin = _this3.pinConst;
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        },
        updateMobile: function updateMobile() {
            var _this4 = this;

            var app = this;
            var newMobile = app.mobile;
            axios.post('/api/v1/mobile-update', newMobile).then(function (resp) {
                app.$store.commit('submitMsg', 'update');
                _this4.mobile = _this4.pinConst;
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        },
        updateUsername: function updateUsername() {
            var _this5 = this;

            var app = this;
            var newUsername = app.username;
            axios.post('/api/v1/username-update', newUsername).then(function (resp) {
                app.$store.commit('submitMsg', 'update');
                _this5.username = _this5.usernameConst;
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        },
        updateEmail: function updateEmail() {
            var _this6 = this;

            var app = this;
            var newEmail = app.email;
            axios.post('/api/v1/email-update', newEmail).then(function (resp) {
                app.$store.commit('submitMsg', 'update');
                _this6.email = _this6.emailConst;
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        }
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            /*en: () => import('./local/en.json'), // not working
            en: require('./local/en.json'),*/
            en: {
                otp: 'Two Factor Authentication',
                verify_otp: 'Veriry OTP',
                security: 'Two factor authentication (2FA) strengthens access security by requiring two methods (also referred to as factors) to verify your identity. Two factor authentication protects against phishing, social engineering and password brute force attacks and secures your logins from attackers exploiting weak or stolen credentials.',
                generated_new_qr_code: 'Generate New QR Code',
                scan_qr: 'Scan this QR code by google authenticator app',
                your_one_mobile: 'Or, If you want to add from your own mobile',
                enable_opt: 'Enter OTP',
                enter_code: 'Enter Code',
                password: 'Password',
                current_password: 'Current Password',
                new_password: 'New Password',
                confirm_password: 'Confirm Password',
                update_password: 'Update Password',
                pin: 'Pin',
                current_pin: 'Current Pin',
                new_pin: 'New Pin',
                confirm_pin: 'Confirm Pin',
                update_pin: 'Update Pin',
                mobile: 'Mobile',
                current_mobile: 'Current Mobile',
                new_mobile: 'New Mobile',
                confirm_mobile: 'Confirm Mobile',
                update_mobile: 'Update Mobile',
                username: 'Username',
                current_username: 'Current Username',
                new_username: 'new Username',
                confirm_username: 'Confirm Username',
                update_username: 'Update Username',
                email: 'Email',
                current_email: 'Current Email',
                new_email: 'New Email',
                confirm_email: 'Confirm Email',
                update_email: 'Update Email'
            },
            bn: {
                otp: 'লগিন দুই ধাপে যাচাই',
                verify_otp: 'যাচাই এককালিন পাসওয়ার্ড',
                security: 'দুটি পরিচয়পত্রের প্রমাণীকরণ (2 এফএ) আপনার পরিচয় যাচাই করার জন্য দুটি পদ্ধতি (কারণ হিসাবেও চিহ্নিত করা হয়) ব্যবহার করে অ্যাক্সেস সুরক্ষাকে শক্তিশালী করে। দুটি ফ্যাক্টর প্রমাণীকরণ ফিশিং, সোশ্যাল ইঞ্জিনিয়ারিং এবং পাসওয়ার্ড ব্রুট ফোর্স আক্রমণ থেকে রক্ষা করে এবং দুর্বল বা চুরি হওয়া শংসাপত্রগুলি ব্যবহার করে আক্রমণকারীদের থেকে আপনার লগইনগুলিকে সুরক্ষা দেয়।',
                generated_new_qr_code: 'জেনারেট নতুন QR কোড',
                scan_qr: 'গুগল অথেনটিকেটর অ্যাপ দ্বারা এই QR কোডটি স্ক্যান করুন',
                your_one_mobile: 'অথবা, আপনি যদি নিজের মোবাইল থেকে যুক্ত করতে চান',
                enter_code: 'কোড লিখুন',
                enable_opt: 'ওটিপি চালূ করুন',
                password: 'পাসওয়ার্ড',
                current_password: 'বর্তমান পাসওয়ার্ড',
                new_password: 'নতুন পাসওয়ার্ড',
                confirm_password: 'পাসওয়ার্ড নিশ্চিত করুন',
                update_password: 'পাসওয়ার্ড আপডেট করুন',
                pin: 'পিন',
                current_pin: 'বর্তমান পিন',
                new_pin: 'নতুন পিন',
                confirm_pin: 'পিন নিশ্চিত করুন',
                update_pin: 'আপডেট পিন',
                mobile: 'মোবাইল',
                current_mobile: 'বর্তমান মোবাইল',
                new_mobile: 'নতুন মোবাইল',
                confirm_mobile: 'মোবাইল নিশ্চিত করুন',
                update_mobile: 'মোবাইল আপডেট করুন',
                username: 'ইউজার নাম',
                current_username: 'বর্তমান ইউজার নাম',
                new_username: 'নতুন ইউজার নাম',
                confirm_username: 'ইউজার নাম নিশ্চিত করুন',
                update_username: 'ইউজার নাম আপডেট',
                email: 'ইমেইল',
                current_email: 'বর্তমান ইমেইল',
                new_email: 'নতুন ইমেইল',
                confirm_email: 'ইমেইল নিশ্চিত করুন',
                update_email: 'আপডেট ইমেইল'
            }
        }
    } //export default

});

/***/ }),

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "component" }, [
    _c("div", { staticClass: "component-body" }, [
      _c("div", { attrs: { id: "accordion" } }, [
        _c("div", { staticClass: "list-group mb-2" }, [
          _c("div", { staticClass: "list-group-item cursor-pointer" }, [
            _c(
              "div",
              {
                staticClass: "panel-heading collapsed",
                attrs: {
                  "data-toggle": "collapse",
                  "data-target": "#otp_collapse",
                  "aria-expanded": "true",
                  "aria-controls": "otp_collapse"
                }
              },
              [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.$t("otp")) +
                    "\n                    "
                )
              ]
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "collapse bg-white border",
              attrs: { id: "otp_collapse", "data-parent": "#accordion" }
            },
            [
              _c(
                "div",
                { staticClass: "modal-body" },
                [
                  _c("p", [_vm._v(_vm._s(_vm.$t("security")))]),
                  _vm._v(" "),
                  !_vm.two_fa.google2fa_qr &&
                  _vm.otp_loading &&
                  !_vm.two_fa.google2fa_enable
                    ? [
                        _c("p", [
                          _vm._v(
                            "To Enable Two Factor Authentication on your Account, you need to do following steps"
                          )
                        ]),
                        _vm._v(" "),
                        _vm._m(0)
                      ]
                    : _vm._e(),
                  _vm._v(" "),
                  _c("hr"),
                  _vm._v(" "),
                  _c("input", {
                    staticStyle: { display: "none" },
                    attrs: { type: "text", name: "fakeusernameremembered" }
                  }),
                  _vm._v(" "),
                  _c("input", {
                    staticStyle: { display: "none" },
                    attrs: { type: "password", name: "fakepasswordremembered" }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "form-row" },
                    [
                      !_vm.two_fa.google2fa_qr &&
                      _vm.otp_loading &&
                      !_vm.two_fa.google2fa_enable
                        ? _c("div", { staticClass: "col-md-6 mb-3" }, [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "input-group outline-group mobile-number"
                              },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.otp.current_pass,
                                      expression: "otp.current_pass"
                                    }
                                  ],
                                  staticClass: "form-control outline",
                                  attrs: {
                                    placeholder: " ",
                                    type: "password",
                                    id: "cur_pass"
                                  },
                                  domProps: { value: _vm.otp.current_pass },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.otp,
                                        "current_pass",
                                        $event.target.value
                                      )
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("label", { attrs: { for: "cur_pass" } }, [
                                  _vm._v("Current Password")
                                ]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "input-group-append" },
                                  [
                                    _c(
                                      "span",
                                      {
                                        staticClass: "btn btn-primary",
                                        on: {
                                          click: function($event) {
                                            _vm.generateKey()
                                          }
                                        }
                                      },
                                      [_vm._v("Generated QR Code")]
                                    )
                                  ]
                                )
                              ]
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.two_fa.google2fa_qr
                        ? [
                            _c("div", { staticClass: "col-md-12 mb-4 mt-3" }, [
                              _c("div", { staticClass: "form-row" }, [
                                _c("div", { staticClass: "col-md-6" }, [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "input-group outline-group mobile-number"
                                    },
                                    [
                                      _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.otp.current_pass,
                                            expression: "otp.current_pass"
                                          }
                                        ],
                                        staticClass: "form-control outline",
                                        attrs: {
                                          placeholder: " ",
                                          type: "password",
                                          id: "cur_pass"
                                        },
                                        domProps: {
                                          value: _vm.otp.current_pass
                                        },
                                        on: {
                                          input: function($event) {
                                            if ($event.target.composing) {
                                              return
                                            }
                                            _vm.$set(
                                              _vm.otp,
                                              "current_pass",
                                              $event.target.value
                                            )
                                          }
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c(
                                        "label",
                                        { attrs: { for: "cur_pass" } },
                                        [
                                          _vm._v(
                                            _vm._s(_vm.$t("current_password"))
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "input-group-append" },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass: "btn btn-primary",
                                              on: {
                                                click: function($event) {
                                                  _vm.generateKey()
                                                }
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "generated_new_qr_code"
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    ]
                                  )
                                ])
                              ])
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-md-6 mb-3" }, [
                              _c("p", [_vm._v(_vm._s(_vm.$t("scan_qr")))]),
                              _vm._v(" "),
                              _c("img", {
                                attrs: {
                                  src: _vm.two_fa.google2fa_qr,
                                  alt: "2fa image"
                                }
                              })
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-md-6 mb-3" }, [
                              _c("p", [
                                _vm._v(_vm._s(_vm.$t("your_one_mobile")))
                              ]),
                              _vm._v(" "),
                              _c("strong", [_vm._v("Account name: ")]),
                              _vm._v(
                                " OZ_MT " +
                                  _vm._s(_vm.two_fa.user_id) +
                                  " \n                                    "
                              ),
                              _c("br"),
                              _vm._v(" "),
                              _c("strong", [_vm._v("Secret Key: ")]),
                              _vm._v(
                                _vm._s(_vm.two_fa.google2fa_secret_key) + " "
                              ),
                              _c("br")
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-md-6 mb-4 " }, [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "input-group outline-group mobile-number"
                                },
                                [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.otp.verify_code,
                                        expression: "otp.verify_code"
                                      }
                                    ],
                                    staticClass: "form-control outline",
                                    attrs: {
                                      placeholder: " ",
                                      type: "text",
                                      id: "otp"
                                    },
                                    domProps: { value: _vm.otp.verify_code },
                                    on: {
                                      input: function($event) {
                                        if ($event.target.composing) {
                                          return
                                        }
                                        _vm.$set(
                                          _vm.otp,
                                          "verify_code",
                                          $event.target.value
                                        )
                                      }
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("label", { attrs: { for: "otp" } }, [
                                    _vm._v(_vm._s(_vm.$t("enter_code")))
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "input-group-append" },
                                    [
                                      _c(
                                        "span",
                                        {
                                          staticClass: "btn btn-primary",
                                          on: {
                                            click: function($event) {
                                              _vm.otpEnable()
                                            }
                                          }
                                        },
                                        [_vm._v(_vm._s(_vm.$t("enable_opt")))]
                                      )
                                    ]
                                  )
                                ]
                              )
                            ])
                          ]
                        : _vm._e()
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _vm.otp_loading && _vm.two_fa.google2fa_enable
                    ? _c("div", { staticClass: "form-row" }, [
                        _c("div", { staticClass: "col-md-4 mb-4" }, [
                          _c(
                            "div",
                            {
                              staticClass:
                                "input-group outline-group mobile-number"
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.otp.current_pass,
                                    expression: "otp.current_pass"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "password",
                                  id: "cur_pass"
                                },
                                domProps: { value: _vm.otp.current_pass },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.otp,
                                      "current_pass",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "cur_pass" } }, [
                                _vm._v("Current Password")
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "input-group-append" }, [
                                _c(
                                  "span",
                                  {
                                    staticClass: "btn btn-primary",
                                    on: {
                                      click: function($event) {
                                        _vm.otpDisable()
                                      }
                                    }
                                  },
                                  [_vm._v("Disable OTP")]
                                )
                              ])
                            ]
                          )
                        ])
                      ])
                    : _vm._e()
                ],
                2
              )
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "list-group mb-2" }, [
          _c("div", { staticClass: "list-group-item cursor-pointer" }, [
            _c(
              "div",
              {
                staticClass: "panel-heading collapsed",
                attrs: {
                  "data-toggle": "collapse",
                  "data-target": "#password_collapse",
                  "aria-expanded": "true",
                  "aria-controls": "password_collapse"
                }
              },
              [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.$t("password")) +
                    "\n                    "
                )
              ]
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "collapse bg-white border",
              attrs: { id: "password_collapse", "data-parent": "#accordion" }
            },
            [
              _c(
                "form",
                {
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      _vm.updatePassword()
                    }
                  }
                },
                [
                  _c("div", { staticClass: "modal-body" }, [
                    _c("div", { staticClass: "form-row" }, [
                      _c(
                        "div",
                        { staticClass: "col-md-4 outline-group mb-3" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.password.current,
                                expression: "password.current"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "text",
                              id: "current-password"
                            },
                            domProps: { value: _vm.password.current },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.password,
                                  "current",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "current-password" } }, [
                            _vm._v(_vm._s(_vm.$t("current_password")))
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-md-4 outline-group mb-3" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.password.password,
                                expression: "password.password"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "text",
                              id: "password",
                              required: ""
                            },
                            domProps: { value: _vm.password.password },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.password,
                                  "password",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "password" } }, [
                            _vm._v(_vm._s(_vm.$t("new_password")))
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-md-4 outline-group mb-3" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.password.password_confirmation,
                                expression: "password.password_confirmation"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "text",
                              id: "password_confirmation",
                              required: ""
                            },
                            domProps: {
                              value: _vm.password.password_confirmation
                            },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.password,
                                  "password_confirmation",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "password_confirmation" } },
                            [_vm._v(_vm._s(_vm.$t("confirm_password")))]
                          )
                        ]
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "can",
                          rawName: "v-can",
                          value: "setting-security-edit",
                          expression: "'setting-security-edit'"
                        }
                      ],
                      staticClass: "modal-footer"
                    },
                    [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-primary",
                          attrs: { type: "submit" }
                        },
                        [_vm._v(_vm._s(_vm.$t("update_password")))]
                      )
                    ]
                  )
                ]
              )
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "list-group mb-2" }, [
          _c("div", { staticClass: "list-group-item cursor-pointer" }, [
            _c(
              "div",
              {
                staticClass: "panel-heading collapsed",
                attrs: {
                  "data-toggle": "collapse",
                  "data-target": "#pin_collapse",
                  "aria-expanded": "true",
                  "aria-controls": "pin_collapse"
                }
              },
              [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.$t("pin")) +
                    "\n                    "
                )
              ]
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "collapse bg-white border",
              attrs: { id: "pin_collapse", "data-parent": "#accordion" }
            },
            [
              _c(
                "form",
                {
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      _vm.updatePin()
                    }
                  }
                },
                [
                  _c("div", { staticClass: "modal-body" }, [
                    _c("div", { staticClass: "form-row" }, [
                      _c(
                        "div",
                        { staticClass: "col-md-4 outline-group mb-3" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.pin.current,
                                expression: "pin.current"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "password",
                              id: "current-pin"
                            },
                            domProps: { value: _vm.pin.current },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.pin,
                                  "current",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "current-pin" } }, [
                            _vm._v(_vm._s(_vm.$t("current_pin")))
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-md-4 outline-group mb-3" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.pin.pin,
                                expression: "pin.pin"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "password",
                              id: "pin",
                              required: ""
                            },
                            domProps: { value: _vm.pin.pin },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(_vm.pin, "pin", $event.target.value)
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "pin" } }, [
                            _vm._v(_vm._s(_vm.$t("new_pin")))
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-md-4 outline-group mb-3" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.pin.pin_confirmation,
                                expression: "pin.pin_confirmation"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "password",
                              id: "pin_confirmation",
                              required: ""
                            },
                            domProps: { value: _vm.pin.pin_confirmation },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.pin,
                                  "pin_confirmation",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "pin_confirmation" } }, [
                            _vm._v(_vm._s(_vm.$t("confirm_pin")))
                          ])
                        ]
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "can",
                          rawName: "v-can",
                          value: "setting-security-edit",
                          expression: "'setting-security-edit'"
                        }
                      ],
                      staticClass: "modal-footer"
                    },
                    [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-primary",
                          attrs: { type: "submit" }
                        },
                        [_vm._v(_vm._s(_vm.$t("update_pin")))]
                      )
                    ]
                  )
                ]
              )
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "list-group mb-2" }, [
          _c("div", { staticClass: "list-group-item cursor-pointer" }, [
            _c(
              "div",
              {
                staticClass: "panel-heading collapsed",
                attrs: {
                  "data-toggle": "collapse",
                  "data-target": "#mobile_collapse",
                  "aria-expanded": "true",
                  "aria-controls": "mobile_collapse"
                }
              },
              [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.$t("mobile")) +
                    "\n                    "
                )
              ]
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "collapse bg-white border",
              attrs: { id: "mobile_collapse", "data-parent": "#accordion" }
            },
            [
              _c(
                "form",
                {
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      _vm.updateMobile()
                    }
                  }
                },
                [
                  _c("div", { staticClass: "modal-body" }, [
                    _c("div", { staticClass: "form-row" }, [
                      _c(
                        "div",
                        { staticClass: "col-md-4 outline-group mb-3" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.mobile.current,
                                expression: "mobile.current"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "number",
                              id: "current-mobile"
                            },
                            domProps: { value: _vm.mobile.current },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.mobile,
                                  "current",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "current-mobile" } }, [
                            _vm._v(_vm._s(_vm.$t("current_mobile")))
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-md-4 outline-group mb-3" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.mobile.mobile,
                                expression: "mobile.mobile"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "number",
                              id: "mobile",
                              required: ""
                            },
                            domProps: { value: _vm.mobile.mobile },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.mobile,
                                  "mobile",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "mobile" } }, [
                            _vm._v(_vm._s(_vm.$t("new_mobile")))
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-md-4 outline-group mb-3" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.mobile.mobile_confirmation,
                                expression: "mobile.mobile_confirmation"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "number",
                              id: "mobile_confirmation",
                              required: ""
                            },
                            domProps: { value: _vm.mobile.mobile_confirmation },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.mobile,
                                  "mobile_confirmation",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "mobile_confirmation" } },
                            [_vm._v(_vm._s(_vm.$t("confirm_mobile")))]
                          )
                        ]
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "can",
                          rawName: "v-can",
                          value: "setting-security-edit",
                          expression: "'setting-security-edit'"
                        }
                      ],
                      staticClass: "modal-footer"
                    },
                    [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-primary",
                          attrs: { type: "submit" }
                        },
                        [_vm._v(_vm._s(_vm.$t("update_mobile")))]
                      )
                    ]
                  )
                ]
              )
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "list-group mb-2" }, [
          _c("div", { staticClass: "list-group-item cursor-pointer" }, [
            _c(
              "div",
              {
                staticClass: "panel-heading collapsed",
                attrs: {
                  "data-toggle": "collapse",
                  "data-target": "#username_collapse",
                  "aria-expanded": "true",
                  "aria-controls": "username_collapse"
                }
              },
              [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.$t("username")) +
                    "\n                    "
                )
              ]
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "collapse bg-white border",
              attrs: { id: "username_collapse", "data-parent": "#accordion" }
            },
            [
              _c(
                "form",
                {
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      _vm.updateUsername()
                    }
                  }
                },
                [
                  _c("div", { staticClass: "modal-body" }, [
                    _c("div", { staticClass: "form-row" }, [
                      _c(
                        "div",
                        { staticClass: "col-md-4 outline-group mb-3" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.username.current,
                                expression: "username.current"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "text",
                              id: "current-username"
                            },
                            domProps: { value: _vm.username.current },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.username,
                                  "current",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "current-username" } }, [
                            _vm._v(_vm._s(_vm.$t("current_username")))
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-md-4 outline-group mb-3" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.username.username,
                                expression: "username.username"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "text",
                              id: "username",
                              required: ""
                            },
                            domProps: { value: _vm.username.username },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.username,
                                  "username",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "username" } }, [
                            _vm._v(_vm._s(_vm.$t("new_username")))
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-md-4 outline-group mb-3" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.username.username_confirmation,
                                expression: "username.username_confirmation"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "text",
                              id: "username_confirmation",
                              required: ""
                            },
                            domProps: {
                              value: _vm.username.username_confirmation
                            },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.username,
                                  "username_confirmation",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "username_confirmation" } },
                            [_vm._v(_vm._s(_vm.$t("confirm_username")))]
                          )
                        ]
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "can",
                          rawName: "v-can",
                          value: "setting-security-edit",
                          expression: "'setting-security-edit'"
                        }
                      ],
                      staticClass: "modal-footer"
                    },
                    [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-primary",
                          attrs: { type: "submit" }
                        },
                        [_vm._v(_vm._s(_vm.$t("update_username")))]
                      )
                    ]
                  )
                ]
              )
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "list-group mb-2" }, [
          _c("div", { staticClass: "list-group-item cursor-pointer" }, [
            _c(
              "div",
              {
                staticClass: "panel-heading collapsed",
                attrs: {
                  "data-toggle": "collapse",
                  "data-target": "#email_collapse",
                  "aria-expanded": "true",
                  "aria-controls": "email_collapse"
                }
              },
              [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.$t("email")) +
                    "\n                    "
                )
              ]
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "collapse bg-white border",
              attrs: { id: "email_collapse", "data-parent": "#accordion" }
            },
            [
              _c(
                "form",
                {
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      _vm.updateEmail()
                    }
                  }
                },
                [
                  _c("div", { staticClass: "modal-body" }, [
                    _c("div", { staticClass: "form-row" }, [
                      _c(
                        "div",
                        { staticClass: "col-md-4 outline-group mb-3" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.email.current,
                                expression: "email.current"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "text",
                              id: "current-email"
                            },
                            domProps: { value: _vm.email.current },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.email,
                                  "current",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "current-email" } }, [
                            _vm._v(_vm._s(_vm.$t("current_email")))
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-md-4 outline-group mb-3" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.email.email,
                                expression: "email.email"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "text",
                              id: "email",
                              required: ""
                            },
                            domProps: { value: _vm.email.email },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.email,
                                  "email",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "email" } }, [
                            _vm._v(_vm._s(_vm.$t("new_email")))
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-md-4 outline-group mb-3" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.email.email_confirmation,
                                expression: "email.email_confirmation"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "text",
                              id: "email_confirmation",
                              required: ""
                            },
                            domProps: { value: _vm.email.email_confirmation },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.email,
                                  "email_confirmation",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "email_confirmation" } },
                            [_vm._v(_vm._s(_vm.$t("confirm_email")))]
                          )
                        ]
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "can",
                          rawName: "v-can",
                          value: "setting-security-edit",
                          expression: "'setting-security-edit'"
                        }
                      ],
                      staticClass: "modal-footer"
                    },
                    [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-primary",
                          attrs: { type: "submit" }
                        },
                        [_vm._v(_vm._s(_vm.$t("update_email")))]
                      )
                    ]
                  )
                ]
              )
            ]
          )
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("strong", [
      _c("ol", [
        _c("li", [
          _vm._v(
            "Click on Generate Secret Button , To Generate a Unique secret QR code for your profile"
          )
        ]),
        _vm._v(" "),
        _c("li", [
          _vm._v("Verify the OTP from Google Authenticator Mobile App")
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-86becbd6", module.exports)
  }
}

/***/ })

});