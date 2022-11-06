import React from "react" 

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

export { 
    PrinterDivider , 
    PrinterWeakenText , 
    PrinterDisplayText , 
    PrinterStructureBoxText , 
    PrinterParagraphBox , 
    PrinterPartBox , 
    PrinterNewLevelBox , 
    PrinterOldLevelBox , 
    PrinterBackgroundPaper , 
    remtimes , 
    rem2num , 
    num2rem , 
}

/** 将`xxxrem`形式的字符串转换成数字。 */
function rem2num(rem:string){
	return Number( rem.slice(0,rem.length-3) )
}

/** 将数字转换成`"xxxrem"`形式的字符串。 */
function num2rem(num: number){
	return `${num}rem`
}

/** 将`xxxrem`形式的字符串乘以数字。 */
function remtimes(rem:string , num: number){
	return  num2rem( rem2num(rem) * num )
}



/** 默认的分隔线。 */
const PrinterDivider = (props: DividerProps) => <Divider 
    {...props}
    sx = {[
        {
            marginTop: (theme) => theme.margins.special , 
            marginBottom: (theme) => theme.margins.special , 
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
            ...theme.fonts.weaken, // 使用弱化字体的样式
            ...(props.inline ? { // 如果是行内样式
                marginRight: (theme) => theme.margins.colon , 
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
            ...theme.fonts.display, // 使用展示字体的样式
            ...(props.inline ? { // 如果是行内样式
                marginRight: (theme) => theme.margins.colon , 
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
            // ...theme.fonts.body, // 不要在段落上使用内容字体样式，否则外层无法覆盖之。
            fontFamily  : "inherit" , 
            fontSize    : "inherit" , 
            lineHeight  : "inherit" , 
            lineSpacing : "inherit" , 
            fontWeight  : "inherit" , 

            marginTop: theme.margins.paragraph , 
        }) , 
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

/** 一个的标题，独占一行。这个样式同时包含字体和间距。 */
const PrinterStructureBoxText = (props: TypographyProps & {inline?: boolean , leftmargin?: boolean}) => <Typography 
    component = {props.inline ? "span" : Box}
    {...{...props , inline: undefined , leftmargin: undefined}}
    sx = {[
        (theme)=>({
            ...theme.fonts.structure, // 使用结构字体的样式
            ...(props.inline ? { // 如果是行内样式
                ...(props.leftmargin ? { // 是否将空格放在左边。
                    marginLeft: (theme) => theme.margins.colon ,
                }: {
                    marginRight: (theme) => theme.margins.colon ,
                }) , 
                display: "inline-block" , 
            } : {})
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

/** 一个用来包裹一个部分的组件。 */
const PrinterPartBox = (props: BoxProps & {subtitle_like?: boolean , small_margin?: boolean}) => <Box 
    {...{...props , subtitle_like: undefined , small_margin: undefined}}
    sx = {[
        (theme)=>({
            ...(props.subtitle_like ? theme.fonts.title : {}) , 
            marginTop: props.small_margin ? theme.margins.paragraph : theme.margins.special , 
            // marginBottom: (theme) => theme.printer.margins.special , // 下方的边距由下方的元素负责。
        }) , 
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

/** 用来包裹右边部分，从而开启新层级的组件。 */
const PrinterNewLevelBox = (props: BoxProps) => <Box 
    {...props}
    sx = {[
        {
            left: (theme) => theme.margins.level , 
            position: "relative" , 
        } ,
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>

/** 用来包裹左边部分，从而开启新层级的组件。 */
const PrinterOldLevelBox = (props: BoxProps) => <Box 
    {...props}
    sx = {[
        (theme)=>({
            width: theme.margins.level , 
            flex: `0 0 ${theme.margins.level}` , 
        }) ,
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>


/** 一个用来包裹一个部分的组件。 */
const PrinterBackgroundPaper = (props: BoxProps) => <Box 
    {...props}
    sx = {[
        (theme)=>({
            ...theme.fonts.body, // 不要内容字体的样式。这个样式应该在最外层使用方便被覆盖。
            padding: theme.margins.structure , 
            boxSizing: "border-box" , // 设置这个属性来让padding不要撑大宽高。
			height: "100%" , 
			width: "100%" , 
			overflowY: "visible" , 
			wordWrap: "break-word" , 
            paddingX: "2rem" , 
        }) , 
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]) , 
    ]}
/>


