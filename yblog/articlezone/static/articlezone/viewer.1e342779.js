var $t=Object.defineProperty,_t=Object.defineProperties;var Tt=Object.getOwnPropertyDescriptors;var Ge=Object.getOwnPropertySymbols;var kt=Object.prototype.hasOwnProperty,Bt=Object.prototype.propertyIsEnumerable;var ze=(t,e,o)=>e in t?$t(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,fe=(t,e)=>{for(var o in e||(e={}))kt.call(e,o)&&ze(t,o,e[o]);if(Ge)for(var o of Ge(e))Bt.call(e,o)&&ze(t,o,e[o]);return t},Se=(t,e)=>_t(t,Tt(e));var he=(t,e,o)=>(ze(t,typeof e!="symbol"?e+"":e,o),o);import{j as l,r as c,b as C,a as v,F as ke,R as It}from"./jsx-runtime.71fbd6ab.js";import{h as be,g as me,a as ge,s as N,f as m,ax as W,_ as h,u as xe,b as oe,ay as Rt,d as ve,az as Be,e as B,aA as We,aB as at,at as it,au as Ee,aC as Ft,w as A,I as te,B as S,A as Ae,n as zt,o as Et,L as se,ar as we,aq as $e,a5 as De,a0 as st,T as ce,l as Je,p as Mt,v as _e,j as Ne,al as Lt,x as Pt,J as Wt,G as At,H as Nt,ag as Dt,E as Vt}from"./titleword.a6ed5a6e.js";import{n as Ht,w as Ot,E as Ut,b as Kt,S as Xt,l as Yt,M as jt,m as Qe}from"./theme.355d57d8.js";import{P as qt}from"./snackbar.2b8238f2.js";let ie;function ct(){if(ie)return ie;const t=document.createElement("div"),e=document.createElement("div");return e.style.width="10px",e.style.height="1px",t.appendChild(e),t.dir="rtl",t.style.fontSize="14px",t.style.width="4px",t.style.height="1px",t.style.position="absolute",t.style.top="-1000px",t.style.overflow="scroll",document.body.appendChild(t),ie="reverse",t.scrollLeft>0?ie="default":(t.scrollLeft=1,t.scrollLeft===0&&(ie="negative")),document.body.removeChild(t),ie}function Ze(t,e){const o=t.scrollLeft;if(e!=="rtl")return o;switch(ct()){case"negative":return t.scrollWidth-t.clientWidth+o;case"reverse":return t.scrollWidth-t.clientWidth-o;default:return o}}var Gt=be(l("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");function Jt(t){return me("MuiChip",t)}const Qt=ge("MuiChip",["root","sizeSmall","sizeMedium","colorPrimary","colorSecondary","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","focusVisible"]);var f=Qt;const Zt=["avatar","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant"],eo=t=>{const{classes:e,disabled:o,size:r,color:n,onDelete:a,clickable:s,variant:u}=t,g={root:["root",u,o&&"disabled",`size${m(r)}`,`color${m(n)}`,s&&"clickable",s&&`clickableColor${m(n)}`,a&&"deletable",a&&`deletableColor${m(n)}`,`${u}${m(n)}`],label:["label",`label${m(r)}`],avatar:["avatar",`avatar${m(r)}`,`avatarColor${m(n)}`],icon:["icon",`icon${m(r)}`,`iconColor${m(n)}`],deleteIcon:["deleteIcon",`deleteIcon${m(r)}`,`deleteIconColor${m(n)}`,`deleteIconOutlinedColor${m(n)}`]};return ve(g,Jt,e)},to=N("div",{name:"MuiChip",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t,{color:r,clickable:n,onDelete:a,size:s,variant:u}=o;return[{[`& .${f.avatar}`]:e.avatar},{[`& .${f.avatar}`]:e[`avatar${m(s)}`]},{[`& .${f.avatar}`]:e[`avatarColor${m(r)}`]},{[`& .${f.icon}`]:e.icon},{[`& .${f.icon}`]:e[`icon${m(s)}`]},{[`& .${f.icon}`]:e[`iconColor${m(r)}`]},{[`& .${f.deleteIcon}`]:e.deleteIcon},{[`& .${f.deleteIcon}`]:e[`deleteIcon${m(s)}`]},{[`& .${f.deleteIcon}`]:e[`deleteIconColor${m(r)}`]},{[`& .${f.deleteIcon}`]:e[`deleteIconOutlinedColor${m(r)}`]},e.root,e[`size${m(s)}`],e[`color${m(r)}`],n&&e.clickable,n&&r!=="default"&&e[`clickableColor${m(r)})`],a&&e.deletable,a&&r!=="default"&&e[`deletableColor${m(r)}`],e[u],u==="outlined"&&e[`outlined${m(r)}`]]}})(({theme:t,ownerState:e})=>{const o=W(t.palette.text.primary,.26);return h({maxWidth:"100%",fontFamily:t.typography.fontFamily,fontSize:t.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:t.palette.text.primary,backgroundColor:t.palette.action.selected,borderRadius:32/2,whiteSpace:"nowrap",transition:t.transitions.create(["background-color","box-shadow"]),cursor:"default",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box",[`&.${f.disabled}`]:{opacity:t.palette.action.disabledOpacity,pointerEvents:"none"},[`& .${f.avatar}`]:{marginLeft:5,marginRight:-6,width:24,height:24,color:t.palette.mode==="light"?t.palette.grey[700]:t.palette.grey[300],fontSize:t.typography.pxToRem(12)},[`& .${f.avatarColorPrimary}`]:{color:t.palette.primary.contrastText,backgroundColor:t.palette.primary.dark},[`& .${f.avatarColorSecondary}`]:{color:t.palette.secondary.contrastText,backgroundColor:t.palette.secondary.dark},[`& .${f.avatarSmall}`]:{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:t.typography.pxToRem(10)},[`& .${f.icon}`]:h({color:t.palette.mode==="light"?t.palette.grey[700]:t.palette.grey[300],marginLeft:5,marginRight:-6},e.size==="small"&&{fontSize:18,marginLeft:4,marginRight:-4},e.color!=="default"&&{color:"inherit"}),[`& .${f.deleteIcon}`]:h({WebkitTapHighlightColor:"transparent",color:o,fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:W(o,.4)}},e.size==="small"&&{fontSize:16,marginRight:4,marginLeft:-4},e.color!=="default"&&{color:W(t.palette[e.color].contrastText,.7),"&:hover, &:active":{color:t.palette[e.color].contrastText}})},e.size==="small"&&{height:24},e.color!=="default"&&{backgroundColor:t.palette[e.color].main,color:t.palette[e.color].contrastText},e.onDelete&&{[`&.${f.focusVisible}`]:{backgroundColor:W(t.palette.action.selected,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},e.onDelete&&e.color!=="default"&&{[`&.${f.focusVisible}`]:{backgroundColor:t.palette[e.color].dark}})},({theme:t,ownerState:e})=>h({},e.clickable&&{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:W(t.palette.action.selected,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity)},[`&.${f.focusVisible}`]:{backgroundColor:W(t.palette.action.selected,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)},"&:active":{boxShadow:t.shadows[1]}},e.clickable&&e.color!=="default"&&{[`&:hover, &.${f.focusVisible}`]:{backgroundColor:t.palette[e.color].dark}}),({theme:t,ownerState:e})=>h({},e.variant==="outlined"&&{backgroundColor:"transparent",border:`1px solid ${t.palette.mode==="light"?t.palette.grey[400]:t.palette.grey[700]}`,[`&.${f.clickable}:hover`]:{backgroundColor:t.palette.action.hover},[`&.${f.focusVisible}`]:{backgroundColor:t.palette.action.focus},[`& .${f.avatar}`]:{marginLeft:4},[`& .${f.avatarSmall}`]:{marginLeft:2},[`& .${f.icon}`]:{marginLeft:4},[`& .${f.iconSmall}`]:{marginLeft:2},[`& .${f.deleteIcon}`]:{marginRight:5},[`& .${f.deleteIconSmall}`]:{marginRight:3}},e.variant==="outlined"&&e.color!=="default"&&{color:t.palette[e.color].main,border:`1px solid ${W(t.palette[e.color].main,.7)}`,[`&.${f.clickable}:hover`]:{backgroundColor:W(t.palette[e.color].main,t.palette.action.hoverOpacity)},[`&.${f.focusVisible}`]:{backgroundColor:W(t.palette[e.color].main,t.palette.action.focusOpacity)},[`& .${f.deleteIcon}`]:{color:W(t.palette[e.color].main,.7),"&:hover, &:active":{color:t.palette[e.color].main}}})),oo=N("span",{name:"MuiChip",slot:"Label",overridesResolver:(t,e)=>{const{ownerState:o}=t,{size:r}=o;return[e.label,e[`label${m(r)}`]]}})(({ownerState:t})=>h({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},t.size==="small"&&{paddingLeft:8,paddingRight:8}));function et(t){return t.key==="Backspace"||t.key==="Delete"}const ro=c.exports.forwardRef(function(e,o){const r=xe({props:e,name:"MuiChip"}),{avatar:n,className:a,clickable:s,color:u="default",component:g,deleteIcon:y,disabled:w=!1,icon:$,label:I,onClick:E,onDelete:R,onKeyDown:L,onKeyUp:F,size:q="medium",variant:P="filled"}=r,de=oe(r,Zt),D=c.exports.useRef(null),V=Rt(D,o),X=x=>{x.stopPropagation(),R&&R(x)},H=x=>{x.currentTarget===x.target&&et(x)&&x.preventDefault(),L&&L(x)},G=x=>{x.currentTarget===x.target&&(R&&et(x)?R(x):x.key==="Escape"&&D.current&&D.current.blur()),F&&F(x)},O=s!==!1&&E?!0:s,U=q==="small",z=O||R?Be:g||"div",_=h({},r,{component:z,disabled:w,size:q,color:u,onDelete:!!R,clickable:O,variant:P}),T=eo(_),re=z===Be?h({component:g||"div",focusVisibleClassName:T.focusVisible},R&&{disableRipple:!0}):{};let J=null;if(R){const x=B(u!=="default"&&(P==="outlined"?T[`deleteIconOutlinedColor${m(u)}`]:T[`deleteIconColor${m(u)}`]),U&&T.deleteIconSmall);J=y&&c.exports.isValidElement(y)?c.exports.cloneElement(y,{className:B(y.props.className,T.deleteIcon,x),onClick:X}):l(Gt,{className:B(T.deleteIcon,x),onClick:X})}let le=null;n&&c.exports.isValidElement(n)&&(le=c.exports.cloneElement(n,{className:B(T.avatar,n.props.className)}));let Y=null;return $&&c.exports.isValidElement($)&&(Y=c.exports.cloneElement($,{className:B(T.icon,$.props.className)})),C(to,h({as:z,className:B(T.root,a),disabled:O&&w?!0:void 0,onClick:E,onKeyDown:H,onKeyUp:G,ref:V,ownerState:_},re,de,{children:[le||Y,l(oo,{className:B(T.label),ownerState:_,children:I}),J]}))});var dt=ro;function lo(t){return me("MuiTab",t)}const no=ge("MuiTab",["root","labelIcon","textColorInherit","textColorPrimary","textColorSecondary","selected","disabled","fullWidth","wrapped","iconWrapper"]);var ee=no;const ao=["className","disabled","disableFocusRipple","fullWidth","icon","iconPosition","indicator","label","onChange","onClick","onFocus","selected","selectionFollowsFocus","textColor","value","wrapped"],io=t=>{const{classes:e,textColor:o,fullWidth:r,wrapped:n,icon:a,label:s,selected:u,disabled:g}=t,y={root:["root",a&&s&&"labelIcon",`textColor${m(o)}`,r&&"fullWidth",n&&"wrapped",u&&"selected",g&&"disabled"],iconWrapper:["iconWrapper"]};return ve(y,lo,e)},so=N(Be,{name:"MuiTab",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,o.label&&o.icon&&e.labelIcon,e[`textColor${m(o.textColor)}`],o.fullWidth&&e.fullWidth,o.wrapped&&e.wrapped]}})(({theme:t,ownerState:e})=>h({},t.typography.button,{maxWidth:360,minWidth:90,position:"relative",minHeight:48,flexShrink:0,padding:"12px 16px",overflow:"hidden",whiteSpace:"normal",textAlign:"center"},e.label&&{flexDirection:e.iconPosition==="top"||e.iconPosition==="bottom"?"column":"row"},{lineHeight:1.25},e.icon&&e.label&&{minHeight:72,paddingTop:9,paddingBottom:9,[`& > .${ee.iconWrapper}`]:h({},e.iconPosition==="top"&&{marginBottom:6},e.iconPosition==="bottom"&&{marginTop:6},e.iconPosition==="start"&&{marginRight:t.spacing(1)},e.iconPosition==="end"&&{marginLeft:t.spacing(1)})},e.textColor==="inherit"&&{color:"inherit",opacity:.6,[`&.${ee.selected}`]:{opacity:1},[`&.${ee.disabled}`]:{opacity:t.palette.action.disabledOpacity}},e.textColor==="primary"&&{color:t.palette.text.secondary,[`&.${ee.selected}`]:{color:t.palette.primary.main},[`&.${ee.disabled}`]:{color:t.palette.text.disabled}},e.textColor==="secondary"&&{color:t.palette.text.secondary,[`&.${ee.selected}`]:{color:t.palette.secondary.main},[`&.${ee.disabled}`]:{color:t.palette.text.disabled}},e.fullWidth&&{flexShrink:1,flexGrow:1,flexBasis:0,maxWidth:"none"},e.wrapped&&{fontSize:t.typography.pxToRem(12)})),co=c.exports.forwardRef(function(e,o){const r=xe({props:e,name:"MuiTab"}),{className:n,disabled:a=!1,disableFocusRipple:s=!1,fullWidth:u,icon:g,iconPosition:y="top",indicator:w,label:$,onChange:I,onClick:E,onFocus:R,selected:L,selectionFollowsFocus:F,textColor:q="inherit",value:P,wrapped:de=!1}=r,D=oe(r,ao),V=h({},r,{disabled:a,disableFocusRipple:s,selected:L,icon:!!g,iconPosition:y,label:!!$,fullWidth:u,textColor:q,wrapped:de}),X=io(V),H=g&&$&&c.exports.isValidElement(g)?c.exports.cloneElement(g,{className:B(X.iconWrapper,g.props.className)}):g,G=U=>{!L&&I&&I(U,P),E&&E(U)},O=U=>{F&&!L&&I&&I(U,P),R&&R(U)};return C(so,h({focusRipple:!s,className:B(X.root,n),ref:o,role:"tab","aria-selected":L,disabled:a,onClick:G,onFocus:O,ownerState:V,tabIndex:L?0:-1},D,{children:[y==="top"||y==="start"?C(c.exports.Fragment,{children:[H,$]}):C(c.exports.Fragment,{children:[$,H]}),w]}))});var Me=co,uo=be(l("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"}),"KeyboardArrowLeft"),po=be(l("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),"KeyboardArrowRight");function fo(t){return(1+Math.sin(Math.PI*t-Math.PI/2))/2}function ho(t,e,o,r={},n=()=>{}){const{ease:a=fo,duration:s=300}=r;let u=null;const g=e[t];let y=!1;const w=()=>{y=!0},$=I=>{if(y){n(new Error("Animation cancelled"));return}u===null&&(u=I);const E=Math.min(1,(I-u)/s);if(e[t]=a(E)*(o-g)+g,E>=1){requestAnimationFrame(()=>{n(null)});return}requestAnimationFrame($)};return g===o?(n(new Error("Element already at target position")),w):(requestAnimationFrame($),w)}const bo=["onChange"],mo={width:99,height:99,position:"absolute",top:-9999,overflow:"scroll"};function go(t){const{onChange:e}=t,o=oe(t,bo),r=c.exports.useRef(),n=c.exports.useRef(null),a=()=>{r.current=n.current.offsetHeight-n.current.clientHeight};return c.exports.useEffect(()=>{const s=We(()=>{const g=r.current;a(),g!==r.current&&e(r.current)}),u=at(n.current);return u.addEventListener("resize",s),()=>{s.clear(),u.removeEventListener("resize",s)}},[e]),c.exports.useEffect(()=>{a(),e(r.current)},[e]),l("div",h({style:mo,ref:n},o))}function xo(t){return me("MuiTabScrollButton",t)}const vo=ge("MuiTabScrollButton",["root","vertical","horizontal","disabled"]);var Co=vo,tt,ot;const yo=["className","direction","orientation","disabled"],So=t=>{const{classes:e,orientation:o,disabled:r}=t;return ve({root:["root",o,r&&"disabled"]},xo,e)},wo=N(Be,{name:"MuiTabScrollButton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,o.orientation&&e[o.orientation]]}})(({ownerState:t})=>h({width:40,flexShrink:0,opacity:.8,[`&.${Co.disabled}`]:{opacity:0}},t.orientation==="vertical"&&{width:"100%",height:40,"& svg":{transform:`rotate(${t.isRtl?-90:90}deg)`}})),$o=c.exports.forwardRef(function(e,o){const r=xe({props:e,name:"MuiTabScrollButton"}),{className:n,direction:a}=r,s=oe(r,yo),g=it().direction==="rtl",y=h({isRtl:g},r),w=So(y);return l(wo,h({component:"div",className:B(w.root,n),ref:o,role:null,ownerState:y,tabIndex:null},s,{children:a==="left"?tt||(tt=l(uo,{fontSize:"small"})):ot||(ot=l(po,{fontSize:"small"}))}))});var _o=$o;function To(t){return me("MuiTabs",t)}const ko=ge("MuiTabs",["root","vertical","flexContainer","flexContainerVertical","centered","scroller","fixed","scrollableX","scrollableY","hideScrollbar","scrollButtons","scrollButtonsHideMobile","indicator"]);var Le=ko;const Bo=["aria-label","aria-labelledby","action","centered","children","className","component","allowScrollButtonsMobile","indicatorColor","onChange","orientation","ScrollButtonComponent","scrollButtons","selectionFollowsFocus","TabIndicatorProps","TabScrollButtonProps","textColor","value","variant","visibleScrollbar"],rt=(t,e)=>t===e?t.firstChild:e&&e.nextElementSibling?e.nextElementSibling:t.firstChild,lt=(t,e)=>t===e?t.lastChild:e&&e.previousElementSibling?e.previousElementSibling:t.lastChild,Te=(t,e,o)=>{let r=!1,n=o(t,e);for(;n;){if(n===t.firstChild){if(r)return;r=!0}const a=n.disabled||n.getAttribute("aria-disabled")==="true";if(!n.hasAttribute("tabindex")||a)n=o(t,n);else{n.focus();return}}},Io=t=>{const{vertical:e,fixed:o,hideScrollbar:r,scrollableX:n,scrollableY:a,centered:s,scrollButtonsHideMobile:u,classes:g}=t;return ve({root:["root",e&&"vertical"],scroller:["scroller",o&&"fixed",r&&"hideScrollbar",n&&"scrollableX",a&&"scrollableY"],flexContainer:["flexContainer",e&&"flexContainerVertical",s&&"centered"],indicator:["indicator"],scrollButtons:["scrollButtons",u&&"scrollButtonsHideMobile"],scrollableX:[n&&"scrollableX"],hideScrollbar:[r&&"hideScrollbar"]},To,g)},Ro=N("div",{name:"MuiTabs",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[{[`& .${Le.scrollButtons}`]:e.scrollButtons},{[`& .${Le.scrollButtons}`]:o.scrollButtonsHideMobile&&e.scrollButtonsHideMobile},e.root,o.vertical&&e.vertical]}})(({ownerState:t,theme:e})=>h({overflow:"hidden",minHeight:48,WebkitOverflowScrolling:"touch",display:"flex"},t.vertical&&{flexDirection:"column"},t.scrollButtonsHideMobile&&{[`& .${Le.scrollButtons}`]:{[e.breakpoints.down("sm")]:{display:"none"}}})),Fo=N("div",{name:"MuiTabs",slot:"Scroller",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.scroller,o.fixed&&e.fixed,o.hideScrollbar&&e.hideScrollbar,o.scrollableX&&e.scrollableX,o.scrollableY&&e.scrollableY]}})(({ownerState:t})=>h({position:"relative",display:"inline-block",flex:"1 1 auto",whiteSpace:"nowrap"},t.fixed&&{overflowX:"hidden",width:"100%"},t.hideScrollbar&&{scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},t.scrollableX&&{overflowX:"auto",overflowY:"hidden"},t.scrollableY&&{overflowY:"auto",overflowX:"hidden"})),zo=N("div",{name:"MuiTabs",slot:"FlexContainer",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.flexContainer,o.vertical&&e.flexContainerVertical,o.centered&&e.centered]}})(({ownerState:t})=>h({display:"flex"},t.vertical&&{flexDirection:"column"},t.centered&&{justifyContent:"center"})),Eo=N("span",{name:"MuiTabs",slot:"Indicator",overridesResolver:(t,e)=>e.indicator})(({ownerState:t,theme:e})=>h({position:"absolute",height:2,bottom:0,width:"100%",transition:e.transitions.create()},t.indicatorColor==="primary"&&{backgroundColor:e.palette.primary.main},t.indicatorColor==="secondary"&&{backgroundColor:e.palette.secondary.main},t.vertical&&{height:"100%",width:2,right:0})),Mo=N(go,{name:"MuiTabs",slot:"ScrollbarSize"})({overflowX:"auto",overflowY:"hidden",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),nt={},Lo=c.exports.forwardRef(function(e,o){const r=xe({props:e,name:"MuiTabs"}),n=it(),a=n.direction==="rtl",{"aria-label":s,"aria-labelledby":u,action:g,centered:y=!1,children:w,className:$,component:I="div",allowScrollButtonsMobile:E=!1,indicatorColor:R="primary",onChange:L,orientation:F="horizontal",ScrollButtonComponent:q=_o,scrollButtons:P="auto",selectionFollowsFocus:de,TabIndicatorProps:D={},TabScrollButtonProps:V={},textColor:X="primary",value:H,variant:G="standard",visibleScrollbar:O=!1}=r,U=oe(r,Bo),z=G==="scrollable",_=F==="vertical",T=_?"scrollTop":"scrollLeft",re=_?"top":"left",J=_?"bottom":"right",le=_?"clientHeight":"clientWidth",Y=_?"height":"width",x=h({},r,{component:I,allowScrollButtonsMobile:E,indicatorColor:R,orientation:F,vertical:_,scrollButtons:P,textColor:X,variant:G,visibleScrollbar:O,fixed:!z,hideScrollbar:z&&!O,scrollableX:z&&!_,scrollableY:z&&_,centered:y&&!z,scrollButtonsHideMobile:!E}),j=Io(x),[Ve,bt]=c.exports.useState(!1),[Q,He]=c.exports.useState(nt),[ne,mt]=c.exports.useState({start:!1,end:!1}),[Oe,gt]=c.exports.useState({overflow:"hidden",scrollbarWidth:0}),Ue=new Map,K=c.exports.useRef(null),ue=c.exports.useRef(null),Ke=()=>{const i=K.current;let d;if(i){const b=i.getBoundingClientRect();d={clientWidth:i.clientWidth,scrollLeft:i.scrollLeft,scrollTop:i.scrollTop,scrollLeftNormalized:Ze(i,n.direction),scrollWidth:i.scrollWidth,top:b.top,bottom:b.bottom,left:b.left,right:b.right}}let p;if(i&&H!==!1){const b=ue.current.children;if(b.length>0){const k=b[Ue.get(H)];p=k?k.getBoundingClientRect():null}}return{tabsMeta:d,tabMeta:p}},pe=Ee(()=>{const{tabsMeta:i,tabMeta:d}=Ke();let p=0,b;if(_)b="top",d&&i&&(p=d.top-i.top+i.scrollTop);else if(b=a?"right":"left",d&&i){const M=a?i.scrollLeftNormalized+i.clientWidth-i.scrollWidth:i.scrollLeft;p=(a?-1:1)*(d[b]-i[b]+M)}const k={[b]:p,[Y]:d?d[Y]:0};if(isNaN(Q[b])||isNaN(Q[Y]))He(k);else{const M=Math.abs(Q[b]-k[b]),ae=Math.abs(Q[Y]-k[Y]);(M>=1||ae>=1)&&He(k)}}),Ie=(i,{animation:d=!0}={})=>{d?ho(T,K.current,i,{duration:n.transitions.duration.standard}):K.current[T]=i},Xe=i=>{let d=K.current[T];_?d+=i:(d+=i*(a?-1:1),d*=a&&ct()==="reverse"?-1:1),Ie(d)},Ye=()=>{const i=K.current[le];let d=0;const p=Array.from(ue.current.children);for(let b=0;b<p.length;b+=1){const k=p[b];if(d+k[le]>i)break;d+=k[le]}return d},xt=()=>{Xe(-1*Ye())},vt=()=>{Xe(Ye())},Ct=c.exports.useCallback(i=>{gt({overflow:null,scrollbarWidth:i})},[]),yt=()=>{const i={};i.scrollbarSizeListener=z?l(Mo,{onChange:Ct,className:B(j.scrollableX,j.hideScrollbar)}):null;const d=ne.start||ne.end,p=z&&(P==="auto"&&d||P===!0);return i.scrollButtonStart=p?l(q,h({orientation:F,direction:a?"right":"left",onClick:xt,disabled:!ne.start},V,{className:B(j.scrollButtons,V.className)})):null,i.scrollButtonEnd=p?l(q,h({orientation:F,direction:a?"left":"right",onClick:vt,disabled:!ne.end},V,{className:B(j.scrollButtons,V.className)})):null,i},je=Ee(i=>{const{tabsMeta:d,tabMeta:p}=Ke();if(!(!p||!d)){if(p[re]<d[re]){const b=d[T]+(p[re]-d[re]);Ie(b,{animation:i})}else if(p[J]>d[J]){const b=d[T]+(p[J]-d[J]);Ie(b,{animation:i})}}}),Z=Ee(()=>{if(z&&P!==!1){const{scrollTop:i,scrollHeight:d,clientHeight:p,scrollWidth:b,clientWidth:k}=K.current;let M,ae;if(_)M=i>1,ae=i<d-p-1;else{const ye=Ze(K.current,n.direction);M=a?ye<b-k-1:ye>1,ae=a?ye>1:ye<b-k-1}(M!==ne.start||ae!==ne.end)&&mt({start:M,end:ae})}});c.exports.useEffect(()=>{const i=We(()=>{pe(),Z()}),d=at(K.current);d.addEventListener("resize",i);let p;return typeof ResizeObserver!="undefined"&&(p=new ResizeObserver(i),Array.from(ue.current.children).forEach(b=>{p.observe(b)})),()=>{i.clear(),d.removeEventListener("resize",i),p&&p.disconnect()}},[pe,Z]);const Re=c.exports.useMemo(()=>We(()=>{Z()}),[Z]);c.exports.useEffect(()=>()=>{Re.clear()},[Re]),c.exports.useEffect(()=>{bt(!0)},[]),c.exports.useEffect(()=>{pe(),Z()}),c.exports.useEffect(()=>{je(nt!==Q)},[je,Q]),c.exports.useImperativeHandle(g,()=>({updateIndicator:pe,updateScrollButtons:Z}),[pe,Z]);const qe=l(Eo,h({},D,{className:B(j.indicator,D.className),ownerState:x,style:h({},Q,D.style)}));let Ce=0;const St=c.exports.Children.map(w,i=>{if(!c.exports.isValidElement(i))return null;const d=i.props.value===void 0?Ce:i.props.value;Ue.set(d,Ce);const p=d===H;return Ce+=1,c.exports.cloneElement(i,h({fullWidth:G==="fullWidth",indicator:p&&!Ve&&qe,selected:p,selectionFollowsFocus:de,onChange:L,textColor:X,value:d},Ce===1&&H===!1&&!i.props.tabIndex?{tabIndex:0}:{}))}),wt=i=>{const d=ue.current,p=Ft(d).activeElement;if(p.getAttribute("role")!=="tab")return;let k=F==="horizontal"?"ArrowLeft":"ArrowUp",M=F==="horizontal"?"ArrowRight":"ArrowDown";switch(F==="horizontal"&&a&&(k="ArrowRight",M="ArrowLeft"),i.key){case k:i.preventDefault(),Te(d,p,lt);break;case M:i.preventDefault(),Te(d,p,rt);break;case"Home":i.preventDefault(),Te(d,null,rt);break;case"End":i.preventDefault(),Te(d,null,lt);break}},Fe=yt();return C(Ro,h({className:B(j.root,$),ownerState:x,ref:o,as:I},U,{children:[Fe.scrollButtonStart,Fe.scrollbarSizeListener,C(Fo,{className:j.scroller,ownerState:x,style:{overflow:Oe.overflow,[_?`margin${a?"Left":"Right"}`:"marginBottom"]:O?void 0:-Oe.scrollbarWidth},ref:K,onScroll:Re,children:[l(zo,{"aria-label":s,"aria-labelledby":u,"aria-orientation":F==="vertical"?"vertical":null,className:j.flexContainer,ownerState:x,onKeyDown:wt,ref:ue,role:"tablist",children:St}),Ve&&qe]}),Fe.scrollButtonEnd]}))});var Po=Lo,Wo=be(l("path",{d:"m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"}),"ArrowDownward"),Ao=be(l("path",{d:"m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"}),"ArrowUpward");const ut=c.exports.createContext(null);function No(){const[t,e]=c.exports.useState(null);return c.exports.useEffect(()=>{e(`mui-p-${Math.round(Math.random()*1e5)}`)},[]),t}function Do(t){const{children:e,value:o}=t,r=No(),n=c.exports.useMemo(()=>({idPrefix:r,value:o}),[r,o]);return l(ut.Provider,{value:n,children:e})}function pt(){return c.exports.useContext(ut)}function ft(t,e){const{idPrefix:o}=t;return o===null?null:`${t.idPrefix}-P-${e}`}function ht(t,e){const{idPrefix:o}=t;return o===null?null:`${t.idPrefix}-T-${e}`}const Vo=["children"],Ho=c.exports.forwardRef(function(e,o){const{children:r}=e,n=oe(e,Vo),a=pt();if(a===null)throw new TypeError("No TabContext provided");const s=c.exports.Children.map(r,u=>c.exports.isValidElement(u)?c.exports.cloneElement(u,{"aria-controls":ft(a,u.props.value),id:ht(a,u.props.value)}):null);return l(Po,h({},n,{ref:o,value:a.value,children:s}))});var Oo=Ho;function Uo(t){return me("MuiTabPanel",t)}ge("MuiTabPanel",["root"]);const Ko=["children","className","value"],Xo=t=>{const{classes:e}=t;return ve({root:["root"]},Uo,e)},Yo=N("div",{name:"MuiTabPanel",slot:"Root",overridesResolver:(t,e)=>e.root})(({theme:t})=>({padding:t.spacing(3)})),jo=c.exports.forwardRef(function(e,o){const r=xe({props:e,name:"MuiTabPanel"}),{children:n,className:a,value:s}=r,u=oe(r,Ko),g=h({},r),y=Xo(g),w=pt();if(w===null)throw new TypeError("No TabContext provided");const $=ft(w,s),I=ht(w,s);return l(Yo,h({"aria-labelledby":I,className:B(y.root,a),hidden:s!==w.value,id:$,ref:o,role:"tabpanel",ownerState:g},u,{children:s===w.value&&n}))});var Pe=jo;class qo extends v.Component{constructor(e){super(e);this.state={father_id:A.node_id,son_ids:[]}}async set_father_id(e){let o=await te.get.son_ids(e);this.setState({father_id:e,son_ids:o})}async componentDidMount(){this.set_father_id(A.node_id)}WordsWithButton(e){let o=e.icon;return l(S,{sx:{marginTop:"0.5rem"},children:C(Ae,{children:[o?l(zt,{title:e.title,children:l(Et,{size:"small",sx:{height:"0.9rem",marginY:"auto"},onClick:e.onClick,children:l(o,{sx:{fontSize:"0.9rem"}})})}):l(ke,{}),l(se,{sx:r=>({fontSize:"0.9rem"}),underline:"hover",href:e.url,children:e.words})]})})}SubnodeItem(e){let o=this,r=e.node_id,[n,a]=v.useState(!0),s=this.WordsWithButton.bind(this);return v.useEffect(()=>{(async()=>{let u=await te.get.son_ids(r);a(u.length>0)})()}),l(v.Fragment,{children:n?l(s,{words:l(we,{node_id:r}),title:"\u4E0B\u884C",onClick:()=>o.set_father_id(r),icon:Wo,url:$e.view.content(r)}):l(s,{words:l(we,{node_id:r}),url:$e.view.content(r)})})}FathernodeItem(e){let o=this,r=e.node_id,n=this.WordsWithButton.bind(this),[a,s]=v.useState(-1);return v.useEffect(()=>{(async()=>s(await te.get.father_id(r)))()}),l(v.Fragment,{children:a>0?l(n,{words:l(we,{node_id:r}),title:"\u4E0A\u884C",onClick:()=>o.set_father_id(a),icon:Ao,url:$e.view.content(r)}):l(n,{words:l(we,{node_id:r}),url:$e.view.content(r)})})}render(){let e=this.state.father_id,o=this.state.son_ids,r=this.FathernodeItem.bind(this),n=this.SubnodeItem.bind(this);return l(S,{sx:{marginTop:"0.5rem"},children:C(Ae,{force_direction:"column",children:[l(r,{node_id:e}),l(S,{sx:{marginLeft:a=>a.printer.margins.level},children:o.map((a,s)=>l(v.Fragment,{children:l(n,{node_id:a})},s))})]})})}}class Go extends v.Component{constructor(e){super(e);this.state={create_time:void 0,modify_time:void 0}}async componentDidMount(){let e=await te.get.create_time();this.setState({create_time:e.create_time,modify_time:e.modify_time})}render(){let e=this,o=De(this.props.root,"title"),r=n=>C(S,{sx:a=>({marginBottom:"1rem"}),children:[l(ce,{color:"text.secondary",sx:{marginRight:a=>a.printer.margins.colon,fontSize:"0.5rem",display:"inline-block"},children:n.title}),l(ce,{sx:{fontSize:"0.8rem",display:"inline-block"},children:n.content})]});return C(v.Fragment,{children:[l(r,{title:"\u9898\u76EE",content:`${o}`}),l(r,{title:"\u521B\u5EFA\u65F6\u95F4",content:e.state.create_time}),l(r,{title:"\u4FEE\u6539\u65F6\u95F4",content:e.state.modify_time})]})}}class Jo extends v.Component{constructor(e){super(e)}render(){return C(S,{sx:e=>fe({},e.printer.typography.body),children:[l(Go,{root:this.props.root}),l(st,{sx:{fontSize:"0.8rem"},children:l(dt,{sx:{fontSize:"0.8rem"},label:"\u5BFC\u822A"})}),l(qo,{})]})}}class Qo extends v.Component{constructor(e){super(e);this.state={comments:[]}}async update(){let e=await te.get.comments();e=e.reverse(),this.setState({comments:e})}async componentDidMount(){await this.update()}render(){let e=this,o=r=>C(S,{sx:{marginBottom:"1rem",marginX:"0.5rem"},children:[l(ce,{sx:{marginLeft:"0.5rem",fontSize:"0.9rem"},children:r.content}),C(ce,{sx:{textAlign:"right",marginTop:"0.5rem",fontSize:"0.9rem"},children:["\u2014\u2014",r.name]})]});return l(v.Fragment,{children:e.state.comments.map((r,n)=>{let[a,s]=r;return l(o,{name:s,content:a},n)})})}}class Zo extends v.Component{constructor(e){super(e);this.state={content:"",name:"",snakerbar_open:!1,status:!1}}async submit(){let e=this,o=!1;e.state.content&&(o=await te.post.comments({content:e.state.content,name:e.state.name})),e.setState({status:o,snakerbar_open:!0}),o&&(e.props.onRenew(),e.setState({content:"",name:""}))}render(){let e=this;return C(v.Fragment,{children:[l(Je,{label:"\u7559\u8A00",placeholder:"\u8BF4\u70B9\u5565",multiline:!0,onChange:o=>{e.setState({content:o.target.value})},variant:"outlined",fullWidth:!0,minRows:4,sx:{marginTop:"2rem"},value:e.state.content}),l(Je,{label:"\u79F0\u547C",placeholder:"\u4F60\u662F\u8C01\uFF1F",onChange:o=>{e.setState({name:o.target.value})},variant:"standard",fullWidth:!0,sx:{marginTop:"0.5rem"},value:e.state.name}),l(S,{sx:{textAlign:"right",marginTop:"1rem"},children:l(Mt,{variant:"outlined",onClick:()=>e.submit(),children:"\u65B0\u5EFA\u7559\u8A00"})}),l(qt,{info_sucess:"\u63D0\u4EA4\u6210\u529F",info_fail:"\u63D0\u4EA4\u5931\u8D25",open:e.state.snakerbar_open,status:e.state.status,onClose:()=>e.setState({snakerbar_open:!1})})]})}}class er extends v.Component{constructor(e){super(e);he(this,"comment_ref");this.comment_ref=v.createRef()}render(){let e=this;return C(S,{sx:o=>Se(fe({},o.printer.typography.structure),{overflowY:"auto",position:"absolute",top:"5%",bottom:"2%",left:"0",right:"0",paddingX:"1rem"}),children:[l(Zo,{onRenew:()=>{e.comment_ref&&e.comment_ref.current&&e.comment_ref.current.update()}}),l(st,{sx:{marginTop:"3rem"},children:l(dt,{sx:{fontSize:"0.8rem"},label:"\u7559\u8A00\u5217\u8868"})}),l(Qo,{ref:e.comment_ref})]})}}class tr extends v.Component{constructor(e){super(e)}render(){return l(S,{children:C(Ae,{force_direction:"column",children:[l(se,{underline:"hover",href:_e(`/edit/content/${A.node_id}`),children:"\u7F16\u8F91\u5185\u5BB9"}),l(se,{underline:"hover",href:_e(`/edit/structure/${A.node_id}`),children:"\u7F16\u8F91\u5B50\u8282\u70B9\u6811"}),l(se,{underline:"hover",href:_e(`/edit/shallow_structure/${A.node_id}`),children:"\uFF08\u6D45\uFF09\u7F16\u8F91\u5B50\u8282\u70B9\u6811"}),l(se,{underline:"hover",href:_e(`/admin/articlezone/node/add/?father_id=${A.node_id}`),children:"\u65B0\u5EFA\u5B50\u8282\u70B9"})]})})}}function or(t){const[e,o]=v.useState("1");return l(Do,{value:e,children:C(S,{sx:{height:"100%"},children:[C(Oo,{onChange:(r,n)=>o(n),variant:"scrollable",scrollButtons:"auto",children:[l(Me,{label:"\u57FA\u672C",value:"1"}),l(Me,{label:"\u7559\u8A00",value:"2"}),A.logged_in?l(Me,{label:"\u7F16\u8F91",value:"3"}):l(ke,{})]}),l(Pe,{value:"1",children:l(Jo,{root:t.root})}),l(Pe,{value:"2",children:l(er,{})}),A.logged_in?l(Pe,{value:"3",children:l(tr,{})}):l(ke,{})]})})}function rr(t){let e=[];for(let[o,r]of Lt.descendants(t))(Ne(o,"support","\u5C0F\u8282\u7EBF")||Ne(o,"support","\u7AE0\u8282\u7EBF"))&&e.push([o,r]);return e}function lr(t){let e=rr(t.root);return C(S,{sx:o=>Se(fe({},o.printer.typography.body),{position:"relative",top:"30%"}),children:[l(ce,{color:"text.secondary",sx:o=>Se(fe({},o.printer.typography.body),{fontSize:"0.9rem"}),children:"\u7AE0\u5185\u76EE\u5F55"}),e.map((o,r)=>{let[n,a]=o,s=l(ke,{children:"\u7AE0\u8282"});return Ne(n,"support","\u5C0F\u8282\u7EBF")&&(s=C(v.Fragment,{children:[l(S,{component:"span",sx:{marginRight:"1rem"},children:Ht(Number(r)+1)}),l(S,{component:"span",children:De(n,"title")})]})),l(S,{sx:{marginTop:"0.2rem"},children:l(se,{component:"button",underline:"hover",onClick:u=>{t.onScroll(a)},children:l(ce,{sx:{fontSize:"0.8rem"},children:s})})},r)})]})}class nr extends v.Component{constructor(e){super(e);he(this,"core");he(this,"printer_renderers");he(this,"printer_ref");this.core=Ot(new Ut([])),this.printer_renderers=Kt(new Xt(this.core,Pt)),this.printer_ref=v.createRef(),this.state={root:Wt("root",{title:{val:"",type:"string"}})}}get_printer(){if(this.printer_ref&&this.printer_ref.current)return this.printer_ref.current.get_printer()}async componentDidMount(){var e=await te.get.content();for(this.setState({root:e});!this.get_printer(););let o=this.get_printer();o.update(e),A.linkto&&Yt(o,Number(A.linkto))}render(){let e=this;return l(jt,{children:C(At,{theme:Nt(Qe),children:[l(S,{sx:{position:"absolute",top:"2%",left:"1%",height:"96%",width:"17%"},children:l(or,{root:e.state.root})}),C(S,{sx:{position:"absolute",top:"2%",left:"20%",height:"96%",width:"60%",display:"flex"},children:[l(S,{sx:{position:"absolute",width:"98%",left:"1%",top:"1%",height:"3%"},children:l(Dt,{sx:{textAlign:"center"},children:De(e.state.root,"title")})}),l(S,{sx:{position:"absolute",width:"98%",left:"1%",top:"5%",height:"94%"},children:l(Vt,{ref:e.printer_ref,core:this.core,renderers:this.printer_renderers,theme:Qe})})]}),l(S,{sx:{position:"absolute",top:"2%",left:"81%",height:"96%",width:"17%"},children:l(lr,{root:e.state.root,onScroll:o=>{let r=this.get_printer();r&&r.scroll_to(o)}})})]})})}}It.render(l(v.StrictMode,{children:l(nr,{})}),document.getElementById("root"));
