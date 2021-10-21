webpackJsonp([30],{270:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={components:{"date-time-picker":function(){return s.e(59).then(s.bind(null,240))}},data:function(){return{dateOptions:this.$store.state.dateOptions,permission:{name:"",guard_name:"",parent_id:null,group:!1},permissionUpdate:{name:"",guard_name:"",parent_id:null},perSearch:{name:"",date_from:"",date_to:"",order_by:""},permissions:{},allPermissions:[],perPage:this.$route.query.per_page,perPageOptions:this.$store.state.perPageOptions,selected:[],selectAll:!1,noData:"",preloader:!0}},watch:{perPage:function(e){var t=this.$route.query.page;this.$router.push({path:document.location.search,query:{page:t,per_page:e}}),this.getLists()}},created:function(){this.getLists();var e=this.$route.query.per_page;this.perPageOptions.find(function(t){return t.value==e})||this.perPageOptions.splice(0,0,{text:e,value:e})},mounted:function(){this.$root.popupModal()},updated:function(){this.$root.dropdownModal()},methods:{dash_icon:function(e){return"<i class='sub-permission icon-minus'></i>".repeat(e)},select:function(){if(this.selected=[],!this.selectAll)for(var e in this.permissions.data)this.selected.push(this.permissions.data[e].id)},dataSearch:function(){var e=this.perSearch,t={};for(var s in e.date_from=e.date_from?e.date_from.toString():"",e.date_to=e.date_to?e.date_to.toString():"",e)e[s]?t[s]=e[s]:this.$route.query[s]&&(t[s]="");this.$router.push({path:document.location.search,query:t}),this.getLists()},getLists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],s=this,a=this.$route.query.per_page,i=t?e:this.$route.query.page;t&&this.$router.push({path:document.location.search,query:{page:i,per_page:a}});var r=this.$route.query,n=Object.keys(r).map(function(e){return e+"="+r[e]}).join("&");axios.get("/api/v1/permissions?"+n).then(function(e){s.preloader=!1,s.permissions=e.data,s.allPermissions=e.data.data_all,0==s.permissions.data.length?s.noData=s.$store.state.noData:s.noData=""}).catch(function(e){s.$store.commit("errorMessages",e)})},saveForm:function(){document.getElementById("createModal").style.display="none";var e=this,t=e.permission;axios.post("/api/v1/permissions",t).then(function(t){e.$store.commit("nullForm",e.permission),e.$store.commit("submitMsg","add"),e.getLists()}).catch(function(t){e.$store.commit("errorMessages",t)})},editForm:function(e){var t=this;this.permissionUpdate.parent_id=null;var s=function(s){if("parent_id"!==s)t.permissionUpdate[s]=e[s];else{var a=t.allPermissions.find(function(t){return t.id===e[s]});t.permissionUpdate.parent_id=a}};for(var a in e)s(a)},updateForm:function(){document.getElementById("updateModal").classList.toggle("show");var e=this,t=e.permissionUpdate;axios.patch("/api/v1/permissions/"+t.id,t).then(function(t){e.$store.commit("submitMsg","update"),e.getLists()}).catch(function(t){e.$store.commit("errorMessages",t)})},deleteEntry:function(e,t){var s=this;confirm(s.$store.state.confirmDel)&&axios.delete("/api/v1/permissions/"+e).then(function(e){s.permissions.data.splice(t,1),s.$store.commit("submitMsg","delete")}).catch(function(e){s.$store.commit("errorMessages",e)})},deleteSelected:function(){var e=this;if(0!=e.selected.length){if(confirm(e.$store.state.confirmDel)){var t=this.selected.toString();axios.delete("/api/v1/permissions/"+t).then(function(t){e.$store.commit("submitMsg","selectedDelete"),e.selectAll=!1,e.selected=[],e.getLists()}).catch(function(t){e.$store.commit("errorMessages",t)})}}else e.$store.commit("noSeletedMsg")}}}},271:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"component"},[s("div",{staticClass:"component-heading clearfix"},[s("h2",{staticClass:"heading float-left"},[e._v("\n           Permission Lists\n        ")]),e._v(" "),s("back-forward")],1),e._v(" "),s("div",{staticClass:"component-body"},[s("div",{directives:[{name:"can",rawName:"v-can",value:"user-permission-create",expression:"'user-permission-create'"}],staticClass:"modal fade",attrs:{id:"createModal"}},[s("div",{staticClass:"modal-dialog"},[s("div",{staticClass:"modal-content"},[e._m(0),e._v(" "),s("form",{on:{submit:function(t){return t.preventDefault(),e.saveForm()}}},[s("div",{staticClass:"modal-body"},[s("div",{staticClass:"form-row"},[s("div",{staticClass:"col-12 mb-3 outline-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.permission.name,expression:"permission.name"}],staticClass:"form-control outline",attrs:{placeholder:" ",type:"text",id:"Name"},domProps:{value:e.permission.name},on:{input:function(t){t.target.composing||e.$set(e.permission,"name",t.target.value)}}}),e._v(" "),s("label",{attrs:{for:"Name"}},[e._v("Name")])]),e._v(" "),s("div",{staticClass:"col-12 mb-3 outline-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.permission.guard_name,expression:"permission.guard_name"}],staticClass:"form-control outline",attrs:{placeholder:" ",type:"text",id:"guard_name"},domProps:{value:e.permission.guard_name},on:{input:function(t){t.target.composing||e.$set(e.permission,"guard_name",t.target.value)}}}),e._v(" "),s("label",{attrs:{for:"guard_name"}},[e._v("Guard Name")])]),e._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("label",{attrs:{for:"group"}},[e._v("Create group by name")]),e._v(" "),s("label",{staticClass:"switch"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.permission.group,expression:"permission.group"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.permission.group)?e._i(e.permission.group,null)>-1:e.permission.group},on:{change:function(t){var s=e.permission.group,a=t.target,i=!!a.checked;if(Array.isArray(s)){var r=e._i(s,null);a.checked?r<0&&e.$set(e.permission,"group",s.concat([null])):r>-1&&e.$set(e.permission,"group",s.slice(0,r).concat(s.slice(r+1)))}else e.$set(e.permission,"group",i)}}}),e._v(" "),s("span",{staticClass:"slider round"})])]),e._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("label",{staticClass:"o-s-l",attrs:{for:"guard_name"}},[e._v("Select Permission")]),e._v(" "),s("multiselect",{attrs:{options:e.allPermissions,"preserve-search":!0,selectLabel:"",deselectLabel:"",label:"name","track-by":"name","preselect-first":!0},scopedSlots:e._u([{key:"tag",fn:function(t){return[s("span",[e._v(e._s(t.option.name))]),e._v(" "),s("span",{on:{click:function(e){return t.remove(t.option)}}},[e._v("x")])]}}]),model:{value:e.permission.parent_id,callback:function(t){e.$set(e.permission,"parent_id",t)},expression:"permission.parent_id"}})],1)])]),e._v(" "),e._m(1)])])])]),e._v(" "),s("div",{directives:[{name:"can",rawName:"v-can",value:"user-permission-edit",expression:"'user-permission-edit'"}],staticClass:"modal fade",attrs:{id:"updateModal"}},[s("div",{staticClass:"modal-dialog"},[s("div",{staticClass:"modal-content"},[e._m(2),e._v(" "),s("form",{on:{submit:function(t){return t.preventDefault(),e.updateForm()}}},[s("div",{staticClass:"modal-body"},[s("div",{staticClass:"form-row"},[s("div",{staticClass:"col-12 mb-3"},[s("label",{attrs:{for:"edit-name"}},[e._v("Name")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.permissionUpdate.name,expression:"permissionUpdate.name"}],staticClass:"form-control",attrs:{type:"text",id:"edit-name",required:""},domProps:{value:e.permissionUpdate.name},on:{input:function(t){t.target.composing||e.$set(e.permissionUpdate,"name",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("label",{attrs:{for:"edit-guard_name"}},[e._v("Guard Name")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.permissionUpdate.guard_name,expression:"permissionUpdate.guard_name"}],staticClass:"form-control",attrs:{type:"text",id:"edit-guard_name",required:""},domProps:{value:e.permissionUpdate.guard_name},on:{input:function(t){t.target.composing||e.$set(e.permissionUpdate,"guard_name",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("label",{attrs:{for:"edit-parent_id"}},[e._v("Parent Permission")]),e._v(" "),s("multiselect",{attrs:{options:e.allPermissions,"preserve-search":!0,placeholder:"Select Permission",selectLabel:"",deselectLabel:"",label:"name","track-by":"name","preselect-first":!0},scopedSlots:e._u([{key:"tag",fn:function(t){return[s("span",{staticClass:"custom__tag"},[s("span",[e._v(e._s(t.option.name))]),e._v(" "),s("span",{on:{click:function(e){return t.remove(t.option)}}},[e._v("x")])])]}}]),model:{value:e.permissionUpdate.parent_id,callback:function(t){e.$set(e.permissionUpdate,"parent_id",t)},expression:"permissionUpdate.parent_id"}})],1)])]),e._v(" "),e._m(3)])])])]),e._v(" "),s("div",{staticClass:"modal right fade",attrs:{id:"dataSearch"}},[s("div",{staticClass:"modal-dialog"},[s("div",{staticClass:"modal-content"},[e._m(4),e._v(" "),s("form",{on:{submit:function(t){return t.preventDefault(),e.dataSearch()}}},[s("div",{staticClass:"modal-body"},[s("div",{staticClass:"form-row"},[s("div",{staticClass:"col-12 mb-3"},[s("label",{staticClass:"o-s-l"},[e._v("Show")]),e._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:e.perPage,expression:"perPage"}],staticClass:"form-control",on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.perPage=t.target.multiple?s:s[0]}}},e._l(e.perPageOptions,function(t){return s("option",{domProps:{value:t.value}},[e._v("\n                                            "+e._s(t.text)+"\n                                        ")])}),0)]),e._v(" "),s("div",{staticClass:"col-12 mb-3 outline-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.perSearch.name,expression:"perSearch.name"}],staticClass:"form-control outline",attrs:{placeholder:" ",type:"text",id:"search-name"},domProps:{value:e.perSearch.name},on:{input:function(t){t.target.composing||e.$set(e.perSearch,"name",t.target.value)}}}),e._v(" "),s("label",{attrs:{for:"search-name"}},[e._v("Name")])]),e._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("date-time-picker",{attrs:{placeholder:"Date From"},model:{value:e.perSearch.date_from,callback:function(t){e.$set(e.perSearch,"date_from",t)},expression:"perSearch.date_from"}})],1),e._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("date-time-picker",{attrs:{placeholder:"Date To"},scopedSlots:e._u([{key:"choose-date",fn:function(){return[e._v(e._s(e.$t("date_to")))]},proxy:!0}]),model:{value:e.perSearch.date_to,callback:function(t){e.$set(e.perSearch,"date_to",t)},expression:"perSearch.date_to"}})],1),e._v(" "),s("div",{staticClass:"col-12 mb-3"},[s("label",{staticClass:"o-s-l"},[e._v("Order By")]),e._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:e.perSearch.order_by,expression:"perSearch.order_by"}],staticClass:"form-control",attrs:{id:"search-order-by"},on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.perSearch,"order_by",t.target.multiple?s:s[0])}}},[s("option",{attrs:{value:""}},[e._v("Newer First")]),e._v(" "),s("option",{attrs:{value:"1"}},[e._v("Newer Last")])])]),e._v(" "),e._m(5)])])])])])]),e._v(" "),s("div",{staticClass:"table-actions"},[s("button",{directives:[{name:"can",rawName:"v-can",value:"user-permission-create",expression:"'user-permission-create'"}],staticClass:"btn btn-sm bg-success",attrs:{type:"button","data-toggle":"modal","data-target":"#createModal"}},[s("i",{staticClass:"icon-plus-squared"}),e._v(" Permission\n            ")]),e._v(" "),e.selected.length?s("button",{directives:[{name:"can",rawName:"v-can",value:"user-permission-delete",expression:"'user-permission-delete'"}],staticClass:"btn btn-sm btn-danger ",on:{click:function(t){return e.deleteSelected()}}},[s("i",{staticClass:"icon-trash-empty"}),e._v(" Delete Selected")]):e._e(),e._v(" "),e._m(6)]),e._v(" "),s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"table table-striped bg-white"},[s("thead",[s("tr",[s("th",{staticStyle:{width:"20px"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.selectAll,expression:"selectAll"}],attrs:{type:"checkbox",id:"check-all"},domProps:{checked:Array.isArray(e.selectAll)?e._i(e.selectAll,null)>-1:e.selectAll},on:{click:e.select,change:function(t){var s=e.selectAll,a=t.target,i=!!a.checked;if(Array.isArray(s)){var r=e._i(s,null);a.checked?r<0&&(e.selectAll=s.concat([null])):r>-1&&(e.selectAll=s.slice(0,r).concat(s.slice(r+1)))}else e.selectAll=i}}})]),e._v(" "),e._m(7),e._v(" "),s("th",[e._v("Guard Name")]),e._v(" "),s("th",[e._v("Actions")])])]),e._v(" "),s("tbody",[e.preloader?s("tr",{staticStyle:{background:"none"}},[s("td",{attrs:{colspan:"5"}},[s("preloader")],1)]):e._e(),e._v(" "),e._l(e.permissions.data,function(t,a){return s("tr",[s("td",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.selected,expression:"selected"}],attrs:{type:"checkbox",id:"checkbox-id-"+t.id},domProps:{value:t.id,checked:Array.isArray(e.selected)?e._i(e.selected,t.id)>-1:e.selected},on:{change:function(s){var a=e.selected,i=s.target,r=!!i.checked;if(Array.isArray(a)){var n=t.id,o=e._i(a,n);i.checked?o<0&&(e.selected=a.concat([n])):o>-1&&(e.selected=a.slice(0,o).concat(a.slice(o+1)))}else e.selected=r}}})]),e._v(" "),s("td",[s("label",{attrs:{for:"checkbox-id-"+t.id}},[s("span",{domProps:{innerHTML:e._s(e.dash_icon(t.depth))}}),e._v(" "+e._s(t.name))])]),e._v(" "),s("td",[e._v(e._s(t.guard_name))]),e._v(" "),s("td",[s("div",{staticClass:"dropdown action-items"},[e._m(8,!0),e._v(" "),s("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"actionItemButtons"}},[s("a",{directives:[{name:"can",rawName:"v-can",value:"user-permission-edit",expression:"'user-permission-edit'"}],staticClass:"dropdown-item",attrs:{href:"#","data-toggle":"modal","data-target":"#updateModal"},on:{click:function(s){return s.preventDefault(),e.editForm(t)}}},[e._v("\n                                       Edit \n                                    ")]),e._v(" "),s("a",{directives:[{name:"can",rawName:"v-can",value:"user-permission-delete",expression:"'user-permission-delete'"}],staticClass:"dropdown-item",attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),e.deleteEntry(t.id,a)}}},[e._v("\n                                        Delete\n                                    ")])])])])])}),e._v(" "),e.noData?[s("tr",{staticClass:"bg-white",domProps:{innerHTML:e._s(e.noData)}})]:e._e()],2),e._v(" "),s("tfoot",[s("tr",[s("th",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.selectAll,expression:"selectAll"}],attrs:{type:"checkbox",id:"check-all-bottom"},domProps:{checked:Array.isArray(e.selectAll)?e._i(e.selectAll,null)>-1:e.selectAll},on:{click:e.select,change:function(t){var s=e.selectAll,a=t.target,i=!!a.checked;if(Array.isArray(s)){var r=e._i(s,null);a.checked?r<0&&(e.selectAll=s.concat([null])):r>-1&&(e.selectAll=s.slice(0,r).concat(s.slice(r+1)))}else e.selectAll=i}}})]),e._v(" "),e._m(9),e._v(" "),s("th",[e._v("Guard Name")]),e._v(" "),s("th",[e._v("Actions")])])])])]),e._v(" "),s("div",{staticClass:"table-actions"},[s("pagination",{attrs:{data:e.permissions,limit:2},on:{"pagination-change-page":e.getLists}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"modal-header"},[t("h5",{staticClass:"modal-title"},[this._v("New Permission")]),this._v(" "),t("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[t("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"modal-footer"},[t("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[this._v("Close")]),this._v(" "),t("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[this._v("Create")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"modal-header"},[t("h5",{staticClass:"modal-title"},[this._v("Update Permission")]),this._v(" "),t("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[t("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"modal-footer"},[t("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[this._v("Close")]),this._v(" "),t("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[this._v("Update")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"modal-header"},[t("h5",{staticClass:"modal-title"},[this._v("Search")]),this._v(" "),t("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[t("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col-12 mb-3"},[t("button",{staticClass:"btn btn-primary btn-sm",attrs:{type:"submit"}},[this._v("Search")]),this._v(" "),t("button",{staticClass:"btn btn-dark float-right btn-sm",attrs:{type:"reset"}},[this._v("Reset")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("button",{staticClass:"btn btn-sm btn-info float-right",attrs:{type:"button","data-toggle":"modal","data-target":"#dataSearch"}},[t("i",{staticClass:"icon-search"}),this._v(" "),t("span",{staticClass:"d-none d-sm-inline"},[this._v("Search")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("th",[t("label",{attrs:{for:"check-all"}},[this._v("Name")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("button",{staticClass:"btn btn-default btn-sm dropdown-toggle",attrs:{type:"button",id:"actionItemButtons","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[t("i",{staticClass:"icon-ellipsis"})])},function(){var e=this.$createElement,t=this._self._c||e;return t("th",[t("label",{attrs:{for:"check-all-bottom"}},[this._v("Name")])])}]}},504:function(e,t,s){var a=s(16)(s(270),s(271),!1,null,null,null);e.exports=a.exports}});