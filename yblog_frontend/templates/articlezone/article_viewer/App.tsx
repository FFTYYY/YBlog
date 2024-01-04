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

import { my_theme } from "../base/construction"
import { Interaction , BackendData } from "../base/interaction"
import { MathJaxContext , MathJaxInline , MathJaxBlock } from "../base/construction"
import { renderers , default_renderers } from "../base/concept"
import { parse_second_concepts } from "../base/utils"
import { first_concepts } from "../base/concept"
import { LeftBox, RightBox, TopBox } from "./cards"
import { flush_math , MathJaxFlusher } from "../base/construction/math"
import { FangSheng, BaJiao, Hui, BaoXiangHua, Acanthus, Acanthus3, Acanthus4 } from "../assets"
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
		document.title = root.parameters.title.val

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
			
			<Box sx={{
				position: "absolute" , 
				top: "2.6rem" ,
				left: "12%" , 
				bottom: "0.5rem" , 
				width: "65%" , 
			}}>
				<ScrollBarBox  
					sx = {{
						position: "absolute" , 
						width: "98%" ,
						left: "1%" , 
						top: "1%" , 
						height: "98%" , 
						overflowY: "auto" ,
						wordBreak:"break-all" , 
					}} 
					className = "mathjax_process"
				><MathJaxContext>
					
					<GlobalInfoProvider value={{
						BackendData: BackendData , 
						cache: me.state.cache , 
						activate_idx: me.state.activate_idx, 
					}}>
						<Box sx={{
							marginTop: "2.5rem" , 
							marginLeft: "2rem", 
							marginBottom: "2.5rem" , 
						}}>
							<PrinterStructureBoxText sx={{
								...my_theme.printer.fonts.title , 
								fontSize: "1.7rem", 
								// marginBottom: "1rem" , 
							}}>{
								tree.parameters.title.val
							}</PrinterStructureBoxText>
						</Box>
						<Box>
							<DefaultPrinterComponent 
								ref = {this.printer_comp_ref}
								printer = {printer} 
								theme = {my_theme}
								onUpdateCache = {(cache)=>{
									if(cache && JSON.stringify(cache) != JSON.stringify(me.state.cache)){
										// XXX 这里会报warning，这是因为printer里在render()里调用了这个函数...
										setTimeout(()=>me.setState({cache: cache}) , 200)
									}
								}}
								root = {tree}
								onDidMount = {(printer_comp)=>{
									if(BackendData.linkto){ // 初始化滚动。
										setTimeout(()=>{
											let tar_idx = parseInt(BackendData.linkto)
											printer_comp.scroll_to_idx(tar_idx)
											let tar = printer_comp.get_ref_from_idx(tar_idx)
											if(tar){
												tar.style.border = "2px solid"
											}
										} , 500) // 给他一点时间来初始化好
									}
								}}
							></DefaultPrinterComponent>
						</Box>
					</GlobalInfoProvider>
				</MathJaxContext></ScrollBarBox>
			</Box>
			<Box sx={{
				position: "absolute" , 
				top: "6%" ,
				left: "83%" , 
				height: "92%" , 
				width: "13%" , 
			}}>
				<RightBox 
					root = {tree} 
					printer = {me.state.printer}
					onScroll = {(path)=>{
						let printer_comp = me.get_printer_comp()?.get_component()
						if(printer_comp)
							printer_comp.scroll_to(path)
					}}
				/>
			</Box>
		</Box></ThemeProvider></MUIThemeProvider>
	}
}

export default App


