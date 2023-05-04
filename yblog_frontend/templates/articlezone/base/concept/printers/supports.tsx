import React, { useEffect } from "react"
import ReactDom from "react-dom"
import * as Slate from "slate"

import {
	Box , Link , Typography , Divider , Grid , Chip
} from "@mui/material"
import {
    ExpandMore as ExpandMoreIcon , 
    ChevronRight as ChevronRightIcon , 
    ArrowUpward as ArrowUpwardIcon , 
    ArrowDownward as ArrowDownwardIcon , 
    DoNotTouch as DoNotTouchIcon  , 
    TaxiAlert  as TaxiAlertIcon ,
} from "@mui/icons-material"

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
	PrinterCacheItem , 

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
	AbstractNode , 
	InlineNode , 
	Env  , 
	Context  , 
    PrinterRenderFunctionProps, 
    PrinterRenderFunction, 
	EditorComponent,
	is_concetnode,
	is_supportnode, 

	ThemeContext , 
	TextIcon , 

} from "@ftyyy/ytext"

import {
	url_from_root , Interaction , urls , 
} from "../../interaction"

import {
	remtimes , 
    num2chinese , 
} from "../../utils"

import {
	MathJaxInline , 
	MathJaxBlock , 
	TitleWord , 
	flush_math , 
	MathJaxFlusher , 
} from "../../construction"
import { insertchildren_style } from "../first_concepts"

import {
	IndexContexter , 
} from "./contexter"

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
	let index_gene = ()=>{
		return new IndexContexter<SupportNode>( (info)=>{
			let orderer = orderer_gene(info) // 现场生成orderer。
			let order = orderer.get_context(info.context) // 获得自身的编号。
			let param = info.parameters
			if(param.alone){
				return undefined
			}
			return `${num2chinese(order)} ${param.title}`
		} )
	}

	return auto_renderer<SupportNode>({
		contexters: [orderer_gene, reference_gene, index_gene] , 

		render_function: (props: PrinterRenderFunctionProps<SupportNode>)=>{
			let {node,parameters,context,children} = props
			let order = orderer_gene({node,parameters,context,env: {}}).get_context(props.context)
			let title = parameters.title
			let alone = parameters.alone

			if(alone && !title){
				return <Divider />
				// return <></>
			}
			
			// 如果是`alone`的就不显示序号惹。
			let order_word = alone ? <></> : <PrinterStructureBoxText inline>{num2chinese(order)} </PrinterStructureBoxText>
			let title_word = title ? <PrinterStructureBoxText inline sx={{marginRight: 0}}>{title}</PrinterStructureBoxText> : <></>
			return <Divider>{order_word}{title_word}</Divider>

		}
	})
})()

/** 章节线。 */
var ender_printer = (()=>{
	let index_gene = ()=>{
		return new IndexContexter<SupportNode>( (info)=>{
			return `章`
		} )
	}

	return auto_renderer<SupportNode>({
		contexters: [index_gene] , 
		render_function: (props: PrinterRenderFunctionProps<SupportNode>) => {
			// 手动添加了一个box，来防止滚动条的高度异常。
			return <React.Fragment>
				<Divider/>
				<Box sx={{height: "2rem"}}></Box> 
			</React.Fragment> 
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
			})()} , [type, target])

			
			if(width < 0 && height < 0){ // 不能同时<0
				width = 1
			}
			if(url){
				return <img src = {url || undefined} style = {{
					width: width > 0   ? `${width}rem` : "100%", 
					height: height > 0 ? `${height}rem` : "100%" , 
				}}/>	
			}
			return <Box sx={{
				widths: width > 0 ? `${width}rem` : `${height}rem`, 
				height: height > 0 ? `${height}rem` : `${width}rem`, 
			}}></Box>
	
	
		} , 
	})
})()

