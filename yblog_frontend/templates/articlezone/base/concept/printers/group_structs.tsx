import React, { useEffect } from "react"
import ReactDom from "react-dom"

import {
	Box , Link , Typography , Divider , Grid
} from "@mui/material"

import {
    Node , 
	TextNode , 

	get_default_group_renderer , 
    get_default_paragraph_renderer , 
    get_default_inline_renderer , 

    ContexterBase , 
    OrderContexter , 
    InjectContexter , 
    ConsumerContexter , 

	PreprocessFunction , 
	PreprocessInformation , 

	auto_renderer , 
	
	PrinterDivider , 
	PrinterWeakenText , 
	PrinterDisplayText , 
	PrinterStructureBoxText  , 
	PrinterParagraphBox , 
	PrinterPartBox , 
	PrinterNewLevelBox , 
	PrinterOldLevelBox , 
	PrinterBackgroundPaper , 
	
	AutoStack , 

	GlobalInfo , 
	GlobalInfoProvider, 
	AutoTooltip, 
	ProcessedParameterList , 
	get_default_structure_renderer , 

	ReferenceContexter , 
	PrinterComponent , 

    PrinterRenderer , 
	GroupNode , 
	StructNode , 
	SupportNode , 
	InlineNode , 
	Env  , 
	Context  , 
    PrinterRenderFunctionProps, 
    PrinterRenderFunction , 
	DefaultAbstractRendererAsProperty , 
} from "../../../../../ytext"

import {
	url_from_root , Interaction , urls , 
} from "../../interaction"

import {
	make_oerder_str , 
	node2string , 
	cut_str , 
} from "./utils"

import {
	remtimes , 
} from "../../utils"

import {
	MathJaxInline , 
	MathJaxBlock , 
} from "../../../base/construction"

export {
	renderers , 
}


/** 『次节』表示小节内的一个小小节。 */
var subsection_printer = (()=>{
	let orderer_gene = (info:PreprocessInformation<GroupNode>)=>new OrderContexter<GroupNode>(info.parameters.label)

	let printer = get_default_group_renderer({
		contexters: [orderer_gene] , 
		outer: (props: PrinterRenderFunctionProps<GroupNode>) => {
            let {node , context , parameters , children} = props

            let orderer = orderer_gene({node, parameters, context, env: {}}) // 现场生成orderer。
            let order = orderer.get_context(context) // 获得自身的编号。

			let order_str = make_oerder_str(order , parameters.ordering) // 生成标题字符串
			order_str = order_str ? order_str + " " : order_str

			let title = parameters.title
			return <PrinterPartBox>
				<DefaultAbstractRendererAsProperty {...{node, context, parameters}} senario="title">
			    	<PrinterPartBox subtitle_like>{order_str}{title}</PrinterPartBox>
				</DefaultAbstractRendererAsProperty>
                {children}
            </PrinterPartBox>
		} , 
	})
	return printer
})()


/** 『昭言』表示一段需要专门的、需要强调的话。如定理。 */
var brightwords_printer = (()=>{

	let orderer_gene = (info:PreprocessInformation<GroupNode>)=>new OrderContexter<GroupNode>(info.parameters.label)
	let reference_gene = ()=>(new ReferenceContexter<GroupNode>( (info) => {
		let orderer = orderer_gene(info) // 现场生成orderer。
		let order = orderer.get_context(info.context) // 获得自身的编号。
		let order_str = make_oerder_str(order , info.parameters.ordering) // 生成标题字符串
		let title_ref = `${info.parameters.title} ${order_str}`

		let content_ref = cut_str( node2string(info.node) )

		return {
			title: title_ref , 
			content: content_ref , 
		}
	} ))
	let printer = get_default_group_renderer({
		contexters: [
			orderer_gene, 
			reference_gene , 
		] , 
		pre_element: (info: PreprocessInformation<GroupNode>) => {
            let {node , context , parameters , env} = info

            let orderer = orderer_gene(info) // 现场生成orderer。
            let order = orderer.get_context(context) // 获得自身的编号。

			let title = parameters.title  // 标题
			let prefix = parameters.prefix // 前缀
			let order_str = make_oerder_str(order , parameters.ordering) // 生成标题字符串
			
			let inject_content = `${title}`
			if(order_str){
				inject_content = inject_content + ` ${order_str}`
			}
			if(prefix){
				inject_content = inject_content + ` （${prefix}）`
			}
			
			return <DefaultAbstractRendererAsProperty {...{node, context, parameters}} senario="title">
				<PrinterStructureBoxText inline>{inject_content}</PrinterStructureBoxText>
			</DefaultAbstractRendererAsProperty>
		} , 
		outer: (props) => {
			return <PrinterPartBox subtitle_like>{props.children}</PrinterPartBox>
		} , 
	})
	return printer
})()

