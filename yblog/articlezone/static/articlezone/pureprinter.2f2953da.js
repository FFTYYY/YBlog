import{a as l,I as n,B as r,P as m,j as t,F as h,b as p,p as u,S as f,G as _,t as x,R as g}from"./titleword.eeefe96d.js";import{f as v,M as B}from"./math.f2fd53ff.js";import{p as b,f as y,b as C,d as P,c as k,m as c,C as w}from"./overlayscrollbars.5bcb0056.js";import{k as S,B as T}from"./Link.01193879.js";class D extends l.Component{constructor(a){super(a),this.state={printer:void 0,tree:void 0,cache:void 0}}async componentDidMount(){let a=await n.get.concept(r.node_id),o=b(a),s=new m(y,o,C,P),e=await n.get.content(r.node_id);document.title=e.parameters.title.val;let i=await n.get.cache(r.node_id);this.setState({printer:s,tree:e,cache:i}),setTimeout(()=>{v.go()},1e3)}render(){let a=this,{printer:o,tree:s}=this.state;return o&&s?t(k,{theme:S(c.mui),children:p(u,{value:c,mui:!0,children:[t(w,{}),t(T,{children:t(f,{sx:{position:"absolute",width:"100%",left:"0%",top:"0",height:"100%",overflow:"auto",backgroundColor:"background.default",color:"text.primary"},className:"heightProvider mathjax_process",children:t(B,{children:t(_,{value:{BackendData:r,cache:a.state.cache},children:t(x,{printer:o,theme:c,onUpdateCache:e=>{e&&JSON.stringify(e)!=JSON.stringify(a.state.cache)&&setTimeout(()=>a.setState({cache:e}),200)},root:s,onDidMount:e=>{r.linkto&&setTimeout(()=>{let i=parseInt(r.linkto);e.scroll_to_idx(i);let d=e.get_ref_from_idx(i);d&&(d.style.border="2px solid")},300)}})})})})})]})}):t(h,{})}}g.render(t(D,{}),document.getElementById("root"));
