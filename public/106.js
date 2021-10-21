webpackJsonp([106],{

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(486)
/* template */
var __vue_template__ = __webpack_require__(487)
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
Component.options.__file = "resources\\assets\\js\\admin\\views\\mt\\commission-custom-users\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-54574e29", Component.options)
  } else {
    hotAPI.reload("data-v-54574e29", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 486:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            dateOptions: this.$store.state.dateOptions,
            formType: false,
            service_lists: [{ key: 'mobile_recharge', value: 'Mobile Recharge' }, { key: 'mobile_recharge_pl', value: 'Mobile Recharge Powerload' }, { key: 'mobile_banking', value: 'Mobile Banking' }, { key: 'utility_bill_pay', value: 'Utility Bill Pay' }],
            commissionuser: {
                status: true,
                name: '',
                username: '',
                mobile_recharge: null,
                mobile_recharge_pl: null,
                mobile_banking: null,
                utility_bill_pay: null,
                mobile_recharge_service: [{ provider_id: null, services: [], service_id: '', commission: null, from_service: null }],
                mobile_recharge_pl_service: [{ provider_id: null, services: [], service_id: '', commission: null, from_service: null }],
                mobile_banking_service: [{ provider_id: null, services: [], service_id: '', commission: null, from_service: null }],
                utility_bill_pay_service: [{ provider_id: null, services: [], service_id: '', commission: null, from_service: null }]
            },
            commissionuser_const: {
                status: true,
                name: '',
                username: '',
                mobile_recharge: null,
                mobile_recharge_pl: null,
                mobile_banking: null,
                utility_bill_pay: null,
                mobile_recharge_service: [{ provider_id: null, services: [], service_id: '', commission: null, from_service: null }],
                mobile_recharge_pl_service: [{ provider_id: null, services: [], service_id: '', commission: null, from_service: null }],
                mobile_banking_service: [{ provider_id: null, services: [], service_id: '', commission: null, from_service: null }],
                utility_bill_pay_service: [{ provider_id: null, services: [], service_id: '', commission: null, from_service: null }]
            },
            commissionuserSearch: {
                user_id: '',
                date_from: '',
                date_to: '',
                order_by: ''
            },
            mobile_recharge_providers: [],
            mobile_banking_providers: [],
            utility_bill_pay_providers: [],
            accounts: [],
            isLoading: false,
            commissionusers: {},
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
        addServices: function addServices(index, service) {
            this.commissionuser[service + '_service'].splice(index + 1, 0, { provider_id: null, services: [], service_id: '', commission: null, from_service: null });
        },
        removeServices: function removeServices(index, service) {
            if (this.commissionuser[service + '_service'].length == 1) {
                // first remove
                this.commissionuser[service + '_service'].splice(index, 1);
                // than add empty
                this.commissionuser[service + '_service'].splice(index + 1, 0, { provider_id: null, services: [], service_id: '', commission: null, from_service: null });
            } else {
                this.commissionuser[service + '_service'].splice(index, 1);
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
        providerLists: function providerLists(key) {
            if (key == 'mobile_recharge') {
                return this.mobile_recharge_providers;
            } else if (key == 'mobile_banking') {
                return this.mobile_banking_providers;
            } else if (key == 'utility_bill_pay') {
                return this.utility_bill_pay_providers;
            } else {
                return this.mobile_recharge_providers;
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
        select: function select() {
            this.selected = [];
            if (!this.selectAll) {
                for (var key in this.commissionusers.data) {
                    this.selected.push(this.commissionusers.data[key].user.id);
                }
            }
        },
        dataSearch: function dataSearch() {
            var data_search = this.commissionuserSearch;
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
            if (_user.mobile) {
                return _user.mobile;
            } else if (_user.email) {
                return _user.email;
            } else {
                return _user.username;
            }
        },
        getLists: function getLists() {
            var _this2 = this;

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

            axios.get('/api/v1/mt/commissionusers?' + queryString).then(function (resp) {
                app.preloader = false;

                app.commissionusers = resp.data.commissionusers;
                app.allProviders = resp.data.providers;

                if (app.commissionusers.data.length == 0) {
                    app.noData = app.$store.state.noData;
                } else {
                    app.noData = '';
                }

                /* Providers By Category */
                app.mobile_recharge_providers = _this2.allProviders.filter(function (itm) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = itm.categories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var val = _step.value;

                            if (val.slug == 'mobile-recharge') {
                                return true;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                });

                app.mobile_banking_providers = _this2.allProviders.filter(function (itm) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = itm.categories[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var val = _step2.value;

                            if (val.slug == 'mobile-banking') {
                                return true;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                });

                app.utility_bill_pay_providers = _this2.allProviders.filter(function (itm) {
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = itm.categories[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var val = _step3.value;

                            if (val.slug == 'utility') {
                                return true;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
                });
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        },
        providerChanged: function providerChanged(key, service) {
            if (this.commissionuser[service + '_service'][key].provider_id.services) {
                this.commissionuser[service + '_service'][key].services = this.commissionuser[service + '_service'][key].provider_id.services;
                this.commissionuser[service + '_service'][key].service_id = this.commissionuser[service + '_service'][key].provider_id.services[0].id;
            }
        },
        newForm: function newForm() {
            this.formType = true;
            this.commissionuser = this.commissionuser_const;
        },
        saveForm: function saveForm() {
            $('#createModal').modal('toggle');
            var app = this;
            var newCommission = app.commissionuser;
            if (this.formType) {
                axios.post('/api/v1/mt/commissionusers', newCommission).then(function (resp) {
                    app.commissionuser = app.commissionuser_const;
                    app.$store.commit('submitMsg', 'add');
                    app.getLists();
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            } else {
                axios.patch('/api/v1/mt/commissionusers/' + newCommission.user_id, newCommission).then(function (resp) {
                    app.commissionuser = app.commissionuser_const;
                    app.$store.commit('submitMsg', 'update');
                    app.getLists();
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            }
        },
        editForm: function editForm(commissionusers) {
            var _this3 = this;

            this.formType = false;

            var mobile_recharge = null;
            var mobile_recharge_pl = null;
            var mobile_banking = null;
            var utility_bill_pay = null;

            var mobile_recharge_service = [];
            var mobile_recharge_pl_service = [];
            var mobile_banking_service = [];
            var utility_bill_pay_service = [];

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = commissionusers.commissions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var val = _step4.value;

                    if (val.type == 'mobile_recharge') {
                        mobile_recharge = val.commission;
                    }
                    if (val.type == 'mobile_recharge_pl') {
                        mobile_recharge_pl = val.commission;
                    }
                    if (val.type == 'mobile_banking') {
                        mobile_banking = val.commission;
                    }
                    if (val.type == 'utility_bill_pay') {
                        utility_bill_pay = val.commission;
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            var _loop = function _loop(_val) {
                var result = _this3.allProviders.find(function (obj) {
                    return obj.id == _val.provider_id;
                });

                _val.provider_id = result;
                _val.services = result.services;

                if (_val.type == 'mobile_recharge') {
                    mobile_recharge_service.push(_val);
                }
                if (_val.type == 'mobile_recharge_pl') {
                    mobile_recharge_pl_service.push(_val);
                }
                if (_val.type == 'mobile_banking') {
                    mobile_banking_service.push(_val);
                }
                if (_val.type == 'utility_bill_pay') {
                    utility_bill_pay_service.push(_val);
                }
            };

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = commissionusers.services[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _val = _step5.value;

                    _loop(_val);
                }

                /* If not Mobile Recharge */
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            if (!mobile_recharge_service.length) {
                mobile_recharge_service = [{ provider_id: null, services: [], service_id: '', commission: null, from_service: null }];
            }
            /* If not Mobile Recharge powerload */
            if (!mobile_recharge_pl_service.length) {
                mobile_recharge_pl_service = [{ provider_id: null, services: [], service_id: '', commission: null, from_service: null }];
            }
            /* If not Mobile Banking */
            if (!mobile_banking_service.length) {
                mobile_banking_service = [{ provider_id: null, services: [], service_id: '', commission: null, from_service: null }];
            }
            /* If not Utility Bill Pay */
            if (!utility_bill_pay_service.length) {
                utility_bill_pay_service = [{ provider_id: null, services: [], service_id: '', commission: null, from_service: null }];
            }

            this.commissionuser = {
                user_id: commissionusers.user.id,
                status: commissionusers.status.status,
                name: commissionusers.user.name,
                mobile_recharge: mobile_recharge,
                mobile_recharge_pl: mobile_recharge_pl,
                mobile_banking: mobile_banking,
                utility_bill_pay: utility_bill_pay,
                mobile_recharge_service: mobile_recharge_service,
                mobile_recharge_pl_service: mobile_recharge_pl_service,
                mobile_banking_service: mobile_banking_service,
                utility_bill_pay_service: utility_bill_pay_service
            };
        },
        deleteEntry: function deleteEntry(id, index, user_id) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/mt/commissionusers/' + user_id).then(function (resp) {
                    app.commissionusers.data.splice(index, 1);
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
                axios.delete('/api/v1/mt/commissionusers/' + selectedItem).then(function (resp) {
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

/***/ 487:
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
          _vm._v("\n           Commission Custom User Lists\n        ")
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
              value: "commission-custom-user-create",
              expression: "'commission-custom-user-create'"
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
                          _vm._s(
                            _vm.formType
                              ? "New"
                              : "Update " + this.commissionuser.name
                          ) +
                          " Commission"
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
                      _c(
                        "div",
                        { staticClass: "form-row" },
                        [
                          _c("div", { staticClass: "col-md-12 mb-2" }, [
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
                                    value: _vm.commissionuser.status,
                                    expression: "commissionuser.status"
                                  }
                                ],
                                attrs: { type: "checkbox" },
                                domProps: {
                                  checked: Array.isArray(
                                    _vm.commissionuser.status
                                  )
                                    ? _vm._i(_vm.commissionuser.status, null) >
                                      -1
                                    : _vm.commissionuser.status
                                },
                                on: {
                                  change: function($event) {
                                    var $$a = _vm.commissionuser.status,
                                      $$el = $event.target,
                                      $$c = $$el.checked ? true : false
                                    if (Array.isArray($$a)) {
                                      var $$v = null,
                                        $$i = _vm._i($$a, $$v)
                                      if ($$el.checked) {
                                        $$i < 0 &&
                                          _vm.$set(
                                            _vm.commissionuser,
                                            "status",
                                            $$a.concat([$$v])
                                          )
                                      } else {
                                        $$i > -1 &&
                                          _vm.$set(
                                            _vm.commissionuser,
                                            "status",
                                            $$a
                                              .slice(0, $$i)
                                              .concat($$a.slice($$i + 1))
                                          )
                                      }
                                    } else {
                                      _vm.$set(
                                        _vm.commissionuser,
                                        "status",
                                        $$c
                                      )
                                    }
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("span", { staticClass: "slider round" })
                            ])
                          ]),
                          _vm._v(" "),
                          this.formType
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
                                      value: _vm.commissionuser.username,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.commissionuser,
                                          "username",
                                          $$v
                                        )
                                      },
                                      expression: "commissionuser.username"
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
                          _vm._m(1),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-md-6 mb-3 outline-group" },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.commissionuser.mobile_recharge,
                                    expression: "commissionuser.mobile_recharge"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "mobile_recharge"
                                },
                                domProps: {
                                  value: _vm.commissionuser.mobile_recharge
                                },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.commissionuser,
                                      "mobile_recharge",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "mobile_recharge" } },
                                [_vm._v("Mobile Recharge (%)")]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-md-6 mb-3 outline-group" },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value:
                                      _vm.commissionuser.mobile_recharge_pl,
                                    expression:
                                      "commissionuser.mobile_recharge_pl"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "mobile_recharge_pl"
                                },
                                domProps: {
                                  value: _vm.commissionuser.mobile_recharge_pl
                                },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.commissionuser,
                                      "mobile_recharge_pl",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "mobile_recharge_pl" } },
                                [_vm._v("Mobile Recharge Powerload (%)")]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-md-6 mb-3 outline-group" },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.commissionuser.mobile_banking,
                                    expression: "commissionuser.mobile_banking"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "mobile_banking"
                                },
                                domProps: {
                                  value: _vm.commissionuser.mobile_banking
                                },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.commissionuser,
                                      "mobile_banking",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "mobile_banking" } },
                                [_vm._v("Mobile Banking (%)")]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-md-6 mb-3 outline-group" },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.commissionuser.utility_bill_pay,
                                    expression:
                                      "commissionuser.utility_bill_pay"
                                  }
                                ],
                                staticClass: "form-control outline",
                                attrs: {
                                  placeholder: " ",
                                  type: "text",
                                  id: "utility_bill_pay"
                                },
                                domProps: {
                                  value: _vm.commissionuser.utility_bill_pay
                                },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.commissionuser,
                                      "utility_bill_pay",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "utility_bill_pay" } },
                                [_vm._v("Utility Bill Pay (%)")]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _vm._l(_vm.service_lists, function(service_name) {
                            return [
                              _c("div", { staticClass: "col-md-12 mt-2" }, [
                                _c("label", [
                                  _vm._v(
                                    _vm._s(service_name.value) + " Service"
                                  )
                                ])
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "mt-number-list" },
                                _vm._l(
                                  _vm.commissionuser[
                                    service_name.key + "_service"
                                  ],
                                  function(service, key) {
                                    return _c(
                                      "div",
                                      { staticClass: "mt-numbers" },
                                      [
                                        _c("div", { staticClass: "mt-title" }, [
                                          _vm._v(
                                            "\n                                                Service: " +
                                              _vm._s(key + 1) +
                                              "\n                                            "
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "mt-control" },
                                          [
                                            _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "btn btn-primary btn-sm",
                                                on: {
                                                  click: function($event) {
                                                    _vm.addServices(
                                                      key,
                                                      service_name.key
                                                    )
                                                  }
                                                }
                                              },
                                              [
                                                _c("i", {
                                                  staticClass: "icon-plus"
                                                })
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "btn btn-danger btn-sm",
                                                on: {
                                                  click: function($event) {
                                                    _vm.removeServices(
                                                      key,
                                                      service_name.key
                                                    )
                                                  }
                                                }
                                              },
                                              [
                                                _c("i", {
                                                  staticClass: "icon-minus"
                                                })
                                              ]
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c("div", { staticClass: "form-row" }, [
                                          _c(
                                            "div",
                                            {
                                              staticClass: "col-md-12 mt-4 mb-3"
                                            },
                                            [
                                              _c(
                                                "div",
                                                { staticClass: "form-row" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "col-sm-7 col-xs-12"
                                                    },
                                                    [
                                                      _c(
                                                        "label",
                                                        {
                                                          staticClass: "o-s-l"
                                                        },
                                                        [_vm._v("Operator")]
                                                      ),
                                                      _vm._v(" "),
                                                      _c("multiselect", {
                                                        attrs: {
                                                          "allow-empty": false,
                                                          "deselect-label": "",
                                                          "select-label": "",
                                                          options: _vm.providerLists(
                                                            service_name.key
                                                          ),
                                                          "preserve-search": true,
                                                          label: "name",
                                                          "track-by": "name",
                                                          "preselect-first": false
                                                        },
                                                        on: {
                                                          input: function(
                                                            $event
                                                          ) {
                                                            _vm.providerChanged(
                                                              key,
                                                              service_name.key
                                                            )
                                                          }
                                                        },
                                                        scopedSlots: _vm._u([
                                                          {
                                                            key: "singleLabel",
                                                            fn: function(
                                                              props
                                                            ) {
                                                              return [
                                                                props.option
                                                                  .logo_small_src
                                                                  ? [
                                                                      _c(
                                                                        "img",
                                                                        {
                                                                          staticClass:
                                                                            "option__image",
                                                                          attrs: {
                                                                            src:
                                                                              "/uploads/imgs/" +
                                                                              props
                                                                                .option
                                                                                .logo_small_src
                                                                                .resized_name,
                                                                            alt:
                                                                              props
                                                                                .option
                                                                                .name
                                                                          }
                                                                        }
                                                                      )
                                                                    ]
                                                                  : _vm._e(),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "span",
                                                                  {
                                                                    staticClass:
                                                                      "option__title"
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      " " +
                                                                        _vm._s(
                                                                          props
                                                                            .option
                                                                            .name
                                                                        )
                                                                    )
                                                                  ]
                                                                )
                                                              ]
                                                            }
                                                          },
                                                          {
                                                            key: "option",
                                                            fn: function(
                                                              props
                                                            ) {
                                                              return [
                                                                props.option
                                                                  .logo_small_src
                                                                  ? [
                                                                      _c(
                                                                        "img",
                                                                        {
                                                                          staticClass:
                                                                            "option__image",
                                                                          attrs: {
                                                                            src:
                                                                              "/uploads/imgs/" +
                                                                              props
                                                                                .option
                                                                                .logo_small_src
                                                                                .resized_name,
                                                                            alt:
                                                                              props
                                                                                .option
                                                                                .name
                                                                          }
                                                                        }
                                                                      )
                                                                    ]
                                                                  : _vm._e(),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "span",
                                                                  {
                                                                    staticClass:
                                                                      "option__title"
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      " " +
                                                                        _vm._s(
                                                                          props
                                                                            .option
                                                                            .name
                                                                        )
                                                                    )
                                                                  ]
                                                                )
                                                              ]
                                                            }
                                                          }
                                                        ]),
                                                        model: {
                                                          value:
                                                            service.provider_id,
                                                          callback: function(
                                                            $$v
                                                          ) {
                                                            _vm.$set(
                                                              service,
                                                              "provider_id",
                                                              $$v
                                                            )
                                                          },
                                                          expression:
                                                            "service.provider_id"
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
                                                        "col-sm-5 col-xs-12"
                                                    },
                                                    [
                                                      _c(
                                                        "label",
                                                        {
                                                          staticClass: "o-s-l",
                                                          attrs: {
                                                            for:
                                                              "service_id" + key
                                                          }
                                                        },
                                                        [_vm._v("Type")]
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "select",
                                                        {
                                                          directives: [
                                                            {
                                                              name: "model",
                                                              rawName:
                                                                "v-model",
                                                              value:
                                                                service.service_id,
                                                              expression:
                                                                "service.service_id"
                                                            }
                                                          ],
                                                          staticClass:
                                                            "form-control",
                                                          attrs: {
                                                            id:
                                                              "service_id" + key
                                                          },
                                                          on: {
                                                            change: function(
                                                              $event
                                                            ) {
                                                              var $$selectedVal = Array.prototype.filter
                                                                .call(
                                                                  $event.target
                                                                    .options,
                                                                  function(o) {
                                                                    return o.selected
                                                                  }
                                                                )
                                                                .map(function(
                                                                  o
                                                                ) {
                                                                  var val =
                                                                    "_value" in
                                                                    o
                                                                      ? o._value
                                                                      : o.value
                                                                  return val
                                                                })
                                                              _vm.$set(
                                                                service,
                                                                "service_id",
                                                                $event.target
                                                                  .multiple
                                                                  ? $$selectedVal
                                                                  : $$selectedVal[0]
                                                              )
                                                            }
                                                          }
                                                        },
                                                        _vm._l(
                                                          service.services,
                                                          function(service) {
                                                            return _c(
                                                              "option",
                                                              {
                                                                domProps: {
                                                                  value:
                                                                    service.id
                                                                }
                                                              },
                                                              [
                                                                _vm._v(
                                                                  _vm._s(
                                                                    service.name
                                                                  )
                                                                )
                                                              ]
                                                            )
                                                          }
                                                        )
                                                      )
                                                    ]
                                                  )
                                                ]
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "col-md-6 mb-3 outline-group mar-b-25"
                                            },
                                            [
                                              _c("input", {
                                                directives: [
                                                  {
                                                    name: "model",
                                                    rawName: "v-model",
                                                    value: service.commission,
                                                    expression:
                                                      "service.commission"
                                                  }
                                                ],
                                                staticClass:
                                                  "form-control outline",
                                                attrs: {
                                                  placeholder: " ",
                                                  type: "text",
                                                  id: "commission" + key
                                                },
                                                domProps: {
                                                  value: service.commission
                                                },
                                                on: {
                                                  input: function($event) {
                                                    if (
                                                      $event.target.composing
                                                    ) {
                                                      return
                                                    }
                                                    _vm.$set(
                                                      service,
                                                      "commission",
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
                                                    for: "commission" + key
                                                  }
                                                },
                                                [_vm._v("Commission (%)")]
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "col-md-6 mb-3 outline-group"
                                            },
                                            [
                                              _c("input", {
                                                directives: [
                                                  {
                                                    name: "model",
                                                    rawName: "v-model",
                                                    value: service.from_service,
                                                    expression:
                                                      "service.from_service"
                                                  }
                                                ],
                                                staticClass:
                                                  "form-control outline",
                                                attrs: {
                                                  placeholder: " ",
                                                  type: "text",
                                                  id: "from_service" + key
                                                },
                                                domProps: {
                                                  value: service.from_service
                                                },
                                                on: {
                                                  input: function($event) {
                                                    if (
                                                      $event.target.composing
                                                    ) {
                                                      return
                                                    }
                                                    _vm.$set(
                                                      service,
                                                      "from_service",
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
                                                    for: "from_service" + key
                                                  }
                                                },
                                                [_vm._v("From Service (%)")]
                                              )
                                            ]
                                          )
                                        ])
                                      ]
                                    )
                                  }
                                )
                              )
                            ]
                          })
                        ],
                        2
                      )
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
                _vm._m(2),
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
                                value: _vm.commissionuserSearch.user_id,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.commissionuserSearch,
                                    "user_id",
                                    $$v
                                  )
                                },
                                expression: "commissionuserSearch.user_id"
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
                          { staticClass: "col-12 mb-3" },
                          [
                            _c("date-picker", {
                              attrs: {
                                config: _vm.dateOptions,
                                placeholder: "Date From"
                              },
                              model: {
                                value: _vm.commissionuserSearch.date_from,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.commissionuserSearch,
                                    "date_from",
                                    $$v
                                  )
                                },
                                expression: "commissionuserSearch.date_from"
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
                                value: _vm.commissionuserSearch.date_to,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.commissionuserSearch,
                                    "date_to",
                                    $$v
                                  )
                                },
                                expression: "commissionuserSearch.date_to"
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
                                  value: _vm.commissionuserSearch.order_by,
                                  expression: "commissionuserSearch.order_by"
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
                                    _vm.commissionuserSearch,
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
                        _vm._m(3)
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
                value: "commission-custom-user-create",
                expression: "'commission-custom-user-create'"
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
            _vm._v(" Commission\n            ")
          ]
        ),
        _vm._v(" "),
        _vm.selected.length
          ? _c(
              "button",
              {
                directives: [
                  {
                    name: "can",
                    rawName: "v-can",
                    value: "commission-custom-user-delete",
                    expression: "'commission-custom-user-delete'"
                  }
                ],
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
        _vm._m(4)
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
              _vm._m(5),
              _vm._v(" "),
              _c("th", [_vm._v("Name")]),
              _vm._v(" "),
              _c("th", [_vm._v("Status")]),
              _vm._v(" "),
              _c("th", [_vm._v("Main Commission (%)")]),
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
              _vm._l(_vm.commissionusers.data, function(commissionuser, index) {
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
                        id: "checkbox-id-" + commissionuser.id
                      },
                      domProps: {
                        value: commissionuser.user.id,
                        checked: Array.isArray(_vm.selected)
                          ? _vm._i(_vm.selected, commissionuser.user.id) > -1
                          : _vm.selected
                      },
                      on: {
                        change: function($event) {
                          var $$a = _vm.selected,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v = commissionuser.user.id,
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
                  _c("td", [
                    _c(
                      "label",
                      { attrs: { for: "checkbox-id-" + commissionuser.id } },
                      [_vm._v(_vm._s(_vm.user(commissionuser.user)))]
                    )
                  ]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(commissionuser.user.name))]),
                  _vm._v(" "),
                  _c(
                    "td",
                    [
                      commissionuser.status.status
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
                  _c(
                    "td",
                    [
                      commissionuser.commissions
                        ? [
                            _vm._l(commissionuser.commissions, function(
                              value,
                              index
                            ) {
                              return [
                                _c(
                                  "span",
                                  { staticClass: "btn btn-sm btn-dark mr-2" },
                                  [
                                    value.type == "mobile_recharge"
                                      ? [_vm._v("Mobile Recharge")]
                                      : value.type == "mobile_recharge_pl"
                                        ? [_vm._v("Mobile Recharge Powerload")]
                                        : value.type == "mobile_banking"
                                          ? [_vm._v("Mobile Banking")]
                                          : value.type == "utility_bill_pay"
                                            ? [_vm._v("Utility Bill Pay")]
                                            : _vm._e(),
                                    _vm._v(
                                      " \n                                     : " +
                                        _vm._s(value.commission) +
                                        "\n                                    "
                                    )
                                  ],
                                  2
                                )
                              ]
                            })
                          ]
                        : _vm._e()
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c("td", [
                    _c("div", { staticClass: "dropdown action-items" }, [
                      _vm._m(6, true),
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
                                  value: "commission-custom-user-edit",
                                  expression: "'commission-custom-user-edit'"
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
                                  _vm.editForm(commissionuser)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                                   Edit / View\n                                "
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
                                  value: "commission-custom-user-delete",
                                  expression: "'commission-custom-user-delete'"
                                }
                              ],
                              staticClass: "dropdown-item",
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  _vm.deleteEntry(
                                    commissionuser.id,
                                    index,
                                    commissionuser.user.id
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
              _vm._m(7),
              _vm._v(" "),
              _c("th", [_vm._v("Name")]),
              _vm._v(" "),
              _c("th", [_vm._v("Status")]),
              _vm._v(" "),
              _c("th", [_vm._v("Main Commission (%)")]),
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
            attrs: { data: _vm.commissionusers, limit: 2 },
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
    return _c("div", { staticClass: "col-md-12" }, [
      _c("label", [_vm._v("Main Commission")])
    ])
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
    return _c("th", [
      _c("label", { attrs: { for: "check-all" } }, [_vm._v("User Id")])
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
    return _c("th", [
      _c("label", { attrs: { for: "check-all-bottom" } }, [_vm._v("User Id")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-54574e29", module.exports)
  }
}

/***/ })

});