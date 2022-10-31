/** 
 * 这个模块提供一些基础组件。
 * @module
 */

import React from "react"

import {
    Typography , 
    Box , 
    Paper , 
    Container , 
} from "@mui/material"
import type {
    TypographyProps , 
    PaperProps , 
    BoxProps , 
} from "@mui/material"

export { 
    EditorComponentPaper , 
    EditorParagraphBox , 
    EditorBackgroundPaper , 
    EditorComponentEditingBox , 
    EditorUnselecableBox , 
    EditorComponentBox , 
    EditorStructureTypography , 
}

// XXX 可以加入一个通用抽屉...

/** 这个组件定义一个不可被选中的区域。用于 slate 的各种不希望被修改的辅助部分。 */
const EditorUnselecableBox = (props: BoxProps) => <Box 
    contentEditable = {false}
    {...props}
    sx = {[
        {
            userSelect: "none" , 
        } , 
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

/** 这个组件定义默认的段落渲染方式。 */
const EditorParagraphBox = (props: TypographyProps) => <Typography 
    component = {Box}
    {...props}
    sx = {[
        (theme)=>({
            ...theme.editor.fonts.body,
            marginTop: theme.editor.margins.paragraph , 
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

/** 结构性的文字。 */
const EditorStructureTypography = (props: TypographyProps) => <Typography 
    component = {Box}
    {...props}
    sx = {[
        (theme)=>({
            ...theme.editor.fonts.structure,
            marginY: "auto" , // 垂直居中
            height: theme.editor.fonts.structure.lineHeight , 
            whiteSpace: "nowrap" , 
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>


/** 这个组件定义可以书写的区域。
 * @param props.autogrow 如果为 true ，则区域会自动横向增长以填满父元素。
 */
const EditorComponentEditingBox = (props: BoxProps & {autogrow?: boolean}) =><Box 
    {...{...props , autogrow: undefined}} // 去掉自己定义的属性。
    sx = {[
        {
            paddingX : (theme) => theme.editor.margins.background , 
            ...(props.autogrow
                ? { flex: 1 , minWidth: 0 , } // 如果自动增长，就设置一个 flex 属性。但是必须同时设置一个 minWidth，不知道为啥...
                                            // 可以参考 https://makandracards.com/makandra/66994-css-flex-and-min-width 
                : {} // { minWidth: (theme) => theme.editor.widths.minimum_content } // 如果不自动增长，设置一个最小宽度。
            ) ,
        } , 
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

/** 这个组件定义一个用来渲染特殊节点的纸张。 
 * @param props.is_inline 这个组件是否是行内组件。
*/
const EditorComponentPaper = (props: PaperProps & {is_inline?: boolean}) =><Paper 
    elevation = {0}
    variant = "outlined" 
    square 
    {...{...props , is_inline: undefined}} // 去掉自己定义的属性。
    sx = {[
        {
            ...(props.is_inline
                ? { // 行内
                    display : "inline-block" ,
                    minHeight  :  (theme) => theme.editor.fonts.body.lineHeight , 
                    color   : (theme) => theme.palette.secondary.dark , 
                    marginX : (theme) => theme.editor.margins.small , 
                } : { // 块级
                    marginTop  :  (theme) => theme.editor.margins.paragraph ,      
                    color   : (theme) => theme.palette.primary.main ,        
                }
            ) , 
        } , 
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

/** 对于一个不用纸张作为最外层元素的节点，这个组件用来提供其边框。 */
const EditorComponentBox = (props: BoxProps) =><Box 
    {...props}
    sx = {[
        {
            marginTop: (theme) => theme.editor.margins.paragraph , 
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>


/** 包裹整个编辑器的纸张。 */
const EditorBackgroundPaper = (props: PaperProps) => <Paper 
    elevation = {0}
    variant = "outlined"
    square 
    {...props}
    sx = {[
        {
            width: "100%" , 
            height: "100%" , 
            overflow: "hidden" ,         
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

