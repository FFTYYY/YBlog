/** 
 * 这个文件提供一些通用的组件的默认渲染。
 * @module
 */

import React, {useState} from "react"

import Card         from "@mui/material/Card"
import TextField    from "@mui/material/TextField"
import Drawer       from "@mui/material/Drawer"

import { StyledNode } from "../core/elements"
import { GroupStyle , EditorCore} from "../core/editor_core"
import { YEditor } from "../editor_interface"
import { HiveTwoTone } from "@mui/icons-material"
import { non_selectable_prop , is_same_node , node2path } from "../utils"
import { Transforms, Node, Editor } from "slate"
import IconButton from '@mui/material/IconButton';

import SettingsIcon from '@mui/icons-material/Settings';

export { DefaultParameterContainer , DefaultParameterWithEditorWithDrawer , DefaultParameterWithEditorWithDrawerWithButton}

interface DefaultParameterContainer_Props{
    initval: any
    onUpdate?: (newval: any) => void
}

/** 这个类定义一个菜单组件，作为默认的参数更新器。 
 * 注意，这个组件更新参数有两种方式：通过回调函数立刻更新（ onUpdate ），或者像父组件暴露本对象，期望父组件来调用
 * 自身的 parameter_values() 方法获得更新后的值。具体使用哪一种方法是可选的。但是注意，使用立刻更新的方法有可能
 * 会导致slate更新抢占焦点，而使用延迟更新则可能会导致保存不及时等问题。建议是使用 YEditor 提供的 operations 功能。
 * 
 * 注意，这个类是一个菜单，不包含打开菜单的逻辑。
*/
class DefaultParameterContainer extends React.Component <DefaultParameterContainer_Props >{
    parameters: any
    onUpdate: (newval: any) => void

    /**
     * @param props.initval 所有参数的初始值。
     * @param onUpdate 在自身更新时的回调。如果为 undefined 则不会干任何事。
     */
    constructor(props: DefaultParameterContainer_Props){
        super(props)

        this.parameters = this.props.initval
        this.onUpdate = props.onUpdate || ( (newval: any) => {} )
    }

    /** 父组件调用这个函数来获得更新过的parameters */
    parameter_values(){
        return this.parameters
    }

    /** 如果参数的当前项是一个字符串，则渲染一个输入框。     * 
     * @param props.name 参数项的名称。
     * @param props.val 参数的当前值。
     * @param onChange 当值改变时的回调函数。
     */
    renderString(props: {name: string, val: string, onChange: (newval:string)=>void}){
        return <TextField 
            defaultValue = {props.val} 
            onChange  = {e=>props.onChange(e.target.value)}
            label   = {props.name}
            variant = "standard"
            sx      = {{marginLeft: "5%"}}
        ></TextField>
    }

    /** 如果参数的当前项是一个对象，则渲染一个菜单，并递归地检查每一项，直到遇到字符串。
     * TODO：还应该处理其他基本类型，例如number和boolean，但是目前只考虑了字符串。
     * 
     * @param props.name 参数项的名称。
     * @param props.val 参数项的当前值。应该是一个字典。
     * @param props.onChange 当值改变时的回调函数。
     */
    renderDict(props: {name: string, val:object, onChange: (newval:object)=>void}){
        let newval = {...props.val}

        let RS = this.renderString.bind(this)   // 渲染一个文本框。
        let RO = this.renderDict.bind(this)     // 递归地渲染一个菜单。

        return <Card key={props.name} sx={{marginLeft: "5%"}}>
            <p>{props.name}</p>
            {Object.keys(props.val).map(
                (subname)=>{
                    let subval = props.val[subname]

                    if(typeof subval === "string")
                    {
                        return <RS 
                            key     = {subname}
                            name    = {subname} 
                            val     = {subval} 
                            onChange = {(newsubval:string)=>{
                                newval[subname] = newsubval
                                props.onChange(newval)
                            }} 
                        />               
                    }

                    return <RO 
                        key     = {subname}
                        name    = {subname} 
                        val     = {subval} 
                        onChange = {(newsubval:object)=>{
                            newval[subname] = newsubval
                            props.onChange(newval)
                        }} 
                    />            
        }
        )}</Card>

    }
    
    /**
     * 渲染函数。
     * 注意，这个组件必须被包裹在一个 non_selectable_prop 的元素内部。
     * @returns 一个菜单，提供各个参数的编辑项。
     */
    render(){
        let R = this.renderDict.bind(this)
        let me = this

        return <R
            name="Parameters"
            val={me.parameters}
            onChange={(newval:any)=>{
                me.parameters = newval
                me.onUpdate(newval) // 向父组件通知自己的更新
            }}
        ></R>
    }
}



/** 这个组件向具体的编辑器和具体的节点提供 DefaultParameterContainer ，并使用 YEditor 提供的 operations 功能延迟更新。
 * 注意，这个组件不包含打开菜单的逻辑。
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。
 */
function DefaultParameterWithEditor(props: {editor: YEditor, element: StyledNode}){

    function temp_update_value(newval: any){

        props.editor.add_suboperation( props.element.idx , (father_editor: YEditor) => {

            Transforms.setNodes<StyledNode>(
                father_editor.slate , 
                { parameters: newval },
                { at: node2path(father_editor.slate , props.element) }
            )
        })
    }

    return <DefaultParameterContainer
        initval = { props.element.parameters }
        onUpdate = { newval=>temp_update_value(newval) }
    />
}

/**
 * 这个组件向具体的编辑器和具体的节点提供 DefaultParameterContainer ，并包含一个抽屉来打开关闭编辑界面。抽屉关闭时会调用 
 * editor.apply_all() 来应用所有更新。
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。
 * @param props.open 抽屉是否打开。
 * @param props.onClose 抽屉关闭时的行为。
 */
function DefaultParameterWithEditorWithDrawer(props: {
    editor: YEditor , 
    element: StyledNode , 
    open: boolean , 
    onClose?: (e:any)=>void
}){
    let onClose = props.onClose || ((e:any)=>{})
    return <Drawer 
        {...non_selectable_prop} 
        anchor = {"left"}
        open = {props.open}
        onClose={onClose}
        ModalProps={{
            keepMounted: true,
        }}
        SlideProps = {{
            onExited: () => {
                props.editor.apply_all()
            }
        }}
        PaperProps  = {{sx: { width: "40%" }}}
    >
        <DefaultParameterWithEditor editor={props.editor} element={props.element}/>
    </Drawer>
}

/**
 * 这个组件向具体的编辑器和具体的节点提供 DefaultParameterContainer ，同时还提供一个按钮。
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。
 * @param props.open 抽屉是否打开。
 * @param props.onClose 抽屉关闭时的行为。
 */
 function DefaultParameterWithEditorWithDrawerWithButton(props: {
    editor: YEditor , 
    element: StyledNode , 
    onClose?: (e:any)=>void
}){
    let [ open , set_open ] = useState(false) // 抽屉是否打开
    let onClose = props.onClose || ((e:any)=>{})
    return <>
        <IconButton onClick={e=>set_open(true)}>  <SettingsIcon/> </IconButton>       
        <DefaultParameterWithEditorWithDrawer 
            editor = {props.editor} 
            element = {props.element} 
            open = {open} 
            onClose={e=>{ onClose(e); set_open(false); }} 
        />
    </>
}