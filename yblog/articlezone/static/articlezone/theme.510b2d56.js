var tt=Object.defineProperty,rt=Object.defineProperties;var nt=Object.getOwnPropertyDescriptors;var ae=Object.getOwnPropertySymbols;var lt=Object.prototype.hasOwnProperty,it=Object.prototype.propertyIsEnumerable;var Z=(e,r,t)=>r in e?tt(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,v=(e,r)=>{for(var t in r||(r={}))lt.call(r,t)&&Z(e,t,r[t]);if(ae)for(var t of ae(r))it.call(r,t)&&Z(e,t,r[t]);return e},k=(e,r)=>rt(e,nt(r));var A=(e,r,t)=>(Z(e,typeof r!="symbol"?r+"":r,t),t);import{j as n,b as c,a0 as at,G as X,I as P,a1 as $,i as g,v as I,a as x,P as se,a2 as B,B as ee,e as ue,L as st,O as ut,c as oe,$ as ce,N as de,a3 as he}from"./vendor.96b1bcce.js";import{A as w,f as F,g as te,h as D,j as G,k as re,N,l as T,m as K,S as _e,n as M,o as W,p as fe,q as ot,c as me,r as ct,t as dt,u as ge,v as ht,s as pe,w as ne,x as xe,y as ve,z as E,B as _t,C as ft,F as we,G as mt,H as be,I as ye,J as Ee,K as gt,L as pt,M as S,O as Ae,Q as O,R,T as Se}from"./snackbar.978d4283.js";let Be=e=>n(W,k(v({},e),{sx:e.element.relation=="chaining"?{marginTop:"0"}:{}}));function xt(e=l=>l.title,r=l=>n(g,{}),t=l=>n(g,{children:l.children})){return l=>{let i=l.element,a=e(i.parameters),s=l.editor;return n(Be,{element:i,children:c(w,{force_direction:"column",children:[n(F,{children:n(at,{sx:{overflow:"auto"},children:c(w,{children:[n(te,{children:a}),n(D,{editor:s,element:i}),n(G,{editor:s,element:i}),n(re,{editor:s,element:i}),n(N,{editor:s,element:i}),n(T,{editor:s,element:i}),n(r,{editor:s,element:i})]})})}),n(X,{}),n(K,{autogrow:!0,children:n(t,{editor:s,element:i,children:l.children})})]})})}}function j(e=l=>l.title,r=l=>n(g,{}),t=l=>n(g,{children:l.children})){return l=>{let i=l.element,a=e(i.parameters),s=l.editor,u=r;return n(Be,{element:i,children:c(w,{force_direction:"row",children:[n(K,{autogrow:!0,children:n(t,{editor:s,element:i,children:l.children})}),n(F,{sx:{textAlign:"center"},children:c(_e,{children:[n(te,{variant:"overline",children:a}),n(u,{editor:s,element:i}),c(M,{close_on_otherclick:!0,button_class:P,button_props:{size:"small",children:n($,{fontSize:"small"})},title:"\u5C55\u5F00",children:[n(D,{editor:s,element:i}),n(G,{editor:s,element:i}),n(re,{editor:s,element:i}),n(T,{editor:s,element:i}),n(N,{editor:s,element:i})]})]})})]})})}}function V(e,r=l=>n(x.Fragment,{children:l.children}),t=l=>n(g,{})){return l=>{let i=l.element,a=l.editor,s=t,u=r,f=e(i.parameters);return n(W,{is_inline:!0,children:c(w,{force_direction:"row",children:[n(K,{children:n(u,{editor:a,element:i,children:l.children})}),n(F,{children:c(w,{force_direction:"row",children:[n(s,{editor:a,element:i}),c(M,{close_on_otherclick:!0,button_class:P,button_props:{sx:{height:"1rem",width:"1rem",margin:"0"},children:n($,{sx:{height:"1rem"}})},title:"\u5C55\u5F00"+(f?` / ${f}`:""),children:[n(I,{children:f}),n(D,{editor:a,element:i}),n(G,{editor:a,element:i}),n(T,{editor:a,element:i})]})]})})]})})}}function vt(e){let r=e.element,t=e.editor,[l,i]=x.useState(!1),[a,s]=x.useState(!1),u=n(se,{sx:{height:"5px"},variant:"outlined"});return n(F,{children:n(fe,{children:c(ot.Provider,{value:"row",children:[e.children,c(B,{container:!0,spacing:2,children:[n(B,{item:!0,xs:6,children:n(ee,{onMouseOver:()=>i(!0),onMouseOut:()=>i(!1),children:(()=>l?n(me,{title:"\u5411\u4E0A\u6DFB\u52A0\u6BB5\u843D",children:n(ue,{onClick:f=>{ct(t,ge(),r)},size:"small",variant:"outlined",fullWidth:!0,children:n(st,{fontSize:"small"})})}):u)()})}),n(B,{item:!0,xs:6,children:n(ee,{onMouseOver:()=>s(!0),onMouseOut:()=>s(!1),children:(()=>a?n(me,{title:"\u5411\u4E0B\u6DFB\u52A0\u6BB5\u843D",children:n(ue,{onClick:f=>{dt(t,ge(),r)},size:"small",variant:"outlined",fullWidth:!0,children:n(ut,{fontSize:"small"})})}):u)()})})]})]})})})}function Fe(e=r=>r.name){return r=>{let t=r.editor,l=r.element,i=e(l.parameters);return n(F,{children:n(fe,{children:c(X,{children:[n(se,{variant:"outlined",children:c(w,{force_direction:"row",children:[n(I,{children:i}),c(M,{close_on_otherclick:!0,button_class:P,button_props:{size:"small",children:n($,{fontSize:"small"})},title:"\u5C55\u5F00",children:[n(D,{editor:r.editor,element:r.element}),n(N,{editor:t,element:l}),n(T,{editor:t,element:l})]})]})}),r.children]})})})}}function wt(e,r=l=>!!l.url,t=l=>n("img",{src:l.parameters.url})){return l=>{let i=l.editor,a=l.element,s=a.parameters,u=t;return c(W,{is_inline:!0,children:[l.children,n(F,{children:c(w,{force_direction:"row",children:[r(s)?n(u,{parameters:s}):e,c(M,{close_on_otherclick:!0,button_class:P,button_props:{sx:{height:"1rem",width:"1rem",margin:"0"},children:n($,{sx:{height:"1rem"}})},title:"\u5C55\u5F00"+(e?` / ${e}`:""),children:[n(I,{children:e}),n(D,{editor:i,element:a}),n(N,{editor:i,element:a}),n(T,{editor:i,element:a})]})]})})]})}}function bt(e){return n(ht,{children:e.children})}let yt=e=>n(W,k(v({},e),{sx:e.element.relation=="chaining"?{marginTop:"0"}:{}}));function Et(e=i=>i.title,r=(i,a)=>[],t=i=>n(g,{}),l=i=>n(g,{children:i.children})){return i=>{let a=i.element,s=e(a.parameters),u=i.editor,f=t,p=l,b=a.children,h=r(a.num_children,a.parameters);for(h=h.splice(0,b.length);h.length<b.length;)h.push(1);let _=h.reduce((d,y)=>d+y,0),[m,o]=x.useState(a.num_children);return x.useEffect(()=>{u.add_suboperation(`${a.idx}-struct`,()=>{pe(u,a,{num_children:m})})}),n(yt,{element:a,children:c(w,{force_direction:"row",children:[n(B,{container:!0,columns:_,sx:{width:"100%"},children:h.map((d,y)=>n(B,{item:!0,xs:d,sx:{borderRight:y==b.length-1?"none":"1px solid"},children:n(K,{autogrow:!0,children:n(p,{editor:u,element:a,children:i.children[y]})})},y))}),n(F,{children:c(_e,{children:[n(te,{variant:"overline",children:s}),n(f,{editor:u,element:a}),c(M,{close_on_otherclick:!0,button_class:P,button_props:{size:"small",children:n($,{fontSize:"small"})},title:"\u5C55\u5F00",onClose:()=>{u.apply_all()},children:[n(D,{editor:u,element:a}),n(G,{editor:u,element:a}),n(re,{editor:u,element:a}),n(T,{editor:u,element:a}),n(N,{editor:u,element:a}),n(oe,{sx:{width:"5rem"},type:"number",label:"number of children",defaultValue:a.num_children,onChange:d=>{o(parseInt(d.target.value))}})]})]})})]})})}}class q{constructor(r,t,l){A(this,"env_key");A(this,"context_key");A(this,"_default_val");this.env_key=r,this.context_key=t,this._default_val=l}enter_effect(r,t,l){return[t,{}]}exit_effect(r,t,l){return[t,l]}ensure_env(r){return r[this.env_key]==null&&(r[this.env_key]=this._default_val),r}get_env(r){return r=this.ensure_env(r),r[this.env_key]}set_env(r,t){return r=this.ensure_env(r),r[this.env_key]=t,r}get_context(r){return r[this.context_key]}set_context(r,t){return r[this.context_key]=t,r}make_context(r){return{[this.context_key]:r}}fuse_result(r,t){let[l,i]=r,[a,s]=t;return[a,v(v({},i),s)]}enter_fuse(r,t,l){return this.fuse_result([t,l],this.enter_effect(r,t,l))}exit_fuse(r,t,l){return this.fuse_result([t,l],this.exit_effect(r,t,l))}}class Q extends q{constructor(r,t,l=(i,a,s)=>!1){t==null&&(t=r);super(r,t,[0]);A(this,"clear_order");this.clear_order=l}enter_effect(r,t,l){t=this.ensure_env(t);let i=[...this.get_env(t)];this.clear_order(r,t)&&(i[i.length-1]=0),i[i.length-1]++;let a=[...i,0];return[this.set_env(t,a),this.make_context(i)]}exit_effect(r,t,l){let i=this.get_env(t);return i=i.slice(0,i.length-1),[this.set_env(t,i),l]}}class Ce extends q{constructor(r,t,l,i){super(r,t,{pre:[],suf:[]});A(this,"pre_inject");A(this,"suf_inject");this.pre_inject=l||(a=>n(g,{})),this.suf_inject=i||(a=>n(g,{}))}enter_effect(r,t,l){let i=this.pre_inject,a=this.suf_inject,s=this.get_env(t);return t=this.set_env(t,{pre:[...s.pre,n(i,{element:r,context:l})],suf:[...s.suf,n(a,{element:r,context:l})]}),[t,l]}exit_effect(r,t,l){return[t,l]}}class At extends q{constructor(r,t){super(r,t,{pre:[],suf:[]})}enter_effect(r,t,l){let i=this.get_env(t);return t=this.set_env(t,{pre:[],suf:[]}),[t,this.make_context(i)]}}class le extends q{constructor(r,t,l={}){t==null&&(t=r);super(r,t,[void 0,l]);A(this,"information");this.information=l}enter_effect(r,t,l){return l=this.set_context(l,this.get_env(t)),t=this.set_env(t,[void 0,{}]),[t,l]}exit_effect(r,t,l){return t=this.set_env(t,[r,this.information]),[t,l]}}function ke(e={}){return r=>{let t=r.element,l=!1;(t.type=="struct"||t.type=="group")&&(l=t.relation=="chaining");let i={marginTop:a=>xe(a.printer.margins.special,.5)};return e.small_margin&&(i={}),n(ne,k(v({sx:l?i:{}},e),{children:r.children}))}}function C({small_margin_enter:e=!1,small_margin_exit:r=!1,extra_effectors:t=[],inject_pre:l=u=>n(g,{}),inject_suf:i=u=>n(g,{}),outer:a=void 0,inner:s=u=>n(g,{children:u.children})}){let u=a||ke({small_margin:e}),f=s,p=new Ce("global-injector","global-injector",l,i),b=new le("global-brother","global-brother",{small_margin:r});return{render_func:h=>{let _=h.element;return n(u,{element:_,context:h.context,children:n(f,{element:_,context:h.context,children:h.children})})},enter_effect:(h,_)=>{let m=[_,{}];for(let o of t)m=o(h).enter_fuse(h,m[0],m[1]);return m=p.enter_fuse(h,m[0],m[1]),m=b.enter_fuse(h,m[0],m[1]),m},exit_effect:(h,_,m)=>{let o=[_,m];for(let d of t)o=d(h).exit_fuse(h,o[0],o[1]);return o=p.exit_fuse(h,o[0],o[1]),o=b.exit_fuse(h,o[0],o[1]),o}}}function St({small_margin_enter:e=!1,small_margin_exit:r=!1,get_widths:t=f=>[],extra_effectors:l=[],inject_pre:i=f=>n(g,{}),inject_suf:a=f=>n(g,{}),outer:s=void 0,inner:u=f=>n(g,{children:f.children})}){let f=s||ke({small_margin:e}),p=u,b=new Ce("global-injector","global-injector",i,a),h=new le("global-brother","global-brother",{small_margin:r});return{render_func:_=>{let m=_.element,o=_.children,d=t(m);for(d=d.splice(0,o.length);d.length<o.length;)d.push(1);let y=d.reduce((Y,U)=>Y+U,0);return n(f,{element:m,context:_.context,children:n(B,{container:!0,columns:y,children:d.map((Y,U)=>n(B,{item:!0,xs:Y,sx:{align:"center"},children:n(p,{element:m,context:_.context,children:_.children[U]})},U))})})},enter_effect:(_,m)=>{let o=[m,{}];for(let d of l)o=d(_).enter_fuse(_,o[0],o[1]);return o=b.enter_fuse(_,o[0],o[1]),o=h.enter_fuse(_,o[0],o[1]),o},exit_effect:(_,m,o)=>{let d=[m,o];for(let y of l)d=y(_).exit_fuse(_,d[0],d[1]);return d=b.exit_fuse(_,d[0],d[1]),d=h.exit_fuse(_,d[0],d[1]),d}}}function Bt(){let e=new At("global-injector","global-injector"),r=new le("global-brother","global-brother");return{render_func:t=>{let l=e.get_context(t.context),[i,a]=r.get_context(t.context),s=a.small_margin,u=i!=null&&(i.type=="group"||i.type=="struct");return c(ve,{sx:u?{marginTop:s?p=>p.printer.margins.paragraph:p=>p.printer.margins.special}:{},children:[Object.keys(l.pre).map(p=>n(x.Fragment,{children:l.pre[p]},p)),t.children,Object.keys(l.suf).map(p=>n(x.Fragment,{children:l.suf[p]},p)),n("br",{})]})},enter_effect:(t,l)=>{let i=[l,{}];return i=e.enter_fuse(t,i[0],i[1]),i=r.enter_fuse(t,i[0],i[1]),i},exit_effect:(t,l,i)=>{let a=[l,i];return a=e.exit_fuse(t,a[0],a[1]),a=r.exit_fuse(t,a[0],a[1]),a}}}function L({extra_effectors:e=[],outer:r=t=>n("span",{children:t.children})}){let t=r;return{render_func:l=>{let i=l.element;return n(t,{element:i,context:l.context,children:l.children})},enter_effect:(l,i)=>{let a=[i,{}];for(let s of e)a=s(l).enter_fuse(l,a[0],a[1]);return a},exit_effect:(l,i,a)=>{let s=[i,a];for(let u of e)s=u(l).exit_fuse(l,s[0],s[1]);return s}}}function ie(e){let r=["\u3007","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D","\u4E03","\u516B","\u4E5D"];return`${e}`.split("").map(t=>r[Number(t)]).join("")}const Ft="modulepreload",De={},Ct="/",kt=function(r,t){return!t||t.length===0?r():Promise.all(t.map(l=>{if(l=`${Ct}${l}`,l in De)return;De[l]=!0;const i=l.endsWith(".css"),a=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${a}`))return;const s=document.createElement("link");if(s.rel=i?"stylesheet":Ft,i||(s.as="script",s.crossOrigin=""),s.href=l,document.head.appendChild(s),i)return new Promise((u,f)=>{s.addEventListener("load",u),s.addEventListener("error",f)})})).then(()=>r())};let Te="_MATHJAX_INLINE_START",je="_MATHJAX_INLINE_END",Pe="_MATHJAX_BLOCK_START",$e="_MATHJAX_BLOCK_END";function Ie(){let e=window.MathJax;e!=null&&e.typesetPromise!=null&&e.typesetPromise()}function hr(e){return x.useEffect(()=>{let r=ce(`
            
            <script defer>
                MathJax = {
                    tex: {
                        inlineMath: [["${Te}", "${je}"]] , 
                        displayMath: [["${Pe}", "${$e}"]] , 
                    },
                    svg: {
                        fontCache: "global"
                    } , 
                    ignoreHtmlClass: "mathjax_ignore" , 
                    processHtmlClass: "mathjax_process" , 
                    preRemoveClass: "mathjax_preview" , 
                }
            <\/script>

            
        `);return kt(()=>import("./tex-svg.89c94f6f.js"),[]),ce("head").append(r),()=>{r.remove()}},[]),n(x.Fragment,{children:e.children})}function Dt(e){return x.useEffect(()=>{Ie()}),c("span",{className:"mathjax_process",children:[Te,e.children,je]})}function Tt(e){return x.useEffect(()=>{Ie()}),c("div",{className:"mathjax_process",children:[Pe,e.children,$e]})}var jt=(()=>{let e=t=>new Q(`order/${t.parameters.title}`,`order/${t.parameters.title}`);return C({extra_effectors:[e],inject_pre:t=>{let l=e(t.element).get_context(t.context),i=ie(l[l.length-1]),a=t.element.parameters.title,s=t.element.parameters.alias;return c(E,{inline:!0,children:[a," ",i,s?` (${s})`:""]})},outer:t=>n(ne,{subtitle_like:!0,children:t.children})})})(),Pt=(()=>{let e=t=>new Q("order/normal","order/normal");return C({extra_effectors:[e],inject_pre:t=>{let l=e(t.element).get_context(t.context),i=t.element.parameters.order,a=t.element.parameters.starting;return c(E,{inline:!0,children:[i?`[${l}] `:"",a]})},inject_suf:t=>{let l=t.element.parameters.ending;return n(E,{inline:!0,leftmargin:!0,children:l})},outer:t=>n(ne,{children:t.children})})})(),$t=(()=>C({inner:e=>{let r=e.element.parameters.enter,t=e.element.parameters.exit;return c(w,{force_direction:"column",children:[r?n(E,{children:r}):n(g,{}),n(_t,{children:n(ft,{children:e.children})}),t?n(E,{children:t}):n(g,{})]})}}))(),It=(()=>C({inner:e=>{let r=e.element.parameters.enter,t=e.element.parameters.exit;return c(w,{force_direction:"column",children:[r?n(E,{children:r}):n(g,{}),n(we,{align:"center",children:e.children}),t?n(E,{align:"right",children:t}):n(g,{})]})}}))(),Nt=(()=>C({inner:e=>n(w,{force_direction:"column",children:n(we,{sx:{fontSize:r=>xe(r.printer.typography.structure.fontSize,2)},children:e.children})})}))(),Ne=(()=>{let e=new Q("order/section","order/section");return{render_func:r=>{let t=e.get_context(r.context),i=r.element.parameters.title;return c(X,{children:[c(E,{inline:!0,children:["\u7B2C",ie(t),"\u8282"]}),n(E,{inline:!0,sx:{marginRight:0},children:i})]})},enter_effect:(r,t)=>{let l=[t,{}];return l=e.enter_fuse(r,l[0],l[1]),l},exit_effect:(r,t,l)=>{let i=[t,l];return i=e.exit_fuse(r,i[0],i[1]),i}}})(),Me=(()=>be(e=>(e.element,n(X,{}))))(),Mt=(()=>L({outer:e=>n("strong",{children:e.children})}))(),Ot=(()=>be(e=>n(g,{})))(),Rt=(()=>St({small_margin_enter:!0,small_margin_exit:!0,get_widths:e=>e.parameters.widths.split(",").map(r=>r==""?1:parseInt(r))}))(),Lt=(()=>L({outer:e=>n("del",{children:e.children})}))(),Jt=(()=>L({outer:e=>n(Dt,{children:de.string(e.element)})}))(),zt=(()=>C({inner:e=>{let r=de.string(e.element),t=e.element.parameters.exit||"",l=e.element.parameters.environ,i=l?`\\begin{${l}}`:"",a=l?`\\end{${l}}`:"";return r=`${i}${r}\\text{${t}}${a}`,c(x.Fragment,{children:[e.context.anchor,n(Tt,{children:r})]})}}))(),Ht=(()=>L({outer:e=>{let r=e.element.parameters,[t,l]=x.useState("");x.useEffect(()=>{(async()=>{if(r.internal){let s=await ye.get.resource_info(r.target);s.url?l(Ee(s.url)):l("")}else l(r.target)})()});let i=r.width>0?`${r.width}rem`:"100%",a=r.height>0?`${r.height}rem`:"100%";return n("img",{src:t||void 0,style:{width:i,height:a}})}}))(),Ut=(()=>L({outer:e=>{let r=e.element.parameters.target;if(e.element.parameters.index){let t=Number(r);return n(gt.Consumer,{children:l=>n(he,{component:"button",onClick:i=>l.printer_component.scroll_to(pt(l.root,t)),children:n(I,{children:e.children})})})}return n(he,{href:r,children:e.children})}}))(),Xt=(()=>{let e=r=>new Q(`order/${r.parameters.label}`,`order/${r.parameters.label}`,t=>t.relation=="separating");return C({small_margin_enter:!0,extra_effectors:[e],inner:r=>{let t=e(r.element).get_context(r.context);return n(x.Fragment,{children:c(w,{force_direction:"row",children:[n(mt,{children:n(ve,{children:ie(t)})}),n(ee,{children:r.children})]})})}})})(),Gt=Bt(),Kt=xt(e=>e.title),Wt=j(e=>e.label),Vt=j(e=>e.label),qt=j(e=>e.label),Qt=j(e=>e.label),Oe=vt,Re=Fe(e=>e.title),Le=Fe(e=>"\u7AE0\u8282"),Yt=V(e=>e.label),Zt=bt,er=wt("\u56FE\u7247",e=>!!e.target,e=>{let r=e.parameters,[t,l]=x.useState("");x.useEffect(()=>{(async()=>{if(r.internal){let s=await ye.get.resource_info(r.target);s.url?l(Ee(s.url)):l("")}else l(r.target)})()});let i=r.width>0?`${r.width}rem`:"100%",a=r.height>0?`${r.height}rem`:"100%";return n("img",{src:t||void 0,style:{width:i,height:a}})}),tr=Et(e=>e.title,(e,r)=>r.widths.split(",").map(t=>t==""?1:parseInt(t))),rr=V(e=>e.label,e=>n("del",{children:e.children})),nr=V(e=>e.label,e=>n("u",{children:e.children})),lr=V(e=>e.label,e=>n("u",{children:e.children}));let ir=j(e=>e.label);var ar=j(e=>e.label,e=>{let r={variant:"standard",sx:{width:"2rem"}},t=n(I,{sx:{fontSize:"0.7rem"},children:"extra"}),l=e.element.parameters.exit||"";return n(x.Fragment,{children:n(oe,k(v({},r),{label:t,defaultValue:l,onChange:i=>{let a=i.target.value,s=e.element;pe(e.editor,s,{parameters:k(v({},s.parameters),{exit:a})})}}))})}),Je=new S("\u662D\u8A00",{title:"\u662D\u8A00",alias:""}),ze=new S("\u5E38\u8A00",{label:"\u5E38\u8A00",order:!1,starting:"",ending:""}),He=new S("\u968F\u8A00",{label:"\u968F\u8A00",enter:"",exit:""}),Ue=new Ae("\u9F50\u8A00",{label:"\u9F50\u8A00",widths:"1"});let Xe=new S("\u5217\u8A00",{label:"\u5217\u8A00"});var Ge=new S("\u88F1\u793A",{label:"\u88F1\u793A",enter:"",exit:""}),Ke=new S("\u5F70\u793A",{label:"\u5F70\u793A"}),J=new O("\u65B0\u6BB5",{}),z=new O("\u5C0F\u8282\u7EBF",{title:""}),H=new O("\u7AE0\u8282\u7EBF",{}),We=new R("\u5F3A\u8C03",{label:"\u5F3A\u8C03"}),Ve=new R("\u520A\u8C03",{label:"\u520A\u8C03"});let qe=new R("\u94FE\u8C03",{target:"",index:!1});var Qe=new O("\u56FE\u8C03",{label:"\u56FE\u7247",target:"",internal:!0,width:10,height:-1},{forceInline:!0}),Ye=new Se("\u7A46\u8A00",{}),Ze=new R("\u6570\u5B66\u8C03",{label:"\u6570\u5B66"}),et=new S("\u6570\u5B66\u8A00",{label:"\u6570\u5B66",exit:"",environ:"align"}),sr={group:S,inline:R,abstract:Se,support:O,struct:Ae},ur={[Je.name]:[Je,Kt,jt],[He.name]:[He,Vt,$t],[Ge.name]:[Ge,qt,It],[Ke.name]:[Ke,Qt,Nt],[Ye.name]:[Ye,void 0,void 0],[J.name]:[J,Oe,void 0],[z.name]:[z,Re,Ne],[H.name]:[H,Le,Me],[We.name]:[We,Yt,Mt],[ze.name]:[ze,Wt,Pt],[Ue.name]:[Ue,tr,Rt],[Qe.name]:[Qe,er,Ht],[Ve.name]:[Ve,rr,Lt],[qe.name]:[qe,nr,Ut],[Xe.name]:[Xe,ir,Xt],[Ze.name]:[Ze,lr,Jt],[et.name]:[et,ar,zt]};function _r(e,r,t,l,i){let[a,s,u]=ur[e],f=sr[a.type],p=v(v(v(v({},a.parameter_prototype),t),l),i),b=a.flags;return[new f(r,p,b),s,u]}function fr(e){return e.add_style(J),e.add_style(z),e.add_style(H),e}function mr(e){return e.update_renderer(Zt,"paragraph"),e.update_renderer(Oe,"support",J.name),e.update_renderer(Re,"support",z.name),e.update_renderer(Le,"support",H.name),e}function gr(e){return e.update_renderer(Gt,"paragraph"),e.update_renderer(Ot,"support",J.name),e.update_renderer(Ne,"support",z.name),e.update_renderer(Me,"support",H.name),e}const pr={palette:{divider:"#00000077",primary:{main:"#111111"}},printer:{margins:{paragraph:"0.4rem",special:"1.0rem",colon:"1rem",level:"2rem"},typography:{body:{fontFamily:"STXihei"},title:{fontFamily:"STXinwei"},structure:{fontFamily:"SimHei"},display:{fontFamily:"KaiTi"},weaken:{fontFamily:"FangSong"}}}};export{hr as M,mr as a,gr as b,pr as c,H as e,_r as m,ie as n,z as s,fr as w};
