/** 这个模块定义左侧边栏的基本信息区。 */

import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , Chip , Paper , 
} from "@mui/material"

import {
    AccessibleForward as AccessibleForwardIcon , 
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
} from "@ftyyy/ytext"
import { Nodetree } from "../../../../base/nodetree"
import type { raw_info_item } from "../../../../base/nodetree"
import { Interaction , BackendData , urls , url_from_root } from "../../../../base/interaction"
import { TitleWord } from "../../../../base/construction/titleword"
import { ButtonBase } from "./base"

export {AboutButton}

function AboutButton(props: {}){
    return <ButtonBase button_content={<AccessibleForwardIcon fontSize="small"/>} title="关于">
        <LeftContact/>
    </ButtonBase>
}

/** 这个组件是左边基本信息部分的总体。 */
class LeftContact extends React.Component{
    static contextType = ThemeContext
    constructor(props){
        super (props)
    }
    render(){
        let theme = this.context as Theme
        return <Box sx = {{
            ...theme.printer.fonts.body , 
            position: "absolute" , 
            top: "2%",
            bottom : "2%" ,  
            width: "100%" , 
        }}>
            <Link 
                underline = "hover"
                href = "https://fftyyy.github.io" 
                sx = {{
                    marginTop: "1rem" , 
                    fontSize: "1rem" , 
                    display: "inline-block" , 
                    color: theme.extra_paltte.text.on_secondary
                }}
            >👉我的个人主页</Link>
        </Box>
    }
}