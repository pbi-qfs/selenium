// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

'use strict';var n=this;
function q(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==
b&&"undefined"==typeof a.call)return"object";return b}function aa(a){var b=q(a);return"array"==b||"object"==b&&"number"==typeof a.length}function r(a){return"string"==typeof a}function ba(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ca(a,b,c){return a.call.apply(a.bind,arguments)}
function da(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function ea(a,b,c){ea=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ca:da;return ea.apply(null,arguments)}var fa=Date.now||function(){return+new Date};
function ga(a,b){function c(){}c.prototype=b.prototype;a.B=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.w=function(a,c,g){for(var e=Array(arguments.length-2),l=2;l<arguments.length;l++)e[l-2]=arguments[l];return b.prototype[c].apply(a,e)}};function t(a){if(Error.captureStackTrace)Error.captureStackTrace(this,t);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}ga(t,Error);t.prototype.name="CustomError";var ia;function ja(a,b){for(var c=a.split("%s"),d="",f=Array.prototype.slice.call(arguments,1);f.length&&1<c.length;)d+=c.shift()+f.shift();return d+c.join("%s")}var ka=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function la(a){if(!ma.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(na,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(oa,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(pa,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(qa,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(ra,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(sa,"&#0;"));return a}var na=/&/g,oa=/</g,pa=/>/g,qa=/"/g,ra=/'/g,sa=/\x00/g,ma=/[\x00&<>"']/;function ta(a,b){return a<b?-1:a>b?1:0};function ua(a,b){b.unshift(a);t.call(this,ja.apply(null,b));b.shift()}ga(ua,t);ua.prototype.name="AssertionError";function u(a,b){throw new ua("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var va=Array.prototype.indexOf?function(a,b,c){return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(r(a))return r(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},wa=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,f=r(a)?a.split(""):a,g=0;g<d;g++)g in f&&b.call(c,f[g],g,a)};
function xa(a){return Array.prototype.concat.apply(Array.prototype,arguments)}function Ba(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}function Ca(a,b,c){return 2>=arguments.length?Array.prototype.slice.call(a,b):Array.prototype.slice.call(a,b,c)};function Da(a,b){for(var c in a)b.call(void 0,a[c],c,a)};function v(a,b){this.b={};this.a=[];this.f=this.c=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)Ea(this,arguments[d],arguments[d+1])}else if(a){var f;if(a instanceof v)f=a.o(),d=a.l();else{var c=[],g=0;for(f in a)c[g++]=f;f=c;c=[];g=0;for(d in a)c[g++]=a[d];d=c}for(c=0;c<f.length;c++)Ea(this,f[c],d[c])}}v.prototype.l=function(){Fa(this);for(var a=[],b=0;b<this.a.length;b++)a.push(this.b[this.a[b]]);return a};
v.prototype.o=function(){Fa(this);return this.a.concat()};v.prototype.clear=function(){this.b={};this.f=this.c=this.a.length=0};function Fa(a){if(a.c!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];y(a.b,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.c!=a.a.length){for(var f={},c=b=0;b<a.a.length;)d=a.a[b],y(f,d)||(a.a[c++]=d,f[d]=1),b++;a.a.length=c}}function Ga(a,b){return y(a.b,b)?a.b[b]:void 0}function Ea(a,b,c){y(a.b,b)||(a.c++,a.a.push(b),a.f++);a.b[b]=c}
v.prototype.forEach=function(a,b){for(var c=this.o(),d=0;d<c.length;d++){var f=c[d];a.call(b,Ga(this,f),f,this)}};v.prototype.clone=function(){return new v(this)};function y(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var Ha=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function Ia(a,b){if(a)for(var c=a.split("&"),d=0;d<c.length;d++){var f=c[d].indexOf("="),g=null,e=null;0<=f?(g=c[d].substring(0,f),e=c[d].substring(f+1)):g=c[d];b(g,e?decodeURIComponent(e.replace(/\+/g," ")):"")}};function z(a,b){this.f=this.u=this.c="";this.s=null;this.g=this.m="";this.a=!1;var c;a instanceof z?(this.a=void 0!==b?b:a.a,Ja(this,a.c),this.u=a.u,this.f=a.f,Ka(this,a.s),this.m=a.m,La(this,a.b.clone()),this.g=a.g):a&&(c=String(a).match(Ha))?(this.a=!!b,Ja(this,c[1]||"",!0),this.u=A(c[2]||""),this.f=A(c[3]||"",!0),Ka(this,c[4]),this.m=A(c[5]||"",!0),La(this,c[6]||"",!0),this.g=A(c[7]||"")):(this.a=!!b,this.b=new B(null,0,this.a))}
z.prototype.toString=function(){var a=[],b=this.c;b&&a.push(C(b,Ma,!0),":");var c=this.f;if(c||"file"==b)a.push("//"),(b=this.u)&&a.push(C(b,Ma,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.s,null!=c&&a.push(":",String(c));if(c=this.m)this.f&&"/"!=c.charAt(0)&&a.push("/"),a.push(C(c,"/"==c.charAt(0)?Na:Oa,!0));(c=this.b.toString())&&a.push("?",c);(c=this.g)&&a.push("#",C(c,Pa));return a.join("")};z.prototype.clone=function(){return new z(this)};
function Ja(a,b,c){a.c=c?A(b,!0):b;a.c&&(a.c=a.c.replace(/:$/,""))}function Ka(a,b){if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.s=b}else a.s=null}function La(a,b,c){b instanceof B?(a.b=b,Qa(a.b,a.a)):(c||(b=C(b,Ra)),a.b=new B(b,0,a.a))}function A(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function C(a,b,c){return r(a)?(a=encodeURI(a).replace(b,Sa),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}
function Sa(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Ma=/[#\/\?@]/g,Oa=/[\#\?:]/g,Na=/[\#\?]/g,Ra=/[\#\?@]/g,Pa=/#/g;function B(a,b,c){this.c=this.a=null;this.b=a||null;this.f=!!c}function D(a){a.a||(a.a=new v,a.c=0,a.b&&Ia(a.b,function(b,c){var d=decodeURIComponent(b.replace(/\+/g," "));D(a);a.b=null;var d=E(a,d),f=Ga(a.a,d);f||Ea(a.a,d,f=[]);f.push(c);a.c=a.c+1}))}
function Ta(a,b){D(a);b=E(a,b);if(y(a.a.b,b)){a.b=null;a.c=a.c-Ga(a.a,b).length;var c=a.a;y(c.b,b)&&(delete c.b[b],c.c--,c.f++,c.a.length>2*c.c&&Fa(c))}}B.prototype.clear=function(){this.a=this.b=null;this.c=0};B.prototype.o=function(){D(this);for(var a=this.a.l(),b=this.a.o(),c=[],d=0;d<b.length;d++)for(var f=a[d],g=0;g<f.length;g++)c.push(b[d]);return c};
B.prototype.l=function(a){D(this);var b=[];if(r(a)){var c=a;D(this);c=E(this,c);y(this.a.b,c)&&(b=xa(b,Ga(this.a,E(this,a))))}else for(a=this.a.l(),c=0;c<a.length;c++)b=xa(b,a[c]);return b};function Ua(){var a=(new z(window.location)).b.l("url");return 0<a.length?String(a[0]):void 0}
B.prototype.toString=function(){if(this.b)return this.b;if(!this.a)return"";for(var a=[],b=this.a.o(),c=0;c<b.length;c++)for(var d=b[c],f=encodeURIComponent(String(d)),d=this.l(d),g=0;g<d.length;g++){var e=f;""!==d[g]&&(e+="="+encodeURIComponent(String(d[g])));a.push(e)}return this.b=a.join("&")};B.prototype.clone=function(){var a=new B;a.b=this.b;this.a&&(a.a=this.a.clone(),a.c=this.c);return a};function E(a,b){var c=String(b);a.f&&(c=c.toLowerCase());return c}
function Qa(a,b){b&&!a.f&&(D(a),a.b=null,a.a.forEach(function(a,b){var f=b.toLowerCase();b!=f&&(Ta(this,b),Ta(this,f),0<a.length&&(this.b=null,Ea(this.a,E(this,f),Ba(a)),this.c=this.c+a.length))},a));a.f=b};var Va={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0};function F(){this.a="";this.b=Wa}F.prototype.i=!0;F.prototype.h=function(){return this.a};F.prototype.toString=function(){return"Const{"+this.a+"}"};function Xa(a){if(a instanceof F&&a.constructor===F&&a.b===Wa)return a.a;u("expected object of type Const, got '"+a+"'");return"type_error:Const"}var Wa={};function Ya(a){var b=new F;b.a=a;return b};function G(){this.a="";this.b=Za}G.prototype.i=!0;var Za={};G.prototype.h=function(){return this.a};G.prototype.toString=function(){return"SafeStyle{"+this.a+"}"};function $a(a){var b=new G;b.a=a;return b}var ab=$a(""),bb=/^([-,."'%_!# a-zA-Z0-9]+|(?:rgb|hsl)a?\([0-9.%, ]+\))$/;function H(){this.a="";this.b=cb}H.prototype.i=!0;H.prototype.h=function(){return this.a};H.prototype.v=!0;H.prototype.j=function(){return 1};H.prototype.toString=function(){return"SafeUrl{"+this.a+"}"};function db(a){if(a instanceof H&&a.constructor===H&&a.b===cb)return a.a;u("expected object of type SafeUrl, got '"+a+"' of type "+q(a));return"type_error:SafeUrl"}var eb=/^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i;
function fb(a){if(a instanceof H)return a;a=a.i?a.h():String(a);eb.test(a)||(a="about:invalid#zClosurez");return gb(a)}var cb={};function gb(a){var b=new H;b.a=a;return b}gb("about:blank");function I(){this.a=hb}I.prototype.i=!0;I.prototype.h=function(){return""};I.prototype.v=!0;I.prototype.j=function(){return 1};I.prototype.toString=function(){return"TrustedResourceUrl{}"};var hb={};var J;a:{var ib=n.navigator;if(ib){var jb=ib.userAgent;if(jb){J=jb;break a}}J=""};function L(){this.a="";this.c=kb;this.b=null}L.prototype.v=!0;L.prototype.j=function(){return this.b};L.prototype.i=!0;L.prototype.h=function(){return this.a};L.prototype.toString=function(){return"SafeHtml{"+this.a+"}"};function M(a){if(a instanceof L&&a.constructor===L&&a.c===kb)return a.a;u("expected object of type SafeHtml, got '"+a+"' of type "+q(a));return"type_error:SafeHtml"}function lb(a){if(a instanceof L)return a;var b=null;a.v&&(b=a.j());a=la(a.i?a.h():String(a));return N(a,b)}
function O(a){if(a instanceof L)return a;a=lb(a);var b;b=M(a).replace(/  /g," &#160;").replace(/(\r\n|\r|\n)/g,"<br>");return N(b,a.j())}var mb=/^[a-zA-Z0-9-]+$/,nb={action:!0,cite:!0,data:!0,formaction:!0,href:!0,manifest:!0,poster:!0,src:!0},ob={APPLET:!0,BASE:!0,EMBED:!0,IFRAME:!0,LINK:!0,MATH:!0,META:!0,OBJECT:!0,SCRIPT:!0,STYLE:!0,SVG:!0,TEMPLATE:!0};
function pb(a,b,c){if(!mb.test(a))throw Error("Invalid tag name <"+a+">.");if(a.toUpperCase()in ob)throw Error("Tag name <"+a+"> is not allowed for SafeHtml.");var d=null,f="<"+a;if(b)for(var g in b){if(!mb.test(g))throw Error('Invalid attribute name "'+g+'".');var e=b[g];if(null!=e){var l,m=a;l=g;if(e instanceof F)e=Xa(e);else if("style"==l.toLowerCase()){if(!ba(e))throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, '+typeof e+" given: "+e);if(!(e instanceof
G)){var m="",w=void 0;for(w in e){if(!/^[-_a-zA-Z0-9]+$/.test(w))throw Error("Name allows only [-_a-zA-Z0-9], got: "+w);var k=e[w];if(null!=k){if(k instanceof F)k=Xa(k);else if(bb.test(k)){for(var h=!0,x=!0,p=0;p<k.length;p++){var K=k.charAt(p);"'"==K&&x?h=!h:'"'==K&&h&&(x=!x)}h&&x||(u("String value requires balanced quotes, got: "+k),k="zClosurez")}else u("String value allows only [-,.\"'%_!# a-zA-Z0-9], rgb() and rgba(), got: "+k),k="zClosurez";m+=w+":"+k+";"}}e=m?$a(m):ab}m=void 0;e instanceof
G&&e.constructor===G&&e.b===Za?m=e.a:(u("expected object of type SafeStyle, got '"+e+"' of type "+q(e)),m="type_error:SafeStyle");e=m}else{if(/^on/i.test(l))throw Error('Attribute "'+l+'" requires goog.string.Const value, "'+e+'" given.');if(l.toLowerCase()in nb)if(e instanceof I)e instanceof I&&e.constructor===I&&e.a===hb?e="":(u("expected object of type TrustedResourceUrl, got '"+e+"' of type "+q(e)),e="type_error:TrustedResourceUrl");else if(e instanceof H)e=db(e);else if(r(e))e=fb(e).h();else throw Error('Attribute "'+
l+'" on tag "'+m+'" requires goog.html.SafeUrl, goog.string.Const, or string, value "'+e+'" given.');}e.i&&(e=e.h());l=l+'="'+la(String(e))+'"';f=f+(" "+l)}}null!=c?"array"==q(c)||(c=[c]):c=[];!0===Va[a.toLowerCase()]?f+=">":(d=P(c),f+=">"+M(d)+"</"+a+">",d=d.j());(a=b&&b.dir)&&(/^(ltr|rtl|auto)$/i.test(a)?d=0:d=null);return N(f,d)}function P(a){function b(a){"array"==q(a)?wa(a,b):(a=lb(a),d+=M(a),a=a.j(),0==c?c=a:0!=a&&c!=a&&(c=null))}var c=0,d="";wa(arguments,b);return N(d,c)}var kb={};
function N(a,b){var c=new L;c.a=a;c.b=b;return c}N("<!DOCTYPE html>",0);var qb=N("",0),rb=N("<br>",0);function sb(a){var b;b=Error();if(Error.captureStackTrace)Error.captureStackTrace(b,a||sb),b=String(b.stack);else{try{throw b;}catch(c){b=c}b=(b=b.stack)?String(b):null}b||(b=tb(a||arguments.callee.caller,[]));return b}
function tb(a,b){var c=[];if(0<=va(b,a))c.push("[...circular reference...]");else if(a&&50>b.length){c.push(ub(a)+"(");for(var d=a.arguments,f=0;d&&f<d.length;f++){0<f&&c.push(", ");var g;g=d[f];switch(typeof g){case "object":g=g?"object":"null";break;case "string":break;case "number":g=String(g);break;case "boolean":g=g?"true":"false";break;case "function":g=(g=ub(g))?g:"[fn]";break;default:g=typeof g}40<g.length&&(g=g.substr(0,40)+"...");c.push(g)}b.push(a);c.push(")\n");try{c.push(tb(a.caller,
b))}catch(e){c.push("[exception trying to get caller]\n")}}else a?c.push("[...long stack...]"):c.push("[end]");return c.join("")}function ub(a){if(Q[a])return Q[a];a=String(a);if(!Q[a]){var b=/function ([^\(]+)/.exec(a);Q[a]=b?b[1]:"[Anonymous]"}return Q[a]}var Q={};function vb(a,b,c,d,f){"number"==typeof f||wb++;this.c=d||fa();this.f=a;this.b=b;this.g=c;delete this.a}vb.prototype.a=null;var wb=0;function xb(a){this.g=a;this.a=this.c=this.f=this.b=null}function R(a,b){this.name=a;this.value=b}R.prototype.toString=function(){return this.name};var yb=new R("SHOUT",1200),zb=new R("SEVERE",1E3),Ab=new R("WARNING",900),Bb=new R("INFO",800),Cb=new R("CONFIG",700);function Db(a){if(a.f)return a.f;if(a.b)return Db(a.b);u("Root logger has no level set.");return null}
xb.prototype.log=function(a,b,c){if(a.value>=Db(this).value)for("function"==q(b)&&(b=b()),a=new vb(a,String(b),this.g),c&&(a.a=c),c="log:"+a.b,n.console&&(n.console.timeStamp?n.console.timeStamp(c):n.console.markTimeline&&n.console.markTimeline(c)),n.msWriteProfilerMark&&n.msWriteProfilerMark(c),c=this;c;){b=c;var d=a;if(b.a)for(var f=0,g=void 0;g=b.a[f];f++)g(d);c=c.b}};var Eb={},S=null;function Fb(){S||(S=new xb(""),Eb[""]=S,S.f=Cb)}
function Gb(a){Fb();var b;if(!(b=Eb[a])){b=new xb(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=Gb(a.substr(0,c));c.c||(c.c={});c.c[d]=b;b.b=c;Eb[a]=b}return b};var Hb=new function(){this.a=fa()};function Ib(a){this.c=a||"";this.f=Hb}Ib.prototype.a=!0;Ib.prototype.b=!1;function T(a){return 10>a?"0"+a:String(a)}function Jb(a){Ib.call(this,a)}ga(Jb,Ib);Jb.prototype.b=!0;function Kb(a,b){Da(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:Lb.hasOwnProperty(d)?a.setAttribute(Lb[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})}var Lb={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};
function Mb(a,b,c){function d(c){c&&b.appendChild(r(c)?a.createTextNode(c):c)}for(var f=2;f<c.length;f++){var g=c[f];!aa(g)||ba(g)&&0<g.nodeType?d(g):wa(Nb(g)?Ba(g):g,d)}}function Nb(a){if(a&&"number"==typeof a.length){if(ba(a))return"function"==typeof a.item||"string"==typeof a.item;if("function"==q(a))return"function"==typeof a.item}return!1}function Ob(a){this.b=a||n.document||document}
function Pb(a,b){var c;c=a.b;var d=b&&"*"!=b?b.toUpperCase():"";c.querySelectorAll&&c.querySelector&&d?c=c.querySelectorAll(d+""):c=c.getElementsByTagName(d||"*");return c}Ob.prototype.a=function(a,b,c){var d=this.b,f=arguments,g=f[1],e=d.createElement(f[0]);g&&(r(g)?e.className=g:"array"==q(g)?e.className=g.join(" "):Kb(e,g));2<f.length&&Mb(d,e,f);return e};
Ob.prototype.contains=function(a,b){if(!a||!b)return!1;if(a.contains&&1==b.nodeType)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||!!(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a};function Qb(a){this.m=ea(this.f,this);this.b=new Jb;this.c=this.b.a=!1;this.a=a;this.g=this.a.ownerDocument||this.a.document;a=(a=this.a)?new Ob(9==a.nodeType?a:a.ownerDocument||a.document):ia||(ia=new Ob);var b=null,c=Pb(a,"HEAD")[0];c||(b=Pb(a,"BODY")[0],c=a.a("HEAD"),b.parentNode.insertBefore(c,b));b=a.a("STYLE");b.innerHTML=".dbg-sev{color:#F00}.dbg-w{color:#C40}.dbg-sh{font-weight:bold;color:#000}.dbg-i{color:#444}.dbg-f{color:#999}.dbg-ev{color:#0A0}.dbg-m{color:#990}.logmsg{border-bottom:1px solid #CCC;padding:2px}.logsep{background-color: #8C8;}.logdiv{border:1px solid #CCC;background-color:#FCFCFC;font:medium monospace}";
c.appendChild(b);this.a.className+=" logdiv"}function Rb(a){if(1!=a.c){var b;Fb();b=S;var c=a.m;b.a||(b.a=[]);b.a.push(c);a.c=!0}}
Qb.prototype.f=function(a){if(a){var b=100>=this.a.scrollHeight-this.a.scrollTop-this.a.clientHeight,c=this.g.createElement("DIV");c.className="logmsg";var d;var f=this.b;if(a){switch(a.f.value){case yb.value:d="dbg-sh";break;case zb.value:d="dbg-sev";break;case Ab.value:d="dbg-w";break;case Bb.value:d="dbg-i";break;default:d="dbg-f"}var g=[];g.push(f.c," ");if(f.a){var e=new Date(a.c);g.push("[",T(e.getFullYear()-2E3)+T(e.getMonth()+1)+T(e.getDate())+" "+T(e.getHours())+":"+T(e.getMinutes())+":"+
T(e.getSeconds())+"."+T(Math.floor(e.getMilliseconds()/10)),"] ")}var e=(a.c-f.f.a)/1E3,l=e.toFixed(3),m=0;if(1>e)m=2;else for(;100>e;)m++,e*=10;for(;0<m--;)l=" "+l;g.push("[",l,"s] ");g.push("[",a.g,"] ");g=O(g.join(""));e=qb;if(f.b&&a.a){var w;try{var k;var h=a.a,x;d:{for(var f=["window","location","href"],e=n,p;p=f.shift();)if(null!=e[p])e=e[p];else{x=null;break d}x=e}if(r(h))k={message:h,name:"Unknown error",lineNumber:"Not available",fileName:x,stack:"Not available"};else{var K,ya;p=!1;try{K=
h.lineNumber||h.A||"Not available"}catch(za){K="Not available",p=!0}try{ya=h.fileName||h.filename||h.sourceURL||n.$googDebugFname||x}catch(za){ya="Not available",p=!0}k=!p&&h.lineNumber&&h.fileName&&h.stack&&h.message&&h.name?h:{message:h.message||"Not available",name:h.name||"UnknownError",lineNumber:K,fileName:ya,stack:h.stack||"Not available"}}var Aa;var ha=k.fileName;null!=ha||(ha="");if(/^https?:\/\//i.test(ha)){var cc=fb(ha);Ya("view-source scheme plus HTTP/HTTPS URL");var dc="view-source:"+
db(cc);Aa=gb(dc)}else{var ec=Ya("sanitizedviewsrc");Aa=gb(Xa(ec))}w=P(O("Message: "+k.message+"\nUrl: "),pb("a",{href:Aa,target:"_new"},k.fileName),O("\nLine: "+k.lineNumber+"\n\nBrowser stack:\n"+k.stack+"-> [end]\n\nJS stack traversal:\n"+sb(void 0)+"-> "))}catch(za){w=O("Exception trying to expose exception! You win, we lose. "+za)}e=P(rb,w)}a=O(a.b);d=pb("span",{"class":d},P(a,e));d=P(g,d,rb)}else d=qb;c.innerHTML=M(d);this.a.appendChild(c);b&&(this.a.scrollTop=this.a.scrollHeight)}};
Qb.prototype.clear=function(){this.a&&(this.a.innerHTML=M(qb))};function U(a,b){a&&a.log(Bb,b,void 0)};var Sb;if(-1!=J.indexOf("iPhone")&&-1==J.indexOf("iPod")&&-1==J.indexOf("iPad")||-1!=J.indexOf("iPad")||-1!=J.indexOf("iPod"))Sb="";else{var Tb=/Version\/([0-9.]+)/.exec(J);Sb=Tb?Tb[1]:""};for(var Ub=0,Vb=ka(String(Sb)).split("."),Wb=ka("6").split("."),Xb=Math.max(Vb.length,Wb.length),Yb=0;0==Ub&&Yb<Xb;Yb++){var Zb=Vb[Yb]||"",$b=Wb[Yb]||"",ac=/(\d*)(\D*)/g,bc=/(\d*)(\D*)/g;do{var V=ac.exec(Zb)||["","",""],W=bc.exec($b)||["","",""];if(0==V[0].length&&0==W[0].length)break;Ub=ta(0==V[1].length?0:parseInt(V[1],10),0==W[1].length?0:parseInt(W[1],10))||ta(0==V[2].length,0==W[2].length)||ta(V[2],W[2])}while(0==Ub)};var fc=JSON.stringify;function X(a,b,c){var d=a.constructor;if(a.window===a)try{var f=a.constructor;delete a.constructor;d=a.constructor;a.constructor=f}catch(g){}return d.prototype[b].apply(a,Ca(arguments,2))};Gb("safaridriver.message");function gc(a){this.a={};this.a[hc]="webdriver";this.a[ic]=a}var hc="origin",ic="type";function jc(a){var b=window;a.a[hc]="webdriver";if(b.postMessage){var c,b=function(a){c=a.data};X(window,"addEventListener","safaridriver.message.response",b,!1);kc(a.a);X(window,"removeEventListener","safaridriver.message.response",b,!1);return c}var d=X(document,"createEvent","Events");d.initEvent("beforeload",!1,!1);return b.canLoad(d,a.a)}
function kc(a){var b=X(document,"createEvent","MessageEvent");b.initMessageEvent("safaridriver.message",!1,!1,a,window.location.origin,"0",window,[]);X(window,"dispatchEvent",b)}gc.prototype.toJSON=function(){return this.a};gc.prototype.toString=function(){return fc(this.toJSON())};function lc(a){gc.call(this,"connect");this.a.url=a}ga(lc,gc);function mc(){function a(){f+=1;jc(g)?(U(c,"Connected to extension"),U(c,"Requesting extension connect to client at "+d)):5>f?setTimeout(a,250*f):c&&c.log(zb,"Unable to establish a connection with the SafariDriver extension",void 0)}var b=document.createElement("h2");b.innerHTML="SafariDriver Launcher";document.body.appendChild(b);b=document.createElement("div");document.body.appendChild(b);Rb(new Qb(b));var c=Gb("safaridriver.client"),d=Ua();if(d){d=new z(d);U(c,"Connecting to SafariDriver browser extension...");
U(c,"This will fail if you have not installed the latest SafariDriver extension from\nhttp://selenium-release.storage.googleapis.com/index.html");U(c,"Extension logs may be viewed by clicking the Selenium [\u2713] button on the Safari toolbar");var f=0,g=new lc(d.toString());a()}else c&&c.log(zb,"No url specified. Please reload this page with the url parameter set",void 0)}var Y=["init"],Z=n;Y[0]in Z||!Z.execScript||Z.execScript("var "+Y[0]);
for(var nc;Y.length&&(nc=Y.shift());)Y.length||void 0===mc?Z[nc]?Z=Z[nc]:Z=Z[nc]={}:Z[nc]=mc;;window.onload = init;
