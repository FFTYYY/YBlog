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
import { withAllPlugins } from "./plugins"
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"

var node_id = get_node_id()
interface App_Props{

}

interface App_State{
	flags?: number
	editor?: YEditor
	printer?: Printer
}

class App extends  React.Component<App_Props , App_State>{
	core: EditorCore
	printer_ref: any

	constructor(props: App_Props){
		super(props)

		this.core    = withNecessaryStyle( new EditorCore([] , {}) )
		this.state = {
			editor: withNecessaryEditor( new YEditor( this.core ) ) , 
			printer: withNecessaryPrinter( new Printer( this.core ) ) , 
		}

		this.state.editor.slate = withAllPlugins( this.state.editor.slate ) as ReactEditor

		this.printer_ref = React.createRef()
	}

	/** 完全不知道这是什么逻辑。 */
	async componentDidMount(){
		let my_editor = this.state.editor
		let my_printer = this.state.printer
		var node_components = (await axios.get(`/get_node_components/${node_id}`)).data.components
		for(let [name , meta_name , fixed_params , default_params , extra_params] of node_components){
			let [style , editor , printer] = make_new_style(meta_name , name , fixed_params , default_params , extra_params)
			this.core.add_style(style)
			my_editor.update_renderer (editor  , style.type , style.name)
			my_printer.update_renderer(printer , style.type , style.name)
		}
		this.setState({editor: my_editor , printer: my_printer})

		var node_value = (await axios.get(`/get_node/${node_id}`)).data.content
		Transforms.insertNodes(this.state.editor.slate , node_value as Node[] , {at: [0]})
	}
	
	async save_content(){
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
					editor = {me.state.editor}
					theme = {my_theme}
					onFocusChange = {()=>{
						if(me.state.editor.slate.selection && me.printer_ref  && me.printer_ref.current){
							let pathid = JSON.stringify(me.state.editor.slate.selection.focus.path)
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
					printer = {me.state.printer}
					ref = {this.printer_ref}
					theme = {my_theme}
				/>
			</Box>
		</Box>
	}

	render(){
		let me = this
		let MainPart = this.mainpart.bind(this)

		console.log("group render" , me.state.editor.style_renderers.group)
		console.log("children render" , me.state.editor.slate.children)

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
				<SaveButton save_func={me.save_content.bind(me)}/>
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
