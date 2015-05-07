var Video=Backbone.Model.extend({idAttributes:"_id",defaults:{title:"Why Internet Explorer is the best",videoSrc:"",notes:[{time:0,note:""}]}}),VideoList=Backbone.Collection.extend({model:Video,url:"/videos"}),VideoListView=Backbone.View.extend({template:Handlebars.compile($("#video-list").html()),initialize:function(){this.setElement(this.template(this.attributes)),this.listenTo(this.collection,"all",this.render)},render:function(){var n=this.collection.map(function(n){var t=new VideoView({model:n});return t.render(),t.el});this.$(".videos").empty().append(n)}}),VideoView=Backbone.View.extend({template:Handlebars.compile($("#video-tpl").html()),render:function(){this.setElement(this.template(this.model.toJSON()))},events:{"click .deleteVideo":"deleteVideo"},deleteVideo:function(){console.log(this.model.attributes._id),this.model.destroy()}});!function n(t,e,r){function i(u,a){if(!e[u]){if(!t[u]){var c="function"==typeof require&&require;if(!a&&c)return c(u,!0);if(o)return o(u,!0);var l=new Error("Cannot find module '"+u+"'");throw l.code="MODULE_NOT_FOUND",l}var f=e[u]={exports:{}};t[u][0].call(f.exports,function(n){var e=t[u][1][n];return i(e?e:n)},f,f.exports,n,t,e,r)}return e[u].exports}for(var o="function"==typeof require&&require,u=0;u<r.length;u++)i(r[u]);return i}({1:[function(n){var t=n("./modules/Helper"),e=(n("async"),n("underscore"),new VideoList);e.reset(bootstrappedVideos);var r=new VideoListView({attributes:{title:"Video Quick View"},collection:e}),i='<form id="submit-note">		<textarea name="note" class="new-note" placeholder="Note..."></textarea>		<button class="cancel-note btn btn-danger">Cancel</button>		<button type="submit" class="btn btn-primary pull-right submit-note-btn">Save</button>	<form>',o='<button class="btn btn-success popover-btn edit-note">Edit  </button>    <button class="btn btn-danger popover-btn delete-note">Delete</button>    <button id="close-popover" data-toggle="clickover" class="btn btn-small btn-primary popover-btn" onclick="$(&quot;.note-row&quot;).popover(&quot;hide&quot;);">Close</button>';$(function(){r.render(),$("body").append(r.el);var n=function(){};n.prototype.init=function(){var n=this,t=$(".container .video-note-container");t.each(function(){n.setVideo($(this))})},n.prototype.setVideo=function(n){var t=this,e=n.find("video"),r=e.attr("id"),i=n.find(".theater-mode"),o=n.find(".video-control-center");i.on("click",function(){t.enableTheaterMode(e)}),o.each(function(){t.setUtility($(this),r)})},n.prototype.enableTheaterMode=function(n){console.log(n)},n.prototype.setUtility=function(n,t){var e=n.find(".list-notes"),r=e.find(".note-row"),i=r.attr("id"),u=e.find(".delete-note");r.on("click",function(n){n.preventDefault(),$(this).popover({animation:!0,content:o,placement:"left",html:!0})}),console.log(u),u.length>0&&u.on("click",function(){console.log("Test"),$.post("/deleteNote",{id:i,videoId:t},function(n){console.log("responseData",n.success),n.success===!0&&($(".popover").remove(),r.remove())})})};var e=new n;e.init(),$("#username-input").focus(),$(document).ready(function(){$(".splash-logo").removeClass("hidden"),$(".splash-logo").fadeIn(3e3)}),$(document).on("click",".edit-note",function(n){n.preventDefault();var t=$(this).closest("li"),e=t.find("video"),r=e.attr("id"),i=$(this).parent(),o=i.parent().prev().attr("id"),u='<form id="edit-note">			<textarea id="edit-note-form" name="editNoteForm" cols="37" rows="8"></textarea>			<input type="submit" class="btn btn-default">		</form>';$(i).append(u);var a="/getNote/"+r+"-"+o,c=$("#edit-note-form");$.get(a,function(n){c.val(n)}),$(document).on("submit","#edit-note",function(n){n.preventDefault();var t="updateNote/"+r+"-"+o,e=$("#edit-note"),u=e.find("[name=editNoteForm]").val(),a={note:u};$.post(t,a,function(n){i.parent().prev().find("p").text(n.note);$(".popover").remove()})})}),$(document).on("click",".toggle-new-note",function(){var n=$(this).closest("li"),e=n.find("video"),r=e.attr("id"),o=document.getElementById(r);o.pause();var u=n.find("table.list-notes");u.prepend(i),$(document).on("click",".cancel-note",function(n){n.preventDefault(),$("#submit-note").remove()}),$(document).on("submit","#submit-note",function(n){n.preventDefault(),n.stopPropagation();var e=$(this).find("textarea").val(),i=$(this).closest("table"),u=o.currentTime,a=t.timeConvert(u);$.post("/saveNote",{id:r,note:e,time:u,displayTime:a},function(n){var e=t.renderNote(n);i.append(e)}),this.remove(),o.play()})}),$(document).on("click",".deleteVideo",function(){var n=$(this).closest("li"),t=n.attr("data-video-container");$.post("/deleteVideo",{id:t},function(t){console.log("responseData: ",t),t.success===!0&&n.remove()})}),$(document).on("click",".set-time",function(n){n.stopPropagation();var t=$(this).closest("li"),e=t.find("video"),r=e.attr("id"),i=document.getElementById(r),o=$(this).attr("data-set-time");i.currentTime=Number(o),console.log(this),console.log(o)})})},{"./modules/Helper":5,async:2,underscore:4}],2:[function(n,t){(function(n){!function(){function e(n){var t=!1;return function(){if(t)throw new Error("Callback was already called.");t=!0,n.apply(r,arguments)}}var r,i,o={};r=this,null!=r&&(i=r.async),o.noConflict=function(){return r.async=i,o};var u=Object.prototype.toString,a=Array.isArray||function(n){return"[object Array]"===u.call(n)},c=function(n,t){if(n.forEach)return n.forEach(t);for(var e=0;e<n.length;e+=1)t(n[e],e,n)},l=function(n,t){if(n.map)return n.map(t);var e=[];return c(n,function(n,r,i){e.push(t(n,r,i))}),e},f=function(n,t,e){return n.reduce?n.reduce(t,e):(c(n,function(n,r,i){e=t(e,n,r,i)}),e)},s=function(n){if(Object.keys)return Object.keys(n);var t=[];for(var e in n)n.hasOwnProperty(e)&&t.push(e);return t};"undefined"!=typeof n&&n.nextTick?(o.nextTick=n.nextTick,o.setImmediate="undefined"!=typeof setImmediate?function(n){setImmediate(n)}:o.nextTick):"function"==typeof setImmediate?(o.nextTick=function(n){setImmediate(n)},o.setImmediate=o.nextTick):(o.nextTick=function(n){setTimeout(n,0)},o.setImmediate=o.nextTick),o.each=function(n,t,r){function i(t){t?(r(t),r=function(){}):(o+=1,o>=n.length&&r())}if(r=r||function(){},!n.length)return r();var o=0;c(n,function(n){t(n,e(i))})},o.forEach=o.each,o.eachSeries=function(n,t,e){if(e=e||function(){},!n.length)return e();var r=0,i=function(){t(n[r],function(t){t?(e(t),e=function(){}):(r+=1,r>=n.length?e():i())})};i()},o.forEachSeries=o.eachSeries,o.eachLimit=function(n,t,e,r){var i=p(t);i.apply(null,[n,e,r])},o.forEachLimit=o.eachLimit;var p=function(n){return function(t,e,r){if(r=r||function(){},!t.length||0>=n)return r();var i=0,o=0,u=0;!function a(){if(i>=t.length)return r();for(;n>u&&o<t.length;)o+=1,u+=1,e(t[o-1],function(n){n?(r(n),r=function(){}):(i+=1,u-=1,i>=t.length?r():a())})}()}},d=function(n){return function(){var t=Array.prototype.slice.call(arguments);return n.apply(null,[o.each].concat(t))}},v=function(n,t){return function(){var e=Array.prototype.slice.call(arguments);return t.apply(null,[p(n)].concat(e))}},h=function(n){return function(){var t=Array.prototype.slice.call(arguments);return n.apply(null,[o.eachSeries].concat(t))}},m=function(n,t,e,r){if(t=l(t,function(n,t){return{index:t,value:n}}),r){var i=[];n(t,function(n,t){e(n.value,function(e,r){i[n.index]=r,t(e)})},function(n){r(n,i)})}else n(t,function(n,t){e(n.value,function(n){t(n)})})};o.map=d(m),o.mapSeries=h(m),o.mapLimit=function(n,t,e,r){return y(t)(n,e,r)};var y=function(n){return v(n,m)};o.reduce=function(n,t,e,r){o.eachSeries(n,function(n,r){e(t,n,function(n,e){t=e,r(n)})},function(n){r(n,t)})},o.inject=o.reduce,o.foldl=o.reduce,o.reduceRight=function(n,t,e,r){var i=l(n,function(n){return n}).reverse();o.reduce(i,t,e,r)},o.foldr=o.reduceRight;var g=function(n,t,e,r){var i=[];t=l(t,function(n,t){return{index:t,value:n}}),n(t,function(n,t){e(n.value,function(e){e&&i.push(n),t()})},function(){r(l(i.sort(function(n,t){return n.index-t.index}),function(n){return n.value}))})};o.filter=d(g),o.filterSeries=h(g),o.select=o.filter,o.selectSeries=o.filterSeries;var b=function(n,t,e,r){var i=[];t=l(t,function(n,t){return{index:t,value:n}}),n(t,function(n,t){e(n.value,function(e){e||i.push(n),t()})},function(){r(l(i.sort(function(n,t){return n.index-t.index}),function(n){return n.value}))})};o.reject=d(b),o.rejectSeries=h(b);var k=function(n,t,e,r){n(t,function(n,t){e(n,function(e){e?(r(n),r=function(){}):t()})},function(){r()})};o.detect=d(k),o.detectSeries=h(k),o.some=function(n,t,e){o.each(n,function(n,r){t(n,function(n){n&&(e(!0),e=function(){}),r()})},function(){e(!1)})},o.any=o.some,o.every=function(n,t,e){o.each(n,function(n,r){t(n,function(n){n||(e(!1),e=function(){}),r()})},function(){e(!0)})},o.all=o.every,o.sortBy=function(n,t,e){o.map(n,function(n,e){t(n,function(t,r){t?e(t):e(null,{value:n,criteria:r})})},function(n,t){if(n)return e(n);var r=function(n,t){var e=n.criteria,r=t.criteria;return r>e?-1:e>r?1:0};e(null,l(t.sort(r),function(n){return n.value}))})},o.auto=function(n,t){t=t||function(){};var e=s(n),r=e.length;if(!r)return t();var i={},u=[],l=function(n){u.unshift(n)},p=function(n){for(var t=0;t<u.length;t+=1)if(u[t]===n)return void u.splice(t,1)},d=function(){r--,c(u.slice(0),function(n){n()})};l(function(){if(!r){var n=t;t=function(){},n(null,i)}}),c(e,function(e){var r=a(n[e])?n[e]:[n[e]],u=function(n){var r=Array.prototype.slice.call(arguments,1);if(r.length<=1&&(r=r[0]),n){var u={};c(s(i),function(n){u[n]=i[n]}),u[e]=r,t(n,u),t=function(){}}else i[e]=r,o.setImmediate(d)},v=r.slice(0,Math.abs(r.length-1))||[],h=function(){return f(v,function(n,t){return n&&i.hasOwnProperty(t)},!0)&&!i.hasOwnProperty(e)};if(h())r[r.length-1](u,i);else{var m=function(){h()&&(p(m),r[r.length-1](u,i))};l(m)}})},o.retry=function(n,t,e){var r=5,i=[];"function"==typeof n&&(e=t,t=n,n=r),n=parseInt(n,10)||r;var u=function(r,u){for(var a=function(n,t){return function(e){n(function(n,r){e(!n||t,{err:n,result:r})},u)}};n;)i.push(a(t,!(n-=1)));o.series(i,function(n,t){t=t[t.length-1],(r||e)(t.err,t.result)})};return e?u():u},o.waterfall=function(n,t){if(t=t||function(){},!a(n)){var e=new Error("First argument to waterfall must be an array of functions");return t(e)}if(!n.length)return t();var r=function(n){return function(e){if(e)t.apply(null,arguments),t=function(){};else{var i=Array.prototype.slice.call(arguments,1),u=n.next();i.push(u?r(u):t),o.setImmediate(function(){n.apply(null,i)})}}};r(o.iterator(n))()};var x=function(n,t,e){if(e=e||function(){},a(t))n.map(t,function(n,t){n&&n(function(n){var e=Array.prototype.slice.call(arguments,1);e.length<=1&&(e=e[0]),t.call(null,n,e)})},e);else{var r={};n.each(s(t),function(n,e){t[n](function(t){var i=Array.prototype.slice.call(arguments,1);i.length<=1&&(i=i[0]),r[n]=i,e(t)})},function(n){e(n,r)})}};o.parallel=function(n,t){x({map:o.map,each:o.each},n,t)},o.parallelLimit=function(n,t,e){x({map:y(t),each:p(t)},n,e)},o.series=function(n,t){if(t=t||function(){},a(n))o.mapSeries(n,function(n,t){n&&n(function(n){var e=Array.prototype.slice.call(arguments,1);e.length<=1&&(e=e[0]),t.call(null,n,e)})},t);else{var e={};o.eachSeries(s(n),function(t,r){n[t](function(n){var i=Array.prototype.slice.call(arguments,1);i.length<=1&&(i=i[0]),e[t]=i,r(n)})},function(n){t(n,e)})}},o.iterator=function(n){var t=function(e){var r=function(){return n.length&&n[e].apply(null,arguments),r.next()};return r.next=function(){return e<n.length-1?t(e+1):null},r};return t(0)},o.apply=function(n){var t=Array.prototype.slice.call(arguments,1);return function(){return n.apply(null,t.concat(Array.prototype.slice.call(arguments)))}};var w=function(n,t,e,r){var i=[];n(t,function(n,t){e(n,function(n,e){i=i.concat(e||[]),t(n)})},function(n){r(n,i)})};o.concat=d(w),o.concatSeries=h(w),o.whilst=function(n,t,e){n()?t(function(r){return r?e(r):void o.whilst(n,t,e)}):e()},o.doWhilst=function(n,t,e){n(function(r){if(r)return e(r);var i=Array.prototype.slice.call(arguments,1);t.apply(null,i)?o.doWhilst(n,t,e):e()})},o.until=function(n,t,e){n()?e():t(function(r){return r?e(r):void o.until(n,t,e)})},o.doUntil=function(n,t,e){n(function(r){if(r)return e(r);var i=Array.prototype.slice.call(arguments,1);t.apply(null,i)?e():o.doUntil(n,t,e)})},o.queue=function(n,t){function r(n,t,e,r){return n.started||(n.started=!0),a(t)||(t=[t]),0==t.length?o.setImmediate(function(){n.drain&&n.drain()}):void c(t,function(t){var i={data:t,callback:"function"==typeof r?r:null};e?n.tasks.unshift(i):n.tasks.push(i),n.saturated&&n.tasks.length===n.concurrency&&n.saturated(),o.setImmediate(n.process)})}void 0===t&&(t=1);var i=0,u={tasks:[],concurrency:t,saturated:null,empty:null,drain:null,started:!1,paused:!1,push:function(n,t){r(u,n,!1,t)},kill:function(){u.drain=null,u.tasks=[]},unshift:function(n,t){r(u,n,!0,t)},process:function(){if(!u.paused&&i<u.concurrency&&u.tasks.length){var t=u.tasks.shift();u.empty&&0===u.tasks.length&&u.empty(),i+=1;var r=function(){i-=1,t.callback&&t.callback.apply(t,arguments),u.drain&&u.tasks.length+i===0&&u.drain(),u.process()},o=e(r);n(t.data,o)}},length:function(){return u.tasks.length},running:function(){return i},idle:function(){return u.tasks.length+i===0},pause:function(){u.paused!==!0&&(u.paused=!0,u.process())},resume:function(){u.paused!==!1&&(u.paused=!1,u.process())}};return u},o.priorityQueue=function(n,t){function e(n,t){return n.priority-t.priority}function r(n,t,e){for(var r=-1,i=n.length-1;i>r;){var o=r+(i-r+1>>>1);e(t,n[o])>=0?r=o:i=o-1}return r}function i(n,t,i,u){return n.started||(n.started=!0),a(t)||(t=[t]),0==t.length?o.setImmediate(function(){n.drain&&n.drain()}):void c(t,function(t){var a={data:t,priority:i,callback:"function"==typeof u?u:null};n.tasks.splice(r(n.tasks,a,e)+1,0,a),n.saturated&&n.tasks.length===n.concurrency&&n.saturated(),o.setImmediate(n.process)})}var u=o.queue(n,t);return u.push=function(n,t,e){i(u,n,t,e)},delete u.unshift,u},o.cargo=function(n,t){var e=!1,r=[],i={tasks:r,payload:t,saturated:null,empty:null,drain:null,drained:!0,push:function(n,e){a(n)||(n=[n]),c(n,function(n){r.push({data:n,callback:"function"==typeof e?e:null}),i.drained=!1,i.saturated&&r.length===t&&i.saturated()}),o.setImmediate(i.process)},process:function u(){if(!e){if(0===r.length)return i.drain&&!i.drained&&i.drain(),void(i.drained=!0);var o="number"==typeof t?r.splice(0,t):r.splice(0,r.length),a=l(o,function(n){return n.data});i.empty&&i.empty(),e=!0,n(a,function(){e=!1;var n=arguments;c(o,function(t){t.callback&&t.callback.apply(null,n)}),u()})}},length:function(){return r.length},running:function(){return e}};return i};var A=function(n){return function(t){var e=Array.prototype.slice.call(arguments,1);t.apply(null,e.concat([function(t){var e=Array.prototype.slice.call(arguments,1);"undefined"!=typeof console&&(t?console.error&&console.error(t):console[n]&&c(e,function(t){console[n](t)}))}]))}};o.log=A("log"),o.dir=A("dir"),o.memoize=function(n,t){var e={},r={};t=t||function(n){return n};var i=function(){var i=Array.prototype.slice.call(arguments),u=i.pop(),a=t.apply(null,i);a in e?o.nextTick(function(){u.apply(null,e[a])}):a in r?r[a].push(u):(r[a]=[u],n.apply(null,i.concat([function(){e[a]=arguments;var n=r[a];delete r[a];for(var t=0,i=n.length;i>t;t++)n[t].apply(null,arguments)}])))};return i.memo=e,i.unmemoized=n,i},o.unmemoize=function(n){return function(){return(n.unmemoized||n).apply(null,arguments)}},o.times=function(n,t,e){for(var r=[],i=0;n>i;i++)r.push(i);return o.map(r,t,e)},o.timesSeries=function(n,t,e){for(var r=[],i=0;n>i;i++)r.push(i);return o.mapSeries(r,t,e)},o.seq=function(){var n=arguments;return function(){var t=this,e=Array.prototype.slice.call(arguments),r=e.pop();o.reduce(n,e,function(n,e,r){e.apply(t,n.concat([function(){var n=arguments[0],t=Array.prototype.slice.call(arguments,1);r(n,t)}]))},function(n,e){r.apply(t,[n].concat(e))})}},o.compose=function(){return o.seq.apply(null,Array.prototype.reverse.call(arguments))};var _=function(n,t){var e=function(){var e=this,r=Array.prototype.slice.call(arguments),i=r.pop();return n(t,function(n,t){n.apply(e,r.concat([t]))},i)};if(arguments.length>2){var r=Array.prototype.slice.call(arguments,2);return e.apply(this,r)}return e};o.applyEach=d(_),o.applyEachSeries=h(_),o.forever=function(n,t){function e(r){if(r){if(t)return t(r);throw r}n(e)}e()},"undefined"!=typeof t&&t.exports?t.exports=o:"undefined"!=typeof define&&define.amd?define([],function(){return o}):r.async=o}()}).call(this,n("_process"))},{_process:3}],3:[function(n,t){function e(){if(!u){u=!0;for(var n,t=o.length;t;){n=o,o=[];for(var e=-1;++e<t;)n[e]();t=o.length}u=!1}}function r(){}var i=t.exports={},o=[],u=!1;i.nextTick=function(n){o.push(n),u||setTimeout(e,0)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=r,i.addListener=r,i.once=r,i.off=r,i.removeListener=r,i.removeAllListeners=r,i.emit=r,i.binding=function(){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},{}],4:[function(n,t,e){(function(){function n(n){function t(t,e,r,i,o,u){for(;o>=0&&u>o;o+=n){var a=i?i[o]:o;r=e(r,t[a],a,t)}return r}return function(e,r,i,o){r=x(r,o,4);var u=!O(e)&&k.keys(e),a=(u||e).length,c=n>0?0:a-1;return arguments.length<3&&(i=e[u?u[c]:c],c+=n),t(e,r,i,u,c,a)}}function r(n){return function(t,e,r){e=w(e,r);for(var i=S(t),o=n>0?0:i-1;o>=0&&i>o;o+=n)if(e(t[o],o,t))return o;return-1}}function i(n,t,e){return function(r,i,o){var u=0,a=S(r);if("number"==typeof o)n>0?u=o>=0?o:Math.max(o+a,u):a=o>=0?Math.min(o+1,a):o+a+1;else if(e&&o&&a)return o=e(r,i),r[o]===i?o:-1;if(i!==i)return o=t(p.call(r,u,a),k.isNaN),o>=0?o+u:-1;for(o=n>0?u:a-1;o>=0&&a>o;o+=n)if(r[o]===i)return o;return-1}}function o(n,t){var e=V.length,r=n.constructor,i=k.isFunction(r)&&r.prototype||l,o="constructor";for(k.has(n,o)&&!k.contains(t,o)&&t.push(o);e--;)o=V[e],o in n&&n[o]!==i[o]&&!k.contains(t,o)&&t.push(o)}var u=this,a=u._,c=Array.prototype,l=Object.prototype,f=Function.prototype,s=c.push,p=c.slice,d=l.toString,v=l.hasOwnProperty,h=Array.isArray,m=Object.keys,y=f.bind,g=Object.create,b=function(){},k=function(n){return n instanceof k?n:this instanceof k?void(this._wrapped=n):new k(n)};"undefined"!=typeof e?("undefined"!=typeof t&&t.exports&&(e=t.exports=k),e._=k):u._=k,k.VERSION="1.8.3";var x=function(n,t,e){if(void 0===t)return n;switch(null==e?3:e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,i){return n.call(t,e,r,i)};case 4:return function(e,r,i,o){return n.call(t,e,r,i,o)}}return function(){return n.apply(t,arguments)}},w=function(n,t,e){return null==n?k.identity:k.isFunction(n)?x(n,t,e):k.isObject(n)?k.matcher(n):k.property(n)};k.iteratee=function(n,t){return w(n,t,1/0)};var A=function(n,t){return function(e){var r=arguments.length;if(2>r||null==e)return e;for(var i=1;r>i;i++)for(var o=arguments[i],u=n(o),a=u.length,c=0;a>c;c++){var l=u[c];t&&void 0!==e[l]||(e[l]=o[l])}return e}},_=function(n){if(!k.isObject(n))return{};if(g)return g(n);b.prototype=n;var t=new b;return b.prototype=null,t},j=function(n){return function(t){return null==t?void 0:t[n]}},$=Math.pow(2,53)-1,S=j("length"),O=function(n){var t=S(n);return"number"==typeof t&&t>=0&&$>=t};k.each=k.forEach=function(n,t,e){t=x(t,e);var r,i;if(O(n))for(r=0,i=n.length;i>r;r++)t(n[r],r,n);else{var o=k.keys(n);for(r=0,i=o.length;i>r;r++)t(n[o[r]],o[r],n)}return n},k.map=k.collect=function(n,t,e){t=w(t,e);for(var r=!O(n)&&k.keys(n),i=(r||n).length,o=Array(i),u=0;i>u;u++){var a=r?r[u]:u;o[u]=t(n[a],a,n)}return o},k.reduce=k.foldl=k.inject=n(1),k.reduceRight=k.foldr=n(-1),k.find=k.detect=function(n,t,e){var r;return r=O(n)?k.findIndex(n,t,e):k.findKey(n,t,e),void 0!==r&&-1!==r?n[r]:void 0},k.filter=k.select=function(n,t,e){var r=[];return t=w(t,e),k.each(n,function(n,e,i){t(n,e,i)&&r.push(n)}),r},k.reject=function(n,t,e){return k.filter(n,k.negate(w(t)),e)},k.every=k.all=function(n,t,e){t=w(t,e);for(var r=!O(n)&&k.keys(n),i=(r||n).length,o=0;i>o;o++){var u=r?r[o]:o;if(!t(n[u],u,n))return!1}return!0},k.some=k.any=function(n,t,e){t=w(t,e);for(var r=!O(n)&&k.keys(n),i=(r||n).length,o=0;i>o;o++){var u=r?r[o]:o;if(t(n[u],u,n))return!0}return!1},k.contains=k.includes=k.include=function(n,t,e,r){return O(n)||(n=k.values(n)),("number"!=typeof e||r)&&(e=0),k.indexOf(n,t,e)>=0},k.invoke=function(n,t){var e=p.call(arguments,2),r=k.isFunction(t);return k.map(n,function(n){var i=r?t:n[t];return null==i?i:i.apply(n,e)})},k.pluck=function(n,t){return k.map(n,k.property(t))},k.where=function(n,t){return k.filter(n,k.matcher(t))},k.findWhere=function(n,t){return k.find(n,k.matcher(t))},k.max=function(n,t,e){var r,i,o=-1/0,u=-1/0;if(null==t&&null!=n){n=O(n)?n:k.values(n);for(var a=0,c=n.length;c>a;a++)r=n[a],r>o&&(o=r)}else t=w(t,e),k.each(n,function(n,e,r){i=t(n,e,r),(i>u||i===-1/0&&o===-1/0)&&(o=n,u=i)});return o},k.min=function(n,t,e){var r,i,o=1/0,u=1/0;if(null==t&&null!=n){n=O(n)?n:k.values(n);for(var a=0,c=n.length;c>a;a++)r=n[a],o>r&&(o=r)}else t=w(t,e),k.each(n,function(n,e,r){i=t(n,e,r),(u>i||1/0===i&&1/0===o)&&(o=n,u=i)});return o},k.shuffle=function(n){for(var t,e=O(n)?n:k.values(n),r=e.length,i=Array(r),o=0;r>o;o++)t=k.random(0,o),t!==o&&(i[o]=i[t]),i[t]=e[o];return i},k.sample=function(n,t,e){return null==t||e?(O(n)||(n=k.values(n)),n[k.random(n.length-1)]):k.shuffle(n).slice(0,Math.max(0,t))},k.sortBy=function(n,t,e){return t=w(t,e),k.pluck(k.map(n,function(n,e,r){return{value:n,index:e,criteria:t(n,e,r)}}).sort(function(n,t){var e=n.criteria,r=t.criteria;if(e!==r){if(e>r||void 0===e)return 1;if(r>e||void 0===r)return-1}return n.index-t.index}),"value")};var E=function(n){return function(t,e,r){var i={};return e=w(e,r),k.each(t,function(r,o){var u=e(r,o,t);n(i,r,u)}),i}};k.groupBy=E(function(n,t,e){k.has(n,e)?n[e].push(t):n[e]=[t]}),k.indexBy=E(function(n,t,e){n[e]=t}),k.countBy=E(function(n,t,e){k.has(n,e)?n[e]++:n[e]=1}),k.toArray=function(n){return n?k.isArray(n)?p.call(n):O(n)?k.map(n,k.identity):k.values(n):[]},k.size=function(n){return null==n?0:O(n)?n.length:k.keys(n).length},k.partition=function(n,t,e){t=w(t,e);var r=[],i=[];return k.each(n,function(n,e,o){(t(n,e,o)?r:i).push(n)}),[r,i]},k.first=k.head=k.take=function(n,t,e){return null==n?void 0:null==t||e?n[0]:k.initial(n,n.length-t)},k.initial=function(n,t,e){return p.call(n,0,Math.max(0,n.length-(null==t||e?1:t)))},k.last=function(n,t,e){return null==n?void 0:null==t||e?n[n.length-1]:k.rest(n,Math.max(0,n.length-t))},k.rest=k.tail=k.drop=function(n,t,e){return p.call(n,null==t||e?1:t)},k.compact=function(n){return k.filter(n,k.identity)};var I=function(n,t,e,r){for(var i=[],o=0,u=r||0,a=S(n);a>u;u++){var c=n[u];if(O(c)&&(k.isArray(c)||k.isArguments(c))){t||(c=I(c,t,e));var l=0,f=c.length;for(i.length+=f;f>l;)i[o++]=c[l++]}else e||(i[o++]=c)}return i};k.flatten=function(n,t){return I(n,t,!1)},k.without=function(n){return k.difference(n,p.call(arguments,1))},k.uniq=k.unique=function(n,t,e,r){k.isBoolean(t)||(r=e,e=t,t=!1),null!=e&&(e=w(e,r));for(var i=[],o=[],u=0,a=S(n);a>u;u++){var c=n[u],l=e?e(c,u,n):c;t?(u&&o===l||i.push(c),o=l):e?k.contains(o,l)||(o.push(l),i.push(c)):k.contains(i,c)||i.push(c)}return i},k.union=function(){return k.uniq(I(arguments,!0,!0))},k.intersection=function(n){for(var t=[],e=arguments.length,r=0,i=S(n);i>r;r++){var o=n[r];if(!k.contains(t,o)){for(var u=1;e>u&&k.contains(arguments[u],o);u++);u===e&&t.push(o)}}return t},k.difference=function(n){var t=I(arguments,!0,!0,1);return k.filter(n,function(n){return!k.contains(t,n)})},k.zip=function(){return k.unzip(arguments)},k.unzip=function(n){for(var t=n&&k.max(n,S).length||0,e=Array(t),r=0;t>r;r++)e[r]=k.pluck(n,r);return e},k.object=function(n,t){for(var e={},r=0,i=S(n);i>r;r++)t?e[n[r]]=t[r]:e[n[r][0]]=n[r][1];return e},k.findIndex=r(1),k.findLastIndex=r(-1),k.sortedIndex=function(n,t,e,r){e=w(e,r,1);for(var i=e(t),o=0,u=S(n);u>o;){var a=Math.floor((o+u)/2);e(n[a])<i?o=a+1:u=a}return o},k.indexOf=i(1,k.findIndex,k.sortedIndex),k.lastIndexOf=i(-1,k.findLastIndex),k.range=function(n,t,e){null==t&&(t=n||0,n=0),e=e||1;for(var r=Math.max(Math.ceil((t-n)/e),0),i=Array(r),o=0;r>o;o++,n+=e)i[o]=n;return i};var T=function(n,t,e,r,i){if(!(r instanceof t))return n.apply(e,i);var o=_(n.prototype),u=n.apply(o,i);return k.isObject(u)?u:o};k.bind=function(n,t){if(y&&n.bind===y)return y.apply(n,p.call(arguments,1));if(!k.isFunction(n))throw new TypeError("Bind must be called on a function");var e=p.call(arguments,2),r=function(){return T(n,r,t,this,e.concat(p.call(arguments)))};return r},k.partial=function(n){var t=p.call(arguments,1),e=function(){for(var r=0,i=t.length,o=Array(i),u=0;i>u;u++)o[u]=t[u]===k?arguments[r++]:t[u];for(;r<arguments.length;)o.push(arguments[r++]);return T(n,e,this,this,o)};return e},k.bindAll=function(n){var t,e,r=arguments.length;if(1>=r)throw new Error("bindAll must be passed function names");for(t=1;r>t;t++)e=arguments[t],n[e]=k.bind(n[e],n);return n},k.memoize=function(n,t){var e=function(r){var i=e.cache,o=""+(t?t.apply(this,arguments):r);return k.has(i,o)||(i[o]=n.apply(this,arguments)),i[o]};return e.cache={},e},k.delay=function(n,t){var e=p.call(arguments,2);return setTimeout(function(){return n.apply(null,e)},t)},k.defer=k.partial(k.delay,k,1),k.throttle=function(n,t,e){var r,i,o,u=null,a=0;e||(e={});var c=function(){a=e.leading===!1?0:k.now(),u=null,o=n.apply(r,i),u||(r=i=null)};return function(){var l=k.now();a||e.leading!==!1||(a=l);var f=t-(l-a);return r=this,i=arguments,0>=f||f>t?(u&&(clearTimeout(u),u=null),a=l,o=n.apply(r,i),u||(r=i=null)):u||e.trailing===!1||(u=setTimeout(c,f)),o}},k.debounce=function(n,t,e){var r,i,o,u,a,c=function(){var l=k.now()-u;t>l&&l>=0?r=setTimeout(c,t-l):(r=null,e||(a=n.apply(o,i),r||(o=i=null)))};return function(){o=this,i=arguments,u=k.now();var l=e&&!r;return r||(r=setTimeout(c,t)),l&&(a=n.apply(o,i),o=i=null),a}},k.wrap=function(n,t){return k.partial(t,n)},k.negate=function(n){return function(){return!n.apply(this,arguments)}},k.compose=function(){var n=arguments,t=n.length-1;return function(){for(var e=t,r=n[t].apply(this,arguments);e--;)r=n[e].call(this,r);return r}},k.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},k.before=function(n,t){var e;return function(){return--n>0&&(e=t.apply(this,arguments)),1>=n&&(t=null),e}},k.once=k.partial(k.before,2);var N=!{toString:null}.propertyIsEnumerable("toString"),V=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];k.keys=function(n){if(!k.isObject(n))return[];if(m)return m(n);var t=[];for(var e in n)k.has(n,e)&&t.push(e);return N&&o(n,t),t},k.allKeys=function(n){if(!k.isObject(n))return[];var t=[];for(var e in n)t.push(e);return N&&o(n,t),t},k.values=function(n){for(var t=k.keys(n),e=t.length,r=Array(e),i=0;e>i;i++)r[i]=n[t[i]];return r},k.mapObject=function(n,t,e){t=w(t,e);for(var r,i=k.keys(n),o=i.length,u={},a=0;o>a;a++)r=i[a],u[r]=t(n[r],r,n);return u},k.pairs=function(n){for(var t=k.keys(n),e=t.length,r=Array(e),i=0;e>i;i++)r[i]=[t[i],n[t[i]]];return r},k.invert=function(n){for(var t={},e=k.keys(n),r=0,i=e.length;i>r;r++)t[n[e[r]]]=e[r];return t},k.functions=k.methods=function(n){var t=[];for(var e in n)k.isFunction(n[e])&&t.push(e);return t.sort()},k.extend=A(k.allKeys),k.extendOwn=k.assign=A(k.keys),k.findKey=function(n,t,e){t=w(t,e);for(var r,i=k.keys(n),o=0,u=i.length;u>o;o++)if(r=i[o],t(n[r],r,n))return r},k.pick=function(n,t,e){var r,i,o={},u=n;if(null==u)return o;k.isFunction(t)?(i=k.allKeys(u),r=x(t,e)):(i=I(arguments,!1,!1,1),r=function(n,t,e){return t in e},u=Object(u));for(var a=0,c=i.length;c>a;a++){var l=i[a],f=u[l];r(f,l,u)&&(o[l]=f)}return o},k.omit=function(n,t,e){if(k.isFunction(t))t=k.negate(t);else{var r=k.map(I(arguments,!1,!1,1),String);t=function(n,t){return!k.contains(r,t)}}return k.pick(n,t,e)},k.defaults=A(k.allKeys,!0),k.create=function(n,t){var e=_(n);return t&&k.extendOwn(e,t),e},k.clone=function(n){return k.isObject(n)?k.isArray(n)?n.slice():k.extend({},n):n},k.tap=function(n,t){return t(n),n},k.isMatch=function(n,t){var e=k.keys(t),r=e.length;if(null==n)return!r;for(var i=Object(n),o=0;r>o;o++){var u=e[o];if(t[u]!==i[u]||!(u in i))return!1}return!0};var F=function(n,t,e,r){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof k&&(n=n._wrapped),t instanceof k&&(t=t._wrapped);var i=d.call(n);if(i!==d.call(t))return!1;switch(i){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var o="[object Array]"===i;if(!o){if("object"!=typeof n||"object"!=typeof t)return!1;var u=n.constructor,a=t.constructor;if(u!==a&&!(k.isFunction(u)&&u instanceof u&&k.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}e=e||[],r=r||[];for(var c=e.length;c--;)if(e[c]===n)return r[c]===t;if(e.push(n),r.push(t),o){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!F(n[c],t[c],e,r))return!1}else{var l,f=k.keys(n);if(c=f.length,k.keys(t).length!==c)return!1;for(;c--;)if(l=f[c],!k.has(t,l)||!F(n[l],t[l],e,r))return!1}return e.pop(),r.pop(),!0};k.isEqual=function(n,t){return F(n,t)},k.isEmpty=function(n){return null==n?!0:O(n)&&(k.isArray(n)||k.isString(n)||k.isArguments(n))?0===n.length:0===k.keys(n).length},k.isElement=function(n){return!(!n||1!==n.nodeType)},k.isArray=h||function(n){return"[object Array]"===d.call(n)},k.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},k.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){k["is"+n]=function(t){return d.call(t)==="[object "+n+"]"}}),k.isArguments(arguments)||(k.isArguments=function(n){return k.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(k.isFunction=function(n){return"function"==typeof n||!1}),k.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},k.isNaN=function(n){return k.isNumber(n)&&n!==+n},k.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===d.call(n)},k.isNull=function(n){return null===n},k.isUndefined=function(n){return void 0===n},k.has=function(n,t){return null!=n&&v.call(n,t)},k.noConflict=function(){return u._=a,this},k.identity=function(n){return n},k.constant=function(n){return function(){return n}},k.noop=function(){},k.property=j,k.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},k.matcher=k.matches=function(n){return n=k.extendOwn({},n),function(t){return k.isMatch(t,n)}},k.times=function(n,t,e){var r=Array(Math.max(0,n));t=x(t,e,1);for(var i=0;n>i;i++)r[i]=t(i);return r},k.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},k.now=Date.now||function(){return(new Date).getTime()};var M={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},q=k.invert(M),B=function(n){var t=function(t){return n[t]},e="(?:"+k.keys(n).join("|")+")",r=RegExp(e),i=RegExp(e,"g");return function(n){return n=null==n?"":""+n,r.test(n)?n.replace(i,t):n}};k.escape=B(M),k.unescape=B(q),k.result=function(n,t,e){var r=null==n?void 0:n[t];return void 0===r&&(r=e),k.isFunction(r)?r.call(n):r};var L=0;k.uniqueId=function(n){var t=++L+"";return n?n+t:t},k.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var D=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},C=/\\|'|\r|\n|\u2028|\u2029/g,R=function(n){return"\\"+z[n]};k.template=function(n,t,e){!t&&e&&(t=e),t=k.defaults({},t,k.templateSettings);var r=RegExp([(t.escape||D).source,(t.interpolate||D).source,(t.evaluate||D).source].join("|")+"|$","g"),i=0,o="__p+='";n.replace(r,function(t,e,r,u,a){return o+=n.slice(i,a).replace(C,R),i=a+t.length,e?o+="'+\n((__t=("+e+"))==null?'':_.escape(__t))+\n'":r?o+="'+\n((__t=("+r+"))==null?'':__t)+\n'":u&&(o+="';\n"+u+"\n__p+='"),t}),o+="';\n",t.variable||(o="with(obj||{}){\n"+o+"}\n"),o="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+o+"return __p;\n";
try{var u=new Function(t.variable||"obj","_",o)}catch(a){throw a.source=o,a}var c=function(n){return u.call(this,n,k)},l=t.variable||"obj";return c.source="function("+l+"){\n"+o+"}",c},k.chain=function(n){var t=k(n);return t._chain=!0,t};var P=function(n,t){return n._chain?k(t).chain():t};k.mixin=function(n){k.each(k.functions(n),function(t){var e=k[t]=n[t];k.prototype[t]=function(){var n=[this._wrapped];return s.apply(n,arguments),P(this,e.apply(k,n))}})},k.mixin(k),k.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=c[n];k.prototype[n]=function(){var e=this._wrapped;return t.apply(e,arguments),"shift"!==n&&"splice"!==n||0!==e.length||delete e[0],P(this,e)}}),k.each(["concat","join","slice"],function(n){var t=c[n];k.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),k.prototype.value=function(){return this._wrapped},k.prototype.valueOf=k.prototype.toJSON=k.prototype.value,k.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return k})}).call(this)},{}],5:[function(n,t){t.exports={timeConvert:function(n){var t=Math.floor(n/60),e=n-60*t,r=Math.floor(e),i=r.toString().split("");return 1===i.length?t+":0"+r:t+":"+r},renderNote:function(n){var t=$("<tr>");return t.attr("data-note",n._id),t.attr("id",n._id),t.attr("class","note-row"),t.append('<td><button class="set-time btn btn-default" data-set-time="'+n.time+'">'+n.displayTime+"</button><p>"+n.note+"</p></td>"),t}}},{}]},{},[1]);