import React, { ReactComponentElement } from "react"
import { ThemeOptions , Grid} from "@mui/material"

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
    StructNode , 
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
    remtimes , 
} from "./uibase/components"
import {
    auto_renderer , 
} from "./utils"

export { 
    get_default_group_renderer , 
    get_default_paragraph_renderer , 
    useless_renderer_block , 
    get_default_outer  , 
    get_default_structure_renderer , 
}

/** 这个函数生成一个默认的外框。
 * 主要用来处理Group节点和Struct节点相连的问题。如果当前节点和前方节点相连，则减少一定的距离。
 */
 function get_default_outer<NodeType extends ConceptNode>(box_props: any = {}){
    return (props: PrinterRenderFunctionProps<NodeType>) => {
        let {node , parameters , context} = props
        let flag = false // 是否跟前面的节点相连。
        if(node.type == "structure" || node.type == "group"){
            flag = node.relation == "chaining"
        }
        let chaining_sx: any = {marginTop: (theme: ThemeOptions)=>remtimes(theme.margins.special , 0.5)}
        if(box_props["small_margin"]){ // 如果要求一个小的间距
            chaining_sx = {}
        }
        return <PrinterPartBox sx={flag ? chaining_sx : {}} {...box_props}>{props.children}</PrinterPartBox>
    }
}

// XXX 把small_margin_exit用上，这需要另一个contexter来实现。
/** 这个函数快速生产一个默认的块级组件的渲染器。 
 * 同时，这个函数会使用上下文工具，快捷地允许向段落的开头和结尾添加元素。
 * 
 * @param params.contexters 除了默认的注射器之外，额外添加的上下文工具。
 * @param params.outer 包裹外部的组件。可以负责间距之类的。
 * @param params.inner 包裹内部的组件。可以负责底色之类的。
 * @param params.small_margin_enter 前面是否只空一小段。
 * @param params.small_margin_exit 后面是否只空一小段。
 * @param params.pre_element 要在开头注入的元素。
 * @param params.aft_element 要在结束后注入的元素。
 * @param params.pre_text 要在开头注入的文本。
 * @param params.aft_text 要在结束后注入的文本。
 * @param params.element_key 注入元素使用的子环境名。
 * @param params.text_key 注入文本使用的子环境名。
*/
function get_default_group_renderer({
    contexters =  [] , 
    outer =  undefined , 
    inner =  undefined ,
    small_margin_enter = false , 
    small_margin_exit = false ,  
    pre_element =  undefined , 
    aft_element =  undefined , 
    pre_text =  undefined , 
    aft_text =  undefined , 
    element_key =  "paragraph-element" , 
    text_key =  "paragraph-text" , 
}:{
    contexters?: PreprocessFunction<GroupNode , ContexterBase<GroupNode>>[]
    outer?: PrinterRenderFunction<GroupNode>
    inner?: PrinterRenderFunction<GroupNode>
    small_margin_enter?: boolean , 
    small_margin_exit?: boolean , 
    pre_element?: PreprocessFunction<GroupNode , React.ReactElement<PrinterRenderFunctionProps<GroupNode>> | undefined> | undefined
    aft_element?: PreprocessFunction<GroupNode , React.ReactElement<PrinterRenderFunctionProps<GroupNode>> | undefined> | undefined
    pre_text?: PreprocessFunction<GroupNode , string | undefined> | undefined
    aft_text?: PreprocessFunction<GroupNode , string | undefined> | undefined
    element_key?: string
    text_key?: string
}){
    let OUT = outer || get_default_outer<GroupNode>({small_margin: small_margin_enter})
    let INN = inner || ((props)=><React.Fragment>{props.children}</React.Fragment>)
    
    // 注意contexter是没有状态的，因此可以声明在外面。
    // 注意 xx && yy == xx == undefined ? undefined : yy
    let elmt_injecter = new InjectContexter<GroupNode , React.ReactElement<PrinterRenderFunctionProps<GroupNode>>>(
        element_key , {
            preinfo: (info)=>(pre_element && pre_element(info)), 
            aftinfo: (info)=>(aft_element && aft_element(info)), 
        }
    )
    let text_injecter = new InjectContexter<GroupNode , string>(
        text_key , {
            preinfo: (info)=>(pre_text && pre_text(info)) , 
            aftinfo: (info)=>(aft_text && aft_text(info)) , 
        }
    )

    // 把预先定义的两个注射器塞进contexter里面。
    // 注意因为Injecter和Consumer本身会使用当前的info来生成信息，所以这里不需要再传入当前info。
    contexters = [...contexters , ()=>elmt_injecter , ()=>text_injecter]

    return auto_renderer<GroupNode>({
        contexters: contexters , 
        render_function: (props: PrinterRenderFunctionProps<GroupNode>) => {
            let props_except_children = {
                node: props.node , 
                context: props.context , 
                parameters: props.parameters ,             
            }
            return <OUT {...props_except_children}>
                <INN {...props_except_children}>{props.children}</INN>
            </OUT>
        } , 
    })
}

