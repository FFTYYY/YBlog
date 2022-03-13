/** 
 * 这个文件提供一个开箱即用的editor示例。
 * @module
 */
import React  from "react"

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
	Popover , 
} from "@mui/material"
import {
	CalendarViewDay as CalendarViewDayIcon , 
	CloseFullscreen as CloseFullscreenIcon , 
	Coffee as CoffeeIcon , 
	Settings as SettingsIcon , 
	QrCode as QrCodeIcon , 
} from "@mui/icons-material"
import { ThemeProvider , createTheme , styled } from "@mui/material/styles"
import type { Theme , ThemeOptions } from "@mui/material/styles"

import { Node } from "slate"

import { YEditor } from "../../editor"
import { object_foreach , merge_object } from "../utils"
import type { StyleType , NodeType , StyledNodeType } from "../../core/elements"

import { DefaultHiddenEditorButtons } from "./hidden"
import { 
	DefaultParameterEditButton , 
	AutoStackedPopperWithButton , 
} from "./universe"
import { 
	AutoStack , 
	AutoTooltip , 
	AutoStackedPopper , 
	AutoStackButtons , 
	default_theme , 
} from "../basic"

import { EditorBackgroundPaper , EditorComponentEditingBox } from "./basic"
import { DoSomething } from "../utils"
import { timelineSeparatorClasses } from "@mui/lab"

export { DefaultEditor }


/** 这个组件是编辑器的右边工具栏的组件按钮部分。 */
class DefaultButtonbar extends React.Component<{
	editor: YEditor , 
	selecting: boolean
} , {
	cur_type_idx: number , 
	cur_styl_idx: number , 
}>{
	editor: YEditor
	button_refs: {[k in StyledNodeType] : React.RefObject<HTMLButtonElement>[]}
	constructor(props){
		super(props)

		this.state = {
			cur_type_idx: 0, 
			cur_styl_idx: 0, 
		}

		this.editor = props.editor
		let core = this.editor.core
		this.button_refs = {
			group	: Object.keys( core.styles["group"] 	).map( (x=>React.createRef()) ) , 
			inline	: Object.keys( core.styles["inline"] 	).map( (x=>React.createRef()) ) , 
			support	: Object.keys( core.styles["support"] 	).map( (x=>React.createRef()) ) , 
			struct	: Object.keys( core.styles["struct"] 	).map( (x=>React.createRef()) ) , 
		}
	}

	get_ref(type_idx?: number , styl_idx?: number){
		if(type_idx == undefined || styl_idx == undefined){
			return undefined
		}
		let type_order = ["group" , "inline" , "support" , "struct"]
		let but_ref: React.RefObject<HTMLDivElement> = this.button_refs[type_order[type_idx]][styl_idx]
		if(but_ref && but_ref.current){
			return but_ref.current
		}
		return undefined
	}

	update_selection(old_state: { cur_type_idx?: number; cur_styl_idx?: number }){
		let old_but = this.get_ref(old_state.cur_type_idx , old_state.cur_styl_idx)
		let cur_but = this.get_ref(this.state.cur_type_idx , this.state.cur_styl_idx)
		if(old_but){
			old_but.style.border = "none"
		}
		if(cur_but){
			cur_but.style.border = "2px solid #112233"
		}
	}

	normalize_idx(type_idx: number, styl_idx: number){
		const type_order = ["group" , "inline" , "support" , "struct"]
		const typenum = type_order.length
		type_idx = ((type_idx % typenum) + typenum) % typenum

		let stylnum = Object.keys(this.editor.core.styles[type_order[type_idx]]).length
		styl_idx = ((styl_idx % stylnum) + stylnum) % stylnum
		return [type_idx , styl_idx]
	}

	// 移动
	move({x = 0, y = 0} : {x?: number , y?: number}){
		let [type_idx , styl_idx] = this.normalize_idx(this.state.cur_type_idx + y , this.state.cur_styl_idx + x)
		this.setState({
			cur_type_idx: type_idx , 
			cur_styl_idx: styl_idx , 
		})
	}

	// 假装点击了当前位置
	force_click(){
		const type_order = ["group" as "group" , "inline" as "inline" , "support" as "support" , "struct" as "struct"]
		let cur_typename = type_order[this.state.cur_type_idx]
		let cur_stylename = Object.keys(this.editor.core.styles[cur_typename])[this.state.cur_styl_idx]
		this.editor.get_onClick(cur_typename , cur_stylename)()
	}

	componentDidMount(): void {
		this.update_selection({cur_type_idx: undefined , cur_styl_idx: undefined})
	}

	componentDidUpdate(
		prevProps: Readonly<{ editor: YEditor; selecting: boolean }>, 
		prevState: Readonly<{ cur_type_idx: number; cur_styl_idx: number }>, 
		snapshot?: any
	): void {
		this.update_selection(prevState)
	}


	render(){
		let icons = {
			group: CalendarViewDayIcon , 
			inline: CloseFullscreenIcon , 
			support: CoffeeIcon , 
			struct: QrCodeIcon , 
		}

		let me = this
		return <React.Fragment>
			{["group" , "inline" , "support" , "struct"].map ( (typename: StyleType)=>{
				let Icon = icons[typename]
				return <React.Fragment key={typename}><AutoStackedPopperWithButton
					poper_props = {{
						stacker: AutoStackButtons ,
						component: styled(Paper)({backgroundColor: "#aabbddbb" , }) ,  
					}}
					button_class = {IconButton}
					button_props = {{
						children: <Icon /> , 
					}}
					title = {typename}
				>{
					Object.keys(me.editor.core.styles[typename]).map( (stylename , idx) => 
						<React.Fragment key={idx}>
							<Button 
								onClick = {e => me.editor.get_onClick(typename , stylename)()}
								variant = "text"
								ref = {me.button_refs[typename][idx]}
							>
								{stylename}
							</Button>
							<Divider orientation="vertical" flexItem/>
						</React.Fragment>
					)
				}</AutoStackedPopperWithButton></React.Fragment>
			})}
		</React.Fragment>
	}
}

