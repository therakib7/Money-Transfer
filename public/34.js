webpackJsonp([34],{260:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e,i,o=s(0),r=s.n(o);function c(t,a,s){return a in t?Object.defineProperty(t,a,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[a]=s,t}a.default={components:{"date-time-picker":function(){return s.e(59).then(s.bind(null,240))}},data:function(){return{dateOptions:this.$store.state.dateOptions,board_item:{balance:0,ref_com:0,mr:0,mr_com:0,mb_due:0,mb:0,mb_com:0,co_mb:0,ubp:0,ubp_com:0,ubp_due:0},board_item_search:{date_from:"",date_to:"",order_by:""},preloader:!0}},watch:{perPage:function(t){var a=this.$route.query.page;this.$router.push({path:document.location.search,query:{page:a,per_page:t}}),this.getLists()}},created:function(){this.getLists()},mounted:function(){this.$root.popupModal()},updated:function(){this.$root.dropdownModal()},methods:{month_text:function(){return this.$route.query.date_from&&this.$route.query.date_to?"From: "+r()(this.$route.query.date_from).format("DD-MM-YYYY hh:mm")+" To: "+r()(this.$route.query.date_to).format("DD-MM-YYYY hh:mm"):this.$route.query.date_from?"From: "+r()(this.$route.query.date_from).format("DD-MM-YYYY hh:mm"):this.$route.query.date_to?"To: "+r()(this.$route.query.date_to).format("DD-MM-YYYY hh:mm"):this.$t("current_month")},dataSearch:function(){var t=this.board_item_search,a={};for(var s in t.date_from=t.date_from?t.date_from.toString():"",t.date_to=t.date_to?t.date_to.toString():"",t)t[s]?a[s]=t[s]:this.$route.query[s]&&(a[s]="");this.$router.push({path:document.location.search,query:a}),this.getLists()},getLists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],s=this,e=this.$route.query.per_page,i=a?t:this.$route.query.page;a&&this.$router.push({path:document.location.search,query:{page:i,per_page:e}});var o=this.$route.query,r=Object.keys(o).map(function(t){return t+"="+o[t]}).join("&");axios.get("/api/v1/mt/dashboards?"+r).then(function(t){if(s.preloader=!1,s.board_item.balance=t.data.ac_balance.balance?t.data.ac_balance.balance:0,s.board_item.ref_com=t.data.ref_com.total_amount?t.data.ref_com.total_amount:0,s.board_item.co_mb=t.data.co_mb.total_amount?t.data.co_mb.total_amount:0,t.data.mt.length)for(var a in t.data.mt)null===t.data.mt[a].type&&(s.board_item.mr=t.data.mt[a].total_amount,t.data.mt[a].total_user_com&&(s.board_item.mr_com=t.data.mt[a].total_user_com)),1===t.data.mt[a].type&&(s.board_item.mb=t.data.mt[a].total_amount,t.data.mt[a].total_user_com&&(s.board_item.mb_com=t.data.mt[a].total_user_com)),2===t.data.mt[a].type&&(s.board_item.ubp=t.data.mt[a].total_amount,t.data.mt[a].total_user_com&&(s.board_item.ubp_com=t.data.mt[a].total_user_com));if(t.data.mt_due.length)for(var e in t.data.mt_due)null===t.data.mt_due[e].type&&(s.board_item.mb_due=t.data.mt_due[e].total_due),1===t.data.mt_due[e].type&&(s.board_item.ubp_due=t.data.mt_due[e].total_due)}).catch(function(t){s.$store.commit("errorMessages",t)})}},i18n:{messages:{en:(e={current_month:"current month",mr:"Mobile Recharge",db_summary:"Dashboard Summary",curent_balance:"Curent Balance",t_ref_coms:"Total Referral Commision"},c(e,"mr","Mobile Recharge"),c(e,"t_mr","Total Mobile Recharge"),c(e,"t_mr_com","Total Mobile Recharge Commision"),c(e,"t_mb_due","Total Mobile Recharge & Banking Due"),c(e,"t_co_mb","Total CashOut Mobile Banking"),c(e,"mb","Mobile Banking"),c(e,"t_mb","Total Mobile Banking"),c(e,"t_mb_com","Total Mobile Banking Commission"),c(e,"ubp","Utility Bill Pay"),c(e,"t_ubp","Total Utility Bill"),c(e,"t_ubp_com","Total Utility Bill Commission"),c(e,"t_ubp_due","Total Utility Bill Due"),c(e,"more_info","More Info"),e),bn:(i={current_month:"বর্তমান মাস",mr:"মোবাইল রিচার্জ",db_summary:"ডেসবোর্ড সারাংশ",curent_balance:"বর্তমান টাকা",t_ref_coms:"মোট রেফারেল কমিশন"},c(i,"mr","মোবাইল রিচার্জ"),c(i,"t_mr","মোট মোবাইল রিচার্জ"),c(i,"t_mr_com","মোট মোবাইল রিচার্জ কমিশন"),c(i,"t_mb_due","মোট মোবাইল রিচার্জ এন্ড ব্যাংকিং বাকি"),c(i,"mb","মোবাইল ব্যাংকিং"),c(i,"t_mb","মোট মোবাইল ব্যাংকিং"),c(i,"t_mb_com","মোট মোবাইল ব্যাংকিং কমিশন"),c(i,"t_co_mb","মোট ক্যাশআউট মোবাইল ব্যাংকিং"),c(i,"ubp","প্রয়োজনীয় বিল প্রদান"),c(i,"t_ubp","মোট প্রয়োজনীয় বিল "),c(i,"t_ubp_com","মোট প্রয়োজনীয় বিল কমিশন"),c(i,"t_ubp_due","মোট প্রয়োজনীয় বিল বাকি"),c(i,"more_info","আরও তথ্য"),i)}}}},261:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"component"},[s("div",{staticClass:"component-body"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-9"},[s("div",{staticClass:"content-heading"},[s("h2",{staticClass:"heading"},[t._v("\n                       "+t._s(t.$t("db_summary"))+"\n                       "),s("small",[t._v(t._s(t.month_text()))])])])]),t._v(" "),s("div",{staticClass:"col-3"},[s("button",{staticClass:"btn btn-sm btn-info float-right mt-4",attrs:{type:"button","data-toggle":"modal","data-target":"#dataSearch"}},[s("i",{staticClass:"icon-search"}),t._v(" "),s("span",{staticClass:"d-none d-sm-inline"},[t._v(t._s(t.$t("search")))])])])]),t._v(" "),s("div",{staticClass:"modal right fade",attrs:{id:"dataSearch"}},[s("div",{staticClass:"modal-dialog"},[s("div",{staticClass:"modal-content"},[s("div",{staticClass:"modal-header"},[s("h5",{staticClass:"modal-title"},[t._v(t._s(t.$t("search")))]),t._v(" "),t._m(0)]),t._v(" "),s("form",{on:{submit:function(a){return a.preventDefault(),t.dataSearch()}}},[s("div",{staticClass:"modal-body"},[s("div",{staticClass:"form-row"},[s("div",{staticClass:"col-12 mb-3"},[s("date-time-picker",{attrs:{"value-format":"yyyy-LL-dd HH:mm:ss",format:"dd-LLLL-yyyy hh:mm a","today-button":!0,"close-button":!0,"hour-time":12},scopedSlots:t._u([{key:"choose-date",fn:function(){return[t._v(t._s(t.$t("date_from")))]},proxy:!0}]),model:{value:t.board_item_search.date_from,callback:function(a){t.$set(t.board_item_search,"date_from",a)},expression:"board_item_search.date_from"}})],1),t._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("date-time-picker",{attrs:{"value-format":"yyyy-LL-dd HH:mm:ss",format:"dd-LLLL-yyyy hh:mm a","today-button":!0,"close-button":!0,"hour-time":12},scopedSlots:t._u([{key:"choose-date",fn:function(){return[t._v(t._s(t.$t("date_to")))]},proxy:!0}]),model:{value:t.board_item_search.date_to,callback:function(a){t.$set(t.board_item_search,"date_to",a)},expression:"board_item_search.date_to"}})],1),t._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("button",{staticClass:"btn btn-primary btn-sm",attrs:{type:"submit"}},[t._v(t._s(t.$t("search")))]),t._v(" "),s("button",{staticClass:"btn btn-dark float-right btn-sm",attrs:{type:"reset"}},[t._v(t._s(t.$t("reset")))])])])])])])])]),t._v(" "),s("div",{staticClass:"form-row"},[s("div",{staticClass:"col-md-6 col-lg-3"},[s("div",{staticClass:"small-box bg-success"},[s("div",{staticClass:"inner"},[s("h3",[t._v(t._s(t.board_item.balance))]),t._v(" "),s("p",[t._v(t._s(t.$t("curent_balance")))])]),t._v(" "),t._m(1),t._v(" "),s("router-link",{staticClass:"small-box-footer",attrs:{to:{name:"acBalanceTransfer",query:{page:1,per_page:10}}}},[t._v("\n                        "+t._s(t.$t("more_info"))),s("i",{staticClass:"icon-right-circled"})])],1)]),t._v(" "),t.$root.can("referral-view")?s("div",{staticClass:"col-md-6 col-lg-3"},[s("div",{staticClass:"small-box bg-success"},[s("div",{staticClass:"inner"},[s("h3",[t._v(t._s(t.board_item.ref_com))]),t._v(" "),s("p",[t._v(t._s(t.$t("t_ref_coms")))])]),t._v(" "),t._m(2),t._v(" "),s("router-link",{staticClass:"small-box-footer",attrs:{to:{name:"mtReferralCommissions",query:{page:1,per_page:10}}}},[t._v("\n                        "+t._s(t.$t("more_info"))),s("i",{staticClass:"icon-right-circled"})])],1)]):t._e()]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"content-heading"},[s("h2",{staticClass:"heading"},[t._v("\n                       "+t._s(t.$t("mr"))+"\n                    ")])])])]),t._v(" "),s("div",{staticClass:"form-row"},[s("div",{staticClass:"col-md-6 col-lg-3"},[s("div",{staticClass:"small-box bg-info"},[s("div",{staticClass:"inner"},[s("h3",[t._v(t._s(t.board_item.mr))]),t._v(" "),s("p",[t._v(t._s(t.$t("t_mr")))])]),t._v(" "),t._m(3),t._v(" "),s("router-link",{staticClass:"small-box-footer",attrs:{to:{name:"mobileRecharges",query:{page:1,per_page:10}}}},[t._v("\n                        "+t._s(t.$t("more_info"))),s("i",{staticClass:"icon-right-circled"})])],1)]),t._v(" "),t.$root.can({name:"personal",if:!1})?s("div",{staticClass:"col-md-6 col-lg-3"},[s("div",{staticClass:"small-box bg-success"},[s("div",{staticClass:"inner"},[s("h3",[t._v(t._s(t.board_item.mr_com))]),t._v(" "),s("p",[t._v(t._s(t.$t("t_mr_com")))])]),t._v(" "),t._m(4),t._v(" "),s("router-link",{staticClass:"small-box-footer",attrs:{to:{name:"mobileRecharges",query:{page:1,per_page:10}}}},[t._v("\n                        "+t._s(t.$t("more_info"))),s("i",{staticClass:"icon-right-circled"})])],1)]):t._e(),t._v(" "),t.$root.can("due-amount-view")?s("div",{staticClass:"col-md-6 col-lg-3"},[s("div",{staticClass:"small-box amber"},[s("div",{staticClass:"inner"},[s("h3",[t._v(t._s(t.board_item.mb_due))]),t._v(" "),s("p",[t._v(t._s(t.$t("t_mb_due")))])]),t._v(" "),t._m(5),t._v(" "),s("router-link",{staticClass:"small-box-footer",attrs:{to:{name:"mtMtDues",query:{page:1,per_page:10}}}},[t._v("\n                        "+t._s(t.$t("more_info"))),s("i",{staticClass:"icon-right-circled"})])],1)]):t._e()]),t._v(" "),t.$root.can("mobile-banking-view")?s("div",{staticClass:"row"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"content-heading"},[s("h2",{staticClass:"heading"},[t._v("\n                        "+t._s(t.$t("mb"))+"\n                    ")])])])]):t._e(),t._v(" "),t.$root.can("mobile-banking-view")?s("div",{staticClass:"form-row"},[s("div",{staticClass:"col-md-6 col-lg-3"},[s("div",{staticClass:"small-box bg-info"},[s("div",{staticClass:"inner"},[s("h3",[t._v(t._s(t.board_item.mb))]),t._v(" "),s("p",[t._v(t._s(t.$t("t_mb")))])]),t._v(" "),t._m(6),t._v(" "),s("router-link",{staticClass:"small-box-footer",attrs:{to:{name:"mobileBankings",query:{page:1,per_page:10}}}},[t._v("\n                        "+t._s(t.$t("more_info"))),s("i",{staticClass:"icon-right-circled"})])],1)]),t._v(" "),t.$root.can({name:"personal",if:!1})?s("div",{staticClass:"col-md-6 col-lg-3"},[s("div",{staticClass:"small-box bg-success"},[s("div",{staticClass:"inner"},[s("h3",[t._v(t._s(t.board_item.mb_com))]),t._v(" "),s("p",[t._v(t._s(t.$t("t_mb_com")))])]),t._v(" "),t._m(7),t._v(" "),s("router-link",{staticClass:"small-box-footer",attrs:{to:{name:"mobileBankings",query:{page:1,per_page:10}}}},[t._v("\n                        "+t._s(t.$t("more_info"))),s("i",{staticClass:"icon-right-circled"})])],1)]):t._e(),t._v(" "),t.$root.can("cashout-banking-view")?s("div",{staticClass:"col-md-6 col-lg-3"},[s("div",{staticClass:"small-box bg-info"},[s("div",{staticClass:"inner"},[s("h3",[t._v(t._s(t.board_item.co_mb))]),t._v(" "),s("p",[t._v(t._s(t.$t("t_co_mb")))])]),t._v(" "),t._m(8),t._v(" "),s("router-link",{staticClass:"small-box-footer",attrs:{to:{name:"mtCashoutMB",query:{page:1,per_page:10}}}},[t._v("\n                        "+t._s(t.$t("more_info"))),s("i",{staticClass:"icon-right-circled"})])],1)]):t._e()]):t._e(),t._v(" "),s("div",{directives:[{name:"can",rawName:"v-can",value:"utility-bill-view",expression:"'utility-bill-view'"}],staticClass:"row"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"content-heading"},[s("h2",{staticClass:"heading"},[t._v("\n                        "+t._s(t.$t("ubp"))+"\n                    ")])])])]),t._v(" "),s("div",{directives:[{name:"can",rawName:"v-can",value:"utility-bill-view",expression:"'utility-bill-view'"}],staticClass:"form-row"},[t.$root.can("utility-bill-view")?s("div",{staticClass:"col-md-6 col-lg-3"},[s("div",{staticClass:"small-box bg-info"},[s("div",{staticClass:"inner"},[s("h3",[t._v(t._s(t.board_item.ubp))]),t._v(" "),s("p",[t._v(t._s(t.$t("t_ubp")))])]),t._v(" "),t._m(9),t._v(" "),s("router-link",{staticClass:"small-box-footer",attrs:{to:{name:"mtUbps",query:{page:1,per_page:10}}}},[t._v("\n                        "+t._s(t.$t("more_info"))),s("i",{staticClass:"icon-right-circled"})])],1)]):t._e(),t._v(" "),t.$root.can({name:"personal",if:!1})?s("div",{staticClass:"col-md-6 col-lg-3"},[s("div",{staticClass:"small-box bg-success"},[s("div",{staticClass:"inner"},[s("h3",[t._v(t._s(t.board_item.ubp_com))]),t._v(" "),s("p",[t._v(t._s(t.$t("t_ubp_com")))])]),t._v(" "),t._m(10),t._v(" "),s("router-link",{staticClass:"small-box-footer",attrs:{to:{name:"mtUbps",query:{page:1,per_page:10}}}},[t._v("\n                        "+t._s(t.$t("more_info"))),s("i",{staticClass:"icon-right-circled"})])],1)]):t._e(),t._v(" "),t.$root.can("due-amount-view")?s("div",{staticClass:"col-md-6 col-lg-3"},[s("div",{staticClass:"small-box amber"},[s("div",{staticClass:"inner"},[s("h3",[t._v(t._s(t.board_item.ubp_due))]),t._v(" "),s("p",[t._v(t._s(t.$t("t_ubp_due")))])]),t._v(" "),t._m(11),t._v(" "),s("router-link",{staticClass:"small-box-footer",attrs:{to:{name:"mtUtilityDues",query:{page:1,per_page:10}}}},[t._v("\n                        "+t._s(t.$t("more_info"))),s("i",{staticClass:"icon-right-circled"})])],1)]):t._e()])])])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"icon"},[a("i",{staticClass:"icon-money"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"icon"},[a("i",{staticClass:"icon-percent"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"icon"},[a("i",{staticClass:"icon-share"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"icon"},[a("i",{staticClass:"icon-percent"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"icon"},[a("i",{staticClass:"icon-adjust"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"icon"},[a("i",{staticClass:"icon-share"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"icon"},[a("i",{staticClass:"icon-percent"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"icon"},[a("i",{staticClass:"icon-reply"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"icon"},[a("i",{staticClass:"icon-share"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"icon"},[a("i",{staticClass:"icon-percent"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"icon"},[a("i",{staticClass:"icon-adjust"})])}]}},500:function(t,a,s){var e=s(16)(s(260),s(261),!1,null,null,null);t.exports=e.exports}});