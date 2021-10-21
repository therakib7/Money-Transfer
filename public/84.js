webpackJsonp([84],{

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(327)
/* template */
var __vue_template__ = __webpack_require__(330)
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
Component.options.__file = "resources\\assets\\js\\admin\\views\\users\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ed6848d8", Component.options)
  } else {
    hotAPI.reload("data-v-ed6848d8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 327:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    components: {
        'media': function media() {
            return __webpack_require__.e/* import() */(60/* duplicate */).then(__webpack_require__.bind(null, 309));
        }
    },
    data: function data() {
        return {
            dateOptions: this.$store.state.dateOptions,
            formType: false,
            user: {
                status: 1,
                name: null,
                email: null,
                password: '',
                password_confirmation: '',
                username: null,
                pin: null,
                mobile: null,
                role: [],
                profile: {
                    bday: null,
                    avatar: null,
                    avatar_src: null,
                    occupation: null,
                    nid: null,
                    birth_crt: null,
                    passport: null,
                    pre_address: null,
                    per_address: null
                }
            },
            userConst: {
                status: 1,
                name: null,
                email: null,
                password: '',
                password_confirmation: '',
                username: null,
                pin: null,
                mobile: null,
                role: [],
                profile: {
                    bday: null,
                    avatar: null,
                    avatar_src: null,
                    occupation: null,
                    nid: null,
                    birth_crt: null,
                    passport: null,
                    pre_address: null,
                    per_address: null
                }
            },
            userSearch: {
                status: '',
                username: '',
                email: '',
                mobile: '',
                date_from: '',
                date_to: '',
                order_by: ''
            },
            users: {},
            roles: [],
            perPage: this.$route.query.per_page,
            perPageOptions: this.$store.state.perPageOptions,
            noData: '',
            preloader: true
        };
    },

    watch: {
        perPage: function perPage(val) {
            var page = this.$route.query.page;
            this.$router.push({ path: document.location.search, query: { page: page, per_page: val } });
            this.getLists();
        }
    },
    created: function created() {
        this.getLists();

        var per_page = this.$route.query.per_page;

        var perPageOptions = this.perPageOptions.find(function (ele) {
            return ele.value == per_page;
        });

        if (!perPageOptions) {
            this.perPageOptions.splice(0, 0, { text: per_page, value: per_page });
        }
    },

    methods: {
        avatarInsert: function avatarInsert(data) {
            this.user.profile.avatar = data.id;
            this.user.profile.avatar_src = '/uploads/imgs/' + data.resized_name;
        },
        avatarRemove: function avatarRemove() {
            this.user.profile.avatar = null;
            this.user.profile.avatar_src = null;
        },
        dataSearch: function dataSearch() {
            var data_search = this.userSearch;
            var query = {};
            data_search.date_from = data_search.date_from ? data_search.date_from.toString() : '';
            data_search.date_to = data_search.date_to ? data_search.date_to.toString() : '';

            for (var key in data_search) {
                if (data_search[key]) {
                    query[key] = data_search[key];
                } else {
                    if (this.$route.query[key]) {
                        query[key] = '';
                    }
                }
            }
            this.$router.push({ path: document.location.search, query: query });
            this.getLists();
        },
        getLists: function getLists() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var click = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


            var app = this;
            var per_page = this.$route.query.per_page;

            var current_page = click ? page : this.$route.query.page;
            if (click) {
                this.$router.push({ path: document.location.search, query: { page: current_page, per_page: per_page } });
            }

            var allQuery = this.$route.query;

            var queryString = Object.keys(allQuery).map(function (key) {
                return key + '=' + allQuery[key];
            }).join('&');

            axios.get('/api/v1/users?' + queryString).then(function (resp) {
                app.preloader = false;

                app.users = resp.data.users;
                app.roles = resp.data.roles;
                if (app.users.data.length == 0) {
                    app.noData = app.$store.state.noData;
                } else {
                    app.noData = '';
                }
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        },
        newForm: function newForm() {
            this.formType = true;
            this.user = this.userConst;
        },
        saveForm: function saveForm() {
            var _this = this;

            $('#createModal').modal('toggle');
            var app = this;
            var newUser = app.user;
            if (this.formType) {
                axios.post('/api/v1/users', newUser).then(function (resp) {
                    _this.user = _this.userConst;
                    app.$store.commit('submitMsg', 'add');
                    app.getLists();
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            } else {
                axios.patch('/api/v1/users/' + newUser.id, newUser).then(function (resp) {
                    app.$store.commit('submitMsg', 'update');
                    app.getLists();
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            }
        },
        editForm: function editForm(user) {
            this.formType = false;
            this.user = user;
            this.user.role = this.user.role[0];
            /* null unique field, for checking unique users */
            this.user.username = null;
            this.user.email = null;
            this.user.mobile = null;
            if (user.profile.avatar_src) {
                this.user.profile.avatar_src = '/uploads/imgs/' + user.profile.avatar_src.resized_name;
            }
        }
    } //methods
    //export default

});

/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "component" }, [
    _c(
      "div",
      { staticClass: "component-heading clearfix" },
      [
        _c("h2", { staticClass: "heading float-left" }, [
          _vm._v("\n           User Lists\n        ")
        ]),
        _vm._v(" "),
        _c("back-forward")
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "component-body" },
      [
        _c("media", {
          attrs: { id: "avatar" },
          on: { "select-image": _vm.avatarInsert }
        }),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "can",
                rawName: "v-can",
                value: "user-create",
                expression: "'user-create'"
              }
            ],
            staticClass: "modal fade",
            attrs: {
              id: "createModal",
              tabindex: "-1",
              role: "dialog",
              "aria-labelledby": "ModalLongTitle",
              "aria-hidden": "true"
            }
          },
          [
            _c(
              "div",
              {
                staticClass: "modal-dialog modal-lg",
                attrs: { role: "document" }
              },
              [
                _c("div", { staticClass: "modal-content" }, [
                  _c("div", { staticClass: "modal-header" }, [
                    _c(
                      "h5",
                      {
                        staticClass: "modal-title",
                        attrs: { id: "ModalLongTitle" }
                      },
                      [
                        _vm._v(
                          "  " +
                            _vm._s(_vm.formType ? "New" : "Update") +
                            " User"
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _vm._m(0)
                  ]),
                  _vm._v(" "),
                  _c(
                    "form",
                    {
                      on: {
                        submit: function($event) {
                          $event.preventDefault()
                          _vm.saveForm()
                        }
                      }
                    },
                    [
                      _c("div", { staticClass: "modal-body" }, [
                        _c("div", { staticClass: "form-row" }, [
                          _c("div", { staticClass: "col-md-12 mb-3" }, [
                            _c("label", { attrs: { for: "status" } }, [
                              _vm._v("Status")
                            ]),
                            _vm._v(" "),
                            _c("label", { staticClass: "switch" }, [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.user.status,
                                    expression: "user.status"
                                  }
                                ],
                                attrs: { type: "checkbox" },
                                domProps: {
                                  checked: Array.isArray(_vm.user.status)
                                    ? _vm._i(_vm.user.status, null) > -1
                                    : _vm.user.status
                                },
                                on: {
                                  change: function($event) {
                                    var $$a = _vm.user.status,
                                      $$el = $event.target,
                                      $$c = $$el.checked ? true : false
                                    if (Array.isArray($$a)) {
                                      var $$v = null,
                                        $$i = _vm._i($$a, $$v)
                                      if ($$el.checked) {
                                        $$i < 0 &&
                                          _vm.$set(
                                            _vm.user,
                                            "status",
                                            $$a.concat([$$v])
                                          )
                                      } else {
                                        $$i > -1 &&
                                          _vm.$set(
                                            _vm.user,
                                            "status",
                                            $$a
                                              .slice(0, $$i)
                                              .concat($$a.slice($$i + 1))
                                          )
                                      }
                                    } else {
                                      _vm.$set(_vm.user, "status", $$c)
                                    }
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("span", { staticClass: "slider round" })
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "col-md-6 col-lg-4 mb-3 outline-group"
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.user.name,
                                    expression: "user.name"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "name"
                                },
                                domProps: { value: _vm.user.name },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.user,
                                      "name",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "name" } }, [
                                _vm._v("Name")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "col-md-6 col-lg-4 mb-3 outline-group"
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.user.email,
                                    expression: "user.email"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "email",
                                  id: "email"
                                },
                                domProps: { value: _vm.user.email },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.user,
                                      "email",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "email" } }, [
                                _vm._v("Email")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "col-md-6 col-lg-4 mb-3 outline-group"
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.user.password,
                                    expression: "user.password"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "password",
                                  id: "password"
                                },
                                domProps: { value: _vm.user.password },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.user,
                                      "password",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "password" } }, [
                                _vm._v("Password")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "col-md-6 col-lg-4 mb-3 outline-group"
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.user.password_confirmation,
                                    expression: "user.password_confirmation"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "password",
                                  id: "password_confirmation"
                                },
                                domProps: {
                                  value: _vm.user.password_confirmation
                                },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.user,
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
                                [_vm._v("Confirm Password")]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "col-md-6 col-lg-4 mb-3 outline-group"
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.user.username,
                                    expression: "user.username"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "username"
                                },
                                domProps: { value: _vm.user.username },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.user,
                                      "username",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "username" } }, [
                                _vm._v("User Name")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "col-md-6 col-lg-4 mb-3 outline-group"
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.user.pin,
                                    expression: "user.pin"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "password",
                                  id: "pin-password"
                                },
                                domProps: { value: _vm.user.pin },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.user,
                                      "pin",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "pin-password" } }, [
                                _vm._v("Pin Number")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "col-md-6 col-lg-4 mb-3 outline-group"
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.user.mobile,
                                    expression: "user.mobile"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "mobile"
                                },
                                domProps: { value: _vm.user.mobile },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.user,
                                      "mobile",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "mobile" } }, [
                                _vm._v("Mobile")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-md-6 col-lg-4 mb-3" },
                            [
                              _c("date-picker", {
                                attrs: {
                                  config: _vm.dateOptions,
                                  placeholder: "Birth Day"
                                },
                                model: {
                                  value: _vm.user.profile.bday,
                                  callback: function($$v) {
                                    _vm.$set(_vm.user.profile, "bday", $$v)
                                  },
                                  expression: "user.profile.bday"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "col-md-6 col-lg-4 mb-3 outline-group"
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.user.occupation,
                                    expression: "user.occupation"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "occupation"
                                },
                                domProps: { value: _vm.user.occupation },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.user,
                                      "occupation",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "occupation" } }, [
                                _vm._v("Occupation")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "col-md-6 col-lg-4 mb-3 outline-group"
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.user.profile.nid,
                                    expression: "user.profile.nid"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "nid"
                                },
                                domProps: { value: _vm.user.profile.nid },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.user.profile,
                                      "nid",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "nid" } }, [
                                _vm._v("NID")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "col-md-6 col-lg-4 mb-3 outline-group"
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.user.profile.birth_crt,
                                    expression: "user.profile.birth_crt"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "birth_crt"
                                },
                                domProps: { value: _vm.user.profile.birth_crt },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.user.profile,
                                      "birth_crt",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "birth_crt" } }, [
                                _vm._v("Birth Certificate")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "col-md-6 col-lg-4 mb-3 outline-group"
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.user.profile.passport,
                                    expression: "user.profile.passport"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "passport"
                                },
                                domProps: { value: _vm.user.profile.passport },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.user.profile,
                                      "passport",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "passport" } }, [
                                _vm._v("Passport")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "col-md-6 col-lg-4 mb-3 outline-group"
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.user.pre_address,
                                    expression: "user.pre_address"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "pre_address"
                                },
                                domProps: { value: _vm.user.pre_address },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.user,
                                      "pre_address",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "pre_address" } }, [
                                _vm._v("Present Address")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "col-md-6 col-lg-4 mb-3 outline-group"
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.user.per_address,
                                    expression: "user.per_address"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "per_address"
                                },
                                domProps: { value: _vm.user.per_address },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.user,
                                      "per_address",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "per_address" } }, [
                                _vm._v("Parmanent Address")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-md-6 col-lg-4 mb-3" },
                            [
                              _c(
                                "label",
                                {
                                  staticClass: "o-s-l",
                                  attrs: { for: "per_address" }
                                },
                                [_vm._v("Select User Role")]
                              ),
                              _vm._v(" "),
                              _c("multiselect", {
                                attrs: {
                                  options: _vm.roles,
                                  "preserve-search": true,
                                  label: "name",
                                  "track-by": "name",
                                  "preselect-first": true
                                },
                                scopedSlots: _vm._u([
                                  {
                                    key: "tag",
                                    fn: function(props) {
                                      return [
                                        _c(
                                          "span",
                                          { staticClass: "custom__tag" },
                                          [
                                            _c("span", [
                                              _vm._v(_vm._s(props.option.name))
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "span",
                                              {
                                                on: {
                                                  click: function($event) {
                                                    props.remove(props.option)
                                                  }
                                                }
                                              },
                                              [_vm._v("x")]
                                            )
                                          ]
                                        )
                                      ]
                                    }
                                  }
                                ]),
                                model: {
                                  value: _vm.user.role,
                                  callback: function($$v) {
                                    _vm.$set(_vm.user, "role", $$v)
                                  },
                                  expression: "user.role"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-md-4 mb-3" }, [
                            !_vm.user.profile.avatar
                              ? _c("div", [
                                  _c(
                                    "span",
                                    {
                                      staticClass: "btn btn-sm green",
                                      attrs: {
                                        "data-toggle": "modal",
                                        "data-target": "#avatar"
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                                            Insert Image\n                                        "
                                      )
                                    ]
                                  )
                                ])
                              : _c("div", [
                                  _c("img", {
                                    staticClass:
                                      "upload-img rounded-circle sm-img p-a",
                                    attrs: { src: _vm.user.profile.avatar_src }
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    {
                                      staticClass:
                                        "btn btn-sm btn-danger sm-btn",
                                      on: { click: _vm.avatarRemove }
                                    },
                                    [_vm._v("x")]
                                  )
                                ])
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "modal-footer" }, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-secondary",
                            attrs: { type: "button", "data-dismiss": "modal" }
                          },
                          [_vm._v("Close")]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-primary",
                            attrs: { type: "submit" }
                          },
                          [
                            _vm._v(
                              "\n                            " +
                                _vm._s(_vm.formType ? "Create" : "Update") +
                                "\n                            "
                            )
                          ]
                        )
                      ])
                    ]
                  )
                ])
              ]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "modal right fade",
            attrs: {
              id: "dataSearch",
              tabindex: "-1",
              role: "dialog",
              "aria-hidden": "true"
            }
          },
          [
            _c(
              "div",
              { staticClass: "modal-dialog", attrs: { role: "document" } },
              [
                _c("div", { staticClass: "modal-content" }, [
                  _vm._m(1),
                  _vm._v(" "),
                  _c(
                    "form",
                    {
                      on: {
                        submit: function($event) {
                          $event.preventDefault()
                          _vm.dataSearch()
                        }
                      }
                    },
                    [
                      _c("div", { staticClass: "modal-body" }, [
                        _c("div", { staticClass: "form-row" }, [
                          _c("div", { staticClass: "col-12 mb-3" }, [
                            _c("label", { staticClass: "o-s-l" }, [
                              _vm._v("Show")
                            ]),
                            _vm._v(" "),
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.perPage,
                                    expression: "perPage"
                                  }
                                ],
                                staticClass: "form-control",
                                on: {
                                  change: function($event) {
                                    var $$selectedVal = Array.prototype.filter
                                      .call($event.target.options, function(o) {
                                        return o.selected
                                      })
                                      .map(function(o) {
                                        var val =
                                          "_value" in o ? o._value : o.value
                                        return val
                                      })
                                    _vm.perPage = $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  }
                                }
                              },
                              _vm._l(_vm.perPageOptions, function(option) {
                                return _c(
                                  "option",
                                  { domProps: { value: option.value } },
                                  [
                                    _vm._v(
                                      "\n                                            " +
                                        _vm._s(option.text) +
                                        "\n                                        "
                                    )
                                  ]
                                )
                              })
                            )
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-12 mb-3" }, [
                            _c("label", { staticClass: "o-s-l" }, [
                              _vm._v("Select Status")
                            ]),
                            _vm._v(" "),
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.userSearch.status,
                                    expression: "userSearch.status"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: { id: "search-status" },
                                on: {
                                  change: function($event) {
                                    var $$selectedVal = Array.prototype.filter
                                      .call($event.target.options, function(o) {
                                        return o.selected
                                      })
                                      .map(function(o) {
                                        var val =
                                          "_value" in o ? o._value : o.value
                                        return val
                                      })
                                    _vm.$set(
                                      _vm.userSearch,
                                      "status",
                                      $event.target.multiple
                                        ? $$selectedVal
                                        : $$selectedVal[0]
                                    )
                                  }
                                }
                              },
                              [
                                _c("option", { attrs: { value: "" } }, [
                                  _vm._v("Select Status")
                                ]),
                                _vm._v(" "),
                                _c("option", { attrs: { value: "1" } }, [
                                  _vm._v("Active")
                                ]),
                                _vm._v(" "),
                                _c("option", { attrs: { value: "0" } }, [
                                  _vm._v("Inactive")
                                ])
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-12 mb-3 outline-group" },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.userSearch.username,
                                    expression: "userSearch.username"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "search-username"
                                },
                                domProps: { value: _vm.userSearch.username },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.userSearch,
                                      "username",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "search-username" } },
                                [_vm._v("User Name")]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-12 mb-3 outline-group" },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.userSearch.email,
                                    expression: "userSearch.email"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "search-email"
                                },
                                domProps: { value: _vm.userSearch.email },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.userSearch,
                                      "email",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "search-email" } }, [
                                _vm._v("Email")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-12 mb-3 outline-group" },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.userSearch.mobile,
                                    expression: "userSearch.mobile"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "search-mobile"
                                },
                                domProps: { value: _vm.userSearch.mobile },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.userSearch,
                                      "mobile",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "search-mobile" } }, [
                                _vm._v("Mobile")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-12 mb-3" },
                            [
                              _c("date-picker", {
                                attrs: {
                                  config: _vm.dateOptions,
                                  placeholder: "Date From"
                                },
                                model: {
                                  value: _vm.userSearch.date_from,
                                  callback: function($$v) {
                                    _vm.$set(_vm.userSearch, "date_from", $$v)
                                  },
                                  expression: "userSearch.date_from"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-12 mb-3" },
                            [
                              _c("date-picker", {
                                attrs: {
                                  config: _vm.dateOptions,
                                  placeholder: "Date To"
                                },
                                model: {
                                  value: _vm.userSearch.date_to,
                                  callback: function($$v) {
                                    _vm.$set(_vm.userSearch, "date_to", $$v)
                                  },
                                  expression: "userSearch.date_to"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-12 mb-3" }, [
                            _c("label", { staticClass: "o-s-l" }, [
                              _vm._v("Order By")
                            ]),
                            _vm._v(" "),
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.userSearch.order_by,
                                    expression: "userSearch.order_by"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: { id: "search-order-by" },
                                on: {
                                  change: function($event) {
                                    var $$selectedVal = Array.prototype.filter
                                      .call($event.target.options, function(o) {
                                        return o.selected
                                      })
                                      .map(function(o) {
                                        var val =
                                          "_value" in o ? o._value : o.value
                                        return val
                                      })
                                    _vm.$set(
                                      _vm.userSearch,
                                      "order_by",
                                      $event.target.multiple
                                        ? $$selectedVal
                                        : $$selectedVal[0]
                                    )
                                  }
                                }
                              },
                              [
                                _c("option", { attrs: { value: "" } }, [
                                  _vm._v("Newer First")
                                ]),
                                _vm._v(" "),
                                _c("option", { attrs: { value: "1" } }, [
                                  _vm._v("Newer Last")
                                ])
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _vm._m(2)
                        ])
                      ])
                    ]
                  )
                ])
              ]
            )
          ]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "table-actions" }, [
          _c(
            "button",
            {
              directives: [
                {
                  name: "can",
                  rawName: "v-can",
                  value: "user-create",
                  expression: "'user-create'"
                }
              ],
              staticClass: "btn btn-sm green",
              attrs: {
                type: "button",
                "data-toggle": "modal",
                "data-target": "#createModal"
              },
              on: {
                click: function($event) {
                  _vm.newForm()
                }
              }
            },
            [
              _c("i", { staticClass: "icon-plus-squared" }),
              _vm._v(" User\n            ")
            ]
          ),
          _vm._v(" "),
          _vm._m(3)
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "table-responsive" }, [
          _c("table", { staticClass: "table table-striped bg-white" }, [
            _vm._m(4),
            _vm._v(" "),
            _c(
              "tbody",
              [
                _vm.preloader
                  ? _c("tr", { staticStyle: { background: "none" } }, [
                      _c(
                        "td",
                        { attrs: { colspan: "5" } },
                        [_c("preloader")],
                        1
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm._l(_vm.users.data, function(user, index) {
                  return _c("tr", [
                    _c("td", [_vm._v(_vm._s(user.name))]),
                    _vm._v(" "),
                    _c(
                      "td",
                      [
                        user.status
                          ? [
                              _c(
                                "span",
                                { staticClass: "bg-success active-status" },
                                [_vm._v("Active")]
                              )
                            ]
                          : [
                              _c(
                                "span",
                                { staticClass: "bg-danger active-status" },
                                [_vm._v("Inactive")]
                              )
                            ]
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(user.email))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(user.username))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(user.mobile))]),
                    _vm._v(" "),
                    _c(
                      "td",
                      { staticClass: "taxonomies" },
                      [
                        user.role.length
                          ? _vm._l(user.role, function(role) {
                              return _c("span", [_vm._v(_vm._s(role.name))])
                            })
                          : _vm._e()
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(user.balance.balance))]),
                    _vm._v(" "),
                    _c("td", [
                      _c("div", { staticClass: "dropdown action-items" }, [
                        _vm._m(5, true),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "dropdown-menu",
                            attrs: { "aria-labelledby": "actionItemButtons" }
                          },
                          [
                            _c(
                              "a",
                              {
                                directives: [
                                  {
                                    name: "can",
                                    rawName: "v-can",
                                    value: "user-edit",
                                    expression: "'user-edit'"
                                  }
                                ],
                                staticClass: "dropdown-item",
                                attrs: {
                                  href: "#",
                                  "data-toggle": "modal",
                                  "data-target": "#createModal"
                                },
                                on: {
                                  click: function($event) {
                                    $event.preventDefault()
                                    _vm.editForm(user)
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "\n                                   Edit / View \n                                "
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    ])
                  ])
                }),
                _vm._v(" "),
                _vm.noData
                  ? [
                      _c("tr", {
                        staticClass: "bg-white",
                        domProps: { innerHTML: _vm._s(_vm.noData) }
                      })
                    ]
                  : _vm._e()
              ],
              2
            ),
            _vm._v(" "),
            _vm._m(6)
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "table-actions" },
          [
            _c("pagination", {
              attrs: { data: _vm.users, limit: 2 },
              on: { "pagination-change-page": _vm.getLists }
            })
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "modal",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c("h5", { staticClass: "modal-title" }, [_vm._v("Search")]),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-12 mb-3" }, [
      _c(
        "button",
        { staticClass: "btn btn-primary btn-sm", attrs: { type: "submit" } },
        [_vm._v("Search")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-dark float-right btn-sm",
          attrs: { type: "reset" }
        },
        [_vm._v("Reset")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "btn btn-sm btn-info float-right",
        attrs: {
          type: "button",
          "data-toggle": "modal",
          "data-target": "#dataSearch"
        }
      },
      [
        _c("i", { staticClass: "icon-search" }),
        _vm._v(" "),
        _c("span", { staticClass: "d-none d-sm-inline" }, [_vm._v("Search")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("Name")]),
        _vm._v(" "),
        _c("th", [_vm._v("Status")]),
        _vm._v(" "),
        _c("th", [_vm._v("Email")]),
        _vm._v(" "),
        _c("th", [_vm._v("User Name")]),
        _vm._v(" "),
        _c("th", [_vm._v("Mobile")]),
        _vm._v(" "),
        _c("th", [_vm._v("Role")]),
        _vm._v(" "),
        _c("th", [_vm._v("Balance")]),
        _vm._v(" "),
        _c("th", [_vm._v("Actions")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "btn btn-default btn-sm dropdown-toggle",
        attrs: {
          type: "button",
          id: "actionItemButtons",
          "data-toggle": "dropdown",
          "aria-haspopup": "true",
          "aria-expanded": "false"
        }
      },
      [_c("i", { staticClass: "icon-ellipsis" })]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tfoot", [
      _c("tr", [
        _c("th", [_vm._v("Name")]),
        _vm._v(" "),
        _c("th", [_vm._v("Status")]),
        _vm._v(" "),
        _c("th", [_vm._v("Email")]),
        _vm._v(" "),
        _c("th", [_vm._v("User Name")]),
        _vm._v(" "),
        _c("th", [_vm._v("Mobile")]),
        _vm._v(" "),
        _c("th", [_vm._v("Role")]),
        _vm._v(" "),
        _c("th", [_vm._v("Balance")]),
        _vm._v(" "),
        _c("th", [_vm._v("Actions")])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ed6848d8", module.exports)
  }
}

/***/ })

});