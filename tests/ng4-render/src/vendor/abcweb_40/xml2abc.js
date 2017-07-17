//~ Version: 64, Copyright (C) 2014-2016: Willem Vree
//~ This program is free software; you can redistribute it and/or modify it under the terms of the
//~ GNU General Public License as published by the Free Software Foundation; either version 2 of
//~ the License, or (at your option) any later version.
//~ This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
//~ without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//~ See the GNU General Public License for more details. <http://www.gnu.org/licenses/gpl.html>.
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(n,t,q){if(q.get||q.set)throw new TypeError("ES3 does not support getters and setters.");n!=Array.prototype&&n!=Object.prototype&&(n[t]=q.value)};$jscomp.getGlobal=function(n){return"undefined"!=typeof window&&window===n?n:"undefined"!=typeof global&&null!=global?global:n};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(n){return $jscomp.SYMBOL_PREFIX+(n||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var n=$jscomp.global.Symbol.iterator;n||(n=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[n]&&$jscomp.defineProperty(Array.prototype,n,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(n){var t=0;return $jscomp.iteratorPrototype(function(){return t<n.length?{done:!1,value:n[t++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(n){$jscomp.initSymbolIterator();n={next:n};n[$jscomp.global.Symbol.iterator]=function(){return this};return n};$jscomp.iteratorFromArray=function(n,t){$jscomp.initSymbolIterator();n instanceof String&&(n+="");var q=0,p={next:function(){if(q<n.length){var v=q++;return{value:t(v,n[v]),done:!1}}p.next=function(){return{done:!0,value:void 0}};return p.next()}};p[Symbol.iterator]=function(){return p};return p};
$jscomp.polyfill=function(n,t,q,p){if(t){q=$jscomp.global;n=n.split(".");for(p=0;p<n.length-1;p++){var v=n[p];v in q||(q[v]={});q=q[v]}n=n[n.length-1];p=q[n];t=t(p);t!=p&&null!=t&&$jscomp.defineProperty(q,n,{configurable:!0,writable:!0,value:t})}};$jscomp.polyfill("Array.prototype.keys",function(n){return n?n:function(){return $jscomp.iteratorFromArray(this,function(n){return n})}},"es6-impl","es3");
$jscomp.findInternal=function(n,t,q){n instanceof String&&(n=String(n));for(var p=n.length,v=0;v<p;v++){var z=n[v];if(t.call(q,z,v,n))return{i:v,v:z}}return{i:-1,v:void 0}};$jscomp.polyfill("Array.prototype.find",function(n){return n?n:function(n,q){return $jscomp.findInternal(this,n,q).v}},"es6-impl","es3");xml2abc_VERSION=64;
(function(){function n(a,b){for(var c=[];a;)c.push(b),--a;return c}function t(a,b){for(var c=0,d={};c<a.length;++c)d[a[c]]=b[c];return d}function q(a,b){var c=a.split(/%[ds]/);c.length>b.length&&b.push("");return b.map(function(a,b){return c[b]+a}).join("")}function p(a,b){r.info(q(a,b))}function v(a,b){return-1!==a.indexOf(b,a.length-b.length)}function z(a){return Object.keys(a).map(function(a){return parseInt(a)})}function G(a,b){var c=[],d;if(Array.isArray(a))for(d=0;d<a.length;++d)d in a&&c.push([d,
a[d]]);else for(d in a)c.push([d,a[d]]);c.sort(b?function(a,b){return a[0]-b[0]}:function(a,b){return a[1]-b[1]||b[0]-a[0]});return c}function H(a){this.reset();this.ixp=a;this.divs=this.mdur=this.ixm=0}function A(a,b){this.tijd=0;this.dur=a;this.fact=null;this.tup=[""];this.tupabc="";this.grace=this.beam=0;this.after=this.before="";this.ns=b?[b]:[];this.lyrs={};this.pos=0}function B(a){this.tijd=0;this.str=a;this.pos=0}function C(){}function x(a){this.maxtime=this.tijd=0;this.gMaten=[];this.gLyrics=
[];this.vnums={};this.cnt=new C;this.vceCnt=1;this.lastnote=null;this.bpl=a.b;this.cpl=a.n;this.repbra=0;this.nvlt=a.v}function D(a,b,c,d){this.fnmext=a;this.outlist=[];this.infolist=[];this.title="T:Title";this.key="none";this.clefs={};this.mtr="none";this.tempo=0;this.pad=b;this.X=c+1;this.denL=d.d;this.volpan=d.m;this.cmpL=[];this.rightmargin=this.leftmargin=this.pagewidth=this.scale="";4==d.p.length&&(this.scale=""!=d.p[0]?parseFloat(d.p[0]):"",this.pagewidth=""!=d.p[1]?parseFloat(d.p[1]):"",
this.leftmargin=""!=d.p[2]?parseFloat(d.p[2]):"",this.rightmargin=""!=d.p[3]?parseFloat(d.p[3]):"")}function P(a,b){if(!a.join(""))return["",0];for(var c=[],d=0;d<a.length;++d){var f=a[d];""==f?f=b?"_":"*":v(f,"_")&&!v(f,"\\_")?(f=f.replace("_",""),b=1):b=0;c.push(f)}return[c.join(" "),b]}function F(a,b){for(var c=a,d=b,f;b;)f=a%b,a=b,b=f;return[c/a,d/a]}function I(a,b,c){if(0==a.dur)return"";var d;d=F(c*a.dur,4*b);b=d[0];c=d[1];a.fact&&(d=a.fact[0],a=a.fact[1],d=F(b*d,c*a),b=d[0],c=d[1]);64<c&&(a=
b/c,d=Math.floor(a),a-d<.1*a&&(b=d,c=1),d=F(Math.round(64*b/c)||1,64),p("denominator too small: %d/%d rounded to %d/%d",[b,c,d[0],d[1]]),b=d[0],c=d[1]);return 1==b?1==c?"":2==c?"/":"/"+c:1==c?""+b:b+"/"+c}function J(a){var b=a.match(/([_^]*)([A-Ga-g])([',]*)/);if(!b)return-1;a=b[1];var c=b[2],b=b[3],d;d=c.toUpperCase();c=60+[0,2,4,5,7,9,11]["CDEFGAB".indexOf(d)]+(d!=c?12:0);a&&(c+=("^"==a[0]?1:-1)*a.length);b&&(c+=("'"==b[0]?12:-12)*b.length);return c}function Q(a,b,c,d){var f;f=0;0<=c.indexOf("stafflines=1")&&
(f+=4);!d&&0<=c.indexOf("bass")&&(f+=12);f&&(c="CDEFGAB".split(""),f=c.indexOf(a)+f,a=c[f%7],b+=Math.floor(f/7));4<b&&(a=a.toLowerCase());5<b&&(a+=Array(b-5+1).join("'"));4>b&&(a+=Array(4-b+1).join(","));return a}function K(a,b,c){var d=0,f,e,g=b[a];e=g.tup.indexOf("start");-1<e&&g.tup.splice(e,1);var h=a;for(c=[g.fact[0]/c[0],g.fact[1]/c[1]];a<b.length;){g=b[a];if(!(g instanceof B||g.grace)){-1<g.tup.indexOf("start")?(e=K(a,b,c),a=e[0],e=e[1],d+=e):g.fact&&(d+=1);e=g.tup.indexOf("stop");if(-1<e){g.tup.splice(e,
1);break}if(!g.fact){a=f;break}f=a}a+=1}f=[c[0],c[1],d];f="3,2,3"==f.toString()?"(3":q("(%d:%d:%d",f);b[h].tupabc=f+b[h].tupabc;return[a,d]}function R(a){a=a.filter(function(a){return a instanceof A});for(var b=0;b<a.length-1;){var c=a[b],d=a[b+1];!c.fact&&!d.fact&&0<c.dur&&d.beam&&(3*c.dur==d.dur?(d.dur=2*d.dur/3,c.dur*=2,c.after="<"+c.after,b+=1):3*d.dur==c.dur&&(c.dur=2*c.dur/3,d.dur*=2,c.after=">"+c.after,b+=1));b+=1}}function S(a,b,c,d,f){for(d=0;d<a.length;)c=a[d],c instanceof A&&c.fact&&(c=
K(d,a,[1,1]),d=c[0]),d+=1;d=[];for(var e,g=0;g<a.length;++g){c=a[g];if(c instanceof A){var h=I(c,b,f),k=1<c.ns.length;e=c.ns.filter(function(a){return v(a,"-")});e=e.map(function(a){return a.slice(0,-1)});var l="";k&&e.length==c.ns.length&&(c.ns=e,l="-");e=c.tupabc+c.before;k&&(e+="[");e+=c.ns.join("");k&&(e+="]"+l);v(e,"-")&&(e=e.slice(0,-1),l="-");e+=h+l;e+=c.after;c=c.beam}else e=c.str,c=1;c?d.push(e):d.push(" "+e)}return d.join("")}function T(a,b){a.map(function(a,b){a.pos=b});a.sort(function(a,
b){return a.tijd-b.tijd||a.pos-b.pos});for(var c=0,d=[],f=0;f<a.length;++f){var e=a[f];e.tijd>c&&d.push(new A(e.tijd-c,"x"));if(e instanceof B)e.tijd<c&&(e.tijd=c),d.push(e),c=e.tijd;else{if(e.tijd<c){if("z"==e.ns[0])continue;var g=d[d.length-1];if(g.tijd<=e.tijd)if("z"==g.ns[0])g.dur=e.tijd-g.tijd,0==g.dur&&d.pop(),p("overlap in part %d, measure %d: rest shortened",[b.ixp+1,b.ixm+1]);else{g.ns=g.ns.concat(e.ns);p("overlap in part %d, measure %d: added chord",[b.ixp+1,b.ixm+1]);e.dur=e.tijd+e.dur-
c;if(0>=e.dur)continue;e.tijd=c}else{p("overlapping notes in one voice! part %d, measure %d, note %s discarded",[b.ixp+1,b.ixm+1,e instanceof A?e.ns:e.str]);continue}}d.push(e);c=e.tijd+e.dur}}0==c&&p("empty measure in part %d, measure %d, it should contain at least a rest to advance the time!",[b.ixp+1,b.ixm+1]);return d}function U(a){function b(a){a=q('<part-group number="%d" type="%s"></part-group>',[a,"stop"]);a=$.parseXML(a).firstChild;return $(a)}var c,d,f,e,g,h,k;c=[];d=[];h=a.children();for(g=
0;g<h.length;g++)a=$(h[g]),"part-group"==a[0].nodeName?(f=a.attr("number"),e=a.attr("type"),k=d.indexOf(f),"start"==e?-1<k?(c.push(b(f)),c.push(a)):(c.push(a),d.push(f)):-1<k&&(d.splice(k,1),c.push(a))):c.push(a);for(g=d.length-1;0<=g;--g)f=d[g],c.push(b(f));return c}function E(a,b,c){var d,f,e,g;if(0==a.length)return[[],[]];d=a.shift();if("part-group"==d[0].nodeName){f=d.attr("number");e=d.attr("type");if("start"==e){e=[];for(g in{"group-symbol":0,"group-barline":0,"group-name":0,"group-abbreviation":0})e.push(d.find(g).text()||
"");b[f]=e;c.push(f);g=E(a,b,c);a=g[0];d=g[1];g=E(d,b,c);b=g[0];c=g[1];return[[a].concat(b),c]}c=c.pop();a.length&&"stop"==a[0].attr("type")&&f!=c&&(g=b[c],b[c]=b[f],b[f]=g);b=b[f];return[[b],a]}g=E(a,b,c);b=g[0];a=g[1];return[[["name_tuple",d.find("part-name").text()||"",d.find("part-abbreviation").text()||""]].concat(b),a]}function L(a){var b,c,d,f;if(0==a.length)return[];b=[];for(d=0;d<a.length;++d){c=a[d];if(1==c.length)b.push(""+c[0]);else{b.push("(");for(f=0;f<c.length;++f)b.push(""+c[f]);b.push(")")}b.push("|")}b.splice(-1,
1);1<a.length&&(b=["{"].concat(b).concat(["}"]));return b}function M(a,b,c,d,f,e){if("name_tuple"==a[0])d=d.shift(),b[0]&&(a[1]=b[0]+":"+a[1],a[2]=b[1]+":"+a[2]),f.push(a),e.push.apply(e,L(d));else if(2==a.length)d=d.shift(),c=["name_tuple","",""],c[1]=a[0][1]+":"+a[1][2],c[2]=a[0][2]+":"+a[1][3],f.push(c),e.push.apply(e,L(d));else{var g,h,k;k=a[a.length-1];b=k[0];g=k[1];h=k[2];k=k[3];g="yes"==g||c;e.push("brace"==b?"{":"[");for(c=0;c<a.length-1;++c)M(a[c],[h,k],g,d,f,e),g&&e.push("|");g&&e.splice(-1,
1);e.push("brace"==b?"}":"]")}}function V(a){for(var b="",c=a.children(),d=0;d<c.length;++d){var f=c[d];switch(f.nodeName){case "elision":b+="~";break;case "text":b+=$(f).text().replace(/_/g,"\\_").replace(/-/g,"\\-").replace(/ /g,"~")}}if(!b)return b;c=a.find("syllabic").text();if("begin"==c||"middle"==c)b+="-";a.find("extend").length&&(b+="_");return b}function u(a){this.slurBuf={};this.wedge_type="";this.ingrace=0;this.msc=new x(a);this.unfold=a.u;this.ctf=a.c;this.gStfMap=[];this.midiMap=[];this.drumInst=
{};this.drumNotes={};this.instMid=[];this.midDflt=[-1,-1,-1,-91];this.msralts={};this.curalts={};this.stfMap={};this.clefMap={};this.curClef={};this.clefOct={};this.curStf={};this.nolbrk=a.x;this.doPageFmt=1==a.p.length;this.tstep=a.t}var W=Math.pow(2,53),N={"ornaments>trill-mark":"T","ornaments>mordent":"M","ornaments>inverted-mordent":"P","ornaments>turn":"!turn!","ornaments>inverted-turn":"!invertedturn!","ornaments>tremolo":"!///!","technical>up-bow":"u","technical>down-bow":"v","technical>harmonic":"!open!",
"technical>open-string":"!open!","technical>stopped":"!plus!","articulations>accent":"!>!","articulations>strong-accent":"!>!","articulations>staccato":".","articulations>staccatissimo":"!wedge!",fermata:"!fermata!",arpeggiate:"!arpeggio!","articulations>tenuto":"!tenuto!","articulations>spiccato":"!wedge!","articulations>breath-mark":"!breath!","articulations>detached-legato":"!tenuto!."},O={p:"!p!",pp:"!pp!",ppp:"!ppp!",f:"!f!",ff:"!ff!",fff:"!fff!",mp:"!mp!",mf:"!mf!",sfz:"!sfz!"},r;H.prototype.reset=
function(){this.lline=this.attr="";this.rline="|";this.lnum=""};C.prototype.inc=function(a,b){this.counters[a][b]=(this.counters[a][b]||0)+1};C.prototype.clear=function(a){a=Object.keys(a);var b=n(a.length,0);this.counters={note:t(a,b),nopr:t(a,b),nopt:t(a,b)}};C.prototype.getv=function(a,b){return this.counters[a][b]};C.prototype.prcnt=function(a){for(var b in this.counters.note)0!=this.getv("nopr",b)&&p("part %d, voice %d has %d skipped non printable notes",[a,b,this.getv("nopr",b)]),0!=this.getv("nopt",
b)&&p("part %d, voice %d has %d notes without pitch",[a,b,this.getv("nopt",b)]),0==this.getv("note",b)&&p("part %d, skipped empty voice %d",[a,b])};x.prototype.initVoices=function(a){this.vtimes={};this.voices={};this.lyrics={};for(var b in this.vnums)this.vtimes[b]=0,this.voices[b]=[],this.lyrics[b]=[];a&&this.cnt.clear(this.vnums)};x.prototype.incTime=function(a){this.tijd+=a;this.tijd>this.maxtime&&(this.maxtime=this.tijd)};x.prototype.appendElemCv=function(a,b){for(var c in a)this.appendElem(c,
b)};x.prototype.insertElem=function(a,b){var c=new B(b);c.tijd=0;this.voices[a].unshift(c)};x.prototype.appendObj=function(a,b,c){b.tijd=this.tijd;this.voices[a].push(b);this.incTime(c);this.tijd>this.vtimes[a]&&(this.vtimes[a]=this.tijd)};x.prototype.appendElem=function(a,b,c){this.appendObj(a,new B(b),0);c&&this.cnt.inc("note",a)};x.prototype.appendNote=function(a,b,c){b.ns.push(c);this.appendObj(a,b,parseInt(b.dur));"z"!=c&&"x"!=c&&(this.lastnote=b,this.cnt.inc("note",a),b.grace||this.lyrics[a].push(b.lyrs))};
x.prototype.getLastRec=function(a){return this.gMaten.length?(a=this.gMaten[this.gMaten.length-1][a],a[a.length-1]):null};x.prototype.getLastMelis=function(a,b){if(this.gLyrics.length){var c=this.gLyrics[this.gLyrics.length-1][a];if(b in c)return c[b][1]}return 0};x.prototype.addChord=function(a){this.lastnote.ns.push(a)};x.prototype.addBar=function(a,b){b.mdur&&this.maxtime>b.mdur&&p("measure %d in part %d longer than metre",[b.ixm+1,b.ixp+1]);this.tijd=this.maxtime;for(var c in this.vnums){if(b.lline||
b.lnum){var d=this.getLastRec(c);if(d){var f=d.str;b.lline&&(f=(f+b.lline).replace(/:\|:/g,"::").replace(/\|\|/g,"|"));3==this.nvlt?b.ixp+parseInt(c)==Math.min.apply(null,z(this.vnums))&&(f+=b.lnum):4==this.nvlt?parseInt(c)==Math.min.apply(null,z(this.vnums))&&(f+=b.lnum):b.lnum&&(f+=b.lnum,this.repbra=1);d.str=f}else b.lline&&this.insertElem(c,"|:")}a&&(d=this.getLastRec(c))&&(d.str+=a);b.attr&&this.insertElem(c,""+b.attr);this.appendElem(c," "+b.rline);this.voices[c]=T(this.voices[c],b);for(var d=
this.lyrics[c],f={},e=d.reduce(function(a,b){return a.concat(z(b))},[]),g=Math.max.apply(null,e.concat([0]));0<g;--g){var e=d.map(function(a){return a[g]||""}),h=this.getLastMelis(c,g);f[g]=P(e,h)}this.lyrics[c]=f;R(this.voices[c])}this.gMaten.push(this.voices);this.gLyrics.push(this.lyrics);this.tijd=this.maxtime=0;this.initVoices()};x.prototype.outVoices=function(a,b){var c,d,f,e,g,h,k,l,m;g={};k=Math.min.apply(null,z(this.vnums));for(l in this.vnums)if(0!=this.cnt.getv("note",l)){if(r.denL)h=r.denL;
else{var w,p;h=l;m=this.gMaten;e=a;c=0;d=W;for(var q=[4,8,16];q.length;){var y=q.shift(),t=0;for(p=0;p<m.length;++p){var v=m[p][h];for(w=0;w<v.length;++w){var u=v[w];u instanceof B||0==u.dur||(t+=I(u,e,y).length)}}t<d&&(c=y,d=t)}h=c}r.cmpL.push(h);w=[];p={};for(m=0;m<this.gMaten.length;++m){e=this.gMaten[m][l];w.push(S(e,a,m,b,h));e=void 0;q=this.gLyrics;if(0!=m)for(e in c=this.gMaten[m][l],d=q[m][l],q=q[m-1][l],q)if(y=q[e][1],!(e in d)&&y){y=c;t=[];for(v=0;v<y.length;++v)if(u=y[v],u instanceof A&&
!u.grace){if("z"==u.ns[0]||"x"==u.ns[0])break;t.push("_")}(y=t.join(" "))&&(d[e]=[y,0])}c=this.gLyrics[m][l];for(f in c)if(e=c[f],e=e[0],f in p){for(;p[f].length<m;)p[f].push("");p[f].push(e)}else p[f]=n(m,"").concat([e])}for(f in p)e=p[f],h=w.length-e.length,p[f]=e.concat(n(h,""));r.add("V:"+this.vceCnt);this.repbra&&(1==this.nvlt&&1<this.vceCnt&&r.add("I:repbra 0"),2==this.nvlt&&parseInt(l)>k&&r.add("I:repbra 0"));0<this.cpl?this.bpl=0:0==this.bpl&&(this.cpl=100);for(h=0;w.length;){m=1;for(e=w[0];m<
w.length&&!(0<this.cpl&&e.length+w[m].length>=this.cpl)&&!(0<this.bpl&&m>=this.bpl);)e+=w[m],m+=1;h+=m;r.add(e+" %"+h);w.splice(0,m);c=G(p,1);for(d=0;d<c.length;++d)e=c[d],f=e[0],e=e[1],r.add("w: "+e.slice(0,m).join("|")+"|"),e.splice(0,m)}g[l]=this.vceCnt;this.vceCnt+=1}this.gMaten=[];this.gLyrics=[];this.cnt.prcnt(b+1);return g};D.prototype.add=function(a){this.outlist.push(a+"\n")};D.prototype.info=function(a,b){this.infolist.push(("undefined"==typeof b||b?"-- ":"")+a)};D.prototype.mkHeader=function(a,
b,c){var d=[],f=[],e,g,h,k,l,m;k=a.slice();for(m=0;m<b.length;++m){e=b[m];try{M(e,["",""],"",a,d,f)}catch(w){p("lousy musicxml: error in part-list",[])}}b=f.join(" ");a={};for(m=0;m<k.length;++m)g=k[m],e=d[m],h=e[1],e=e[2],0!=g.length&&(g=g[0][0],h=h.replace(/\n/g,"\\n").replace(/\.:/g,".").replace(/^:|:$/g,""),e=e.replace(/\n/g,"\\n").replace(/\.:/g,".").replace(/^:|:$/g,""),a[g]=(h?'nm="'+h+'"':"")+(e?' snm="'+e+'"':""));d=[q("X:%d\n%s\n",[this.X,this.title])];""!==this.scale&&d.push("%%scale "+
this.scale+"\n");""!==this.pagewidth&&d.push("%%pagewidth "+this.pagewidth+"cm\n");""!==this.leftmargin&&d.push("%%leftmargin "+this.leftmargin+"cm\n");""!==this.rightmargin&&d.push("%%rightmargin "+this.rightmargin+"cm\n");b&&1<f.length&&d.push("%%score "+b+"\n");k=this.tempo?"Q:1/4="+this.tempo+"\n":"";f=[];for(m=0;m<this.cmpL.length;++m)e=this.cmpL[m],f[e]=(f[e]||0)+1;f=G(f);f=f[f.length-1][0];f=this.denL?this.denL:f;d.push(q("L:1/%d\n%sM:%s\n",[f,k,this.mtr]));d.push(q("I:linebreak $\nK:%s\n",
[this.key]));for(l in this.clefs){e=c[l-1];m=e[0];b=e[1];h=e[1];g=e[3];k=e.slice(4);e=this.clefs[l];k.length&&0>e.indexOf("perc")&&(e=(e+" map=perc").trim());d.push(q("V:%d %s %s\n",[l,e,a[l]||""]));1<this.volpan?(0<m&&m!=l&&d.push("%%MIDI channel "+m+"\n"),0<b&&d.push("%%MIDI program "+(b-1)+"\n"),0<=h&&d.push("%%MIDI control 7 "+h+"\n"),0<=g&&d.push("%%MIDI control 10 "+g+"\n")):0<this.volpan&&(k.length&&0<m&&d.push("%%MIDI channel "+m+"\n"),0<b&&d.push("%%MIDI program "+(b-1)+"\n"));for(m=0;m<
k.length;++m)if(e=k[m].nt,h=k[m].step,b=k[m].midi,(g=k[m].nhd)||(g="normal"),J(e)!=b||e!=h)0<this.volpan&&d.push("%%MIDI drummap "+e+" "+b+"\n"),d.push("I:percmap "+e+" "+h+" "+b+" "+g+"\n");f!=this.cmpL[l-1]&&d.push("L:1/"+this.cmpL[l-1]+"\n")}this.outlist=d.concat(this.outlist)};u.prototype.matchSlur=function(a,b,c,d,f,e){if(-1!=["start","stop"].indexOf(a))if(b||(b="1"),b in this.slurBuf){var g=this.slurBuf[b],h=g[0],k=g[1],l=g[2],g=g[3];a!=h?(c!=k||"start"!=h||g&&e||(l.before="("+l.before,d.after+=
")"),delete this.slurBuf[b]):(p("double slur numbers %s-%s in part %d, measure %d, voice %d note %s, first discarded",[a,b,this.msr.ixp+1,this.msr.ixm+1,c,d.ns]),this.slurBuf[b]=[a,c,d,f])}else this.slurBuf[b]=[a,c,d,f]};u.prototype.doNotations=function(a,b){for(var c=Object.keys(N).sort(),d=0;d<c.length;++d){var f=c[d],e=N[f];b.find(f).length&&(a.before+=e)}c=b.find("technical>fingering");c.length&&(a.before+="!"+c.text()+"!");c=b.find("ornaments>wavy-line");if(c.length)switch(c.attr("type")){case "start":a.before=
"!trill(!"+a.before;break;case "stop":a.after+="!trill)!"}};u.prototype.ntAbc=function(a,b,c,d){var f={"double-flat":-2,"flat-flat":-2,flat:-1,natural:0,sharp:1,"sharp-sharp":2,"double-sharp":2};b+=this.clefOct[this.curStf[d]]||0;var e=a;4<b&&(e=a.toLowerCase());5<b&&(e+=Array(b-5+1).join("'"));4>b&&(e+=Array(4-b+1).join(","));b=c.find("accidental").text();var g=c.find("pitch>alter").text();!g&&this.msralts[a]&&(g=0);var h=e+"#"+d;!g&&h in this.curalts&&(g=0);if(""===b&&""===g)return e;if(""!=b)g=
f[b];else{g=parseInt(g);if(h in this.curalts){if(g==this.curalts[h])return e}else if(g==(this.msralts[a]||0))return e;if(c.find("tie").map(function(){return $(this).attr("type")}).get().some(function(a){return"stop"==a}))return e;p("accidental %d added in part %d, measure %d, voice %d note %s",[g,this.msr.ixp+1,this.msr.ixm+1,d+1,e])}this.curalts[h]=g;return e=["__","_","=","^","^^"][g+2]+e};u.prototype.doNote=function(a){var b=new A(0,null),c=parseInt(a.find("voice").text()||"1");this.isSib&&(c+=
100*(a.find("staff").text()||1));var d=0<a.find("chord").length,f=a.find("pitch>step").text()||a.find("unpitched>display-step").text(),e=a.find("pitch>octave").text()||a.find("unpitched>display-octave").text(),g=0<a.find("rest").length,h=a.find("time-modification>actual-notes").text();if(h){var k=a.find("time-modification>normal-notes").text();b.fact=[parseInt(h),parseInt(k)]}b.tup=a.find("notations>tuplet").map(function(){return $(this).attr("type")}).get();k=a.find("duration").text();h=a.find("grace");
b.grace=0<h.length;b.before="";b.after="";b.grace&&!this.ingrace&&(this.ingrace=1,b.before="{","yes"==h.attr("slash")&&(b.before+="/"));if(h=!b.grace&&this.ingrace)this.ingrace=0,this.msc.lastnote.after+="}";if(!k||b.grace)k=0;if(g||"no"!=a.attr("print-object")){b.dur=parseInt(k);g||f&&e||(this.msc.cnt.inc("nopt",c),e=5,f="E");k=a.find("notations");k.length&&this.doNotations(b,k);g=g?"no"==a.attr("print-object")?"x":"z":this.ntAbc(f,parseInt(e),a,c);if(a.find("unpitched").length){var k=this.curClef[this.curStf[c]],
f=Q(f,parseInt(e),k,this.tstep),e=a.find("instrument"),e=e.length?e.attr("id"):"dummyId",e=this.drumInst[e]||J(g),k=a.find("notehead"),l=k.text().replace(" ","-");"yes"==k.attr("filled")&&(l+="+");"x"==l&&(g="^"+g.replace(/\^/g,"").replace(/_/g,""));if("circle-x"==l||"diamond"==l)g="_"+g.replace(/\^/g,"").replace(/_/g,"");this.drumNotes[c+";"+g]=[f,e,l]}f=a.find("tie").map(function(){return $(this).attr("type")}).get();-1<f.indexOf("start")&&(g+="-");f=a.find("beam").map(function(){return $(this).text()}).get();
b.beam=-1<f.indexOf("continue")||-1<f.indexOf("end")||b.grace;f=a.find("lyric");for(e=k=0;e<f.length;++e){var l=$(f[e]),m=parseInt((l.attr("number")||"1").replace(/^.*verse/,""));0==m?m=k+1:k=m;b.lyrs[m]=V(l)}d?this.msc.addChord(g):(d=parseInt(a.find("staff").text()||"1"),this.curStf[c]!=d&&(f=d-this.curStf[c],this.curStf[c]=d,this.msc.appendElem(c,"[I:staff "+(0<f?"+":"")+f+"]")),this.msc.appendNote(c,b,g));f=a.find("notations>slur");for(e=0;e<f.length;++e)a=$(f[e]),this.matchSlur(a.attr("type"),
a.attr("number"),c,this.msc.lastnote,b.grace,h)}else d||this.msc.incTime(parseInt(k)),this.msc.cnt.inc("nopr",c)};u.prototype.doAttr=function(a){var b,c,d,f,e,g,h,k,l,m,p,q;b={C1:"alto1",C2:"alto2",C3:"alto",C4:"tenor",F4:"bass",F3:"bass3",G2:"treble",TAB:"",percussion:"perc"};if(c=a.find("divisions").text())this.msr.divs=parseInt(c);c=parseInt(a.find("transpose>chromatic").text()||"0");d=a.find("key>fifths").first().text();f=0==this.msc.tijd&&0==this.msr.ixm;d&&(e=parseInt(d),g=a.find("key>mode").first().text()||
"major",l="FCGDAEB".split(""),k="Cb Gb Db Ab Eb Bb F C G D A E B F# C#".split(" "),h="Ab Eb Bb F C G D A E B F# C# G# D# A#".split(" "),d="","major"==g&&(d=k[7+e]),"minor"==g&&(d=h[7+e]+"min"),e=0<=e?t(l.slice(0,e),n(e,1)):t(l.slice(e),n(-e,-1)),e=[d,e],d=e[0],this.msralts=e[1],f&&!c&&"none"==r.key?r.key=d:d==r.key&&f||(this.msr.attr+="[K:"+d+"]"));if(d=a.find("time>beats").text())e=a.find("time>beat-type").text(),g=d+"/"+e,f?r.mtr=g:this.msr.attr+="[M:"+g+"]",this.msr.mdur=this.msr.divs*parseInt(d)*
4/parseInt(e);(d=a.find("transpose>octave-change").text()||"")&&(c+=12*parseInt(d));g=a.find("clef");for(e=0;e<g.length;e++)if(h=$(g[e]),d=parseInt(h.attr("number")||"1"),k=h.find("sign").text(),l="percussion"!=k?h.find("line").text()||"":"",l=b[k+l]||"",k=h.find("clef-octave-change").text()||"0",l+={"-2":"-15","-1":"-8",1:"+8",2:"+15"}[k]||"",this.clefOct[d]=-parseInt(k),c&&(l+=" transpose="+c),(k=a.find("staff-details>staff-lines").text())&&(l+=" stafflines="+k),this.curClef[d]=l,f)this.clefMap[d]=
l;else for(h=this.stfMap[d],q=0;q<h.length;++q)m=h[q],d!=this.curStf[m]&&(p=d-this.curStf[m],this.curStf[m]=d,k=0<p?"+":"",this.msc.appendElem(m,"[I:staff "+k+p+"]")),this.msc.appendElem(m,"[K:"+l+"]")};u.prototype.doDirection=function(a){var b,c,d,f,e,g,h,k,l;d=parseInt(a.find("staff").first().text()||"1");d=this.stfMap[d][0];b=a.attr("placement");c=a.find("sound");if(c.length){if(g=c.find("midi-instrument")){h=c.find("midi-instrument>midi-program").text();k=c.find("midi-instrument>midi-channel").text();
for(l in this.vceInst)this.vceInst[l]==g.attr("id")&&(d=l);(l=(h?h-1:k)+"")&&0<r.volpan&&this.msc.appendElem(d,"[I:MIDI= "+(h?"program":"channel")+" "+l+"]")}if(c=c.attr("tempo"))c=-1<c.indexOf(".")?parseFloat(c).toFixed(2):parseInt(c),0==this.msc.tijd&&0==this.msr.ixm?r.tempo=c:this.msc.appendElem(d,"[Q:1/4="+c+"]")}a=a.children("direction-type");if(a.length){c=a.find("wedge");if(c.length){switch(c.attr("type")){case "crescendo":f="!<(!";this.wedge_type="<";break;case "diminuendo":f="!>(!";this.wedge_type=
">";break;case "stop":f="<"==this.wedge_type?"!<)!":"!>)!";break;default:raise("wrong wedge type")}this.msc.appendElem(d,f)}f=a.find("words").eq(0);0==f.length&&(f=a.find("rehearsal").eq(0));f.length&&(b="below"==b?"_":"^",0>parseFloat(f.attr("default-y")||"0")&&(b="_"),(f=f.text().replace(/"/g,'\\"').replace(/\n/g," ").trim())&&this.msc.appendElem(d,'"'+b+f+'"',1));for(e in O)b=O[e],a.find("dynamics>"+e).length&&this.msc.appendElem(d,b,1);a.find("coda").length&&this.msc.appendElem(d,"O",1);a.find("segno").length&&
this.msc.appendElem(d,"S",1)}};u.prototype.doHarmony=function(a){var b,c,d,f,e,g,h,k,l;b=parseInt(a.children("staff").text()||"1");b=this.stfMap[b][0];c={major:"",minor:"m",augmented:"+",diminished:"dim",dominant:"7","half-diminished":"m7b5"};d={major:"maj",dominant:"",minor:"m",diminished:"dim",augmented:"+",suspended:"sus"};f={second:"2",fourth:"4",seventh:"7",sixth:"6",ninth:"9","11th":"11","13th":"13"};e={1:"#",0:"","-1":"b"};g=a.find("root>root-step","").text();h=e[a.find("root>root-alter").text()]||
"";k="";l=a.find("kind").text();l in c?l=c[l]:-1<l.indexOf("-")?(c=l.split("-"),l=c[0],c=c[1],l=(d[l]||"")+(f[c]||""),0==l.indexOf("sus")&&(k=l,l="")):"none"==l&&(l=a.find("kind").attr("text"));d=a.find("degree");for(f=0;f<d.length;++f)c=$(d[f]),l+=(e[c.find("degree-alter").text()]||"")+c.find("degree-value").text();l=l.replace("79","9").replace("713","13").replace("maj6","6");a=a.find("bass>bass-step").text()+(e[a.find("bass>bass-alter").text()]||"");this.msc.appendElem(b,'"'+g+h+l+k+(a&&"/"+a)+
'"',1)};u.prototype.doBarline=function(a){var b=a.find("repeat"),c=0;b.length&&(c=b.attr("direction"));if(this.unfold)return c?"forward"==c?1:2:0;"right"==a.attr("location")&&(b=a.find("bar-style").text(),"light-light"==b?this.msr.rline="||":"light-heavy"==b&&(this.msr.rline="|]"));c&&("forward"==c?this.msr.lline=":":this.msr.rline=":|");a=a.find("ending");a.length&&("start"==a.attr("type")?(a=(a.attr("number")||"1").replace(/\./g,"").replace(/ /g,""),/^[\d,]+$/.test(a)||(a='"'+a.trim()+'"'),this.msr.lnum=
a):"|"==this.msr.rline&&(this.msr.rline="||"));return 0};u.prototype.doPrint=function(a){if("yes"==a.attr("new-system")||"yes"==a.attr("new-page"))return this.nolbrk?"":"$"};u.prototype.doPartList=function(a){var b,c,d,f,e,g,h,k,l,m;f=a.find("part-list>score-part");for(b=0;b<f.length;++b){c=f[b];e={};g=$(c).find("midi-instrument");for(c=0;c<g.length;++c){h=$(g[c]);l=["midi-channel","midi-program","volume","pan"];k=[];for(d=0;d<l.length;++d)m=l[d],k.push(h.find(m).text()||this.midDflt[d]);d=k[3];-90<=
d&&90>=d&&(d=(d+90)/180*127);e[h.attr("id")]=[parseInt(k[0]),parseInt(k[1]),parseFloat(k[2]),d];(k=h.find("midi-unpitched").text())&&(this.drumInst[h.attr("id")]=k-1)}this.instMid.push(e)}a=a.find("part-list");k=U(a);return E(k,{},[])[0]};u.prototype.mkTitle=function(a){var b,c,d=[],f=[],e=[],g,h,k,l,m;b=a.find("work>work-title").text().trim();c=a.find("movement-title").text().trim();g=a.find("identification>creator");for(h=0;h<g.length;++h)k=$(g[h]),l=k.text(),k=k.attr("type"),l&&(l=l.split("\n").map(function(a){return a.trim()}),
"composer"==k?d.push.apply(d,l):"lyricist"!=k&&"transcriber"!=k||f.push.apply(f,l));g=a.find("identification>rights");for(h=0;h<g.length;++h)l=$(g[h]).text(),l=l.split("\n").map(function(a){return a.trim()}),f.push.apply(f,l);g=a.find("credit");for(h=0;h<g.length;++h){l="";k=$(g[h]).find("credit-words");for(m=0;m<k.length;++m)l+=$(k[m]).text();e.push(l.replace(/\s*[\r\n]\s*/g," "))}e=function(a){function g(a){return a&&-1<h.indexOf(a)}var k=[],h,l;for(l=0;l<e.length;++l)h=e[l],6>a&&(h&&-1<b.indexOf(h)||
h&&-1<c.indexOf(h))||5>a&&(h&&-1<d.indexOf(h)||h&&-1<f.indexOf(h))||4>a&&(b&&-1<h.indexOf(b)||c&&-1<h.indexOf(c))||3>a&&(d.some(g)||f.some(g))||2>a&&/^[\d\W]*$/.test(h)||k.push(h);0==a&&b+c&&(k="");return k}(this.ctf);b&&(b="T:"+b.replace(/\n/g,"\nT:")+"\n");c&&(b+="T:"+c.replace(/\n/g,"\nT:")+"\n");e.length&&(b+=e.map(function(a){return"T:"+a}).join("\n")+"\n");d.length&&(b+=d.map(function(a){return"C:"+a}).join("\n")+"\n");f.length&&(b+=f.map(function(a){return"Z:"+a}).join("\n")+"\n");b&&(r.title=
b.substr(0,b.length-1));(this.isSib=0<=a.find("identification>encoding>software").text().indexOf("Sibelius"))&&p("Sibelius MusicXMl is unreliable",[])};u.prototype.doDefaults=function(a){var b,c,d,f;this.doPageFmt&&(b=a.find("defaults"),b.length&&(a=b.find("scaling>millimeters").text(),c=b.find("scaling>tenths").text(),c=a/c/10,a=b.find("page-layout>page-width").text()*c,d=b.find("page-layout>page-margins").first(),b=d.find("left-margin").text(),d=d.find("right-margin").text(),f=10*c/.2117,!r.scale&&
f&&(r.scale=f.toFixed(2)),!r.pagewidth&&a&&(r.pagewidth=a.toFixed(2)),r.leftmargin||""==b||(r.leftmargin=(b*c).toFixed(2)),r.rightmargin||""==d||(r.rightmargin=(d*c).toFixed(2))))};u.prototype.locStaffMap=function(a){var b={};this.vceInst={};this.msc.vnums={};a=a.find("measure>note");for(var c=0;c<a.length;c++){var d=$(a[c]),f=parseInt(d.find("voice").text()||"1");this.isSib&&(f+=100*(d.find("staff").text()||1));this.msc.vnums[f]=1;var e=parseInt(d.find("staff").text()||"1");if(f in b){var g=b[f];
g[e]=(g[e]||0)+1}else g={},g[e]=1,b[f]=g;g=d.find("instrument");g.length&&(this.vceInst[f]=$(g).attr("id"))}this.stfMap={};this.clefMap={};for(f in b){a=[];c=b[f];for(e in c)a.push([c[e],e]);a.sort(function(a,b){return b[0]-a[0]});a=a[0][1];this.stfMap[a]=(this.stfMap[a]||[]).concat([f]);this.curStf[f]=a}};u.prototype.addStaffMap=function(a){var b,c,d,f,e,g,h=[],k=Object.keys(this.stfMap).sort();for(c=0;c<k.length;++c){e=k[c];f=this.stfMap[e];g=[];for(b=0;b<f.length;++b)d=f[b],d in a&&g.push(a[d]);
if(g.length)for(h.push(g.sort()),f=(e in this.clefMap)?this.clefMap[e]:"treble",b=0;b<g.length;++b)d=g[b],r.clefs[d]=f}this.gStfMap.push(h)};u.prototype.addMidiMap=function(a,b){var c=this.instMid[a],d,f=Object.keys(c);d=f.length?c[f[0]]:this.midDflt;var e=[],g,h,k,l=this;for(g in b)f=Object.keys(this.drumNotes).sort().filter(function(a){return a.split(";")[0]==g}),k=f.map(function(a){return{nt:a.split(";")[1],step:l.drumNotes[a][0],midi:l.drumNotes[a][1],nhd:l.drumNotes[a][2]}}),f=b[g],h=this.vceInst[g]||
"",h in c?e.push([f,c[h].concat(k)]):e.push([f,d.concat(k)]);e.sort(function(a,b){return a[0]-b[0]});for(c=0;c<e.length;++c)f=e[c][0],d=e[c][1],this.midiMap.push(d)};u.prototype.parse=function(a){var b=$(a);this.mkTitle(b);this.doDefaults(b);partlist=this.doPartList(b);a=b.find("part");for(var c=0;c<a.length;++c){var b=$(a[c]),d=b.find("measure");this.locStaffMap(b);this.drumNotes={};this.clefOct={};this.msc.initVoices(1);var f=0,e=0;for(this.msr=new H(c);this.msr.ixm<d.length;){var g=$(d[this.msr.ixm]),
h=0,k="";this.msr.reset();this.curalts={};for(var l=g.children(),m=0;m<l.length;m++){var n=l[m],b=$(n);switch(n.nodeName){case "note":this.doNote(b);break;case "attributes":this.doAttr(b);break;case "direction":this.doDirection(b);break;case "sound":this.doDirection(g);break;case "harmony":this.doHarmony(b);break;case "barline":h=this.doBarline(b);break;case "backup":b=parseInt(b.find("duration").text());this.msc.incTime(-b);break;case "forward":b=parseInt(b.find("duration").text());this.msc.incTime(b);
break;case "print":k=this.doPrint(b)}}this.msc.addBar(k,this.msr);1==h?(e=this.msr.ixm,this.msr.ixm+=1):2==h?1>f?(this.msr.ixm=e,f+=1):(f=0,this.msr.ixm+=1):this.msr.ixm+=1}d=this.msc.outVoices(this.msr.divs,c);this.addStaffMap(d);this.addMidiMap(c,d)}Object.keys(d).length?r.mkHeader(this.gStfMap,partlist,this.midiMap):p("nothing written, %s has no notes ...",[r.fnmext])};vertaal=function(a,b){var c={u:0,b:0,n:0,c:0,v:0,d:0,m:0,x:0,t:0,p:"f"},d;for(d in b)c[d]=b[d];c.p=c.p?c.p.split(","):[];r=new D(".abc",
"",0,c);c=new u(c);try{c.parse(a)}catch(f){p("** exception occurred: %s",[f])}return[r.outlist.join(""),r.infolist.join("\n")]}})();
