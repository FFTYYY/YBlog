import * as React from "react"
import { Grid , Box , 
    Link, ThemeOptions , Dialog, Tooltip  , Badge  , Button , Paper , IconButton  ,  } from "@mui/material"
import {
    PrinterPartBox , 
    ScrollBarBox, 
    auto_renderer , 
    AbstractNode ,    
    Printer , 
    ConceptNode , 
    PrinterRenderFunctionProps , 
    PrinterRenderFunction , 
    GlobalInfo , 
    ContexterBase , 
    PreprocessFunction , 
    DefaultPrinterComponent , 
    DefaultAbstractAsRoot, 
    AutoStack, 
    ThemeContext , 

} from "@ftyyy/ytext"
import {
    BaoXiangHua, MeiGui , 
} from "../../../assets"
import { BaJiao, LiuBian, SanJiao } from "../../../assets/decors"
import { flush_math , MathJaxFlusher } from "../../construction/math"

export {
    renderers
}

let renderer_comment = (()=>{
    let senario = "title"
    let CONT = (props)=>{
        let {node,parameters,context,children} = props

        return <ScrollBarBox sx={{
            width: "auto" , 
            height: "auto" , 
            maxHeight: "80vh" , 
            overflow: "auto" , 
        }}>
            <PrinterPartBox>{children}</PrinterPartBox>
        </ScrollBarBox>
    }
    return auto_renderer<AbstractNode>({
        contexters: [] , 
        render_function_as_property: (props: PrinterRenderFunctionProps<AbstractNode>) => {
    
            let theme = React.useContext(ThemeContext)

            if(props.flags["senario"] != senario){
                return <>{props.children}</>
            }
    
            let [show_abstract , set_show_abstract] = React.useState(false)
    
            let subcomp = <DefaultAbstractAsRoot
                {...props}
            ></DefaultAbstractAsRoot>
    
            return <React.Fragment>
                <div style={{display: "inline-block", marginRight: "5px"}}>{props.children}</div>
                <Tooltip title={subcomp} placement="right" onMouseMove={()=>{
                    flush_math.go()
                }}>
                    <Link 
                        onClick = {(e)=>{
                            set_show_abstract(true)
                            // setTimeout(()=>{flush_math.go()} , 500)
                        }} 
                        color = "inherit"
                        href = "#"
                        underline = "none"
                        sx={{
                            width: "auto" , 
                            height: "auto" , 
                            paddingRight: "0.35rem" , 
                        }}
                    >
                        <div style={{display: "inline-block"}}>
                            <SanJiao fill={theme.extra_paltte.symbol.abstract} strokeWidth="1px" style={{
                                top: "-5px", 
                                left: "-5px" , 
                                marginRight: "-5px" , 
                                width: "10px" , 
                                height: "10px" , 
                                display: "inline-block" , 
                                position: "relative" , 
                                transform: "scaleY(-1)",
                            }} />
                        </div>
                    </Link>
                </Tooltip>
                <Dialog 
                    fullWidth 
                    maxWidth = "lg" 
                    open = {show_abstract} 
                    onClose = {()=>set_show_abstract(false)}
                    onAnimationEnd = {()=>{
                        flush_math.go()
                    }}
                >{subcomp}</Dialog>
            </React.Fragment> 
        } , 
        render_function: (props: PrinterRenderFunctionProps<AbstractNode>) => {
            let props_except_children = {
                node: props.node , 
                context: props.context , 
                parameters: props.parameters ,             
            }
            return <CONT {...props_except_children}>{props.children}</CONT>
        } , 
    })    
})()




let renderers = {
    abstract: {
        "穆言": renderer_comment , 
    } , 
}