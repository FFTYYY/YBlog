/** 
 * 这个组件提供抽象节点的渲染方案。
 * 和一般的渲染器不同，抽象节点的渲染不会由印刷器调用，而是由用户自行决定调用位置。不过，印刷器会负责管理抽象节点的渲染方式。
 * 
 * 渲染器提供了一个`DefaultAbstractRenderer`组件，这个组件除了接收所有正常渲染所需的参数以外，还接受一个场合`senario`参数，
 * 而所有默认的渲染器也会提供一个场合参数。只有当场合相同时，`DefaultAbstractRenderer`才会渲染一个抽象节点。
 * 
 * @module
 */

import React, { Children, ReactComponentElement } from "react"

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
    GlobalInfo , 
    AbstractNode , 
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
import {
    DefaultPrinterComponent , 
} from "./main"

import {
    Link, ThemeOptions , Dialog, Tooltip  , 
} from "@mui/material"

export {get_default_abstract_renderer , DefaultAbstractRendererAsProperty , DefaultAbstractAsRoot}

/** 这个组件为其他组件提供一个默认的渲染抽象节点的方法。 */
function DefaultAbstractRendererAsProperty(props: PrinterRenderFunctionProps<ConceptNode> & {senario:string}){
    return <GlobalInfo.Consumer>{(globalinfo)=>{
        let printer = globalinfo.printer as Printer
        let abstracts = props.node.abstract

        let children = props.children

        for(let subidx in abstracts){
            let subroot = abstracts[subidx]

            let subrenderer = printer.get_node_renderer(subroot) 
            let R = subrenderer.renderer_as_property // 获取渲染器

            // 在children外面套一层渲染
            children = <R
                node = {subroot}
                parameters = {props.parameters}
                context = {props.context}
                flags = {{
                    senario: props.senario
                }}
                key = {subidx}
            >{children}</R>
        }


        return children

    }}</GlobalInfo.Consumer>
}

/** 这个节点为抽象节点提供一个默认的作为一整棵树渲染的方法。 
 * @param props.printer_suggestion 上层提供的印刷器，如果没有提供就使用原来的印刷器。
 * @param props.theme_suggestion 上层提供的主题，如果没有提供就使用原来的主题。
*/
function DefaultAbstractAsRoot(props: PrinterRenderFunctionProps<AbstractNode> & {printer?: Printer , theme?: ThemeOptions}){
    let {node , parameters , context , flags, printer, theme} = props

    return <GlobalInfo.Consumer>{(globalinfo)=>{
        let p = printer || globalinfo.printer as Printer
        let t = theme || globalinfo.theme as ThemeOptions

        console.log(theme)
        
        return <DefaultPrinterComponent 
            root = {node}
            printer = {p}
            theme = {t}
        />
    }}</GlobalInfo.Consumer>

}

/** 这个函数提供一个渲染抽象节点的方案。
 * 这个函数所提供的组件会将抽象节点渲染成一个链接，因此其需要在一个类似文本的位置调用。
 * 
 * @param params.contexters 除了默认的注射器之外，额外添加的上下文工具。
 * @param params.container 包裹外部的组件。
*/
function get_default_abstract_renderer({
    contexters =  [] , 
    container =  (props: PrinterRenderFunctionProps<AbstractNode>)=><PrinterPartBox>{props.children}</PrinterPartBox> , 
    printer = undefined , 
    theme = undefined , 
    senario = "title" , 
}:{
    contexters?: PreprocessFunction<AbstractNode , ContexterBase<AbstractNode>>[]
    container?: PrinterRenderFunction<AbstractNode>
    printer?: Printer
    theme?: ThemeOptions , 
    senario?: string 
}){
    let CONT = container

    return auto_renderer<AbstractNode>({
        contexters: contexters , 
        render_function_as_property: (props: PrinterRenderFunctionProps<AbstractNode>) => {

            if(props.flags["senario"] != senario){
                return <>{props.children}</>
            }

            let [show_abstract , set_show_abstract] = React.useState(false)

            let subcomp = <DefaultAbstractAsRoot
                {...props}
                theme = {theme}
                printer = {printer}
            ></DefaultAbstractAsRoot>

            return <React.Fragment>
                <Link href="#" onClick={(e)=>set_show_abstract(true)}>{props.children}</Link>
                <Dialog open={show_abstract} onClose={()=>set_show_abstract(false)}>{subcomp}</Dialog>
                {/* <Tooltip title = {subcomp}><Link href="#">{props.children}</Link></Tooltip> */}
            </React.Fragment> 
        } , 
        render_function: (props: PrinterRenderFunctionProps<AbstractNode>) => {
            let props_except_children = {
                node: props.node , 
                context: props.context , 
                parameters: props.parameters ,             
            }
            return <CONT {...props_except_children}>{props.children}</CONT>
        } , 
    })
}

