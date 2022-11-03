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

import * as Slate from "slate"
import * as SlateReact from "slate-react"

import {
    ConceptNode,
    ParameterList , 
    ParameterValue , 
    GlobalInfo , 
} from "../../core"

import { EditorStructureTypography as StructureTypography } from "../uibase/components"
import { EditorComponent } from "../../editor"
import { EditorButtonInformation } from "./base"

export { 
    DefaultParameterContainer , 
    DefaultParameterWithEditorWithDrawer , 
}

/** 参数项更新组件的`props`。 */
interface ParameterItemComponentProps{
    /** 要更新的参数项的初始值。 */
    parameter_item: ParameterValue

    /** 这个参数项的名称。 */
    name: string
}

/** 
 * 这个组件负责一个参数项的更新操作。
 */
class ParameterItemComponent extends React.Component <ParameterItemComponentProps , {
    val: string | boolean | number
}>{
    constructor(props: ParameterItemComponentProps){
        super(props)

        this.state = {
            val: props.parameter_item.val
        }
    }
    
    /** 当外界询问时，这个函数向外提供修改过的参数。 */
    public get_item(): ParameterValue{
        let {val, type, ...other_items} = this.props.parameter_item
        let ret = {
            val: this.state.val , 
            type: this.props.parameter_item.type , 
            ...other_items
        } 
        return ret as ParameterValue
    }
    
    componentDidUpdte(prev_props: ParameterItemComponentProps){

        // 如果props里面的初始值更新了，那么就以新的初始值开始。
        if( JSON.stringify(prev_props.parameter_item.val) != JSON.stringify(this.props.parameter_item.val) ){
            this.setState({
                val: this.props.parameter_item.val
            })
        }
    }

    render(){
        let me = this
        let name = this.props.name
        let type = this.props.parameter_item.type
        let val = this.state.val

        let standard_props = {
            value: val ,
            label: name, 
            variant: "standard" as "standard" , // ts有毛病
            sx: {marginLeft: "5%"} , 
        }        
        let standard_sx = {
            marginLeft: "5%" , 
        }

        if(this.props.parameter_item.choices){ // 如果有额外的一项choices
            let choices = this.props.parameter_item.choices as (typeof val [])

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
        return <></>
    }
}

/** 参数菜单的`props`。 */
interface DefaultParameterContainerProps{
    parameters: ParameterList
}

/** 这个类定义一个菜单组件，作为默认的参数更新器。 
 * 注意，这个类是一个菜单，不包含打开菜单的逻辑。
 */
class DefaultParameterContainer extends React.Component <DefaultParameterContainerProps>{
    /** 所有子项的`ref`。 */
    item_refs: {[key: string] : React.RefObject<ParameterItemComponent>}

    /**
     * 参数菜单的构造函数。
     * @param props.parameters 所有参数的初始值。
     */
    constructor(props: DefaultParameterContainerProps){
        super(props)

        this.item_refs = Object.keys(this.props.parameters).reduce((obj , key)=>{
            obj[key] = React.createRef<ParameterItemComponent>()
            return obj
        } , {})
    }

    /** 这个函数向外界提供一个完整的更新后的参数列表。 */
    public get_parameters(){
        let me = this
        let ret = {}
        for(let key in this.props.parameters){
            if(!(me.item_refs[key] && me.item_refs[key].current)){
                ret[key] = this.props.parameters[key] // 如果这个`ref`还没创建，返回初始值。
            }
            else {
                ret[key] = me.item_refs[key].current.get_item()
            }
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

        return <List>{Object.keys(me.props.parameters).map((key,idx)=>{
            return <ListItem key = {idx}>
                <ParameterItemComponent
                    ref = {this.item_refs[key]}
                    name = {key}
                    parameter_item = {me.props.parameters[key]}
                />
            </ListItem>
        })}</List>
    }
}



/** 这个组件向具体的编辑器和具体的节点提供`DefaultParameterContainer`。
 * 注意，这个组件不包含打开菜单的逻辑。
 * @param props.editor 这个组件所服务的编辑器。
 * @param props.element 这个组件所服务的节点。
 */
class DefaultParameterWithEditor extends React.Component<EditorButtonInformation>{

    /** 参数菜单的引用。 */
    container_ref: React.RefObject<DefaultParameterContainer>

    constructor(props){
        super(props)

        this.container_ref = React.createRef()
    }

    get_parameters(){
        let container = this.get_container()
        if(container){ // 如果引用已经建立，就直接询问
            return container.get_parameters()
        }
        // 如果引用还未建立，就返回初始值。
        return this.props.node.parameters
    }

    get_container(){
        if(this.container_ref && this.container_ref.current){
            return this.container_ref.current
        }
        return undefined
    }

    render(){
        let me = this

        return <DefaultParameterContainer
            ref = { me.container_ref }
            parameters = { me.props.node.parameters }
        />
    }
}

/** 参数更新抽屉的`props` */
type DefaultParameterWithEditorWithDrawerProps = EditorButtonInformation & {

    /** 抽屉是否打开。 */
    open: boolean 

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
function DefaultParameterWithEditorWithDrawer(props: DefaultParameterWithEditorWithDrawerProps){
    let onClose = props.onClose || ((e:any)=>{})
    let parametereditor_ref = React.useRef<DefaultParameterWithEditor | null>(null)
    
    // 记录进入时的光标位置，以便在退出时还原。
    let [enter_selection , set_ec] = React.useState<Slate.Location | undefined>(undefined)

    return <GlobalInfo.Consumer>{globalinfo=>{
        let editor = globalinfo.editor as EditorComponent

        return <Drawer 
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
                        editor.auto_set_parameter(props.node, parameters)
                    }
                    SlateReact.ReactEditor.focus(editor.get_slate())
                    if(enter_selection && enter_selection["anchor"] && enter_selection["anchor"]["path"]){
                        Slate.Transforms.select(editor.get_slate() , enter_selection) // 设置为保存的selection。
                    }
                }
            }}
            PaperProps  = {{sx: { width: "40%" }}}
        >
            <Box><StructureTypography>idx: {props.node.idx}</StructureTypography></Box>
            <Divider />
            <DefaultParameterWithEditor node={props.node} ref={parametereditor_ref}/>
            <Button onClick={onClose}>Close</Button>
        </Drawer>
    }}</GlobalInfo.Consumer>
}

