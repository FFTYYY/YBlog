var be=Object.defineProperty,Ce=Object.defineProperties;var ke=Object.getOwnPropertyDescriptors;var te=Object.getOwnPropertySymbols;var we=Object.prototype.hasOwnProperty,Se=Object.prototype.propertyIsEnumerable;var J=(t,e,n)=>e in t?be(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,c=(t,e)=>{for(var n in e||(e={}))we.call(e,n)&&J(t,n,e[n]);if(te)for(var n of te(e))Se.call(e,n)&&J(t,n,e[n]);return t},h=(t,e)=>Ce(t,ke(e));var d=(t,e,n)=>(J(t,typeof e!="symbol"?e+"":e,n),n);import{N as ne,a as f,j as i,b as p,i as B,T as y,S as Ae,E as Pe,w as Ee,k as Fe,l as Be,m as Ie,P as z,n as De,o as Ne,p as Te,q as $e,r as re,f as ie,s as I,I as M,A as Ue,t as Oe,M as oe,u as R,B as g,v as P,c as j,x as ze,y as Me,z as Re,C as He,G as X,H as We,J as Le,K as Ve,L as Ge,O as Je,Q as je,g as ae,h as se,U as Xe,e as Ye,V as qe,W as Qe,X as Ke,Y as Ze,Z as A,$ as et,_ as tt}from"./vendor.7943a1a9.js";function H(){return Math.floor(Math.random()*23333333)}function Y(t=""){return{text:t}}function D(t=""){return{children:[Y(t)]}}function nt(t,e,n={}){return{idx:H(),type:"inline",name:t,parameters:e,children:[Y("")],hiddens:[],flags:n}}function N(t,e,n={}){return{idx:H(),type:"group",name:t,parameters:e,relation:"separating",children:[D()],hiddens:[],flags:n}}function rt(t,e,n={}){return{idx:H(),type:"struct",name:t,num_children:1,relation:"separating",parameters:e,children:[de()],hiddens:[],flags:{}}}function it(t,e,n={}){return{idx:H(),type:"support",name:t,parameters:e,children:[Y()],hiddens:[],flags:n}}function le(t){return typeof t=="string"||typeof t=="number"||typeof t=="boolean"}function C(t){return"type"in t}function v(t){return C(t)?t.type:"children"in t?"paragraph":"text"}function Rt(t,e,n){return v(t)==e&&t.name==n}function de(){return N("struct-child",{},{})}function ot(t){return Number(t.slice(0,t.length-3))}function at(t){return`${t}rem`}function Ht(t,e){return at(ot(t)*e)}function st(t,e){for(let n=0;n<t.hiddens.length;n++)if(q(t.hiddens[n],e))return n;return-1}function ce(t,e){let n={};for(let r in t)n[r]=e(t[r]);return n}function lt(t,e,n){return[...t.slice(0,e),n,...t.slice(e+1,t.length)]}function q(t,e){return!C(t)||!C(e)?!1:t.idx==e.idx}function T(t,e){for(let[n,r]of ne.descendants(t))if(q(n,e))return r}function Wt(t,e){for(let[n,r]of ne.descendants(t))if(C(n)&&`${n.idx}`==`${e}`)return r}function Q(t,e){if(t==null)return e;if(e==null)return t;if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return e;if(typeof t=="string"||typeof t=="number"||typeof t=="boolean")return t;let n={};for(let r in c(c({},t),e))n[r]=Q(t[r],e[r]);return n}class ue{constructor(e,n=1e3){d(this,"ask_flag");d(this,"trigger_flag");d(this,"task");d(this,"remember_params");this.ask_flag=!1,this.trigger_flag=!0,this.task=e,this.remember_params=void 0;let r=this;setInterval(()=>{r.trigger_flag=!0,r.trigger()},n)}go(e){this.ask_flag=!0,this.remember_params=e,this.trigger()}trigger(){this.ask_flag&&this.trigger_flag&&(this.ask_flag=!1,this.trigger_flag=!1,this.task(this.remember_params))}}class he{constructor(e,n){d(this,"core");d(this,"default_renderers");d(this,"style_renderers");this.core=e,this.default_renderers=n,this.style_renderers={inline:{},group:{},struct:{},support:{}}}get_renderer(e,n=void 0){return n==null?this.default_renderers[e]:this.style_renderers[e][n]||this.default_renderers[e]}update_renderer(e,n,r=void 0){if(r==null){this.default_renderers[n]=e;return}this.style_renderers[n][r]=e}}const fe=f.createContext({});function me(t){return i(fe.Consumer,{children:e=>i(fe.Provider,{value:c(c({},e),t.value),children:t.children})})}class dt extends f.Component{constructor(e){super(e);d(this,"printer");d(this,"core");d(this,"my_refs");d(this,"notification_key");this.state={root:N("root",{})},this.printer=e.printer,this.core=this.printer.core,this.my_refs={}}componentDidMount(){let e=this;this.notification_key=Math.floor(Math.random()*233333);let n=new ue(r=>e.setState({root:r}),1e3);this.core.add_notificatioon(r=>n.go(r),`printer-${this.notification_key}`),this.setState({root:this.core.root})}componentWillUnmount(){this.core.remove_notificatioon(`printer-${this.notification_key}`)}get_path_id(e){return JSON.stringify(e.map(n=>Number(n)))}get_ref(e,n=!1){let r=this.my_refs[this.get_path_id(e)];if(!(!n&&(r==null||r.current==null)))return r}set_ref(e,n){return this.my_refs[this.get_path_id(e)]=n,e}scroll_to(e){let n=this.get_ref(e);n!=null&&n.current.scrollIntoView({behavior:"smooth",block:"center"})}_sub_component(e){let n=e.element,r=this,o=this._sub_component.bind(this),a=this.printer,s=e.contexts,l=e.now_path,u=v(n);if(u=="text"){let S=a.get_renderer("text"),F=i("span",{style:{display:"hidden"},ref:r.get_ref(l,!0)}),ve=n.text;return p(f.Fragment,{children:[F,i(S.render_func,{element:n,context:{anchor:F},children:ve})]})}let m=n.children,b;C(n)&&(b=n.name);let G=a.get_renderer(u,b),O=i("span",{style:{display:"hidden"},ref:r.get_ref(l,!0)});return p(f.Fragment,{children:[O,i(G.render_func,{element:n,context:c({anchor:O},s[this.get_path_id(l)]),children:Object.keys(m).map(S=>i(o,{element:m[S],contexts:s,now_path:[...l,S]},S))})]})}build_envs(e,n,r,o){let a=o;if(this.set_ref(a,f.createRef()),!("children"in e))return[n,r];let s=e,l=v(s),u;C(s)&&(u=s.name);let b=this.printer.get_renderer(l,u),[ee,G]=b.enter_effect(s,n);n=ee;for(let F in s.children)[n,r]=this.build_envs(s.children[F],n,r,[...o,F]);let[O,S]=b.exit_effect(s,n,G);return r[this.get_path_id(a)]=S,[O,r]}render(){let e=this,n=this._sub_component.bind(this);e.my_refs={};let[r,o]=this.build_envs(e.state.root,{},{},[]),a={refs:e.my_refs,root:e.state.root,core:e.core,printer:e.printer,printer_component:e};return i(me,{value:a,children:i(n,{element:e.state.root,contexts:o,now_path:[]})})}}function E(t,e=(r,o)=>[o,{}],n=(r,o,a)=>[o,a]){return{render_func:t,enter_effect:e,exit_effect:n}}class ge extends he{constructor(e){super(e,{text:E(n=>i(B,{children:n.children})),inline:E(n=>i("span",{children:n.children})),paragraph:E(n=>i("span",{children:n.children})),group:E(n=>i("span",{children:n.children})),struct:E(n=>i("span",{children:n.children})),support:E(n=>i("span",{children:n.children}))})}}d(ge,"Component",dt);function ct(t){const e=t.normalizeNode;return t.normalizeNode=n=>{const[r,o]=n;if(v(r)=="struct"){let a=r;if(a.children.length<a.num_children){let s=[];for(let l=0;l<a.num_children-a.children.length;l++)s.push(de());y.insertNodes(t,s,{at:[...o,a.children.length]});return}if(a.children.length>a.num_children){y.removeNodes(t,{at:[...o,a.children.length-1]});return}for(let s in a.children){let l=a.children[s];if(v(l)!="group"){y.removeNodes(t,{at:[...o,parseInt(s)]});return}}}e(n)},t}function ut(t){const e=t.normalizeNode;let n=r=>v(r)=="group"||v(r)=="struct";return t.normalizeNode=r=>{const[o,a]=r;if(a.length-1,"children"in o&&v(o)!="struct"){let s=!1;for(let[l,u]of o.children.entries()){if(!n(u))continue;if(!s){s=!0;continue}s=!0;let m=u;if(l==0)return;let b=o.children[l-1];if(n(b)&&m.relation=="separating"){y.insertNodes(t,D(),{at:[...a,l]});return}if(!n(b)&&m.relation=="chaining"){y.moveNodes(t,{at:[...a,l-1],to:[...a,l]});return}}}e(r)},t}function ht(t){const e=t.isInline;return t.isInline=n=>{if(C(n)){let r=n;if(r.flags.forceInline)return!0;if(r.flags.forceBlock)return!1}return e(n)||v(n)=="inline"},t}function ft(t){const e=t.isVoid;return t.isVoid=n=>C(n)&&n.flags.forceVoid?!0:e(n)||v(n)=="support",t}var mt=[ct,ut,ht,ft];function gt(t){for(let e of mt)t=e(t);return t}class _t extends f.Component{constructor(e){super(e);d(this,"editor");d(this,"core");d(this,"slate");d(this,"onUpdate");d(this,"onFocusChange");this.editor=e.editor,this.core=this.editor.core,this.slate=this.editor.slate,this.onUpdate=e.onUpdate||(n=>{}),this.onFocusChange=e.onFocusChange||(()=>{})}update_value(e){this.core.update_children(e),this.onUpdate(e)}renderElement(e){let n=this,r=e.element,o=v(r),a;C(r)&&(a=r.name);let s=this.editor.get_renderer(o,a),l=e.attributes,u={element:r,editor:n.editor,children:e.children},m={};return n.editor.slate.isInline(r)&&(m={display:"inline-block"}),i("div",h(c({},l),{style:m,children:i(s,c({},u))}))}renderLeaf(e){let n=this,r=this.editor.get_renderer("text"),o=e.attributes,a={element:e.leaf,editor:n.editor,children:e.children};return i("span",h(c({},o),{children:i(r,c({},a))}))}render(){let e=this,n={editor:e.editor,slate:e.slate,core:e.core};return i(me,{value:n,children:i(Ae,{editor:e.slate,value:[D("")],onChange:r=>{e.update_value(r),e.onFocusChange()},children:i(Pe,{renderElement:e.renderElement.bind(e),renderLeaf:e.renderLeaf.bind(e),onClick:r=>{e.onFocusChange()}})})})}}class K extends he{constructor(e){super(e,{text:n=>i("span",{children:n.children}),inline:n=>i("span",{children:n.children}),paragraph:n=>i("div",{children:n.children}),group:n=>i("div",{children:n.children}),struct:n=>i("div",{children:n.children}),support:n=>i("div",{children:n.children})});d(this,"suboperations");d(this,"slate");this.slate=gt(Ee(Fe(Ie()))),this.suboperations={}}add_suboperation(e,n){this.suboperations[e]=n}apply_all(){let e=this;Object.values(this.suboperations).map(n=>{n(e)}),this.suboperations={}}get_onClick(e,n){let r=this;if(r.core.root,e=="group"||e=="support"||e=="struct"){let o=r.core.get_style(e,n);return o==null?a=>{}:a=>{let s=o.makenode();y.insertNodes(r.slate,s)}}if(e=="inline"){let o=r.core.get_style("inline",n);return o==null?a=>{}:a=>{let s=r.slate.selection,l=!0;s!=null&&(l=JSON.stringify(s.anchor)==JSON.stringify(s.focus));let u=o.makenode();l?y.insertNodes(r.slate,u):y.wrapNodes(r.slate,u,{match:m=>Be.isText(m),split:!0})}}return o=>{}}}d(K,"Component",_t);class pt{constructor(e,n){d(this,"styles");d(this,"root");d(this,"notifications");this.styles={inline:{},group:{},struct:{},support:{},abstract:{}};for(let r of e)this.add_style(r);this.root=N("root",n),this.notifications={}}update_children(e){return this.update_root({children:e})}update_root(e){this.root=c(c({},this.root),e);for(let n of Object.values(this.notifications))n(this.root)}add_notificatioon(e,n){this.notifications[n]=e}remove_notificatioon(e){delete this.notifications[e]}add_style(e){this.styles[e.type][e.name]=e}get_style(e,n){return this.styles[e][n]}}class Lt{constructor(e,n,r={}){d(this,"type","inline");d(this,"name");d(this,"parameter_prototype");d(this,"flags");d(this,"makenode");this.name=e,this.parameter_prototype=n,this.flags=r,this.makenode=()=>nt(e,n,r)}}class Vt{constructor(e,n,r={}){d(this,"type","group");d(this,"name");d(this,"parameter_prototype");d(this,"flags");d(this,"makenode");this.name=e,this.parameter_prototype=n,this.flags=r,this.makenode=()=>N(e,n,r)}}class Gt{constructor(e,n,r={}){d(this,"type","struct");d(this,"name");d(this,"parameter_prototype");d(this,"flags");d(this,"makenode");this.name=e,this.parameter_prototype=n,this.flags=r,this.makenode=()=>rt(e,n,r)}}class Jt{constructor(e,n,r={}){d(this,"type","support");d(this,"name");d(this,"parameter_prototype");d(this,"flags");d(this,"makenode");this.name=e,this.parameter_prototype=n,this.flags=r,this.makenode=()=>it(e,n,r)}}class jt{constructor(e,n){d(this,"type","abstract");d(this,"name");d(this,"parameter_prototype");d(this,"flags");d(this,"makehidden");this.name=e,this.parameter_prototype=n,this.flags={},this.makehidden=()=>N(e,n)}}function $(t,e,n){let r=t.core.root;if(q(e,r)){t.core.update_root(n);return}y.setNodes(t.slate,n,{at:T(t.slate,e)})}function yt(t,e){y.removeNodes(t.slate,{at:T(t.core.root,e)})}function xt(t,e,n){y.insertNodes(t.slate,e,{at:T(t.core.root,n)})}function vt(t,e,n){let r=T(t.core.root,n);r[r.length-1]++,y.insertNodes(t.slate,e,{at:r})}function bt(t,e,n){let r=t.core.root,o=T(r,e);r.idx==e.idx&&(o=[]);let a=e.children.length;a>0&&y.removeNodes(t.slate,{at:{anchor:{path:[...o,0],offset:0},focus:{path:[...o,a-1],offset:0}}}),y.insertNodes(t.slate,n,{at:[...o,0]})}const k=f.createContext("row"),_e=f.createContext(!1);function U(t){let e=t.title||"";return i(k.Consumer,{children:n=>i(Te,{title:e,placement:n=="row"?"left":"top",children:t.children})})}function Ct(t){let e=!t.simple,n=r=>{let o=r=="row"?"horizontal":"vertical",a=e?r=="row"?"column":"row":r;return i(k.Provider,{value:a,children:i($e,h(c({orientation:o},t.buttongroup_props),{children:t.children}))})};return t.force_direction!=null?n(t.force_direction):i(k.Consumer,{children:r=>n(r)})}function pe(t){let e=!t.simple,n=r=>{let o=e?r=="row"?"column":"row":r;return i(k.Provider,{value:o,children:i(re,{direction:r,children:t.children})})};return t.force_direction!=null?n(t.force_direction):i(k.Consumer,{children:r=>n(r)})}function Xt(t){let e=n=>i(k.Provider,{value:n,children:i(re,{direction:n,children:t.children})});return t.force_direction!=null?e(t.force_direction):i(k.Consumer,{children:n=>e(n)})}class kt extends f.Component{constructor(e){super(e)}render(){let e=this.props,n=e.stacker||pe,r=e.component||z,o=a=>i(_e.Consumer,{children:s=>i(De,{anchorEl:e.anchorEl,open:e.open,placement:a=="row"?"right":"bottom",disablePortal:s,transition:!0,children:({TransitionProps:l})=>i(Ne,h(c({},l),{timeout:350,children:i(r,{children:i(n,{children:e.children})})}))})});return e.force_direction!=null?o(e.force_direction):i(k.Consumer,{children:a=>o(a)})}}const ye={palette:{divider:"#00000077",primary:{main:"#111111"}},editor:{margins:{background:"0.5rem",paragraph:"0.8rem",small:"0.2rem"},widths:{editable_drawer:"70%",minimum_content:"3rem"},typography:{body:{fontFamily:"default",fontSize:"1rem",lineHeight:"1.5rem",lineSpacing:"0.00938em",fontWeight:400},structure:{fontFamily:"Century Gothic, SimHei",fontSize:"1rem",lineHeight:"1.5rem",lineSpacing:"0.00938em",fontWeight:400}}},printer:{margins:{paragraph:"0.4rem",special:"0.8rem",colon:"1rem",level:"2rem",structure:"0.4rem"},typography:{body:{fontFamily:"default",fontSize:"1rem",lineHeight:"1.5rem",lineSpacing:"0.00938em",fontWeight:400},weaken:{fontFamily:"default",fontSize:"1rem",lineHeight:"1.5rem",lineSpacing:"0.00938em",fontWeight:400},structure:{fontFamily:"default",fontSize:"1rem",lineHeight:"1.5rem",lineSpacing:"0.00938em",fontWeight:400},display:{fontFamily:"default",fontSize:"1rem",lineHeight:"1.5rem",lineSpacing:"0.00938em",fontWeight:400},title:{fontFamily:"default",fontSize:"1rem",lineHeight:"1.5rem",lineSpacing:"0.00938em",fontWeight:400}}}};function wt(t){let e=t.element,n=t.editor,r=n.core.styles.abstract,o=t.onClose||(s=>{});function a(s){return l=>{if(o(l),s==null||r[s]==null)return;let u=[...e.hiddens,r[s].makehidden()];$(n,e,{hiddens:u})}}return i(oe,{anchorEl:t.anchor_element,open:t.open,onClose:o,children:Object.keys(r).map(s=>i(R,{onClick:a(s),children:s},s))})}class St extends f.Component{constructor(e){super(e);d(this,"subeditor");d(this,"hiddenid");d(this,"father_editor");d(this,"father");d(this,"son");this.state={drawer_open:!1},this.subeditor=new K(new pt([...Object.values(e.editor.core.styles.inline),...Object.values(e.editor.core.styles.group),...Object.values(e.editor.core.styles.struct),...Object.values(e.editor.core.styles.support),...Object.values(e.editor.core.styles.abstract)],e.editor.core.root.parameters)),this.subeditor.default_renderers=e.editor.default_renderers,this.subeditor.style_renderers=e.editor.style_renderers,this.father_editor=e.editor,this.father=e.father,this.son=e.son}sub_apply(e){let n=this.father,r=this.son,o=st(n,r),a=h(c({},r),{children:this.subeditor.core.root.children}),s=lt(n.hiddens,o,a);$(e,n,{hiddens:s})}render(){let e=this;return this.props,i(ie,{anchor:"left",open:e.props.open,onClose:e.props.onClose,ModalProps:{keepMounted:!0},PaperProps:{sx:{width:"60%"}},SlideProps:{onExited:()=>{e.father_editor.apply_all()}},children:i(_e.Provider,{value:!0,children:i(Ut,{editor:e.subeditor,onMount:()=>{bt(e.subeditor,e.subeditor.core.root,e.props.son.children),e.props.editor.add_suboperation(`${e.son.idx}-hidden`,e.sub_apply.bind(e))}})})})}}function At(t){let e=t.element,n=t.editor,r=e.hiddens,o=t.onClose||(l=>{}),[a,s]=I.exports.useState(void 0);return p(B,{children:[i(oe,{anchorEl:t.anchor_element,open:t.open,onClose:t.onClose,children:Object.keys(r).map(l=>p(R,{onClick:u=>{s(l),o(u)},children:[r[l].name,"-",l]},l))}),Object.keys(r).map(l=>i(St,{editor:n,father:e,son:e.hiddens[l],open:a==l,onClose:u=>{s(void 0)}},l))]})}function Pt(t){let e=t.editor,n=t.element,[r,o]=I.exports.useState(void 0),[a,s]=I.exports.useState(void 0);return p(B,{children:[i(U,{title:"\u65B0\u5EFA\u62BD\u8C61",children:i(M,{onClick:l=>o(l.currentTarget),children:i(Ue,{})})}),i(U,{title:"\u7F16\u8F91\u62BD\u8C61",children:i(M,{onClick:l=>s(l.currentTarget),children:i(Oe,{})})}),i(wt,{editor:e,element:n,anchor_element:r,open:r!=null,onClose:l=>o(void 0)}),i(At,{editor:e,element:n,anchor_element:a,open:a!=null,onClose:l=>{s(void 0)}})]})}const Yt=t=>i(g,h(c({contentEditable:!1},t),{sx:[{userSelect:"none"},...Array.isArray(t.sx)?t.sx:[t.sx]]})),qt=t=>i(P,h(c({component:g},t),{sx:[e=>h(c({},e.editor.typography.body),{marginTop:e.editor.margins.paragraph}),...Array.isArray(t.sx)?t.sx:[t.sx]]})),Et=t=>i(P,h(c({component:g},t),{sx:[e=>h(c({},e.editor.typography.structure),{marginY:"auto",height:e.editor.typography.structure.lineHeight,whiteSpace:"nowrap"}),...Array.isArray(t.sx)?t.sx:[t.sx]]})),Ft=t=>i(g,h(c({},t),{autogrow:void 0,sx:[c({paddingX:e=>e.editor.margins.background},t.autogrow?{flex:1,minWidth:0}:{}),...Array.isArray(t.sx)?t.sx:[t.sx]]})),Qt=t=>i(z,h(c({elevation:0,variant:"outlined",square:!0},t),{is_inline:void 0,sx:[c({},t.is_inline?{display:"inline-block",height:e=>e.editor.typography.body.lineHeight,color:e=>e.palette.secondary.dark,marginX:e=>e.editor.margins.small}:{marginTop:e=>e.editor.margins.paragraph,color:e=>e.palette.primary.main}),...Array.isArray(t.sx)?t.sx:[t.sx]]})),Kt=t=>i(g,h(c({},t),{sx:[{marginTop:e=>e.editor.margins.paragraph},...Array.isArray(t.sx)?t.sx:[t.sx]]})),Bt=t=>i(z,h(c({elevation:0,variant:"outlined",square:!0},t),{sx:[{width:"100%",height:"100%",overflow:"hidden"},...Array.isArray(t.sx)?t.sx:[t.sx]]}));class It extends f.Component{constructor(e){super(e);d(this,"parameters");d(this,"onUpdate");this.parameters=this.props.initval,this.onUpdate=e.onUpdate||(n=>{})}componentDidUpdate(){this.parameters=this.props.initval,this.onUpdate=this.props.onUpdate||(e=>{})}get_all_treenodes(e,n){let r=this,o=[];for(let a in n){let s=[...e,a];le(n[a])||(o.push(s),o=[...o,...r.get_all_treenodes(s,n[a])])}return o}renderValue(e){let n=e.name,r=e.val,o=e.onChange,a={defaultValue:r,label:n,variant:"standard",sx:{marginLeft:"5%"}};return typeof r=="string"?i(j,c({onChange:s=>o(s.target.value)},a)):typeof r=="number"?i(j,c({onChange:s=>o(s.target.value),type:"number"},a)):typeof r=="boolean"?p(j,h(c({onChange:s=>{o(s.target.value=="true")}},a),{children:[i(R,{value:"true",children:"true"},0),i(R,{value:"false",children:"false"},1)]})):i(B,{})}renderDict(e){let n=c({},e.val),r=this.renderValue.bind(this),o=this.renderDict.bind(this),a=[...e.father_names,e.name],s=JSON.stringify(a);return i(ze,{nodeId:s,label:e.name,sx:{width:"auto",overflowX:"hidden"},children:Object.keys(e.val).map(l=>{let u=e.val[l];return le(u)?i(r,{name:l,val:u,onChange:m=>{n[l]=m,e.onChange(n)}},l):i(o,{name:l,val:u,father_names:a,onChange:m=>{n[l]=m,e.onChange(n)}},l)})})}render(){let e=this.renderDict.bind(this),n=this,r="Parameters",o=Object.values(this.get_all_treenodes([],{[r]:n.parameters})).map(a=>JSON.stringify(a));return i(Me,{defaultExpanded:o,disableSelection:!0,disabledItemsFocusable:!0,defaultCollapseIcon:i(Re,{}),defaultExpandIcon:i(He,{}),children:i(e,{name:r,val:n.parameters,father_names:[],onChange:a=>{n.parameters=a,n.onUpdate(a)}})})}}class Dt extends f.Component{constructor(e){super(e)}temp_update_value(e){let n=this.props;n.editor.add_suboperation(`${n.element.idx}-parameter`,r=>{$(r,n.element,{parameters:e})})}componentDidUpdate(e,n,r){}render(){let e=this,n=this.props;return i(It,{initval:n.element.parameters,onUpdate:r=>e.temp_update_value(r)})}}function Nt(t){let e=t.onClose||(n=>{});return p(ie,{anchor:"left",open:t.open,onClose:e,ModalProps:{keepMounted:!0},SlideProps:{onExited:()=>{t.editor.apply_all()}},PaperProps:{sx:{width:"40%"}},children:[i(g,{children:p(Et,{children:["idx: ",t.element.idx]})}),i(X,{}),i(Dt,{editor:t.editor,element:t.element})]})}function W(t){let e=t.icon,n=t.component||"button";return i(U,{title:t.title,children:i(M,{onClick:t.onClick,size:t.size,component:n,children:i(e,{})})})}function Tt(t){let[e,n]=I.exports.useState(!1),r=t.onClose||(o=>{});return p(B,{children:[i(W,{onClick:o=>n(!0),title:"\u8BBE\u7F6E\u53C2\u6570",icon:We}),i(Nt,{editor:t.editor,element:t.element,open:e,onClose:o=>{r(o),n(!1)}})]})}function Zt(t){return i(W,{onClick:e=>{yt(t.editor,t.element)},title:"\u5220\u9664\u7EC4\u4EF6",icon:Ve})}function en(t){return p(f.Fragment,{children:[i(W,{onClick:e=>{xt(t.editor,D(),t.element)},title:"\u5411\u4E0A\u6DFB\u52A0\u6BB5\u843D",icon:Ge}),i(W,{onClick:e=>{vt(t.editor,D(),t.element)},title:"\u5411\u4E0B\u6DFB\u52A0\u6BB5\u843D",icon:Je})]})}function $t(t){let e=t.button_class,[n,r]=f.useState(!1),o=f.useRef(),a=t.onClose||(()=>{}),s=u=>{r(u),u||a()},l=p(f.Fragment,{children:[i(U,{title:t.title,children:i(e,c({onClick:u=>s(!n),ref:o},t.button_props))}),i(kt,h(c({anchorEl:o.current,open:n},t.poper_props),{children:t.children}))]});return t.close_on_otherclick?i(Le,{onClickAway:()=>{s(!1)},children:i(g,{children:l})}):l}function tn(t){let e=t.element,n=t.editor,[r,o]=I.exports.useState(e.relation=="chaining");function a(s){let l=s.target.checked;o(l),l==!1&&$(n,e,{relation:"separating"}),l==!0&&$(n,e,{relation:"chaining"})}return i(U,{title:"\u8D34\u8D34",children:i(je,{checked:r,onChange:a})})}class Ut extends f.Component{constructor(e){super(e);d(this,"editor");d(this,"onUpdate");d(this,"onMount");d(this,"onFocusChange");d(this,"notification_key");this.editor=e.editor,this.onUpdate=e.onUpdate||(n=>{}),this.onMount=e.onMount||(()=>{}),this.onFocusChange=e.onFocusChange||(()=>{})}componentDidMount(){let e=this;this.onMount(),this.notification_key=Math.floor(Math.random()*233333);let n=new ue(()=>{e.forceUpdate()},1e3);this.editor.core.add_notificatioon(()=>n.go(),`editor-${this.notification_key}`)}componentWillUnmount(){this.editor.core.remove_notificatioon(`editor-${this.notification_key}`)}render(){let e={group:qe,inline:Qe,support:Ke,struct:Ze},n={xs:.15,md:.1,xl:.05},r=ce(n,l=>1-l),o=l=>ce(l,u=>`${Math.floor(u*100)%100}%`),a=Q(ye,this.props.theme),s=this;return i(ae,{theme:se(a),children:p(Bt,{children:[i(g,{sx:{position:"absolute",height:"100%",width:r,overflow:"auto"},children:i(Ft,{children:i(K.Component,{editor:s.editor,onUpdate:s.onUpdate,onFocusChange:s.onFocusChange})})}),i(g,{sx:{position:"absolute",height:"100%",left:o(r),width:n},children:p(pe,{force_direction:"column",children:[i(Tt,{editor:s.editor,element:s.editor.core.root}),i(Pt,{editor:s.editor,element:s.editor.core.root}),s.props.extra_buttons,i(X,{}),["group","inline","support","struct"].map(l=>{let u=e[l];return i(f.Fragment,{children:i($t,{poper_props:{stacker:Ct,component:Xe(z)({backgroundColor:"#aabbddbb"})},button_class:M,button_props:{children:i(u,{})},title:l,children:Object.keys(s.editor.core.styles[l]).map(m=>p(f.Fragment,{children:[i(Ye,{onClick:b=>s.editor.get_onClick(l,m)(b),variant:"text",children:m}),i(X,{orientation:"vertical",flexItem:!0})]},m))})},l)})]})})]})})}}const nn=t=>i(P,h(c({component:t.inline?"span":g},t),{inline:void 0,sx:[e=>c(c({},e.printer.typography.weaken),t.inline?{marginRight:n=>n.printer.margins.colon,display:"inline-block"}:{}),...Array.isArray(t.sx)?t.sx:[t.sx]]})),rn=t=>i(P,h(c({component:t.inline?"span":g},t),{inline:void 0,sx:[e=>c(c({},e.printer.typography.display),t.inline?{marginRight:n=>n.printer.margins.colon,display:"inline-block"}:{}),...Array.isArray(t.sx)?t.sx:[t.sx]]})),on=t=>i(P,h(c({component:g},t),{sx:[e=>({fontFamily:"inherit",fontSize:"inherit",lineHeight:"inherit",lineSpacing:"inherit",fontWeight:"inherit",marginTop:e.printer.margins.paragraph}),...Array.isArray(t.sx)?t.sx:[t.sx]]})),an=t=>i(P,h(c({component:t.inline?"span":g},t),{inline:void 0,leftmargin:void 0,sx:[e=>c(c({},e.printer.typography.structure),t.inline?h(c({},t.leftmargin?{marginLeft:n=>n.printer.margins.colon}:{marginRight:n=>n.printer.margins.colon}),{display:"inline-block"}):{}),...Array.isArray(t.sx)?t.sx:[t.sx]]})),sn=t=>i(g,h(c({},t),{subtitle_like:void 0,small_margin:void 0,sx:[e=>h(c({},t.subtitle_like?e.printer.typography.title:{}),{marginTop:t.small_margin?e.printer.margins.paragraph:e.printer.margins.special}),...Array.isArray(t.sx)?t.sx:[t.sx]]})),ln=t=>i(g,h(c({},t),{sx:[{marginLeft:e=>e.printer.margins.level},...Array.isArray(t.sx)?t.sx:[t.sx]]})),dn=t=>i(g,h(c({},t),{sx:[{width:e=>e.printer.margins.level},...Array.isArray(t.sx)?t.sx:[t.sx]]})),Ot=t=>i(g,h(c({},t),{sx:[e=>h(c({},e.printer.typography.body),{padding:e.printer.margins.structure,boxSizing:"border-box",height:"100%",width:"100%",overflowY:"auto",wordWrap:"break-word"}),...Array.isArray(t.sx)?t.sx:[t.sx]]}));class cn extends f.Component{constructor(e){super(e);d(this,"printer");d(this,"main");this.printer=e.printer,this.main=f.createRef()}scroll_to(e){this.main.current!=null&&this.main.current.scroll_to(e)}render(){let e=Q(ye,this.props.theme),n=this.main;return i(ae,{theme:se(e),children:i(Ot,{children:i(ge.Component,{ref:n,printer:this.printer})})})}}function Z(t){let e=et(`#_data_${t}`);if(!!e)return e.html()}var L={csrf:Z("csrf"),node_id:parseInt(Z("node_id")),logged_in:Z("logged_in").toLocaleLowerCase()=="true"},xe="/";function _(t){return t.startsWith("/")&&(t=t.slice(1,t.length)),`${xe}${t}`}A.defaults.baseURL=xe;A.defaults.xsrfHeaderName="X-CSRFToken";A.defaults.headers.post["X-CSRFToken"]=L.csrf;async function w(t,e,n){n==null&&(n=L.node_id);let r=(await A.get(t(n))).data;return e!=null&&(r=r[e]),r}async function V(t,e,n,r){return n==null&&(n=L.node_id),(await A.post(t(n),e,r)).data.status}var x={get:{content:t=>_(`get/node/content/${t}`),nodetree:t=>_(`get/nodetree/${t}`),concept:t=>_(`get/node/concepts/${t}`),create_time:t=>_(`get/node/create_time/${t}`),comments:t=>_(`get/node/comments/${t}`),resources:t=>_(`get/node/resources/${t}`),resource_info:t=>_(`get/node/resource_info/${t}`),son_ids:t=>_(`get/node/son_ids/${t}`),father_id:t=>_(`get/node/father_id/${t}`)},post:{content:t=>_(`post/node/content/${t}`),comments:t=>_(`post/node/comments/${t}`),nodetree:t=>_(`post/nodetree/${t}`),file:t=>_(`post/file/${t}`),manage_recourse:t=>_(`post/manage_recourse/${t}`)},view:{content:t=>_(`view/content/${t}`)}},un={get:{content:t=>w(x.get.content,"content",t),nodetree:t=>w(x.get.nodetree,"data",t),concept:t=>w(x.get.concept,"concepts",t),create_time:t=>w(x.get.create_time,void 0,t),comments:t=>w(x.get.comments,"comments",t),resources:t=>w(x.get.resources,"resources",t),resource_info:async(t,e)=>(e==null&&(e=L.node_id),(await A.get(x.get.resource_info(e),{params:{name:t}})).data),son_ids:t=>w(x.get.son_ids,"son_ids",t),father_id:t=>w(x.get.father_id,"father_id",t)},post:{content:(t,e)=>V(x.post.content,t,e),nodetree:(t,e)=>V(x.post.nodetree,t,e),comments:(t,e)=>V(x.post.comments,t,e),file:(t,e)=>V(x.post.file,t,e,{headers:{"Content-Type":"multipart/form-data"}}),manage_recourse:async(t,e,n)=>{let r=t?{headers:{"Content-Type":"multipart/form-data"}}:{};return(await A.post(x.post.manage_recourse(n),e,r)).data.status}}};function hn(t){return i(tt,{anchorOrigin:{vertical:"top",horizontal:"center"},open:t.open,message:t.status?t.info_sucess:t.info_fail,onClose:()=>t.onClose()})}export{pe as A,ln as B,nn as C,Ut as D,pt as E,rn as F,dn as G,E as H,un as I,_ as J,fe as K,Wt as L,Vt as M,en as N,Gt as O,hn as P,Jt as Q,Lt as R,Xt as S,jt as T,L as U,x as V,K as Y,C as a,W as b,U as c,ge as d,cn as e,Yt as f,Et as g,Tt as h,Rt as i,Pt as j,tn as k,Zt as l,Ft as m,$t as n,Qt as o,D as p,Kt as q,k as r,$ as s,xt as t,vt as u,qt as v,sn as w,Ht as x,on as y,an as z};
