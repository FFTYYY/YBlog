import{a as l,Y as i,Z as r,ae as p,j as t,H as m,b as h,ag as f,ah as u,B as _,S as x,ak as g,al as v,R as y}from"./titleword.3b2c0924.js";import{M as B}from"./math.d1f1e8d7.js";import{p as C,f as b,r as k,d as w,C as S,m as d}from"./index.83930381.js";import"./Link.085a21ce.js";class D extends l.Component{constructor(a){super(a),this.state={printer:void 0,tree:void 0,cache:void 0}}async componentDidMount(){let a=await i.get.concept(r.node_id),o=C(a),s=new p(b,o,k,w),e=await i.get.content(r.node_id),n=await i.get.cache(r.node_id);this.setState({printer:s,tree:e,cache:n})}render(){let a=this,{printer:o,tree:s}=this.state;return o&&s?h(f,{theme:u(d),children:[t(S,{}),t(_,{children:t(x,{sx:{position:"absolute",width:"100%",left:"0%",top:"0",height:"100%",overflow:"auto",backgroundColor:e=>e.palette.background.default,color:e=>e.palette.text.primary},className:"mathjax_process",children:t(B,{children:t(g,{value:{BackendData:r,cache:a.state.cache},children:t(v,{printer:o,theme:d,onUpdateCache:e=>{e&&JSON.stringify(e)!=JSON.stringify(a.state.cache)&&setTimeout(()=>a.setState({cache:e}),200)},root:s,onDidMount:e=>{r.linkto&&setTimeout(()=>{let n=parseInt(r.linkto);e.scroll_to_idx(n);let c=e.get_ref_from_idx(n);c&&(c.style.border="2px solid")},300)}})})})})})]}):t(m,{})}}y.render(t(D,{}),document.getElementById("root"));