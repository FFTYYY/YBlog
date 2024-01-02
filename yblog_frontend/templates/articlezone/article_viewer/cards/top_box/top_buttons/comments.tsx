/** 这个模块定义留言区。 */

import React from "react"

import {
    Tabs , Tab , Button , IconButton , TextField , 
    Box , Divider , Typography , Link , Chip , Paper , Avatar, Popover 
} from "@mui/material"
import {
    ArrowUpward as ArrowUpwardIcon , 
    ArrowDownward as ArrowDownwardIcon , 
    Info as InfoIcon , 
    ForumOutlined as ForumIcon 
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
	TextIcon , 
} from "@ftyyy/ytext"
import { Nodetree } from "../../../../base/nodetree"
import type { raw_info_item } from "../../../../base/nodetree"
import { Interaction , BackendData , urls , url_from_root } from "../../../../base/interaction"
import { TitleWord } from "../../../../base/construction/titleword"
import { MathJaxFlusher } from "../../../../base/construction/math"
import { ButtonBase } from "./base"

export { CommentButton }

function CommentButton(props: {root: AbstractNode}){
    return <ButtonBase button_content={<ForumIcon fontSize="small"/>} title="留言">
        <CommentsArea />
    </ButtonBase>
}

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
                    —— {props.name ? `${props.name}` : "不知名者"}
                </Typography>
            </Box>
        }
        return <Box>
            {me.state.comments.length == 0? <>（空）</> : 
                me.state.comments.map((val , idx)=>{
                    let [content , name] = val
                    return <CommentBox name={name} content={content} key={idx}/>
                })
            }
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
    static contextType = ThemeContext

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
        let theme = this.context

        return <Box>
            <TextField 
                label = {<span style={{color: theme.my_palette.text.weak_on_secondary}}>留言</span>}
                placeholder = "说点啥"
                multiline
                onChange = {(e)=>{me.setState({content: e.target.value})}}
                variant = "outlined" 
                fullWidth
                minRows = {4}
                value = {me.state.content}
                InputProps = {{
                    style:{
                        color: theme.my_palette.text.on_secondary , 
                    } , 
                    inputProps: { // 占位符
                        style: { 
                            color: theme.my_palette.text.on_secondary ,  
                        }, 
                    },
                }}
            />
            <TextField 
                label = {<span style={{color: theme.my_palette.text.weak_on_secondary}}>称呼</span>}
                placeholder = "你是谁？"
                onChange = {(e)=>{me.setState({name: e.target.value})}}
                variant = "standard" 
                fullWidth
                sx = {{
                    marginTop: "0.5rem" , 
                }}
                InputProps = {{
                    style:{
                        color: theme.my_palette.text.on_secondary , 
                    } , 
                    inputProps: { // 占位符
                        style: { 
                            color: theme.my_palette.text.on_secondary ,  
                        }, 
                    }
                  
                }}
                value = {me.state.name}
            />
            <Box sx={{
                textAlign: "left" , 
                marginTop: "1rem" , 
            }}><Button 
                variant =  "outlined" 
                onClick = {()=>me.submit()} 
                sx = {{
                    color: theme.my_palette.text.on_primary ,  
                    borderColor: theme.my_palette.text.on_primary ,  

                }}
            >
                提交留言
            </Button></Box>
        </Box>
    }
}

/** 这个组件是留言区域的总体。 */
class CommentsArea extends React.Component<{} , {}>{
    static contextType = ThemeContext
    comment_ref: React.RefObject<Comments>
    constructor(props){
        super(props)

        this.comment_ref = React.createRef<Comments>()
    }
    render(){
        let me = this
        let theme = me.context as Theme
        return <Box sx = {{
            ...theme.printer.fonts.structure , 
            position: "absolute" , 
            top: "2%",
            bottom : "2%" ,  
            left: "2%" , 
            width: "96%" , 
        }}>
            <Box sx={{
                position: "absolute" , 
                top: "1%" , 
                height: "98%" , 
                left: "1%" , 
                width: "69%" , 
                paddingX: "0.25rem" , 
                paddingY: "0.25rem" , 
            }}>
                <Box sx={{textAlign: "left"}}>
                    <Chip sx = {{
                        border: "1px solid white" , 
                        color: theme.my_palette.text.on_secondary
                    }} 
                    label = "留言列表"  
                    size = "small" />
                </Box>
                <ScrollBarBox sx={{
                    position: "absolute" , 
                    left: "0.25rem" , 
                    right: "0.25rem" , 
                    top: "2.25rem" , 
                    bottom: "0.25rem" , 
                    overflowY: "auto" , 
                }}>
                    <Comments ref={me.comment_ref} />
                </ScrollBarBox>
            </Box>

            <ScrollBarBox sx={{
                position: "absolute" , 
                top: "1%" , 
                height: "98%" , 
                left: "71%" , 
                width: "28%" , 
                overflow: "auto" , 
                paddingTop: "1rem" , 
            }}>
                <NewComments onRenew={()=>{
                    if(me.comment_ref && me.comment_ref.current){
                        me.comment_ref.current.update() // 当提交留言时刷新显示的留言。
                    }
                }}/>
            </ScrollBarBox>

        </Box>
    }
}