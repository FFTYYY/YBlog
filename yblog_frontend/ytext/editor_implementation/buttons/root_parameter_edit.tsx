/** 这个模块提供一个修改根节点的参数的按钮。
 * @module
 */

 import React, {useEffect, useState} from "react"

import { 
    Typography ,  
    Card , 
    TextField ,
    Button , 
    Drawer , 
    Box , 
    Select , 
    Switch , 
    MenuItem  , 
    Divider, 
    List , 
    FormControlLabel  , 
    ListItem, 
    FormControl , 
    FormLabel  , 
    RadioGroup , 
    Radio  , 
} from "@mui/material"
import { 
    TreeItem , 
    TreeView , 
} from "@mui/lab"
import { 
    Settings as SettingsIcon , 
} from "@mui/icons-material"

import * as Slate from "slate"
import * as SlateReact from "slate-react"

import {
    ConceptNode,
    ParameterList , 
    ParameterValue , 
    GlobalInfo , 
    AbstractNode, 
    GlobalInfoProvider, 
} from "../../core"

import { EditorComponentEditingBox, EditorStructureTypography as StructureTypography } from "../uibase/components"
import { EditorComponent } from "../../editor"
import { EditorButtonInformation } from "./base"
import { AutoIconButton } from "./buttons"
import {
    DefaultParameterWithEditor , 
} from "./parameter_edit"
import { ButtonBase } from "./base"

export { 
    DefaultRootParameterWithEditorWithDrawer , 
    DefaultRootParameterEditButton , 
}


/** 参数更新抽屉的`props` */
type DefaultRootParameterWithEditorWithDrawerProps = {

    root: AbstractNode

    /** 抽屉是否打开。 */
    open: boolean 

    /** 所服务的编辑器。这里之所以需要传入编辑器组件是因为这个按钮不在编辑器的上下文内。 */
    editor: EditorComponent

    /** 抽屉应该关闭时的回调。 */
    onClose?: (e:any)=>void
}

/**
 * 这个组件向具体的编辑器和具体的节点提供 DefaultParameterContainer ，并包含一个抽屉来打开关闭编辑界面。抽屉关闭时会调用 
 * editor.apply_all() 来应用所有更新。
 * @param props.node 这个组件所服务的节点。
 * @param props.open 抽屉是否打开。
 * @param props.onClose 抽屉应该关闭时的回调。如果不提供这个参数，抽屉就不会关闭。
 */
function DefaultRootParameterWithEditorWithDrawer(props: DefaultRootParameterWithEditorWithDrawerProps){
    let onClose = props.onClose || ((e:any)=>{})
    let parametereditor_ref = React.useRef<DefaultParameterWithEditor | null>(null)

    // 记录进入时的光标位置，以便在退出时还原。
    let [enter_selection , set_ec] = React.useState<Slate.Location | undefined>(undefined)

    let editor = props.editor

    // 临时提供一个上下文。
    return <GlobalInfoProvider value={{editor: props.editor}}><Drawer 
        anchor      = {"left"}
        open        = {props.open}
        onClose     = {onClose}
        ModalProps  = {{
            keepMounted: true,
        }}
        SlideProps  = {{
            onEnter: ()=>{
                set_ec({...editor.get_slate().selection})
            } , 
            onExited: () => {
                if(parametereditor_ref && parametereditor_ref.current){ // 在退出时更新所服务的节点的参数。
                    let parameters = parametereditor_ref.current.get_parameters()
                    editor.set_root({parameters: {...editor.get_root().parameters, ...parameters}})
                }
                SlateReact.ReactEditor.focus(editor.get_slate())
                if(enter_selection && enter_selection["anchor"] && enter_selection["anchor"]["path"]){
                    Slate.Transforms.select(editor.get_slate() , enter_selection) // 设置为保存的selection。
                }
            }
        }}
        PaperProps  = {{sx: { width: "40%" }}}
    >
        <Box><StructureTypography>idx: {props.root.idx} [root]</StructureTypography></Box>
        <Divider />
        <DefaultParameterWithEditor node={props.root} ref={parametereditor_ref}/>
        <Button onClick={onClose}>Close</Button>
    </Drawer></GlobalInfoProvider>
}

interface DefaultRootParameterEditButtonProps{

    root: AbstractNode

    /** 所服务的编辑器。这里之所以需要传入编辑器组件是因为这个按钮不在编辑器的上下文内。 */
    editor: EditorComponent

    onExit?: (e:any)=>void
}

/**
 * 这个组件提供`DefaultRootParameterWithEditorWithDrawer`的按钮
 */
class DefaultRootParameterEditButton extends React.PureComponent <DefaultRootParameterEditButtonProps, {
    open: boolean
}> implements ButtonBase {
    constructor(props: DefaultRootParameterEditButtonProps){
        super(props)

        this.state = {
            open: false
        }
    }

    run(){
        this.setState({open:true})
    }

    render(){
        let props = this.props
        let onExit = props.onExit || ((e:any)=>{})
        let me = this

        return <Box sx={{marginX: "auto"}}>
            <AutoIconButton onClick={me.run.bind(me)} title="设置参数" icon={SettingsIcon}/>
            <DefaultRootParameterWithEditorWithDrawer 
                root = {props.root} 
                editor = {props.editor}
                open = {me.state.open} 
                onClose = {e=>{ 
                    onExit(e)
                    me.setState({open:false})
                }} 
            />
        </ Box>
    }
}
