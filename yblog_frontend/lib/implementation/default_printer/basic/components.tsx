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
import type { SxProps } from "@mui/material/styles"


import { Node } from "slate"
import type  { PrinterRenderFunc_Props } from "../../../printer"
import { GroupNode} from "../../../core/elements"
import type { PrinterRenderer } from "../../../printer"

export { PrinterBox , PrinterParagraph , PrinterInlineTitle , NewLevel , PrinterTitle , OldLevel}

/** 段落节点的默认输出方式。 */
const PrinterParagraph = (props: TypographyProps) => <Typography 
    component = {Box}
    {...props}
    sx = {(theme:any)=>{return {
        ...theme.typography.body1,
        marginTop: theme.margins.paragraph , 
    }}}
/>

/** 一个独占一行的标题。 */
const PrinterTitle = (props: BoxProps) => <Box 
    {...props}
    sx = {{
        ...props.sx , 
    } as SxProps}
/>

/** 一个行内的标题样式。 */
const PrinterInlineTitle = (props: BoxProps) => <Box 
    {...props}
    sx = {{
        marginRight: (theme:any) => theme.margins.colon , 
        display: "inline-block" , 
        ...props.sx
    } as SxProps}
/>

/** 一个用来包裹一个部分的组件。 */
const PrinterBox = (props: BoxProps) => <Box 
    {...props}
    sx = {{
        marginTop: (theme:any) => theme.margins.special , 
        ...props.sx
    } as SxProps}
/>

/** 用来包裹右边部分，从而开启新层级的组件。 */
const NewLevel = (props: BoxProps) => <Box 
    {...props}
    sx = {{
        marginLeft: (theme:any) => theme.margins.level , 
        ...props.sx
    } as SxProps}
/>

/** 用来包裹左边部分，从而开启新层级的组件。 */
const OldLevel = (props: BoxProps) => <Box 
    {...props}
    sx = {{
        width: (theme:any) => theme.margins.level , 
        ...props.sx
    } as SxProps}
/>
