import React , { useState } from "react"
import Drawer from "@mui/material/Drawer"
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {YEditor , EditorCore , OutRenderer} from "@ftyyy/ytext"
import {DefaultEditor , group_prototype} from "@ftyyy/ytext"
import {withAllStyles_Editor , withAllStyles_Output , withAllStyles_Interface} from "../components"
import {Node , Transforms} from "slate"
import { axios , get_node_id } from '../utils'
import {FlexibleDrawer , FlexibleItem} from "../theme/framework"
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

var node_id = get_node_id()
interface App_Props{

}

interface App_State{
	value: Node[]
}
class App extends  React.Component<App_Props , App_State>{
	editor: YEditor
	core: EditorCore
	output: OutRenderer

	constructor(props: App_Props){
		super(props)

		this.core   = withAllStyles_Editor( new EditorCore() )
		this.editor = withAllStyles_Interface( new YEditor( this.core ) )
		this.output = withAllStyles_Output( new OutRenderer( this.core ) )
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
	render(){
		let me = this

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

			<Grid container>
				<Grid item xs={6}><DefaultEditor 
					editor = {me.editor}
				/></Grid>
				<Grid item xs={6}><OutRenderer.Component
					renderer = {me.output}
				/></Grid>
			</Grid>
		</Stack></Box>
	}

}

export default App
