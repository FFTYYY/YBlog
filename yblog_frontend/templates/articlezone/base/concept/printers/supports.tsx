import React, { useEffect } from "react"
import ReactDom from "react-dom"
import * as Slate from "slate"

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

} from "../../../lib"

import {
	url_from_root , Interaction , urls , 
} from "../../interaction"

import {
	make_oerder_str , 
	remtimes , 
    num2chinese , 
} from "./utils"

import {
	MathJaxInline , 
	MathJaxBlock , 
} from "../../../base/construction"

export {
	renderers , 
}


/** 小节线。 */
var sectioner_printer = (()=>{
	let orderer_gene = (info:PreprocessInformation<SupportNode>)=>new OrderContexter<SupportNode>(info.parameters.label)
	let reference_gene = ()=>(new ReferenceContexter<SupportNode>( (info) => {
		let orderer = orderer_gene(info) // 现场生成orderer。
		let order = orderer.get_context(info.context) // 获得自身的编号。

		return {
			title: `第${num2chinese(order)}节` , 
			content: "" , 
		}
	} ))

	return auto_renderer<SupportNode>({
		contexters: [orderer_gene, reference_gene] , 

		render_function: (props: PrinterRenderFunctionProps<SupportNode>)=>{
			let {node,parameters,context,children} = props
			let order = orderer_gene({node,parameters,context,env: {}}).get_context(props.context)
			let title = parameters.title
			let alone = parameters.alone

			// 如果是`alone`的就不显示序号惹。
			let order_word = alone ? <></> : <PrinterStructureBoxText inline>第{num2chinese(order)}节</PrinterStructureBoxText>
			let title_word = title ? <PrinterStructureBoxText inline sx={{marginRight: 0}}>{title}</PrinterStructureBoxText> : <></>
			return <Divider>{order_word}{title_word}</Divider>

		}
	})
})()

/** 章节线。 */
var ender_printer = (()=>{
	return auto_renderer<SupportNode>({
		render_function: (props: PrinterRenderFunctionProps<SupportNode>) => {
			return <Divider />
		}
	})
})()

var image_printer = (()=>{
	return get_default_inline_renderer({
		outer: (props: PrinterRenderFunctionProps) => {
			let {node , parameters , context , children} = props
			let globalinfo = React.useContext(GlobalInfo)
			let BackendData = globalinfo.BackendData

			let type = parameters.type
			let target = parameters.target
			let width = parameters.width
			let height = parameters.height

			let [ url , set_url ] = React.useState("")

			React.useEffect(()=>{(async ()=>{
				if(type == "internal"){
					let resource_info = await Interaction.get.resource_info(target , BackendData.node_id)
					if(!resource_info.url){
						set_url("")
					}
					else{
						set_url(url_from_root(resource_info.url))
					}
				}
				else{
					set_url(target)
				}
			})()} , [parameters])
	
			return <img src = {url || undefined} style = {{
				width: width > 0 ? `${width}rem` : "100%", 
				height: height > 0 ? `${height}rem` : "100%" , 
			}}/>	
	
		} , 
	})
})()

let renderers = {
	"support": {
		"小节线": sectioner_printer , 
		"章节线": ender_printer , 
		"图"  : image_printer , 
	} , 
}

