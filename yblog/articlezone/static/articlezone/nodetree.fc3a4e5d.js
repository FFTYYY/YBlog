var d=Object.defineProperty;var a=(i,e,t)=>e in i?d(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var n=(i,e,t)=>(a(i,typeof e!="symbol"?e+"":e,t),t);function f(i){function e(t,s){s[t.my_id]=t;for(let r of t.sons)e(r,s);return s}return e(i,{})}function c(i,e=-1){if(i.sort((s,r)=>s[2]<r[2]?1:0),e>0){let s=i.filter(r=>r[0]==e)[0];s[1]=-1}let t=s=>Object.values(i.filter(r=>r[1]==s)).map(r=>({my_id:r[0],father_id:s,sons:t(r[0]),secret:r[3]}));return{my_id:-1,father_id:-1,sons:t(-1),secret:!0}}function h(i){let e=(t,s)=>{let r=[[t.my_id,t.father_id,s,t.secret]];t.my_id<0&&(r=[]);for(let _ in t.sons){let o=parseInt(_);r=[...r,...e(t.sons[o],o)]}return r};return e(i,-1)}class u{constructor(e,t){n(this,"root_id");n(this,"nodetree");n(this,"_id2node");e!=null&&this.update_rawinfo(e,t)}deepcopy(){return new u(this.get_raw(),this.root_id)}update_nodetree(e){return this.nodetree=e,this._id2node=f(e),this}update_rawinfo(e,t){this.root_id=t;let s=c(e,t);return this.update_nodetree(s),this}id2node(e){return this._id2node[e]}get_raw(){return h(this.nodetree)}get_root(){return this.nodetree}is_son(e,t){for(;t=this.id2node(t).father_id,t!=-1;)if(t==e)return!0;return!1}}export{u as N};
