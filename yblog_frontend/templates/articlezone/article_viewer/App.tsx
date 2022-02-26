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

	PrinterDivider , 
    PrinterWeakenText , 
    PrinterDisplayText , 
    PrinterTitleBoxText  , 
    PrinterParagraphBox , 
    PrinterPartBox , 
    PrinterNewLevelBox , 
    PrinterOldLevelBox , 
    PrinterBackgroundPaper , 
	get_DefaultStructPrinter , 


} from "../../../lib"


import { make_new_style , apply_style , withNecessaryEditor , withNecessaryPrinter , withNecessaryStyle} from "../components"
import { axios , get_node_id } from '../utils'
import { my_theme } from "../construction/theme"
import { LeftBox } from "./cards"
import { get_node_information , post_node_information } from "../utils/ineraction"

var node_id = get_node_id()

class App extends  React.Component{
	core: EditorCore
    printer: Printer
    
	constructor(props){
		super(props)

		this.core    = withNecessaryStyle( new EditorCore([] , {
			title: ""
		}) )
        this.printer = withNecessaryPrinter( new Printer( this.core ) )
	}

	async componentDidMount(){

        /** 获得内容。 */
		var root = await get_node_information("get_node" , "content")
		this.core.update_root(root)

        /** 获得样式。 */
        var node_components = await get_node_information("get_node_components" , "components")
		for(let [name , meta_name , fixed_params , default_params , extra_params] of node_components){
			let [style , editor , printer] = make_new_style(meta_name , name , fixed_params , default_params , extra_params)
			this.core.add_style(style)
			this.printer.update_renderer(printer , style.type , style.name)
		}
        this.forceUpdate()
	}

	render(){
		let me = this

		return <ThemeProvider theme={createTheme(my_theme)}>
			
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
					<PrinterTitleBoxText sx={{textAlign: "center"}}>{me.printer.core.root.parameters.title}</PrinterTitleBoxText>
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
					/>
				</Box>
			</Box>
			
		</ThemeProvider>
	}

}

export default App
