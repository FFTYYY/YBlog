/** 这个组件将$$等数学符号转换为节点。 */
import { 
	Snackbar , SnackbarOrigin , Button , IconButton , Drawer , Paper, Typography, Divider, Box, TextField , Popover , InputAdornment , Link
} from "@mui/material"
import { Node } from "slate"
import { FlexibleItem } from "../../base/construction/framework"
import {Interaction , urls , url_from_root , BackendData } from "../../base/interaction"
import {
	YEditor , 
	AutoTooltip , 
	AutoIconButton , 
    has_children , 
    group_prototype, 
    AutoStack,
    paragraph_prototype, 
} 
from "../../../../lib"
import {
    FollowTheSigns as FollowTheSignsIcon , 
    AirlineSeatFlatAngled as AirlineSeatFlatAngledIcon  , 
    AirlineSeatFlatAngledOutlined as AirlineSeatFlatAngledOutlinedIcon  , 
    AccessibleForward as AccessibleForwardIcon  , 
} 
from "@mui/icons-material"

import { mathblock_style , mathinline_style } from "../../base/styles/styles"
import React from "react"

export { BackendEdit , NodeStructEdit , NodeStructEditShallow , NodeView }

function ButtonLikeLink(props: {title: string , href: string , Icon: any}){
    let Icon = props.Icon
    return <React.Fragment>
        <FlexibleItem
            close_item = {
                <Box sx={{
                    marginLeft: "0.2rem" , 
                    marginTop: "0.35rem" , 
                }}>
                    <AutoTooltip title={props.title}>
                        <Link underline="hover" href={props.href}>
                            <Icon fontSize="small" color="primary"/>
                        </Link>
                    </AutoTooltip>
                </Box>
            }
            open_item = {
                <Box sx={{
                    marginLeft: "0.2rem" , 
                    marginTop: "0.2rem" , 
                    marginBottom: "0.3rem" , 
                }}>
                    <Link underline="hover" href={props.href}>
                        <AutoStack>
                            <Icon fontSize="small" color="primary"/>
                            <Typography sx={(theme)=>({
                                ...theme.typography.button , 
                                marginLeft: "0.5rem"
                            })}>{props.title}</Typography> 
                        </AutoStack>
                    </Link>
                </Box>
            }
            no_button
        />
    </React.Fragment>
}

function BackendEdit(props: {}){

    return <ButtonLikeLink 
        title = "后台页面"
        href = {url_from_root(`/admin/articlezone/node/${BackendData.node_id}/change/`)}
        Icon = {FollowTheSignsIcon}
    />
}

function NodeStructEdit(props: {}){

    return <ButtonLikeLink 
        title = "编辑子节点结构"
        href = {url_from_root(`/edit/structure/${BackendData.node_id}`)}
        Icon = {AirlineSeatFlatAngledIcon}
    />
}


function NodeStructEditShallow(props: {}){

    return <ButtonLikeLink 
        title = "（浅）编辑子节点结构"
        href = {url_from_root(`/edit/shallow_structure/${BackendData.node_id}`)}
        Icon = {AirlineSeatFlatAngledOutlinedIcon}
    />
}

function NodeView(props: {}){

    return <ButtonLikeLink 
        title = "预览页面（有什么必要吗）"
        href = {url_from_root(`/view/content/${BackendData.node_id}`)}
        Icon = {AccessibleForwardIcon }
    />
}

