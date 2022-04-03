var re=Object.defineProperty;var R=Object.getOwnPropertySymbols;var ne=Object.prototype.hasOwnProperty,ie=Object.prototype.propertyIsEnumerable;var P=(n,e,t)=>e in n?re(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,z=(n,e)=>{for(var t in e||(e={}))ne.call(e,t)&&P(n,t,e[t]);if(R)for(var t of R(e))ie.call(e,t)&&P(n,t,e[t]);return n};var F=(n,e,t)=>(P(n,typeof e!="symbol"?e+"":e,t),t);import{r as T,j as r,b as _,a as d,R as ae}from"./jsx-runtime.71fbd6ab.js";import{g as oe,a as se,s as le,_ as I,u as ue,b as de,c as ce,d as pe,F as he,e as me,T as _e,f as M,h as S,i as B,j as fe,I as C,P as ge,A as w,B as y,k as A,l as $,m as N,n as G,o as K,p as L,D as ve,q as xe,r as be,t as H,v as ye,w as V,x as Fe,y as Ce,z as Ee,C as ze,E as we}from"./snackbar.2a20be8e.js";import{s as Ae,e as Se,w as Pe,E as Be,a as ke,S as U,b as Ie,c as O,l as Me,m as k,M as $e,d as Le}from"./theme.c95222e8.js";import{F as Q,a as De,S as Re}from"./buttons.61b910d1.js";function Te(n){return oe("MuiInputAdornment",n)}const Ne=se("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]);var j=Ne,X;const He=["children","className","component","disablePointerEvents","disableTypography","position","variant"],Ve=(n,e)=>{const{ownerState:t}=n;return[e.root,e[`position${M(t.position)}`],t.disablePointerEvents===!0&&e.disablePointerEvents,e[t.variant]]},Ue=n=>{const{classes:e,disablePointerEvents:t,hiddenLabel:i,position:a,size:s,variant:l}=n,o={root:["root",t&&"disablePointerEvents",a&&`position${M(a)}`,l,i&&"hiddenLabel",s&&`size${M(s)}`]};return pe(o,Te,e)},Oe=le("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:Ve})(({theme:n,ownerState:e})=>I({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:n.palette.action.active},e.variant==="filled"&&{[`&.${j.positionStart}&:not(.${j.hiddenLabel})`]:{marginTop:16}},e.position==="start"&&{marginRight:8},e.position==="end"&&{marginLeft:8},e.disablePointerEvents===!0&&{pointerEvents:"none"})),je=T.exports.forwardRef(function(e,t){const i=ue({props:e,name:"MuiInputAdornment"}),{children:a,className:s,component:l="div",disablePointerEvents:o=!1,disableTypography:f=!1,position:h,variant:u}=i,p=de(i,He),c=ce()||{};let m=u;u&&c.variant,c&&!m&&(m=c.variant);const x=I({},i,{hiddenLabel:c.hiddenLabel,size:c.size,disablePointerEvents:o,position:h,variant:m}),b=Ue(x);return r(he.Provider,{value:null,children:r(Oe,I({as:l,ownerState:x,className:me(b.root,s),ref:t},p,{children:typeof a=="string"&&!f?r(_e,{color:"text.secondary",children:a}):_(T.exports.Fragment,{children:[h==="start"?X||(X=r("span",{className:"notranslate",children:"\u200B"})):null,a]})}))})});var Y=je,W=S(r("path",{d:"M7.5 5.6 10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29a.9959.9959 0 0 0-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.49-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"}),"AutoFixHigh"),Xe=S(r("path",{d:"M18.41 5.8 17.2 4.59c-.78-.78-2.05-.78-2.83 0l-2.68 2.68L3 15.96V20h4.04l8.74-8.74 2.63-2.63c.79-.78.79-2.05 0-2.83zM6.21 18H5v-1.21l8.66-8.66 1.21 1.21L6.21 18zM11 20l4-4h6v4H11z"}),"DriveFileRenameOutline"),Z=S(r("path",{d:"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zM8 13.01l1.41 1.41L11 12.84V17h2v-4.16l1.59 1.59L16 13.01 12.01 9 8 13.01z"}),"DriveFolderUpload"),q=S(r("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4 6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"}),"FileCopy");let Ye={text:n=>r("span",{children:n.children}),inline:n=>r("span",{children:n.children}),paragraph:n=>r("div",{children:n.children}),group:n=>r("div",{children:n.children}),struct:n=>r("div",{children:n.children}),support:n=>r("div",{children:n.children})};var D={initializing:!1};function We(n){D=z(z({},D),n)}function qe(n,e){const t=e.normalizeNode;return e.normalizeNode=i=>{let[a,s]=i;if(D.initializing){t(i);return}if(s.length==0){let l=a,o=l.children.length;if(o==0||!B(l.children[0],"support","\u5C0F\u8282\u7EBF")){n.add_nodes(Ae.makenode(),[0]);return}if(!B(l.children[o-1],"support","\u7AE0\u8282\u7EBF")){n.add_nodes(Se.makenode(),[o]);return}}if(B(a,"support","\u7AE0\u8282\u7EBF")&&(s.length!=1||s[0]!=e.children.length-1)){n.delete_node_by_path(s);return}t(i)},e}function Je(n,e){const t=e.normalizeNode;return e.normalizeNode=i=>{let[a,s]=i;if(fe(a)){let l=a,o=l.type,f=l.name,h=n.core.get_style(o,f);if(h==null){t(i);return}let u=h.parameter_prototype,p=z({},l.parameters),c=!1;for(let m of Object.keys(u))p[m]==null&&(p[m]=u[m],c=!0);if(c){n.set_node(l,{parameters:p});return}}t(i)},e}let J=We,Ge=[qe,Je];function Ke(n,e){for(let t of Ge)e=t(n,e);return e}class Qe extends d.Component{constructor(e){super(e);this.state={resources:[]}}async effect(){let e=await C.get.resources();this.setState({resources:e})}async componentDidMount(){this.effect()}SubCard(e){let t=this,[i,a,s]=[e.id,e.name,e.url],[l,o]=d.useState(e.name),[f,h]=d.useState(!1),[u,p]=d.useState(!1),[c,m]=d.useState(!1),[x,b]=d.useState(!1);return r(ge,{variant:"outlined",sx:{position:"relative",marginTop:"1rem",marginX:"1rem",marginBottom:"1rem",paddingY:"0.7rem"},children:_(w,{force_direction:"row",children:[r(y,{sx:{flex:1},children:_(w,{children:[r(A,{variant:"standard",label:"name",defaultValue:a,fullWidth:!0,onChange:v=>{o(v.target.value)}}),r(A,{variant:"standard",label:"url",defaultValue:s,fullWidth:!0,sx:{marginTop:"1rem"},InputProps:{readOnly:!0}})]})}),r(y,{children:_(w,{children:[r($,{title:"\u66F4\u6539\u8D44\u6E90\u540D",icon:Xe,onClick:async v=>{let E={name:l},g=await C.post.manage_recourse(!1,E,i);m(g),h(!0)}}),_("label",{children:[r("input",{type:"file",style:{display:"none"},onChange:async v=>{if(v.target.files.length<=0)b(!1);else{var E=new FormData;E.append("file",v.target.files[0]);let g=await C.post.manage_recourse(!0,E,i);b(g),g&&t.effect()}p(!0)}}),r($,{title:"\u66FF\u6362\u6587\u4EF6",icon:Z,component:"span"})]})]})}),r(N,{info_sucess:"\u4FEE\u6539\u6587\u4EF6\u540D\u6210\u529F",info_fail:"\u4FEE\u6539\u6587\u4EF6\u540D\u5931\u8D25",open:f,status:c,onClose:()=>{h(!1)}}),r(N,{info_sucess:"\u4E0A\u4F20\u6587\u4EF6\u6210\u529F",info_fail:"\u4E0A\u4F20\u6587\u4EF6\u5931\u8D25",open:u,status:x,onClose:()=>{p(!1)}})]})})}render(){let e=this;return r(y,{sx:t=>z({},t.printer.typography.body),children:r(w,{force_direction:"column",children:e.state.resources.map((t,i)=>{let[a,s,l]=t,o=e.SubCard.bind(e);return r(d.Fragment,{children:r(o,{id:a,name:s,url:l})},i)})})})}}function Ze(n){let[e,t]=d.useState(!1);return _(d.Fragment,{children:[r(Q,{close_item:r(G,{title:"\u67E5\u770B/\u7BA1\u7406\u6587\u4EF6",children:r(K,{size:"small",children:r(q,{fontSize:"small",color:"primary"})})}),open_item:r(L,{startIcon:r(q,{}),color:"primary",children:"\u67E5\u770B/\u7BA1\u7406\u6587\u4EF6"}),onClick:()=>{t(!0)},no_button:!0}),r(ve,{anchor:"left",open:e,onClose:()=>t(!1),ModalProps:{keepMounted:!0},SlideProps:{onExited:()=>{}},PaperProps:{sx:{width:"40%"}},children:r(Qe,{})})]})}function et(n,e,t){function i(s,l){if(be(s)){for(let u in s.children){let p=s.children[u];if(i(p,[...l,Number(u)]))return!0}return}let o=s.text,f=/([^\$]|^)(\$[^\$]+?\$)([^\$]|$)/.exec(o),h=/\$\$[^\$]+?\$\$/.exec(o);if(f){let u=f,p=u.index+u[1].length,c=u[2],m=u.index+u[1].length+c.length,x=o.slice(0,p),b=o.slice(m,o.length),v=c.slice(1,c.length-1),g=n.proxies.inline[e].makenode();return g.children=[{text:v}],n.delete_node_by_path(l),n.add_nodes([{text:x},g,{text:b}],l),!0}if(h){let u=h,p=u.index,c=u[0],m=u.index+c.length,x=o.slice(0,p),b=o.slice(m,o.length),v=c.slice(2,c.length-2),g=n.proxies.group[t].makenode();g.children=[{text:v}];let ee=H(x),te=H(b);return n.delete_node_by_path(l),n.add_nodes([ee,g,te],l),!0}return!1}let a=0;for(;i(n.get_root(),[]);)if(a++,a>0){console.log("\u592A\u591A\u6570\u5B66...");break}}function tt(n){const[e,t]=d.useState(null),[i,a]=d.useState("\u6570\u5B66-\u884C\u5185"),[s,l]=d.useState("\u6570\u5B66-\u5757");return _(d.Fragment,{children:[r(Q,{close_item:r(G,{title:"\u5904\u7406\u6570\u5B66",children:r(K,{size:"small",children:r(W,{fontSize:"small",color:"primary"})})}),open_item:r(L,{startIcon:r(W,{}),color:"primary",children:"\u5904\u7406\u6570\u5B66"}),onClick:o=>{t(o.currentTarget)},no_button:!0}),r(xe,{open:Boolean(e),anchorEl:e,onClose:()=>{t(void 0)},anchorOrigin:{vertical:"center",horizontal:"right"},transformOrigin:{vertical:"center",horizontal:"left"},sx:{paddingX:"4rem",paddingY:"2rem"},children:_(w,{force_direction:"column",children:[r(A,{label:"\u884C\u5185\u516C\u5F0F\u7684Style\u540D",defaultValue:i,InputProps:{startAdornment:r(Y,{position:"start",children:"$...$ = "})},sx:{marginBottom:"0.5rem",marginTop:"1rem"},onChange:o=>{a(o.target.value)}}),r(A,{label:"\u5757\u7EA7\u516C\u5F0F\u7684Style\u540D",defaultValue:s,InputProps:{startAdornment:r(Y,{position:"start",children:"$$...$$ = "})},sx:{marginY:"0.5rem"},onChange:o=>{l(o.target.value)}}),r(L,{variant:"outlined",sx:{width:"50%",marginX:"auto",marginY:"0.5rem"},onClick:()=>{et(n.get_editor(),i,s)},children:"\u5F00\u59CB\uFF01"})]})})]})}class rt extends d.Component{constructor(e){super(e);F(this,"core");F(this,"editor_renderers");F(this,"printer_renderers");F(this,"printer_ref");F(this,"editor_ref");F(this,"savebutton_ref");this.core=Pe(new Be([])),this.editor_renderers=ke(new U(this.core,Ye)),this.printer_renderers=Ie(new U(this.core,ye)),this.state={editor_proxies:O({inline:{},group:{},struct:{},support:{},abstract:{}})},this.editor_ref=d.createRef(),this.printer_ref=d.createRef(),this.savebutton_ref=d.createRef()}async componentDidMount(){let e=O({inline:{},group:{},struct:{},support:{},abstract:{}}),t=await C.get.concept();for(let[l,o,f,h]of t){let u=Le(o,l,f,h);e[u.get_styletype()][l]=u}this.setState({editor_proxies:e});var i=await C.get.content();for(i=i||we("root",{title:{val:"",type:"string"}}),J({initializing:!0});!this.get_editor(););let a=this.get_editor();for(a.replace_nodes(a.get_root(),i.children),a.set_node(a.get_root(),{parameters:i.parameters,hiddens:i.hiddens}),this.editor_ref.current.forceUpdate(),J({initializing:!1});!this.get_printer(););let s=this.get_printer();s.update(i),V.linkto&&Me(s,Number(V.linkto))}get_editor(){if(this.editor_ref&&this.editor_ref.current)return this.editor_ref.current.get_editor()}get_printer(){if(this.printer_ref&&this.printer_ref.current)return this.printer_ref.current.get_printer()}get_save_button(){if(this.savebutton_ref&&this.savebutton_ref.current)return this.savebutton_ref.current}async save_content(){let e=this.get_editor();if(e){var t={content:e.get_root()};return await C.post.content(t)}return!1}async post_file(e){var t=new FormData;return t.append("file",e[0]),await C.post.file(t)}update_printer(){let e=this.get_printer(),t=this.get_editor();e&&t&&e.update(t.get_root())}extra_buttons(e){let t=this;return r(d.Fragment,{children:r(y,{sx:{marginX:"auto"},children:_("label",{children:[r("input",{type:"file",style:{display:"none"},onChange:i=>{i.target.files.length>0&&t.post_file(i.target.files)}}),r($,{title:"\u4E0A\u4F20",icon:Z,component:"span"})]})})})}mainpart(e){let t=this,i=this.extra_buttons.bind(this);return _(y,{sx:e.sx,children:[r(y,{sx:{position:"absolute",width:"49%",left:"0%",top:"0",height:"100%"},children:r(Fe,{ref:t.editor_ref,core:t.core,renderers:t.editor_renderers,proxies:t.state.editor_proxies,theme:k,onFocusChange:()=>{let a=t.get_printer(),s=t.get_editor();a&&s&&s.get_slate().selection&&a.scroll_to(s.get_slate().selection.focus.path)},onUpdate:()=>{},onSave:()=>{t.update_printer();let a=t.get_save_button();a&&a.click()},extra_buttons:r(i,{}),plugin:Ke})}),r(y,{sx:{position:"absolute",width:"49%",left:"51%",top:"0",height:"100%"},children:r(Ce,{ref:this.printer_ref,core:this.core,renderers:this.printer_renderers,theme:k})})]})}render(){let e=this,t=this.mainpart.bind(this);return r(Ee,{theme:ze(k),children:r(y,{sx:{position:"absolute",top:"2%",left:"1%",height:"96%",width:"98%",display:"flex"},children:_($e,{children:[_(De,{sx:{marginRight:"1%"},children:[r(Re,{ref:e.savebutton_ref,save_func:e.save_content.bind(e)}),r(Ze,{}),r(tt,{get_editor:()=>e.get_editor()})]}),r(t,{sx:{position:"relative",width:"100%",height:"100%",flex:1}})]})})})}}ae.render(r(d.StrictMode,{children:r(rt,{})}),document.getElementById("root"));