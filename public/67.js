webpackJsonp([67,68],{

<<<<<<< HEAD
/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(15)
/* script */
var __vue_script__ = __webpack_require__(547)
/* template */
var __vue_template__ = __webpack_require__(548)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
=======
/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(301)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 301:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

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
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
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
<<<<<<< HEAD
Component.options.__file = "resources\\assets\\js\\admin\\views\\layout\\header-nav\\index.vue"
=======
Component.options.__file = "resources\\assets\\js\\admin\\components\\location\\index.vue"
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
<<<<<<< HEAD
    hotAPI.createRecord("data-v-7775cbbe", Component.options)
  } else {
    hotAPI.reload("data-v-7775cbbe", Component.options)
=======
    hotAPI.createRecord("data-v-b90d8616", Component.options)
  } else {
    hotAPI.reload("data-v-b90d8616", Component.options)
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

<<<<<<< HEAD
/***/ 547:
=======
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
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
<<<<<<< HEAD
=======
var _props$data$watch$cre;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
<<<<<<< HEAD
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            toggle_sidebar: false,
            localeStrings: {
                en: "English",
                bn: "বাংলা"
            }
=======

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
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
        };
    },

    watch: {},
<<<<<<< HEAD
    created: function created() {},
    mounted: function mounted() {
        this.$root.popupModal();
    },
    updated: function updated() {
        this.$root.dropdownModal();
    },

    methods: {}, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: {
                money_transfer: 'Money Transfer',
                mobile_rechage: 'Mobile Recharge',
                mobile_banking: 'Mobile Banking',
                home: 'Home',
                help: 'Help',
                profile: 'Profile',
                sign_out: 'Sign out',
                dashboard_theme: 'Dashboard Theme'
            },
            bn: {
                money_transfer: 'টাকা ট্রান্সফার',
                mobile_rechage: 'মোবাইল রিচার্জ',
                mobile_banking: 'মোবাইল ব্যাংকিং',
                home: 'বাড়ি',
                help: 'সাহায্য',
                profile: 'প্রোফাইল',
                sign_out: 'বাহির হন',
                dashboard_theme: 'ড্যাশবোর্ড থিম'
            }
        }
    } //export default

});

/***/ }),

