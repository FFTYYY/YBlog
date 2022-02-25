/** 
 * 这个文件提供一些实用按钮。
 * @module
 */

import React, {useState} from "react"

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
import type { IconButtonProps } from "@mui/material"

import {
    Close as CloseIcon , 
    Settings as SettingsIcon , 
    North as NorthIcon , 
    South as SouthIcon , 
}
from "@mui/icons-material"

import {Node} from "slate"
import { delete_node , add_nodes_before , add_nodes_after , add_nodes , set_node , move_node} from "../../../behaviours"
import type {  GroupNode , StructNode , StyledNode } from "../../../core/elements"
import { paragraph_prototype , get_node_type } from "../../../core/elements"
import { node2path } from "../../utils"
import { YEditor } from "../../../editor"
import { AutoTooltip , Direction , AutoStack , AutoStackedPopper } from "../../basic/direction_control"
import type { AutoStackedPopper_Props } from "../../basic/direction_control"
import { DefaultParameterWithEditorWithDrawer , UniversalComponent_Props } from "./parameter_container" 

export {    
    DefaultParameterEditButton , 
    DefaultCloseButton , 
    AutoStackedPopperWithButton , 
	NewParagraphButton , 
    DefaultSwicth , 
}

/** 这个函数是一个语法糖，用于自动创建按钮 */
function AutoIconButton(props:{
    onClick?: IconButtonProps["onClick"]
    size?: IconButtonProps["size"]
    title?: string
    icon?: any
}){
    let Icon = props.icon
    return <AutoTooltip title={props.title}>
        <IconButton onClick={props.onClick} size={props.size}>
            <Icon/>
        </IconButton>
    </AutoTooltip>
}

/**
 * 这个组件向具体的编辑器和具体的节点提供 DefaultParameterContainer ，同时还提供一个按钮。
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。
 * @param props.open 抽屉是否打开。
 * @param props.onClose 抽屉关闭时的行为。
 */
function DefaultParameterEditButton(props: UniversalComponent_Props & {
    onClose?: (e:any)=>void , 
}){
    let [ open , set_open ] = useState(false) // 抽屉是否打开
    let onClose = props.onClose || ((e:any)=>{})
    
    return <>
        <AutoIconButton onClick={e=>set_open(true)} title="设置参数" icon={SettingsIcon} />
        <DefaultParameterWithEditorWithDrawer 
            editor = {props.editor} 
            element = {props.element} 
            open = {open} 
            onClose = {e=>{ onClose(e); set_open(false); }} 
        />
    </>
}


/** 这个组件提供一个直接删除节点的按钮。 
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。
 */
function DefaultCloseButton(props: UniversalComponent_Props){
    return <AutoIconButton onClick={e=>{delete_node(props.editor , props.element)}} title="删除组件" icon={CloseIcon} />
}

/** 这个组件提供一个在组件的上下新建段落的节点。 
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。
 */
function NewParagraphButton(props: UniversalComponent_Props){
	return <React.Fragment>
		<AutoIconButton
			onClick = { e => {add_nodes_before(props.editor , paragraph_prototype() , props.element ) }}
			title = "向上添加段落"
			icon = {NorthIcon}
		></AutoIconButton>
		<AutoIconButton
			onClick = { e => {add_nodes_after(props.editor , paragraph_prototype() , props.element ) }}
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
            set_node(editor , element , { relation: "separating" })
        }
        if(checked == true){ // 从关到开
            set_node( editor , element , { relation: "chaining" } )
        }

    }

    return <AutoTooltip title = "贴合"><Switch checked={checked} onChange={switch_check_change}></Switch></AutoTooltip>
}
