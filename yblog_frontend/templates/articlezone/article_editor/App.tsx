import React , { useState } from "react"
import Drawer from "@mui/material/Drawer"
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import ytext , {YEditor , EditorCore , OutRenderer} from "@ftyyy/ytext"
import {DefaultEditor , group_prototype} from "@ftyyy/ytext"
import {withAllStyles_Editor , withAllStyles_Output , withAllStyles_Interface} from "../components"
import {Node} from "slate"
import {csrftoken} from "../utils"
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

		this.core = withAllStyles_Editor( new EditorCore() )
		this.editor = withAllStyles_Interface( new YEditor( this.core ) )
		this.output = withAllStyles_Output( new OutRenderer( this.core ) )

		this.setState( {value: this.core.root.children} )

		console.log(csrftoken)
	}

	on_fab_click(e:any){
		console.log(e)
	}

	render(){
		let me = this
		let Output = this.output._Component.bind(this.output)

		return <Box><Grid container spacing={2}>
			<Grid item xs={1} key={0}>
				<Fab><AddIcon /></Fab>
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
