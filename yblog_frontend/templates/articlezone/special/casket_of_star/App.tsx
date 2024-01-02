import React , { useState } from "react"

import {
	Printer , 
	GroupNode , 
	AbstractNode , 
	PrinterStructureBoxText , 
	GlobalInfoProvider , 
	DefaultPrinterComponent , 
	EditorCore , 
	PrinterCache , 
	ScrollBarBox , 

	ThemeContext , 
	ThemeProvider , 

	KeyEventManager, 
	AutoStack, 
} from "@ftyyy/ytext"


import { 
	createTheme as MUICreateTheme, 
	ThemeProvider as MUIThemeProvider ,  
} from "@mui/material/styles"

import "overlayscrollbars/overlayscrollbars.css"
import { OverlayScrollbars } from "overlayscrollbars"
import {
	Box , 
	CssBaseline,
	SvgIcon , 
	Divider , 
	AppBar, 
	Typography, 
} from "@mui/material"

import { my_theme } from "../../base/construction"
import { Interaction , BackendData } from "../../base/interaction"
import { MathJaxContext , MathJaxInline , MathJaxBlock } from "../../base/construction"
import { renderers , default_renderers } from "../../base/concept"
import { parse_second_concepts } from "../../base/utils"
import { first_concepts } from "../../base/concept"
import { LeftBox, RightBox, TopBox } from "../../article_viewer/cards"
import { flush_math , MathJaxFlusher } from "../../base/construction/math"
// import "./style.css"

class App extends  React.Component<{} , {
	printer: Printer  | undefined
	tree: AbstractNode  | undefined
	cache: PrinterCache | undefined
	info: {
		create_time?: string ,
		modify_time?: string ,  
	}

	activate_idx: boolean // 是否要显示每个组件的IDX
}>{
	printer_comp_ref: React.RefObject<DefaultPrinterComponent>

	constructor(props: {}){
		super(props)
		
		this.state = {		
			printer: undefined , 
			tree: undefined , 
			cache: undefined , 
			
			info: {} , 

			activate_idx: false , 
		}
		this.printer_comp_ref = React.createRef()
	}

	get_printer_comp(){
		if(this.printer_comp_ref && this.printer_comp_ref.current){
			return this.printer_comp_ref.current
		}
		return undefined
	}

	async componentDidMount(){
		let me = this

		// 从后端获得所有概念。
		let sec_concepts_data = await Interaction.get.concept(BackendData.node_id) as string[]
		let sec_concepts = parse_second_concepts(sec_concepts_data)

		// 建立印刷器核心。
		let printer = new Printer(
			first_concepts , 
			sec_concepts , 
			renderers , 
			default_renderers , 
		)

		// 获得树。
		let root = await Interaction.get.content(BackendData.node_id)
		// 设置网页标题
		document.title = "星星"

		// 获得缓存内容（其实是不必要的...）
		let cache = await Interaction.get.cache(BackendData.node_id)

		// 获得info
		let time_info = await Interaction.get.create_time(BackendData.node_id)

		this.setState({
			printer: printer , 
			tree: root , 
			cache: cache , 
			info: {
				create_time: time_info.create_time , 
				modify_time: time_info.modify_time , 
			}
		})

		setTimeout(()=>{
			flush_math.go()
		} , 1000)
	}

	render(){
		let me = this

		let {printer , tree} = this.state

		if(!(printer && tree)){
			return <></>
		}
		// TODO 不知道为什么build之后cssbaseline没有生效，需要手动加入背景和前景颜色。
		return <MUIThemeProvider theme={MUICreateTheme(my_theme.mui)}><ThemeProvider value={my_theme}><Box sx={{
			position: "fixed" , 
			width: "100%" , 
			height: "100%" , 
			left: "0" , 
			right: "0" , 
			backgroundColor: "rgba(0,0,0,0)", 
			color: "text.primary" , 
		}}
		><CssBaseline />
			<AppBar sx={{
				position: "absolute" , 
				top: "0" ,
				left: "0" , 
				height: "2.60rem" , 
				width: "100%" , 
				opacity: "0.9" , 
				border: "1px solid grey" , 
				// backgroundColor: "rgb(240,240,230)" , 
			}}>
				<TopBox 
					root = {tree} 
					idx_activated = {me.state.activate_idx}
					onActivateIdx = {()=>{ // 逆转！
						me.setState({activate_idx: !me.state.activate_idx})
					}}
				></TopBox>
			</AppBar>

            哈哈!
			
		</Box></ThemeProvider></MUIThemeProvider>
	}
}

export default App


