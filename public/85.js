webpackJsonp([85],{

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(331)
/* template */
var __vue_template__ = __webpack_require__(332)
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
Component.options.__file = "resources\\assets\\js\\admin\\views\\user-change-histories\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e61623a", Component.options)
  } else {
    hotAPI.reload("data-v-7e61623a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 331:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            dateOptions: this.$store.state.dateOptions,
            userchangehistoriesSearch: {
                user_id: '',
                old: '',
                new: '',
                date_from: '',
                date_to: '',
                order_by: ''
            },
            accounts: [],
            userchangehistories: {},
            isLoading: false,
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
        customLabel: function customLabel(_ref) {
            var _ref$name = _ref.name,
                name = _ref$name === undefined ? '' : _ref$name,
                _ref$mobile = _ref.mobile,
                mobile = _ref$mobile === undefined ? '' : _ref$mobile,
                _ref$email = _ref.email,
                email = _ref$email === undefined ? '' : _ref$email,
                _ref$username = _ref.username,
                username = _ref$username === undefined ? '' : _ref$username;

            if (name && email && mobile && username) {
                return name + ' \u2014 ' + mobile + ' \u2014 ' + email + ' - ' + username;
            } else if (name && email && mobile) {
                return name + ' \u2014 ' + mobile + ' \u2014 ' + email;
            } else if (name && email) {
                return name + ' \u2014 ' + email;
            } else if (name && mobile) {
                return name + ' \u2014 ' + mobile;
            }
        },
        asyncFind: function asyncFind(query) {
            var _this = this;

            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(function () {
                if (query.length < 4) return;
                _this.isLoading = true;
                axios.get('/api/v1/ac/accounts?' + 'title=' + query).then(function (resp) {
                    _this.accounts = resp.data.users;
                    _this.isLoading = false;
                }).catch(function (resp) {
                    _this.$store.commit('errorMessages', resp);
                });
            }, 600);
        },
        dataSearch: function dataSearch() {
            var data_search = this.userchangehistoriesSearch;
            var query = {};
            data_search.date_from = data_search.date_from ? data_search.date_from.toString() : '';
            data_search.date_to = data_search.date_to ? data_search.date_to.toString() : '';

            for (var key in data_search) {
                if (data_search[key]) {
                    query[key] = key != 'user_id' ? data_search[key] : data_search[key]['id'];
                } else {
                    if (this.$route.query[key]) {
                        query[key] = '';
                    }
                }
            }
            this.$router.push({ path: document.location.search, query: query });
            this.getLists();
        },
        user: function user(_user) {
            if (_user.username) {
                return _user.username;
            } else if (_user.mobile) {
                return _user.mobile;
            } else {
                return _user.email;
            }
        },
        keyTitle: function keyTitle(key) {
            if (key == 'nid') {
                return 'NID';
            } else if (key == 'birth_crt') {
                return 'Birth CRT';
            } else if (key == 'passport') {
                return 'Passport';
            }
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

            axios.get('/api/v1/userchangehistories?' + queryString).then(function (resp) {
                app.preloader = false;

                app.userchangehistories = resp.data.userchangehistories;
                app.refferalUrl = resp.data.ref_url;
                if (app.userchangehistories.data.length == 0) {
                    app.noData = app.$store.state.noData;
                } else {
                    app.noData = '';
                }
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        }
    } //methods
    //export default

});

/***/ }),

/***/ 332:
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
          _vm._v("\n           User Change History Lists\n        ")
        ]),
        _vm._v(" "),
        _c("back-forward")
      ],
      1
    ),
    _vm._v(" "),