/** 『随言』表示附属性质的话。比如注释、证明。 */
var followwords_printer = (()=>{
	let orderer_gene = (info:PreprocessInformation<GroupNode>)=>new OrderContexter<GroupNode>(info.parameters.label)

	let make_title_content = (info: PreprocessInformation<GroupNode>) => {
		let {node,parameters,env,context} = info

		let title = parameters.title // 标题
		let order = orderer_gene(info).get_context(context) // 编号
		let order_str = make_oerder_str(order , parameters.ordering) // 编号字符串儿

		let title_content = `${title}`
		if(order_str){
			title_content = title_content + ` ${order_str}` // 注入前缀
		}
		return title_content
	}

	return get_default_group_renderer({
		contexters: [
			orderer_gene , 
		] , 

		pre_element: (info: PreprocessInformation<GroupNode>) => {
			let {node , parameters , context , env} = info
			let prefix = parameters.prefix // 前缀
			return prefix && <PrinterStructureBoxText inline>{prefix}</PrinterStructureBoxText>
		} , 
		inner: (props: PrinterRenderFunctionProps<GroupNode>) => {
			let {node , parameters , context , children} = props

			let close = parameters.close // 结尾
			let title_content = make_title_content({node , parameters , env: {} , context})

			// followwords 不论如何都会有额外的缩进。
			return <AutoStack force_direction="column">
				
					{title_content ? <PrinterStructureBoxText>{
						<DefaultAbstractRendererAsProperty {...{node, context, parameters}} senario="title">
							<>{title_content}</>
						</DefaultAbstractRendererAsProperty>}</PrinterStructureBoxText> 
					: <></>}
				<PrinterNewLevelBox><PrinterWeakenText>{props.children}</PrinterWeakenText></PrinterNewLevelBox>
				{close ? <PrinterStructureBoxText>{close}</PrinterStructureBoxText> : <></>}
			</AutoStack>
		} , 
	})
})()

// TODO order gene应该传入一个参数，来看他是否应该连续编号...
/** 『属言』表示一段正文的，但是处于附属地位的话。 */
var subwords_printer = (()=>{
	let orderer_gene = (info:PreprocessInformation<GroupNode>)=>new OrderContexter<GroupNode>(info.parameters.label)
	let reference_gene = ()=>(new ReferenceContexter<GroupNode>( (info) => {
		let orderer = orderer_gene(info) // 现场生成orderer。
		let order = orderer.get_context(info.context) // 获得自身的编号。
		let order_str = make_oerder_str(order , info.parameters.ordering) // 生成标题字符串

		let content_ref = cut_str( node2string(info.node) )

		return {
			title: order_str , 
			content: content_ref , 
		}
	} ))

	return get_default_group_renderer({
		small_margin_enter: true , //前面不要空一坨
		contexters: [
			orderer_gene , 
			reference_gene , 
		] , 
		pre_element: (info: PreprocessInformation<GroupNode>) => {
			let prefix = info.parameters.prefix // 前缀
			return prefix && <PrinterStructureBoxText inline>{prefix}</PrinterStructureBoxText>
		} , 

		aft_element: (info: PreprocessInformation<GroupNode>) => {
			let {node , parameters , context , env} = info
			let suffix = parameters.suffix // 注入后缀
			return suffix && <PrinterStructureBoxText inline leftmargin>{suffix}</PrinterStructureBoxText>
		} , 
		inner: (props: PrinterRenderFunctionProps<GroupNode>) => {
			let {node , parameters , context , children} = props

			let title = parameters.title // 标题
			let close = parameters.close // 结尾

			let order = orderer_gene({node,parameters,env: {},context}).get_context(context)
			let order_str = make_oerder_str(order , parameters.ordering)

			let title_content = `${title}`
			if(order_str){
				title_content = title_content + ` ${order_str}` // 注入前缀
			}
			let title_jsx = <>{title_content}</>
			if(title_content.length > 5){
				title_jsx = <Typography sx={{fontSize: "0.5rem"}}>{title_content}</Typography>
			}
			
			return <React.Fragment>
				<AutoStack force_direction="column">
					<AutoStack>
						<PrinterOldLevelBox sx={{position: "relative"}}> {/* 套一层`PrinterParagraphBox`，是为了获得正确的间距。 */}
							{title_content ? 
								<PrinterParagraphBox>
									<DefaultAbstractRendererAsProperty {...{node, context, parameters}} senario="title">
										{title_jsx}
									</DefaultAbstractRendererAsProperty>
								</PrinterParagraphBox> 
							: <></>}
						</PrinterOldLevelBox>
						<Box>{props.children}</Box>
					</AutoStack>
					{close ? <PrinterStructureBoxText>{close}</PrinterStructureBoxText> : <></>}
				</AutoStack>
			</React.Fragment>
		} , 
	})
})()