/** 这个函数快速生产一个默认的结构节点的渲染器。 
 * 同时，这个函数会使用上下文工具，快捷地允许向段落的开头和结尾添加元素。
 * 
 * 结构节点和组节点最大的不同是，结构节点还会有每个子节点的包裹。
 * 
 * @param params.contexters 除了默认的注射器之外，额外添加的上下文工具。
 * @param params.outer 包裹外部的组件。可以负责间距之类的。
 * @param params.inner 包裹内部的组件。可以负责底色之类的。
 * @param params.subinner 包裹每个子级的组件。
 * @param params.small_margin_enter 前面是否只空一小段。
 * @param params.small_margin_exit 后面是否只空一小段。
 * @param params.pre_element 要在开头注入的元素。
 * @param params.aft_element 要在结束后注入的元素。
 * @param params.pre_text 要在开头注入的文本。
 * @param params.aft_text 要在结束后注入的文本。
 * @param params.element_key 注入元素使用的子环境名。
 * @param params.text_key 注入文本使用的子环境名。
*/
function get_default_structure_renderer({
    contexters =  [] , 
    outer =  undefined , 
    inner =  undefined ,
    subinner =  undefined ,
    small_margin_enter = false , 
    small_margin_exit = false ,  
    pre_element =  undefined , 
    aft_element =  undefined , 
    pre_text =  undefined , 
    aft_text =  undefined , 
    element_key =  "paragraph-element" , 
    text_key =  "paragraph-text" , 
}:{
    contexters?: PreprocessFunction<StructNode , ContexterBase<StructNode>>[]
    outer?: PrinterRenderFunction<StructNode>
    inner?: PrinterRenderFunction<StructNode>
    subinner?: (props: PrinterRenderFunctionProps<StructNode> & {subidx: number}) => React.ReactElement<PrinterRenderFunctionProps<StructNode> & {subidx: number}>
    small_margin_enter?: boolean , 
    small_margin_exit?: boolean , 
    pre_element?: PreprocessFunction<StructNode , React.ReactElement<PrinterRenderFunctionProps<StructNode>> | undefined> | undefined
    aft_element?: PreprocessFunction<StructNode , React.ReactElement<PrinterRenderFunctionProps<StructNode>> | undefined> | undefined
    pre_text?: PreprocessFunction<StructNode , string | undefined> | undefined
    aft_text?: PreprocessFunction<StructNode , string | undefined> | undefined
    element_key?: string
    text_key?: string
}){
    let OUT = outer || get_default_outer<StructNode>({small_margin: small_margin_enter})

    // 默认的内层包裹，提供一个Grid Container
    let INN = inner || ((props)=>{
        let num_children = props.node.children.length
        return <Grid container columns={num_children}>{props.children}</Grid>
    })

    // 默认的子级包裹，提供一个Grid Item来决策宽度。
    let SUBINN = subinner || ((props)=>{
        return <Grid item sx={{align: "center"}}>{props.children}</Grid>
    })
    
    // 注意contexter是没有状态的，因此可以声明在外面。
    // 注意 xx && yy == xx == undefined ? undefined : yy
    let elmt_injecter = new InjectContexter<StructNode , React.ReactElement<PrinterRenderFunctionProps<StructNode>>>(
        element_key , {
            preinfo: (info)=>(pre_element && pre_element(info)), 
            aftinfo: (info)=>(aft_element && aft_element(info)), 
        }
    )
    let text_injecter = new InjectContexter<StructNode , string>(
        text_key , {
            preinfo: (info)=>(pre_text && pre_text(info)) , 
            aftinfo: (info)=>(aft_text && aft_text(info)) , 
        }
    )

    // 把预先定义的两个注射器塞进contexter里面。
    // 注意因为Injecter和Consumer本身会使用当前的info来生成信息，所以这里不需要再传入当前info。
    contexters = [...contexters , ()=>elmt_injecter , ()=>text_injecter]

    return auto_renderer<StructNode>({
        contexters: contexters , 
        render_function: (props: PrinterRenderFunctionProps<StructNode>) => {
            let props_except_children = {
                node: props.node , 
                context: props.context , 
                parameters: props.parameters ,             
            }
            
            // props.children 是一个 React.Fragment，而他的children是一个array
            let children = props.children.props.children
            
            return <OUT {...props_except_children}>
                <INN {...props_except_children}><React.Fragment>{Object.keys(children).map((subidx)=>{
                    return <SUBINN
                        {...props_except_children}
                        subidx = {parseInt(subidx)}
                        key = {subidx}
                    >{children[subidx]}</SUBINN>
                })}</React.Fragment></INN>
            </OUT>
        } , 
    })
}


