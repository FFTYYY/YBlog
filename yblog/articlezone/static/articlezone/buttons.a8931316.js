var F=Object.defineProperty,B=Object.defineProperties;var D=Object.getOwnPropertyDescriptors;var u=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var m=(t,e,n)=>e in t?F(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,s=(t,e)=>{for(var n in e||(e={}))S.call(e,n)&&m(t,n,e[n]);if(u)for(var n of u(e))I.call(e,n)&&m(t,n,e[n]);return t},l=(t,e)=>B(t,D(e));import{s as p,j as o,B as _,b as d,I as h,a4 as k,e as i,a5 as j,a as c,a6 as f}from"./vendor.7943a1a9.js";import{A as y,c as b,P as z}from"./snackbar.9d1848d3.js";const x=p.exports.createContext(!1);function v(t){let n=t.no_button||!1?_:i,r=l(s({},t),{close_item:void 0,open_item:void 0,no_button:void 0});return o(x.Consumer,{children:a=>o(n,l(s({},r),{children:a?t.open_item:t.close_item}))})}class R extends p.exports.Component{constructor(e){super(e);this.state={open:!1}}render(){let e=this;return o(_,{sx:s({},e.props.sx),children:o(x.Provider,{value:e.state.open,children:d(y,{force_direction:"column",children:[o(v,{close_item:o(b,{title:"\u5C55\u5F00",children:o(h,{size:"small",children:o(k,{fontSize:"small",color:"primary"})})}),open_item:o(i,{startIcon:o(j,{}),color:"primary",children:"\u6536\u655B"}),onClick:()=>{e.setState({open:!e.state.open})},no_button:!0}),e.props.children]})})})}}function w(t){let[e,n]=c.useState(!1),[r,a]=c.useState(!1);return d(c.Fragment,{children:[o(v,{close_item:o(b,{title:"\u4FDD\u5B58",children:o(h,{size:"small",children:o(f,{fontSize:"small",color:"primary"})})}),open_item:o(i,{startIcon:o(f,{}),color:"primary",children:"\u4FDD\u5B58"}),onClick:()=>{t.save_func().then(C=>{a(C),n(!0)})},no_button:!0}),o(z,{info_sucess:"\u4FDD\u5B58\u6210\u529F",info_fail:"\u4FDD\u5B58\u5931\u8D25",open:e,status:r,onClose:()=>n(!1)})]})}export{v as F,w as S,R as a};