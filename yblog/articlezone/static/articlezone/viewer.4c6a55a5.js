var wt=Object.defineProperty,$t=Object.defineProperties;var Tt=Object.getOwnPropertyDescriptors;var Ue=Object.getOwnPropertySymbols;var _t=Object.prototype.hasOwnProperty,kt=Object.prototype.propertyIsEnumerable;var Be=(t,e,o)=>e in t?wt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,ue=(t,e)=>{for(var o in e||(e={}))_t.call(e,o)&&Be(t,o,e[o]);if(Ue)for(var o of Ue(e))kt.call(e,o)&&Be(t,o,e[o]);return t},Ce=(t,e)=>$t(t,Tt(e));var pe=(t,e,o)=>(Be(t,typeof e!="symbol"?e+"":e,o),o);import{j as l,r as c,b as y,a as v,F as rt,R as It}from"./jsx-runtime.71fbd6ab.js";import{h as fe,g as he,a as be,s as A,f as m,O as W,_ as h,u as me,b as te,R as Bt,d as ge,av as $e,e as I,aw as Ee,ax as lt,ay as nt,az as Re,aA as Rt,y as Te,I as ee,B as S,A as Ke,o as zt,p as Et,au as ye,a8 as Fe,a3 as at,T as ie,l as Xe,q as Mt,n as Ft,j as Me,ao as Lt,w as Pt,J as Wt,G as At,H as Nt,aj as Dt,E as Ot}from"./snackbar.77ab0d8e.js";import{L as it,n as Vt,w as Ht,E as Ut,b as Kt,S as Xt,l as Yt,M as jt,m as Ye}from"./theme.8e11c915.js";import{T as Se}from"./titleword.cfebbf02.js";let ae;function st(){if(ae)return ae;const t=document.createElement("div"),e=document.createElement("div");return e.style.width="10px",e.style.height="1px",t.appendChild(e),t.dir="rtl",t.style.fontSize="14px",t.style.width="4px",t.style.height="1px",t.style.position="absolute",t.style.top="-1000px",t.style.overflow="scroll",document.body.appendChild(t),ae="reverse",t.scrollLeft>0?ae="default":(t.scrollLeft=1,t.scrollLeft===0&&(ae="negative")),document.body.removeChild(t),ae}function je(t,e){const o=t.scrollLeft;if(e!=="rtl")return o;switch(st()){case"negative":return t.scrollWidth-t.clientWidth+o;case"reverse":return t.scrollWidth-t.clientWidth-o;default:return o}}var qt=fe(l("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");function Gt(t){return he("MuiChip",t)}const Jt=be("MuiChip",["root","sizeSmall","sizeMedium","colorPrimary","colorSecondary","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","focusVisible"]);var f=Jt;const Qt=["avatar","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant"],Zt=t=>{const{classes:e,disabled:o,size:r,color:n,onDelete:a,clickable:s,variant:u}=t,g={root:["root",u,o&&"disabled",`size${m(r)}`,`color${m(n)}`,s&&"clickable",s&&`clickableColor${m(n)}`,a&&"deletable",a&&`deletableColor${m(n)}`,`${u}${m(n)}`],label:["label",`label${m(r)}`],avatar:["avatar",`avatar${m(r)}`,`avatarColor${m(n)}`],icon:["icon",`icon${m(r)}`,`iconColor${m(n)}`],deleteIcon:["deleteIcon",`deleteIcon${m(r)}`,`deleteIconColor${m(n)}`,`deleteIconOutlinedColor${m(n)}`]};return ge(g,Gt,e)},eo=A("div",{name:"MuiChip",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t,{color:r,clickable:n,onDelete:a,size:s,variant:u}=o;return[{[`& .${f.avatar}`]:e.avatar},{[`& .${f.avatar}`]:e[`avatar${m(s)}`]},{[`& .${f.avatar}`]:e[`avatarColor${m(r)}`]},{[`& .${f.icon}`]:e.icon},{[`& .${f.icon}`]:e[`icon${m(s)}`]},{[`& .${f.icon}`]:e[`iconColor${m(r)}`]},{[`& .${f.deleteIcon}`]:e.deleteIcon},{[`& .${f.deleteIcon}`]:e[`deleteIcon${m(s)}`]},{[`& .${f.deleteIcon}`]:e[`deleteIconColor${m(r)}`]},{[`& .${f.deleteIcon}`]:e[`deleteIconOutlinedColor${m(r)}`]},e.root,e[`size${m(s)}`],e[`color${m(r)}`],n&&e.clickable,n&&r!=="default"&&e[`clickableColor${m(r)})`],a&&e.deletable,a&&r!=="default"&&e[`deletableColor${m(r)}`],e[u],u==="outlined"&&e[`outlined${m(r)}`]]}})(({theme:t,ownerState:e})=>{const o=W(t.palette.text.primary,.26);return h({maxWidth:"100%",fontFamily:t.typography.fontFamily,fontSize:t.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:t.palette.text.primary,backgroundColor:t.palette.action.selected,borderRadius:32/2,whiteSpace:"nowrap",transition:t.transitions.create(["background-color","box-shadow"]),cursor:"default",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box",[`&.${f.disabled}`]:{opacity:t.palette.action.disabledOpacity,pointerEvents:"none"},[`& .${f.avatar}`]:{marginLeft:5,marginRight:-6,width:24,height:24,color:t.palette.mode==="light"?t.palette.grey[700]:t.palette.grey[300],fontSize:t.typography.pxToRem(12)},[`& .${f.avatarColorPrimary}`]:{color:t.palette.primary.contrastText,backgroundColor:t.palette.primary.dark},[`& .${f.avatarColorSecondary}`]:{color:t.palette.secondary.contrastText,backgroundColor:t.palette.secondary.dark},[`& .${f.avatarSmall}`]:{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:t.typography.pxToRem(10)},[`& .${f.icon}`]:h({color:t.palette.mode==="light"?t.palette.grey[700]:t.palette.grey[300],marginLeft:5,marginRight:-6},e.size==="small"&&{fontSize:18,marginLeft:4,marginRight:-4},e.color!=="default"&&{color:"inherit"}),[`& .${f.deleteIcon}`]:h({WebkitTapHighlightColor:"transparent",color:o,fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:W(o,.4)}},e.size==="small"&&{fontSize:16,marginRight:4,marginLeft:-4},e.color!=="default"&&{color:W(t.palette[e.color].contrastText,.7),"&:hover, &:active":{color:t.palette[e.color].contrastText}})},e.size==="small"&&{height:24},e.color!=="default"&&{backgroundColor:t.palette[e.color].main,color:t.palette[e.color].contrastText},e.onDelete&&{[`&.${f.focusVisible}`]:{backgroundColor:W(t.palette.action.selected,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},e.onDelete&&e.color!=="default"&&{[`&.${f.focusVisible}`]:{backgroundColor:t.palette[e.color].dark}})},({theme:t,ownerState:e})=>h({},e.clickable&&{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:W(t.palette.action.selected,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity)},[`&.${f.focusVisible}`]:{backgroundColor:W(t.palette.action.selected,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)},"&:active":{boxShadow:t.shadows[1]}},e.clickable&&e.color!=="default"&&{[`&:hover, &.${f.focusVisible}`]:{backgroundColor:t.palette[e.color].dark}}),({theme:t,ownerState:e})=>h({},e.variant==="outlined"&&{backgroundColor:"transparent",border:`1px solid ${t.palette.mode==="light"?t.palette.grey[400]:t.palette.grey[700]}`,[`&.${f.clickable}:hover`]:{backgroundColor:t.palette.action.hover},[`&.${f.focusVisible}`]:{backgroundColor:t.palette.action.focus},[`& .${f.avatar}`]:{marginLeft:4},[`& .${f.avatarSmall}`]:{marginLeft:2},[`& .${f.icon}`]:{marginLeft:4},[`& .${f.iconSmall}`]:{marginLeft:2},[`& .${f.deleteIcon}`]:{marginRight:5},[`& .${f.deleteIconSmall}`]:{marginRight:3}},e.variant==="outlined"&&e.color!=="default"&&{color:t.palette[e.color].main,border:`1px solid ${W(t.palette[e.color].main,.7)}`,[`&.${f.clickable}:hover`]:{backgroundColor:W(t.palette[e.color].main,t.palette.action.hoverOpacity)},[`&.${f.focusVisible}`]:{backgroundColor:W(t.palette[e.color].main,t.palette.action.focusOpacity)},[`& .${f.deleteIcon}`]:{color:W(t.palette[e.color].main,.7),"&:hover, &:active":{color:t.palette[e.color].main}}})),to=A("span",{name:"MuiChip",slot:"Label",overridesResolver:(t,e)=>{const{ownerState:o}=t,{size:r}=o;return[e.label,e[`label${m(r)}`]]}})(({ownerState:t})=>h({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},t.size==="small"&&{paddingLeft:8,paddingRight:8}));function qe(t){return t.key==="Backspace"||t.key==="Delete"}const oo=c.exports.forwardRef(function(e,o){const r=me({props:e,name:"MuiChip"}),{avatar:n,className:a,clickable:s,color:u="default",component:g,deleteIcon:C,disabled:w=!1,icon:$,label:B,onClick:M,onDelete:R,onKeyDown:L,onKeyUp:z,size:j="medium",variant:P="filled"}=r,se=te(r,Qt),N=c.exports.useRef(null),D=Bt(N,o),K=x=>{x.stopPropagation(),R&&R(x)},O=x=>{x.currentTarget===x.target&&qe(x)&&x.preventDefault(),L&&L(x)},q=x=>{x.currentTarget===x.target&&(R&&qe(x)?R(x):x.key==="Escape"&&N.current&&N.current.blur()),z&&z(x)},V=s!==!1&&M?!0:s,H=j==="small",E=V||R?$e:g||"div",T=h({},r,{component:E,disabled:w,size:j,color:u,onDelete:!!R,clickable:V,variant:P}),_=Zt(T),oe=E===$e?h({component:g||"div",focusVisibleClassName:_.focusVisible},R&&{disableRipple:!0}):{};let G=null;if(R){const x=I(u!=="default"&&(P==="outlined"?_[`deleteIconOutlinedColor${m(u)}`]:_[`deleteIconColor${m(u)}`]),H&&_.deleteIconSmall);G=C&&c.exports.isValidElement(C)?c.exports.cloneElement(C,{className:I(C.props.className,_.deleteIcon,x),onClick:K}):l(qt,{className:I(_.deleteIcon,x),onClick:K})}let re=null;n&&c.exports.isValidElement(n)&&(re=c.exports.cloneElement(n,{className:I(_.avatar,n.props.className)}));let X=null;return $&&c.exports.isValidElement($)&&(X=c.exports.cloneElement($,{className:I(_.icon,$.props.className)})),y(eo,h({as:E,className:I(_.root,a),disabled:V&&w?!0:void 0,onClick:M,onKeyDown:O,onKeyUp:q,ref:D,ownerState:T},oe,se,{children:[re||X,l(to,{className:I(_.label),ownerState:T,children:B}),G]}))});var ct=oo;function ro(t){return he("MuiTab",t)}const lo=be("MuiTab",["root","labelIcon","textColorInherit","textColorPrimary","textColorSecondary","selected","disabled","fullWidth","wrapped","iconWrapper"]);var Z=lo;const no=["className","disabled","disableFocusRipple","fullWidth","icon","iconPosition","indicator","label","onChange","onClick","onFocus","selected","selectionFollowsFocus","textColor","value","wrapped"],ao=t=>{const{classes:e,textColor:o,fullWidth:r,wrapped:n,icon:a,label:s,selected:u,disabled:g}=t,C={root:["root",a&&s&&"labelIcon",`textColor${m(o)}`,r&&"fullWidth",n&&"wrapped",u&&"selected",g&&"disabled"],iconWrapper:["iconWrapper"]};return ge(C,ro,e)},io=A($e,{name:"MuiTab",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,o.label&&o.icon&&e.labelIcon,e[`textColor${m(o.textColor)}`],o.fullWidth&&e.fullWidth,o.wrapped&&e.wrapped]}})(({theme:t,ownerState:e})=>h({},t.typography.button,{maxWidth:360,minWidth:90,position:"relative",minHeight:48,flexShrink:0,padding:"12px 16px",overflow:"hidden",whiteSpace:"normal",textAlign:"center"},e.label&&{flexDirection:e.iconPosition==="top"||e.iconPosition==="bottom"?"column":"row"},{lineHeight:1.25},e.icon&&e.label&&{minHeight:72,paddingTop:9,paddingBottom:9,[`& > .${Z.iconWrapper}`]:h({},e.iconPosition==="top"&&{marginBottom:6},e.iconPosition==="bottom"&&{marginTop:6},e.iconPosition==="start"&&{marginRight:t.spacing(1)},e.iconPosition==="end"&&{marginLeft:t.spacing(1)})},e.textColor==="inherit"&&{color:"inherit",opacity:.6,[`&.${Z.selected}`]:{opacity:1},[`&.${Z.disabled}`]:{opacity:t.palette.action.disabledOpacity}},e.textColor==="primary"&&{color:t.palette.text.secondary,[`&.${Z.selected}`]:{color:t.palette.primary.main},[`&.${Z.disabled}`]:{color:t.palette.text.disabled}},e.textColor==="secondary"&&{color:t.palette.text.secondary,[`&.${Z.selected}`]:{color:t.palette.secondary.main},[`&.${Z.disabled}`]:{color:t.palette.text.disabled}},e.fullWidth&&{flexShrink:1,flexGrow:1,flexBasis:0,maxWidth:"none"},e.wrapped&&{fontSize:t.typography.pxToRem(12)})),so=c.exports.forwardRef(function(e,o){const r=me({props:e,name:"MuiTab"}),{className:n,disabled:a=!1,disableFocusRipple:s=!1,fullWidth:u,icon:g,iconPosition:C="top",indicator:w,label:$,onChange:B,onClick:M,onFocus:R,selected:L,selectionFollowsFocus:z,textColor:j="inherit",value:P,wrapped:se=!1}=r,N=te(r,no),D=h({},r,{disabled:a,disableFocusRipple:s,selected:L,icon:!!g,iconPosition:C,label:!!$,fullWidth:u,textColor:j,wrapped:se}),K=ao(D),O=g&&$&&c.exports.isValidElement(g)?c.exports.cloneElement(g,{className:I(K.iconWrapper,g.props.className)}):g,q=H=>{!L&&B&&B(H,P),M&&M(H)},V=H=>{z&&!L&&B&&B(H,P),R&&R(H)};return y(io,h({focusRipple:!s,className:I(K.root,n),ref:o,role:"tab","aria-selected":L,disabled:a,onClick:q,onFocus:V,ownerState:D,tabIndex:L?0:-1},N,{children:[C==="top"||C==="start"?y(c.exports.Fragment,{children:[O,$]}):y(c.exports.Fragment,{children:[$,O]}),w]}))});var Ge=so,co=fe(l("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"}),"KeyboardArrowLeft"),uo=fe(l("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),"KeyboardArrowRight");function po(t){return(1+Math.sin(Math.PI*t-Math.PI/2))/2}function fo(t,e,o,r={},n=()=>{}){const{ease:a=po,duration:s=300}=r;let u=null;const g=e[t];let C=!1;const w=()=>{C=!0},$=B=>{if(C){n(new Error("Animation cancelled"));return}u===null&&(u=B);const M=Math.min(1,(B-u)/s);if(e[t]=a(M)*(o-g)+g,M>=1){requestAnimationFrame(()=>{n(null)});return}requestAnimationFrame($)};return g===o?(n(new Error("Element already at target position")),w):(requestAnimationFrame($),w)}const ho=["onChange"],bo={width:99,height:99,position:"absolute",top:-9999,overflow:"scroll"};function mo(t){const{onChange:e}=t,o=te(t,ho),r=c.exports.useRef(),n=c.exports.useRef(null),a=()=>{r.current=n.current.offsetHeight-n.current.clientHeight};return c.exports.useEffect(()=>{const s=Ee(()=>{const g=r.current;a(),g!==r.current&&e(r.current)}),u=lt(n.current);return u.addEventListener("resize",s),()=>{s.clear(),u.removeEventListener("resize",s)}},[e]),c.exports.useEffect(()=>{a(),e(r.current)},[e]),l("div",h({style:bo,ref:n},o))}function go(t){return he("MuiTabScrollButton",t)}const xo=be("MuiTabScrollButton",["root","vertical","horizontal","disabled"]);var vo=xo,Je,Qe;const Co=["className","direction","orientation","disabled"],yo=t=>{const{classes:e,orientation:o,disabled:r}=t;return ge({root:["root",o,r&&"disabled"]},go,e)},So=A($e,{name:"MuiTabScrollButton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,o.orientation&&e[o.orientation]]}})(({ownerState:t})=>h({width:40,flexShrink:0,opacity:.8,[`&.${vo.disabled}`]:{opacity:0}},t.orientation==="vertical"&&{width:"100%",height:40,"& svg":{transform:`rotate(${t.isRtl?-90:90}deg)`}})),wo=c.exports.forwardRef(function(e,o){const r=me({props:e,name:"MuiTabScrollButton"}),{className:n,direction:a}=r,s=te(r,Co),g=nt().direction==="rtl",C=h({isRtl:g},r),w=yo(C);return l(So,h({component:"div",className:I(w.root,n),ref:o,role:null,ownerState:C,tabIndex:null},s,{children:a==="left"?Je||(Je=l(co,{fontSize:"small"})):Qe||(Qe=l(uo,{fontSize:"small"}))}))});var $o=wo;function To(t){return he("MuiTabs",t)}const _o=be("MuiTabs",["root","vertical","flexContainer","flexContainerVertical","centered","scroller","fixed","scrollableX","scrollableY","hideScrollbar","scrollButtons","scrollButtonsHideMobile","indicator"]);var ze=_o;const ko=["aria-label","aria-labelledby","action","centered","children","className","component","allowScrollButtonsMobile","indicatorColor","onChange","orientation","ScrollButtonComponent","scrollButtons","selectionFollowsFocus","TabIndicatorProps","TabScrollButtonProps","textColor","value","variant","visibleScrollbar"],Ze=(t,e)=>t===e?t.firstChild:e&&e.nextElementSibling?e.nextElementSibling:t.firstChild,et=(t,e)=>t===e?t.lastChild:e&&e.previousElementSibling?e.previousElementSibling:t.lastChild,we=(t,e,o)=>{let r=!1,n=o(t,e);for(;n;){if(n===t.firstChild){if(r)return;r=!0}const a=n.disabled||n.getAttribute("aria-disabled")==="true";if(!n.hasAttribute("tabindex")||a)n=o(t,n);else{n.focus();return}}},Io=t=>{const{vertical:e,fixed:o,hideScrollbar:r,scrollableX:n,scrollableY:a,centered:s,scrollButtonsHideMobile:u,classes:g}=t;return ge({root:["root",e&&"vertical"],scroller:["scroller",o&&"fixed",r&&"hideScrollbar",n&&"scrollableX",a&&"scrollableY"],flexContainer:["flexContainer",e&&"flexContainerVertical",s&&"centered"],indicator:["indicator"],scrollButtons:["scrollButtons",u&&"scrollButtonsHideMobile"],scrollableX:[n&&"scrollableX"],hideScrollbar:[r&&"hideScrollbar"]},To,g)},Bo=A("div",{name:"MuiTabs",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[{[`& .${ze.scrollButtons}`]:e.scrollButtons},{[`& .${ze.scrollButtons}`]:o.scrollButtonsHideMobile&&e.scrollButtonsHideMobile},e.root,o.vertical&&e.vertical]}})(({ownerState:t,theme:e})=>h({overflow:"hidden",minHeight:48,WebkitOverflowScrolling:"touch",display:"flex"},t.vertical&&{flexDirection:"column"},t.scrollButtonsHideMobile&&{[`& .${ze.scrollButtons}`]:{[e.breakpoints.down("sm")]:{display:"none"}}})),Ro=A("div",{name:"MuiTabs",slot:"Scroller",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.scroller,o.fixed&&e.fixed,o.hideScrollbar&&e.hideScrollbar,o.scrollableX&&e.scrollableX,o.scrollableY&&e.scrollableY]}})(({ownerState:t})=>h({position:"relative",display:"inline-block",flex:"1 1 auto",whiteSpace:"nowrap"},t.fixed&&{overflowX:"hidden",width:"100%"},t.hideScrollbar&&{scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},t.scrollableX&&{overflowX:"auto",overflowY:"hidden"},t.scrollableY&&{overflowY:"auto",overflowX:"hidden"})),zo=A("div",{name:"MuiTabs",slot:"FlexContainer",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.flexContainer,o.vertical&&e.flexContainerVertical,o.centered&&e.centered]}})(({ownerState:t})=>h({display:"flex"},t.vertical&&{flexDirection:"column"},t.centered&&{justifyContent:"center"})),Eo=A("span",{name:"MuiTabs",slot:"Indicator",overridesResolver:(t,e)=>e.indicator})(({ownerState:t,theme:e})=>h({position:"absolute",height:2,bottom:0,width:"100%",transition:e.transitions.create()},t.indicatorColor==="primary"&&{backgroundColor:e.palette.primary.main},t.indicatorColor==="secondary"&&{backgroundColor:e.palette.secondary.main},t.vertical&&{height:"100%",width:2,right:0})),Mo=A(mo,{name:"MuiTabs",slot:"ScrollbarSize"})({overflowX:"auto",overflowY:"hidden",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),tt={},Fo=c.exports.forwardRef(function(e,o){const r=me({props:e,name:"MuiTabs"}),n=nt(),a=n.direction==="rtl",{"aria-label":s,"aria-labelledby":u,action:g,centered:C=!1,children:w,className:$,component:B="div",allowScrollButtonsMobile:M=!1,indicatorColor:R="primary",onChange:L,orientation:z="horizontal",ScrollButtonComponent:j=$o,scrollButtons:P="auto",selectionFollowsFocus:se,TabIndicatorProps:N={},TabScrollButtonProps:D={},textColor:K="primary",value:O,variant:q="standard",visibleScrollbar:V=!1}=r,H=te(r,ko),E=q==="scrollable",T=z==="vertical",_=T?"scrollTop":"scrollLeft",oe=T?"top":"left",G=T?"bottom":"right",re=T?"clientHeight":"clientWidth",X=T?"height":"width",x=h({},r,{component:B,allowScrollButtonsMobile:M,indicatorColor:R,orientation:z,vertical:T,scrollButtons:P,textColor:K,variant:q,visibleScrollbar:V,fixed:!E,hideScrollbar:E&&!V,scrollableX:E&&!T,scrollableY:E&&T,centered:C&&!E,scrollButtonsHideMobile:!M}),Y=Io(x),[Le,ht]=c.exports.useState(!1),[J,Pe]=c.exports.useState(tt),[le,bt]=c.exports.useState({start:!1,end:!1}),[We,mt]=c.exports.useState({overflow:"hidden",scrollbarWidth:0}),Ae=new Map,U=c.exports.useRef(null),ce=c.exports.useRef(null),Ne=()=>{const i=U.current;let d;if(i){const b=i.getBoundingClientRect();d={clientWidth:i.clientWidth,scrollLeft:i.scrollLeft,scrollTop:i.scrollTop,scrollLeftNormalized:je(i,n.direction),scrollWidth:i.scrollWidth,top:b.top,bottom:b.bottom,left:b.left,right:b.right}}let p;if(i&&O!==!1){const b=ce.current.children;if(b.length>0){const k=b[Ae.get(O)];p=k?k.getBoundingClientRect():null}}return{tabsMeta:d,tabMeta:p}},de=Re(()=>{const{tabsMeta:i,tabMeta:d}=Ne();let p=0,b;if(T)b="top",d&&i&&(p=d.top-i.top+i.scrollTop);else if(b=a?"right":"left",d&&i){const F=a?i.scrollLeftNormalized+i.clientWidth-i.scrollWidth:i.scrollLeft;p=(a?-1:1)*(d[b]-i[b]+F)}const k={[b]:p,[X]:d?d[X]:0};if(isNaN(J[b])||isNaN(J[X]))Pe(k);else{const F=Math.abs(J[b]-k[b]),ne=Math.abs(J[X]-k[X]);(F>=1||ne>=1)&&Pe(k)}}),_e=(i,{animation:d=!0}={})=>{d?fo(_,U.current,i,{duration:n.transitions.duration.standard}):U.current[_]=i},De=i=>{let d=U.current[_];T?d+=i:(d+=i*(a?-1:1),d*=a&&st()==="reverse"?-1:1),_e(d)},Oe=()=>{const i=U.current[re];let d=0;const p=Array.from(ce.current.children);for(let b=0;b<p.length;b+=1){const k=p[b];if(d+k[re]>i)break;d+=k[re]}return d},gt=()=>{De(-1*Oe())},xt=()=>{De(Oe())},vt=c.exports.useCallback(i=>{mt({overflow:null,scrollbarWidth:i})},[]),Ct=()=>{const i={};i.scrollbarSizeListener=E?l(Mo,{onChange:vt,className:I(Y.scrollableX,Y.hideScrollbar)}):null;const d=le.start||le.end,p=E&&(P==="auto"&&d||P===!0);return i.scrollButtonStart=p?l(j,h({orientation:z,direction:a?"right":"left",onClick:gt,disabled:!le.start},D,{className:I(Y.scrollButtons,D.className)})):null,i.scrollButtonEnd=p?l(j,h({orientation:z,direction:a?"left":"right",onClick:xt,disabled:!le.end},D,{className:I(Y.scrollButtons,D.className)})):null,i},Ve=Re(i=>{const{tabsMeta:d,tabMeta:p}=Ne();if(!(!p||!d)){if(p[oe]<d[oe]){const b=d[_]+(p[oe]-d[oe]);_e(b,{animation:i})}else if(p[G]>d[G]){const b=d[_]+(p[G]-d[G]);_e(b,{animation:i})}}}),Q=Re(()=>{if(E&&P!==!1){const{scrollTop:i,scrollHeight:d,clientHeight:p,scrollWidth:b,clientWidth:k}=U.current;let F,ne;if(T)F=i>1,ne=i<d-p-1;else{const ve=je(U.current,n.direction);F=a?ve<b-k-1:ve>1,ne=a?ve>1:ve<b-k-1}(F!==le.start||ne!==le.end)&&bt({start:F,end:ne})}});c.exports.useEffect(()=>{const i=Ee(()=>{de(),Q()}),d=lt(U.current);d.addEventListener("resize",i);let p;return typeof ResizeObserver!="undefined"&&(p=new ResizeObserver(i),Array.from(ce.current.children).forEach(b=>{p.observe(b)})),()=>{i.clear(),d.removeEventListener("resize",i),p&&p.disconnect()}},[de,Q]);const ke=c.exports.useMemo(()=>Ee(()=>{Q()}),[Q]);c.exports.useEffect(()=>()=>{ke.clear()},[ke]),c.exports.useEffect(()=>{ht(!0)},[]),c.exports.useEffect(()=>{de(),Q()}),c.exports.useEffect(()=>{Ve(tt!==J)},[Ve,J]),c.exports.useImperativeHandle(g,()=>({updateIndicator:de,updateScrollButtons:Q}),[de,Q]);const He=l(Eo,h({},N,{className:I(Y.indicator,N.className),ownerState:x,style:h({},J,N.style)}));let xe=0;const yt=c.exports.Children.map(w,i=>{if(!c.exports.isValidElement(i))return null;const d=i.props.value===void 0?xe:i.props.value;Ae.set(d,xe);const p=d===O;return xe+=1,c.exports.cloneElement(i,h({fullWidth:q==="fullWidth",indicator:p&&!Le&&He,selected:p,selectionFollowsFocus:se,onChange:L,textColor:K,value:d},xe===1&&O===!1&&!i.props.tabIndex?{tabIndex:0}:{}))}),St=i=>{const d=ce.current,p=Rt(d).activeElement;if(p.getAttribute("role")!=="tab")return;let k=z==="horizontal"?"ArrowLeft":"ArrowUp",F=z==="horizontal"?"ArrowRight":"ArrowDown";switch(z==="horizontal"&&a&&(k="ArrowRight",F="ArrowLeft"),i.key){case k:i.preventDefault(),we(d,p,et);break;case F:i.preventDefault(),we(d,p,Ze);break;case"Home":i.preventDefault(),we(d,null,Ze);break;case"End":i.preventDefault(),we(d,null,et);break}},Ie=Ct();return y(Bo,h({className:I(Y.root,$),ownerState:x,ref:o,as:B},H,{children:[Ie.scrollButtonStart,Ie.scrollbarSizeListener,y(Ro,{className:Y.scroller,ownerState:x,style:{overflow:We.overflow,[T?`margin${a?"Left":"Right"}`:"marginBottom"]:V?void 0:-We.scrollbarWidth},ref:U,onScroll:ke,children:[l(zo,{"aria-label":s,"aria-labelledby":u,"aria-orientation":z==="vertical"?"vertical":null,className:Y.flexContainer,ownerState:x,onKeyDown:St,ref:ce,role:"tablist",children:yt}),Le&&He]}),Ie.scrollButtonEnd]}))});var Lo=Fo,Po=fe(l("path",{d:"m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"}),"ArrowDownward"),Wo=fe(l("path",{d:"m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"}),"ArrowUpward");const dt=c.exports.createContext(null);function Ao(){const[t,e]=c.exports.useState(null);return c.exports.useEffect(()=>{e(`mui-p-${Math.round(Math.random()*1e5)}`)},[]),t}function No(t){const{children:e,value:o}=t,r=Ao(),n=c.exports.useMemo(()=>({idPrefix:r,value:o}),[r,o]);return l(dt.Provider,{value:n,children:e})}function ut(){return c.exports.useContext(dt)}function pt(t,e){const{idPrefix:o}=t;return o===null?null:`${t.idPrefix}-P-${e}`}function ft(t,e){const{idPrefix:o}=t;return o===null?null:`${t.idPrefix}-T-${e}`}const Do=["children"],Oo=c.exports.forwardRef(function(e,o){const{children:r}=e,n=te(e,Do),a=ut();if(a===null)throw new TypeError("No TabContext provided");const s=c.exports.Children.map(r,u=>c.exports.isValidElement(u)?c.exports.cloneElement(u,{"aria-controls":pt(a,u.props.value),id:ft(a,u.props.value)}):null);return l(Lo,h({},n,{ref:o,value:a.value,children:s}))});var Vo=Oo;function Ho(t){return he("MuiTabPanel",t)}be("MuiTabPanel",["root"]);const Uo=["children","className","value"],Ko=t=>{const{classes:e}=t;return ge({root:["root"]},Ho,e)},Xo=A("div",{name:"MuiTabPanel",slot:"Root",overridesResolver:(t,e)=>e.root})(({theme:t})=>({padding:t.spacing(3)})),Yo=c.exports.forwardRef(function(e,o){const r=me({props:e,name:"MuiTabPanel"}),{children:n,className:a,value:s}=r,u=te(r,Uo),g=h({},r),C=Ko(g),w=ut();if(w===null)throw new TypeError("No TabContext provided");const $=pt(w,s),B=ft(w,s);return l(Xo,h({"aria-labelledby":B,className:I(C.root,a),hidden:s!==w.value,id:$,ref:o,role:"tabpanel",ownerState:g},u,{children:s===w.value&&n}))});var ot=Yo;class jo extends v.Component{constructor(e){super(e);this.state={father_id:Te.node_id,son_ids:[]}}async set_father_id(e){let o=await ee.get.son_ids(e);this.setState({father_id:e,son_ids:o})}async componentDidMount(){this.set_father_id(Te.node_id)}WordsWithButton(e){let o=e.icon;return l(S,{sx:{marginTop:"0.5rem"},children:y(Ke,{children:[o?l(zt,{title:e.title,children:l(Et,{size:"small",sx:{height:"0.9rem",marginY:"auto"},onClick:e.onClick,children:l(o,{sx:{fontSize:"0.9rem"}})})}):l(rt,{}),l(it,{sx:r=>({fontSize:"0.9rem"}),underline:"hover",href:e.url,children:e.words})]})})}SubnodeItem(e){let o=this,r=e.node_id,[n,a]=v.useState(!0),s=this.WordsWithButton.bind(this);return v.useEffect(()=>{(async()=>{let u=await ee.get.son_ids(r);a(u.length>0)})()}),l(v.Fragment,{children:n?l(s,{words:l(Se,{node_id:r}),title:"\u4E0B\u884C",onClick:()=>o.set_father_id(r),icon:Po,url:ye.view.content(r)}):l(s,{words:l(Se,{node_id:r}),url:ye.view.content(r)})})}FathernodeItem(e){let o=this,r=e.node_id,n=this.WordsWithButton.bind(this),[a,s]=v.useState(-1);return v.useEffect(()=>{(async()=>s(await ee.get.father_id(r)))()}),l(v.Fragment,{children:a>0?l(n,{words:l(Se,{node_id:r}),title:"\u4E0A\u884C",onClick:()=>o.set_father_id(a),icon:Wo,url:ye.view.content(r)}):l(n,{words:l(Se,{node_id:r}),url:ye.view.content(r)})})}render(){let e=this.state.father_id,o=this.state.son_ids,r=this.FathernodeItem.bind(this),n=this.SubnodeItem.bind(this);return l(S,{sx:{marginTop:"0.5rem"},children:y(Ke,{force_direction:"column",children:[l(r,{node_id:e}),l(S,{sx:{marginLeft:a=>a.printer.margins.level},children:o.map((a,s)=>l(v.Fragment,{children:l(n,{node_id:a})},s))})]})})}}class qo extends v.Component{constructor(e){super(e);this.state={create_time:void 0,modify_time:void 0}}async componentDidMount(){let e=await ee.get.create_time();this.setState({create_time:e.create_time,modify_time:e.modify_time})}render(){let e=this,o=Fe(this.props.root,"title"),r=n=>y(S,{sx:a=>({marginBottom:"1rem"}),children:[l(ie,{color:"text.secondary",sx:{marginRight:a=>a.printer.margins.colon,fontSize:"0.5rem",display:"inline-block"},children:n.title}),l(ie,{sx:{fontSize:"0.8rem",display:"inline-block"},children:n.content})]});return y(v.Fragment,{children:[l(r,{title:"\u9898\u76EE",content:`${o}`}),l(r,{title:"\u521B\u5EFA\u65F6\u95F4",content:e.state.create_time}),l(r,{title:"\u4FEE\u6539\u65F6\u95F4",content:e.state.modify_time})]})}}class Go extends v.Component{constructor(e){super(e)}render(){return y(S,{sx:e=>ue({},e.printer.typography.body),children:[l(qo,{root:this.props.root}),l(at,{sx:{fontSize:"0.8rem"},children:l(ct,{sx:{fontSize:"0.8rem"},label:"\u5BFC\u822A"})}),l(jo,{})]})}}class Jo extends v.Component{constructor(e){super(e);this.state={comments:[]}}async update(){let e=await ee.get.comments();e=e.reverse(),this.setState({comments:e})}async componentDidMount(){await this.update()}render(){let e=this,o=r=>y(S,{sx:{marginBottom:"1rem",marginX:"0.5rem"},children:[l(ie,{sx:{marginLeft:"0.5rem",fontSize:"0.9rem"},children:r.content}),y(ie,{sx:{textAlign:"right",marginTop:"0.5rem",fontSize:"0.9rem"},children:["\u2014\u2014",r.name]})]});return l(v.Fragment,{children:e.state.comments.map((r,n)=>{let[a,s]=r;return l(o,{name:s,content:a},n)})})}}class Qo extends v.Component{constructor(e){super(e);this.state={content:"",name:"",snakerbar_open:!1,status:!1}}async submit(){let e=this,o=!1;e.state.content&&(o=await ee.post.comments({content:e.state.content,name:e.state.name})),e.setState({status:o,snakerbar_open:!0}),o&&(e.props.onRenew(),e.setState({content:"",name:""}))}render(){let e=this;return y(v.Fragment,{children:[l(Xe,{label:"\u7559\u8A00",placeholder:"\u8BF4\u70B9\u5565",multiline:!0,onChange:o=>{e.setState({content:o.target.value})},variant:"outlined",fullWidth:!0,minRows:4,sx:{marginTop:"2rem"},value:e.state.content}),l(Xe,{label:"\u79F0\u547C",placeholder:"\u4F60\u662F\u8C01\uFF1F",onChange:o=>{e.setState({name:o.target.value})},variant:"standard",fullWidth:!0,sx:{marginTop:"0.5rem"},value:e.state.name}),l(S,{sx:{textAlign:"right",marginTop:"1rem"},children:l(Mt,{variant:"outlined",onClick:()=>e.submit(),children:"\u65B0\u5EFA\u7559\u8A00"})}),l(Ft,{info_sucess:"\u63D0\u4EA4\u6210\u529F",info_fail:"\u63D0\u4EA4\u5931\u8D25",open:e.state.snakerbar_open,status:e.state.status,onClose:()=>e.setState({snakerbar_open:!1})})]})}}class Zo extends v.Component{constructor(e){super(e);pe(this,"comment_ref");this.comment_ref=v.createRef()}render(){let e=this;return y(S,{sx:o=>Ce(ue({},o.printer.typography.structure),{overflowY:"auto",position:"absolute",top:"5%",bottom:"2%",left:"0",right:"0",paddingX:"1rem"}),children:[l(Qo,{onRenew:()=>{e.comment_ref&&e.comment_ref.current&&e.comment_ref.current.update()}}),l(at,{sx:{marginTop:"3rem"},children:l(ct,{sx:{fontSize:"0.8rem"},label:"\u7559\u8A00\u5217\u8868"})}),l(Jo,{ref:e.comment_ref})]})}}function er(t){const[e,o]=v.useState("1");return l(No,{value:e,children:y(S,{sx:{height:"100%"},children:[y(Vo,{onChange:(r,n)=>o(n),variant:"scrollable",scrollButtons:"auto",children:[l(Ge,{label:"\u57FA\u672C",value:"1"}),l(Ge,{label:"\u7559\u8A00",value:"2"})]}),l(ot,{value:"1",children:l(Go,{root:t.root})}),l(ot,{value:"2",children:l(Zo,{})})]})})}function tr(t){let e=[];for(let[o,r]of Lt.descendants(t))(Me(o,"support","\u5C0F\u8282\u7EBF")||Me(o,"support","\u7AE0\u8282\u7EBF"))&&e.push([o,r]);return e}function or(t){let e=tr(t.root);return y(S,{sx:o=>Ce(ue({},o.printer.typography.body),{position:"relative",top:"30%"}),children:[l(ie,{color:"text.secondary",sx:o=>Ce(ue({},o.printer.typography.body),{fontSize:"0.9rem"}),children:"\u7AE0\u5185\u76EE\u5F55"}),e.map((o,r)=>{let[n,a]=o,s=l(rt,{children:"\u7AE0\u8282"});return Me(n,"support","\u5C0F\u8282\u7EBF")&&(s=y(v.Fragment,{children:[l(S,{component:"span",sx:{marginRight:"1rem"},children:Vt(Number(r)+1)}),l(S,{component:"span",children:Fe(n,"title")})]})),l(S,{sx:{marginTop:"0.2rem"},children:l(it,{component:"button",underline:"hover",onClick:u=>{t.onScroll(a)},children:l(ie,{sx:{fontSize:"0.8rem"},children:s})})},r)})]})}class rr extends v.Component{constructor(e){super(e);pe(this,"core");pe(this,"printer_renderers");pe(this,"printer_ref");this.core=Ht(new Ut([])),this.printer_renderers=Kt(new Xt(this.core,Pt)),this.printer_ref=v.createRef(),this.state={root:Wt("root",{title:{val:"",type:"string"}})}}get_printer(){if(this.printer_ref&&this.printer_ref.current)return this.printer_ref.current.get_printer()}async componentDidMount(){var e=await ee.get.content();for(this.setState({root:e});!this.get_printer(););let o=this.get_printer();o.update(e),Te.linkto&&Yt(o,Number(Te.linkto))}render(){let e=this;return l(jt,{children:y(At,{theme:Nt(Ye),children:[l(S,{sx:{position:"absolute",top:"2%",left:"1%",height:"96%",width:"17%"},children:l(er,{root:e.state.root})}),y(S,{sx:{position:"absolute",top:"2%",left:"20%",height:"96%",width:"60%",display:"flex"},children:[l(S,{sx:{position:"absolute",width:"98%",left:"1%",top:"1%",height:"3%"},children:l(Dt,{sx:{textAlign:"center"},children:Fe(e.state.root,"title")})}),l(S,{sx:{position:"absolute",width:"98%",left:"1%",top:"5%",height:"94%"},children:l(Ot,{ref:e.printer_ref,core:this.core,renderers:this.printer_renderers,theme:Ye})})]}),l(S,{sx:{position:"absolute",top:"2%",left:"81%",height:"96%",width:"17%"},children:l(or,{root:e.state.root,onScroll:o=>{let r=this.get_printer();r&&r.scroll_to(o)}})})]})})}}It.render(l(v.StrictMode,{children:l(rr,{})}),document.getElementById("root"));
