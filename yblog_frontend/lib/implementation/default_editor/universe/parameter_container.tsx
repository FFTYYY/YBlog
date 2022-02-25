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
    Divider , 
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

import { StyledNode , is_valid_parameter_leaf} from "../../../core/elements"
import type { ValidParameter , ValidParameterLeaf } from "../../../core/elements"
import { YEditor } from "../../../editor"
import { is_same_node , node2path } from "../../utils"
import { set_node , delete_node } from "../../../behaviours"
import { EditorStructureTypography as StructureTypography } from "../basic"

export { 
    DefaultParameterContainer , 
    DefaultParameterWithEditorWithDrawer , 
}
export type {
    UniversalComponent_Props
}

interface DefaultParameterContainer_Props{
    initval: ValidParameter
    onUpdate?: (newval: ValidParameter) => void
    flag?: boolean , 
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

    /** 不知道为什么，在组件更新时必须重新赋值。 */
    componentDidUpdate(): void {
        this.parameters = this.props.initval  
        this.onUpdate = this.props.onUpdate || ( (newval: any) => {} )
    }

    /** 这个函数收集所有节点，作为树的初始展开项。 */
    get_all_treenodes(name: string[] , parameters: any):string[][]{
        let me = this
        let ret = []
        for(let key in parameters){
            let subname = [...name , key]
            if(!is_valid_parameter_leaf(parameters[key])){
                ret.push(subname)
                ret = [...ret , ...me.get_all_treenodes(subname , parameters[key])]
            }
        }
        return ret
    }
    

    /** 如果参数的当前项是一个基本值，则渲染一个输入框。
     * @param props.name 参数项的名称。
     * @param props.val 参数的当前值。
     * @param onChange 当值改变时的回调函数。
     */
    renderValue(props: {name: string, val: ValidParameterLeaf , onChange: (newval:ValidParameterLeaf)=>void}){

        let name = props.name
        let val = props.val
        let onChange = props.onChange
        let standard_props = {
            defaultValue: val ,
            label: name, 
            variant: "standard" as "standard" , // ts有毛病
            sx: {marginLeft: "5%"} , 
        }

        if(typeof(val) == "string"){
            return <TextField 
                onChange  = {e=>onChange(e.target.value)}
                {...standard_props}
            />
        }
        if(typeof(val) == "number"){
            return <TextField 
                onChange  = {e=>onChange(e.target.value)}
                type = "number"
                {...standard_props}
            />
        }
        if(typeof(val) == "boolean"){
            return <TextField 
                onChange = {e=>{onChange(e.target.value == "true")}}
                select
                {...standard_props}
            >
                <MenuItem key={0} value="true" >true</MenuItem>
                <MenuItem key={1} value="false">false</MenuItem>
            </TextField>
        }
        return <></>
    }

    /** 如果参数的当前项是一个对象，则渲染一个菜单，并递归地检查每一项，直到遇到字符串。
     * TODO：还应该处理其他基本类型，例如number和boolean，但是目前只考虑了字符串。
     * 
     * @param props.name 参数项的名称。
     * @param props.father_names 这个参数收集所有父节点的名称，作为唯一的 nodeID。
     * @param props.val 参数项的当前值。应该是一个字典。
     * @param props.onChange 当值改变时的回调函数。
     */
    renderDict(props: {name: string, val: ValidParameter, father_names:string[], onChange: (newval:object)=>void}){
        let newval = {...props.val}

        let RV = this.renderValue.bind(this)   // 渲染一个文本框。
        let RO = this.renderDict.bind(this)     // 递归地渲染一个菜单。
        let my_names = [...props.father_names , props.name]
        let my_nodeId = JSON.stringify(my_names)

        return <TreeItem 
            nodeId = {my_nodeId} 
            label = {props.name}
            sx = {{
                width: "auto" , 
                overflowX: "hidden" , 
            }}
        >
            {Object.keys(props.val).map( (subname)=>{
                let subval = props.val[subname]

                // 如果是基本类型，就渲染一个输入框。
                if(is_valid_parameter_leaf(subval)){
                    return <RV 
                        key     = {subname}
                        name    = {subname} 
                        val     = {subval} 
                        onChange = {(newsubval:ValidParameterLeaf)=>{
                            newval[subname] = newsubval
                            props.onChange(newval)
                        }} 
                    />               
                }

                // 如果不是，就渲染一个树项。
                return <RO 
                    key     = {subname}
                    name    = {subname} 
                    val     = {subval} 
                    father_names = {my_names}
                    onChange = {(newsubval:ValidParameter)=>{
                        newval[subname] = newsubval
                        props.onChange(newval)
                    }} 
                />            
            })}
        </TreeItem >

    }
    
    /**
     * 渲染函数。
     * 注意，这个组件必须被包裹在一个 non_selectable_prop 的元素内部。
     * @returns 一个菜单，提供各个参数的编辑项。
     */
    render(){
        let R = this.renderDict.bind(this)
        let me = this

        let root_name = "Parameters"
        let all_nodeids = Object.values( this.get_all_treenodes([] ,{[root_name]: me.parameters}) ).map(val=>JSON.stringify(val))

        return <TreeView
            defaultExpanded = {all_nodeids}
            disableSelection
            disabledItemsFocusable
            defaultCollapseIcon = {<ExpandMoreIcon />}
            defaultExpandIcon = {<ChevronRightIcon />} 
        ><R
            name = {root_name}
            val = {me.parameters}
            father_names = {[]}
            
            onChange = {(newval:ValidParameter)=>{
                me.parameters = newval
                me.onUpdate(newval) // 向父组件通知自己的更新
            }}
        ></R></TreeView>
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

    constructor(props: UniversalComponent_Props){
        super(props)
    }

    temp_update_value(newval: ValidParameter){
        let props = this.props

        props.editor.add_suboperation( `${props.element.idx}-parameter` , (father_editor: YEditor) => {
            set_node( father_editor , props.element , { parameters: newval })
        })
    }

    componentDidUpdate(prevProps: Readonly<UniversalComponent_Props>, prevState: Readonly<{}>, snapshot?: any): void {
        
    }

    render(){
        let me = this
        let props = this.props

        return <DefaultParameterContainer
            initval = { props.element.parameters }
            onUpdate = { newval=>me.temp_update_value(newval) }
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
                props.editor.apply_all()
            }
        }}
        PaperProps  = {{sx: { width: "40%" }}}
    >
        <Box><StructureTypography>idx: {props.element.idx}</StructureTypography></Box>
        <Divider />
        <DefaultParameterWithEditor editor={props.editor} element={props.element}/>
    </Drawer>
}

