/** 这个模块提供默认的抽象节点的渲染方式。
 * @module
 */

import React, {useState , createRef} from "react"


import {
    Button ,
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

import { set_node , replace_nodes } from "../../behaviours"


import { AutoTooltip , ForceContain , AutoStackedPopper } from "../basic"
import { StyledNode , NodeType , StyleType ,  GroupNode } from "../../core/elements"
import { YEditor } from "../../editor"
import { is_same_node , node2path , update_kth , get_hidden_idx } from "../../utils"
import { EditorCore , InlineStyle , GroupStyle , StructStyle , SupportStyle , AbstractStyle } from "../../core/editor_core"
import { DefaultEditor } from "./main"

export {DefaultNewHidden , DefaultHiddenEditor , DefaultHidden}

/** 这个组件提供一个按钮，让 element 选择其 hidden style 。
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。注意只有 StyledNode 可以有 hidden 属性。
 */
function DefaultNewHidden(props: {editor: YEditor, element: StyledNode, anchor_element: any, open: boolean, onClose?: (e:any)=>void}){

    let element = props.element 
    let editor = props.editor
    let abstractstyles = editor.core.styles.abstract
    let onClose = props.onClose || ((e:any)=>{})

    function get_onClick(choice: string | undefined){
        return (e: any)=>{
            onClose(e)

            if(choice == undefined || abstractstyles[choice] == undefined)
                return 
            
            let new_hiddens = [...element.hiddens , ...[abstractstyles[choice].makehidden()]]
            set_node(editor , element , {hiddens: new_hiddens})
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
        
        this.subeditor = new YEditor(new EditorCore([
            ...Object.values(props.editor.core.styles.inline    ) , 
            ...Object.values(props.editor.core.styles.group     ) , 
            ...Object.values(props.editor.core.styles.struct    ) , 
            ...Object.values(props.editor.core.styles.support   ) , 
            ...Object.values(props.editor.core.styles.abstract  ) , 
        ] , {}))
        
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
        set_node(father_editor , father , { hiddens: new_hiddens })
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
                    me.father_editor.apply_all()
                }
            }}
        >
            <ForceContain.Provider value={true}>
                <DefaultEditor 
                    
                    editor = { me.subeditor }
                    onMount={()=>{ // 这个函数需要等到子组件 mount 再调用....
                        replace_nodes(me.subeditor , me.subeditor.core.root , me.props.son.children)
                        me.props.editor.add_suboperation(me.son.idx , me.sub_apply.bind(me))
                    }}
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
function DefaultHidden(props: {editor: YEditor , element: StyledNode}){
    let editor = props.editor
    let element = props.element

    let [menu_new_ae, set_menu_new_ae]   = useState<undefined | HTMLElement>(undefined)
    let [menu_edit_ae, set_menu_edit_ae] = useState<undefined | HTMLElement>(undefined)

    // TODO：root的hiddens不能正常更新。

    return <>
        <AutoTooltip title="新建抽象"><IconButton onClick={e=>set_menu_new_ae(e.currentTarget)}><AddBoxIcon/></IconButton></AutoTooltip>
        <AutoTooltip title="编辑抽象"><IconButton onClick={e=>set_menu_edit_ae(e.currentTarget)}><FilterNoneIcon/></IconButton></AutoTooltip>
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

