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
} from "../../lib"
import {
	PrinterRenderer , 
	GroupNode , 
	StructNode , 
	SupportNode , 
	InlineNode , 
	Env  , 
	Context  , 
    PrinterRenderFunctionProps, 
    PrinterRenderFunction , 
} from "../../lib"

import {
	url_from_root , Interaction , urls , 
} from "../interaction"

import {
	num2chinese  , 
    rem2num , 
    num2rem , 
    remtimes , 
} from "../utils"

export {
	renderers , 
	default_renderers , 
}



/** 根据给定的编号和编号格式，生成编号字符串。 */
function make_oerder_str(order: number , ordering: string){
	if(ordering == "head"){
		return num2chinese(order)
	}
	if(ordering == "discuss"){
		if(order > 0 && order <= 20){
			let m = ["①","②","③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮", "⑯", "⑰", "⑱","⑲", "⑳"]
			return m[order-1]
		}
		return `(${order})`
	}
	if(ordering == "title"){
		return `【${num2chinese(order)}】`
	}
	if(ordering == "list-separating"){
		return `[${order}]`
	}
	if(ordering == "list-chaining"){
		return `${order})`
	}
	return ""
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
			    <PrinterPartBox subtitle_like>{order_str}{title}</PrinterPartBox>
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
		return `${info.parameters.title} ${order_str}`
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
				{title_content ? <PrinterStructureBoxText>{title_content}</PrinterStructureBoxText> : <></>}
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
		return `${order_str}`
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
				{title ? <PrinterStructureBoxText>{title}</PrinterStructureBoxText> : <></>}
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
			return <AutoStack force_direction="column">
				<PrinterDisplayText sx={{
					fontSize: (theme)=>remtimes(theme.fonts.structure.fontSize , 1.4) , //字号翻倍
					lineHeight: (theme)=>remtimes(theme.fonts.structure.lineHeight , 1.4) ,  //行高翻倍
				}}>{props.children}</PrinterDisplayText>
			</AutoStack>
		} , 
	})
})()


/** 小节线。 */
var sectioner_printer = (()=>{
	let orderer_gene = (info:PreprocessInformation<SupportNode>)=>new OrderContexter<SupportNode>(info.parameters.label)
	let reference_gene = ()=>(new ReferenceContexter<SupportNode>( (info) => {
		let orderer = orderer_gene(info) // 现场生成orderer。
		let order = orderer.get_context(info.context) // 获得自身的编号。
		return `第${num2chinese(order)}节`
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

/** 强调。 */
var strong_printer = (()=>{
	return get_default_inline_renderer({
		outer: (props: PrinterRenderFunctionProps<InlineNode>) => {
			return <strong>{props.children}</strong>
		}
	})
})()


var delete_printer = (()=>{
	return get_default_inline_renderer({
		outer: (props: PrinterRenderFunctionProps<InlineNode>) => {
			return <del>{props.children}</del>
		}
	})
})()

var mathinline_printer = (()=>{

	return get_default_inline_renderer({
		outer: (props: PrinterRenderFunctionProps<InlineNode>) => {
			/** 这是一个比较蛋疼的写法，取消原来的children并直接将element序列化。
			 * 这里的问题在于，如果直接写成${props.children}$，则printer里为了定位元素所添加的空白<span>会阻碍mathjax的处理。
			 TODO 处理数学
			 */
			return <Box component="span" sx={{paddingX: "0.1rem"}}>${props.children}$</Box>
		}
	})
})()

// TODO 处理数学
var mathblock_printer = (()=>{
	return get_default_group_renderer({
		inner: (props: PrinterRenderFunctionProps<GroupNode>) => {
			let {node , parameters , context , children} = props
			return <React.Fragment>
				$${children}$$
			</React.Fragment>
		} , 
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


var link_printer = (()=>{
	return get_default_inline_renderer({
		outer: (props: PrinterRenderFunctionProps<InlineNode>) => {
			let {node,parameters,context,children} = props

			let target = parameters.target
			let type = parameters.type
			let autotext = parameters.autotext

			// TODO

			return <Link href={target}>{children}</Link>
		}
	})
})()


let default_renderer_block = new PrinterRenderer({
    renderer(props: PrinterRenderFunctionProps):React.ReactElement<PrinterRenderFunctionProps>{
		let node = props.node
        return <div>{props.children}</div>
    }
})

let default_renderer_inline = new PrinterRenderer({
    renderer(props: PrinterRenderFunctionProps):React.ReactElement<PrinterRenderFunctionProps>{
        return <span>{props.children}</span>
    }
})

let default_renderer_text = new PrinterRenderer({
    renderer(props: PrinterRenderFunctionProps):React.ReactElement<PrinterRenderFunctionProps>{
        let node = props.node as TextNode
        return <span>{node.text}</span>
    }
})

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
			console.log(sum)
            return <Grid container columns={sum} sx={{width: "100%"}} spacing={2}>{props.children}</Grid>
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
	"group":{
		"昭言": brightwords_printer , 
		"随言": followwords_printer , 
		"裱示": mount_printer , 
		"彰示": display_printer , 
		"属言": subwords_printer , 
		"格示": formatted_printer , 
		"数学": mathblock_printer , 
		"次节": subsection_printer , 
		
	} ,
	"inline" : {
		"强"  : strong_printer , 
		"刊"  : delete_printer , 
		"缀"  : link_printer , 
		"数学": mathinline_printer , 
	},
	"support": {
		"小节线": sectioner_printer , 
		"章节线": ender_printer , 
		"图"  : image_printer , 
	} , 
	"abstract": {} , 
	"structure": {
		"齐言": line_printer , 
	} , 
}



let default_renderers = {
	"group"     : default_renderer_block , 
    "structure" : default_renderer_block , 
    "support"   : default_renderer_block , 
    "abstract"  : default_renderer_block , 
    "paragraph" : get_default_paragraph_renderer({}) , 
    "inline"    : default_renderer_inline , 
    "text"      : default_renderer_text , 

}