var showchildren_printer = (()=>{
	return new PrinterRenderer({
		enter(node: Readonly<SupportNode> , path: Readonly<number []>, parameters: Readonly<ProcessedParameterList>, env: Env , context: Context){    
			context["env"] = JSON.parse(JSON.stringify(env)) // 把整个env记到context里面去。
        } ,
		exit(node: Readonly<SupportNode> , path: Readonly<number []>, parameters: Readonly<ProcessedParameterList>, env: Env , context: Context): [PrinterCacheItem, boolean]{
			return [{} , true]
		} , 
		renderer(props: PrinterRenderFunctionProps<SupportNode>){
			let globalinfo = React.useContext(GlobalInfo)
			let {node , parameters , context , children} = props
			
			let [ sons , set_sons ] = React.useState([])
			let [ tldrs , set_tldrs ] = React.useState({})

			React.useEffect(()=>{
				(async ()=>{
					let son_ids = await Interaction.get.son_ids(globalinfo.BackendData.node_id)
					set_sons( son_ids )

					let now_tldrs = {}
					for(let son_id of son_ids){
						let now_tldr = await Interaction.get.tldr(son_id)
						now_tldrs[son_id] = now_tldr
					}
					set_tldrs(now_tldrs)
					setTimeout(()=>{flush_math.go()}, 500)
				})()

			} , [ JSON.stringify(parameters) ])

			return <MathJaxFlusher>{sons.map((son_id , idx) => {
				let SubIframe = (props: {}) => {
					let theme = React.useContext(ThemeContext)
					let overflow = parameters.scroll ? "auto" : "hidden"

					let tldr = tldrs[son_id]
					let estimate_height = (tldr / 100) * 12 // XXX xjb估计的...

					return <Box>
						<Box >
							<Link 
								href = {urls.view.content(son_id)} 
								underline = "hover" 
								sx = {{
									...theme.printer.fonts.structure
								}}
							>▶<TitleWord node_id={son_id}/></Link>
							<Box sx={{display: "inline", textAlign: "right", right: 0, position: "absolute"}}>
								<AutoTooltip title="这个节点是一个子节点"><Box>
								<TextIcon text="子" fontSize="small" color={(theme.mui.palette.info as any).main}/>
							</Box></AutoTooltip>
							</Box>
						</Box>
						<Box sx={{
							maxHeight: `${parameters.max_height}rem` , 
							minHeight: `${parameters.min_height}rem` , 
							overflow: overflow , 
							borderLeft: "1px solid" , 
							marginLeft: "2px" , 
							paddingLeft: "1rem" , 
							paddingY: "2rem" , 
							marginY: "0.5rem" , 
							whiteSpace: "pre-wrap" , 
						}}>
							{tldr}
						</Box>
						{(()=>{
							if(overflow == "hidden"){
								let inner_height = estimate_height // 估计实际高度
								let outer_height = parseInt(parameters.max_height) * 16 // 估计裁剪高度
								if(outer_height > 0 && outer_height < inner_height){ // 估计有被截断
									return <>...</>
								}
							}
							return <></>
						})()}
					</Box>
				}
				return <SubIframe key = {idx} />
			})}</MathJaxFlusher>
		} , 
	})
})()


/** 这个组件追求这样的效果：将子文章渲染进当前节点，好像他们本来就是这个组件的子组件一样。
 * 为了实现这一点，首先，在进入此节点时（前作用）记录一个当前环境。
 * 然后，在渲染这个节点时，异步获取所有子节点的内容，并渲染相当于子节点个数的输出器。
 * 在更新每个输出器的内容时，将当前环境传入，并以其吐出来的环境作为下一个输出器的输入环境（当前环境）。
 * 这样环境可以在不同的输出器中流转，编号什么的都可以继承，好像他们是同一个输出器输出的一样。
 * 
 * 想必聪明的读者已经发现了问题：因为前作用不是异步的，本节点退出时的环境在前作用时就处理好了，因此在渲染时异步获取的子节点内容
 * 不可能影响本文档里之后的其他组件的环境。换言之，如果这个组件没有被用在文档的末尾，那么在这个组件之后渲染的组件的环境都是不对的。
 * 这个问题目前还没有解决，初步的思路是让前作用器可以是异步的，并在前作用时就计算一次环境，并获得正确的推出时环境，然后耨
 * 在渲染时也（不得不）再计算一次环境。
 TODO 见上。
 TODO 实际上这个问题可以通过新加入的多次计算环境来实现，不过这个功能还没有实现，所以...
 */
var insertchildren_printer = (()=>{

	/** 给定root，删掉章节线 */
	function remove_endsectioner(root: AbstractNode){
		let guess = root.children[root.children.length-1] // 按照约定，最后一个元素应该是章节线
		if(is_supportnode(guess) && guess.concept == "章节线"){
			root.children = root.children.slice(0,root.children.length-1)
		}
		return root
	}
	return new PrinterRenderer({
		enter(node: Readonly<SupportNode> , path: Readonly<number []>, parameters: Readonly<ProcessedParameterList>, env: Env , context: Context){    
			context["env"] = JSON.parse(JSON.stringify(env)) // 把整个env记到context里面去。
        } ,
		exit(node: Readonly<SupportNode> , path: Readonly<number []>, parameters: Readonly<ProcessedParameterList>, env: Env , context: Context): [PrinterCacheItem, boolean]{
			return [{} , true]
		} , 
		renderer(props: PrinterRenderFunctionProps<SupportNode>){
			let globalinfo = React.useContext(GlobalInfo)
			let {node , parameters, context, children} = props

			let [son_ids , set_son_ids] = React.useState([])
			let [sub_infos , set_sub_infos] = React.useState<{
				init_envs: Env[] , 
				roots: AbstractNode [] , 
			}>({init_envs: [], roots: []})

			let printer_comp = globalinfo.printer_component as PrinterComponent
			let BackendData = globalinfo.BackendData
			if(!(printer_comp && BackendData)){
				return <></>
			}

			React.useEffect(()=>{(async ()=>{
				let son_ids = await Interaction.get.son_ids(globalinfo.BackendData.node_id)
				
				let last_env = JSON.parse(JSON.stringify(context["env"])) // deepcopy
				let init_envs = [] // init_envs表示每个位置所用的初始env
				let roots = []
													  										
				for(let idx in son_ids){
					let cur_root = await Interaction.get.content(son_ids[idx])

					if(parameters.no_ender){ // 去掉章节线。
						cur_root = remove_endsectioner(cur_root)
					}
					
					init_envs.push(JSON.parse(JSON.stringify(last_env))) // 将上一个环境装入
					roots.push(cur_root)

					// 将上一个环境作为初始来预处理，获得新的环境
					let [cur_env , _1 , _2, _3] = printer_comp.preprocess({root: cur_root, init_env: last_env})
					last_env = cur_env
				}

				set_son_ids(son_ids)
				set_sub_infos({roots: roots, init_envs: init_envs})
				setTimeout(()=>{flush_math.go()}, 500)
			})()}, [])

			let {roots , init_envs} = sub_infos
			if(roots.length != son_ids.length || son_ids.length != init_envs.length){
				return <></>
			}

			return <MathJaxFlusher>{
				son_ids.map((son_id , idx) => {
					return <GlobalInfoProvider key = {idx} value = {{
						BackendData: {BackendData , node_id: son_id} // 老子真是天才！
					}}>
						<PrinterComponent 
							init_env = {init_envs[idx]}
							root = {roots[idx]}
							printer = {printer_comp.get_printer()}
						/>
					</GlobalInfoProvider>
				})
			}</MathJaxFlusher>	

		} , 
	})
})()


