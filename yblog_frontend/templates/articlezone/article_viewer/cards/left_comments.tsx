/** 这个模块定义左侧边栏的留言区。 */

import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , TextField , Chip
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
import { PostSnackbar } from "../../construction/buttons"
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
    async reload(){
        let comments = ( await get_node_information("get_node_comments" , "comments") ) as [string,string][]
        comments = comments.reverse()
        this.setState({comments: comments})
    }
    async componentDidMount() {
        await this.reload()
    }
    render(){
        let me = this
        let CommentBox = (props: {name: string , content: string})=>{
            return <Box sx={{marginBottom: "1rem" , marginX: "0.5rem"}}>
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


class NewComments extends React.Component<{
    onRenew: ()=>void
} , {
    content: string , 
    name: string , 
    snakerbar_open: boolean, 
    status: boolean , 
}>{
    constructor(props){
        super(props)

        this.state = {
            content: "" , 
            name: "" , 
            snakerbar_open: false , 
            status: false , 
        }
    }

    async submit(){
        let me = this
        let status = false
        if(me.state.content){
            status = await post_node_information("post_node_comments" , {
                content: me.state.content , 
                name: me.state.name , 
            })
        }
        me.setState({status: status , snakerbar_open: true})

        if(status){
            me.props.onRenew()
            me.setState({
                content: "" , 
                name: "",
            })
        }
    }

    render(){
        let me = this

        return <React.Fragment>
            <TextField 
                label = "留言"
                placeholder = "说点啥"
                multiline
                onChange = {(e)=>{me.setState({content: e.target.value})}}
                variant = "outlined" 
                fullWidth
                minRows = {4}
                sx = {{
                    marginTop: "2rem"
                }}
                value = {me.state.content}
            />
            <TextField 
                label = "称呼"
                placeholder = "你是谁？"
                onChange = {(e)=>{me.setState({name: e.target.value})}}
                variant = "standard" 
                fullWidth
                sx = {{
                    marginTop: "0.5rem"
                }}
                value = {me.state.name}
            />
            <Box sx={{
                textAlign: "right" , 
                marginTop: "1rem"
            }}><Button variant=  "outlined" onClick = {()=>me.submit()}>新建留言</Button></Box>
            <PostSnackbar 
                info_sucess = "提交成功"
                info_fail = "提交失败"
                open = { me.state.snakerbar_open }
                status = { me.state.status }
                onClose = {()=>me.setState({snakerbar_open : false})}     
            />
        </React.Fragment>
    }
}


class LeftComments extends React.Component<{} , {}>{
    comment_ref: React.RefObject<Comments>
    constructor(props){
        super(props)

        this.comment_ref = React.createRef<Comments>()
    }
    render(){
        let me = this
        return <Box 
            sx = {(theme)=>({
                ...theme.printer.typography.structure , 
                overflowY: "auto" , 
                position: "absolute" , 
                top: "5%" , 
                bottom: "2%" , 
                left: "0" , 
                right: "0" , 
                paddingX: "1rem" , 
            })}
        >
            <NewComments onRenew={()=>{
                if(me.comment_ref && me.comment_ref.current){
                    me.comment_ref.current.reload()
                }
            }}/>
            <Divider sx={{marginTop: "3rem"}}><Chip sx={{fontSize: "0.8rem"}} label="留言列表" /></Divider>
            <Comments ref={me.comment_ref} />
        </Box>
    }
}