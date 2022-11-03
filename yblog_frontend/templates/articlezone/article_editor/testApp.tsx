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
	Container, 
	Typography, 
	Card , 
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
import { my_theme } from "./uibase"
import { SaveButton} from "./buttons"
import { withAllPlugins } from "./plugins"
import { FileManageButton , UploadFileButton } from "./buttons/manage_files"
import { BackendEdit , NodeStructEdit , NodeStructEditShallow , NodeView} from "./buttons/edit_others"
import { parse_second_concepts } from "../base/utils"
import { MathJaxContext } from "../base/construction"
import CssBaseline from '@mui/material/CssBaseline';

let default_tree = {
	type: "abstract" as "abstract" ,
	concept: "root" , 
	idx: 2333 , 
	abstract: [] , 
	parameters: {} , 
	children: [{children: [{text: "fuck"}]}] , 
}

class App extends React.Component{
	constructor(props: {}){
		super(props)
	}

	render(): React.ReactNode {
		return <ThemeProvider theme = {createTheme(my_theme)}>
			<Paper sx={{
				position: "absolute" , 
				left: "1%" , 
				top: "1%" , 
				width: "20%" , 
				height: "20%" , 
			}}>
				<Typography>Paper</Typography>
				<Paper elevation={2} sx={{
					position: "absolute" , 
					left: "1%" , 
					top: "11%" , 
					width: "20%" , 
					height: "20%" , 
				}}>
					<Typography>SubPaper</Typography>
				</Paper>
				<Box sx={{
					position: "absolute" , 
					left: "21%" , 
					top: "31%" , 
					width: "20%" , 
					height: "20%" , 
					border: "1px solid" , 
				}}>
					<Typography>SubBox</Typography>
				</Box>
				<Card sx={{
					position: "absolute" , 
					left: "41%" , 
					top: "51%" , 
					width: "20%" , 
					height: "20%" , 
				}}>
					<Typography>SubCard</Typography>
				</Card>

			</Paper>
			<Box sx={{
				position: "absolute" , 
				left: "21%" , 
				top: "21%" , 
				width: "20%" , 
				height: "20%" , 
				border: "1px solid" , 
			}}>
				<Typography>Box</Typography>
			</Box>
			<Card sx={{
				position: "absolute" , 
				left: "41%" , 
				top: "41%" , 
				width: "20%" , 
				height: "20%" , 
			}}>
				<Typography>Card</Typography>
			</Card>
		</ThemeProvider>
	}
}

// TODO 整理按钮栏
// TODO 在保存后还原焦点
class _App extends  React.Component<{}, {
	flags?: number

	printer: Printer 
	editorcore: EditorCore
	tree: AbstractNode 

}>{

	editor_ref: React.RefObject<DefaultEditorComponent>
	savebutton_ref: React.RefObject<SaveButton>

	constructor(props: {}){
		super(props)

		this.state = {		
			printer: undefined , 
			editorcore: undefined , 
			tree: {...default_tree} , 
		}
		this.savebutton_ref = React.createRef()
		this.editor_ref = React.createRef()
	}

	async componentDidMount(){

		// 从后端获得所有概念。
		let sec_concepts_data = await Interaction.get.concept(BackendData.node_id) as string[]
		let sec_concepts = parse_second_concepts(sec_concepts_data)

		// 建立印刷器核心
		let printer = new Printer(
			first_concepts , 
			sec_concepts , 
			renderers , 
			default_renderers , 
		)
		
		// 建立编辑器核心
		let editorcore = new EditorCore({
			renderers: editors , 
			default_renderers: default_editors, 
			printer: printer , 
		})
		
		// 初始化编辑器初始值。
		var root = await Interaction.get.content(BackendData.node_id) || editorcore.create_abstract("root")

		this.setState({
			printer: printer , 
			editorcore: editorcore , 
			tree: {...root} , 
		})


		// 初始化跳转
		// TODO 这个没有生效。
		if(BackendData.linkto && BackendData.linkto != "None"){
			linkto(printer , Number(BackendData.linkto))
		}

	}

	/** 获得编辑器对象。 */
	get_editor(){
		if(this.editor_ref && this.editor_ref.current){
			return this.editor_ref.current
		}
		return undefined
	}

	/** 这个函数将编辑器的树保存到后端。 
	 * @param tree 要保存的树。之所以有这个参数是因为state的更新有延迟，这个参数可以允许调用者直接传入最新的版本。
	*/
	async save_content(tree: AbstractNode | undefined = undefined){
		if(tree == undefined){
			tree = this.state.tree
		}
		return await Interaction.post.content({content: this.state.tree} , BackendData.node_id)
	}

	/** 这个函数向后端提交一个文件。 */
	async post_file(files: HTMLInputElement["files"]){
		var form_data = new FormData()
		form_data.append("file" , files[0])
		return await Interaction.post.file(form_data , BackendData.node_id)
	}


	update_tree(){
		let editor = this.get_editor()
		if(!(editor && editor.get_editor())){
			return 
		}
		let edieditor = editor.get_editor()
		let root = edieditor.get_root()
		this.setState({tree: root})
		return root
	}

	mainpart(props: {sx: any}){
		let me = this

		if(!(this.state.editorcore && this.state.printer)){
			return <></>
		}
		let {editorcore, printer, tree} = this.state
 
		return <Box sx={props.sx}>
			<Paper sx = {{
				position: "absolute" , 
				width: "49%" ,
				left: "0%" , 
				top: "0" , 
				height: "100%" , 
			}}>
				<DefaultEditorComponent
					ref = {me.editor_ref}
					editorcore = {editorcore}
					init_rootchildren = {tree.children}
					onSave = {()=>{
						let root = me.update_tree()
						setTimeout(()=>me.save_content(root), 200) // 等待state更新
						// TODO 直接调用函数没有ui提示
					}}
					theme = {my_theme}
					plugin = { withAllPlugins }
				/>
			</Paper>

			<MathJaxContext><Paper 
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
						root = {tree}
					></DefaultPrinterComponent>
				</GlobalInfoProvider>
			</Paper></MathJaxContext>
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
		}}>
			<Paper sx={{
				position: "absolute" , 
				left: "0" , 
				width: "2%" ,
			}}>
				<SaveButton 
					ref = {me.savebutton_ref}
					save_func = {me.save_content.bind(me)}
				/>
				<FileManageButton />
				<UploadFileButton/>
				<BackendEdit /> 
				<NodeStructEdit /> 
				<NodeStructEditShallow /> 
				<NodeView />
			</Paper>

			<MainPart sx={{
				position: "absolute" , 
				left: "3%" , 
				width: "96%" , 
				height: "100%" , 
			}}/>
			
		</Box></ThemeProvider>
	}

}

export default App


