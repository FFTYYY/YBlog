/** 
 * 这个文件提供一个通用的参数编辑器。
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
    ExpandMore as ExpandMoreIcon , 
    ChevronRight as ChevronRightIcon  , 
} from "@mui/icons-material"

import { Node, Editor } from "slate"

import { StyledNode } from "../../../core/elements"
import type { ValidParameter , ValidParameterItem } from "../../../core/elements"
import { YEditor } from "../../../editor"
import { is_same_node , node2path } from "../../utils"
import { EditorStructureTypography as StructureTypography } from "../basic"
import { AutoStackedPopperWithButton } from "./buttons"

export { 
    DefaultParameterContainer , 
    DefaultParameterWithEditorWithDrawer , 
}
export type {UniversalComponent_Props}

class ParameterItem extends React.Component <{
    parameter_item: ValidParameterItem
    name: string
} , {
    val: string | boolean | number
}>{
    type: "string" | "boolean" | "number" | "choice"
    name: string

    constructor(props){
        super(props)

        this.state = {
            val: props.parameter_item.val
        }

        this.name = props.name
        this.type = props.parameter_item.type
    }
    
    update(){
        this.setState({val: this.props.parameter_item.val})
    }

    componentDidUpdate(prev_props, prev_state){
        if(prev_props.parameter_item.val != this.props.parameter_item.val){ // 更新了props
            this.update()
        }
    }

    get_item(){
        let ret = {
            val: this.state.val , 
            type: this.type , 
        } 
        if(this.type == "choice"){
            type ChoiceItem = ValidParameterItem & {type: "choice"}
            (ret as ChoiceItem).choices = (this.props.parameter_item as ChoiceItem).choices
        }
        return ret
    }

    render(){
        let name = this.name
        let type = this.type
        let val = this.state.val
        let me = this

        let standard_props = {
            value: val ,
            label: name, 
            variant: "standard" as "standard" , // ts有毛病
            sx: {marginLeft: "5%"} , 
        }        
        let standard_sx = {
            marginLeft: "5%" , 
        }

        if(type == "string"){
            return <TextField 
                onChange = {e=>{
                    me.setState({val: e.target.value})
                }}
                {...standard_props}
                sx = {standard_sx}
            />
        }
        if(type == "number"){
            return <TextField 
                onChange = {e=>{
                    me.setState({val: Number(e.target.value)})
                }}
                type = "number"
                {...standard_props}
                sx = {standard_sx}
            />
        }
        if(type == "boolean"){
            return <FormControlLabel 
                label = {name} 
                control = {<Switch 
                    checked = {val as boolean}
                    onChange = {e=>{
                        me.setState({val: e.target.checked})          
                    }}
                />} 
                sx = {standard_sx}
            />
        }
        if(type == "choice"){ // 帮助sb ts认识到下面的choices是合法的。
            let choices = (me.props.parameter_item as ValidParameterItem & {type : "choice"}).choices

            return <FormControl sx = {{...standard_sx , width: "100%"}}>
                <FormLabel>{name}</FormLabel>
                <RadioGroup
                    value = {val}
                    onChange = {e=>{
                        me.setState({val: e.target.value})
                    }}
                >
                    {choices.map((c,idx)=><FormControlLabel sx={{marginLeft: "5%"}} key={idx} value={c} label={c} control={<Radio />}/>)}
                </RadioGroup>
            </FormControl>        
        }
        return <></>
    }
}

/** 这个类定义一个菜单组件，作为默认的参数更新器。 
 * 注意，这个组件更新参数有两种方式：通过回调函数立刻更新（ onUpdate ），或者像父组件暴露本对象，期望父组件来调用
 * 自身的 parameter_values() 方法获得更新后的值。具体使用哪一种方法是可选的。但是注意，使用立刻更新的方法有可能
 * 会导致slate更新抢占焦点，而使用延迟更新则可能会导致保存不及时等问题。建议是使用 YEditor 提供的 operations 功能。
 * 
 * 注意，这个类是一个菜单，不包含打开菜单的逻辑。
*/
class DefaultParameterContainer extends React.Component <{
    /** 参数的值。 */
    parameters: ValidParameter

    /** 更改时的回调函数。 */
    onUpdate?: (newval: ValidParameter) => void
} , {}>{
    onUpdate: (newval: any) => void
    item_refs: {[key: string] : React.RefObject<ParameterItem>}

    /**
     * @param props.parameters 所有参数的初始值。
     * @param props.onUpdate 在自身更新时的回调。如果为 undefined 则不会干任何事。
     */
    constructor(props){
        super(props)

        this.item_refs = Object.keys(this.props.parameters).reduce((obj , key)=>{
            obj[key] = React.createRef<ParameterItem>()
            return obj
        } , {})
        this.onUpdate = props.onUpdate || ( (newval: any) => {} )
    }

    componentDidUpdate(): void {
        this.onUpdate = this.props.onUpdate || ( (newval: any) => {} )
    }    

    get_parameters(){
        let me = this
        let ret = {}
        for(let key in this.props.parameters){
            if(!(me.item_refs[key] && me.item_refs[key].current)){
                return {}
            }
            ret[key] = me.item_refs[key].current.get_item()
        }
        return ret
    }

    /**
     * 渲染函数。
     * 注意，这个组件必须被包裹在一个 non_selectable_prop 的元素内部。
     * @returns 一个菜单，提供各个参数的编辑项。
     */
    render(){
        let me = this

        // console.log("state" , this.props.parameters)

        return <List>
            {Object.keys(me.props.parameters).map((key,idx)=>{
                return <ListItem key = {idx}>
                    <ParameterItem 
                        ref = {this.item_refs[key]}
                        name = {key}
                        parameter_item = {me.props.parameters[key]}
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

    container_ref: React.RefObject<DefaultParameterContainer>

    constructor(props){
        super(props)

        this.container_ref = React.createRef()
    }

    get_container(){
        if(this.container_ref && this.container_ref.current){
            return this.container_ref.current
        }
        return undefined
    }

    effect(){
        let container = this.get_container()
        if(!container){
            return 
        }
        let props = this.props
        props.editor.add_delay_operation( `${props.element.idx}-parameter` , (father_editor: YEditor) => {
            father_editor.auto_set_parameter( props.element , container.get_parameters())
        })

    }

    componentDidMount(){
        this.effect()
    }
    componentDidUpdate(){
        this.effect()
    }

    render(){
        let me = this
        let props = this.props
        let element = props.element

        let has_prox = !!( element.proxy_info && element.proxy_info.proxy_name )

        return <DefaultParameterContainer
            ref = { me.container_ref }
            parameters = { has_prox ? element.proxy_info.proxy_params : element.parameters }
            // onUpdate = { newval=>temp_update_value(newval) }
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

