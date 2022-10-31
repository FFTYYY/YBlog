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
    TextField , 
    TableContainer  , 
    TableRow , 
    TableCell , 
    Table , 
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

import { StructNode , StyledNode , paragraph_prototype , get_node_type , get_param_val } from "../../core/elements"
import type { ValidParameter } from "../../core/elements"
import type { EditorRenderer_Func , EditorRenderer_Props } from "../../editor"
import { YEditor } from "../../editor"

import { is_same_node , node2path } from "../utils"

import { 
    DefaultParameterEditButton , 
    DefaultCloseButton , 
    AutoStackedPopperWithButton , 
    NewParagraphButton , 
    DefaultSwicth  , 
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

export { get_DefaultStructEditor_with_RightBar }

/** 为 Struct 类型的节点定制的 Paper ，在节点前后相连时会取消前后距离。 */
let StructPaper = (props: PaperProps & {element: StructNode}) => <ComponentPaper {...props} 
    sx = { props.element.relation == "chaining" ? { marginTop: "0" } : {} }
/>

/** 这个函数返回一个默认的group组件，但是各种选项等都被折叠在右侧的一个小按钮内。用于比较小的group。
 * @param get_title 从参数列表获得title的方法。
 * @param rightbar_extra 要额外向添加的组件。
 * @param surrounder 包裹内容区域的组件。
 * @returns 一个用于渲染group的组件。
 */
function get_DefaultStructEditor_with_RightBar({
    get_label       = (n:StructNode)=>get_param_val(n,"label") as string, 
    get_widths      = (n,p)=>[]                                 ,
    rightbar_extra  = (props) => <></>                          , 
    surrounder      = (props) => <>{props.children}</>          , 
} : {
    get_label       ?: (n:StructNode)=>string , 
    get_widths      ?: ((num_children: number, node:StructNode)=>number[])   ,
    rightbar_extra  ?: (props: UniversalComponent_Props) => any             , 
    surrounder      ?: (props: UniversalComponent_Props & {children: any}) => any , 
}): EditorRenderer_Func{

    return (props: EditorRenderer_Props) => {
        let element = props.element as StructNode
        let editor  = props.editor
        let label   = get_label(element)
        let E       = rightbar_extra
        let SUR     = surrounder

        let children = element.children
        
        // 获得元素的相对长度
        let widths = get_widths(element.num_children , element)
        widths = widths.splice(0,children.length) // 确保为widths元素不少
        while(widths.length < children.length) // 确保widths元素不多
            widths.push(1)
        let sum = widths.reduce( (s,x)=>s+x , 0 ) // 求所有元素的和。

        let [nc_val, set_nc_val] = React.useState<number>(element.num_children) // 用来输入有多少个子节点的输入框。

        React.useEffect(()=>{
            // XXX 这个operation的名字应该规范一下...
            editor.add_delay_operation(`${element.idx}-struct` , ()=>{
                editor.set_node(element , {num_children: nc_val})
            })
        })

        return <StructPaper element={element}>
            <AutoStack force_direction="row">
                
                <Grid container columns={sum} sx={{width: "100%"}}>
                    {widths.map((width,idx)=>{
                        return <Grid key={idx} item xs={width} sx={{
                            borderRight: idx == children.length-1 ? "none" : "1px solid"
                        }}>
                            <ComponentEditorBox autogrow >
                                <SUR editor={editor} element={element}>
                                    {props.children[idx]}
                                </SUR>
                            </ComponentEditorBox>
                        </Grid>
                    })}
                </Grid>
                    
                <UnselecableBox>
                    <SimpleAutoStack>
                        <StructureTypography variant="overline">{label}</StructureTypography>
                        <E editor={editor} element={element}/>
                        <AutoStackedPopperWithButton
                            close_on_otherclick
                            button_class = {IconButton}
                            button_props = {{
                                size: "small" , 
                                children: <KeyboardArrowDownIcon fontSize="small"/> , 
                            }}
                            title = "展开"
                            onClose={()=>{
                                editor.apply_delay_operations() // 在退出时才应用更改。
                            }}
                        >
                            <DefaultParameterEditButton editor={editor} element={element} />
                            <DefaultHiddenEditorButtons editor={editor} element={element} />
                            <DefaultSwicth              editor={editor} element={element} />
                            <DefaultCloseButton         editor={editor} element={element} />
                            <DefaultSoftDeleteButton    editor={editor} element={element} puretext />
                            <NewParagraphButton         editor={editor} element={element} />
                            <TextField 
                                sx      ={{width: "5rem"}}
                                type    = "number" 
                                label   = "number of children"  
                                defaultValue = {element.num_children}
                                onChange = {e=>{
                                    set_nc_val(parseInt(e.target.value))
                                }}
                            />
                        </AutoStackedPopperWithButton>
                    </SimpleAutoStack>
                </UnselecableBox>
            </AutoStack>
        </StructPaper>
    }
}
