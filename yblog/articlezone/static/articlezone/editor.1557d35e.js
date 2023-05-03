var rt=Object.defineProperty;var ot=(t,e,n)=>e in t?rt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ae=(t,e,n)=>(ot(t,typeof e!="symbol"?e+"":e,n),n);import{r as g,j as i,g as it,c as $e,d as ne,e as We,f as le,h as at,i as Ce,k as st,F as je,M as ut,a as C,I as z,B as k,u as ce,A as be,b as D,l as lt,T as ct,m as ve,n as xe,P as dt,E as pt,o as ft,p as ht,S as mt,G as gt,q as vt,R as _t}from"./titleword.6ee9a680.js";import{T as xt,u as Ct,g as Oe,P as qe,a as Re,b as bt,B as Et,p as kt,f as wt,r as yt,d as St,c as At,m as he,C as Ft}from"./overlayscrollbars.eb4d91b5.js";import{f as Dt,M as It}from"./math.d73b29d5.js";import{g as Ue,a as Ke,s as J,_ as T,u as Xe,d as Lt,b as Ge,c as Tt,e as Z,f as Ye,h as K,B as P,L as Mt,i as zt,S as Ee,I as Me,j as Ot}from"./Link.ba7ebf9c.js";import{S as Rt,C as Bt,D as Nt,a as Vt,g as Ht,s as Ze}from"./abstract.6c307c22.js";import{S as Pt}from"./Save.1c00ecce.js";import"./SwitchBase.fe2c5a52.js";function $t(t){return Ue("MuiCollapse",t)}Ke("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);const Wt=["addEndListener","children","className","collapsedSize","component","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","orientation","style","timeout","TransitionComponent"],jt=t=>{const{orientation:e,classes:n}=t,r={root:["root",`${e}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${e}`],wrapperInner:["wrapperInner",`${e}`]};return Ye(r,$t,n)},qt=J("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,e[n.orientation],n.state==="entered"&&e.entered,n.state==="exited"&&!n.in&&n.collapsedSize==="0px"&&e.hidden]}})(({theme:t,ownerState:e})=>T({height:0,overflow:"hidden",transition:t.transitions.create("height")},e.orientation==="horizontal"&&{height:"auto",width:0,transition:t.transitions.create("width")},e.state==="entered"&&T({height:"auto",overflow:"visible"},e.orientation==="horizontal"&&{width:"auto"}),e.state==="exited"&&!e.in&&e.collapsedSize==="0px"&&{visibility:"hidden"})),Ut=J("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(t,e)=>e.wrapper})(({ownerState:t})=>T({display:"flex",width:"100%"},t.orientation==="horizontal"&&{width:"auto",height:"100%"})),Kt=J("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(t,e)=>e.wrapperInner})(({ownerState:t})=>T({width:"100%"},t.orientation==="horizontal"&&{width:"auto",height:"100%"})),Je=g.exports.forwardRef(function(e,n){const r=Xe({props:e,name:"MuiCollapse"}),{addEndListener:o,children:a,className:s,collapsedSize:u="0px",component:l,easing:p,in:c,onEnter:h,onEntered:v,onEntering:w,onExit:I,onExited:b,onExiting:f,orientation:A="vertical",style:M,timeout:_=Lt.standard,TransitionComponent:F=xt}=r,E=Ge(r,Wt),y=T({},r,{orientation:A,collapsedSize:u}),B=jt(y),re=Ct(),de=g.exports.useRef(),O=g.exports.useRef(null),oe=g.exports.useRef(),Q=typeof u=="number"?`${u}px`:u,X=A==="horizontal",$=X?"width":"height";g.exports.useEffect(()=>()=>{clearTimeout(de.current)},[]);const ee=g.exports.useRef(null),we=Tt(n,ee),W=d=>x=>{if(d){const L=ee.current;x===void 0?d(L):d(L,x)}},ie=()=>O.current?O.current[X?"clientWidth":"clientHeight"]:0,ye=W((d,x)=>{O.current&&X&&(O.current.style.position="absolute"),d.style[$]=Q,h&&h(d,x)}),pe=W((d,x)=>{const L=ie();O.current&&X&&(O.current.style.position="");const{duration:N,easing:j}=Oe({style:M,timeout:_,easing:p},{mode:"enter"});if(_==="auto"){const ze=re.transitions.getAutoHeightDuration(L);d.style.transitionDuration=`${ze}ms`,oe.current=ze}else d.style.transitionDuration=typeof N=="string"?N:`${N}ms`;d.style[$]=`${L}px`,d.style.transitionTimingFunction=j,w&&w(d,x)}),fe=W((d,x)=>{d.style[$]="auto",v&&v(d,x)}),Se=W(d=>{d.style[$]=`${ie()}px`,I&&I(d)}),Ae=W(b),Fe=W(d=>{const x=ie(),{duration:L,easing:N}=Oe({style:M,timeout:_,easing:p},{mode:"exit"});if(_==="auto"){const j=re.transitions.getAutoHeightDuration(x);d.style.transitionDuration=`${j}ms`,oe.current=j}else d.style.transitionDuration=typeof L=="string"?L:`${L}ms`;d.style[$]=Q,d.style.transitionTimingFunction=N,f&&f(d)});return i(F,T({in:c,onEnter:ye,onEntered:fe,onEntering:pe,onExit:Se,onExited:Ae,onExiting:Fe,addEndListener:d=>{_==="auto"&&(de.current=setTimeout(d,oe.current||0)),o&&o(ee.current,d)},nodeRef:ee,timeout:_==="auto"?null:_},E,{children:(d,x)=>i(qt,T({as:l,className:Z(B.root,s,{entered:B.entered,exited:!c&&Q==="0px"&&B.hidden}[d]),style:T({[X?"minWidth":"minHeight"]:Q},M),ownerState:T({},y,{state:d}),ref:we},x,{children:i(Ut,{ownerState:T({},y,{state:d}),className:B.wrapper,ref:O,children:i(Kt,{ownerState:T({},y,{state:d}),className:B.wrapperInner,children:a})})}))}))});Je.muiSupportAuto=!0;var Xt=Je;function Gt(t){return Ue("MuiCard",t)}Ke("MuiCard",["root"]);const Yt=["className","raised"],Zt=t=>{const{classes:e}=t;return Ye({root:["root"]},Gt,e)},Jt=J(qe,{name:"MuiCard",slot:"Root",overridesResolver:(t,e)=>e.root})(()=>({overflow:"hidden"})),Qt=g.exports.forwardRef(function(e,n){const r=Xe({props:e,name:"MuiCard"}),{className:o,raised:a=!1}=r,s=Ge(r,Yt),u=T({},r,{raised:a}),l=Zt(u);return i(Jt,T({className:Z(l.root,o),elevation:a?8:void 0,ref:n,ownerState:u},s))});var en=Qt;let tn=$e({get_label:(t,e)=>e.label});var nn=$e({get_label:(t,e)=>`\u6B21\u8282\uFF1A${e.title}`}),rn=ne({}),on=ne({}),an=ne({}),sn=ne({});let un=ne({}),ln=We({get_title:(t,e)=>e.title}),cn=We({get_title:(t,e)=>"\u7AE0\u8282"});var dn=le({}),pn=le({}),fn=le({surrounder:t=>i("del",{children:t.children})}),hn=le({surrounder:t=>i("u",{children:t.children})}),mn=le({surrounder:t=>i(je,{children:t.children})}),gn=at({get_label:()=>"\u884C",get_numchildren:(t,e)=>e.widths.split(",").reduce((o,a)=>[...o,parseInt(a)],[]).length,get_widths:(t,e)=>e.widths.split(",").reduce((o,a)=>[...o,parseInt(a)],[])}),vn=ne({rightbar_extra(t){return[{component:ut,other_props:{idx:0,parameter_name:"suffix",label:"extra"},skip_mouseless:!0}]}}),_n=Ce({get_label:()=>"\u56FE\u7247",is_empty:(t,e)=>!e.target,render_element:t=>{let[e,n]=C.useState(""),r=t.node,o=r.parameters.target.val,a=r.parameters.type.val,s=r.parameters.height.val,u=r.parameters.width.val;return C.useEffect(()=>{(async()=>{if(a=="internal"){let l=await z.get.resource_info(o,k.node_id);l.url?n(ce(l.url)):n("")}else n(o)})()}),i("img",{src:e||void 0,style:{width:u>0?`${u}rem`:"100%",height:s>0?`${s}rem`:"100%"}})}}),xn=Ce({get_label:(t,e)=>"\u5C55\u793A\u5B50\u8282\u70B9"}),Cn=Ce({get_label:(t,e)=>"\u5C55\u793A\u6742\u9648\u8282\u70B9"}),bn=Ce({get_label:(t,e)=>"\u63D2\u5165\u5B50\u8282\u70B9"}),En=st({get_label:t=>{var e;return(e=t.parameters.label)==null?void 0:e.val}});let kn={group:{\u662D\u8A00:tn,\u968F\u8A00:on,\u5C5E\u8A00:un,\u6570\u5B66:vn,\u88F1\u793A:an,\u5F70\u793A:sn,\u683C\u793A:rn,\u6B21\u8282:nn},inline:{\u5F3A:dn,\u520A:fn,\u7F00:hn,\u6570\u5B66:mn,\u65E0:pn},structure:{\u9F50\u8A00:gn},support:{\u56FE:_n,\u5C0F\u8282\u7EBF:ln,\u7AE0\u8282\u7EBF:cn,\u5C55\u793A\u5B50\u8282\u70B9:xn,\u5C55\u793A\u6742\u9648\u8282\u70B9:Cn,\u63D2\u5165\u5B50\u8282\u70B9:bn},abstract:{\u7A46\u8A00:En}},wn=it();var yn=K([i("circle",{cx:"17",cy:"4.54",r:"2"},"0"),i("path",{d:"M14 17h-2c0 1.65-1.35 3-3 3s-3-1.35-3-3 1.35-3 3-3v-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5zm3-3.5h-1.86l1.67-3.67C17.42 8.5 16.44 7 14.96 7h-5.2c-.81 0-1.54.47-1.87 1.2L7.22 10l1.92.53L9.79 9H12l-1.83 4.1c-.6 1.33.39 2.9 1.85 2.9H17v5h2v-5.5c0-1.1-.9-2-2-2z"},"1")],"AccessibleForward"),Sn=K(i("path",{d:"m22.25 14.29-.69 1.89L9.2 11.71l2.08-5.66 8.56 3.09c2.1.76 3.18 3.06 2.41 5.15zM1.5 12.14 8 14.48V19h8v-1.63L20.52 19l.69-1.89-19.02-6.86-.69 1.89zm5.8-1.94c1.49-.72 2.12-2.51 1.41-4C7.99 4.71 6.2 4.08 4.7 4.8c-1.49.71-2.12 2.5-1.4 4 .71 1.49 2.5 2.12 4 1.4z"}),"AirlineSeatFlatAngled"),An=K(i("path",{d:"M6 6.5c.31 0 .7.15.9.56.24.5.02 1.1-.47 1.34-.14.06-.28.1-.43.1-.3 0-.7-.15-.89-.56-.17-.34-.1-.63-.05-.78.05-.14.18-.4.51-.56.14-.06.28-.1.43-.1m6.47 2.11 6.69 2.41c.52.19.93.56 1.15 1.05.22.48.25 1.03.06 1.53l-.01.02-8.59-3.11.7-1.9M10 15.19l4 1.44V17h-4v-1.81M6 4.5c-.44 0-.88.1-1.3.3-1.49.71-2.12 2.5-1.4 4 .51 1.07 1.58 1.7 2.7 1.7.44 0 .88-.1 1.3-.3 1.49-.72 2.12-2.51 1.41-4C8.19 5.13 7.12 4.5 6 4.5zm5.28 1.55L9.2 11.71l12.36 4.47.69-1.89c.77-2.09-.31-4.39-2.41-5.15l-8.56-3.09zm-9.09 4.2-.69 1.89L8 14.48V19h8v-1.63L20.52 19l.69-1.89-19.02-6.86z"}),"AirlineSeatFlatAngledOutlined"),Fn=K([i("circle",{cx:"12.5",cy:"4.5",r:"2"},"0"),i("path",{d:"m19.77 17.72-.64-6.37c-.07-.77-.72-1.35-1.49-1.35H16c-1.5-.02-2.86-.54-3.76-1.44l-2-1.98C10.08 6.42 9.62 6 8.83 6c-.51 0-1.02.2-1.41.59L4.08 9.91c-.53.68-.51 1.57-.21 2.13l1.43 2.8-3.15 4.05 1.57 1.24L7.4 15.4l-.17-1.36.77.71V20h2v-6.12l-2.12-2.12 2.36-2.36c.94.94 1.72 1.82 3.59 2.32L13 20h1.5l.41-3.5h3.18l.14 1.22c-.44.26-.73.74-.73 1.28 0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5c0-.54-.29-1.02-.73-1.28zM15.09 15l.41-3.5h2l.41 3.5h-2.82z"},"1")],"AssistWalker"),Dn=K(i("path",{d:"M18.41 5.8 17.2 4.59c-.78-.78-2.05-.78-2.83 0l-2.68 2.68L3 15.96V20h4.04l8.74-8.74 2.63-2.63c.79-.78.79-2.05 0-2.83zM6.21 18H5v-1.21l8.66-8.66 1.21 1.21L6.21 18zM11 20l4-4h6v4H11z"}),"DriveFileRenameOutline"),Qe=K(i("path",{d:"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zM8 13.01l1.41 1.41L11 12.84V17h2v-4.16l1.59 1.59L16 13.01 12.01 9 8 13.01z"}),"DriveFolderUpload"),In=K(i("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4 6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"}),"FileCopy"),Ln=K(i("path",{d:"M9.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5.75 8.9 3 23h2.1l1.75-8L9 17v6h2v-7.55L8.95 13.4l.6-3C10.85 12 12.8 13 15 13v-2c-1.85 0-3.45-1-4.35-2.45l-.95-1.6C9.35 6.35 8.7 6 8 6c-.25 0-.5.05-.75.15L2 8.3V13h2V9.65l1.75-.75M13 2v7h3.75v14h1.5V9H22V2h-9zm5.01 6V6.25H14.5v-1.5h3.51V3l2.49 2.5L18.01 8z"}),"FollowTheSigns");function ke(t){let e=t.Icon;return i(P,{sx:{marginLeft:"0.35rem",marginRight:"0.25rem",marginTop:"0.35rem"},children:i(be,{title:t.title,children:i(Mt,{underline:"hover",href:t.href,children:i(e,{fontSize:"small",color:"primary"})})})})}function Tn(t){return i(ke,{title:"\u540E\u53F0\u9875\u9762",href:ce(`/admin/articlezone/node/${k.node_id}/change/`),Icon:Ln})}function Mn(t){return i(ke,{title:"\u7F16\u8F91\u5B50\u8282\u70B9\u7ED3\u6784",href:ce(`/edit/structure/${k.node_id}`),Icon:Sn})}function zn(t){return i(ke,{title:"\uFF08\u6D45\uFF09\u7F16\u8F91\u5B50\u8282\u70B9\u7ED3\u6784",href:ce(`/edit/shallow_structure/${k.node_id}`),Icon:An})}function On(t){return i(ke,{title:"\u9884\u89C8\u9875\u9762\uFF08\u6709\u4EC0\u4E48\u5FC5\u8981\u5417\uFF09",href:ce(`/view/content/${k.node_id}`),Icon:yn})}function Be(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Rn(t,e,n){return e&&Be(t.prototype,e),n&&Be(t,n),t}function m(){return m=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},m.apply(this,arguments)}function Bn(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function U(t,e){if(t==null)return{};var n={},r=Object.keys(t),o,a;for(a=0;a<r.length;a++)o=r[a],!(e.indexOf(o)>=0)&&(n[o]=t[o]);return n}function Ne(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var et=C.createContext(),Nn={mui:{root:{},anchorOriginTopCenter:{},anchorOriginBottomCenter:{},anchorOriginTopRight:{},anchorOriginBottomRight:{},anchorOriginTopLeft:{},anchorOriginBottomLeft:{}},container:{containerRoot:{},containerAnchorOriginTopCenter:{},containerAnchorOriginBottomCenter:{},containerAnchorOriginTopRight:{},containerAnchorOriginBottomRight:{},containerAnchorOriginTopLeft:{},containerAnchorOriginBottomLeft:{}}},V={view:{default:20,dense:4},snackbar:{default:6,dense:2}},Y={maxSnack:3,dense:!1,hideIconVariant:!1,variant:"default",autoHideDuration:5e3,anchorOrigin:{vertical:"bottom",horizontal:"left"},TransitionComponent:Rt,transitionDuration:{enter:225,exit:195}},se=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},Vn=function(e){return""+se(e.vertical)+se(e.horizontal)},Hn=function(e){return Object.keys(e).filter(function(n){return!Nn.container[n]}).reduce(function(n,r){var o;return m({},n,(o={},o[r]=e[r],o))},{})},q={TIMEOUT:"timeout",CLICKAWAY:"clickaway",MAXSNACK:"maxsnack",INSTRUCTED:"instructed"},_e={toContainerAnchorOrigin:function(e){return"containerAnchorOrigin"+e},toAnchorOrigin:function(e){var n=e.vertical,r=e.horizontal;return"anchorOrigin"+se(n)+se(r)},toVariant:function(e){return"variant"+se(e)}},me=function(e){return!!e||e===0},Ve=function(e){return typeof e=="number"||e===null},Pn=function(e,n,r){return function(o){return o==="autoHideDuration"?Ve(e.autoHideDuration)?e.autoHideDuration:Ve(n.autoHideDuration)?n.autoHideDuration:Y.autoHideDuration:e[o]||n[o]||r[o]}};function De(t,e,n){return t===void 0&&(t={}),e===void 0&&(e={}),n===void 0&&(n={}),m({},n,{},e,{},t)}var $n="SnackbarContent",tt={root:$n+"-root"},Wn=J("div")(function(t){var e,n,r=t.theme;return n={},n["&."+tt.root]=(e={display:"flex",flexWrap:"wrap",flexGrow:1},e[r.breakpoints.up("sm")]={flexGrow:"initial",minWidth:288},e),n}),jn=g.exports.forwardRef(function(t,e){var n=t.className,r=U(t,["className"]);return i(Wn,{...Object.assign({ref:e,className:Z(tt.root,n)},r)})}),He={right:"left",left:"right",bottom:"up",top:"down"},qn=function(e){return e.horizontal!=="center"?He[e.horizontal]:He[e.vertical]},Un=function(e){return i(Ee,{...Object.assign({},e),children:i("path",{d:"M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"})})},Kn=function(e){return i(Ee,{...Object.assign({},e),children:i("path",{d:"M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"})})},Xn=function(e){return i(Ee,{...Object.assign({},e),children:i("path",{d:"M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2, 6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12, 13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"})})},Gn=function(e){return i(Ee,{...Object.assign({},e),children:i("path",{d:"M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12A10,10 0 0,0 12,2Z"})})},ge={fontSize:20,marginInlineEnd:8},Yn={default:void 0,success:i(Un,{style:ge}),warning:i(Kn,{style:ge}),error:i(Xn,{style:ge}),info:i(Gn,{style:ge})};function ue(t,e){return t.reduce(function(n,r){return r==null?n:function(){for(var a=arguments.length,s=new Array(a),u=0;u<a;u++)s[u]=arguments[u];var l=[].concat(s);e&&l.indexOf(e)===-1&&l.push(e),n.apply(this,l),r.apply(this,l)}},function(){})}var Zn=typeof window!="undefined"?g.exports.useLayoutEffect:g.exports.useEffect;function Pe(t){var e=g.exports.useRef(t);return Zn(function(){e.current=t}),g.exports.useCallback(function(){return e.current.apply(void 0,arguments)},[])}var Jn=g.exports.forwardRef(function(t,e){var n=t.children,r=t.autoHideDuration,o=t.ClickAwayListenerProps,a=t.disableWindowBlurListener,s=a===void 0?!1:a,u=t.onClose,l=t.onMouseEnter,p=t.onMouseLeave,c=t.open,h=t.resumeHideDuration,v=U(t,["children","autoHideDuration","ClickAwayListenerProps","disableWindowBlurListener","onClose","onMouseEnter","onMouseLeave","open","resumeHideDuration"]),w=g.exports.useRef(),I=Pe(function(){u&&u.apply(void 0,arguments)}),b=Pe(function(E){!u||E==null||(clearTimeout(w.current),w.current=setTimeout(function(){I(null,q.TIMEOUT)},E))});g.exports.useEffect(function(){return c&&b(r),function(){clearTimeout(w.current)}},[c,r,b]);var f=function(){clearTimeout(w.current)},A=g.exports.useCallback(function(){r!=null&&b(h!=null?h:r*.5)},[r,h,b]),M=function(y){l&&l(y),f()},_=function(y){p&&p(y),A()},F=function(y){u&&u(y,q.CLICKAWAY)};return g.exports.useEffect(function(){if(!s&&c)return window.addEventListener("focus",A),window.addEventListener("blur",f),function(){window.removeEventListener("focus",A),window.removeEventListener("blur",f)}},[s,A,c]),g.exports.createElement(Bt,m({onClickAway:F},o),g.exports.createElement("div",m({onMouseEnter:M,onMouseLeave:_,ref:e},v),n))}),H="SnackbarItem",S={contentRoot:H+"-contentRoot",lessPadding:H+"-lessPadding",variantSuccess:H+"-variantSuccess",variantError:H+"-variantError",variantInfo:H+"-variantInfo",variantWarning:H+"-variantWarning",message:H+"-message",action:H+"-action",wrappedRoot:H+"-wrappedRoot"},Qn=J(Jn)(function(t){var e,n=t.theme,r=n.palette.mode||n.palette.type,o=zt(n.palette.background.default,r==="light"?.8:.98);return e={},e["&."+S.wrappedRoot]={position:"relative",transform:"translateX(0)",top:0,right:0,bottom:0,left:0},e["."+S.contentRoot]=m({},n.typography.body2,{backgroundColor:o,color:n.palette.getContrastText(o),alignItems:"center",padding:"6px 16px",borderRadius:"4px",boxShadow:"0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)"}),e["."+S.lessPadding]={paddingLeft:8*2.5},e["."+S.variantSuccess]={backgroundColor:"#43a047",color:"#fff"},e["."+S.variantError]={backgroundColor:"#d32f2f",color:"#fff"},e["."+S.variantInfo]={backgroundColor:"#2196f3",color:"#fff"},e["."+S.variantWarning]={backgroundColor:"#ff9800",color:"#fff"},e["."+S.message]={display:"flex",alignItems:"center",padding:"8px 0"},e["."+S.action]={display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8},e}),er=function(e){var n=e.classes,r=U(e,["classes"]),o=g.exports.useRef(),a=g.exports.useState(!0),s=a[0],u=a[1];g.exports.useEffect(function(){return function(){o.current&&clearTimeout(o.current)}},[]);var l=ue([r.snack.onClose,r.onClose],r.snack.key),p=function(){r.snack.requestClose&&l(null,q.INSTRCUTED)},c=function(){o.current=setTimeout(function(){u(!s)},125)},h=r.style,v=r.ariaAttributes,w=r.className,I=r.hideIconVariant,b=r.iconVariant,f=r.snack,A=r.action,M=r.content,_=r.TransitionComponent,F=r.TransitionProps,E=r.transitionDuration,y=U(r,["style","dense","ariaAttributes","className","hideIconVariant","iconVariant","snack","action","content","TransitionComponent","TransitionProps","transitionDuration","onEnter","onEntered","onEntering","onExit","onExited","onExiting"]),B=f.key,re=f.open,de=f.className,O=f.variant,oe=f.content,Q=f.action,X=f.ariaAttributes,$=f.anchorOrigin,ee=f.message,we=f.TransitionComponent,W=f.TransitionProps,ie=f.transitionDuration,ye=U(f,["persist","key","open","entered","requestClose","className","variant","content","action","ariaAttributes","anchorOrigin","message","TransitionComponent","TransitionProps","transitionDuration","onEnter","onEntered","onEntering","onExit","onExited","onExiting"]),pe=m({},Yn,{},b)[O],fe=m({"aria-describedby":"notistack-snackbar"},De(X,v)),Se=we||_||Y.TransitionComponent,Ae=De(ie,E,Y.transitionDuration),Fe=m({direction:qn($)},De(W,F)),te=Q||A;typeof te=="function"&&(te=te(B));var d=oe||M;typeof d=="function"&&(d=d(B,f.message));var x=["onEnter","onEntering","onEntered","onExit","onExiting","onExited"].reduce(function(L,N){var j;return m({},L,(j={},j[N]=ue([r.snack[N],r[N]],r.snack.key),j))},{});return i(Xt,{unmountOnExit:!0,timeout:175,in:s,onExited:x.onExited,children:i(Qn,{...Object.assign({},y,ye,{open:re,className:Z(n.root,S.wrappedRoot,n[_e.toAnchorOrigin($)]),onClose:l}),children:i(Se,{...Object.assign({appear:!0,in:re,timeout:Ae},Fe,{onExit:x.onExit,onExiting:x.onExiting,onExited:c,onEnter:x.onEnter,onEntering:x.onEntering,onEntered:ue([x.onEntered,p])}),children:d||D(jn,{...Object.assign({},fe,{role:"alert",style:h,className:Z(S.contentRoot,S[_e.toVariant(O)],n[_e.toVariant(O)],w,de,!I&&pe&&S.lessPadding)}),children:[D("div",{id:fe["aria-describedby"],className:S.message,children:[I?null:pe,ee]}),te&&i("div",{className:S.action,children:te})]})})})})},Ie={container:"& > .MuiCollapse-container, & > .MuiCollapse-root",wrapper:"& > .MuiCollapse-container > .MuiCollapse-wrapper, & > .MuiCollapse-root > .MuiCollapse-wrapper"},Le=16,G="SnackbarContainer",R={root:G+"-root",rootDense:G+"-rootDense",top:G+"-top",bottom:G+"-bottom",left:G+"-left",right:G+"-right",center:G+"-center"},tr=J("div")(function(t){var e,n,r,o,a,s,u=t.theme;return s={},s["&."+R.root]=(e={boxSizing:"border-box",display:"flex",maxHeight:"100%",position:"fixed",zIndex:u.zIndex.snackbar,height:"auto",width:"auto",transition:"top 300ms ease 0ms, right 300ms ease 0ms, bottom 300ms ease 0ms, left 300ms ease 0ms, margin 300ms ease 0ms, max-width 300ms ease 0ms",pointerEvents:"none"},e[Ie.container]={pointerEvents:"all"},e[Ie.wrapper]={padding:V.snackbar.default+"px 0px",transition:"padding 300ms ease 0ms"},e.maxWidth="calc(100% - "+V.view.default*2+"px)",e[u.breakpoints.down("sm")]={width:"100%",maxWidth:"calc(100% - "+Le*2+"px)"},e),s["&."+R.rootDense]=(n={},n[Ie.wrapper]={padding:V.snackbar.dense+"px 0px"},n),s["&."+R.top]={top:V.view.default-V.snackbar.default,flexDirection:"column"},s["&."+R.bottom]={bottom:V.view.default-V.snackbar.default,flexDirection:"column-reverse"},s["&."+R.left]=(r={left:V.view.default},r[u.breakpoints.up("sm")]={alignItems:"flex-start"},r[u.breakpoints.down("sm")]={left:Le+"px"},r),s["&."+R.right]=(o={right:V.view.default},o[u.breakpoints.up("sm")]={alignItems:"flex-end"},o[u.breakpoints.down("sm")]={right:Le+"px"},o),s["&."+R.center]=(a={left:"50%",transform:"translateX(-50%)"},a[u.breakpoints.up("sm")]={alignItems:"center"},a),s}),nr=function(e){var n=e.className,r=e.anchorOrigin,o=e.dense,a=U(e,["className","anchorOrigin","dense"]),s=Z(R[r.vertical],R[r.horizontal],R.root,n,o&&R.rootDense);return i(tr,{...Object.assign({className:s},a)})},rr=C.memo(nr),or=function(t){Bn(e,t);function e(r){var o;return o=t.call(this,r)||this,o.enqueueSnackbar=function(a,s){s===void 0&&(s={});var u=s,l=u.key,p=u.preventDuplicate,c=U(u,["key","preventDuplicate"]),h=me(l),v=h?l:new Date().getTime()+Math.random(),w=Pn(c,o.props,Y),I=m({key:v},c,{message:a,open:!0,entered:!1,requestClose:!1,variant:w("variant"),anchorOrigin:w("anchorOrigin"),autoHideDuration:w("autoHideDuration")});return c.persist&&(I.autoHideDuration=void 0),o.setState(function(b){if(p===void 0&&o.props.preventDuplicate||p){var f=function(F){return h?F.key===l:F.message===a},A=b.queue.findIndex(f)>-1,M=b.snacks.findIndex(f)>-1;if(A||M)return b}return o.handleDisplaySnack(m({},b,{queue:[].concat(b.queue,[I])}))}),v},o.handleDisplaySnack=function(a){var s=a.snacks;return s.length>=o.maxSnack?o.handleDismissOldest(a):o.processQueue(a)},o.processQueue=function(a){var s=a.queue,u=a.snacks;return s.length>0?m({},a,{snacks:[].concat(u,[s[0]]),queue:s.slice(1,s.length)}):a},o.handleDismissOldest=function(a){if(a.snacks.some(function(c){return!c.open||c.requestClose}))return a;var s=!1,u=!1,l=a.snacks.reduce(function(c,h){return c+(h.open&&h.persist?1:0)},0);l===o.maxSnack&&(u=!0);var p=a.snacks.map(function(c){return!s&&(!c.persist||u)?(s=!0,c.entered?(c.onClose&&c.onClose(null,q.MAXSNACK,c.key),o.props.onClose&&o.props.onClose(null,q.MAXSNACK,c.key),m({},c,{open:!1})):m({},c,{requestClose:!0})):m({},c)});return m({},a,{snacks:p})},o.handleEnteredSnack=function(a,s,u){if(!me(u))throw new Error("handleEnteredSnack Cannot be called with undefined key");o.setState(function(l){var p=l.snacks;return{snacks:p.map(function(c){return c.key===u?m({},c,{entered:!0}):m({},c)})}})},o.handleCloseSnack=function(a,s,u){if(o.props.onClose&&o.props.onClose(a,s,u),s!==q.CLICKAWAY){var l=u===void 0;o.setState(function(p){var c=p.snacks,h=p.queue;return{snacks:c.map(function(v){return!l&&v.key!==u?m({},v):v.entered?m({},v,{open:!1}):m({},v,{requestClose:!0})}),queue:h.filter(function(v){return v.key!==u})}})}},o.closeSnackbar=function(a){var s=o.state.snacks.find(function(u){return u.key===a});me(a)&&s&&s.onClose&&s.onClose(null,q.INSTRUCTED,a),o.handleCloseSnack(null,q.INSTRUCTED,a)},o.handleExitedSnack=function(a,s,u){var l=s||u;if(!me(l))throw new Error("handleExitedSnack Cannot be called with undefined key");o.setState(function(p){var c=o.processQueue(m({},p,{snacks:p.snacks.filter(function(h){return h.key!==l})}));return c.queue.length===0?c:o.handleDismissOldest(c)})},o.state={snacks:[],queue:[],contextValue:{enqueueSnackbar:o.enqueueSnackbar.bind(Ne(o)),closeSnackbar:o.closeSnackbar.bind(Ne(o))}},o}var n=e.prototype;return n.render=function(){var o=this,a=this.state.contextValue,s=this.props,u=s.iconVariant,l=s.dense,p=l===void 0?Y.dense:l,c=s.hideIconVariant,h=c===void 0?Y.hideIconVariant:c,v=s.domRoot,w=s.children,I=s.classes,b=I===void 0?{}:I,f=U(s,["maxSnack","preventDuplicate","variant","anchorOrigin","iconVariant","dense","hideIconVariant","domRoot","children","classes"]),A=this.state.snacks.reduce(function(_,F){var E,y=Vn(F.anchorOrigin),B=_[y]||[];return m({},_,(E={},E[y]=[].concat(B,[F]),E))},{}),M=Object.keys(A).map(function(_){var F=A[_];return i(rr,{dense:p,anchorOrigin:F[0].anchorOrigin,className:Z(b.containerRoot,b[_e.toContainerAnchorOrigin(_)]),children:F.map(function(E){return i(er,{...Object.assign({},f,{key:E.key,snack:E,dense:p,iconVariant:u,hideIconVariant:h,classes:Hn(b),onClose:o.handleCloseSnack,onExited:ue([o.handleExitedSnack,o.props.onExited]),onEntered:ue([o.handleEnteredSnack,o.props.onEntered])})})})},_)});return D(et.Provider,{value:a,children:[w,v?lt.exports.createPortal(M,v):M]})},Rn(e,[{key:"maxSnack",get:function(){return this.props.maxSnack||Y.maxSnack}}]),e}(g.exports.Component),nt=function(){return g.exports.useContext(et)};function ir(){return i(P,{sx:{marginX:"auto"},children:D("label",{children:[i("input",{type:"file",style:{display:"none"},onChange:t=>{if(t.target.files.length>0){var e=new FormData;e.append("file",t.target.files[0]),z.post.file(e,k.node_id)}}}),i(xe,{title:"\u4E0A\u4F20",icon:Qe,component:"span",size:"small",icon_props:{sx:{marginLeft:"-0.1rem",color:"primary"}}})]})})}function ar(t){let[e,n]=C.useState(void 0);const{enqueueSnackbar:r,closeSnackbar:o}=nt();return D(C.Fragment,{children:[i(xe,{title:"\u5220\u9664\u8D44\u6E90",icon:Vt,onClick:async a=>{n(a.currentTarget)}}),i(bt,{anchorEl:e,open:!!e,onClose:a=>n(void 0),anchorOrigin:{vertical:"center",horizontal:"right"},children:i(Et,{onClick:async a=>{let s=await z.post.delete_resource(t.resource_id);r(s?"\u5220\u9664\u6210\u529F":"\u5220\u9664\u5931\u8D25"),n(void 0),s&&t.onSuccess&&t.onSuccess()},children:"\u786E\u5B9A\uFF1F"})})]})}function sr(t){let[e,n,r]=[t.id,t.name,t.url],[o,a]=C.useState(n);const{enqueueSnackbar:s,closeSnackbar:u}=nt();g.exports.useEffect(()=>{a(n)},[n]);let l=t.onSuccess||(()=>{});return i(qe,{variant:"outlined",sx:{position:"relative",marginTop:"1rem",marginX:"1rem",marginBottom:"1rem",paddingY:"0.7rem"},children:D(ve,{force_direction:"row",children:[i(P,{sx:{flex:1},children:D(ve,{children:[i(Re,{variant:"standard",label:"name",value:o,fullWidth:!0,onChange:p=>{a(p.target.value)}}),i(Re,{variant:"standard",label:"url",value:r,fullWidth:!0,sx:{marginTop:"1rem"},InputProps:{readOnly:!0}})]})}),i(P,{children:D(ve,{children:[i(xe,{title:"\u66F4\u6539\u8D44\u6E90\u540D",icon:Dn,onClick:async p=>{let c={name:o},h=await z.post.manage_recourse(!1,c,e);s(h?"\u4FEE\u6539\u6587\u4EF6\u540D\u6210\u529F":"\u4FEE\u6539\u6587\u4EF6\u540D\u5931\u8D25")}}),D("label",{children:[i("input",{type:"file",style:{display:"none"},onChange:async p=>{let c=!1;if(p.target.files.length<=0)c=!1;else{var h=new FormData;h.append("file",p.target.files[0]);let v=await z.post.manage_recourse(!0,h,e);c=v,v&&l()}s(c?"\u4E0A\u4F20\u6587\u4EF6\u6210\u529F":"\u4E0A\u4F20\u6587\u4EF6\u5931\u8D25")}}),i(xe,{title:"\u66FF\u6362\u6587\u4EF6",icon:Qe,component:"span"})]}),i(ar,{resource_id:e,onSuccess:l})]})})]})})}class ur extends C.Component{constructor(n){super(n);ae(this,"contextType",ct);this.state={resources:[]}}async effect(){let n=await z.get.resources(k.node_id);this.setState({resources:n}),this.forceUpdate()}async componentDidMount(){this.effect()}render(){let n=this;return i(P,{sx:n.context.printer.fonts.body,children:i(ve,{force_direction:"column",children:n.state.resources.map((r,o)=>{let[a,s,u]=r;return i(C.Fragment,{children:i(sr,{id:a,name:s,url:u,onSuccess:()=>{n.effect()}})},o)})})})}}function lr(t){let[e,n]=C.useState(!1);return D(C.Fragment,{children:[i(be,{title:"\u67E5\u770B/\u7BA1\u7406\u6587\u4EF6",children:i(Me,{size:"small",onClick:()=>{n(!0)},children:i(In,{fontSize:"small",color:"primary"})})}),i(Nt,{anchor:"left",open:e,onClose:()=>n(!1),ModalProps:{keepMounted:!1},SlideProps:{onExited:()=>{}},PaperProps:{sx:{width:"40%"}},children:i(ur,{})})]})}class cr extends C.Component{constructor(e){super(e),this.state={snackbar_open:!1,status:!1}}render(){let e=this;return i(C.Fragment,{children:i(be,{title:"\u751F\u6210\u6458\u8981",children:i(Me,{size:"small",onClick:()=>{z.post.tldr(k.node_id).then(()=>{let n=e.props.onSuccess;n&&n()})},children:i(Fn,{fontSize:"small",color:"primary"})})})})}}class dr extends C.Component{constructor(e){super(e),this.state={snackbar_open:!1,status:!1}}render(){return i(C.Fragment,{children:i(be,{title:"\u4FDD\u5B58",children:i(Me,{size:"small",onClick:()=>this.props.save_func(),children:i(Pt,{fontSize:"small",color:"primary"})})})})}}function Te(t,e,n){return Ze(t,e)&&t.concept==n}function pr(t,e){const n=e.normalizeNode;return e.normalizeNode=r=>{let[o,a]=r;if(Ht("initializing")){n(r);return}if(a.length==0){let s=o,u=s.children.length;if(u==0||!Te(s.children[0],"support","\u5C0F\u8282\u7EBF")){t.add_nodes(t.get_core().create_support("\u5C0F\u8282\u7EBF"),[0]);return}if(!Te(s.children[u-1],"support","\u7AE0\u8282\u7EBF")){t.add_nodes(t.get_core().create_support("\u7AE0\u8282\u7EBF"),[u]);return}}if(Te(o,"support","\u7AE0\u8282\u7EBF")&&(a.length!=1||a[0]!=e.children.length-1)){t.delete_node_by_path(a);return}n(r)},e}function fr(t,e){const n=e.normalizeNode;return e.normalizeNode=r=>{let[o,a]=r;Ze(o),n(r)},e}let hr=[pr,fr];function mr(t,e){for(let n of hr)e=n(t,e);return e}class gr extends C.Component{constructor(n){super(n);ae(this,"editor_ref");ae(this,"printer_ref");ae(this,"snackerbar_ref");this.state={printer:void 0,editorcore:void 0,tree:void 0,cache:void 0},this.editor_ref=C.createRef(),this.printer_ref=C.createRef(),this.snackerbar_ref=C.createRef()}update_title(n){var o,a;n||(n=this.state.tree),n&&(document.title=`\u7F16\u8F91\uFF1A${(a=(o=n.parameters)==null?void 0:o.title)==null?void 0:a.val}`)}open_snackerbar(n){this.snackerbar_ref&&this.snackerbar_ref.current&&this.snackerbar_ref.current.enqueueSnackbar(n)}async componentDidMount(){let n=this,r=await z.get.concept(k.node_id),o=kt(r),a=new dt(wt,o,yt,St),s=new pt({renderers:kn,default_renderers:wn,printer:a}),u=await z.get.content(k.node_id);u||(u=s.create_abstract("root"),u.parameters={title:{val:`Article: ${k.node_id}`,type:"string"}}),n.update_title(u);let l=await z.get.cache(k.node_id);this.setState({printer:a,editorcore:s,tree:u,cache:l})}get_editor(){if(this.editor_ref&&this.editor_ref.current)return this.editor_ref.current.get_editor()}get_printer_comp(){if(this.printer_ref&&this.printer_ref.current)return this.printer_ref.current.get_component()}async save_content(n=void 0,r=void 0){n==null&&(n=this.state.tree),r==null&&(r=this.state.cache);let o=await z.post.content({content:n},k.node_id),a=await z.post.cache({cache:r},k.node_id);this.open_snackerbar(o&&a?"\u4FDD\u5B58\u6210\u529F":"\u4FDD\u5B58\u5931\u8D25")}scroll_to_selection(){let n=this.get_editor(),r=this.get_printer_comp();if(!(n&&r))return;let o=n.get_slate().selection;if(!(o&&o.focus&&o.focus.path))return;let a=o.focus.path;r.scroll_to(a)}update_tree(){let n=this.get_editor();if(!n)return;let r=n.get_root();return this.setState({tree:r}),this.update_title(),r}render(){let n=this,{editorcore:r,printer:o,tree:a}=this.state;if(!(r&&o&&a))return i(je,{});let[s,u]=(()=>{let{children:l,...p}=a;return[p,l]})();return i(At,{theme:Ot(he.mui),children:i(ft,{value:he,mui:!0,children:D(P,{sx:l=>({position:"fixed",width:"100%",height:"100%",left:"0",right:"0",backgroundColor:l.palette.background.default,color:l.palette.text.primary}),children:[i(Ft,{}),i(or,{maxSnack:3,ref:n.snackerbar_ref,anchorOrigin:{horizontal:"right",vertical:"top"},variant:"info",children:D(P,{sx:{position:"absolute",top:"2%",left:"1%",height:"96%",width:"98%"},children:[D(en,{sx:{position:"absolute",left:"0",width:"auto",display:"flex",flexDirection:"column"},children:[i(dr,{save_func:n.save_content.bind(n)}),i(lr,{}),i(ir,{}),i(Tn,{}),i(Mn,{}),i(zn,{}),i(On,{}),i(cr,{onSuccess:()=>{n.open_snackerbar("\u751F\u6210\u6458\u8981\u5B8C\u6210\uFF01")}})]}),D(P,{sx:{position:"absolute",left:"3%",width:"96%",height:"100%"},children:[i(P,{sx:{position:"absolute",width:"49%",left:"0%",top:"0",height:"100%"},children:i(ht,{ref:n.editor_ref,editorcore:r,init_rootproperty:s,init_rootchildren:u,onSave:()=>{let l=n.update_tree();setTimeout(()=>{Dt.go(),n.save_content(l),n.scroll_to_selection()},50)},theme:he,plugin:mr})}),i(mt,{sx:{position:"absolute",width:"49%",left:"51%",top:"0",height:"100%",overflow:"auto",paddingRight:"1%"},className:"mathjax_process",children:i(It,{children:i(gt,{value:{BackendData:k,cache:n.state.cache},children:i(vt,{printer:o,theme:he,onUpdateCache:l=>{l&&JSON.stringify(l)!=JSON.stringify(n.state.cache)&&setTimeout(()=>n.setState({cache:l}),200)},ref:n.printer_ref,root:a,onDidMount:l=>{k.linkto&&setTimeout(()=>{let p=parseInt(k.linkto);l.scroll_to_idx(p);let c=l.get_ref_from_idx(p);c&&(c.style.border="2px solid")},300)}})})})})]})]})})]})})})}}_t.render(i(gr,{}),document.getElementById("root"));
