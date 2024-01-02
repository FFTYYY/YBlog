import{O as at,_ as B,b as Z,e as v,a as be,s as ee,u as ge,g as ke,c as Be,E as lt,h as j,w as Pe,f as ct}from"./Link.5d48f27c.js";import{r as l,a as J,j as N,b as ut}from"./titleword.80f09066.js";import{_ as pt,T as ze,a as Q}from"./Divider.84bc2f41.js";var we={exports:{}},u={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h=typeof Symbol=="function"&&Symbol.for,ye=h?Symbol.for("react.element"):60103,xe=h?Symbol.for("react.portal"):60106,te=h?Symbol.for("react.fragment"):60107,oe=h?Symbol.for("react.strict_mode"):60108,ne=h?Symbol.for("react.profiler"):60114,re=h?Symbol.for("react.provider"):60109,se=h?Symbol.for("react.context"):60110,Re=h?Symbol.for("react.async_mode"):60111,ie=h?Symbol.for("react.concurrent_mode"):60111,ae=h?Symbol.for("react.forward_ref"):60112,le=h?Symbol.for("react.suspense"):60113,ft=h?Symbol.for("react.suspense_list"):60120,ce=h?Symbol.for("react.memo"):60115,ue=h?Symbol.for("react.lazy"):60116,dt=h?Symbol.for("react.block"):60121,mt=h?Symbol.for("react.fundamental"):60117,ht=h?Symbol.for("react.responder"):60118,bt=h?Symbol.for("react.scope"):60119;function y(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case ye:switch(e=e.type,e){case Re:case ie:case te:case ne:case oe:case le:return e;default:switch(e=e&&e.$$typeof,e){case se:case ae:case ue:case ce:case re:return e;default:return t}}case xe:return t}}}function Le(e){return y(e)===ie}u.AsyncMode=Re;u.ConcurrentMode=ie;u.ContextConsumer=se;u.ContextProvider=re;u.Element=ye;u.ForwardRef=ae;u.Fragment=te;u.Lazy=ue;u.Memo=ce;u.Portal=xe;u.Profiler=ne;u.StrictMode=oe;u.Suspense=le;u.isAsyncMode=function(e){return Le(e)||y(e)===Re};u.isConcurrentMode=Le;u.isContextConsumer=function(e){return y(e)===se};u.isContextProvider=function(e){return y(e)===re};u.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===ye};u.isForwardRef=function(e){return y(e)===ae};u.isFragment=function(e){return y(e)===te};u.isLazy=function(e){return y(e)===ue};u.isMemo=function(e){return y(e)===ce};u.isPortal=function(e){return y(e)===xe};u.isProfiler=function(e){return y(e)===ne};u.isStrictMode=function(e){return y(e)===oe};u.isSuspense=function(e){return y(e)===le};u.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===te||e===ie||e===ne||e===oe||e===le||e===ft||typeof e=="object"&&e!==null&&(e.$$typeof===ue||e.$$typeof===ce||e.$$typeof===re||e.$$typeof===se||e.$$typeof===ae||e.$$typeof===mt||e.$$typeof===ht||e.$$typeof===bt||e.$$typeof===dt)};u.typeOf=y;we.exports=u;var De=we.exports,gt={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},yt={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Ne={};Ne[De.ForwardRef]=gt;Ne[De.Memo]=yt;function xt(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];return at(t)}var ve=function(){var t=xt.apply(void 0,arguments),o="animation-"+t.name;return{name:o,styles:"@keyframes "+o+"{"+t.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}};function Rt(e,t,o){const i={};return Object.keys(e).forEach(r=>{i[r]=e[r].reduce((n,s)=>(s&&(n.push(t(s)),o&&o[s]&&n.push(o[s])),n),[]).join(" ")}),i}function vt(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Ce(e,t){var o=function(n){return t&&l.exports.isValidElement(n)?t(n):n},i=Object.create(null);return e&&l.exports.Children.map(e,function(r){return r}).forEach(function(r){i[r.key]=o(r)}),i}function Ct(e,t){e=e||{},t=t||{};function o(m){return m in t?t[m]:e[m]}var i=Object.create(null),r=[];for(var n in e)n in t?r.length&&(i[n]=r,r=[]):r.push(n);var s,p={};for(var c in t){if(i[c])for(s=0;s<i[c].length;s++){var f=i[c][s];p[i[c][s]]=o(f)}p[c]=o(c)}for(s=0;s<r.length;s++)p[r[s]]=o(r[s]);return p}function D(e,t,o){return o[t]!=null?o[t]:e.props[t]}function Mt(e,t){return Ce(e.children,function(o){return l.exports.cloneElement(o,{onExited:t.bind(null,o),in:!0,appear:D(o,"appear",e),enter:D(o,"enter",e),exit:D(o,"exit",e)})})}function $t(e,t,o){var i=Ce(e.children),r=Ct(t,i);return Object.keys(r).forEach(function(n){var s=r[n];if(!!l.exports.isValidElement(s)){var p=n in t,c=n in i,f=t[n],m=l.exports.isValidElement(f)&&!f.props.in;c&&(!p||m)?r[n]=l.exports.cloneElement(s,{onExited:o.bind(null,s),in:!0,exit:D(s,"exit",e),enter:D(s,"enter",e)}):!c&&p&&!m?r[n]=l.exports.cloneElement(s,{in:!1}):c&&p&&l.exports.isValidElement(f)&&(r[n]=l.exports.cloneElement(s,{onExited:o.bind(null,s),in:f.props.in,exit:D(s,"exit",e),enter:D(s,"enter",e)}))}}),r}var Tt=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},St={component:"div",childFactory:function(t){return t}},Me=function(e){pt(t,e);function t(i,r){var n;n=e.call(this,i,r)||this;var s=n.handleExited.bind(vt(n));return n.state={contextValue:{isMounting:!0},handleExited:s,firstRender:!0},n}var o=t.prototype;return o.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},o.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(r,n){var s=n.children,p=n.handleExited,c=n.firstRender;return{children:c?Mt(r,p):$t(r,s,p),firstRender:!1}},o.handleExited=function(r,n){var s=Ce(this.props.children);r.key in s||(r.props.onExited&&r.props.onExited(n),this.mounted&&this.setState(function(p){var c=B({},p.children);return delete c[r.key],{children:c}}))},o.render=function(){var r=this.props,n=r.component,s=r.childFactory,p=Z(r,["component","childFactory"]),c=this.state.contextValue,f=Tt(this.state.children).map(s);return delete p.appear,delete p.enter,delete p.exit,n===null?J.createElement(ze.Provider,{value:c},f):J.createElement(ze.Provider,{value:c},J.createElement(n,p,f))},t}(J.Component);Me.propTypes={};Me.defaultProps=St;var Et=Me;function Bt(e){const{className:t,classes:o,pulsate:i=!1,rippleX:r,rippleY:n,rippleSize:s,in:p,onExited:c,timeout:f}=e,[m,x]=l.exports.useState(!1),b=v(t,o.ripple,o.rippleVisible,i&&o.ripplePulsate),C={width:s,height:s,top:-(s/2)+n,left:-(s/2)+r},g=v(o.child,m&&o.childLeaving,i&&o.childPulsate);return!p&&!m&&x(!0),l.exports.useEffect(()=>{if(!p&&c!=null){const M=setTimeout(c,f);return()=>{clearTimeout(M)}}},[c,p,f]),N("span",{className:b,style:C,children:N("span",{className:g})})}const Pt=be("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]);var R=Pt;const zt=["center","classes","className"];let pe=e=>e,Ie,Fe,Ve,_e;const he=550,It=80,Ft=ve(Ie||(Ie=pe`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),Vt=ve(Fe||(Fe=pe`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),_t=ve(Ve||(Ve=pe`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),kt=ee("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),wt=ee(Bt,{name:"MuiTouchRipple",slot:"Ripple"})(_e||(_e=pe`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),R.rippleVisible,Ft,he,({theme:e})=>e.transitions.easing.easeInOut,R.ripplePulsate,({theme:e})=>e.transitions.duration.shorter,R.child,R.childLeaving,Vt,he,({theme:e})=>e.transitions.easing.easeInOut,R.childPulsate,_t,({theme:e})=>e.transitions.easing.easeInOut),Lt=l.exports.forwardRef(function(t,o){const i=ge({props:t,name:"MuiTouchRipple"}),{center:r=!1,classes:n={},className:s}=i,p=Z(i,zt),[c,f]=l.exports.useState([]),m=l.exports.useRef(0),x=l.exports.useRef(null);l.exports.useEffect(()=>{x.current&&(x.current(),x.current=null)},[c]);const b=l.exports.useRef(!1),C=l.exports.useRef(null),g=l.exports.useRef(null),M=l.exports.useRef(null);l.exports.useEffect(()=>()=>{clearTimeout(C.current)},[]);const Y=l.exports.useCallback(d=>{const{pulsate:$,rippleX:T,rippleY:k,rippleSize:A,cb:X}=d;f(S=>[...S,N(wt,{classes:{ripple:v(n.ripple,R.ripple),rippleVisible:v(n.rippleVisible,R.rippleVisible),ripplePulsate:v(n.ripplePulsate,R.ripplePulsate),child:v(n.child,R.child),childLeaving:v(n.childLeaving,R.childLeaving),childPulsate:v(n.childPulsate,R.childPulsate)},timeout:he,pulsate:$,rippleX:T,rippleY:k,rippleSize:A},m.current)]),m.current+=1,x.current=X},[n]),O=l.exports.useCallback((d={},$={},T=()=>{})=>{const{pulsate:k=!1,center:A=r||$.pulsate,fakeElement:X=!1}=$;if((d==null?void 0:d.type)==="mousedown"&&b.current){b.current=!1;return}(d==null?void 0:d.type)==="touchstart"&&(b.current=!0);const S=X?null:M.current,F=S?S.getBoundingClientRect():{width:0,height:0,left:0,top:0};let P,V,_;if(A||d===void 0||d.clientX===0&&d.clientY===0||!d.clientX&&!d.touches)P=Math.round(F.width/2),V=Math.round(F.height/2);else{const{clientX:w,clientY:z}=d.touches&&d.touches.length>0?d.touches[0]:d;P=Math.round(w-F.left),V=Math.round(z-F.top)}if(A)_=Math.sqrt((2*F.width**2+F.height**2)/3),_%2===0&&(_+=1);else{const w=Math.max(Math.abs((S?S.clientWidth:0)-P),P)*2+2,z=Math.max(Math.abs((S?S.clientHeight:0)-V),V)*2+2;_=Math.sqrt(w**2+z**2)}d!=null&&d.touches?g.current===null&&(g.current=()=>{Y({pulsate:k,rippleX:P,rippleY:V,rippleSize:_,cb:T})},C.current=setTimeout(()=>{g.current&&(g.current(),g.current=null)},It)):Y({pulsate:k,rippleX:P,rippleY:V,rippleSize:_,cb:T})},[r,Y]),K=l.exports.useCallback(()=>{O({},{pulsate:!0})},[O]),U=l.exports.useCallback((d,$)=>{if(clearTimeout(C.current),(d==null?void 0:d.type)==="touchend"&&g.current){g.current(),g.current=null,C.current=setTimeout(()=>{U(d,$)});return}g.current=null,f(T=>T.length>0?T.slice(1):T),x.current=$},[]);return l.exports.useImperativeHandle(o,()=>({pulsate:K,start:O,stop:U}),[K,O,U]),N(kt,B({className:v(R.root,n.root,s),ref:M},p,{children:N(Et,{component:null,exit:!0,children:c})}))});var Dt=Lt;function Nt(e){return ke("MuiButtonBase",e)}const Ot=be("MuiButtonBase",["root","disabled","focusVisible"]);var Ut=Ot;const At=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],jt=e=>{const{disabled:t,focusVisible:o,focusVisibleClassName:i,classes:r}=e,s=Rt({root:["root",t&&"disabled",o&&"focusVisible"]},Nt,r);return o&&i&&(s.root+=` ${i}`),s},Yt=ee("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${Ut.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),Kt=l.exports.forwardRef(function(t,o){const i=ge({props:t,name:"MuiButtonBase"}),{action:r,centerRipple:n=!1,children:s,className:p,component:c="button",disabled:f=!1,disableRipple:m=!1,disableTouchRipple:x=!1,focusRipple:b=!1,LinkComponent:C="a",onBlur:g,onClick:M,onContextMenu:Y,onDragLeave:O,onFocus:K,onFocusVisible:U,onKeyDown:d,onKeyUp:$,onMouseDown:T,onMouseLeave:k,onMouseUp:A,onTouchEnd:X,onTouchMove:S,onTouchStart:F,tabIndex:P=0,TouchRippleProps:V,touchRippleRef:_,type:w}=i,z=Z(i,At),W=l.exports.useRef(null),E=l.exports.useRef(null),Oe=Be(E,_),{isFocusVisibleRef:$e,onFocus:Ue,onBlur:Ae,ref:je}=lt(),[L,G]=l.exports.useState(!1);f&&L&&G(!1),l.exports.useImperativeHandle(r,()=>({focusVisible:()=>{G(!0),W.current.focus()}}),[]);const[fe,Ye]=l.exports.useState(!1);l.exports.useEffect(()=>{Ye(!0)},[]);const Ke=fe&&!m&&!f;l.exports.useEffect(()=>{L&&b&&!m&&fe&&E.current.pulsate()},[m,b,L,fe]);function I(a,Se,it=x){return Q(Ee=>(Se&&Se(Ee),!it&&E.current&&E.current[a](Ee),!0))}const Xe=I("start",T),We=I("stop",Y),He=I("stop",O),Ge=I("stop",A),qe=I("stop",a=>{L&&a.preventDefault(),k&&k(a)}),Je=I("start",F),Qe=I("stop",X),Ze=I("stop",S),et=I("stop",a=>{Ae(a),$e.current===!1&&G(!1),g&&g(a)},!1),tt=Q(a=>{W.current||(W.current=a.currentTarget),Ue(a),$e.current===!0&&(G(!0),U&&U(a)),K&&K(a)}),de=()=>{const a=W.current;return c&&c!=="button"&&!(a.tagName==="A"&&a.href)},me=l.exports.useRef(!1),ot=Q(a=>{b&&!me.current&&L&&E.current&&a.key===" "&&(me.current=!0,E.current.stop(a,()=>{E.current.start(a)})),a.target===a.currentTarget&&de()&&a.key===" "&&a.preventDefault(),d&&d(a),a.target===a.currentTarget&&de()&&a.key==="Enter"&&!f&&(a.preventDefault(),M&&M(a))}),nt=Q(a=>{b&&a.key===" "&&E.current&&L&&!a.defaultPrevented&&(me.current=!1,E.current.stop(a,()=>{E.current.pulsate(a)})),$&&$(a),M&&a.target===a.currentTarget&&de()&&a.key===" "&&!a.defaultPrevented&&M(a)});let q=c;q==="button"&&(z.href||z.to)&&(q=C);const H={};q==="button"?(H.type=w===void 0?"button":w,H.disabled=f):(!z.href&&!z.to&&(H.role="button"),f&&(H["aria-disabled"]=f));const rt=Be(o,je,W),Te=B({},i,{centerRipple:n,component:c,disabled:f,disableRipple:m,disableTouchRipple:x,focusRipple:b,tabIndex:P,focusVisible:L}),st=jt(Te);return ut(Yt,B({as:q,className:v(st.root,p),ownerState:Te,onBlur:et,onClick:M,onContextMenu:We,onFocus:tt,onKeyDown:ot,onKeyUp:nt,onMouseDown:Xe,onMouseLeave:qe,onMouseUp:Ge,onDragLeave:He,onTouchEnd:Qe,onTouchMove:Ze,onTouchStart:Je,ref:rt,tabIndex:f?-1:P,type:w},H,z,{children:[s,Ke?N(Dt,B({ref:Oe,center:n},V)):null]}))});var Xt=Kt;function Wt(e){return ke("MuiIconButton",e)}const Ht=be("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]);var Gt=Ht;const qt=["edge","children","className","color","disabled","disableFocusRipple","size"],Jt=e=>{const{classes:t,disabled:o,color:i,edge:r,size:n}=e,s={root:["root",o&&"disabled",i!=="default"&&`color${j(i)}`,r&&`edge${j(r)}`,`size${j(n)}`]};return ct(s,Wt,t)},Qt=ee(Xt,{name:"MuiIconButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.color!=="default"&&t[`color${j(o.color)}`],o.edge&&t[`edge${j(o.edge)}`],t[`size${j(o.size)}`]]}})(({theme:e,ownerState:t})=>B({textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:(e.vars||e).palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest})},!t.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:Pe(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},t.edge==="start"&&{marginLeft:t.size==="small"?-3:-12},t.edge==="end"&&{marginRight:t.size==="small"?-3:-12}),({theme:e,ownerState:t})=>B({},t.color==="inherit"&&{color:"inherit"},t.color!=="inherit"&&t.color!=="default"&&B({color:(e.vars||e).palette[t.color].main},!t.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:Pe(e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}}),t.size==="small"&&{padding:5,fontSize:e.typography.pxToRem(18)},t.size==="large"&&{padding:12,fontSize:e.typography.pxToRem(28)},{[`&.${Gt.disabled}`]:{backgroundColor:"transparent",color:(e.vars||e).palette.action.disabled}})),Zt=l.exports.forwardRef(function(t,o){const i=ge({props:t,name:"MuiIconButton"}),{edge:r=!1,children:n,className:s,color:p="default",disabled:c=!1,disableFocusRipple:f=!1,size:m="medium"}=i,x=Z(i,qt),b=B({},i,{edge:r,color:p,disabled:c,disableFocusRipple:f,size:m}),C=Jt(b);return N(Qt,B({className:v(C.root,s),centerRipple:!0,focusRipple:!f,disabled:c,ref:o,ownerState:b},x,{children:n}))});var io=Zt;const eo=l.exports.createContext();var to=eo;function ao(){return l.exports.useContext(to)}export{Xt as B,to as F,io as I,ao as u};
