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
    AutoStack , 
} from "../../../lib"
import { Interaction , BackendData , url_from_root } from "../../../base/interaction"

export { LeftEdit }

let MyLink = (props: LinkProps)=>{
    return <Link {...props} sx={(theme)=>({
        marginTop: "0.2rem",
        marginBottom: "0.3rem",
        ...theme.fonts.body , 
    })}></Link>
}

class LeftEdit extends React.Component<{} , {}>{

    constructor(props){
        super(props)
    }
    render(){
        return <Box><AutoStack force_direction = "column">
            <MyLink underline="hover" href={url_from_root(`/edit/content/${BackendData.node_id}`)}>编辑内容</MyLink>
            <MyLink underline="hover" href={url_from_root(`/edit/structure/${BackendData.node_id}`)}>编辑子节点树</MyLink>
            <MyLink underline="hover" href={url_from_root(`/edit/shallow_structure/${BackendData.node_id}`)}>（浅）编辑子节点树</MyLink>
            <MyLink underline="hover" href={url_from_root(`/admin/articlezone/node/add/?father_id=${BackendData.node_id}`)}>新建子节点</MyLink>
            <MyLink underline="hover" href={url_from_root(`/admin/articlezone/node/${BackendData.node_id}/change/`)}>进入后台</MyLink>
        </AutoStack></Box>
    }
}