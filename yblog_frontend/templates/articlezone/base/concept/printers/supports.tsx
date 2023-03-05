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
} from "../../../base/construction"
import { insertchildren_style } from "../first_concepts"

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

// TODO 高度不对...
var showchildren_printer = (()=>{
	return new PrinterRenderer({
		enter(node: Readonly<SupportNode> , parameters: Readonly<ProcessedParameterList>, env: Env , context: Context){    
			context["env"] = JSON.parse(JSON.stringify(env)) // 把整个env记到context里面去。
        } ,
		exit(node: Readonly<SupportNode> , parameters: Readonly<ProcessedParameterList>, env: Env , context: Context): [PrinterCacheItem, boolean]{
			return [{} , true]
		} , 
		renderer(props: PrinterRenderFunctionProps<SupportNode>){
			let globalinfo = React.useContext(GlobalInfo)
			let {node , parameters , context , children} = props
			
			let [ sons , set_sons ] = React.useState([])

			React.useEffect(()=>{
				(async ()=>{
					let son_ids = await Interaction.get.son_ids(globalinfo.BackendData.node_id)
					set_sons( son_ids )
				})()

			} , [ JSON.stringify(parameters) ])

			return <React.Fragment>{sons.map((son_id , idx) => {
				let SubIframe = (props: {}) => {
					let theme = React.useContext(ThemeContext)

					let iframe_ref = React.useRef<HTMLIFrameElement>()
					let [ height , set_height ] = React.useState(0)

					let listen_to_resize = (e)=>{
						if(e.data.verification != "showchildren" || e.data.son_id == undefined){
							return
						}
						if(String(e.data.son_id) == String(son_id) && e.data.height != height){
							set_height(e.data.height)
						}
					}

					React.useEffect( ()=>{
						window.addEventListener("message" , listen_to_resize)

						return ()=>{
							window.removeEventListener("message" , listen_to_resize)
						}
					}, [])

					let iframe_height = `${height + 140}px`
					let overflow = parameters.scroll ? "auto" : "hidden"

					return <Box>
						<Link 
							href = {urls.view.content(son_id)} 
							underline = "hover" 
							sx = {{
								...theme.printer.fonts.structure
							}}
						>▶<TitleWord node_id={son_id}/></Link>
						<Box sx={{
							maxHeight: `${parameters.max_height}rem` , 
							minHeight: `${parameters.min_height}rem` , 
							overflow: overflow , 
							borderLeft: "1px solid" , 
							marginLeft: "2px" , 
							paddingLeft: "1rem" , 
						}}>
							<iframe 
								ref = {iframe_ref}
								src = {urls.view.pure_printer(son_id)} 
								onLoad = {()=>{
									iframe_ref.current.contentWindow.postMessage({
										son_id: son_id , 
										verification: "showchildren"
									} , "*")
								}}
								style = {{
									width: "100%" , 
									border: "none" , 
									height: iframe_height , 
								}}
							/>
						</Box>
						{(()=>{
							if(overflow == "hidden"){
								let inner_height = (height + 40) // 估计实际高度
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
			})}</React.Fragment>
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
		enter(node: Readonly<SupportNode> , parameters: Readonly<ProcessedParameterList>, env: Env , context: Context){    
			context["env"] = JSON.parse(JSON.stringify(env)) // 把整个env记到context里面去。
        } ,
		exit(node: Readonly<SupportNode> , parameters: Readonly<ProcessedParameterList>, env: Env , context: Context): [PrinterCacheItem, boolean]{
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
			})()}, [])

			let {roots , init_envs} = sub_infos
			if(roots.length != son_ids.length || son_ids.length != init_envs.length){
				return <></>
			}

			return <React.Fragment>{
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
			}</React.Fragment>	

		} , 
	})
})()


let renderers = {
	"support": {
		"小节线": sectioner_printer , 
		"章节线": ender_printer , 
		"图"  : image_printer , 
		"展示子节点": showchildren_printer , 
		"插入子节点": insertchildren_printer , 
	} , 
}

