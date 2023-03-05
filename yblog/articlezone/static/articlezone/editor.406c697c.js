var rt=Object.defineProperty;var ot=(t,e,n)=>e in t?rt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ae=(t,e,n)=>(ot(t,typeof e!="symbol"?e+"":e,n),n);import{r as g,j as i,g as it,c as He,d as ne,e as $e,f as le,h as at,i as Te,k as st,F as We,M as ut,a as b,I as R,B as k,u as ce,A as Le,b as F,l as lt,T as ct,m as ve,n as xe,P as dt,E as pt,o as ft,p as ht,S as mt,G as gt,q as vt,R as _t}from"./titleword.f7f7728b.js";import{T as xt,u as Ct,g as Oe,P as je,S as Et,C as bt,a as ze,D as kt,b as wt,c as yt,B as St,d as At,s as qe,p as Dt,f as Ft,r as It,e as Tt,h as Lt,m as he,i as Mt}from"./index.5033c8fd.js";import{f as Ot,M as zt}from"./math.e82b0f78.js";import{g as Ue,a as Ke,s as Z,_ as L,u as Xe,d as Rt,b as Ge,c as Bt,e as Y,f as Ye,h as J,B as H,L as Nt,i as Vt,S as Ce,I as Ze,j as Pt}from"./Link.4c9f1461.js";import{S as Ht}from"./Save.c0bf75b5.js";function $t(t){return Ue("MuiCollapse",t)}Ke("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);const Wt=["addEndListener","children","className","collapsedSize","component","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","orientation","style","timeout","TransitionComponent"],jt=t=>{const{orientation:e,classes:n}=t,r={root:["root",`${e}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${e}`],wrapperInner:["wrapperInner",`${e}`]};return Ye(r,$t,n)},qt=Z("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,e[n.orientation],n.state==="entered"&&e.entered,n.state==="exited"&&!n.in&&n.collapsedSize==="0px"&&e.hidden]}})(({theme:t,ownerState:e})=>L({height:0,overflow:"hidden",transition:t.transitions.create("height")},e.orientation==="horizontal"&&{height:"auto",width:0,transition:t.transitions.create("width")},e.state==="entered"&&L({height:"auto",overflow:"visible"},e.orientation==="horizontal"&&{width:"auto"}),e.state==="exited"&&!e.in&&e.collapsedSize==="0px"&&{visibility:"hidden"})),Ut=Z("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(t,e)=>e.wrapper})(({ownerState:t})=>L({display:"flex",width:"100%"},t.orientation==="horizontal"&&{width:"auto",height:"100%"})),Kt=Z("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(t,e)=>e.wrapperInner})(({ownerState:t})=>L({width:"100%"},t.orientation==="horizontal"&&{width:"auto",height:"100%"})),Je=g.exports.forwardRef(function(e,n){const r=Xe({props:e,name:"MuiCollapse"}),{addEndListener:o,children:a,className:s,collapsedSize:u="0px",component:l,easing:p,in:c,onEnter:h,onEntered:v,onEntering:w,onExit:I,onExited:C,onExiting:f,orientation:A="vertical",style:M,timeout:_=Rt.standard,TransitionComponent:D=xt}=r,E=Ge(r,Wt),y=L({},r,{orientation:A,collapsedSize:u}),B=jt(y),re=Ct(),de=g.exports.useRef(),O=g.exports.useRef(null),oe=g.exports.useRef(),Q=typeof u=="number"?`${u}px`:u,K=A==="horizontal",$=K?"width":"height";g.exports.useEffect(()=>()=>{clearTimeout(de.current)},[]);const ee=g.exports.useRef(null),be=Bt(n,ee),W=d=>x=>{if(d){const T=ee.current;x===void 0?d(T):d(T,x)}},ie=()=>O.current?O.current[K?"clientWidth":"clientHeight"]:0,ke=W((d,x)=>{O.current&&K&&(O.current.style.position="absolute"),d.style[$]=Q,h&&h(d,x)}),pe=W((d,x)=>{const T=ie();O.current&&K&&(O.current.style.position="");const{duration:N,easing:j}=Oe({style:M,timeout:_,easing:p},{mode:"enter"});if(_==="auto"){const Me=re.transitions.getAutoHeightDuration(T);d.style.transitionDuration=`${Me}ms`,oe.current=Me}else d.style.transitionDuration=typeof N=="string"?N:`${N}ms`;d.style[$]=`${T}px`,d.style.transitionTimingFunction=j,w&&w(d,x)}),fe=W((d,x)=>{d.style[$]="auto",v&&v(d,x)}),we=W(d=>{d.style[$]=`${ie()}px`,I&&I(d)}),ye=W(C),Se=W(d=>{const x=ie(),{duration:T,easing:N}=Oe({style:M,timeout:_,easing:p},{mode:"exit"});if(_==="auto"){const j=re.transitions.getAutoHeightDuration(x);d.style.transitionDuration=`${j}ms`,oe.current=j}else d.style.transitionDuration=typeof T=="string"?T:`${T}ms`;d.style[$]=Q,d.style.transitionTimingFunction=N,f&&f(d)});return i(D,L({in:c,onEnter:ke,onEntered:fe,onEntering:pe,onExit:we,onExited:ye,onExiting:Se,addEndListener:d=>{_==="auto"&&(de.current=setTimeout(d,oe.current||0)),o&&o(ee.current,d)},nodeRef:ee,timeout:_==="auto"?null:_},E,{children:(d,x)=>i(qt,L({as:l,className:Y(B.root,s,{entered:B.entered,exited:!c&&Q==="0px"&&B.hidden}[d]),style:L({[K?"minWidth":"minHeight"]:Q},M),ownerState:L({},y,{state:d}),ref:be},x,{children:i(Ut,{ownerState:L({},y,{state:d}),className:B.wrapper,ref:O,children:i(Kt,{ownerState:L({},y,{state:d}),className:B.wrapperInner,children:a})})}))}))});Je.muiSupportAuto=!0;var Xt=Je;function Gt(t){return Ue("MuiCard",t)}Ke("MuiCard",["root"]);const Yt=["className","raised"],Zt=t=>{const{classes:e}=t;return Ye({root:["root"]},Gt,e)},Jt=Z(je,{name:"MuiCard",slot:"Root",overridesResolver:(t,e)=>e.root})(()=>({overflow:"hidden"})),Qt=g.exports.forwardRef(function(e,n){const r=Xe({props:e,name:"MuiCard"}),{className:o,raised:a=!1}=r,s=Ge(r,Yt),u=L({},r,{raised:a}),l=Zt(u);return i(Jt,L({className:Y(l.root,o),elevation:a?8:void 0,ref:n,ownerState:u},s))});var en=Qt;let tn=He({get_label:(t,e)=>e.label});var nn=He({get_label:(t,e)=>`\u6B21\u8282\uFF1A${e.title}`}),rn=ne({}),on=ne({}),an=ne({}),sn=ne({});let un=ne({}),ln=$e({get_title:(t,e)=>e.title}),cn=$e({get_title:(t,e)=>"\u7AE0\u8282"});var dn=le({}),pn=le({}),fn=le({surrounder:t=>i("del",{children:t.children})}),hn=le({surrounder:t=>i("u",{children:t.children})}),mn=le({surrounder:t=>i(We,{children:t.children})}),gn=at({get_label:()=>"\u884C",get_numchildren:(t,e)=>e.widths.split(",").reduce((o,a)=>[...o,parseInt(a)],[]).length,get_widths:(t,e)=>e.widths.split(",").reduce((o,a)=>[...o,parseInt(a)],[])}),vn=ne({rightbar_extra(t){return[{component:ut,other_props:{idx:0,parameter_name:"suffix",label:"extra"},skip_mouseless:!0}]}}),_n=Te({get_label:()=>"\u56FE\u7247",is_empty:(t,e)=>!e.target,render_element:t=>{let[e,n]=b.useState(""),r=t.node,o=r.parameters.target.val,a=r.parameters.type.val,s=r.parameters.height.val,u=r.parameters.width.val;return b.useEffect(()=>{(async()=>{if(a=="internal"){let l=await R.get.resource_info(o,k.node_id);l.url?n(ce(l.url)):n("")}else n(o)})()}),i("img",{src:e||void 0,style:{width:u>0?`${u}rem`:"100%",height:s>0?`${s}rem`:"100%"}})}}),xn=Te({get_label:(t,e)=>"\u5C55\u793A\u5B50\u8282\u70B9"}),Cn=Te({get_label:(t,e)=>"\u63D2\u5165\u5B50\u8282\u70B9"}),En=st({get_label:t=>{var e;return(e=t.parameters.label)==null?void 0:e.val}});let bn={group:{\u662D\u8A00:tn,\u968F\u8A00:on,\u5C5E\u8A00:un,\u6570\u5B66:vn,\u88F1\u793A:an,\u5F70\u793A:sn,\u683C\u793A:rn,\u6B21\u8282:nn},inline:{\u5F3A:dn,\u520A:fn,\u7F00:hn,\u6570\u5B66:mn,\u65E0:pn},structure:{\u9F50\u8A00:gn},support:{\u56FE:_n,\u5C0F\u8282\u7EBF:ln,\u7AE0\u8282\u7EBF:cn,\u5C55\u793A\u5B50\u8282\u70B9:xn,\u63D2\u5165\u5B50\u8282\u70B9:Cn},abstract:{\u7A46\u8A00:En}},kn=it();var wn=J([i("circle",{cx:"17",cy:"4.54",r:"2"},"0"),i("path",{d:"M14 17h-2c0 1.65-1.35 3-3 3s-3-1.35-3-3 1.35-3 3-3v-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5zm3-3.5h-1.86l1.67-3.67C17.42 8.5 16.44 7 14.96 7h-5.2c-.81 0-1.54.47-1.87 1.2L7.22 10l1.92.53L9.79 9H12l-1.83 4.1c-.6 1.33.39 2.9 1.85 2.9H17v5h2v-5.5c0-1.1-.9-2-2-2z"},"1")],"AccessibleForward"),yn=J(i("path",{d:"m22.25 14.29-.69 1.89L9.2 11.71l2.08-5.66 8.56 3.09c2.1.76 3.18 3.06 2.41 5.15zM1.5 12.14 8 14.48V19h8v-1.63L20.52 19l.69-1.89-19.02-6.86-.69 1.89zm5.8-1.94c1.49-.72 2.12-2.51 1.41-4C7.99 4.71 6.2 4.08 4.7 4.8c-1.49.71-2.12 2.5-1.4 4 .71 1.49 2.5 2.12 4 1.4z"}),"AirlineSeatFlatAngled"),Sn=J(i("path",{d:"M6 6.5c.31 0 .7.15.9.56.24.5.02 1.1-.47 1.34-.14.06-.28.1-.43.1-.3 0-.7-.15-.89-.56-.17-.34-.1-.63-.05-.78.05-.14.18-.4.51-.56.14-.06.28-.1.43-.1m6.47 2.11 6.69 2.41c.52.19.93.56 1.15 1.05.22.48.25 1.03.06 1.53l-.01.02-8.59-3.11.7-1.9M10 15.19l4 1.44V17h-4v-1.81M6 4.5c-.44 0-.88.1-1.3.3-1.49.71-2.12 2.5-1.4 4 .51 1.07 1.58 1.7 2.7 1.7.44 0 .88-.1 1.3-.3 1.49-.72 2.12-2.51 1.41-4C8.19 5.13 7.12 4.5 6 4.5zm5.28 1.55L9.2 11.71l12.36 4.47.69-1.89c.77-2.09-.31-4.39-2.41-5.15l-8.56-3.09zm-9.09 4.2-.69 1.89L8 14.48V19h8v-1.63L20.52 19l.69-1.89-19.02-6.86z"}),"AirlineSeatFlatAngledOutlined"),An=J(i("path",{d:"M18.41 5.8 17.2 4.59c-.78-.78-2.05-.78-2.83 0l-2.68 2.68L3 15.96V20h4.04l8.74-8.74 2.63-2.63c.79-.78.79-2.05 0-2.83zM6.21 18H5v-1.21l8.66-8.66 1.21 1.21L6.21 18zM11 20l4-4h6v4H11z"}),"DriveFileRenameOutline"),Qe=J(i("path",{d:"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zM8 13.01l1.41 1.41L11 12.84V17h2v-4.16l1.59 1.59L16 13.01 12.01 9 8 13.01z"}),"DriveFolderUpload"),Dn=J(i("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4 6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"}),"FileCopy"),Fn=J(i("path",{d:"M9.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5.75 8.9 3 23h2.1l1.75-8L9 17v6h2v-7.55L8.95 13.4l.6-3C10.85 12 12.8 13 15 13v-2c-1.85 0-3.45-1-4.35-2.45l-.95-1.6C9.35 6.35 8.7 6 8 6c-.25 0-.5.05-.75.15L2 8.3V13h2V9.65l1.75-.75M13 2v7h3.75v14h1.5V9H22V2h-9zm5.01 6V6.25H14.5v-1.5h3.51V3l2.49 2.5L18.01 8z"}),"FollowTheSigns");function Ee(t){let e=t.Icon;return i(H,{sx:{marginLeft:"0.35rem",marginRight:"0.25rem",marginTop:"0.35rem"},children:i(Le,{title:t.title,children:i(Nt,{underline:"hover",href:t.href,children:i(e,{fontSize:"small",color:"primary"})})})})}function In(t){return i(Ee,{title:"\u540E\u53F0\u9875\u9762",href:ce(`/admin/articlezone/node/${k.node_id}/change/`),Icon:Fn})}function Tn(t){return i(Ee,{title:"\u7F16\u8F91\u5B50\u8282\u70B9\u7ED3\u6784",href:ce(`/edit/structure/${k.node_id}`),Icon:yn})}function Ln(t){return i(Ee,{title:"\uFF08\u6D45\uFF09\u7F16\u8F91\u5B50\u8282\u70B9\u7ED3\u6784",href:ce(`/edit/shallow_structure/${k.node_id}`),Icon:Sn})}function Mn(t){return i(Ee,{title:"\u9884\u89C8\u9875\u9762\uFF08\u6709\u4EC0\u4E48\u5FC5\u8981\u5417\uFF09",href:ce(`/view/content/${k.node_id}`),Icon:wn})}function Re(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function On(t,e,n){return e&&Re(t.prototype,e),n&&Re(t,n),t}function m(){return m=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},m.apply(this,arguments)}function zn(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function U(t,e){if(t==null)return{};var n={},r=Object.keys(t),o,a;for(a=0;a<r.length;a++)o=r[a],!(e.indexOf(o)>=0)&&(n[o]=t[o]);return n}function Be(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var et=b.createContext(),Rn={mui:{root:{},anchorOriginTopCenter:{},anchorOriginBottomCenter:{},anchorOriginTopRight:{},anchorOriginBottomRight:{},anchorOriginTopLeft:{},anchorOriginBottomLeft:{}},container:{containerRoot:{},containerAnchorOriginTopCenter:{},containerAnchorOriginBottomCenter:{},containerAnchorOriginTopRight:{},containerAnchorOriginBottomRight:{},containerAnchorOriginTopLeft:{},containerAnchorOriginBottomLeft:{}}},V={view:{default:20,dense:4},snackbar:{default:6,dense:2}},G={maxSnack:3,dense:!1,hideIconVariant:!1,variant:"default",autoHideDuration:5e3,anchorOrigin:{vertical:"bottom",horizontal:"left"},TransitionComponent:Et,transitionDuration:{enter:225,exit:195}},se=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},Bn=function(e){return""+se(e.vertical)+se(e.horizontal)},Nn=function(e){return Object.keys(e).filter(function(n){return!Rn.container[n]}).reduce(function(n,r){var o;return m({},n,(o={},o[r]=e[r],o))},{})},q={TIMEOUT:"timeout",CLICKAWAY:"clickaway",MAXSNACK:"maxsnack",INSTRUCTED:"instructed"},_e={toContainerAnchorOrigin:function(e){return"containerAnchorOrigin"+e},toAnchorOrigin:function(e){var n=e.vertical,r=e.horizontal;return"anchorOrigin"+se(n)+se(r)},toVariant:function(e){return"variant"+se(e)}},me=function(e){return!!e||e===0},Ne=function(e){return typeof e=="number"||e===null},Vn=function(e,n,r){return function(o){return o==="autoHideDuration"?Ne(e.autoHideDuration)?e.autoHideDuration:Ne(n.autoHideDuration)?n.autoHideDuration:G.autoHideDuration:e[o]||n[o]||r[o]}};function Ae(t,e,n){return t===void 0&&(t={}),e===void 0&&(e={}),n===void 0&&(n={}),m({},n,{},e,{},t)}var Pn="SnackbarContent",tt={root:Pn+"-root"},Hn=Z("div")(function(t){var e,n,r=t.theme;return n={},n["&."+tt.root]=(e={display:"flex",flexWrap:"wrap",flexGrow:1},e[r.breakpoints.up("sm")]={flexGrow:"initial",minWidth:288},e),n}),$n=g.exports.forwardRef(function(t,e){var n=t.className,r=U(t,["className"]);return i(Hn,{...Object.assign({ref:e,className:Y(tt.root,n)},r)})}),Ve={right:"left",left:"right",bottom:"up",top:"down"},Wn=function(e){return e.horizontal!=="center"?Ve[e.horizontal]:Ve[e.vertical]},jn=function(e){return i(Ce,{...Object.assign({},e),children:i("path",{d:"M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"})})},qn=function(e){return i(Ce,{...Object.assign({},e),children:i("path",{d:"M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"})})},Un=function(e){return i(Ce,{...Object.assign({},e),children:i("path",{d:"M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2, 6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12, 13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"})})},Kn=function(e){return i(Ce,{...Object.assign({},e),children:i("path",{d:"M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12A10,10 0 0,0 12,2Z"})})},ge={fontSize:20,marginInlineEnd:8},Xn={default:void 0,success:i(jn,{style:ge}),warning:i(qn,{style:ge}),error:i(Un,{style:ge}),info:i(Kn,{style:ge})};function ue(t,e){return t.reduce(function(n,r){return r==null?n:function(){for(var a=arguments.length,s=new Array(a),u=0;u<a;u++)s[u]=arguments[u];var l=[].concat(s);e&&l.indexOf(e)===-1&&l.push(e),n.apply(this,l),r.apply(this,l)}},function(){})}var Gn=typeof window!="undefined"?g.exports.useLayoutEffect:g.exports.useEffect;function Pe(t){var e=g.exports.useRef(t);return Gn(function(){e.current=t}),g.exports.useCallback(function(){return e.current.apply(void 0,arguments)},[])}var Yn=g.exports.forwardRef(function(t,e){var n=t.children,r=t.autoHideDuration,o=t.ClickAwayListenerProps,a=t.disableWindowBlurListener,s=a===void 0?!1:a,u=t.onClose,l=t.onMouseEnter,p=t.onMouseLeave,c=t.open,h=t.resumeHideDuration,v=U(t,["children","autoHideDuration","ClickAwayListenerProps","disableWindowBlurListener","onClose","onMouseEnter","onMouseLeave","open","resumeHideDuration"]),w=g.exports.useRef(),I=Pe(function(){u&&u.apply(void 0,arguments)}),C=Pe(function(E){!u||E==null||(clearTimeout(w.current),w.current=setTimeout(function(){I(null,q.TIMEOUT)},E))});g.exports.useEffect(function(){return c&&C(r),function(){clearTimeout(w.current)}},[c,r,C]);var f=function(){clearTimeout(w.current)},A=g.exports.useCallback(function(){r!=null&&C(h!=null?h:r*.5)},[r,h,C]),M=function(y){l&&l(y),f()},_=function(y){p&&p(y),A()},D=function(y){u&&u(y,q.CLICKAWAY)};return g.exports.useEffect(function(){if(!s&&c)return window.addEventListener("focus",A),window.addEventListener("blur",f),function(){window.removeEventListener("focus",A),window.removeEventListener("blur",f)}},[s,A,c]),g.exports.createElement(bt,m({onClickAway:D},o),g.exports.createElement("div",m({onMouseEnter:M,onMouseLeave:_,ref:e},v),n))}),P="SnackbarItem",S={contentRoot:P+"-contentRoot",lessPadding:P+"-lessPadding",variantSuccess:P+"-variantSuccess",variantError:P+"-variantError",variantInfo:P+"-variantInfo",variantWarning:P+"-variantWarning",message:P+"-message",action:P+"-action",wrappedRoot:P+"-wrappedRoot"},Zn=Z(Yn)(function(t){var e,n=t.theme,r=n.palette.mode||n.palette.type,o=Vt(n.palette.background.default,r==="light"?.8:.98);return e={},e["&."+S.wrappedRoot]={position:"relative",transform:"translateX(0)",top:0,right:0,bottom:0,left:0},e["."+S.contentRoot]=m({},n.typography.body2,{backgroundColor:o,color:n.palette.getContrastText(o),alignItems:"center",padding:"6px 16px",borderRadius:"4px",boxShadow:"0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)"}),e["."+S.lessPadding]={paddingLeft:8*2.5},e["."+S.variantSuccess]={backgroundColor:"#43a047",color:"#fff"},e["."+S.variantError]={backgroundColor:"#d32f2f",color:"#fff"},e["."+S.variantInfo]={backgroundColor:"#2196f3",color:"#fff"},e["."+S.variantWarning]={backgroundColor:"#ff9800",color:"#fff"},e["."+S.message]={display:"flex",alignItems:"center",padding:"8px 0"},e["."+S.action]={display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8},e}),Jn=function(e){var n=e.classes,r=U(e,["classes"]),o=g.exports.useRef(),a=g.exports.useState(!0),s=a[0],u=a[1];g.exports.useEffect(function(){return function(){o.current&&clearTimeout(o.current)}},[]);var l=ue([r.snack.onClose,r.onClose],r.snack.key),p=function(){r.snack.requestClose&&l(null,q.INSTRCUTED)},c=function(){o.current=setTimeout(function(){u(!s)},125)},h=r.style,v=r.ariaAttributes,w=r.className,I=r.hideIconVariant,C=r.iconVariant,f=r.snack,A=r.action,M=r.content,_=r.TransitionComponent,D=r.TransitionProps,E=r.transitionDuration,y=U(r,["style","dense","ariaAttributes","className","hideIconVariant","iconVariant","snack","action","content","TransitionComponent","TransitionProps","transitionDuration","onEnter","onEntered","onEntering","onExit","onExited","onExiting"]),B=f.key,re=f.open,de=f.className,O=f.variant,oe=f.content,Q=f.action,K=f.ariaAttributes,$=f.anchorOrigin,ee=f.message,be=f.TransitionComponent,W=f.TransitionProps,ie=f.transitionDuration,ke=U(f,["persist","key","open","entered","requestClose","className","variant","content","action","ariaAttributes","anchorOrigin","message","TransitionComponent","TransitionProps","transitionDuration","onEnter","onEntered","onEntering","onExit","onExited","onExiting"]),pe=m({},Xn,{},C)[O],fe=m({"aria-describedby":"notistack-snackbar"},Ae(K,v)),we=be||_||G.TransitionComponent,ye=Ae(ie,E,G.transitionDuration),Se=m({direction:Wn($)},Ae(W,D)),te=Q||A;typeof te=="function"&&(te=te(B));var d=oe||M;typeof d=="function"&&(d=d(B,f.message));var x=["onEnter","onEntering","onEntered","onExit","onExiting","onExited"].reduce(function(T,N){var j;return m({},T,(j={},j[N]=ue([r.snack[N],r[N]],r.snack.key),j))},{});return i(Xt,{unmountOnExit:!0,timeout:175,in:s,onExited:x.onExited,children:i(Zn,{...Object.assign({},y,ke,{open:re,className:Y(n.root,S.wrappedRoot,n[_e.toAnchorOrigin($)]),onClose:l}),children:i(we,{...Object.assign({appear:!0,in:re,timeout:ye},Se,{onExit:x.onExit,onExiting:x.onExiting,onExited:c,onEnter:x.onEnter,onEntering:x.onEntering,onEntered:ue([x.onEntered,p])}),children:d||F($n,{...Object.assign({},fe,{role:"alert",style:h,className:Y(S.contentRoot,S[_e.toVariant(O)],n[_e.toVariant(O)],w,de,!I&&pe&&S.lessPadding)}),children:[F("div",{id:fe["aria-describedby"],className:S.message,children:[I?null:pe,ee]}),te&&i("div",{className:S.action,children:te})]})})})})},De={container:"& > .MuiCollapse-container, & > .MuiCollapse-root",wrapper:"& > .MuiCollapse-container > .MuiCollapse-wrapper, & > .MuiCollapse-root > .MuiCollapse-wrapper"},Fe=16,X="SnackbarContainer",z={root:X+"-root",rootDense:X+"-rootDense",top:X+"-top",bottom:X+"-bottom",left:X+"-left",right:X+"-right",center:X+"-center"},Qn=Z("div")(function(t){var e,n,r,o,a,s,u=t.theme;return s={},s["&."+z.root]=(e={boxSizing:"border-box",display:"flex",maxHeight:"100%",position:"fixed",zIndex:u.zIndex.snackbar,height:"auto",width:"auto",transition:"top 300ms ease 0ms, right 300ms ease 0ms, bottom 300ms ease 0ms, left 300ms ease 0ms, margin 300ms ease 0ms, max-width 300ms ease 0ms",pointerEvents:"none"},e[De.container]={pointerEvents:"all"},e[De.wrapper]={padding:V.snackbar.default+"px 0px",transition:"padding 300ms ease 0ms"},e.maxWidth="calc(100% - "+V.view.default*2+"px)",e[u.breakpoints.down("sm")]={width:"100%",maxWidth:"calc(100% - "+Fe*2+"px)"},e),s["&."+z.rootDense]=(n={},n[De.wrapper]={padding:V.snackbar.dense+"px 0px"},n),s["&."+z.top]={top:V.view.default-V.snackbar.default,flexDirection:"column"},s["&."+z.bottom]={bottom:V.view.default-V.snackbar.default,flexDirection:"column-reverse"},s["&."+z.left]=(r={left:V.view.default},r[u.breakpoints.up("sm")]={alignItems:"flex-start"},r[u.breakpoints.down("sm")]={left:Fe+"px"},r),s["&."+z.right]=(o={right:V.view.default},o[u.breakpoints.up("sm")]={alignItems:"flex-end"},o[u.breakpoints.down("sm")]={right:Fe+"px"},o),s["&."+z.center]=(a={left:"50%",transform:"translateX(-50%)"},a[u.breakpoints.up("sm")]={alignItems:"center"},a),s}),er=function(e){var n=e.className,r=e.anchorOrigin,o=e.dense,a=U(e,["className","anchorOrigin","dense"]),s=Y(z[r.vertical],z[r.horizontal],z.root,n,o&&z.rootDense);return i(Qn,{...Object.assign({className:s},a)})},tr=b.memo(er),nr=function(t){zn(e,t);function e(r){var o;return o=t.call(this,r)||this,o.enqueueSnackbar=function(a,s){s===void 0&&(s={});var u=s,l=u.key,p=u.preventDuplicate,c=U(u,["key","preventDuplicate"]),h=me(l),v=h?l:new Date().getTime()+Math.random(),w=Vn(c,o.props,G),I=m({key:v},c,{message:a,open:!0,entered:!1,requestClose:!1,variant:w("variant"),anchorOrigin:w("anchorOrigin"),autoHideDuration:w("autoHideDuration")});return c.persist&&(I.autoHideDuration=void 0),o.setState(function(C){if(p===void 0&&o.props.preventDuplicate||p){var f=function(D){return h?D.key===l:D.message===a},A=C.queue.findIndex(f)>-1,M=C.snacks.findIndex(f)>-1;if(A||M)return C}return o.handleDisplaySnack(m({},C,{queue:[].concat(C.queue,[I])}))}),v},o.handleDisplaySnack=function(a){var s=a.snacks;return s.length>=o.maxSnack?o.handleDismissOldest(a):o.processQueue(a)},o.processQueue=function(a){var s=a.queue,u=a.snacks;return s.length>0?m({},a,{snacks:[].concat(u,[s[0]]),queue:s.slice(1,s.length)}):a},o.handleDismissOldest=function(a){if(a.snacks.some(function(c){return!c.open||c.requestClose}))return a;var s=!1,u=!1,l=a.snacks.reduce(function(c,h){return c+(h.open&&h.persist?1:0)},0);l===o.maxSnack&&(u=!0);var p=a.snacks.map(function(c){return!s&&(!c.persist||u)?(s=!0,c.entered?(c.onClose&&c.onClose(null,q.MAXSNACK,c.key),o.props.onClose&&o.props.onClose(null,q.MAXSNACK,c.key),m({},c,{open:!1})):m({},c,{requestClose:!0})):m({},c)});return m({},a,{snacks:p})},o.handleEnteredSnack=function(a,s,u){if(!me(u))throw new Error("handleEnteredSnack Cannot be called with undefined key");o.setState(function(l){var p=l.snacks;return{snacks:p.map(function(c){return c.key===u?m({},c,{entered:!0}):m({},c)})}})},o.handleCloseSnack=function(a,s,u){if(o.props.onClose&&o.props.onClose(a,s,u),s!==q.CLICKAWAY){var l=u===void 0;o.setState(function(p){var c=p.snacks,h=p.queue;return{snacks:c.map(function(v){return!l&&v.key!==u?m({},v):v.entered?m({},v,{open:!1}):m({},v,{requestClose:!0})}),queue:h.filter(function(v){return v.key!==u})}})}},o.closeSnackbar=function(a){var s=o.state.snacks.find(function(u){return u.key===a});me(a)&&s&&s.onClose&&s.onClose(null,q.INSTRUCTED,a),o.handleCloseSnack(null,q.INSTRUCTED,a)},o.handleExitedSnack=function(a,s,u){var l=s||u;if(!me(l))throw new Error("handleExitedSnack Cannot be called with undefined key");o.setState(function(p){var c=o.processQueue(m({},p,{snacks:p.snacks.filter(function(h){return h.key!==l})}));return c.queue.length===0?c:o.handleDismissOldest(c)})},o.state={snacks:[],queue:[],contextValue:{enqueueSnackbar:o.enqueueSnackbar.bind(Be(o)),closeSnackbar:o.closeSnackbar.bind(Be(o))}},o}var n=e.prototype;return n.render=function(){var o=this,a=this.state.contextValue,s=this.props,u=s.iconVariant,l=s.dense,p=l===void 0?G.dense:l,c=s.hideIconVariant,h=c===void 0?G.hideIconVariant:c,v=s.domRoot,w=s.children,I=s.classes,C=I===void 0?{}:I,f=U(s,["maxSnack","preventDuplicate","variant","anchorOrigin","iconVariant","dense","hideIconVariant","domRoot","children","classes"]),A=this.state.snacks.reduce(function(_,D){var E,y=Bn(D.anchorOrigin),B=_[y]||[];return m({},_,(E={},E[y]=[].concat(B,[D]),E))},{}),M=Object.keys(A).map(function(_){var D=A[_];return i(tr,{dense:p,anchorOrigin:D[0].anchorOrigin,className:Y(C.containerRoot,C[_e.toContainerAnchorOrigin(_)]),children:D.map(function(E){return i(Jn,{...Object.assign({},f,{key:E.key,snack:E,dense:p,iconVariant:u,hideIconVariant:h,classes:Nn(C),onClose:o.handleCloseSnack,onExited:ue([o.handleExitedSnack,o.props.onExited]),onEntered:ue([o.handleEnteredSnack,o.props.onEntered])})})})},_)});return F(et.Provider,{value:a,children:[w,v?lt.exports.createPortal(M,v):M]})},On(e,[{key:"maxSnack",get:function(){return this.props.maxSnack||G.maxSnack}}]),e}(g.exports.Component),nt=function(){return g.exports.useContext(et)};function rr(){return i(H,{sx:{marginX:"auto"},children:F("label",{children:[i("input",{type:"file",style:{display:"none"},onChange:t=>{if(t.target.files.length>0){var e=new FormData;e.append("file",t.target.files[0]),R.post.file(e,k.node_id)}}}),i(xe,{title:"\u4E0A\u4F20",icon:Qe,component:"span",size:"small",icon_props:{sx:{marginLeft:"-0.1rem",color:"primary"}}})]})})}function or(t){let[e,n]=b.useState(void 0);const{enqueueSnackbar:r,closeSnackbar:o}=nt();return F(b.Fragment,{children:[i(xe,{title:"\u5220\u9664\u8D44\u6E90",icon:wt,onClick:async a=>{n(a.currentTarget)}}),i(yt,{anchorEl:e,open:!!e,onClose:a=>n(void 0),anchorOrigin:{vertical:"center",horizontal:"right"},children:i(St,{onClick:async a=>{let s=await R.post.delete_resource(t.resource_id);r(s?"\u5220\u9664\u6210\u529F":"\u5220\u9664\u5931\u8D25"),n(void 0),s&&t.onSuccess&&t.onSuccess()},children:"\u786E\u5B9A\uFF1F"})})]})}function ir(t){let[e,n,r]=[t.id,t.name,t.url],[o,a]=b.useState(n);const{enqueueSnackbar:s,closeSnackbar:u}=nt();g.exports.useEffect(()=>{a(n)},[n]);let l=t.onSuccess||(()=>{});return i(je,{variant:"outlined",sx:{position:"relative",marginTop:"1rem",marginX:"1rem",marginBottom:"1rem",paddingY:"0.7rem"},children:F(ve,{force_direction:"row",children:[i(H,{sx:{flex:1},children:F(ve,{children:[i(ze,{variant:"standard",label:"name",value:o,fullWidth:!0,onChange:p=>{a(p.target.value)}}),i(ze,{variant:"standard",label:"url",value:r,fullWidth:!0,sx:{marginTop:"1rem"},InputProps:{readOnly:!0}})]})}),i(H,{children:F(ve,{children:[i(xe,{title:"\u66F4\u6539\u8D44\u6E90\u540D",icon:An,onClick:async p=>{let c={name:o},h=await R.post.manage_recourse(!1,c,e);s(h?"\u4FEE\u6539\u6587\u4EF6\u540D\u6210\u529F":"\u4FEE\u6539\u6587\u4EF6\u540D\u5931\u8D25")}}),F("label",{children:[i("input",{type:"file",style:{display:"none"},onChange:async p=>{let c=!1;if(p.target.files.length<=0)c=!1;else{var h=new FormData;h.append("file",p.target.files[0]);let v=await R.post.manage_recourse(!0,h,e);c=v,v&&l()}s(c?"\u4E0A\u4F20\u6587\u4EF6\u6210\u529F":"\u4E0A\u4F20\u6587\u4EF6\u5931\u8D25")}}),i(xe,{title:"\u66FF\u6362\u6587\u4EF6",icon:Qe,component:"span"})]}),i(or,{resource_id:e,onSuccess:l})]})})]})})}class ar extends b.Component{constructor(n){super(n);ae(this,"contextType",ct);this.state={resources:[]}}async effect(){let n=await R.get.resources(k.node_id);this.setState({resources:n}),this.forceUpdate()}async componentDidMount(){this.effect()}render(){let n=this;return i(H,{sx:n.context.printer.fonts.body,children:i(ve,{force_direction:"column",children:n.state.resources.map((r,o)=>{let[a,s,u]=r;return i(b.Fragment,{children:i(ir,{id:a,name:s,url:u,onSuccess:()=>{n.effect()}})},o)})})})}}function sr(t){let[e,n]=b.useState(!1);return F(b.Fragment,{children:[i(Le,{title:"\u67E5\u770B/\u7BA1\u7406\u6587\u4EF6",children:i(Ze,{size:"small",onClick:()=>{n(!0)},children:i(Dn,{fontSize:"small",color:"primary"})})}),i(kt,{anchor:"left",open:e,onClose:()=>n(!1),ModalProps:{keepMounted:!1},SlideProps:{onExited:()=>{}},PaperProps:{sx:{width:"40%"}},children:i(ar,{})})]})}class ur extends b.Component{constructor(e){super(e),this.state={snackbar_open:!1,status:!1}}render(){return i(b.Fragment,{children:i(Le,{title:"\u4FDD\u5B58",children:i(Ze,{size:"small",onClick:()=>this.props.save_func(),children:i(Ht,{fontSize:"small",color:"primary"})})})})}}function Ie(t,e,n){return qe(t,e)&&t.concept==n}function lr(t,e){const n=e.normalizeNode;return e.normalizeNode=r=>{let[o,a]=r;if(At("initializing")){n(r);return}if(a.length==0){let s=o,u=s.children.length;if(u==0||!Ie(s.children[0],"support","\u5C0F\u8282\u7EBF")){t.add_nodes(t.get_core().create_support("\u5C0F\u8282\u7EBF"),[0]);return}if(!Ie(s.children[u-1],"support","\u7AE0\u8282\u7EBF")){t.add_nodes(t.get_core().create_support("\u7AE0\u8282\u7EBF"),[u]);return}}if(Ie(o,"support","\u7AE0\u8282\u7EBF")&&(a.length!=1||a[0]!=e.children.length-1)){t.delete_node_by_path(a);return}n(r)},e}function cr(t,e){const n=e.normalizeNode;return e.normalizeNode=r=>{let[o,a]=r;qe(o),n(r)},e}let dr=[lr,cr];function pr(t,e){for(let n of dr)e=n(t,e);return e}class fr extends b.Component{constructor(n){super(n);ae(this,"editor_ref");ae(this,"printer_ref");ae(this,"snackerbar_ref");this.state={printer:void 0,editorcore:void 0,tree:void 0,cache:void 0},this.editor_ref=b.createRef(),this.printer_ref=b.createRef(),this.snackerbar_ref=b.createRef()}open_snackerbar(n){this.snackerbar_ref&&this.snackerbar_ref.current&&this.snackerbar_ref.current.enqueueSnackbar(n)}async componentDidMount(){let n=await R.get.concept(k.node_id),r=Dt(n),o=new dt(Ft,r,It,Tt),a=new pt({renderers:bn,default_renderers:kn,printer:o}),s=await R.get.content(k.node_id);s||(s=a.create_abstract("root"),s.parameters={title:{val:`Article: ${k.node_id}`,type:"string"}});let u=await R.get.cache(k.node_id);this.setState({printer:o,editorcore:a,tree:s,cache:u})}get_editor(){if(this.editor_ref&&this.editor_ref.current)return this.editor_ref.current.get_editor()}get_printer_comp(){if(this.printer_ref&&this.printer_ref.current)return this.printer_ref.current.get_component()}async save_content(n=void 0,r=void 0){n==null&&(n=this.state.tree),r==null&&(r=this.state.cache);let o=await R.post.content({content:n},k.node_id),a=await R.post.cache({cache:r},k.node_id);this.open_snackerbar(o&&a?"\u4FDD\u5B58\u6210\u529F":"\u4FDD\u5B58\u5931\u8D25")}scroll_to_selection(){let n=this.get_editor(),r=this.get_printer_comp();if(!(n&&r))return;let o=n.get_slate().selection;if(!(o&&o.focus&&o.focus.path))return;let a=o.focus.path;r.scroll_to(a)}update_tree(){let n=this.get_editor();if(!n)return;let r=n.get_root();return this.setState({tree:r}),r}render(){let n=this,{editorcore:r,printer:o,tree:a}=this.state;if(!(r&&o&&a))return i(We,{});let[s,u]=(()=>{let{children:l,...p}=a;return[p,l]})();return i(Lt,{theme:Pt(he.mui),children:i(ft,{value:he,mui:!0,children:F(H,{sx:l=>({position:"fixed",width:"100%",height:"100%",left:"0",right:"0",backgroundColor:l.palette.background.default,color:l.palette.text.primary}),children:[i(Mt,{}),i(nr,{maxSnack:3,ref:n.snackerbar_ref,anchorOrigin:{horizontal:"right",vertical:"top"},variant:"info",children:F(H,{sx:{position:"absolute",top:"2%",left:"1%",height:"96%",width:"98%"},children:[F(en,{sx:{position:"absolute",left:"0",width:"2%"},children:[i(ur,{save_func:n.save_content.bind(n)}),i(sr,{}),i(rr,{}),i(In,{}),i(Tn,{}),i(Ln,{}),i(Mn,{})]}),F(H,{sx:{position:"absolute",left:"3%",width:"96%",height:"100%"},children:[i(H,{sx:{position:"absolute",width:"49%",left:"0%",top:"0",height:"100%"},children:i(ht,{ref:n.editor_ref,editorcore:r,init_rootproperty:s,init_rootchildren:u,onSave:()=>{let l=n.update_tree();setTimeout(()=>{Ot.go(),n.save_content(l),n.scroll_to_selection()},50)},theme:he,plugin:pr})}),i(mt,{sx:{position:"absolute",width:"49%",left:"51%",top:"0",height:"100%",overflow:"auto",paddingRight:"1%"},className:"mathjax_process",children:i(zt,{children:i(gt,{value:{BackendData:k,cache:n.state.cache},children:i(vt,{printer:o,theme:he,onUpdateCache:l=>{l&&JSON.stringify(l)!=JSON.stringify(n.state.cache)&&setTimeout(()=>n.setState({cache:l}),200)},ref:n.printer_ref,root:a,onDidMount:l=>{k.linkto&&setTimeout(()=>{let p=parseInt(k.linkto);l.scroll_to_idx(p);let c=l.get_ref_from_idx(p);c&&(c.style.border="2px solid")},300)}})})})})]})]})})]})})})}}_t.render(i(fr,{}),document.getElementById("root"));
