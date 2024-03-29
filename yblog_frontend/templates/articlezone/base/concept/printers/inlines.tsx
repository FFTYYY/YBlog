import React, { useEffect } from "react"

import {
	Box , Link , Typography , Divider , Grid, Tooltip, styled
} from "@mui/material"

import {
    get_default_inline_renderer , 

	GlobalInfo , 
	AutoTooltip, 

	ReferenceContexter , 
	PrinterComponent , 

	InlineNode , 
    PrinterRenderFunctionProps, 
	PrinterCache, 
	AbstractNode , 
	DefaultAbstractRendererAsProperty, 
	ThemeContext, 
} from "@ftyyy/ytext"

import {
	url_from_root , Interaction , urls , 
} from "../../interaction"

import {
	make_oerder_str , 
    idx2node ,
	node2string ,  
	cut_str , 
	node2string_autotip , 
} from "./utils"

import {
	MathJaxInline , 
	MathJaxBlock , 
	flush_math , 
	MathJaxFlusher , 
} from "../../construction"

import {
    BaoXiangHua, MeiGui , 
} from "../../../assets"
import { BaJiao, LiuBian, SanJiao } from "../../../assets/decors"
import {
	ErrorPrinter, ReferencePrinter , StandardAttachers , MyLink
} from "./base"

import {
	LinktoContexter
} from "./contexter"

export {
	renderers , 
}

/** 无。 */
var nothing_printer = (()=>{
	return get_default_inline_renderer({
		outer: (props: PrinterRenderFunctionProps<InlineNode>) => {
			return <StandardAttachers 
					node = {props.node} 
					context = {props.context} 
					parameters = {props.parameters} 
					inline
				>
					<span>{props.children}</span>
			</StandardAttachers>
		}
	})
})()

/** 错误。 
 * 这些信息是给编辑者看的，因此不显示。
*/
var error_printer = (()=>{
	return get_default_inline_renderer({
		outer: (props: PrinterRenderFunctionProps<InlineNode>) => {
			return <></>
		}
	})
})()

/** 强调。 */
var strong_printer = (()=>{
	return get_default_inline_renderer({
		outer: (props: PrinterRenderFunctionProps<InlineNode>) => {
			return <StandardAttachers 
				node = {props.node} 
				context = {props.context} 
				parameters = {props.parameters} 
				inline
			>
				<strong>{props.children}</strong>
			</StandardAttachers>
		}
	})
})()


var delete_printer = (()=>{
	return get_default_inline_renderer({
		outer: (props: PrinterRenderFunctionProps<InlineNode>) => {
			return <StandardAttachers 
				node = {props.node} 
				context = {props.context} 
				parameters = {props.parameters} 
				inline
			>
				<del>{props.children}</del>
			</StandardAttachers>
		}
	})
})()

