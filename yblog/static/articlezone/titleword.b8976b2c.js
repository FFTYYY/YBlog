import{a as e,j as s,i as a}from"./vendor.7943a1a9.js";import{I as r}from"./snackbar.44a006f1.js";class c extends e.Component{constructor(t){super(t);this.state={title:void 0}}async componentDidMount(){let t=await r.get.content(this.props.node_id);this.setState({title:t.parameters.title})}render(){return s(a,{children:this.state.title})}}export{c as T};