var c=this;var d,e,f,g;function h(){return c.navigator?c.navigator.userAgent:null}g=f=e=d=!1;var i;if(i=h()){var l=c.navigator;d=0==i.indexOf("Opera");e=!d&&-1!=i.indexOf("MSIE");f=!d&&-1!=i.indexOf("WebKit");g=!d&&!f&&"Gecko"==l.product}var m=e,n=g,p=f,q;
a:{var r="",t;if(d&&c.opera)var u=c.opera.version,r="function"==typeof u?u():u;else if(n?t=/rv\:([^\);]+)(\)|;)/:m?t=/MSIE\s+([^\);]+)(\)|;)/:p&&(t=/WebKit\/(\S+)/),t)var v=t.exec(h()),r=v?v[1]:"";if(m){var w,x=c.document;w=x?x.documentMode:void 0;if(w>parseFloat(r)){q=String(w);break a}}q=r}var A={};
function B(s){if(!A[s]){for(var j=0,y=String(q).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),z=String(s).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),E=Math.max(y.length,z.length),k=0;0==j&&k<E;k++){var F=y[k]||"",G=z[k]||"",H=RegExp("(\\d*)(\\D*)","g"),I=RegExp("(\\d*)(\\D*)","g");do{var a=H.exec(F)||["","",""],b=I.exec(G)||["","",""];if(0==a[0].length&&0==b[0].length)break;j=((0==a[1].length?0:parseInt(a[1],10))<(0==b[1].length?0:parseInt(b[1],10))?-1:(0==a[1].length?0:parseInt(a[1],10))>
(0==b[1].length?0:parseInt(b[1],10))?1:0)||((0==a[2].length)<(0==b[2].length)?-1:(0==a[2].length)>(0==b[2].length)?1:0)||(a[2]<b[2]?-1:a[2]>b[2]?1:0)}while(0==j)}A[s]=0<=j}}var C={};function D(){return C[9]||(C[9]=m&&!!document.documentMode&&9<=document.documentMode)};!m||D();!n&&!m||m&&D()||n&&B("1.9.1");m&&B("9");
