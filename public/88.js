webpackJsonp([88],{

/***/ 299:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(546)
/* template */
var __vue_template__ = __webpack_require__(547)
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
Component.options.__file = "resources\\assets\\js\\admin\\views\\setting\\mt\\commissions\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-46e5b462", Component.options)
  } else {
    hotAPI.reload("data-v-46e5b462", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 546:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            dateOptions: this.$store.state.dateOptions,
            com: {
                mobile_recharge_com: null,
                mobile_recharge_pl_com: null,
                mobile_banking_com: null,
                utility_bill_pay_com: null
            }
        };
    },
    created: function created() {
        this.getLists();
    },

    methods: {
        getLists: function getLists() {
            var app = this;

            axios.post('/api/v1/mt/settings', this.com).then(function (resp) {
                for (var key in resp.data.settings) {

                    if (resp.data.settings[key].key == 'mobile_recharge_com') {
                        app.com.mobile_recharge_com = resp.data.settings[key].value;
                    }

                    if (resp.data.settings[key].key == 'mobile_recharge_pl_com') {
                        app.com.mobile_recharge_pl_com = resp.data.settings[key].value;
                    }

                    if (resp.data.settings[key].key == 'mobile_banking_com') {
                        app.com.mobile_banking_com = resp.data.settings[key].value;
                    }

                    if (resp.data.settings[key].key == 'utility_bill_pay_com') {
                        app.com.utility_bill_pay_com = resp.data.settings[key].value;
                    }
                }
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        },
        updateForm: function updateForm() {
            var app = this;
            var newSettings = app.com;
            axios.post('/api/v1/mt/settings_update', newSettings).then(function (resp) {
                app.$store.commit('submitMsg', 'update');
                app.getLists();
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        }
    } //methods
    //export default

});

/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "component" }, [
    _c("div", { staticClass: "component-body bg-white" }, [
      _c(
        "form",
        {
          on: {
            submit: function($event) {
              $event.preventDefault()
              _vm.updateForm()
            }
          }
        },
        [
          _c("div", { staticClass: "modal-body" }, [
            _c("div", { staticClass: "form-row" }, [
              _c("div", { staticClass: "col-md-12 mb-3 mt-3 outline-group" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.com.mobile_recharge_com,
                      expression: "com.mobile_recharge_com"
                    }
                  ],
                  staticClass: "form-control outline",
                  attrs: {
                    placeholder: " ",
                    type: "text",
                    id: "mobile_recharge_com"
                  },
                  domProps: { value: _vm.com.mobile_recharge_com },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.com,
                        "mobile_recharge_com",
                        $event.target.value
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", { attrs: { for: "mobile_recharge_com" } }, [
                  _vm._v("Mobile Recharge Commission (%)")
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-12 mb-3 outline-group" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.com.mobile_recharge_pl_com,
                      expression: "com.mobile_recharge_pl_com"
                    }
                  ],
                  staticClass: "form-control outline",
                  attrs: {
                    placeholder: " ",
                    type: "text",
                    id: "mobile_recharge_pl_com"
                  },
                  domProps: { value: _vm.com.mobile_recharge_pl_com },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.com,
                        "mobile_recharge_pl_com",
                        $event.target.value
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", { attrs: { for: "mobile_recharge_pl_com" } }, [
                  _vm._v("Mobile Recharge Powerload Commission (%)")
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-12 mb-3 outline-group" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.com.mobile_banking_com,
                      expression: "com.mobile_banking_com"
                    }
                  ],
                  staticClass: "form-control outline",
                  attrs: {
                    placeholder: " ",
                    type: "text",
                    id: "mobile_banking_com"
                  },
                  domProps: { value: _vm.com.mobile_banking_com },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.com,
                        "mobile_banking_com",
                        $event.target.value
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", { attrs: { for: "mobile_banking_com" } }, [
                  _vm._v("Mobile Banking Commission (%)")
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-12 mb-5 outline-group" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.com.utility_bill_pay_com,
                      expression: "com.utility_bill_pay_com"
                    }
                  ],
                  staticClass: "form-control outline",
                  attrs: {
                    placeholder: " ",
                    type: "text",
                    id: "utility_bill_pay_com"
                  },
                  domProps: { value: _vm.com.utility_bill_pay_com },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.com,
                        "utility_bill_pay_com",
                        $event.target.value
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", { attrs: { for: "utility_bill_pay_com" } }, [
                  _vm._v("Utility Bill Pay Commission (%)")
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _vm._m(0)
        ]
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-footer" }, [
      _c(
        "button",
        { staticClass: "btn btn-primary", attrs: { type: "submit" } },
        [_vm._v("Update")]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-46e5b462", module.exports)
  }
}

/***/ })

});