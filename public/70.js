webpackJsonp([70],{

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(504)
}
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(506)
/* template */
var __vue_template__ = __webpack_require__(507)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-a610e3fe"
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
Component.options.__file = "resources\\assets\\js\\admin\\views\\helps\\mt\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a610e3fe", Component.options)
  } else {
    hotAPI.reload("data-v-a610e3fe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 307:
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

var listToStyles = __webpack_require__(308)

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

/***/ 308:
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

/***/ 504:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(505);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(307)("2d00ea64", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a610e3fe\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a610e3fe\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 505:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(false);
// imports


// module
exports.push([module.i, "\n.post-navigation[data-v-a610e3fe] {\n  background-color: white;\n  border: 1px solid #f0f0f0;\n  display: table;\n  position: relative;\n  table-layout: fixed;\n  width: 100%;\n}\n.post-navigation .post-previous[data-v-a610e3fe],\n.post-navigation .post-next[data-v-a610e3fe] {\n  display: table-cell;\n  position: relative;\n  vertical-align: middle;\n  width: 50%;\n  border-left: 1px solid #f0f0f0;\n  border-right: 1px solid #f0f0f0;\n}\n@media only screen and (max-width: 414px) {\n.post-navigation .post-previous[data-v-a610e3fe],\n    .post-navigation .post-next[data-v-a610e3fe] {\n      width: 100% !important;\n      display: inherit;\n      text-align: left !important;\n}\n}\n.post-navigation .post-previous i.fa[data-v-a610e3fe] {\n  left: 15px;\n}\n.post-navigation .post-next i.fa[data-v-a610e3fe] {\n  right: 15px;\n}\n.post-navigation i.fa[data-v-a610e3fe] {\n  font-size: 40px;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n}\n.post-navigation .post-previous[data-v-a610e3fe] {\n  padding: 15px 10px 15px 0px;\n  text-align: left;\n  border-left: 0 none;\n  border-right: 0 none;\n}\n.post-navigation .post-next[data-v-a610e3fe] {\n  padding: 15px 0px 15px 10px;\n  text-align: right;\n  border-right: 0 none;\n}\n.post-navigation h3[data-v-a610e3fe] {\n  font-size: 1.25em;\n  font-weight: normal;\n  margin: 0;\n  -webkit-transition: all 0.2s linear 0s;\n  transition: all 0.2s linear 0s;\n}\n.post-navigation h3 span[data-v-a610e3fe] {\n  display: block;\n  font-size: 15px;\n  color: #969696;\n}\n.post-navigation .post-previous h3[data-v-a610e3fe] {\n  margin-left: 20px;\n}\n@media only screen and (max-width: 414px) {\n.post-navigation .post-previous h3[data-v-a610e3fe] {\n      margin-left: 10px;\n}\n}\n.post-navigation .post-next h3[data-v-a610e3fe] {\n  margin-right: 20px;\n}\n.post-navigation.no-next-link .post-previous[data-v-a610e3fe] {\n  float: left;\n  border-right: 1px solid #f0f0f0;\n}\n.post-navigation.post-navigation.no-next-link .post-next[data-v-a610e3fe] {\n  float: right;\n  border-left: 1px solid #f0f0f0;\n}\n.user-type[data-v-a610e3fe] {\n  border: 1px solid #dfdfdf;\n  background: #f7f7f7;\n  padding: 3px;\n}\n", ""]);

// exports


/***/ }),

/***/ 506:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            dateOptions: this.$store.state.dateOptions,
            searchTitle: '',
            user_type: 'basic',
            help_type: 'video',
            singlePreloader: true,
            helps: {},
            related_helps: null,
            prev_help: null,
            next_help: null,
            helpCats: [],
            perPage: this.$route.query.per_page,
            perPageOptions: this.$store.state.perPageOptions,
            selected: [],
            subMenu: false,
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
        '$route': function $route(route) {
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
    mounted: function mounted() {
        $(".category-menu").click(function () {
            $(".custom-menu-modal").toggleClass("left");
        });
        $(".custom-header .close").click(function () {
            $(".custom-menu-modal").removeClass("left");
        });
        $(document).on('mouseup', function (e) {
            var container = $('.custom-menu-modal, .category-menu');
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $(".custom-menu-modal").removeClass('left');
            }
        });
    },

    methods: {
        selectedCat: function selectedCat(cat_id) {
            $('#settingMobile').modal('hide');
            this.searchTitle = '';
            this.$router.push({ name: 'mtUserHelps', query: { cat_id: cat_id, page: 1, per_page: 20, search: '' } });
            this.getLists();
        },
        catTitle: function catTitle(cat_id) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.helpCats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var cat = _step.value;

                    if (cat.childs.length) {
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = cat.childs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var catChild = _step2.value;

                                if (catChild.childs.length) {
                                    var _iteratorNormalCompletion3 = true;
                                    var _didIteratorError3 = false;
                                    var _iteratorError3 = undefined;

                                    try {
                                        for (var _iterator3 = catChild.childs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                            var catChild2 = _step3.value;

                                            if (cat_id == catChild2.id) {
                                                return catChild2.name;
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
                                } else {
                                    if (cat_id == catChild.id) {
                                        return catChild.name;
                                        break;
                                    }
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
                    } else {
                        if (cat_id == cat.id) {
                            return cat.name;
                            break;
                        }
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
        },
        selectedPost: function selectedPost(post_id) {
            var arr = this.helps.data;

            /* Remove all without clicked help */
            this.helps.data = arr.filter(function (el) {
                return el.id == post_id;
            });
            this.searchTitle = '';

            this.$router.push({ name: 'mtUserHelps', query: { post_id: post_id, page: 1, per_page: 20 } });

            this.getLists();
            //this.singlePreloader = true;
        },
        getLists: function getLists() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var _this = this;

            var click = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var search = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


            if (search) {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }

                this.timer = setTimeout(function () {
                    var query = _this.searchTitle;
                    if (query.length < 5 && query.length != 0) {
                        return;
                    }
                    _this.getListsFunc(page, click);
                }, 600);
            } else {
                this.getListsFunc(page, click);
            }
        },
        getListsFunc: function getListsFunc() {
            var _this2 = this;

            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var click = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


            var app = this;
            var per_page = this.$route.query.per_page;

            var current_page = click ? page : this.$route.query.page;

            var searchTitle = app.searchTitle.length > 1 ? app.searchTitle : '';

            var query = {
                page: current_page,
                per_page: per_page,
                search: searchTitle
            };

            if (click) {
                this.$router.push({ path: document.location.search, query: query });
            } else {
                this.$router.push({ path: document.location.search, query: query });
            }

            var allQuery = this.$route.query;

            var queryString = Object.keys(allQuery).map(function (key) {
                return key + '=' + allQuery[key];
            }).join('&');
            if (app.searchTitle) {
                queryString += '&search=' + app.searchTitle;
            }

            axios.get('/api/v1/mt/userhelps?' + queryString).then(function (resp) {
                app.preloader = false;
                app.helps = resp.data.helps;
                app.prev_help = resp.data.prev_help;
                app.next_help = resp.data.next_help;
                app.related_helps = resp.data.related_helps;

                if (_this2.$route.query.post_id) {
                    _this2.singlePreloader = true;
                } else {
                    _this2.singlePreloader = false;
                }

                app.helpCats = resp.data.helpcats;
                if (app.helps.data.length == 0) {
                    app.noData = app.$store.state.noData;
                } else {
                    app.noData = '';
                }

                /* Submenu click */
                if (!app.subMenu) {
                    $(document).ready(function () {
                        $(".has-sub-menu").click(function () {
                            $(this).next().slideToggle();
                            $(this).find("i").toggleClass("roted");
                        });
                    });
                    app.subMenu = true;
                }
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        }
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: {
                live_support: 'Live Support',
                documentation: 'Documentation',
                notice_board: 'Notice Board',
                no_documentation: 'There is no documentation.',
                categories: 'Categories',
                docs_categories: 'Docs Categories'
            },
            bn: {
                live_support: 'গ্রাহক সাহায্য',
                documentation: 'ব্যবহার বিধি',
                notice_board: 'নোটিস বোর্ড',
                no_documentation: 'কোন ব্যবহার বিধি পাওয়া যায়নি।',
                categories: 'শ্রেণী সমূহ',
                docs_categories: 'ব্যবহার বিধির শ্রেণী'
            }
        }
    } //export default

});

/***/ }),

