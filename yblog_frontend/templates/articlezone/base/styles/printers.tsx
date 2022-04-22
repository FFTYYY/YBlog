import { Node } from "slate"
import React, { useEffect } from "react"
import ReactDom from "react-dom"

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
	BasicEffector , 
	StyleCollector , 
	
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
	has_children, 
	YPrinter , 
	GlobalInfoProvider, 
	group_prototype, 
	StyledNode,
	AutoTooltip, 
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
import { MathJaxInline , MathJaxBlock } from "../mathjax"
// import { Interaction } from "../interaction" // 禁止使用全局变量
import { url_from_root , urls , Interaction, BackendData} from "../interaction"
import { TitleWord } from "../construction/titleword"
import { RightBox } from "../../article_viewer/cards"
import { Renderer } from "@ftyyy/ytext/dist/lib"

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
	image_printer , 
	alignedwords_printer , 
	delete_printer , 
	link_printer , 
	subwords_printer , 
	mathinline_printer , 
	mathblock_printer , 
	formatted_printer , 
	subsection_printer , 
	showchildren_printer , 
	insertchildren_printer , 
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
	if(ordering == "arab-bracket"){
		return `[${order}]`
	}
	if(ordering == "arab-round-bracket"){
		return `${order})`
	}
	return ""
}

class ReferenceEffector<NT extends StyledNode> extends BasicEffector<NT>{
	get_name: (element: NT, env: any, context: any)=>string
	constructor(get_name: (element: NT, env: any, context: any)=>string){
		super("reference-name" , "reference-name" , "")
		this.get_name = get_name
	}
	enter_effect(element: NT, env: any, context: any): [any, any] {
		env = this.set_context(context , this.get_name(element , env , context))
		return [env , context]
	}
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
		extra_effectors: [
			(e)=>new ReferenceEffector((element)=>{return `${get_param_val(element , "title")}`})
		]
	})
	return printer
})()


/** 『昭言』表示一段需要专门的、需要强调的话。如定理。 */
var brightwords_printer = (()=>{
	let orderer = (e: GroupNode) => new OrderEffector(
		`order/${get_param_val(e,"label")}` , 
		`order/${get_param_val(e,"label")}`
		)

	let printer = get_DefaultBlockPrinter({
		extra_effectors: [
			orderer , 
			(e)=>new ReferenceEffector<GroupNode>((ele,env,ctx)=>{
				let orders = orderer(ele).get_context(ctx)
				let order = orders[orders.length-1]
	
				let title = get_param_val(ele,"title")  // 标题
				let order_str = make_oerder_str(order , get_param_val(ele,"ordering") as string)
				return `${title} ${order_str}`
			})
		] , 
		inject_pre: (props: {element: GroupNode , context: PrinterContext}) => {
			let orders = orderer(props.element).get_context(props.context)
			let order = orders[orders.length-1]

			let title = get_param_val(props.element,"title")  // 标题
			let prefix = get_param_val(props.element,"prefix") // 前缀
			let order_str = make_oerder_str(order , get_param_val(props.element,"ordering") as string)
			
			let inject_content = `${title}`
			if(order_str){
				inject_content = inject_content + ` ${order_str}`
			}
			if(prefix){
				inject_content = inject_content + ` （${prefix}）`
			}
			
			return <PrinterStructureBoxText inline>{inject_content}</PrinterStructureBoxText>
		} , 
		outer: (props) => {
			return <PrinterPartBox subtitle_like>{props.children}</PrinterPartBox>
		} , 
	})
	return printer
})()

