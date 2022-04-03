var ae=Object.defineProperty,oe=Object.defineProperties;var se=Object.getOwnPropertyDescriptors;var R=Object.getOwnPropertySymbols;var le=Object.prototype.hasOwnProperty,ue=Object.prototype.propertyIsEnumerable;var P=(n,e,t)=>e in n?ae(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,z=(n,e)=>{for(var t in e||(e={}))le.call(e,t)&&P(n,t,e[t]);if(R)for(var t of R(e))ue.call(e,t)&&P(n,t,e[t]);return n},T=(n,e)=>oe(n,se(e));var F=(n,e,t)=>(P(n,typeof e!="symbol"?e+"":e,t),t);import{r as N,j as r,b as m,a as d,R as de}from"./jsx-runtime.71fbd6ab.js";import{g as ce,a as pe,s as he,_ as I,u as _e,b as me,c as fe,d as ge,F as xe,e as ye,T as ve,f as M,h as S,i as B,j as K,I as C,P as be,A as w,B as b,k as A,l as $,m as H,n as Q,o as Z,p as L,D as Fe,q as Ce,r as ee,t as V,v as Ee,w as U,x as ze,y as we,z as Ae,C as Se,E as Pe}from"./snackbar.85e8f309.js";import{s as Be,e as ke,w as Ie,E as Me,a as $e,S as O,b as Le,c as j,l as De,m as k,M as Re,d as Te}from"./theme.6a63b00d.js";import{F as te,a as Ne,S as He}from"./buttons.f3c5c81c.js";function Ve(n){return ce("MuiInputAdornment",n)}const Ue=pe("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]);var X=Ue,Y;const Oe=["children","className","component","disablePointerEvents","disableTypography","position","variant"],je=(n,e)=>{const{ownerState:t}=n;return[e.root,e[`position${M(t.position)}`],t.disablePointerEvents===!0&&e.disablePointerEvents,e[t.variant]]},Xe=n=>{const{classes:e,disablePointerEvents:t,hiddenLabel:a,position:i,size:s,variant:o}=n,l={root:["root",t&&"disablePointerEvents",i&&`position${M(i)}`,o,a&&"hiddenLabel",s&&`size${M(s)}`]};return ge(l,Ve,e)},Ye=he("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:je})(({theme:n,ownerState:e})=>I({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:n.palette.action.active},e.variant==="filled"&&{[`&.${X.positionStart}&:not(.${X.hiddenLabel})`]:{marginTop:16}},e.position==="start"&&{marginRight:8},e.position==="end"&&{marginLeft:8},e.disablePointerEvents===!0&&{pointerEvents:"none"})),We=N.exports.forwardRef(function(e,t){const a=_e({props:e,name:"MuiInputAdornment"}),{children:i,className:s,component:o="div",disablePointerEvents:l=!1,disableTypography:f=!1,position:_,variant:u}=a,p=me(a,Oe),c=fe()||{};let h=u;u&&c.variant,c&&!h&&(h=c.variant);const g=I({},a,{hiddenLabel:c.hiddenLabel,size:c.size,disablePointerEvents:l,position:_,variant:h}),v=Xe(g);return r(xe.Provider,{value:null,children:r(Ye,I({as:o,ownerState:g,className:ye(v.root,s),ref:t},p,{children:typeof i=="string"&&!f?r(ve,{color:"text.secondary",children:i}):m(N.exports.Fragment,{children:[_==="start"?Y||(Y=r("span",{className:"notranslate",children:"\u200B"})):null,i]})}))})});var W=We,q=S(r("path",{d:"M7.5 5.6 10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29a.9959.9959 0 0 0-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.49-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"}),"AutoFixHigh"),qe=S(r("path",{d:"M18.41 5.8 17.2 4.59c-.78-.78-2.05-.78-2.83 0l-2.68 2.68L3 15.96V20h4.04l8.74-8.74 2.63-2.63c.79-.78.79-2.05 0-2.83zM6.21 18H5v-1.21l8.66-8.66 1.21 1.21L6.21 18zM11 20l4-4h6v4H11z"}),"DriveFileRenameOutline"),re=S(r("path",{d:"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zM8 13.01l1.41 1.41L11 12.84V17h2v-4.16l1.59 1.59L16 13.01 12.01 9 8 13.01z"}),"DriveFolderUpload"),J=S(r("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4 6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"}),"FileCopy");let Je={text:n=>r("span",{children:n.children}),inline:n=>r("span",{children:n.children}),paragraph:n=>r("div",{children:n.children}),group:n=>r("div",{children:n.children}),struct:n=>r("div",{children:n.children}),support:n=>r("div",{children:n.children})};var D={initializing:!1};function Ge(n){D=z(z({},D),n)}function Ke(n,e){const t=e.normalizeNode;return e.normalizeNode=a=>{let[i,s]=a;if(D.initializing){t(a);return}if(s.length==0){let o=i,l=o.children.length;if(l==0||!B(o.children[0],"support","\u5C0F\u8282\u7EBF")){n.add_nodes(Be.makenode(),[0]);return}if(!B(o.children[l-1],"support","\u7AE0\u8282\u7EBF")){n.add_nodes(ke.makenode(),[l]);return}}if(B(i,"support","\u7AE0\u8282\u7EBF")&&(s.length!=1||s[0]!=e.children.length-1)){n.delete_node_by_path(s);return}t(a)},e}function Qe(n,e){const t=e.normalizeNode;return e.normalizeNode=a=>{let[i,s]=a;if(K(i)){let o=i,l=o.type,f=o.name,_=n.core.get_style(l,f);if(_==null){t(a);return}let u=_.parameter_prototype,p=z({},o.parameters),c=!1;for(let h of Object.keys(u))p[h]==null&&(p[h]=u[h],c=!0);if(c){if(o.proxy_info&&o.proxy_info.proxy_name){let g=n.get_proxy(l,o.proxy_info.proxy_name).get_proxy_parameters(p);n.set_node(o,{parameters:p,proxy_info:T(z({},o.proxy_info),{proxy_params:g})})}else n.set_node(o,{parameters:p});return}}t(a)},e}let G=Ge,Ze=[Ke,Qe];function et(n,e){for(let t of Ze)e=t(n,e);return e}class tt extends d.Component{constructor(e){super(e);this.state={resources:[]}}async effect(){let e=await C.get.resources();this.setState({resources:e})}async componentDidMount(){this.effect()}SubCard(e){let t=this,[a,i,s]=[e.id,e.name,e.url],[o,l]=d.useState(e.name),[f,_]=d.useState(!1),[u,p]=d.useState(!1),[c,h]=d.useState(!1),[g,v]=d.useState(!1);return r(be,{variant:"outlined",sx:{position:"relative",marginTop:"1rem",marginX:"1rem",marginBottom:"1rem",paddingY:"0.7rem"},children:m(w,{force_direction:"row",children:[r(b,{sx:{flex:1},children:m(w,{children:[r(A,{variant:"standard",label:"name",defaultValue:i,fullWidth:!0,onChange:y=>{l(y.target.value)}}),r(A,{variant:"standard",label:"url",defaultValue:s,fullWidth:!0,sx:{marginTop:"1rem"},InputProps:{readOnly:!0}})]})}),r(b,{children:m(w,{children:[r($,{title:"\u66F4\u6539\u8D44\u6E90\u540D",icon:qe,onClick:async y=>{let E={name:o},x=await C.post.manage_recourse(!1,E,a);h(x),_(!0)}}),m("label",{children:[r("input",{type:"file",style:{display:"none"},onChange:async y=>{if(y.target.files.length<=0)v(!1);else{var E=new FormData;E.append("file",y.target.files[0]);let x=await C.post.manage_recourse(!0,E,a);v(x),x&&t.effect()}p(!0)}}),r($,{title:"\u66FF\u6362\u6587\u4EF6",icon:re,component:"span"})]})]})}),r(H,{info_sucess:"\u4FEE\u6539\u6587\u4EF6\u540D\u6210\u529F",info_fail:"\u4FEE\u6539\u6587\u4EF6\u540D\u5931\u8D25",open:f,status:c,onClose:()=>{_(!1)}}),r(H,{info_sucess:"\u4E0A\u4F20\u6587\u4EF6\u6210\u529F",info_fail:"\u4E0A\u4F20\u6587\u4EF6\u5931\u8D25",open:u,status:g,onClose:()=>{p(!1)}})]})})}render(){let e=this;return r(b,{sx:t=>z({},t.printer.typography.body),children:r(w,{force_direction:"column",children:e.state.resources.map((t,a)=>{let[i,s,o]=t,l=e.SubCard.bind(e);return r(d.Fragment,{children:r(l,{id:i,name:s,url:o})},a)})})})}}function rt(n){let[e,t]=d.useState(!1);return m(d.Fragment,{children:[r(te,{close_item:r(Q,{title:"\u67E5\u770B/\u7BA1\u7406\u6587\u4EF6",children:r(Z,{size:"small",children:r(J,{fontSize:"small",color:"primary"})})}),open_item:r(L,{startIcon:r(J,{}),color:"primary",children:"\u67E5\u770B/\u7BA1\u7406\u6587\u4EF6"}),onClick:()=>{t(!0)},no_button:!0}),r(Fe,{anchor:"left",open:e,onClose:()=>t(!1),ModalProps:{keepMounted:!0},SlideProps:{onExited:()=>{}},PaperProps:{sx:{width:"40%"}},children:r(tt,{})})]})}function nt(n,e,t){function a(s,o){if(ee(s)){for(let u in s.children){let p=s.children[u];if(a(p,[...o,Number(u)]))return!0}return}let l=s.text,f=/([^\$]|^)(\$[^\$]+?\$)([^\$]|$)/.exec(l),_=/\$\$[^\$]+?\$\$/.exec(l);if(f){let u=f,p=u.index+u[1].length,c=u[2],h=u.index+u[1].length+c.length,g=l.slice(0,p),v=l.slice(h,l.length),y=c.slice(1,c.length-1),x=n.proxies.inline[e].makenode();return x.children=[{text:y}],n.delete_node_by_path(o),n.add_nodes([{text:g},x,{text:v}],o),!0}if(_){let u=_,p=u.index,c=u[0],h=u.index+c.length,g=l.slice(0,p),v=l.slice(h,l.length),y=c.slice(2,c.length-2),x=n.proxies.group[t].makenode();x.children=[{text:y}];let ne=V(g),ie=V(v);return n.delete_node_by_path(o),n.add_nodes([ne,x,ie],o),!0}return!1}let i=0;for(;a(n.get_root(),[]);)if(i++,i>0){console.log("\u592A\u591A\u6570\u5B66...");break}}function it(n){const[e,t]=d.useState(null),[a,i]=d.useState("\u6570\u5B66-\u884C\u5185"),[s,o]=d.useState("\u6570\u5B66-\u5757");return m(d.Fragment,{children:[r(te,{close_item:r(Q,{title:"\u5904\u7406\u6570\u5B66",children:r(Z,{size:"small",children:r(q,{fontSize:"small",color:"primary"})})}),open_item:r(L,{startIcon:r(q,{}),color:"primary",children:"\u5904\u7406\u6570\u5B66"}),onClick:l=>{t(l.currentTarget)},no_button:!0}),r(Ce,{open:Boolean(e),anchorEl:e,onClose:()=>{t(void 0)},anchorOrigin:{vertical:"center",horizontal:"right"},transformOrigin:{vertical:"center",horizontal:"left"},sx:{paddingX:"4rem",paddingY:"2rem"},children:m(w,{force_direction:"column",children:[r(A,{label:"\u884C\u5185\u516C\u5F0F\u7684Style\u540D",defaultValue:a,InputProps:{startAdornment:r(W,{position:"start",children:"$...$ = "})},sx:{marginBottom:"0.5rem",marginTop:"1rem"},onChange:l=>{i(l.target.value)}}),r(A,{label:"\u5757\u7EA7\u516C\u5F0F\u7684Style\u540D",defaultValue:s,InputProps:{startAdornment:r(W,{position:"start",children:"$$...$$ = "})},sx:{marginY:"0.5rem"},onChange:l=>{o(l.target.value)}}),r(L,{variant:"outlined",sx:{width:"50%",marginX:"auto",marginY:"0.5rem"},onClick:()=>{nt(n.get_editor(),a,s)},children:"\u5F00\u59CB\uFF01"})]})})]})}class at extends d.Component{constructor(e){super(e);F(this,"core");F(this,"editor_renderers");F(this,"printer_renderers");F(this,"printer_ref");F(this,"editor_ref");F(this,"savebutton_ref");this.core=Ie(new Me([])),this.editor_renderers=$e(new O(this.core,Je)),this.printer_renderers=Le(new O(this.core,Ee)),this.state={editor_proxies:j({inline:{},group:{},struct:{},support:{},abstract:{}})},this.editor_ref=d.createRef(),this.printer_ref=d.createRef(),this.savebutton_ref=d.createRef()}set_proxy_params(e,t){function a(i){if(K(i)&&i.proxy_info&&i.proxy_info.proxy_name){let o=e.get_proxy(i.type,i.proxy_info.proxy_name).get_proxy_parameters(i.parameters);i.proxy_info.proxy_params=o}if(ee(i))for(let s of i.children)a(s)}return a(t),t}async componentDidMount(){let e=j({inline:{},group:{},struct:{},support:{},abstract:{}}),t=await C.get.concept();for(let[o,l,f,_]of t){let u=Te(l,o,f,_);e[u.get_styletype()][o]=u}this.setState({editor_proxies:e});var a=await C.get.content();for(a=a||Pe("root",{title:{val:"",type:"string"}}),G({initializing:!0});!this.get_editor(););let i=this.get_editor();for(a=this.set_proxy_params(i,a),i.replace_nodes(i.get_root(),a.children),i.set_node(i.get_root(),{parameters:a.parameters,hiddens:a.hiddens}),this.editor_ref.current.forceUpdate(),G({initializing:!1});!this.get_printer(););let s=this.get_printer();s.update(a),U.linkto&&De(s,Number(U.linkto))}get_editor(){if(this.editor_ref&&this.editor_ref.current)return this.editor_ref.current.get_editor()}get_printer(){if(this.printer_ref&&this.printer_ref.current)return this.printer_ref.current.get_printer()}get_save_button(){if(this.savebutton_ref&&this.savebutton_ref.current)return this.savebutton_ref.current}async save_content(){let e=this.get_editor();if(e){var t={content:e.get_root()};return await C.post.content(t)}return!1}async post_file(e){var t=new FormData;return t.append("file",e[0]),await C.post.file(t)}update_printer(){let e=this.get_printer(),t=this.get_editor();!(e&&t)||e.update(t.get_root())}extra_buttons(e){let t=this;return r(d.Fragment,{children:r(b,{sx:{marginX:"auto"},children:m("label",{children:[r("input",{type:"file",style:{display:"none"},onChange:a=>{a.target.files.length>0&&t.post_file(a.target.files)}}),r($,{title:"\u4E0A\u4F20",icon:re,component:"span"})]})})})}mainpart(e){let t=this,a=this.extra_buttons.bind(this);return m(b,{sx:e.sx,children:[r(b,{sx:{position:"absolute",width:"49%",left:"0%",top:"0",height:"100%"},children:r(ze,{ref:t.editor_ref,core:t.core,renderers:t.editor_renderers,proxies:t.state.editor_proxies,theme:k,onFocusChange:()=>{let i=t.get_printer(),s=t.get_editor();i&&s&&s.get_slate().selection&&i.scroll_to(s.get_slate().selection.focus.path)},onUpdate:()=>{},onSave:()=>{t.update_printer();let i=t.get_save_button();i&&i.click()},extra_buttons:r(a,{}),plugin:et})}),r(b,{sx:{position:"absolute",width:"49%",left:"51%",top:"0",height:"100%"},children:r(we,{ref:this.printer_ref,core:this.core,renderers:this.printer_renderers,theme:k})})]})}render(){let e=this,t=this.mainpart.bind(this);return r(Ae,{theme:Se(k),children:r(b,{sx:{position:"absolute",top:"2%",left:"1%",height:"96%",width:"98%",display:"flex"},children:m(Re,{children:[m(Ne,{sx:{marginRight:"1%"},children:[r(He,{ref:e.savebutton_ref,save_func:e.save_content.bind(e)}),r(rt,{}),r(it,{get_editor:()=>e.get_editor()})]}),r(t,{sx:{position:"relative",width:"100%",height:"100%",flex:1}})]})})})}}de.render(r(d.StrictMode,{children:r(at,{})}),document.getElementById("root"));