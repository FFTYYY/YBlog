import { Node } from "slate"
import React from "react"

import {
    Box , Link , Typography , Divider
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
    PrinterStructureBoxText  , 
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

    remtimes , 
} from "../../../../lib"
import type {
	PrinterRenderer , 
	GroupNode , 
    StructNode , 
    SupportNode , 
    InlineNode , 
	PrinterEnv , 
	PrinterContext , 
    PrinterRenderFunc_Props , 
} from "../../../../lib"

import { num2chinese } from "../utils"
import PerfectScrollbar from "perfect-scrollbar"
import { MathJaxInline , MathJaxBlock } from "../mathjax"

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
    normalwords_printer , 
    image_printer , 
    alignedwords_printer , 
    delete_printer , 
    link_printer , 
    list_printer , 
    mathinline_printer , 
    mathblock_printer , 
}

/** 『昭言』表示一段需要专门的、需要强调的话。如定理。 */
var brightwords_printer = (()=>{
    let orderer = (e: GroupNode) => new OrderEffector(`order/${e.parameters.title}` , `order/${e.parameters.title}`)

    let printer = get_DefaultBlockPrinter({
        extra_effectors: [orderer] , 
        inject_pre: (props: {element: GroupNode , context: PrinterContext}) => {
            let order = orderer(props.element).get_context(props.context)
            let my_order = num2chinese(order[order.length - 1])
			let title = props.element.parameters.title
			let alias = props.element.parameters.alias
            return <PrinterStructureBoxText inline>{title} {my_order}{alias ? ` (${alias})` : ""}</PrinterStructureBoxText>
        } , 
        outer: (props) => <PrinterPartBox subtitle_like>{props.children}</PrinterPartBox> , 
    })
	return printer
})()

/** 『常言』表示一般的一段话，但是可以有一些结构。 */
var normalwords_printer = (()=>{
    let orderer = (e: GroupNode) => new OrderEffector("order/normal" , "order/normal")

    let printer = get_DefaultBlockPrinter({
        extra_effectors: [orderer] , 
        inject_pre: (props: {element: GroupNode , context: PrinterContext}) => {
            let order = orderer(props.element).get_context(props.context)
			let use_order = props.element.parameters.order
			let starting = props.element.parameters.starting
            return <PrinterStructureBoxText inline>{use_order ? `[${order}] ` : ""}{starting}</PrinterStructureBoxText>
        } , 

        inject_suf: (props: {element: GroupNode , context: PrinterContext}) => {
			let ending = props.element.parameters.ending
            return <PrinterStructureBoxText inline leftmargin>{ending}</PrinterStructureBoxText>
        } , 
        outer: (props) => <PrinterPartBox>{props.children}</PrinterPartBox> , 
    })
	return printer
})()