/** 『随言』表示附属性质的话。比如注释、证明。 */
var followwords_printer = (()=>{
	let orderer = (e: GroupNode) => new OrderEffector(
		`order/${get_param_val(e,"label")}` , 
		`order/${get_param_val(e,"label")}`
	)

	let make_title_content = (element: GroupNode , context: PrinterContext) => {
		let title = get_param_val(element , "title") // 标题
		let order = orderer(element).get_context(context) // 编号
		let order_str = make_oerder_str(order , get_param_val(element,"ordering") as string) // 编号字符串儿

		let title_content = `${title}`
		if(order_str){
			title_content = title_content + ` ${order_str}` // 注入前缀
		}
		return title_content
	}

	return get_DefaultBlockPrinter({
		extra_effectors: [
			orderer , 
			e=>new ReferenceEffector<GroupNode>((e,env,ctx)=>{
				return make_title_content(e,ctx)
			})
		] , 

		inject_pre: (props: {element: GroupNode , context: PrinterContext}) => {
			let prefix = get_param_val(props.element , "prefix") // 前缀
			
			if(prefix)
				return <PrinterStructureBoxText inline>{prefix}</PrinterStructureBoxText>
			return <></>
		} , 
		// FIXME suffix的行为是不对的。
		inject_suf: (props: {element: GroupNode , context: PrinterContext}) => {
			let suffix = get_param_val(props.element , "suffix") // 注入后缀
			if(suffix)
				return <PrinterStructureBoxText inline leftmargin>{suffix}</PrinterStructureBoxText>
			return <></>
		} , 

		inner: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
			let close = get_param_val(props.element , "close") // 结尾
			let title_content = make_title_content(props.element , props.context)

			// followwords 不论如何都会有额外的缩进。
			return <AutoStack force_direction="column">
				{title_content ? <PrinterStructureBoxText>{title_content}</PrinterStructureBoxText> : <></>}
				<PrinterNewLevelBox><PrinterWeakenText>{props.children}</PrinterWeakenText></PrinterNewLevelBox>
				{close ? <PrinterStructureBoxText>{close}</PrinterStructureBoxText> : <></>}
			</AutoStack>
		} , 
	})
})()