/***/ 548:
=======
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
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
<<<<<<< HEAD
  return _c("div", { staticClass: "component" }, [
    _c("div", { attrs: { id: "top-menu" } }, [
      _c("nav", { staticClass: "menu-bar navbar navbar-expand-lg bg-w" }, [
        _c("div", { staticClass: "container-fluid p-0" }, [
          _c("ul", { staticClass: "navbar-nav menu" }, [
            _c("li", { staticClass: "nav-item menu-btn" }, [
              _c(
                "a",
                {
                  staticClass: "nav-link ",
                  attrs: { "data-widget": "pushmenu", href: "#" },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.$root.show_sidebar_left = !_vm.$root.show_sidebar_left
                    }
                  }
                },
                [_c("i", { staticClass: "icon-menu" })]
              )
            ]),
            _vm._v(" "),
            _c(
              "li",
              { staticClass: "nav-item" },
              [
                _c("router-link", { attrs: { to: { name: "home" } } }, [
                  _vm._v(
                    "\n                            " +
                      _vm._s(_vm.$t("home")) +
                      "\n                        "
                  )
                ])
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "li",
              { staticClass: "nav-item" },
              [
                _c(
                  "router-link",
                  {
                    staticClass: "nav-link",
                    attrs: {
                      to: {
                        name: "mtUserHelps",
                        query: { page: 1, per_page: 20 }
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n                           " +
                        _vm._s(_vm.$t("help")) +
                        "\n                        "
                    )
                  ]
                )
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "navbar-collapse",
              attrs: { id: "navbarSupportedContent" }
            },
            [
              _c(
                "nav",
                {
                  staticClass: "site-nav site-header nav navbar-nav ml-auto p-0"
                },
                [
                  _c("div", { staticClass: "menu-content" }, [
                    _c("ul", { staticClass: "mainmenu" }, [
                      0
                        ? _c(
                            "li",
                            {
                              staticClass: "dropdown messages-menu open active"
                            },
                            [_vm._m(0), _vm._v(" "), _vm._m(1)]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      0
                        ? _c(
                            "li",
                            { staticClass: "dropdown notifications-menu open" },
                            [_vm._m(2), _vm._v(" "), _vm._m(3)]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      0
                        ? _c(
                            "li",
                            { staticClass: "dropdown tasks-menu open" },
                            [_vm._m(4), _vm._v(" "), _vm._m(5)]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c("li", { staticClass: "d-none d-md-inline-block" }, [
                        _c(
                          "a",
                          {
                            staticClass: "dropdown",
                            attrs: { href: "#", "data-toggle": "dropdown" }
                          },
                          [
                            _c("img", {
                              staticClass: "user-image",
                              attrs: {
                                src: _vm.$root.profile.image,
                                alt: "Img"
                              }
                            }),
                            _vm._v(" "),
                            _c("span", [
                              _vm._v(_vm._s(_vm.$root.profile.name))
                            ]),
                            _vm._v(" "),
                            _c("ul", { staticClass: "dropdown-menu" }, [
                              _c(
                                "li",
                                {
                                  staticClass: "user-header pelorous clearfix"
                                },
                                [
                                  _c("img", {
                                    staticClass: "user-image",
                                    attrs: {
                                      src: _vm.$root.profile.image,
                                      alt: "User Image"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("p", { staticClass: "clearfix" }, [
                                    _vm._v(
                                      "\n                                                    " +
                                        _vm._s(_vm.$root.profile.name) +
                                        " "
                                    ),
                                    _c("br"),
                                    _vm._v(" "),
                                    _c("small", [
                                      _vm._v(
                                        _vm._s(_vm.$root.profile.role) +
                                          " Account"
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c("br"),
                                    _vm._v(" "),
                                    _c("small", [
                                      _vm._v(
                                        "Member since " +
                                          _vm._s(_vm.$root.profile.since)
                                      )
                                    ])
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "li",
                                { staticClass: "user-footer clearfix" },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "float-left" },
                                    [
                                      _c(
                                        "router-link",
                                        {
                                          staticClass:
                                            "btn btn-default btn-flat bg-gray",
                                          attrs: {
                                            to: { name: "mtSettingProfile" }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n                                                        " +
                                              _vm._s(_vm.$t("profile")) +
                                              " \n                                                    "
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "float-right" }, [
                                    _c(
                                      "a",
                                      {
                                        staticClass:
                                          "btn btn-default btn-flat bg-gray",
                                        attrs: { href: "#" },
                                        on: {
                                          click: function($event) {
                                            _vm.$root.logout()
                                          }
                                        }
                                      },
                                      [_vm._v(_vm._s(_vm.$t("sign_out")))]
                                    )
                                  ])
                                ]
                              )
                            ])
                          ]
                        )
                      ]),
                      _vm._v(" "),
                      _c("li", { staticClass: "right-bar" }, [
                        _c(
                          "a",
                          {
                            staticClass: "control-sidebar",
                            attrs: { href: "#" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                _vm.toggle_sidebar = !_vm.toggle_sidebar
                              }
                            }
                          },
                          [_c("i", { staticClass: "icon-cogs" })]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            class: _vm.toggle_sidebar
                              ? "right-sidebar slide-left"
                              : "right-sidebar"
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass: "close-menu",
                                on: {
                                  click: function($event) {
                                    _vm.toggle_sidebar = !_vm.toggle_sidebar
                                  }
                                }
                              },
                              [_c("i", { staticClass: "icon-cancel" })]
                            ),
                            _vm._v(" "),
                            _vm._m(6),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass: "tab-content",
                                attrs: { id: "nav-tabContent" }
                              },
                              [
                                _c(
                                  "div",
                                  {
                                    staticClass: "tab-pane fade show active",
                                    attrs: { id: "nav-home" }
                                  },
                                  [
                                    _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.$root.$i18n.locale,
                                            expression: "$root.$i18n.locale"
                                          }
                                        ],
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
                                              _vm.$root.$i18n,
                                              "locale",
                                              $event.target.multiple
                                                ? $$selectedVal
                                                : $$selectedVal[0]
                                            )
                                          }
                                        }
                                      },
                                      _vm._l(_vm.localeStrings, function(
                                        locale,
                                        key
                                      ) {
                                        return _c(
                                          "option",
                                          { domProps: { value: key } },
                                          [_vm._v(_vm._s(locale))]
                                        )
                                      })
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _vm._m(7),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "tab-pane fade",
                                    attrs: { id: "nav-contact" }
                                  },
                                  [
                                    _c(
                                      "div",
                                      { staticClass: "color-content" },
                                      [
                                        _c("h4", [
                                          _vm._v(
                                            _vm._s(_vm.$t("dashboard_theme"))
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _vm._m(8)
                                      ]
                                    )
                                  ]
                                )
                              ]
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "control-sidebar-bg" })
                      ])
                    ])
                  ])
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
    return _c(
      "a",
      {
        staticClass: "dropdown-toggle",
        attrs: {
          href: "#",
          "data-toggle": "dropdownd",
          "aria-expanded": "true"
        }
      },
      [
        _c("i", { staticClass: "icon-mail" }),
        _vm._v(" "),
        _c("span", { staticClass: "nunber bg-success right" }, [_vm._v("4")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", { staticClass: "dropdown-menu" }, [
      _c("li", { staticClass: "header" }, [_vm._v("You have 4 messages")]),
      _vm._v(" "),
      _c("li", [
        _c("ul", { staticClass: "menu" }, [
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("div", { staticClass: "float-left" }, [
                _c("img", {
                  staticClass: "img-circle",
                  attrs: { src: "/img/user2-160x160.jpg", alt: "User Image" }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "float-right" }, [
                _c("h4", [
                  _vm._v(
                    "\n                                                                Support Team\n                                                                "
                  ),
                  _c("small", [
                    _c("i", { staticClass: "icon-clock" }),
                    _vm._v(" 5 mins")
                  ])
                ]),
                _vm._v(" "),
                _c("p", [_vm._v("Why not buy a new awesome theme?")])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("div", { staticClass: "float-left" }, [
                _c("img", {
                  staticClass: "img-circle",
                  attrs: { src: "/img/user3-128x128.jpg", alt: "User Image" }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "float-right" }, [
                _c("h4", [
                  _vm._v(
                    "\n                                                                AdminLTE Design Team\n                                                                "
                  ),
                  _c("small", [
                    _c("i", { staticClass: "icon-clock" }),
                    _vm._v(" 2 hours")
                  ])
                ]),
                _vm._v(" "),
                _c("p", [_vm._v("Why not buy a new awesome theme?")])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("div", { staticClass: "float-left" }, [
                _c("img", {
                  staticClass: "img-circle",
                  attrs: { src: "/img/user4-128x128.jpg", alt: "User Image" }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "float-right" }, [
                _c("h4", [
                  _vm._v(
                    "\n                                                                Developers\n                                                                "
                  ),
                  _c("small", [
                    _c("i", { staticClass: "icon-clock" }),
                    _vm._v(" Today")
                  ])
                ]),
                _vm._v(" "),
                _c("p", [_vm._v("Why not buy a new awesome theme?")])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("div", { staticClass: "float-left" }, [
                _c("img", {
                  staticClass: "img-circle",
                  attrs: { src: "/img/user3-128x128.jpg", alt: "User Image" }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "float-right" }, [
                _c("h4", [
                  _vm._v(
                    "\n                                                                Sales Department\n                                                                "
                  ),
                  _c("small", [
                    _c("i", { staticClass: "icon-clock" }),
                    _vm._v(" Yesterday")
                  ])
                ]),
                _vm._v(" "),
                _c("p", [_vm._v("Why not buy a new awesome theme?")])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("div", { staticClass: "float-left" }, [
                _c("img", {
                  staticClass: "img-circle",
                  attrs: { src: "/img/user4-128x128.jpg", alt: "User Image" }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "float-right" }, [
                _c("h4", [
                  _vm._v(
                    "\n                                                                Reviewers\n                                                                "
                  ),
                  _c("small", [
                    _c("i", { staticClass: "icon-clock" }),
                    _vm._v(" 2 days")
                  ])
                ]),
                _vm._v(" "),
                _c("p", [_vm._v("Why not buy a new awesome theme?")])
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("li", { staticClass: "footer" }, [
        _c("a", { attrs: { href: "#" } }, [_vm._v("See All Messages")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      {
        staticClass: "dropdown-toggle",
        attrs: {
          href: "#",
          "data-toggle": "dropdownd",
          "aria-expanded": "true"
        }
      },
      [
        _c("i", { staticClass: "icon-bell" }),
        _vm._v(" "),
        _c("span", { staticClass: "nunber amber" }, [_vm._v("10")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", { staticClass: "dropdown-menu" }, [
      _c("li", { staticClass: "header" }, [
        _vm._v("You have 10 notifications")
      ]),
      _vm._v(" "),
      _c("li", [
        _c("ul", { staticClass: "menu" }, [
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("i", { staticClass: "icon-users" }),
              _vm._v(
                " 5 new members joined today\n                                                    "
              )
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("i", { staticClass: "icon-attention" }),
              _vm._v(
                " Very long description here that may not fit into the\n                                                        page and may cause design problems\n                                                    "
              )
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("i", { staticClass: "icon-users" }),
              _vm._v(
                " 5 new members joined\n                                                    "
              )
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("i", { staticClass: "icon-basket" }),
              _vm._v(
                " 25 sales made\n                                                    "
              )
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("i", { staticClass: "icon-user text-red" }),
              _vm._v(
                " You changed your username\n                                                    "
              )
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("li", { staticClass: "footer" }, [
        _c("a", { attrs: { href: "#" } }, [_vm._v("View all")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      {
        staticClass: "dropdown-toggle",
        attrs: {
          href: "#",
          "data-toggle": "dropdownd",
          "aria-expanded": "true"
        }
      },
      [
        _c("i", { staticClass: "icon-flag-empty" }),
        _vm._v(" "),
        _c("span", { staticClass: "nunber amaranth" }, [_vm._v("9")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", { staticClass: "dropdown-menu" }, [
      _c("li", { staticClass: "header" }, [_vm._v("You have 9 tasks")]),
      _vm._v(" "),
      _c("li", [
        _c("ul", { staticClass: "menu" }, [
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("h4", [
                _vm._v(
                  "\n                                                            Design some buttons\n                                                            "
                ),
                _c("small", { staticClass: "float-right" }, [_vm._v("20%")])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "progress xs" }, [
                _c(
                  "div",
                  {
                    staticClass: "progress-bar pelorous progress-bar-aqua",
                    staticStyle: { width: "20%" },
                    attrs: {
                      role: "progressbar",
                      "aria-valuenow": "20",
                      "aria-valuemin": "0",
                      "aria-valuemax": "100"
                    }
                  },
                  [
                    _c("span", { staticClass: "sr-only" }, [
                      _vm._v("20% Complete")
                    ])
                  ]
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("h4", [
                _vm._v(
                  "\n                                                            Create a nice theme\n                                                            "
                ),
                _c("small", { staticClass: "float-right" }, [_vm._v("40%")])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "progress xs" }, [
                _c(
                  "div",
                  {
                    staticClass: "progress-bar  bg-success right",
                    staticStyle: { width: "40%" },
                    attrs: {
                      role: "progressbar",
                      "aria-valuenow": "20",
                      "aria-valuemin": "0",
                      "aria-valuemax": "100"
                    }
                  },
                  [
                    _c("span", { staticClass: "sr-only" }, [
                      _vm._v("40% Complete")
                    ])
                  ]
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("h4", [
                _vm._v(
                  "\n                                                            Some task I need to do\n                                                            "
                ),
                _c("small", { staticClass: "float-right" }, [_vm._v("60%")])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "progress xs" }, [
                _c(
                  "div",
                  {
                    staticClass: "progress-bar amber",
                    staticStyle: { width: "60%" },
                    attrs: {
                      role: "progressbar",
                      "aria-valuenow": "20",
                      "aria-valuemin": "0",
                      "aria-valuemax": "100"
                    }
                  },
                  [
                    _c("span", { staticClass: "sr-only" }, [
                      _vm._v("60% Complete")
                    ])
                  ]
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("h4", [
                _vm._v(
                  "\n                                                            Make beautiful transitions\n                                                            "
                ),
                _c("small", { staticClass: "float-right" }, [_vm._v("80%")])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "progress xs" }, [
                _c(
                  "div",
                  {
                    staticClass: "progress-bar amaranth",
                    staticStyle: { width: "80%" },
                    attrs: {
                      role: "progressbar",
                      "aria-valuenow": "20",
                      "aria-valuemin": "0",
                      "aria-valuemax": "100"
                    }
                  },
                  [
                    _c("span", { staticClass: "sr-only" }, [
                      _vm._v("80% Complete")
                    ])
                  ]
                )
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("li", { staticClass: "footer" }, [
        _c("a", { attrs: { href: "#" } }, [_vm._v("View all tasks")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("nav", [
      _c("div", { staticClass: "nav nav-tabs", attrs: { id: "nav-tab" } }, [
        _c(
          "a",
          {
            staticClass: "nav-item nav-link active",
            attrs: {
              id: "nav-home-tab",
              "data-toggle": "tab",
              href: "#nav-home"
            }
          },
          [_c("i", { staticClass: "icon-wrench" })]
        ),
        _vm._v(" "),
        _c(
          "a",
          {
            staticClass: "nav-item nav-link",
            attrs: {
              id: "nav-profile-tab",
              "data-toggle": "tab",
              href: "#nav-profile"
            }
          },
          [_c("i", { staticClass: "icon-home" })]
        ),
        _vm._v(" "),
        _c(
          "a",
          {
            staticClass: "nav-item nav-link",
            attrs: {
              id: "nav-contact-tab",
              "data-toggle": "tab",
              href: "#nav-contact"
            }
          },
          [_c("i", { staticClass: "icon-cogs" })]
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "tab-pane fade", attrs: { id: "nav-profile" } },
      [_c("p", [_vm._v("Comming Soon")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { attrs: { id: "dashboard-theme" } }, [
      _c("input", {
        staticClass: "mb-3",
        attrs: {
          type: "radio",
          name: "dashboard-theme",
          value: "dashboard-one"
        }
      }),
      _vm._v(" "),
      _c("input", {
        staticClass: "mb-3",
        attrs: {
          type: "radio",
          name: "dashboard-theme",
          value: "dashboard-two"
        }
      }),
      _vm._v(" "),
      _c("input", {
        staticClass: "mb-3",
        attrs: {
          type: "radio",
          name: "dashboard-theme",
          value: "dashboard-three"
        }
      }),
      _vm._v(" "),
      _c("input", {
        staticClass: "mb-3",
        attrs: {
          type: "radio",
          name: "dashboard-theme",
          value: "dashboard-four"
        }
      }),
      _vm._v(" "),
      _c("input", {
        staticClass: "mb-3",
        attrs: {
          type: "radio",
          name: "dashboard-theme",
          value: "dashboard-five"
        }
      })
    ])
  }
]
=======
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
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
<<<<<<< HEAD
    require("vue-hot-reload-api")      .rerender("data-v-7775cbbe", module.exports)
=======
    require("vue-hot-reload-api")      .rerender("data-v-b90d8616", module.exports)
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
  }
}

/***/ })

});