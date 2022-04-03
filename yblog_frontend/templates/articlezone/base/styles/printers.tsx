import { Node } from "slate"
import React, { useEffect } from "react"

import {
	Box , Link , Typography , Divider
} from "@mui/material"

import {
	EditorCore , 
	
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
	idx2node , 

	remtimes , 
	get_param_val ,
	is_styled , 
	has_children , 
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
import { Interaction , url_from_root , urls } from "../interaction"

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
	subwords_printer , 
	mathinline_printer , 
	mathblock_printer , 
	formatted_printer , 
	subsection_printer , 
}

/** 根据给定的编号和编号格式，生成编号字符串。 */
function make_oerder_str(order: number , ordering: string){
	if(ordering == "chinese"){
		return num2chinese(order)
	}
	if(ordering == "arab"){
		return `${order}`
	}
	if(ordering == "arab-circle"){
		if(order > 0 && order <= 20){
			let m = ["①","②","③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮", "⑯", "⑰", "⑱","⑲", "⑳"]
			return m[order-1]
		}
		return `(${order})`
	}
	if(ordering == "chinese-bracket"){
		return `【${num2chinese(order)}】`
	}
	if(ordering == "number-bracket"){
		return `[${order}]`
	}
	return ""
}

/** 『次节』表示小节内的一个小小节。 */
var subsection_printer = (()=>{
	let printer = get_DefaultBlockPrinter({
		outer: (props) => {
			let title = get_param_val(props.element , "title")
			return <PrinterPartBox>
			<PrinterPartBox subtitle_like>{title}</PrinterPartBox>
			{props.children}
		</PrinterPartBox>
		} , 
	})
	return printer
})()


/** 『昭言』表示一段需要专门的、需要强调的话。如定理。 */
var brightwords_printer = (()=>{
	let orderer = (e: GroupNode) => new OrderEffector(`order/${get_param_val(e,"title")}` , `order/${get_param_val(e,"title")}`)

	let printer = get_DefaultBlockPrinter({
		extra_effectors: [orderer] , 
		inject_pre: (props: {element: GroupNode , context: PrinterContext}) => {
			let orders = orderer(props.element).get_context(props.context)
			let order = orders[orders.length-1]

			let title = get_param_val(props.element,"title")  // 标题
			let alias = get_param_val(props.element,"prefix") // 前缀
			let order_str = make_oerder_str(order , get_param_val(props.element,"ordering") as string)

			let inject_content = `${title}`
			if(order_str){
				inject_content = inject_content + ` ${order_str}`
			}
			if(alias){
				inject_content = inject_content + ` （${alias}）`
			}
			
			return <PrinterStructureBoxText inline>{inject_content}</PrinterStructureBoxText>
		} , 
		outer: (props) => {
			return <PrinterPartBox subtitle_like>{props.children}</PrinterPartBox>
		} , 
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
			let prefix = get_param_val(props.element , "prefix") // 前缀
			let order_str = make_oerder_str(order , get_param_val(props.element,"ordering") as string)

			let inject_content = ""
			if(order_str){
				inject_content = inject_content + `${order_str} `
			}
			if(prefix){
				inject_content = inject_content + prefix
			}

			return <PrinterStructureBoxText inline>{inject_content}</PrinterStructureBoxText>
		} , 

		inject_suf: (props: {element: GroupNode , context: PrinterContext}) => {
			let suffix = get_param_val(props.element , "suffix") // 后缀
			return <PrinterStructureBoxText inline leftmargin>{suffix}</PrinterStructureBoxText>
		} , 
		outer: (props) => <PrinterPartBox>{props.children}</PrinterPartBox> , 
	})
	return printer
})()


/** 『随言』表示附属性质的话。比如注释、证明。 */
var followwords_printer = (()=>{
	return get_DefaultBlockPrinter({
		inner: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
			let title = get_param_val(props.element , "title") // 标题
			let close = get_param_val(props.element , "close") // 结尾
			return <AutoStack force_direction="column">
				{title ? <PrinterStructureBoxText>{title}</PrinterStructureBoxText> : <></>}
				<PrinterNewLevelBox><PrinterWeakenText>{props.children}</PrinterWeakenText></PrinterNewLevelBox>
				{close ? <PrinterStructureBoxText>{close}</PrinterStructureBoxText> : <></>}
			</AutoStack>
		} , 
	})
})()

/** 『裱示』表示一段正式的展示。如引用一首诗。 */
var mount_printer = (()=>{
	return get_DefaultBlockPrinter({
		inner: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
			let title = get_param_val(props.element , "title") // 标题
			let close = get_param_val(props.element , "close") // 结尾
			return <AutoStack force_direction="column">
				{title ? <PrinterStructureBoxText>{title}</PrinterStructureBoxText> : <></>}
				<PrinterDisplayText align="center">{props.children}</PrinterDisplayText>
				{close ? <PrinterStructureBoxText align="right">{close}</PrinterStructureBoxText> : <></>}
			</AutoStack>
		} , 
	})
})()

