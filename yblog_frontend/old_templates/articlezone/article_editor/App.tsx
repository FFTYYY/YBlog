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
	EditorComponent , 
	ConceptNode , 
	Node , 
	AbstractNode , 
	GroupNode , 
	EditorCore , 
	AutoStack , 
	AutoIconButton , 
	PrinterRenderer , 
	set_normalize_status , 
	Printer , 
	SecondClassConcept , 

	DefaultEditorComponent , 
	DefaultPrinterComponent , 

	GlobalInfoProvider, 
	SecondClassConceptDict, 
} from "../../../lib"

import * as Slate from "slate"
import * as SlateReact from "slate-react"

import { createTheme, ThemeProvider, styled } from "@mui/material/styles"

import { 
	renderers , 
	default_renderers , 
	editors , 
	default_editors , 
	first_concepts , 
} from "../base/styles"
import { BackendData, Interaction } from "../base/interaction"
import { linkto } from "../base/linkto"
import { FlexibleDrawer , FlexibleItem } from "../base/construction/framework"
import { my_theme } from "../base/construction/theme"
import { SaveButton } from "../base/construction/buttons"
import { withAllPlugins } from "./plugins"
import { FileManageButton } from "./buttons/manage_files"
import { BackendEdit , NodeStructEdit , NodeStructEditShallow , NodeView} from "./buttons/edit_others"

import { second_concepts } from "./temp/second_concept"
import { convert_old_tree } from "./temp/tree"

// TODO 正确地读入树和概念数据。

interface AppProps{

}

interface AppState{
	flags?: number

	printer: Printer 
	editorcore: EditorCore
	tree: AbstractNode 
}

function get_second_concepts(){
	return second_concepts
}

class App extends  React.Component<AppProps, AppState>{

	savebutton_ref: React.RefObject<SaveButton>

	constructor(props: AppProps){
		super(props)

		this.state = {		
			printer: undefined , 
			editorcore: undefined , 
			tree: {
				type: "abstract" ,
				concept: "root" , 
				idx: 2333 , 
				abstract: [] , 
				parameters: {} , 
				children: [] , 
			} , 
		}
		this.savebutton_ref = React.createRef()
	}

	async componentDidMount(){

		/** 初始化所有概念信息。 */
		// let node_concepts = await Interaction.get.concept(BackendData.node_id) // 从后端获得所有概念。
		let sec_concepts = get_second_concepts() as SecondClassConcept []

		let printer = new Printer(
			first_concepts , 
			sec_concepts , 
			renderers , 
			default_renderers , 
		)
		
		let editorcore = new EditorCore({
			renderers: editors , 
			default_renderers: default_editors, 
			printer: printer , 
		})
		
		/** 初始化编辑器初始值。 */
		var root = await Interaction.get.content(BackendData.node_id)
		if(root){
			root = convert_old_tree(root)
		}
		else{
			editorcore.create_abstract("root")
		}
		// set_normalize_status({initializing: true})

		this.setState({
			printer: printer , 
			editorcore: editorcore , 
			tree: root , 
		})

		//初始化跳转
		if(BackendData.linkto && BackendData.linkto != "None"){
			linkto(printer , Number(BackendData.linkto))
		}
	}

	get_save_button(){
		if(this.savebutton_ref && this.savebutton_ref.current){
			return this.savebutton_ref.current
		}
		return undefined
	}

	async save_content(){
		return await Interaction.post.content(this.state.tree , BackendData.node_id)
	}

	async post_file(files: any){
		var form_data = new FormData()
		form_data.append("file" , files[0])
		return await Interaction.post.file(form_data , BackendData.node_id)
	}

	extra_buttons(props: {}){
		let me = this
		return <React.Fragment>
			<Box sx={{marginX: "auto"}}><label>
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
			</label></Box>
		</React.Fragment>
	}

	update_tree(new_tree: AbstractNode){
		this.setState({
			tree: new_tree
		})
	}

	mainpart(props: {sx: any}){
		let me = this
		let ExtraButtons = this.extra_buttons.bind(this)

		if(!(this.state.editorcore && this.state.printer)){
			return <></>
		}
		let {editorcore, printer, tree} = this.state

		return <Box sx={props.sx}>
			<Box sx = {{
				position: "absolute" , 
				width: "49%" ,
				left: "0%" , 
				top: "0" , 
				height: "100%" , 
			}}>
				<DefaultEditorComponent
					editorcore = {this.state.editorcore}
					init_rootchildren = {tree.children}
					onSave = {()=>{
						let save_button = me.get_save_button()
						if(save_button){
							save_button.click()
						}
					}}
					theme = {my_theme}
					plugin = { withAllPlugins }
					sidebar_extra = {()=>{return [{
						button: <ExtraButtons /> , 
						run: ()=>{console.log("啊？")} , 
					}]}}
				/>
			</Box>

			<Box sx = {{
				position: "absolute" , 
				width: "49%" ,
				left: "51%" , 
				top: "0" , 
				height: "100%" , 
			}}>
				<GlobalInfoProvider value={{BackendData: BackendData.node_id}}>
					<DefaultPrinterComponent 
						printer = {printer} 
						theme = {my_theme}
						onUpdateCache = {(cache)=>{console.log("cache!")}}
						root = {this.state.tree}
					></DefaultPrinterComponent>
				</GlobalInfoProvider>
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
		}}><div>

			<FlexibleDrawer sx={{
				marginRight: "1%"
			}}>
				<SaveButton 
					ref = {me.savebutton_ref}
					save_func = {me.save_content.bind(me)}

				/>
				<FileManageButton />
				{/* <HandleMathBuutton get_editor={()=>me.get_editor()} /> */}
				<BackendEdit /> 
				<NodeStructEdit /> 
				<NodeStructEditShallow /> 
				<NodeView />
			</FlexibleDrawer>

			<MainPart sx={{
				position: "relative" , 
				width: "100%" , 
				height: "100%" , 
				flex: 1 , 
			}}/>
			
		</div></Box></ThemeProvider>
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