/** 
 * 这个模块提供一些默认的 Inline 的渲染器。
 * @module
 */

import React, {useState} from "react"

import { Node, Editor } from "slate"

import {
    Grid , 
    Box , 
    Stack , 
    IconButton , 
    Typography , 
    Paper , 
} from "@mui/material"
import {
    KeyboardArrowDown as KeyboardArrowDownIcon , 
} from "@mui/icons-material"


import { InlineStyle , EditorCore} from "../../core/editor_core"
import { InlineNode , StyledNode } from "../../core/elements"
import type { EditorRenderer_Func , EditorRenderer_Props } from "../../editor_interface"
import { YEditor } from "../../editor_interface"

import { non_selectable_prop , is_same_node} from "../../utils"
import { DefaultHidden } from "./hidden"
import { DefaultParameterEditButton , DefaultCloseButton } from "./universe"
import { AutoStackedPopper , SimpleAutoStack , AutoStack , UniversalComponent_Props , AutoTooltip , } from "./universe"
import { AutoStackedPopperWithButton } from "./universe"

export { get_DefaultInline }


function get_DefaultInline(
    rightbar_extra: (props: UniversalComponent_Props) => any = (props:UniversalComponent_Props) => <></>
): EditorRenderer_Func{
    return (props: EditorRenderer_Props) => {
        let element = props.element as InlineNode
        let editor  = props.editor
        let E = rightbar_extra

        return <Paper 
            sx={{
                backgroundColor: "#AABBCC" , 
                display: "inline-block" , 
                marginLeft: "1%",
                marginRight: "1%",
            }}
            {...props.attributes}
        >
            <AutoStack force_direction="row">
                <Box sx={{minWidth: "30px"}}>{props.children}</Box>
                <Box {...non_selectable_prop}><AutoStack force_direction="row">
                    <E editor={editor} element={element}/>
                    <AutoStackedPopperWithButton
                        close_on_otherclick
                        button_class = {IconButton}
                        button_props = {{
                            size: "small" , 
                            children: <KeyboardArrowDownIcon fontSize="small"/> ,
                        }} 
                        title = "展开"
                    >
                        <Typography>{element.name}</Typography>
                        <DefaultParameterEditButton editor={editor} element={element}/>
                        <DefaultHidden      editor={editor} element={element} />
                        <DefaultCloseButton editor={editor} element={element} />
                    </AutoStackedPopperWithButton>
                </AutoStack></Box>
            </AutoStack>
        </Paper>
    }
}
