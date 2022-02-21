import React from "react"

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


import { Node } from "slate"
import type  { PrinterRenderFunc_Props } from "../../printer"
import { GroupNode , StyledNode} from "../../core/elements"
import type { PrinterRenderer } from "../../printer"
import { OrderEffector , InjectEffector , ConsumeEffector , BasicEffector} from "./effecter"
import type { ValidParameter , StructNode } from "../../core/elements"
import type { PrinterEnv , PrinterContext } from "../../printer"
import { AutoStack } from "../basic"
import type {InjectFunction} from "./effecter"
import { 
    PrinterPartBox , 
} from "./basic/components"

export { get_DefaultBlockPrinter , get_DefaultStructPrinter }

/**
 * 这个函数生产一个默认的块级组件的输出渲染器。
 * @param extra_effectors 额外的前作用器。 
 * @param inject_pre 要在渲染前注入的东西（行内元素）。 
 * @param inject_suf 要在渲染后注入的东西（行内元素）。 
 * @param outer      大的框框，用来设置上下间距等样式。 
 * @param inner     内部的框框，用来处理内部内容的间距、字体等。 
 * @returns 一个输出渲染器。
 */
function get_DefaultBlockPrinter<NodeType extends StyledNode>({ 
	extra_effectors = [] , 
	inject_pre = (props)=><></>, 
	inject_suf = (props)=><></>, 
    outer = (props)=><PrinterPartBox>{props.children}</PrinterPartBox> , 
    inner = (props)=><>{props.children}</>, 
}:{
	extra_effectors?: BasicEffector[] ,
	inject_pre?: (props: {element: NodeType, context: PrinterContext}) => any
	inject_suf?: (props: {element: NodeType, context: PrinterContext}) => any
	outer     ?: (props: {element: NodeType, context: PrinterContext, children: any}) => any
    inner?: (props: {element: NodeType, context: PrinterContext, children: any}) => any
}){
    let OUT = outer
    let INN = inner
    let inject_effector = new InjectEffector<NodeType>("global-injector" , "global-injector" , inject_pre , inject_suf)

    return {
        render_func: (props: PrinterRenderFunc_Props) => {
            let element = props.element as NodeType 

            return <OUT element={element} context={props.context}>
                <INN element={element} context={props.context}>{props.children}</INN>
            </OUT>
        } , 
        enter_effect: (element: NodeType, env: PrinterEnv): [PrinterEnv,PrinterContext] => {    
            let ret: [PrinterEnv , PrinterContext] = [ env , {} ]
            
            // 应用额外的前作用器。
            for(let extra_eff of extra_effectors){
                ret = extra_eff.enter_fuse(element , ret[0] , ret[1])
            }
            // 注入前作用。
            ret = inject_effector.enter_fuse(element , ret[0] , ret[1])
    
            return ret
        } , 
        exit_effect: (element: NodeType, env: PrinterEnv , context: PrinterContext):[PrinterEnv,PrinterContext] => {    
            let ret: [PrinterEnv , PrinterContext] = [ env , context ]
    
            for(let extra_eff of extra_effectors){
                ret = extra_eff.exit_fuse(element , ret[0] , ret[1])
            }
            ret = inject_effector.exit_fuse(element , ret[0] , ret[1])
    
            return ret
        } , 
    }
}

/**
 * 这个函数生产一个默认的块级组件的输出渲染器。
 * @param extra_effectors 额外的前作用器。 
 * @param inject_pre 要在渲染前注入的东西（行内元素）。 
 * @param inject_suf 要在渲染后注入的东西（行内元素）。 
 * @param outer      大的框框，用来设置上下间距等样式。 
 * @param inner     内部的框框，用来处理内部内容的间距、字体等。 
 * @returns 一个输出渲染器。
 */
 function get_DefaultStructPrinter({ 
    get_widths = (e)=>[] ,
	extra_effectors = [] , 
	inject_pre = (props)=><></>, 
	inject_suf = (props)=><></>, 
    outer = (props)=><PrinterPartBox>{props.children}</PrinterPartBox> , 
    inner = (props)=><>{props.children}</>, 
}:{
    get_widths?: ((element:StructNode)=>number[]) , 
	extra_effectors?: BasicEffector[] ,
	inject_pre?: (props: {element: StructNode, context: PrinterContext}) => any
	inject_suf?: (props: {element: StructNode, context: PrinterContext}) => any
	outer     ?: (props: {element: StructNode, context: PrinterContext, children: any}) => any
    inner?: (props: {element: StructNode, context: PrinterContext, children: any}) => any
}){
    let OUT = outer
    let INN = inner
    let inject_effector = new InjectEffector<StructNode>("global-injector" , "global-injector" , inject_pre , inject_suf)

    return {
        render_func: (props: PrinterRenderFunc_Props) => {
            let element = props.element as StructNode 
            let children = props.children
            
            /** 获得元素的相对长度。 */
            let widths = get_widths(element)
            widths = widths.splice(0,children.length) // 确保为widths元素不少
            while(widths.length < children.length) // 确保widths元素不多
                widths.push(1)
            let sum = widths.reduce( (s,x)=>s+x , 0 ) // 求所有元素的和。

            
            return <OUT element={element} context={props.context}><Grid container columns={sum}>
                    {widths.map((width,idx)=>{
                        return <Grid key={idx} item xs={width} sx={{align: "center"}}>
                            <INN element={element} context={props.context}>
                                {props.children[idx]}
                            </INN>
                        </Grid>
                    })}
            </Grid></OUT>
        } , 
        enter_effect: (element: StructNode, env: PrinterEnv): [PrinterEnv,PrinterContext] => {    
            let ret: [PrinterEnv , PrinterContext] = [ env , {} ]
            
            // 应用额外的前作用器。
            for(let extra_eff of extra_effectors){
                ret = extra_eff.enter_fuse(element , ret[0] , ret[1])
            }
            // 注入前作用。
            ret = inject_effector.enter_fuse(element , ret[0] , ret[1])
    
            return ret
        } , 
        exit_effect: (element: StructNode, env: PrinterEnv , context: PrinterContext):[PrinterEnv,PrinterContext] => {    
            let ret: [PrinterEnv , PrinterContext] = [ env , context ]
    
            for(let extra_eff of extra_effectors){
                ret = extra_eff.exit_fuse(element , ret[0] , ret[1])
            }
            ret = inject_effector.exit_fuse(element , ret[0] , ret[1])
    
            return ret
        } , 
    }
}

