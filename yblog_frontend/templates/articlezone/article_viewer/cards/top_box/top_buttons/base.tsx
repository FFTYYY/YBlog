import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , Chip , Paper , Avatar, Popover 
} from "@mui/material"
import {
    ArrowUpward as ArrowUpwardIcon , 
    ArrowDownward as ArrowDownwardIcon , 
    Info as InfoIcon , 
} from "@mui/icons-material"

import {
	EditorCore , 
	AutoStack , 
    AutoTooltip , 
    AbstractNode , 
    ScrollBarBox , 
    PrinterStructureBoxText , 

    ThemeContext , 
    Theme , 
	TextIcon , 
} from "@ftyyy/ytext"
import { Nodetree } from "../../../../base/nodetree"
import type { raw_info_item } from "../../../../base/nodetree"
import { Interaction , BackendData , urls , url_from_root } from "../../../../base/interaction"
import { TitleWord } from "../../../../base/construction/titleword"
import { MathJaxFlusher } from "../../../../base/construction/math"

export {ButtonBase}

function ButtonBase(props: {
    button_content: any, 
    children: any , 
    title: string , 
}){
    let [open, set_open] = React.useState<boolean>(false);
    let theme = React.useContext(ThemeContext)
    return <>
        <AutoTooltip title = {props.title}>
            <Button
                sx = {{

                    paddingX: "0.2rem",
                    minHeight: "1.3rem",
                    paddingY: "0.2rem" , 
                    marginY: "0.4rem",
                    minWidth: "0.5rem" , 
                    marginX: "0.3rem" , 
                    
                    color: "white", 

                    backgroundColor: "inherit" , 
                    "&:hover": {
                        backgroundColor: theme.my_palette.background.anti_primary,
                        color: theme.my_palette.text.anti_on_primary , 
                        transition: "background-color 400ms ease-out, color 400ms ease-out"
                    },
                    transition: "background-color 400ms ease-out, color 400ms ease-out" , 
                }}
                onClick={(e)=>{set_open(true)}}
            >{props.button_content}</Button>
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
            {props.children}
        </Popover>
    </>
}
