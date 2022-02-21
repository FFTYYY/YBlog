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

import { Node } from "slate"

import { SupportNode , paragraph_prototype} from "../../core/elements"
import type { EditorRenderer_Func , EditorRenderer_Props } from "../../editor"

import {  AutoStack , AutoTooltip , Direction } from "../basic"
import {  DefaultCloseButton , DefaultParameterEditButton , AutoStackedPopperWithButton , NewParagraphButton } from "./universe"
import { add_nodes , add_nodes_after , add_nodes_before } from "../../behaviours"
import { 
    EditorComponentPaper as ComponentPaper , 
    EditorUnselecableBox as UnselecableBox , 
    EditorComponentBox as ComponentBox , 
} from "./basic"


export { DefaultNewParagraphEditor , get_DefaultSplitterEditor , get_DefaultDisplayerEditor}

/** 这个函数返回一个用来新建段落的辅助节点。 */
function DefaultNewParagraphEditor(props: EditorRenderer_Props){
    let element = props.element as SupportNode
    let editor = props.editor

    let [left_active  , set_left_active ] = React.useState<boolean>(false)
    let [right_active , set_right_active] = React.useState<boolean>(false)
    let placeholder = <Paper sx ={{height: "5px"}} variant="outlined"/>
    
    return <UnselecableBox><ComponentBox>
        <Direction.Provider value="row">{props.children}<Grid container spacing={2}>
            <Grid item xs={6}>
                <Box 
                    onMouseOver = {()=>set_left_active(true)}
                    onMouseOut  = {()=>set_left_active(false)}
                >{(()=>{
                    if(left_active)
                        return <AutoTooltip title="向上添加段落"><Button 
                            onClick = { e => { add_nodes_before(editor , paragraph_prototype() , element) }}
                            size = "small"
                            variant = "outlined"
                            fullWidth
                        ><NorthIcon fontSize="small" /></Button></AutoTooltip>
                    return placeholder
                })()}</Box>
            </Grid>
            <Grid item xs={6}>
                <Box 
                    onMouseOver = {()=>set_right_active(true)}
                    onMouseOut  = {()=>set_right_active(false)}
                >{(()=>{
                    if(right_active)
                        return <AutoTooltip title="向下添加段落"><Button 
                            onClick = { e => { add_nodes_after(editor , paragraph_prototype() , element) }}
                            size = "small"
                            variant = "outlined"
                            fullWidth
                        ><SouthIcon fontSize="small" /></Button></AutoTooltip>
                    return placeholder
                })()}</Box>
            </Grid>
        </Grid></Direction.Provider>
    </ComponentBox></UnselecableBox>
}

/** 这个函数返回一个默认的分界符组件。 */
function get_DefaultSplitterEditor(get_title: (parameters:any)=>string = (parameters:any)=>parameters.name){
    return (props: EditorRenderer_Props) => {

        let editor = props.editor
        let element = props.element as SupportNode
        let title = get_title(element.parameters)
        return <UnselecableBox><ComponentBox>
            <Divider>
                <Paper variant="outlined">
                    <AutoStack force_direction="row">
                        <Typography>{title}</Typography>
                        <AutoStackedPopperWithButton
                            close_on_otherclick
                            button_class = {IconButton}
                            button_props = {{
                                size: "small" , 
                                children: <KeyboardArrowDownIcon fontSize="small"/> , 
                            }}
                            title = "展开"
                        >
                            <DefaultParameterEditButton editor={props.editor} element={props.element as SupportNode} />
                            <NewParagraphButton         editor={editor} element={element} />
                            <DefaultCloseButton         editor={editor} element={element} />
                        </AutoStackedPopperWithButton>
                    </AutoStack>
                </Paper>
                {props.children /* 对于一个void组件，其children也必须被渲染，否则会报错。*/} 
            </Divider>
        </ComponentBox></UnselecableBox>
    }
}

/** 这个函数返回一个用来显示元素的 *行内* 组件。 
 * @param name 组件名
 * @param init_parameters 初始参数，默认包含一个名为 url 的参数。
 * @param get_url 如何从参数中获得要显示元素的url，默认为取 url 这个参数。
 * @param render_element 如何在编辑视图中渲染元素。默认为用 <img> 来渲染。
*/
function get_DefaultDisplayerEditor(
    name?: string , 
    is_empty:((parameters: any)=>boolean)=((p)=>!!(p["url"])) , 
    render_element: ((props: {parameters: any})=>any) = ((props)=><img src={props.parameters.url}/> ), 
){
    return (props: EditorRenderer_Props) => {
        let editor = props.editor
        let element = props.element as SupportNode
        let parameters = element.parameters
        let R = render_element

        return <ComponentPaper is_inline>{props.children}<UnselecableBox>
            <AutoStack force_direction="row">
                {is_empty(parameters) ? <R parameters={parameters} /> : name }
                <AutoStackedPopperWithButton
                    close_on_otherclick
                    button_class = {IconButton}
                    button_props = {{
                        sx: {
                            height: "1rem" , 
                            width: "1rem" , 
                            margin: "0",
                        } , 
                        children: <KeyboardArrowDownIcon sx={{height: "1rem"}}/> ,
                    }} 
                    title = {"展开" + (name ? ` / ${name}` : "") }
                >
                    <Typography>{name}</Typography>
                    <DefaultParameterEditButton editor={editor} element={element} />
                    <NewParagraphButton         editor={editor} element={element} />
                    <DefaultCloseButton editor={editor} element={element} />
                </AutoStackedPopperWithButton>
            </AutoStack>
        </UnselecableBox></ComponentPaper>
    }
}
