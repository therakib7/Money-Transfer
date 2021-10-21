webpackJsonp([103],{

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(323)
/* template */
var __vue_template__ = __webpack_require__(324)
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
Component.options.__file = "resources\\assets\\js\\admin\\views\\mt\\home\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5278ce00", Component.options)
  } else {
    hotAPI.reload("data-v-5278ce00", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 323:
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


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {};
    },

    watch: {},
    created: function created() {},

    methods: {}, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: {
                mobile_rechage: 'Mobile Recharge',
                mobile_banking: 'Mobile Banking',
                cashout_banking: 'CashOut M Banking',
                utility_bill_pay: 'Utility Bill Pay',
                contact: 'Contact',
                balance_transfer: 'Balance Transfer',
                messages: 'Messages'
            },
            bn: {
                mobile_rechage: 'মোবাইল রিচার্জ',
                mobile_banking: 'মোবাইল ব্যাংকিং',
                cashout_banking: 'ক্যাশআউট মোবাইল ব্যাংকিং',
                utility_bill_pay: 'প্রয়োজনীয় বিল প্রদান',
                contact: 'ফোনবুক',
                balance_transfer: 'ব্যালেন্স ট্রান্সফার',
                messages: 'মেসেজ'
            }
        }
    } //export default

});

/***/ }),

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "component" }, [
    _c("div", { staticClass: "component-body" }, [
      _c("div", { staticClass: "bg-color" }, [
        _c("div", { staticClass: "user-panel d-block d-lg-none" }, [
          _c("div", { staticClass: "float-left image" }, [
            _c("img", {
              staticClass: "img-circle",
              attrs: { src: _vm.$root.profile.image, alt: "User Image" }
            })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "info" }, [
            _c("p", [
              _vm._v(
                "\n                        " +
                  _vm._s(_vm.$root.profile.name) +
                  " "
              ),
              _c("br"),
              _vm._v(" "),
              _c("i", {
                staticClass: "icon-money",
                attrs: { "aria-hidden": "true" }
              }),
              _vm._v(" "),
              _c("span", { attrs: { id: "user-balance" } }, [
                _vm._v(_vm._s(_vm.$root.profile.balance))
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "common-menu" }, [
        _c("div", { staticClass: "form-row" }, [
          _c(
            "div",
            { staticClass: "col-6 col-sm-4 col-lg-3 mb-3" },
            [
              _c(
                "router-link",
                {
                  attrs: {
                    to: {
                      name: "mobileRecharges",
                      query: { page: 1, per_page: 20 }
                    }
                  }
                },
                [
                  _c("div", { staticClass: "c-content" }, [
                    _c("i", {
                      staticClass: "icon-mobile",
                      attrs: { "aria-hidden": "true" }
                    }),
                    _vm._v(" "),
                    _c("span", [_vm._v(_vm._s(_vm.$t("mobile_rechage")))])
                  ])
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "can",
                  rawName: "v-can",
                  value: "mobile-banking-view",
                  expression: "'mobile-banking-view'"
                }
              ],
              staticClass: "col-6 col-sm-4 col-lg-3 mb-3"
            },
            [
              _c(
                "router-link",
                {
                  attrs: {
                    to: {
                      name: "mobileBankings",
                      query: { page: 1, per_page: 20 }
                    }
                  }
                },
                [
                  _c("div", { staticClass: "c-content" }, [
                    _c("i", {
                      staticClass: "icon-bank",
                      attrs: { "aria-hidden": "true" }
                    }),
                    _vm._v(" "),
                    _c("span", [_vm._v(_vm._s(_vm.$t("mobile_banking")))])
                  ])
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "can",
                  rawName: "v-can",
                  value: "cashout-banking-view",
                  expression: "'cashout-banking-view'"
                }
              ],
              staticClass: "col-6 col-sm-4 col-lg-3 mb-3"
            },
            [
              _c(
                "router-link",
                {
                  attrs: {
                    to: {
                      name: "mtCashoutMB",
                      query: { page: 1, per_page: 20 }
                    }
                  }
                },
                [
                  _c("div", { staticClass: "c-content" }, [
                    _c("i", {
                      staticClass: "icon-reply",
                      attrs: { "aria-hidden": "true" }
                    }),
                    _vm._v(" "),
                    _c("span", [_vm._v(_vm._s(_vm.$t("cashout_banking")))])
                  ])
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "can",
                  rawName: "v-can",
                  value: "utility-bill-view",
                  expression: "'utility-bill-view'"
                }
              ],
              staticClass: "col-6 col-sm-4 col-lg-3 mb-3"
            },
            [
              _c(
                "router-link",
                {
                  attrs: {
                    to: {
                      name: "mtUtilities",
                      query: { page: 1, per_page: 20 }
                    }
                  }
                },
                [
                  _c("div", { staticClass: "c-content" }, [
                    _c("i", {
                      staticClass: "icon-lightbulb ",
                      attrs: { "aria-hidden": "true" }
                    }),
                    _vm._v(" "),
                    _c("span", [_vm._v(_vm._s(_vm.$t("utility_bill_pay")))])
                  ])
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-6 col-sm-4 col-lg-3 mb-3" },
            [
              _c(
                "router-link",
                {
                  attrs: {
                    to: { name: "ctContacts", query: { page: 1, per_page: 20 } }
                  }
                },
                [
                  _c("div", { staticClass: "c-content" }, [
                    _c("i", {
                      staticClass: "icon-address-book",
                      attrs: { "aria-hidden": "true" }
                    }),
                    _vm._v(" "),
                    _c("span", [_vm._v(_vm._s(_vm.$t("contact")))])
                  ])
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-6 col-sm-4 col-lg-3 mb-3" },
            [
              _c(
                "router-link",
                {
                  attrs: {
                    to: {
                      name: "acBalanceTransfer",
                      query: { page: 1, per_page: 20 }
                    }
                  }
                },
                [
                  _c("div", { staticClass: "c-content" }, [
                    _c("i", {
                      staticClass: "icon-share",
                      attrs: { "aria-hidden": "true" }
                    }),
                    _vm._v(" "),
                    _c("span", [_vm._v(_vm._s(_vm.$t("balance_transfer")))])
                  ])
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-6 col-sm-4 col-lg-3 mb-3" },
            [
              _c(
                "router-link",
                {
                  attrs: {
                    to: { name: "msgInbox", query: { page: 1, per_page: 20 } }
                  }
                },
                [
                  _c("div", { staticClass: "c-content" }, [
                    _c("i", {
                      staticClass: "icon-mail",
                      attrs: { "aria-hidden": "true" }
                    }),
                    _vm._v(" "),
                    _c("span", [_vm._v(_vm._s(_vm.$t("messages")))])
                  ])
                ]
              )
            ],
            1
          )
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5278ce00", module.exports)
  }
}

/***/ })

});