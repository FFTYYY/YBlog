var ze=Object.defineProperty;var Ie=(e,t,r)=>t in e?ze(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var F=(e,t,r)=>(Ie(e,typeof t!="symbol"?t+"":t,r),r);import{r as E,am as Le,an as Ue,e as _e,_ as b,ao as Ce,b as P,j as o,k as Ae,ap as He,c as Se,g as Fe,s as K,aq as w,u as ve,i as re,ar as Je,as as je,at as Ge,au as Ze,V as De,f as Ke,av as Ve,aw as Xe,ax as We,ay as xe,H as O,a as v,az as Ye,aA as ne,G as V,al as Qe,aB as qe,aC as z,aD as et,aE as W,A as se,aF as Re,aG as tt,aH as rt,aI as nt,B as j,aJ as fe,Q as we,aK as it,aL as X,a1 as $e,Y as G,aM as me,aN as Ee,ak as ot,aO as at,z as Te,a0 as lt,aP as st,aQ as ct,S as dt,aR as le,aS as ut,aT as pt,aU as ht}from"./titleword.3b2c0924.js";import{L as U}from"./Link.085a21ce.js";import{a as gt,b as ft}from"./math.3654302e.js";class B{constructor({type:t,name:r,parameter_prototype:i={},meta_parameters:n={}}){F(this,"type");F(this,"name");F(this,"parameter_prototype");F(this,"meta_parameters");this.type=t,this.name=r,this.meta_parameters=n||{},this.parameter_prototype=i||{force_inline:void 0,force_block:void 0,force_void:void 0}}}class mt{constructor({type:t,first_concept:r,name:i,default_override:n={},fixed_override:a={}}){F(this,"type");F(this,"first_concept");F(this,"name");F(this,"default_override");F(this,"fixed_override");this.type=t,this.first_concept=r,this.name=i,this.default_override=n||{},this.fixed_override=a||{}}}const _t=e=>{const t=E.exports.useRef({});return E.exports.useEffect(()=>{t.current=e}),t.current};var Ne=_t;function vt(e){const{badgeContent:t,invisible:r=!1,max:i=99,showZero:n=!1}=e,a=Ne({badgeContent:t,max:i});let l=r;r===!1&&t===0&&!n&&(l=!0);const{badgeContent:s,max:c=i}=l?a:e,d=s&&Number(s)>c?`${c}+`:s;return{badgeContent:s,invisible:l,max:c,displayValue:d}}function xt(e){return Le("MuiBadge",e)}Ue("MuiBadge",["root","badge","invisible"]);const bt=["badgeContent","component","children","invisible","max","slotProps","slots","showZero"],yt=e=>{const{invisible:t}=e;return Ae({root:["root"],badge:["badge",t&&"invisible"]},xt,void 0)},Bt=E.exports.forwardRef(function(t,r){const{component:i,children:n,max:a=99,slotProps:l={},slots:s={},showZero:c=!1}=t,d=_e(t,bt),{badgeContent:u,max:h,displayValue:m,invisible:g}=vt(b({},t,{max:a})),y=b({},t,{badgeContent:u,invisible:g,max:h,showZero:c}),x=yt(y),_=i||s.root||"span",f=Ce({elementType:_,externalSlotProps:l.root,externalForwardedProps:d,additionalProps:{ref:r},ownerState:y,className:x.root}),p=s.badge||"span",$=Ce({elementType:p,externalSlotProps:l.badge,ownerState:y,className:x.badge});return P(_,b({},f,{children:[n,o(p,b({},$,{children:m}))]}))});var Ct=Bt;const wt=e=>!e||!He(e);var ke=wt;function $t(e){return Fe("MuiBadge",e)}const kt=Se("MuiBadge",["root","badge","dot","standard","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft","invisible","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","overlapRectangular","overlapCircular","anchorOriginTopLeftCircular","anchorOriginTopLeftRectangular","anchorOriginTopRightCircular","anchorOriginTopRightRectangular","anchorOriginBottomLeftCircular","anchorOriginBottomLeftRectangular","anchorOriginBottomRightCircular","anchorOriginBottomRightRectangular"]);var M=kt;const Pt=["anchorOrigin","className","component","components","componentsProps","overlap","color","invisible","max","badgeContent","slots","slotProps","showZero","variant"],pe=10,he=4,Ot=e=>{const{color:t,anchorOrigin:r,invisible:i,overlap:n,variant:a,classes:l={}}=e,s={root:["root"],badge:["badge",a,i&&"invisible",`anchorOrigin${w(r.vertical)}${w(r.horizontal)}`,`anchorOrigin${w(r.vertical)}${w(r.horizontal)}${w(n)}`,`overlap${w(n)}`,t!=="default"&&`color${w(t)}`]};return Je(s,$t,l)},At=K("span",{name:"MuiBadge",slot:"Root",overridesResolver:(e,t)=>t.root})({position:"relative",display:"inline-flex",verticalAlign:"middle",flexShrink:0}),St=K("span",{name:"MuiBadge",slot:"Badge",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.badge,t[r.variant],t[`anchorOrigin${w(r.anchorOrigin.vertical)}${w(r.anchorOrigin.horizontal)}${w(r.overlap)}`],r.color!=="default"&&t[`color${w(r.color)}`],r.invisible&&t.invisible]}})(({theme:e,ownerState:t})=>b({display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignContent:"center",alignItems:"center",position:"absolute",boxSizing:"border-box",fontFamily:e.typography.fontFamily,fontWeight:e.typography.fontWeightMedium,fontSize:e.typography.pxToRem(12),minWidth:pe*2,lineHeight:1,padding:"0 6px",height:pe*2,borderRadius:pe,zIndex:1,transition:e.transitions.create("transform",{easing:e.transitions.easing.easeInOut,duration:e.transitions.duration.enteringScreen})},t.color!=="default"&&{backgroundColor:(e.vars||e).palette[t.color].main,color:(e.vars||e).palette[t.color].contrastText},t.variant==="dot"&&{borderRadius:he,height:he*2,minWidth:he*2,padding:0},t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="rectangular"&&{top:0,right:0,transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${M.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}},t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="rectangular"&&{bottom:0,right:0,transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${M.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}},t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="rectangular"&&{top:0,left:0,transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${M.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}},t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="rectangular"&&{bottom:0,left:0,transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${M.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}},t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="circular"&&{top:"14%",right:"14%",transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${M.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}},t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="circular"&&{bottom:"14%",right:"14%",transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${M.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}},t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="circular"&&{top:"14%",left:"14%",transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${M.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}},t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="circular"&&{bottom:"14%",left:"14%",transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${M.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}},t.invisible&&{transition:e.transitions.create("transform",{easing:e.transitions.easing.easeInOut,duration:e.transitions.duration.leavingScreen})})),Ft=E.exports.forwardRef(function(t,r){var i,n,a,l,s,c;const d=ve({props:t,name:"MuiBadge"}),{anchorOrigin:u={vertical:"top",horizontal:"right"},className:h,component:m="span",components:g={},componentsProps:y={},overlap:x="rectangular",color:_="default",invisible:f=!1,max:p,badgeContent:$,slots:A,slotProps:R,showZero:k=!1,variant:S="standard"}=d,oe=_e(d,Pt),ue=Ne({anchorOrigin:u,color:_,overlap:x,variant:S});let T=f;f===!1&&($===0&&!k||$==null&&S!=="dot")&&(T=!0);const{color:I=_,overlap:L=x,anchorOrigin:Q=u,variant:J=S}=T?ue:d,q=b({},d,{anchorOrigin:Q,invisible:T,color:I,overlap:L,variant:J}),ae=Ot(q);let N;J!=="dot"&&(N=$&&Number($)>p?`${p}+`:$);const ye=(i=(n=A==null?void 0:A.root)!=null?n:g.Root)!=null?i:At,Be=(a=(l=A==null?void 0:A.badge)!=null?l:g.Badge)!=null?a:St,ee=(s=R==null?void 0:R.root)!=null?s:y.root,te=(c=R==null?void 0:R.badge)!=null?c:y.badge;return o(Ct,b({invisible:f,badgeContent:N,showZero:k,max:p},oe,{slots:{root:ye,badge:Be},className:re(ee==null?void 0:ee.className,ae.root,h),slotProps:{root:b({},ee,ke(ye)&&{as:m,ownerState:b({},ee==null?void 0:ee.ownerState,{anchorOrigin:Q,color:I,overlap:L,variant:J})}),badge:b({},te,{className:re(ae.badge,te==null?void 0:te.className)},ke(Be)&&{ownerState:b({},te==null?void 0:te.ownerState,{anchorOrigin:Q,color:I,overlap:L,variant:J})})},ref:r}))});var Dt=Ft;const Wt=(e,t)=>b({WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",boxSizing:"border-box",WebkitTextSizeAdjust:"100%"},t&&!e.vars&&{colorScheme:e.palette.mode}),Rt=e=>b({color:(e.vars||e).palette.text.primary},e.typography.body1,{backgroundColor:(e.vars||e).palette.background.default,"@media print":{backgroundColor:(e.vars||e).palette.common.white}}),Et=(e,t=!1)=>{var r,i;const n={};t&&e.colorSchemes&&Object.entries(e.colorSchemes).forEach(([s,c])=>{var d;n[e.getColorSchemeSelector(s).replace(/\s*&/,"")]={colorScheme:(d=c.palette)==null?void 0:d.mode}});let a=b({html:Wt(e,t),"*, *::before, *::after":{boxSizing:"inherit"},"strong, b":{fontWeight:e.typography.fontWeightBold},body:b({margin:0},Rt(e),{"&::backdrop":{backgroundColor:(e.vars||e).palette.background.default}})},n);const l=(r=e.components)==null||(i=r.MuiCssBaseline)==null?void 0:i.styleOverrides;return l&&(a=[a,l]),a};function jr(e){const t=ve({props:e,name:"MuiCssBaseline"}),{children:r,enableColorScheme:i=!1}=t;return P(E.exports.Fragment,{children:[o(je,{styles:n=>Et(n,i)}),r]})}function Tt(e){return Fe("MuiDialog",e)}const Nt=Se("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]);var ge=Nt;const Mt=E.exports.createContext({});var zt=Mt;const It=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],Lt=K(Ge,{name:"MuiDialog",slot:"Backdrop",overrides:(e,t)=>t.backdrop})({zIndex:-1}),Ut=e=>{const{classes:t,scroll:r,maxWidth:i,fullWidth:n,fullScreen:a}=e,l={root:["root"],container:["container",`scroll${w(r)}`],paper:["paper",`paperScroll${w(r)}`,`paperWidth${w(String(i))}`,n&&"paperFullWidth",a&&"paperFullScreen"]};return Ae(l,Tt,t)},Ht=K(Ze,{name:"MuiDialog",slot:"Root",overridesResolver:(e,t)=>t.root})({"@media print":{position:"absolute !important"}}),Jt=K("div",{name:"MuiDialog",slot:"Container",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.container,t[`scroll${w(r.scroll)}`]]}})(({ownerState:e})=>b({height:"100%","@media print":{height:"auto"},outline:0},e.scroll==="paper"&&{display:"flex",justifyContent:"center",alignItems:"center"},e.scroll==="body"&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})),jt=K(De,{name:"MuiDialog",slot:"Paper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.paper,t[`scrollPaper${w(r.scroll)}`],t[`paperWidth${w(String(r.maxWidth))}`],r.fullWidth&&t.paperFullWidth,r.fullScreen&&t.paperFullScreen]}})(({theme:e,ownerState:t})=>b({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},t.scroll==="paper"&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},t.scroll==="body"&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!t.maxWidth&&{maxWidth:"calc(100% - 64px)"},t.maxWidth==="xs"&&{maxWidth:e.breakpoints.unit==="px"?Math.max(e.breakpoints.values.xs,444):`${e.breakpoints.values.xs}${e.breakpoints.unit}`,[`&.${ge.paperScrollBody}`]:{[e.breakpoints.down(Math.max(e.breakpoints.values.xs,444)+32*2)]:{maxWidth:"calc(100% - 64px)"}}},t.maxWidth&&t.maxWidth!=="xs"&&{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`,[`&.${ge.paperScrollBody}`]:{[e.breakpoints.down(e.breakpoints.values[t.maxWidth]+32*2)]:{maxWidth:"calc(100% - 64px)"}}},t.fullWidth&&{width:"calc(100% - 64px)"},t.fullScreen&&{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,[`&.${ge.paperScrollBody}`]:{margin:0,maxWidth:"100%"}})),Gt=E.exports.forwardRef(function(t,r){const i=ve({props:t,name:"MuiDialog"}),n=Ke(),a={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{"aria-describedby":l,"aria-labelledby":s,BackdropComponent:c,BackdropProps:d,children:u,className:h,disableEscapeKeyDown:m=!1,fullScreen:g=!1,fullWidth:y=!1,maxWidth:x="sm",onBackdropClick:_,onClose:f,open:p,PaperComponent:$=De,PaperProps:A={},scroll:R="paper",TransitionComponent:k=Xe,transitionDuration:S=a,TransitionProps:oe}=i,ue=_e(i,It),T=b({},i,{disableEscapeKeyDown:m,fullScreen:g,fullWidth:y,maxWidth:x,scroll:R}),I=Ut(T),L=E.exports.useRef(),Q=N=>{L.current=N.target===N.currentTarget},J=N=>{!L.current||(L.current=null,_&&_(N),f&&f(N,"backdropClick"))},q=Ve(s),ae=E.exports.useMemo(()=>({titleId:q}),[q]);return o(Ht,b({className:re(I.root,h),closeAfterTransition:!0,components:{Backdrop:Lt},componentsProps:{backdrop:b({transitionDuration:S,as:c},d)},disableEscapeKeyDown:m,onClose:f,open:p,ref:r,onClick:J,ownerState:T},ue,{children:o(k,b({appear:!0,in:p,timeout:S,role:"presentation"},oe,{children:o(Jt,{className:re(I.container),onMouseDown:Q,ownerState:T,children:o(jt,b({as:$,elevation:24,role:"dialog","aria-describedby":l,"aria-labelledby":q},A,{className:re(I.paper,A.className),ownerState:T,children:o(zt.Provider,{value:ae,children:u})}))})}))}))});var Zt=Gt;class ie extends We{constructor(r){super("__order",{});F(this,"order_key");this.order_key=r}enter(r,i,n,a){let l=this.get_env(n);l[this.order_key]=l[this.order_key]||0,l[this.order_key]++,this.set_context(a,l[this.order_key])}exit(r,i,n,a){return[{},!0]}}class de extends We{constructor(r){super("__reference",void 0);F(this,"get_reference");this.get_reference=r}exit(r,i,n,a){let l=this.get_reference({node:r,parameters:i,env:n,context:a});return[{[this.key]:l},!0]}}function D(e){let r=v.useContext(V).printer,i=e.node.abstract,n=e.children;for(let a in i){let l=i[a],c=r.get_node_renderer(l).renderer_as_property;!c||(n=o(c,{node:l,parameters:e.parameters,context:e.context,flags:{senario:e.senario},children:n},a))}return o(O,{children:n})}function Kt(e){let{node:t,parameters:r,context:i,flags:n,printer:a,theme:l}=e,s=v.useContext(V),c=a||s.printer,d=l||s.theme;return o(Qe,{root:t,printer:c,theme:d})}function Vt({contexters:e=[],container:t=a=>o(ne,{children:a.children}),printer:r=void 0,theme:i=void 0,senario:n="title"}){let a=t;return xe({contexters:e,render_function_as_property:l=>{if(l.flags.senario!=n)return o(O,{children:l.children});let[s,c]=v.useState(!1),d=o(Kt,{...l,theme:i,printer:r});return P(v.Fragment,{children:[o(Ye,{title:d,placement:"right",children:o(Dt,{badgeContent:"",color:"secondary",variant:"dot",overlap:"circular",sx:{verticalAlign:"baseline"},children:o(U,{onClick:u=>c(!0),color:"inherit",href:"#",underline:"none",sx:{width:"auto",height:"auto",paddingRight:"0.35rem"},children:l.children})})}),o(Zt,{fullWidth:!0,maxWidth:"lg",open:s,onClose:()=>c(!1),children:d})]})},render_function:l=>{let s={node:l.node,context:l.context,parameters:l.parameters};return o(a,{...s,children:l.children})}})}const Gr={palette:{divider:"#eeeeee",mode:"dark",primary:{main:"#b5dfff"},secondary:{main:"#cf80bf"},background:{default:"rgba(35,35,48,0.96)",paper:"#393942"},text:{primary:"#eeeeee",secondary:"rgba(255,255,255,0.70)",disabled:"rgba(255,255,255,0.5)"}},margins:{paragraph:"0.4rem",special:"1.0rem",colon:"1rem",level:"2rem"},fonts:{body:{fontFamily:"STXihei"},title:{fontFamily:"SimHei"},structure:{fontFamily:"SimHei"},display:{fontFamily:"KaiTi"},weaken:{fontFamily:"FangSong"}}};function C(e){let t={};for(let r in e)typeof e[r]=="string"?t[r]={type:"string",val:e[r]}:typeof e[r]=="number"?t[r]={type:"number",val:e[r]}:typeof e[r]=="boolean"?t[r]={type:"boolean",val:e[r]}:t[r]=e[r];return t}var H={prefix:"",suffix:"",title:"",close:"",ordering:{val:"chinese",type:"string",choices:["head","list-chaining","list-separating","discuss","title","none"]}},Xt=new B({type:"group",name:"\u662D\u8A00",parameter_prototype:C({...H,label:"\u662D\u8A00"})}),Yt=new B({type:"group",name:"\u968F\u8A00",parameter_prototype:C({...H,label:"\u968F\u8A00"})}),Qt=new B({type:"group",name:"\u5C5E\u8A00",parameter_prototype:C({...H,label:"\u5C5E\u8A00",clustering:!1})}),qt=new B({type:"group",name:"\u6570\u5B66",parameter_prototype:C({...H,label:"\u6570\u5B66",environ:"align"})}),er=new B({type:"group",name:"\u88F1\u793A",parameter_prototype:C({...H,label:"\u88F1\u793A",long:!1})}),tr=new B({type:"group",name:"\u5F70\u793A",parameter_prototype:C({...H,label:"\u5F70\u793A"})}),rr=new B({type:"group",name:"\u683C\u793A",parameter_prototype:C({...H,label:"\u683C\u793A",format:""})}),nr=new B({type:"group",name:"\u6B21\u8282",parameter_prototype:C({label:"\u6B21\u8282",title:""})}),ir=new B({type:"inline",name:"\u5F3A",parameter_prototype:C({label:"\u5F3A"})}),or=new B({type:"inline",name:"\u520A",parameter_prototype:C({label:"\u520A"})}),ar=new B({type:"inline",name:"\u7F00",parameter_prototype:{...C({label:"\u7F00",target:"",autotext:!1}),type:{val:"index",type:"string",choices:["index","outer-index","http"]}}}),lr=new B({type:"inline",name:"\u6570\u5B66",parameter_prototype:C({label:"\u6570\u5B66"})}),sr=new B({type:"inline",name:"\u65E0",parameter_prototype:C({label:"\u65E0"})}),cr=new B({type:"support",name:"\u56FE",parameter_prototype:{...C({label:"\u56FE\u7247",target:"",width:10,height:-1}),type:{val:"internal",type:"string",choices:["internal","url"]}},meta_parameters:{force_inline:!0}}),dr=new B({type:"support",name:"\u5C0F\u8282\u7EBF",parameter_prototype:C({label:"\u5C0F\u8282",title:"",alone:!1})}),ur=new B({type:"support",name:"\u7AE0\u8282\u7EBF",parameter_prototype:C({label:"\u7AE0\u8282"})}),pr=new B({type:"structure",name:"\u9F50\u8A00",parameter_prototype:C({label:"\u9F50\u8A00",widths:"1",tot_width_ratio:100})}),hr=new B({type:"abstract",name:"\u7A46\u8A00",parameter_prototype:C({label:"\u7A46\u8A00"})}),gr=new B({type:"support",name:"\u5C55\u793A\u5B50\u8282\u70B9",parameter_prototype:C({label:"\u5C55\u793A\u5B50\u8282\u70B9",max_height:-1,min_height:-1,scroll:!0})}),fr=new B({type:"support",name:"\u63D2\u5165\u5B50\u8282\u70B9",parameter_prototype:C({label:"\u63D2\u5165\u5B50\u8282\u70B9",no_ender:!0})});let Zr=[Xt,Yt,Qt,qt,er,tr,rr,nr,ir,or,ar,lr,cr,ur,dr,pr,hr,gr,fr,sr];function ce(e,t){return t==null&&(t=["\u3007","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D","\u4E03","\u516B","\u4E5D"]),`${e}`.split("").map(r=>t[Number(r)]).join("")}function mr(e){return Number(e.slice(0,e.length-3))}function _r(e){return`${e}rem`}function Pe(e,t){return _r(mr(e)*t)}function Kr(e){let t=e.reduce((i,n)=>n?{...i,...JSON.parse(n)}:i,{}),r=[];for(let i in t){let n=t[i];r.push(new mt({name:i,type:n.type,first_concept:n.first,default_override:n.default,fixed_override:n.fixed}))}return r}function Z(e,t){return t=="head"?ce(e):t=="discuss"?e>0&&e<=20?["\u2460","\u2461","\u2462","\u2463","\u2464","\u2465","\u2466","\u2467","\u2468","\u2469","\u246A","\u246B","\u246C","\u246D","\u246E","\u246F","\u2470","\u2471","\u2472","\u2473"][e-1]:`(${e})`:t=="title"?`\u3010${ce(e)}\u3011`:t=="list-separating"?`[${e}]`:t=="list-chaining"?`${e})`:""}function Me(e,t){if(e.idx==t)return e;if(e.children)for(let r of e.children){let i=Me(r,t);if(i)return i}}function Y(e){return qe(e)?e.text:e.children.reduce((t,r)=>t+Y(r),"")}function be(e,t=100){return e.length<t?e:e.slice(0,t)+"..."}var vr=(()=>{let e=r=>new ie(r.parameters.label);return z({contexters:[e],outer:r=>{let{node:i,context:n,parameters:a,children:l}=r,c=e({node:i,parameters:a,context:n,env:{}}).get_context(n),d=Z(c,a.ordering);d=d&&d+" ";let u=a.title;return P(ne,{children:[o(D,{node:i,context:n,parameters:a,senario:"title",children:P(ne,{subtitle_like:!0,children:[d,u]})}),l]})}})})(),xr=(()=>{let e=i=>new ie(i.parameters.label);return z({contexters:[e,()=>new de(i=>{let a=e(i).get_context(i.context),l=Z(a,i.parameters.ordering),s=`${i.parameters.title} ${l}`,c=be(Y(i.node));return{title:s,content:c}})],pre_element:i=>{let{node:n,context:a,parameters:l,env:s}=i,d=e(i).get_context(a),u=l.title,h=l.prefix,m=Z(d,l.ordering),g=`${u}`;return m&&(g=g+` ${m}`),h&&(g=g+` \uFF08${h}\uFF09`),o(D,{node:n,context:a,parameters:l,senario:"title",children:o(W,{inline:!0,children:g})})},outer:i=>o(ne,{subtitle_like:!0,children:i.children})})})(),br=(()=>{let e=r=>new ie(r.parameters.label),t=r=>{let{node:i,parameters:n,env:a,context:l}=r,s=n.title,c=e(r).get_context(l),d=Z(c,n.ordering),u=`${s}`;return d&&(u=u+` ${d}`),u};return z({contexters:[e],pre_element:r=>{let{node:i,parameters:n,context:a,env:l}=r,s=n.prefix;return s&&o(W,{inline:!0,children:s})},inner:r=>{let{node:i,parameters:n,context:a,children:l}=r,s=n.close,c=t({node:i,parameters:n,env:{},context:a});return P(se,{force_direction:"column",children:[c?o(W,{children:o(D,{node:i,context:a,parameters:n,senario:"title",children:o(O,{children:c})})}):o(O,{}),o(Re,{children:o(tt,{children:r.children})}),s?o(W,{children:s}):o(O,{})]})}})})(),yr=(()=>{let e=r=>new ie(r.parameters.label);return z({small_margin_enter:!0,contexters:[e,()=>new de(r=>{let n=e(r).get_context(r.context),a=Z(n,r.parameters.ordering),l=be(Y(r.node));return{title:a,content:l}})],pre_element:r=>{let i=r.parameters.prefix;return i&&o(W,{inline:!0,children:i})},aft_element:r=>{let{node:i,parameters:n,context:a,env:l}=r,s=n.suffix;return s&&o(W,{inline:!0,leftmargin:!0,children:s})},inner:r=>{let{node:i,parameters:n,context:a,children:l}=r,s=n.title,c=n.close,d=e({node:i,parameters:n,env:{},context:a}).get_context(a),u=Z(d,n.ordering),h=`${s}`;u&&(h=h+` ${u}`);let m=o(O,{children:h});return h.length>5&&(m=o(it,{sx:{fontSize:"0.5rem"},children:h})),o(v.Fragment,{children:P(se,{force_direction:"column",children:[P(se,{children:[P(rt,{sx:{position:"relative"},children:[" ",h?o(nt,{children:o(D,{node:i,context:a,parameters:n,senario:"title",children:m})}):o(O,{})]}),o(j,{children:r.children})]}),c?o(W,{children:c}):o(O,{})]})})}})})(),Br=(()=>z({inner:e=>{let{node:t,parameters:r,context:i,children:n}=e,a=r.title,l=r.close,s=!r.long,c=o(fe,{align:"center",children:e.children});return s||(c=o(Re,{sx:{position:"relative"},children:o(fe,{align:"left",children:e.children})})),P(se,{force_direction:"column",children:[o(D,{node:t,context:i,parameters:r,senario:"title",children:a?o(W,{children:a}):o(O,{})}),c,l?o(W,{align:"right",children:l}):o(O,{})]})}}))(),Cr=(()=>z({inner:e=>o("pre",{children:e.children})}))(),wr=(()=>z({inner:e=>{let{node:t,parameters:r,context:i,children:n}=e;return o(fe,{sx:{fontSize:a=>Pe(a.fonts.structure.fontSize,1.4),lineHeight:a=>Pe(a.fonts.structure.lineHeight,1.4)},children:o(D,{node:t,context:i,parameters:r,senario:"title",children:e.children})})}}))(),$r=(()=>z({inner:e=>{let{node:t,parameters:r,context:i}=e,n=Y(t),a=r.suffix,l=r.close,s=r.environ,c=s?`\\begin{${s}}`:"",d=s?`\\end{${s}}`:"";return n=`${c}${n}\\text{${a}}${d}`,o(D,{node:t,context:i,parameters:r,senario:"title",children:P(v.Fragment,{children:[o(gt,{children:n}),l]})})}}))();let kr=(()=>{function e(r,i){let a=(i.widths||"").split(",").map(l=>l==""?1:parseInt(l));for(a.length>r.children.length&&(a=a.slice(0,r.children.length));a.length<r.children.length;)a.push(1);return a}return et({inner(r){let{node:i,parameters:n,context:a,children:l}=r,c=e(i,n).reduce((u,h)=>u+h,0),d=n.tot_width_ratio;return o(j,{sx:{width:`${d}%`},children:o(D,{node:i,context:a,parameters:n,senario:"title",children:o(we,{container:!0,columns:c,sx:{width:"100%"},spacing:2,children:r.children})})})},subinner(r){let{node:i,parameters:n,context:a,children:l,subidx:s}=r,d=e(i,n)[s];return o(we,{item:!0,xs:d,sx:{align:"center"},children:r.children})}})})(),Oe={group:{\u662D\u8A00:xr,\u968F\u8A00:br,\u88F1\u793A:Br,\u5F70\u793A:wr,\u5C5E\u8A00:yr,\u683C\u793A:Cr,\u6570\u5B66:$r,\u6B21\u8282:vr},structure:{\u9F50\u8A00:kr}};var Pr=(()=>X({outer:e=>o(D,{node:e.node,context:e.context,parameters:e.parameters,senario:"title",children:o("span",{children:e.children})})}))(),Or=(()=>X({outer:e=>o(D,{node:e.node,context:e.context,parameters:e.parameters,senario:"title",children:o("strong",{children:e.children})})}))(),Ar=(()=>X({outer:e=>o(D,{node:e.node,context:e.context,parameters:e.parameters,senario:"title",children:o("del",{children:e.children})})}))(),Sr=(()=>X({outer:e=>o(j,{component:"span",sx:{paddingX:"0.1rem"},children:o(D,{node:e.node,context:e.context,parameters:e.parameters,senario:"title",children:o(ft,{children:Y(e.node)})})})}))(),Fr=(()=>{let e=new de(()=>{});function t(n,a){if(!(n&&n[a]&&n[a][e.key]))return[void 0,void 0];let l=n[a][e.key];return[l.title,l.content]}function r(n,a,l){let[s,c,d,u]=n.preprocess({root:a});return t(u,l)}function i(n,a){let l=Me(n,a);return l?[`\u6B64${l.concept}`,be(Y(l))]:[void 0,void 0]}return X({outer:n=>{let{node:a,parameters:l,context:s,children:c}=n,d=l.target,u=l.type,h=l.autotext,m=v.useContext(V),g=m.printer_component;if(u=="index"){let y=parseInt(d),x=m.cache,_=m.root;if(h&&x){let[f,p]=t(x,y);if((f==null||p==null)&&([f,p]=r(g,_,y)),(f==null||p==null)&&([f,p]=i(_,y)),!(f==null||p==null))return o($e,{title:p,children:o(U,{onClick:()=>{g.scroll_to_idx(y)},children:f})})}return o(U,{onClick:()=>{g.scroll_to_idx(y)},children:c})}else if(u=="outer-index"){let[y,x]=d.split(":"),[_,f]=[parseInt(y),parseInt(x)];if(h){let[p,$]=v.useState(void 0),[A,R]=v.useState(void 0);if(E.exports.useEffect(()=>{G.get.content(_).then(k=>{$(k)}),G.get.cache(_).then(k=>{R(k)})},[]),p&&A){let[k,S]=t(A,f);if((k==null||S==null)&&([k,S]=r(g,p,f)),(k==null||S==null)&&([k,S]=i(p,f)),!(k==null||S==null))return o($e,{title:S,children:P(U,{href:me.view.content(_,{linkto:f}),children:["\u6B64\u9875\u9762\u7684",k]})})}}}return h?o(U,{href:d,children:"\u6B64\u9875\u9762"}):o(U,{href:d,children:c})}})})();let Dr={inline:{\u5F3A:Or,\u520A:Ar,\u7F00:Fr,\u6570\u5B66:Sr,\u65E0:Pr}};var Wr=(()=>{let e=r=>new ie(r.parameters.label);return xe({contexters:[e,()=>new de(r=>{let n=e(r).get_context(r.context);return{title:`\u7B2C${ce(n)}\u8282`,content:""}})],render_function:r=>{let{node:i,parameters:n,context:a,children:l}=r,s=e({node:i,parameters:n,context:a,env:{}}).get_context(r.context),c=n.title,u=n.alone?o(O,{}):P(W,{inline:!0,children:["\u7B2C",ce(s),"\u8282"]});return P(Te,{children:[u,c?o(W,{inline:!0,sx:{marginRight:0},children:c}):o(O,{})]})}})})(),Rr=(()=>xe({render_function:e=>o(Te,{})}))(),Er=(()=>X({outer:e=>{let{node:t,parameters:r,context:i,children:n}=e,l=v.useContext(V).BackendData,s=r.type,c=r.target,d=r.width,u=r.height,[h,m]=v.useState("");return v.useEffect(()=>{(async()=>{if(s=="internal"){let g=await G.get.resource_info(c,l.node_id);g.url?m(lt(g.url)):m("")}else m(c)})()},[s,c]),d<0&&u<0&&(d=1),h?o("img",{src:h||void 0,style:{width:d>0?`${d}rem`:"100%",height:u>0?`${u}rem`:"100%"}}):o(j,{sx:{widths:d>0?`${d}rem`:`${u}rem`,height:u>0?`${u}rem`:`${d}rem`}})}}))(),Tr=(()=>new Ee({enter(e,t,r,i){i.env=JSON.parse(JSON.stringify(r))},exit(e,t,r,i){return[{},!0]},renderer(e){let t=v.useContext(V),{node:r,parameters:i,context:n,children:a}=e,[l,s]=v.useState([]);return v.useEffect(()=>{(async()=>{let c=await G.get.son_ids(t.BackendData.node_id);s(c)})()},[JSON.stringify(i)]),o(v.Fragment,{children:l.map((c,d)=>o(h=>{let m=v.useRef(),[g,y]=v.useState(0),x=p=>{p.data.verification!="showchildren"||p.data.son_id==null||String(p.data.son_id)==String(c)&&p.data.height!=g&&y(p.data.height)};v.useEffect(()=>(window.addEventListener("message",x),()=>{window.removeEventListener("message",x)}),[]);let _=`${g+40}px`,f=i.scroll?"auto":"hidden";return P(j,{children:[P(U,{href:me.view.content(c),underline:"hover",sx:p=>({...p.fonts.structure}),children:["\u25B6",o(st,{node_id:c})]}),o(j,{sx:{maxHeight:`${i.max_height}rem`,minHeight:`${i.min_height}rem`,overflow:f,borderLeft:"1px solid",marginLeft:"2px",paddingLeft:"1rem"},children:o("iframe",{ref:m,src:me.view.pure_printer(c),onLoad:()=>{m.current.contentWindow.postMessage({son_id:c,verification:"showchildren"},"*")},style:{width:"100%",border:"none",height:_}})}),(()=>{if(f=="hidden"){let p=g+40,$=parseInt(i.max_height)*16;if($>0&&$<p)return o(O,{children:"..."})}return o(O,{})})()]})},{},d))})}}))(),Nr=(()=>{function e(t){let r=t.children[t.children.length-1];return ct(r)&&r.concept=="\u7AE0\u8282\u7EBF"&&(t.children=t.children.slice(0,t.children.length-1)),t}return new Ee({enter(t,r,i,n){n.env=JSON.parse(JSON.stringify(i))},exit(t,r,i,n){return[{},!0]},renderer(t){let r=v.useContext(V),{node:i,parameters:n,context:a,children:l}=t,[s,c]=v.useState([]),[d,u]=v.useState({init_envs:[],roots:[]}),h=r.printer_component,m=r.BackendData;if(!(h&&m))return o(O,{});v.useEffect(()=>{(async()=>{let x=await G.get.son_ids(r.BackendData.node_id);console.log(x);let _=JSON.parse(JSON.stringify(a.env)),f=[],p=[];for(let $ in x){let A=await G.get.content(x[$]);n.no_ender&&(A=e(A)),f.push(JSON.parse(JSON.stringify(_))),p.push(A);let[R,k,S,oe]=h.preprocess({root:A,init_env:_});_=R}c(x),u({roots:p,init_envs:f})})()},[]);let{roots:g,init_envs:y}=d;return g.length!=s.length||s.length!=y.length?o(O,{}):o(v.Fragment,{children:s.map((x,_)=>o(ot,{value:{BackendData:{BackendData:m,node_id:x}},children:o(at,{init_env:y[_],root:g[_],printer:h.get_printer()})},_))})}})})();let Mr={support:{\u5C0F\u8282\u7EBF:Wr,\u7AE0\u8282\u7EBF:Rr,\u56FE:Er,\u5C55\u793A\u5B50\u8282\u70B9:Tr,\u63D2\u5165\u5B50\u8282\u70B9:Nr}},zr=Vt({senario:"title",container:e=>{let{node:t,parameters:r,context:i,children:n}=e;return o(dt,{sx:{width:"auto",height:"auto",maxHeight:"80vh",overflow:"auto"},children:o(ne,{children:n})})}}),Ir={abstract:{\u7A46\u8A00:zr}},Vr={group:le,structure:le,support:le,abstract:le,paragraph:ut({}),inline:pt,text:ht},Xr={group:Oe.group,inline:Dr.inline,support:Mr.support,abstract:Ir.abstract,structure:Oe.structure};export{jr as C,Vr as d,Zr as f,Gr as m,ce as n,Kr as p,Xr as r};
