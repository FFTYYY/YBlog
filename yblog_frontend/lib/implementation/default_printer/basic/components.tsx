import {
    Typography , 
    Box , 
    Paper , 
    Divider , 
} from "@mui/material"
import type {
    TypographyProps , 
    PaperProps , 
    BoxProps , 
    DividerProps , 
} from "@mui/material"
import type { SxProps } from "@mui/material/styles"


import { Node } from "slate"
import type  { PrinterRenderFunc_Props } from "../../../printer"
import { GroupNode} from "../../../core/elements"
import type { PrinterRenderer } from "../../../printer"
import React from "react"

export { 
    PrinterDivider , 
    PrinterWeakenText , 
    PrinterDisplayText , 
    PrinterTitleBoxText , 
    PrinterParagraphBox , 
    PrinterPartBox , 
    PrinterNewLevelBox , 
    PrinterOldLevelBox , 
    PrinterBackgroundPaper , 
}

/** 默认的分隔线。 */
const PrinterDivider = (props: DividerProps) => <Divider 
    {...props}
    sx = {[
        {
            marginTop: (theme) => theme.printer.margins.special , 
            marginBottom: (theme) => theme.printer.margins.special , 
        } , 
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

/** 一段要弱化的话。 */
const PrinterWeakenText = (props: TypographyProps  & {inline?: boolean}) => <Typography 
    component = {props.inline ? "span" : Box}
    {...{...props , inline: undefined}}
    sx = {[
        (theme)=>({
            ...theme.printer.typography.weaken, // 使用弱化字体的样式
            ...(props.inline ? { // 如果是行内样式
                marginRight: (theme) => theme.printer.margins.colon , 
                display: "inline-block" , 
            } : {})
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>


/** 一段要展示的话。 */
const PrinterDisplayText = (props: TypographyProps  & {inline?: boolean}) => <Typography 
    component = {props.inline ? "span" : Box}
    {...{...props , inline: undefined}}
    sx = {[
        (theme)=>({
            ...theme.printer.typography.display, // 使用展示字体的样式
            ...(props.inline ? { // 如果是行内样式
                marginRight: (theme) => theme.printer.margins.colon , 
                display: "inline-block" , 
            } : {})
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>


/** 段落节点的默认输出方式。 */
const PrinterParagraphBox = (props: TypographyProps) => <Typography 
    component = {Box}
    {...props}
    sx = {[
        (theme)=>({
            // ...theme.printer.typography.body, // 不要在段落上使用内容字体样式，否则外层无法覆盖之。
            fontFamily  : "inherit" , 
            fontSize    : "inherit" , 
            lineHeight  : "inherit" , 
            lineSpacing : "inherit" , 
            fontWeight  : "inherit" , 

            marginTop: theme.printer.margins.paragraph , 
        }) , 
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

/** 一个的标题，独占一行。这个样式同时包含字体和间距。 */
const PrinterTitleBoxText = (props: TypographyProps & {inline?: boolean}) => <Typography 
    component = {props.inline ? "span" : Box}
    {...{...props , inline: undefined}}
    sx = {[
        (theme)=>({
            ...theme.printer.typography.structure, // 使用结构字体的样式
            ...(props.inline ? { // 如果是行内样式
                marginRight: (theme) => theme.printer.margins.colon , 
                display: "inline-block" , 
            } : {
            })
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

/** 一个用来包裹一个部分的组件。 */
const PrinterPartBox = (props: BoxProps) => <Box 
    {...props}
    sx = {[
        {
            marginTop: (theme) => theme.printer.margins.special , 
            marginBottom: (theme) => theme.printer.margins.special , 
        } , 
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

/** 用来包裹右边部分，从而开启新层级的组件。 */
const PrinterNewLevelBox = (props: BoxProps) => <Box 
    {...props}
    sx = {[
        {
            marginLeft: (theme) => theme.printer.margins.level , 
        } ,
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

/** 用来包裹左边部分，从而开启新层级的组件。 */
const PrinterOldLevelBox = (props: BoxProps) => <Box 
    {...props}
    sx = {[
        {
            width: (theme) => theme.printer.margins.level , 
        } ,
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

/** 一个用来包裹一个部分的组件。 */
const PrinterBackgroundPaper = (props: BoxProps) => <Box 
    {...props}
    sx = {[
        (theme)=>({
            ...theme.printer.typography.body, // 不要内容字体的样式。这个样式应该在最外层使用方便被覆盖。
            padding: theme.printer.margins.structure , 
            boxSizing: "border-box" , // 设置这个属性来让padding不要撑大宽高。
			height: "100%" , 
			width: "100%" , 
			overflowY: "auto" , 
			wordWrap: "break-word" , 
        }) , 
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

