/** 这个模块定义右上按钮栏的打印成pdf按钮。 
 * TODO：目前还不work
*/

import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , Chip , Paper , Popover  
} from "@mui/material"

import {
    MaleOutlined as MaleOutlinedIcon , 
} from "@mui/icons-material"

import {
	EditorCore , 
	AutoStack , 
    AutoTooltip , 
    AbstractNode , 
    ScrollBarBox , 
    PrinterStructureBoxText , 

    ThemeContext , 
    Theme, 
    GlobalInfoProvider,
    GlobalInfo,
    PrinterComponent, 
} from "@ftyyy/ytext"

import { convert_to_latex } from "../../../../base/concept/latex_printers"
import { ButtonBase } from "./base"

export { ToPDFButton }

function to_pdf(get_printer_comp: () => PrinterComponent | undefined, root: AbstractNode){

    let printer_comp = get_printer_comp ? get_printer_comp() : undefined
    if (!printer_comp){
        console.log("printer_comp is undefined")
        return 
    }

    let latex = convert_to_latex(printer_comp, root)
    return latex
}

// XXX 虽然写得是toPDF但是实际上是toLaTeX
function ToPDFButton(props: {root: AbstractNode}){
    let theme      = React.useContext(ThemeContext)
    let globalinfo = React.useContext(GlobalInfo)

    let get_printer_comp = globalinfo?.get_printer_comp

    let [open, set_open] = React.useState<boolean>(false)
    let [latex, set_latex] = React.useState<string>("")
    return <> 
        <AutoTooltip title = "to LaTeX">
            <Button
                sx = {{
                    paddingX: "0.2rem",
                    minHeight: "1.3rem",
                    paddingY: "0.2rem" , 
                    marginY: "0.4rem",
                    minWidth: "0.5rem" , 
                    marginX: "0.1rem" , 
                    color: "white", 
                    backgroundColor: "inherit" , 
                    "&:hover": {
                        backgroundColor: theme.my_palette.background.anti_primary,
                        color: theme.my_palette.text.anti_on_primary , 
                        transition: "background-color 400ms ease-out, color 400ms ease-out" , 
                    },
                    transition: "background-color 400ms ease-out, color 400ms ease-out" , 
                }}
                onClick={()=>{
                    let latex = to_pdf(get_printer_comp, props.root)
                    set_latex(latex)
                    set_open(true)
                    console.log("???")
                }}
            >
                <MaleOutlinedIcon fontSize="small"/>
            </Button>
        </AutoTooltip>

        <Popover
            sx={{
                left: "20%",
                top: "20%",
                width: "60%" , 
                height: "60%" , 
                opacity: 0.95 , 
            }}
            PaperProps = {{
                sx:{
                    paddingX: "1rem",
                    paddingY: "1rem" , 
                    minWidth: "40vw" ,                 
                    width: "100%" , 
                    height: "100%" , 
    
                    backgroundColor: theme.my_palette.background.secondary , 
                    color: "white" , 
                },
            }}
            
            open = {open}
            anchorReference = "none"
            onClose = {()=>{set_open(false)}}
        >
            <pre>{latex}</pre>
        </Popover>
    </>
}
