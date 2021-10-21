webpackJsonp([40],{285:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={components:{media:function(){return s.e(60).then(s.bind(null,244))},"date-time-picker":function(){return s.e(59).then(s.bind(null,240))}},data:function(){return{dateOptions:this.$store.state.dateOptions,formType:!1,provider:{status:1,name:"",slug:"",categories:[],prefix:"",min_number:"",max_number:"",logo_small:null,logo_small_src:null,logo_big:null,logo_big_src:null},providerConst:{status:1,name:"",slug:"",categories:[],prefix:"",min_number:"",max_number:"",logo_small:null,logo_small_src:null,logo_big:null,logo_big_src:null},providerSearch:{date_from:"",date_to:"",order_by:""},providers:{},providerCats:[],perPage:this.$route.query.per_page,perPageOptions:this.$store.state.perPageOptions,selected:[],selectAll:!1,noData:"",preloader:!0}},watch:{perPage:function(t){var e=this.$route.query.page;this.$router.push({path:document.location.search,query:{page:e,per_page:t}}),this.getLists()}},created:function(){this.getLists();var t=this.$route.query.per_page;this.perPageOptions.find(function(e){return e.value==t})||this.perPageOptions.splice(0,0,{text:t,value:t})},mounted:function(){this.$root.popupModal()},updated:function(){this.$root.dropdownModal()},methods:{afterComplete:function(t){this.getMediaLists()},logoSmallInsert:function(t){this.provider.logo_small=t.id,this.provider.logo_small_src="/uploads/imgs/"+t.resized_name},logoBigInsert:function(t){this.provider.logo_big=t.id,this.provider.logo_big_src="/uploads/imgs/"+t.resized_name},logoSmallRemove:function(t){this.provider.logo_small=null,this.provider.logo_small_src=null},logoBigRemove:function(t){this.provider.logo_big=null,this.provider.logo_big_src=null},select:function(){if(this.selected=[],!this.selectAll)for(var t in this.providers.data)this.selected.push(this.providers.data[t].id)},dataSearch:function(){var t=this.providerSearch,e={};for(var s in t.date_from=t.date_from?t.date_from.toString():"",t.date_to=t.date_to?t.date_to.toString():"",t)t[s]?e[s]=t[s]:this.$route.query[s]&&(e[s]="");this.$router.push({path:document.location.search,query:e}),this.getLists()},getLists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],s=this,a=this.$route.query.per_page,r=e?t:this.$route.query.page;e&&this.$router.push({path:document.location.search,query:{page:r,per_page:a}});var o=this.$route.query,i=Object.keys(o).map(function(t){return t+"="+o[t]}).join("&");axios.get("/api/v1/mt/providers?"+i).then(function(t){s.preloader=!1,s.providers=t.data.providers,s.providers.logo_small_src&&(s.providers.logo_small_src="/uploads/imgs/"+s.providers.logo_small_src.filename),s.providers.logo_big_src&&(s.providers.logo_big_src="/uploads/imgs/"+s.providers.logo_big_src.filename),s.providerCats=t.data.providercats,0==s.providers.data.length?s.noData=s.$store.state.noData:s.noData=""}).catch(function(t){s.$store.commit("errorMessages",t)})},newForm:function(){this.formType=!0,this.provider=this.providerConst},saveForm:function(){var t=this;document.getElementById("createModal").style.display="none";var e=this,s=e.provider;this.formType?axios.post("/api/v1/mt/providers",s).then(function(s){t.provider=t.providerConst,e.$store.commit("submitMsg","add"),e.getLists()}).catch(function(t){e.$store.commit("errorMessages",t)}):axios.patch("/api/v1/mt/providers/"+s.id,s).then(function(t){e.$store.commit("submitMsg","update"),e.getLists()}).catch(function(t){e.$store.commit("errorMessages",t)})},editForm:function(t){this.formType=!1,this.provider=t,t.logo_small_src&&(this.provider.logo_small_src="/uploads/imgs/"+t.logo_small_src.resized_name),t.logo_big_src&&(this.provider.logo_big_src="/uploads/imgs/"+t.logo_big_src.resized_name)},deleteEntry:function(t,e){var s=this;confirm(s.$store.state.confirmDel)&&axios.delete("/api/v1/mt/providers/"+t).then(function(t){s.providers.data.splice(e,1),s.$store.commit("submitMsg","delete")}).catch(function(t){s.$store.commit("errorMessages",t)})},deleteSelected:function(){var t=this;if(0!=t.selected.length){if(confirm(t.$store.state.confirmDel)){var e=this.selected.toString();axios.delete("/api/v1/mt/providers/"+e).then(function(e){t.$store.commit("submitMsg","selectedDelete"),t.selectAll=!1,t.selected=[],t.getLists()}).catch(function(e){t.$store.commit("errorMessages",e)})}}else t.$store.commit("noSelectedMsg")}}}},286:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"component"},[s("div",{staticClass:"component-heading clearfix"},[s("h2",{staticClass:"heading float-left"},[t._v("\n           Provider Lists\n        ")]),t._v(" "),s("back-forward")],1),t._v(" "),s("div",{staticClass:"component-body"},[s("media",{attrs:{id:"logoSmall"},on:{"select-image":t.logoSmallInsert}}),t._v(" "),s("media",{attrs:{id:"logoBig"},on:{"select-image":t.logoBigInsert}}),t._v(" "),s("div",{directives:[{name:"can",rawName:"v-can",value:"provider-create",expression:"'provider-create'"}],staticClass:"modal fade",attrs:{id:"createModal"}},[s("div",{staticClass:"modal-dialog modal-lg",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[s("div",{staticClass:"modal-header"},[s("h5",{staticClass:"modal-title"},[t._v("  "+t._s(t.formType?"New":"Update")+" Provider")]),t._v(" "),t._m(0)]),t._v(" "),s("form",{on:{submit:function(e){return e.preventDefault(),t.saveForm()}}},[s("div",{staticClass:"modal-body"},[s("div",{staticClass:"form-row"},[s("div",{staticClass:"col-md-12 mb-3"},[s("label",{attrs:{for:"status"}},[t._v("Status")]),t._v(" "),s("label",{staticClass:"switch"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.provider.status,expression:"provider.status"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.provider.status)?t._i(t.provider.status,null)>-1:t.provider.status},on:{change:function(e){var s=t.provider.status,a=e.target,r=!!a.checked;if(Array.isArray(s)){var o=t._i(s,null);a.checked?o<0&&t.$set(t.provider,"status",s.concat([null])):o>-1&&t.$set(t.provider,"status",s.slice(0,o).concat(s.slice(o+1)))}else t.$set(t.provider,"status",r)}}}),t._v(" "),s("span",{staticClass:"slider round"})])]),t._v(" "),s("div",{staticClass:"col-md-6 mb-3 outline-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.provider.name,expression:"provider.name"}],staticClass:"form-control outline",attrs:{placeholder:" ",type:"text",id:"name"},domProps:{value:t.provider.name},on:{input:function(e){e.target.composing||t.$set(t.provider,"name",e.target.value)}}}),t._v(" "),s("label",{attrs:{for:"name"}},[t._v("Name")])]),t._v(" "),s("div",{staticClass:"col-md-6 mb-3 outline-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.provider.slug,expression:"provider.slug"}],staticClass:"form-control outline",attrs:{placeholder:" ",type:"text",id:"slug"},domProps:{value:t.provider.slug},on:{input:function(e){e.target.composing||t.$set(t.provider,"slug",e.target.value)}}}),t._v(" "),s("label",{attrs:{for:"slug"}},[t._v("Slug")])]),t._v(" "),s("div",{staticClass:"col-md-12 mb-3"},[s("label",{staticClass:"o-s-l"},[t._v("Provider Category")]),t._v(" "),s("multiselect",{attrs:{options:t.providerCats,multiple:!0,"close-on-select":!1,"clear-on-select":!1,"hide-selected":!0,"preserve-search":!0,label:"name","track-by":"name","preselect-first":!0},scopedSlots:t._u([{key:"tag",fn:function(e){return[s("span",{staticClass:"custom__tag"},[s("span",[t._v(t._s(e.option.name))]),t._v(" "),s("span",{on:{click:function(t){return e.remove(e.option)}}},[t._v("x")])])]}}]),model:{value:t.provider.categories,callback:function(e){t.$set(t.provider,"categories",e)},expression:"provider.categories"}})],1),t._v(" "),s("div",{staticClass:"col-md-6 col-lg-4 mb-3 outline-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.provider.prefix,expression:"provider.prefix"}],staticClass:"form-control outline",attrs:{placeholder:" ",type:"text",id:"prefix"},domProps:{value:t.provider.prefix},on:{input:function(e){e.target.composing||t.$set(t.provider,"prefix",e.target.value)}}}),t._v(" "),s("label",{attrs:{for:"prefix"}},[t._v("Prefix (017:014, 016)")])]),t._v(" "),s("div",{staticClass:"col-md-6 col-lg-4 mb-3 outline-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.provider.min_number,expression:"provider.min_number"}],staticClass:"form-control outline",attrs:{placeholder:" ",type:"text",id:"min_number"},domProps:{value:t.provider.min_number},on:{input:function(e){e.target.composing||t.$set(t.provider,"min_number",e.target.value)}}}),t._v(" "),s("label",{attrs:{for:"min_number"}},[t._v("Minimum Number")])]),t._v(" "),s("div",{staticClass:"col-md-6 col-lg-4 mb-3 outline-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.provider.max_number,expression:"provider.max_number"}],staticClass:"form-control outline",attrs:{placeholder:" ",type:"text",id:"max_number"},domProps:{value:t.provider.max_number},on:{input:function(e){e.target.composing||t.$set(t.provider,"max_number",e.target.value)}}}),t._v(" "),s("label",{attrs:{for:"max_number"}},[t._v("Maximum Number")])]),t._v(" "),s("div",{staticClass:"col-md-6 col-lg-4 mb-3"},[t.provider.logo_small?s("div",[s("img",{staticClass:"upload-img rounded-circle sm-img",attrs:{src:t.provider.logo_small_src}}),t._v(" "),s("span",{staticClass:"btn btn-sm btn-danger sm-btn",on:{click:function(e){return t.logoSmallRemove()}}},[t._v("x")])]):s("div",[s("span",{staticClass:"btn btn-sm bg-success",attrs:{"data-toggle":"modal","data-target":"#logoSmall"}},[t._v("\n                                            Insert Small Logo\n                                        ")])])]),t._v(" "),s("div",{staticClass:"col-md-6 col-lg-4 mb-3 mb-90"},[t.provider.logo_big?s("div",[s("img",{staticClass:"upload-img rounded-circle",attrs:{src:t.provider.logo_big_src}}),t._v(" "),s("span",{staticClass:"btn btn-sm btn-danger h-i",on:{click:function(e){return t.logoBigRemove()}}},[t._v("x")])]):s("div",[s("span",{staticClass:"btn btn-sm bg-success",attrs:{"data-toggle":"modal","data-target":"#logoBig"}},[t._v("\n                                            Insert Big Logo\n                                        ")])])])])]),t._v(" "),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")]),t._v(" "),s("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("\n                            "+t._s(t.formType?"Create":"Update")+"\n                            ")])])])])])]),t._v(" "),s("div",{staticClass:"modal right fade",attrs:{id:"dataSearch"}},[s("div",{staticClass:"modal-dialog"},[s("div",{staticClass:"modal-content"},[t._m(1),t._v(" "),s("form",{on:{submit:function(e){return e.preventDefault(),t.dataSearch()}}},[s("div",{staticClass:"modal-body"},[s("div",{staticClass:"form-row"},[s("div",{staticClass:"col-12 mb-3"},[s("label",{staticClass:"o-s-l"},[t._v("Show")]),t._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:t.perPage,expression:"perPage"}],staticClass:"form-control",on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.perPage=e.target.multiple?s:s[0]}}},t._l(t.perPageOptions,function(e){return s("option",{domProps:{value:e.value}},[t._v("\n                                            "+t._s(e.text)+"\n                                        ")])}),0)]),t._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("date-time-picker",{attrs:{placeholder:"Date From"},model:{value:t.providerSearch.date_from,callback:function(e){t.$set(t.providerSearch,"date_from",e)},expression:"providerSearch.date_from"}})],1),t._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("date-time-picker",{attrs:{placeholder:"Date To"},scopedSlots:t._u([{key:"choose-date",fn:function(){return[t._v(t._s(t.$t("date_to")))]},proxy:!0}]),model:{value:t.providerSearch.date_to,callback:function(e){t.$set(t.providerSearch,"date_to",e)},expression:"providerSearch.date_to"}})],1),t._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("label",{staticClass:"o-s-l"},[t._v("Order By")]),t._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:t.providerSearch.order_by,expression:"providerSearch.order_by"}],staticClass:"form-control",attrs:{id:"search-order-by"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.providerSearch,"order_by",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:""}},[t._v("Newer First")]),t._v(" "),s("option",{attrs:{value:"1"}},[t._v("Newer Last")])])]),t._v(" "),t._m(2)])])])])])]),t._v(" "),s("div",{staticClass:"table-actions"},[s("button",{directives:[{name:"can",rawName:"v-can",value:"provider-create",expression:"'provider-create'"}],staticClass:"btn btn-sm bg-success",attrs:{type:"button","data-toggle":"modal","data-target":"#createModal"},on:{click:function(e){return t.newForm()}}},[s("i",{staticClass:"icon-plus-squared"}),t._v(" Provider\n            ")]),t._v(" "),t.selected.length?s("button",{staticClass:"btn btn-sm btn-danger ",on:{click:function(e){return t.deleteSelected()}}},[s("i",{staticClass:"icon-trash-empty"}),t._v(" Delete Selected")]):t._e(),t._v(" "),t._m(3)]),t._v(" "),s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"table table-striped bg-white"},[s("thead",[s("tr",[s("th",{staticStyle:{width:"20px"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.selectAll,expression:"selectAll"}],attrs:{type:"checkbox",id:"check-all"},domProps:{checked:Array.isArray(t.selectAll)?t._i(t.selectAll,null)>-1:t.selectAll},on:{click:t.select,change:function(e){var s=t.selectAll,a=e.target,r=!!a.checked;if(Array.isArray(s)){var o=t._i(s,null);a.checked?o<0&&(t.selectAll=s.concat([null])):o>-1&&(t.selectAll=s.slice(0,o).concat(s.slice(o+1)))}else t.selectAll=r}}})]),t._v(" "),t._m(4),t._v(" "),s("th",[t._v("Status")]),t._v(" "),s("th",[t._v("Category")]),t._v(" "),s("th",[t._v("Prefix")]),t._v(" "),s("th",{attrs:{title:"Min Number"}},[t._v("Min")]),t._v(" "),s("th",{attrs:{title:"Max Number"}},[t._v("Max")]),t._v(" "),s("th",[t._v("Actions")])])]),t._v(" "),s("tbody",[t.preloader?s("tr",{staticStyle:{background:"none"}},[s("td",{attrs:{colspan:"5"}},[s("preloader")],1)]):t._e(),t._v(" "),t._l(t.providers.data,function(e,a){return s("tr",[s("td",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.selected,expression:"selected"}],attrs:{type:"checkbox",id:"checkbox-id-"+e.id},domProps:{value:e.id,checked:Array.isArray(t.selected)?t._i(t.selected,e.id)>-1:t.selected},on:{change:function(s){var a=t.selected,r=s.target,o=!!r.checked;if(Array.isArray(a)){var i=e.id,l=t._i(a,i);r.checked?l<0&&(t.selected=a.concat([i])):l>-1&&(t.selected=a.slice(0,l).concat(a.slice(l+1)))}else t.selected=o}}})]),t._v(" "),s("td",[s("label",{attrs:{for:"checkbox-id-"+e.id}},[t._v(t._s(e.name))])]),t._v(" "),s("td",[e.status?[s("span",{staticClass:"bg-success active-status"},[t._v("Active")])]:[s("span",{staticClass:"bg-danger active-status"},[t._v("Inactive")])]],2),t._v(" "),s("td",{staticClass:"taxonomies"},[e.categories?t._l(e.categories,function(e){return s("span",[t._v(t._s(e.name))])}):t._e()],2),t._v(" "),s("td",[t._v(t._s(e.prefix))]),t._v(" "),s("td",[t._v(t._s(e.min_number))]),t._v(" "),s("td",[t._v(t._s(e.max_number))]),t._v(" "),s("td",[s("div",{staticClass:"dropdown action-items"},[t._m(5,!0),t._v(" "),s("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"actionItemButtons"}},[s("a",{directives:[{name:"can",rawName:"v-can",value:"provider-edit",expression:"'provider-edit'"}],staticClass:"dropdown-item",attrs:{href:"#","data-toggle":"modal","data-target":"#createModal"},on:{click:function(s){return s.preventDefault(),t.editForm(e)}}},[t._v("\n                                   Edit \n                                ")]),t._v(" "),s("a",{directives:[{name:"can",rawName:"v-can",value:"provider-delete",expression:"'provider-delete'"}],staticClass:"dropdown-item",attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.deleteEntry(e.id,a)}}},[t._v("\n                                    Delete\n                                ")])])])])])}),t._v(" "),t.noData?[s("tr",{staticClass:"bg-white",domProps:{innerHTML:t._s(t.noData)}})]:t._e()],2),t._v(" "),s("tfoot",[s("tr",[s("th",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.selectAll,expression:"selectAll"}],attrs:{type:"checkbox",id:"check-all-bottom"},domProps:{checked:Array.isArray(t.selectAll)?t._i(t.selectAll,null)>-1:t.selectAll},on:{click:t.select,change:function(e){var s=t.selectAll,a=e.target,r=!!a.checked;if(Array.isArray(s)){var o=t._i(s,null);a.checked?o<0&&(t.selectAll=s.concat([null])):o>-1&&(t.selectAll=s.slice(0,o).concat(s.slice(o+1)))}else t.selectAll=r}}})]),t._v(" "),t._m(6),t._v(" "),s("th",[t._v("Status")]),t._v(" "),s("th",[t._v("Category")]),t._v(" "),s("th",[t._v("Prefix")]),t._v(" "),s("th",{attrs:{title:"Min Number"}},[t._v("Min")]),t._v(" "),s("th",{attrs:{title:"Max Number"}},[t._v("Max")]),t._v(" "),s("th",[t._v("Actions")])])])])]),t._v(" "),s("div",{staticClass:"table-actions"},[s("pagination",{attrs:{data:t.providers,limit:2},on:{"pagination-change-page":t.getLists}})],1)],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h5",{staticClass:"modal-title"},[this._v("Search")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"col-12 mb-3"},[e("button",{staticClass:"btn btn-primary btn-sm",attrs:{type:"submit"}},[this._v("Search")]),this._v(" "),e("button",{staticClass:"btn btn-dark float-right btn-sm",attrs:{type:"reset"}},[this._v("Reset")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-sm btn-info float-right",attrs:{type:"button","data-toggle":"modal","data-target":"#dataSearch"}},[e("i",{staticClass:"icon-search"}),this._v(" "),e("span",{staticClass:"d-none d-sm-inline"},[this._v("Search")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("label",{attrs:{for:"check-all"}},[this._v("Name")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-default btn-sm dropdown-toggle",attrs:{type:"button",id:"actionItemButtons","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[e("i",{staticClass:"icon-ellipsis"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("label",{attrs:{for:"check-all-bottom"}},[this._v("Name")])])}]}},510:function(t,e,s){var a=s(16)(s(285),s(286),!1,null,null,null);t.exports=a.exports}});