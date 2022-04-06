var oe=Object.defineProperty,ae=Object.defineProperties;var se=Object.getOwnPropertyDescriptors;var R=Object.getOwnPropertySymbols;var le=Object.prototype.hasOwnProperty,ue=Object.prototype.propertyIsEnumerable;var P=(n,e,t)=>e in n?oe(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,S=(n,e)=>{for(var t in e||(e={}))le.call(e,t)&&P(n,t,e[t]);if(R)for(var t of R(e))ue.call(e,t)&&P(n,t,e[t]);return n},H=(n,e)=>ae(n,se(e));var C=(n,e,t)=>(P(n,typeof e!="symbol"?e+"":e,t),t);import{r as L,j as r,b as v,a as c,R as ce}from"./jsx-runtime.71fbd6ab.js";import{g as de,a as pe,s as he,_ as $,u as _e,b as me,c as fe,d as ge,F as xe,e as ye,T as ve,f as N,h as B,i as be,j as I,k as G,I as F,B as b,A as z,P as Fe,l as w,m as A,n as T,o as K,p as Q,q as k,D as Ce,C as Ee,r as Z,t as ee,v as O,w as Se,x as U,y as D,z as ze,E as we,G as Ae,H as ke,J as Be}from"./snackbar.0f1a24cf.js";import{s as Pe,e as Ie,w as De,E as Me,a as Le,S as V,b as $e,c as j,l as Ne,m as M,M as Te,d as Re}from"./theme.ceb1da97.js";import{F as te,a as He,S as Oe}from"./buttons.3cd2ad1d.js";function Ue(n){return de("MuiInputAdornment",n)}const Ve=pe("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]);var J=Ve,X;const je=["children","className","component","disablePointerEvents","disableTypography","position","variant"],Je=(n,e)=>{const{ownerState:t}=n;return[e.root,e[`position${N(t.position)}`],t.disablePointerEvents===!0&&e.disablePointerEvents,e[t.variant]]},Xe=n=>{const{classes:e,disablePointerEvents:t,hiddenLabel:o,position:i,size:s,variant:a}=n,l={root:["root",t&&"disablePointerEvents",i&&`position${N(i)}`,a,o&&"hiddenLabel",s&&`size${N(s)}`]};return ge(l,Ue,e)},Ye=he("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:Je})(({theme:n,ownerState:e})=>$({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:n.palette.action.active},e.variant==="filled"&&{[`&.${J.positionStart}&:not(.${J.hiddenLabel})`]:{marginTop:16}},e.position==="start"&&{marginRight:8},e.position==="end"&&{marginLeft:8},e.disablePointerEvents===!0&&{pointerEvents:"none"})),We=L.exports.forwardRef(function(e,t){const o=_e({props:e,name:"MuiInputAdornment"}),{children:i,className:s,component:a="div",disablePointerEvents:l=!1,disableTypography:g=!1,position:x,variant:u}=o,f=me(o,je),d=fe()||{};let h=u;u&&d.variant,d&&!h&&(h=d.variant);const p=$({},o,{hiddenLabel:d.hiddenLabel,size:d.size,disablePointerEvents:l,position:x,variant:h}),_=Xe(p);return r(xe.Provider,{value:null,children:r(Ye,$({as:a,ownerState:p,className:ye(_.root,s),ref:t},f,{children:typeof i=="string"&&!g?r(ve,{color:"text.secondary",children:i}):v(L.exports.Fragment,{children:[x==="start"?X||(X=r("span",{className:"notranslate",children:"\u200B"})):null,i]})}))})});var Y=We,W=B(r("path",{d:"M7.5 5.6 10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29a.9959.9959 0 0 0-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.49-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"}),"AutoFixHigh"),qe=B(r("path",{d:"M18.41 5.8 17.2 4.59c-.78-.78-2.05-.78-2.83 0l-2.68 2.68L3 15.96V20h4.04l8.74-8.74 2.63-2.63c.79-.78.79-2.05 0-2.83zM6.21 18H5v-1.21l8.66-8.66 1.21 1.21L6.21 18zM11 20l4-4h6v4H11z"}),"DriveFileRenameOutline"),re=B(r("path",{d:"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zM8 13.01l1.41 1.41L11 12.84V17h2v-4.16l1.59 1.59L16 13.01 12.01 9 8 13.01z"}),"DriveFolderUpload"),q=B(r("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4 6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"}),"FileCopy");let Ge={text:n=>r("span",{children:n.children}),inline:n=>r("span",{children:n.children}),paragraph:n=>r("div",{children:n.children}),group:n=>r("div",{children:n.children}),struct:n=>r("div",{children:n.children}),support:n=>r("div",{children:n.children})};function Ke(n,e){const t=e.normalizeNode;return e.normalizeNode=o=>{let[i,s]=o;if(be("initializing")){t(o);return}if(s.length==0){let a=i,l=a.children.length;if(l==0||!I(a.children[0],"support","\u5C0F\u8282\u7EBF")){n.add_nodes(Pe.makenode(),[0]);return}if(!I(a.children[l-1],"support","\u7AE0\u8282\u7EBF")){n.add_nodes(Ie.makenode(),[l]);return}}if(I(i,"support","\u7AE0\u8282\u7EBF")&&(s.length!=1||s[0]!=e.children.length-1)){n.delete_node_by_path(s);return}t(o)},e}function Qe(n,e){const t=e.normalizeNode;return e.normalizeNode=o=>{let[i,s]=o;if(G(i)){let a=i,l=a.type,g=a.name,x=n.core.get_style(l,g);if(x==null){t(o);return}let u=a.proxy_info&&a.proxy_info.proxy_name,f=!1,d=x.parameter_prototype,h=S({},a.parameters);for(let _ of Object.keys(d))h[_]==null&&(h[_]=d[_],f=!0);let p={};if(u){let y=n.get_proxy(l,a.proxy_info.proxy_name).get_proxy_parameters(h);p=S({},a.proxy_info.proxy_params||{});for(let m of Object.keys(y))p[m]==null?(p[m]=y[m],f=!0):p[m].type=="choice"&&JSON.stringify(p[m].choices)!=JSON.stringify(y[m].choices)&&(p[m]={val:p[m].val,type:"choice",choices:y[m].choices},f=!0)}if(f){u?n.set_node(a,{parameters:h,proxy_info:H(S({},a.proxy_info),{proxy_params:p})}):n.set_node(a,{parameters:h});return}}t(o)},e}let Ze=[Ke,Qe];function et(n,e){for(let t of Ze)e=t(n,e);return e}function tt(n){let[e,t]=c.useState(void 0),[o,i]=c.useState(!1),[s,a]=c.useState(!1);return v(c.Fragment,{children:[r(A,{title:"\u5220\u9664\u8D44\u6E90",icon:Ee,onClick:async l=>{t(l.currentTarget)}}),r(Z,{anchorEl:e,open:!!e,onClose:l=>t(void 0),anchorOrigin:{vertical:"center",horizontal:"right"},children:r(k,{onClick:async l=>{let g=await F.post.delete_resource(n.resource_id);a(g),i(!0),t(void 0),g&&n.onSuccess&&n.onSuccess()},children:"\u786E\u5B9A\uFF1F"})}),r(T,{info_sucess:"\u5220\u9664\u6210\u529F",info_fail:"\u5220\u9664\u5931\u8D25",open:o,status:s,onClose:()=>{i(!1)}})]})}function rt(n){let[e,t,o]=[n.id,n.name,n.url],[i,s]=c.useState(t),[a,l]=c.useState(!1),[g,x]=c.useState(!1),[u,f]=c.useState(!1),[d,h]=c.useState(!1);L.exports.useEffect(()=>{s(t)},[t]);let p=n.onSuccess||(()=>{});return r(Fe,{variant:"outlined",sx:{position:"relative",marginTop:"1rem",marginX:"1rem",marginBottom:"1rem",paddingY:"0.7rem"},children:v(z,{force_direction:"row",children:[r(b,{sx:{flex:1},children:v(z,{children:[r(w,{variant:"standard",label:"name",value:i,fullWidth:!0,onChange:_=>{s(_.target.value)}}),r(w,{variant:"standard",label:"url",value:o,fullWidth:!0,sx:{marginTop:"1rem"},InputProps:{readOnly:!0}})]})}),r(b,{children:v(z,{children:[r(A,{title:"\u66F4\u6539\u8D44\u6E90\u540D",icon:qe,onClick:async _=>{let y={name:i},m=await F.post.manage_recourse(!1,y,e);f(m),l(!0)}}),v("label",{children:[r("input",{type:"file",style:{display:"none"},onChange:async _=>{if(_.target.files.length<=0)h(!1);else{var y=new FormData;y.append("file",_.target.files[0]);let m=await F.post.manage_recourse(!0,y,e);h(m),m&&p()}x(!0)}}),r(A,{title:"\u66FF\u6362\u6587\u4EF6",icon:re,component:"span"})]}),r(tt,{resource_id:e,onSuccess:p})]})}),r(T,{info_sucess:"\u4FEE\u6539\u6587\u4EF6\u540D\u6210\u529F",info_fail:"\u4FEE\u6539\u6587\u4EF6\u540D\u5931\u8D25",open:a,status:u,onClose:()=>{l(!1)}}),r(T,{info_sucess:"\u4E0A\u4F20\u6587\u4EF6\u6210\u529F",info_fail:"\u4E0A\u4F20\u6587\u4EF6\u5931\u8D25",open:g,status:d,onClose:()=>{x(!1)}})]})})}class nt extends c.Component{constructor(e){super(e);this.state={resources:[]}}async effect(){let e=await F.get.resources();this.setState({resources:e}),this.forceUpdate()}async componentDidMount(){this.effect()}render(){let e=this;return r(b,{sx:t=>S({},t.printer.typography.body),children:r(z,{force_direction:"column",children:e.state.resources.map((t,o)=>{let[i,s,a]=t;return r(c.Fragment,{children:r(rt,{id:i,name:s,url:a,onSuccess:()=>{e.effect()}})},o)})})})}}function it(n){let[e,t]=c.useState(!1);return v(c.Fragment,{children:[r(te,{close_item:r(K,{title:"\u67E5\u770B/\u7BA1\u7406\u6587\u4EF6",children:r(Q,{size:"small",children:r(q,{fontSize:"small",color:"primary"})})}),open_item:r(k,{startIcon:r(q,{}),color:"primary",children:"\u67E5\u770B/\u7BA1\u7406\u6587\u4EF6"}),onClick:()=>{t(!0)},no_button:!0}),r(Ce,{anchor:"left",open:e,onClose:()=>t(!1),ModalProps:{keepMounted:!1},SlideProps:{onExited:()=>{}},PaperProps:{sx:{width:"40%"}},children:r(nt,{})})]})}function ot(n,e,t){function o(s,a){if(ee(s)){for(let u in s.children){let f=s.children[u];if(o(f,[...a,Number(u)]))return!0}return}let l=s.text,g=/([^\$]|^)(\$[^\$]+?\$)([^\$]|$)/.exec(l),x=/\$\$[^\$]+?\$\$/.exec(l);if(g){let u=g,f=u.index+u[1].length,d=u[2],h=u.index+u[1].length+d.length,p=l.slice(0,f),_=l.slice(h,l.length),y=d.slice(1,d.length-1),E=n.proxies.inline[e].makenode();return E.children=[{text:y}],n.delete_node_by_path(a),n.add_nodes([{text:p},E,{text:_}],a),!0}if(x){let u=x,f=u.index,d=u[0],h=u.index+d.length,p=l.slice(0,f),_=l.slice(h,l.length),y=d.slice(2,d.length-2),E=n.proxies.group[t].makenode();E.children=[{text:y}];let ne=O(p),ie=O(_);return n.delete_node_by_path(a),n.add_nodes([ne,E,ie],a),!0}return!1}let i=0;for(;o(n.get_root(),[]);)if(i++,i>0){console.log("\u592A\u591A\u6570\u5B66...");break}}function at(n){const[e,t]=c.useState(null),[o,i]=c.useState("\u6570\u5B66-\u884C\u5185"),[s,a]=c.useState("\u6570\u5B66-\u5757");return v(c.Fragment,{children:[r(te,{close_item:r(K,{title:"\u5904\u7406\u6570\u5B66",children:r(Q,{size:"small",children:r(W,{fontSize:"small",color:"primary"})})}),open_item:r(k,{startIcon:r(W,{}),color:"primary",children:"\u5904\u7406\u6570\u5B66"}),onClick:l=>{t(l.currentTarget)},no_button:!0}),r(Z,{open:Boolean(e),anchorEl:e,onClose:()=>{t(void 0)},anchorOrigin:{vertical:"center",horizontal:"right"},transformOrigin:{vertical:"center",horizontal:"left"},sx:{paddingX:"4rem",paddingY:"2rem"},children:v(z,{force_direction:"column",children:[r(w,{label:"\u884C\u5185\u516C\u5F0F\u7684Style\u540D",defaultValue:o,InputProps:{startAdornment:r(Y,{position:"start",children:"$...$ = "})},sx:{marginBottom:"0.5rem",marginTop:"1rem"},onChange:l=>{i(l.target.value)}}),r(w,{label:"\u5757\u7EA7\u516C\u5F0F\u7684Style\u540D",defaultValue:s,InputProps:{startAdornment:r(Y,{position:"start",children:"$$...$$ = "})},sx:{marginY:"0.5rem"},onChange:l=>{a(l.target.value)}}),r(k,{variant:"outlined",sx:{width:"50%",marginX:"auto",marginY:"0.5rem"},onClick:()=>{ot(n.get_editor(),o,s)},children:"\u5F00\u59CB\uFF01"})]})})]})}class st extends c.Component{constructor(e){super(e);C(this,"core");C(this,"editor_renderers");C(this,"printer_renderers");C(this,"printer_ref");C(this,"editor_ref");C(this,"savebutton_ref");this.core=De(new Me([])),this.editor_renderers=Le(new V(this.core,Ge)),this.printer_renderers=$e(new V(this.core,Se)),this.state={editor_proxies:j({inline:{},group:{},struct:{},support:{},abstract:{}})},this.editor_ref=c.createRef(),this.printer_ref=c.createRef(),this.savebutton_ref=c.createRef()}set_proxy_params(e,t){function o(i){if(G(i)&&i.proxy_info&&i.proxy_info.proxy_name){let a=e.get_proxy(i.type,i.proxy_info.proxy_name).get_proxy_parameters(i.parameters);i.proxy_info.proxy_params=a}if(ee(i))for(let s of i.children)o(s)}return o(t),t}async componentDidMount(){let e=j({inline:{},group:{},struct:{},support:{},abstract:{}}),t=await F.get.concept();for(let[a,l,g,x]of t){let u=Re(l,a,g,x);e[u.get_styletype()][a]=u}this.setState({editor_proxies:e});var o=await F.get.content();for(o=o||Be("root",{title:{val:"",type:"string"}}),U({initializing:!0});!this.get_editor(););let i=this.get_editor();for(i.replace_nodes(i.get_root(),o.children),i.set_node(i.get_root(),{parameters:o.parameters,hiddens:o.hiddens}),this.editor_ref.current.forceUpdate(),U({initializing:!1});!this.get_printer(););let s=this.get_printer();s.update(o),D.linkto&&D.linkto!="None"&&Ne(s,Number(D.linkto))}get_editor(){if(this.editor_ref&&this.editor_ref.current)return this.editor_ref.current.get_editor()}get_printer(){if(this.printer_ref&&this.printer_ref.current)return this.printer_ref.current.get_printer()}get_save_button(){if(this.savebutton_ref&&this.savebutton_ref.current)return this.savebutton_ref.current}async save_content(){let e=this.get_editor();if(e){var t={content:e.get_root()};return await F.post.content(t)}return!1}async post_file(e){var t=new FormData;return t.append("file",e[0]),await F.post.file(t)}update_printer(){let e=this.get_printer(),t=this.get_editor();!(e&&t)||e.update(t.get_root())}extra_buttons(e){let t=this;return r(c.Fragment,{children:r(b,{sx:{marginX:"auto"},children:v("label",{children:[r("input",{type:"file",style:{display:"none"},onChange:o=>{o.target.files.length>0&&t.post_file(o.target.files)}}),r(A,{title:"\u4E0A\u4F20",icon:re,component:"span"})]})})})}mainpart(e){let t=this,o=this.extra_buttons.bind(this);return v(b,{sx:e.sx,children:[r(b,{sx:{position:"absolute",width:"49%",left:"0%",top:"0",height:"100%"},children:r(ze,{ref:t.editor_ref,core:t.core,renderers:t.editor_renderers,proxies:t.state.editor_proxies,theme:M,onFocusChange:()=>{let i=t.get_printer(),s=t.get_editor();i&&s&&s.get_slate().selection&&i.scroll_to(s.get_slate().selection.focus.path)},onUpdate:()=>{},onSave:()=>{t.update_printer();let i=t.get_save_button();i&&i.click()},extra_buttons:r(o,{}),plugin:et})}),r(b,{sx:{position:"absolute",width:"49%",left:"51%",top:"0",height:"100%"},children:r(we,{ref:this.printer_ref,core:this.core,renderers:this.printer_renderers,theme:M})})]})}render(){let e=this,t=this.mainpart.bind(this);return r(Ae,{theme:ke(M),children:r(b,{sx:{position:"absolute",top:"2%",left:"1%",height:"96%",width:"98%",display:"flex"},children:v(Te,{children:[v(He,{sx:{marginRight:"1%"},children:[r(Oe,{ref:e.savebutton_ref,save_func:e.save_content.bind(e)}),r(it,{}),r(at,{get_editor:()=>e.get_editor()})]}),r(t,{sx:{position:"relative",width:"100%",height:"100%",flex:1}})]})})})}}ce.render(r(c.StrictMode,{children:r(st,{})}),document.getElementById("root"));