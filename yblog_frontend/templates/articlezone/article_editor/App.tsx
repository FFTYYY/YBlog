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
	PrinterCache , 
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
import { SaveButton } from "./outside_buttons"
import { withAllPlugins } from "./plugins"
import { FileManageButton , UploadFileButton } from "./outside_buttons/manage_files"
import { BackendEdit , NodeStructEdit , NodeStructEditShallow , NodeView} from "./outside_buttons/redirect"
import { parse_second_concepts } from "../base/utils"
import { MathJaxContext } from "../base/construction"
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider  } from 'notistack';

class App extends  React.Component<{}, {
	flags?: number

	printer: Printer  | undefined
	editorcore: EditorCore | undefined
	tree: AbstractNode  | undefined
	cache: PrinterCache
}>{

	editor_ref: React.RefObject<DefaultEditorComponent>
	snackerbar_ref: React.RefObject<SnackbarProvider>

	constructor(props: {}){
		super(props)

		this.state = {		
			printer: undefined , 
			editorcore: undefined , 
			tree: undefined , 
			cache: undefined , 
		}
		this.editor_ref = React.createRef()
		this.snackerbar_ref = React.createRef()
	}

	open_snackerbar(message: string){
		if(this.snackerbar_ref && this.snackerbar_ref.current){
			this.snackerbar_ref.current.enqueueSnackbar(message)
		}
	}

	async componentDidMount(){

		// 从后端获得所有概念。
		let sec_concepts_data = await Interaction.get.concept(BackendData.node_id) as string[]
		let sec_concepts = parse_second_concepts(sec_concepts_data)

		// 建立印刷器核心。
		let printer = new Printer(
			first_concepts , 
			sec_concepts , 
			renderers , 
			default_renderers , 
		)
		
		// 建立编辑器核心。
		let editorcore = new EditorCore({
			renderers: editors , 
			default_renderers: default_editors, 
			printer: printer , 
		})

		// 获得树。
		let root = await Interaction.get.content(BackendData.node_id)
		if(!root){
			root = editorcore.create_abstract("root")
			root.parameters = {
				title: "<Unknown Title>"
			}
		}

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
	async save_content(tree: AbstractNode | undefined = undefined, cache: PrinterCache | undefined = undefined){
		if(tree == undefined){
			tree = this.state.tree
		}
		if(cache == undefined){
			cache = this.state.cache
		}
		let success_1 = await Interaction.post.content({content: tree} , BackendData.node_id)
		let success_2 = await Interaction.post.cache  ({cache : cache} , BackendData.node_id)
		this.open_snackerbar((success_1 && success_2) ? "保存成功" : "保存失败")
	}

	update_tree(){
		let editor = this.get_editor()
		if(!editor){
			return 
		}
		let root = editor.get_root()
		this.setState({tree: root})
		return root
	}

	render(){
		let me = this
		let {editorcore, printer, tree} = this.state

		if(!(editorcore && printer && tree)){
			return <></>
		} // 务必等一切都初始化好再开始渲染。

		let [tree_property, tree_children] = (()=>{
			let {children , ...tree_property} = tree
			return [tree_property , children]
		})()

		return <ThemeProvider theme={createTheme(my_theme)}><SnackbarProvider 
				maxSnack = {3} 
				ref = {me.snackerbar_ref}
				anchorOrigin = {{horizontal: "right" , vertical: "top"}}
				variant = {"info"}
			>
			<CssBaseline /><Box sx={{
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
					<SaveButton save_func = {me.save_content.bind(me)}/>
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
							init_rootproperty = {tree_property}
							init_rootchildren = {tree_children} // 编辑器会记住第一次看到的树，所以务必在树初始化之后再渲染编辑器
							onSave = {()=>{
								let root = me.update_tree()
								setTimeout(()=>me.save_content(root), 200) // 等待state更新
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
								onUpdateCache = {(cache)=>{
									if(cache && JSON.stringify(cache) != JSON.stringify(me.state.cache)){
										// XXX 这里会报warning，这是因为printer里在render()里调用了这个函数...
										setTimeout(()=>me.setState({cache: cache}) , 200)
									}
								}}
								root = {tree}
							></DefaultPrinterComponent>
						</GlobalInfoProvider>
					</ScrollBarBox></MathJaxContext>
				</Box>
				
			</Box>
		</SnackbarProvider></ThemeProvider>
	}

}

export default App

