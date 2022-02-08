/** 
 * 这个文件提供一个开箱即用的editor示例。
 * @module
 */
 import React from "react"
 import Button from "@mui/material/Button"

import type { StyleType , NodeType } from "../core/elements"

import { Node } from "slate"


import { YEditor } from "../editor_interface"
import { new_default_group } from "./groups"
import { new_default_iniline } from "./inlines"
import { newparagraph } from "./supports"
import {EditorCore , InlineStyle , GroupStyle , StructStyle , SupportStyle , AbstractStyle} from "../core/editor_core"
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';

import SettingsIcon from '@mui/icons-material/Settings';
import Switch from '@mui/material/Switch';
import {DefaultHidden} from "./hidden"
import {DefaultParameterWithEditorWithDrawer} from "./universe"


export { DefaultEditor }
interface DefaultEditor_State{
	acc_expd: {[key in StyleType]: boolean}
	param_drawer_open: boolean
}

interface DefaultEditor_Props{
	editor: YEditor
	onUpdate?: (newval: Node[]) => void
	onMount?: () => void
}

/** 
 * 这个组件提供一个开箱即用的默认编辑器组件。
 */
class DefaultEditor extends React.Component <DefaultEditor_Props , DefaultEditor_State> {
	editor: YEditor
	onUpdate: (newval: Node[]) => void
	onMount: ()=>void

	constructor(props: DefaultEditor_Props) {
		super(props)
		this.state = {
			acc_expd: {
				group: true , 
				inline: true , 
				support: true , 
				struct: true , 
			} , 
			param_drawer_open: false , 
		}

		this.editor = props.editor
		this.onUpdate = props.onUpdate || ((newval: Node[])=>{})
		this.onMount  = props.onMount || (()=>{})
    }
	componentDidMount(): void {
		this.onMount()	
	}
	render() {

		let me = this
		return <div style={{marginLeft: "1%", marginRight: "1%"}}><Grid container>
			<Grid item xs={10}><YEditor.Component editor={me.editor} onUpdate={me.onUpdate}/></Grid>
			<Grid item xs={2}><Stack spacing={2}>
				<ButtonGroup orientation="vertical">
					<IconButton onClick={e=>me.setState({param_drawer_open: true})}>  <SettingsIcon/> </IconButton> 
					<DefaultHidden 
						editor = {me.editor} 
						element = {me.editor.core.root} 
						orientation = "vertical"
					/>
				</ButtonGroup>
				{["group" , "inline" , "support" , "struct"].map((typename: StyleType)=>{
					return <Accordion 
						key = {typename}
						expanded = {me.state.acc_expd[typename]}
						onChange = {(_,e)=>me.setState({acc_expd : {...me.state.acc_expd , ...{[typename]: e}}})}
					>
						<AccordionSummary>{typename}</AccordionSummary>
						<AccordionDetails>
							<ButtonGroup variant="contained" fullWidth orientation="vertical">
								{Object.keys(this.editor.core[`${typename}styles`]).map( (stylename) => 
									<Button 
										key = {stylename}
										onClick = {e => me.editor.get_onClick(typename , stylename)(e)}
									>{stylename}</Button>
								)}
							</ButtonGroup>
						</AccordionDetails>
					</Accordion>
				})}
			</Stack></Grid>
		</Grid> 
		<DefaultParameterWithEditorWithDrawer 
			open = {me.state.param_drawer_open} 
			editor = {me.editor} 
			element = {me.editor.core.root}
            onClose = { e=>{me.setState({param_drawer_open: false})}}
        />
		</div>
	}
}
