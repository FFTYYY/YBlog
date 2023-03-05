import React , { useState } from "react"
import {
	Drawer , 
	Fab , 
	Box , 
	Grid , 
	Button , 
	Stack , 
	Paper , 
	Divider , 
	Container, 
	CssBaseline, 
} from "@mui/material"


import { 
	createTheme as MUICreateTheme, 
	ThemeProvider as MUIThemeProvider ,  
} from "@mui/material/styles"
	
	
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
} from "../../../ytext"
import { my_theme } from "../base/construction"
import { Interaction , BackendData } from "../base/interaction"
import { MathJaxContext , MathJaxInline , MathJaxBlock } from "../base/construction"
import { renderers , default_renderers } from "../base/concept"
import { parse_second_concepts } from "../base/utils"
import { first_concepts } from "../base/concept"

import "overlayscrollbars/overlayscrollbars.css"
import { OverlayScrollbars } from "overlayscrollbars"

class App extends  React.Component<{} , {
	printer: Printer  | undefined
	tree: AbstractNode  | undefined
	cache: PrinterCache | undefined
}>{

	constructor(props: {}){
		super(props)

		this.state = {		
			printer: undefined , 
			tree: undefined , 
			cache: undefined , 
		}
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
	}

	render(){
		let me = this

		let {printer , tree} = this.state

		if(!(printer && tree)){
			return <></>
		}

		return <MUIThemeProvider theme={MUICreateTheme(my_theme.mui)}><ThemeProvider value={my_theme} mui>
			<CssBaseline />
			<Box><ScrollBarBox  
				sx = {{
					position: "absolute" , 
					width: "100%" ,
					left: "0%" , 
					top: "0" , 
					height: "100%" , 
					overflow: "auto" , 
					backgroundColor: "background.default" , 
					color: "text.primary" , 
				}}
				// heightProvider 是为了能捕获到这个元素的高度。因为body的高度是0，而这个元素的高度才是真实的高度。
				className = "heightProvider mathjax_process" 
			><MathJaxContext>
				
				<GlobalInfoProvider value={{
					BackendData: BackendData , 
					cache: me.state.cache , 
				}}>
					<DefaultPrinterComponent 
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
								} , 300) // 给他一点时间来初始化好
							}
						}}
					></DefaultPrinterComponent>
				</GlobalInfoProvider>
			</MathJaxContext></ScrollBarBox></Box>
		</ThemeProvider></MUIThemeProvider>
	}

}

export default App
