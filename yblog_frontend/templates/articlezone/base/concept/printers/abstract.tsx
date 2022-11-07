import * as React from "react"
import { Grid , Box } from "@mui/material"
import {
    PrinterRenderer , 
    Env , 
    Context , 
    Node , 
    PrinterRenderFunctionProps, 
    GroupNode,
    StructNode , 
    InlineNode,
    TextNode, 
    OrderContexter , 
    auto_renderer , 

    get_default_group_renderer , 
    get_default_inline_renderer , 
    get_default_paragraph_renderer, 
    get_default_abstract_renderer , 
    get_default_structure_renderer , 

    DefaultAbstractRendererAsProperty , 

    PreprocessInformation , 
    PrinterStructureBoxText , 
    PrinterPartBox , 

    useless_renderer_block , 
    useless_renderer_inline ,
    useless_renderer_text,
    ProcessedParameterList,
    ScrollBarBox, 
} from "../../../lib"

export {
    renderers
}


let renderer_comment = get_default_abstract_renderer({
    senario: "title" , 
    container: (props)=>{
        let {node,parameters,context,children} = props

        return <ScrollBarBox sx={{
            width: "auto" , 
            height: "auto" , 
            maxHeight: "80vh" , 
            overflow: "auto" , 
        }}>
            <PrinterPartBox>{children}</PrinterPartBox>
        </ScrollBarBox>
    }
})

let renderers = {
    abstract: {
        "穆言": renderer_comment , 
    } , 
}