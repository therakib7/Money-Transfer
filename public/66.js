webpackJsonp([66],{

<<<<<<< HEAD
/***/ 295:
=======
/***/ 299:
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
				select_category: 'Select Category',
				mobile_number: 'Mobile Number',
				trx_id: 'Trx ID',
				all: 'All',
				total_amount: 'Total Amount',
				total_commission: 'Total Commission',
				search_user_help: 'Search by mobile, email or username',
				next: 'Next',
				previous: 'Previous',
				modify_status: 'Modify Status',
				delete_selected: 'Delete Selected',
				edit_schedule: 'Edit Schedule',
				schedule_time: 'Schedule Time',
				//modal-content 
				no: 'No:',
				note: 'Note',
				pin: 'Pin',
				close: 'Close',
				create: 'Create',

				delete: 'Delete',
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
				previous: 'পূর্ববর্তী',
				modify_status: 'অবস্থা সংশোধন করুন',
				delete_selected: 'নির্বাচিত তথ্য মুছে ফেলুন',
				edit_schedule: 'সময় সম্পাদনা করুন',
				schedule_time: 'সময় নির্ধারন করুন',

				//modal-content 
				no: 'নং:',
				note: 'নোট',
				pin: 'পিন',
				close: 'বন্ধ',
				create: 'তৈরী করুন',

				delete: 'মুছে ফেলুন',
				edit: 'সম্পাদন',
				view: 'দেখুন',
				update: 'পরিবর্তন',
				cancelled: 'বাতিল করা হয়েছে',
				waiting: 'অপেক্ষমান',
				//hover text
				show_pin: 'পিন দেখুন',
				refresh_list: 'তালিকা পুনঃ লোড করুন',
				click_here_go_back: 'পিচনে যাও',
				click_here_go_forward: 'সামনে যাও',
				to_type_number: 'নাম্বার টাইপ করতে'
		}
});

/***/ }),

