/** 这个模块提供默认的抽象节点的渲染方式。
 * @module
 */

import React, {useState , createRef} from "react"


import {
    Button ,
    Box , 
    Menu , 
    MenuItem , 
    Drawer , 
    IconButton , 
} from "@mui/material"
import { 
    AddBox as AddBoxIcon , 
    FilterNone as FilterNoneIcon , 
} from "@mui/icons-material"
import { Node, Editor } from "slate"

import { AutoTooltip , ForceContain , AutoStackedPopper } from "../basic"
import { StyledNode , NodeType , StyleType ,  GroupNode } from "../../core/elements"
import { YEditor } from "../../editor"
import { is_same_node , node2path , update_kth , get_hidden_idx } from "../utils"
import { EditorCore , InlineStyle , GroupStyle , StructStyle , SupportStyle , AbstractStyle } from "../../core/core"
import { DefaultEditor } from "./main"

export {DefaultNewHidden , DefaultHiddenEditor , DefaultHiddenEditorButtons}

/** 这个组件提供一个按钮，让 element 选择其 hidden style 。
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。注意只有 StyledNode 可以有 hidden 属性。
 */
function DefaultNewHidden(props: {editor: YEditor, element: StyledNode, anchor_element: any, open: boolean, onClose?: (e:any)=>void}){

    let element = props.element 
    let editor = props.editor
    let abstractproxies = editor.proxies.abstract
    let onClose = props.onClose || ((e:any)=>{})

    function get_onClick(choice: string | undefined){
        return (e: any)=>{
            onClose(e)

            if(choice == undefined || abstractproxies[choice] == undefined)
                return 
            
            let new_hiddens = [...element.hiddens , ...[abstractproxies[choice].makehidden()]]
            editor.set_node( element , {hiddens: new_hiddens})
        }
    }

    return <Menu
        anchorEl = {props.anchor_element}
        open = {props.open}
        onClose = {onClose}
    >
        {Object.keys(abstractproxies).map(name=>{
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
    editor_ref: React.RefObject<DefaultEditor>


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
        
        this.editor_ref = React.createRef()
        
        this.father_editor = props.editor
        this.father = props.father
        this.son = props.son
    }

    /** 这个函数将子编辑器的修改应用到父编辑器上。 */
    sub_apply(father_editor: YEditor){

        let subeditor = this.get_editor()
        if(!subeditor)
            return 

        let father = this.father
        let son = this.son
        let hidden_idx = get_hidden_idx(father , son)
        let new_son = {...son , ...{children: subeditor.get_root().children}} // 更新之后的son。
        let new_hiddens = update_kth(father.hiddens , hidden_idx , new_son) // 更新之后的 father.hiddens。
        
        // TODO：这里有个bug，slate的setNodes并不会立刻应用，这导致如果有多个setNodes，后面修改的会覆盖前面的。
        // 应用变换。
        father_editor.set_node( father , { hiddens: new_hiddens })
    }

    get_editor(){
        if(!(this.editor_ref && this.editor_ref.current && this.editor_ref.current.get_editor()))
            return undefined
        return this.editor_ref.current.get_editor()
    }

	render() {
		let me = this		
        let props = this.props
		return <Drawer
            anchor      = {"left"}
            open        = {me.props.open}
            onClose     = {me.props.onClose}
            ModalProps  = {{keepMounted: true}}
            PaperProps  = {{sx: { width: "60%"}}}
            SlideProps = {{
                onExited: () => {
                    me.father_editor.apply_delay_operations()
                    me.father_editor.add_delay_operation(`${me.son.idx}-hidden` , me.sub_apply.bind(me))
                } , 
                onEnter: ()=>{
                    let subeditor = me.get_editor()
                    if(subeditor){
                        subeditor.replace_nodes( subeditor.get_root() , me.props.son.children)
                        me.props.editor.add_delay_operation(`${me.son.idx}-hidden` , me.sub_apply.bind(me))
                    }
                }
            }}
        >
            <ForceContain.Provider value={true}>
                <DefaultEditor 
                    ref         = {me.editor_ref}
                    core        = {me.father_editor.core}
                    proxies     = {me.father_editor.proxies}
                    renderers   = {me.father_editor.renderers}
                />
            </ForceContain.Provider>
        </Drawer>
	}
}

/** 这个组件是一个菜单，菜单的每项是编辑一个 hidden 属性的按钮。 */
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

/** 这个组件提供两个按钮，分别是新建抽象和编辑抽象。
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。
 * @returns 一个渲染了两个 Button 的 
*/
function DefaultHiddenEditorButtons(props: {editor: YEditor , element: StyledNode}){
    let editor = props.editor
    let element = props.element

    let [menu_new_ae, set_menu_new_ae]   = useState<undefined | HTMLElement>(undefined)
    let [menu_edit_ae, set_menu_edit_ae] = useState<undefined | HTMLElement>(undefined)

    // TODO：root的hiddens不能正常更新。

    return <>
        <Box sx={{marginX: "auto"}}><AutoTooltip title="新建抽象">
            <IconButton onClick={e=>set_menu_new_ae(e.currentTarget)}><AddBoxIcon/></IconButton>
        </AutoTooltip></Box>
        <Box sx={{marginX: "auto"}}><AutoTooltip title="编辑抽象">
            <IconButton onClick={e=>set_menu_edit_ae(e.currentTarget)}><FilterNoneIcon/></IconButton>
        </AutoTooltip></Box>
        
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
    </>
}

