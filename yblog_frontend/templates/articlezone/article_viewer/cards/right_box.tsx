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
import { MathJaxFlusher } from "../../base/construction"


import {
	EditorCore , 
	AbstractNode , 
    is_concetnode , 
    is_supportnode , 
    ScrollBarBox , 
    Node, 
    is_paragraphnode,
    ThemeContext, 
} from "@ftyyy/ytext"

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
    let theme = React.useContext(ThemeContext)

    return <Box sx={{
            ...theme.printer.fonts.body , 
            position: "relative" , 
            top: "30%" , 
            height: "40%" , 
            width: "auto" , 
    }}><Box sx={{
        backgroundColor: "background.default" , 
        
        position: "absolute" , 
        width: "100%", 
        height: "100%", 
        paddingLeft: "1rem" , 
        paddingRight: "0.5rem" , 
        paddingY: "0.25rem" , 
    }}>
        <Box sx={{textAlign: "right"}}><Chip label="目录" size="small" color="secondary"/></Box>
        <ScrollBarBox sx={{ 
            overflow: "auto" , 
            position: "absolute" , 
            left: "1rem" , 
            right: "0.5rem" , 
            top: "2rem" , 
            bottom: "0.5rem" , 
        }}>{sectioners.map((val,idx)=>{
            let [node, path] = val
            let title = <>章节</>
            if(is_supportnode(node) && node.type == "support" && node.concept == "小节线"){
                title = <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Box sx={{marginRight: "1rem"}}>{num2chinese(Number(idx)+1)}</Box>
                    <Box sx={{textAlign: "left"}}><MathJaxFlusher>{node.parameters.title.val}</MathJaxFlusher></Box>
                </Box>
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
    </Box></Box>
}