webpackJsonp([58],{552:function(t,a){t.exports={props:{data:{type:Object,default:function(){return{current_page:1,data:[],from:1,last_page:1,next_page_url:null,per_page:10,prev_page_url:null,to:1,total:0}}},limit:{type:Number,default:0}},template:'<div class="pagination-content" v-if="data.total > data.per_page"><p class="showing-entries">Showing {{data.from}} to {{data.to}} out of {{data.total}} entries </p><ul class="pagination" >\t\t<li class="page-item pagination-prev-nav" v-if="data.prev_page_url">\t\t\t<a class="page-link" href="#" aria-label="Previous" @click.prevent="selectPage(--data.current_page)">\t\t\t\t<slot name="prev-nav">\t\t\t\t\t<span aria-hidden="true">&laquo;</span>\t\t\t\t\t<span class="sr-only">Previous</span>\t\t\t\t</slot>\t\t\t</a>\t\t</li>\t\t<li class="page-item pagination-page-nav" v-for="n in getPages()" :class="{ \'active\': n == data.current_page }">\t\t\t<a class="page-link" href="#" @click.prevent="selectPage(n)">{{ n }}</a>\t\t</li>\t\t<li class="page-item pagination-next-nav" v-if="data.next_page_url">\t\t\t<a class="page-link" href="#" aria-label="Next" @click.prevent="selectPage(++data.current_page)">\t\t\t\t<slot name="next-nav">\t\t\t\t\t<span aria-hidden="true">&raquo;</span>\t\t\t\t\t<span class="sr-only">Next</span>\t\t\t\t</slot>\t\t\t</a>\t\t</li>\t</ul></div>',mounted:function(){this.$root.popupModal()},updated:function(){this.$root.dropdownModal()},methods:{selectPage:function(t){var a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];"..."!==t&&this.$emit("pagination-change-page",t,a)},getPages:function(){if(-1===this.limit)return 0;if(0===this.limit)return this.data.last_page;for(var t,a=this.data.current_page,e=this.data.last_page,n=this.limit,i=a-n,s=a+n+1,l=[],p=[],r=1;r<=e;r++)(1==r||r==e||r>=i&&r<s)&&l.push(r);return l.forEach(function(a){t&&(a-t==2?p.push(t+1):a-t!=1&&p.push("...")),p.push(a),t=a}),p}}}}});