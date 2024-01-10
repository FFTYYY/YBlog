import{a as F,I as f,j as e,m as h,h as C,b as o,S as y,a5 as p,O as A,F as l,A as L,f as T,R as S}from"./theme.83d79a3f.js";import{T as _,C as w,f as b}from"./overlayscrollbars.2b07f01c.js";import{N as v,a as z,A as I,b as M,T as R}from"./TreeView.fb55c237.js";import{s as k,T as s,j,B as i,L as O}from"./Link.615fc0f6.js";import"./createSvgIcon.99d306d8.js";let c=1,a=k(s)({fontFamily:"Microsoft JhengHei",marginBottom:"0.2rem"}),H=new Date().getTime(),E;function u(n){return e(i,{children:e(r,{...n})})}function r(n){return e(O,{sx:{color:"inherit",width:"auto",display:"inline-block",...n.sx||{}},href:p.view.content(n.id),children:e(a,{sx:{fontSize:"0.9rem"},children:e(A,{node_id:n.id})})})}function $(n){let d=n.id,t=n.label,[m,x]=F.useState(!0);F.useEffect(()=>{(async()=>{let D=await f.get.visibility(d);x(!D.secret)})()});let g=o(i,{sx:{marginX:"0.5rem",marginY:"0.2rem",width:"95%",display:"flex"},children:[d?e(r,{id:d}):e(l,{}),t?e(s,{sx:{fontSize:"1rem",fontFamily:"SimHei"},children:t}):e(l,{}),m?e(l,{}):e(i,{sx:{display:"inline-block",marginLeft:"auto",right:0,paddingLeft:"0.4rem"},children:e(L,{title:"\u4E0D\u8BA9\u770B",children:e(i,{children:e(T,{text:"\u9690",fontSize:"0.7rem",color:"inherit"})})})})]});return e(R,{nodeId:`${d}`,label:g,children:n.children||e(l,{})})}function B(n){let d=n.my_info;return e($,{id:d.my_id,children:d.sons.map(t=>e(B,{my_info:t}))})}class Y extends F.Component{constructor(d){super(d),this.state={nodetree:new v([]),expanded:[],root_sons:[]}}async componentDidMount(){let d=this,t=await f.get.nodetree(c);this.setState({nodetree:d.state.nodetree.update_rawinfo(t,c),expanded:Object.values(t).map(m=>m[1])})}render(){let t=this.state.nodetree.get_root().sons[0],m=-1;return t!=null&&E==null&&(E=new Date().getTime(),m=(E-H)/1e3,m=Math.ceil(m*100+.5)/100),e(_,{theme:j(h.mui),children:e(C,{value:h,children:e(i,{children:o(y,{sx:{position:"fixed",top:"2%",width:"50%",height:"96%",left:"25%",backgroundColor:"rgba(0,0,0,0)",color:"text.primary",overflow:"auto"},children:[e(w,{}),e(a,{sx:{fontSize:"3rem"},children:"\u661F\u4E4B\u5668"}),o(a,{sx:{fontSize:"1rem"},children:["\u4F60\u5728\u8DEF\u8FB9\u5076\u7136\u6361\u5230\u4E86\u4E00\u68F5\u6811\uFF0C\u6811\u6839\u4E0A\u5199\u7740\u51E0\u4E2A\u5927\u5B57\u300E\u661F\u4E4B\u5668\u300F\u548C\u51E0\u884C\u5C0F\u5B57\u3002","\u518D\u4ED4\u7EC6\u770B\u770B\uFF0C\u4F60\u53D1\u73B0\u8FD9\u68F5\u6811\u7684\u6BCF\u4E2A\u8282\u70B9\u4E0A\u90FD\u5199\u4E86\u4E00\u4E9B\u6587\u5B57\u3002\u8FD9\u4E9B\u6587\u672C\u4E00\u5B9A\u662F\u79CD\u4E0B\u8FD9\u68F5\u6811\u7684\u4EBA\u5199\u7684\u5427\u3002"]}),o(i,{sx:{marginTop:"2.5rem",display:"flex",flexDirection:"row"},children:[o(i,{sx:{borderRight:t?"1px dotted #999999":0,paddingRight:"1rem"},children:[e(a,{sx:{fontSize:"1rem"},children:"\u5728\u6811\u6839\u300E\u661F\u4E4B\u5668\u300F\u4E0A\uFF0C\u8FD8\u5217\u4E86\u4E00\u4E2A\u76EE\u5F55\uFF0C\u4F3C\u4E4E\u5199\u7740\u6811\u7684\u4E3B\u4EBA\u81EA\u5DF1\u6BD4\u8F83\u559C\u6B22\u7684\u8282\u70B9\u3002"}),e(s,{sx:{fontSize:"1rem",fontFamily:"SimHei",marginTop:"1rem",marginBottom:"0.2rem"},children:"\u6570\u5B66\u7B14\u8BB0"}),o(i,{sx:{marginLeft:"2rem"},children:[e(u,{id:1188}),e(u,{id:1231}),e(u,{id:1078}),e(u,{id:1136}),e(u,{id:1321}),e(u,{id:1362}),e(u,{id:1293}),e(u,{id:1125}),e(u,{id:1061}),e(u,{id:1177}),e(u,{id:1307}),e(u,{id:1305}),e(u,{id:1409}),e(u,{id:1288}),e(u,{id:891}),e(u,{id:818}),e(u,{id:1231}),e(u,{id:1078}),e(u,{id:1136}),e(u,{id:1321}),e(u,{id:1362}),e(u,{id:1293}),e(u,{id:1125}),e(u,{id:1061}),e(u,{id:1177}),e(u,{id:1307}),e(u,{id:1305}),e(u,{id:1409}),e(u,{id:1288}),e(u,{id:891}),e(u,{id:818})]}),e(s,{sx:{fontSize:"1rem",fontFamily:"SimHei",marginTop:"1rem",marginBottom:"0.2rem"},children:"\u53E4\u4EE3\u6587\u5B66\u672D\u8BB0"}),e(i,{sx:{marginLeft:"2rem"},children:e(r,{id:219})}),o(i,{sx:{marginLeft:"2rem"},children:[e(i,{sx:{marginLeft:"2rem"},children:e(r,{id:310})}),e(i,{sx:{marginLeft:"2rem"},children:e(r,{id:340})}),e(i,{sx:{marginLeft:"2rem"},children:e(r,{id:1004})}),e(i,{sx:{marginLeft:"2rem"},children:e(r,{id:369})}),e(i,{sx:{marginLeft:"2rem"},children:e(r,{id:263})}),e(i,{sx:{marginLeft:"2rem"},children:e(r,{id:255})}),e(i,{sx:{marginLeft:"2rem"},children:e(r,{id:863})}),e(i,{sx:{marginLeft:"2rem"},children:e(r,{id:385})}),e(i,{sx:{marginLeft:"2rem"},children:e(r,{id:274})}),e(i,{sx:{marginLeft:"2rem"},children:e(r,{id:287})}),e(i,{sx:{marginLeft:"2rem"},children:e(r,{id:298})})]}),e(i,{sx:{marginLeft:"2rem"},children:e(r,{id:871})}),e(i,{sx:{marginLeft:"2rem"},children:e(r,{id:1021})})]}),t==null?e(i,{}):o(i,{sx:{marginLeft:"1rem"},children:[e(a,{sx:{fontSize:"1rem"},children:`\u4F60\u82B1\u4E86${b(m)}\u79D2\u4ED4\u7EC6\u8003\u5BDF\u4E86\u8FD9\u68F5\u6811\uFF0C\u53D1\u73B0\u8FD9\u68F5\u6811\u7684\u6240\u6709\u8282\u70B9\u7EC4\u6210\u4E86\u5982\u4E0B\u7684\u7ED3\u6784\u3002`}),e(i,{sx:{width:"90%",overflow:"auto",marginY:"1rem"},children:e(z,{defaultCollapseIcon:e(I,{fontSize:"large"}),defaultExpandIcon:e(M,{fontSize:"large"}),defaultExpanded:[`${c}`],children:e(B,{my_info:t})})})]})]}),t==null?e(i,{}):o(i,{children:[e("br",{}),e(a,{sx:{fontSize:"1rem"},children:"\u5728\u6811\u6839\u300E\u661F\u4E4B\u5668\u300F\u7684\u7ED3\u5C3E\uFF0C\u8FD8\u5199\u7740\u51E0\u53E5\u8BD7\uFF0C\u597D\u50CF\u6458\u81EA\u4E00\u9996\u664B\u4EE3\u7684\u4E50\u5E9C\u3002\u60F3\u5FC5\u8FD9\u68F5\u6811\u7684\u4E3B\u4EBA\u4E00\u5B9A\u5F88\u559C\u6B22\u8FD9\u9996\u8BD7\u5427\u3002"}),e(i,{sx:{marginY:"0.5rem",marginLeft:"2rem",textAlign:"center"},children:e(a,{sx:{fontFamily:"Kaiti",fontSize:"1.1rem"},children:"\u8360\u4E0E\u9EA6\u516E\u590F\u96F6\uFF0C\u5170\u6842\u8DF5\u971C\u903E\u99A8\u3002\u7984\u547D\u60AC\u5929\u96BE\u660E\uFF0C\u59BE\u5FC3\u7ED3\u610F\u4E39\u9752\uFF0C\u4F55\u5FE7\u541B\u5FC3\u4E2D\u503E\u3002"})})]})]})})})})}}S.render(e(Y,{}),document.getElementById("root"));