/** 『随言』表示附属性质的话。比如注释、证明。 */
var followwords_printer = (()=>{
    return get_DefaultBlockPrinter({
		inner: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
            let enter = props.element.parameters.enter
            let exit = props.element.parameters.exit
			return <AutoStack force_direction="column">
                {enter ? <PrinterStructureBoxText>{enter}</PrinterStructureBoxText> : <></>}
                <PrinterNewLevelBox><PrinterWeakenText>{props.children}</PrinterWeakenText></PrinterNewLevelBox>
                {exit  ? <PrinterStructureBoxText>{exit   }</PrinterStructureBoxText> : <></>}
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
				{enter ? <PrinterStructureBoxText>{enter}</PrinterStructureBoxText> : <></>}
				<PrinterDisplayText align="center">{props.children}</PrinterDisplayText>
				{exit ? <PrinterStructureBoxText align="right">{exit}</PrinterStructureBoxText> : <></>}
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
    let orderer = new OrderEffector(`order/section` , `order/section`)

    return {
        render_func: (props: PrinterRenderFunc_Props) => {
            let order = orderer.get_context(props.context)
            let element = props.element as GroupNode
            let title = element.parameters.title
            return <Divider>
                <PrinterStructureBoxText inline>第{num2chinese(order)}节</PrinterStructureBoxText>
                <PrinterStructureBoxText inline sx={{marginRight: 0}}>{title}</PrinterStructureBoxText>
            </Divider>
        } , 
        enter_effect: (element: SupportNode, env: PrinterEnv): [PrinterEnv,PrinterContext] => {    
            let ret: [PrinterEnv , PrinterContext] = [ env , {} ]
            ret = orderer.enter_fuse(element , ret[0] , ret[1])
            return ret
        } , 
        exit_effect: (element: SupportNode, env: PrinterEnv , context: PrinterContext):[PrinterEnv,PrinterContext] => {    
            let ret: [PrinterEnv , PrinterContext] = [ env , context ]
            ret = orderer.exit_fuse(element , ret[0] , ret[1])
            return ret
        } , 
    
    }
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
    return get_DefaultInlinePrinter<InlineNode>({
        outer: (props: {element: InlineNode , context: PrinterContext, children: any}) => {
			return <strong>{props.children}</strong>
		}
    })
})()

/** 一个空白的`Printer`。 */
var space_printer = (()=>{
    return make_print_renderer(
        (props)=> <></>
    )
})()

var image_printer = (()=>{
    return get_DefaultInlinePrinter<SupportNode>({
		outer: (props: {element: SupportNode , context: PrinterContext, children: any}) => {
			let p = props.element.parameters as {url: string , width: number , height: number}
			let width = p.width > 0 ? `${p.width}rem` : "100%"
			let height = p.height > 0 ? `${p.height}rem` : "100%"
			// TODO 这玩意儿每次编辑都会重新加载，有点蛋疼....
			return <img src={p.url} style={{
				width: width, 
				height: height , 
			}}/>
		} , 
	})
})()


var alignedwords_printer = (()=>{
    return get_DefaultStructPrinter({
        small_margin_enter: true ,  // 将其作为类似于段落的对象，不要前后空一大坨。
        small_margin_exit: true , 
		get_widths: (element: StructNode) => (element.parameters.widths as string).split(",").map(x=>x=="" ? 1 : parseInt(x))
	})
})()

var delete_printer = (()=>{
    return get_DefaultInlinePrinter<InlineNode>({
		outer: (props: {element: InlineNode , context: PrinterContext, children: any}) => {
			return <del>{props.children}</del>
		}
	})
})()

var mathinline_printer = (()=>{

      
    return get_DefaultInlinePrinter<InlineNode>({
		outer: (props: {element: InlineNode , context: PrinterContext, children: any}) => {
            /** 这是一个比较蛋疼的写法，取消原来的children并直接将element序列化。
             * 这里的问题在于，如果直接写成${props.children}$，则printer里为了定位元素所添加的空白<span>会阻碍mathjax的处理。
             */
			return <MathJaxInline>{Node.string(props.element)}</MathJaxInline>
		}
	})
})()

var mathblock_printer = (()=>{
    return get_DefaultBlockPrinter({
		inner: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
            let value = Node.string(props.element)
            let exit = props.element.parameters.exit || ""
            let environ = props.element.parameters.environ
            let environ_enter = environ ? `\\begin{${environ}}` : ""
            let environ_exit  = environ ? `\\end{${environ}}`   : ""

            value = `${environ_enter}${value}\\text{${exit}}${environ_exit}`

            // TODO anchor 的滚动动作会被mathjax刷新给打断。
			return <React.Fragment>
                {props.context.anchor}
                <MathJaxBlock>{value}</MathJaxBlock>
            </React.Fragment>
		} , 
	})
})()

var link_printer = (()=>{
    return get_DefaultInlinePrinter<InlineNode>({
		outer: (props: {element: InlineNode , context: PrinterContext, children: any}) => {
			let taridx = props.element.parameters.targetidx as string
			let tarurl = props.element.parameters.targeturl as string

            // 如果是跳转到外部链接。
            if(tarurl){
                return <Link href={tarurl}>{props.children}</Link>
            }

            // 如果是跳转到本文内。
			return <GlobalInfo.Consumer>{value => {
				// TODO 似乎可以用react-router
				return <Link 
                    component = "button" 
                    onClick = {e=>value.printer_component.scroll_to(idx2path( value.root , taridx ))}
                >
                    <Typography>{props.children}</Typography>
                </Link>
			}}</GlobalInfo.Consumer>
		}
	})
})()


var list_printer = (()=>{
    let orderer = (e: GroupNode) => new OrderEffector<GroupNode>(
        `order/${e.parameters.label}` , 
        `order/${e.parameters.label}` , 
        (e) => e.relation == "separating"
    )
	return get_DefaultBlockPrinter<GroupNode>({
        small_margin_enter: true , //前面不要空一坨
		extra_effectors: [orderer] , 
		inner: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
			let order = orderer(props.element).get_context(props.context)
			return <React.Fragment><AutoStack force_direction="row">
                {/* 套一层`PrinterParagraphBox`，是为了获得正确的间距。 */}
				<PrinterOldLevelBox><PrinterParagraphBox>{num2chinese(order)}</PrinterParagraphBox></PrinterOldLevelBox>
				<Box>{props.children}</Box>
			</AutoStack></React.Fragment>
		} , 
	})
})()

var paragraph_printer 	= get_DefaultParagraphPrinter()