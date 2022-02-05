/** 
 * 这个模块提供一些默认的 Inline 的渲染器。
 * @module
 */

import React, {useState} from "react"

import { Transforms, Node, Editor } from "slate"

import Button       from "@mui/material/Button"
import Card         from "@mui/material/Card"
import TextField    from "@mui/material/TextField"
import Grid         from "@mui/material/Grid"
import CardHeader   from "@mui/material/CardHeader"
import Menu         from "@mui/material/Menu"
import MenuItem     from "@mui/material/MenuItem"
import Drawer       from "@mui/material/Drawer"
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ButtonGroup from '@mui/material/ButtonGroup'
import CodeIcon from '@mui/icons-material/Code'
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import IconButton from '@mui/material/IconButton'

import { InlineStyle , EditorCore} from "../core/editor_core"
import { InlineNode , StyledNode } from "../core/elements"
import type { EditorRenderer_Func , EditorRenderer_Props } from "../editor_interface"
import { YEditor } from "../editor_interface"

import { non_selectable_prop , is_same_node} from "../utils"
import { DefaultHidden } from "./hidden"
import { DefaultParameterContainer , DefaultParameterWithEditorWithDrawer} from "./universe"

export { new_default_iniline }

function new_default_iniline(name:string = "strong" , init_parameters:{title?:string} & any = {})
    : [InlineStyle,EditorRenderer_Func]
{
    let style = new InlineStyle(name , init_parameters)

    let renderer = (props: EditorRenderer_Props) => {
        let element = props.element as InlineNode
        let editor  = props.editor
        let [ open , set_open ] = useState(false) // 抽屉是否打开

        return <Box component="span" {...props.attributes}><Card 
            style={{
                backgroundColor: "#AABBCC" , 
                display: "inline-block" , 
            }}
        >
            <Stack direction="row" spacing={1}>
                {props.children}
                <ButtonGroup variant="text" {...non_selectable_prop}>
                    <IconButton onClick = {e=>set_open(true)}><CodeIcon sx={{ fontSize: 10 }}/></IconButton >
                    <DefaultHidden editor = {editor} element = {element}/>
                </ButtonGroup>
            </Stack>
            <DefaultParameterWithEditorWithDrawer open={open} editor={editor} element={element}
                onClose = { (e)=>{set_open(false)} }
            />
        </Card></Box>
    }
    
    return [style , renderer]
}