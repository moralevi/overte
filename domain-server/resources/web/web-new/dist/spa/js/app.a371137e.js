(()=>{"use strict";var e={9844:(e,t,r)=>{r(7280),r(5363),r(71);var o=r(8880),n=r(9592),a=r(3673);const i={id:"q-app"};function s(e,t,r,o,n,s){const l=(0,a.up)("router-view");return(0,a.wg)(),(0,a.iD)("div",i,[(0,a.Wm)(l)])}const l=(0,a.aZ)({name:"App"});l.render=s;const u=l;var c=r(556),d=r(7083),f=r(9582);const p=[{path:"/",component:()=>r.e(264).then(r.bind(r,9264)),children:[{path:"",component:()=>r.e(264).then(r.bind(r,9264))}]},{path:"/wizard",component:()=>Promise.all([r.e(736),r.e(197)]).then(r.bind(r,7197)),children:[{path:"",component:()=>Promise.all([r.e(736),r.e(472)]).then(r.bind(r,472))}]},{path:"/:catchAll(.*)*",component:()=>Promise.all([r.e(736),r.e(870)]).then(r.bind(r,6870))}],h=p,v=(0,d.BC)((function(){const e=f.r5,t=(0,f.p7)({scrollBehavior:()=>({left:0,top:0}),routes:h,history:e("")});return t}));async function b(e,t){const o="function"===typeof c["default"]?await(0,c["default"])({}):c["default"],{storeKey:a}=await Promise.resolve().then(r.bind(r,556)),i="function"===typeof v?await v({store:o}):v;o.$router=i;const s=e(u);return s.use(n.Z,t),{app:s,store:o,storeKey:a,router:i}}var m=r(6417),g=r(6249);const y={config:{dark:"auto"},plugins:{Notify:m.Z,Loading:g.Z}},O="";async function w({app:e,router:t,store:r,storeKey:o},n){let a=!1;const i=e=>{a=!0;const r=Object(e)===e?t.resolve(e).fullPath:e;window.location.href=r},s=window.location.href.replace(window.location.origin,"");for(let u=0;!1===a&&u<n.length;u++)try{await n[u]({app:e,router:t,store:r,ssrContext:null,redirect:i,urlPath:s,publicPath:O})}catch(l){return l&&l.url?void(window.location.href=l.url):void console.error("[Quasar] boot error:",l)}!0!==a&&(e.use(t),e.use(r,o),e.mount("#q-app"))}b(o.ri,y).then((e=>Promise.all([Promise.resolve().then(r.bind(r,1768))]).then((t=>{const r=t.map((e=>e.default)).filter((e=>"function"===typeof e));w(e,r)}))))},1768:(e,t,r)=>{r.r(t),r.d(t,{default:()=>u,api:()=>l});var o=r(7083),n=r(52),a=r.n(n),i=r(8563);i.Z.info(i.Z.types.OTHER,"Bootstrapping Axios.");const s="https://overte.org/mvs";a().interceptors.request.use((e=>{var t;return(null===(t=e.url)||void 0===t?void 0:t.includes(s))&&(e.headers["x-vircadia-error-handle"]="badrequest"),console.info("config",e),e}),(e=>Promise.reject(e)));const l=a().create({baseURL:"https://api.example.com"}),u=(0,o.xr)((({app:e})=>{e.config.globalProperties.$axios=a(),e.config.globalProperties.$api=l}))},8563:(e,t,r)=>{r.d(t,{Z:()=>n});const o=function(){let e,t;function r(e,t,r){console.info(e,t,r)}function o(e,o){r(e,t.DEBUG,o)}function n(e,o){r(e,t.ERROR,o)}function a(e,o){r(e,t.WARN,o)}function i(e,o){r(e,t.INFO,o)}return function(e){e["OTHER"]="[OTHER]",e["DOMAIN"]="[DOMAIN]",e["METAVERSE"]="[METAVERSE]"}(e||(e={})),function(e){e["ERROR"]="[ERROR]",e["DEBUG"]="[DEBUG]",e["WARN"]="[WARN]",e["INFO"]="[INFO]"}(t||(t={})),{types:e,levels:t,print:r,debug:o,error:n,warn:a,info:i}}(),n=o},556:(e,t,r)=>{r.r(t),r.d(t,{storeKey:()=>a,default:()=>i,useStore:()=>s});var o=r(7083),n=r(7874);const a=Symbol("vuex-key"),i=(0,o.h)((function(){const e=(0,n.MT)({modules:{},strict:!1});return e}));function s(){return(0,n.oR)(a)}}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var a=t[o]={exports:{}};return e[o].call(a.exports,a,a.exports,r),a.exports}r.m=e,(()=>{r.amdO={}})(),(()=>{var e=[];r.O=(t,o,n,a)=>{if(!o){var i=1/0;for(c=0;c<e.length;c++){for(var[o,n,a]=e[c],s=!0,l=0;l<o.length;l++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](o[l])))?o.splice(l--,1):(s=!1,a<i&&(i=a));if(s){e.splice(c--,1);var u=n();void 0!==u&&(t=u)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[o,n,a]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;r.t=function(o,n){if(1&n&&(o=this(o)),8&n)return o;if("object"===typeof o&&o){if(4&n&&o.__esModule)return o;if(16&n&&"function"===typeof o.then)return o}var a=Object.create(null);r.r(a);var i={};e=e||[null,t({}),t([]),t(t)];for(var s=2&n&&o;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>i[e]=()=>o[e]));return i["default"]=()=>o,r.d(a,i),a}})(),(()=>{r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,o)=>(r.f[o](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+e+"."+{197:"1d65bbb2",264:"9e82b317",472:"efda1ea2",870:"5e46cfb2"}[e]+".js"})(),(()=>{r.miniCssF=e=>"css/"+({143:"app",736:"vendor"}[e]||e)+"."+{143:"31d6cfe0",472:"1b315250",736:"2ba81df8"}[e]+".css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="vircadia-domain-dashboard:";r.l=(o,n,a,i)=>{if(e[o])e[o].push(n);else{var s,l;if(void 0!==a)for(var u=document.getElementsByTagName("script"),c=0;c<u.length;c++){var d=u[c];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+a){s=d;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,r.nc&&s.setAttribute("nonce",r.nc),s.setAttribute("data-webpack",t+a),s.src=o),e[o]=[n];var f=(t,r)=>{s.onerror=s.onload=null,clearTimeout(p);var n=e[o];if(delete e[o],s.parentNode&&s.parentNode.removeChild(s),n&&n.forEach((e=>e(r))),t)return t(r)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.p=""})(),(()=>{var e=(e,t,r,o)=>{var n=document.createElement("link");n.rel="stylesheet",n.type="text/css";var a=a=>{if(n.onerror=n.onload=null,"load"===a.type)r();else{var i=a&&("load"===a.type?"missing":a.type),s=a&&a.target&&a.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=s,n.parentNode.removeChild(n),o(l)}};return n.onerror=n.onload=a,n.href=t,document.head.appendChild(n),n},t=(e,t)=>{for(var r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var n=r[o],a=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(a===e||a===t))return n}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){n=i[o],a=n.getAttribute("data-href");if(a===e||a===t)return n}},o=o=>new Promise(((n,a)=>{var i=r.miniCssF(o),s=r.p+i;if(t(i,s))return n();e(o,s,n,a)})),n={143:0};r.f.miniCss=(e,t)=>{var r={472:1};n[e]?t.push(n[e]):0!==n[e]&&r[e]&&t.push(n[e]=o(e).then((()=>{n[e]=0}),(t=>{throw delete n[e],t})))}})(),(()=>{var e={143:0};r.f.j=(t,o)=>{var n=r.o(e,t)?e[t]:void 0;if(0!==n)if(n)o.push(n[2]);else{var a=new Promise(((r,o)=>n=e[t]=[r,o]));o.push(n[2]=a);var i=r.p+r.u(t),s=new Error,l=o=>{if(r.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var a=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,n[1](s)}};r.l(i,l,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,o)=>{var n,a,[i,s,l]=o,u=0;if(i.some((t=>0!==e[t]))){for(n in s)r.o(s,n)&&(r.m[n]=s[n]);if(l)var c=l(r)}for(t&&t(o);u<i.length;u++)a=i[u],r.o(e,a)&&e[a]&&e[a][0](),e[i[u]]=0;return r.O(c)},o=self["webpackChunkvircadia_domain_dashboard"]=self["webpackChunkvircadia_domain_dashboard"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var o=r.O(void 0,[736],(()=>r(9844)));o=r.O(o)})();