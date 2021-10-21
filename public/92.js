webpackJsonp([92],{

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(518)
/* template */
var __vue_template__ = __webpack_require__(519)
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
Component.options.__file = "resources\\assets\\js\\admin\\views\\nb\\notices\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-be3695fa", Component.options)
  } else {
    hotAPI.reload("data-v-be3695fa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 518:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        'tinymce': function tinymce() {
            return __webpack_require__.e/* import() */(61/* duplicate */).then(__webpack_require__.bind(null, 312));
        },
        'location': function location() {
            return __webpack_require__.e/* import() */(62).then(__webpack_require__.bind(null, 316));
        }
    },
    data: function data() {
        return {
            scheduleDateOptions: {
                format: 'YYYY-MM-DD hh:mm a',
                useCurrent: false,
                showClear: true,
                showClose: true
                //minDate: new Date()
            },
            dateOptions: this.$store.state.dateOptions,
            tinyOptions: {
                'height': 300
            },
            formType: false,
            notice_type: 'int', // international
            notice: {
                status: 1,
                title: '',
                native_title: '',
                content: '',
                native_content: '',
                type: 'primary',
                in_board: 1,
                schedule_from: null,
                for: null,
                role_ids: [],
                location_ids: [{ id: null }]
            },
            noticeConst: {
                status: 1,
                title: '',
                native_title: '',
                content: '',
                native_content: '',
                type: 'primary',
                in_board: 1,
                schedule_from: null,
                schedule_to: null,
                for: null,
                role_ids: [],
                location_ids: [{ id: null }]
            },
            noticeSearch: {
                title: '',
                date_from: '',
                date_to: '',
                order_by: ''
            },
            notices: {},
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
        //console.log(this.pre_address)

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
        addForIDs: function addForIDs(index) {
            this.notice.location_ids.splice(index + 1, 0, { id: null });
        },
        removeForIDs: function removeForIDs(index) {
            if (this.notice.location_ids.length == 1) {
                alert(this.$store.state.needOne);
            } else {
                this.notice.location_ids.splice(index, 1);
            }
        },
        select: function select() {
            this.selected = [];
            if (!this.selectAll) {
                for (var key in this.notices.data) {
                    this.selected.push(this.notices.data[key].id);
                }
            }
        },
        dataSearch: function dataSearch() {
            var data_search = this.noticeSearch;
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

            axios.get('/api/v1/nb/notices?' + queryString).then(function (resp) {
                app.preloader = false;
                app.notices = resp.data.notices;
                app.roles = resp.data.roles;

                if (app.notices.data.length == 0) {
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
            this.notice = this.noticeConst;
        },
        saveForm: function saveForm() {
            var _this = this;

            var app = this;
            var newNotice = app.notice;

            $('#createModal').modal('toggle');

            if (this.formType) {
                axios.post('/api/v1/nb/notices', newNotice).then(function (resp) {
                    _this.notice = _this.noticeConst;
                    app.$store.commit('submitMsg', 'add');
                    app.getLists();
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            } else {
                axios.patch('/api/v1/nb/notices/' + newNotice.id, newNotice).then(function (resp) {
                    _this.notice = _this.noticeConst;
                    app.$store.commit('submitMsg', 'update');
                    app.getLists();
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            }
        },
        editForm: function editForm(notice) {
            this.formType = false;
            this.notice = notice;

            //this is to fix error of tinymce = Error in callback for watcher "value": "TypeError: Cannot read property 'replace' of null"
            if (!this.notice.content) this.notice.content = '';
            if (!this.notice.native_content) this.notice.native_content = '';

            var notice_datas = notice.notice_by_types;
            this.notice.location_ids = [];
            this.notice.role_ids = [];
            for (var key in notice_datas) {
                if (notice_datas[key].location_id) {
                    this.notice.location_ids.push({ id: notice_datas[key].location_id });
                }

                if (notice_datas[key].role_id) {
                    var id = [notice_datas[key].role_id];
                    var filteredArray = this.roles.filter(function (itm) {
                        return id.indexOf(itm.id) > -1;
                    });
                    this.notice.role_ids.push(filteredArray[0]);
                }
            }
        },
        deleteEntry: function deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/nb/notices/' + id).then(function (resp) {
                    app.notices.data.splice(index, 1);
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
                axios.delete('/api/v1/nb/notices/' + selectedItem).then(function (resp) {
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

/***/ 519:
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
          _vm._v("\n           Notice Lists\n        ")
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
                          " Notice"
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
                                  value: _vm.notice.status,
                                  expression: "notice.status"
                                }
                              ],
                              attrs: { type: "checkbox" },
                              domProps: {
                                checked: Array.isArray(_vm.notice.status)
                                  ? _vm._i(_vm.notice.status, null) > -1
                                  : _vm.notice.status
                              },
                              on: {
                                change: function($event) {
                                  var $$a = _vm.notice.status,
                                    $$el = $event.target,
                                    $$c = $$el.checked ? true : false
                                  if (Array.isArray($$a)) {
                                    var $$v = null,
                                      $$i = _vm._i($$a, $$v)
                                    if ($$el.checked) {
                                      $$i < 0 &&
                                        _vm.$set(
                                          _vm.notice,
                                          "status",
                                          $$a.concat([$$v])
                                        )
                                    } else {
                                      $$i > -1 &&
                                        _vm.$set(
                                          _vm.notice,
                                          "status",
                                          $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1))
                                        )
                                    }
                                  } else {
                                    _vm.$set(_vm.notice, "status", $$c)
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
                                  value: _vm.notice.title,
                                  expression: "notice.title"
                                }
                              ],
                              staticClass: "form-control outline",
                              attrs: {
                                placeholder: " ",
                                type: "text",
                                id: "title"
                              },
                              domProps: { value: _vm.notice.title },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.notice,
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
                                  value: _vm.notice.native_title,
                                  expression: "notice.native_title"
                                }
                              ],
                              staticClass: "form-control outline",
                              attrs: {
                                placeholder: " ",
                                type: "text",
                                id: "native_title"
                              },
                              domProps: { value: _vm.notice.native_title },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.notice,
                                    "native_title",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("label", { attrs: { for: "native_title" } }, [
                              _vm._v("Native Title")
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-12 mb-4" }, [
                          _c(
                            "button",
                            {
                              class:
                                _vm.notice_type == "int"
                                  ? "btn btn-sm btn-dark mb-1"
                                  : "btn btn-sm btn-light border mb-1",
                              attrs: { type: "button" },
                              on: {
                                click: function($event) {
                                  _vm.notice_type = "int"
                                }
                              }
                            },
                            [_vm._v("Content")]
                          ),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              class:
                                _vm.notice_type == "native"
                                  ? "btn btn-sm btn-dark mb-1"
                                  : "btn btn-sm btn-light border mb-1",
                              attrs: { type: "button" },
                              on: {
                                click: function($event) {
                                  _vm.notice_type = "native"
                                }
                              }
                            },
                            [_vm._v("Native Content")]
                          )
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-12 mb-4" },
                          [
                            _vm.notice_type == "int"
                              ? [
                                  _c("tinymce", {
                                    attrs: {
                                      id: "d1",
                                      other_options: _vm.tinyOptions
                                    },
                                    model: {
                                      value: _vm.notice.content,
                                      callback: function($$v) {
                                        _vm.$set(_vm.notice, "content", $$v)
                                      },
                                      expression: "notice.content"
                                    }
                                  })
                                ]
                              : _vm.notice_type == "native"
                                ? [
                                    _c("tinymce", {
                                      attrs: {
                                        id: "d2",
                                        other_options: _vm.tinyOptions
                                      },
                                      model: {
                                        value: _vm.notice.native_content,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.notice,
                                            "native_content",
                                            $$v
                                          )
                                        },
                                        expression: "notice.native_content"
                                      }
                                    })
                                  ]
                                : _vm._e()
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6 mb-3" }, [
                          _c("label", { staticClass: "o-s-l" }, [
                            _vm._v("Type")
                          ]),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.notice.type,
                                  expression: "notice.type"
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
                                  _vm.$set(
                                    _vm.notice,
                                    "type",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                }
                              }
                            },
                            [
                              _c("option", { attrs: { value: "primary" } }, [
                                _vm._v("Primary")
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "secondary" } }, [
                                _vm._v("Secondary")
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "success" } }, [
                                _vm._v("Success")
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "danger" } }, [
                                _vm._v("Danger")
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "warning" } }, [
                                _vm._v("warning")
                              ])
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6 mb-3" }, [
                          _c("label", { attrs: { for: "status" } }, [
                            _vm._v("In Notice Board")
                          ]),
                          _vm._v(" "),
                          _c("label", { staticClass: "switch" }, [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.notice.in_board,
                                  expression: "notice.in_board"
                                }
                              ],
                              attrs: { type: "checkbox" },
                              domProps: {
                                checked: Array.isArray(_vm.notice.in_board)
                                  ? _vm._i(_vm.notice.in_board, null) > -1
                                  : _vm.notice.in_board
                              },
                              on: {
                                change: function($event) {
                                  var $$a = _vm.notice.in_board,
                                    $$el = $event.target,
                                    $$c = $$el.checked ? true : false
                                  if (Array.isArray($$a)) {
                                    var $$v = null,
                                      $$i = _vm._i($$a, $$v)
                                    if ($$el.checked) {
                                      $$i < 0 &&
                                        _vm.$set(
                                          _vm.notice,
                                          "in_board",
                                          $$a.concat([$$v])
                                        )
                                    } else {
                                      $$i > -1 &&
                                        _vm.$set(
                                          _vm.notice,
                                          "in_board",
                                          $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1))
                                        )
                                    }
                                  } else {
                                    _vm.$set(_vm.notice, "in_board", $$c)
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
                          { staticClass: "col-md-6 mb-3" },
                          [
                            _c("date-picker", {
                              attrs: {
                                config: _vm.scheduleDateOptions,
                                placeholder: "Schedule From"
                              },
                              model: {
                                value: _vm.notice.schedule_from,
                                callback: function($$v) {
                                  _vm.$set(_vm.notice, "schedule_from", $$v)
                                },
                                expression: "notice.schedule_from"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-md-6 mb-3" },
                          [
                            _c("date-picker", {
                              attrs: {
                                config: _vm.scheduleDateOptions,
                                placeholder: "Schedule To"
                              },
                              model: {
                                value: _vm.notice.schedule_to,
                                callback: function($$v) {
                                  _vm.$set(_vm.notice, "schedule_to", $$v)
                                },
                                expression: "notice.schedule_to"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6 mb-3" }, [
                          _c("label", { staticClass: "o-s-l" }, [
                            _vm._v("Notice For")
                          ]),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.notice.for,
                                  expression: "notice.for"
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
                                  _vm.$set(
                                    _vm.notice,
                                    "for",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                }
                              }
                            },
                            [
                              _c("option", { domProps: { value: null } }, [
                                _vm._v("All")
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "role" } }, [
                                _vm._v("Role")
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "location" } }, [
                                _vm._v("Location")
                              ]),
                              _vm._v(" "),
                              _c(
                                "option",
                                { attrs: { value: "role-location" } },
                                [_vm._v("Role & Location")]
                              )
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _vm.notice.for == "role" ||
                        _vm.notice.for == "role-location"
                          ? _c(
                              "div",
                              { staticClass: "col-12 mb-3" },
                              [
                                _c("label", { staticClass: "o-s-l" }, [
                                  _vm._v("For Role")
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
                                    value: _vm.notice.role_ids,
                                    callback: function($$v) {
                                      _vm.$set(_vm.notice, "role_ids", $$v)
                                    },
                                    expression: "notice.role_ids"
                                  }
                                })
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.notice.for == "location" ||
                        _vm.notice.for == "role-location"
                          ? _c(
                              "div",
                              { staticClass: "mt-number-list" },
                              _vm._l(_vm.notice.location_ids, function(
                                id,
                                key
                              ) {
                                return _c(
                                  "div",
                                  { staticClass: "mt-numbers" },
                                  [
                                    _c("div", { staticClass: "mt-title" }, [
                                      _vm._v(
                                        "\n                                            For Location: " +
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
                                        {
                                          staticClass:
                                            "col-12 mb-3 mt-40 mar-b-25"
                                        },
                                        [
                                          _c("location", {
                                            attrs: {
                                              warning: false,
                                              location_id: id.id
                                            },
                                            model: {
                                              value: id.id,
                                              callback: function($$v) {
                                                _vm.$set(id, "id", $$v)
                                              },
                                              expression: "id.id"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ])
                                  ]
                                )
                              })
                            )
                          : _vm._e()
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
                                  value: _vm.noticeSearch.title,
                                  expression: "noticeSearch.title"
                                }
                              ],
                              staticClass: "form-control outline",
                              attrs: {
                                placeholder: " ",
                                type: "text",
                                id: "search-title"
                              },
                              domProps: { value: _vm.noticeSearch.title },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.noticeSearch,
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
                            _c("date-picker", {
                              attrs: {
                                config: _vm.dateOptions,
                                placeholder: "Date From"
                              },
                              model: {
                                value: _vm.noticeSearch.date_from,
                                callback: function($$v) {
                                  _vm.$set(_vm.noticeSearch, "date_from", $$v)
                                },
                                expression: "noticeSearch.date_from"
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
                                value: _vm.noticeSearch.date_to,
                                callback: function($$v) {
                                  _vm.$set(_vm.noticeSearch, "date_to", $$v)
                                },
                                expression: "noticeSearch.date_to"
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
                                  value: _vm.noticeSearch.order_by,
                                  expression: "noticeSearch.order_by"
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
                                    _vm.noticeSearch,
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
            _vm._v(" Notice\n            ")
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
              _c("th", [_vm._v("Native Title")]),
              _vm._v(" "),
              _c("th", [_vm._v("Status")]),
              _vm._v(" "),
              _c("th", [_vm._v("Type")]),
              _vm._v(" "),
              _c("th", [_vm._v("For")]),
              _vm._v(" "),
              _c("th", [_vm._v("Schedule From")]),
              _vm._v(" "),
              _c("th", [_vm._v("Schedule To")]),
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
              _vm._l(_vm.notices.data, function(notice, index) {
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
                        id: "checkbox-id-" + notice.id
                      },
                      domProps: {
                        value: notice.id,
                        checked: Array.isArray(_vm.selected)
                          ? _vm._i(_vm.selected, notice.id) > -1
                          : _vm.selected
                      },
                      on: {
                        change: function($event) {
                          var $$a = _vm.selected,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v = notice.id,
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
                      { attrs: { for: "checkbox-id-" + notice.id } },
                      [_vm._v(_vm._s(notice.title))]
                    )
                  ]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(notice.native_title))]),
                  _vm._v(" "),
                  _c(
                    "td",
                    [
                      notice.status
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
                  _c("td", { staticClass: "text-capitalize" }, [
                    _vm._v(_vm._s(notice.type))
                  ]),
                  _vm._v(" "),
                  _c(
                    "td",
                    { staticClass: "text-capitalize" },
                    [
                      !notice.for
                        ? [_vm._v("All")]
                        : [_vm._v(_vm._s(notice.for))]
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      _vm._s(
                        _vm._f("moment")(
                          notice.schedule_from,
                          "DD-MMM-YYYY hh:mm a"
                        )
                      )
                    )
                  ]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      _vm._s(
                        _vm._f("moment")(
                          notice.schedule_to,
                          "DD-MMM-YYYY hh:mm a"
                        )
                      )
                    )
                  ]),
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
                                  _vm.editForm(notice)
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
                                  _vm.deleteEntry(notice.id, index)
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
              _c("th", [_vm._v("Native Title")]),
              _vm._v(" "),
              _c("th", [_vm._v("Status")]),
              _vm._v(" "),
              _c("th", [_vm._v("Type")]),
              _vm._v(" "),
              _c("th", [_vm._v("For")]),
              _vm._v(" "),
              _c("th", [_vm._v("Schedule From")]),
              _vm._v(" "),
              _c("th", [_vm._v("Schedule To")]),
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
            attrs: { data: _vm.notices, limit: 2 },
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
    require("vue-hot-reload-api")      .rerender("data-v-be3695fa", module.exports)
  }
}

/***/ })

});