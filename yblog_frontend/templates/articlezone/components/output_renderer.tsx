import { OutRenderer_Props , GroupNode , SupportNode , make_out_renderer } from "../../../lib"
import { Node } from "slate"
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

export {
    brightwords_renderer , 
    followwords_renderer , 
    mount_renderer , 
    display_renderer , 
    sectioner_renderer , 
    ender_renderer , 
}

var brightwords_renderer = make_out_renderer( (props: OutRenderer_Props)=>{
    let node = props.element as GroupNode
    return <Paper {...props.attributes}>{node.parameters.alias}:{props.children}</Paper>
})

var followwords_renderer = make_out_renderer( (props: OutRenderer_Props)=>{
    let node = props.element as GroupNode
    return <Paper {...props.attributes}>/*{props.children}*/</Paper>
})

var mount_renderer = make_out_renderer( (props: OutRenderer_Props)=>{
    let node = props.element as GroupNode
    return <Paper {...props.attributes}>裱：{props.children}</Paper>
})


var display_renderer = make_out_renderer( (props: OutRenderer_Props)=>{
    let node = props.element as GroupNode
    return <Paper {...props.attributes}>彰：{props.children}</Paper>
})

var sectioner_renderer = make_out_renderer( (props: OutRenderer_Props)=>{
    let node = props.element as SupportNode
    return <Divider>{node.parameters.title}</Divider>
})

var ender_renderer = make_out_renderer( (props: OutRenderer_Props)=>{
    return <Divider />
})