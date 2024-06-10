/**
 * 这个模块把页面转换为latex代码。
 * TODO 目前还不work
 */
import * as React from "react"
import * as Slate from "slate" 
import * as SlateReact from "slate-react" 
import { Grid , Box , 
    Link, ThemeOptions , Dialog, Tooltip  , Badge  , Button , Paper , IconButton  , TextField , Typography, BoxProps, LinkProps ,  
    styled , 
} from "@mui/material"
import {
    PrinterPartBox , 
    ScrollBarBox, 
    auto_renderer , 
    AbstractNode ,    
    Printer , 
    ConceptNode , 
    PrinterRenderFunctionProps , 
    PrinterRenderFunction , 
    GlobalInfo , 
    ContexterBase , 
    PreprocessFunction , 
    DefaultPrinterComponent , 
    DefaultAbstractAsRoot, 
    AutoStack,
    AutoTooltip,
    PrinterParagraphBox,
    PrinterNewLevelBox, 
	ThemeContext , 
    DefaultAbstractRendererAsProperty, 
    Context, 
    MouselessRegister , 
    get_position , 
    EditorComponent , 
    SPACE, 
    is_textnode,
    ParagraphNode,
    Node,
    is_paragraphnode, 
    is_inlinenode , 
    ProcessedParameterList, 
    PrinterComponent, 
} from "@ftyyy/ytext"

import { converters } from "./converters"

export {
    convert_to_latex
}

function convert_concept(
    node: ConceptNode, 
    children: string, 
    context: Context, 
    parameters: ProcessedParameterList, 
    add_global: (val: string) => void, 
    printer_component: PrinterComponent
): string {
    let printer = printer_component.get_printer()

    let concept = printer.get_node_first_concept(node)?.name
    let converter = converters[concept]
    if(!converter){
        
        if(is_inlinenode(node)){
            return children
        }

        return children + "\n\n"
    }
    return converter(node, children, context, parameters, add_global)
}

function subconvert(
    node: Node, 
    path: number [], 
    all_contexts: {[path: string]: Context}, 
    all_parameters: {[path: string]: ProcessedParameterList},
    add_global: (val: string) => void, 
    printer_component: PrinterComponent , 
): string {        
        let my_path = JSON.stringify(path) // 获取本节点
        let my_context = all_contexts[my_path] // 本节点的上下文信息。
        let my_parameters = all_parameters[my_path] // 获取参数列表。

        // 文本节点直接输出text。
        if(is_textnode(node)){
            return node.text
        }
    
        // 先渲染子节点。
        let children = ""
        for(let subidx = 0; subidx < node.children.length; subidx++){
            children = children + subconvert(
                node.children[subidx], 
                [...path , subidx], 
                all_contexts, 
                all_parameters, 
                add_global, 
                printer_component
            )
        }

        if(is_paragraphnode(node)){
            return children + "\n\n"
        }
    
        return convert_concept(node, children, my_context, my_parameters,add_global,printer_component)
}


function convert_to_latex(printer_component: PrinterComponent, root: AbstractNode){

    let global = [
        "\\usepackage[UTF8]{ctex}" , 
        "\\usepackage{hyperref}" , 
        "\\usepackage{url}" , 
        "\\usepackage{amsmath}" , 
        "\\usepackage{amssymb}" , 
        "\\usepackage{mathtools}" , 
        "\\usepackage{mathrsfs}" , 
        "\\usepackage{algorithm}" , 
        "\\usepackage{algorithmic}" , 
        "\\usepackage{cleveref}" , 
        "\\usepackage{stfloats}" , 
        "\\usepackage{xcolor}" , 
        "\\setlength{\\parindent}{0em}" , 
    ]
    function add_global(val: string){
        if (global.indexOf(val) >= 0){
            return 
        }
        global.push(val)
    }

    let [env , all_contexts , all_parameters, all_caches] = printer_component.preprocess({root: root})

    let latex = subconvert(root, [], all_contexts, all_parameters, add_global, printer_component)
    let prefix = global.join("\n")

    return "\\documentclass{article}\n" + prefix + 
        `\n\\title{${root.parameters.title.val}}` + 
        "\n\\begin{document}" + 
        "\n\\maketitle\n"+ 
        latex + 
        "\n\\end{document}"
}