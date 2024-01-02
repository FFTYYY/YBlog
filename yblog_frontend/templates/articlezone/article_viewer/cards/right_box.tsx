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
    IndexContexter , 
    IndexItem , 
} from "../../base/concept/printers/contexter"

import {
	EditorCore , 
	AbstractNode , 
    is_concetnode , 
    is_supportnode , 
    ScrollBarBox , 
    Node, 
    is_paragraphnode,
    ThemeContext, 
    Printer, 
    PrinterComponent, 
} from "@ftyyy/ytext"

export { RightBox }

/** 这个函数查找节点树中的所有小节线和章节线。 
 XXX 废弃了
*/
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

function RenderIndexItem (props:{item: IndexItem, onScroll: (path: number[])=>void}){
    let item = props.item 
    let _name = item.name
    let [idx, name] = _name.split("___")
    return <Box sx={{
        marginTop: "0.2rem" , 
    }}>
        <Link 
            component = "button" 
            underline = "hover"
            onClick = {(e)=>{props.onScroll(item.node_path)}}
            color = "text.primary"
            textAlign="left"
        >
            <Typography sx={{
                fontSize: "0.8rem",
                left: "0", 
                right: "1rem",
                position: "absolute" , 
            }}>{idx}</Typography>
            
            <Typography sx={{
                fontSize: "0.8rem",
                left: "1rem", 
                marginRight: "1rem" , 
                
                position: "relative" , 
            }}>{name}</Typography>
        </Link>

        {/* 渲染子小节（但目前其实没有子小节） */}
        <Box>{item.sons.map((son, idx)=>{
            return <RenderIndexItem item={son} key={idx} onScroll={props.onScroll}/>
        })}</Box>
    </Box>
}



/** 这个组件在显示一个章节内部的导航。导航到每个小节线和章节线。 */
function RightBox(props: {root: AbstractNode, printer: Printer , onScroll: (path: number[])=>void}){

    if(!props.printer){
        return <></>
    }
    let theme = React.useContext(ThemeContext)

    let index_contexter = new IndexContexter(()=>"")
    let [env , all_contexts , all_parameters, all_caches] = props.printer.preprocess({root: props.root, init_env: {}})
    let env_root = index_contexter.get_env(env).root

    // 就一个人就没必要搞目录了
    if(env_root.sons.length < 2){
        return <></>
    }

    return <Box sx={{
        ...theme.printer.fonts.body , 
        position: "relative" , 
        top: "30%" , 
        height: "40%" , 
        width: "auto" , 
    }}><Box sx={{
        
        position: "absolute" , 
        width: "100%", 
        height: "100%", 
        paddingLeft: "1rem" , 
        paddingRight: "0.5rem" , 
        paddingY: "0.25rem" , 
    }}>
        <Box sx={{
            position: "absolute" , 
            top: 0,
            height: "1.5rem" , 
            width: "100%" , 
            left: 0 , 
            backgroundColor: theme.my_palette.background.primary , 
            color: theme.my_palette.text.on_primary , 
            opacity: 0.9 , 
            paddingLeft: "0.2rem" , 
            lineHeight: "1.5rem" , 
            paddingY: "0.2rem" , 
        }}><Typography fontSize = "small" sx={{
            paddingLeft: "0.2rem"
        }}>目录</Typography></Box>

        {<ScrollBarBox sx={{ 
            overflow: "auto" , 
            position: "absolute" , 
            left: "1rem" , 
            right: "0.5rem" , 
            top: "2rem" , 
            bottom: "0.5rem" , 
        }}>{env_root.sons.map((son, idx)=>{
            return <MathJaxFlusher>
                <RenderIndexItem item={son} key={idx} onScroll={props.onScroll}/>
            </MathJaxFlusher>
        })}</ScrollBarBox>}
    </Box></Box>
}

