/** 这个模块定义左侧边栏的留言区。 */

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

import {
	YEditor , 
	EditorCore , 
	Printer , 
	DefaultPrinter , 
	DefaultEditor , 
	AutoStack , 
    AutoTooltip , 

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
} from "../../../../lib"
import { get_node_information , post_node_information } from "../../utils/ineraction"
import { get_node_id } from "../../utils"
import { raw_to_processed , processed_to_raw , generate_id2node } from "../../utils/nodetree"
import type { raw_info_item , info_item } from "../../utils/nodetree"

export { LeftComments }

class Comments extends React.Component<{} , {
    comments: [string , string][]
}>{
    constructor(props){
        super(props)

        this.state = {
            comments: []
        }
    }
    async componentDidMount() {
        let comments = await get_node_information("get_node_comments" , "comments")
        this.setState({comments: comments})
    }
    render(){
        let me = this
        let CommentBox = (props: {name: string , content: string})=>{
            return <Box sx={{marginBottom: "0.5rem" , marginX: "0.5rem"}}>
                <Typography sx={{marginLeft: "0.5rem" , fontSize: "0.9rem"}}>{props.content}</Typography>
                <Typography sx={{textAlign: "right" , marginTop: "0.5rem" , fontSize: "0.9rem"}}>——{props.name}</Typography>
            </Box>
        }

        return <React.Fragment>
            {me.state.comments.map((val , idx)=>{
                let [content , name] = val
                return <CommentBox name={name} content={content} key={idx}/>
            })}
        </React.Fragment>
    }
}


class LeftComments extends React.Component<{} , {}>{
    constructor(props){
        super(props)
    }
    render(){
        return <Box sx = {(theme)=>({...theme.printer.typography.structure})}>
            <Comments />
        </Box>
    }
}