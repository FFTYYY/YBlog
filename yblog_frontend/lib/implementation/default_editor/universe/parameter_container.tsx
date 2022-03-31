/** 
 * 这个文件提供一个通用的参数编辑器。
 * @module
 */

import React, {useState} from "react"

import { 
    Typography ,  
    Card , 
    TextField ,
    Button , 
    Drawer , 
    Box , 
    Switch , 
    MenuItem  , 
    Divider, 
    List , 
    ListItem, 
} from "@mui/material"
import { 
    TreeItem , 
    TreeView , 
} from "@mui/lab"
import { 
    ExpandMore as ExpandMoreIcon , 
    ChevronRight as ChevronRightIcon  , 
} from "@mui/icons-material"

import { Node, Editor } from "slate"

import { StyledNode } from "../../../core/elements"
import type { ValidParameter , ValidParameterItem } from "../../../core/elements"
import { YEditor } from "../../../editor"
import { is_same_node , node2path } from "../../utils"
import { set_node , delete_node } from "../../../behaviours"
import { EditorStructureTypography as StructureTypography } from "../basic"

export { 
    DefaultParameterContainer , 
    DefaultParameterWithEditorWithDrawer , 
}
export type {UniversalComponent_Props}

/** 这个类定义一个菜单组件，作为默认的参数更新器。 
 * 注意，这个组件更新参数有两种方式：通过回调函数立刻更新（ onUpdate ），或者像父组件暴露本对象，期望父组件来调用
 * 自身的 parameter_values() 方法获得更新后的值。具体使用哪一种方法是可选的。但是注意，使用立刻更新的方法有可能
 * 会导致slate更新抢占焦点，而使用延迟更新则可能会导致保存不及时等问题。建议是使用 YEditor 提供的 operations 功能。
 * 
 * 注意，这个类是一个菜单，不包含打开菜单的逻辑。
*/
class DefaultParameterContainer extends React.Component <{
    /** 参数的初始值。 */
    initval: ValidParameter

    /** 更改时的回调函数。 */
    onUpdate?: (newval: ValidParameter) => void
} , {
    parameters: ValidParameter
}>{
    onUpdate: (newval: any) => void

    /**
     * @param props.initval 所有参数的初始值。
     * @param props.onUpdate 在自身更新时的回调。如果为 undefined 则不会干任何事。
     */
    constructor(props){
        super(props)

        this.state = {
            parameters: this.props.initval
        }

        this.onUpdate = props.onUpdate || ( (newval: any) => {} )
    }

    componentDidUpdate(): void {
        this.onUpdate = this.props.onUpdate || ( (newval: any) => {} )
    }    

    /** 如果参数的当前项是一个基本值，则渲染一个输入框。
     * @param props.name 参数项的名称。
     * @param props.val 参数的当前值。
     * @param onChange 当值改变时的回调函数。
     */
    RenderValue(props: {name: string, val: ValidParameterItem , onChange: (newval:ValidParameterItem)=>void}){

        let name = props.name
        let type = props.val.type
        let val = props.val.val
        let onChange = (v)=>props.onChange({type: type,val: v})
        let standard_props = {
            defaultValue: val ,
            label: name, 
            variant: "standard" as "standard" , // ts有毛病
            sx: {marginLeft: "5%"} , 
        }

        if(type == "string"){
            return <TextField 
                onChange  = {e=>onChange(e.target.value)}
                {...standard_props}
            />
        }
        if(type == "number"){
            return <TextField 
                onChange  = {e=>onChange(e.target.value)}
                type = "number"
                {...standard_props}
            />
        }
        if(type == "boolean"){
            return <TextField 
                onChange = {e=>{onChange(e.target.value == "true")}}
                //select // TODO 这里如果设置成select有个bug，使得点击的时候页面并没有刷新，但是drawer会消失。
                {...standard_props}
            >
                <MenuItem key={0} value="true" >true</MenuItem>
                <MenuItem key={1} value="false">false</MenuItem>
            </TextField>
        }
        return <></>
    }

    /**
     * 渲染函数。
     * 注意，这个组件必须被包裹在一个 non_selectable_prop 的元素内部。
     * @returns 一个菜单，提供各个参数的编辑项。
     */
    render(){
        let me = this

        let R = this.RenderValue.bind(this)
        return <List>
            {Object.keys(me.state.parameters).map((key,idx)=>{
                <ListItem key = {idx}>
                    <R 
                        name = {key}
                        val = {me.state.parameters[key]}
                        onChange = {(v)=>{
                            me.setState({parameters: {...me.state.parameters , [key]: v}})
                            me.onUpdate(me.state.parameters)
                        }}
                    />
                </ListItem>
            })}
        </List>
        
    }
}
interface UniversalComponent_Props{
    editor: YEditor
    element: StyledNode
}


/** 这个组件向具体的编辑器和具体的节点提供 DefaultParameterContainer ，并使用 YEditor 提供的 operations 功能延迟更新。
 * 注意，这个组件不包含打开菜单的逻辑。
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。
 */
class DefaultParameterWithEditor extends React.Component<UniversalComponent_Props>{

    constructor(props){
        super(props)
    }


    render(){
        let me = this
        let props = this.props
        let element = props.element

        let has_prox = !!( element.proxy_info && element.proxy_info.proxy_name )

        /** 这个函数将参数的更新应用到编辑器上。 */
        function temp_update_value(newval: ValidParameter){
            let props = me.props
            
            // 这是一个延迟操作。
            props.editor.add_delay_operation( `${props.element.idx}-parameter` , (father_editor: YEditor) => {
                set_node( father_editor , props.element , has_prox ? 
                    { proxy_info: {...element.proxy_info , proxy_params: newval}} : //如果有代理，就更新代理参数。
                    { parameters: newval }   // 如果没有代理，就更新原始参数。
                )
            })
        }
        
        return <DefaultParameterContainer
            initval = { has_prox ? element.proxy_info.proxy_params : element.parameters }
            onUpdate = { newval=>temp_update_value(newval) }
        />
    }
}

/**
 * 这个组件向具体的编辑器和具体的节点提供 DefaultParameterContainer ，并包含一个抽屉来打开关闭编辑界面。抽屉关闭时会调用 
 * editor.apply_all() 来应用所有更新。
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。
 * @param props.open 抽屉是否打开。
 * @param props.onClose 抽屉关闭时的行为。
 */
function DefaultParameterWithEditorWithDrawer(props: UniversalComponent_Props & {
    open: boolean , 
    onClose?: (e:any)=>void
}){
    let onClose = props.onClose || ((e:any)=>{})
    return <Drawer 
        anchor = {"left"}
        open = {props.open}
        onClose={onClose}
        ModalProps={{
            keepMounted: true,
        }}
        SlideProps = {{
            onExited: () => {
                props.editor.apply_delay_operations() // 令编辑器应用所有延迟操作。
            }
        }}
        PaperProps  = {{sx: { width: "40%" }}}
    >
        <Box><StructureTypography>idx: {props.element.idx}</StructureTypography></Box>
        <Divider />
        <DefaultParameterWithEditor editor={props.editor} element={props.element}/>
    </Drawer>
}

