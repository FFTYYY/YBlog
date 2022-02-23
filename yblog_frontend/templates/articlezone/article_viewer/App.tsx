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

import {
	YEditor , 
	EditorCore , 
	Printer , 
	DefaultPrinter , 
	DefaultEditor , 
	AutoStack , 

} from "../../../lib"


import { make_new_style , apply_style , withNecessaryEditor , withNecessaryPrinter , withNecessaryStyle} from "../components"
import { Node , Transforms , Element } from "slate"
import { ReactEditor } from "slate-react"
import { axios , get_node_id } from '../utils'
import { FlexibleDrawer , FlexibleItem } from "../construction/framework"
import { my_theme } from "../construction/theme"
import { SaveButton } from "../construction/buttons"
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"

var node_id = get_node_id()

class App extends  React.Component{
	core: EditorCore
    printer: Printer
    
	constructor(props){
		super(props)

		this.core    = withNecessaryStyle( new EditorCore([] , {}) )
        this.printer = withNecessaryPrinter( new Printer( this.core ) )
	}

	async componentDidMount(){

        /** 获得内容。 */
		var node_value = (await axios.get(`/get_node/${node_id}`)).data.content
		this.core.update_children(node_value)

        /** 获得样式。 */
        var node_components = (await axios.get(`/get_node_components/${node_id}`)).data.components
		for(let [name , meta_name , fixed_params , default_params , extra_params] of node_components){
			let [style , editor , printer] = make_new_style(meta_name , name , fixed_params , default_params , extra_params)
			this.core.add_style(style)
			this.printer.update_renderer(printer , style.type , style.name)
		}
        this.forceUpdate()
	}

	render(){
		let me = this

		return <ThemeProvider theme={createTheme(my_theme)}><Box sx={{
				position: "absolute" , 
				top: "2%" ,
				left: "1%" , 
				height: "96%" , 
				width: "98%" , 
				display: "flex" , 
			}}>
			<Box sx = {{
				position: "absolute" , 
				width: "98%" ,
				left: "1%" , 
				top: "0" , 
				height: "100%" , 
			}}>
				<DefaultPrinter
					printer = {me.printer}
					theme = {my_theme}
				/>
			</Box>

			
		</Box></ThemeProvider>
	}

}

export default App
