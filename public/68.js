webpackJsonp([68],{

/***/ 309:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(310)
}
var normalizeComponent = __webpack_require__(15)
/* script */
var __vue_script__ = __webpack_require__(312)
/* template */
var __vue_template__ = __webpack_require__(313)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b90d8616"
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
Component.options.__file = "resources\\assets\\js\\admin\\components\\location\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b90d8616", Component.options)
  } else {
    hotAPI.reload("data-v-b90d8616", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(311);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(300)("1e2cba07", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b90d8616\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b90d8616\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(159)(false);
// imports


// module
exports.push([module.i, "\n.address-suggestion ul li span[data-v-b90d8616]:not(:first-child):before, .address-warning span[data-v-b90d8616]:not(:first-child):before {\n  padding-right: 5px !important;\n  content: \", \";\n}\n.address-suggestion ul li span[data-v-b90d8616]:last-child:after, .address-warning span[data-v-b90d8616]:last-child:after {\n  content: \".\";\n}\n", ""]);

// exports


/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _props$data$watch$cre;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = (_props$data$watch$cre = {
    props: {
        location_id: {
            type: Number,
            default: null
        },
        warning: {
            type: Boolean,
            default: true
        }
    },
    data: function data() {
        return {
            id: null,
            get_address: null,
            address: null,
            address_id: null,
            country_id: { id: 19, name: 'Bangladesh' },
            country_is_loading: false,
            countries: [],
            country_stages: [],
            address_suggestion: [],
            address_warning: []
        };
    },

    watch: {},
    created: function created() {
        this.getLocation();
    },
    mounted: function mounted() {
        this.id = this._uid;
    }
}, _defineProperty(_props$data$watch$cre, 'mounted', function mounted() {
    this.$root.popupModal();
}), _defineProperty(_props$data$watch$cre, 'methods', {
    getParentAddress: function getParentAddress(object) {
        if (object.name) {
            this.get_address.name.push(object.name);
        } else {
            this.get_address.name.push(object.native_name);
        }

        /* Last value is coutnry id override */
        this.get_address.country_id = object;

        if (object.parent != null) {
            this.getParentAddress(object.parent);
        }
    },
    addressLabel: function addressLabel(_ref) {
        var _ref$name = _ref.name,
            name = _ref$name === undefined ? '' : _ref$name,
            _ref$native_name = _ref.native_name,
            native_name = _ref$native_name === undefined ? '' : _ref$native_name;

        if (name) {
            return name;
        } else {
            return native_name;
        }
    },
    getAddress: function getAddress() {
        var app = this;
        if (app.location_id) {
            axios.get('/api/v1/geo/locations?location_id=' + app.location_id).then(function (resp) {
                if (resp.data) {
                    var address = resp.data;

                    app.get_address = [];

                    app.get_address = { location: null, country_id: null, name: [] };
                    app.get_address.country_id = address;
                    app.get_address.location = { id: address.id, stage_id: address.stage_id };

                    if (address.name) {
                        app.get_address.name.push(address.name);
                    } else {
                        app.get_address.name.push(address.native_name);
                    }

                    if (address.parent != null) {
                        app.getParentAddress(address.parent);
                    }

                    app.address = app.get_address.name.join(', ');
                    app.address_id = app.get_address.location.id;

                    var stage_id = app.get_address.location.stage_id;

                    app.country_id = app.get_address.country_id;

                    axios.get('/api/v1/geo/locations?country=stage&country_id=' + app.get_address.country_id.id + '&parent_id=' + app.get_address.location.id + '&stage_id=' + stage_id).then(function (resp) {
                        var country_stages = resp.data.country_stages;
                        if (country_stages.length) {
                            app.address_warning = [];
                            for (var key in country_stages) {

                                if (country_stages[key].stage > stage_id) {
                                    app.address_warning.push({ id: country_stages[key].id, name: country_stages[key].name, stage: country_stages[key].stage, stageConst: country_stages[key].stage, location: resp.data.suggestion_location, is_loading: false });
                                } else {
                                    app.address_warning.push({ id: country_stages[key].id, name: country_stages[key].name, stage: country_stages[key].stage, stageConst: country_stages[key].stage, location: [], is_loading: false });
                                }
                            }
                        }
                    });
                }
            });
        }
    },
    getLocation: function getLocation() {
        var app = this;

        setTimeout(function () {
            app.getAddress();
        }, 1000);
    },
    get_location_id: function get_location_id() {
        var app = this;

        var loc_id = null;

        if (app.address_warning.length) {
            var main_address = app.address_warning.slice(0);
            var address = main_address.reverse();
            for (var key in address) {
                if (_typeof(address[key].stage) === 'object') {
                    loc_id = address[key].stage.id;
                    break;
                }
            }

            if (!loc_id) {
                loc_id = app.address_id;
            }
        } else {
            loc_id = app.address_id;
        }

        //this.$emit('selected-location', loc_id);
        this.$emit('input', loc_id);
    },
    searchCountry: function searchCountry(query) {
        var _this = this;

        var app = this;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(function () {
            if (query.length < 4) return;
            app.country_is_loading = true;
            axios.get('/api/v1/geo/locations?address=' + query + '&country=only').then(function (resp) {
                app.countries = resp.data;
                app.country_is_loading = false;
            }).catch(function (resp) {
                _this.$store.commit('errorMessages', resp);
            });
        }, 600);
    },
    selectAddress: function selectAddress(address) {
        var app = this;
        app.address = address.name.join(', ');
        app.address_suggestion = [];

        app.address_warning = [];
        for (var key in app.country_stages) {
            if (address.location.stage_id < app.country_stages[key].stage) {
                app.address_warning.push({ id: app.country_stages[key].id, name: app.country_stages[key].name, stage: app.country_stages[key].stage, stageConst: app.country_stages[key].stage, location: [], is_loading: false });
            }
        }

        var country_id = app.country_id.id;
        var parent_id = address.location.id;

        app.address_id = parent_id;

        this.get_location_id();

        axios.get('/api/v1/geo/locations?country_id=' + country_id + '&parent_id=' + parent_id).then(function (resp) {
            var child_stage_id = address.location.stage_id + 1;
            for (var _key in app.address_warning) {
                if (app.address_warning[_key].stage == child_stage_id) {
                    app.address_warning[_key].location = resp.data;
                    break;
                }
            }
        }).catch(function (resp) {
            app.$store.commit('errorMessages', resp);
        });
    },
    parentAddress: function parentAddress(object, key) {
        if (object.name) {
            this.address_suggestion[key].name.push(object.name);
        } else {
            this.address_suggestion[key].name.push(object.native_name);
        }

        if (object.parent != null) {
            this.parentAddress(object.parent, key);
        }
    },
    locationChanged: function locationChanged(stage, value) {
        var app = this;
        var country_id = app.country_id.id;
        var parent_id = value.id;
        var child_stage_id = stage + 1;

        for (var key in app.address_warning) {
            if (app.address_warning[key].stage == child_stage_id) {
                app.address_warning[key].is_loading = true;
                break;
            }
        }

        this.get_location_id();

        axios.get('/api/v1/geo/locations?country_id=' + country_id + '&parent_id=' + parent_id).then(function (resp) {
            for (var _key2 in app.address_warning) {
                if (app.address_warning[_key2].stage == child_stage_id) {
                    app.address_warning[_key2].location = resp.data;
                    app.address_warning[_key2].is_loading = false;
                    break;
                }
            }
        }).catch(function (resp) {
            app.$store.commit('errorMessages', resp);
        });
    },
    addressChange: function addressChange() {
        var _this2 = this;

        var app = this;
        var address = app.address;

        /* Suggest contact number */
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        this.timer = setTimeout(function () {
            if (address.length < 4) {
                app.address_suggestion = [];
                return;
            }
            var country_id = app.country_id.id;

            axios.get('/api/v1/geo/locations?address=' + address + '&country_id=' + country_id).then(function (resp) {
                var location = resp.data.suggestion_location;
                app.country_stages = resp.data.country_stages;
                app.address_suggestion = [];
                app.address_warning = [];

                for (var key in location) {
                    app.address_suggestion[key] = { location: null, name: [] };
                    app.address_suggestion[key].location = { id: location[key].id, stage_id: location[key].stage_id };

                    if (location[key].name) {
                        app.address_suggestion[key].name.push(location[key].name);
                    } else {
                        app.address_suggestion[key].name.push(location[key].native_name);
                    }

                    if (location[key].parent != null) {
                        app.parentAddress(location[key].parent, key);
                    }
                }
            }).catch(function (resp) {
                _this2.$store.commit('errorMessages', resp);
            });
        }, 600);
    }
}), _defineProperty(_props$data$watch$cre, 'i18n', {
    messages: {
        en: {
            country: 'Country',
            location: 'Location'
        },
        bn: {
            country: 'দেশ',
            location: 'স্থান'
        }
    }
}), _props$data$watch$cre); //export default

/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-row" }, [
    _c(
      "div",
      { staticClass: "col-12 mb-3" },
      [
        _c("label", { staticClass: "o-s-l" }, [
          _vm._v(_vm._s(_vm.$t("country")))
        ]),
        _vm._v(" "),
        _c("multiselect", {
          attrs: {
            "allow-empty": false,
            "deselect-label": "",
            "select-label": "",
            options: _vm.countries,
            "preserve-search": true,
            label: "name",
            loading: _vm.country_is_loading,
            "track-by": "name",
            "preselect-first": false
          },
          on: { "search-change": _vm.searchCountry },
          scopedSlots: _vm._u([
            {
              key: "tag",
              fn: function(props) {
                return [
                  _c("span", [_vm._v(_vm._s(props.option.name))]),
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
            value: _vm.country_id,
            callback: function($$v) {
              _vm.country_id = $$v
            },
            expression: "country_id"
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "col-12 outline-group mb-3" }, [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.address,
            expression: "address"
          }
        ],
        staticClass: "form-control outline",
        attrs: { placeholder: " ", type: "text", id: "address-" + _vm.id },
        domProps: { value: _vm.address },
        on: {
          keyup: function($event) {
            _vm.addressChange()
          },
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.address = $event.target.value
          }
        }
      }),
      _vm._v(" "),
      _c("label", { attrs: { for: "address-" + _vm.id } }, [
        _vm._v(_vm._s(_vm.$t("location")))
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "address-suggestion mt-2" }, [
        _c(
          "ul",
          { staticClass: "list-group" },
          _vm._l(_vm.address_suggestion, function(address, index) {
            return _c(
              "li",
              {
                staticClass: "list-group-item cursor-pointer",
                on: {
                  click: function($event) {
                    _vm.selectAddress(address)
                  }
                }
              },
              _vm._l(address.name, function(value) {
                return _c("span", [_vm._v(_vm._s(value))])
              })
            )
          })
        )
      ]),
      _vm._v(" "),
      _vm.address_warning.length && _vm.warning
        ? _c(
            "p",
            { staticClass: "text-info address-warning" },
            [
              _vm._v("\n            Please Select "),
              _vm._l(_vm.address_warning, function(address) {
                return _c("span", [_vm._v(_vm._s(address.name))])
              })
            ],
            2
          )
        : _c("p"),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "form-row" },
        [
          _vm._l(_vm.address_warning, function(address) {
            return [
              _c(
                "div",
                { staticClass: "col-12 mb-3" },
                [
                  _c("label", { staticClass: "o-s-l" }, [
                    _vm._v(_vm._s(address.name))
                  ]),
                  _vm._v(" "),
                  _c("multiselect", {
                    attrs: {
                      "deselect-label": "",
                      "custom-label": _vm.addressLabel,
                      "select-label": "",
                      options: address.location,
                      loading: address.is_loading,
                      "preserve-search": true,
                      label: "name",
                      "track-by": "name",
                      "preselect-first": false
                    },
                    on: {
                      input: function($event) {
                        _vm.locationChanged(address.stageConst, address.stage)
                      }
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "tag",
                        fn: function(props) {
                          return [
                            _c("span", [_vm._v(_vm._s(props.option.name))]),
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
                      value: address.stage,
                      callback: function($$v) {
                        _vm.$set(address, "stage", $$v)
                      },
                      expression: "address.stage"
                    }
                  })
                ],
                1
              )
            ]
          })
        ],
        2
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b90d8616", module.exports)
  }
}

/***/ })

});