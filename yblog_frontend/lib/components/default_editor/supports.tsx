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
import { SupportStyle , EditorCore} from "../../core/editor_core"
import type { EditorRenderer_Func , EditorRenderer_Props } from "../../editor_interface"
import { YEditor } from "../../editor_interface"
import { non_selectable_prop , is_same_node} from "../../utils"
import { warning } from "../../exceptions/warning";
import { node2path } from "../../utils"

import {  AutoStack , AutoTooltip , Direction} from "./universe"
import {  DefaultCloseButton , DefaultParameterEditButton , AutoStackedPopperWithButton } from "./universe"
import { add_nodes } from "../../behaviours"

export { DefaultNewParagraph , get_DefaultSplitter , get_DefaultDisplayer}

/** 这个函数返回一个用来新建段落的辅助节点。 */
function DefaultNewParagraph(props: EditorRenderer_Props){
    let element = props.element as SupportNode
    let editor = props.editor

    let [left_active  , set_left_active ] = React.useState<boolean>(false)
    let [right_active , set_right_active] = React.useState<boolean>(false)
    let placeholder = <Paper sx ={{height: "5px"}} variant="outlined"/>
    
    return <Box 
        {...non_selectable_prop} 
        {...props.attributes} 
        sx = {{
            width: "98%" , 
            marginLeft: "1%" , 
            marginRight: "1%" , 
        }}
    ><Direction.Provider value="row">{props.children}<Grid container spacing={2}>
        <Grid item xs={6}>
            <Box 
                onMouseOver = {()=>set_left_active(true)}
                onMouseOut  = {()=>set_left_active(false)}
            >{(()=>{
                if(left_active)
                    return <AutoTooltip title="向上添加段落"><Button 
                        onClick = { e => {
                            let my_path = node2path(editor.core.root , element) // 获取本节点的位置
                            if(my_path == undefined)
                                warning("节点不在节点树中！")
                            add_nodes(editor , paragraph_prototype() , my_path)
                        }}
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
                        onClick = { e => {
                            let my_path = node2path(editor.core.root , element) // 获取本节点的位置
                            if(my_path == undefined)
                                warning("节点不在节点树中！")
                            my_path[my_path.length - 1] ++ // 在下一个节点处插入
                            add_nodes(editor , paragraph_prototype() , my_path)
                        }}
                        size = "small"
                        variant = "outlined"
                        fullWidth
                    ><SouthIcon fontSize="small" /></Button></AutoTooltip>
                return placeholder
            })()}</Box>
        </Grid>
    </Grid></Direction.Provider></Box>
}

/** 这个函数返回一个默认的分界符组件。 */
function get_DefaultSplitter(get_title: (parameters:any)=>string = (parameters:any)=>parameters.name){
    return (props: EditorRenderer_Props) => {

        let editor = props.editor
        let element = props.element as SupportNode
        let title = get_title(element.parameters)
        return <Divider   
            {...non_selectable_prop}
            {...props.attributes} 
            sx = {{
                marginLeft: "2%" , 
                marginRight: "2%" , 
                marginTop: "1%" , 
                marginBottom: "1%" , 
            }}
        >
            <Paper variant="outlined"><AutoStack force_direction="row">
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
                    <DefaultCloseButton         editor={editor} element={element} />
                </AutoStackedPopperWithButton>
            </AutoStack></Paper>
            {props.children /* 对于一个void组件，其children也必须被渲染，否则会报错。*/} 
    
        </Divider>
    }
}

/** 这个函数返回一个用来显示元素的 *行内* 组件。 
 * @param name 组件名
 * @param init_parameters 初始参数，默认包含一个名为 url 的参数。
 * @param get_url 如何从参数中获得要显示元素的url，默认为取 url 这个参数。
 * @param render_element 如何在编辑视图中渲染元素。默认为用 <img> 来渲染。
*/
function get_DefaultDisplayer(
    get_url:((parameters: any)=>string)=((p)=>p.url) , 
    render_element: ((props: {url: string, parameters?: any})=>any) = ((props: {url: string})=><img src={props.url}/> ), 
){
    return (props: EditorRenderer_Props) => {
        let editor = props.editor
        let element = props.element as SupportNode
        let url = get_url(element.parameters)
        let R = render_element

        return <Box component="span" {...props.attributes} {...non_selectable_prop}><Card 
            style={{
                backgroundColor: "#77CC99" , 
                display: "inline-block" , 
            }}
        >
            <Stack direction="row" spacing={1}>
                {props.children}
                <R url={url} />
                <ButtonGroup variant="text" {...non_selectable_prop}>
                    <DefaultParameterEditButton editor={editor} element={element} />
                    <DefaultCloseButton editor={editor} element={element} />
                </ButtonGroup>
            </Stack>
        </Card></Box>
    }
}
