/*
 * vue-howler v0.5.0
 * (c) 2017 Mick Dekkers
 * Released under the MIT License.
 */
var VueHowler=function(t){"use strict";function e(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}t={Howl:t};var o=function(t,e,o){if(e>o)throw new RangeError("`min` should be lower than `max`");return t<e?e:t>o?o:t},n=function(t){for(var e=Object.keys(t),o=[],n=0;n<e.length;n++)o.push(t[e[n]]);return o},a=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,l=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},o=0;o<10;o++)e["_"+String.fromCharCode(o)]=o;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(t){n[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(t){return!1}}()?Object.assign:function(t,o){for(var n,l,s=e(t),u=1;u<arguments.length;u++){n=Object(arguments[u]);for(var h in n)i.call(n,h)&&(s[h]=n[h]);if(a){l=a(n);for(var d=0;d<l.length;d++)r.call(n,l[d])&&(s[l[d]]=n[l[d]])}}return s},s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};return{props:{sources:{type:Array,required:!0,validator:function(t){return t.every(function(t){return"string"==typeof t&&t.length>0})}},autoplay:{type:Boolean,default:!1},loop:{type:Boolean,default:!1},preload:{type:Boolean,default:!0},html5:{type:Boolean,default:!1}},data:function(){var t=this;return{_howl:null,playing:!1,muted:!1,volume:1,rate:1,seek:0,duration:0,_polls:{seek:{id:null,interval:250,hook:function(){t.seek=t.$data._howl.seek()}}},_howlEvents:[{name:"load",hook:function(){t.duration=t.$data._howl.duration()}},"loaderror",{name:"play",hook:function(){t.playing=!0}},{name:"end",hook:function(){t.playing=!1}},{name:"pause",hook:function(){t.playing=!1}},{name:"stop",hook:function(){t.playing=!1,null!=t.$data._howl&&(t.seek=t.$data._howl.seek())}},"mute",{name:"volume",hook:function(){t.volume=t.$data._howl.volume()}},{name:"rate",hook:function(){t.rate=t.$data._howl.rate()}},{name:"seek",hook:function(){t.seek=t.$data._howl.seek()}},"fade"]}},computed:{progress:function(){return 0===this.duration?0:this.seek/this.duration}},created:function(){this._initialize()},beforeDestroy:function(){this._cleanup()},watch:{playing:function(t){this.seek=this.$data._howl.seek(),t?this.$data._polls.seek.id=setInterval(this.$data._polls.seek.hook,this.$data._polls.seek.interval):clearInterval(this.$data._polls.seek.id)},sources:function(t){this._reinitialize()}},methods:{_reinitialize:function(){this._cleanup(!1),this._initialize()},_initialize:function(){var e=this;this.$data._howl=new t.Howl({src:this.sources,volume:this.volume,rate:this.rate,mute:this.muted,autoplay:this.autoplay,loop:this.loop,preload:this.preload,html5:this.html5});var o=this.$data._howl.duration();this.duration=o,o>0&&this.$emit("load"),this.$data._howlEvents=this.$data._howlEvents.map(function(t){"string"==typeof t&&(t={name:t});var o=function(o,n){"function"==typeof t.hook&&t.hook(o,n),e.$emit(t.name,o,n)};return e.$data._howl.on(t.name,o),l({},t,{handler:o})})},_cleanup:function(){var t=this,e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$data._howl&&this.stop(),n(this.$data._polls).forEach(function(t){null!=t.id&&clearInterval(t.id)}),this.$data._howlEvents.map(function(e){if(e.handler){t.$data._howl&&t.$data._howl.off(e.name,e.handler);var o=l({},e);return delete o.handler,o}return e}),this.$data._howl=null,this.duration=0,e&&(this.muted=!1,this.volume=1,this.rate=1)},play:function(){this.playing||this.$data._howl.play()},pause:function(){this.playing&&this.$data._howl.pause()},togglePlayback:function(){this.playing?this.$data._howl.pause():this.$data._howl.play()},stop:function(){this.$data._howl.stop()},mute:function(){this.$data._howl.mute(!0),this.muted=!0},unmute:function(){this.$data._howl.mute(!1),this.muted=!1},toggleMute:function(){this.$data._howl.mute(!this.muted),this.muted=!this.muted},setVolume:function(t){if("number"!=typeof t)throw new Error("volume must be a number, got a "+(void 0===t?"undefined":s(t))+" instead");this.$data._howl.volume(o(t,0,1))},setRate:function(t){if("number"!=typeof t)throw new Error("rate must be a number, got a "+(void 0===t?"undefined":s(t))+" instead");this.$data._howl.rate(o(t,.5,4))},setSeek:function(t){if("number"!=typeof t)throw new Error("seek must be a number, got a "+(void 0===t?"undefined":s(t))+" instead");this.$data._howl.seek(o(t,0,this.duration))},setProgress:function(t){if("number"!=typeof t)throw new Error("progress must be a number, got a "+(void 0===t?"undefined":s(t))+" instead");this.setSeek(o(t,0,1)*this.duration)}}}}(Howl);
