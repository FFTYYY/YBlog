/** 
 * 这个模块提供一些默认的 Support 节点的渲染器。
 * @module
 */
import React from "react"
import {
    Typography , 
    Paper , 
    Card , 
    Box , 
    Stack , 
    Button , 
    ButtonGroup , 
    Divider , 
    IconButton , 
    Grid , 
    Skeleton  , 
}
from "@mui/material"
import {
    South as SouthIcon , 
    North as NorthIcon , 
    KeyboardArrowDown as KeyboardArrowDownIcon , 
}
from "@mui/icons-material"


import * as Slate from "slate"
import {
    SupportNode , 
    ConceptNode , 
    GlobalInfo , 
} from "../core"

import { 
    EditorRenderer , 
    EditorRendererProps  , 
    EditorComponent , 
} from "../editor"

import {  
    AutoStack , 
    AutoTooltip , 
    Direction  , 
} from "./uibase"
import {  
    DefaultCloseButton , 
    DefaultParameterEditButton , 
    AutoStackedPopperWithButton , 
    NewParagraphButtonUp , 
    NewParagraphButtonDown , 
    AutoStackedPopperButtonGroupMouseless , 
    EditorButtonInformation , 
} from "./buttons"
import { 
    EditorComponentPaper as ComponentPaper , 
    EditorUnselecableBox as UnselecableBox , 
    EditorComponentBox as ComponentBox , 
    EditorStructureTypography as StructureTypography , 
} from "./uibase"

import {
    DefaultNewAbstractButton , 
    DefaultEditAbstractButton , 
} from "./abstract"
import {
    EditorNodeInfoFunction , 
} from "./base"


export { 
    get_default_spliter_editor , 
    get_default_display_editor , 
}

/** 这个函数返回一个默认的分界符组件。 */
function get_default_spliter_editor({
    get_title = (n,p)=>p.title
}: {
    get_title?: EditorNodeInfoFunction<SupportNode , string>
}){
    return (props: EditorRendererProps<SupportNode>) => {
        let editor      = React.useContext(GlobalInfo).editor as EditorComponent
        let node        = props.node
        let parameters  = editor.get_core().get_printer().process_parameters(node)
        let title       = get_title(node, parameters)

        return <UnselecableBox><ComponentBox>
            <Divider>
                <Paper variant="outlined" sx = {{
                    paddingX: "0.5rem"
                }}>
                    <AutoStack force_direction="row">
                        <StructureTypography>{title}</StructureTypography>
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
                                DefaultCloseButton , 
                                NewParagraphButtonUp , 
                                NewParagraphButtonDown , 
                            ]}
                        /> 
                    </AutoStack>
                </Paper>
                {props.children /* 对于一个void组件，其children也必须被渲染，否则会报错。*/} 
            </Divider>
        </ComponentBox></UnselecableBox>
    }
}

/** 这个函数返回一个用来显示元素的 *行内* 组件。 
 * @param params.get_label 获得组件名的方法
 * @param params.is_empty 获得组件是否为空的方法
 * @param params.render_element 渲染内容。
 */
function get_default_display_editor({
    get_label       = (n,p)=>p.label, 
    is_empty        = (n,p)=>!(p.url) , 
    render_element  = (props)=><img src={props.node.parameters.url.val as string}/>, 
} : {
    get_label       ?: EditorNodeInfoFunction<SupportNode , string> , 
    is_empty        ?: EditorNodeInfoFunction<SupportNode , boolean> , 
    render_element  ?: (props: EditorButtonInformation<SupportNode>)=>any , 
}){
    return (props: EditorRendererProps<SupportNode>) => {
        let editor      = React.useContext(GlobalInfo).editor as EditorComponent
        let node        = props.node
        let parameters  = editor.get_core().get_printer().process_parameters(node)
        let label = get_label(node, parameters)
        let empty = is_empty(node, parameters)
        let R = render_element

        return <ComponentPaper is_inline>{props.children}<UnselecableBox>
            <AutoStack force_direction = "row">
                <Box sx={{
                    marginX: "0.25rem"
                }}>
                    {empty ? <StructureTypography>EMPTY</StructureTypography> : <R node={node} /> }
                </Box>
                <AutoStack force_direction = {empty ? "row" : "column"}>
                    <StructureTypography sx={{marginY: "0.2rem", marginX: "auto"}}>{label}</StructureTypography>
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
                            DefaultCloseButton , 
                            NewParagraphButtonUp , 
                            NewParagraphButtonDown , 
                        ]}
                    /> 
                </AutoStack>
            </AutoStack>
        </UnselecableBox></ComponentPaper>
    }
}
