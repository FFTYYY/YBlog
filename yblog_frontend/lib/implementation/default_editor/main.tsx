/** 
 * 这个文件提供一个开箱即用的editor示例。
 * @module
 */
import React from "react"

import {
	Accordion , 
	AccordionSummary , 
	Toolbar , 
	Typography , 
	IconButton , 
	Button , 
	Box , 
	Paper ,
	Divider , 
} from "@mui/material"
import {
	CalendarViewDay as CalendarViewDayIcon , 
	CloseFullscreen as CloseFullscreenIcon , 
	Coffee as CoffeeIcon , 
	Settings as SettingsIcon , 
	QrCode as QrCodeIcon , 
} from "@mui/icons-material"
import { ThemeProvider } from "@mui/material/styles"

import { Node } from "slate"

import { YEditor } from "../../editor"
import { object_foreach } from "../../utils"
import type { StyleType , NodeType } from "../../core/elements"

import { DefaultHidden } from "./hidden"
import { 
	DefaultParameterEditButton , 
	AutoStackedPopperWithButton , 
} from "./universe"
import { 
	AutoStack , 
	AutoTooltip , 
	AutoStackedPopper , 
	AutoStackButtons , 
} from "../basic"

import { default_editor_theme } from "./basic"
import { EditorBackgroundPaper , ComponentEditorBox } from "./basic"

export { DefaultEditor }

// TODO 从参数中接受一个theme，并用来扩充 default_editor_theme

interface DefaultEditor_State{
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

		this.editor = props.editor
		this.onUpdate = props.onUpdate || ((newval: Node[])=>{})
		this.onMount  = props.onMount || (()=>{})
    }
	componentDidMount(): void {
		this.onMount()	
	}
	render() {

		let icons = {
			group: CalendarViewDayIcon , 
			inline: CloseFullscreenIcon , 
			support: CoffeeIcon , 
			struct: QrCodeIcon , 
		}

		// 工具栏的宽度
		let toolbar_width = {
			xs: 0.15 , 
			md: 0.10 , 
			xl: 0.05 , 
		}
		// 除开工具栏之外的部分的宽度。
		let complement_width = object_foreach(toolbar_width , (x:number)=>1-x)
		// number2percent 用来将小数形式的表示转为字符串形式。MUI的sx的left属性不接受小数点表示。
		let number2percent = (obj: {[k:string]:number}) => object_foreach(obj , x=>`${Math.floor(x*100)%100}%`)

		let me = this
		return <ThemeProvider theme={default_editor_theme}><EditorBackgroundPaper>

			<Box sx = {{ 
				position: "absolute", 
				height: "100%", 
				width: complement_width, 
				overflow: "auto", 
			}}><ComponentEditorBox>
				<YEditor.Component editor={me.editor} onUpdate={me.onUpdate}/>
			</ComponentEditorBox></Box>

			<Box sx = {{
				position: "absolute", 
				height: "100%", 
				left: number2percent(complement_width), 
				width: toolbar_width
			}}>

				<AutoStack force_direction="column">
					<DefaultParameterEditButton editor = {me.editor} element = {me.editor.core.root} />
					<DefaultHidden editor={me.editor} element={me.editor.core.root} />
					<Divider />
					{["group" , "inline" , "support" , "struct"].map ( (typename: StyleType)=>{
						let Icon = icons[typename]

						return <React.Fragment key={typename}>

							<AutoStackedPopperWithButton
								poper_props = {{
									stacker: AutoStackButtons , 
								}}
								button_class = {IconButton}
								button_props = {{
									children: <Icon /> , 
								}}
								title = {typename}
							>{
								Object.keys(me.editor.core.styles[typename]).map( (stylename) => 
									<Button 
										key = {stylename}
										onClick = {e => me.editor.get_onClick(typename , stylename)(e)}
									>{stylename}</Button>
								)
							}</AutoStackedPopperWithButton>
						</React.Fragment>
					})}
				</AutoStack>
			</Box>

			</EditorBackgroundPaper></ThemeProvider>
	}
}
