import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link
} from "@mui/material"
import {
    TabContext  , 
    TabList  , 
    TabPanel   , 
    useTreeItem , 
    TreeItemContentProps , 
} from "@mui/lab"

import {
    TreeItem , TreeView , 
    TreeItemProps, treeItemClasses , 
} from "@mui/lab"
import {
    ExpandMore as ExpandMoreIcon , 
    ChevronRight as ChevronRightIcon , 
    ArrowUpward as ArrowUpwardIcon , 
    ArrowDownward as ArrowDownwardIcon , 
} from "@mui/icons-material"

import { num2chinese } from "../../base/utils"


import {
	YEditor , 
	EditorCore , 
	GroupNode , 
	DefaultPrinter , 
	DefaultEditor , 
	AutoStack , 
    AutoTooltip , 
    is_styled , 
    is_certain_style , 
    

	PrinterDivider , 
    PrinterWeakenText , 
    PrinterDisplayText , 
    PrinterStructureBoxText  , 
    PrinterParagraphBox , 
    PrinterPartBox , 
    PrinterNewLevelBox , 
    PrinterOldLevelBox , 
    PrinterBackgroundPaper , 
	get_DefaultStructPrinter , 
    get_param_val , 
} from "../../../../lib"
import { Node } from "slate"
import { LeftBasic } from "./left_basic"
import { LeftComments } from "./left_comments"

export { RightBox }

/** 这个函数查找节点树中的所有小节线和章节线。 */
function find_sectioner(root: Node){
    let ret = []
    for(let [node, path] of Node.descendants(root)){
        if(is_certain_style(node , "support" , "小节线") || is_certain_style(node , "support" , "章节线")){
            ret.push( [node,path] )
        }
    }
    return ret
}

/** 这个组件在显示一个章节内部的导航。导航到每个小节线和章节线。 */
function RightBox(props: {root: GroupNode , onScroll: (path: number[])=>void}){

    let sectioners = find_sectioner(props.root)

    return <Box sx={(theme)=>({
            ...theme.printer.typography.body , 
            position: "relative" , 
            top: "30%" , 
            height: "40%" , 
            width: "auto" , 
    })}>
        <Typography color="text.secondary" sx={(theme)=>({
            ...theme.printer.typography.body , 
            fontSize: "0.9rem" , 
        })}>章内目录</Typography>
        <Box sx={{ 
            position: "absolute" , 
            top: "2rem" , 
            bottom: "2rem" , 
            overflowY: "auto" , 
            width: "100%" , 
        }}>
            {sectioners.map((val,idx)=>{
                let [node, path] = val
                let title = <>章节</>
                if(is_certain_style(node , "support" , "小节线")){
                    title = <React.Fragment>
                        <Box component = "span" sx={{marginRight: "1rem"}}>{num2chinese(Number(idx)+1)}</Box>
                        <Box component = "span">{get_param_val(node , "title")}</Box>
                    </React.Fragment>
                }
                return <Box key={idx} sx={{
                    marginTop: "0.2rem" , 
                }}><Link 
                    component = "button" 
                    underline = "hover"
                    onClick = {(e)=>{props.onScroll(path)}}
                ><Typography sx={{fontSize: "0.8rem"}}>{title}</Typography></Link></Box>
            })}
        </Box>
    </Box>
}