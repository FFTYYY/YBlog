import{a as l,I as n,B as a,j as e,F as m,b as h,R as p}from"./titleword.bd9676ca.js";import{P as f,T as u,b as _,G as x,c as g}from"./abstract.5f0fe41f.js";import{M as v}from"./math.86371715.js";import{p as B,f as b,r as y,d as C,c as P,m as c,C as w}from"./overlayscrollbars.6b2e0a4e.js";import{j as T,B as j}from"./Link.99cdf72f.js";import"./SwitchBase.6209ff79.js";class k extends l.Component{constructor(r){super(r),this.state={printer:void 0,tree:void 0,cache:void 0}}async componentDidMount(){let r=await n.get.concept(a.node_id),o=B(r),s=new f(b,o,y,C),t=await n.get.content(a.node_id),i=await n.get.cache(a.node_id);this.setState({printer:s,tree:t,cache:i})}render(){let r=this,{printer:o,tree:s}=this.state;return o&&s?e(P,{theme:T(c.mui),children:h(u,{value:c,mui:!0,children:[e(w,{}),e(j,{children:e(_,{sx:{position:"absolute",width:"100%",left:"0%",top:"0",height:"100%",overflow:"auto",backgroundColor:"background.default",color:"text.primary"},className:"heightProvider mathjax_process",children:e(v,{children:e(x,{value:{BackendData:a,cache:r.state.cache},children:e(g,{printer:o,theme:c,onUpdateCache:t=>{t&&JSON.stringify(t)!=JSON.stringify(r.state.cache)&&setTimeout(()=>r.setState({cache:t}),200)},root:s,onDidMount:t=>{a.linkto&&setTimeout(()=>{let i=parseInt(a.linkto);t.scroll_to_idx(i);let d=t.get_ref_from_idx(i);d&&(d.style.border="2px solid")},300)}})})})})})]})}):e(m,{})}}p.render(e(k,{}),document.getElementById("root"));
