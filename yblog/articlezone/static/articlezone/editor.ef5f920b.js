var O=Object.defineProperty;var A=Object.getOwnPropertySymbols;var Y=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable;var D=(r,e,t)=>e in r?O(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,f=(r,e)=>{for(var t in e||(e={}))Y.call(e,t)&&D(r,t,e[t]);if(A)for(var t of A(e))U.call(e,t)&&D(r,t,e[t]);return r};var S=(r,e,t)=>(D(r,typeof e!="symbol"?e+"":e,t),t);import"./modulepreload-polyfill.9d8db203.js";import{T as b,a as o,j as a,P as V,b as c,B as _,c as I,D as W,d as k,I as J,F as M,e as X,f as $,g as q,h as G,R as H}from"./vendor.96b1bcce.js";import{i as C,a as K,s as L,I as g,A as E,b as B,P as j,c as Q,E as Z,Y as ee,d as te,D as ae,e as re}from"./snackbar.978d4283.js";import{s as se,e as ne,w as ie,a as oe,b as le,m as ue,c as N,M as de}from"./theme.510b2d56.js";import{F as ce,a as pe,S as me}from"./buttons.9b6fafe1.js";var P={initializing:!1};function he(r){P=f(f({},P),r)}function fe(r){const e=r.slate.normalizeNode;return r.slate.normalizeNode=t=>{let[s,n]=t;if(P.initializing){e(t);return}if(n.length==0){let i=s,l=i.children.length;if(l==0||!C(i.children[0],"support","\u5C0F\u8282\u7EBF")){b.insertNodes(r.slate,se.makenode(),{at:[0]});return}if(!C(i.children[l-1],"support","\u7AE0\u8282\u7EBF")){b.insertNodes(r.slate,ne.makenode(),{at:[l]});return}}if(C(s,"support","\u7AE0\u8282\u7EBF")&&(n.length!=1||n[0]!=r.slate.children.length-1)){b.removeNodes(r.slate,{at:n});return}e(t)},r}function _e(r){const e=r.slate.normalizeNode;return r.slate.normalizeNode=t=>{let[s,n]=t;if(K(s)){let i=s,l=i.type,d=i.name,y=r.core.get_style(l,d);if(y==null){e(t);return}let p=y.parameter_prototype,m=f({},i.parameters),u=!1;for(let h of Object.keys(p))m[h]==null&&(m[h]=p[h],u=!0);if(u){L(r,i,{parameters:m});return}}e(t)},r}let T=he,ge=[fe,_e];function ye(r){for(let e of ge)r=e(r);return r}class Fe extends o.Component{constructor(e){super(e);this.state={resources:[]}}async effect(){let e=await g.get.resources();this.setState({resources:e})}async componentDidMount(){this.effect()}SubCard(e){let t=this,[s,n,i]=[e.id,e.name,e.url],[l,d]=o.useState(e.name),[y,p]=o.useState(!1),[m,u]=o.useState(!1),[h,v]=o.useState(!1),[R,z]=o.useState(!1);return a(V,{variant:"outlined",sx:{position:"relative",marginTop:"1rem",marginX:"1rem",marginBottom:"1rem",paddingY:"0.7rem"},children:c(E,{force_direction:"row",children:[a(_,{sx:{flex:1},children:c(E,{children:[a(I,{variant:"standard",label:"name",defaultValue:n,fullWidth:!0,onChange:F=>{d(F.target.value)}}),a(I,{variant:"standard",label:"url",defaultValue:i,fullWidth:!0,sx:{marginTop:"1rem"},InputProps:{readOnly:!0}})]})}),a(_,{children:c(E,{children:[a(B,{title:"\u66F4\u6539\u8D44\u6E90\u540D",icon:W,onClick:async F=>{let x={name:l},w=await g.post.manage_recourse(!1,x,s);v(w),p(!0)}}),c("label",{children:[a("input",{type:"file",style:{display:"none"},onChange:async F=>{if(F.target.files.length<=0)z(!1);else{var x=new FormData;x.append("file",F.target.files[0]);let w=await g.post.manage_recourse(!0,x,s);z(w),w&&t.effect()}u(!0)}}),a(B,{title:"\u66FF\u6362\u6587\u4EF6",icon:k,component:"span"})]})]})}),a(j,{info_sucess:"\u4FEE\u6539\u6587\u4EF6\u540D\u6210\u529F",info_fail:"\u4FEE\u6539\u6587\u4EF6\u540D\u5931\u8D25",open:y,status:h,onClose:()=>{p(!1)}}),a(j,{info_sucess:"\u4E0A\u4F20\u6587\u4EF6\u6210\u529F",info_fail:"\u4E0A\u4F20\u6587\u4EF6\u5931\u8D25",open:m,status:R,onClose:()=>{u(!1)}})]})})}render(){let e=this;return a(_,{sx:t=>f({},t.printer.typography.body),children:a(E,{force_direction:"column",children:e.state.resources.map((t,s)=>{let[n,i,l]=t,d=e.SubCard.bind(e);return a(o.Fragment,{children:a(d,{id:n,name:i,url:l})},s)})})})}}function be(r){let[e,t]=o.useState(!1);return c(o.Fragment,{children:[a(ce,{close_item:a(Q,{title:"\u67E5\u770B/\u7BA1\u7406\u6587\u4EF6",children:a(J,{size:"small",children:a(M,{fontSize:"small",color:"primary"})})}),open_item:a(X,{startIcon:a(M,{}),color:"primary",children:"\u67E5\u770B/\u7BA1\u7406\u6587\u4EF6"}),onClick:()=>{t(!0)},no_button:!0}),a($,{anchor:"left",open:e,onClose:()=>t(!1),ModalProps:{keepMounted:!0},SlideProps:{onExited:()=>{}},PaperProps:{sx:{width:"40%"}},children:a(Fe,{})})]})}class xe extends o.Component{constructor(e){super(e);S(this,"core");S(this,"printer_ref");this.core=ie(new Z([],{title:""})),this.state={editor:ye(oe(new ee(this.core))),printer:le(new te(this.core))},this.printer_ref=o.createRef()}async componentDidMount(){let e=this.state.editor,t=this.state.printer,s=await g.get.concept();for(let[l,d,y,p,m]of s){let[u,h,v]=ue(d,l,y,p,m);this.core.add_style(u),u.type!="abstract"&&(e.update_renderer(h,u.type,u.name),t.update_renderer(v,u.type,u.name))}this.setState({editor:e,printer:t});var n=await g.get.content();n=n||{children:[],parameters:{}},T({initializing:!0});let i=this.state.editor.slate.children.map((l,d)=>Number(d));b.removeNodes(this.state.editor.slate,{at:i}),b.insertNodes(this.state.editor.slate,n.children,{at:[0]}),this.core.update_root({parameters:f(f({},this.core.root.parameters),n.parameters)}),T({initializing:!1})}async save_content(){var e={content:this.core.root};return await g.post.content(e)}async post_file(e){var t=new FormData;return t.append("file",e[0]),await g.post.file(t)}extra_buttons(e){let t=this;return a(o.Fragment,{children:c("label",{children:[a("input",{type:"file",style:{display:"none"},onChange:s=>{s.target.files.length>0&&t.post_file(s.target.files)}}),a(B,{title:"\u4E0A\u4F20",icon:k,component:"span"})]})})}mainpart(e){let t=this,s=this.extra_buttons.bind(this);return c(_,{sx:e.sx,children:[a(_,{sx:{position:"absolute",width:"49%",left:"0%",top:"0",height:"100%"},children:a(ae,{editor:t.state.editor,theme:N,onFocusChange:()=>{t.state.editor.slate.selection&&t.printer_ref&&t.printer_ref.current&&t.printer_ref.current.scroll_to(t.state.editor.slate.selection.focus.path)},onUpdate:()=>{},extra_buttons:a(s,{})})}),a(_,{sx:{position:"absolute",width:"49%",left:"51%",top:"0",height:"100%"},children:a(re,{printer:t.state.printer,ref:this.printer_ref,theme:N})})]})}render(){let e=this,t=this.mainpart.bind(this);return a(q,{theme:G(N),children:a(_,{sx:{position:"absolute",top:"2%",left:"1%",height:"96%",width:"98%",display:"flex"},children:c(de,{children:[c(pe,{sx:{marginRight:"1%"},children:[a(me,{save_func:e.save_content.bind(e)}),a(be,{})]}),a(t,{sx:{position:"relative",width:"100%",height:"100%",flex:1}})]})})})}}H.render(a(o.StrictMode,{children:a(xe,{})}),document.getElementById("root"));