/** 这个函数生成一个默认的段落样式。 
 * 这个函数生成的段落会使用上下文工具来允许:
 * + 在段落开头添加一个元素；
 * + 在段落开头添加一个文本；
 * 注意，永远不在段落结尾添加元素，因为概念上段落的数量是不确定的。
 * 
 * @param params.element_key 在段落开头添加元素的键。
 * @param params.text_key 在段落开头添加文本的键。
 * @param params.contexters 其他上下文作用器。
*/
function get_default_paragraph_renderer({
    element_key = "paragraph-element" , 
    text_key = "paragraph-text" , 
    contexters = []
}: {
    element_key?: string
    text_key?: string
    contexters?: PreprocessFunction<ParagraphNode , ContexterBase<ParagraphNode>>[]
}){
    type RPROPS = PrinterRenderFunctionProps<ParagraphNode> // 只是让代码看起来不要太乱...

    // 注意contexter是没有状态的，因此可以声明在外面。
    let elmt_consumer = new ConsumerContexter<ParagraphNode , React.ReactElement<RPROPS>>(element_key)
    let text_consumer = new ConsumerContexter<ParagraphNode , string>(text_key)

    // 把预先定义的两个注射器塞进contexter里面。
    contexters = [...contexters , ()=>elmt_consumer , ()=>text_consumer]
    
    return auto_renderer<ParagraphNode>({
        contexters: contexters , 
        render_function: (props: RPROPS) => {
            let context = props.context
            let pre_elements = elmt_consumer.get_context(context)
            let pre_texts = text_consumer.get_context(context)

            return <PrinterParagraphBox>
                {Object.keys(pre_elements).map((eleid)=><React.Fragment key={eleid}>{pre_elements[eleid]}</React.Fragment>)}
                {Object.keys(pre_texts).map((eleid)=><span key={eleid}>{pre_texts[eleid]}</span>)}
                {props.children}
                <br/>
            </PrinterParagraphBox>
        } , 
    })
}


/** 这个renderer总之提供一个默认的毫无功能的块级节点渲染实现。 */
let useless_renderer_block = new PrinterRenderer({
    renderer(props: PrinterRenderFunctionProps):React.ReactElement<PrinterRenderFunctionProps>{
        let node = props.node as GroupNode
        return <div>{props.children}</div>
    }
})
