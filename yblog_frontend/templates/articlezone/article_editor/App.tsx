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

} from "../../../lib"

import { ReactEditor } from "slate-react"
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
import { Node , Transforms , Element } from "slate"
import { createEditor , BaseEditor , Path , BaseElement } from "slate"
import { Slate, Editable, withReact} from "slate-react"

import { withAllStyles , withAllPrinters , withAllEditors , make_proxy , withNecessaryProxies , } from "../base/styles"
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
}

class App extends  React.Component<App_Props , {
	editor_proxies: {[key in StyleType]: {[name: string]: Proxy}}
}>{
	core: EditorCore

	editor_renderers: StyleCollector<EditorRenderer_Func>
	printer_renderers: StyleCollector<PrinterRenderer>

	printer_ref: React.RefObject<DefaultPrinter>
	editor_ref: React.RefObject<DefaultEditor>

	constructor(props: App_Props){
		super(props)

		this.core = withAllStyles( new EditorCore([] , {
			title: {
				val: "" , 
				type: "string" , 
			} , 
		}) )
		this.editor_renderers = withAllEditors( new StyleCollector<EditorRenderer_Func>(this.core , default_editor_renderers) )
		this.printer_renderers = withAllPrinters( new StyleCollector<PrinterRenderer>(this.core , default_printer_renderers) )

		this.state = {			
			editor_proxies: withNecessaryProxies({
				inline: {},
				group: {}, 
				struct: {},
				support: {} ,  
				abstract: {} , 
			}) , 
		}

		this.editor_ref  = React.createRef()
		this.printer_ref = React.createRef()
	}

	/** 完全不知道这是什么逻辑。 */
	async componentDidMount(){
		let proxies = withNecessaryProxies({
			inline: {},
			group: {}, 
			struct: {},
			support: {} ,  
			abstract: {} , 
		})
		let node_concepts = await Interaction.get.concept() // 从后端获得所有概念。
		for(let [name , meta_name , fixed_params , default_params ] of node_concepts){

			let proxy = make_proxy(meta_name , name , fixed_params , default_params)
			proxies[proxy.get_styletype()][name] = proxy
		}
		this.setState({ editor_proxies: proxies })

		var root = await Interaction.get.content()
		root = root || {children: [paragraph_prototype("")] , parameters: {}}

		set_normalize_status({initializing: true})

		// let to_remove = this.state.editor.slate.children.map((_,idx)=>Number(idx))
		// Transforms.removeNodes(this.state.editor.slate , {at: to_remove}) // 删除所有现存子节点
		// Transforms.insertNodes(this.state.editor.slate , root.children , {at: [0]}) // 插入内容
		
		set_normalize_status({initializing: false})
	}

	get_editor(){
		if(this.editor_ref && this.editor_ref.current){
			return this.editor_ref.current.get_editor()
		}
		return undefined
	}
	get_printer(){
		if(this.printer_ref && this.printer_ref.current){
			return this.printer_ref.current.get_printer()
		}
		return undefined
	}
	
	async save_content(){
		// var data = {"content": this.core.root}
		// return await Interaction.post.content(data)
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
					ref 		= {me.editor_ref}
					core 		= {me.core}
					renderers 	= {me.editor_renderers}
					proxies 	= {me.state.editor_proxies}
					
					theme = {my_theme}

					onFocusChange = {()=>{
						// if(slate.selection && me.printer_ref  && me.printer_ref.current){
						// 	me.printer_ref.current.scroll_to(slate.selection.focus.path)
						// }
					}}
					onUpdate = {(v)=>{
						
						let printer = me.get_printer()
						let editor = me.get_editor()
						if(printer && editor){
							printer.update(editor.get_root())
						}
					}}
					extra_buttons = {<ExtraButtons />}

					plugin = { withAllPlugins }
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
					ref = {this.printer_ref}

					core = {this.core}
					renderers = {this.printer_renderers}
				
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
				<HandleMathBuutton get_editor={()=>me.get_editor()} /> 
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


/**	以下是一个调试用的mainpart。
 * 
 * return <Box sx={props.sx}>
			<Box sx = {{
				position: "absolute" , 
				width: "49%" ,
				left: "0%" , 
				top: "0" , 
				height: "100%" , 
			}}>
				<DefaultEditor 
					ref 		= {me.editor_ref}
					core 		= {me.core}
					renderers 	= {me.editor_renderers}
					proxies 	= {me.state.editor_proxies}
					
					theme = {my_theme}

					onFocusChange = {()=>{
						// if(slate.selection && me.printer_ref  && me.printer_ref.current){
						// 	me.printer_ref.current.scroll_to(slate.selection.focus.path)
						// }
					}}
					onUpdate = {(v)=>{
						// console.log(me.core.root)
						if(me.printer_ref && me.printer_ref.current){
							me.printer_ref.current.forceUpdate()
						}
					}}
					extra_buttons = {<ExtraButtons />}

					plugin = { withAllPlugins }
				/>
			</Box>

			<Box sx = {{
				position: "absolute" , 
				width: "49%" ,
				left: "51%" , 
				top: "0" , 
				height: "100%" , 
			}}>
				{(()=>{
					function V({js}){
						if(js == undefined)
							return <></>
						if(typeof(js) == "string" || typeof(js) == "number" || typeof(js) == "boolean")
							return <div>{js}</div>
						return <>{Object.keys(js).map((k,idx)=><div key={idx}>
							[{k}] :
							<div  style={{marginLeft: "20px"}}><V js={js[k]}/></div>
						</div>)}</>
					}
					class R extends React.Component{
						constructor(props){
							super(props)
						}
						// render(){return <div>{JSON.stringify( (me.get_editor()||{get_root:()=>{}}).get_root() )}</div>}
						render(){return <V js={(me.get_editor()||{get_root:()=>{}}).get_root()} />}
					}
					return <R ref ={me.printer_ref}></R>
				})()}
			</Box>
		</Box>
 */