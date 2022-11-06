/** 这个模块定义左侧边栏的留言区。 */

import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , TextField , Chip , Paper
} from "@mui/material"
import { Interaction , BackendData } from "../../../base/interaction"
import { ScrollBarBox } from "../../../lib"

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
                <Typography key="typo1" sx={{marginLeft: "0.5rem" , fontSize: "0.9rem"}}>{props.content}</Typography>
                <Typography key="typo2" sx={{textAlign: "right" , marginTop: "0.5rem" , fontSize: "0.9rem"}}>
                    —— {props.name ? `${props.name}` : "不知名网友"}
                </Typography>
            </Box>
        }
        return <Box>
            {me.state.comments.map((val , idx)=>{
                let [content , name] = val
                return <div><CommentBox name={name} content={content} key={idx}/></div>
            })}
        </Box>
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

        return <Box>
            <TextField 
                label = "留言"
                placeholder = "说点啥"
                multiline
                onChange = {(e)=>{me.setState({content: e.target.value})}}
                variant = "outlined" 
                fullWidth
                minRows = {4}
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
        </Box>
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
        return <Box sx = {(theme)=>({
            ...theme.fonts.structure , 
            position: "absolute" , 
            top: "2%",
            bottom : "2%" ,  
            width: "100%" , 
        })}>

            <ScrollBarBox sx={{
                position: "absolute" , 
                height: "36%" , 
                top: "1%" , 
                left: "1rem" , 
                right: "1rem" , 
                overflow: "auto" , 
                paddingTop: "1rem" , 
            }}>
                <NewComments onRenew={()=>{
                    if(me.comment_ref && me.comment_ref.current){
                        me.comment_ref.current.update() // 当提交留言时刷新显示的留言。
                    }
                }}/>
            </ScrollBarBox>

            <Paper sx={{
                position: "absolute" , 
                bottom: "1%" , 
                top: "38%" , 
                left: "1rem" , 
                right: "1rem" , 
                backgroundColor: (theme)=>theme.palette.background.default , 
                paddingX: "0.25rem" , 
                paddingY: "0.25rem" , 
            }} variant="outlined">
            <ScrollBarBox sx={{
                width: "100%" , 
                height: "100%" , 
                overflowY: "auto" , 
            }}>
                <Box sx={{textAlign: "right"}}><Chip  label="留言列表"  variant="outlined" color="secondary" size="small" /></Box>
                <Comments ref={me.comment_ref} />
            </ScrollBarBox></Paper>
        </Box>
    }
}