/** 这个模块定义左侧边栏的留言区。 */

import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , TextField , Chip
} from "@mui/material"
import { PostSnackbar } from "../../base/construction/snackbar"
import { Interaction , BackendData } from "../../base/interaction"

export { LeftComments }

/** 这个组件显示所有评论。 */
class Comments extends React.Component<{} , {
    comments: [string , string][]
}>{
    constructor(props){
        super(props)

        this.state = {
            comments: []
        }
    }

    /** 刷新评论，重新从后台获取数据并更新状态。 */
    async update(){
        let comments = await Interaction.get.comments(BackendData.node_id) as [string,string][]
        comments = comments.reverse()
        this.setState({comments: comments})
    }
    
    async componentDidMount() {
        await this.update()
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


/** 这个组件显示一个新建留言的按钮。 
*/
class NewComments extends React.Component<{
    // 当提交了评论时的回调函数。
    onRenew: ()=>void
} , {
    /** 当前输入的留言内容。 */
    content: string , 

    /** 当前输入的留言者称呼。 */
    name: string , 

    /** 是否显示通知条。 */
    snakerbar_open: boolean, 

    /** 通知条状态。 */
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

    /** 提交评论。 */
    async submit(){
        let me = this
        let status = false
        if(me.state.content){
            status = await Interaction.post.comments({
                content: me.state.content , 
                name: me.state.name , 
            } , BackendData.node_id)
        }
        me.setState({status: status , snakerbar_open: true})

        // 调用回调函数，并清空自己的状态。
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


/** 这个组件是左边留言区域的总体。 */
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
                    me.comment_ref.current.update() // 当提交留言时刷新显示的留言。
                }
            }}/>
            <Divider sx={{marginTop: "3rem"}}><Chip sx={{fontSize: "0.8rem"}} label="留言列表" /></Divider>
            <Comments ref={me.comment_ref} />
        </Box>
    }
}