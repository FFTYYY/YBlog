/** 
 * 这个模块提供一些默认的 Support 节点的渲染器。
 * @module
 */

import { SupportNode , paragraph_prototype} from "../core/elements"
import { SupportStyle , EditorCore} from "../core/editor_core"
import type { EditorRenderer_Func , EditorRenderer_Props } from "../editor_interface"
import { YEditor } from "../editor_interface"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Node } from "slate"
import { non_selectable_prop , is_same_node} from "../utils"
import { warning } from "../exceptions/warning";
import { node2path } from "../utils"

import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import Paper         from "@mui/material/Paper"
import Card         from "@mui/material/Card"
import Box         from "@mui/material/Box"
import TextField    from "@mui/material/TextField"
import CardHeader   from "@mui/material/CardHeader"
import Menu         from "@mui/material/Menu"
import MenuItem     from "@mui/material/MenuItem"
import Drawer       from "@mui/material/Drawer"
import CodeIcon from '@mui/icons-material/Code'
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import IconButton from '@mui/material/IconButton'
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';

import { DefaultHidden } from "./hidden"

import { DefaultParameterContainer , DefaultParameterWithEditorWithDrawer , DefaultCloseButton} from "./universe"

import Divider from '@mui/material/Divider';
import {DefaultParameterWithEditorWithDrawerWithButton} from "./universe"
import Stack from '@mui/material/Stack';
import { add_nodes } from "../behaviours"

export { newparagraph , new_splitter , new_displayer}

/** 这个函数返回一个用来新建段落的辅助节点。 */
function newparagraph(name:string = "newparagraph"): [SupportStyle,EditorRenderer_Func]{
    let style = new SupportStyle(name , {})

    let renderer = (props: EditorRenderer_Props) => {
        let element = props.element as SupportNode
        let editor = props.editor
        return <ButtonGroup  
                {...non_selectable_prop} 
                {...props.attributes} 
                sx={{
                    width: "98%" , 
                    marginLeft: "1%" , 
                    marginRight: "1%" , 
                }}
                variant = "outlined"
                size = "small"
            > 
            <Button 
                onClick = { e => {
                    let my_path = node2path(editor.core.root , element) // 获取本节点的位置
                    if(my_path == undefined)
                        warning("节点不在节点树中！")
                    add_nodes(editor , paragraph_prototype() , my_path)
                }}
                startIcon={<NorthIcon fontSize="small" />}
                fullWidth
            ></Button>
            <Button 
                onClick = { e => {
                    let my_path = node2path(editor.core.root , element) // 获取本节点的位置
                    if(my_path == undefined)
                        warning("节点不在节点树中！")
                    my_path[my_path.length - 1] ++ // 在下一个节点处插入
                    add_nodes(editor , paragraph_prototype() , my_path)
                }}
                
                startIcon={<SouthIcon fontSize="small" />}
                fullWidth
            ></Button>
            {props.children}
        </ButtonGroup >
    }
    
    return [style , renderer]
}

/** 这个函数返回一个默认的分界符组件。 */
function new_splitter(name: string = "splitter", init_parameters:any = {}): [SupportStyle,EditorRenderer_Func]{
    let style = new SupportStyle(name , init_parameters)

    let renderer = (props: EditorRenderer_Props) => {
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
            <Paper><Stack direction="row">
                <Box>{name}</Box>
                <DefaultParameterWithEditorWithDrawerWithButton editor={props.editor} element={props.element as SupportNode} />
                </Stack></Paper>
            {props.children /* 对于一个void组件，其children也必须被渲染，否则会报错。*/} 

        </Divider>
    }

    return [style , renderer]
}

/** 这个函数返回一个用来显示元素的 *行内* 组件。 
 * @param name 组件名
 * @param init_parameters 初始参数，默认包含一个名为 url 的参数。
 * @param get_url 如何从参数中获得要显示元素的url，默认为取 url 这个参数。
 * @param render_element 如何在编辑视图中渲染元素。默认为用 <img> 来渲染。
*/
function new_displayer(
    name: string = "displayer" , 
    init_parameters:any = {url: ""}, 
    get_url:((parameters: any)=>string)=((p)=>p.url) , 
    render_element: ((props: {url: string, parameters?: any})=>any) = ((props: {url: string})=><img src={props.url}/> ), 
): [SupportStyle , EditorRenderer_Func]{
    let style = new SupportStyle(name , init_parameters , {forceInline: true})

    let renderer = (props: EditorRenderer_Props) => {
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
                <DefaultParameterWithEditorWithDrawerWithButton editor={editor} element={element} />
                <DefaultCloseButton editor={editor} element={element} />
            </ButtonGroup>
        </Stack>
    </Card></Box>
    }

    return [style , renderer]
}
