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


import { withAllStyles , withAllEditors , withAllPrinters} from "../components"
import { Node , Transforms , Element } from "slate"
import { ReactEditor } from "slate-react"
import { axios , get_node_id } from '../utils'
import { FlexibleDrawer , FlexibleItem } from "../construction/framework"
import { my_theme } from "../construction/theme"
import { SaveButton } from "../construction/buttons"
import { withAllPlugins } from "./plugins"
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"

var node_id = get_node_id()
interface App_Props{

}

interface App_State{
	value: Node[]
}
class App extends  React.Component<App_Props , App_State>{
	editor: YEditor
	core: EditorCore
	printer: Printer
	printer_ref: any

	constructor(props: App_Props){
		super(props)

		this.core    = withAllStyles	( new EditorCore([] , {}) )
		this.editor  = withAllEditors	( new YEditor( this.core ) )
		this.printer = withAllPrinters	( new Printer( this.core ) )

		this.editor.slate = withAllPlugins( this.editor.slate ) as ReactEditor

		this.printer_ref = React.createRef()
	}

	async componentDidMount(){
		var node_value = (await axios.get(`/get_node/${node_id}`)).data.content
		Transforms.insertNodes(this.editor.slate , node_value as Node[] , {at: [0]})

		var node_components = (await axios.get(`/get_node_components/${node_id}`)).data.components
		// TODO 应用这个。

		console.log(node_components)
		
	}
	
	async on_click_save(e: any){
		var data = {"content": this.core.root.children}
		let ret = await axios.post( `/post_node/${node_id}` , data)
		return ret.data.status
	}

	mainpart(props: {sx: any}){
		let me = this

		return <Box sx={props.sx}>
			<Box sx = {{
				position: "absolute" , 
				width: "49%" ,
				left: "0%" , 
				top: "0" , 
				height: "100%" , 
			}}>
				<DefaultEditor 
					editor = {me.editor}
					theme = {my_theme}
					onFocusChange = {()=>{
						if(me.editor.slate.selection && me.printer_ref  && me.printer_ref.current){
							let pathid = JSON.stringify(me.editor.slate.selection.focus.path)
							me.printer_ref.current.scroll_to(pathid)
						}
					}}
				/>
			</Box>

			<Box sx = {{
				position: "absolute" , 
				width: "49%" ,
				left: "51%" , 
				top: "0" , 
				height: "100%" , 
			}}>
				<DefaultPrinter
					printer = {me.printer}
					ref = {this.printer_ref}
					theme = {my_theme}
				/>
			</Box>
		</Box>
	}

	render(){
		let me = this
		let MainPart = this.mainpart.bind(this)

		return <ThemeProvider theme={createTheme(my_theme)}><Box sx={{
				position: "absolute" , 
				top: "2%" ,
				left: "1%" , 
				height: "96%" , 
				width: "98%" , 
				display: "flex" , 
			}}>

			<FlexibleDrawer sx={{
				marginRight: "1%"
			}}>
				<SaveButton save_func={me.on_click_save.bind(me)}/>
			</FlexibleDrawer>

			<MainPart sx={{
				position: "relative" , 
				width: "100%" , 
				height: "100%" , 
				flex: 1 , 
			}}/>
			
		</Box></ThemeProvider>
	}

}

export default App