interface DefaultEditor_State{
	ctrl_key: any
}

interface DefaultEditor_Props{
	editor: YEditor
	onUpdate?: (newval: Node[]) => void
	onFocusChange?: ()=>void
	onMount?: () => void
	theme?: ThemeOptions
	extra_buttons?: any
}

/** 
 * 这个组件提供一个开箱即用的默认编辑器组件。
 */
class DefaultEditor extends React.Component <DefaultEditor_Props , DefaultEditor_State> {
	editor: YEditor
	onUpdate: (newval: Node[]) => void
	onMount: ()=>void
	onFocusChange: ()=>void
	notification_key: number // 用来记录自己对于 core 的notification。
	buttonbar_ref: React.RefObject<DefaultButtonbar>

	constructor(props: DefaultEditor_Props) {
		super(props)

		this.state = {
			ctrl_key: {} , // 只在按下ctrl的状态下有效，记录哪些键被按下了
		}

		this.editor = props.editor
		this.onUpdate = props.onUpdate || ((newval: Node[])=>{})
		this.onMount  = props.onMount || (()=>{})
		this.onFocusChange  = props.onFocusChange || (()=>{})

		this.buttonbar_ref = React.createRef<DefaultButtonbar>()
    }
	componentDidMount(): void {
		let me = this
		this.onMount()	

		this.notification_key = Math.floor( Math.random() * 233333 )
		let layzy_update = new DoSomething( ()=>{me.forceUpdate()} , 5000)
		this.editor.core.add_notificatioon(()=>layzy_update.go() , `editor-${this.notification_key}`)
	}
	componentWillUnmount(): void {
		this.editor.core.remove_notificatioon(`editor-${this.notification_key}`)
	}

	is_selecting(){
		return this.state.ctrl_key["q"]
	}

	flush_key_state(keydown: boolean , e: React.KeyboardEvent<HTMLDivElement>){
		if(e.ctrlKey){
			if(keydown){
				if(!this.state.ctrl_key[e.key]){
					this.setState({ctrl_key: {...this.state.ctrl_key , [e.key]: true}})
				}
			}
			else{
				if(this.state.ctrl_key[e.key]){
					this.setState({ctrl_key: {...this.state.ctrl_key , [e.key]: undefined}})
				}
			}
		}
		else{
			if(Object.keys( this.state.ctrl_key ).length > 0){
				this.setState({
					ctrl_key: {} , 
				})
			}
		}
	}

	prevent_key_down(e: React.KeyboardEvent<HTMLDivElement>){
		if(!this.is_selecting()){
			return false
		}
		if(this.buttonbar_ref && this.buttonbar_ref.current){
			let buttonbar = this.buttonbar_ref.current
			if(e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "ArrowDown" || e.key == "ArrowUp" || e.key == "Enter"){
				e.preventDefault()
				return true
			}
		}
	}

	handle_key_press(e: React.KeyboardEvent<HTMLDivElement>){
		if(!this.is_selecting())
			return false
		if(this.buttonbar_ref && this.buttonbar_ref.current){
			let buttonbar = this.buttonbar_ref.current
			if(e.key == "ArrowLeft"){
				buttonbar.move({x: -1})
				e.preventDefault()
				return true
			}
			if(e.key == "ArrowRight"){
				buttonbar.move({x: 1})
				e.preventDefault()
				return true
			}
			if(e.key == "ArrowDown"){
				buttonbar.move({y: 1})
				e.preventDefault()
				return true
			}
			if(e.key == "ArrowUp"){
				buttonbar.move({y: -1})
				e.preventDefault()
				return true
			}
			if(e.key == "Enter"){
				buttonbar.force_click()
				e.preventDefault()
				return true
			}
		}
		return false
	}

	render() {
	
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

		let theme = merge_object(default_theme , this.props.theme)

		let me = this
		return <ThemeProvider theme={createTheme(theme)}><EditorBackgroundPaper>
			<Box sx = {{ 
				position: "absolute", 
				height: "100%", 
				width: complement_width, 
				overflow: "auto", 
			}}><EditorComponentEditingBox>
				<YEditor.Component 
					editor = {me.editor} 
					onUpdate = {me.onUpdate} 
					onFocusChange = {me.onFocusChange} 
					onKeyDown = {e=>{
						this.flush_key_state(true , e)
						return this.prevent_key_down(e)
					}}
					onKeyUp = {e=>{
						this.flush_key_state(false , e)
						return this.handle_key_press(e) // 抬起来也是一种press
					}}
					// onKeyPress = {e=>this.handle_key_press(e)}
				/>
			</EditorComponentEditingBox></Box>

			<Box sx = {{
				position: "absolute", 
				height: "100%", 
				left: number2percent(complement_width), 
				width: toolbar_width
			}}>
				<AutoStack force_direction="column">
					<DefaultParameterEditButton editor = {me.editor} element = {me.editor.core.root} />
					<DefaultHiddenEditorButtons editor={me.editor} element={me.editor.core.root} />
					{me.props.extra_buttons}
					<Divider />
					<DefaultButtonbar editor={me.editor} selecting={me.is_selecting()} ref={me.buttonbar_ref}/>
				</AutoStack>
			</Box>

			</EditorBackgroundPaper></ThemeProvider>
	}
}
