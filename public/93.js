webpackJsonp([93],{

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(560)
/* template */
var __vue_template__ = __webpack_require__(561)
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
Component.options.__file = "resources\\assets\\js\\admin\\views\\mt\\transection-limit\\limits\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-51fb554d", Component.options)
  } else {
    hotAPI.reload("data-v-51fb554d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 560:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            dateOptions: this.$store.state.dateOptions,
            formType: false,
            limit: {
                role: [],
                status: true,
                user: null,
                service_limits: [{ for: null, max_amount_day: null, max_number_day: null, max_amount_month: null, max_number_month: null }]
            },
            fors: [{ id: 1, name: 'Mobile Recharge' }, { id: 2, name: 'Mobile Banking' }, { id: 3, name: 'Utility Bill Pay' }, { id: 4, name: 'Balance Transfer' }],
            limitConst: {
                role: [],
                status: true,
                user: null,
                service_limits: [{ for: null, max_amount_day: null, max_number_day: null, max_amount_month: null, max_number_month: null }]
            },
            limitSearch: {
                title: '',
                date_from: '',
                date_to: '',
                order_by: ''
            },
            limit_for: this.$route.params.name,
            limits: {},
            roles: [],
            accounts: [],
            isLoading: false,
            perPage: this.$route.query.per_page,
            perPageOptions: this.$store.state.perPageOptions,
            selected: [],
            selectAll: false,
            noData: '',
            preloader: true
        };
    },

    watch: {
        perPage: function perPage(val) {
            var page = this.$route.query.page;
            this.$router.push({ path: document.location.search, query: { page: page, per_page: val } });
            this.getLists();
        },
        '$route.params.name': function $routeParamsName(name) {
            this.limit_for = name;
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
        title: function title() {
            var app = this;
            switch (app.limit_for) {

                case 'role':
                    return 'Role';
                    break;

                case 'user':
                    return 'User';
                    break;
            }
        },
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
                    app.$store.commit('errorMessages', resp);
                });
            }, 600);
        },
        addForIDs: function addForIDs(index) {
            this.limit.service_limits.splice(index + 1, 0, { for: null, max_amount_day: null, max_number_day: null, max_amount_month: null, max_number_month: null });
        },
        removeForIDs: function removeForIDs(index) {
            if (this.limit.service_limits.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.limit.service_limits.splice(index, 1);
            }
        },
        select: function select() {
            this.selected = [];
            if (!this.selectAll) {
                for (var key in this.limits.data) {
                    this.selected.push(this.limits.data[key].id);
                }
            }
        },
        dataSearch: function dataSearch() {
            var data_search = this.limitSearch;
            var query = {};
            data_search.date_from = data_search.date_from ? data_search.date_from.toString() : '';
            data_search.date_to = data_search.date_to ? data_search.date_to.toString() : '';

            for (var key in data_search) {
                if (data_search[key]) {
                    if (key == 'category') {
                        if (data_search[key].length) {
                            var cat_ids = data_search[key].map(function (el) {
                                return el.id;
                            });
                            query[key] = cat_ids.join();
                        } else {
                            query[key] = '';
                        }
                    } else {
                        query[key] = data_search[key];
                    }
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
            queryString += '&limit_for=' + app.limit_for;

            axios.get('/api/v1/mt/limits?' + queryString).then(function (resp) {
                app.preloader = false;
                app.limits = resp.data.limits;
                app.roles = resp.data.roles;

                if (app.limits.data.length == 0) {
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
            this.limit = this.limitConst;
        },
        saveForm: function saveForm() {
            var _this2 = this;

            var app = this;
            var newNotice = app.limit;

            $('#createModal').modal('toggle');

            this.$set(newNotice, 'limit_for', app.limit_for);

            if (this.formType) {
                axios.post('/api/v1/mt/limits', newNotice).then(function (resp) {
                    _this2.limit = _this2.limitConst;
                    app.$store.commit('submitMsg', 'add');
                    app.getLists();
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            } else {
                axios.patch('/api/v1/mt/limits/' + newNotice.id, newNotice).then(function (resp) {
                    _this2.limit = _this2.limitConst;
                    app.$store.commit('submitMsg', 'update');
                    app.getLists();
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            }
        },
        editForm: function editForm(limit) {
            this.formType = false;
            this.limit = limit;
        },
        deleteEntry: function deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/mt/limits/' + id + '?limit_for=' + app.limit_for).then(function (resp) {
                    app.limits.data.splice(index, 1);
                    app.$store.commit('submitMsg', 'delete');
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            }
        },
        deleteSelected: function deleteSelected() {
            var app = this;
            if (app.selected.length == 0) {
                app.$store.commit('noSelectedMsg');
                return;
            }
            if (confirm(app.$store.state.confirmDel)) {
                var selectedItem = this.selected.toString();
                axios.delete('/api/v1/mt/limits/' + selectedItem + '?limit_for=' + app.limit_for).then(function (resp) {
                    app.$store.commit('submitMsg', 'selectedDelete');
                    app.selectAll = false;
                    app.selected = [];
                    app.getLists();
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            }
        }
    } //methods
    //export default

});

/***/ }),

/***/ 561:
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
          _vm._v(
            "\n           " + _vm._s(_vm.title()) + " Limit Lists\n        "
          )
        ]),
        _vm._v(" "),
        _c("back-forward")
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "component-body" }, [
      _c(
        "div",
        {
          directives: [
            {
              name: "can",
              rawName: "v-can",
              value: "doc-create",
              expression: "'doc-create'"
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
              staticClass: "modal-dialog modal-lg big-modal",
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
                          " " +
                          _vm._s(_vm.title()) +
                          " Limit"
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
                        _vm.limit_for == "role"
                          ? _c(
                              "div",
                              { staticClass: "col-12 mb-3" },
                              [
                                _c("label", { staticClass: "o-s-l" }, [
                                  _vm._v("Role")
                                ]),
                                _vm._v(" "),
                                _c("multiselect", {
                                  attrs: {
                                    options: _vm.roles,
                                    "preserve-search": true,
                                    label: "name",
                                    "track-by": "name"
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
                                                _vm._v(
                                                  _vm._s(props.option.name)
                                                )
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
                                    value: _vm.limit.role,
                                    callback: function($$v) {
                                      _vm.$set(_vm.limit, "role", $$v)
                                    },
                                    expression: "limit.role"
                                  }
                                })
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.limit_for == "user"
                          ? _c("div", { staticClass: "col-md-12 mb-2" }, [
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
                                      value: _vm.limit.status,
                                      expression: "limit.status"
                                    }
                                  ],
                                  attrs: { type: "checkbox" },
                                  domProps: {
                                    checked: Array.isArray(_vm.limit.status)
                                      ? _vm._i(_vm.limit.status, null) > -1
                                      : _vm.limit.status
                                  },
                                  on: {
                                    change: function($event) {
                                      var $$a = _vm.limit.status,
                                        $$el = $event.target,
                                        $$c = $$el.checked ? true : false
                                      if (Array.isArray($$a)) {
                                        var $$v = null,
                                          $$i = _vm._i($$a, $$v)
                                        if ($$el.checked) {
                                          $$i < 0 &&
                                            _vm.$set(
                                              _vm.limit,
                                              "status",
                                              $$a.concat([$$v])
                                            )
                                        } else {
                                          $$i > -1 &&
                                            _vm.$set(
                                              _vm.limit,
                                              "status",
                                              $$a
                                                .slice(0, $$i)
                                                .concat($$a.slice($$i + 1))
                                            )
                                        }
                                      } else {
                                        _vm.$set(_vm.limit, "status", $$c)
                                      }
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("span", { staticClass: "slider round" })
                              ])
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.limit_for == "user"
                          ? _c(
                              "div",
                              { staticClass: "col-md-12 mb-3" },
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
                                    value: _vm.limit.user,
                                    callback: function($$v) {
                                      _vm.$set(_vm.limit, "user", $$v)
                                    },
                                    expression: "limit.user"
                                  }
                                }),
                                _vm._v(" "),
                                _c("small", [
                                  _vm._v(
                                    "You can search a user by mobile number, email or user name"
                                  )
                                ])
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "mt-number-list mb-3" },
                          _vm._l(_vm.limit.service_limits, function(
                            limit,
                            key
                          ) {
                            return _c("div", { staticClass: "mt-numbers" }, [
                              _c("div", { staticClass: "mt-title" }, [
                                _vm._v(
                                  "\n                                            Service Limit: " +
                                    _vm._s(key + 1) +
                                    "\n                                        "
                                )
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "mt-control" }, [
                                _c(
                                  "span",
                                  {
                                    staticClass: "btn btn-primary btn-sm",
                                    on: {
                                      click: function($event) {
                                        _vm.addForIDs(key)
                                      }
                                    }
                                  },
                                  [_c("i", { staticClass: "icon-plus" })]
                                ),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    staticClass: "btn btn-danger btn-sm",
                                    on: {
                                      click: function($event) {
                                        _vm.removeForIDs(key)
                                      }
                                    }
                                  },
                                  [_c("i", { staticClass: "icon-minus" })]
                                )
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "form-row" }, [
                                _c(
                                  "div",
                                  { staticClass: "col-md-12 mb-3 mt-4" },
                                  [
                                    _c(
                                      "label",
                                      {
                                        staticClass: "o-s-l",
                                        attrs: { for: "limit_for-" + key }
                                      },
                                      [_vm._v("For")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: limit.for,
                                            expression: "limit.for"
                                          }
                                        ],
                                        staticClass: "form-control",
                                        attrs: { id: "limit_for-" + key },
                                        on: {
                                          change: function($event) {
                                            var $$selectedVal = Array.prototype.filter
                                              .call(
                                                $event.target.options,
                                                function(o) {
                                                  return o.selected
                                                }
                                              )
                                              .map(function(o) {
                                                var val =
                                                  "_value" in o
                                                    ? o._value
                                                    : o.value
                                                return val
                                              })
                                            _vm.$set(
                                              limit,
                                              "for",
                                              $event.target.multiple
                                                ? $$selectedVal
                                                : $$selectedVal[0]
                                            )
                                          }
                                        }
                                      },
                                      _vm._l(_vm.fors, function(sfor) {
                                        return _c(
                                          "option",
                                          { domProps: { value: sfor.id } },
                                          [_vm._v(_vm._s(sfor.name))]
                                        )
                                      })
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "col-md-6 mb-3 outline-group"
                                  },
                                  [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: limit.max_amount_day,
                                          expression: "limit.max_amount_day"
                                        }
                                      ],
                                      staticClass: "form-control outline",
                                      attrs: {
                                        placeholder: " ",
                                        type: "number",
                                        id: "max_amount_day-" + key
                                      },
                                      domProps: { value: limit.max_amount_day },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            limit,
                                            "max_amount_day",
                                            $event.target.value
                                          )
                                        }
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "label",
                                      {
                                        attrs: { for: "max_amount_day-" + key }
                                      },
                                      [_vm._v("Max Amount Day")]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "col-md-6 mb-3 outline-group"
                                  },
                                  [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: limit.max_number_day,
                                          expression: "limit.max_number_day"
                                        }
                                      ],
                                      staticClass: "form-control outline",
                                      attrs: {
                                        placeholder: " ",
                                        type: "number",
                                        id: "max_number_day-" + key
                                      },
                                      domProps: { value: limit.max_number_day },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            limit,
                                            "max_number_day",
                                            $event.target.value
                                          )
                                        }
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "label",
                                      {
                                        attrs: { for: "max_number_day-" + key }
                                      },
                                      [_vm._v("Max Number Day")]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "col-md-6 mb-3 outline-group"
                                  },
                                  [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: limit.max_amount_month,
                                          expression: "limit.max_amount_month"
                                        }
                                      ],
                                      staticClass: "form-control outline",
                                      attrs: {
                                        placeholder: " ",
                                        type: "number",
                                        id: "max_amount_month-" + key
                                      },
                                      domProps: {
                                        value: limit.max_amount_month
                                      },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            limit,
                                            "max_amount_month",
                                            $event.target.value
                                          )
                                        }
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "label",
                                      {
                                        attrs: {
                                          for: "max_amount_month-" + key
                                        }
                                      },
                                      [_vm._v("Max Amount Month")]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "col-md-6 mb-3 outline-group"
                                  },
                                  [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: limit.max_number_month,
                                          expression: "limit.max_number_month"
                                        }
                                      ],
                                      staticClass: "form-control outline",
                                      attrs: {
                                        placeholder: " ",
                                        type: "number",
                                        id: "max_number_month-" + key
                                      },
                                      domProps: {
                                        value: limit.max_number_month
                                      },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            limit,
                                            "max_number_month",
                                            $event.target.value
                                          )
                                        }
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "label",
                                      {
                                        attrs: {
                                          for: "max_number_month-" + key
                                        }
                                      },
                                      [_vm._v("Max Number Month")]
                                    )
                                  ]
                                )
                              ])
                            ])
                          })
                        )
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
                                value: _vm.limitSearch.date_from,
                                callback: function($$v) {
                                  _vm.$set(_vm.limitSearch, "date_from", $$v)
                                },
                                expression: "limitSearch.date_from"
                              }
                            }),
                            _vm._v(
                              "\n                                    }\n                                "
                            )
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
                                value: _vm.limitSearch.date_to,
                                callback: function($$v) {
                                  _vm.$set(_vm.limitSearch, "date_to", $$v)
                                },
                                expression: "limitSearch.date_to"
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
                                  value: _vm.limitSearch.order_by,
                                  expression: "limitSearch.order_by"
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
                                    _vm.limitSearch,
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
                value: "doc-create",
                expression: "'doc-create'"
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
            _vm._v(" " + _vm._s(_vm.title()) + " Limit\n            ")
          ]
        ),
        _vm._v(" "),
        _vm.selected.length
          ? _c(
              "button",
              {
                staticClass: "btn btn-sm btn-danger ",
                on: {
                  click: function($event) {
                    _vm.deleteSelected()
                  }
                }
              },
              [
                _c("i", { staticClass: "icon-trash-empty" }),
                _vm._v(" Delete Selected")
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm._m(3)
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "table-responsive" }, [
        _c("table", { staticClass: "table table-striped bg-white" }, [
          _c("thead", [
            _c("tr", [
              _c("th", { staticStyle: { width: "20px" } }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.selectAll,
                      expression: "selectAll"
                    }
                  ],
                  attrs: { type: "checkbox", id: "check-all" },
                  domProps: {
                    checked: Array.isArray(_vm.selectAll)
                      ? _vm._i(_vm.selectAll, null) > -1
                      : _vm.selectAll
                  },
                  on: {
                    click: _vm.select,
                    change: function($event) {
                      var $$a = _vm.selectAll,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 && (_vm.selectAll = $$a.concat([$$v]))
                        } else {
                          $$i > -1 &&
                            (_vm.selectAll = $$a
                              .slice(0, $$i)
                              .concat($$a.slice($$i + 1)))
                        }
                      } else {
                        _vm.selectAll = $$c
                      }
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("th", [
                _c("label", { attrs: { for: "check-all" } }, [
                  _vm._v(_vm._s(_vm.limit_for == "role" ? "Role" : "User"))
                ])
              ]),
              _vm._v(" "),
              _vm.limit_for == "user" ? _c("th", [_vm._v("Status")]) : _vm._e(),
              _vm._v(" "),
              _c("th", [_vm._v("Actions")])
            ])
          ]),
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
              _vm._l(_vm.limits.data, function(limit, index) {
                return _c("tr", [
                  _c("td", [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.selected,
                          expression: "selected"
                        }
                      ],
                      attrs: {
                        type: "checkbox",
                        id: "checkbox-id-" + limit.id
                      },
                      domProps: {
                        value:
                          _vm.limit_for == "role"
                            ? limit.role.id
                            : limit.user.id,
                        checked: Array.isArray(_vm.selected)
                          ? _vm._i(
                              _vm.selected,
                              _vm.limit_for == "role"
                                ? limit.role.id
                                : limit.user.id
                            ) > -1
                          : _vm.selected
                      },
                      on: {
                        change: function($event) {
                          var $$a = _vm.selected,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v =
                                _vm.limit_for == "role"
                                  ? limit.role.id
                                  : limit.user.id,
                              $$i = _vm._i($$a, $$v)
                            if ($$el.checked) {
                              $$i < 0 && (_vm.selected = $$a.concat([$$v]))
                            } else {
                              $$i > -1 &&
                                (_vm.selected = $$a
                                  .slice(0, $$i)
                                  .concat($$a.slice($$i + 1)))
                            }
                          } else {
                            _vm.selected = $$c
                          }
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _vm.limit_for == "role"
                    ? _c("td", [
                        _c(
                          "label",
                          { attrs: { for: "checkbox-id-" + limit.id } },
                          [_vm._v(_vm._s(limit.role.name))]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.limit_for == "user"
                    ? _c("td", [
                        _c(
                          "label",
                          { attrs: { for: "checkbox-id-" + limit.id } },
                          [_vm._v(_vm._s(limit.user ? limit.user.name : ""))]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.limit_for == "user"
                    ? _c(
                        "td",
                        [
                          limit.status
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
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c("td", [
                    _c("div", { staticClass: "dropdown action-items" }, [
                      _vm._m(4, true),
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
                                  value: "doc-edit",
                                  expression: "'doc-edit'"
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
                                  _vm.editForm(limit)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                                   Edit \n                                "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              directives: [
                                {
                                  name: "can",
                                  rawName: "v-can",
                                  value: "doc-delete",
                                  expression: "'doc-delete'"
                                }
                              ],
                              staticClass: "dropdown-item",
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  _vm.deleteEntry(
                                    _vm.limit_for == "role"
                                      ? limit.role.id
                                      : limit.user.id,
                                    index
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                                    Delete\n                                "
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
          _c("tfoot", [
            _c("tr", [
              _c("th", [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.selectAll,
                      expression: "selectAll"
                    }
                  ],
                  attrs: { type: "checkbox", id: "check-all-bottom" },
                  domProps: {
                    checked: Array.isArray(_vm.selectAll)
                      ? _vm._i(_vm.selectAll, null) > -1
                      : _vm.selectAll
                  },
                  on: {
                    click: _vm.select,
                    change: function($event) {
                      var $$a = _vm.selectAll,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 && (_vm.selectAll = $$a.concat([$$v]))
                        } else {
                          $$i > -1 &&
                            (_vm.selectAll = $$a
                              .slice(0, $$i)
                              .concat($$a.slice($$i + 1)))
                        }
                      } else {
                        _vm.selectAll = $$c
                      }
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("th", [
                _c("label", { attrs: { for: "check-all-bottom" } }, [
                  _vm._v(_vm._s(_vm.limit_for == "role" ? "Role" : "User"))
                ])
              ]),
              _vm._v(" "),
              _vm.limit_for == "user" ? _c("th", [_vm._v("Status")]) : _vm._e(),
              _vm._v(" "),
              _c("th", [_vm._v("Actions")])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "table-actions" },
        [
          _c("pagination", {
            attrs: { data: _vm.limits, limit: 2 },
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
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-51fb554d", module.exports)
  }
}

/***/ })

});