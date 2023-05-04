/** 这个模块定义左侧边栏的基本信息区。 */

import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , Chip , Paper , 
} from "@mui/material"

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
import { Nodetree } from "../../../base/nodetree"
import type { raw_info_item } from "../../../base/nodetree"
import { Interaction , BackendData , urls , url_from_root } from "../../../base/interaction"
import { TitleWord } from "../../../base/construction/titleword"


export { LeftContact }

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
            <Box sx = {{
                position: "absolute" , 
                paddingLeft: "1rem", 
                paddingRight: "0.5rem", 
                paddingY: "0.25rem" , 
                backgroundColor: "background.default" , 
                top: "1%" , 
                left: "0" , 
                height: "23%" ,  
                width: "100%" , 
            }}>
                
                <ScrollBarBox sx = {{
                    position: "absolute" , 
                    top: "2.25rem" , 
                    bottom: "0.5rem", 
                    left: "1rem" , 
                    right: "0.25rem" , 
                    overflow: "auto" , 
                }}>
                    <Box sx = {{marginBottom: "1rem"}}>
                        <Typography color="text.secondary" sx={{
                            marginRight: theme.printer.margins.colon , 
                            fontSize: "0.5rem" , 
                            display: "inline-block" , 
                        }}>👉<Link href="https://fftyyy.github.io">我的个人主页</Link></Typography>
                    </Box>
                </ScrollBarBox>
            </Box>

        </Box>
    }
}