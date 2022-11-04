/** 
 * 这个模块提供一些默认的 Group 的渲染器。
 * @module
 */

import React, {useState , createRef} from "react"


import {
    Grid , 
    IconButton , 
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

import { 
    StructNode , 
    ParameterList , 
    GlobalInfo , 
} from "../core"
import { 
    EditorRenderer , 
    EditorRendererProps , 
    EditorComponent , 

    slate_concept_node2path , 
} from "../editor"

import { 
    DefaultParameterEditButton , 
    DefaultCloseButton , 
    AutoStackedPopperWithButton , 
    NewParagraphButtonUp , 
    NewParagraphButtonDown , 
    DefaultSwicth  , 
    DefaultSoftDeleteButton , 

    EditorButtonInformation , 
} from "./buttons"
import { 
    DefaultNewAbstractButton , 
    DefaultEditAbstractButton ,  
} from "./abstract"

import { 
    AutoTooltip  , 
    AutoStack , 
    Direction , 
    SimpleAutoStack , 
    AutoStackedPopper
} from "./uibase"

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

export { get_default_struct_editor_with_rightbar }

/** 为 Struct 类型的节点定制的 Paper ，在节点前后相连时会取消前后距离。 */
let StructPaper = (props: PaperProps & {node: StructNode}) => <ComponentPaper {...props} 
    sx = { props.node.relation == "chaining" ? { marginTop: "0" } : {} }
/>

/** 这个函数返回一个默认的结构节点组件。这个节点需要用户确定其子节点数量以及每个子节点的宽度，并自动创建和删除子节点，使得子节点的
 *  数量和给定的一致，并且自动调整子节点的宽度。
 * 用户给出的宽度会被理解为比例，如果用户给出的宽度不足，则自动用`1`填充。
 * @param params.get_label 从节点获得`label`的方法。
 * @param params.get_numchildren  从节点获得的子节点数量的方法。返回`-1`表示不限制子节点数量。
 * @param params.get_widths  从节点获得每个子节点宽度的方法。
 * @param params.rightbar_extra 要额外向添加的组件。
 * @param params.surrounder 包裹内容区域的组件。
 * @returns 一个用于渲染group的组件。
 */
function get_default_struct_editor_with_rightbar({
    get_label       = (n,p) => p.label , 
    get_numchildren = () => 1 ,
    get_widths      = () => [] ,
    rightbar_extra  = () => [] , 
    surrounder      = (props) => <>{props.children}</> , 
} : {
    get_label       ?: EditorNodeInfoFunction<StructNode, string> , 
    get_numchildren ?: EditorNodeInfoFunction<StructNode, number> , 
    get_widths      ?: EditorNodeInfoFunction<StructNode, number[]> ,
    rightbar_extra  ?: EditorNodeInfoFunction<StructNode, ButtonDescription []> , 
    surrounder      ?: (props: EditorButtonInformation<StructNode> & {children: any}) => any , 
}): EditorRenderer<StructNode>{

    return (props: EditorRendererProps<StructNode>) => {
        let globalinfo  = React.useContext(GlobalInfo)
        let editor      = globalinfo.editor as EditorComponent
        let node        = props.node
        let parameters  = editor.get_core().get_printer().process_parameters(node)

        let mylabel = get_label(node, parameters)
        let SUR     = surrounder

        let mychildren = node.children
        let mypath = slate_concept_node2path(editor.get_slate() , node)
        let num_children = get_numchildren(node, parameters)
        if(num_children < 0){
            num_children = mychildren.length
        }

        // 获得并规范元素的相对长度。
        let widths = get_widths(node, parameters)
        widths = widths.splice(0,num_children) // 确保为widths元素不少
        while(widths.length < num_children) // 确保widths元素不多
            widths.push(1)
        let widthsum = widths.reduce( (s,x)=>s+x , 0 ) // 求所有元素的和。

        React.useEffect(()=>{
            // 规范子节点数量。
            if(num_children < mychildren.length){
                let paths = []
                for(let x = num_children; x < mychildren.length; x++){
                    paths.push([...mypath, x])
                }
                editor.delete_nodes_by_paths(paths) // 删除最后一个子节点。
            }
            else if(num_children > mychildren.length){
                let new_nodes = []
                for(let x = mychildren.length; x < num_children; x++){
                    new_nodes.push(editor.get_core().create_group("structure-child" , "chaining"))
                }
                editor.add_nodes(new_nodes, [...mypath, mychildren.length]) // 在最后一个节点后面添加节点
            }
        })


        return <StructPaper node={node}>
            <AutoStack force_direction="row">
                
                <Grid container columns={widthsum} sx={{width: "100%"}}>
                    {widths.map((width,idx)=>{
                        return <Grid key={idx} item xs={width}>
                            <ComponentEditorBox autogrow >
                                <SUR node={node}>
                                    {props.children[idx]}
                                </SUR>
                            </ComponentEditorBox>
                        </Grid>
                    })}
                </Grid>
                    
                <UnselecableBox>
                    <AutoStack>
                        <ButtonGroup // 额外添加的元素。
                            autostack 
                            node = {node}
                            buttons = {rightbar_extra(node, parameters)}
                        />
                        <StructureTypography sx={{marginX: "auto"}}>{mylabel}</StructureTypography>
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
                        /> 
                    </AutoStack>
                </UnselecableBox>
            </AutoStack>
        </StructPaper>
    }
}
