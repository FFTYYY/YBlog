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


import { Node, Editor } from "slate"

import { GroupNode , StyledNode , paragraph_prototype , get_node_type , get_param_val } from "../../core/elements"
import type { ValidParameter } from "../../core/elements"
import type { EditorRenderer_Func , EditorRenderer_Props } from "../../editor"
import { YEditor } from "../../editor"

import { is_same_node , node2path } from "../utils"

import { 
    DefaultParameterEditButton , 
    DefaultCloseButton , 
    AutoStackedPopperWithButton , 
    NewParagraphButton , 
    DefaultSwicth ,
    DefaultSoftDeleteButton , 
} from "./universe/buttons"
import { DefaultHiddenEditorButtons } from "./hidden"

import { AutoTooltip  , AutoStack , Direction , SimpleAutoStack , AutoStackedPopper} from "../basic"
import { 
    EditorComponentPaper as ComponentPaper , 
    EditorParagraphBox as ParagraphBox , 
    EditorBackgroundPaper as BackgroundPaper , 
    EditorComponentEditingBox as ComponentEditorBox , 
    EditorUnselecableBox as UnselecableBox , 
    EditorComponentBox as ComponentBox , 
    EditorStructureTypography as StructureTypography , 
} from "./basic"

import type { UniversalComponent_Props } from "./universe" 

export { get_DefaultGroupEditor_with_AppBar , get_DefaultGroupEditor_with_RightBar}

/** 为 Group 类型的节点定制的 Paper ，在节点前后相连时会取消前后距离。 */
let GroupPaper = (props: PaperProps & {element: GroupNode}) => <ComponentPaper {...props} 
    sx = { props.element.relation == "chaining" ? { marginTop: "0" } : {} }
/>

/** 这个函数返回一个默认的带应用栏的 group 组件。用于比较大的 group 组件。
 * @param get_label 从参数列表获得 title 的方法。
 * @param appbar_extra 要额外向 appbar 里添加的组件。
 * @param surrounder 包裹内容区域的组件。
 * @returns 一个用于渲染group的组件。
 */
function get_DefaultGroupEditor_with_AppBar({
    get_label       = (n:GroupNode)=>get_param_val(n,"label") as string, 
    appbar_extra  = (props) => <></> , 
    surrounder    = (props) => <>{props.children}</>
}: {
    get_label       ?: (n:GroupNode)=>string ,  
    appbar_extra    ?: (props: UniversalComponent_Props) => any, 
    surrounder      ?: (props: UniversalComponent_Props & {children: any}) => any ,
}): EditorRenderer_Func{
    // 渲染器
    return (props: EditorRenderer_Props) => {
        let element = props.element as GroupNode
        let editor = props.editor
        let label   = get_label(element)

        let E = appbar_extra
        let SUR = surrounder

        return <GroupPaper element={element}>
            <AutoStack force_direction="column">
                <UnselecableBox>
                    <Toolbar sx={{overflow: "auto"}}><AutoStack>
                        <StructureTypography>{label}</StructureTypography>
                        <DefaultParameterEditButton editor={editor} element={element} />         
                        <DefaultHiddenEditorButtons editor={editor} element={element} />
                        <DefaultSwicth              editor={editor} element={element} />
                        <NewParagraphButton         editor={editor} element={element} />
                        <DefaultCloseButton         editor={editor} element={element} />
                        <DefaultSoftDeleteButton    editor={editor} element={element} />
                        <E                          editor={editor} element={element} />
                    </AutoStack></Toolbar>
                </UnselecableBox >
                <Divider />
                <ComponentEditorBox autogrow>
                    <SUR editor={editor} element={element}>{props.children}</SUR>
                </ComponentEditorBox>
            </AutoStack>
        </GroupPaper>
    }
}

/** 这个函数返回一个默认的group组件，但是各种选项等都被折叠在右侧的一个小按钮内。用于比较小的group。
 * @param get_label 从参数列表获得title的方法。
 * @param rightbar_extra 要额外向添加的组件。
 * @param surrounder 包裹内容区域的组件。
 * @returns 一个用于渲染group的组件。
*/
function get_DefaultGroupEditor_with_RightBar({
    get_label       = (n:GroupNode)=>get_param_val(n,"label") as string, 
    rightbar_extra  = (props) => <></> , 
    surrounder      = (props) => <>{props.children}</>
}: {
    get_label       ?: (n:GroupNode)=>string , 
    rightbar_extra  ?: (props: UniversalComponent_Props) => any, 
    surrounder      ?: (props: UniversalComponent_Props & {children: any}) => any ,
}): EditorRenderer_Func{

    return (props: EditorRenderer_Props) => {
        let element = props.element as GroupNode
        let editor = props.editor
        let label   = get_label(element)
        let E = rightbar_extra
        let SUR = surrounder

        return <GroupPaper element={element}>
            <SimpleAutoStack force_direction="row">
                <ComponentEditorBox autogrow>
                    <SUR editor={editor} element={element}>{props.children}</SUR>
                </ComponentEditorBox>                
                <UnselecableBox sx={{textAlign: "center"}}>
                    <AutoStack>
                        <E editor={editor} element={element}/>
                        <StructureTypography variant="overline">{label}</StructureTypography>
                        <AutoStackedPopperWithButton
                            close_on_otherclick
                            button_class = {IconButton}
                            button_props = {{
                                size: "small" , 
                                children: <KeyboardArrowDownIcon fontSize="small"/> ,  
                            }}
                            title = "展开"
                        >
                            <DefaultParameterEditButton editor={editor} element={element}/>
                            <DefaultHiddenEditorButtons editor={editor} element={element} />
                            <DefaultSwicth              editor={editor} element={element} />
                            <DefaultCloseButton         editor={editor} element={element} />
                            <DefaultSoftDeleteButton    editor={editor} element={element} />
                            <NewParagraphButton         editor={editor} element={element} />
                        </AutoStackedPopperWithButton>
                    </AutoStack>
                </UnselecableBox>
            </SimpleAutoStack>
        </GroupPaper>
    }
}
