import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , 
    LinkProps
} from "@mui/material"
import {
    TabContext  , 
    TabList  , 
    TabPanel   , 
} from "@mui/lab"

import {
	EditorCore , 
    GroupNode , 
    AutoStack, 
    ThemeContext, 
} from "@ftyyy/ytext"
import { Interaction , BackendData , url_from_root } from "../../../base/interaction"

export { LeftEdit }

let MyLink = (props: LinkProps)=>{
    let theme = React.useContext(ThemeContext)
    return <Link {...props} sx={{
        marginTop: "0.2rem",
        marginBottom: "0.3rem",
        ...theme.printer.fonts.body , 
    }}></Link>
}

class LeftEdit extends React.Component<{
    root: any , 
    idx_activated?: boolean
    onActivateIdx?: ()=>any
} , {}>{
    constructor(props){
        super(props)
    }
    render(){
        let me = this
        let props = this.props
        return <Box sx={{
            position: "absolute" , 
            top: "5%" , 
        }}><AutoStack force_direction = "column">
            <MyLink underline="hover" href={url_from_root(`/edit/content/${BackendData.node_id}`)}>编辑内容</MyLink>
            <MyLink underline="hover" href={url_from_root(`/edit/structure/${BackendData.node_id}`)}>编辑子节点树</MyLink>
            <MyLink underline="hover" href={url_from_root(`/edit/shallow_structure/${BackendData.node_id}`)}>（浅）编辑子节点树</MyLink>
            <MyLink underline="hover" href={url_from_root(`/admin/articlezone/node/add/?father_id=${BackendData.node_id}`)}>新建子节点</MyLink>
            <MyLink underline="hover" href={url_from_root(`/admin/articlezone/node/${BackendData.node_id}/change/`)}>进入后台</MyLink>
            <br />

            <div>组件IDX显示{props.idx_activated ? "已" : "未"}打开。</div>
            <Button onClick={()=>{
                if(props.onActivateIdx){
                    props.onActivateIdx()
                }
            }}>{props.idx_activated ? "停止显示" : "显示"}组件ID</Button>
            <div>根节点IDX: {props.root["idx"]}</div>
        </AutoStack></Box>
    }
}