import{g as K,a as V,s as F,Z as W,_ as i,b as Y,a9 as Z,V as A,K as D,j as G,e as H,P as e,Y as J,U as M,h as Q}from"./Link.d1807b25.js";import{r as X}from"./titleword.5306297c.js";function ee(s){return K("PrivateSwitchBase",s)}V("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const se=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],oe=s=>{const{classes:a,checked:l,disabled:r,edge:n}=s,u={root:["root",l&&"checked",r&&"disabled",n&&`edge${M(n)}`],input:["input"]};return Q(u,ee,a)},te=F(W)(({ownerState:s})=>i({padding:9,borderRadius:"50%"},s.edge==="start"&&{marginLeft:s.size==="small"?-3:-12},s.edge==="end"&&{marginRight:s.size==="small"?-3:-12})),ae=F("input")({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),x=X.exports.forwardRef(function(a,l){const{autoFocus:r,checked:n,checkedIcon:u,className:R,defaultChecked:h,disabled:w,disableFocusRipple:f=!1,edge:S=!1,icon:I,id:P,inputProps:j,inputRef:q,name:O,onBlur:b,onChange:g,onFocus:m,readOnly:v,required:N,tabIndex:U,type:d,value:k}=a,z=Y(a,se),[y,T]=Z({controlled:n,default:Boolean(h),name:"SwitchBase",state:"checked"}),t=A(),_=o=>{m&&m(o),t&&t.onFocus&&t.onFocus(o)},L=o=>{b&&b(o),t&&t.onBlur&&t.onBlur(o)},E=o=>{if(o.nativeEvent.defaultPrevented)return;const C=o.target.checked;T(C),g&&g(o,C)};let c=w;t&&typeof c=="undefined"&&(c=t.disabled);const $=d==="checkbox"||d==="radio",p=i({},a,{checked:y,disabled:c,disableFocusRipple:f,edge:S}),B=oe(p);return D(te,i({component:"span",className:H(B.root,R),centerRipple:!0,focusRipple:!f,disabled:c,tabIndex:null,role:void 0,onFocus:_,onBlur:L,ownerState:p,ref:l},z,{children:[G(ae,i({autoFocus:r,checked:n,defaultChecked:h,className:B.input,disabled:c,id:$&&P,name:O,onChange:E,readOnly:v,ref:q,required:N,ownerState:p,tabIndex:U,type:d},d==="checkbox"&&k===void 0?{}:{value:k},j)),y?u:I]}))});x.propTypes={autoFocus:e.bool,checked:e.bool,checkedIcon:e.node.isRequired,classes:e.object,className:e.string,defaultChecked:e.bool,disabled:e.bool,disableFocusRipple:e.bool,edge:e.oneOf(["end","start",!1]),icon:e.node.isRequired,id:e.string,inputProps:e.object,inputRef:J,name:e.string,onBlur:e.func,onChange:e.func,onFocus:e.func,readOnly:e.bool,required:e.bool,sx:e.object,tabIndex:e.oneOfType([e.number,e.string]),type:e.string.isRequired,value:e.any};var de=x;export{de as S};
