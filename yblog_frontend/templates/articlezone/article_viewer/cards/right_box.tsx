import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , Paper , Chip , 

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
	EditorCore , 
	AbstractNode , 
    is_concetnode , 
    is_supportnode , 
    ScrollBarBox , 
    Node, 
    is_paragraphnode, 
} from "../../lib"
import { LeftBasic } from "./left_box/left_basic"
import { LeftComments } from "./left_box/left_comments"

export { RightBox }

/** 这个函数查找节点树中的所有小节线和章节线。 */
function find_sectioner(node: Node, path: number[] = []){
    let ret = []
    if(is_supportnode(node) && (node.concept == "小节线" || node.concept == "章节线")){
        return [[node, path]]
    }
    if(is_concetnode(node) || is_paragraphnode(node)){
        for(let c_idx in node.children){
            ret = [...ret, ...find_sectioner(node.children[c_idx], [...path, parseInt(c_idx)])]
        }
    }
    return ret
}

/** 这个组件在显示一个章节内部的导航。导航到每个小节线和章节线。 */
function RightBox(props: {root: AbstractNode , onScroll: (path: number[])=>void}){

    let sectioners = find_sectioner(props.root)

    return <Box sx={(theme)=>({
            ...theme.fonts.body , 
            position: "relative" , 
            top: "30%" , 
            height: "40%" , 
            width: "auto" , 
    })}><Paper variant="outlined" sx={{
        backgroundColor: (theme)=>theme.palette.background.default , 
        
        paddingX: "0.5rem" , 
        paddingY: "0.25rem" , 
    }}>
        <Box sx={{textAlign: "right"}}><Chip label="目录" size="small" variant="outlined" color="secondary"/></Box>
        <ScrollBarBox sx={{ 
            position: "absolute" , 
            overflow: "auto" , 
            width: "100%" , 
            marginTop: "0.5rem" , 
        }}>{sectioners.map((val,idx)=>{
            let [node, path] = val
            let title = <>章节</>
            if(is_supportnode(node) && node.type == "support" && node.concept == "小节线"){
                title = <React.Fragment>
                    <Box component = "span" sx={{marginRight: "1rem"}}>{num2chinese(Number(idx)+1)}</Box>
                    <Box component = "span">{node.parameters.title.val}</Box>
                </React.Fragment>
            }

            return <Box key={idx} sx={{
                marginTop: "0.2rem" , 
            }}><Link 
                component = "button" 
                underline = "hover"
                onClick = {(e)=>{props.onScroll(path)}}
                color = "text.primary"
            ><Typography sx={{fontSize: "0.8rem"}}>{title}</Typography></Link></Box>
        })}</ScrollBarBox>
    </Paper></Box>
}