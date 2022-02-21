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
import type { EditorRenderer_Func , EditorRenderer_Props } from "../../editor"
import { YEditor } from "../../editor"

import { is_same_node} from "../utils"
import { DefaultHiddenEditorButtons } from "./hidden"
import { DefaultParameterEditButton , DefaultCloseButton } from "./universe"
import { UniversalComponent_Props , } from "./universe"
import { AutoStackedPopper , SimpleAutoStack , AutoStack , AutoTooltip  } from "../basic"
import { AutoStackedPopperWithButton } from "./universe"
import { 
    EditorComponentPaper as ComponentPaper , 
    EditorParagraphBox as ParagraphBox , 
    EditorBackgroundPaper as BackgroundPaper , 
    EditorComponentEditingBox as ComponentEditorBox , 
    EditorUnselecableBox as UnselecableBox , 
    EditorComponentBox as ComponentBox , 
    EditorStructureTypography as StructureTypography , 
} from "./basic"

export { get_DefaultInlineEditor }

/** 默认的内联样式渲染器。
 * @remark 现在有个bug，在内联节点的末尾输入中文的时候会出错。
 * 见https://github.com/ianstormtaylor/slate/issues/4811
 */
function get_DefaultInlineEditor(
    name: string = "" , 
    surrounder: (props: UniversalComponent_Props & {children: any}) => any = (props) => <React.Fragment>{props.children}</React.Fragment> , 
    rightbar_extra: (props: UniversalComponent_Props) => any = (props) => <></> , 
): EditorRenderer_Func{
    return (props: EditorRenderer_Props) => {
        let element = props.element as InlineNode
        let editor  = props.editor
        let Extra = rightbar_extra
        let SUR = surrounder

        return <ComponentPaper is_inline>
            <AutoStack force_direction="row">
                <ComponentEditorBox>
                    <SUR editor={editor} element={element}>{props.children}</SUR>
                </ComponentEditorBox>
                <UnselecableBox>
                    <AutoStack force_direction="row">
                        <Extra editor={editor} element={element}/>
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
                            <Typography>{element.name}</Typography>
                            <DefaultParameterEditButton editor={editor} element={element}/>
                            <DefaultHiddenEditorButtons      editor={editor} element={element} />
                            <DefaultCloseButton editor={editor} element={element} />
                        </AutoStackedPopperWithButton>
                    </AutoStack>
                </UnselecableBox>
            </AutoStack>
        </ComponentPaper>
    }
}
