import React , { useState } from "react"
import Drawer from "@mui/material/Drawer"
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ytext , {YEditor , EditorCore , OutRenderer} from "@ftyyy/ytext"
import {DefaultEditor , group_prototype} from "@ftyyy/ytext"
import {withAllStyles_Editor , withAllStyles_Output , withAllStyles_Interface} from "../components"
import {Node} from "slate"
import { axios , get_node_id } from '../utils'

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
		this.state = {
			value: []
		}

		this.core   = withAllStyles_Editor( new EditorCore() )
		this.editor = withAllStyles_Interface( new YEditor( this.core ) )
		this.output = withAllStyles_Output( new OutRenderer( this.core ) )

		this.setState( {value: this.core.root.children} )
	}

	async componentDidMount(){
		this.core   = withAllStyles_Editor( new EditorCore() )
		this.editor = withAllStyles_Interface( new YEditor( this.core ) )
		this.output = withAllStyles_Output( new OutRenderer( this.core ) )

		this.setState( {value: this.core.root.children} )

		
		var node_content = (await axios.get(`/get_node/${node_id}`)).data.content
		console.log(node_content)
		var node_value = {}
		if(node_content != "")
			node_value = JSON.parse(node_content)
			console.log(node_content)
		
		//this.setState({value: node_value as Node[]})
	}
	on_click_save(e: any){
		var data = {"content": this.state.value}
		console.log(data)
		axios.post( `/post_node/${node_id}` , data)
	}
	render(){
		let me = this
		let Output = this.output._Component.bind(this.output)

		return <Box><Grid container spacing={2}>
			<Grid item xs={1} key={0}>
				<Button onClick={me.on_click_save.bind(me)}>Save</Button>
			</Grid>

			<Grid item xs={5} key={1}>
				<DefaultEditor 
					editor = {me.editor}
					onUpdate={newval => {
						me.setState({value: newval})
					}}
				/>
			</Grid>
			<Grid item xs={5} key={2}>
				<Output 
					element = {{...group_prototype("root" , {}) , ...{children: me.state.value}}}
				/>
			</Grid>

		</Grid></Box>	
	}

}

export default App