/** 『属言』表示一段正文的，但是处于附属地位的话。 */
var subwords_printer = (()=>{
	let orderer = (e: GroupNode) => new OrderEffector<GroupNode>(
		`order/${get_param_val(e , "label")}` , 
		`order/${get_param_val(e , "label")}` , 
		(e) => get_param_val(e,"clustering") && e.relation == "separating"
	)
	return get_DefaultBlockPrinter<GroupNode>({
		small_margin_enter: true , //前面不要空一坨
		extra_effectors: [
			orderer , 
			e=>new ReferenceEffector<GroupNode>((ele,env,ctx)=>{
				let title = get_param_val(ele , "title") // 标题
				let order = orderer(ele).get_context(ctx)
				let order_str = make_oerder_str(order , get_param_val(ele , "ordering") as string)
				if(title){ // 如果有title，就用title
					return `${title} ${order_str}`
				}
				return `${order_str}`
			})
		] , 
		inject_pre: (props: {element: GroupNode , context: PrinterContext}) => {
			let prefix = get_param_val(props.element , "prefix") // 前缀
			
			if(prefix)
				return <PrinterStructureBoxText inline>{prefix}</PrinterStructureBoxText>
			return <></>
		} , 

		inject_suf: (props: {element: GroupNode , context: PrinterContext}) => {
			let suffix = get_param_val(props.element , "suffix") // 注入后缀
			if(suffix)
				return <PrinterStructureBoxText inline leftmargin>{suffix}</PrinterStructureBoxText>
			return <></>
		} , 
		inner: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
			let title = get_param_val(props.element , "title") // 标题
			let close = get_param_val(props.element , "close") // 结尾
			let order = orderer(props.element).get_context(props.context)
			let order_str = make_oerder_str(order , get_param_val(props.element , "ordering") as string)

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
							{title_content ? <PrinterParagraphBox>{title_jsx}</PrinterParagraphBox> : <></>}
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
	return get_DefaultBlockPrinter({
		inner: (props: {element: GroupNode , context: PrinterContext, children: any}) => {
			let title = get_param_val(props.element , "title") // 标题
			let close = get_param_val(props.element , "close") // 结尾
			let center = get_param_val(props.element , "center") as boolean // 结尾

			let text_jsx = <PrinterDisplayText align="center">{props.children}</PrinterDisplayText>
			if(!center){
				text_jsx = <PrinterNewLevelBox sx={{position: "relative"}}>
					<PrinterDisplayText align="left">{props.children}</PrinterDisplayText>
				</PrinterNewLevelBox>
			}

			return <AutoStack force_direction="column">
				{title ? <PrinterStructureBoxText>{title}</PrinterStructureBoxText> : <></>}
				{text_jsx}
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
			return <GlobalInfo.Consumer>{globalinfo => {
				function I(props: {element: SupportNode , context: PrinterContext, children: any}){
					let type = get_param_val(props.element , "type") as string
					let target = get_param_val(props.element , "target") as string
					let [ url , set_url ] = React.useState("")
		
					React.useEffect(()=>{(async ()=>{
						if(type == "internal"){
							let resource_info = await Interaction.get.resource_info(target , globalinfo.BackendData.node_id)
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
	
				}
				return <I {...props} />
			}}</GlobalInfo.Consumer>
		} , 
	})
})()



var link_printer = (()=>{
	return get_DefaultInlinePrinter<InlineNode>({
		outer: (props: {element: InlineNode , context: PrinterContext, children: any}) => {

			function cut_too_long(str: string , maxlen: number = 30){
				if(str.length > maxlen){
					str = str.slice(0,maxlen-3) + "..."
				}
				return str
			}

			let target = get_param_val(props.element , "target") as string
			let type = get_param_val(props.element , "type") as string
			let autotext = get_param_val(props.element , "autotext") as boolean

			if(type == "index"){// 如果是跳转到本文内。
				let taridx = Number(target)
			
				return <GlobalInfo.Consumer>{globalinfo => {
					let root = globalinfo.root
					let printer = globalinfo.printer
					let ref_eff = new ReferenceEffector(()=>"") // 只是为了读取引用名称。

					let tar_path = idx2path( root , taridx )
					let tar_node = idx2node( root , taridx )

					let children = props.children
					if(autotext && tar_node && is_styled(tar_node)){ // 自动决定文字
						
						let ref_name = ref_eff.get_context( globalinfo.contexts[printer.get_path_id(tar_path)] )
						if(ref_name){ // 如果有引用名称，优先使用引用名称
							children = ref_name
						}
						else if(get_param_val(tar_node , "label") != undefined){ // 否则，根据label生成名称
							let label = get_param_val(tar_node , "label")
							children = `此 ${label}`
						}
					}
					let tarnode_string = ""
					if(tar_node){
						tarnode_string = cut_too_long( Node.string(tar_node) )
					}

					return <AutoTooltip title={tarnode_string}><Link 
						component = "button" 
						onClick = {e=>{printer.scroll_to(tar_path)}}
					>
						<Typography>{children}</Typography>
					</Link></AutoTooltip>
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
				
				if(root == undefined){ // 还没获得内容
					return <></>
				}

				return <GlobalInfo.Consumer>{globalinfo => {
					let printer = globalinfo.printer
					let fakeprinter = new YPrinter( {renderers: printer.renderers , core: printer.core} )
					let ref_eff = new ReferenceEffector(()=>"") // 只是为了读取引用名称。
					
					let children = props.children
					let tar_node = idx2node( root , tar_idx )
					let tar_path = idx2path( root , tar_idx )
					if(autotext && tar_node && is_styled(tar_node)){ // 自动决定参数
						let ref_name = ref_eff.get_context( globalinfo.contexts[printer.get_path_id(tar_path)] )

						if(ref_name){ // 如果有引用名称，优先使用引用名称
							children = `此页的${ref_name}`
						}
						else if(get_param_val(tar_node , "label") != undefined){ // 否则，根据label生成名称
							let label = get_param_val(tar_node , "label")
							children = `此 ${label}`
						}
					}
					let tarnode_string = ""
					if(tar_node){
						tarnode_string = cut_too_long( Node.string(tar_node) )
					}

					return <AutoTooltip title={tarnode_string}>
						<Link href={urls.view.content(tar_page , {linkto: tar_idx})}>{children}</Link>
					</AutoTooltip>
				}}</GlobalInfo.Consumer>
			}


		}
	})
})()

var showchildren_printer = (()=>{
	return {
        render_func: (props: PrinterRenderFunc_Props) => {

			return <GlobalInfo.Consumer>{globalinfo => {

				function I(props: PrinterRenderFunc_Props){
					let element = props.element as SupportNode 

					let [ sons , set_sons ] = React.useState([])
		
					React.useEffect(()=>{
						(async ()=>{
							let son_ids = await Interaction.get.son_ids(globalinfo.BackendData.node_id)
							set_sons( son_ids )
						})()
		
					} , [ JSON.stringify(element.parameters) ])
		
					return <React.Fragment>{
						sons.map((son_id , idx) => {
							let SubIframe = (props: {}) => {
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
		
								let iframe_height = `${height + 40}px`
								let overflow = get_param_val(element , "scroll") ? "auto" : "hidden"
		
								return <Box>
									<Link 
										href = {urls.view.content(son_id)} 
										underline = "hover" 
										sx = {(theme)=>({
											...theme.printer.typography.structure
										})}
									>▶<TitleWord node_id={son_id}/></Link>
									<Box sx={{
										maxHeight: `${get_param_val(element , "max_height")}rem` , 
										minHeight: `${get_param_val(element , "min_height")}rem` , 
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
											let outer_height = Number(get_param_val(element , "max_height")) * 16 // 估计裁剪高度
											if(outer_height > 0 && outer_height < inner_height){ // 估计有被截断
												return <>...</>
											}
										}
										return <></>
									})()}
								</Box>
							}
							return <SubIframe key = {idx} />
						})
					}</React.Fragment>
				}
				return <I {...props}/>
			}}</GlobalInfo.Consumer>
        } , 
        enter_effect: (element: SupportNode, env: PrinterEnv): [PrinterEnv,PrinterContext] => {    
            let ret: [PrinterEnv , PrinterContext] = [ env , {env: JSON.parse(JSON.stringify(env))} ] // 把env记到context里面去。
    
            return ret
        } , 
        exit_effect: (element: SupportNode, env: PrinterEnv , context: PrinterContext):[PrinterEnv,PrinterContext] => {    
            let ret: [PrinterEnv , PrinterContext] = [ env , context ]
    
    
            return ret
        } , 
    }
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
 * TODO 见上。
 */
var insertchildren_printer = (()=>{

	/** 给定root，删掉章节线 */
	function remove_endsectioner(root: GroupNode){
		let cur_node = root as StyledNode
		let fat = undefined
		let idx_in_fat = -1
		while(cur_node.name != "章节线"){
			fat = cur_node
			idx_in_fat = cur_node.children.length - 1
			cur_node = cur_node.children[idx_in_fat] as StyledNode // 一直往最右下走
		}
		if(fat){
			fat.children.pop(idx_in_fat)
		}
		return root
	}

	return {
        render_func: (props: PrinterRenderFunc_Props) => {

			let element = props.element as SupportNode 

			return <GlobalInfo.Consumer>{globalinfo => {
				class I extends React.Component<PrinterRenderFunc_Props , {
					son_ids: any[]
					init_envs: any[]
				}>{
					printer_refs: React.RefObject<YPrinter> []
					constructor(props){
						super(props)

						this.state = {
							son_ids: [] , 
							init_envs: [] , 
						}

						this.printer_refs = []
					}

					get_ref(idx: number | string , to_assign: boolean = false){
						if(this.printer_refs[idx] == undefined){
							this.printer_refs[idx] = React.createRef()
						}
						if(to_assign){
							return this.printer_refs[idx]
						}
						if(this.printer_refs[idx] == undefined || this.printer_refs[idx].current == undefined){
							return undefined
						}
						return this.printer_refs[idx].current
					}

					async componentDidMount(){
						let son_ids = await Interaction.get.son_ids(globalinfo.BackendData.node_id)
						this.setState( {son_ids: son_ids} )

						let init_envs = [ this.props.context["env"] ] // init_envs表示每个位置所用的初始env
																	  // 第一个节点的env是context中保存的env
						for(let idx in son_ids){
							if(!this.get_ref(idx)){
								continue
							}
							let cur_ref = this.get_ref(idx)
							
							let cur_root = await Interaction.get.content(son_ids[idx])
							if(get_param_val(element , "no_ender")){ // 要求去掉章节线。
								cur_root = remove_endsectioner(cur_root)
							}


							let cur_env = cur_ref.update(cur_root , init_envs[idx])
							cur_env = JSON.parse(JSON.stringify(cur_env)) // deepcopy
							init_envs.push(cur_env)
						}
						this.setState({init_envs: init_envs})
					}

					render(){
						let props = this.props
						let me = this

						return <React.Fragment>{
							me.state.son_ids.map((son_id , idx) => {
								return <GlobalInfoProvider key = {idx} value = {{
									BackendData: {...globalinfo.BackendData , node_id: son_id} // 老子真是天才！
								}}>
									<YPrinter 
										ref = {this.get_ref(idx , true)}
										core = {globalinfo.core}
										renderers = {globalinfo.renderers}
									/>
								</GlobalInfoProvider>
							})
						}</React.Fragment>	
					}
				}

				return <I {...props}/>
			}}</GlobalInfo.Consumer>
        } , 
        enter_effect: (element: SupportNode, env: PrinterEnv): [PrinterEnv,PrinterContext] => {    
            let ret: [PrinterEnv , PrinterContext] = [ env , {env: JSON.parse(JSON.stringify(env))} ] // 把env记到context里面去。
    
            return ret
        } , 
        exit_effect: (element: SupportNode, env: PrinterEnv , context: PrinterContext):[PrinterEnv,PrinterContext] => {    
            let ret: [PrinterEnv , PrinterContext] = [ env , context ]
    
    
            return ret
        } , 
    }
})()



var paragraph_printer 	= get_DefaultParagraphPrinter()
