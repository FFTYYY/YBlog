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

	get_DefaultBlockPrinter , 
	get_DefaultParagraphPrinter , 
	get_DefaultInlinePrinter , 
	
	OrderEffector , 
	
    PrinterDivider , 
    PrinterWeakenText , 
    PrinterDisplayText , 
    PrinterTitleBoxText  , 
    PrinterParagraphBox , 
    PrinterPartBox , 
    PrinterNewLevelBox , 
    PrinterOldLevelBox , 
    PrinterBackgroundPaper , 
	get_DefaultStructPrinter , 

	AutoStack , 
	make_print_renderer, 

	GlobalInfo , 
	idx2path , 
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
	paragraph_printer , 
}

/** 将`xxxrem`形式的字符串转换成数字。 */
function rem2num(rem:string){
	return parseInt( rem.slice(0,rem.length-3) )
}

/** 将数字转换成`"xxxrem"`形式的字符串。 */
function num2rem(num: number){
	return `${num}rem`
}

/** 将`xxxrem`形式的字符串乘以数字。 */
function remtimes(rem:string , num: number){
	return  num2rem( Math.floor(rem2num(rem) * num) )
}

/** 『昭言』表示一段需要专门的、需要强调的话。如定理。 */
var brightwords_printer = (()=>{
    let orderer = new OrderEffector("order/theorem" , "order/theorem")

    let printer = get_DefaultBlockPrinter({
        extra_effectors: [orderer] , 
        inject_pre: (props: {element: GroupNode , context: PrinterContext}) => {
            let order = orderer.get_context(props.context)
			let title = props.element.parameters.title
			let alias = props.element.parameters.alias
            return <PrinterTitleBoxText inline>{title} {order}{alias ? ` (${alias})` : ""}</PrinterTitleBoxText>
        }}
    )
	return printer
})()

/** 『随言』表示附属性质的话。比如注释、证明。 */
var followwords_printer = (()=>{
    return get_DefaultBlockPrinter({
		inner: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
            let enter = props.element.parameters.enter
            let exit = props.element.parameters.exit
			return <AutoStack force_direction="column">
                {enter ? <PrinterTitleBoxText>{enter}</PrinterTitleBoxText> : <></>}
                <PrinterNewLevelBox><PrinterWeakenText>{props.children}</PrinterWeakenText></PrinterNewLevelBox>
                {exit  ? <PrinterTitleBoxText>{exit   }</PrinterTitleBoxText> : <></>}
            </AutoStack>
		} , 
	})
})()

/** 『裱示』表示一段正式的展示。如引用一首诗。 */
var mount_printer = (()=>{
    return get_DefaultBlockPrinter({
		inner: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
			let enter  = props.element.parameters.enter
			let exit = props.element.parameters.exit			
			return <AutoStack force_direction="column">
				{enter ? <PrinterTitleBoxText>{enter}</PrinterTitleBoxText> : <></>}
				<PrinterDisplayText align="center">{props.children}</PrinterDisplayText>
				{exit ? <PrinterTitleBoxText align="right">{exit}</PrinterTitleBoxText> : <></>}
			</AutoStack>
		} , 
	})
})()

/** 『彰示』 表示展示一个完整的部分的片段，以供剖析。如引用一首诗中的一句。 */
var display_printer = (()=>{
    return get_DefaultBlockPrinter({
		inner: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
			return <AutoStack force_direction="column">
				<PrinterDisplayText sx={{
					fontSize: (theme)=>remtimes(theme.printer.typography.structure.fontSize , 2) //字号翻倍
				}}>{props.children}</PrinterDisplayText>
			</AutoStack>
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


var paragraph_printer 	= get_DefaultParagraphPrinter()