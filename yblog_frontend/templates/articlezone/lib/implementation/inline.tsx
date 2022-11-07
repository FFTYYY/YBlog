import React, { ReactComponentElement } from "react"

import {
    Typography , 
    Box , 
    Paper , 
    Grid , 
} from "@mui/material"
import type {
    TypographyProps , 
    PaperProps , 
    BoxProps , 
} from "@mui/material"


import {
    Printer , 
    ProcessedParameterList , 
    ConceptNode , 
    GroupNode , 
    PrinterRenderFunctionProps , 
    PrinterRenderFunction , 
    PrinterRenderer , 
    Env , 
    Context, 
    ParagraphNode, 
    InlineNode ,
    TextNode ,  
} from "../core"
import {
    ContexterBase , 
    InjectContexter , 
    ConsumerContexter , 
    PreprocessFunction , 
    PreprocessInformation , 
} from "./contexter"
import { 
    PrinterPartBox , 
    PrinterParagraphBox, 
} from "./uibase/components"
import {
    auto_renderer , 
} from "./utils"
export {
    get_default_inline_renderer , 
    useless_renderer_inline , 
    useless_renderer_text , 
}


/**
 * 这个函数帮助用户生成一个行内一级概念的渲染器。
 * @param params.contexters 要使用的上下文工具列表。
 * @param params.outer 包裹内容的一个容器。
 * @returns 
 */
function get_default_inline_renderer({
    contexters = [] , 
    outer = (props: PrinterRenderFunctionProps<InlineNode>)=><span>{props.children}</span>  , 
}:{
	contexters?: PreprocessFunction<InlineNode , ContexterBase<InlineNode>>[] ,
	outer     ?: PrinterRenderFunction<InlineNode>
}){ 

    let OUT = outer

    return auto_renderer({
        contexters: contexters , 
        render_function: (props: PrinterRenderFunctionProps<InlineNode>) => {
            let props_except_children = {
                node: props.node , 
                context: props.context , 
                parameters: props.parameters ,             
            }
            return <OUT {...props_except_children}>{props.children}</OUT>
        }
    })
}

/** 这个renderer总之提供一个默认的毫无功能的行内节点渲染实现。 */
let useless_renderer_inline = new PrinterRenderer({
    renderer(props: PrinterRenderFunctionProps):React.ReactElement<PrinterRenderFunctionProps>{
        return <span>{props.children}</span>
    }
})

/** 这个renderer总之提供一个默认的毫无功能的文本节点渲染实现。 
 * 毕竟文本节点要什么功能....
*/
let useless_renderer_text = new PrinterRenderer({
    renderer(props: PrinterRenderFunctionProps):React.ReactElement<PrinterRenderFunctionProps>{
        let node = props.node as TextNode
        return <span style={{whiteSpace: "pre"}}>{node.text}</span>
    }
})

