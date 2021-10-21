webpackJsonp([116],{

/***/ 286:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(516)
/* template */
var __vue_template__ = __webpack_require__(517)
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
Component.options.__file = "resources\\assets\\js\\admin\\views\\doc\\doc-cats\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d6574174", Component.options)
  } else {
    hotAPI.reload("data-v-d6574174", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 516:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            dateOptions: this.$store.state.dateOptions,
            formType: false,
            taxonomy: {
                name: '',
                parent_id: null,
                order: null
            },
            taxonomyConst: {
                name: '',
                parent_id: null,
                order: null
            },
            taxonomySearch: {
                name: '',
                date_from: '',
                date_to: '',
                order_by: ''
            },
            taxonomies: {},
            allTaxonomies: [],
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
        dash_icon: function dash_icon(depth) {
            return "<i class='sub-taxonomy icon-minus'></i>".repeat(depth);
        },
        select: function select() {
            this.selected = [];
            if (!this.selectAll) {
                for (var taxonomy in this.taxonomies.data) {
                    this.selected.push(this.taxonomies.data[taxonomy].id);
                }
            }
        },
        dataSearch: function dataSearch() {
            var data_search = this.taxonomySearch;
            var query = {};
            data_search.date_from = data_search.date_from ? data_search.date_from.toString() : '';
            data_search.date_to = data_search.date_to ? data_search.date_to.toString() : '';

            for (var key in data_search) {
                if (data_search[key]) {
                    query[key] = data_search[key];
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
            axios.get('/api/v1/doc/taxonomies/doc-category?' + queryString).then(function (resp) {
                app.preloader = false;

                app.taxonomies = resp.data;
                app.allTaxonomies = resp.data.data_all;

                if (app.taxonomies.data.length == 0) {
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
            this.taxonomy = this.taxonomyConst;
        },
        saveForm: function saveForm() {
            var _this = this;

            var app = this;
            this.$set(app.taxonomy, 'taxonomy', 'doc-category');
            var newTaxonomy = app.taxonomy;

            $('#createModal').modal('toggle');

            if (this.formType) {
                axios.post('/api/v1/doc/taxonomies', newTaxonomy).then(function (resp) {
                    _this.taxonomy = _this.taxonomyConst;
                    app.$store.commit('submitMsg', 'add');
                    app.getLists();
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            } else {
                axios.patch('/api/v1/doc/taxonomies/' + newTaxonomy.id, newTaxonomy).then(function (resp) {
                    app.$store.commit('submitMsg', 'update');
                    app.getLists();
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            }
        },
        editForm: function editForm(taxonomy) {
            this.formType = false;
            var id = [taxonomy.parent_id];
            var parentTax = this.allTaxonomies.filter(function (itm) {
                return id.indexOf(itm.id) > -1;
            });

            this.taxonomy = taxonomy;
            if (parentTax.length) {
                this.taxonomy.parent_id = parentTax[0];
            }

            if (!this.taxonomy.roles.length) {
                this.taxonomy.roles = [{ id: 0, name: 'All' }];
            }
        },
        deleteEntry: function deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/doc/taxonomies/' + id).then(function (resp) {
                    app.taxonomies.data.splice(index, 1);
                    app.$store.commit('submitMsg', 'delete');
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            }
        },
        deleteSelected: function deleteSelected() {
            var app = this;
            if (app.selected.length == 0) {
                app.$store.commit('noSeletedMsg');
                return;
            }
            if (confirm(app.$store.state.confirmDel)) {
                var selectedItem = this.selected.toString();
                axios.delete('/api/v1/doc/taxonomies/' + selectedItem).then(function (resp) {
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

/***/ 517:
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
          _vm._v("\n           Document Category Lists\n        ")
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
              value: "provider-taxonomy-create",
              expression: "'provider-taxonomy-create'"
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
            { staticClass: "modal-dialog", attrs: { role: "document" } },
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
                        _vm._s(_vm.formType ? "New" : "Update") +
                          " Document Category"
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
                        _c(
                          "div",
                          { staticClass: "col-12 mb-3 outline-group" },
                          [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.taxonomy.name,
                                  expression: "taxonomy.name"
                                }
                              ],
                              staticClass: "form-control outline",
                              attrs: {
                                placeholder: " ",
                                type: "text",
                                id: "Name"
                              },
                              domProps: { value: _vm.taxonomy.name },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.taxonomy,
                                    "name",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("label", { attrs: { for: "Name" } }, [
                              _vm._v("Name")
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
                                  value: _vm.taxonomy.slug,
                                  expression: "taxonomy.slug"
                                }
                              ],
                              staticClass: "form-control outline",
                              attrs: {
                                placeholder: " ",
                                type: "text",
                                id: "slug"
                              },
                              domProps: { value: _vm.taxonomy.slug },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.taxonomy,
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
                        _vm.allTaxonomies.length
                          ? _c(
                              "div",
                              { staticClass: "col-12 mb-3" },
                              [
                                _c(
                                  "label",
                                  {
                                    staticClass: "o-s-l",
                                    attrs: { for: "parent_id" }
                                  },
                                  [_vm._v("Parent Document Category")]
                                ),
                                _vm._v(" "),
                                _c("multiselect", {
                                  attrs: {
                                    options: _vm.allTaxonomies,
                                    "preserve-search": true,
                                    placeholder: "",
                                    selectLabel: "",
                                    deselectLabel: "",
                                    label: "name",
                                    "track-by": "name",
                                    "preselect-first": false
                                  },
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
                                    value: _vm.taxonomy.parent_id,
                                    callback: function($$v) {
                                      _vm.$set(_vm.taxonomy, "parent_id", $$v)
                                    },
                                    expression: "taxonomy.parent_id"
                                  }
                                })
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-12 mb-3" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.taxonomy.order,
                                expression: "taxonomy.order"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "number",
                              id: "order"
                            },
                            domProps: { value: _vm.taxonomy.order },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.taxonomy,
                                  "order",
                                  $event.target.value
                                )
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
                        [_vm._v(_vm._s(_vm.formType ? "Create" : "Update"))]
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
                                  value: _vm.taxonomySearch.name,
                                  expression: "taxonomySearch.name"
                                }
                              ],
                              staticClass: "form-control outline",
                              attrs: {
                                placeholder: " ",
                                type: "text",
                                id: "search-name"
                              },
                              domProps: { value: _vm.taxonomySearch.name },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.taxonomySearch,
                                    "name",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("label", { attrs: { for: "search-name" } }, [
                              _vm._v("Name")
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
                                value: _vm.taxonomySearch.date_from,
                                callback: function($$v) {
                                  _vm.$set(_vm.taxonomySearch, "date_from", $$v)
                                },
                                expression: "taxonomySearch.date_from"
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
                                value: _vm.taxonomySearch.date_to,
                                callback: function($$v) {
                                  _vm.$set(_vm.taxonomySearch, "date_to", $$v)
                                },
                                expression: "taxonomySearch.date_to"
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
                                  value: _vm.taxonomySearch.order_by,
                                  expression: "taxonomySearch.order_by"
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
                                    _vm.taxonomySearch,
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
                value: "provider-taxonomy-create",
                expression: "'provider-taxonomy-create'"
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
            _vm._v(" Document Category\n            ")
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
                    value: "provider-taxonomy-delete",
                    expression: "'provider-taxonomy-delete'"
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
              _vm._l(_vm.taxonomies.data, function(taxonomy, index) {
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
                        id: "checkbox-id-" + taxonomy.id
                      },
                      domProps: {
                        value: taxonomy.id,
                        checked: Array.isArray(_vm.selected)
                          ? _vm._i(_vm.selected, taxonomy.id) > -1
                          : _vm.selected
                      },
                      on: {
                        change: function($event) {
                          var $$a = _vm.selected,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v = taxonomy.id,
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
                      { attrs: { for: "checkbox-id-" + taxonomy.id } },
                      [
                        _c("span", {
                          domProps: {
                            innerHTML: _vm._s(_vm.dash_icon(taxonomy.depth))
                          }
                        }),
                        _vm._v(" " + _vm._s(taxonomy.name))
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(taxonomy.order))]),
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
                                  value: "provider-taxonomy-edit",
                                  expression: "'provider-taxonomy-edit'"
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
                                  _vm.editForm(taxonomy)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                                       Edit \n                                    "
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
                                  value: "provider-taxonomy-delete",
                                  expression: "'provider-taxonomy-delete'"
                                }
                              ],
                              staticClass: "dropdown-item",
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  _vm.deleteEntry(taxonomy.id, index)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                                        Delete\n                                    "
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
            attrs: { data: _vm.taxonomies, limit: 2 },
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
      _c("label", { attrs: { for: "check-all" } }, [_vm._v("Name")])
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
      _c("label", { attrs: { for: "check-all-bottom" } }, [_vm._v("Name")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d6574174", module.exports)
  }
}

/***/ })

});