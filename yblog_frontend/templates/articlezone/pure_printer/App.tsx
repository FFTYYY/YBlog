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
	YEditor , 
	EditorCore , 
	DefaultPrinter , 
	DefaultEditor , 
	AutoStack , 
	AutoIconButton , 
	paragraph_prototype , 
	StyleCollector , 
	EditorRenderer_Func , 
	EditorRenderer_Props , 
	StyleType , 
	Proxy , 
	default_printer_renderers , 
	default_editor_renderers , 
	PrinterRenderer , 
	group_prototype ,
	PrinterStructureBoxText , 
	GroupNode , 
	get_param_val , 
} from "../../../lib"
import { withAllStyles } from "../base/styles"
import { my_theme } from "../base/construction/theme"
import { Interaction , BackendData } from "../base/interaction"
import { MathJaxContext , MathJaxInline , MathJaxBlock } from "../base/mathjax"
import { withAllPrinters } from "../base/styles"
import { linkto } from "../base/linkto"

// import "react-perfect-scrollbar/dist/css/styles.css"
// import PerfectScrollbar from "react-perfect-scrollbar"

class App extends  React.Component<{} , {
	root: GroupNode
}>{
	core: EditorCore
	printer_renderers: StyleCollector<PrinterRenderer>
	printer_ref: React.RefObject<DefaultPrinter>

	constructor(props){
		super(props)

		this.core = withAllStyles( new EditorCore([]) )
		this.printer_renderers = withAllPrinters( new StyleCollector<PrinterRenderer>(this.core , default_printer_renderers) )

		this.printer_ref = React.createRef<DefaultPrinter>()
		this.state = {
			root: group_prototype("root" , {title: {val: "" , type: "string"}}) , 
		}
	}

	get_printer(){
		if(this.printer_ref && this.printer_ref.current){
			return this.printer_ref.current.get_printer()
		}
		return undefined
	}

	async componentDidMount(){

		//获得内容
		var root = await Interaction.get.content(BackendData.node_id)
		this.setState({root: root})
		
		while(!this.get_printer());
		let printer = this.get_printer()
		printer.update(root)

		//初始化跳转
		if(BackendData.linkto){
			linkto(printer , Number(BackendData.linkto))
		}
	}

	render(){
		let me = this

		return <MathJaxContext><ThemeProvider theme={createTheme(my_theme)}>
            <DefaultPrinter
                ref = {me.printer_ref}
                core = {this.core}
                renderers = {this.printer_renderers}
                theme = {my_theme}
            />
		</ThemeProvider></MathJaxContext>
	}

}

export default App