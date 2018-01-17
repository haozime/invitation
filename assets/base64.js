!function(t){"use strict";var r,e=t.Base64;if("undefined"!=typeof module&&module.exports)try{r=require("buffer").Buffer}catch(t){}var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o=function(t){for(var r={},e=0,n=t.length;e<n;e++)r[t.charAt(e)]=e;return r}(n),c=String.fromCharCode,u=function(t){if(t.length<2){return(r=t.charCodeAt(0))<128?t:r<2048?c(192|r>>>6)+c(128|63&r):c(224|r>>>12&15)+c(128|r>>>6&63)+c(128|63&r)}var r=65536+1024*(t.charCodeAt(0)-55296)+(t.charCodeAt(1)-56320);return c(240|r>>>18&7)+c(128|r>>>12&63)+c(128|r>>>6&63)+c(128|63&r)},a=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,i=function(t){return t.replace(a,u)},f=function(t){var r=[0,2,1][t.length%3],e=t.charCodeAt(0)<<16|(t.length>1?t.charCodeAt(1):0)<<8|(t.length>2?t.charCodeAt(2):0);return[n.charAt(e>>>18),n.charAt(e>>>12&63),r>=2?"=":n.charAt(e>>>6&63),r>=1?"=":n.charAt(63&e)].join("")},s=t.btoa?function(r){return t.btoa(r)}:function(t){return t.replace(/[\s\S]{1,3}/g,f)},d=r?r.from&&r.from!==Uint8Array.from?function(t){return(t.constructor===r.constructor?t:r.from(t)).toString("base64")}:function(t){return(t.constructor===r.constructor?t:new r(t)).toString("base64")}:function(t){return s(i(t))},h=function(t,r){return r?d(String(t)).replace(/[+\/]/g,function(t){return"+"==t?"-":"_"}).replace(/=/g,""):d(String(t))},g=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),l=function(t){switch(t.length){case 4:var r=((7&t.charCodeAt(0))<<18|(63&t.charCodeAt(1))<<12|(63&t.charCodeAt(2))<<6|63&t.charCodeAt(3))-65536;return c(55296+(r>>>10))+c(56320+(1023&r));case 3:return c((15&t.charCodeAt(0))<<12|(63&t.charCodeAt(1))<<6|63&t.charCodeAt(2));default:return c((31&t.charCodeAt(0))<<6|63&t.charCodeAt(1))}},A=function(t){return t.replace(g,l)},p=function(t){var r=t.length,e=r%4,n=(r>0?o[t.charAt(0)]<<18:0)|(r>1?o[t.charAt(1)]<<12:0)|(r>2?o[t.charAt(2)]<<6:0)|(r>3?o[t.charAt(3)]:0),u=[c(n>>>16),c(n>>>8&255),c(255&n)];return u.length-=[0,0,2,1][e],u.join("")},b=t.atob?function(r){return t.atob(r)}:function(t){return t.replace(/[\s\S]{1,4}/g,p)},C=r?r.from&&r.from!==Uint8Array.from?function(t){return(t.constructor===r.constructor?t:r.from(t,"base64")).toString()}:function(t){return(t.constructor===r.constructor?t:new r(t,"base64")).toString()}:function(t){return A(b(t))},m=function(t){return C(String(t).replace(/[-_]/g,function(t){return"-"==t?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};if(t.Base64={VERSION:"2.4.1",atob:b,btoa:s,fromBase64:m,toBase64:h,utob:i,encode:h,encodeURI:function(t){return h(t,!0)},btou:A,decode:m,noConflict:function(){var r=t.Base64;return t.Base64=e,r}},"function"==typeof Object.defineProperty){var B=function(t){return{value:t,enumerable:!1,writable:!0,configurable:!0}};t.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",B(function(){return m(this)})),Object.defineProperty(String.prototype,"toBase64",B(function(t){return h(this,t)})),Object.defineProperty(String.prototype,"toBase64URI",B(function(){return h(this,!0)}))}}t.Meteor&&(Base64=t.Base64),"undefined"!=typeof module&&module.exports?module.exports.Base64=t.Base64:"function"==typeof define&&define.amd&&define([],function(){return t.Base64}),t.Base64}(window);