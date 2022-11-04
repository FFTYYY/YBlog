/** 
 * 这个模块提供所有按钮的超类。
 * @module
 */

import React from "react"
import * as Slate from "slate"
import * as SlateReact from "slate-react"

import {
    ConceptNode , 
    ParameterList , 
    GlobalInfo , 
} from "../../core"

import {
    EditorComponent ,
} from "../../editor"

import {
    MouselessElement , 
    MouselessRegister, 
    MouselessRegisterFunction, 
    MouselessUnRegisterFunction , 
    MouselessActivateOperation , 
    MouselessUnActivateOperation , 
    MouselessRun , 
} from "../mouseless"
import {
    SPACE , 
    get_position , 
} from "./mouseless"

import { 
    AutoTooltip , 
    Direction , 
    AutoStack , 
    AutoStackedPopper 
} from "../uibase"
import { 
    Tooltip , 
    IconButton , 
    ClickAwayListener  , 
    Box, 
    Button, 
    Typography , 
    TextField , 
} from "@mui/material"

import {AutoStackedPopperWithButton} from "./buttons"

export type {
    EditorButtonInformation , 
    ButtonBase ,     
    ButtonDescription , 
    ButtonGroupProps , 
}

export {
    ButtonGroup , 
    AutoStackedPopperButtonGroupMouseless , 
    MouselessParameterEditor , 
}

/** 所有按钮组件的通用信息。 */
interface EditorButtonInformation<NodeType extends ConceptNode = ConceptNode>{

    /** 按钮所服务的节点。 */
    node: Slate.Node & NodeType
}


/** 所有按钮的父类。 */
interface ButtonBase{
    run: (e?: React.KeyboardEvent<HTMLDivElement>)=>void
}

interface MouselessButtonProps<OtherPropsType = {}>{

    /** 这个按钮的编号。 */
    idx: number

    /** 这个按钮所服务的节点。 */
    node: Slate.Node & ConceptNode
    
    /** 建立按钮时除了`node`之外还要往里面传入哪些参数。 */
    other_props?: OtherPropsType

    /** 一个按钮的无鼠标代理。 */
    component: any

    /** 要额外执行的`run`函数。 */
    extra_run?: MouselessRun

    /** 要额外执行的`activate`函数。 */
    extra_activate?: MouselessActivateOperation

    /** 要额外执行的`unactivate`函数。 */
    extra_unactivate?: MouselessUnActivateOperation

}

/** 将一个按钮包装成一个无鼠标元素。 */
class MouselessButton<OtherPropsType = {}> extends React.Component<MouselessButtonProps<OtherPropsType>>{

    childref: React.RefObject<any>

    constructor(props: MouselessButtonProps<OtherPropsType>){
        super(props)

        this.childref = React.createRef<any>()
    }

    run(e: React.KeyboardEvent<HTMLDivElement>){
        if(this.childref && this.childref.current){
            this.childref.current.run(e)
        }
        if(this.props.extra_run){
            this.props.extra_run(e)
        }
    }

    render(){
        let C = this.props.component
        let other_props = this.props.other_props || {} as OtherPropsType
        
        return <MouselessElement
            space       = {SPACE}
            run         = {this.run.bind(this)}
            position    = {get_position(this.props.node,this.props.idx)}

            extra_activate      = {this.props.extra_activate}
            extra_unactivate    = {this.props.extra_unactivate}
        >
            <C node={this.props.node} {...other_props} ref={this.childref}/>
        </MouselessElement>    
    }
}


/** 描述一个按钮。 */
type ButtonDescription<OtherPropsType = {}> = {
    other_props?: OtherPropsType
    component: React.ComponentClass<EditorButtonInformation & OtherPropsType> | React.FunctionComponent<EditorButtonInformation & OtherPropsType>

    /** 是否要跳过无鼠标操作的选择。 */
    skip_mouseless?: boolean
} | (React.ComponentClass<EditorButtonInformation & OtherPropsType> | React.FunctionComponent<EditorButtonInformation & OtherPropsType>)

interface ButtonGroupProps{
    buttons: ButtonDescription[]
    node: Slate.Node & ConceptNode
    
    idxs?: number[]

    /** 是否自动确定方向。 */
    autostack?: boolean


    /** 要额外执行的`run`函数。 */
    extra_run?: (new_pos: React.KeyboardEvent<HTMLDivElement>)=>void


    /** 要额外执行的`activate`函数。 */
    extra_activate?: MouselessActivateOperation