/** 『格示』展示一段有固定格式的文本，比如代码。 */
var formatted_printer = (()=>{
	return get_DefaultBlockPrinter({
		inner: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
			return <pre>{props.children}</pre>
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
			let title = get_param_val(element , "title")
			let alone = get_param_val(element , "alone")

			// 如果是`alone`的就不显示序号惹。
			let order_word = alone ? <></> : <PrinterStructureBoxText inline>第{num2chinese(order)}节</PrinterStructureBoxText>
			let title_word = title ? <PrinterStructureBoxText inline sx={{marginRight: 0}}>{title}</PrinterStructureBoxText> : <></>
			return <Divider>{order_word}{title_word}</Divider>
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


var alignedwords_printer = (()=>{
	return get_DefaultStructPrinter({
		small_margin_enter: true ,  // 将其作为类似于段落的对象，不要前后空一大坨。
		small_margin_exit : true , 
		get_widths: (element: StructNode) => (get_param_val(element , "widths") as string).split(",").map(x=>x=="" ? 1 : parseInt(x))
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
			return <Box component="span" sx={{paddingX: "0.1rem"}}>
				<MathJaxInline>{Node.string(props.element)}</MathJaxInline>
			</Box>
		}
	})
})()

var mathblock_printer = (()=>{
	return get_DefaultBlockPrinter({
		inner: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
			let value 	= Node.string(props.element)
			let suffix 	= get_param_val(props.element , "suffix")
			let close 	= get_param_val(props.element , "close")
			let environ = get_param_val(props.element , "environ")
			let environ_enter = environ ? `\\begin{${environ}}` : ""
			let environ_exit  = environ ? `\\end{${environ}}`   : ""

			value = `${environ_enter}${value}\\text{${suffix}}${environ_exit}`
			
			return <React.Fragment>
				{props.context.anchor}
				<MathJaxBlock>{value}</MathJaxBlock>
				{close}
			</React.Fragment>
		} , 
	})
})()

var image_printer = (()=>{
	return get_DefaultInlinePrinter<SupportNode>({
		outer: (props: {element: SupportNode , context: PrinterContext, children: any}) => {
			let type = get_param_val(props.element , "type") as string
			let target = get_param_val(props.element , "target") as string
			let [ url , set_url ] = React.useState("")

			React.useEffect(()=>{(async ()=>{
				if(type == "internal"){
					let resource_info = await Interaction.get.resource_info(target)
					if(!resource_info.url){
						set_url("")
					}
					else{
						set_url(url_from_root(resource_info.url))
					}
					// 其实直接`set_url(resource_info.url)`也行，套一层`url_from_root`主要是为了调试方便。
				}
				else{
					set_url(target)
				}
			})()} , [props.element])
	
			let p_width = get_param_val(props.element , "width")
			let p_height = get_param_val(props.element , "height")

			return <img src = {url || undefined} style = {{
				width: p_width > 0 ? `${p_width}rem` : "100%", 
				height: p_height > 0 ? `${p_height}rem` : "100%" , 
			}}/>
		} , 
	})
})()



var link_printer = (()=>{
	return get_DefaultInlinePrinter<InlineNode>({
		outer: (props: {element: InlineNode , context: PrinterContext, children: any}) => {

			let target = get_param_val(props.element , "target") as string
			let type = get_param_val(props.element , "type") as string
			let autotext = get_param_val(props.element , "autotext") as boolean

			if(type == "index"){// 如果是跳转到本文内。
				let taridx = Number(target)
			
				return <GlobalInfo.Consumer>{value => {
					let root = value.root
					let tar_path = idx2path( root , taridx )

					let children = props.children
					if(autotext){ // 自动决定参数
						let tar_node = idx2node( root , taridx )
						if(tar_node && is_styled(tar_node) && get_param_val(tar_node , "label") != undefined){
							let label = get_param_val(tar_node , "label")
							children = `此 ${label}`
						}
					}

					return <Link 
						component = "button" 
						onClick = {e=>{value.printer_component.scroll_to(tar_path)}}
					>
						<Typography>{children}</Typography>
					</Link>
				}}</GlobalInfo.Consumer>
			}
			if(type == "http"){// 如果是跳转到外部链接。
				let children = props.children
				if(autotext){
					children = "此 页面"
				}
				return <Link href={target}>{children}</Link>
			}
			if(type == "outer-index"){ // 如果是跳转到另一个文章中的元素。
				let [_tar_page , _tar_idx] = target.split(":")
				let [ tar_page ,  tar_idx] = [ Number(_tar_page)  , Number(_tar_idx) ]

				let [ root , set_root ] = React.useState<Node | undefined>(undefined)
				useEffect(()=>{
					Interaction.get.content(tar_page).then(data=>{set_root(data)})
				} , []) // 传入空依赖确保这个函数只被调用一次。

				if(root == undefined){
					return <></>
				}

				let children = props.children
				if(autotext){ // 自动决定参数
					let tar_node = idx2node( root , tar_idx )
					if(tar_node && is_styled(tar_node) && get_param_val(tar_node , "label") != undefined){
						let label = get_param_val(tar_node , "label")
						children = `此 ${label}`
					}
				}

				// TODO 加上编号。
				return <Link href={urls.view.content(tar_page , {linkto: tar_idx})}>{children}</Link>
			}


		}
	})
})()

var subwords_printer = (()=>{
	let orderer = (e: GroupNode) => new OrderEffector<GroupNode>(
		`order/${get_param_val(e , "label")}` , 
		`order/${get_param_val(e , "label")}` , 
		(e) => e.relation == "separating"
	)
	return get_DefaultBlockPrinter<GroupNode>({
		small_margin_enter: true , //前面不要空一坨
		extra_effectors: [orderer] , 
		inner: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
			let order = orderer(props.element).get_context(props.context)
			let order_str = make_oerder_str(order , get_param_val(props.element , "ordering") as string)

			return <React.Fragment><AutoStack force_direction="row">
				{/* 套一层`PrinterParagraphBox`，是为了获得正确的间距。 */}
				<PrinterOldLevelBox>
					{order_str ? <PrinterParagraphBox>{order_str}</PrinterParagraphBox> : <></>}
				</PrinterOldLevelBox>
				<Box>{props.children}</Box>
			</AutoStack></React.Fragment>
		} , 
	})
})()

var paragraph_printer 	= get_DefaultParagraphPrinter()
