import React from "react"

import {
    Typography , 
    Box , 
    Paper , 
} from "@mui/material"
import type {
    TypographyProps , 
    PaperProps , 
    BoxProps , 
} from "@mui/material"


import { Node } from "slate"
import type  { PrinterRenderFunc_Props } from "../../printer"
import { GroupNode} from "../../core/elements"
import type { PrinterRenderer } from "../../printer"
import { OrderEffector , InjectEffector , ConsumeEffector , BasicEffector} from "./effecter"
import type { ValidParameter } from "../../core/elements"
import type { PrinterEnv , PrinterContext } from "../../printer"
import { AutoStack } from "../basic"
import type {InjectFunction} from "./effecter"
import { 
    PrinterParagraphBox , 
} from "./basic/components"

export { get_DefaultParagraphPrinter , get_DefaultInlinePrinter }

function get_DefaultParagraphPrinter(){ 

    // 需要额外渲染的元素。
    let consumer_effector = new ConsumeEffector("global-injector" , "global-injector")

    return {
        render_func: (props: PrinterRenderFunc_Props) => {

            let extra =  consumer_effector.get_context(props.context) // 需要额外插入的元素。

            return <PrinterParagraphBox>
                {Object.keys(extra).map((key)=><React.Fragment key={key}>{extra[key]}</React.Fragment>)}
                {props.children}
                <br/>
            </PrinterParagraphBox>
        } , 
        enter_effect: (element: Node, env: PrinterEnv): [PrinterEnv,PrinterContext] => {  
            let ret: [PrinterEnv , PrinterContext] = [ env , {} ]
            
            ret = consumer_effector.enter_fuse(element , ret[0] , ret[1])
    
            return ret
        } , 
        exit_effect: (element: Node, env: PrinterEnv , context: PrinterContext):[PrinterEnv,PrinterContext] => {    
            let ret: [PrinterEnv , PrinterContext] = [ env , context ]
    
            ret = consumer_effector.exit_fuse(element , ret[0] , ret[1])
    
            return ret
        } , 
    }
}

function get_DefaultInlinePrinter<NodeType extends Node>({
    extra_effectors = [] , 
    outer = (props)=><span>{props.children}</span> , 
}:{
	extra_effectors?: BasicEffector[] ,
	outer     ?: (props: {element: NodeType, context: PrinterContext, children: any}) => any
}){ 

    let OUT = outer

    return {
        render_func: (props: PrinterRenderFunc_Props) => {
            let element = props.element as NodeType 

            return <OUT element={element} context={props.context}>{props.children}</OUT>
        } , 
        enter_effect: (element: NodeType, env: PrinterEnv): [PrinterEnv,PrinterContext] => {    
            let ret: [PrinterEnv , PrinterContext] = [ env , {} ]
            
            // 应用额外的前作用器。
            for(let extra_eff of extra_effectors){
                ret = extra_eff.enter_fuse(element , ret[0] , ret[1])
            }
    
            return ret
        } , 
        exit_effect: (element: NodeType, env: PrinterEnv , context: PrinterContext):[PrinterEnv,PrinterContext] => {    
            let ret: [PrinterEnv , PrinterContext] = [ env , context ]
    
            for(let extra_eff of extra_effectors){
                ret = extra_eff.exit_fuse(element , ret[0] , ret[1])
            }
    
            return ret
        } , 
    }
}