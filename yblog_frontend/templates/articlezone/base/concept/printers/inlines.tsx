import React, { useEffect } from "react"

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
    PrinterRenderFunction, 
	PrinterCache, 
	AbstractNode , 
	DefaultAbstractRendererAsProperty , 
} from "@ftyyy/ytext"

import {
	url_from_root , Interaction , urls , 
} from "../../interaction"

import {
	make_oerder_str , 
    idx2node ,
	node2string ,  
	cut_str , 
} from "./utils"

import {
	MathJaxInline , 
	MathJaxBlock , 
} from "../../../base/construction"

export {
	renderers , 
}

/** 无。 */
var nothing_printer = (()=>{
	return get_default_inline_renderer({
		outer: (props: PrinterRenderFunctionProps<InlineNode>) => {
			return <DefaultAbstractRendererAsProperty 
					node = {props.node} 
					context = {props.context} 
					parameters = {props.parameters} 
					senario = "title"
				>
				<span>{props.children}</span>
			</DefaultAbstractRendererAsProperty>
		}
	})
})()



/** 强调。 */
var strong_printer = (()=>{
	return get_default_inline_renderer({
		outer: (props: PrinterRenderFunctionProps<InlineNode>) => {
			return <DefaultAbstractRendererAsProperty 
				node = {props.node} 
				context = {props.context} 
				parameters = {props.parameters} 
				senario = "title"
			>
				<strong>{props.children}</strong>
			</DefaultAbstractRendererAsProperty>
		}
	})
})()


var delete_printer = (()=>{
	return get_default_inline_renderer({
		outer: (props: PrinterRenderFunctionProps<InlineNode>) => {
			return <DefaultAbstractRendererAsProperty 
				node = {props.node} 
				context = {props.context} 
				parameters = {props.parameters} 
				senario = "title"
			>
				<del>{props.children}</del>
			</DefaultAbstractRendererAsProperty>
		}
	})
})()

var mathinline_printer = (()=>{

	return get_default_inline_renderer({
		outer: (props: PrinterRenderFunctionProps<InlineNode>) => {
			/** 这是一个比较蛋疼的写法，取消原来的children并直接将element序列化。
			 * 这里的问题在于，如果直接写成${props.children}$，则children里方便定位用的span会阻止mathjax的渲染。
			 */
			return <Box component="span" sx={{paddingX: "0.1rem"}}><DefaultAbstractRendererAsProperty 
				node = {props.node} 
				context = {props.context} 
				parameters = {props.parameters} 
				senario = "title"
			>
				<MathJaxInline>{node2string(props.node)}</MathJaxInline>
			</DefaultAbstractRendererAsProperty></Box>
		}
	})
})()


var link_printer = (()=>{
	let reference_contexter = new ReferenceContexter(()=>undefined)

	/** 这个函数从cache中获得节点信息。 */
	function get_reference_from_cache(cache: PrinterCache, idx: number){
		if(!(cache && cache[idx] && cache[idx][reference_contexter.key])){
			return [undefined , undefined]
		}
		let cache_item = cache[idx][reference_contexter.key]
		return [cache_item["title"] , cache_item["content"]]
	}

	/** 这个函数重新渲染节点树以获得节点信息。 */
	function get_reference_from_printer(printer_comp: PrinterComponent, root: AbstractNode, idx: number){
		let [env , all_contexts , all_parameters, all_caches] = printer_comp.preprocess({root: root})
		return get_reference_from_cache(all_caches, idx)
	}

	/** 这个函数强行生成信息。 */
	function get_reference_from_root(root: AbstractNode, idx: number){
		let tar_node = idx2node(root , idx)
		if(!tar_node){
			return [undefined, undefined]
		}

		return [ `此${tar_node.concept}`, cut_str(node2string(tar_node)) ]

	}

	return get_default_inline_renderer({
		outer: (props: PrinterRenderFunctionProps<InlineNode>) => {
			let {node,parameters,context,children} = props

			let target = parameters.target
			let type = parameters.type
			let autotext = parameters.autotext

			let globalinfo = React.useContext(GlobalInfo)
			let printer_comp = globalinfo.printer_component as PrinterComponent

			if(type == "index"){ // 本文内的节点。
				let tar_idx = parseInt(target)
				let cache = globalinfo.cache
				let root = globalinfo.root as AbstractNode
				if(autotext && cache){
					let [title_ref , contt_ref] = get_reference_from_cache(cache, tar_idx) // 首先尝试从cache获得
					if(title_ref == undefined || contt_ref == undefined){ // 然后尝试重新建立cache
						[title_ref , contt_ref] = get_reference_from_printer(printer_comp, root, tar_idx)
					}
					if(title_ref == undefined || contt_ref == undefined){ // 最后尝试直接从节点获得信息
						[title_ref , contt_ref] = get_reference_from_root(root, tar_idx)
					}
					if(!(title_ref == undefined || contt_ref == undefined)){
						return <AutoTooltip title = {contt_ref}><Link 
							onClick = {()=>{printer_comp.scroll_to_idx(tar_idx)}}
						>{title_ref}</Link></AutoTooltip>
					}
				}

				// 不要自动确定文本。
				return <Link 
					onClick = {()=>{printer_comp.scroll_to_idx(tar_idx)}}
				>{children}</Link> // 呃呃
			}
			else if(type == "outer-index"){
				let [_tar_page , _tar_idx] = target.split(":")
				let [ tar_page ,  tar_idx] = [ parseInt(_tar_page)  , parseInt(_tar_idx) ]

				if(autotext){
					let [ root  , set_root  ] = React.useState<AbstractNode | undefined>(undefined)
					let [ cache , set_cache ] = React.useState<PrinterCache | undefined>(undefined)
					useEffect(()=>{
						Interaction.get.content(tar_page).then(data=>{set_root (data)})
						Interaction.get.cache  (tar_page).then(data=>{set_cache(data)})
					} , []) // 传入空依赖确保这个函数只被调用一次。

					if(root && cache){
						let [title_ref , contt_ref] = get_reference_from_cache(cache, tar_idx) // 首先尝试从cache获得
						if(title_ref == undefined || contt_ref == undefined){ // 然后尝试重新建立cache
							[title_ref , contt_ref] = get_reference_from_printer(printer_comp, root, tar_idx)
						}
						if(title_ref == undefined || contt_ref == undefined){ // 最后尝试直接从节点获得信息
							[title_ref , contt_ref] = get_reference_from_root(root, tar_idx)
						}
						return <AutoTooltip title = {contt_ref}><Link 
							href = {urls.view.content(tar_page , {linkto: tar_idx})} // 跳转并设置初始化滚动
						>此页面的{title_ref}</Link></AutoTooltip>
					}

				}
			}


			if(autotext){
				return <Link href={target}>此页面</Link>
			}
			return <Link href={target}>{children}</Link>
		}
	})
})()

let renderers = {
    inline : {
		"强"  : strong_printer , 
		"刊"  : delete_printer , 
		"缀"  : link_printer , 
		"数学": mathinline_printer , 
		"无"  : nothing_printer , 
	},
}
