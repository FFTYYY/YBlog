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
} from "../../../ytext"


import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
	
import { my_theme } from "../base/construction"
import { Interaction , BackendData } from "../base/interaction"
import { MathJaxContext , MathJaxInline , MathJaxBlock } from "../base/construction"
import { renderers , default_renderers } from "../base/concept"
import { parse_second_concepts } from "../base/utils"
import { first_concepts } from "../base/concept"
import { LeftBox, RightBox } from "./cards"
import { flush_math } from "../base/construction/math"

import "overlayscrollbars/overlayscrollbars.css"
import { OverlayScrollbars } from "overlayscrollbars"
import {
	Box , 
	CssBaseline, 
} from "@mui/material"

class App extends  React.Component<{} , {
	printer: Printer  | undefined
	tree: AbstractNode  | undefined
	cache: PrinterCache | undefined
}>{
	printer_comp_ref: React.RefObject<DefaultPrinterComponent>

	constructor(props: {}){
		super(props)

		this.state = {		
			printer: undefined , 
			tree: undefined , 
			cache: undefined , 
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

		// 获得缓存内容（其实是不必要的...）
		let cache = await Interaction.get.cache(BackendData.node_id)

		this.setState({
			printer: printer , 
			tree: root , 
			cache: cache , 
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
		return <ThemeProvider theme={{...createTheme({...my_theme})}}><Box sx={(theme)=>({
			position: "fixed" , 
			width: "100%" , 
			height: "100%" , 
			left: "0" , 
			right: "0" , 
			backgroundColor: theme.palette.background.default , 
			color: theme.palette.text.primary , 
		})}><CssBaseline />
			<Box sx={{
				position: "absolute" , 
				top: "2%" ,
				left: "1%" , 
				height: "96%" , 
				width: "18%" , 
			}}>
				<LeftBox root={tree} />
			</Box>
			<Box sx={{
				position: "absolute" , 
				top: "2%" ,
				left: "25%" , 
				height: "96%" , 
				width: "62%" , 
			}}>
				<Box sx = {{
					position: "absolute" , 
					width: "98%" ,
					left: "1%" , 
					top: "1%" , 
					height: "3%" , 
				}}>
					<PrinterStructureBoxText sx={{textAlign: "center"}}>{
						tree.parameters.title.val
					}</PrinterStructureBoxText>
				</Box>

				<ScrollBarBox  sx = {{
					position: "absolute" , 
					width: "98%" ,
					left: "1%" , 
					top: "5%" , 
					height: "94%" , 
					overflowY: "auto" ,
					wordBreak:"break-all" , 
				}} className = "mathjax_process"><MathJaxContext>
					
					<GlobalInfoProvider value={{
						BackendData: BackendData , 
						cache: me.state.cache , 
					}}>
						<DefaultPrinterComponent 
							ref = {me.printer_comp_ref}
							printer = {printer} 
							theme = {{...my_theme}}
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
									} , 300) // 给他一点时间来初始化好
								}
							}}
						></DefaultPrinterComponent>
					</GlobalInfoProvider>
				</MathJaxContext></ScrollBarBox>
			</Box>
			<Box sx={{
				position: "absolute" , 
				top: "2%" ,
				left: "88%" , 
				height: "96%" , 
				width: "11%" , 
			}}>
				<RightBox 
					root = {tree} 
					onScroll = {(path)=>{
						let _printer_comp = this.get_printer_comp()
						if(!_printer_comp){ 
							return 
						}
						let printer_comp = _printer_comp.get_component()
						if(!printer_comp){ 
							return 
						}
						printer_comp.scroll_to(path)
					}}
				/>
			</Box>

			</Box></ThemeProvider>
	}
}

export default App


