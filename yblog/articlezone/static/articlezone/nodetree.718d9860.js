var O=Object.defineProperty,B=Object.defineProperties;var M=Object.getOwnPropertyDescriptors;var x=Object.getOwnPropertySymbols;var R=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable;var m=(i,e,t)=>e in i?O(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,y=(i,e)=>{for(var t in e||(e={}))R.call(e,t)&&m(i,t,e[t]);if(x)for(var t of x(e))A.call(e,t)&&m(i,t,e[t]);return i},b=(i,e)=>B(i,M(e));var u=(i,e,t)=>(m(i,typeof e!="symbol"?e+"":e,t),t);import"./modulepreload-polyfill.9d8db203.js";import{s as E,ae as v,j as n,B as h,af as F,b as _,x as P,v as $,ag as z,i as G,G as D,ah as H,ai as L,y as N,z as U,C as V,R as W,a as Y}from"./vendor.7943a1a9.js";import{a as q,S as J}from"./buttons.8530f351.js";import{I as w,U as K,A as Q}from"./snackbar.44a006f1.js";import{T as X}from"./titleword.b8976b2c.js";function Z(i){function e(t,r){r[t.my_id]=t;for(let s of t.sons)e(s,r);return r}return e(i,{})}function ee(i,e=-1){if(i.sort((r,s)=>r[2]<s[2]?1:0),e>0){let r=i.filter(s=>s[0]==e)[0];r[1]=-1}let t=r=>Object.values(i.filter(s=>s[1]==r)).map(s=>({my_id:s[0],father_id:r,sons:t(s[0]),secret:s[3]}));return{my_id:-1,father_id:-1,sons:t(-1),secret:!0}}function te(i){let e=(t,r)=>{let s=[[t.my_id,t.father_id,r,t.secret]];t.my_id<0&&(s=[]);for(let a in t.sons){let l=parseInt(a);s=[...s,...e(t.sons[l],l)]}return s};return e(i,-1)}class g{constructor(e,t){u(this,"root_id");u(this,"nodetree");u(this,"_id2node");e!=null&&this.update_rawinfo(e,t)}deepcopy(){return new g(this.get_raw(),this.root_id)}update_nodetree(e){return this.nodetree=e,this._id2node=Z(e),this}update_rawinfo(e,t){this.root_id=t;let r=ee(e,t);return this.update_nodetree(r),this}id2node(e){return this._id2node[e]}get_raw(){return te(this.nodetree)}get_root(){return this.nodetree}is_son(e,t){for(;t=this.id2node(t).father_id,t!=-1;)if(t==e)return!0;return!1}}function I(i,e){return e.secret?!0:e.father_id>0?I(i,i.id2node(e.father_id)):!1}class re extends E.exports.Component{constructor(e){super(e);this.state={nodetree:new g([]),expanded:[]}}async componentDidMount(){let e=await w.get.nodetree();this.setState({nodetree:this.state.nodetree.update_rawinfo(e,K.node_id),expanded:Object.values(e).map(t=>t[1])})}move_node(e,t,r){let s=this.state.nodetree.deepcopy(),a=e.idx_in_father,l=s.id2node(e.father_id);t=s.id2node(t.my_id),e=s.id2node(e.my_id),l.my_id==t.my_id&&a<r&&r--;let c=l.sons;l.sons=[...c.slice(0,a),...c.slice(a+1,c.length)];let o=t.sons;t.sons=[...o.slice(0,r),e,...o.slice(r,o.length)],e.father_id=t.my_id,this.setState({nodetree:s})}DroppableSpace(e){let t=this,r=e.node,s=e.expect_idx,a=this.state.nodetree;const[{is_over_can_drop:l},c]=v(()=>({accept:"treeitem",drop:(o,f)=>{!f.isOver({shallow:!0})||t.move_node(o,r,s)},collect:o=>({is_over_can_drop:o.isOver({shallow:!0})&&o.canDrop()}),canDrop:o=>r.my_id!=o.my_id&&!a.is_son(o.my_id,r.my_id)}));return n(h,{ref:c,sx:{border:l?"1px dashed grey":"0",height:"6px"}})}DragableTreeItem(e){let t=this,r=e.node,s=r.my_id,a=r.father_id,l=e.idx_in_father,c=this.state.nodetree,o=this.DroppableSpace.bind(this),f=I(this.state.nodetree,r);const[{is_dragging:j},S]=F(()=>({type:"treeitem",item:b(y({},r),{idx_in_father:l}),collect:d=>({is_dragging:d.isDragging()})})),[{is_over:k,can_drop:T},C]=v(()=>({accept:"treeitem",drop:(d,p)=>{!p.isOver({shallow:!0})||d.my_id!=r.my_id&&t.move_node(d,r,r.sons.length)},collect:d=>({is_over:d.isOver({shallow:!0}),can_drop:d.canDrop()}),canDrop:d=>r.my_id==d.my_id||!c.is_son(d.my_id,r.my_id)}));return _(h,{ref:C,sx:{border:k&&T?"1px dashed grey":"0"},children:[n(o,{node:c.id2node(a),expect_idx:l}),_(P,{label:n(h,{color:f?"text.secondary":"text.primary",children:_(Q,{force_direction:"row",children:[_($,{sx:{marginY:"auto"},children:["[",s,"] ",n(X,{node_id:s})]}),n(z,{onClick:d=>{d.stopPropagation()},defaultChecked:r.secret,onChange:d=>{let p=this.state.nodetree.deepcopy();p.id2node(s).secret=d.target.checked,this.setState({nodetree:p})}})]})}),nodeId:`${s}`,ref:S,onFocusCapture:d=>d.stopPropagation(),sx:{cursor:"move",opacity:j?.5:1},children:[e.children,n(o,{node:r,expect_idx:r.sons.length})]})]})}get_subtree(e){let t=this,r=this.DragableTreeItem.bind(this);return n(G,{children:Object.values(e.sons).map((s,a)=>n(r,{node:s,idx_in_father:a,children:t.get_subtree(s)},`${a}`))})}async save_nodetree(){return await w.post.nodetree({nodetree:this.state.nodetree.get_raw()})}render(){let e=this,t=this.state.nodetree;return _(h,{sx:{position:"absolute",top:"2%",left:"2%",height:"96%",width:"96%",display:"flex"},children:[n(q,{sx:{marginRight:"1%"},children:n(J,{save_func:e.save_nodetree.bind(e)})}),_(h,{sx:{position:"relative",width:"100%",flex:1},children:[n(D,{}),n(H,{backend:L,children:n(N,{expanded:Object.values(e.state.expanded).map(r=>`${r}`),onNodeToggle:(r,s)=>{e.setState({expanded:s})},defaultCollapseIcon:n(U,{}),defaultExpandIcon:n(V,{}),children:e.get_subtree(t.get_root())})}),n(D,{})]})]})}}W.render(n(Y.StrictMode,{children:n(re,{})}),document.getElementById("root"));