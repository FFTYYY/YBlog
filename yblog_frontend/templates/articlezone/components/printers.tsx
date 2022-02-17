import { Node } from "slate"
import React from "react"

import {
    Box
} from "@mui/material"

import {
	EditorCore , 
	Printer , 
	
	GroupStyle , 
	AbstractStyle , 
	SupportStyle ,
	InlineStyle , 

	get_DefaultListPrinter , 
	get_DefaultGroupPrinter , 
	get_DefaultParagraphPrinter , 

	OrderEffector , 

	PrinterInlineTitle , 
	NewLevel , 
	AutoStack , 
	OldLevel , 
	PrinterParagraph , 

    make_print_renderer , 
} from "../../../lib"
import type {
	PrinterRenderer , 
	GroupNode , 
	PrinterEnv , 
	PrinterContext , 
    PrinterRenderFunc_Props , 
} 
from "../../../lib"

import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

export {
    brightwords_printer , 
    followwords_printer , 
    mount_printer , 
    display_printer , 
    sectioner_printer , 
    ender_printer , 
    strong_printer , 
    space_printer , 
}

/** 『昭言』表示一段需要专门的、需要强调的话。如定理。 */
var brightwords_printer = (()=>{
    let orderer = new OrderEffector("order/theorem" , "order/theorem")

    let printer = get_DefaultGroupPrinter({
        extra_effectors: [orderer] , 
        inject_pre: (props: {element: GroupNode , context: PrinterContext}) => {
            let order = orderer.get_context(props.context)
			let title = props.element.parameters.title
			let alias = props.element.parameters.alias
            if(alias)
                return <PrinterInlineTitle>{title} {order} ({alias})</PrinterInlineTitle>
            return <PrinterInlineTitle>{title} {order}</PrinterInlineTitle>
        }}
    )
	return printer
})()

/** 『随言』表示附属性质的话。比如注释、证明。 */
var followwords_printer = (()=>{
    return get_DefaultGroupPrinter({
		surrounder: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
            let beginning = props.element.parameters.beginning
            let ending = props.element.parameters.ending
			return <React.Fragment><AutoStack force_direction="column">
					{beginning ? <Box>{beginning}</Box> : <></>}
					<NewLevel>{props.children}</NewLevel>
					{ending    ? <Box>{ending   }</Box> : <></>}
				</AutoStack></React.Fragment>
		} , 
	})
})()

/** 『裱示』表示一段正式的展示。如引用一首诗。 */
var mount_printer = (()=>{
    return get_DefaultGroupPrinter({
		surrounder: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
			let extra = props.element.parameters.extra
			return <React.Fragment><AutoStack force_direction="column">
					<NewLevel>{props.children}</NewLevel>
					{extra    ? <Box>{extra   }</Box> : <></>}
				</AutoStack></React.Fragment>
		} , 
	})
})()

/** 『彰示』 表示展示一个完整的部分的片段，以供剖析。如引用一首诗中的一句。 */
var display_printer = (()=>{
    return get_DefaultGroupPrinter({
		surrounder: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
			return <React.Fragment><AutoStack force_direction="column">
					<strong><NewLevel>{props.children}</NewLevel></strong>
				</AutoStack></React.Fragment>
		} , 
	})
})()

/** 小节线。 */
var sectioner_printer = (()=>{
    return make_print_renderer(
        (props: PrinterRenderFunc_Props) => {
            let element = props.element as GroupNode
            let title = element.parameters.title
            return <Divider>{title}</Divider>
        }
    )
})()

/** 章节线。 */
var ender_printer = (()=>{
    return make_print_renderer(
        (props: PrinterRenderFunc_Props) => {
            let element = props.element as GroupNode
            return <Divider></Divider>
        }
    )
})()

/** 强调。 */
var strong_printer = (()=>{
    return make_print_renderer(
        (props: PrinterRenderFunc_Props) => {
            return <strong>{props.children}</strong>
        }
    )
})()

/** 一个空白的`Printer`。 */
var space_printer = (()=>{
    return make_print_renderer(
        (props)=> <></>
    )
})()