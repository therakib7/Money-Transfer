webpackJsonp([87],{

/***/ 293:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(532)
/* template */
var __vue_template__ = __webpack_require__(533)
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
Component.options.__file = "resources\\assets\\js\\admin\\views\\setting\\mt\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0646dd43", Component.options)
  } else {
    hotAPI.reload("data-v-0646dd43", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 532:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            dateOptions: this.$store.state.dateOptions,
            name: this.$route.name
        };
    },

    watch: {
        '$route.name': function $routeName(name) {
            this.name = name;
            $('#settingMobile').modal('hide');
        }
    },
    created: function created() {},
    mounted: function mounted() {
        $(".setting-menu").click(function () {
            $(".custom-menu-modal").toggleClass("left");
        });
        $(".custom-header .close, .custom-menu-modal .list-group-item").click(function () {
            $(".custom-menu-modal").removeClass("left");
        });

        $(document).on('mouseup', function (e) {
            var container = $('.custom-menu-modal, .setting-menu');
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $(".custom-menu-modal").removeClass('left');
            }
        });
    },

    methods: {
        title: function title() {
            var app = this;
            switch (this.name) {
                case 'mtSettingCommissions':
                    return this.$t('commissions');
                    break;

                case 'mtSettingMobileRecharge':
                    return this.$t('mobile_recharge');
                    break;

                case 'mtSettingMobileBanking':
                    return this.$t('mobile_banking');
                    break;

                case 'mtSettingUtilities':
                    return this.$t('utility_bill_pay');
                    break;

                case 'mtSettingProfile':
                    return this.$t('profile');
                    break;

                case 'mtSettingSecurity':
                    return this.$t('security');
                    break;
            }
        }
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: {
                setting: 'Setting',
                security: 'Security',
                profile: 'Profile',
                se_Lo: 'Security & Login',
                mobile_recharge: 'Mobile Recharge',
                mobile_banking: 'Mobile Banking',
                utility_bill_pay: 'Utility Bill Pay',
                commissions: 'Commissions',
                appearance: 'Appearance',
                //mobile menu
                set_menu: 'Settings Menu'

            },
            bn: {
                setting: 'সেটিং',
                security: 'নিরাপত্তা',
                profile: 'প্রোফাইল',
                se_Lo: 'নিরাপত্তা ও লগইন',
                mobile_recharge: 'মোবাইল রিচার্জ',
                mobile_banking: 'মোবাইল ব্যাংকিং',
                utility_bill_pay: 'প্রয়োজনীয় বিল প্রদান',
                commissions: 'কমিশন',
                appearance: 'সাজসজ্জা',
                //mobile menu
                set_menu: 'সেটিং মেনু'
            }
        }
    } //export default

});

/***/ }),

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "component" }, [
    _c("div", { staticClass: "row d-block d-md-none mt-4" }, [
      _c("div", { staticClass: "col-md-12 mb-3" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-md d-block w-100 mb-3 btn-info setting-menu",
            attrs: { type: "button" }
          },
          [
            _c("i", { staticClass: "icon-menu" }),
            _vm._v(" "),
            _c("span", [_vm._v(_vm._s(_vm.$t("set_menu")))])
          ]
        )
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "component-heading clearfix" },
      [
        _c("h2", { staticClass: "heading float-left" }, [
          _vm._v(
            "\n           " +
              _vm._s(_vm.$t("setting")) +
              " : " +
              _vm._s(_vm.title()) +
              "\n        "
          )
        ]),
        _vm._v(" "),
        _c("back-forward")
      ],
      1
    ),
    _vm._v(" "),
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
                    attrs: { to: { name: "mtSettingMobileBanking" } }
                  },
                  [
                    _c("span", { staticClass: "icon-bank" }),
                    _vm._v(
                      _vm._s(_vm.$t("mobile_banking")) +
                        "\n                        "
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
                        value: "utility-bill-view",
                        expression: "'utility-bill-view'"
                      }
                    ],
                    staticClass: "list-group-item",
                    attrs: { to: { name: "mtSettingUtilities" } }
                  },
                  [
                    _c("span", { staticClass: "icon-lightbulb" }),
                    _vm._v(
                      _vm._s(_vm.$t("utility_bill_pay")) +
                        "\n                        "
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
                        value: "setting-commission-view",
                        expression: "'setting-commission-view'"
                      }
                    ],
                    staticClass: "list-group-item",
                    attrs: { to: { name: "mtSettingCommissions" } }
                  },
                  [
                    _c("span", { staticClass: "icon-percent" }),
                    _vm._v(
                      _vm._s(_vm.$t("commissions")) +
                        "\n                        "
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
                        value: "setting-appreance-view",
                        expression: "'setting-appreance-view'"
                      }
                    ],
                    staticClass: "list-group-item",
                    attrs: { to: { name: "mtSettingAppreances" } }
                  },
                  [
                    _c("span", { staticClass: "icon-chart-bar" }),
                    _vm._v(
                      _vm._s(_vm.$t("appearance")) +
                        "\n                        "
                    )
                  ]
                )
              ],
              1
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-9" }, [_c("router-view")], 1)
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("button", { staticClass: "close", attrs: { type: "button" } }, [
      _c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0646dd43", module.exports)
  }
}

/***/ })

});