<<<<<<< HEAD
    _c("div", { staticClass: "component-body settings" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-3 pr-0" }, [
          _c("div", { staticClass: "custom-menu-modal" }, [
            _c("div", { staticClass: "custom-header d-block d-md-none" }, [
              _c("h5", { staticClass: "modal-title" }, [
                _vm._v(_vm._s(_vm.$t("set_menu")))
              ]),
              _vm._v(" "),
              _vm._m(0)
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "list-group" },
              [
                _c(
                  "router-link",
                  {
                    directives: [
                      {
                        name: "can",
                        rawName: "v-can",
                        value: "setting-profile-view",
                        expression: "'setting-profile-view'"
                      }
                    ],
                    staticClass: "list-group-item",
                    attrs: { to: { name: "mtSettingProfile" } }
                  },
                  [
                    _c("span", { staticClass: "icon-user" }),
                    _vm._v(
                      _vm._s(_vm.$t("profile")) + " \n                        "
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "router-link",
                  {
                    directives: [
                      {
                        name: "can",
                        rawName: "v-can",
                        value: "setting-security-view",
                        expression: "'setting-security-view'"
                      }
                    ],
                    staticClass: "list-group-item",
                    attrs: { to: { name: "mtSettingSecurity" } }
                  },
                  [
                    _c("span", { staticClass: "icon-shield" }),
                    _vm._v(
                      _vm._s(_vm.$t("se_Lo")) + "\n                        "
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "router-link",
                  {
                    directives: [
                      {
                        name: "can",
                        rawName: "v-can",
                        value: "setting-money-transfer-view",
                        expression: "'setting-money-transfer-view'"
                      }
                    ],
                    staticClass: "list-group-item",
                    attrs: { to: { name: "mtSettingMobileRecharge" } }
                  },
                  [
                    _c("span", { staticClass: "icon-mobile" }),
                    _vm._v(
                      _vm._s(_vm.$t("mobile_recharge")) +
                        "\n                        "
                    )
                  ]
                ),
=======
    _c("div", { staticClass: "component-body" }, [
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
                _vm._m(0),
>>>>>>> 03d826cdabcb25be57f4a49a589f2ae5675df3af
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
                        _c(
                          "div",
                          { staticClass: "col-12 mb-3" },
                          [
                            _c("multiselect", {
                              attrs: {
                                options: _vm.accounts,
                                "custom-label": _vm.customLabel,
                                "preserve-search": true,
                                placeholder: "Search User",
                                selectLabel: "",
                                loading: _vm.isLoading,
                                deselectLabel: "",
                                searchable: true,
                                label: "name",
                                "track-by": "name",
                                "preselect-first": false
                              },
                              on: { "search-change": _vm.asyncFind },
                              scopedSlots: _vm._u([
                                {
                                  key: "tag",
                                  fn: function(props) {
                                    return [
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
                                  }
                                }
                              ]),
                              model: {
                                value: _vm.userchangehistoriesSearch.user_id,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.userchangehistoriesSearch,
                                    "user_id",
                                    $$v
                                  )
                                },
                                expression: "userchangehistoriesSearch.user_id"
                              }
                            }),
                            _vm._v(" "),
                            _c("small", [
                              _vm._v("Search by mobile, email or username")
                            ])
                          ],
                          1
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
                                  value: _vm.userchangehistoriesSearch.old,
                                  expression: "userchangehistoriesSearch.old"
                                }
                              ],
                              staticClass: "form-control outline",
                              attrs: {
                                placeholder: " ",
                                type: "text",
                                id: "search-old"
                              },
                              domProps: {
                                value: _vm.userchangehistoriesSearch.old
                              },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.userchangehistoriesSearch,
                                    "old",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("label", { attrs: { for: "search-old" } }, [
                              _vm._v("Old Value")
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
                                  value: _vm.userchangehistoriesSearch.new,
                                  expression: "userchangehistoriesSearch.new"
                                }
                              ],
                              staticClass: "form-control outline",
                              attrs: {
                                placeholder: " ",
                                type: "text",
                                id: "search-new"
                              },
                              domProps: {
                                value: _vm.userchangehistoriesSearch.new
                              },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.userchangehistoriesSearch,
                                    "new",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("label", { attrs: { for: "search-new" } }, [
                              _vm._v("New Value")
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
                                value: _vm.userchangehistoriesSearch.date_from,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.userchangehistoriesSearch,
                                    "date_from",
                                    $$v
                                  )
                                },
                                expression:
                                  "userchangehistoriesSearch.date_from"
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
                                value: _vm.userchangehistoriesSearch.date_to,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.userchangehistoriesSearch,
                                    "date_to",
                                    $$v
                                  )
                                },
                                expression: "userchangehistoriesSearch.date_to"
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
                                  value: _vm.userchangehistoriesSearch.order_by,
                                  expression:
                                    "userchangehistoriesSearch.order_by"
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
                                    _vm.userchangehistoriesSearch,
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
                        _vm._m(1)
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
      _vm._m(2),
      _vm._v(" "),
      _c("div", { staticClass: "table-responsive" }, [
        _c("table", { staticClass: "table table-striped bg-white" }, [
          _vm._m(3),
          _vm._v(" "),
          _c(
            "tbody",
            [
              _vm.preloader
                ? _c("tr", { staticStyle: { background: "none" } }, [
                    _c("td", { attrs: { colspan: "5" } }, [_c("preloader")], 1)
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.userchangehistories.data, function(
                userchangehistory,
                index
              ) {
                return _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.user(userchangehistory.user)))]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(userchangehistory.user.name))]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(_vm._s(_vm.keyTitle(userchangehistory.key)))
                  ]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(userchangehistory.old))]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(userchangehistory.new))]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      _vm._s(
                        _vm._f("moment")(
                          userchangehistory.created_at,
                          "DD-MM-YYYY, h:mm a"
                        )
                      )
                    )
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
          _vm._m(4)
        ])
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "table-actions" },
        [
          _c("pagination", {
            attrs: { data: _vm.userchangehistories, limit: 2 },
            on: { "pagination-change-page": _vm.getLists }
          })
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
<<<<<<< HEAD
    return _c("button", { staticClass: "close", attrs: { type: "button" } }, [
      _c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])
=======
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
    return _c("div", { staticClass: "table-actions" }, [
      _c(
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
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("User")]),
        _vm._v(" "),
        _c("th", [_vm._v("Name")]),
        _vm._v(" "),
        _c("th", [_vm._v("Key")]),
        _vm._v(" "),
        _c("th", [_vm._v("Old Value")]),
        _vm._v(" "),
        _c("th", [_vm._v("New Value")]),
        _vm._v(" "),
        _c("th", [_vm._v("Date")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tfoot", [
      _c("tr", [
        _c("th", [_vm._v("User")]),
        _vm._v(" "),
        _c("th", [_vm._v("Name")]),
        _vm._v(" "),
        _c("th", [_vm._v("Key")]),
        _vm._v(" "),
        _c("th", [_vm._v("Old Value")]),
        _vm._v(" "),
        _c("th", [_vm._v("New Value")]),
        _vm._v(" "),
        _c("th", [_vm._v("Date")])
      ])
>>>>>>> 03d826cdabcb25be57f4a49a589f2ae5675df3af
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7e61623a", module.exports)
  }
}

/***/ })

});