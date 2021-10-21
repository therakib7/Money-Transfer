webpackJsonp([90],{

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(333)
/* template */
var __vue_template__ = __webpack_require__(334)
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
Component.options.__file = "resources\\assets\\js\\admin\\views\\roles\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-15d23e09", Component.options)
  } else {
    hotAPI.reload("data-v-15d23e09", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 333:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            dateOptions: this.$store.state.dateOptions,
            formType: false,
            role: {
                name: '',
                desc: '',
                permission: []
            },
            roleConst: {
                name: '',
                desc: '',
                permission: []
            },
            allPermission: false,
            editAllPermission: false,
            roleSearch: {
                title: '',
                content: '',
                date_from: '',
                date_to: '',
                order_by: ''
            },
            roles: {},
            permissions: [],
            permission_sublist: [],
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
        perSelect: function perSelect(id) {
            var checkValue = this.role.permission.indexOf(id);
            for (var key in this.permissions) {
                if (this.permissions[key].id == id) {
                    if (checkValue == -1) {
                        for (var key2 in this.permissions[key].childs) {
                            this.role.permission.push(this.permissions[key].childs[key2].id);
                        } // endfor
                    } else {
                        for (var _key in this.permissions[key].childs) {
                            var index = this.role.permission.indexOf(this.permissions[key].childs[_key].id);
                            this.role.permission.splice(index, 1);
                        } // endfor
                    }
                } // endif
            } // endfor 
        },
        allPermissionCheck: function allPermissionCheck() {
            if (!this.allPermission) {
                for (var key in this.permissions) {
                    this.role.permission.push(this.permissions[key].id);
                    for (var key2 in this.permissions[key].childs) {
                        this.role.permission.push(this.permissions[key].childs[key2].id);
                    } // endfor 
                } // endfor 
            } else {
                this.role.permission = [];
            }
        },
        child_name: function child_name(val) {
            return val.replace(" View", "");
        },
        select: function select() {
            this.selected = [];
            if (!this.selectAll) {
                for (var key in this.roles.data) {
                    this.selected.push(this.roles.data[key].id);
                }
            }
        },
        dataSearch: function dataSearch() {
            var data_search = this.roleSearch;
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

            axios.get('/api/v1/roles?' + queryString).then(function (resp) {
                app.preloader = false;

                app.roles = resp.data.roles;
                app.permissions = resp.data.permissions;

                if (app.roles.data.length == 0) {
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
            this.role = this.roleConst;
        },
        saveForm: function saveForm() {
            $('#createModal').modal('toggle');
            var app = this;
            var newRole = app.role;
            if (this.formType) {
                axios.post('/api/v1/roles', newRole).then(function (resp) {
                    app.$store.commit('nullForm', app.role);
                    app.$store.commit('submitMsg', 'add');
                    app.getLists();
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            } else {
                axios.patch('/api/v1/roles/' + newRole.id, newRole).then(function (resp) {
                    app.$store.commit('submitMsg', 'update');
                    app.getLists();
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
            }
        },
        editForm: function editForm(role) {
            this.formType = false;
            this.role.permission = [];
            for (var key in role) {
                if (key !== 'permissions') {
                    this.role[key] = role[key];
                } else {
                    for (var key2 in role[key]) {
                        this.role.permission.push(role[key][key2].permission_id);
                    }
                }
            }
        },
        deleteEntry: function deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/roles/' + id).then(function (resp) {
                    app.roles.data.splice(index, 1);
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
                axios.delete('/api/v1/roles/' + selectedItem).then(function (resp) {
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

/***/ 334:
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
          _vm._v("\n           Role Lists\n        ")
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
              value: "user-role-create",
              expression: "'user-role-create'"
            }
          ],
          staticClass: "modal fade",
          attrs: {
            id: "createModal",
            tabindex: "-1",
            role: "dialog",
            "aria-labelledby": "CreateModalLongTitle",
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
                      attrs: { id: "CreateModalLongTitle" }
                    },
                    [_vm._v(_vm._s(_vm.formType ? "New" : "Update") + "  Role")]
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
                          { staticClass: "col-md-6 mb-3 outline-group" },
                          [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.role.name,
                                  expression: "role.name"
                                }
                              ],
                              staticClass: "form-control outline",
                              attrs: {
                                placeholder: " ",
                                type: "text",
                                id: "name"
                              },
                              domProps: { value: _vm.role.name },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.role,
                                    "name",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("label", { attrs: { for: "name" } }, [
                              _vm._v("Name")
                            ])
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
                                  value: _vm.role.desc,
                                  expression: "role.desc"
                                }
                              ],
                              staticClass: "form-control outline",
                              attrs: {
                                placeholder: " ",
                                type: "text",
                                id: "desc"
                              },
                              domProps: { value: _vm.role.desc },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.role,
                                    "desc",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("label", { attrs: { for: "desc" } }, [
                              _vm._v("Description")
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-12 mb-3" }, [
                          _c("div", { staticClass: "table-responsive" }, [
                            _c(
                              "table",
                              { staticClass: "table table-striped bg-white" },
                              [
                                _c("thead", [
                                  _c("tr", [
                                    _c("th", [
                                      _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.allPermission,
                                            expression: "allPermission"
                                          }
                                        ],
                                        attrs: { type: "checkbox" },
                                        domProps: {
                                          checked: Array.isArray(
                                            _vm.allPermission
                                          )
                                            ? _vm._i(_vm.allPermission, null) >
                                              -1
                                            : _vm.allPermission
                                        },
                                        on: {
                                          click: function($event) {
                                            _vm.allPermissionCheck()
                                          },
                                          change: function($event) {
                                            var $$a = _vm.allPermission,
                                              $$el = $event.target,
                                              $$c = $$el.checked ? true : false
                                            if (Array.isArray($$a)) {
                                              var $$v = null,
                                                $$i = _vm._i($$a, $$v)
                                              if ($$el.checked) {
                                                $$i < 0 &&
                                                  (_vm.allPermission = $$a.concat(
                                                    [$$v]
                                                  ))
                                              } else {
                                                $$i > -1 &&
                                                  (_vm.allPermission = $$a
                                                    .slice(0, $$i)
                                                    .concat($$a.slice($$i + 1)))
                                              }
                                            } else {
                                              _vm.allPermission = $$c
                                            }
                                          }
                                        }
                                      })
                                    ]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("Group")]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("Name")]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("View")]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("Create")]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("Edit")]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("Delete")]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("Super")]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("Top Super")])
                                  ])
                                ]),
                                _vm._v(" "),
                                _c(
                                  "tbody",
                                  [
                                    _vm._l(_vm.permissions, function(
                                      permission
                                    ) {
                                      return [
                                        _vm._l(
                                          permission.childs.length / 6,
                                          function(n, index) {
                                            return [
                                              n == 1
                                                ? _c(
                                                    "tr",
                                                    [
                                                      _c("td", [
                                                        _c("input", {
                                                          directives: [
                                                            {
                                                              name: "model",
                                                              rawName:
                                                                "v-model",
                                                              value:
                                                                _vm.role
                                                                  .permission,
                                                              expression:
                                                                "role.permission"
                                                            }
                                                          ],
                                                          attrs: {
                                                            type: "checkbox"
                                                          },
                                                          domProps: {
                                                            value:
                                                              permission.id,
                                                            checked: Array.isArray(
                                                              _vm.role
                                                                .permission
                                                            )
                                                              ? _vm._i(
                                                                  _vm.role
                                                                    .permission,
                                                                  permission.id
                                                                ) > -1
                                                              : _vm.role
                                                                  .permission
                                                          },
                                                          on: {
                                                            click: function(
                                                              $event
                                                            ) {
                                                              _vm.perSelect(
                                                                permission.id
                                                              )
                                                            },
                                                            change: function(
                                                              $event
                                                            ) {
                                                              var $$a =
                                                                  _vm.role
                                                                    .permission,
                                                                $$el =
                                                                  $event.target,
                                                                $$c = $$el.checked
                                                                  ? true
                                                                  : false
                                                              if (
                                                                Array.isArray(
                                                                  $$a
                                                                )
                                                              ) {
                                                                var $$v =
                                                                    permission.id,
                                                                  $$i = _vm._i(
                                                                    $$a,
                                                                    $$v
                                                                  )
                                                                if (
                                                                  $$el.checked
                                                                ) {
                                                                  $$i < 0 &&
                                                                    _vm.$set(
                                                                      _vm.role,
                                                                      "permission",
                                                                      $$a.concat(
                                                                        [$$v]
                                                                      )
                                                                    )
                                                                } else {
                                                                  $$i > -1 &&
                                                                    _vm.$set(
                                                                      _vm.role,
                                                                      "permission",
                                                                      $$a
                                                                        .slice(
                                                                          0,
                                                                          $$i
                                                                        )
                                                                        .concat(
                                                                          $$a.slice(
                                                                            $$i +
                                                                              1
                                                                          )
                                                                        )
                                                                    )
                                                                }
                                                              } else {
                                                                _vm.$set(
                                                                  _vm.role,
                                                                  "permission",
                                                                  $$c
                                                                )
                                                              }
                                                            }
                                                          }
                                                        })
                                                      ]),
                                                      _vm._v(" "),
                                                      _c("td", [
                                                        _vm._v(
                                                          _vm._s(
                                                            permission.name
                                                          )
                                                        )
                                                      ]),
                                                      _vm._v(" "),
                                                      _vm._l(
                                                        permission.childs.slice(
                                                          0,
                                                          6
                                                        ),
                                                        function(per, key) {
                                                          return [
                                                            key < 1
                                                              ? _c("td", [
                                                                  _vm._v(
                                                                    _vm._s(
                                                                      _vm.child_name(
                                                                        per.name
                                                                      )
                                                                    )
                                                                  )
                                                                ])
                                                              : _vm._e(),
                                                            _vm._v(" "),
                                                            _c("td", [
                                                              _c("input", {
                                                                directives: [
                                                                  {
                                                                    name:
                                                                      "model",
                                                                    rawName:
                                                                      "v-model",
                                                                    value:
                                                                      _vm.role
                                                                        .permission,
                                                                    expression:
                                                                      "role.permission"
                                                                  }
                                                                ],
                                                                attrs: {
                                                                  type:
                                                                    "checkbox"
                                                                },
                                                                domProps: {
                                                                  value: per.id,
                                                                  checked: Array.isArray(
                                                                    _vm.role
                                                                      .permission
                                                                  )
                                                                    ? _vm._i(
                                                                        _vm.role
                                                                          .permission,
                                                                        per.id
                                                                      ) > -1
                                                                    : _vm.role
                                                                        .permission
                                                                },
                                                                on: {
                                                                  change: function(
                                                                    $event
                                                                  ) {
                                                                    var $$a =
                                                                        _vm.role
                                                                          .permission,
                                                                      $$el =
                                                                        $event.target,
                                                                      $$c = $$el.checked
                                                                        ? true
                                                                        : false
                                                                    if (
                                                                      Array.isArray(
                                                                        $$a
                                                                      )
                                                                    ) {
                                                                      var $$v =
                                                                          per.id,
                                                                        $$i = _vm._i(
                                                                          $$a,
                                                                          $$v
                                                                        )
                                                                      if (
                                                                        $$el.checked
                                                                      ) {
                                                                        $$i <
                                                                          0 &&
                                                                          _vm.$set(
                                                                            _vm.role,
                                                                            "permission",
                                                                            $$a.concat(
                                                                              [
                                                                                $$v
                                                                              ]
                                                                            )
                                                                          )
                                                                      } else {
                                                                        $$i >
                                                                          -1 &&
                                                                          _vm.$set(
                                                                            _vm.role,
                                                                            "permission",
                                                                            $$a
                                                                              .slice(
                                                                                0,
                                                                                $$i
                                                                              )
                                                                              .concat(
                                                                                $$a.slice(
                                                                                  $$i +
                                                                                    1
                                                                                )
                                                                              )
                                                                          )
                                                                      }
                                                                    } else {
                                                                      _vm.$set(
                                                                        _vm.role,
                                                                        "permission",
                                                                        $$c
                                                                      )
                                                                    }
                                                                  }
                                                                }
                                                              })
                                                            ])
                                                          ]
                                                        }
                                                      )
                                                    ],
                                                    2
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              n >= 1 &&
                                              n != permission.childs.length / 6
                                                ? _c(
                                                    "tr",
                                                    [
                                                      _c("td"),
                                                      _vm._v(" "),
                                                      _c("td"),
                                                      _vm._v(" "),
                                                      _vm._l(
                                                        permission.childs.slice(
                                                          n * 6,
                                                          n * 6 + 6
                                                        ),
                                                        function(per, key) {
                                                          return [
                                                            key < 1
                                                              ? _c("td", [
                                                                  _vm._v(
                                                                    _vm._s(
                                                                      _vm.child_name(
                                                                        per.name
                                                                      )
                                                                    )
                                                                  )
                                                                ])
                                                              : _vm._e(),
                                                            _vm._v(" "),
                                                            _c("td", [
                                                              _c("input", {
                                                                directives: [
                                                                  {
                                                                    name:
                                                                      "model",
                                                                    rawName:
                                                                      "v-model",
                                                                    value:
                                                                      _vm.role
                                                                        .permission,
                                                                    expression:
                                                                      "role.permission"
                                                                  }
                                                                ],
                                                                attrs: {
                                                                  type:
                                                                    "checkbox"
                                                                },
                                                                domProps: {
                                                                  value: per.id,
                                                                  checked: Array.isArray(
                                                                    _vm.role
                                                                      .permission
                                                                  )
                                                                    ? _vm._i(
                                                                        _vm.role
                                                                          .permission,
                                                                        per.id
                                                                      ) > -1
                                                                    : _vm.role
                                                                        .permission
                                                                },
                                                                on: {
                                                                  change: function(
                                                                    $event
                                                                  ) {
                                                                    var $$a =
                                                                        _vm.role
                                                                          .permission,
                                                                      $$el =
                                                                        $event.target,
                                                                      $$c = $$el.checked
                                                                        ? true
                                                                        : false
                                                                    if (
                                                                      Array.isArray(
                                                                        $$a
                                                                      )
                                                                    ) {
                                                                      var $$v =
                                                                          per.id,
                                                                        $$i = _vm._i(
                                                                          $$a,
                                                                          $$v
                                                                        )
                                                                      if (
                                                                        $$el.checked
                                                                      ) {
                                                                        $$i <
                                                                          0 &&
                                                                          _vm.$set(
                                                                            _vm.role,
                                                                            "permission",
                                                                            $$a.concat(
                                                                              [
                                                                                $$v
                                                                              ]
                                                                            )
                                                                          )
                                                                      } else {
                                                                        $$i >
                                                                          -1 &&
                                                                          _vm.$set(
                                                                            _vm.role,
                                                                            "permission",
                                                                            $$a
                                                                              .slice(
                                                                                0,
                                                                                $$i
                                                                              )
                                                                              .concat(
                                                                                $$a.slice(
                                                                                  $$i +
                                                                                    1
                                                                                )
                                                                              )
                                                                          )
                                                                      }
                                                                    } else {
                                                                      _vm.$set(
                                                                        _vm.role,
                                                                        "permission",
                                                                        $$c
                                                                      )
                                                                    }
                                                                  }
                                                                }
                                                              })
                                                            ])
                                                          ]
                                                        }
                                                      )
                                                    ],
                                                    2
                                                  )
                                                : _vm._e()
                                            ]
                                          }
                                        )
                                      ]
                                    })
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
                                            value: _vm.allPermission,
                                            expression: "allPermission"
                                          }
                                        ],
                                        attrs: { type: "checkbox" },
                                        domProps: {
                                          checked: Array.isArray(
                                            _vm.allPermission
                                          )
                                            ? _vm._i(_vm.allPermission, null) >
                                              -1
                                            : _vm.allPermission
                                        },
                                        on: {
                                          click: function($event) {
                                            _vm.allPermissionCheck()
                                          },
                                          change: function($event) {
                                            var $$a = _vm.allPermission,
                                              $$el = $event.target,
                                              $$c = $$el.checked ? true : false
                                            if (Array.isArray($$a)) {
                                              var $$v = null,
                                                $$i = _vm._i($$a, $$v)
                                              if ($$el.checked) {
                                                $$i < 0 &&
                                                  (_vm.allPermission = $$a.concat(
                                                    [$$v]
                                                  ))
                                              } else {
                                                $$i > -1 &&
                                                  (_vm.allPermission = $$a
                                                    .slice(0, $$i)
                                                    .concat($$a.slice($$i + 1)))
                                              }
                                            } else {
                                              _vm.allPermission = $$c
                                            }
                                          }
                                        }
                                      })
                                    ]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("Group")]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("Name")]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("View")]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("Create")]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("Edit")]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("Delete")]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("Super")]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("Top Super")])
                                  ])
                                ])
                              ]
                            )
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
                                  value: _vm.roleSearch.title,
                                  expression: "roleSearch.title"
                                }
                              ],
                              staticClass: "form-control outline",
                              attrs: {
                                placeholder: " ",
                                type: "text",
                                id: "search-title"
                              },
                              domProps: { value: _vm.roleSearch.title },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.roleSearch,
                                    "title",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("label", { attrs: { for: "search-title" } }, [
                              _vm._v("Text")
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-12 mb-3" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.roleSearch.content,
                                expression: "roleSearch.content"
                              }
                            ],
                            staticClass: "form-control outline",
                            attrs: {
                              placeholder: " ",
                              type: "text",
                              id: "search-content"
                            },
                            domProps: { value: _vm.roleSearch.content },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.roleSearch,
                                  "content",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "search-content" } }, [
                            _vm._v("Content")
                          ])
                        ]),
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
                                value: _vm.roleSearch.date_from,
                                callback: function($$v) {
                                  _vm.$set(_vm.roleSearch, "date_from", $$v)
                                },
                                expression: "roleSearch.date_from"
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
                                value: _vm.roleSearch.date_to,
                                callback: function($$v) {
                                  _vm.$set(_vm.roleSearch, "date_to", $$v)
                                },
                                expression: "roleSearch.date_to"
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
                                  value: _vm.roleSearch.order_by,
                                  expression: "roleSearch.order_by"
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
                                    _vm.roleSearch,
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
                value: "user-role-create",
                expression: "'user-role-create'"
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
            _vm._v(" Role\n            ")
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
                    value: "user-role-delete",
                    expression: "'user-role-delete'"
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
              _c("th", [_vm._v("Description")]),
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
              _vm._l(_vm.roles.data, function(role, index) {
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
                      attrs: { type: "checkbox", id: "checkbox-id-" + role.id },
                      domProps: {
                        value: role.id,
                        checked: Array.isArray(_vm.selected)
                          ? _vm._i(_vm.selected, role.id) > -1
                          : _vm.selected
                      },
                      on: {
                        change: function($event) {
                          var $$a = _vm.selected,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v = role.id,
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
                    _c("label", { attrs: { for: "checkbox-id-" + role.id } }, [
                      _vm._v(_vm._s(role.name))
                    ])
                  ]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(role.desc))]),
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
                                  value: "user-role-edit",
                                  expression: "'user-role-edit'"
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
                                  _vm.editForm(role)
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
                                  value: "user-role-delete",
                                  expression: "'user-role-delete'"
                                }
                              ],
                              staticClass: "dropdown-item",
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  _vm.deleteEntry(role.id, index)
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
              _c("th", [_vm._v("Description")]),
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
            attrs: { data: _vm.roles, limit: 2 },
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
    require("vue-hot-reload-api")      .rerender("data-v-15d23e09", module.exports)
  }
}

/***/ })

});