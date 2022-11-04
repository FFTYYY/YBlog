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
	ScrollBarBox , 
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
	concept: "default" , 
	idx: 2333 , 
	abstract: [] , 
	parameters: {} , 
	children: [{children: [{text: "fuck"}]}] , 
}

// TODO 整理按钮栏
// TODO 在保存后还原焦点
class App extends  React.Component<{}, {
	flags?: number

	printer: Printer 
	editorcore: EditorCore
	tree: AbstractNode 

}>{

	editor_ref: React.RefObject<DefaultEditorComponent>

	constructor(props: {}){
		super(props)

		this.state = {		
			printer: undefined , 
			editorcore: undefined , 
			tree: {...default_tree} , 
		}
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

		let root = await Interaction.get.content(BackendData.node_id) || editorcore.create_abstract("root")


		this.setState({
			printer: printer , 
			editorcore: editorcore , 
			tree: root , 
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
			return this.editor_ref.current.get_editor()
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

	componentDidUpdate(){}	

	update_tree(){
		let editor = this.get_editor()
		let root = editor.get_root()
		this.setState({tree: root})
		return root
	}

	render(){
		let me = this
		let {editorcore, printer, tree} = this.state

		if(!(editorcore && printer)){
			return <></>
		}
		if(tree.concept == "default"){
			return <></>
		}

		return <ThemeProvider theme={createTheme(my_theme)}><CssBaseline /><Box sx={{
			position: "absolute" , 
			top: "2%" ,
			left: "1%" , 
			height: "96%" , 
			width: "98%" , 
		}}>
			<Card sx={{
				position: "absolute" , 
				left: "0" , 
				width: "2%" ,
			}}>
				<SaveButton 
					save_func = {me.save_content.bind(me)}
				/>
				<FileManageButton />
				<UploadFileButton />
				<BackendEdit /> 
				<NodeStructEdit /> 
				<NodeStructEditShallow /> 
				<NodeView />
			</Card>

			<Box sx={{
				position: "absolute" , 
				left: "3%" , 
				width: "96%" , 
				height: "100%" , 
			}}>
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
						init_rootchildren = {tree.children} // 编辑器会记住第一次看到的树，所以务必在树初始化之后再渲染编辑器
						onSave = {()=>{
							let root = me.update_tree()
							setTimeout(()=>me.save_content(root), 200) // 等待state更新
							// TODO 直接调用函数没有ui提示
						}}
						theme = {my_theme}
						plugin = { withAllPlugins }
					/>
				</Box>

				<MathJaxContext><ScrollBarBox 
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
				</ScrollBarBox></MathJaxContext>
			</Box>
			
		</Box></ThemeProvider>
	}

}

export default App


