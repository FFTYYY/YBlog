var bt=Object.defineProperty;var Ct=(t,e,r)=>e in t?bt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Fe=(t,e,r)=>(Ct(t,typeof e!="symbol"?e+"":e,r),r);import{g as Et,c as wt,s as ie,_ as M,r as E,u as kt,d as yt,T as St,e as Dt,f as At,h as Ft,j as n,i as oe,k as It,l as tt,m as X,a as x,G as ae,b as g,A as T,E as Q,B as O,S as ct,n as J,o as Xe,p as se,q as le,t as ce,v as Ge,N as xe,w as be,x as ue,y as Oe,C as Ye,z as ut,F as Ce,H as de,I as Ze,J as Lt,K as Ee,L as ee,M as he,O as Tt,P as zt,Q as nt,U as Ot,V as dt,W as Bt,X as Mt,Y as N,Z as A,a0 as we,a1 as Je,a2 as Rt,a3 as Nt,a4 as Pt,a5 as Be,a6 as Vt,a7 as ze,a8 as rt,a9 as Ht,aa as $t,ab as Wt,ac as jt,ad as Ut,ae as qt,af as Kt,ag as Xt,ah as Gt,ai as Yt,aj as Zt,ak as Jt,al as Qt,R as en}from"./titleword.3b2c0924.js";import{p as tn,f as nn,r as rn,d as on,C as an,m as $e}from"./index.83930381.js";import{f as sn,M as ln}from"./math.d1f1e8d7.js";import{L as cn}from"./Link.085a21ce.js";import{S as un}from"./Save.f5c070cc.js";function dn(t){return Et("MuiCollapse",t)}wt("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);const hn=["addEndListener","children","className","collapsedSize","component","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","orientation","style","timeout","TransitionComponent"],pn=t=>{const{orientation:e,classes:r}=t,o={root:["root",`${e}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${e}`],wrapperInner:["wrapperInner",`${e}`]};return It(o,dn,r)},fn=ie("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,e[r.orientation],r.state==="entered"&&e.entered,r.state==="exited"&&!r.in&&r.collapsedSize==="0px"&&e.hidden]}})(({theme:t,ownerState:e})=>M({height:0,overflow:"hidden",transition:t.transitions.create("height")},e.orientation==="horizontal"&&{height:"auto",width:0,transition:t.transitions.create("width")},e.state==="entered"&&M({height:"auto",overflow:"visible"},e.orientation==="horizontal"&&{width:"auto"}),e.state==="exited"&&!e.in&&e.collapsedSize==="0px"&&{visibility:"hidden"})),mn=ie("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(t,e)=>e.wrapper})(({ownerState:t})=>M({display:"flex",width:"100%"},t.orientation==="horizontal"&&{width:"auto",height:"100%"})),gn=ie("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(t,e)=>e.wrapperInner})(({ownerState:t})=>M({width:"100%"},t.orientation==="horizontal"&&{width:"auto",height:"100%"})),ht=E.exports.forwardRef(function(e,r){const o=kt({props:e,name:"MuiCollapse"}),{addEndListener:i,children:a,className:s,collapsedSize:l="0px",component:c,easing:d,in:u,onEnter:f,onEntered:p,onEntering:S,onExit:w,onExited:v,onExiting:m,orientation:b="vertical",style:C,timeout:k=yt.standard,TransitionComponent:L=St}=o,D=Dt(o,hn),F=M({},o,{orientation:b,collapsedSize:l}),P=pn(F),fe=At(),Se=E.exports.useRef(),B=E.exports.useRef(null),me=E.exports.useRef(),te=typeof l=="number"?`${l}px`:l,G=b==="horizontal",W=G?"width":"height";E.exports.useEffect(()=>()=>{clearTimeout(Se.current)},[]);const ne=E.exports.useRef(null),Re=Ft(r,ne),j=h=>y=>{if(h){const z=ne.current;y===void 0?h(z):h(z,y)}},ge=()=>B.current?B.current[G?"clientWidth":"clientHeight"]:0,Ne=j((h,y)=>{B.current&&G&&(B.current.style.position="absolute"),h.style[W]=te,f&&f(h,y)}),De=j((h,y)=>{const z=ge();B.current&&G&&(B.current.style.position="");const{duration:V,easing:U}=tt({style:C,timeout:k,easing:d},{mode:"enter"});if(k==="auto"){const et=fe.transitions.getAutoHeightDuration(z);h.style.transitionDuration=`${et}ms`,me.current=et}else h.style.transitionDuration=typeof V=="string"?V:`${V}ms`;h.style[W]=`${z}px`,h.style.transitionTimingFunction=U,S&&S(h,y)}),Ae=j((h,y)=>{h.style[W]="auto",p&&p(h,y)}),Pe=j(h=>{h.style[W]=`${ge()}px`,w&&w(h)}),Ve=j(v),He=j(h=>{const y=ge(),{duration:z,easing:V}=tt({style:C,timeout:k,easing:d},{mode:"exit"});if(k==="auto"){const U=fe.transitions.getAutoHeightDuration(y);h.style.transitionDuration=`${U}ms`,me.current=U}else h.style.transitionDuration=typeof z=="string"?z:`${z}ms`;h.style[W]=te,h.style.transitionTimingFunction=V,m&&m(h)});return n(L,M({in:u,onEnter:Ne,onEntered:Ae,onEntering:De,onExit:Pe,onExited:Ve,onExiting:He,addEndListener:h=>{k==="auto"&&(Se.current=setTimeout(h,me.current||0)),i&&i(ne.current,h)},nodeRef:ne,timeout:k==="auto"?null:k},D,{children:(h,y)=>n(fn,M({as:c,className:oe(P.root,s,{entered:P.entered,exited:!u&&te==="0px"&&P.hidden}[h]),style:M({[G?"minWidth":"minHeight"]:te},C),ownerState:M({},F,{state:h}),ref:Re},y,{children:n(mn,{ownerState:M({},F,{state:h}),className:P.wrapper,ref:B,children:n(gn,{ownerState:M({},F,{state:h}),className:P.wrapperInner,children:a})})}))}))});ht.muiSupportAuto=!0;var vn=ht,_n=X([n("circle",{cx:"17",cy:"4.54",r:"2"},"0"),n("path",{d:"M14 17h-2c0 1.65-1.35 3-3 3s-3-1.35-3-3 1.35-3 3-3v-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5zm3-3.5h-1.86l1.67-3.67C17.42 8.5 16.44 7 14.96 7h-5.2c-.81 0-1.54.47-1.87 1.2L7.22 10l1.92.53L9.79 9H12l-1.83 4.1c-.6 1.33.39 2.9 1.85 2.9H17v5h2v-5.5c0-1.1-.9-2-2-2z"},"1")],"AccessibleForward"),xn=X(n("path",{d:"m22.25 14.29-.69 1.89L9.2 11.71l2.08-5.66 8.56 3.09c2.1.76 3.18 3.06 2.41 5.15zM1.5 12.14 8 14.48V19h8v-1.63L20.52 19l.69-1.89-19.02-6.86-.69 1.89zm5.8-1.94c1.49-.72 2.12-2.51 1.41-4C7.99 4.71 6.2 4.08 4.7 4.8c-1.49.71-2.12 2.5-1.4 4 .71 1.49 2.5 2.12 4 1.4z"}),"AirlineSeatFlatAngled"),bn=X(n("path",{d:"M6 6.5c.31 0 .7.15.9.56.24.5.02 1.1-.47 1.34-.14.06-.28.1-.43.1-.3 0-.7-.15-.89-.56-.17-.34-.1-.63-.05-.78.05-.14.18-.4.51-.56.14-.06.28-.1.43-.1m6.47 2.11 6.69 2.41c.52.19.93.56 1.15 1.05.22.48.25 1.03.06 1.53l-.01.02-8.59-3.11.7-1.9M10 15.19l4 1.44V17h-4v-1.81M6 4.5c-.44 0-.88.1-1.3.3-1.49.71-2.12 2.5-1.4 4 .51 1.07 1.58 1.7 2.7 1.7.44 0 .88-.1 1.3-.3 1.49-.72 2.12-2.51 1.41-4C8.19 5.13 7.12 4.5 6 4.5zm5.28 1.55L9.2 11.71l12.36 4.47.69-1.89c.77-2.09-.31-4.39-2.41-5.15l-8.56-3.09zm-9.09 4.2-.69 1.89L8 14.48V19h8v-1.63L20.52 19l.69-1.89-19.02-6.86z"}),"AirlineSeatFlatAngledOutlined"),Cn=X(n("path",{d:"M18.41 5.8 17.2 4.59c-.78-.78-2.05-.78-2.83 0l-2.68 2.68L3 15.96V20h4.04l8.74-8.74 2.63-2.63c.79-.78.79-2.05 0-2.83zM6.21 18H5v-1.21l8.66-8.66 1.21 1.21L6.21 18zM11 20l4-4h6v4H11z"}),"DriveFileRenameOutline"),pt=X(n("path",{d:"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zM8 13.01l1.41 1.41L11 12.84V17h2v-4.16l1.59 1.59L16 13.01 12.01 9 8 13.01z"}),"DriveFolderUpload"),En=X(n("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4 6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"}),"FileCopy"),wn=X(n("path",{d:"M9.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5.75 8.9 3 23h2.1l1.75-8L9 17v6h2v-7.55L8.95 13.4l.6-3C10.85 12 12.8 13 15 13v-2c-1.85 0-3.45-1-4.35-2.45l-.95-1.6C9.35 6.35 8.7 6 8 6c-.25 0-.5.05-.75.15L2 8.3V13h2V9.65l1.75-.75M13 2v7h3.75v14h1.5V9H22V2h-9zm5.01 6V6.25H14.5v-1.5h3.51V3l2.49 2.5L18.01 8z"}),"FollowTheSigns"),ke=X(n("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}),"KeyboardArrowDown");let ft=t=>{let{node:e,...r}=t;return n(he,{...r,sx:e.relation=="chaining"?{marginTop:"0"}:{}})};function mt({get_label:t=(o,i)=>i.label,appbar_extra:e=(o,i)=>[],surrounder:r=o=>n(de,{children:o.children})}){return o=>{let i=x.useContext(ae).editor,a=o.node,s=i.get_core().get_printer().process_parameters(a),l=t(a,s),c=r;return n(ft,{node:a,children:g(T,{force_direction:"column",children:[n(Q,{children:n(O,{sx:{overflow:"auto",marginX:"1rem"},children:n(ct,{children:g(T,{children:[n(J,{children:l}),n(Xe,{node:a,idxs:[0],buttons:[se,le,ce,Ge,xe,be,ue,Oe,Ye,...e(a,s)]})]})})})},"uns"),n(ut,{}),n(Ce,{autogrow:!0,children:n(c,{node:a,children:o.children})},"edi")]})})}}function pe({get_label:t=(o,i)=>i.label,rightbar_extra:e=(o,i)=>[],surrounder:r=o=>n(de,{children:o.children})}){return o=>{let i=x.useContext(ae).editor,a=o.node,s=i.get_core().get_printer().process_parameters(a),l=t(a,s),c=r,d=e(a,s),u=a.children.reduce((f,p)=>f+=Ze(p,"group")?2:1,0)>=3;return n(ft,{node:a,children:g(Lt,{force_direction:"row",children:[n(Ce,{autogrow:!0,children:n(c,{node:a,children:o.children})},"edit"),n(Q,{children:g(T,{force_direction:u?"column":"row",children:[n(Xe,{autostack:!0,node:a,buttons:d}),n(J,{variant:"overline",children:l}),n(Ee,{poper_props:{sx:{opacity:"80%"}},node:a,close_on_otherclick:!0,outer_button:ee,outer_props:{size:"small",children:n(ke,{fontSize:"small"})},label:"\u5C55\u5F00",buttons:[se,le,ce,Ge,ue,Oe,xe,be,Ye],idxs:[d.length]})]})},"uns")]})})}}function ye({get_label:t=(o,i)=>i.label,surrounder:e=o=>n(x.Fragment,{children:o.children}),rightbar_extra:r=o=>n(de,{})}){return o=>{let i=x.useContext(ae).editor,a=o.node,s=i.get_core().get_printer().process_parameters(a),l=t(a,s),c=r;return n(he,{is_inline:!0,children:g(T,{force_direction:"row",children:[n(Ce,{children:n(e,{node:a,children:o.children})},"edi"),n(Q,{children:g(T,{force_direction:"row",children:[n(c,{node:a}),n(Ee,{poper_props:{sx:{opacity:"80%"}},node:a,idxs:[0],close_on_otherclick:!0,outer_button:ee,outer_props:{sx:{height:"1rem",width:"1rem",margin:"0"},children:n(ke,{sx:{height:"1rem"}})},label:"\u5C55\u5F00"+(l?` / ${l}`:""),buttons:[se,ue,Oe,le,ce],children:n(J,{sx:{marginY:"0.2rem",marginX:"auto",paddingX:"0.25rem"},children:l})})]})},"uns")]})})}}function We(){return t=>n(he,{sx:{border:"2px block"},children:n(Ce,{children:t.children})})}function kn(){return t=>n(he,{sx:{border:"2px block"},children:n(Q,{children:t.children})})}function yn(){return{group:We(),inline:We(),structure:We(),support:kn(),abstract:t=>n(O,{children:t.children}),paragraph:t=>n(Tt,{children:t.children}),text:t=>n("span",{children:t.children})}}let Sn=t=>n(he,{...t,sx:t.node.relation=="chaining"?{marginTop:"0"}:{}});function Dn({get_label:t=(a,s)=>s.label,get_numchildren:e=()=>1,get_widths:r=()=>[],rightbar_extra:o=()=>[],surrounder:i=a=>n(de,{children:a.children})}){return a=>{let l=x.useContext(ae).editor,c=a.node,d=l.get_core().get_printer().process_parameters(c),u=t(c,d),f=i,p=c.children,S=zt(l.get_slate(),c),w=e(c,d);w<0&&(w=p.length);let v=r(c,d);for(v=v.splice(0,w);v.length<w;)v.push(1);let m=v.reduce((b,C)=>b+C,0);return x.useEffect(()=>{if(w<p.length){let b=[];for(let C=w;C<p.length;C++)b.push([...S,C]);l.delete_nodes_by_paths(b)}else if(w>p.length){let b=[];for(let C=p.length;C<w;C++)b.push(l.get_core().create_group("structure-child","chaining"));l.add_nodes(b,[...S,p.length])}}),n(Sn,{node:c,children:g(T,{force_direction:"row",children:[n(nt,{container:!0,columns:m,sx:{width:"100%"},children:v.map((b,C)=>n(nt,{item:!0,xs:b,children:n(Ce,{autogrow:!0,children:n(f,{node:c,children:a.children[C]})})},C))}),n(Q,{children:g(T,{children:[n(Xe,{autostack:!0,node:c,buttons:o(c,d)}),n(J,{sx:{marginX:"auto"},children:u}),n(Ee,{poper_props:{sx:{opacity:"80%"}},node:c,close_on_otherclick:!0,outer_button:ee,outer_props:{size:"small",children:n(ke,{fontSize:"small"})},label:"\u5C55\u5F00",buttons:[se,le,ce,Ge,ue,Oe,xe,be,Ye]})]})})]})})}}function gt({get_title:t=(e,r)=>r.title}){return e=>{let r=x.useContext(ae).editor,o=e.node,i=r.get_core().get_printer().process_parameters(o),a=t(o,i);return n(Q,{children:n(Ot,{children:g(ut,{children:[n(dt,{variant:"outlined",sx:{paddingX:"0.5rem"},children:g(T,{force_direction:"row",children:[n(J,{children:a}),n(Ee,{node:o,close_on_otherclick:!0,outer_button:ee,outer_props:{size:"small",children:n(ke,{fontSize:"small"})},label:"\u5C55\u5F00",buttons:[se,le,ce,ue,xe,be]})]})}),e.children]})})})}}function Qe({get_label:t=(o,i)=>i.label,is_empty:e=(o,i)=>!i.url,render_element:r=o=>n("img",{src:o.node.parameters.url.val})}){return o=>{let i=x.useContext(ae).editor,a=o.node,s=i.get_core().get_printer().process_parameters(a),l=t(a,s),c=e(a,s),d=r;return g(he,{is_inline:!0,children:[o.children,n(Q,{children:g(T,{force_direction:"row",children:[n(O,{sx:{marginX:"0.25rem"},children:c?n(J,{children:"EMPTY"}):n(d,{node:a})}),g(T,{force_direction:c?"row":"column",children:[n(J,{sx:{marginY:"0.2rem",marginX:"auto"},children:l}),n(Ee,{node:a,close_on_otherclick:!0,outer_button:ee,outer_props:{size:"small",children:n(ke,{fontSize:"small"})},label:"\u5C55\u5F00",buttons:[se,le,ce,ue,xe,be]})]})]})})]})}}let An=mt({get_label:(t,e)=>e.label});var Fn=mt({get_label:(t,e)=>`\u6B21\u8282\uFF1A${e.title}`}),In=pe({}),Ln=pe({}),Tn=pe({}),zn=pe({});let On=pe({}),Bn=gt({get_title:(t,e)=>e.title}),Mn=gt({get_title:(t,e)=>"\u7AE0\u8282"});var Rn=ye({}),Nn=ye({}),Pn=ye({surrounder:t=>n("del",{children:t.children})}),Vn=ye({surrounder:t=>n("u",{children:t.children})}),Hn=ye({surrounder:t=>n(de,{children:t.children})}),$n=Dn({get_label:()=>"\u884C",get_numchildren:(t,e)=>e.widths.split(",").reduce((i,a)=>[...i,parseInt(a)],[]).length,get_widths:(t,e)=>e.widths.split(",").reduce((i,a)=>[...i,parseInt(a)],[])}),Wn=pe({rightbar_extra(t){return[{component:Mt,other_props:{idx:0,parameter_name:"suffix",label:"extra"},skip_mouseless:!0}]}}),jn=Qe({get_label:()=>"\u56FE\u7247",is_empty:(t,e)=>!e.target,render_element:t=>{let[e,r]=x.useState(""),o=t.node,i=o.parameters.target.val,a=o.parameters.type.val,s=o.parameters.height.val,l=o.parameters.width.val;return x.useEffect(()=>{(async()=>{if(a=="internal"){let c=await N.get.resource_info(i,A.node_id);c.url?r(we(c.url)):r("")}else r(i)})()}),n("img",{src:e||void 0,style:{width:l>0?`${l}rem`:"100%",height:s>0?`${s}rem`:"100%"}})}}),Un=Qe({get_label:(t,e)=>"\u5C55\u793A\u5B50\u8282\u70B9"}),qn=Qe({get_label:(t,e)=>"\u63D2\u5165\u5B50\u8282\u70B9"}),Kn=Bt({get_label:t=>{var e;return(e=t.parameters.label)==null?void 0:e.val}});let Xn={group:{\u662D\u8A00:An,\u968F\u8A00:Ln,\u5C5E\u8A00:On,\u6570\u5B66:Wn,\u88F1\u793A:Tn,\u5F70\u793A:zn,\u683C\u793A:In,\u6B21\u8282:Fn},inline:{\u5F3A:Rn,\u520A:Pn,\u7F00:Vn,\u6570\u5B66:Hn,\u65E0:Nn},structure:{\u9F50\u8A00:$n},support:{\u56FE:jn,\u5C0F\u8282\u7EBF:Bn,\u7AE0\u8282\u7EBF:Mn,\u5C55\u793A\u5B50\u8282\u70B9:Un,\u63D2\u5165\u5B50\u8282\u70B9:qn},abstract:{\u7A46\u8A00:Kn}},Gn=yn();function Me(t){let e=t.Icon;return n(O,{sx:{marginLeft:"0.35rem",marginRight:"0.25rem",marginTop:"0.35rem"},children:n(Je,{title:t.title,children:n(cn,{underline:"hover",href:t.href,children:n(e,{fontSize:"small",color:"primary"})})})})}function Yn(t){return n(Me,{title:"\u540E\u53F0\u9875\u9762",href:we(`/admin/articlezone/node/${A.node_id}/change/`),Icon:wn})}function Zn(t){return n(Me,{title:"\u7F16\u8F91\u5B50\u8282\u70B9\u7ED3\u6784",href:we(`/edit/structure/${A.node_id}`),Icon:xn})}function Jn(t){return n(Me,{title:"\uFF08\u6D45\uFF09\u7F16\u8F91\u5B50\u8282\u70B9\u7ED3\u6784",href:we(`/edit/shallow_structure/${A.node_id}`),Icon:bn})}function Qn(t){return n(Me,{title:"\u9884\u89C8\u9875\u9762\uFF08\u6709\u4EC0\u4E48\u5FC5\u8981\u5417\uFF09",href:we(`/view/content/${A.node_id}`),Icon:_n})}function ot(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function er(t,e,r){return e&&ot(t.prototype,e),r&&ot(t,r),t}function _(){return _=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},_.apply(this,arguments)}function tr(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function K(t,e){if(t==null)return{};var r={},o=Object.keys(t),i,a;for(a=0;a<o.length;a++)i=o[a],!(e.indexOf(i)>=0)&&(r[i]=t[i]);return r}function it(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var vt=x.createContext(),nr={mui:{root:{},anchorOriginTopCenter:{},anchorOriginBottomCenter:{},anchorOriginTopRight:{},anchorOriginBottomRight:{},anchorOriginTopLeft:{},anchorOriginBottomLeft:{}},container:{containerRoot:{},containerAnchorOriginTopCenter:{},containerAnchorOriginBottomCenter:{},containerAnchorOriginTopRight:{},containerAnchorOriginBottomRight:{},containerAnchorOriginTopLeft:{},containerAnchorOriginBottomLeft:{}}},H={view:{default:20,dense:4},snackbar:{default:6,dense:2}},Z={maxSnack:3,dense:!1,hideIconVariant:!1,variant:"default",autoHideDuration:5e3,anchorOrigin:{vertical:"bottom",horizontal:"left"},TransitionComponent:Nt,transitionDuration:{enter:225,exit:195}},ve=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},rr=function(e){return""+ve(e.vertical)+ve(e.horizontal)},or=function(e){return Object.keys(e).filter(function(r){return!nr.container[r]}).reduce(function(r,o){var i;return _({},r,(i={},i[o]=e[o],i))},{})},q={TIMEOUT:"timeout",CLICKAWAY:"clickaway",MAXSNACK:"maxsnack",INSTRUCTED:"instructed"},Te={toContainerAnchorOrigin:function(e){return"containerAnchorOrigin"+e},toAnchorOrigin:function(e){var r=e.vertical,o=e.horizontal;return"anchorOrigin"+ve(r)+ve(o)},toVariant:function(e){return"variant"+ve(e)}},Ie=function(e){return!!e||e===0},at=function(e){return typeof e=="number"||e===null},ir=function(e,r,o){return function(i){return i==="autoHideDuration"?at(e.autoHideDuration)?e.autoHideDuration:at(r.autoHideDuration)?r.autoHideDuration:Z.autoHideDuration:e[i]||r[i]||o[i]}};function je(t,e,r){return t===void 0&&(t={}),e===void 0&&(e={}),r===void 0&&(r={}),_({},r,{},e,{},t)}var ar="SnackbarContent",_t={root:ar+"-root"},sr=ie("div")(function(t){var e,r,o=t.theme;return r={},r["&."+_t.root]=(e={display:"flex",flexWrap:"wrap",flexGrow:1},e[o.breakpoints.up("sm")]={flexGrow:"initial",minWidth:288},e),r}),lr=E.exports.forwardRef(function(t,e){var r=t.className,o=K(t,["className"]);return n(sr,{...Object.assign({ref:e,className:oe(_t.root,r)},o)})}),st={right:"left",left:"right",bottom:"up",top:"down"},cr=function(e){return e.horizontal!=="center"?st[e.horizontal]:st[e.vertical]},ur=function(e){return n(Be,{...Object.assign({},e),children:n("path",{d:"M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"})})},dr=function(e){return n(Be,{...Object.assign({},e),children:n("path",{d:"M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"})})},hr=function(e){return n(Be,{...Object.assign({},e),children:n("path",{d:"M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2, 6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12, 13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"})})},pr=function(e){return n(Be,{...Object.assign({},e),children:n("path",{d:"M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12A10,10 0 0,0 12,2Z"})})},Le={fontSize:20,marginInlineEnd:8},fr={default:void 0,success:n(ur,{style:Le}),warning:n(dr,{style:Le}),error:n(hr,{style:Le}),info:n(pr,{style:Le})};function _e(t,e){return t.reduce(function(r,o){return o==null?r:function(){for(var a=arguments.length,s=new Array(a),l=0;l<a;l++)s[l]=arguments[l];var c=[].concat(s);e&&c.indexOf(e)===-1&&c.push(e),r.apply(this,c),o.apply(this,c)}},function(){})}var mr=typeof window!="undefined"?E.exports.useLayoutEffect:E.exports.useEffect;function lt(t){var e=E.exports.useRef(t);return mr(function(){e.current=t}),E.exports.useCallback(function(){return e.current.apply(void 0,arguments)},[])}var gr=E.exports.forwardRef(function(t,e){var r=t.children,o=t.autoHideDuration,i=t.ClickAwayListenerProps,a=t.disableWindowBlurListener,s=a===void 0?!1:a,l=t.onClose,c=t.onMouseEnter,d=t.onMouseLeave,u=t.open,f=t.resumeHideDuration,p=K(t,["children","autoHideDuration","ClickAwayListenerProps","disableWindowBlurListener","onClose","onMouseEnter","onMouseLeave","open","resumeHideDuration"]),S=E.exports.useRef(),w=lt(function(){l&&l.apply(void 0,arguments)}),v=lt(function(D){!l||D==null||(clearTimeout(S.current),S.current=setTimeout(function(){w(null,q.TIMEOUT)},D))});E.exports.useEffect(function(){return u&&v(o),function(){clearTimeout(S.current)}},[u,o,v]);var m=function(){clearTimeout(S.current)},b=E.exports.useCallback(function(){o!=null&&v(f!=null?f:o*.5)},[o,f,v]),C=function(F){c&&c(F),m()},k=function(F){d&&d(F),b()},L=function(F){l&&l(F,q.CLICKAWAY)};return E.exports.useEffect(function(){if(!s&&u)return window.addEventListener("focus",b),window.addEventListener("blur",m),function(){window.removeEventListener("focus",b),window.removeEventListener("blur",m)}},[s,b,u]),E.exports.createElement(Vt,_({onClickAway:L},i),E.exports.createElement("div",_({onMouseEnter:C,onMouseLeave:k,ref:e},p),r))}),$="SnackbarItem",I={contentRoot:$+"-contentRoot",lessPadding:$+"-lessPadding",variantSuccess:$+"-variantSuccess",variantError:$+"-variantError",variantInfo:$+"-variantInfo",variantWarning:$+"-variantWarning",message:$+"-message",action:$+"-action",wrappedRoot:$+"-wrappedRoot"},vr=ie(gr)(function(t){var e,r=t.theme,o=r.palette.mode||r.palette.type,i=Pt(r.palette.background.default,o==="light"?.8:.98);return e={},e["&."+I.wrappedRoot]={position:"relative",transform:"translateX(0)",top:0,right:0,bottom:0,left:0},e["."+I.contentRoot]=_({},r.typography.body2,{backgroundColor:i,color:r.palette.getContrastText(i),alignItems:"center",padding:"6px 16px",borderRadius:"4px",boxShadow:"0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)"}),e["."+I.lessPadding]={paddingLeft:8*2.5},e["."+I.variantSuccess]={backgroundColor:"#43a047",color:"#fff"},e["."+I.variantError]={backgroundColor:"#d32f2f",color:"#fff"},e["."+I.variantInfo]={backgroundColor:"#2196f3",color:"#fff"},e["."+I.variantWarning]={backgroundColor:"#ff9800",color:"#fff"},e["."+I.message]={display:"flex",alignItems:"center",padding:"8px 0"},e["."+I.action]={display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8},e}),_r=function(e){var r=e.classes,o=K(e,["classes"]),i=E.exports.useRef(),a=E.exports.useState(!0),s=a[0],l=a[1];E.exports.useEffect(function(){return function(){i.current&&clearTimeout(i.current)}},[]);var c=_e([o.snack.onClose,o.onClose],o.snack.key),d=function(){o.snack.requestClose&&c(null,q.INSTRCUTED)},u=function(){i.current=setTimeout(function(){l(!s)},125)},f=o.style,p=o.ariaAttributes,S=o.className,w=o.hideIconVariant,v=o.iconVariant,m=o.snack,b=o.action,C=o.content,k=o.TransitionComponent,L=o.TransitionProps,D=o.transitionDuration,F=K(o,["style","dense","ariaAttributes","className","hideIconVariant","iconVariant","snack","action","content","TransitionComponent","TransitionProps","transitionDuration","onEnter","onEntered","onEntering","onExit","onExited","onExiting"]),P=m.key,fe=m.open,Se=m.className,B=m.variant,me=m.content,te=m.action,G=m.ariaAttributes,W=m.anchorOrigin,ne=m.message,Re=m.TransitionComponent,j=m.TransitionProps,ge=m.transitionDuration,Ne=K(m,["persist","key","open","entered","requestClose","className","variant","content","action","ariaAttributes","anchorOrigin","message","TransitionComponent","TransitionProps","transitionDuration","onEnter","onEntered","onEntering","onExit","onExited","onExiting"]),De=_({},fr,{},v)[B],Ae=_({"aria-describedby":"notistack-snackbar"},je(G,p)),Pe=Re||k||Z.TransitionComponent,Ve=je(ge,D,Z.transitionDuration),He=_({direction:cr(W)},je(j,L)),re=te||b;typeof re=="function"&&(re=re(P));var h=me||C;typeof h=="function"&&(h=h(P,m.message));var y=["onEnter","onEntering","onEntered","onExit","onExiting","onExited"].reduce(function(z,V){var U;return _({},z,(U={},U[V]=_e([o.snack[V],o[V]],o.snack.key),U))},{});return n(vn,{unmountOnExit:!0,timeout:175,in:s,onExited:y.onExited,children:n(vr,{...Object.assign({},F,Ne,{open:fe,className:oe(r.root,I.wrappedRoot,r[Te.toAnchorOrigin(W)]),onClose:c}),children:n(Pe,{...Object.assign({appear:!0,in:fe,timeout:Ve},He,{onExit:y.onExit,onExiting:y.onExiting,onExited:u,onEnter:y.onEnter,onEntering:y.onEntering,onEntered:_e([y.onEntered,d])}),children:h||g(lr,{...Object.assign({},Ae,{role:"alert",style:f,className:oe(I.contentRoot,I[Te.toVariant(B)],r[Te.toVariant(B)],S,Se,!w&&De&&I.lessPadding)}),children:[g("div",{id:Ae["aria-describedby"],className:I.message,children:[w?null:De,ne]}),re&&n("div",{className:I.action,children:re})]})})})})},Ue={container:"& > .MuiCollapse-container, & > .MuiCollapse-root",wrapper:"& > .MuiCollapse-container > .MuiCollapse-wrapper, & > .MuiCollapse-root > .MuiCollapse-wrapper"},qe=16,Y="SnackbarContainer",R={root:Y+"-root",rootDense:Y+"-rootDense",top:Y+"-top",bottom:Y+"-bottom",left:Y+"-left",right:Y+"-right",center:Y+"-center"},xr=ie("div")(function(t){var e,r,o,i,a,s,l=t.theme;return s={},s["&."+R.root]=(e={boxSizing:"border-box",display:"flex",maxHeight:"100%",position:"fixed",zIndex:l.zIndex.snackbar,height:"auto",width:"auto",transition:"top 300ms ease 0ms, right 300ms ease 0ms, bottom 300ms ease 0ms, left 300ms ease 0ms, margin 300ms ease 0ms, max-width 300ms ease 0ms",pointerEvents:"none"},e[Ue.container]={pointerEvents:"all"},e[Ue.wrapper]={padding:H.snackbar.default+"px 0px",transition:"padding 300ms ease 0ms"},e.maxWidth="calc(100% - "+H.view.default*2+"px)",e[l.breakpoints.down("sm")]={width:"100%",maxWidth:"calc(100% - "+qe*2+"px)"},e),s["&."+R.rootDense]=(r={},r[Ue.wrapper]={padding:H.snackbar.dense+"px 0px"},r),s["&."+R.top]={top:H.view.default-H.snackbar.default,flexDirection:"column"},s["&."+R.bottom]={bottom:H.view.default-H.snackbar.default,flexDirection:"column-reverse"},s["&."+R.left]=(o={left:H.view.default},o[l.breakpoints.up("sm")]={alignItems:"flex-start"},o[l.breakpoints.down("sm")]={left:qe+"px"},o),s["&."+R.right]=(i={right:H.view.default},i[l.breakpoints.up("sm")]={alignItems:"flex-end"},i[l.breakpoints.down("sm")]={right:qe+"px"},i),s["&."+R.center]=(a={left:"50%",transform:"translateX(-50%)"},a[l.breakpoints.up("sm")]={alignItems:"center"},a),s}),br=function(e){var r=e.className,o=e.anchorOrigin,i=e.dense,a=K(e,["className","anchorOrigin","dense"]),s=oe(R[o.vertical],R[o.horizontal],R.root,r,i&&R.rootDense);return n(xr,{...Object.assign({className:s},a)})},Cr=x.memo(br),Er=function(t){tr(e,t);function e(o){var i;return i=t.call(this,o)||this,i.enqueueSnackbar=function(a,s){s===void 0&&(s={});var l=s,c=l.key,d=l.preventDuplicate,u=K(l,["key","preventDuplicate"]),f=Ie(c),p=f?c:new Date().getTime()+Math.random(),S=ir(u,i.props,Z),w=_({key:p},u,{message:a,open:!0,entered:!1,requestClose:!1,variant:S("variant"),anchorOrigin:S("anchorOrigin"),autoHideDuration:S("autoHideDuration")});return u.persist&&(w.autoHideDuration=void 0),i.setState(function(v){if(d===void 0&&i.props.preventDuplicate||d){var m=function(L){return f?L.key===c:L.message===a},b=v.queue.findIndex(m)>-1,C=v.snacks.findIndex(m)>-1;if(b||C)return v}return i.handleDisplaySnack(_({},v,{queue:[].concat(v.queue,[w])}))}),p},i.handleDisplaySnack=function(a){var s=a.snacks;return s.length>=i.maxSnack?i.handleDismissOldest(a):i.processQueue(a)},i.processQueue=function(a){var s=a.queue,l=a.snacks;return s.length>0?_({},a,{snacks:[].concat(l,[s[0]]),queue:s.slice(1,s.length)}):a},i.handleDismissOldest=function(a){if(a.snacks.some(function(u){return!u.open||u.requestClose}))return a;var s=!1,l=!1,c=a.snacks.reduce(function(u,f){return u+(f.open&&f.persist?1:0)},0);c===i.maxSnack&&(l=!0);var d=a.snacks.map(function(u){return!s&&(!u.persist||l)?(s=!0,u.entered?(u.onClose&&u.onClose(null,q.MAXSNACK,u.key),i.props.onClose&&i.props.onClose(null,q.MAXSNACK,u.key),_({},u,{open:!1})):_({},u,{requestClose:!0})):_({},u)});return _({},a,{snacks:d})},i.handleEnteredSnack=function(a,s,l){if(!Ie(l))throw new Error("handleEnteredSnack Cannot be called with undefined key");i.setState(function(c){var d=c.snacks;return{snacks:d.map(function(u){return u.key===l?_({},u,{entered:!0}):_({},u)})}})},i.handleCloseSnack=function(a,s,l){if(i.props.onClose&&i.props.onClose(a,s,l),s!==q.CLICKAWAY){var c=l===void 0;i.setState(function(d){var u=d.snacks,f=d.queue;return{snacks:u.map(function(p){return!c&&p.key!==l?_({},p):p.entered?_({},p,{open:!1}):_({},p,{requestClose:!0})}),queue:f.filter(function(p){return p.key!==l})}})}},i.closeSnackbar=function(a){var s=i.state.snacks.find(function(l){return l.key===a});Ie(a)&&s&&s.onClose&&s.onClose(null,q.INSTRUCTED,a),i.handleCloseSnack(null,q.INSTRUCTED,a)},i.handleExitedSnack=function(a,s,l){var c=s||l;if(!Ie(c))throw new Error("handleExitedSnack Cannot be called with undefined key");i.setState(function(d){var u=i.processQueue(_({},d,{snacks:d.snacks.filter(function(f){return f.key!==c})}));return u.queue.length===0?u:i.handleDismissOldest(u)})},i.state={snacks:[],queue:[],contextValue:{enqueueSnackbar:i.enqueueSnackbar.bind(it(i)),closeSnackbar:i.closeSnackbar.bind(it(i))}},i}var r=e.prototype;return r.render=function(){var i=this,a=this.state.contextValue,s=this.props,l=s.iconVariant,c=s.dense,d=c===void 0?Z.dense:c,u=s.hideIconVariant,f=u===void 0?Z.hideIconVariant:u,p=s.domRoot,S=s.children,w=s.classes,v=w===void 0?{}:w,m=K(s,["maxSnack","preventDuplicate","variant","anchorOrigin","iconVariant","dense","hideIconVariant","domRoot","children","classes"]),b=this.state.snacks.reduce(function(k,L){var D,F=rr(L.anchorOrigin),P=k[F]||[];return _({},k,(D={},D[F]=[].concat(P,[L]),D))},{}),C=Object.keys(b).map(function(k){var L=b[k];return n(Cr,{dense:d,anchorOrigin:L[0].anchorOrigin,className:oe(v.containerRoot,v[Te.toContainerAnchorOrigin(k)]),children:L.map(function(D){return n(_r,{...Object.assign({},m,{key:D.key,snack:D,dense:d,iconVariant:l,hideIconVariant:f,classes:or(v),onClose:i.handleCloseSnack,onExited:_e([i.handleExitedSnack,i.props.onExited]),onEntered:_e([i.handleEnteredSnack,i.props.onEntered])})})})},k)});return g(vt.Provider,{value:a,children:[S,p?Rt.exports.createPortal(C,p):C]})},er(e,[{key:"maxSnack",get:function(){return this.props.maxSnack||Z.maxSnack}}]),e}(E.exports.Component),xt=function(){return E.exports.useContext(vt)};function wr(){return n(O,{sx:{marginX:"auto"},children:g("label",{children:[n("input",{type:"file",style:{display:"none"},onChange:t=>{if(t.target.files.length>0){var e=new FormData;e.append("file",t.target.files[0]),N.post.file(e,A.node_id)}}}),n(ze,{title:"\u4E0A\u4F20",icon:pt,component:"span",size:"small",icon_props:{sx:{marginLeft:"-0.1rem",color:"#b5dfff"}}})]})})}function kr(t){let[e,r]=x.useState(void 0);const{enqueueSnackbar:o,closeSnackbar:i}=xt();return g(x.Fragment,{children:[n(ze,{title:"\u5220\u9664\u8D44\u6E90",icon:$t,onClick:async a=>{r(a.currentTarget)}}),n(Wt,{anchorEl:e,open:!!e,onClose:a=>r(void 0),anchorOrigin:{vertical:"center",horizontal:"right"},children:n(jt,{onClick:async a=>{let s=await N.post.delete_resource(t.resource_id);o(s?"\u5220\u9664\u6210\u529F":"\u5220\u9664\u5931\u8D25"),r(void 0),s&&t.onSuccess&&t.onSuccess()},children:"\u786E\u5B9A\uFF1F"})})]})}function yr(t){let[e,r,o]=[t.id,t.name,t.url],[i,a]=x.useState(r);const{enqueueSnackbar:s,closeSnackbar:l}=xt();E.exports.useEffect(()=>{a(r)},[r]);let c=t.onSuccess||(()=>{});return n(dt,{variant:"outlined",sx:{position:"relative",marginTop:"1rem",marginX:"1rem",marginBottom:"1rem",paddingY:"0.7rem"},children:g(T,{force_direction:"row",children:[n(O,{sx:{flex:1},children:g(T,{children:[n(rt,{variant:"standard",label:"name",value:i,fullWidth:!0,onChange:d=>{a(d.target.value)}}),n(rt,{variant:"standard",label:"url",value:o,fullWidth:!0,sx:{marginTop:"1rem"},InputProps:{readOnly:!0}})]})}),n(O,{children:g(T,{children:[n(ze,{title:"\u66F4\u6539\u8D44\u6E90\u540D",icon:Cn,onClick:async d=>{let u={name:i},f=await N.post.manage_recourse(!1,u,e);s(f?"\u4FEE\u6539\u6587\u4EF6\u540D\u6210\u529F":"\u4FEE\u6539\u6587\u4EF6\u540D\u5931\u8D25")}}),g("label",{children:[n("input",{type:"file",style:{display:"none"},onChange:async d=>{let u=!1;if(d.target.files.length<=0)u=!1;else{var f=new FormData;f.append("file",d.target.files[0]);let p=await N.post.manage_recourse(!0,f,e);u=p,p&&c()}s(u?"\u4E0A\u4F20\u6587\u4EF6\u6210\u529F":"\u4E0A\u4F20\u6587\u4EF6\u5931\u8D25")}}),n(ze,{title:"\u66FF\u6362\u6587\u4EF6",icon:pt,component:"span"})]}),n(kr,{resource_id:e,onSuccess:c})]})})]})})}class Sr extends x.Component{constructor(e){super(e),this.state={resources:[]}}async effect(){let e=await N.get.resources(A.node_id);this.setState({resources:e}),this.forceUpdate()}async componentDidMount(){this.effect()}render(){let e=this;return n(O,{sx:r=>({...r.fonts.body}),children:n(T,{force_direction:"column",children:e.state.resources.map((r,o)=>{let[i,a,s]=r;return n(x.Fragment,{children:n(yr,{id:i,name:a,url:s,onSuccess:()=>{e.effect()}})},o)})})})}}function Dr(t){let[e,r]=x.useState(!1);return g(x.Fragment,{children:[n(Je,{title:"\u67E5\u770B/\u7BA1\u7406\u6587\u4EF6",children:n(ee,{size:"small",onClick:()=>{r(!0)},children:n(En,{fontSize:"small",color:"primary"})})}),n(Ht,{anchor:"left",open:e,onClose:()=>r(!1),ModalProps:{keepMounted:!1},SlideProps:{onExited:()=>{}},PaperProps:{sx:{width:"40%"}},children:n(Sr,{})})]})}class Ar extends x.Component{constructor(e){super(e),this.state={snackbar_open:!1,status:!1}}render(){return n(x.Fragment,{children:n(Je,{title:"\u4FDD\u5B58",children:n(ee,{size:"small",onClick:()=>this.props.save_func(),children:n(un,{fontSize:"small",color:"primary"})})})})}}function Ke(t,e,r){return Ze(t,e)&&t.concept==r}function Fr(t,e){const r=e.normalizeNode;return e.normalizeNode=o=>{let[i,a]=o;if(Ut("initializing")){r(o);return}if(a.length==0){let s=i,l=s.children.length;if(l==0||!Ke(s.children[0],"support","\u5C0F\u8282\u7EBF")){t.add_nodes(t.get_core().create_support("\u5C0F\u8282\u7EBF"),[0]);return}if(!Ke(s.children[l-1],"support","\u7AE0\u8282\u7EBF")){t.add_nodes(t.get_core().create_support("\u7AE0\u8282\u7EBF"),[l]);return}}if(Ke(i,"support","\u7AE0\u8282\u7EBF")&&(a.length!=1||a[0]!=e.children.length-1)){t.delete_node_by_path(a);return}r(o)},e}function Ir(t,e){const r=e.normalizeNode;return e.normalizeNode=o=>{let[i,a]=o;Ze(i),r(o)},e}let Lr=[Fr,Ir];function Tr(t,e){for(let r of Lr)e=r(t,e);return e}class zr extends x.Component{constructor(r){super(r);Fe(this,"editor_ref");Fe(this,"printer_ref");Fe(this,"snackerbar_ref");this.state={printer:void 0,editorcore:void 0,tree:void 0,cache:void 0},this.editor_ref=x.createRef(),this.printer_ref=x.createRef(),this.snackerbar_ref=x.createRef()}open_snackerbar(r){this.snackerbar_ref&&this.snackerbar_ref.current&&this.snackerbar_ref.current.enqueueSnackbar(r)}async componentDidMount(){let r=await N.get.concept(A.node_id),o=tn(r),i=new qt(nn,o,rn,on),a=new Kt({renderers:Xn,default_renderers:Gn,printer:i}),s=await N.get.content(A.node_id);s||(s=a.create_abstract("root"),s.parameters={title:{val:`Article: ${A.node_id}`,type:"string"}});let l=await N.get.cache(A.node_id);this.setState({printer:i,editorcore:a,tree:s,cache:l})}get_editor(){if(this.editor_ref&&this.editor_ref.current)return this.editor_ref.current.get_editor()}get_printer_comp(){if(this.printer_ref&&this.printer_ref.current)return this.printer_ref.current.get_component()}async save_content(r=void 0,o=void 0){r==null&&(r=this.state.tree),o==null&&(o=this.state.cache);let i=await N.post.content({content:r},A.node_id),a=await N.post.cache({cache:o},A.node_id);this.open_snackerbar(i&&a?"\u4FDD\u5B58\u6210\u529F":"\u4FDD\u5B58\u5931\u8D25")}scroll_to_selection(){let r=this.get_editor(),o=this.get_printer_comp();if(!(r&&o))return;let i=r.get_slate().selection;if(!(i&&i.focus&&i.focus.path))return;let a=i.focus.path;o.scroll_to(a)}update_tree(){let r=this.get_editor();if(!r)return;let o=r.get_root();return this.setState({tree:o}),o}render(){let r=this,{editorcore:o,printer:i,tree:a}=this.state;if(!(o&&i&&a))return n(de,{});let[s,l]=(()=>{let{children:c,...d}=a;return[d,c]})();return n(Xt,{theme:Gt($e),children:g(O,{sx:c=>({position:"fixed",width:"100%",height:"100%",left:"0",right:"0",backgroundColor:c.palette.background.default,color:c.palette.text.primary}),children:[n(an,{}),n(Er,{maxSnack:3,ref:r.snackerbar_ref,anchorOrigin:{horizontal:"right",vertical:"top"},variant:"info",children:g(O,{sx:{position:"absolute",top:"2%",left:"1%",height:"96%",width:"98%"},children:[g(Yt,{sx:{position:"absolute",left:"0",width:"2%"},children:[n(Ar,{save_func:r.save_content.bind(r)}),n(Dr,{}),n(wr,{}),n(Yn,{}),n(Zn,{}),n(Jn,{}),n(Qn,{})]}),g(O,{sx:{position:"absolute",left:"3%",width:"96%",height:"100%"},children:[n(O,{sx:{position:"absolute",width:"49%",left:"0%",top:"0",height:"100%"},children:n(Zt,{ref:r.editor_ref,editorcore:o,init_rootproperty:s,init_rootchildren:l,onSave:()=>{let c=r.update_tree();setTimeout(()=>{sn.go(),r.save_content(c),r.scroll_to_selection()},50)},theme:$e,plugin:Tr})}),n(ct,{sx:{position:"absolute",width:"49%",left:"51%",top:"0",height:"100%",overflow:"auto",paddingRight:"1%"},className:"mathjax_process",children:n(ln,{children:n(Jt,{value:{BackendData:A,cache:r.state.cache},children:n(Qt,{printer:i,theme:$e,onUpdateCache:c=>{c&&JSON.stringify(c)!=JSON.stringify(r.state.cache)&&setTimeout(()=>r.setState({cache:c}),200)},ref:r.printer_ref,root:a,onDidMount:c=>{A.linkto&&setTimeout(()=>{let d=parseInt(A.linkto);c.scroll_to_idx(d);let u=c.get_ref_from_idx(d);u&&(u.style.border="2px solid")},300)}})})})})]})]})})]})})}}en.render(n(zr,{}),document.getElementById("root"));
