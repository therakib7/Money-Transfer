webpackJsonp([79],{

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(343)
/* template */
var __vue_template__ = __webpack_require__(344)
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
Component.options.__file = "resources\\assets\\js\\admin\\views\\msg\\inbox\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-35dc7d37", Component.options)
  } else {
    hotAPI.reload("data-v-35dc7d37", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
		en: {
				name: 'Name',
				status: 'Status',
				amount: 'Amount',
				number: 'Number',
				service: 'Service',
				com: 'Com',
				operator: 'Operator',
				date: 'Date',
				message: 'Message',
				user_id: 'User ID',
				user_name: 'User Name',
				fee: 'Fee',
				action: 'Actions',
				address: 'Address',
				type: 'Type',
				select_category: 'select Category',
				mobile_number: 'Mobile Number',
				trx_id: 'Trx ID',
				all: 'All',
				total_amount: 'Total Amount',
				total_commission: 'Total Commission',
				search_user_help: 'Search by mobile, email or username',
				next: 'Next',
				previous: 'Previous',
				//modal-content 
				no: 'No:',
				note: 'Note',
				pin: 'Pin:',
				close: 'close',
				create: 'Create',

				delete: 'delete',
				edit: 'Edit',
				view: 'View',
				update: 'Update',
				cancelled: 'Cancelled',
				waiting: 'Waiting',
				//hover text
				show_pin: 'Show Pin',
				refresh_list: 'Refresh List',
				click_here_go_back: 'Click here to go back',
				click_here_go_forward: 'Click here to go forward',
				to_type_number: 'To type number'
		},
		bn: {
				name: 'নাম',
				status: 'অবস্থা',
				amount: 'টাকার পরিমান',
				number: 'নাম্বার',
				service: 'সেবা',
				com: 'কমিশন',
				operator: 'অপারেটর',
				date: 'তারিখ',
				message: 'মেসেজ',
				user_id: 'ইউজার আইডি',
				user_name: 'ইউজার নাম',
				fee: 'ফি',
				action: 'সম্পাদন',
				address: 'ঠিকানা',
				type: 'ধরন',
				select_category: 'শ্রেনী নির্বাচন',
				mobile_number: 'মোবাইল নাম্বার',
				trx_id: 'লেনদেন নং',
				all: 'সকল',
				total_amount: 'মোট টাকার পরিমান',
				total_commission: 'মোট কমিশন',
				search_user_help: 'মোবাইল বা ইমেইল দিয়ে সন্ধান করুন।',
				next: 'পরবর্তী',
				previous: 'আগে',
				//modal-content 
				no: 'নং:',
				note: 'নোট',
				pin: 'পিন',
				close: 'বন্ধ',
				create: 'তৈরী করুন',

				delete: 'বাদ দিন',
				edit: 'সম্পাদন',
				view: 'দেখুন',
				update: 'আপডেট',
				cancelled: 'বাতিল করা হয়েছে',
				waiting: 'অপেক্ষমান',
				//hover text
				show_pin: 'পিন দেখুন',
				refresh_list: 'রিফ্রেশ তালিকা',
				click_here_go_back: 'পিচনে যাও',
				click_here_go_forward: 'সামনে যাও',
				to_type_number: 'নাম্বার টাইপ করতে'
		}
});

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin_locales_shared_i18n_setup__ = __webpack_require__(306);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            userList: true,
            chatList: true,
            backMsg: false,
            dateOptions: this.$store.state.dateOptions,
            search_user: null,
            to_user_id: null,
            to_user_name: null,
            auth_id: this.$store.state.auth_id,
            inbox: {
                to_user_id: null,
                msg: ''
            },
            accounts: [],
            inboxSearch: {
                date_from: '',
                date_to: '',
                order_by: ''
            },
            inboxes: [],
            inbox_users: [],
            isLoading: false,
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
        },
        '$route.query.id': function $routeQueryId(id) {
            this.inbox.to_user_id = id;
            this.getInbox();
        },
        /* To match chat and user list height with windows */
        windowHeight: function windowHeight(newHeight, oldHeight) {
            this.boxHeight();
        },
        windowWidth: function windowWidth(newWidth, oldWidth) {
            this.boxWidth();
        },

        '$route': function $route(route) {
            this.boxWidth();
            this.boxHeight();
        }
    },
    created: function created() {
        var _this = this;

        this.inbox.to_user_id = this.$route.query.id;
        this.getLists();

        var per_page = this.$route.query.per_page;

        var perPageOptions = this.perPageOptions.find(function (ele) {
            return ele.value == per_page;
        });

        if (!perPageOptions) {
            this.perPageOptions.splice(0, 0, { text: per_page, value: per_page });
        }

        Echo.private('message.' + this.auth_id).listen('Message', function (e) {
            _this.inboxes.push(e.data);
        });
    },
    mounted: function mounted() {
        var _this2 = this;

        this.scrollToEnd();

        /* To match chat and user list height with windows */
        this.boxHeight();
        this.boxWidth();

        if (this.$route.query.id) {
            this.getInbox();
        }

        this.$nextTick(function () {
            window.addEventListener('resize', function () {
                _this2.windowHeight = window.innerHeight;
            });
        });

        this.$nextTick(function () {
            window.addEventListener('resize', function () {
                _this2.windowWidth = window.innerWidth;
            });
        });
    },
    updated: function updated() {
        this.scrollToEnd();
        this.boxHeight();
        this.boxWidth();
    },

    methods: {
        boxWidth: function boxWidth() {
            if (this.windowWidth < 768) {
                if (this.$route.query.id) {
                    this.chatList = true;
                    this.userList = false;

                    this.backMsg = true;
                } else {
                    this.chatList = false;
                    this.userList = true;
                }
            } else {
                this.chatList = true;
                this.userList = true;
            }
        },
        boxHeight: function boxHeight() {
            var firstDivHeight = this.windowHeight - 265;
            var secondDivHeight = this.windowHeight - 265;
            $('.message-content .message-menu').css('height', firstDivHeight + 'px');
            $('.chat .card-body').css('height', secondDivHeight + 'px');
        },
        searchUserSelected: function searchUserSelected() {
            var user = this.search_user;
            if (user) {
                this.to_user_name = user.name;
                var page = this.$route.query['page'];
                var per_page = this.$route.query['per_page'];
                this.$router.replace({ name: "msgInbox", query: { id: user.id, page: page, per_page: per_page } });

                this.inbox_users.unshift({ to_user_id: user.id, user_to: user });

                this.getInbox();
            }
        },
        customLabel: function customLabel(_ref) {
            var _ref$name = _ref.name,
                name = _ref$name === undefined ? '' : _ref$name,
                _ref$mobile = _ref.mobile,
                mobile = _ref$mobile === undefined ? '' : _ref$mobile,
                _ref$email = _ref.email,
                email = _ref$email === undefined ? '' : _ref$email,
                _ref$username = _ref.username,
                username = _ref$username === undefined ? '' : _ref$username;

            if (name && email && mobile && username) {
                return name + ' \u2014 ' + mobile + ' \u2014 ' + email + ' - ' + username;
            } else if (name && email && mobile) {
                return name + ' \u2014 ' + mobile + ' \u2014 ' + email;
            } else if (name && email) {
                return name + ' \u2014 ' + email;
            } else if (name && mobile) {
                return name + ' \u2014 ' + mobile;
            }
        },
        asyncFind: function asyncFind(query) {
            var _this3 = this;

            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(function () {
                if (query.length < 4) return;
                _this3.isLoading = true;
                axios.get('/api/v1/ac/accounts?' + 'title=' + query).then(function (resp) {
                    _this3.accounts = resp.data.users;
                    _this3.isLoading = false;
                }).catch(function (resp) {
                    _this3.$store.commit('errorMessages', resp);
                });
            }, 600);
        },
        select: function select() {
            this.selected = [];
            if (!this.selectAll) {
                for (var key in this.inboxes) {
                    this.selected.push(this.inboxes[key].id);
                }
            }
        },
        user_name: function user_name(user) {
            return user.user_from != null ? user.user_from.name : user.user_to.name;
        },
        user_msg: function user_msg(msg) {
            if (msg) {
                if (msg.length < 40) {
                    return msg;
                } else {
                    return msg.substring(0, 40) + '...';
                }
            } else {
                return '';
            }
        },
        user_image: function user_image(user) {
            var default_img = '/default/imgs/user.jpg';
            if (user.user_from) {
                if (user.user_from.profile.avatar_src) {
                    return '/uploads/imgs/' + user.user_from.profile.avatar_src.resized_name;
                } else {
                    return default_img;
                }
            } else if (user.user_to) {
                if (user.user_to.profile.avatar_src) {
                    return '/uploads/imgs/' + user.user_to.profile.avatar_src.resized_name;
                } else {
                    return default_img;
                }
            } else {
                return default_img;
            }
        },
        selectedUser: function selectedUser(user) {
            this.to_user_name = user.user_from != null ? user.user_from.name : user.user_to.name;
            var page = this.$route.query['page'];
            var per_page = this.$route.query['per_page'];
            if (user.user_from != null) {
                this.$router.replace({ name: "msgInbox", query: { id: user.user_from.id, page: page, per_page: per_page } });
            } else {
                this.$router.replace({ name: "msgInbox", query: { id: user.user_to.id, page: page, per_page: per_page } });
            }
            this.boxWidth();
            this.boxHeight();
            this.getInbox();
        },
        dataSearch: function dataSearch() {
            var data_search = this.inboxSearch;
            var query = {};
            data_search.date_from = data_search.date_from ? data_search.date_from.toString() : '';
            data_search.date_to = data_search.date_to ? data_search.date_to.toString() : '';

            for (var key in data_search) {
                if (data_search[key]) {
                    query[key] = key != 'inbox_id' ? data_search[key] : data_search[key]['id'];
                } else {
                    if (this.$route.query[key]) {
                        query[key] = '';
                    }
                }
            }
            this.$router.push({ path: document.location.search, query: query });
            this.getLists();
        },
        getInbox: function getInbox() {
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

            axios.get('/api/v1/msg/inboxes?' + queryString).then(function (resp) {
                app.preloader = false;

                app.inboxes = resp.data.inboxes;
                app.to_user_name = resp.data.user_info.name;
                if (app.inboxes.length == 0) {
                    app.noData = app.$store.state.noData;
                } else {
                    app.noData = '';
                }
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        },
        getLists: function getLists() {
            var app = this;
            axios.get('/api/v1/msg/inboxusers').then(function (resp) {
                app.preloader = false;
                app.inbox_users = resp.data.inboxusers;

                /*if ( app.inbox_users.length ) {                                 
                    var page = this.$route.query['page'];
                    var per_page = this.$route.query['per_page'];
                      if ( app.inbox_users[0].user_from != null ) {
                        var last_inbox_id = app.inbox_users[0].user_from.id;
                        this.to_user_name = app.inbox_users[0].user_from.name;
                    } else {
                        var last_inbox_id = app.inbox_users[0].user_to.id;
                        this.to_user_name = app.inbox_users[0].user_to.name;
                    } 
                        this.$router.replace({ name: "msgInbox", query: {id: last_inbox_id, page: page, per_page: per_page } }); 
                    this.getInbox();
                } */
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        },
        scrollToEnd: function scrollToEnd() {
            var container = document.querySelector(".chat-box");
            if (container) {
                var scrollHeight = container.scrollHeight;
                container.scrollTop = scrollHeight;
            }
        },
        saveForm: function saveForm() {
            var app = this;
            var newInbox = app.inbox;
            var MSG = newInbox.msg;
            app.inboxes.push({ from_user_id: this.auth_id, to_user_id: newInbox.to_user_id, msg: newInbox.msg, created_at: new Date() });
            newInbox.msg = '';

            var inbox = {
                msg: MSG,
                to_user_id: newInbox.to_user_id
            };

            axios.post('/api/v1/msg/inboxes', inbox).then(function (resp) {
                //app.inbox.msg = '';
                //app.$store.commit('submitMsg', 'add');  
                //app.getLists(); 
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        }
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
            en: {
                message_list: 'Messages List',
                select_user_chat: 'Select User To Chat',
                load_more: 'Load More',
                type_message: 'Type Message ...',
                send: 'Send'
            },
            bn: {
                message_list: 'মেসেজের তালিকা',
                select_user_chat: 'চ্যাট ব্যবহারকারী নির্বাচন করুন',
                load_more: 'আরও দেখুন',
                type_message: 'মেসেজ টাইপ করুন',
                send: 'পাঠান'
            }
        },
        sharedMessages: __WEBPACK_IMPORTED_MODULE_0__admin_locales_shared_i18n_setup__["a" /* default */]
    } //export default

});

/***/ }),

/***/ 344:
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
            "\n            " + _vm._s(_vm.$t("message_list")) + "\n        "
          )
        ]),
        _vm._v(" "),
        !_vm.backMsg
          ? [_c("back-forward")]
          : [
              _c("div", { staticClass: "back-forward float-right" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-sm btn-info",
                    attrs: { title: "Click here to go back" }
                  },
                  [
                    _c(
                      "a",
                      {
                        on: {
                          click: function($event) {
                            _vm.$router.push({
                              name: "msgInbox",
                              query: { page: 1, per_page: 20 }
                            })
                          }
                        }
                      },
                      [
                        _c("i", {
                          staticClass: "icon-left",
                          attrs: { "aria-hidden": "true" }
                        })
                      ]
                    )
                  ]
                )
              ])
            ]
      ],
      2
    ),
    _vm._v(" "),
    _c("div", { staticClass: "component-body settings" }, [
      _c("div", { staticClass: "row" }, [
        _vm.userList
          ? _c("div", { staticClass: "col-md-3 pr-0" }, [
              _c("ul", { staticClass: "message-content" }, [
                _c(
                  "li",
                  { staticClass: "header" },
                  [
                    _c("multiselect", {
                      attrs: {
                        id: "ajax",
                        options: _vm.accounts,
                        "custom-label": _vm.customLabel,
                        "preserve-search": true,
                        placeholder: _vm.$t("search_user"),
                        selectLabel: "",
                        loading: _vm.isLoading,
                        deselectLabel: "",
                        searchable: true,
                        label: "name",
                        "track-by": "name",
                        "preselect-first": true
                      },
                      on: {
                        "search-change": _vm.asyncFind,
                        input: function($event) {
                          _vm.searchUserSelected()
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
                        value: _vm.search_user,
                        callback: function($$v) {
                          _vm.search_user = $$v
                        },
                        expression: "search_user"
                      }
                    }),
                    _vm._v(" "),
                    _c("small", [_vm._v(_vm._s(_vm.$t("search_user_help")))])
                  ],
                  1
                ),
                _vm._v(" "),
                _c("li", [
                  _c(
                    "ul",
                    { staticClass: "message-menu" },
                    _vm._l(_vm.inbox_users, function(user, index) {
                      return _c("li", [
                        _c(
                          "a",
                          {
                            attrs: { href: "#" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                _vm.selectedUser(user)
                              }
                            }
                          },
                          [
                            _c("div", { staticClass: "float-left" }, [
                              _c("img", {
                                staticClass: "img-circle",
                                attrs: {
                                  src: _vm.user_image(user),
                                  alt: "User Image"
                                }
                              })
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "float-right" }, [
                              _c("h4", [
                                _vm._v(
                                  "\n                                            " +
                                    _vm._s(_vm.user_name(user)) +
                                    "\n                                            "
                                ),
                                _c("small", { staticClass: "d-none" }, [
                                  _c("i", { staticClass: "icon-clock-o" }),
                                  _vm._v(
                                    " " +
                                      _vm._s(
                                        _vm._f("moment")(
                                          user.created_at,
                                          "h:mm a, DD-MM-YYYY"
                                        )
                                      )
                                  )
                                ])
                              ]),
                              _vm._v(" "),
                              _c("p", [_vm._v(_vm._s(_vm.user_msg(user.msg)))])
                            ])
                          ]
                        )
                      ])
                    })
                  )
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "footer" }, [
                  _c(
                    "a",
                    {
                      attrs: { href: "#", onclick: "event.preventDefault();" }
                    },
                    [_vm._v(_vm._s(_vm.$t("load_more")))]
                  )
                ])
              ])
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.chatList
          ? _c("div", { staticClass: "col-md-9" }, [
              _c("div", { staticClass: "card chat chat-primary" }, [
                _c("div", { staticClass: "card-header" }, [
                  _c("h3", { staticClass: "card-title" }, [
                    _vm._v(
                      _vm._s(
                        _vm.$route.query.id
                          ? _vm.to_user_name
                          : _vm.$t("select_user_chat")
                      )
                    )
                  ]),
                  _vm._v(" "),
                  0
                    ? _c("div", { staticClass: "card-tools" }, [
                        _c(
                          "span",
                          {
                            staticClass: "badge badge-primary",
                            attrs: {
                              "data-toggle": "tooltip",
                              title: "3 New Messages"
                            }
                          },
                          [_vm._v("3")]
                        ),
                        _vm._v(" "),
                        _vm._m(0),
                        _vm._v(" "),
                        _vm._m(1)
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "card-body chat-box" }, [
                  _c(
                    "div",
                    { staticClass: "chat-messages" },
                    _vm._l(_vm.inboxes, function(inbox, index) {
                      return _c(
                        "div",
                        {
                          class:
                            _vm.auth_id == inbox.from_user_id
                              ? "chat-msg right"
                              : "chat-msg"
                        },
                        [
                          _c("div", { staticClass: "chat-info clearfix" }, [
                            _c("span", {
                              class:
                                _vm.auth_id == inbox.from_user_id
                                  ? "chat-timestamp float-right"
                                  : "chat-timestamp float-left"
                            })
                          ]),
                          _vm._v(" "),
                          _vm.auth_id != inbox.from_user_id
                            ? _c("img", {
                                staticClass: "chat-img img-circle",
                                attrs: {
                                  src: "/default/imgs/user.jpg",
                                  alt: "User Image"
                                }
                              })
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              class:
                                _vm.auth_id == inbox.from_user_id
                                  ? "chat-text"
                                  : "chat-text bg-chat-gray"
                            },
                            [
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(inbox.msg) +
                                  "\n                                "
                              )
                            ]
                          )
                        ]
                      )
                    })
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "card-footer" }, [
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
                      _c("div", { staticClass: "input-group" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.inbox.msg,
                              expression: "inbox.msg"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "text",
                            placeholder: _vm.$t("type_message")
                          },
                          domProps: { value: _vm.inbox.msg },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(_vm.inbox, "msg", $event.target.value)
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "input-group-append" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-primary",
                              attrs: { type: "submit" }
                            },
                            [_vm._v(_vm._s(_vm.$t("send")))]
                          )
                        ])
                      ])
                    ]
                  )
                ])
              ])
            ])
          : _vm._e()
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
      "button",
      {
        staticClass: "btn btn-tool",
        attrs: { type: "button", "data-widget": "collapse" }
      },
      [_c("i", { staticClass: "icon-minus" })]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "btn btn-tool",
        attrs: {
          type: "button",
          "data-toggle": "tooltip",
          title: "Contacts",
          "data-widget": "chat-pane-toggle"
        }
      },
      [_c("i", { staticClass: "icon-comment" })]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-35dc7d37", module.exports)
  }
}

/***/ })

});