var gatherindis_printer = (()=>{
	let index_gene = new IndexContexter((info) => {
		return undefined // TODO 
	})
	return new PrinterRenderer({
		enter(
			node: Readonly<SupportNode> , 
			path: Readonly<number[]>,  
			parameters: Readonly<ProcessedParameterList>, 
			env: Env , 
			context: Context , 
		){    
			context["env"] = JSON.parse(JSON.stringify(env)) // 把整个env记到context里面去。
			// index_gene.enter(node,path,parameters,env,context)
        } ,
		exit(
			node: Readonly<SupportNode> , 
			path: Readonly<number[]>, 
			parameters: Readonly<ProcessedParameterList>, 
			env: Env , 
			context: Context , 
		): [PrinterCacheItem, boolean]{
			
			// index_gene.exit(node,path,parameters,env,context)
			return [{} , true]
		} , 
		renderer(props: PrinterRenderFunctionProps<SupportNode>){
			let globalinfo = React.useContext(GlobalInfo)
			let {node , parameters , context , children} = props
			
			let [ indis , set_indis ] = React.useState([])
			let [ tldrs , set_tldrs ] = React.useState({})

			React.useEffect(()=>{
				(async ()=>{
					let indis_ids = await Interaction.get.indiscriminates(globalinfo.BackendData.node_id)
					set_indis( indis_ids )

					let now_tldrs = {}
					for(let indis_id of indis_ids){
						let now_tldr = await Interaction.get.tldr(indis_id)
						now_tldrs[indis_id] = now_tldr
					}
					set_tldrs(now_tldrs)
					setTimeout(()=>{flush_math.go()}, 500)
				})()

			} , [ JSON.stringify(parameters) ])

			return <MathJaxFlusher>{indis.map((son_id , idx) => {
				let SubIframe = (props: {}) => {
					let theme = React.useContext(ThemeContext)
					let overflow = parameters.scroll ? "auto" : "hidden"

					let tldr = tldrs[son_id]
					let estimate_height = (tldr / 100) * 12 // XXX xjb估计的...

					return <Box>
						<Box sx={{
							display: "flex" , 
							justifyContent: "space-between"
						}}>
							<Link 
								href = {urls.view.content(son_id)} 
								underline = "hover" 
								sx = {{
									...theme.printer.fonts.structure
								}}
							>▶<TitleWord node_id={son_id}/></Link>
							<Box sx={{display: "inline", textAlign: "right"}}>
								<AutoTooltip title="这个节点是浮上来的节点"><Box>
									<TextIcon text="浮" fontSize="small" color={(theme.mui.palette.info as any).main}/>
								</Box></AutoTooltip>
							</Box>
						</Box>
						<Box sx={{
							maxHeight: `${parameters.max_height}rem` , 
							minHeight: `${parameters.min_height}rem` , 
							overflow: overflow , 
							borderLeft: "1px solid" , 
							marginLeft: "2px" , 
							paddingLeft: "1rem" , 
							paddingY: "2rem" , 
							marginY: "0.5rem" , 
							whiteSpace: "pre-wrap" , 
						}}>
							{tldr}
						</Box>
						{(()=>{
							if(overflow == "hidden"){
								let inner_height = estimate_height // 估计实际高度
								let outer_height = parseInt(parameters.max_height) * 16 // 估计裁剪高度
								if(outer_height > 0 && outer_height < inner_height){ // 估计有被截断
									return <>...</>
								}
							}
							return <></>
						})()}
					</Box>
				}
				return <SubIframe key = {idx} />
			})}</MathJaxFlusher>
		} , 
	})
})()


let renderers = {
	"support": {
		"小节线": sectioner_printer , 
		"章节线": ender_printer , 
		"图"  : image_printer , 
		"展示子节点": showchildren_printer , 
		"展示杂陈节点": gatherindis_printer , 
		"插入子节点": insertchildren_printer , 
	} , 
}

