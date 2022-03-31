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
import { EditorCore } from "../../core/core"
import { Proxy } from "../../core/proxy"

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
import { StyleCollector } from "../../core/stylecollector"
import type { EditorRenderer_Props , EditorRenderer_Func } from "../../editor"

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
    proxies: {[key in StyleType]: {[name: string]: Proxy}}
	constructor(props){
		super(props)

		this.state = {
			cur_type_idx: 0, 
			cur_styl_idx: 0, 
		}

		this.editor = props.editor
		this.proxies = this.editor.proxies
		this.button_refs = {
			group	: Object.keys( this.proxies["group"] 	).map( (x=>React.createRef()) ) , 
			inline	: Object.keys( this.proxies["inline"] 	).map( (x=>React.createRef()) ) , 
			support	: Object.keys( this.proxies["support"] 	).map( (x=>React.createRef()) ) , 
			struct	: Object.keys( this.proxies["struct"] 	).map( (x=>React.createRef()) ) , 
		}
	}

	get_style_list(typename: StyledNodeType){
		return this.editor.get_proxy_names(typename) as string[]
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
		const type_order = ["group" , "inline" , "support" , "struct"] as ["group" , "inline" , "support" , "struct"]
		const typenum = type_order.length
		type_idx = ((type_idx % typenum) + typenum) % typenum

		let stylnum = this.get_style_list(type_order[type_idx]).length
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
		const type_order = ["group" , "inline" , "support" , "struct"] as ["group" , "inline" , "support" , "struct"]
		let cur_typename = type_order[this.state.cur_type_idx]
		let cur_stylename = this.get_style_list(cur_typename)[this.state.cur_styl_idx]
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
			{["group" , "inline" , "support" , "struct"].map ( (typename: StyledNodeType)=>{
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
					Object.keys(me.get_style_list(typename)).map( (stylename , idx) => 
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


let NoKeyboardOpMixin = {
	is_selecting(){
		let me = this as any as DefaultEditor

		return me.state.ctrl_key["q"]
	} , 

	flush_key_state(keydown: boolean , e: React.KeyboardEvent<HTMLDivElement>){
		let me = this as any as DefaultEditor

		if(e.ctrlKey){
			if(keydown){
				if(!me.state.ctrl_key[e.key]){
					me.setState({ctrl_key: {...me.state.ctrl_key , [e.key]: true}})
				}
			}
			else{
				if(me.state.ctrl_key[e.key]){
					me.setState({ctrl_key: {...me.state.ctrl_key , [e.key]: undefined}})
				}
			}
		}
		else{
			if(Object.keys( me.state.ctrl_key ).length > 0){
				me.setState({
					ctrl_key: {} , 
				})
			}
		}
	} , 

	prevent_key_down(e: React.KeyboardEvent<HTMLDivElement>){
		let me = this as any as DefaultEditor

		if(!me.is_selecting()){
			return false
		}
		if(me.buttonbar_ref && me.buttonbar_ref.current){
			let buttonbar = me.buttonbar_ref.current
			if(e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "ArrowDown" || e.key == "ArrowUp" || e.key == "Enter"){
				e.preventDefault()
				return true
			}
		}
	} , 

	handle_key_press(e: React.KeyboardEvent<HTMLDivElement>){
		let me = this as any as DefaultEditor

		if(!me.is_selecting())
			return false
		if(me.buttonbar_ref && me.buttonbar_ref.current){
			let buttonbar = me.buttonbar_ref.current
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
	} , 
}

/** 
 * 这个组件提供一个开箱即用的默认编辑器组件。
 */
class DefaultEditor extends React.Component <{
    core: EditorCore
    proxies: {[key in StyleType]: {[name: string]: Proxy}}
    renderers: StyleCollector<EditorRenderer_Func>

	onUpdate?: (newval: Node[]) => void
	onFocusChange?: ()=>void
	onMount?: () => void
	theme?: ThemeOptions
	extra_buttons?: any

} , {
	ctrl_key: any
}> {
    core: EditorCore
    proxies: {[key in StyleType]: {[name: string]: Proxy}}
    renderers: StyleCollector<EditorRenderer_Func>

	is_selecting: () => boolean
	flush_key_state: (keydown: boolean , e: React.KeyboardEvent<HTMLDivElement>) => void
	prevent_key_down: (e: React.KeyboardEvent<HTMLDivElement>) => boolean
	handle_key_press: (e: React.KeyboardEvent<HTMLDivElement>) => boolean
	

	onUpdate: (newval: Node[]) => void
	onMount: ()=>void
	onFocusChange: ()=>void

	editor_ref		: React.RefObject<YEditor>
	buttonbar_ref	: React.RefObject<DefaultButtonbar>

	use_mixins(){
		this.is_selecting 		= NoKeyboardOpMixin.is_selecting.bind(this)
		this.flush_key_state 	= NoKeyboardOpMixin.flush_key_state.bind(this)
		this.prevent_key_down 	= NoKeyboardOpMixin.prevent_key_down.bind(this)
		this.handle_key_press 	= NoKeyboardOpMixin.handle_key_press.bind(this)
	}

	constructor(props) {
		super(props)

		this.use_mixins()

		this.state = {
			ctrl_key: {} , // 只在按下ctrl的状态下有效，记录哪些键被按下了
		}

		
		this.core 		= props.core
		this.proxies 	= props.proxies
		this.renderers 	= props.renderers


		this.onUpdate = props.onUpdate || ((newval: Node[])=>{})
		this.onMount  = props.onMount || (()=>{})
		this.onFocusChange  = props.onFocusChange || (()=>{})

		this.editor_ref = React.createRef<YEditor>()
		this.buttonbar_ref = React.createRef<DefaultButtonbar>()
    }

	get_editor(){
		if(this.editor_ref && this.editor_ref.current)
			return this.editor_ref.current
		return undefined
	}

	get_root(){
		let editor = this.get_editor()
		if(editor){
			return editor.get_root()
		}
		return undefined
	}

	componentDidMount(): void {
		let me = this
		this.onMount()	

		/** 非得要再刷新一下，react是不是有病啊 */
		this.forceUpdate()
		// this.notification_key = Math.floor( Math.random() * 233333 )
		// let layzy_update = new DoSomething( ()=>{me.forceUpdate()} , 5000)
		// this.editor.core.add_notificatioon(()=>layzy_update.go() , `editor-${this.notification_key}`)
	}
	componentWillUnmount(): void {
		// this.editor.core.remove_notificatioon(`editor-${this.notification_key}`)
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
				<YEditor
					ref 		= {me.editor_ref} 
					// bindref 	= {(ref)=>{me.setState({editor_ref: {current: ref}})}}
					
					core 		= {me.core}
					proxies 	= {me.proxies}
					renderers 	= {me.renderers}

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
			}}>{(()=>{
				let editor = me.get_editor()
				let root = me.get_root()
				if(!(editor && root)){
					return <></>
				}
				return <AutoStack force_direction="column">
					<DefaultParameterEditButton editor={editor} element={root} />
					<DefaultHiddenEditorButtons editor={editor} element={root} />
					{me.props.extra_buttons}
					<Divider />
					<DefaultButtonbar editor={editor} selecting={me.is_selecting()} ref={me.buttonbar_ref}/>
				</AutoStack>
			})()}</Box>

			</EditorBackgroundPaper></ThemeProvider>
	}
}