/***/ 507:
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
            "\n           " + _vm._s(_vm.$t("documentation")) + "\n        "
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
          _c("div", { staticClass: "d-block d-md-none" }, [
            _c(
              "button",
              {
                staticClass:
                  "btn btn-md d-block w-100 mb-3 btn-info category-menu",
                attrs: { type: "button" }
              },
              [
                _c("i", { staticClass: "icon-menu" }),
                _vm._v(" "),
                _c("span", [_vm._v(_vm._s(_vm.$t("categories")))])
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "custom-menu-modal menu-top" }, [
            _c("div", { staticClass: "custom-header d-block d-md-none" }, [
              _c("h5", { staticClass: "modal-title" }, [
                _vm._v(_vm._s(_vm.$t("docs_categories")))
              ]),
              _vm._v(" "),
              _vm._m(0)
            ]),
            _vm._v(" "),
            _c(
              "ul",
              { staticClass: "sidebar-menu bg-white" },
              [
                _vm._l(_vm.helpCats, function(cat, index) {
                  return [
                    !cat.childs.length
                      ? _c("li", { staticClass: "menu-item" }, [
                          _c(
                            "a",
                            {
                              class:
                                _vm.$route.query.cat_id &&
                                _vm.$route.query.cat_id == cat.id
                                  ? "router-link-active"
                                  : "",
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  _vm.selectedCat(cat.id)
                                }
                              }
                            },
                            [_c("span", [_vm._v(_vm._s(cat.name))])]
                          )
                        ])
                      : _c("li", { staticClass: "menu-item" }, [
                          _c(
                            "a",
                            {
                              staticClass: "has-sub-menu",
                              attrs: {
                                href: "#",
                                onclick: "event.preventDefault();"
                              }
                            },
                            [
                              _c("span", [_vm._v(_vm._s(cat.name))]),
                              _vm._v(" "),
                              _c("i", {
                                staticClass: "icon-angle-down right",
                                attrs: { "aria-hidden": "true" }
                              })
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "ul",
                            {
                              staticClass: "sub-menu",
                              staticStyle: { display: "none" }
                            },
                            [
                              _vm._l(cat.childs, function(catChild) {
                                return [
                                  !catChild.childs.length
                                    ? _c("li", [
                                        _c(
                                          "a",
                                          {
                                            class:
                                              _vm.$route.query.cat_id &&
                                              _vm.$route.query.cat_id ==
                                                catChild.id
                                                ? "router-link-active"
                                                : "",
                                            attrs: { href: "#" },
                                            on: {
                                              click: function($event) {
                                                $event.preventDefault()
                                                _vm.selectedCat(catChild.id)
                                              }
                                            }
                                          },
                                          [
                                            _c("i", {
                                              staticClass: "icon-circle-empty",
                                              attrs: { "aria-hidden": "true" }
                                            }),
                                            _c("span", [
                                              _vm._v(_vm._s(catChild.name))
                                            ])
                                          ]
                                        )
                                      ])
                                    : _c("li", { staticClass: "menu-item" }, [
                                        _c(
                                          "a",
                                          {
                                            staticClass: "has-sub-menu",
                                            attrs: {
                                              href: "#",
                                              onclick: "event.preventDefault();"
                                            }
                                          },
                                          [
                                            _c("i", {
                                              staticClass: "icon-circle-empty",
                                              attrs: { "aria-hidden": "true" }
                                            }),
                                            _c("span", [
                                              _vm._v(_vm._s(catChild.name))
                                            ]),
                                            _vm._v(" "),
                                            _c("i", {
                                              staticClass:
                                                "icon-angle-down right",
                                              attrs: { "aria-hidden": "true" }
                                            })
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "ul",
                                          {
                                            staticClass: "sub-menu",
                                            staticStyle: { display: "none" }
                                          },
                                          [
                                            _vm._l(catChild.childs, function(
                                              catChild2
                                            ) {
                                              return [
                                                _c("li", [
                                                  _c(
                                                    "a",
                                                    {
                                                      class:
                                                        _vm.$route.query
                                                          .cat_id &&
                                                        _vm.$route.query
                                                          .cat_id ==
                                                          catChild2.id
                                                          ? "router-link-active"
                                                          : "",
                                                      attrs: { href: "#" },
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          $event.preventDefault()
                                                          _vm.selectedCat(
                                                            catChild2.id
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [
                                                      _c("i", {
                                                        staticClass:
                                                          "icon-circle-empty",
                                                        attrs: {
                                                          "aria-hidden": "true"
                                                        }
                                                      }),
                                                      _c("span", [
                                                        _vm._v(
                                                          _vm._s(catChild2.name)
                                                        )
                                                      ])
                                                    ]
                                                  )
                                                ])
                                              ]
                                            })
                                          ],
                                          2
                                        )
                                      ])
                                ]
                              })
                            ],
                            2
                          )
                        ])
                  ]
                }),
                _vm._v(" "),
                _c(
                  "li",
                  { staticClass: "menu-item" },
                  [
                    _c(
                      "router-link",
                      {
                        staticClass: "nav-link",
                        attrs: { to: { name: "nbNoticeBoard" } }
                      },
                      [_c("span", [_vm._v(_vm._s(_vm.$t("notice_board")))])]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "li",
                  { staticClass: "menu-item" },
                  [
                    _c(
                      "router-link",
                      {
                        staticClass: "nav-link",
                        attrs: {
                          to: {
                            name: "msgInbox",
                            query: { id: 1, page: 1, per_page: 20 }
                          }
                        }
                      },
                      [_c("span", [_vm._v(_vm._s(_vm.$t("live_support")))])]
                    )
                  ],
                  1
                )
              ],
              2
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-9" }, [
          _c(
            "div",
            { attrs: { id: "accordion" } },
            [
              _vm.preloader
                ? _c("div", [
                    _vm._v(
                      " \n                        Loading ...\n                    "
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              !_vm.preloader
                ? _c("div", { staticClass: "list-group mb-2" }, [
                    _c(
                      "div",
                      { staticClass: "list-group-item cursor-pointer" },
                      [
                        _c("div", { staticClass: "panel-heading mb-2 mt-2" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.searchTitle,
                                expression: "searchTitle"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: {
                              placeholder: " ",
                              type: "text",
                              id: "search"
                            },
                            domProps: { value: _vm.searchTitle },
                            on: {
                              keyup: function($event) {
                                _vm.getLists(null, null, true)
                              },
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.searchTitle = $event.target.value
                              }
                            }
                          })
                        ])
                      ]
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.$route.query.cat_id && !_vm.preloader
                ? _c(
                    "div",
                    { staticClass: "browsing-category bg-white p-2 mb-2" },
                    [
                      _c("span", { staticClass: "font-weight-bold" }, [
                        _vm._v("Browsing Category:")
                      ]),
                      _vm._v(
                        " " +
                          _vm._s(_vm.catTitle(_vm.$route.query.cat_id)) +
                          "\n                    "
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.helps.data, function(help, index) {
                return _c("div", { staticClass: "list-group mb-2" }, [
                  _c(
                    "div",
                    {
                      staticClass: "list-group-item cursor-pointer",
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.selectedPost(help.id)
                        }
                      }
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "panel-heading collapsed",
                          attrs: {
                            "data-toggle": "collapse",
                            "aria-expanded": "true",
                            "aria-controls": "collapseOne"
                          }
                        },
                        [
                          _vm._v(
                            "\n                                " +
                              _vm._s(help.title) +
                              "\n                            "
                          )
                        ]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _vm.$route.query.post_id &&
                  _vm.singlePreloader &&
                  !_vm.searchTitle
                    ? _c(
                        "div",
                        {
                          staticClass: "modal-body bg-white",
                          staticStyle: { "margin-top": "1px" }
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "row" },
                            [
                              _c("div", { staticClass: "col-12 mb-4" }, [
                                _c(
                                  "button",
                                  {
                                    class:
                                      _vm.help_type == "video"
                                        ? "btn btn-sm btn-dark mb-1"
                                        : "btn btn-sm btn-light border mb-1",
                                    attrs: { type: "button" },
                                    on: {
                                      click: function($event) {
                                        _vm.help_type = "video"
                                      }
                                    }
                                  },
                                  [_vm._v("Video Document")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "button",
                                  {
                                    class:
                                      _vm.help_type == "text"
                                        ? "btn btn-sm btn-dark mb-1"
                                        : "btn btn-sm btn-light border mb-1",
                                    attrs: { type: "button" },
                                    on: {
                                      click: function($event) {
                                        _vm.help_type = "text"
                                      }
                                    }
                                  },
                                  [_vm._v("Text Document")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "select",
                                  {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.user_type,
                                        expression: "user_type"
                                      }
                                    ],
                                    staticClass: "user-type",
                                    on: {
                                      change: function($event) {
                                        var $$selectedVal = Array.prototype.filter
                                          .call($event.target.options, function(
                                            o
                                          ) {
                                            return o.selected
                                          })
                                          .map(function(o) {
                                            var val =
                                              "_value" in o ? o._value : o.value
                                            return val
                                          })
                                        _vm.user_type = $event.target.multiple
                                          ? $$selectedVal
                                          : $$selectedVal[0]
                                      }
                                    }
                                  },
                                  [
                                    _c(
                                      "option",
                                      { attrs: { value: "basic" } },
                                      [_vm._v("Basic User")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "option",
                                      { attrs: { value: "medium" } },
                                      [_vm._v("Medium User")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "option",
                                      { attrs: { value: "advance" } },
                                      [_vm._v("Advance User")]
                                    )
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _vm.user_type == "basic" &&
                              _vm.help_type == "video"
                                ? [
                                    help.basic_video
                                      ? _c("div", {
                                          staticClass:
                                            "col-12 mb-3 help-content",
                                          domProps: {
                                            innerHTML: _vm._s(help.basic_video)
                                          }
                                        })
                                      : _c(
                                          "div",
                                          {
                                            staticClass: "col-12 mb-3 no-help"
                                          },
                                          [
                                            _vm._v(
                                              " There is no basic user video document"
                                            )
                                          ]
                                        )
                                  ]
                                : _vm.user_type == "basic" &&
                                  _vm.help_type == "text"
                                  ? [
                                      help.basic_text
                                        ? _c("div", {
                                            staticClass:
                                              "col-12 mb-3 help-content",
                                            domProps: {
                                              innerHTML: _vm._s(help.basic_text)
                                            }
                                          })
                                        : _c(
                                            "div",
                                            {
                                              staticClass: "col-12 mb-3 no-help"
                                            },
                                            [
                                              _vm._v(
                                                " There is no basic user text document"
                                              )
                                            ]
                                          )
                                    ]
                                  : _vm._e(),
                              _vm._v(" "),
                              _vm.user_type == "medium" &&
                              _vm.help_type == "video"
                                ? [
                                    help.medium_video
                                      ? _c("div", {
                                          staticClass:
                                            "col-12 mb-3 help-content",
                                          domProps: {
                                            innerHTML: _vm._s(help.medium_video)
                                          }
                                        })
                                      : _c(
                                          "div",
                                          {
                                            staticClass: "col-12 mb-3 no-help"
                                          },
                                          [
                                            _vm._v(
                                              " There is no medium user video document"
                                            )
                                          ]
                                        )
                                  ]
                                : _vm.user_type == "medium" &&
                                  _vm.help_type == "text"
                                  ? [
                                      help.medium_text
                                        ? _c("div", {
                                            staticClass:
                                              "col-12 mb-3 help-content",
                                            domProps: {
                                              innerHTML: _vm._s(
                                                help.medium_text
                                              )
                                            }
                                          })
                                        : _c(
                                            "div",
                                            {
                                              staticClass: "col-12 mb-3 no-help"
                                            },
                                            [
                                              _vm._v(
                                                " There is no medium user text document"
                                              )
                                            ]
                                          )
                                    ]
                                  : _vm._e(),
                              _vm._v(" "),
                              _vm.user_type == "advance" &&
                              _vm.help_type == "video"
                                ? [
                                    help.advance_video
                                      ? _c("div", {
                                          staticClass:
                                            "col-12 mb-3 help-content",
                                          domProps: {
                                            innerHTML: _vm._s(
                                              help.advance_video
                                            )
                                          }
                                        })
                                      : _c(
                                          "div",
                                          {
                                            staticClass: "col-12 mb-3 no-help"
                                          },
                                          [
                                            _vm._v(
                                              " There is no advance user video document"
                                            )
                                          ]
                                        )
                                  ]
                                : _vm.user_type == "advance" &&
                                  _vm.help_type == "text"
                                  ? [
                                      help.advance_text
                                        ? _c("div", {
                                            staticClass:
                                              "col-12 mb-3 help-content",
                                            domProps: {
                                              innerHTML: _vm._s(
                                                help.advance_text
                                              )
                                            }
                                          })
                                        : _c(
                                            "div",
                                            {
                                              staticClass: "col-12 mb-3 no-help"
                                            },
                                            [
                                              _vm._v(
                                                " There is no advance user text document"
                                              )
                                            ]
                                          )
                                    ]
                                  : _vm._e()
                            ],
                            2
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.$route.query.post_id && !_vm.singlePreloader
                    ? _c(
                        "div",
                        {
                          staticClass: "modal-body bg-white",
                          staticStyle: { "margin-top": "1px" }
                        },
                        [_vm._m(1, true)]
                      )
                    : _vm._e()
                ])
              }),
              _vm._v(" "),
              _vm.$route.query.post_id &&
              _vm.singlePreloader &&
              !_vm.searchTitle &&
              (_vm.prev_help || _vm.next_help)
                ? _c("div", { staticClass: "row mt-3" }, [
                    _c("div", { staticClass: "col-12" }, [
                      _c("nav", { staticClass: "post-navigation clearfix " }, [
                        _vm.prev_help
                          ? _c("div", { staticClass: "post-previous" }, [
                              _c(
                                "a",
                                {
                                  attrs: { href: "#", rel: "prev" },
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      _vm.selectedPost(_vm.prev_help.id)
                                    }
                                  }
                                },
                                [
                                  _c("i", {
                                    staticClass: "fa fa-angle-double-left"
                                  }),
                                  _vm._v(" "),
                                  _c("h3", [
                                    _c("span", [_vm._v("পূর্বের ডকুমেন্ট ")]),
                                    _vm._v(" " + _vm._s(_vm.prev_help.title))
                                  ])
                                ]
                              )
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.next_help
                          ? _c("div", { staticClass: "post-next" }, [
                              _c(
                                "a",
                                {
                                  attrs: { href: "#", rel: "next" },
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      _vm.selectedPost(_vm.next_help.id)
                                    }
                                  }
                                },
                                [
                                  _c("i", {
                                    staticClass: "fa fa-angle-double-right"
                                  }),
                                  _vm._v(" "),
                                  _c("h3", [
                                    _c("span", [_vm._v("পরবর্তি ডকুমেন্ট")]),
                                    _vm._v(" " + _vm._s(_vm.next_help.title))
                                  ])
                                ]
                              )
                            ])
                          : _vm._e()
                      ])
                    ])
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.$route.query.post_id &&
              _vm.singlePreloader &&
              _vm.related_helps.length &&
              !_vm.searchTitle
                ? _c("div", { staticClass: "modal-body bg-white mb-3 mt-3" }, [
                    _c("div", { staticClass: "row" }, [
                      _c("div", { staticClass: "col-12" }, [
                        _c("h4", [_vm._v("এই সম্পর্কিত আরো ডকুমেন্ট")]),
                        _vm._v(" "),
                        _c(
                          "ul",
                          { attrs: { type: "square" } },
                          _vm._l(_vm.related_helps, function(help) {
                            return _c("li", [
                              _c(
                                "a",
                                {
                                  attrs: { href: "#" },
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      _vm.selectedPost(help.id)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(help.title))]
                              )
                            ])
                          })
                        )
                      ])
                    ])
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.noData
                ? _c("div", { staticClass: "modal-body bg-white" }, [
                    _c("div", { staticClass: "row" }, [
                      _c(
                        "div",
                        { staticClass: "col-12 mb-3" },
                        [
                          _vm.$route.query.cat_id
                            ? [
                                _vm._v(
                                  "\n                                    No documentation found in this category.\n                                "
                                )
                              ]
                            : [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(_vm.$t("no_documentation")) +
                                    "\n                                "
                                )
                              ]
                        ],
                        2
                      )
                    ])
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("pagination", {
                attrs: { data: _vm.helps, limit: 2 },
                on: { "pagination-change-page": _vm.getLists }
              })
            ],
            2
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
    return _c("button", { staticClass: "close", attrs: { type: "button" } }, [
      _c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-12" }, [_c("p", [_vm._v("Loading...")])])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a610e3fe", module.exports)
  }
}

/***/ })

});