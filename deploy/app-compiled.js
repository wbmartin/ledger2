var g=void 0,i=!0,j=null,l=!1;function p(a){return function(b){this[a]=b}}function aa(a){return function(){return this[a]}}var q,ba=ba||{},t=this;function da(a){for(var a=a.split("."),b=t,c;c=a.shift();)if(b[c]!=j)b=b[c];else return j;return b}function ea(){}
function u(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function v(a){var b=u(a);return"array"==b||"object"==b&&"number"==typeof a.length}function w(a){return"string"==typeof a}function fa(a){var b=typeof a;return"object"==b&&a!=j||"function"==b}function y(a){return a[ga]||(a[ga]=++ha)}var ga="closure_uid_"+Math.floor(2147483648*Math.random()).toString(36),ha=0;function ia(a,b,c){return a.call.apply(a.bind,arguments)}
function ja(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function z(a,b,c){z=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ia:ja;return z.apply(j,arguments)}
function ka(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=Array.prototype.slice.call(arguments);b.unshift.apply(b,c);return a.apply(this,b)}}var la=Date.now||function(){return+new Date};function A(a,b){function c(){}c.prototype=b.prototype;a.i=b.prototype;a.prototype=new c};function ma(){this.Ia=la()}new ma;ma.prototype.set=p("Ia");ma.prototype.reset=function(){this.set(la())};function na(a,b){for(var c=1;c<arguments.length;c++)var d=String(arguments[c]).replace(/\$/g,"$$$$"),a=a.replace(/\%s/,d);return a}function B(a){if(!oa.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(pa,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(qa,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(ra,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(sa,"&quot;"));return a}var pa=/&/g,qa=/</g,ra=/>/g,sa=/\"/g,oa=/[&<>\"]/;function C(a){Error.captureStackTrace?Error.captureStackTrace(this,C):this.stack=Error().stack||"";a&&(this.message=String(a))}A(C,Error);C.prototype.name="CustomError";function ta(a,b){b.unshift(a);C.call(this,na.apply(j,b));b.shift();this.Va=a}A(ta,C);ta.prototype.name="AssertionError";function ua(a,b){throw new ta("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var D=Array.prototype,va=D.indexOf?function(a,b,c){return D.indexOf.call(a,b,c)}:function(a,b,c){c=c==j?0:0>c?Math.max(0,a.length+c):c;if(w(a))return!w(b)||1!=b.length?-1:a.indexOf(b,c);for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},E=D.forEach?function(a,b,c){D.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,f=w(a)?a.split(""):a,e=0;e<d;e++)e in f&&b.call(c,f[e],e,a)},wa=D.filter?function(a,b,c){return D.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,f=[],e=0,h=w(a)?a.split(""):
a,k=0;k<d;k++)if(k in h){var m=h[k];b.call(c,m,k,a)&&(f[e++]=m)}return f};function xa(a,b){var c=va(a,b);0<=c&&D.splice.call(a,c,1)}function ya(a,b,c){return 2>=arguments.length?D.slice.call(a,b):D.slice.call(a,b,c)};function za(a,b){for(var c in a)b.call(g,a[c],c,a)}function Aa(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function Ba(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}var Ca="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Da(a,b){for(var c,d,f=1;f<arguments.length;f++){d=arguments[f];for(c in d)a[c]=d[c];for(var e=0;e<Ca.length;e++)c=Ca[e],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function Ea(a){if("function"==typeof a.F)return a.F();if(w(a))return a.split("");if(v(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Aa(a)}function Fa(a,b,c){if("function"==typeof a.forEach)a.forEach(b,c);else if(v(a)||w(a))E(a,b,c);else{var d;if("function"==typeof a.S)d=a.S();else if("function"!=typeof a.F)if(v(a)||w(a)){d=[];for(var f=a.length,e=0;e<f;e++)d.push(e)}else d=Ba(a);else d=g;for(var f=Ea(a),e=f.length,h=0;h<e;h++)b.call(c,f[h],d&&d[h],a)}};function Ga(a,b){this.A={};this.b=[];var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof Ga?(c=a.S(),d=a.F()):(c=Ba(a),d=Aa(a));for(var f=0;f<c.length;f++)this.set(c[f],d[f])}}q=Ga.prototype;q.c=0;q.Pa=0;q.F=function(){Ha(this);for(var a=[],b=0;b<this.b.length;b++)a.push(this.A[this.b[b]]);return a};q.S=function(){Ha(this);return this.b.concat()};
function Ha(a){if(a.c!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Object.prototype.hasOwnProperty.call(a.A,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.c!=a.b.length){for(var f={},c=b=0;b<a.b.length;)d=a.b[b],Object.prototype.hasOwnProperty.call(f,d)||(a.b[c++]=d,f[d]=1),b++;a.b.length=c}}q.set=function(a,b){Object.prototype.hasOwnProperty.call(this.A,a)||(this.c++,this.b.push(a),this.Pa++);this.A[a]=b};var F,Ia,Ja,Ka;function La(){return t.navigator?t.navigator.userAgent:j}Ka=Ja=Ia=F=l;var Ma;if(Ma=La()){var Na=t.navigator;F=0==Ma.indexOf("Opera");Ia=!F&&-1!=Ma.indexOf("MSIE");Ja=!F&&-1!=Ma.indexOf("WebKit");Ka=!F&&!Ja&&"Gecko"==Na.product}var Oa=F,G=Ia,H=Ka,I=Ja,Pa=t.navigator,Qa=-1!=(Pa&&Pa.platform||"").indexOf("Mac"),Ra;
a:{var Sa="",J;if(Oa&&t.opera)var Ta=t.opera.version,Sa="function"==typeof Ta?Ta():Ta;else if(H?J=/rv\:([^\);]+)(\)|;)/:G?J=/MSIE\s+([^\);]+)(\)|;)/:I&&(J=/WebKit\/(\S+)/),J)var Ua=J.exec(La()),Sa=Ua?Ua[1]:"";if(G){var Va,Wa=t.document;Va=Wa?Wa.documentMode:g;if(Va>parseFloat(Sa)){Ra=String(Va);break a}}Ra=Sa}var Xa={};
function K(a){var b;if(!(b=Xa[a])){b=0;for(var c=String(Ra).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),f=Math.max(c.length,d.length),e=0;0==b&&e<f;e++){var h=c[e]||"",k=d[e]||"",m=RegExp("(\\d*)(\\D*)","g"),n=RegExp("(\\d*)(\\D*)","g");do{var r=m.exec(h)||["","",""],s=n.exec(k)||["","",""];if(0==r[0].length&&0==s[0].length)break;b=((0==r[1].length?0:parseInt(r[1],10))<(0==s[1].length?0:parseInt(s[1],10))?-1:(0==r[1].length?0:parseInt(r[1],
10))>(0==s[1].length?0:parseInt(s[1],10))?1:0)||((0==r[2].length)<(0==s[2].length)?-1:(0==r[2].length)>(0==s[2].length)?1:0)||(r[2]<s[2]?-1:r[2]>s[2]?1:0)}while(0==b)}b=Xa[a]=0<=b}return b}var Ya={};function Za(){return Ya[9]||(Ya[9]=G&&!!document.documentMode&&9<=document.documentMode)};function $a(a){return ab(a||arguments.callee.caller,[])}
function ab(a,b){var c=[];if(0<=va(b,a))c.push("[...circular reference...]");else if(a&&50>b.length){c.push(bb(a)+"(");for(var d=a.arguments,f=0;f<d.length;f++){0<f&&c.push(", ");var e;e=d[f];switch(typeof e){case "object":e=e?"object":"null";break;case "string":break;case "number":e=String(e);break;case "boolean":e=e?"true":"false";break;case "function":e=(e=bb(e))?e:"[fn]";break;default:e=typeof e}40<e.length&&(e=e.substr(0,40)+"...");c.push(e)}b.push(a);c.push(")\n");try{c.push(ab(a.caller,b))}catch(h){c.push("[exception trying to get caller]\n")}}else a?
c.push("[...long stack...]"):c.push("[end]");return c.join("")}function bb(a){if(cb[a])return cb[a];a=String(a);if(!cb[a]){var b=/function ([^\(]+)/.exec(a);cb[a]=b?b[1]:"[Anonymous]"}return cb[a]}var cb={};function L(a,b,c,d,f){this.reset(a,b,c,d,f)}L.prototype.Ka=0;L.prototype.ca=j;L.prototype.ba=j;var db=0;L.prototype.reset=function(a,b,c,d,f){this.Ka="number"==typeof f?f:db++;this.Xa=d||la();this.w=a;this.Da=b;this.Ua=c;delete this.ca;delete this.ba};L.prototype.ua=p("w");function M(a){this.Ea=a}M.prototype.f=j;M.prototype.w=j;M.prototype.k=j;M.prototype.ha=j;function eb(a,b){this.name=a;this.value=b}eb.prototype.toString=aa("name");var fb=new eb("SEVERE",1E3),gb=new eb("WARNING",900),hb=new eb("CONFIG",700),ib=new eb("FINE",500);q=M.prototype;q.getParent=aa("f");q.ea=function(){this.k||(this.k={});return this.k};q.ua=p("w");function jb(a){if(a.w)return a.w;if(a.f)return jb(a.f);ua("Root logger has no level set.");return j}
q.log=function(a,b,c){if(a.value>=jb(this).value){a=this.wa(a,b,c);b="log:"+a.Da;t.console&&(t.console.timeStamp?t.console.timeStamp(b):t.console.markTimeline&&t.console.markTimeline(b));t.msWriteProfilerMark&&t.msWriteProfilerMark(b);for(b=this;b;){var c=b,d=a;if(c.ha)for(var f=0,e=g;e=c.ha[f];f++)e(d);b=b.getParent()}}};
q.wa=function(a,b,c){var d=new L(a,String(b),this.Ea);if(c){d.ca=c;var f;var e=arguments.callee.caller;try{var h;var k=da("window.location.href");if(w(c))h={message:c,name:"Unknown error",lineNumber:"Not available",fileName:k,stack:"Not available"};else{var m,n,r=l;try{m=c.lineNumber||c.Ta||"Not available"}catch(s){m="Not available",r=i}try{n=c.fileName||c.filename||c.sourceURL||k}catch(ca){n="Not available",r=i}h=r||!c.lineNumber||!c.fileName||!c.stack?{message:c.message,name:c.name,lineNumber:m,
fileName:n,stack:c.stack||"Not available"}:c}f="Message: "+B(h.message)+'\nUrl: <a href="view-source:'+h.fileName+'" target="_new">'+h.fileName+"</a>\nLine: "+h.lineNumber+"\n\nBrowser stack:\n"+B(h.stack+"-> ")+"[end]\n\nJS stack traversal:\n"+B($a(e)+"-> ")}catch(x){f="Exception trying to expose exception! You win, we lose. "+x}d.ba=f}return d};function N(a,b){a.log(ib,b,g)}var kb={},lb=j;
function mb(a){lb||(lb=new M(""),kb[""]=lb,lb.ua(hb));var b;if(!(b=kb[a])){b=new M(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=mb(a.substr(0,c));c.ea()[d]=b;b.f=c;kb[a]=b}return b};var nb,ob=!G||Za(),pb=!H&&!G||G&&Za()||H&&K("1.9.1");G&&K("9");function qb(a,b){var c;c=a.className;c=w(c)&&c.match(/\S+/g)||[];for(var d=ya(arguments,1),f=c.length+d.length,e=c,h=0;h<d.length;h++)0<=va(e,d[h])||e.push(d[h]);a.className=c.join(" ");return c.length==f};var rb={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};function O(a,b,c){return sb(document,arguments)}
function sb(a,b){var c=b[0],d=b[1];if(!ob&&d&&(d.name||d.type)){c=["<",c];d.name&&c.push(' name="',B(d.name),'"');if(d.type){c.push(' type="',B(d.type),'"');var f={};Da(f,d);delete f.type;d=f}c.push(">");c=c.join("")}var e=a.createElement(c);d&&(w(d)?e.className=d:"array"==u(d)?qb.apply(j,[e].concat(d)):za(d,function(a,b){"style"==b?e.style.cssText=a:"class"==b?e.className=a:"for"==b?e.htmlFor=a:b in rb?e.setAttribute(rb[b],a):0==b.lastIndexOf("aria-",0)||0==b.lastIndexOf("data-",0)?e.setAttribute(b,
a):e[b]=a}));if(2<b.length){d=function(b){b&&e.appendChild(w(b)?a.createTextNode(b):b)};for(c=2;c<b.length;c++){var h=b[c];if(v(h)&&!(fa(h)&&0<h.nodeType)){var k;a:{if(h&&"number"==typeof h.length){if(fa(h)){k="function"==typeof h.item||"string"==typeof h.item;break a}if("function"==u(h)){k="function"==typeof h.item;break a}}k=l}f=E;if(k)if(k=h.length,0<k){for(var m=Array(k),n=0;n<k;n++)m[n]=h[n];h=m}else h=[];f(h,d)}else d(h)}}return e}function tb(a){this.s=a||t.document||document}q=tb.prototype;
q.fa=function(a){return w(a)?this.s.getElementById(a):a};q.O=function(a,b,c){return sb(this.s,arguments)};q.createElement=function(a){return this.s.createElement(a)};q.createTextNode=function(a){return this.s.createTextNode(a)};q.appendChild=function(a,b){a.appendChild(b)};q.ea=function(a){return pb&&a.children!=g?a.children:wa(a.childNodes,function(a){return 1==a.nodeType})};function ub(a,b,c){a.push(encodeURIComponent(b)+"="+encodeURIComponent(c))}function vb(a){var b=a.type;if(b===g)return j;switch(b.toLowerCase()){case "checkbox":case "radio":return a.checked?a.value:j;case "select-one":return b=a.selectedIndex,0<=b?a.options[b].value:j;case "select-multiple":for(var b=[],c,d=0;c=a.options[d];d++)c.selected&&b.push(c.value);return b.length?b:j;default:return a.value!==g?a.value:j}};function P(){0!=wb&&(this.Sa=Error().stack,xb[y(this)]=this)}var wb=0,xb={};P.prototype.Z=l;P.prototype.l=function(){if(!this.Z&&(this.Z=i,this.d(),0!=wb)){var a=y(this);delete xb[a]}};P.prototype.d=function(){this.va&&yb.apply(j,this.va);if(this.qa)for(;this.qa.length;)this.qa.shift()()};function yb(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];v(d)?yb.apply(j,d):d&&"function"==typeof d.l&&d.l()}};!G||Za();var zb=!G||Za(),Ab=G&&!K("9");!I||K("528");H&&K("1.9b")||G&&K("8")||Oa&&K("9.5")||I&&K("528");H&&!K("8")||G&&K("9");function Q(a,b){this.type=a;this.currentTarget=this.target=b}q=Q.prototype;q.d=function(){};q.l=function(){};q.p=l;q.defaultPrevented=l;q.L=i;q.preventDefault=function(){this.defaultPrevented=i;this.L=l};function Bb(a){Bb[" "](a);return a}Bb[" "]=ea;function Cb(a,b){a&&this.I(a,b)}A(Cb,Q);q=Cb.prototype;q.target=j;q.relatedTarget=j;q.offsetX=0;q.offsetY=0;q.clientX=0;q.clientY=0;q.screenX=0;q.screenY=0;q.button=0;q.keyCode=0;q.charCode=0;q.ctrlKey=l;q.altKey=l;q.shiftKey=l;q.metaKey=l;q.Ha=l;q.aa=j;
q.I=function(a,b){var c=this.type=a.type;Q.call(this,c);this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(H){var f;a:{try{Bb(d.nodeName);f=i;break a}catch(e){}f=l}f||(d=j)}}else"mouseover"==c?d=a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=I||a.offsetX!==g?a.offsetX:a.layerX;this.offsetY=I||a.offsetY!==g?a.offsetY:a.layerY;this.clientX=a.clientX!==g?a.clientX:a.pageX;this.clientY=a.clientY!==g?a.clientY:a.pageY;this.screenX=a.screenX||
0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.Ha=Qa?a.metaKey:a.ctrlKey;this.state=a.state;this.aa=a;a.defaultPrevented&&this.preventDefault();delete this.p};
q.preventDefault=function(){Cb.i.preventDefault.call(this);var a=this.aa;if(a.preventDefault)a.preventDefault();else if(a.returnValue=l,Ab)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};q.d=function(){};function Db(){}var Eb=0;q=Db.prototype;q.key=0;q.q=l;q.X=l;q.I=function(a,b,c,d,f,e){if("function"==u(a))this.la=i;else if(a&&a.handleEvent&&"function"==u(a.handleEvent))this.la=l;else throw Error("Invalid listener argument");this.z=a;this.sa=b;this.src=c;this.type=d;this.capture=!!f;this.T=e;this.X=l;this.key=++Eb;this.q=l};q.handleEvent=function(a){return this.la?this.z.call(this.T||this.src,a):this.z.handleEvent.call(this.z,a)};var R={},S={},T={},U={};
function Fb(a,b,c,d,f){if(b){if("array"==u(b)){for(var e=0;e<b.length;e++)Fb(a,b[e],c,d,f);return j}var d=!!d,h=S;b in h||(h[b]={c:0,g:0});h=h[b];d in h||(h[d]={c:0,g:0},h.c++);var h=h[d],k=y(a),m;h.g++;if(h[k]){m=h[k];for(e=0;e<m.length;e++)if(h=m[e],h.z==c&&h.T==f){if(h.q)break;return m[e].key}}else m=h[k]=[],h.c++;var n=Gb,r=zb?function(a){return n.call(r.src,r.key,a)}:function(a){a=n.call(r.src,r.key,a);if(!a)return a},e=r;e.src=a;h=new Db;h.I(c,e,a,b,d,f);c=h.key;e.key=c;m.push(h);R[c]=h;T[k]||
(T[k]=[]);T[k].push(h);a.addEventListener?(a==t||!a.Y)&&a.addEventListener(b,e,d):a.attachEvent(b in U?U[b]:U[b]="on"+b,e);return c}throw Error("Invalid event type");}function Hb(a,b,c,d,f){if("array"==u(b))for(var e=0;e<b.length;e++)Hb(a,b[e],c,d,f);else{d=!!d;a:{e=S;if(b in e&&(e=e[b],d in e&&(e=e[d],a=y(a),e[a]))){a=e[a];break a}a=j}if(a)for(e=0;e<a.length;e++)if(a[e].z==c&&a[e].capture==d&&a[e].T==f){V(a[e].key);break}}}
function V(a){if(!R[a])return l;var b=R[a];if(b.q)return l;var c=b.src,d=b.type,f=b.sa,e=b.capture;c.removeEventListener?(c==t||!c.Y)&&c.removeEventListener(d,f,e):c.detachEvent&&c.detachEvent(d in U?U[d]:U[d]="on"+d,f);c=y(c);T[c]&&(f=T[c],xa(f,b),0==f.length&&delete T[c]);b.q=i;if(b=S[d][e][c])b.pa=i,Ib(d,e,c,b);delete R[a];return i}
function Ib(a,b,c,d){if(!d.J&&d.pa){for(var f=0,e=0;f<d.length;f++)d[f].q?d[f].sa.src=j:(f!=e&&(d[e]=d[f]),e++);d.length=e;d.pa=l;0==e&&(delete S[a][b][c],S[a][b].c--,0==S[a][b].c&&(delete S[a][b],S[a].c--),0==S[a].c&&delete S[a])}}function Jb(a,b,c,d,f){var e=1,b=y(b);if(a[b]){a.g--;a=a[b];a.J?a.J++:a.J=1;try{for(var h=a.length,k=0;k<h;k++){var m=a[k];m&&!m.q&&(e&=Kb(m,f)!==l)}}finally{a.J--,Ib(c,d,b,a)}}return Boolean(e)}function Kb(a,b){a.X&&V(a.key);return a.handleEvent(b)}
function Gb(a,b){if(!R[a])return i;var c=R[a],d=c.type,f=S;if(!(d in f))return i;var f=f[d],e,h;if(!zb){e=b||da("window.event");var k=i in f,m=l in f;if(k){if(0>e.keyCode||e.returnValue!=g)return i;a:{var n=l;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(r){n=i}if(n||e.returnValue==g)e.returnValue=i}}n=new Cb;n.I(e,this);e=i;try{if(k){for(var s=[],ca=n.currentTarget;ca;ca=ca.parentNode)s.push(ca);h=f[i];h.g=h.c;for(var x=s.length-1;!n.p&&0<=x&&h.g;x--)n.currentTarget=s[x],e&=Jb(h,s[x],d,i,n);if(m){h=
f[l];h.g=h.c;for(x=0;!n.p&&x<s.length&&h.g;x++)n.currentTarget=s[x],e&=Jb(h,s[x],d,l,n)}}else e=Kb(c,n)}finally{s&&(s.length=0)}return e}d=new Cb(b,this);return e=Kb(c,d)};function Lb(a){P.call(this);this.ya=a;this.b=[]}A(Lb,P);var Mb=[];Lb.prototype.d=function(){Lb.i.d.call(this);E(this.b,V);this.b.length=0};Lb.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented");};function W(){P.call(this)}A(W,P);q=W.prototype;q.Y=i;q.K=j;q.W=p("K");q.addEventListener=function(a,b,c,d){Fb(this,a,b,c,d)};q.removeEventListener=function(a,b,c,d){Hb(this,a,b,c,d)};
q.dispatchEvent=function(a){var b=a.type||a,c=S;if(b in c){if(w(a))a=new Q(a,this);else if(a instanceof Q)a.target=a.target||this;else{var d=a,a=new Q(b,this);Da(a,d)}var d=1,f,c=c[b],b=i in c,e;if(b){f=[];for(e=this;e;e=e.K)f.push(e);e=c[i];e.g=e.c;for(var h=f.length-1;!a.p&&0<=h&&e.g;h--)a.currentTarget=f[h],d&=Jb(e,f[h],a.type,i,a)&&a.L!=l}if(l in c)if(e=c[l],e.g=e.c,b)for(h=0;!a.p&&h<f.length&&e.g;h++)a.currentTarget=f[h],d&=Jb(e,f[h],a.type,l,a)&&a.L!=l;else for(f=this;!a.p&&f&&e.g;f=f.K)a.currentTarget=
f,d&=Jb(e,f,a.type,l,a)&&a.L!=l;a=Boolean(d)}else a=i;return a};q.d=function(){W.i.d.call(this);var a,b=0,c=a==j;a=!!a;if(this==j)za(T,function(d){for(var e=d.length-1;0<=e;e--){var f=d[e];if(c||a==f.capture)V(f.key),b++}});else{var d=y(this);if(T[d])for(var d=T[d],f=d.length-1;0<=f;f--){var e=d[f];if(c||a==e.capture)V(e.key),b++}}this.K=j};G||I&&K("525");var Nb=t.window;function Ob(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);};function Pb(){}Pb.prototype.B=j;var Qb;function Rb(){}A(Rb,Pb);function Sb(a){return(a=Tb(a))?new ActiveXObject(a):new XMLHttpRequest}function Ub(a){var b={};Tb(a)&&(b[0]=i,b[1]=i);return b}
function Tb(a){if(!a.ja&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.ja=d}catch(f){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.ja}Qb=new Rb;var Vb=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");function Wb(a){P.call(this);this.headers=new Ga;this.r=a||j}A(Wb,W);Wb.prototype.e=mb("goog.net.XhrIo");var Xb=/^https?$/i,Yb=[];function Zb(a){a.l();xa(Yb,a)}q=Wb.prototype;q.j=l;q.a=j;q.N=j;q.V="";q.na="";q.u=0;q.v="";q.R=l;q.H=l;q.U=l;q.m=l;q.M=0;q.o=j;q.ta="";q.Ra=l;
q.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request");b=b?b.toUpperCase():"GET";this.V=a;this.v="";this.u=0;this.na=b;this.R=l;this.j=i;this.a=this.r?Sb(this.r):Sb(Qb);this.N=this.r?this.r.B||(this.r.B=Ub(this.r)):Qb.B||(Qb.B=Ub(Qb));this.a.onreadystatechange=z(this.ra,this);try{N(this.e,X(this,"Opening Xhr")),this.U=i,this.a.open(b,a,i),this.U=l}catch(f){N(this.e,X(this,"Error opening Xhr: "+f.message));$b(this,f);return}var a=c||"",e=new Ga(this.headers);
d&&Fa(d,function(a,b){e.set(b,a)});d=t.FormData&&a instanceof t.FormData;if(b="POST"==b)b=!Object.prototype.hasOwnProperty.call(e.A,"Content-Type")&&!d;b&&e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");Fa(e,function(a,b){this.a.setRequestHeader(b,a)},this);this.ta&&(this.a.responseType=this.ta);"withCredentials"in this.a&&(this.a.withCredentials=this.Ra);try{this.o&&(Nb.clearTimeout(this.o),this.o=j),0<this.M&&(N(this.e,X(this,"Will abort after "+this.M+"ms if incomplete")),
this.o=Nb.setTimeout(z(this.Ma,this),this.M)),N(this.e,X(this,"Sending request")),this.H=i,this.a.send(a),this.H=l}catch(h){N(this.e,X(this,"Send error: "+h.message)),$b(this,h)}};q.Ma=function(){"undefined"!=typeof ba&&this.a&&(this.v="Timed out after "+this.M+"ms, aborting",this.u=8,N(this.e,X(this,this.v)),this.dispatchEvent("timeout"),this.abort(8))};function $b(a,b){a.j=l;a.a&&(a.m=i,a.a.abort(),a.m=l);a.v=b;a.u=5;ac(a);bc(a)}
function ac(a){a.R||(a.R=i,a.dispatchEvent("complete"),a.dispatchEvent("error"))}q.abort=function(a){this.a&&this.j&&(N(this.e,X(this,"Aborting")),this.j=l,this.m=i,this.a.abort(),this.m=l,this.u=a||7,this.dispatchEvent("complete"),this.dispatchEvent("abort"),bc(this))};q.d=function(){this.a&&(this.j&&(this.j=l,this.m=i,this.a.abort(),this.m=l),bc(this,i));Wb.i.d.call(this)};q.ra=function(){!this.U&&!this.H&&!this.m?this.Ga():cc(this)};q.Ga=function(){cc(this)};
function cc(a){if(a.j&&"undefined"!=typeof ba)if(a.N[1]&&4==dc(a)&&2==ec(a))N(a.e,X(a,"Local request error detected and ignored"));else if(a.H&&4==dc(a))Nb.setTimeout(z(a.ra,a),0);else if(a.dispatchEvent("readystatechange"),4==dc(a)){N(a.e,X(a,"Request complete"));a.j=l;try{var b=ec(a),c,d;a:switch(b){case 200:case 201:case 202:case 204:case 304:case 1223:d=i;break a;default:d=l}if(!(c=d)){var f;if(f=0===b){var e=String(a.V).match(Vb)[1]||j;if(!e&&self.location)var h=self.location.protocol,e=h.substr(0,
h.length-1);f=!Xb.test(e?e.toLowerCase():"")}c=f}if(c)a.dispatchEvent("complete"),a.dispatchEvent("success");else{a.u=6;var k;try{k=2<dc(a)?a.a.statusText:""}catch(m){N(a.e,"Can not get status: "+m.message),k=""}a.v=k+" ["+ec(a)+"]";ac(a)}}finally{bc(a)}}}function bc(a,b){if(a.a){var c=a.a,d=a.N[0]?ea:j;a.a=j;a.N=j;a.o&&(Nb.clearTimeout(a.o),a.o=j);b||a.dispatchEvent("ready");try{c.onreadystatechange=d}catch(f){a.e.log(fb,"Problem encountered resetting onreadystatechange: "+f.message,g)}}}
function dc(a){return a.a?a.a.readyState:0}function ec(a){try{return 2<dc(a)?a.a.status:-1}catch(b){return a.e.log(gb,"Can not get status: "+b.message,g),-1}}function X(a,b){return b+" ["+a.na+" "+a.V+" "+ec(a)+"]"};function Y(){}Y.ga=function(){return Y.ka?Y.ka:Y.ka=new Y};Y.prototype.Fa=0;Y.ga();function Z(a){P.call(this);a||(a=nb||(nb=new tb));this.Q=a;this.Ja=fc}A(Z,W);Z.prototype.za=Y.ga();var fc=j;q=Z.prototype;q.ia=j;q.n=l;q.h=j;q.Ja=j;q.Ca=j;q.f=j;q.k=j;q.C=j;q.Qa=l;q.fa=aa("h");q.getParent=aa("f");q.W=function(a){if(this.f&&this.f!=a)throw Error("Method not supported");Z.i.W.call(this,a)};q.O=function(){this.h=this.Q.createElement("div")};q.P=p("h");q.D=function(){this.n=i;gc(this,function(a){!a.n&&a.fa()&&a.D()})};
q.t=function(){gc(this,function(a){a.n&&a.t()});if(this.G){var a=this.G;E(a.b,V);a.b.length=0}this.n=l};q.d=function(){Z.i.d.call(this);this.n&&this.t();this.G&&(this.G.l(),delete this.G);gc(this,function(a){a.l()});if(!this.Qa&&this.h){var a=this.h;a&&a.parentNode&&a.parentNode.removeChild(a)}this.f=this.Ca=this.h=this.C=this.k=j};function gc(a,b){a.k&&E(a.k,b,g)}
q.removeChild=function(a,b){if(a){var c=w(a)?a:a.ia||(a.ia=":"+(a.za.Fa++).toString(36)),d;this.C&&c?(d=this.C,d=(c in d?d[c]:g)||j):d=j;a=d;if(c&&a){d=this.C;c in d&&delete d[c];xa(this.k,a);b&&(a.t(),a.h&&(c=a.h)&&c.parentNode&&c.parentNode.removeChild(c));c=a;if(c==j)throw Error("Unable to set parent component");c.f=j;Z.i.W.call(c,j)}}if(!a)throw Error("Child is not in parent component");return a};G&&K(8);var hc=new W;hc.addEventListener("TEST",function(){alert("test")},l);function ic(){this.type="TEST";this.Wa="2"};function jc(a,b){var c=O("td",j,a),d=O("td",j,b);return O("tr",j,c,d)};function $(a){Z.call(this,a);this.$=new Lb(this);this.ma=j}A($,Z);q=$.prototype;q.O=function(){this.P(this.Q.createElement("div"))};
q.P=function(a){$.i.P.call(this,a);a.innerHTML='<h1>Login</h1><span class="small" >Please enter your login credentials</span></hr>';var b=[];this.Ba=O("label",j,"Username");this.Oa=O("input",{name:"user_id",type:"text"});b[0]=jc(this.Ba,this.Oa);this.Aa=O("label",j,"Password");this.Na=O("input",{name:"password",type:"password"});b[1]=jc(this.Aa,this.Na);for(var c=O("table",j),d=b.length,f=0;f<d;f++)c.appendChild(b[f]);this.da=O("form",j,c);a.appendChild(this.da);this.oa=O("button",j,"Login");a.appendChild(this.oa);
a=this.$;b=this.oa;c=this.La;d="click";"array"!=u(d)&&(Mb[0]=d,d=Mb);for(f=0;f<d.length;f++){var e=Fb(b,d[f],c||a,l,a.ya||a);a.b.push(e)}};q.d=function(){$.i.d.call(this);this.$.l();this.ma&&this.ma.l()};q.D=function(){$.i.D.call(this)};q.t=function(){$.i.t.call(this)};
q.La=function(){var a,b=[];a=this.da;for(var c=a.elements,d,f=0;d=c[f];f++)if(!(d.form!=a||d.disabled||"fieldset"==d.tagName.toLowerCase())){var e=d.name;switch(d.type.toLowerCase()){case "file":case "submit":case "reset":case "button":break;case "select-multiple":d=vb(d);if(d!=j)for(var h,k=0;h=d[k];k++)ub(b,e,h);break;default:h=vb(d),h!=j&&ub(b,e,h)}}c=a.getElementsByTagName("input");for(f=0;d=c[f];f++)d.form==a&&"image"==d.type.toLowerCase()&&(e=d.name,ub(b,e,d.value),ub(b,e+".x","0"),ub(b,e+".y",
"0"));a=b.join("&");b=this.xa;a+="&spwfResource=SECURITY_USER&spwfAction=AUTHENTICATE";f=new Wb;Yb.push(f);b&&Fb(f,"complete",b);Fb(f,"ready",ka(Zb,f));f.send("./cgi-bin/server.pl","POST",a,g)};q.xa=function(a){a=a.target;a=a.a?Ob(a.a.responseText):g;""!==a.rows[0].session_id?hc.dispatchEvent(new ic):alert("failed")};
hc.addEventListener("LOGIN_PAGE",function(){kc===g&&(kc=new $);var a=kc,b=lc;if(a.n)throw Error("Component already rendered");a.h||a.O();b?b.insertBefore(a.h,j):a.Q.s.body.appendChild(a.h);(!a.f||a.f.n)&&a.D()},l);var kc;mb("app");var lc;lc=w("mainContent")?document.getElementById("mainContent"):"mainContent";
