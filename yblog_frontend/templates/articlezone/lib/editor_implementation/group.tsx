/** 
 * 这个模块提供一些默认的 Group 的渲染器。
 * @module
 */

import React, {useState , createRef} from "react"


import {
    Typography , 
    Button , 
    Menu , 
    MenuItem , 
    Drawer , 
    AppBar , 
    Box , 
    AccordionDetails , 
    Popper , 
    Tooltip , 
    Switch , 
    Toolbar , 
    Paper , 
    Grid , 
    IconButton , 
    Divider  , 
    Container , 
} 
from "@mui/material"
import type {
    PaperProps
} 
from "@mui/material"

import {
    KeyboardArrowDown as KeyboardArrowDownIcon
} from "@mui/icons-material"

import * as Slate from "slate"

import { GlobalInfo, GroupNode  } from "../core"
import { 
    EditorRendererProps , 
    EditorRenderer , 
    EditorComponent ,  
} from "../editor"

import { 
    DefaultParameterEditButton , 
    DefaultCloseButton , 
    AutoStackedPopperWithButton , 
    NewParagraphButtonUp , 
    NewParagraphButtonDown , 
    DefaultSwicth ,
    DefaultSoftDeleteButton , 

    EditorButtonInformation , 
} from "./buttons"

import {     
    DefaultNewAbstractButton , 
    DefaultEditAbstractButton , 
} from "./abstract"

import { AutoTooltip  , AutoStack , Direction , SimpleAutoStack , AutoStackedPopper} from "./uibase"
import { 
    EditorComponentPaper as ComponentPaper , 
    EditorParagraphBox as ParagraphBox , 
    EditorBackgroundPaper as BackgroundPaper , 
    EditorComponentEditingBox as ComponentEditorBox , 
    EditorUnselecableBox as UnselecableBox , 
    EditorComponentBox as ComponentBox , 
    EditorStructureTypography as StructureTypography , 
} from "./uibase"

import {
    ButtonGroup , 
    ButtonDescription , 
    AutoStackedPopperButtonGroupMouseless , 
} from "./buttons"

import {
    EditorNodeInfoFunction , 
} from "./base"

export { get_deafult_group_editor_with_appbar , get_default_group_editor_with_rightbar}

/** 为 Group 类型的节点定制的 Paper ，在节点前后相连时会取消前后距离。 */
let GroupPaper = (props: PaperProps & {node: GroupNode}) => {
    let {node, ...other_props} = props
    return <ComponentPaper {...other_props} 
        sx = { node.relation == "chaining" ? { marginTop: "0" } : {} }
    />
}

/** 这个函数返回一个默认的带应用栏的 group 组件。用于比较大的 group 组件。
 * @param params.get_label 从参数列表获得 title 的方法。
 * @param params.appbar_extra 要额外向 appbar 里添加的组件。
 * @param params.surrounder 包裹内容区域的组件。
 * @returns 一个用于渲染group的组件。
 */
function get_deafult_group_editor_with_appbar({
    get_label     = (n,p)=>p.label, 
    appbar_extra  = (n,p) => [] , 
    surrounder    = (props) => <>{props.children}</>
}: {
    get_label       ?: EditorNodeInfoFunction<GroupNode, string> ,  
    appbar_extra    ?: EditorNodeInfoFunction<GroupNode, ButtonDescription[]> , 
    surrounder      ?: (props: EditorButtonInformation & {children: any}) => any ,
}): EditorRenderer<GroupNode>{
    // 渲染器
    return (props: EditorRendererProps<Slate.Node & GroupNode>) => {
        let editor      = React.useContext(GlobalInfo).editor as EditorComponent
        let node        = props.node
        let parameters  = editor.get_core().get_printer().process_parameters(node)
        let label       = get_label(node, parameters)
        
        let SUR = surrounder

        return <GroupPaper node={node}>
            <AutoStack force_direction="column">
                <UnselecableBox>
                    <Toolbar sx={{overflow: "auto"}}><AutoStack>
                        <StructureTypography>{label}</StructureTypography>
                        <ButtonGroup 
                            node = {node}
                            idxs = {[0]}
                            buttons = {[
                                DefaultParameterEditButton , 
                                DefaultNewAbstractButton , 
                                DefaultEditAbstractButton , 
                                DefaultSwicth , 
                                NewParagraphButtonUp , 
                                NewParagraphButtonDown , 
                                DefaultCloseButton , 
                                DefaultSoftDeleteButton , 
                                ... appbar_extra(node, parameters)
                            ]}
                        />
                    </AutoStack></Toolbar>
                </UnselecableBox >
                <Divider />
                <ComponentEditorBox autogrow>
                    <SUR node={node}>{props.children}</SUR>
                </ComponentEditorBox>
            </AutoStack>
        </GroupPaper>
    }
}

/** 这个函数返回一个默认的group组件，但是各种选项等都被折叠在右侧的一个小按钮内。用于比较小的group。
 * @param params.get_label 从参数列表获得title的方法。
 * @param params.rightbar_extra 要额外向添加的组件。
 * @param params.surrounder 包裹内容区域的组件。
 * @returns 一个用于渲染group的组件。
 */
function get_default_group_editor_with_rightbar({
    get_label       = (n,p)=>p.label, 
    rightbar_extra  = (n,p) => [] , 
    surrounder      = (props) => <>{props.children}</>
}: {
    get_label       ?: EditorNodeInfoFunction<GroupNode, string> ,  
    rightbar_extra  ?: EditorNodeInfoFunction<GroupNode, ButtonDescription[]> , 
    surrounder      ?: (props: EditorButtonInformation & {children: any}) => any ,
}): EditorRenderer<GroupNode>{

    return (props: EditorRendererProps<Slate.Node & GroupNode>) => {
        let editor      = React.useContext(GlobalInfo).editor as EditorComponent
        let node        = props.node
        let parameters  = editor.get_core().get_printer().process_parameters(node)
        let mylabel     = get_label(node, parameters)
        let SUR = surrounder

        let extra_buttons = rightbar_extra(node, parameters)

        return <GroupPaper node={node}>
            <SimpleAutoStack force_direction="row">
                <ComponentEditorBox autogrow>
                    <SUR node={node}>{props.children}</SUR>
                </ComponentEditorBox>                
                <UnselecableBox>
                    <AutoStack>
                        <ButtonGroup // 额外添加的元素。
                            autostack 
                            node    = {node}
                            buttons = {extra_buttons}
                        />
                        <StructureTypography variant = "overline">{mylabel}</StructureTypography>
                        <AutoStackedPopperButtonGroupMouseless 
                            node = {node}
                            close_on_otherclick 
                            outer_button = {IconButton}
                            outer_props = {{
                                size: "small" , 
                                children: <KeyboardArrowDownIcon fontSize="small"/> , 
                            }}
                            label = "展开"
                            buttons = {[
                                DefaultParameterEditButton , 
                                DefaultNewAbstractButton , 
                                DefaultEditAbstractButton , 
                                DefaultSwicth , 
                                DefaultCloseButton , 
                                DefaultSoftDeleteButton , 
                                NewParagraphButtonUp , 
                                NewParagraphButtonDown , 
                            ]}
                            idxs = {[extra_buttons.length]} // 从extra_buttons.length开始编号。
                        /> 
                    </AutoStack>
                </UnselecableBox>
            </SimpleAutoStack>
        </GroupPaper>
    }
}