    /** 要额外执行的`unactivate`函数。 */
    extra_unactivate?: MouselessUnActivateOperation
}
class ButtonGroup extends React.Component<ButtonGroupProps>{
    constructor(props: ButtonGroupProps){
        super(props)
    }
    render(){
        let buttons = this.props.buttons
        let node = this.props.node

        let idxs = this.props.idxs || []
        if(idxs.length == 0){
            idxs = [0]
        }
        while(idxs.length < buttons.length){
            idxs = [...idxs, Math.max(...idxs) + 1] // 每次加入最大元素+1。
        }

        let ret = Object.keys(buttons).map((subidx)=>{
            let res_other_props = {} 
            let res_component = buttons[subidx]
            let res_skip_mouseless = false // 是否跳过无鼠标
            if(buttons[subidx]["component"]){ // 如果是object描述
                let {other_props,component, skip_mouseless} = buttons[subidx]
                res_other_props = other_props || {}
                res_component   = component
                res_skip_mouseless = skip_mouseless || false
            }
            if(res_skip_mouseless){
                let C = res_component
                return <C key={subidx} node={node} {...res_other_props}/> // 单独创建元素，不套上mouseless。
            }
            return <MouselessButton 
                key         = {subidx}
                node        = {node}
                idx         = {idxs[subidx]}
                other_props = {res_other_props}
                component   = {res_component}

                extra_run           = {this.props.extra_run}
                extra_activate      = {this.props.extra_activate}
                extra_unactivate    = {this.props.extra_unactivate}
            />
        })
        if(this.props.autostack){
            return <AutoStack>{ret}</AutoStack>
        }
        return ret
    }
}

/** 折叠起来的按钮组的`props`。 */
interface AutoStackedPopperButtonGroupMouselessProps {
    /** 用来展开菜单的按钮的类型。 */
    outer_button: any 

    /** 用来展开菜单的按钮的`props`。 */
    outer_props?: any 
    
    /** 传递给弹出框的`props` */
    poper_props?: any

    /** 鼠标移上去显示的字样。 */
    label?: string 

    /** 是否在点击其他位置时关闭。 */
    close_on_otherclick?: boolean

    /** 关闭时的其他行为。 */
    onExit?: ()=>void 

    /** `children`会被渲染在按钮之前。 */
    children?: any , 

    /** 所服务的节点。 */
    node: Slate.Node & ConceptNode 

    /** 所要用的按钮组。 */
    buttons: ButtonDescription[]

    /** 自身以及按钮组的编号。如果没有提供，就默认从`0`开始，如果没有提供完全，就默认从最大的开始依次`+1`。 */
    idxs?: number []
}

/**
 * 这个组件定义一个折叠起来的按钮组，并可以通过无鼠标的方式操作。
 * 在使用时，不仅需要传入一系列按钮的定义，还需要传入一系列编号，包括这个容器本身的编号和每个组件的编号。
 */
class AutoStackedPopperButtonGroupMouseless extends React.Component<AutoStackedPopperButtonGroupMouselessProps, {
    menu_open: boolean
    active: boolean
}>{

    static contextType = MouselessRegister
    button_ref: React.RefObject<AutoStackedPopperWithButton>

    /**
     * 创建一个折叠起来的按钮组，且通过无鼠标的方式来操作。
     * @param props.outer_button 用来展开菜单的按钮的类型。
     * @param props.outer_props 用来展开菜单的按钮的`props`。
     * @param props.poper_props 传递给弹出框的`props`
     * @param props.label 鼠标移上去显示的字样。
     * @param props.close_on_otherclick 是否在点击其他位置时关闭。
     * @param props.onExit 关闭时的其他行为。
     * @param props.children `children`会被渲染在按钮之前。
     * @param props.node 所服务的节点。
     * @param props.buttons 所要用的按钮组。
     * @param props.idxs 自身以及按钮组的编号。如果没有提供，就默认从`0`开始，如果没有提供完全，就默认从最大的开始依次`+1`。
     */
    constructor(props: AutoStackedPopperButtonGroupMouselessProps){
        super(props)

        this.state = {
            menu_open: false , 
            active: false , 
        }

        this.button_ref = React.createRef()
    }

    /** 获得按钮组件，作为菜单组件的定位。 */
    get_button(){
        if(this.button_ref && this.button_ref.current){
            return this.button_ref.current
        }
        return undefined
    }

    /** 将自己设置为激活样式。 */
    set_active(active: boolean){
        this.setState({active: active})
    }

    /** 从`props`传入的`idxs`获得补全的`idxs`。 */
    get_idxs(){
        let idxs = this.props.idxs || []
        if(idxs.length == 0){
            idxs = [1]
        }
        while(idxs.length < this.props.buttons.length + 1){
            idxs = [...idxs, Math.max(...idxs) + 1] // 每次加入最大元素+1。
        }
        return idxs
    }

    get_position(){
        return get_position(this.props.node, this.get_idxs()[0]) // 自己使用idxs[0]作为位置。
    }

    /** 这个函数需要在每个子按钮被取消激活时调用，作用是检测当前位置是否还在节点内，如果不在就自动关闭菜单。 */
    extra_unactive(new_pos?: string){
        if(new_pos != undefined){
            let [new_nodeidx, subidx] = JSON.parse(new_pos)
            if(new_nodeidx != this.props.node.idx){
                this.get_button().set_menu_open(false) // 如果激活了一个不是本节点的位置，那么就关闭菜单。
            }
            let my_subidxs = this.get_idxs()
            if(my_subidxs.indexOf(subidx) < 0){
                this.get_button().set_menu_open(false) // 如果激活了本节点中的其他按钮，那也关闭菜单。
            }
        }
        if(new_pos == undefined){ // 光标取消聚焦
            this.get_button().set_menu_open(false)
        }
    }
    
    componentDidMount(): void {
        let me = this
        let [regiester_func, _] = this.context as [MouselessRegisterFunction, MouselessUnRegisterFunction]
        regiester_func(SPACE, me.get_position() , 
            ()=>{
                me.get_button().set_menu_open(true)
                me.set_active(true)
            }  ,  
            (new_pos?: string) => {
                me.extra_unactive(new_pos)
                me.set_active(false)
            } , 
            ()=>{
                me.get_button().run()
            }
        )
    }

    componentWillUnmount(): void {
        let [_, unregister_func] = this.context as [MouselessRegisterFunction, MouselessUnRegisterFunction]
        unregister_func(SPACE, this.get_position())
    }

    render(){
        let props = this.props
        let children = props.children || <></>

        let idxs = this.get_idxs().slice(1) // 去掉第一个idx之后剩下的

        let poper = <Box sx={{
            border: this.state.active ? "2px solid" : "none"
        }}>
            <AutoStackedPopperWithButton
                outer_button        = {this.props.outer_button}
                outer_props         = {this.props.outer_props}
                poper_props         = {this.props.poper_props}
                label               = {this.props.label}
                close_on_otherclick = {this.props.close_on_otherclick}
                onExit              = {this.props.onExit}

                ref = {this.button_ref}
            >
                {children}
                <ButtonGroup 
                    node    = {props.node}
                    buttons = {props.buttons}
                    idxs    = {idxs}

                    extra_unactivate = {this.extra_unactive.bind(this)}
                />
            </AutoStackedPopperWithButton>
        </Box>
    
        return poper
    }
}


