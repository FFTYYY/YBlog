import { OutRenderer_Props , GroupNode } from "@ftyyy/ytext"
import { Node } from "slate"
import Paper from '@mui/material/Paper';

export {brightwords_orenderer , followwords_orenderer , mount_orenderer , display_orenderer}

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
