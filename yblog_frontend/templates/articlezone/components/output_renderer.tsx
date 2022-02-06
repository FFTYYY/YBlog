import { OutRenderer_Props , GroupNode , SupportNode } from "../../../lib"
import { Node } from "slate"
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

export {brightwords_orenderer , followwords_orenderer , mount_orenderer , display_orenderer , sectioner_orenderer, ender_orenderer}

function brightwords_orenderer(props: OutRenderer_Props){
    let node = props.element as GroupNode
    return <Paper {...props.attributes}>{node.parameters.alias}:{props.children}</Paper>
}

function followwords_orenderer(props: OutRenderer_Props){
    let node = props.element as GroupNode
    return <Paper {...props.attributes}>/*{props.children}*/</Paper>
}

function mount_orenderer(props: OutRenderer_Props){
    let node = props.element as GroupNode
    return <Paper {...props.attributes}>裱：{props.children}</Paper>
}


function display_orenderer(props: OutRenderer_Props){
    let node = props.element as GroupNode
    return <Paper {...props.attributes}>彰：{props.children}</Paper>
}

function sectioner_orenderer(props: OutRenderer_Props){
    let node = props.element as SupportNode
    return <Divider>{node.parameters.title}</Divider>
}

function ender_orenderer(props: OutRenderer_Props){
    return <Divider />
}