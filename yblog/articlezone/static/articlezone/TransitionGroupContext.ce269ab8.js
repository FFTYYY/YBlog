import{a3 as v,ad as qe,ae as Ye,r as H,af as Ve,ag as Je,ah as Ze,ai as Qe,aj as et,ak as tt,a4 as T,al as rt,a as nt}from"./titleword.d4448fc4.js";function Q(e){return e!==null&&typeof e=="object"&&e.constructor===Object}function A(e,t,r={clone:!0}){const n=r.clone?v({},e):e;return Q(e)&&Q(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Q(t[o])&&o in e&&Q(e[o])?n[o]=A(e[o],t[o],r):n[o]=t[o])}),n}function W(e){let t="https://mui.com/production-error/?code="+e;for(let r=1;r<arguments.length;r+=1)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}function ee(e){if(typeof e!="string")throw new Error(W(7));return e.charAt(0).toUpperCase()+e.slice(1)}function ot(e,t){const r=v({},t);return Object.keys(e).forEach(n=>{r[n]===void 0&&(r[n]=e[n])}),r}var it=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,at=qe(function(e){return it.test(e)||e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)<91}),st=at,ct=function(t){return t!=="theme"},be=function(t){return typeof t=="string"&&t.charCodeAt(0)>96?st:ct},ve=function(t,r,n){var o;if(r){var a=r.shouldForwardProp;o=t.__emotion_forwardProp&&a?function(i){return t.__emotion_forwardProp(i)&&a(i)}:a}return typeof o!="function"&&n&&(o=t.__emotion_forwardProp),o},lt=function(t){var r=t.cache,n=t.serialized,o=t.isStringTag;return Qe(r,n,o),et(function(){return tt(r,n,o)}),null},ut=function e(t,r){var n=t.__emotion_real===t,o=n&&t.__emotion_base||t,a,i;r!==void 0&&(a=r.label,i=r.target);var d=ve(t,r,n),l=d||be(o),f=!l("as");return function(){var m=arguments,p=n&&t.__emotion_styles!==void 0?t.__emotion_styles.slice(0):[];if(a!==void 0&&p.push("label:"+a+";"),m[0]==null||m[0].raw===void 0)p.push.apply(p,m);else{p.push(m[0][0]);for(var u=m.length,g=1;g<u;g++)p.push(m[g],m[0][g])}var h=Ye(function(c,x,w){var O=f&&c.as||o,P="",k=[],S=c;if(c.theme==null){S={};for(var _ in c)S[_]=c[_];S.theme=H.exports.useContext(Ve)}typeof c.className=="string"?P=Je(x.registered,k,c.className):c.className!=null&&(P=c.className+" ");var E=Ze(p.concat(k),x.registered,S);P+=x.key+"-"+E.name,i!==void 0&&(P+=" "+i);var J=f&&d===void 0?be(O):l,D={};for(var y in c)f&&y==="as"||J(y)&&(D[y]=c[y]);return D.className=P,D.ref=w,H.exports.createElement(H.exports.Fragment,null,H.exports.createElement(lt,{cache:x,serialized:E,isStringTag:typeof O=="string"}),H.exports.createElement(O,D))});return h.displayName=a!==void 0?a:"Styled("+(typeof o=="string"?o:o.displayName||o.name||"Component")+")",h.defaultProps=t.defaultProps,h.__emotion_real=h,h.__emotion_base=o,h.__emotion_styles=p,h.__emotion_forwardProp=d,Object.defineProperty(h,"toString",{value:function(){return"."+i}}),h.withComponent=function(c,x){return e(c,v({},r,x,{shouldForwardProp:ve(h,x,!0)})).apply(void 0,p)},h}},dt=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"],ae=ut.bind();dt.forEach(function(e){ae[e]=ae(e)});var ft=ae;/** @license MUI v5.10.8
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function pt(e,t){return ft(e,t)}const mt=(e,t)=>{Array.isArray(e.__emotion_styles)&&(e.__emotion_styles=t(e.__emotion_styles))};function N(e,t){return t?A(e,t,{clone:!1}):e}const ce={xs:0,sm:600,md:900,lg:1200,xl:1536},xe={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${ce[e]}px)`};function C(e,t,r){const n=e.theme||{};if(Array.isArray(t)){const a=n.breakpoints||xe;return t.reduce((i,d,l)=>(i[a.up(a.keys[l])]=r(t[l]),i),{})}if(typeof t=="object"){const a=n.breakpoints||xe;return Object.keys(t).reduce((i,d)=>{if(Object.keys(a.values||ce).indexOf(d)!==-1){const l=a.up(d);i[l]=r(t[d],d)}else{const l=d;i[l]=t[l]}return i},{})}return r(t)}function ht(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((n,o)=>{const a=e.up(o);return n[a]={},n},{}))||{}}function gt(e,t){return e.reduce((r,n)=>{const o=r[n];return(!o||Object.keys(o).length===0)&&delete r[n],r},t)}function le(e,t,r=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&r){const n=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(n!=null)return n}return t.split(".").reduce((n,o)=>n&&n[o]!=null?n[o]:null,e)}function ke(e,t,r,n=r){let o;return typeof e=="function"?o=e(r):Array.isArray(e)?o=e[r]||n:o=le(e,r)||n,t&&(o=t(o,n)),o}function s(e){const{prop:t,cssProperty:r=e.prop,themeKey:n,transform:o}=e,a=i=>{if(i[t]==null)return null;const d=i[t],l=i.theme,f=le(l,n)||{};return C(i,d,p=>{let u=ke(f,o,p);return p===u&&typeof p=="string"&&(u=ke(f,o,`${t}${p==="default"?"":ee(p)}`,p)),r===!1?u:{[r]:u}})};return a.propTypes={},a.filterProps=[t],a}function R(...e){const t=e.reduce((n,o)=>(o.filterProps.forEach(a=>{n[a]=o}),n),{}),r=n=>Object.keys(n).reduce((o,a)=>t[a]?N(o,t[a](n)):o,{});return r.propTypes={},r.filterProps=e.reduce((n,o)=>n.concat(o.filterProps),[]),r}function yt(e){const t={};return r=>(t[r]===void 0&&(t[r]=e(r)),t[r])}const bt={m:"margin",p:"padding"},vt={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},we={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},xt=yt(e=>{if(e.length>2)if(we[e])e=we[e];else return[e];const[t,r]=e.split(""),n=bt[t],o=vt[r]||"";return Array.isArray(o)?o.map(a=>n+a):[n+o]}),kt=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],wt=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Re=[...kt,...wt];function q(e,t,r,n){var o;const a=(o=le(e,t,!1))!=null?o:r;return typeof a=="number"?i=>typeof i=="string"?i:a*i:Array.isArray(a)?i=>typeof i=="string"?i:a[i]:typeof a=="function"?a:()=>{}}function je(e){return q(e,"spacing",8)}function Y(e,t){if(typeof t=="string"||t==null)return t;const r=Math.abs(t),n=e(r);return t>=0?n:typeof n=="number"?-n:`-${n}`}function St(e,t){return r=>e.reduce((n,o)=>(n[o]=Y(t,r),n),{})}function Ot(e,t,r,n){if(t.indexOf(r)===-1)return null;const o=xt(r),a=St(o,n),i=e[r];return C(e,i,a)}function Pt(e,t){const r=je(e.theme);return Object.keys(e).map(n=>Ot(e,t,n,r)).reduce(N,{})}function re(e){return Pt(e,Re)}re.propTypes={};re.filterProps=Re;function V(e){return typeof e!="number"?e:`${e}px solid`}const $t=s({prop:"border",themeKey:"borders",transform:V}),Tt=s({prop:"borderTop",themeKey:"borders",transform:V}),At=s({prop:"borderRight",themeKey:"borders",transform:V}),_t=s({prop:"borderBottom",themeKey:"borders",transform:V}),Ct=s({prop:"borderLeft",themeKey:"borders",transform:V}),Rt=s({prop:"borderColor",themeKey:"palette"}),jt=s({prop:"borderTopColor",themeKey:"palette"}),Et=s({prop:"borderRightColor",themeKey:"palette"}),It=s({prop:"borderBottomColor",themeKey:"palette"}),zt=s({prop:"borderLeftColor",themeKey:"palette"}),ue=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=q(e.theme,"shape.borderRadius",4),r=n=>({borderRadius:Y(t,n)});return C(e,e.borderRadius,r)}return null};ue.propTypes={};ue.filterProps=["borderRadius"];const Bt=R($t,Tt,At,_t,Ct,Rt,jt,Et,It,zt,ue);var Ee=Bt;const Ft=s({prop:"displayPrint",cssProperty:!1,transform:e=>({"@media print":{display:e}})}),Mt=s({prop:"display"}),Kt=s({prop:"overflow"}),Lt=s({prop:"textOverflow"}),Wt=s({prop:"visibility"}),Dt=s({prop:"whiteSpace"});var Ie=R(Ft,Mt,Kt,Lt,Wt,Dt);const Ht=s({prop:"flexBasis"}),Ut=s({prop:"flexDirection"}),Gt=s({prop:"flexWrap"}),Nt=s({prop:"justifyContent"}),Xt=s({prop:"alignItems"}),qt=s({prop:"alignContent"}),Yt=s({prop:"order"}),Vt=s({prop:"flex"}),Jt=s({prop:"flexGrow"}),Zt=s({prop:"flexShrink"}),Qt=s({prop:"alignSelf"}),er=s({prop:"justifyItems"}),tr=s({prop:"justifySelf"}),rr=R(Ht,Ut,Gt,Nt,Xt,qt,Yt,Vt,Jt,Zt,Qt,er,tr);var ze=rr;const de=e=>{if(e.gap!==void 0&&e.gap!==null){const t=q(e.theme,"spacing",8),r=n=>({gap:Y(t,n)});return C(e,e.gap,r)}return null};de.propTypes={};de.filterProps=["gap"];const fe=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=q(e.theme,"spacing",8),r=n=>({columnGap:Y(t,n)});return C(e,e.columnGap,r)}return null};fe.propTypes={};fe.filterProps=["columnGap"];const pe=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=q(e.theme,"spacing",8),r=n=>({rowGap:Y(t,n)});return C(e,e.rowGap,r)}return null};pe.propTypes={};pe.filterProps=["rowGap"];const nr=s({prop:"gridColumn"}),or=s({prop:"gridRow"}),ir=s({prop:"gridAutoFlow"}),ar=s({prop:"gridAutoColumns"}),sr=s({prop:"gridAutoRows"}),cr=s({prop:"gridTemplateColumns"}),lr=s({prop:"gridTemplateRows"}),ur=s({prop:"gridTemplateAreas"}),dr=s({prop:"gridArea"}),fr=R(de,fe,pe,nr,or,ir,ar,sr,cr,lr,ur,dr);var Be=fr;function me(e,t){return t==="grey"?t:e}const pr=s({prop:"color",themeKey:"palette",transform:me}),mr=s({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:me}),hr=s({prop:"backgroundColor",themeKey:"palette",transform:me}),gr=R(pr,mr,hr);var Fe=gr;const yr=s({prop:"position"}),br=s({prop:"zIndex",themeKey:"zIndex"}),vr=s({prop:"top"}),xr=s({prop:"right"}),kr=s({prop:"bottom"}),wr=s({prop:"left"});var Me=R(yr,br,vr,xr,kr,wr);const Sr=s({prop:"boxShadow",themeKey:"shadows"});var Ke=Sr;function j(e){return e<=1&&e!==0?`${e*100}%`:e}const Or=s({prop:"width",transform:j}),Le=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=r=>{var n,o,a;return{maxWidth:((n=e.theme)==null||(o=n.breakpoints)==null||(a=o.values)==null?void 0:a[r])||ce[r]||j(r)}};return C(e,e.maxWidth,t)}return null};Le.filterProps=["maxWidth"];const Pr=s({prop:"minWidth",transform:j}),$r=s({prop:"height",transform:j}),Tr=s({prop:"maxHeight",transform:j}),Ar=s({prop:"minHeight",transform:j});s({prop:"size",cssProperty:"width",transform:j});s({prop:"size",cssProperty:"height",transform:j});const _r=s({prop:"boxSizing"}),Cr=R(Or,Le,Pr,$r,Tr,Ar,_r);var We=Cr;const Rr=s({prop:"fontFamily",themeKey:"typography"}),jr=s({prop:"fontSize",themeKey:"typography"}),Er=s({prop:"fontStyle",themeKey:"typography"}),Ir=s({prop:"fontWeight",themeKey:"typography"}),zr=s({prop:"letterSpacing"}),Br=s({prop:"textTransform"}),Fr=s({prop:"lineHeight"}),Mr=s({prop:"textAlign"}),Kr=s({prop:"typography",cssProperty:!1,themeKey:"typography"}),Lr=R(Kr,Rr,jr,Er,Ir,zr,Fr,Mr,Br);var De=Lr;const Se={borders:Ee.filterProps,display:Ie.filterProps,flexbox:ze.filterProps,grid:Be.filterProps,positions:Me.filterProps,palette:Fe.filterProps,shadows:Ke.filterProps,sizing:We.filterProps,spacing:re.filterProps,typography:De.filterProps},He={borders:Ee,display:Ie,flexbox:ze,grid:Be,positions:Me,palette:Fe,shadows:Ke,sizing:We,spacing:re,typography:De};Object.keys(Se).reduce((e,t)=>(Se[t].forEach(r=>{e[r]=He[t]}),e),{});function Wr(...e){const t=e.reduce((n,o)=>n.concat(Object.keys(o)),[]),r=new Set(t);return e.every(n=>r.size===Object.keys(n).length)}function Dr(e,t){return typeof e=="function"?e(t):e}function Hr(e=He){const t=Object.keys(e).reduce((o,a)=>(e[a].filterProps.forEach(i=>{o[i]=e[a]}),o),{});function r(o,a,i){const d={[o]:a,theme:i},l=t[o];return l?l(d):{[o]:a}}function n(o){const{sx:a,theme:i={}}=o||{};if(!a)return null;function d(l){let f=l;if(typeof l=="function")f=l(i);else if(typeof l!="object")return l;if(!f)return null;const m=ht(i.breakpoints),p=Object.keys(m);let u=m;return Object.keys(f).forEach(g=>{const h=Dr(f[g],i);if(h!=null)if(typeof h=="object")if(t[g])u=N(u,r(g,h,i));else{const c=C({theme:i},h,x=>({[g]:x}));Wr(c,h)?u[g]=n({sx:h,theme:i}):u=N(u,c)}else u=N(u,r(g,h,i))}),gt(p,u)}return Array.isArray(a)?a.map(d):d(a)}return n}const Ue=Hr();Ue.filterProps=["sx"];var Ur=Ue;const Gr=["values","unit","step"],Nr=e=>{const t=Object.keys(e).map(r=>({key:r,val:e[r]}))||[];return t.sort((r,n)=>r.val-n.val),t.reduce((r,n)=>v({},r,{[n.key]:n.val}),{})};function Xr(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:r="px",step:n=5}=e,o=T(e,Gr),a=Nr(t),i=Object.keys(a);function d(u){return`@media (min-width:${typeof t[u]=="number"?t[u]:u}${r})`}function l(u){return`@media (max-width:${(typeof t[u]=="number"?t[u]:u)-n/100}${r})`}function f(u,g){const h=i.indexOf(g);return`@media (min-width:${typeof t[u]=="number"?t[u]:u}${r}) and (max-width:${(h!==-1&&typeof t[i[h]]=="number"?t[i[h]]:g)-n/100}${r})`}function m(u){return i.indexOf(u)+1<i.length?f(u,i[i.indexOf(u)+1]):d(u)}function p(u){const g=i.indexOf(u);return g===0?d(i[1]):g===i.length-1?l(i[g]):f(u,i[i.indexOf(u)+1]).replace("@media","@media not all and")}return v({keys:i,values:a,up:d,down:l,between:f,only:m,not:p,unit:r},o)}const qr={borderRadius:4};var Yr=qr;function Vr(e=8){if(e.mui)return e;const t=je({spacing:e}),r=(...n)=>(n.length===0?[1]:n).map(a=>{const i=t(a);return typeof i=="number"?`${i}px`:i}).join(" ");return r.mui=!0,r}const Jr=["breakpoints","palette","spacing","shape"];function he(e={},...t){const{breakpoints:r={},palette:n={},spacing:o,shape:a={}}=e,i=T(e,Jr),d=Xr(r),l=Vr(o);let f=A({breakpoints:d,direction:"ltr",components:{},palette:v({mode:"light"},n),spacing:l,shape:v({},Yr,a)},i);return f=t.reduce((m,p)=>A(m,p),f),f}function Zr(e){return Object.keys(e).length===0}function Qr(e=null){const t=rt();return!t||Zr(t)?e:t}const en=he();function Ge(e=en){return Qr(e)}const tn=["variant"];function Oe(e){return e.length===0}function Ne(e){const{variant:t}=e,r=T(e,tn);let n=t||"";return Object.keys(r).sort().forEach(o=>{o==="color"?n+=Oe(n)?e[o]:ee(e[o]):n+=`${Oe(n)?o:ee(o)}${ee(e[o].toString())}`}),n}const rn=["name","slot","skipVariantsResolver","skipSx","overridesResolver"],nn=["theme"],on=["theme"];function U(e){return Object.keys(e).length===0}function an(e){return typeof e=="string"&&e.charCodeAt(0)>96}const sn=(e,t)=>t.components&&t.components[e]&&t.components[e].styleOverrides?t.components[e].styleOverrides:null,cn=(e,t)=>{let r=[];t&&t.components&&t.components[e]&&t.components[e].variants&&(r=t.components[e].variants);const n={};return r.forEach(o=>{const a=Ne(o.props);n[a]=o.style}),n},ln=(e,t,r,n)=>{var o,a;const{ownerState:i={}}=e,d=[],l=r==null||(o=r.components)==null||(a=o[n])==null?void 0:a.variants;return l&&l.forEach(f=>{let m=!0;Object.keys(f.props).forEach(p=>{i[p]!==f.props[p]&&e[p]!==f.props[p]&&(m=!1)}),m&&d.push(t[Ne(f.props)])}),d};function te(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const un=he();function dn(e={}){const{defaultTheme:t=un,rootShouldForwardProp:r=te,slotShouldForwardProp:n=te,styleFunctionSx:o=Ur}=e,a=i=>{const d=U(i.theme)?t:i.theme;return o(v({},i,{theme:d}))};return a.__mui_systemSx=!0,(i,d={})=>{mt(i,k=>k.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:l,slot:f,skipVariantsResolver:m,skipSx:p,overridesResolver:u}=d,g=T(d,rn),h=m!==void 0?m:f&&f!=="Root"||!1,c=p||!1;let x,w=te;f==="Root"?w=r:f?w=n:an(i)&&(w=void 0);const O=pt(i,v({shouldForwardProp:w,label:x},g)),P=(k,...S)=>{const _=S?S.map(y=>typeof y=="function"&&y.__emotion_real!==y?$=>{let{theme:I}=$,Z=T($,nn);return y(v({theme:U(I)?t:I},Z))}:y):[];let E=k;l&&u&&_.push(y=>{const $=U(y.theme)?t:y.theme,I=sn(l,$);if(I){const Z={};return Object.entries(I).forEach(([Xe,oe])=>{Z[Xe]=typeof oe=="function"?oe(v({},y,{theme:$})):oe}),u(y,Z)}return null}),l&&!h&&_.push(y=>{const $=U(y.theme)?t:y.theme;return ln(y,cn(l,$),$,l)}),c||_.push(a);const J=_.length-S.length;if(Array.isArray(k)&&J>0){const y=new Array(J).fill("");E=[...k,...y],E.raw=[...k.raw,...y]}else typeof k=="function"&&k.__emotion_real!==k&&(E=y=>{let{theme:$}=y,I=T(y,on);return k(v({theme:U($)?t:$},I))});return O(E,..._)};return O.withConfig&&(P.withConfig=O.withConfig),P}}function fn(e){const{theme:t,name:r,props:n}=e;return!t||!t.components||!t.components[r]||!t.components[r].defaultProps?n:ot(t.components[r].defaultProps,n)}function pn({props:e,name:t,defaultTheme:r}){const n=Ge(r);return fn({theme:n,name:t,props:e})}function ge(e,t=0,r=1){return Math.min(Math.max(t,e),r)}function mn(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(t);return r&&r[0].length===1&&(r=r.map(n=>n+n)),r?`rgb${r.length===4?"a":""}(${r.map((n,o)=>o<3?parseInt(n,16):Math.round(parseInt(n,16)/255*1e3)/1e3).join(", ")})`:""}function z(e){if(e.type)return e;if(e.charAt(0)==="#")return z(mn(e));const t=e.indexOf("("),r=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(W(9,e));let n=e.substring(t+1,e.length-1),o;if(r==="color"){if(n=n.split(" "),o=n.shift(),n.length===4&&n[3].charAt(0)==="/"&&(n[3]=n[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(W(10,o))}else n=n.split(",");return n=n.map(a=>parseFloat(a)),{type:r,values:n,colorSpace:o}}function ne(e){const{type:t,colorSpace:r}=e;let{values:n}=e;return t.indexOf("rgb")!==-1?n=n.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(n[1]=`${n[1]}%`,n[2]=`${n[2]}%`),t.indexOf("color")!==-1?n=`${r} ${n.join(" ")}`:n=`${n.join(", ")}`,`${t}(${n})`}function hn(e){e=z(e);const{values:t}=e,r=t[0],n=t[1]/100,o=t[2]/100,a=n*Math.min(o,1-o),i=(f,m=(f+r/30)%12)=>o-a*Math.max(Math.min(m-3,9-m,1),-1);let d="rgb";const l=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(d+="a",l.push(t[3])),ne({type:d,values:l})}function Pe(e){e=z(e);let t=e.type==="hsl"||e.type==="hsla"?z(hn(e)).values:e.values;return t=t.map(r=>(e.type!=="color"&&(r/=255),r<=.03928?r/12.92:((r+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function gn(e,t){const r=Pe(e),n=Pe(t);return(Math.max(r,n)+.05)/(Math.min(r,n)+.05)}function oo(e,t){return e=z(e),t=ge(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,ne(e)}function yn(e,t){if(e=z(e),t=ge(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]*=1-t;return ne(e)}function bn(e,t){if(e=z(e),t=ge(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(255-e.values[r])*t;else if(e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(1-e.values[r])*t;return ne(e)}function vn(e,t){return v({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const xn={black:"#000",white:"#fff"};var X=xn;const kn={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"};var wn=kn;const Sn={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"};var B=Sn;const On={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"};var F=On;const Pn={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"};var G=Pn;const $n={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"};var M=$n;const Tn={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"};var K=Tn;const An={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"};var L=An;const _n=["mode","contrastThreshold","tonalOffset"],$e={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:X.white,default:X.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},ie={text:{primary:X.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:X.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Te(e,t,r,n){const o=n.light||n,a=n.dark||n*1.5;e[t]||(e.hasOwnProperty(r)?e[t]=e[r]:t==="light"?e.light=bn(e.main,o):t==="dark"&&(e.dark=yn(e.main,a)))}function Cn(e="light"){return e==="dark"?{main:M[200],light:M[50],dark:M[400]}:{main:M[700],light:M[400],dark:M[800]}}function Rn(e="light"){return e==="dark"?{main:B[200],light:B[50],dark:B[400]}:{main:B[500],light:B[300],dark:B[700]}}function jn(e="light"){return e==="dark"?{main:F[500],light:F[300],dark:F[700]}:{main:F[700],light:F[400],dark:F[800]}}function En(e="light"){return e==="dark"?{main:K[400],light:K[300],dark:K[700]}:{main:K[700],light:K[500],dark:K[900]}}function In(e="light"){return e==="dark"?{main:L[400],light:L[300],dark:L[700]}:{main:L[800],light:L[500],dark:L[900]}}function zn(e="light"){return e==="dark"?{main:G[400],light:G[300],dark:G[700]}:{main:"#ed6c02",light:G[500],dark:G[900]}}function Bn(e){const{mode:t="light",contrastThreshold:r=3,tonalOffset:n=.2}=e,o=T(e,_n),a=e.primary||Cn(t),i=e.secondary||Rn(t),d=e.error||jn(t),l=e.info||En(t),f=e.success||In(t),m=e.warning||zn(t);function p(c){return gn(c,ie.text.primary)>=r?ie.text.primary:$e.text.primary}const u=({color:c,name:x,mainShade:w=500,lightShade:O=300,darkShade:P=700})=>{if(c=v({},c),!c.main&&c[w]&&(c.main=c[w]),!c.hasOwnProperty("main"))throw new Error(W(11,x?` (${x})`:"",w));if(typeof c.main!="string")throw new Error(W(12,x?` (${x})`:"",JSON.stringify(c.main)));return Te(c,"light",O,n),Te(c,"dark",P,n),c.contrastText||(c.contrastText=p(c.main)),c},g={dark:ie,light:$e};return A(v({common:v({},X),mode:t,primary:u({color:a,name:"primary"}),secondary:u({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:u({color:d,name:"error"}),warning:u({color:m,name:"warning"}),info:u({color:l,name:"info"}),success:u({color:f,name:"success"}),grey:wn,contrastThreshold:r,getContrastText:p,augmentColor:u,tonalOffset:n},g[t]),o)}const Fn=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Mn(e){return Math.round(e*1e5)/1e5}const Ae={textTransform:"uppercase"},_e='"Roboto", "Helvetica", "Arial", sans-serif';function Kn(e,t){const r=typeof t=="function"?t(e):t,{fontFamily:n=_e,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:i=400,fontWeightMedium:d=500,fontWeightBold:l=700,htmlFontSize:f=16,allVariants:m,pxToRem:p}=r,u=T(r,Fn),g=o/14,h=p||(w=>`${w/f*g}rem`),c=(w,O,P,k,S)=>v({fontFamily:n,fontWeight:w,fontSize:h(O),lineHeight:P},n===_e?{letterSpacing:`${Mn(k/O)}em`}:{},S,m),x={h1:c(a,96,1.167,-1.5),h2:c(a,60,1.2,-.5),h3:c(i,48,1.167,0),h4:c(i,34,1.235,.25),h5:c(i,24,1.334,0),h6:c(d,20,1.6,.15),subtitle1:c(i,16,1.75,.15),subtitle2:c(d,14,1.57,.1),body1:c(i,16,1.5,.15),body2:c(i,14,1.43,.15),button:c(d,14,1.75,.4,Ae),caption:c(i,12,1.66,.4),overline:c(i,12,2.66,1,Ae)};return A(v({htmlFontSize:f,pxToRem:h,fontFamily:n,fontSize:o,fontWeightLight:a,fontWeightRegular:i,fontWeightMedium:d,fontWeightBold:l},x),u,{clone:!1})}const Ln=.2,Wn=.14,Dn=.12;function b(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Ln})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Wn})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Dn})`].join(",")}const Hn=["none",b(0,2,1,-1,0,1,1,0,0,1,3,0),b(0,3,1,-2,0,2,2,0,0,1,5,0),b(0,3,3,-2,0,3,4,0,0,1,8,0),b(0,2,4,-1,0,4,5,0,0,1,10,0),b(0,3,5,-1,0,5,8,0,0,1,14,0),b(0,3,5,-1,0,6,10,0,0,1,18,0),b(0,4,5,-2,0,7,10,1,0,2,16,1),b(0,5,5,-3,0,8,10,1,0,3,14,2),b(0,5,6,-3,0,9,12,1,0,3,16,2),b(0,6,6,-3,0,10,14,1,0,4,18,3),b(0,6,7,-4,0,11,15,1,0,4,20,3),b(0,7,8,-4,0,12,17,2,0,5,22,4),b(0,7,8,-4,0,13,19,2,0,5,24,4),b(0,7,9,-4,0,14,21,2,0,5,26,4),b(0,8,9,-5,0,15,22,2,0,6,28,5),b(0,8,10,-5,0,16,24,2,0,6,30,5),b(0,8,11,-5,0,17,26,2,0,6,32,5),b(0,9,11,-5,0,18,28,2,0,7,34,6),b(0,9,12,-6,0,19,29,2,0,7,36,6),b(0,10,13,-6,0,20,31,3,0,8,38,7),b(0,10,13,-6,0,21,33,3,0,8,40,7),b(0,10,14,-6,0,22,35,3,0,8,42,7),b(0,11,14,-7,0,23,36,3,0,9,44,8),b(0,11,15,-7,0,24,38,3,0,9,46,8)];var Un=Hn;const Gn=["duration","easing","delay"],Nn={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Xn={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ce(e){return`${Math.round(e)}ms`}function qn(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Yn(e){const t=v({},Nn,e.easing),r=v({},Xn,e.duration);return v({getAutoHeightDuration:qn,create:(o=["all"],a={})=>{const{duration:i=r.standard,easing:d=t.easeInOut,delay:l=0}=a;return T(a,Gn),(Array.isArray(o)?o:[o]).map(f=>`${f} ${typeof i=="string"?i:Ce(i)} ${d} ${typeof l=="string"?l:Ce(l)}`).join(",")}},e,{easing:t,duration:r})}const Vn={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500};var Jn=Vn;const Zn=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Qn(e={},...t){const{mixins:r={},palette:n={},transitions:o={},typography:a={}}=e,i=T(e,Zn);if(e.vars)throw new Error(W(18));const d=Bn(n),l=he(e);let f=A(l,{mixins:vn(l.breakpoints,r),palette:d,shadows:Un.slice(),typography:Kn(d,a),transitions:Yn(o),zIndex:v({},Jn)});return f=A(f,i),f=t.reduce((m,p)=>A(m,p),f),f}const eo=Qn();var ye=eo;const to=e=>te(e)&&e!=="classes",ro=dn({defaultTheme:ye,rootShouldForwardProp:to});var io=ro;function ao({props:e,name:t}){return pn({props:e,name:t,defaultTheme:ye})}function so(){return Ge(ye)}function se(e,t){return se=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,o){return n.__proto__=o,n},se(e,t)}function co(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,se(e,t)}var lo=nt.createContext(null);export{lo as T,co as _,so as a,oo as b,ee as c,Xn as d,io as s,ao as u};