/***/ 302:
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(549)
}
var normalizeComponent = __webpack_require__(15)
/* script */
<<<<<<< HEAD
var __vue_script__ = __webpack_require__(551)
/* template */
var __vue_template__ = __webpack_require__(552)
=======
var __vue_script__ = __webpack_require__(321)
/* template */
var __vue_template__ = __webpack_require__(322)
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-17d8bdd0"
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
<<<<<<< HEAD
Component.options.__file = "resources\\assets\\js\\admin\\views\\layout\\sidebar-nav\\index.vue"
=======
Component.options.__file = "resources\\assets\\js\\admin\\components\\media\\index.vue"
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
<<<<<<< HEAD
    hotAPI.createRecord("data-v-17d8bdd0", Component.options)
  } else {
    hotAPI.reload("data-v-17d8bdd0", Component.options)
=======
    hotAPI.createRecord("data-v-d913e080", Component.options)
  } else {
    hotAPI.reload("data-v-d913e080", Component.options)
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

<<<<<<< HEAD
/***/ 301:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(302)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}
=======
/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):e.vue2Dropzone=t()}(this,function(){"use strict";var n={getSignedURL:function(o,s){var a={filePath:o.name,contentType:o.type};return new Promise(function(e,t){var n=new FormData,r=new XMLHttpRequest,i="function"==typeof s.signingURL?s.signingURL(o):s.signingURL;r.open("POST",i),r.onload=function(){200==r.status?e(JSON.parse(r.response)):t(r.statusText)},r.onerror=function(e){console.error("Network Error : Could not send request to AWS (Maybe CORS errors)"),t(e)},Object.entries(s.headers||{}).forEach(function(e){var t=e[0],i=e[1];r.setRequestHeader(t,i)}),a=Object.assign(a,s.params||{}),Object.entries(a).forEach(function(e){var t=e[0],i=e[1];n.append(t,i)}),r.send(n)})},sendFile:function(t,e,i){var n=i?this.setResponseHandler:this.sendS3Handler;return this.getSignedURL(t,e).then(function(e){return n(e,t)}).catch(function(e){return e})},setResponseHandler:function(e,t){t.s3Signature=e.signature,t.s3Url=e.postEndpoint},sendS3Handler:function(e,t){var o=new FormData,i=e.signature;return Object.keys(i).forEach(function(e){o.append(e,i[e])}),o.append("file",t),new Promise(function(i,n){var r=new XMLHttpRequest;r.open("POST",e.postEndpoint),r.onload=function(){if(201==r.status){var e=(new window.DOMParser).parseFromString(r.response,"text/xml").firstChild.children[0].innerHTML;i({success:!0,message:e})}else{var t=(new window.DOMParser).parseFromString(r.response,"text/xml").firstChild.children[0].innerHTML;n({success:!1,message:t+". Request is marked as resolved when returns as status 201"})}},r.onerror=function(e){var t=(new window.DOMParser).parseFromString(r.response,"text/xml").firstChild.children[1].innerHTML;n({success:!1,message:t})},r.send(o)})}};var e,t=(function(e){var t=function(){function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}();function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(){l(this,e)}return t(e,[{key:"on",value:function(e,t){return this._callbacks=this._callbacks||{},this._callbacks[e]||(this._callbacks[e]=[]),this._callbacks[e].push(t),this}},{key:"emit",value:function(e){this._callbacks=this._callbacks||{};var t=this._callbacks[e];if(t){for(var i=arguments.length,n=Array(1<i?i-1:0),r=1;r<i;r++)n[r-1]=arguments[r];for(var o=0,s=s=t;;){if(o>=s.length)break;s[o++].apply(this,n)}}return this}},{key:"off",value:function(e,t){if(!this._callbacks||0===arguments.length)return this._callbacks={},this;var i=this._callbacks[e];if(!i)return this;if(1===arguments.length)return delete this._callbacks[e],this;for(var n=0;n<i.length;n++){if(i[n]===t){i.splice(n,1);break}}return this}}]),e}(),r=function(e){function b(e,t){l(this,b);var i,n=a(this,(b.__proto__||Object.getPrototypeOf(b)).call(this)),r=void 0;if(n.element=e,n.version=b.version,n.defaultOptions.previewTemplate=n.defaultOptions.previewTemplate.replace(/\n*/g,""),n.clickableElements=[],n.listeners=[],n.files=[],"string"==typeof n.element&&(n.element=document.querySelector(n.element)),!n.element||null==n.element.nodeType)throw new Error("Invalid dropzone element.");if(n.element.dropzone)throw new Error("Dropzone already attached.");b.instances.push(n),n.element.dropzone=n;var o,s=null!=(i=b.optionsForElement(n.element))?i:{};if(n.options=b.extend({},n.defaultOptions,s,null!=t?t:{}),n.options.forceFallback||!b.isBrowserSupported())return o=n.options.fallback.call(n),a(n,o);if(null==n.options.url&&(n.options.url=n.element.getAttribute("action")),!n.options.url)throw new Error("No URL provided.");if(n.options.acceptedFiles&&n.options.acceptedMimeTypes)throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");if(n.options.uploadMultiple&&n.options.chunking)throw new Error("You cannot set both: uploadMultiple and chunking.");return n.options.acceptedMimeTypes&&(n.options.acceptedFiles=n.options.acceptedMimeTypes,delete n.options.acceptedMimeTypes),null!=n.options.renameFilename&&(n.options.renameFile=function(e){return n.options.renameFilename.call(n,e.name,e)}),n.options.method=n.options.method.toUpperCase(),(r=n.getExistingFallback())&&r.parentNode&&r.parentNode.removeChild(r),!1!==n.options.previewsContainer&&(n.options.previewsContainer?n.previewsContainer=b.getElement(n.options.previewsContainer,"previewsContainer"):n.previewsContainer=n.element),n.options.clickable&&(!0===n.options.clickable?n.clickableElements=[n.element]:n.clickableElements=b.getElements(n.options.clickable,"clickable")),n.init(),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(b,i),t(b,null,[{key:"initClass",value:function(){this.prototype.Emitter=i,this.prototype.events=["drop","dragstart","dragend","dragenter","dragover","dragleave","addedfile","addedfiles","removedfile","thumbnail","error","errormultiple","processing","processingmultiple","uploadprogress","totaluploadprogress","sending","sendingmultiple","success","successmultiple","canceled","canceledmultiple","complete","completemultiple","reset","maxfilesexceeded","maxfilesreached","queuecomplete"],this.prototype.defaultOptions={url:null,method:"post",withCredentials:!1,timeout:3e4,parallelUploads:2,uploadMultiple:!1,chunking:!1,forceChunking:!1,chunkSize:2e6,parallelChunkUploads:!1,retryChunks:!1,retryChunksLimit:3,maxFilesize:256,paramName:"file",createImageThumbnails:!0,maxThumbnailFilesize:10,thumbnailWidth:120,thumbnailHeight:120,thumbnailMethod:"crop",resizeWidth:null,resizeHeight:null,resizeMimeType:null,resizeQuality:.8,resizeMethod:"contain",filesizeBase:1e3,maxFiles:null,headers:null,clickable:!0,ignoreHiddenFiles:!0,acceptedFiles:null,acceptedMimeTypes:null,autoProcessQueue:!0,autoQueue:!0,addRemoveLinks:!1,previewsContainer:null,hiddenInputContainer:"body",capture:null,renameFilename:null,renameFile:null,forceFallback:!1,dictDefaultMessage:"Drop files here to upload",dictFallbackMessage:"Your browser does not support drag'n'drop file uploads.",dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",dictFileTooBig:"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",dictInvalidFileType:"You can't upload files of this type.",dictResponseError:"Server responded with {{statusCode}} code.",dictCancelUpload:"Cancel upload",dictUploadCanceled:"Upload canceled.",dictCancelUploadConfirmation:"Are you sure you want to cancel this upload?",dictRemoveFile:"Remove file",dictRemoveFileConfirmation:null,dictMaxFilesExceeded:"You can not upload any more files.",dictFileSizeUnits:{tb:"TB",gb:"GB",mb:"MB",kb:"KB",b:"b"},init:function(){},params:function(e,t,i){if(i)return{dzuuid:i.file.upload.uuid,dzchunkindex:i.index,dztotalfilesize:i.file.size,dzchunksize:this.options.chunkSize,dztotalchunkcount:i.file.upload.totalChunkCount,dzchunkbyteoffset:i.index*this.options.chunkSize}},accept:function(e,t){return t()},chunksUploaded:function(e,t){t()},fallback:function(){var e=void 0;this.element.className=this.element.className+" dz-browser-not-supported";for(var t=0,i=i=this.element.getElementsByTagName("div");;){if(t>=i.length)break;var n=i[t++];if(/(^| )dz-message($| )/.test(n.className)){(e=n).className="dz-message";break}}e||(e=b.createElement('<div class="dz-message"><span></span></div>'),this.element.appendChild(e));var r=e.getElementsByTagName("span")[0];return r&&(null!=r.textContent?r.textContent=this.options.dictFallbackMessage:null!=r.innerText&&(r.innerText=this.options.dictFallbackMessage)),this.element.appendChild(this.getFallbackForm())},resize:function(e,t,i,n){var r={srcX:0,srcY:0,srcWidth:e.width,srcHeight:e.height},o=e.width/e.height;null==t&&null==i?(t=r.srcWidth,i=r.srcHeight):null==t?t=i*o:null==i&&(i=t/o);var s=(t=Math.min(t,r.srcWidth))/(i=Math.min(i,r.srcHeight));if(r.srcWidth>t||r.srcHeight>i)if("crop"===n)s<o?(r.srcHeight=e.height,r.srcWidth=r.srcHeight*s):(r.srcWidth=e.width,r.srcHeight=r.srcWidth/s);else{if("contain"!==n)throw new Error("Unknown resizeMethod '"+n+"'");s<o?i=t/o:t=i*o}return r.srcX=(e.width-r.srcWidth)/2,r.srcY=(e.height-r.srcHeight)/2,r.trgWidth=t,r.trgHeight=i,r},transformFile:function(e,t){return(this.options.resizeWidth||this.options.resizeHeight)&&e.type.match(/image.*/)?this.resizeImage(e,this.options.resizeWidth,this.options.resizeHeight,this.options.resizeMethod,t):t(e)},previewTemplate:'<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>',drop:function(e){return this.element.classList.remove("dz-drag-hover")},dragstart:function(e){},dragend:function(e){return this.element.classList.remove("dz-drag-hover")},dragenter:function(e){return this.element.classList.add("dz-drag-hover")},dragover:function(e){return this.element.classList.add("dz-drag-hover")},dragleave:function(e){return this.element.classList.remove("dz-drag-hover")},paste:function(e){},reset:function(){return this.element.classList.remove("dz-started")},addedfile:function(t){var i=this;if(this.element===this.previewsContainer&&this.element.classList.add("dz-started"),this.previewsContainer){t.previewElement=b.createElement(this.options.previewTemplate.trim()),t.previewTemplate=t.previewElement,this.previewsContainer.appendChild(t.previewElement);for(var e=0,n=n=t.previewElement.querySelectorAll("[data-dz-name]");;){if(e>=n.length)break;var r=n[e++];r.textContent=t.name}for(var o=0,s=s=t.previewElement.querySelectorAll("[data-dz-size]");!(o>=s.length);)(r=s[o++]).innerHTML=this.filesize(t.size);this.options.addRemoveLinks&&(t._removeLink=b.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>'+this.options.dictRemoveFile+"</a>"),t.previewElement.appendChild(t._removeLink));for(var a=function(e){return e.preventDefault(),e.stopPropagation(),t.status===b.UPLOADING?b.confirm(i.options.dictCancelUploadConfirmation,function(){return i.removeFile(t)}):i.options.dictRemoveFileConfirmation?b.confirm(i.options.dictRemoveFileConfirmation,function(){return i.removeFile(t)}):i.removeFile(t)},l=0,u=u=t.previewElement.querySelectorAll("[data-dz-remove]");;){if(l>=u.length)break;u[l++].addEventListener("click",a)}}},removedfile:function(e){return null!=e.previewElement&&null!=e.previewElement.parentNode&&e.previewElement.parentNode.removeChild(e.previewElement),this._updateMaxFilesReachedClass()},thumbnail:function(e,t){if(e.previewElement){e.previewElement.classList.remove("dz-file-preview");for(var i=0,n=n=e.previewElement.querySelectorAll("[data-dz-thumbnail]");;){if(i>=n.length)break;var r=n[i++];r.alt=e.name,r.src=t}return setTimeout(function(){return e.previewElement.classList.add("dz-image-preview")},1)}},error:function(e,t){if(e.previewElement){e.previewElement.classList.add("dz-error"),"String"!=typeof t&&t.error&&(t=t.error);for(var i=0,n=n=e.previewElement.querySelectorAll("[data-dz-errormessage]");;){if(i>=n.length)break;n[i++].textContent=t}}},errormultiple:function(){},processing:function(e){if(e.previewElement&&(e.previewElement.classList.add("dz-processing"),e._removeLink))return e._removeLink.textContent=this.options.dictCancelUpload},processingmultiple:function(){},uploadprogress:function(e,t,i){if(e.previewElement)for(var n=0,r=r=e.previewElement.querySelectorAll("[data-dz-uploadprogress]");;){if(n>=r.length)break;var o=r[n++];"PROGRESS"===o.nodeName?o.value=t:o.style.width=t+"%"}},totaluploadprogress:function(){},sending:function(){},sendingmultiple:function(){},success:function(e){if(e.previewElement)return e.previewElement.classList.add("dz-success")},successmultiple:function(){},canceled:function(e){return this.emit("error",e,this.options.dictUploadCanceled)},canceledmultiple:function(){},complete:function(e){if(e._removeLink&&(e._removeLink.textContent=this.options.dictRemoveFile),e.previewElement)return e.previewElement.classList.add("dz-complete")},completemultiple:function(){},maxfilesexceeded:function(){},maxfilesreached:function(){},queuecomplete:function(){},addedfiles:function(){}},this.prototype._thumbnailQueue=[],this.prototype._processingThumbnail=!1}},{key:"extend",value:function(e){for(var t=arguments.length,i=Array(1<t?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n];for(var r=0,o=o=i;;){if(r>=o.length)break;var s=o[r++];for(var a in s){var l=s[a];e[a]=l}}return e}}]),t(b,[{key:"getAcceptedFiles",value:function(){return this.files.filter(function(e){return e.accepted}).map(function(e){return e})}},{key:"getRejectedFiles",value:function(){return this.files.filter(function(e){return!e.accepted}).map(function(e){return e})}},{key:"getFilesWithStatus",value:function(t){return this.files.filter(function(e){return e.status===t}).map(function(e){return e})}},{key:"getQueuedFiles",value:function(){return this.getFilesWithStatus(b.QUEUED)}},{key:"getUploadingFiles",value:function(){return this.getFilesWithStatus(b.UPLOADING)}},{key:"getAddedFiles",value:function(){return this.getFilesWithStatus(b.ADDED)}},{key:"getActiveFiles",value:function(){return this.files.filter(function(e){return e.status===b.UPLOADING||e.status===b.QUEUED}).map(function(e){return e})}},{key:"init",value:function(){var o=this;if("form"===this.element.tagName&&this.element.setAttribute("enctype","multipart/form-data"),this.element.classList.contains("dropzone")&&!this.element.querySelector(".dz-message")&&this.element.appendChild(b.createElement('<div class="dz-default dz-message"><span>'+this.options.dictDefaultMessage+"</span></div>")),this.clickableElements.length){!function r(){return o.hiddenFileInput&&o.hiddenFileInput.parentNode.removeChild(o.hiddenFileInput),o.hiddenFileInput=document.createElement("input"),o.hiddenFileInput.setAttribute("type","file"),(null===o.options.maxFiles||1<o.options.maxFiles)&&o.hiddenFileInput.setAttribute("multiple","multiple"),o.hiddenFileInput.className="dz-hidden-input",null!==o.options.acceptedFiles&&o.hiddenFileInput.setAttribute("accept",o.options.acceptedFiles),null!==o.options.capture&&o.hiddenFileInput.setAttribute("capture",o.options.capture),o.hiddenFileInput.style.visibility="hidden",o.hiddenFileInput.style.position="absolute",o.hiddenFileInput.style.top="0",o.hiddenFileInput.style.left="0",o.hiddenFileInput.style.height="0",o.hiddenFileInput.style.width="0",document.querySelector(o.options.hiddenInputContainer).appendChild(o.hiddenFileInput),o.hiddenFileInput.addEventListener("change",function(){var e=o.hiddenFileInput.files;if(e.length)for(var t=0,i=i=e;!(t>=i.length);){var n=i[t++];o.addFile(n)}return o.emit("addedfiles",e),r()})}()}this.URL=null!==window.URL?window.URL:window.webkitURL;for(var e=0,t=t=this.events;;){if(e>=t.length)break;var i=t[e++];this.on(i,this.options[i])}this.on("uploadprogress",function(){return o.updateTotalUploadProgress()}),this.on("removedfile",function(){return o.updateTotalUploadProgress()}),this.on("canceled",function(e){return o.emit("complete",e)}),this.on("complete",function(e){if(0===o.getAddedFiles().length&&0===o.getUploadingFiles().length&&0===o.getQueuedFiles().length)return setTimeout(function(){return o.emit("queuecomplete")},0)});var n=function(e){return e.stopPropagation(),e.preventDefault?e.preventDefault():e.returnValue=!1};return this.listeners=[{element:this.element,events:{dragstart:function(e){return o.emit("dragstart",e)},dragenter:function(e){return n(e),o.emit("dragenter",e)},dragover:function(e){var t=void 0;try{t=e.dataTransfer.effectAllowed}catch(e){}return e.dataTransfer.dropEffect="move"===t||"linkMove"===t?"move":"copy",n(e),o.emit("dragover",e)},dragleave:function(e){return o.emit("dragleave",e)},drop:function(e){return n(e),o.drop(e)},dragend:function(e){return o.emit("dragend",e)}}}],this.clickableElements.forEach(function(t){return o.listeners.push({element:t,events:{click:function(e){return(t!==o.element||e.target===o.element||b.elementInside(e.target,o.element.querySelector(".dz-message")))&&o.hiddenFileInput.click(),!0}}})}),this.enable(),this.options.init.call(this)}},{key:"destroy",value:function(){return this.disable(),this.removeAllFiles(!0),(null!=this.hiddenFileInput?this.hiddenFileInput.parentNode:void 0)&&(this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput),this.hiddenFileInput=null),delete this.element.dropzone,b.instances.splice(b.instances.indexOf(this),1)}},{key:"updateTotalUploadProgress",value:function(){var e=void 0,t=0,i=0;if(this.getActiveFiles().length){for(var n=0,r=r=this.getActiveFiles();;){if(n>=r.length)break;var o=r[n++];t+=o.upload.bytesSent,i+=o.upload.total}e=100*t/i}else e=100;return this.emit("totaluploadprogress",e,i,t)}},{key:"_getParamName",value:function(e){return"function"==typeof this.options.paramName?this.options.paramName(e):this.options.paramName+(this.options.uploadMultiple?"["+e+"]":"")}},{key:"_renameFile",value:function(e){return"function"!=typeof this.options.renameFile?e.name:this.options.renameFile(e)}},{key:"getFallbackForm",value:function(){var e,t=void 0;if(e=this.getExistingFallback())return e;var i='<div class="dz-fallback">';this.options.dictFallbackText&&(i+="<p>"+this.options.dictFallbackText+"</p>"),i+='<input type="file" name="'+this._getParamName(0)+'" '+(this.options.uploadMultiple?'multiple="multiple"':void 0)+' /><input type="submit" value="Upload!"></div>';var n=b.createElement(i);return"FORM"!==this.element.tagName?(t=b.createElement('<form action="'+this.options.url+'" enctype="multipart/form-data" method="'+this.options.method+'"></form>')).appendChild(n):(this.element.setAttribute("enctype","multipart/form-data"),this.element.setAttribute("method",this.options.method)),null!=t?t:n}},{key:"getExistingFallback",value:function(){for(var e=function(e){for(var t=0,i=i=e;;){if(t>=i.length)break;var n=i[t++];if(/(^| )fallback($| )/.test(n.className))return n}},t=["div","form"],i=0;i<t.length;i++){var n,r=t[i];if(n=e(this.element.getElementsByTagName(r)))return n}}},{key:"setupEventListeners",value:function(){return this.listeners.map(function(n){return function(){var e=[];for(var t in n.events){var i=n.events[t];e.push(n.element.addEventListener(t,i,!1))}return e}()})}},{key:"removeEventListeners",value:function(){return this.listeners.map(function(n){return function(){var e=[];for(var t in n.events){var i=n.events[t];e.push(n.element.removeEventListener(t,i,!1))}return e}()})}},{key:"disable",value:function(){var t=this;return this.clickableElements.forEach(function(e){return e.classList.remove("dz-clickable")}),this.removeEventListeners(),this.disabled=!0,this.files.map(function(e){return t.cancelUpload(e)})}},{key:"enable",value:function(){return delete this.disabled,this.clickableElements.forEach(function(e){return e.classList.add("dz-clickable")}),this.setupEventListeners()}},{key:"filesize",value:function(e){var t=0,i="b";if(0<e){for(var n=["tb","gb","mb","kb","b"],r=0;r<n.length;r++){var o=n[r];if(Math.pow(this.options.filesizeBase,4-r)/10<=e){t=e/Math.pow(this.options.filesizeBase,4-r),i=o;break}}t=Math.round(10*t)/10}return"<strong>"+t+"</strong> "+this.options.dictFileSizeUnits[i]}},{key:"_updateMaxFilesReachedClass",value:function(){return null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(this.getAcceptedFiles().length===this.options.maxFiles&&this.emit("maxfilesreached",this.files),this.element.classList.add("dz-max-files-reached")):this.element.classList.remove("dz-max-files-reached")}},{key:"drop",value:function(e){if(e.dataTransfer){this.emit("drop",e);for(var t=[],i=0;i<e.dataTransfer.files.length;i++)t[i]=e.dataTransfer.files[i];if(this.emit("addedfiles",t),t.length){var n=e.dataTransfer.items;n&&n.length&&null!=n[0].webkitGetAsEntry?this._addFilesFromItems(n):this.handleFiles(t)}}}},{key:"paste",value:function(e){if(null!=(t=null!=e?e.clipboardData:void 0,i=function(e){return e.items},null!=t?i(t):void 0)){var t,i;this.emit("paste",e);var n=e.clipboardData.items;return n.length?this._addFilesFromItems(n):void 0}}},{key:"handleFiles",value:function(e){for(var t=0,i=i=e;;){if(t>=i.length)break;var n=i[t++];this.addFile(n)}}},{key:"_addFilesFromItems",value:function(o){var s=this;return function(){for(var e=[],t=0,i=i=o;;){if(t>=i.length)break;var n,r=i[t++];null!=r.webkitGetAsEntry&&(n=r.webkitGetAsEntry())?n.isFile?e.push(s.addFile(r.getAsFile())):n.isDirectory?e.push(s._addFilesFromDirectory(n,n.name)):e.push(void 0):null!=r.getAsFile&&(null==r.kind||"file"===r.kind)?e.push(s.addFile(r.getAsFile())):e.push(void 0)}return e}()}},{key:"_addFilesFromDirectory",value:function(e,o){var s=this,t=e.createReader(),i=function(t){return e=console,i="log",n=function(e){return e.log(t)},null!=e&&"function"==typeof e[i]?n(e,i):void 0;var e,i,n};return function r(){return t.readEntries(function(e){if(0<e.length){for(var t=0,i=i=e;!(t>=i.length);){var n=i[t++];n.isFile?n.file(function(e){if(!s.options.ignoreHiddenFiles||"."!==e.name.substring(0,1))return e.fullPath=o+"/"+e.name,s.addFile(e)}):n.isDirectory&&s._addFilesFromDirectory(n,o+"/"+n.name)}r()}return null},i)}()}},{key:"accept",value:function(e,t){return e.size>1024*this.options.maxFilesize*1024?t(this.options.dictFileTooBig.replace("{{filesize}}",Math.round(e.size/1024/10.24)/100).replace("{{maxFilesize}}",this.options.maxFilesize)):b.isValidFile(e,this.options.acceptedFiles)?null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(t(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}",this.options.maxFiles)),this.emit("maxfilesexceeded",e)):this.options.accept.call(this,e,t):t(this.options.dictInvalidFileType)}},{key:"addFile",value:function(t){var i=this;return t.upload={uuid:b.uuidv4(),progress:0,total:t.size,bytesSent:0,filename:this._renameFile(t),chunked:this.options.chunking&&(this.options.forceChunking||t.size>this.options.chunkSize),totalChunkCount:Math.ceil(t.size/this.options.chunkSize)},this.files.push(t),t.status=b.ADDED,this.emit("addedfile",t),this._enqueueThumbnail(t),this.accept(t,function(e){return e?(t.accepted=!1,i._errorProcessing([t],e)):(t.accepted=!0,i.options.autoQueue&&i.enqueueFile(t)),i._updateMaxFilesReachedClass()})}},{key:"enqueueFiles",value:function(e){for(var t=0,i=i=e;;){if(t>=i.length)break;var n=i[t++];this.enqueueFile(n)}return null}},{key:"enqueueFile",value:function(e){var t=this;if(e.status!==b.ADDED||!0!==e.accepted)throw new Error("This file can't be queued because it has already been processed or was rejected.");if(e.status=b.QUEUED,this.options.autoProcessQueue)return setTimeout(function(){return t.processQueue()},0)}},{key:"_enqueueThumbnail",value:function(e){var t=this;if(this.options.createImageThumbnails&&e.type.match(/image.*/)&&e.size<=1024*this.options.maxThumbnailFilesize*1024)return this._thumbnailQueue.push(e),setTimeout(function(){return t._processThumbnailQueue()},0)}},{key:"_processThumbnailQueue",value:function(){var t=this;if(!this._processingThumbnail&&0!==this._thumbnailQueue.length){this._processingThumbnail=!0;var i=this._thumbnailQueue.shift();return this.createThumbnail(i,this.options.thumbnailWidth,this.options.thumbnailHeight,this.options.thumbnailMethod,!0,function(e){return t.emit("thumbnail",i,e),t._processingThumbnail=!1,t._processThumbnailQueue()})}}},{key:"removeFile",value:function(e){if(e.status===b.UPLOADING&&this.cancelUpload(e),this.files=n(this.files,e),this.emit("removedfile",e),0===this.files.length)return this.emit("reset")}},{key:"removeAllFiles",value:function(e){null==e&&(e=!1);for(var t=0,i=i=this.files.slice();;){if(t>=i.length)break;var n=i[t++];(n.status!==b.UPLOADING||e)&&this.removeFile(n)}return null}},{key:"resizeImage",value:function(r,e,t,i,o){var s=this;return this.createThumbnail(r,e,t,i,!1,function(e,t){if(null==t)return o(r);var i=s.options.resizeMimeType;null==i&&(i=r.type);var n=t.toDataURL(i,s.options.resizeQuality);return"image/jpeg"!==i&&"image/jpg"!==i||(n=u.restore(r.dataURL,n)),o(b.dataURItoBlob(n))})}},{key:"createThumbnail",value:function(e,t,i,n,r,o){var s=this,a=new FileReader;return a.onload=function(){if(e.dataURL=a.result,"image/svg+xml"!==e.type)return s.createThumbnailFromUrl(e,t,i,n,r,o);null!=o&&o(a.result)},a.readAsDataURL(e)}},{key:"createThumbnailFromUrl",value:function(o,s,a,l,t,u,e){var d=this,c=document.createElement("img");return e&&(c.crossOrigin=e),c.onload=function(){var e=function(e){return e(1)};return"undefined"!=typeof EXIF&&null!==EXIF&&t&&(e=function(e){return EXIF.getData(c,function(){return e(EXIF.getTag(this,"Orientation"))})}),e(function(e){o.width=c.width,o.height=c.height;var t=d.options.resize.call(d,o,s,a,l),i=document.createElement("canvas"),n=i.getContext("2d");switch(i.width=t.trgWidth,i.height=t.trgHeight,4<e&&(i.width=t.trgHeight,i.height=t.trgWidth),e){case 2:n.translate(i.width,0),n.scale(-1,1);break;case 3:n.translate(i.width,i.height),n.rotate(Math.PI);break;case 4:n.translate(0,i.height),n.scale(1,-1);break;case 5:n.rotate(.5*Math.PI),n.scale(1,-1);break;case 6:n.rotate(.5*Math.PI),n.translate(0,-i.height);break;case 7:n.rotate(.5*Math.PI),n.translate(i.width,-i.height),n.scale(-1,1);break;case 8:n.rotate(-.5*Math.PI),n.translate(-i.width,0)}p(n,c,null!=t.srcX?t.srcX:0,null!=t.srcY?t.srcY:0,t.srcWidth,t.srcHeight,null!=t.trgX?t.trgX:0,null!=t.trgY?t.trgY:0,t.trgWidth,t.trgHeight);var r=i.toDataURL("image/png");if(null!=u)return u(r,i)})},null!=u&&(c.onerror=u),c.src=o.dataURL}},{key:"processQueue",value:function(){var e=this.options.parallelUploads,t=this.getUploadingFiles().length,i=t;if(!(e<=t)){var n=this.getQueuedFiles();if(0<n.length){if(this.options.uploadMultiple)return this.processFiles(n.slice(0,e-t));for(;i<e;){if(!n.length)return;this.processFile(n.shift()),i++}}}}},{key:"processFile",value:function(e){return this.processFiles([e])}},{key:"processFiles",value:function(e){for(var t=0,i=i=e;;){if(t>=i.length)break;var n=i[t++];n.processing=!0,n.status=b.UPLOADING,this.emit("processing",n)}return this.options.uploadMultiple&&this.emit("processingmultiple",e),this.uploadFiles(e)}},{key:"_getFilesWithXhr",value:function(t){return this.files.filter(function(e){return e.xhr===t}).map(function(e){return e})}},{key:"cancelUpload",value:function(e){if(e.status===b.UPLOADING){for(var t=this._getFilesWithXhr(e.xhr),i=0,n=n=t;;){if(i>=n.length)break;n[i++].status=b.CANCELED}void 0!==e.xhr&&e.xhr.abort();for(var r=0,o=o=t;;){if(r>=o.length)break;var s=o[r++];this.emit("canceled",s)}this.options.uploadMultiple&&this.emit("canceledmultiple",t)}else e.status!==b.ADDED&&e.status!==b.QUEUED||(e.status=b.CANCELED,this.emit("canceled",e),this.options.uploadMultiple&&this.emit("canceledmultiple",[e]));if(this.options.autoProcessQueue)return this.processQueue()}},{key:"resolveOption",value:function(e){if("function"==typeof e){for(var t=arguments.length,i=Array(1<t?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n];return e.apply(this,i)}return e}},{key:"uploadFile",value:function(e){return this.uploadFiles([e])}},{key:"uploadFiles",value:function(a){var l=this;this._transformFiles(a,function(e){if(a[0].upload.chunked){var r=a[0],o=e[0];r.upload.chunks=[];var n=function(){for(var e=0;void 0!==r.upload.chunks[e];)e++;if(!(e>=r.upload.totalChunkCount)){0;var t=e*l.options.chunkSize,i=Math.min(t+l.options.chunkSize,r.size),n={name:l._getParamName(0),data:o.webkitSlice?o.webkitSlice(t,i):o.slice(t,i),filename:r.upload.filename,chunkIndex:e};r.upload.chunks[e]={file:r,index:e,dataBlock:n,status:b.UPLOADING,progress:0,retries:0},l._uploadData(a,[n])}};if(r.upload.finishedChunkUpload=function(e){var t=!0;e.status=b.SUCCESS,e.dataBlock=null;for(var i=0;i<r.upload.totalChunkCount;i++){if(void 0===r.upload.chunks[i])return n();r.upload.chunks[i].status!==b.SUCCESS&&(t=!1)}t&&l.options.chunksUploaded(r,function(){l._finished(a,"",null)})},l.options.parallelChunkUploads)for(var t=0;t<r.upload.totalChunkCount;t++)n();else n()}else{for(var i=[],s=0;s<a.length;s++)i[s]={name:l._getParamName(s),data:e[s],filename:a[s].upload.filename};l._uploadData(a,i)}})}},{key:"_getChunk",value:function(e,t){for(var i=0;i<e.upload.totalChunkCount;i++)if(void 0!==e.upload.chunks[i]&&e.upload.chunks[i].xhr===t)return e.upload.chunks[i]}},{key:"_uploadData",value:function(t,e){for(var i=this,n=new XMLHttpRequest,r=0,o=o=t;;){if(r>=o.length)break;o[r++].xhr=n}t[0].upload.chunked&&(t[0].upload.chunks[e[0].chunkIndex].xhr=n);var s=this.resolveOption(this.options.method,t),a=this.resolveOption(this.options.url,t);n.open(s,a,!0),n.timeout=this.resolveOption(this.options.timeout,t),n.withCredentials=!!this.options.withCredentials,n.onload=function(e){i._finishedUploading(t,n,e)},n.onerror=function(){i._handleUploadError(t,n)},(null!=n.upload?n.upload:n).onprogress=function(e){return i._updateFilesUploadProgress(t,n,e)};var l={Accept:"application/json","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"};for(var u in this.options.headers&&b.extend(l,this.options.headers),l){var d=l[u];d&&n.setRequestHeader(u,d)}var c=new FormData;if(this.options.params){var p=this.options.params;for(var h in"function"==typeof p&&(p=p.call(this,t,n,t[0].upload.chunked?this._getChunk(t[0],n):null)),p){var f=p[h];c.append(h,f)}}for(var m=0,v=v=t;;){if(m>=v.length)break;var g=v[m++];this.emit("sending",g,n,c)}this.options.uploadMultiple&&this.emit("sendingmultiple",t,n,c),this._addFormElementData(c);for(var k=0;k<e.length;k++){var y=e[k];c.append(y.name,y.data,y.filename)}this.submitRequest(n,c,t)}},{key:"_transformFiles",value:function(i,n){for(var e=this,r=[],o=0,t=function(t){e.options.transformFile.call(e,i[t],function(e){r[t]=e,++o===i.length&&n(r)})},s=0;s<i.length;s++)t(s)}},{key:"_addFormElementData",value:function(e){if("FORM"===this.element.tagName)for(var t=0,i=i=this.element.querySelectorAll("input, textarea, select, button");;){if(t>=i.length)break;var n=i[t++],r=n.getAttribute("name"),o=n.getAttribute("type");if(o&&(o=o.toLowerCase()),null!=r)if("SELECT"===n.tagName&&n.hasAttribute("multiple"))for(var s=0,a=a=n.options;;){if(s>=a.length)break;var l=a[s++];l.selected&&e.append(r,l.value)}else(!o||"checkbox"!==o&&"radio"!==o||n.checked)&&e.append(r,n.value)}}},{key:"_updateFilesUploadProgress",value:function(e,t,i){var n=void 0;if(void 0!==i){if(n=100*i.loaded/i.total,e[0].upload.chunked){var r=e[0],o=this._getChunk(r,t);o.progress=n,o.total=i.total,o.bytesSent=i.loaded;r.upload.progress=0,r.upload.total=0;for(var s=r.upload.bytesSent=0;s<r.upload.totalChunkCount;s++)void 0!==r.upload.chunks[s]&&void 0!==r.upload.chunks[s].progress&&(r.upload.progress+=r.upload.chunks[s].progress,r.upload.total+=r.upload.chunks[s].total,r.upload.bytesSent+=r.upload.chunks[s].bytesSent);r.upload.progress=r.upload.progress/r.upload.totalChunkCount}else for(var a=0,l=l=e;;){if(a>=l.length)break;var u=l[a++];u.upload.progress=n,u.upload.total=i.total,u.upload.bytesSent=i.loaded}for(var d=0,c=c=e;;){if(d>=c.length)break;var p=c[d++];this.emit("uploadprogress",p,p.upload.progress,p.upload.bytesSent)}}else{var h=!0;n=100;for(var f=0,m=m=e;;){if(f>=m.length)break;var v=m[f++];100===v.upload.progress&&v.upload.bytesSent===v.upload.total||(h=!1),v.upload.progress=n,v.upload.bytesSent=v.upload.total}if(h)return;for(var g=0,k=k=e;;){if(g>=k.length)break;var y=k[g++];this.emit("uploadprogress",y,n,y.upload.bytesSent)}}}},{key:"_finishedUploading",value:function(e,t,i){var n=void 0;if(e[0].status!==b.CANCELED&&4===t.readyState){if("arraybuffer"!==t.responseType&&"blob"!==t.responseType&&(n=t.responseText,t.getResponseHeader("content-type")&&~t.getResponseHeader("content-type").indexOf("application/json")))try{n=JSON.parse(n)}catch(e){i=e,n="Invalid JSON response from server."}this._updateFilesUploadProgress(e),200<=t.status&&t.status<300?e[0].upload.chunked?e[0].upload.finishedChunkUpload(this._getChunk(e[0],t)):this._finished(e,n,i):this._handleUploadError(e,t,n)}}},{key:"_handleUploadError",value:function(e,t,i){if(e[0].status!==b.CANCELED){if(e[0].upload.chunked&&this.options.retryChunks){var n=this._getChunk(e[0],t);if(n.retries++<this.options.retryChunksLimit)return void this._uploadData(e,[n.dataBlock]);console.warn("Retried this chunk too often. Giving up.")}for(var r=0,o=o=e;;){if(r>=o.length)break;o[r++];this._errorProcessing(e,i||this.options.dictResponseError.replace("{{statusCode}}",t.status),t)}}}},{key:"submitRequest",value:function(e,t,i){e.send(t)}},{key:"_finished",value:function(e,t,i){for(var n=0,r=r=e;;){if(n>=r.length)break;var o=r[n++];o.status=b.SUCCESS,this.emit("success",o,t,i),this.emit("complete",o)}if(this.options.uploadMultiple&&(this.emit("successmultiple",e,t,i),this.emit("completemultiple",e)),this.options.autoProcessQueue)return this.processQueue()}},{key:"_errorProcessing",value:function(e,t,i){for(var n=0,r=r=e;;){if(n>=r.length)break;var o=r[n++];o.status=b.ERROR,this.emit("error",o,t,i),this.emit("complete",o)}if(this.options.uploadMultiple&&(this.emit("errormultiple",e,t,i),this.emit("completemultiple",e)),this.options.autoProcessQueue)return this.processQueue()}}],[{key:"uuidv4",value:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}}]),b}();r.initClass(),r.version="5.4.0",r.options={},r.optionsForElement=function(e){return e.getAttribute("id")?r.options[o(e.getAttribute("id"))]:void 0},r.instances=[],r.forElement=function(e){if("string"==typeof e&&(e=document.querySelector(e)),null==(null!=e?e.dropzone:void 0))throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");return e.dropzone},r.autoDiscover=!0,r.discover=function(){var o=void 0;if(document.querySelectorAll)o=document.querySelectorAll(".dropzone");else{o=[];var e=function(r){return function(){for(var e=[],t=0,i=i=r;;){if(t>=i.length)break;var n=i[t++];/(^| )dropzone($| )/.test(n.className)?e.push(o.push(n)):e.push(void 0)}return e}()};e(document.getElementsByTagName("div")),e(document.getElementsByTagName("form"))}return function(){for(var e=[],t=0,i=i=o;;){if(t>=i.length)break;var n=i[t++];!1!==r.optionsForElement(n)?e.push(new r(n)):e.push(void 0)}return e}()},r.blacklistedBrowsers=[/opera.*(Macintosh|Windows Phone).*version\/12/i],r.isBrowserSupported=function(){var e=!0;if(window.File&&window.FileReader&&window.FileList&&window.Blob&&window.FormData&&document.querySelector)if("classList"in document.createElement("a"))for(var t=0,i=i=r.blacklistedBrowsers;;){if(t>=i.length)break;i[t++].test(navigator.userAgent)&&(e=!1)}else e=!1;else e=!1;return e},r.dataURItoBlob=function(e){for(var t=atob(e.split(",")[1]),i=e.split(",")[0].split(":")[1].split(";")[0],n=new ArrayBuffer(t.length),r=new Uint8Array(n),o=0,s=t.length,a=0<=s;a?o<=s:s<=o;a?o++:o--)r[o]=t.charCodeAt(o);return new Blob([n],{type:i})};var n=function(e,t){return e.filter(function(e){return e!==t}).map(function(e){return e})},o=function(e){return e.replace(/[\-_](\w)/g,function(e){return e.charAt(1).toUpperCase()})};r.createElement=function(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes[0]},r.elementInside=function(e,t){if(e===t)return!0;for(;e=e.parentNode;)if(e===t)return!0;return!1},r.getElement=function(e,t){var i=void 0;if("string"==typeof e?i=document.querySelector(e):null!=e.nodeType&&(i=e),null==i)throw new Error("Invalid `"+t+"` option provided. Please provide a CSS selector or a plain HTML element.");return i},r.getElements=function(e,t){var i=void 0,n=void 0;if(e instanceof Array){n=[];try{for(var r=0,o=o=e;!(r>=o.length);)i=o[r++],n.push(this.getElement(i,t))}catch(e){n=null}}else if("string"==typeof e){n=[];for(var s=0,a=a=document.querySelectorAll(e);!(s>=a.length);)i=a[s++],n.push(i)}else null!=e.nodeType&&(n=[e]);if(null==n||!n.length)throw new Error("Invalid `"+t+"` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");return n},r.confirm=function(e,t,i){return window.confirm(e)?t():null!=i?i():void 0},r.isValidFile=function(e,t){if(!t)return!0;t=t.split(",");for(var i=e.type,n=i.replace(/\/.*$/,""),r=0,o=o=t;;){if(r>=o.length)break;var s=o[r++];if("."===(s=s.trim()).charAt(0)){if(-1!==e.name.toLowerCase().indexOf(s.toLowerCase(),e.name.length-s.length))return!0}else if(/\/\*$/.test(s)){if(n===s.replace(/\/.*$/,""))return!0}else if(i===s)return!0}return!1},"undefined"!=typeof jQuery&&null!==jQuery&&(jQuery.fn.dropzone=function(e){return this.each(function(){return new r(this,e)})}),null!==e?e.exports=r:window.Dropzone=r,r.ADDED="added",r.QUEUED="queued",r.ACCEPTED=r.QUEUED,r.UPLOADING="uploading",r.PROCESSING=r.UPLOADING,r.CANCELED="canceled",r.ERROR="error",r.SUCCESS="success";var p=function(e,t,i,n,r,o,s,a,l,u){var d=function(e){e.naturalWidth;var t=e.naturalHeight,i=document.createElement("canvas");i.width=1,i.height=t;var n=i.getContext("2d");n.drawImage(e,0,0);for(var r=n.getImageData(1,0,1,t).data,o=0,s=t,a=t;o<a;)0===r[4*(a-1)+3]?s=a:o=a,a=s+o>>1;var l=a/t;return 0===l?1:l}(t);return e.drawImage(t,i,n,r,o,s,a,l,u/d)},u=function(){function e(){l(this,e)}return t(e,null,[{key:"initClass",value:function(){this.KEY_STR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}},{key:"encode64",value:function(e){for(var t="",i=void 0,n=void 0,r="",o=void 0,s=void 0,a=void 0,l="",u=0;o=(i=e[u++])>>2,s=(3&i)<<4|(n=e[u++])>>4,a=(15&n)<<2|(r=e[u++])>>6,l=63&r,isNaN(n)?a=l=64:isNaN(r)&&(l=64),t=t+this.KEY_STR.charAt(o)+this.KEY_STR.charAt(s)+this.KEY_STR.charAt(a)+this.KEY_STR.charAt(l),i=n=r="",o=s=a=l="",u<e.length;);return t}},{key:"restore",value:function(e,t){if(!e.match("data:image/jpeg;base64,"))return t;var i=this.decode64(e.replace("data:image/jpeg;base64,","")),n=this.slice2Segments(i),r=this.exifManipulation(t,n);return"data:image/jpeg;base64,"+this.encode64(r)}},{key:"exifManipulation",value:function(e,t){var i=this.getExifArray(t),n=this.insertExif(e,i);return new Uint8Array(n)}},{key:"getExifArray",value:function(e){for(var t=void 0,i=0;i<e.length;){if(255===(t=e[i])[0]&225===t[1])return t;i++}return[]}},{key:"insertExif",value:function(e,t){var i=e.replace("data:image/jpeg;base64,",""),n=this.decode64(i),r=n.indexOf(255,3),o=n.slice(0,r),s=n.slice(r),a=o;return a=(a=a.concat(t)).concat(s)}},{key:"slice2Segments",value:function(e){for(var t=0,i=[];;){if(255===e[t]&218===e[t+1])break;if(255===e[t]&216===e[t+1])t+=2;else{var n=t+(256*e[t+2]+e[t+3])+2,r=e.slice(t,n);i.push(r),t=n}if(t>e.length)break}return i}},{key:"decode64",value:function(e){var t=void 0,i=void 0,n="",r=void 0,o=void 0,s="",a=0,l=[];for(/[^A-Za-z0-9\+\/\=]/g.exec(e)&&console.warn("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."),e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");t=this.KEY_STR.indexOf(e.charAt(a++))<<2|(r=this.KEY_STR.indexOf(e.charAt(a++)))>>4,i=(15&r)<<4|(o=this.KEY_STR.indexOf(e.charAt(a++)))>>2,n=(3&o)<<6|(s=this.KEY_STR.indexOf(e.charAt(a++))),l.push(t),64!==o&&l.push(i),64!==s&&l.push(n),t=i=n="",r=o=s="",a<e.length;);return l}}]),e}();u.initClass();r._autoDiscoverFunction=function(){if(r.autoDiscover)return r.discover()},function(i,n){var r=!1,e=!0,o=i.document,s=o.documentElement,t=o.addEventListener?"addEventListener":"attachEvent",a=o.addEventListener?"removeEventListener":"detachEvent",l=o.addEventListener?"":"on",u=function e(t){if("readystatechange"!==t.type||"complete"===o.readyState)return("load"===t.type?i:o)[a](l+t.type,e,!1),!r&&(r=!0)?n.call(i,t.type||t):void 0};if("complete"!==o.readyState){if(o.createEventObject&&s.doScroll){try{e=!i.frameElement}catch(e){}e&&function t(){try{s.doScroll("left")}catch(e){return void setTimeout(t,50)}return u("poll")}()}o[t](l+"DOMContentLoaded",u,!1),o[t](l+"readystatechange",u,!1),i[t](l+"load",u,!1)}}(window,r._autoDiscoverFunction)}(e={exports:{}},e.exports),e.exports);return t.autoDiscover=!1,{render:function(){var e=this.$createElement;return(this._self._c||e)("div",{ref:"dropzoneElement",class:{"vue-dropzone dropzone":this.includeStyling},attrs:{id:this.id}})},staticRenderFns:[],props:{id:{type:String,required:!0},options:{type:Object,required:!0},includeStyling:{type:Boolean,default:!0,required:!1},awss3:{type:Object,required:!1,default:null},destroyDropzone:{type:Boolean,default:!0,required:!1}},data:function(){return{isS3:!1,isS3OverridesServerPropagation:!1,wasQueueAutoProcess:!0}},computed:{dropzoneSettings:function(){var t={thumbnailWidth:200,thumbnailHeight:200};return Object.keys(this.options).forEach(function(e){t[e]=this.options[e]},this),null!==this.awss3&&(t.autoProcessQueue=!1,this.isS3=!0,this.isS3OverridesServerPropagation=!1===this.awss3.sendFileToServer,void 0!==this.options.autoProcessQueue&&(this.wasQueueAutoProcess=this.options.autoProcessQueue),this.isS3OverridesServerPropagation&&(t.url=function(e){return e[0].s3Url})),t}},methods:{manuallyAddFile:function(e,t){e.manuallyAdded=!0,this.dropzone.emit("addedfile",e),t&&this.dropzone.emit("thumbnail",e,t);for(var i=e.previewElement.querySelectorAll("[data-dz-thumbnail]"),n=0;n<i.length;n++)i[n].style.width=this.dropzoneSettings.thumbnailWidth+"px",i[n].style.height=this.dropzoneSettings.thumbnailHeight+"px",i[n].style["object-fit"]="contain";this.dropzone.emit("complete",e),this.dropzone.options.maxFiles&&this.dropzone.options.maxFiles--,this.dropzone.files.push(e),this.$emit("vdropzone-file-added-manually",e)},setOption:function(e,t){this.dropzone.options[e]=t},removeAllFiles:function(e){this.dropzone.removeAllFiles(e)},processQueue:function(){var t=this,e=this.dropzone;this.isS3&&!this.wasQueueAutoProcess?this.getQueuedFiles().forEach(function(e){t.getSignedAndUploadToS3(e)}):this.dropzone.processQueue(),this.dropzone.on("success",function(){e.options.autoProcessQueue=!0}),this.dropzone.on("queuecomplete",function(){e.options.autoProcessQueue=!1})},init:function(){return this.dropzone.init()},destroy:function(){return this.dropzone.destroy()},updateTotalUploadProgress:function(){return this.dropzone.updateTotalUploadProgress()},getFallbackForm:function(){return this.dropzone.getFallbackForm()},getExistingFallback:function(){return this.dropzone.getExistingFallback()},setupEventListeners:function(){return this.dropzone.setupEventListeners()},removeEventListeners:function(){return this.dropzone.removeEventListeners()},disable:function(){return this.dropzone.disable()},enable:function(){return this.dropzone.enable()},filesize:function(e){return this.dropzone.filesize(e)},accept:function(e,t){return this.dropzone.accept(e,t)},addFile:function(e){return this.dropzone.addFile(e)},removeFile:function(e){this.dropzone.removeFile(e)},getAcceptedFiles:function(){return this.dropzone.getAcceptedFiles()},getRejectedFiles:function(){return this.dropzone.getRejectedFiles()},getFilesWithStatus:function(){return this.dropzone.getFilesWithStatus()},getQueuedFiles:function(){return this.dropzone.getQueuedFiles()},getUploadingFiles:function(){return this.dropzone.getUploadingFiles()},getAddedFiles:function(){return this.dropzone.getAddedFiles()},getActiveFiles:function(){return this.dropzone.getActiveFiles()},getSignedAndUploadToS3:function(t){var i=this,e=n.sendFile(t,this.awss3,this.isS3OverridesServerPropagation);this.isS3OverridesServerPropagation?e.then(function(){setTimeout(function(){return i.dropzone.processFile(t)})}):e.then(function(e){e.success?(t.s3ObjectLocation=e.message,setTimeout(function(){return i.dropzone.processFile(t)}),i.$emit("vdropzone-s3-upload-success",e.message)):void 0!==e.message?i.$emit("vdropzone-s3-upload-error",e.message):i.$emit("vdropzone-s3-upload-error","Network Error : Could not send request to AWS. (Maybe CORS error)")}),e.catch(function(e){alert(e)})},setAWSSigningURL:function(e){this.isS3&&(this.awss3.signingURL=e)}},mounted:function(){if(!this.$isServer||!this.hasBeenMounted){this.hasBeenMounted=!0,this.dropzone=new t(this.$refs.dropzoneElement,this.dropzoneSettings);var r=this;this.dropzone.on("thumbnail",function(e,t){r.$emit("vdropzone-thumbnail",e,t)}),this.dropzone.on("addedfile",function(t){r.duplicateCheck&&this.files.length&&this.files.forEach(function(e){e.name===t.name&&(this.removeFile(t),r.$emit("duplicate-file",t))},this),r.$emit("vdropzone-file-added",t),r.isS3&&r.wasQueueAutoProcess&&r.getSignedAndUploadToS3(t)}),this.dropzone.on("addedfiles",function(e){r.$emit("vdropzone-files-added",e)}),this.dropzone.on("removedfile",function(e){r.$emit("vdropzone-removed-file",e),e.manuallyAdded&&r.dropzone.options.maxFiles++}),this.dropzone.on("success",function(e,t){if(r.$emit("vdropzone-success",e,t),r.isS3){if(r.isS3OverridesServerPropagation){var i=(new window.DOMParser).parseFromString(t,"text/xml").firstChild.children[0].innerHTML;r.$emit("vdropzone-s3-upload-success",i)}r.wasQueueAutoProcess&&r.setOption("autoProcessQueue",!1)}}),this.dropzone.on("successmultiple",function(e,t){r.$emit("vdropzone-success-multiple",e,t)}),this.dropzone.on("error",function(e,t,i){r.$emit("vdropzone-error",e,t,i),this.isS3&&r.$emit("vdropzone-s3-upload-error")}),this.dropzone.on("errormultiple",function(e,t,i){r.$emit("vdropzone-error-multiple",e,t,i)}),this.dropzone.on("sending",function(e,t,i){if(r.isS3)if(r.isS3OverridesServerPropagation){var n=e.s3Signature;Object.keys(n).forEach(function(e){i.append(e,n[e])})}else i.append("s3ObjectLocation",e.s3ObjectLocation);r.$emit("vdropzone-sending",e,t,i)}),this.dropzone.on("sendingmultiple",function(e,t,i){r.$emit("vdropzone-sending-multiple",e,t,i)}),this.dropzone.on("complete",function(e){r.$emit("vdropzone-complete",e)}),this.dropzone.on("completemultiple",function(e){r.$emit("vdropzone-complete-multiple",e)}),this.dropzone.on("canceled",function(e){r.$emit("vdropzone-canceled",e)}),this.dropzone.on("canceledmultiple",function(e){r.$emit("vdropzone-canceled-multiple",e)}),this.dropzone.on("maxfilesreached",function(e){r.$emit("vdropzone-max-files-reached",e)}),this.dropzone.on("maxfilesexceeded",function(e){r.$emit("vdropzone-max-files-exceeded",e)}),this.dropzone.on("processing",function(e){r.$emit("vdropzone-processing",e)}),this.dropzone.on("processing",function(e){r.$emit("vdropzone-processing",e)}),this.dropzone.on("processingmultiple",function(e){r.$emit("vdropzone-processing-multiple",e)}),this.dropzone.on("uploadprogress",function(e,t,i){r.$emit("vdropzone-upload-progress",e,t,i)}),this.dropzone.on("totaluploadprogress",function(e,t,i){r.$emit("vdropzone-total-upload-progress",e,t,i)}),this.dropzone.on("reset",function(){r.$emit("vdropzone-reset")}),this.dropzone.on("queuecomplete",function(){r.$emit("vdropzone-queue-complete")}),this.dropzone.on("drop",function(e){r.$emit("vdropzone-drop",e)}),this.dropzone.on("dragstart",function(e){r.$emit("vdropzone-drag-start",e)}),this.dropzone.on("dragend",function(e){r.$emit("vdropzone-drag-end",e)}),this.dropzone.on("dragenter",function(e){r.$emit("vdropzone-drag-enter",e)}),this.dropzone.on("dragover",function(e){r.$emit("vdropzone-drag-over",e)}),this.dropzone.on("dragleave",function(e){r.$emit("vdropzone-drag-leave",e)}),r.$emit("vdropzone-mounted")}},beforeDestroy:function(){this.destroyDropzone&&this.dropzone.destroy()}}});
//# sourceMappingURL=vue2Dropzone.js.map
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae


/***/ }),

<<<<<<< HEAD
/***/ 302:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 549:
=======
/***/ 307:
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
<<<<<<< HEAD
var content = __webpack_require__(550);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(301)("19d696e4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-17d8bdd0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-17d8bdd0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
=======
var content = __webpack_require__(308);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(160)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./vue2Dropzone.min.css", function() {
			var newContent = require("!!../../css-loader/index.js!./vue2Dropzone.min.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
}

/***/ }),

<<<<<<< HEAD
/***/ 550:
=======
/***/ 308:
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(159)(false);
// imports


// module
<<<<<<< HEAD
exports.push([module.i, "\n.slide-enter-active[data-v-17d8bdd0] {\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-timing-function: ease-in;\n  transition-timing-function: ease-in;\n}\n.slide-leave-active[data-v-17d8bdd0] {\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);\n  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);\n}\n.slide-enter-to[data-v-17d8bdd0], .slide-leave[data-v-17d8bdd0] {\n  max-height: 100px;\n  overflow: hidden;\n}\n.slide-enter[data-v-17d8bdd0], .slide-leave-to[data-v-17d8bdd0] {\n  overflow: hidden;\n  max-height: 0;\n}\n", ""]);
=======
exports.push([module.i, "@-webkit-keyframes passing-through{0%{opacity:0;-webkit-transform:translateY(40px);-moz-transform:translateY(40px);-ms-transform:translateY(40px);-o-transform:translateY(40px);transform:translateY(40px)}30%,70%{opacity:1;-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}100%{opacity:0;-webkit-transform:translateY(-40px);-moz-transform:translateY(-40px);-ms-transform:translateY(-40px);-o-transform:translateY(-40px);transform:translateY(-40px)}}@-moz-keyframes passing-through{0%{opacity:0;-webkit-transform:translateY(40px);-moz-transform:translateY(40px);-ms-transform:translateY(40px);-o-transform:translateY(40px);transform:translateY(40px)}30%,70%{opacity:1;-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}100%{opacity:0;-webkit-transform:translateY(-40px);-moz-transform:translateY(-40px);-ms-transform:translateY(-40px);-o-transform:translateY(-40px);transform:translateY(-40px)}}@keyframes passing-through{0%{opacity:0;-webkit-transform:translateY(40px);-moz-transform:translateY(40px);-ms-transform:translateY(40px);-o-transform:translateY(40px);transform:translateY(40px)}30%,70%{opacity:1;-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}100%{opacity:0;-webkit-transform:translateY(-40px);-moz-transform:translateY(-40px);-ms-transform:translateY(-40px);-o-transform:translateY(-40px);transform:translateY(-40px)}}@-webkit-keyframes slide-in{0%{opacity:0;-webkit-transform:translateY(40px);-moz-transform:translateY(40px);-ms-transform:translateY(40px);-o-transform:translateY(40px);transform:translateY(40px)}30%{opacity:1;-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}}@-moz-keyframes slide-in{0%{opacity:0;-webkit-transform:translateY(40px);-moz-transform:translateY(40px);-ms-transform:translateY(40px);-o-transform:translateY(40px);transform:translateY(40px)}30%{opacity:1;-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}}@keyframes slide-in{0%{opacity:0;-webkit-transform:translateY(40px);-moz-transform:translateY(40px);-ms-transform:translateY(40px);-o-transform:translateY(40px);transform:translateY(40px)}30%{opacity:1;-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes pulse{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1)}10%{-webkit-transform:scale(1.1);-moz-transform:scale(1.1);-ms-transform:scale(1.1);-o-transform:scale(1.1);transform:scale(1.1)}20%{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}@-moz-keyframes pulse{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1)}10%{-webkit-transform:scale(1.1);-moz-transform:scale(1.1);-ms-transform:scale(1.1);-o-transform:scale(1.1);transform:scale(1.1)}20%{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}@keyframes pulse{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1)}10%{-webkit-transform:scale(1.1);-moz-transform:scale(1.1);-ms-transform:scale(1.1);-o-transform:scale(1.1);transform:scale(1.1)}20%{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}.dropzone,.dropzone *{box-sizing:border-box}.dropzone{min-height:150px;border:2px solid rgba(0,0,0,0.3);background:white;padding:20px 20px}.dropzone.dz-clickable{cursor:pointer}.dropzone.dz-clickable *{cursor:default}.dropzone.dz-clickable .dz-message,.dropzone.dz-clickable .dz-message *{cursor:pointer}.dropzone.dz-started .dz-message{display:none}.dropzone.dz-drag-hover{border-style:solid}.dropzone.dz-drag-hover .dz-message{opacity:.5}.dropzone .dz-message{text-align:center;margin:2em 0}.dropzone .dz-preview{position:relative;display:inline-block;vertical-align:top;margin:16px;min-height:100px}.dropzone .dz-preview:hover{z-index:1000}.dropzone .dz-preview:hover .dz-details{opacity:1}.dropzone .dz-preview.dz-file-preview .dz-image{border-radius:20px;background:#999;background:linear-gradient(to bottom,#eee,#ddd)}.dropzone .dz-preview.dz-file-preview .dz-details{opacity:1}.dropzone .dz-preview.dz-image-preview{background:white}.dropzone .dz-preview.dz-image-preview .dz-details{-webkit-transition:opacity .2s linear;-moz-transition:opacity .2s linear;-ms-transition:opacity .2s linear;-o-transition:opacity .2s linear;transition:opacity .2s linear}.dropzone .dz-preview .dz-remove{font-size:14px;text-align:center;display:block;cursor:pointer;border:0}.dropzone .dz-preview .dz-remove:hover{text-decoration:underline}.dropzone .dz-preview:hover .dz-details{opacity:1}.dropzone .dz-preview .dz-details{z-index:20;position:absolute;top:0;left:0;opacity:0;font-size:13px;min-width:100%;max-width:100%;padding:2em 1em;text-align:center;color:rgba(0,0,0,0.9);line-height:150%}.dropzone .dz-preview .dz-details .dz-size{margin-bottom:1em;font-size:16px}.dropzone .dz-preview .dz-details .dz-filename{white-space:nowrap}.dropzone .dz-preview .dz-details .dz-filename:hover span{border:1px solid rgba(200,200,200,0.8);background-color:rgba(255,255,255,0.8)}.dropzone .dz-preview .dz-details .dz-filename:not(:hover){overflow:hidden;text-overflow:ellipsis}.dropzone .dz-preview .dz-details .dz-filename:not(:hover) span{border:1px solid transparent}.dropzone .dz-preview .dz-details .dz-filename span,.dropzone .dz-preview .dz-details .dz-size span{background-color:rgba(255,255,255,0.4);padding:0 .4em;border-radius:3px}.dropzone .dz-preview:hover .dz-image img{-webkit-transform:scale(1.05,1.05);-moz-transform:scale(1.05,1.05);-ms-transform:scale(1.05,1.05);-o-transform:scale(1.05,1.05);transform:scale(1.05,1.05);-webkit-filter:blur(8px);filter:blur(8px)}.dropzone .dz-preview .dz-image{border-radius:20px;overflow:hidden;width:120px;height:120px;position:relative;display:block;z-index:10}.dropzone .dz-preview .dz-image img{display:block}.dropzone .dz-preview.dz-success .dz-success-mark{-webkit-animation:passing-through 3s cubic-bezier(0.77,0,0.175,1);-moz-animation:passing-through 3s cubic-bezier(0.77,0,0.175,1);-ms-animation:passing-through 3s cubic-bezier(0.77,0,0.175,1);-o-animation:passing-through 3s cubic-bezier(0.77,0,0.175,1);animation:passing-through 3s cubic-bezier(0.77,0,0.175,1)}.dropzone .dz-preview.dz-error .dz-error-mark{opacity:1;-webkit-animation:slide-in 3s cubic-bezier(0.77,0,0.175,1);-moz-animation:slide-in 3s cubic-bezier(0.77,0,0.175,1);-ms-animation:slide-in 3s cubic-bezier(0.77,0,0.175,1);-o-animation:slide-in 3s cubic-bezier(0.77,0,0.175,1);animation:slide-in 3s cubic-bezier(0.77,0,0.175,1)}.dropzone .dz-preview .dz-success-mark,.dropzone .dz-preview .dz-error-mark{pointer-events:none;opacity:0;z-index:500;position:absolute;display:block;top:50%;left:50%;margin-left:-27px;margin-top:-27px}.dropzone .dz-preview .dz-success-mark svg,.dropzone .dz-preview .dz-error-mark svg{display:block;width:54px;height:54px}.dropzone .dz-preview.dz-processing .dz-progress{opacity:1;-webkit-transition:all .2s linear;-moz-transition:all .2s linear;-ms-transition:all .2s linear;-o-transition:all .2s linear;transition:all .2s linear}.dropzone .dz-preview.dz-complete .dz-progress{opacity:0;-webkit-transition:opacity .4s ease-in;-moz-transition:opacity .4s ease-in;-ms-transition:opacity .4s ease-in;-o-transition:opacity .4s ease-in;transition:opacity .4s ease-in}.dropzone .dz-preview:not(.dz-processing) .dz-progress{-webkit-animation:pulse 6s ease infinite;-moz-animation:pulse 6s ease infinite;-ms-animation:pulse 6s ease infinite;-o-animation:pulse 6s ease infinite;animation:pulse 6s ease infinite}.dropzone .dz-preview .dz-progress{opacity:1;z-index:1000;pointer-events:none;position:absolute;height:16px;left:50%;top:50%;margin-top:-8px;width:80px;margin-left:-40px;background:rgba(255,255,255,0.9);-webkit-transform:scale(1);border-radius:8px;overflow:hidden}.dropzone .dz-preview .dz-progress .dz-upload{background:#333;background:linear-gradient(to bottom,#666,#444);position:absolute;top:0;left:0;bottom:0;width:0;-webkit-transition:width 300ms ease-in-out;-moz-transition:width 300ms ease-in-out;-ms-transition:width 300ms ease-in-out;-o-transition:width 300ms ease-in-out;transition:width 300ms ease-in-out}.dropzone .dz-preview.dz-error .dz-error-message{display:block}.dropzone .dz-preview.dz-error:hover .dz-error-message{opacity:1;pointer-events:auto}.dropzone .dz-preview .dz-error-message{pointer-events:none;z-index:1000;position:absolute;display:block;display:none;opacity:0;-webkit-transition:opacity .3s ease;-moz-transition:opacity .3s ease;-ms-transition:opacity .3s ease;-o-transition:opacity .3s ease;transition:opacity .3s ease;border-radius:8px;font-size:13px;top:130px;left:-10px;width:140px;background:#be2626;background:linear-gradient(to bottom,#be2626,#a92222);padding:.5em 1.2em;color:white}.dropzone .dz-preview .dz-error-message:after{content:'';position:absolute;top:-6px;left:64px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #be2626}.vue-dropzone{border:2px solid #e5e5e5;font-family:'Arial',sans-serif;letter-spacing:.2px;color:#777;transition:background-color .2s linear}.vue-dropzone:hover{background-color:#f6f6f6}.vue-dropzone i{color:#CCC}.vue-dropzone .dz-preview .dz-image{border-radius:0;width:100%;height:100%}.vue-dropzone .dz-preview .dz-image img:not([src]){width:200px;height:200px}.vue-dropzone .dz-preview .dz-image:hover img{transform:none;-webkit-filter:none}.vue-dropzone .dz-preview .dz-details{bottom:0;top:0;color:white;background-color:rgba(33,150,243,0.8);transition:opacity .2s linear;text-align:left}.vue-dropzone .dz-preview .dz-details .dz-filename{overflow:hidden}.vue-dropzone .dz-preview .dz-details .dz-filename span,.vue-dropzone .dz-preview .dz-details .dz-size span{background-color:transparent}.vue-dropzone .dz-preview .dz-details .dz-filename:not(:hover) span{border:0}.vue-dropzone .dz-preview .dz-details .dz-filename:hover span{background-color:transparent;border:0}.vue-dropzone .dz-preview .dz-progress .dz-upload{background:#ccc}.vue-dropzone .dz-preview .dz-remove{position:absolute;z-index:30;color:white;margin-left:15px;padding:10px;top:inherit;bottom:15px;border:2px white solid;text-decoration:none;text-transform:uppercase;font-size:.8rem;font-weight:800;letter-spacing:1.1px;opacity:0}.vue-dropzone .dz-preview:hover .dz-remove{opacity:1}.vue-dropzone .dz-preview .dz-success-mark,.vue-dropzone .dz-preview .dz-error-mark{margin-left:auto;margin-top:auto;width:100%;top:35%;left:0}.vue-dropzone .dz-preview .dz-success-mark svg,.vue-dropzone .dz-preview .dz-error-mark svg{margin-left:auto;margin-right:auto}.vue-dropzone .dz-preview .dz-error-message{top:calc(15%);margin-left:auto;margin-right:auto;left:0;width:100%}.vue-dropzone .dz-preview .dz-error-message:after{bottom:-6px;top:initial;border-top:6px solid #a92222;border-bottom:0}", ""]);
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae

// exports


/***/ }),

<<<<<<< HEAD
/***/ 551:
=======
/***/ 321:
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
<<<<<<< HEAD
var _en, _bn;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin_locales_shared_i18n_setup__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue2_dropzone__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue2_dropzone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue2_dropzone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue2_dropzone_dist_vue2Dropzone_min_css__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue2_dropzone_dist_vue2Dropzone_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue2_dropzone_dist_vue2Dropzone_min_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
<<<<<<< HEAD
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            per_page: 10,
            menus: []
        };
    },

    watch: {
        '$route': function $route(route) {
            var app = this;
            if (window.innerWidth < 992) {
                if (app.$root.show_sidebar_left == false) {
                    app.$root.show_sidebar_left = true;
                }
            }
        }
    },
    created: function created() {
        /* Per Page */
        if (window.innerWidth <= 768) {
            this.per_page = 5;
        }

        /* Menu Items */
        this.menus = [{
            icon: 'icon-home',
            active: false,
            t_name: true, // translate_name
            name: 'home', // key_name
            url_to: { name: 'home' },
            per: [],
            submenu: []
        }, {
            icon: 'icon-gauge',
            active: false,
            t_name: true,
            name: 'summary',
            url_to: { name: 'mtSummary' },
            per: [],
            submenu: []
        }, {
            icon: 'icon-user',
            active: false,
            t_name: false,
            name: 'Users',
            url_to: null,
            per: ['user-view'],
            submenu: [{
                active: false,
                t_name: false,
                name: 'Users',
                url_to: { name: 'users', query: { page: 1, per_page: this.per_page } },
                per: ['user-view']
            }, {
                active: false,
                t_name: false,
                name: 'Roles',
                url_to: { name: 'roles', query: { page: 1, per_page: this.per_page } },
                per: ['user-role-view']
            }, {
                active: false,
                t_name: false,
                name: 'Permissions',
                url_to: { name: 'permissions', query: { page: 1, per_page: this.per_page } },
                per: ['user-permission-view']
            }, {
                active: false,
                t_name: false,
                name: 'Change Histories',
                url_to: { name: 'userChangeHistories', query: { page: 1, per_page: this.per_page } },
                per: ['user-permission-view']
            }]
        }, {
            icon: 'icon-database',
            active: false,
            t_name: false,
            name: 'Services',
            url_to: null,
            per: ['service-view'],
            submenu: [{
                active: false,
                t_name: false,
                name: 'Services',
                url_to: { name: 'mtServices', query: { page: 1, per_page: this.per_page } },
                per: ['service-view']
            }, {
                active: false,
                t_name: false,
                name: 'Providers',
                url_to: { name: 'mtProviders', query: { page: 1, per_page: this.per_page } },
                per: ['service-view']
            }, {
                active: false,
                t_name: false,
                name: 'Provider Category',
                url_to: { name: 'mtTaxonomies', params: { name: 'provider-category' }, query: { page: 1, per_page: this.per_page } },
                per: ['service-view']
            }]
        }, {
            icon: 'icon-bank',
            active: false,
            t_name: false,
            name: 'Banking Accounts',
            url_to: null,
            per: ['banking-account-view'],
            submenu: [{
                active: false,
                t_name: false,
                name: 'Banking Accounts',
                url_to: { name: 'mtBankingAccounts', query: { page: 1, per_page: this.per_page } },
                per: ['banking-account-view']
            }, {
                active: false,
                t_name: false,
                name: 'Banking Providers',
                url_to: { name: 'mtBankingProviders', query: { page: 1, per_page: this.per_page } },
                per: ['banking-account-view']
            }]
        }, {
            icon: 'icon-tasks',
            active: false,
            t_name: false,
            name: 'Sims',
            url_to: null,
            per: ['sim-view'],
            submenu: [{
                active: false,
                t_name: false,
                name: 'Sim Balances',
                url_to: { name: 'mtSimBalances', query: { page: 1, per_page: this.per_page } },
                per: ['sim-view']
            }, {
                active: false,
                t_name: false,
                name: 'Sims',
                url_to: { name: 'mtSims', query: { page: 1, per_page: this.per_page } },
                per: ['sim-view']
            }, {
                active: false,
                t_name: false,
                name: 'Sim Balance Histories',
                url_to: { name: 'mtSimBalanceHistories', query: { page: 1, per_page: this.per_page } },
                per: ['sim-view']
            }, {
                active: false,
                t_name: false,
                name: 'Sim Live Balance',
                url_to: { name: 'mtSimLiveBalances', query: { page: 1, per_page: this.per_page } },
                per: ['sim-view']
            }]
        }, {
            icon: 'icon-money',
            active: false,
            t_name: true,
            name: 'money_transfer',
            url_to: null,
            per: ['mobile-recharge-view'],
            submenu: [{
                active: false,
                t_name: true,
                name: 'mob_re',
                url_to: { name: 'mobileRecharges', query: { page: 1, per_page: this.per_page } },
                per: ['mobile-recharge-view']
            }, {
                active: false,
                t_name: true,
                name: 'mobile_banking',
                url_to: { name: 'mobileBankings', query: { page: 1, per_page: this.per_page } },
                per: ['mobile-banking-view']
            }, {
                active: false,
                t_name: true,
                name: 'cashout_mobile_banking',
                url_to: { name: 'mtCashoutMB', query: { page: 1, per_page: this.per_page } },
                per: ['cashout-banking-view']
            }, {
                active: false,
                t_name: true,
                name: 'due_amount',
                url_to: { name: 'mtMtDues', query: { page: 1, per_page: this.per_page } },
                per: ['due-amount-view']
            }, {
                active: false,
                t_name: true,
                name: 'contacts',
                url_to: { name: 'ctContacts', query: { page: 1, per_page: this.per_page } },
                per: ['due-amount-view']
            }, {
                active: false,
                t_name: true,
                name: 'contacts_category',
                url_to: { name: 'ctTaxonomies', params: { name: 'contact-category' }, query: { page: 1, per_page: this.per_page } },
                per: ['due-amount-view']
            }]
        }, {
            icon: 'icon-money',
            active: false,
            t_name: true,
            name: 'utility_bill_pay',
            url_to: null,
            per: ['utility-bill-view'],
            submenu: [{
                active: false,
                t_name: true,
                name: 'bill_pay',
                url_to: { name: 'mtUtilities', query: { page: 1, per_page: this.per_page } },
                per: ['utility-bill-view']
            }, {
                active: false,
                t_name: true,
                name: 'due_amount',
                url_to: { name: 'mtUtilityDues', query: { page: 1, per_page: this.per_page } },
                per: ['due-amount-view']
            }, {
                active: false,
                t_name: true,
                name: 'contacts',
                url_to: { name: 'ctUtilities', query: { page: 1, per_page: this.per_page } },
                per: ['utility-contact-view']
            }, {
                active: false,
                t_name: true,
                name: 'contacts_category',
                url_to: { name: 'ctTaxonomies', params: { name: 'utility-contact-category' }, query: { page: 1, per_page: this.per_page } },
                per: ['utility-contact-taxonomy-view']
            }]
        }, {
            icon: 'icon-share',
            active: false,
            t_name: true,
            name: 'balance_transfer',
            url_to: { name: 'acBalanceTransfer', query: { page: 1, per_page: this.per_page } },
            per: ['balance-transfer-view'],
            submenu: []
        }, {
            icon: 'icon-share',
            active: false,
            t_name: false,
            name: 'Balance Transfer Super',
            url_to: { name: 'acBalanceTransfer', query: { type: 1, page: 1, per_page: this.per_page } },
            per: ['balance-transfer-super'],
            submenu: []
        }, {
            icon: 'icon-bank',
            active: false,
            t_name: true,
            name: 'transfer_requests',
            url_to: { name: 'mtTransferRequests', query: { page: 1, per_page: this.per_page } },
            per: ['transfer-request-view'],
            submenu: []
        }, {
            icon: 'icon-mail',
            active: false,
            t_name: true,
            name: 'messages',
            url_to: { name: 'msgInbox', query: { page: 1, per_page: this.per_page } },
            per: ['message-view'],
            submenu: []
        }, {
            icon: 'icon-percent',
            active: false,
            t_name: true,
            name: 'referral_commissions',
            url_to: { name: 'mtReferralCommissions', query: { page: 1, per_page: this.per_page } },
            per: ['referral-view'],
            submenu: []
        }, {
            icon: 'icon-shopping-bag',
            active: false,
            t_name: false,
            name: 'Packages',
            url_to: null,
            per: ['package-view'],
            submenu: [{
                active: false,
                t_name: false,
                name: 'Internet',
                url_to: { name: 'mtPackData', params: { type: 'net' }, query: { page: 1, per_page: this.per_page } },
                per: ['package-view']
            }, {
                active: false,
                t_name: false,
                name: 'Minute',
                url_to: { name: 'mtPackData', params: { type: 'min' }, query: { page: 1, per_page: this.per_page } },
                per: ['package-view']
            }, {
                active: false,
                t_name: false,
                name: 'SMS',
                url_to: { name: 'mtPackData', params: { type: 'sms' }, query: { page: 1, per_page: this.per_page } },
                per: ['package-view']
            }, {
                active: false,
                t_name: false,
                name: 'Bundle',
                url_to: { name: 'mtPackData', params: { type: 'bundle' }, query: { page: 1, per_page: this.per_page } },
                per: ['package-view']
            }, {
                active: false,
                t_name: false,
                name: 'Sim',
                url_to: { name: 'mtPackData', params: { type: 'sim' }, query: { page: 1, per_page: this.per_page } },
                per: ['package-view']
            }]
        }, {
            icon: 'icon-percent',
            active: false,
            t_name: false,
            name: 'Com Custom Users',
            url_to: { name: 'mtCommissionCustomUsers', query: { page: 1, per_page: this.per_page } },
            per: ['commission-custom-user-view'],
            submenu: []
        }, {
            icon: 'icon-doc',
            active: false,
            t_name: false,
            name: 'Helps',
            url_to: null,
            per: ['help-view'],
            submenu: [{
                active: false,
                t_name: false,
                name: 'Helps',
                url_to: { name: 'mtHelps', query: { page: 1, per_page: this.per_page } },
                per: ['help-view']
            }, {
                active: false,
                t_name: false,
                name: 'Help Category',
                url_to: { name: 'mtHelpCats', params: { name: 'help-category' }, query: { page: 1, per_page: this.per_page } },
                per: ['help-view']
            }]
        }, {
            icon: 'icon-money',
            active: false,
            t_name: false,
            name: 'Transection Limits',
            url_to: null,
            per: ['geo-location-view'],
            submenu: [{
                active: false,
                t_name: false,
                name: 'Role Limits',
                url_to: { name: 'mtLimits', params: { name: 'role' }, query: { page: 1, per_page: this.per_page } },
                per: ['geo-location-view']
            }, {
                active: false,
                t_name: false,
                name: 'User Limits',
                url_to: { name: 'mtLimits', params: { name: 'user' }, query: { page: 1, per_page: this.per_page } },
                per: ['geo-location-view']
            }]
        }, {
            icon: 'icon-doc',
            active: false,
            t_name: false,
            name: 'Documents',
            url_to: null,
            per: ['doc-view'],
            submenu: [{
                active: false,
                t_name: false,
                name: 'Documents',
                url_to: { name: 'mtDocuments', query: { page: 1, per_page: this.per_page } },
                per: ['doc-view']
            }, {
                active: false,
                t_name: false,
                name: 'Doc Category',
                url_to: { name: 'mtDocumentCats', params: { name: 'doc-category' }, query: { page: 1, per_page: this.per_page } },
                per: ['doc-view']
            }]
        }, {
            icon: 'icon-doc',
            active: false,
            t_name: false,
            name: 'Notice Board',
            url_to: { name: 'nbNotices', query: { page: 1, per_page: this.per_page } },
            per: ['notice-view'],
            submenu: []
        }, {
            icon: 'icon-globe',
            active: false,
            t_name: false,
            name: 'Geo Locations',
            url_to: null,
            per: ['geo-location-view'],
            submenu: [{
                active: false,
                t_name: false,
                name: 'Geo Locations',
                url_to: { name: 'geoLocations', query: { page: 1, per_page: this.per_page } },
                per: ['geo-location-view']
            }, {
                active: false,
                t_name: false,
                name: 'Geo Country Stages',
                url_to: { name: 'geoCountryStages', query: { page: 1, per_page: this.per_page } },
                per: ['geo-location-view']
            }]
        }, {
            icon: 'icon-mail',
            active: false,
            t_name: false,
            name: 'Marketing',
            url_to: null,
            per: ['super-admin'],
            submenu: [{
                active: false,
                t_name: false,
                name: 'Provider Numbers',
                url_to: { name: 'mkProviderNumbers', query: { page: 1, per_page: this.per_page } },
                per: ['super-admin']
            }, {
                active: false,
                t_name: false,
                name: 'Generated Numbers',
                url_to: { name: 'mkGeneratedNumbers', query: { page: 1, per_page: this.per_page } },
                per: ['super-admin']
            }, {
                active: false,
                t_name: false,
                name: 'Providers',
                url_to: { name: 'mkProviders', query: { page: 1, per_page: this.per_page } },
                per: ['super-admin']
            }]
        }, {
            icon: 'icon-cogs',
            active: false,
            t_name: true,
            name: 'settings',
            url_to: { name: 'mtSettingProfile' },
            per: [],
            submenu: []
        }];

        var app = this;
        if (window.innerWidth < 992) {
            window.addEventListener('mouseup', function (e) {
                if (!document.querySelector('.sidebar').contains(e.target)) {
                    if (app.$root.show_sidebar_left == false) {
                        app.$root.show_sidebar_left = true;
                    }
                }
            });
        }
    },
=======


// add vue2Dropzonee


/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        vueDropzone: __WEBPACK_IMPORTED_MODULE_1_vue2_dropzone___default.a
    },
    props: ['id'],
    data: function data() {
        return {
            dateOptions: this.$store.state.dateOptions,
            dropzoneOptions: {
                url: '/api/v1/medias',
                thumbnailWidth: 300,
                thumbnailHeight: 300,
                maxFiles: 5, // number of files
                maxFilesize: .5, // MB
                // addRemoveLinks: true,
                acceptedFiles: ".jpeg,.jpg,.png",
                // dictRemoveFile: 'Remove file',
                dictFileTooBig: 'Image is larger than 512KB',
                dictDefaultMessage: this.$t('dict_default_message'),
                headers: {
                    "X-CSRF-TOKEN": document.head.querySelector('meta[name="csrf-token"]').content
                    //"Accept": "application/json",  
                    //"file_category": "avatar", 
                }
            },
            medias: {},
            img_dir: null,
            selected_id: '',
            noData: '',
            preloader: true
        };
    },

    watch: {},
    created: function created() {},
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
    mounted: function mounted() {
        this.$root.popupModal();
    },
    updated: function updated() {
        this.$root.dropdownModal();
    },

    methods: {
<<<<<<< HEAD
        checkPer: function checkPer(per) {
            if (!per.length) {
                return true;
            } else {
                var per_lists = this.$root.user_permissions;
                var checker = function checker(arr, target) {
                    return target.every(function (v) {
                        return arr.includes(v);
                    });
                };
                return checker(per_lists, per);
=======
        afterComplete: function afterComplete(file) {
            this.getMediaLists();
        },
        onSelectImage: function onSelectImage(data) {
            this.selected_id = data.id;
            this.$emit('select-image', data);
        },
        activeClass: function activeClass(id) {
            return this.selected_id == id ? 'file-seleted' : '';
        },
        getMediaLists: function getMediaLists() {
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

            app.preloader = true;

            axios.get('/api/v1/medias?' + queryString).then(function (resp) {
                app.preloader = false;

                app.medias = resp.data.medias;
                app.img_dir = resp.data.img_dir;

                if (app.medias.data.length == 0) {
                    app.noData = app.$store.state.noData;
                } else {
                    app.noData = '';
                }
            }).catch(function (resp) {
                app.$store.commit('errorMessages', resp);
            });
        },
        deleteEntry: function deleteEntry(id, index) {
            var app = this;
            if (confirm(app.$store.state.confirmDel)) {
                axios.delete('/api/v1/medias/' + id).then(function (resp) {
                    app.medias.data.splice(index, 1);
                    app.$store.commit('submitMsg', 'delete');
                }).catch(function (resp) {
                    app.$store.commit('errorMessages', resp);
                });
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
            }
        }
    }, //methods
    i18n: { // `i18n` option, setup locale info for component
        messages: {
<<<<<<< HEAD
            en: (_en = {
                home: 'Home',
                summary: 'Summary',
                money_transfer: 'Money Transfer',
                mob_re: 'Mobile Recharge',
                mobile_banking: 'Mobile Banking',
                cashout_mobile_banking: 'CashOut Mobile Banking',
                due_amount: 'Due Amount',
                contacts: 'Contacts',
                contacts_category: 'Contacts Category'
            }, _defineProperty(_en, 'mobile_banking', 'Mobile Banking'), _defineProperty(_en, 'utility_bill_pay', 'Utility Bill Pay'), _defineProperty(_en, 'bill_pay', 'Bill Pay'), _defineProperty(_en, 'balance_transfer', 'Balance Transfer'), _defineProperty(_en, 'transfer_requests', 'Transfer Requests'), _defineProperty(_en, 'messages', 'Messages'), _defineProperty(_en, 'referral_commissions', 'Referral Commissions'), _defineProperty(_en, 'settings', 'Settings'), _defineProperty(_en, 'profile', 'Profile'), _defineProperty(_en, 'sign_out', 'Sign out'), _en),
            bn: (_bn = {
                home: 'বাড়ি',
                summary: 'সারাংশ',
                money_transfer: 'টাকা ট্রান্সফার',
                mob_re: 'মোবাইল রিচার্জ',
                mobile_banking: 'মোবাইল ব্যাংকিং',
                cashout_mobile_banking: 'ক্যাশআউট মোবাইল ব্যাংকিং',
                due_amount: 'বাকি টাকা',
                contacts: 'ফোনবুক',
                contacts_category: 'ফোনবুক শ্রেনী'
            }, _defineProperty(_bn, 'mobile_banking', 'মোবাইল ব্যাংকিং'), _defineProperty(_bn, 'utility_bill_pay', 'প্রয়োজনীয় বিল প্রদান'), _defineProperty(_bn, 'bill_pay', 'বিল প্রদান'), _defineProperty(_bn, 'balance_transfer', 'ব্যালেন্স ট্রান্সফার'), _defineProperty(_bn, 'transfer_requests', 'ট্রান্সফার অনুরোধ'), _defineProperty(_bn, 'messages', 'মেসেজ'), _defineProperty(_bn, 'referral_commissions', 'রেফারেল কমিশন'), _defineProperty(_bn, 'settings', 'সেটিং'), _defineProperty(_bn, 'profile', 'প্রোফাইল'), _defineProperty(_bn, 'sign_out', 'বাহির হন'), _bn)
        }
=======
            en: {
                insert_new_media: 'Create Or Insert New Media',
                uplode_media: 'upload Media',
                media_list: 'Media List',
                dict_default_message: 'Drop files here or click to upload'
            },
            bn: {
                insert_new_media: 'নতুন মিডিয়া সংযুক্ত করুন',
                uplode_media: 'মিডিয়া আপলোড করুন',
                media_list: 'মিডিয়া তালিকা',
                dict_default_message: 'এখানে ফাইল দিন অথবা আপলোড করুন'
            }
        },
        sharedMessages: __WEBPACK_IMPORTED_MODULE_0__admin_locales_shared_i18n_setup__["a" /* default */]
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
    } //export default

});

/***/ }),

<<<<<<< HEAD
/***/ 552:
=======
/***/ 322:
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
<<<<<<< HEAD
  return _c("div", { staticClass: "component" }, [
    _c(
      "nav",
      {
        staticClass: "home sidebar light",
        class: { "active left": !_vm.$root.show_sidebar_left }
      },
      [
        _c("div", { staticClass: "sidebar-header light" }, [
          _c(
            "h3",
            [
              _c(
                "router-link",
                { staticClass: "brand-link", attrs: { to: { name: "home" } } },
                [
                  _c("img", {
                    staticClass: "brand-image img-circle elevation-3",
                    staticStyle: { opacity: ".8" },
                    attrs: { src: "/default/imgs/logo.png", alt: "" }
                  }),
                  _vm._v(" "),
                  _c("span", { staticClass: "brand-text font-weight-light" }, [
                    _vm._v("Money Transfer")
                  ])
                ]
              )
            ],
            1
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "sidebar-scroll-content" }, [
          _c(
            "div",
            { staticClass: "dropdown", attrs: { "data-toggle": "dropdown" } },
            [
              _c("ul", { staticClass: "dropdown-menu" }, [
                _c("li", { staticClass: "user-header pelorous clearfix" }, [
                  _c("img", {
                    staticClass: "user-image",
                    attrs: { src: _vm.$root.profile.image, alt: "User Image" }
                  }),
                  _vm._v(" "),
                  _c("p", { staticClass: "clearfix" }, [
                    _vm._v(
                      "\n                            " +
                        _vm._s(_vm.$root.profile.name) +
                        " "
                    ),
                    _c("br"),
                    _vm._v(" "),
                    _c("small", [
                      _vm._v(_vm._s(_vm.$root.profile.role) + " Account")
                    ]),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c("small", [
                      _vm._v("Member since " + _vm._s(_vm.$root.profile.since))
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "user-footer clearfix" }, [
                  _c(
                    "div",
                    { staticClass: "float-left" },
                    [
                      _c(
                        "router-link",
                        {
                          staticClass: "btn btn-default btn-flat bg-gray",
                          attrs: { to: { name: "mtSettingProfile" } }
                        },
                        [
                          _vm._v(
                            "\n                                " +
                              _vm._s(_vm.$t("profile")) +
                              "\n                            "
                          )
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "float-right" }, [
                    _c(
                      "a",
                      {
                        staticClass: "btn btn-default btn-flat bg-gray",
                        attrs: { href: "#" },
                        on: {
                          click: function($event) {
                            _vm.$root.logout()
                          }
                        }
                      },
                      [_vm._v(_vm._s(_vm.$t("sign_out")))]
=======
  return _c(
    "div",
    { staticClass: "modal media-modal fade", attrs: { id: _vm.id } },
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
              _c("h5", { staticClass: "modal-title" }, [
                _vm._v(_vm._s(_vm.$t("insert_new_media")))
              ]),
              _vm._v(" "),
              _vm._m(0)
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [
              _c("div", { staticClass: "tab-area" }, [
                _c(
                  "ul",
                  { staticClass: "nav nav-tabs", attrs: { role: "tablist" } },
                  [
                    _c("li", { staticClass: "nav-item" }, [
                      _c(
                        "a",
                        {
                          staticClass: "nav-link active",
                          attrs: {
                            "data-toggle": "tab",
                            href: "#upload-media" + _vm.id,
                            role: "tab",
                            "aria-controls": "upload-media",
                            "aria-selected": "true"
                          }
                        },
                        [_vm._v(_vm._s(_vm.$t("uplode_media")))]
                      )
                    ]),
                    _vm._v(" "),
                    _c("li", { staticClass: "nav-item" }, [
                      _c(
                        "a",
                        {
                          staticClass: "nav-link",
                          attrs: {
                            "data-toggle": "tab",
                            href: "#media-list" + _vm.id,
                            role: "tab",
                            "aria-controls": "media-list",
                            "aria-selected": "false"
                          },
                          on: {
                            click: function($event) {
                              _vm.getMediaLists()
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.$t("media_list")))]
                      )
                    ])
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "tab-content",
                    attrs: { id: "mediaTabContent" }
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "tab-pane fade show active",
                        attrs: { id: "upload-media" + _vm.id, role: "tabpanel" }
                      },
                      [
                        _c("br"),
                        _vm._v(" "),
                        _c("vue-dropzone", {
                          ref: "myVueDropzone",
                          attrs: {
                            id: "dropzone" + _vm.id,
                            options: _vm.dropzoneOptions
                          },
                          on: { "vdropzone-complete": _vm.afterComplete }
                        }),
                        _vm._v(" "),
                        _c("br")
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "tab-pane fade",
                        attrs: { id: "media-list" + _vm.id, role: "tabpanel" }
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "media-list" },
                          [
                            _vm.preloader
                              ? [_c("preloader")]
                              : _c("div", { staticClass: "row" }, [
                                  _c(
                                    "div",
                                    { staticClass: "card-columns" },
                                    _vm._l(_vm.medias.data, function(
                                      media,
                                      index
                                    ) {
                                      return _c(
                                        "div",
                                        {
                                          staticClass: "card",
                                          class: _vm.activeClass(media.id)
                                        },
                                        [
                                          _c("img", {
                                            staticClass: "card-img-top",
                                            attrs: {
                                              src:
                                                _vm.img_dir + media.resized_name
                                            },
                                            on: {
                                              click: function($event) {
                                                _vm.onSelectImage(media)
                                              }
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "card-body" },
                                            [
                                              _c(
                                                "p",
                                                {
                                                  staticClass:
                                                    "card-text text-center"
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      media.original_name.substr(
                                                        0,
                                                        20
                                                      ) + "..."
                                                    ) + " "
                                                  ),
                                                  _c("br")
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "p",
                                                {
                                                  staticClass:
                                                    "float-right text-danger cursor-pointer",
                                                  on: {
                                                    click: function($event) {
                                                      _vm.deleteEntry(
                                                        media.id,
                                                        index
                                                      )
                                                    }
                                                  }
                                                },
                                                [
                                                  _c("i", {
                                                    staticClass:
                                                      "icon-trash-empty"
                                                  })
                                                ]
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    })
                                  )
                                ]),
                            _vm._v(" "),
                            _vm.noData
                              ? [
                                  _c("tr", {
                                    staticClass: "bg-white",
                                    domProps: { innerHTML: _vm._s(_vm.noData) }
                                  })
                                ]
                              : _vm._e(),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "table-actions" },
                              [
                                _c("pagination", {
                                  attrs: { data: _vm.medias, limit: 2 },
                                  on: {
                                    "pagination-change-page": _vm.getMediaLists
                                  }
                                })
                              ],
                              1
                            )
                          ],
                          2
                        )
                      ]
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
                    )
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "user-panel" }, [
                _c("div", { staticClass: "float-left image" }, [
                  _c("img", {
                    staticClass: "img-circle user-img",
                    attrs: { src: _vm.$root.profile.image, alt: "User Image" }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "info" }, [
                  _c("p", [
                    _c("span", { staticClass: "user-name" }, [
                      _vm._v(_vm._s(_vm.$root.profile.name))
                    ]),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c("i", {
                      staticClass: "icon-money",
                      attrs: { "aria-hidden": "true" }
                    }),
                    _vm._v(" "),
                    _c("span", { attrs: { id: "user-balance" } }, [
                      _vm._v(_vm._s(_vm.$root.profile.balance))
                    ])
                  ])
                ])
              ])
<<<<<<< HEAD
            ]
          ),
          _vm._v(" "),
          _c(
            "ul",
            { staticClass: "sidebar-menu" },
            [
              _vm._l(_vm.menus, function(menu, key) {
                return [
                  !menu.submenu.length
                    ? [
                        _vm.checkPer(menu.per)
                          ? _c(
                              "li",
                              { staticClass: "menu-item" },
                              [
                                _c(
                                  "router-link",
                                  { attrs: { to: menu.url_to } },
                                  [
                                    _c("i", {
                                      class: menu.icon,
                                      attrs: { "aria-hidden": "true" }
                                    }),
                                    _vm._v(" "),
                                    _c("span", [
                                      _vm._v(
                                        _vm._s(
                                          menu.t_name
                                            ? _vm.$t(menu.name)
                                            : menu.name
                                        )
                                      )
                                    ])
                                  ]
                                )
                              ],
                              1
                            )
                          : _vm._e()
                      ]
                    : [
                        _vm.checkPer(menu.per)
                          ? _c(
                              "li",
                              { staticClass: "menu-item" },
                              [
                                _c(
                                  "a",
                                  {
                                    class: { "menu-active": menu.active },
                                    attrs: { href: "#" },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        menu.active = !menu.active
                                      }
                                    }
                                  },
                                  [
                                    _c("i", {
                                      class: menu.icon,
                                      attrs: { "aria-hidden": "true" }
                                    }),
                                    _vm._v(" "),
                                    _c("span", [
                                      _vm._v(
                                        _vm._s(
                                          menu.t_name
                                            ? _vm.$t(menu.name)
                                            : menu.name
                                        )
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c("i", {
                                      staticClass: "icon-angle-down right",
                                      class: { roted: menu.active },
                                      attrs: { "aria-hidden": "true" }
                                    })
                                  ]
                                ),
                                _vm._v(" "),
                                _c("transition", { attrs: { name: "slide" } }, [
                                  menu.active
                                    ? _c(
                                        "ul",
                                        { staticClass: "sub-menu" },
                                        [
                                          _vm._l(menu.submenu, function(
                                            submenu,
                                            subkey
                                          ) {
                                            return [
                                              _vm.checkPer(submenu.per)
                                                ? _c(
                                                    "li",
                                                    [
                                                      _c(
                                                        "router-link",
                                                        {
                                                          attrs: {
                                                            to: submenu.url_to
                                                          }
                                                        },
                                                        [
                                                          _c("i", {
                                                            staticClass:
                                                              "icon-circle-empty",
                                                            attrs: {
                                                              "aria-hidden":
                                                                "true"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("span", [
                                                            _vm._v(
                                                              _vm._s(
                                                                submenu.t_name
                                                                  ? _vm.$t(
                                                                      submenu.name
                                                                    )
                                                                  : submenu.name
                                                              )
                                                            )
                                                          ])
                                                        ]
                                                      )
                                                    ],
                                                    1
                                                  )
                                                : _vm._e()
                                            ]
                                          })
                                        ],
                                        2
                                      )
                                    : _vm._e()
                                ])
                              ],
                              1
                            )
                          : _vm._e()
                      ]
                ]
              })
            ],
            2
          )
        ])
      ]
    )
  ])
}
var staticRenderFns = []
=======
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-footer" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-secondary",
                  attrs: { type: "button", "data-dismiss": "modal" }
                },
                [_vm._v(_vm._s(_vm.$t("close")))]
              )
            ])
          ])
        ]
      )
    ]
  )
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
  }
]
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
<<<<<<< HEAD
    require("vue-hot-reload-api")      .rerender("data-v-17d8bdd0", module.exports)
=======
    require("vue-hot-reload-api")      .rerender("data-v-d913e080", module.exports)
>>>>>>> 85288fe432993c21c2fccdde83ea94259bc59bae
  }
}

/***/ })

});