webpackJsonp([16],{241:function(t,e,s){"use strict";e.a={en:{name:"Name",status:"Status",amount:"Amount",tk:"Amount",number:"Number",service:"Service",com:"Com",operator:"Operator",date:"Date",message:"Message",user_id:"User ID",u_n:"User Name",fee:"Fee",action:"Actions",address:"Address",type:"Type",s_cat:"Select Category",m_n:"Mobile Number",trx_id:"Trx ID",all:"All",t_a:"Total Amount",t_com:"Total Commission",s_u_h:"Search by mobile, email or username",next:"Next",previous:"Previous",m_s:"Modify Status",d_s:"Delete Selected",edit_schedule:"Edit Schedule",schedule_time:"Schedule Time",s_o:"Select Operator",s_s:"Select Service",no:"No:",note:"Note",pin:"Pin",close:"Close",create:"Create",delete:"Delete",edit:"Edit",view:"View",update:"Update",cancelled:"Cancelled",waiting:"Waiting",show_pin:"Show Pin",hide_pin:"Hide Pin",refresh_list:"Refresh List",c_h_go_b:"Click here to go back",c_h_go_f:"Click here to go forward",to_type_number:"To type number"},bn:{name:"নাম",status:"অবস্থা",amount:"টাকা",tk:"টাকার পরিমান",number:"নাম্বার",service:"সেবা",com:"কমিশন",operator:"অপারেটর",date:"তারিখ",message:"মেসেজ",user_id:"ইউজার আইডি",u_n:"ইউজার নাম",fee:"ফি",action:"সম্পাদন",address:"ঠিকানা",type:"ধরন",s_cat:"শ্রেনী নির্বাচন",m_n:"মোবাইল নাম্বার",trx_id:"লেনদেন নং",all:"সকল",t_a:"মোট টাকার পরিমান",t_com:"মোট কমিশন",s_u_h:"মোবাইল বা ইমেইল দিয়ে সন্ধান করুন।",next:"পরবর্তী",previous:"পূর্ববর্তী",m_s:"অবস্থা সংশোধন করুন",d_s:"নির্বাচিত তথ্য মুছে ফেলুন",edit_schedule:"সময় সম্পাদনা করুন",schedule_time:"সময় নির্ধারন করুন",s_o:"অপারেটর নির্বাচন",s_s:"সেবা নির্বাচন",no:"নং:",note:"নোট",pin:"পিন",close:"বন্ধ",create:"তৈরী করুন",delete:"মুছে ফেলুন",edit:"সম্পাদন",view:"দেখুন",update:"পরিবর্তন",cancelled:"বাতিল করা হয়েছে",waiting:"অপেক্ষমান",show_pin:"পিন দেখুন",hide_pin:"পিন অদৃশ্য",refresh_list:"তালিকা পুনঃ লোড করুন",c_h_go_b:"পিচনে যাও",c_h_go_f:"সামনে যাও",to_type_number:"নাম্বার টাইপ করতে"}}},418:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(241);e.default={components:{"date-time-picker":function(){return s.e(59).then(s.bind(null,240))}},data:function(){return{dateOptions:this.$store.state.dateOptions,co_mb:{receive_msg:!0,service_id:"",trx_id:"",number:"",amount:""},co_mb_Const:{receive_msg:!0,service_id:"",trx_id:"",number:"",amount:""},showPass:!1,co_mbSearch:{service_id:"",number:"",amount_from:"",amount_to:"",date_from:"",date_to:"",order_by:""},co_mbs:{},services:[],t_a:0,total_user_com:0,perPage:this.$route.query.per_page,perPageOptions:this.$store.state.perPageOptions,selected:[],selectAll:!1,noData:"",preloader:!0}},watch:{perPage:function(t){var e=this.$route.query.page;this.$router.push({path:document.location.search,query:{page:e,per_page:t}}),this.getLists()}},created:function(){this.co_mb_super_role=this.$root.can("cashout-banking-super"),this.co_mb_agent_mer_role=this.$root.can(["agent","merchant"]),this.getLists();var t=this.$route.query.per_page;this.perPageOptions.find(function(e){return e.value==t})||this.perPageOptions.splice(0,0,{text:t,value:t})},mounted:function(){this.$root.popupModal()},updated:function(){this.$root.dropdownModal()},methods:{labelService:function(t){return""+t.provider.name},select:function(){if(this.selected=[],!this.selectAll)for(var t in this.co_mbs.data)this.selected.push(this.co_mbs.data[t].id)},dataSearch:function(){var t=this.co_mbSearch,e={};for(var s in t.date_from=t.date_from?t.date_from.toString():"",t.date_to=t.date_to?t.date_to.toString():"",t)t[s]?e[s]=t[s]:this.$route.query[s]&&(e[s]="");this.$router.push({path:document.location.search,query:e}),this.getLists()},user:function(t){return t.mobile?t.mobile:t.email?t.email:t.username},getLists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],s=this,a=this.$route.query.per_page,o=e?t:this.$route.query.page;e&&this.$router.push({path:document.location.search,query:{page:o,per_page:a}});var r=this.$route.query,i=Object.keys(r).map(function(t){return t+"="+r[t]}).join("&");axios.get("/api/v1/mt/co-mbs?"+i).then(function(t){s.preloader=!1,s.co_mbs=t.data.co_mbs,s.services=t.data.services;var e=0,a=0;t.data.co_mbs.data.forEach(function(t){e+=parseFloat(t.amount),null!=t.user_com&&(a+=parseFloat(t.user_com))}),s.t_a=e,s.total_user_com=a.toFixed(2),0==s.co_mbs.data.length?s.noData=s.$store.state.noData:s.noData=""}).catch(function(t){s.$store.commit("errorMessages",t)})},saveForm:function(){var t=this;document.getElementById("createModal").style.display="none";var e=this,s=e.co_mb;axios.post("/api/v1/mt/co-mbs",s).then(function(s){e.co_mb=e.co_mb_Const,e.$store.commit("submitMsg","add"),t.$root.acBalance(),e.getLists()}).catch(function(t){e.$store.commit("errorMessages",t)})}},i18n:{messages:{en:{co_m_b_list:"Cash Out Mob Banking Lists",co_v:"Cash Out Verify",used_time:"Used Time",c_t:"Coming Time",s_p:"Select Provider",provider:"Provider",new_co_v:"New Cash Out Verify",verify:"Verify",did_not_r_m:"Didn't receive message?",r_m:"Received Message?"},bn:{co_m_b_list:"ক্যাশ আউট মোবাঃ ব্যাংকিং তালিকা",co_v:"ক্যাশ আউট যাচাই",used_time:"ব্যবহৃত সময়",c_t:"আসার সময়",s_p:"প্রদানকারী নির্বাচন",provider:"প্রদানকারী",new_co_v:"নতুন ক্যাশ আউট যাচাই",verify:"যাচাই",did_not_r_m:"মেসেজ পাইনি",r_m:"মেসেজ পেয়েছি"}},sharedMessages:a.a}}},419:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"component"},[s("div",{staticClass:"component-heading clearfix"},[s("h2",{staticClass:"heading float-left"},[t._v("\n           "+t._s(t.$t("co_m_b_list"))+" \n        ")]),t._v(" "),s("back-forward")],1),t._v(" "),s("div",{staticClass:"component-body"},[s("div",{directives:[{name:"can",rawName:"v-can",value:"cashout-banking-create",expression:"'cashout-banking-create'"}],staticClass:"modal fade",attrs:{id:"createModal"}},[s("div",{staticClass:"modal-dialog"},[s("div",{staticClass:"modal-content"},[s("div",{staticClass:"modal-header"},[s("h5",{staticClass:"modal-title"},[t._v(t._s(t.$t("new_co_v"))+" ")]),t._v(" "),t._m(0)]),t._v(" "),s("form",{on:{submit:function(e){return e.preventDefault(),t.saveForm()}}},[s("div",{staticClass:"modal-body"},[s("div",{staticClass:"form-row"},[t.co_mb.receive_msg?t._e():s("div",{staticClass:"col-md-12 mb-3 text-danger"},[t._v("\n                                    You need to try after 10 minutes to verify by number and amount.\n                                ")]),t._v(" "),s("div",{staticClass:"col-md-12 mb-3"},[s("label",{staticClass:"o-s-l"},[t._v(t._s(t.$t("provider")))]),t._v(" "),s("multiselect",{attrs:{"deselect-label":"","select-label":"",options:t.services,"custom-label":t.labelService,"preserve-search":!0,placeholder:t.$t("s_p"),label:"id","track-by":"id","preselect-first":!1},scopedSlots:t._u([{key:"tag",fn:function(e){return[s("span",[t._v(t._s(e.option.name))]),t._v(" "),s("span",{on:{click:function(t){return e.remove(e.option)}}},[t._v("x")])]}}]),model:{value:t.co_mb.service_id,callback:function(e){t.$set(t.co_mb,"service_id",e)},expression:"co_mb.service_id"}})],1),t._v(" "),t.co_mb.receive_msg?s("div",{staticClass:"col-md-12 mb-3 outline-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.co_mb.trx_id,expression:"co_mb.trx_id"}],staticClass:"form-control outline",attrs:{placeholder:" ",type:"text",id:"trx_id"},domProps:{value:t.co_mb.trx_id},on:{input:function(e){e.target.composing||t.$set(t.co_mb,"trx_id",e.target.value)}}}),t._v(" "),s("label",{attrs:{for:"trx_id"}},[t._v(t._s(t.$t("trx_id")))])]):[s("div",{staticClass:"col-md-12 mb-3 outline-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.co_mb.number,expression:"co_mb.number"}],staticClass:"form-control outline",attrs:{placeholder:" ",type:"text",id:"number"},domProps:{value:t.co_mb.number},on:{input:function(e){e.target.composing||t.$set(t.co_mb,"number",e.target.value)}}}),t._v(" "),s("label",{attrs:{for:"number"}},[t._v(t._s(t.$t("number")))])]),t._v(" "),s("div",{staticClass:"col-md-12 mb-3 outline-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.co_mb.amount,expression:"co_mb.amount"}],staticClass:"form-control outline",attrs:{placeholder:" ",type:"text",id:"amount"},domProps:{value:t.co_mb.amount},on:{input:function(e){e.target.composing||t.$set(t.co_mb,"amount",e.target.value)}}}),t._v(" "),s("label",{attrs:{for:"amount"}},[t._v(t._s(t.$t("amount")))])])],t._v(" "),s("div",{staticClass:"col-md-12 mb-3 outline-group"},[s("span",{staticClass:"text-primary cursor-pointer",on:{click:function(e){t.co_mb.receive_msg=!t.co_mb.receive_msg}}},[t._v(t._s(t.co_mb.receive_msg?t.$t("did_not_r_m"):t.$t("r_m")))])])],2)]),t._v(" "),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v(t._s(t.$t("close")))]),t._v(" "),s("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("\n                            "+t._s(t.$t("verify"))+"\n                            ")])])])])])]),t._v(" "),s("div",{staticClass:"modal right fade",attrs:{id:"dataSearch"}},[s("div",{staticClass:"modal-dialog"},[s("div",{staticClass:"modal-content"},[s("div",{staticClass:"modal-header"},[s("h5",{staticClass:"modal-title"},[t._v(t._s(t.$t("search")))]),t._v(" "),t._m(1)]),t._v(" "),s("form",{on:{submit:function(e){return e.preventDefault(),t.dataSearch()}}},[s("div",{staticClass:"modal-body"},[s("div",{staticClass:"form-row"},[s("div",{staticClass:"col-12 mb-3"},[s("label",{staticClass:"o-s-l"},[t._v(t._s(t.$t("show")))]),t._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:t.perPage,expression:"perPage"}],staticClass:"form-control",on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.perPage=e.target.multiple?s:s[0]}}},t._l(t.perPageOptions,function(e){return s("option",{domProps:{value:e.value}},[t._v("\n                                            "+t._s(e.text)+"\n                                        ")])}),0)]),t._v(" "),s("div",{staticClass:"col-md-12 mb-3"},[s("label",{staticClass:"o-s-l"},[t._v(t._s(t.$t("provider")))]),t._v(" "),s("multiselect",{attrs:{"deselect-label":"","select-label":"",options:t.services,"custom-label":t.labelService,"preserve-search":!0,placeholder:t.$t("s_p"),label:"id","track-by":"id","preselect-first":!0},scopedSlots:t._u([{key:"tag",fn:function(e){return[s("span",[t._v(t._s(e.option.name))]),t._v(" "),s("span",{on:{click:function(t){return e.remove(e.option)}}},[t._v("x")])]}}]),model:{value:t.co_mbSearch.service_id,callback:function(e){t.$set(t.co_mbSearch,"service_id",e)},expression:"co_mbSearch.service_id"}})],1),t._v(" "),s("div",{staticClass:"col-12 mb-3 outline-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.co_mbSearch.number,expression:"co_mbSearch.number"}],staticClass:"form-control outline",attrs:{placeholder:" ",type:"text",id:"search-number"},domProps:{value:t.co_mbSearch.number},on:{input:function(e){e.target.composing||t.$set(t.co_mbSearch,"number",e.target.value)}}}),t._v(" "),s("label",{attrs:{for:"search-number"}},[t._v(t._s(t.$t("number")))])]),t._v(" "),s("div",{staticClass:"col-12 mb-3 outline-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.co_mbSearch.amount_from,expression:"co_mbSearch.amount_from"}],staticClass:"form-control outline",attrs:{placeholder:"search-amount-from",type:"text",id:"search-amount-from"},domProps:{value:t.co_mbSearch.amount_from},on:{input:function(e){e.target.composing||t.$set(t.co_mbSearch,"amount_from",e.target.value)}}}),t._v(" "),s("label",{attrs:{for:"search-amount-from"}},[t._v(t._s(t.$t("amount_from")))])]),t._v(" "),s("div",{staticClass:"col-12 mb-3 outline-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.co_mbSearch.amount_to,expression:"co_mbSearch.amount_to"}],staticClass:"form-control outline",attrs:{placeholder:" ",type:"text",id:"search-amount-to"},domProps:{value:t.co_mbSearch.amount_to},on:{input:function(e){e.target.composing||t.$set(t.co_mbSearch,"amount_to",e.target.value)}}}),t._v(" "),s("label",{attrs:{for:"search-amount-to"}},[t._v(t._s(t.$t("amount_to")))])]),t._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("date-time-picker",{attrs:{"value-format":"yyyy-LL-dd HH:mm:ss",format:"dd-LLLL-yyyy hh:mm a","today-button":!0,"close-button":!0,"hour-time":12},scopedSlots:t._u([{key:"choose-date",fn:function(){return[t._v(t._s(t.$t("date_from")))]},proxy:!0}]),model:{value:t.co_mbSearch.date_from,callback:function(e){t.$set(t.co_mbSearch,"date_from",e)},expression:"co_mbSearch.date_from"}})],1),t._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("date-time-picker",{attrs:{"value-format":"yyyy-LL-dd HH:mm:ss",format:"dd-LLLL-yyyy hh:mm a","today-button":!0,"close-button":!0,"hour-time":12},scopedSlots:t._u([{key:"choose-date",fn:function(){return[t._v(t._s(t.$t("date_to")))]},proxy:!0}]),model:{value:t.co_mbSearch.date_to,callback:function(e){t.$set(t.co_mbSearch,"date_to",e)},expression:"co_mbSearch.date_to"}})],1),t._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("label",{staticClass:"o-s-l"},[t._v(t._s(t.$t("order_by")))]),t._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:t.co_mbSearch.order_by,expression:"co_mbSearch.order_by"}],staticClass:"form-control",attrs:{id:"search-order-by"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.co_mbSearch,"order_by",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:""}},[t._v(t._s(t.$t("newer_first")))]),t._v(" "),s("option",{attrs:{value:"1"}},[t._v(t._s(t.$t("newer_last")))])])]),t._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("button",{staticClass:"btn btn-primary btn-sm",attrs:{type:"submit"}},[t._v(t._s(t.$t("search")))]),t._v(" "),s("button",{staticClass:"btn btn-dark float-right btn-sm",attrs:{type:"reset"}},[t._v(t._s(t.$t("reset")))])])])])])])])]),t._v(" "),s("div",{staticClass:"table-actions"},[s("button",{directives:[{name:"can",rawName:"v-can",value:"cashout-banking-create",expression:"'cashout-banking-create'"}],staticClass:"btn btn-sm bg-success",attrs:{type:"button","data-toggle":"modal","data-target":"#createModal"}},[s("i",{staticClass:"icon-plus-squared"}),t._v(t._s(t.$t("co_v"))+"\n            ")]),t._v(" "),s("button",{staticClass:"btn btn-sm btn-info float-right",attrs:{type:"button","data-toggle":"modal","data-target":"#dataSearch"}},[s("i",{staticClass:"icon-search"}),t._v(" "),s("span",{staticClass:"d-none d-sm-inline"},[t._v(t._s(t.$t("search")))])])]),t._v(" "),s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"table table-striped bg-white"},[s("thead",[s("tr",[t.co_mb_super_role?s("th",[t._v(t._s(t.$t("user_id")))]):t._e(),t._v(" "),t.co_mb_super_role?s("th",[t._v(t._s(t.$t("u_n")))]):t._e(),t._v(" "),t.co_mb_super_role?s("th",[t._v("Status")]):t._e(),t._v(" "),s("th",[t._v(t._s(t.$t("provider")))]),t._v(" "),s("th",[t._v(t._s(t.$t("number")))]),t._v(" "),s("th",[t._v(t._s(t.$t("amount")))]),t._v(" "),t.co_mb_agent_mer_role||t.co_mb_super_role?s("th",{attrs:{title:"Commission"}},[t._v(t._s(t.$t("com")))]):t._e(),t._v(" "),s("th",[t._v(t._s(t.$t("used_time")))]),t._v(" "),s("th",[t._v(t._s(t.$t("c_t")))])])]),t._v(" "),s("tbody",[t.preloader?s("tr",{staticStyle:{background:"none"}},[s("td",{attrs:{colspan:"5"}},[s("preloader")],1)]):t._e(),t._v(" "),t._l(t.co_mbs.data,function(e,a){return s("tr",[t.co_mb_super_role?s("td",[t._v(t._s(e.status?t.user(e.user):null))]):t._e(),t._v(" "),t.co_mb_super_role?s("td",[t._v(t._s(e.status?e.user.name:null))]):t._e(),t._v(" "),t.co_mb_super_role?s("td",[e.status?[s("span",{staticClass:"bg-success active-status"},[t._v("Success")])]:[s("span",{staticClass:"bg-danger active-status"},[t._v("Pending")])]],2):t._e(),t._v(" "),s("td",[t._v(t._s(e.service_id.provider.name))]),t._v(" "),s("td",[t._v(t._s(e.number))]),t._v(" "),s("td",[t._v(t._s(e.amount))]),t._v(" "),t.co_mb_agent_mer_role||t.co_mb_super_role?s("td",[t._v(t._s(e.user_com))]):t._e(),t._v(" "),s("td",[t._v(t._s(t._f("moment")(e.updated_at,"DD-MM-YYYY, h:mm a")))]),t._v(" "),s("td",[t._v(t._s(t._f("moment")(e.created_at,"DD-MM-YYYY, h:mm a")))])])}),t._v(" "),t.noData?[s("tr",{staticClass:"bg-white",domProps:{innerHTML:t._s(t.noData)}})]:t._e()],2),t._v(" "),s("tfoot",[s("tr",[t.co_mb_super_role?s("th",[t._v(t._s(t.$t("user_id")))]):t._e(),t._v(" "),t.co_mb_super_role?s("th",[t._v(t._s(t.$t("u_n")))]):t._e(),t._v(" "),t.co_mb_super_role?s("th",[t._v("Status")]):t._e(),t._v(" "),s("th",[t._v(t._s(t.$t("provider")))]),t._v(" "),s("th",[t._v(t._s(t.$t("number")))]),t._v(" "),s("th",[t._v(t._s(t.$t("amount")))]),t._v(" "),t.co_mb_agent_mer_role||t.co_mb_super_role?s("th",{attrs:{title:"Commission"}},[t._v(t._s(t.$t("com")))]):t._e(),t._v(" "),s("th",[t._v(t._s(t.$t("used_time")))]),t._v(" "),s("th",[t._v(t._s(t.$t("c_t")))])])])])]),t._v(" "),s("div",{staticClass:"table-actions"},[s("pagination-simple",{attrs:{data:t.co_mbs},on:{"pagination-change-page":t.getLists}}),t._v(" "),t.noData?t._e():s("div",{staticClass:"float-right amount-summery"},[s("span",{staticClass:"total-amount"},[t._v(t._s(t.$t("t_a"))+": "),s("b",[t._v(t._s(t.t_a))])]),t._v(" "),t.co_mb_agent_mer_role||t.co_mb_super_role?s("span",{staticClass:"total-commision d-inline-block"},[t._v(t._s(t.$t("t_com"))+": "),s("b",[t._v(t._s(t.total_user_com))])]):t._e()])],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])}]}},522:function(t,e,s){var a=s(16)(s(418),s(419),!1,null,null,null);t.exports=a.exports}});