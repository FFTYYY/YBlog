import { OutRenderer_Props , GroupNode , SupportNode , make_out_renderer } from "../../../lib"
import { Node } from "slate"
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

export {brightwords_orenderer , followwords_orenderer , mount_orenderer , display_orenderer , sectioner_orenderer, ender_orenderer}

var brightwords_orenderer = make_out_renderer( (props: OutRenderer_Props)=>{
    let node = props.element as GroupNode
    return <Paper {...props.attributes}>{node.parameters.alias}:{props.children}</Paper>
})

var followwords_orenderer = make_out_renderer( (props: OutRenderer_Props)=>{
    let node = props.element as GroupNode
    return <Paper {...props.attributes}>/*{props.children}*/</Paper>
})

var mount_orenderer = make_out_renderer( (props: OutRenderer_Props)=>{
    let node = props.element as GroupNode
    return <Paper {...props.attributes}>裱：{props.children}</Paper>
})


var display_orenderer = make_out_renderer( (props: OutRenderer_Props)=>{
    let node = props.element as GroupNode
    return <Paper {...props.attributes}>彰：{props.children}</Paper>
})

var sectioner_orenderer = make_out_renderer( (props: OutRenderer_Props)=>{
    let node = props.element as SupportNode
    return <Divider>{node.parameters.title}</Divider>
})

var ender_orenderer = make_out_renderer( (props: OutRenderer_Props)=>{
    return <Divider />
})