var mathinline_printer = (()=>{

	return get_default_inline_renderer({
		outer: (props: PrinterRenderFunctionProps<InlineNode>) => {
			/** 这是一个比较蛋疼的写法，取消原来的children并直接将element序列化。
			 * 这里的问题在于，如果直接写成${props.children}$，则children里方便定位用的span会阻止mathjax的渲染。
			 */
			return <Box component="span" sx={{paddingX: "0.1rem"}}><StandardAttachers 
				node = {props.node} 
				context = {props.context} 
				parameters = {props.parameters} 
				inline
			>
				<MathJaxInline>{node2string(props.node)}</MathJaxInline>
			</StandardAttachers></Box>
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

		if(tar_node.concept == "root"){ // 第一个返回值是undefined表示是root
			return [ "root", cut_str(node2string_autotip(tar_node)) ]
		}

		return [ `此${tar_node.concept}`, cut_str(node2string_autotip(tar_node)) ]
	}

	return get_default_inline_renderer({
		contexters: [()=>new LinktoContexter()] , 
		outer: (props: PrinterRenderFunctionProps<InlineNode>) => {
			let theme = React.useContext(ThemeContext)

			let {node,parameters,context,children} = props
			let target_idx = parameters.target_idx
			let target_url = parameters.target_url
			let autotext = parameters.autotext

			let globalinfo = React.useContext(GlobalInfo)
			let printer_comp = globalinfo.printer_component as PrinterComponent
			let backend_data = globalinfo.BackendData 


			// 先获得目标概念所在节点
			let [ target_node  , set_target_node  ] = React.useState<number | undefined>(undefined)	
			let [ root  , set_root  ] = React.useState<AbstractNode | undefined>(undefined)
			let [ cache , set_cache ] = React.useState<PrinterCache | undefined>(undefined)

			useEffect(()=>{(async ()=>{
				let tar_node = 0
				if(target_idx >= 1){ // 如果是连接到概念，那么就询问概念所在的页面
					tar_node = await Interaction.get.conceptins_location(target_idx)
					set_target_node(tar_node)
				}

				// 如果确认这是一个其他页面
				if(tar_node != undefined && tar_node >= 1 && tar_node != backend_data.node_id){
					
					let tar_conctent = await Interaction.get.content(tar_node)
					let tar_cache    = await Interaction.get.cache  (tar_node)
					set_root  (tar_conctent)
					set_cache (tar_cache)
				}
			})()} , []) // 传入空依赖确保这个函数只被调用一次。

			let linker_comp = (()=>{
				if(target_idx >= 1){
					if(target_node == undefined || target_node <= 0){ // 在加载完成之前传入一个空link
						return <ErrorPrinter inline msg="链接失败">
							<MyLink href = "#" underline = "hover">链接失败： {children}</MyLink>
						</ErrorPrinter>
					}

					if(target_node == backend_data.node_id){ // 本文内的节点。
						let tar_idx = parseInt(target_idx)
						let cache = globalinfo.cache
						let root = globalinfo.root as AbstractNode
						let [title_ref , contt_ref] = [undefined , undefined]
						if(cache){
							[title_ref , contt_ref] = get_reference_from_cache(cache, tar_idx) // 首先尝试从cache获得
							if(title_ref == undefined || contt_ref == undefined){ // 然后尝试重新建立cache
								[title_ref , contt_ref] = get_reference_from_printer(printer_comp, root, tar_idx)
							}
							if(title_ref == undefined || contt_ref == undefined){ // 最后尝试直接从节点获得信息
								[title_ref , contt_ref] = get_reference_from_root(root, tar_idx)
							}
						}
		
						let contt_ref_comp = <MathJaxFlusher>{contt_ref}</MathJaxFlusher> as any
		
						if(autotext){
							if(!(title_ref == undefined || contt_ref == undefined)){
								return <AutoTooltip title={contt_ref_comp}><MyLink 
									underline = "hover"
									onClick = {()=>{printer_comp.scroll_to_idx(tar_idx)}}
								>{title_ref == "root" ? "本文" : title_ref}</MyLink></AutoTooltip>
							}
						}
		
						// 不要自动确定文本。
						return <AutoTooltip title = {contt_ref}><MyLink 
							underline = "hover"
							onClick = {()=>{printer_comp.scroll_to_idx(tar_idx)}}
						>{children}</MyLink></AutoTooltip>
					}
					else{ // 本文外的节点
						let tar_page = parseInt(target_node as any)
						let tar_idx  = parseInt(target_idx)
		
						if(tar_idx <= 0){ // 找不到所在页面
							return <ErrorPrinter inline msg="链接失败"><MyLink 
								href = {urls.view.content(tar_page , {linkto: tar_idx})}
								underline = "hover"
							>链接失败（找不到节点）{children}</MyLink></ErrorPrinter>
						}
		
						let [title_ref , contt_ref] = [undefined , undefined]
						if(root && cache){
							[title_ref , contt_ref] = get_reference_from_cache(cache, tar_idx) // 首先尝试从cache获得
							if(title_ref == undefined || contt_ref == undefined){ // 然后尝试重新建立cache
								[title_ref , contt_ref] = get_reference_from_printer(printer_comp, root, tar_idx)
							}
							if(title_ref == undefined || contt_ref == undefined){ // 最后尝试直接从节点获得信息
								[title_ref , contt_ref] = get_reference_from_root(root, tar_idx)
							}
						}
						
						// 添加数学刷新器。
						let contt_ref_comp = <MathJaxFlusher>{contt_ref}</MathJaxFlusher> as any
		
						if(autotext){
							return <AutoTooltip title = {contt_ref_comp}><MyLink 
								href = {urls.view.content(tar_page , {linkto: tar_idx})} // 跳转并设置初始化滚动
								underline = "hover"
							>{title_ref != "root" ? `此页的${title_ref}` : "此页"}</MyLink></AutoTooltip>
						}
						return <AutoTooltip title = {contt_ref_comp}><MyLink 
							href = {urls.view.content(tar_page , {linkto: tar_idx})} // 跳转并设置初始化滚动
							underline = "hover"
						>{children}</MyLink></AutoTooltip>
					}
				}
				
				if(target_url){
					if(autotext){
						return <MyLink href = {target_url} underline = "hover">此页</MyLink>
					}
					return <MyLink href = {target_url} underline = "hover">{children}</MyLink>	
				}

				return <ErrorPrinter inline msg="链接失败">
					<MyLink href = "#" underline = "hover">链接失败（未指定链接） {children}</MyLink>
				</ErrorPrinter>
			})()
			return <StandardAttachers {...{node, context, parameters}} inline>
					{linker_comp}
			</StandardAttachers>
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
		"阻"  : error_printer , 
	},
}