function MouselessParameterEditor(props: {
    node: ConceptNode & Slate.Node
    parameter_name: string
    idx: number
    label: string
}){
    let {node , parameter_name , idx , label} = props

    let input_ref = React.useRef<HTMLInputElement | undefined>()
    let [active , set_active] = React.useState(false)
    let [enter_selection , set_ec] = React.useState<Slate.Location | undefined>(undefined)
    let position = get_position(node, idx)

    let [regiester_func, unregister_func] = React.useContext(MouselessRegister)
    let editor = React.useContext(GlobalInfo).editor as EditorComponent

    // 聚焦或取消聚焦输入框。
    function focus_blur_input(focus: boolean){
        if(input_ref && input_ref.current){
            if(focus){input_ref.current.focus()}
            else{input_ref.current.blur()}
        }
    }

    // 记录焦点。
    function record_selection(){
        set_ec({...editor.get_slate().selection}) // 记录焦点。
    }

    // 恢复已经记录的焦点。
    function restore_selection(){
        if(input_ref && input_ref.current){
            let input = input_ref.current
            editor.auto_set_parameter(props.node, {[parameter_name]: {type: "string" , val: input.value}})
        }

        SlateReact.ReactEditor.focus(editor.get_slate())
        if(enter_selection && enter_selection["anchor"] && enter_selection["anchor"]["path"]){
            Slate.Transforms.select(editor.get_slate() , enter_selection) // 设置为保存的selection。
        }
    }

    React.useEffect(()=>{
        regiester_func(SPACE, position , 
            ()=>{ // 获得焦点，并记录之前的焦点。
                record_selection()
                focus_blur_input(true)
                set_active(true)
            }  ,  
            () => { // 取消激活后还原焦点
                restore_selection()
                focus_blur_input(false)
                set_active(false)
            } , 
            ()=>{} // run则什么也不做
        )

        return ()=>{
            unregister_func(SPACE, position )    
        }
    } , [])

    if(!(node.parameters && node.parameters[parameter_name])){
        return <></>
    }
    let param_init = node.parameters[parameter_name].val

    return <Box sx={{
        border: active ? "2px solid" : "none"
    }}><GlobalInfo.Consumer>{globalinfo => {
        let editor = globalinfo.editor as EditorComponent
        return <TextField 
            variant         = "standard" 
            sx              = {{width: "2rem" , marginBottom: "0.5rem" , hright: "1rem"}} 
            label           = {<Typography sx={{fontSize: "0.7rem"}}>{label}</Typography>} 
            defaultValue    = {param_init} 
            inputRef        = {input_ref}

            onKeyDown         = {(e)=>{
                if(e.key == "Enter"){
                    restore_selection()
                    focus_blur_input(false)
                    e.preventDefault()
                    return true
                }
                return false
            }}
        />
    }}</ GlobalInfo.Consumer></Box>

}
