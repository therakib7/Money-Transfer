webpackJsonp([104],{

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(492)
/* template */
var __vue_template__ = __webpack_require__(493)
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
Component.options.__file = "resources\\assets\\js\\admin\\views\\mt\\help\\helps\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-565068d8", Component.options)
  } else {
    hotAPI.reload("data-v-565068d8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 492:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        'tinymce': function tinymce() {
            return __webpack_require__.e/* import() */(61/* duplicate */).then(__webpack_require__.bind(null, 312));
        }
    },
    data: function data() {
        return {
            dateOptions: this.$store.state.dateOptions,
            tinyOptions: {
                'height': 300
            },
            formType: false,
            user_type: 'basic',
            help_type: 'video',
            help: {
                status: 1,
                title: '',
                slug: '',
                basic_video: '',
                basic_text: '',
                medium_video: '',
                medium_text: '',
                advance_video: '',
                advance_text: '',
                categories: [],
                roles: [],
                order: null
            },
            helpConst: {
                status: 1,
                title: '',
                slug: '',
                basic_video: '',
                basic_text: '',
                medium_video: '',
                medium_text: '',
                advance_video: '',
                advance_text: '',
                categories: [],
                roles: [],
                order: null
            },
            helpSearch: {
                title: '',
                category: [],
                date_from: '',
                date_to: '',
                order_by: ''
            },
            helps: {},
            helpCats: [],
            roles: [],
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
        /* Fix tinymce popup modal input typing problem */
        $(document).on('focusin', function (e) {
            if ($(e.target).closest(".mce-window").length || $(e.target).closest(".moxman-window").length) {
                e.stopImmediatePropagation();
            }
        });

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
        select: function select() {
            this.selected = [];
            if (!this.selectAll) {
                for (var key in this.helps.data) {
                    this.selected.push(this.helps.data[key].id);
                }
            }
        },
        dataSearch: function dataSearch() {
            var data_search = this.helpSearch;
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

            axios.get('/api/v1/mt/helps?' + queryString).then(function (resp) {
                app.preloader = false;
                app.helps = resp.data.helps;
                app.helpCats = resp.data.helpcats;
                app.roles = resp.data.roles;

                if (app.helps.data.length == 0) {
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
            this.help = this.helpConst;
        },
        saveForm: function saveForm() {
            var _this = this;

            var app = this;
            var newHelp = app.help;

            if (!newHelp.categories.length) {
                alert('Select Category');
                return;
            }

            if (!newHelp.roles.length) {
                alert('Select Role');
                return;
            }

            $('#createModal').modal('toggle');

            if (this.formType) {
                axios.post('/api/v1/mt/helps', newHelp).then(function (resp) {
                    _this.help = _this.helpConst;
                    app.$store.commit('submitMsg', 'add');
                    app.getLists();
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            } else {
                axios.patch('/api/v1/mt/helps/' + newHelp.id, newHelp).then(function (resp) {
                    app.$store.commit('submitMsg', 'update');
                    app.getLists();
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            }
        },
        editForm: function editForm(help) {
            this.formType = false;
            this.help = help;

            //this is to fix error of tinymce = Error in callback for watcher "value": "TypeError: Cannot read property 'replace' of null"
            if (!this.help.basic_video) this.help.basic_video = '';
            if (!this.help.basic_text) this.help.basic_text = '';

            if (!this.help.medium_video) this.help.medium_video = '';
            if (!this.help.medium_text) this.help.medium_text = '';

            if (!this.help.advance_video) this.help.advance_video = '';
            if (!this.help.advance_text) this.help.advance_text = '';

            if (!this.help.roles.length) {
                this.help.roles = [{ id: 0, name: 'All' }];
            }
        },
        deleteEntry: function deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/mt/helps/' + id).then(function (resp) {
                    app.helps.data.splice(index, 1);
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
                axios.delete('/api/v1/mt/helps/' + selectedItem).then(function (resp) {
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

/***/ 493:
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
          _vm._v("\n           Help Lists\n        ")
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
              value: "help-create",
              expression: "'help-create'"
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
                        "  " + _vm._s(_vm.formType ? "New" : "Update") + " Help"
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
                        _c("div", { staticClass: "col-12 mb-3" }, [
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
                                  value: _vm.help.status,
                                  expression: "help.status"
                                }
                              ],
                              attrs: { type: "checkbox" },
                              domProps: {
                                checked: Array.isArray(_vm.help.status)
                                  ? _vm._i(_vm.help.status, null) > -1
                                  : _vm.help.status
                              },
                              on: {
                                change: function($event) {
                                  var $$a = _vm.help.status,
                                    $$el = $event.target,
                                    $$c = $$el.checked ? true : false
                                  if (Array.isArray($$a)) {
                                    var $$v = null,
                                      $$i = _vm._i($$a, $$v)
                                    if ($$el.checked) {
                                      $$i < 0 &&
                                        _vm.$set(
                                          _vm.help,
                                          "status",
                                          $$a.concat([$$v])
                                        )
                                    } else {
                                      $$i > -1 &&
                                        _vm.$set(
                                          _vm.help,
                                          "status",
                                          $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1))
                                        )
                                    }
                                  } else {
                                    _vm.$set(_vm.help, "status", $$c)
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
                          { staticClass: "col-12 mb-4 outline-group" },
                          [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.help.title,
                                  expression: "help.title"
                                }
                              ],
                              staticClass: "form-control outline",
                              attrs: {
                                placeholder: " ",
                                type: "text",
                                id: "title"
                              },
                              domProps: { value: _vm.help.title },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.help,
                                    "title",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("label", { attrs: { for: "title" } }, [
                              _vm._v("Title")
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-12 mb-4 outline-group" },
                          [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.help.slug,
                                  expression: "help.slug"
                                }
                              ],
                              staticClass: "form-control outline",
                              attrs: {
                                placeholder: " ",
                                type: "text",
                                id: "slug"
                              },
                              domProps: { value: _vm.help.slug },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.help,
                                    "slug",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("label", { attrs: { for: "slug" } }, [
                              _vm._v("Slug")
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-12 mb-2" }, [
                          _c(
                            "button",
                            {
                              class:
                                _vm.user_type == "basic"
                                  ? "btn btn-sm btn-dark mb-1"
                                  : "btn btn-sm btn-light border mb-1",
                              attrs: { type: "button" },
                              on: {
                                click: function($event) {
                                  _vm.user_type = "basic"
                                }
                              }
                            },
                            [_vm._v("Basic User")]
                          ),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              class:
                                _vm.user_type == "medium"
                                  ? "btn btn-sm btn-dark mb-1"
                                  : "btn btn-sm btn-light border mb-1",
                              attrs: { type: "button" },
                              on: {
                                click: function($event) {
                                  _vm.user_type = "medium"
                                }
                              }
                            },
                            [_vm._v("Medium User")]
                          ),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              class:
                                _vm.user_type == "advance"
                                  ? "btn btn-sm btn-dark mb-1"
                                  : "btn btn-sm btn-light border mb-1",
                              attrs: { type: "button" },
                              on: {
                                click: function($event) {
                                  _vm.user_type = "advance"
                                }
                              }
                            },
                            [_vm._v("Advance User")]
                          )
                        ]),
                        _vm._v(" "),
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
                            [_vm._v("Video Help")]
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
                            [_vm._v("Text Help")]
                          )
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-12 mb-4" },
                          [
                            _vm.user_type == "basic" && _vm.help_type == "video"
                              ? [
                                  _c("tinymce", {
                                    attrs: {
                                      id: "d1",
                                      other_options: _vm.tinyOptions
                                    },
                                    model: {
                                      value: _vm.help.basic_video,
                                      callback: function($$v) {
                                        _vm.$set(_vm.help, "basic_video", $$v)
                                      },
                                      expression: "help.basic_video"
                                    }
                                  })
                                ]
                              : _vm.user_type == "basic" &&
                                _vm.help_type == "text"
                                ? [
                                    _c("tinymce", {
                                      attrs: {
                                        id: "d2",
                                        other_options: _vm.tinyOptions
                                      },
                                      model: {
                                        value: _vm.help.basic_text,
                                        callback: function($$v) {
                                          _vm.$set(_vm.help, "basic_text", $$v)
                                        },
                                        expression: "help.basic_text"
                                      }
                                    })
                                  ]
                                : _vm.user_type == "medium" &&
                                  _vm.help_type == "video"
                                  ? [
                                      _c("tinymce", {
                                        attrs: {
                                          id: "d3",
                                          other_options: _vm.tinyOptions
                                        },
                                        model: {
                                          value: _vm.help.medium_video,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.help,
                                              "medium_video",
                                              $$v
                                            )
                                          },
                                          expression: "help.medium_video"
                                        }
                                      })
                                    ]
                                  : _vm.user_type == "medium" &&
                                    _vm.help_type == "text"
                                    ? [
                                        _c("tinymce", {
                                          attrs: {
                                            id: "d4",
                                            other_options: _vm.tinyOptions
                                          },
                                          model: {
                                            value: _vm.help.medium_text,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.help,
                                                "medium_text",
                                                $$v
                                              )
                                            },
                                            expression: "help.medium_text"
                                          }
                                        })
                                      ]
                                    : _vm.user_type == "advance" &&
                                      _vm.help_type == "video"
                                      ? [
                                          _c("tinymce", {
                                            attrs: {
                                              id: "d5",
                                              other_options: _vm.tinyOptions
                                            },
                                            model: {
                                              value: _vm.help.advance_video,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.help,
                                                  "advance_video",
                                                  $$v
                                                )
                                              },
                                              expression: "help.advance_video"
                                            }
                                          })
                                        ]
                                      : _vm.user_type == "advance" &&
                                        _vm.help_type == "text"
                                        ? [
                                            _c("tinymce", {
                                              attrs: {
                                                id: "d6",
                                                other_options: _vm.tinyOptions
                                              },
                                              model: {
                                                value: _vm.help.advance_text,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.help,
                                                    "advance_text",
                                                    $$v
                                                  )
                                                },
                                                expression: "help.advance_text"
                                              }
                                            })
                                          ]
                                        : _vm._e()
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-md-4 mb-4" },
                          [
                            _c("label", { staticClass: "o-s-l" }, [
                              _vm._v("Help Category")
                            ]),
                            _vm._v(" "),
                            _c("multiselect", {
                              attrs: {
                                options: _vm.helpCats,
                                multiple: true,
                                "close-on-select": false,
                                "clear-on-select": false,
                                "hide-selected": true,
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
                                value: _vm.help.categories,
                                callback: function($$v) {
                                  _vm.$set(_vm.help, "categories", $$v)
                                },
                                expression: "help.categories"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-md-4 mb-3" },
                          [
                            _c("label", { staticClass: "o-s-l" }, [
                              _vm._v("Help Roles")
                            ]),
                            _vm._v(" "),
                            _c("multiselect", {
                              attrs: {
                                options: _vm.roles,
                                multiple: true,
                                "close-on-select": false,
                                "clear-on-select": false,
                                "hide-selected": true,
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
                                value: _vm.help.roles,
                                callback: function($$v) {
                                  _vm.$set(_vm.help, "roles", $$v)
                                },
                                expression: "help.roles"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4 mb-3" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.help.order,
                                expression: "help.order"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "number",
                              id: "order"
                            },
                            domProps: { value: _vm.help.order },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(_vm.help, "order", $event.target.value)
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "order" } }, [
                            _vm._v("Serial")
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
                        _c(
                          "div",
                          { staticClass: "col-12 mb-3 outline-group" },
                          [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.helpSearch.title,
                                  expression: "helpSearch.title"
                                }
                              ],
                              staticClass: "form-control outline",
                              attrs: {
                                placeholder: " ",
                                type: "text",
                                id: "search-title"
                              },
                              domProps: { value: _vm.helpSearch.title },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.helpSearch,
                                    "title",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("label", { attrs: { for: "search-title" } }, [
                              _vm._v("Title")
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-12 mb-3" },
                          [
                            _c("label", { staticClass: "o-s-l" }, [
                              _vm._v("Select Category")
                            ]),
                            _vm._v(" "),
                            _c("multiselect", {
                              attrs: {
                                options: _vm.helpCats,
                                "deselect-label": "",
                                "select-label": "",
                                multiple: true,
                                "close-on-select": false,
                                "clear-on-select": false,
                                "hide-selected": true,
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
                                value: _vm.helpSearch.category,
                                callback: function($$v) {
                                  _vm.$set(_vm.helpSearch, "category", $$v)
                                },
                                expression: "helpSearch.category"
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
                                placeholder: "Date From"
                              },
                              model: {
                                value: _vm.helpSearch.date_from,
                                callback: function($$v) {
                                  _vm.$set(_vm.helpSearch, "date_from", $$v)
                                },
                                expression: "helpSearch.date_from"
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
                                value: _vm.helpSearch.date_to,
                                callback: function($$v) {
                                  _vm.$set(_vm.helpSearch, "date_to", $$v)
                                },
                                expression: "helpSearch.date_to"
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
                                  value: _vm.helpSearch.order_by,
                                  expression: "helpSearch.order_by"
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
                                    _vm.helpSearch,
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
                value: "help-create",
                expression: "'help-create'"
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
            _vm._v(" Help\n            ")
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
              _vm._m(4),
              _vm._v(" "),
              _c("th", [_vm._v("Status")]),
              _vm._v(" "),
              _c("th", [_vm._v("Category")]),
              _vm._v(" "),
              _c("th", [_vm._v("Role")]),
              _vm._v(" "),
              _c("th", [_vm._v("Serial")]),
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
              _vm._l(_vm.helps.data, function(help, index) {
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
                      attrs: { type: "checkbox", id: "checkbox-id-" + help.id },
                      domProps: {
                        value: help.id,
                        checked: Array.isArray(_vm.selected)
                          ? _vm._i(_vm.selected, help.id) > -1
                          : _vm.selected
                      },
                      on: {
                        change: function($event) {
                          var $$a = _vm.selected,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v = help.id,
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
                    _c("label", { attrs: { for: "checkbox-id-" + help.id } }, [
                      _vm._v(_vm._s(help.title))
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "td",
                    [
                      help.status
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
                    { staticClass: "taxonomies" },
                    [
                      help.categories
                        ? _vm._l(help.categories, function(category) {
                            return _c("span", [_vm._v(_vm._s(category.name))])
                          })
                        : _vm._e()
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c(
                    "td",
                    { staticClass: "taxonomies" },
                    [
                      help.roles.length
                        ? _vm._l(help.roles, function(role) {
                            return _c("span", [_vm._v(_vm._s(role.name))])
                          })
                        : [
                            _vm._v(
                              "\n                                All\n                            "
                            )
                          ]
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(help.order))]),
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
                                  value: "help-edit",
                                  expression: "'help-edit'"
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
                                  _vm.editForm(help)
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
                                  value: "help-delete",
                                  expression: "'help-delete'"
                                }
                              ],
                              staticClass: "dropdown-item",
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  _vm.deleteEntry(help.id, index)
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
              _vm._m(6),
              _vm._v(" "),
              _c("th", [_vm._v("Status")]),
              _vm._v(" "),
              _c("th", [_vm._v("Category")]),
              _vm._v(" "),
              _c("th", [_vm._v("Role")]),
              _vm._v(" "),
              _c("th", [_vm._v("Serial")]),
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
            attrs: { data: _vm.helps, limit: 2 },
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
    return _c("th", [
      _c("label", { attrs: { for: "check-all" } }, [_vm._v("Title")])
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
      _c("label", { attrs: { for: "check-all-bottom" } }, [_vm._v("Title")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-565068d8", module.exports)
  }
}

/***/ })

});