/** 这个模块提供默认的抽象节点的渲染方式。
 * @module
 */

import React, {useState , createRef} from "react"

import { Transforms , Node, Editor } from "slate"

import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import CardHeader from "@mui/material/CardHeader"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Drawer from "@mui/material/Drawer"
import { makeStyles , styled } from "@material-ui/styles"
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import SwipeVerticalIcon from '@mui/icons-material/SwipeVertical';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';


import { StyledNode , NodeType , StyleType ,  GroupNode } from "../core/elements"
import { YEditor } from "../editor_interface"
import { non_selectable_prop , is_same_node , node2path , update_kth , get_hidden_idx } from "../utils"
import { DefaultEditor } from "./editor"
import { EditorCore , InlineStyle , GroupStyle , StructStyle , SupportStyle , AbstractStyle } from "../core/editor_core"
import { editor } from "."

export {DefaultNewHidden , DefaultHiddenEditor , DefaultHidden}

/** 这个组件提供一个按钮，让 element 选择其 hidden style 。
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。注意只有 StyledNode 可以有 hidden 属性。
 */
function DefaultNewHidden(props: {editor: YEditor, element: StyledNode, anchor_element: any, open: boolean, onClose?: (e:any)=>void}){

    let element = props.element 
    let editor = props.editor
    let abstractstyles = editor.core.abstractstyles 
    let onClose = props.onClose || ((e:any)=>{})

    function get_onClick(choice: string | undefined){
        return (e: any)=>{
            onClose(e)

            if(choice == undefined || abstractstyles[choice] == undefined)
                return 
            
            let new_hiddens = [...element.hiddens , ...[abstractstyles[choice].makehidden()]]

            Transforms.setNodes<StyledNode>(
                editor.slate , 
                {...element, ...{hiddens: new_hiddens}} , // 向 hiddens 中添加节点。 
                { at: node2path(editor.slate , element ) }
            )
        }
    }

    return <Menu
        anchorEl = {props.anchor_element}
        open = {props.open}
        onClose = {onClose}
    >
        {Object.keys(abstractstyles).map(name=>{
            return <MenuItem onClick={get_onClick(name)} key={name}>{name}</ MenuItem>
        })}
    </Menu>
}

interface DefaultHiddenEditor_Props{
    editor: YEditor
    father: StyledNode

    /** 要编辑的 hidden 节点。 */
    son: GroupNode

    /** 抽屉是否打开 */
    open: boolean

    /** 抽屉关闭时的行为 */
    onClose?: (e:any)=>void
}
interface DefaultHiddenEditor_State{
    drawer_open: boolean
}

/** 这个组件提供默认的hidden编辑页面。 */
class DefaultHiddenEditor extends React.Component<DefaultHiddenEditor_Props , DefaultHiddenEditor_State>{
    subeditor: YEditor
    hiddenid: number
    father_editor: YEditor
    father: StyledNode
    son: GroupNode


    /**
     * @param props.editor 这个组件所服务的编辑器。
     * @param props.father 这个组件所服务的节点。
     * @param props.son 要编辑的 hidden 节点。
     */
    constructor(props: DefaultHiddenEditor_Props){
        super(props)

        this.state = {
            drawer_open: false
        }
        
        this.subeditor = new YEditor(new EditorCore(
            Object.values(props.editor.core.inlinestyles    ) , 
            Object.values(props.editor.core.groupstyles     ) , 
            Object.values(props.editor.core.structstyles    ) , 
            Object.values(props.editor.core.supportstyles   ) , 
            Object.values(props.editor.core.abstractstyles  ) , 
        ))
        
        this.subeditor.default_renderers = props.editor.default_renderers
        this.subeditor.style_renderers   = props.editor.style_renderers
        
        this.father_editor = props.editor
        this.father = props.father
        this.son = props.son
    }

