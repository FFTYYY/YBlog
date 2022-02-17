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

import AddIcon from '@mui/icons-material/Add';
import {YEditor , EditorCore , Printer , DefaultPrinter} from "../../../lib"
import {DefaultEditor , group_prototype} from "../../../lib"
import {withAllStyles , withAllEditors , withAllPrinters} from "../components"
import {Node , Transforms , Element } from "slate"
import {ReactEditor} from "slate-react"
import { axios , get_node_id } from '../utils'
import { FlexibleDrawer , FlexibleItem } from "../theme/framework"
import { withAllPlugins } from "./plugins"

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

	constructor(props: App_Props){
		super(props)

		this.core    = withAllStyles		( new EditorCore([] , {}) )
		this.editor  = withAllEditors	( new YEditor( this.core ) )
		this.printer = withAllPrinters	( new Printer( this.core ) )

		this.editor.slate = withAllPlugins( this.editor.slate ) as ReactEditor
	}

	async componentDidMount(){
		var node_content = (await axios.get(`/get_node/${node_id}`)).data.content
		var node_value = {}
		if(node_content != "")
			node_value = JSON.parse(node_content)
		
		Transforms.removeNodes( this.editor.slate , {at: [0]}) // 删除遗留的节点
		Transforms.insertNodes(this.editor.slate , node_value as Node[] , {at: [0]})
	}
	
	on_click_save(e: any){
		var data = {"content": this.core.root.children}
		axios.post( `/post_node/${node_id}` , data)
	}

	mainpart(props: {}){
		let me = this

		return <React.Fragment>
			<Box sx = {{
				position: "absolute" , 
				width: "45%" ,
				left: "10%" , 
				height: "100%" , 
			}}>
				<DefaultEditor editor = {me.editor}/>
			</Box>

			<Box sx = {{
					position: "absolute" , 
					width: "45%" ,
					left: "55%" , 
					height: "100%" , 
					backgroundColor: "#AABBCC" , 
					overflow: "auto" , 
			}}>
				<DefaultPrinter
					printer = {me.printer}
				/>
			</Box>
		</React.Fragment>
	}

	render(){
		let me = this
		let MainPart = this.mainpart.bind(this)

		return <Box><Stack spacing={2} direction="row">

			<FlexibleDrawer>
				<FlexibleItem 
					open_item = {"hahhahahahaa"}
					close_item = {"ha"}
				/>
				<FlexibleItem 
					open_item = {"Save"}
					close_item = {"S"}
					onClick = {me.on_click_save.bind(me)}
				/>
			</FlexibleDrawer>

			<MainPart />
			
		</Stack></Box>
	}

}

export default App