/** 『裱示』表示一段正式的展示。如引用一首诗。 */
var mount_printer = (()=>{
	return get_default_group_renderer({
		inner: (props: PrinterRenderFunctionProps<GroupNode>) => {
			let {node , parameters , context , children} = props

			let title = parameters.title // 标题
			let close = parameters.close // 结尾
			let center = !parameters.long as boolean // 结尾

			let text_jsx = <PrinterDisplayText align="center">{props.children}</PrinterDisplayText>
			if(!center){
				text_jsx = <PrinterNewLevelBox sx={{position: "relative"}}>
					<PrinterDisplayText align="left">{props.children}</PrinterDisplayText>
				</PrinterNewLevelBox>
			}

			return <AutoStack force_direction="column">
				<DefaultAbstractRendererAsProperty {...{node, context, parameters}} senario="title">
					{title ? <PrinterStructureBoxText>{title}</PrinterStructureBoxText> : <></>}
				</DefaultAbstractRendererAsProperty>
				{text_jsx}
				{close ? <PrinterStructureBoxText align="right">{close}</PrinterStructureBoxText> : <></>}
			</AutoStack>
		} , 
	})
})()

/** 『格示』展示一段有固定格式的文本，比如代码。 */
var formatted_printer = (()=>{
	return get_default_group_renderer({
		inner: (props: PrinterRenderFunctionProps<GroupNode>) => {
			let {node , parameters , context , children} = props
			return <pre>{props.children}</pre>
		} , 
	})
})()


/** 『彰示』 表示展示一个完整的部分的片段，以供剖析。如引用一首诗中的一句。 */
var display_printer = (()=>{
	return get_default_group_renderer({
		inner: (props: PrinterRenderFunctionProps<GroupNode>) => {
			let {node , parameters , context , children} = props
			// XXX 这里为啥有autostack
			return <PrinterDisplayText sx={{
				fontSize: (theme)=>remtimes(theme.fonts.structure.fontSize , 1.4) , //字号翻倍
				lineHeight: (theme)=>remtimes(theme.fonts.structure.lineHeight , 1.4) ,  //行高翻倍
			}}>
				<DefaultAbstractRendererAsProperty {...{node, context, parameters}} senario="title">
					{props.children}
				</DefaultAbstractRendererAsProperty>
			</PrinterDisplayText>
			
		} , 
	})
})()



var mathblock_printer = (()=>{
	return get_default_group_renderer({
		inner: (props: PrinterRenderFunctionProps<GroupNode>) => {
			let {node,parameters, context} = props

			let value 	= node2string(node)
			let suffix 	= parameters.suffix
			let close 	= parameters.close
			let environ = parameters.environ
			let environ_enter = environ ? `\\begin{${environ}}` : ""
			let environ_exit  = environ ? `\\end{${environ}}`   : ""

			value = `${environ_enter}${value}\\text{${suffix}}${environ_exit}`
			
			return <DefaultAbstractRendererAsProperty {...{node, context, parameters}} senario="title">
				<React.Fragment>
					<MathJaxBlock>{value}</MathJaxBlock>
					{close}
				</React.Fragment>
			</DefaultAbstractRendererAsProperty>
		} , 
	})
})()


let line_printer = (()=>{
    function get_widths(node: StructNode, parameters: ProcessedParameterList){
        
        let widths_str = parameters.widths || ""
        let widths = widths_str.split(",").map(x=>(x == "" ? 1 : parseInt(x))) as number [] // convert to int list 
        if(widths.length > node.children.length){
            widths = widths.slice(0,node.children.length)
        }
        while(widths.length < node.children.length){
            widths.push(1)
        }
        return widths
    }
    let renderer = get_default_structure_renderer({
        inner(props){
            let {node , parameters , context , children} = props
            let widths = get_widths(node , parameters)
            let sum = widths.reduce((s , x)=>s + x , 0)
			let tot_width = parameters.tot_width_ratio
            return <Box sx={{
				width: `${tot_width}%`
			}}
			><DefaultAbstractRendererAsProperty {...{node, context, parameters}} senario="title">
				<Grid container columns={sum} sx={{width: "100%"}} spacing={2}>{props.children}</Grid>
			</DefaultAbstractRendererAsProperty></Box>
        } , 
        subinner(props){
            let {node , parameters , context , children , subidx} = props
            let widths = get_widths(node , parameters)
            let my_width = widths[subidx]
            return <Grid item xs={my_width} sx={{align: "center"}}>{props.children}</Grid>
        }
    })
    return renderer
})()


let renderers = {
	group:{
		"昭言": brightwords_printer , 
		"随言": followwords_printer , 
		"裱示": mount_printer , 
		"彰示": display_printer , 
		"属言": subwords_printer , 
		"格示": formatted_printer , 
		"数学": mathblock_printer , 
		"次节": subsection_printer , 
		
	} ,

	structure: {
		"齐言": line_printer , 
	} , 
}