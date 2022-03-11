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
	DriveFolderUpload as DriveFolderUploadIcon
} from "@mui/icons-material"

import {
	YEditor , 
	EditorCore , 
	Printer , 
	DefaultPrinter , 
	DefaultEditor , 
	AutoStack , 
	AutoIconButton , 
	paragraph_prototype , 

} from "../../../lib"

import { ReactEditor } from "slate-react"
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
import { Node , Transforms , Element } from "slate"

import { make_new_style , apply_style , withNecessaryEditor , withNecessaryPrinter , withNecessaryStyle} from "../base/styles"
import { Interaction } from "../base/interaction"
import { FlexibleDrawer , FlexibleItem } from "../base/construction/framework"
import { my_theme } from "../base/construction/theme"
import { SaveButton } from "../base/construction/buttons"
import { withAllPlugins , set_normalize_status } from "./plugins"
import { MathJaxContext } from "../base/mathjax"
import { FileManageButton } from "./buttons/manage_files"
import { HandleMathBuutton } from "./buttons/handle_math"

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

		this.core    = withNecessaryStyle( new EditorCore([] , {
			title: "" , 
		}) )
		this.state = {
			editor: withAllPlugins( withNecessaryEditor( new YEditor( this.core ) ) ), 
			printer: withNecessaryPrinter( new Printer( this.core ) ) , 
		}

		this.printer_ref = React.createRef()
	}

	/** 完全不知道这是什么逻辑。 */
	async componentDidMount(){
		let my_editor = this.state.editor
		let my_printer = this.state.printer
		let node_concepts = await Interaction.get.concept() // 从后端获得所有概念。
		for(let [name , meta_name , fixed_params , default_params , extra_params] of node_concepts){
			let [style , editor , printer] = make_new_style(meta_name , name , fixed_params , default_params , extra_params)
			this.core.add_style(style)
			if(style.type != "abstract"){
				my_editor.update_renderer (editor  , style.type , style.name)
				my_printer.update_renderer(printer , style.type , style.name)
			}
		}
		this.setState({editor: my_editor , printer: my_printer})

		var root = await Interaction.get.content()
		root = root || {children: [paragraph_prototype("")] , parameters: {}}

		set_normalize_status({initializing: true})

		let to_remove = this.state.editor.slate.children.map((_,idx)=>Number(idx))
		Transforms.removeNodes(this.state.editor.slate , {at: to_remove}) // 删除所有现存子节点
		Transforms.insertNodes(this.state.editor.slate , root.children , {at: [0]}) // 插入内容
		this.core.update_root({parameters: {...this.core.root.parameters , ...root.parameters}})
		
		set_normalize_status({initializing: false})
	}
	
	async save_content(){
		var data = {"content": this.core.root}
		return await Interaction.post.content(data)
	}
	async post_file(files: any){
		var form_data = new FormData()
		form_data.append("file" , files[0])
		return await Interaction.post.file(form_data)
	}

	extra_buttons(props: {}){
		let me = this
		return <React.Fragment>
			<label>
				<input 
					type = "file"  
					style = {{display: "none"}}
					onChange = {(e)=>{
						if(e.target.files.length > 0){
							me.post_file(e.target.files)
						}
					}}
				/>
				<AutoIconButton 
					title = "上传"
					icon = {DriveFolderUploadIcon}
					component = "span"
				/>
			</label>
		</React.Fragment>
	}

	mainpart(props: {sx: any}){
		let me = this
		let ExtraButtons = this.extra_buttons.bind(this)
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
							me.printer_ref.current.scroll_to(me.state.editor.slate.selection.focus.path)
						}
					}}
					onUpdate = {()=>{
						// console.log(me.core.root)
					}}
					extra_buttons = {<ExtraButtons />}
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

		return <ThemeProvider theme={createTheme(my_theme)}><Box sx={{
			position: "absolute" , 
			top: "2%" ,
			left: "1%" , 
			height: "96%" , 
			width: "98%" , 
			display: "flex" , 
		}}><MathJaxContext>

			<FlexibleDrawer sx={{
				marginRight: "1%"
			}}>
				<SaveButton save_func={me.save_content.bind(me)}/>
				<FileManageButton />
				<HandleMathBuutton editor={me.state.editor} />
			</FlexibleDrawer>

			<MainPart sx={{
				position: "relative" , 
				width: "100%" , 
				height: "100%" , 
				flex: 1 , 
			}}/>
			
		</MathJaxContext></Box></ThemeProvider>
	}

}

export default App