    /** 这个函数将子编辑器的修改应用到父编辑器上。 */
    sub_apply(father_editor: YEditor){

        let father = this.father
        let son = this.son
        let hidden_idx = get_hidden_idx(father , son)
        let new_son = {...son , ...{children: this.subeditor.core.root.children}} // 更新之后的son。
        let new_hiddens = update_kth(father.hiddens , hidden_idx , new_son) // 更新之后的 father.hiddens。
        
        // TODO：这里有个bug，slate的setNodes并不会立刻应用，这导致如果有多个setNodes，后面修改的会覆盖前面的。
        // 应用变换。
        Transforms.setNodes<StyledNode>(
            father_editor.slate , 
            { hiddens: new_hiddens } , 
            { at: node2path(father_editor.slate , father) }
        )
    }

	render() {
		let me = this		
        let props = this.props
		return <Drawer
            anchor      = {"left"}
            open        = {me.props.open}
            onClose     = {me.props.onClose}
            ModalProps  = {{keepMounted: true}}
            PaperProps  = {{sx: { width: "40%" }}}
            SlideProps = {{
                onExited: () => {
                    me.father_editor.apply_all()
                }
            }}
        >
            <DefaultEditor 
                editor = { me.subeditor }
                onMount={()=>{ // 这个函数需要等到子组件 mount 再调用....
                    Transforms.removeNodes(me.subeditor.slate , {at: [0]})
                    Transforms.insertNodes(me.subeditor.slate ,  me.props.son.children , {at: [0]})
                    me.props.editor.add_suboperation(me.son.idx , me.sub_apply.bind(me))
                }}

            />
        </Drawer>
	}
}

/** 这个组件是一个点开按钮展开的菜单，菜单的每项是编辑一个 hidden 属性的按钮。 */
function DefaultHiddenEditorGroup(props: {editor:YEditor , element: StyledNode, anchor_element: any, open: boolean, onClose?: (e:any)=>void}){

    let element = props.element 
    let editor = props.editor
    let hiddens = element.hiddens 
    let onClose = props.onClose || ( (e:any)=>{} )

    let [drawer_open, set_drawer_open] = useState<undefined | string>(undefined) // 哪个抽屉打开，注意一次只能有一个抽屉打开。

    return <>
        <Menu
            anchorEl = {props.anchor_element}
            open = {props.open}
            onClose = {props.onClose}
        >
            {Object.keys(hiddens).map((idx)=>{
                return <MenuItem key={idx} onClick={e=>{set_drawer_open(idx);onClose(e)}}>
                    {hiddens[idx].name}-{idx}
                </ MenuItem>
            })}
        </Menu>

        {Object.keys(hiddens).map((idx)=>{
            return <DefaultHiddenEditor
                key = {idx}
                editor = {editor} 
                father = {element} 
                son = {element.hiddens[idx]} 
                open = {drawer_open==idx} 
                onClose = {(e:any)=>{set_drawer_open(undefined)}}
            />
        })}
    </>  
}

/** 如果目标节点有hidden，则这个节点提供编辑界面，否则提供选择hidden的界面。
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。
 * @param props.button_new 用来新建抽象节点的按钮。
 * @param props.button_edit 用来编辑一个抽象节点的按钮。
 * @returns 一个渲染了两个 Button 的 
*/
function DefaultHidden(props: {editor: YEditor , element: StyledNode}){
    let editor = props.editor
    let element = props.element

    let [menu_new_ae, set_menu_new_ae]   = useState<undefined | HTMLElement>(undefined)
    let [menu_edit_ae, set_menu_edit_ae] = useState<undefined | HTMLElement>(undefined)

    return <ButtonGroup >
        <Button onClick={e=>set_menu_new_ae(e.currentTarget)} variant="contained">New</Button>
        <Button onClick={e=>set_menu_edit_ae(e.currentTarget)} variant="contained">Edit</Button>
        <DefaultNewHidden 
            editor = {editor} 
            element = {element} 
            anchor_element = {menu_new_ae}
            open = {menu_new_ae != undefined} 
            onClose = {e=>set_menu_new_ae(undefined)}
        />
        <DefaultHiddenEditorGroup 
            editor = {editor} 
            element = {element} 
            anchor_element = {menu_edit_ae}
            open = {menu_edit_ae != undefined} 
            onClose = {e=>{ set_menu_edit_ae(undefined) }}
        />
    </ButtonGroup >
}

