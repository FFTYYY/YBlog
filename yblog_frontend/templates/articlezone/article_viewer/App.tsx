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
	Printer , 
	DefaultPrinter , 
	DefaultEditor , 
	AutoStack , 

    PrinterStructureBoxText  , 
} from "../../../lib"
// import { make_new_style , withNecessaryPrinter , withNecessaryStyle} from "../base/styles"
import { my_theme } from "../base/construction/theme"
import { LeftBox , RightBox } from "./cards"
import { Interaction , BackendData } from "../base/interaction"
import { MathJaxContext , MathJaxInline , MathJaxBlock } from "../base/mathjax"

// import "react-perfect-scrollbar/dist/css/styles.css"
// import PerfectScrollbar from "react-perfect-scrollbar"

class App extends  React.Component{
	core: EditorCore
    printer: Printer
	printer_ref: React.RefObject<DefaultPrinter>
    
	constructor(props){
		super(props)

		this.core    = withNecessaryStyle( new EditorCore([] , {
			title: ""
		}) )
        this.printer = withNecessaryPrinter( new Printer( this.core ) )

		this.printer_ref = React.createRef<DefaultPrinter>()
	}

	async componentDidMount(){

        /** 获得内容。 */
		var root = await Interaction.get.content()
		this.core.update_root(root)

        /** 获得样式。 */
        var node_concepts = await Interaction.get.concept()
		for(let [name , meta_name , fixed_params , default_params , extra_params] of node_concepts){
			let [style , editor , printer] = make_new_style(meta_name , name , fixed_params , default_params , extra_params)
			this.core.add_style(style)
			if(style.type != "abstract")
				this.printer.update_renderer(printer , style.type , style.name)
		}
        this.forceUpdate()
	}

	render(){
		let me = this

		return <MathJaxContext><ThemeProvider theme={createTheme(my_theme)}>
			
			<Box sx={{
				position: "absolute" , 
				top: "2%" ,
				left: "1%" , 
				height: "96%" , 
				width: "17%" , 
			}}>
				<LeftBox core={me.printer.core} />
			</Box>

			<Box sx={{
				position: "absolute" , 
				top: "2%" ,
				left: "20%" , 
				height: "96%" , 
				width: "60%" , 
				display: "flex" , 
			}}>
				<Box sx = {{
					position: "absolute" , 
					width: "98%" ,
					left: "1%" , 
					top: "1%" , 
					height: "3%" , 
				}}>
					<PrinterStructureBoxText sx={{textAlign: "center"}}>{me.printer.core.root.parameters.title}</PrinterStructureBoxText>
				</Box>
				<Box sx = {{
					position: "absolute" , 
					width: "98%" ,
					left: "1%" , 
					top: "5%" , 
					height: "94%" , 
				}}>
					<DefaultPrinter
						printer = {me.printer}
						theme = {my_theme}
						ref = {me.printer_ref}
					/>
				</Box>
			</Box>
			
			<Box sx={{
				position: "absolute" , 
				top: "2%" ,
				left: "81%" , 
				height: "96%" , 
				width: "17%" , 
			}}>
				<RightBox 
					core = {me.printer.core} 
					onScroll = {(path)=>{
						if(me.printer_ref && me.printer_ref.current){
							me.printer_ref.current.scroll_to(path)
						}
					}}
				/>
			</Box>
		</ThemeProvider></MathJaxContext>
	}

}

export default App
