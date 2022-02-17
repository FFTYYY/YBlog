/** 
 * 这个模块提供一些基础组件。
 * @module
 */

 import React from "react"

 import {
     Typography , 
     Box , 
     Paper , 
 } from "@mui/material"
 import type {
     TypographyProps , 
     PaperProps , 
     BoxProps , 
 } from "@mui/material"
import type { ThemeOptions } from "@mui/material/styles"

import { Node } from "slate"


import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
import type { SxProps } from "@mui/material/styles"

export { 
    ComponentPaper , 
    ParagraphBox , 
    EditorBackgroundPaper , 
    ComponentEditorBox , 
    UnselecableBox , 
    ComponentBox , 
}

// TODO 加入一个通用抽屉

/** 这个组件定义一个不可被选中的区域。用于 slate 的各种不希望被修改的辅助部分。 */
const UnselecableBox = (props: BoxProps) => <Box 
    contentEditable = {false}
    {...props}
    sx = {{
        userSelect: "none" , 
        ...props.sx
    } as SxProps}
/>

/** 这个组件定义默认的段落渲染方式。 */
const ParagraphBox = (props: TypographyProps) => <Typography 
    component = {Box}
    {...props}
    sx = {(theme:any)=>{return {
        ...theme.typography.body1,
        marginTop: theme.margins.paragraph , 
        
        ...props.sx , 
    }}}
/>

/** 这个组件定义可以书写的区域。
 * @param props.autogrow 如果为 true ，则区域会自动横向增长以填满父元素。
 */
const ComponentEditorBox = (props: BoxProps & {autogrow?: boolean}) =><Box 
    {...{...props , autogrow: undefined}} // 去掉自己定义的属性。
    sx = {{
        paddingX : (theme: any) => theme.margins.background , 
        ...(props.autogrow
            ? { flex: 1 , minWidth: 0 , } // 如果自动增长，就设置一个 flex 属性。但是必须同时设置一个 minWidth，不知道为啥...
                                          // 可以参考 https://makandracards.com/makandra/66994-css-flex-and-min-width 
            : { minWidth: (theme: any) => theme.widths.minimum_content } // 如果不自动增长，设置一个最小宽度。
        ) ,
        ...props.sx
    } as SxProps}
/>

/** 这个组件定义一个用来渲染特殊节点的纸张。 
 * @param props.is_inline 这个组件是否是行内组件。
*/
const ComponentPaper = (props: PaperProps & {is_inline?: boolean}) =><Paper 
    elevation = {0}
    variant = "outlined" 
    square 
    {...{...props , is_inline: undefined}} // 去掉自己定义的属性。
    sx = {{
        ...(props.is_inline
            ? { // 如果是行内组件。
                display: "inline-block" ,
                height:  (theme: any) => `${theme.typography.body1.lineHeight}rem` , // 高度等于行高。
                color  : (theme: any) => theme.palette.secondary.dark , 
                marginX: (theme: any) => theme.margins.small , 
            } : { // 如果是块级组件。
                marginTop: (theme: any) => theme.margins.paragraph ,
                color  : (theme: any) => theme.palette.primary , 
            }
        ) , 
        ...props.sx
    } as SxProps}
/>

/** 对于一个不用纸张作为最外层元素的节点，这个组件用来提供其边框。 */
const ComponentBox = (props: BoxProps) =><Box 
    {...props}
    sx = {{
        marginTop: (theme: any) => theme.margins.paragraph , 
        ...props.sx
    } as SxProps}
/>


/** 包裹整个编辑器的纸张。 */
const EditorBackgroundPaper = (props: PaperProps) => <Paper 
    elevation = {0}
    variant = "outlined"
    square 
    {...props}
    sx = {{
        width: "100%" , 
        height: "100%" , 
        overflow: "hidden" ,         
    } as SxProps}
/>

