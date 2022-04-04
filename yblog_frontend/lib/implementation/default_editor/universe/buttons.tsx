/** 
 * 这个文件提供一些实用按钮。
 * @module
 */

import React, {useEffect, useState} from "react"

import { 
    Card , 
    TextField ,
    Drawer , 
    Button , 
    Typography , 
    Tooltip , 
    IconButton , 
    ClickAwayListener  , 
    Box , 
    Switch , 
} from "@mui/material"
import type { IconButtonProps  } from "@mui/material"

import {
    Close as CloseIcon , 
    Settings as SettingsIcon , 
    North as NorthIcon , 
    South as SouthIcon , 
    MoveUp as MoveUpIcon  , 
}
from "@mui/icons-material"

import {Node , Text} from "slate"
import type {  GroupNode , StructNode , StyledNode } from "../../../core/elements"
import { paragraph_prototype , get_node_type } from "../../../core/elements"
import { node2path } from "../../utils"
import { YEditor } from "../../../editor"
import { AutoTooltip , Direction , AutoStack , AutoStackedPopper } from "../../basic/direction_control"
import type { AutoStackedPopper_Props } from "../../basic/direction_control"
import { DefaultParameterWithEditorWithDrawer , UniversalComponent_Props } from "./parameter_container" 
import { editor } from "../../.."

export {    
    DefaultParameterEditButton , 
    DefaultCloseButton , 
    AutoStackedPopperWithButton , 
	NewParagraphButton , 
    DefaultSwicth , 
    AutoIconButton , 
    DefaultSoftDeleteButton , 
}

/** 这个函数是一个语法糖，用于自动创建按钮 */
function AutoIconButton(props:{
    onClick?: IconButtonProps["onClick"]
    size?: IconButtonProps["size"]
    title?: string
    icon?: any
    component?: "button" | "span"
}){
    let Icon = props.icon
    let component = props.component || "button"
    return <AutoTooltip title={props.title}>
        <IconButton onClick={props.onClick} size={props.size} component={component}>
            <Icon/>
        </IconButton>
    </AutoTooltip>
}

// PureComponent  效率更高。
/**
 * 这个组件向具体的编辑器和具体的节点提供 DefaultParameterContainer ，同时还提供一个按钮。
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。
 * @param props.open 抽屉是否打开。
 * @param props.onClose 抽屉关闭时的行为。
 */
class DefaultParameterEditButton extends React.PureComponent <UniversalComponent_Props & {
    onClose?: (e:any)=>void , 
}, {
    open: boolean
}>{
    constructor(props){
        super(props)

        this.state = {
            open: false
        }
    }
    render(){
        let props = this.props
        let onClose = props.onClose || ((e:any)=>{})
        let me = this

        return <Box sx={{marginX: "auto"}}>
            <AutoIconButton onClick={e=>me.setState({open:true})} title="设置参数" icon={SettingsIcon}/>
            <DefaultParameterWithEditorWithDrawer 
                editor = {props.editor} 
                element = {props.element} 
                open = {me.state.open} 
                onClose = {e=>{ 
                    onClose(e)
                    me.setState({open:false})
                }} 
            />
        </ Box>
    }
}


/** 这个组件提供一个直接删除节点的按钮。 
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。
 */
function DefaultCloseButton(props: UniversalComponent_Props){
    return <AutoIconButton onClick={e=>{props.editor.delete_node(props.element)}} title="删除组件" icon={CloseIcon} />
}


import {Transforms} from "slate"
/** 这个组件提供一个删除节点，但是将其子节点移动到节点外的按钮。 
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。
 * @param props.puretext 是否将子组件作为纯文本。
 */
function DefaultSoftDeleteButton(props: UniversalComponent_Props & {puretext?: boolean}){
    return <AutoIconButton onClick={e=>{
        if(props.puretext){
            // XXX 可能保留内部样式会比较好...
            let text = Node.string(props.element)
            let path = node2path(props.editor.get_root() , props.element)
            props.editor.delete_node_by_path(path)
            props.editor.add_nodes(paragraph_prototype(text) , path)
        }
        else{
            props.editor.unwrap_node(props.element)
        }
    }} title="解除组件" icon={MoveUpIcon} />
}

/** 这个组件提供一个在组件的上下新建段落的节点。 
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。
 */
function NewParagraphButton(props: UniversalComponent_Props){
	return <React.Fragment>
		<AutoIconButton
			onClick = { e => {props.editor.add_nodes_before(paragraph_prototype() , props.element ) }}
			title = "向上添加段落"
			icon = {NorthIcon}
		></AutoIconButton>
		<AutoIconButton
			onClick = { e => {props.editor.add_nodes_after( paragraph_prototype() , props.element ) }}
			title = "向下添加段落"
			icon = {SouthIcon}
		></AutoIconButton>
	</React.Fragment>
}


function AutoStackedPopperWithButton(props: {
    button_class: any , 
    poper_props?: any,
    button_props?: any , 
    title?: string ,  
    children?: any , 
    close_on_otherclick?: boolean,
    onClose?: ()=>void , 
}){
    let B = props.button_class
    let [menu_open, set_menu_open] = React.useState<boolean>(false)
    // 展开栏挂载的元素。
    let menu_anchor = React.useRef()
    let onClose = props.onClose || (()=>{}) // TODO use MUI onExit

    let my_set_menu_open = (new_val: boolean) => {
        set_menu_open(new_val)
        if(!new_val){ // 正在关闭
            onClose()
        }
    }

    let poper = <React.Fragment>
        <AutoTooltip title={props.title}><B 
            onClick = {e => my_set_menu_open(!menu_open)}
            ref = {menu_anchor}
            {...props.button_props}
        /></AutoTooltip>
        <AutoStackedPopper 
            anchorEl = {menu_anchor.current} 
            open = {menu_open}
            {...props.poper_props}
        >{props.children}</AutoStackedPopper>
    </React.Fragment>

    if(props.close_on_otherclick){
        return <ClickAwayListener onClickAway={()=>{my_set_menu_open(false)}}><Box>{poper}</Box></ ClickAwayListener>
    }
    return poper
}

function MyImg(props: {img_url: string}){
    return <img src={props.img_url}></img>
}

// TODO 撤销操作不会刷新switch状态。
/** 这个组件给一个 Group 或 Struct 组件提供一个开关，用于控制 Group 的 relation 。 
 * @param props.editor 服务的编辑器。
 * @param props.element 服务的节点。
*/
function DefaultSwicth(props: {editor: YEditor , element: StyledNode}){
    let element = props.element as ( GroupNode | StructNode )
    let editor = props.editor

    let [ checked , set_checked ] = useState(element.relation == "chaining") // 开关是否打开

    /** 处理开关的逻辑。 */
    function switch_check_change(e: any & {target: any & {checked: boolean}}){
        let checked = e.target.checked
        set_checked(checked)

        // constraints会自动处理更改，不用担心
        if(checked == false){ // 从开到关
            editor.set_node(element , { relation: "separating" })
        }
        if(checked == true){ // 从关到开
            editor.set_node(element , { relation: "chaining" } )
        }

    }

    return <AutoTooltip title = "贴贴"><Switch checked={checked} onChange={switch_check_change}></Switch></AutoTooltip>
}
