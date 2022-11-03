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
} from "../lib"

import * as Slate from "slate"
import * as SlateReact from "slate-react"

import { createTheme, ThemeProvider, styled } from "@mui/material/styles"

import { 
	renderers , 
	default_renderers , 
	editors , 
	default_editors , 
	first_concepts , 
} from "../base/concept"
import { BackendData, Interaction } from "../base/interaction"
import { linkto } from "../base/linkto"
import { FlexibleDrawer , FlexibleItem } from "../base/construction/framework"
import { my_theme } from "../base/construction/theme"
import { SaveButton } from "../base/construction/buttons"
import { withAllPlugins } from "./plugins"
import { FileManageButton } from "./buttons/manage_files"
import { BackendEdit , NodeStructEdit , NodeStructEditShallow , NodeView} from "./buttons/edit_others"
import {parse_second_concepts} from "../base/utils"
import { MathJaxContext } from "../base/construction"

interface AppProps{

}

interface AppState{
	flags?: number

	printer: Printer 
	editorcore: EditorCore
	tree: AbstractNode 
	init_tree: AbstractNode  // 仅仅用来初始化
}

let default_tree = {
	type: "abstract" as "abstract" ,
	concept: "root" , 
	idx: 2333 , 
	abstract: [] , 
	parameters: {} , 
	children: [{children: [{text: "asas"}]}] , 
}


// TODO 整理按钮栏
class App extends  React.Component<AppProps, AppState>{

	editor_ref: React.RefObject<DefaultEditorComponent>
	savebutton_ref: React.RefObject<SaveButton>
	inittree: AbstractNode

	constructor(props: AppProps){
		super(props)

		this.state = {		
			printer: undefined , 
			editorcore: undefined , 
			tree: {...default_tree} , 
			init_tree: {...default_tree} , 
		}
		this.savebutton_ref = React.createRef()
		this.editor_ref = React.createRef()
	}

	async componentDidMount(){

		/** 初始化所有概念信息。 */
		// let node_concepts =  
		let sec_concepts_data = await Interaction.get.concept(BackendData.node_id) as string[] // 从后端获得所有概念。
		let sec_concepts = parse_second_concepts(sec_concepts_data)

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
		var root = await Interaction.get.content(BackendData.node_id) || editorcore.create_abstract("root")

		this.setState({
			printer: printer , 
			editorcore: editorcore , 
			tree: {...root} , 
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
		return await Interaction.post.content({content: this.state.tree} , BackendData.node_id)
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

	get_editor(){
		if(this.editor_ref && this.editor_ref.current){
			return this.editor_ref.current
		}
		return undefined
	}

	update_tree(){
		let editor = this.get_editor()
		if(!editor){
			return 
		}
		let edieditor = editor.get_editor()
		if(edieditor){
			this.setState({tree: edieditor.get_root()})
		}
	}

	mainpart(props: {sx: any}){
		let me = this
		let ExtraButtons = this.extra_buttons.bind(this)

		if(!(this.state.editorcore && this.state.printer)){
			return <></>
		}
		let {editorcore, printer, tree} = this.state
 
		// TODO 因为更新state有延迟，所以不能更新state后立刻保存。		
		return <Box sx={props.sx}>
			<Box sx = {{
				position: "absolute" , 
				width: "49%" ,
				left: "0%" , 
				top: "0" , 
				height: "100%" , 
			}}>
				<DefaultEditorComponent
					ref = {me.editor_ref}
					editorcore = {editorcore}
					init_rootchildren = {this.state.tree.children}
					onSave = {()=>{
						this.update_tree()
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

			<MathJaxContext><Box 
				sx = {{
					position: "absolute" , 
					width: "49%" ,
					left: "51%" , 
					top: "0" , 
					height: "100%" , 
				}} 
				className = "mathjax_process" // 启动mathjax处理
			>
				<GlobalInfoProvider value={{BackendData: BackendData.node_id}}>
					<DefaultPrinterComponent 
						printer = {printer} 
						theme = {my_theme}
						onUpdateCache = {(cache)=>{console.log("cache!")}}
						root = {this.state.tree}
					></DefaultPrinterComponent>
				</GlobalInfoProvider>
			</Box></MathJaxContext>
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
				position: "absolute" , 
				left: "0" , 
				right: "2%" ,
				marginRight: "1%" , 
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
				position: "absolute" , 
				left: "3%" , 
				width: "96%" , 
				height: "100%" , 
			}}/>
			
		</div></Box></ThemeProvider>
	}

}

export default App


