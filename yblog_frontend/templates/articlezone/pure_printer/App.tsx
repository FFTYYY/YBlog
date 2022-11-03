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
	Container , 
} from "@mui/material"


import { Node , Transforms , Element } from "slate"
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
	
import {
	Printer , 
	GroupNode , 
	AbstractNode , 
	PrinterStructureBoxText , 
	GlobalInfoProvider , 
	DefaultPrinterComponent , 
} from "../lib"
import { my_theme } from "../base/construction/theme"
import { Interaction , BackendData } from "../base/interaction"
import { MathJaxContext , MathJaxInline , MathJaxBlock } from "../base/construction"
import { renderers , default_renderers } from "../base/concept"
import { linkto } from "../base/linkto"
import { parse_second_concepts } from "../base/utils"
import { first_concepts } from "../base/concept"

// TODO 处理滚动
// TODO 处理根节点的参数。

// import "react-perfect-scrollbar/dist/css/styles.css"
// import PerfectScrollbar from "react-perfect-scrollbar"
let default_tree = {
	type: "abstract" as "abstract" ,
	concept: "root" , 
	idx: 2333 , 
	abstract: [] , 
	parameters: {} , 
	children: [] , 
}

class App extends  React.Component<{} , {
	root: AbstractNode
	printer: Printer | undefined
}>{
	printer_ref: React.RefObject<Printer>

	constructor(props){
		super(props)

		this.printer_ref = React.createRef<Printer>()
		this.state = {
			root: default_tree , 
			printer: undefined , 
		}
	}

	get_printer(){
		if(this.printer_ref && this.printer_ref.current){
			return this.printer_ref.current
		}
		return undefined
	}

	async componentDidMount(){
		// 从后端获得所有概念。
		let sec_concepts_data = await Interaction.get.concept(BackendData.node_id) as string[] 
		let sec_concepts = parse_second_concepts(sec_concepts_data)

		let printer = new Printer(
			first_concepts , 
			sec_concepts , 
			renderers , 
			default_renderers , 
		)
		

		//获得内容
		var root = await Interaction.get.content(BackendData.node_id)
		this.setState({
			root: root , 
			printer: printer , 
		})
		
		
		//初始化跳转
		// if(BackendData.linkto){
		// 	linkto(printer , Number(BackendData.linkto))
		// }

		// setTimeout(()=>flush_mathjax() , 500)
	}

	render(){
		let me = this

		if(this.state.printer == undefined){
			return <></>
		}

		return <MathJaxContext><ThemeProvider theme={createTheme(my_theme)}>
			
			<Box sx={{
				position: "absolute" , 
				top: "0%" ,
				left: "0%" , 
				height: "100%" , 
				width: "100%" , 
			}}>
				<GlobalInfoProvider value={{BackendData: BackendData.node_id}}>
					<DefaultPrinterComponent 
						printer = {this.state.printer} 
						theme = {my_theme}
						onUpdateCache = {(cache)=>{console.log("cache!")}}
						root = {this.state.root}
					></DefaultPrinterComponent>
				</GlobalInfoProvider>
			</Box>
		</ThemeProvider></MathJaxContext>
	}

}

export default App
