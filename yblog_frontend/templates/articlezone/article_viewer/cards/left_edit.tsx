import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link
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
} from "../../../../lib"
import { Interaction , BackendData , url_from_root } from "../../base/interaction"

export { LeftEdit }

class LeftEdit extends React.Component<{} , {}>{

    constructor(props){
        super(props)
    }
    render(){
        return <Box><AutoStack force_direction = "column">
            <Link underline = "hover" href = {url_from_root(`/edit/content/${BackendData.node_id}`)}>编辑内容</Link>
            <Link underline = "hover" href = {url_from_root(`/edit/structure/${BackendData.node_id}`)}>编辑子节点树</Link>
            <Link underline = "hover" href = {url_from_root(`/edit/shallow_structure/${BackendData.node_id}`)}>（浅）编辑子节点树</Link>
            <Link underline = "hover" href = {url_from_root(`/admin/articlezone/node/add/?father_id=${BackendData.node_id}`)}>新建子节点</Link>
        </AutoStack></Box>
    }
}