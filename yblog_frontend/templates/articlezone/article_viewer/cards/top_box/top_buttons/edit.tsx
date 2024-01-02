import React, { useEffect } from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , 
    LinkProps,
    Popper , Paper , Fade , 
} from "@mui/material"
import {
    Edit as EditIcon  , 
} from "@mui/icons-material"

import {
	EditorCore , 
    GroupNode , 
    AutoStack, 
    ThemeContext, 
    AbstractNode , 
    AutoTooltip , 
} from "@ftyyy/ytext"
import { Interaction , BackendData , url_from_root } from "../../../../base/interaction"
import { ButtonBase } from "./base"

import Cookies from "universal-cookie"

export {EditButton}


function EditButton(props: {
    root: AbstractNode , 
    
    idx_activated?: boolean , 
    onActivateIdx?: ()=>any , 
}){
    const COOKIE_KEY = "yblog-topbox-edit-active"
    let [active, _set_active] = React.useState<boolean>(false)
    
    // read intial val from cookie. If not set then return `false` (default).
    useEffect(()=>{
        let cookies = new Cookies()
        let val = (cookies.get(COOKIE_KEY) == "true")
        
        _set_active(val)
    }, [])

    let set_active = (v)=>{
        let cookies = new Cookies()
        cookies.set(COOKIE_KEY , v ? "true" : "false", {path: "/", maxAge: 6000000})
        _set_active(v)
    }

    let theme = React.useContext(ThemeContext)

    let unactive_style = {
        backgroundColor: "rgba(0,0,0,0)" , 
        color: "white", 
    }
    let active_style = {
        backgroundColor: theme.my_palette.background.anti_primary,
        color: theme.my_palette.text.anti_on_primary , 
    }

    return <>
        <AutoTooltip title = "编辑">
            <Button
                sx = {{
                    paddingX: "0.2rem",
                    minHeight: "1.3rem",
                    paddingY: "0.2rem" , 
                    marginY: "0.4rem",
                    minWidth: "0.5rem" , 
                    marginX: "0.3rem" , 
    
                    ...(active ? active_style : unactive_style),
                    "&:hover": {
                        ...(active ? unactive_style : active_style),
                        transition: "background-color 400ms ease-out, color 400ms ease-out"
                    },
                    transition: "background-color 400ms ease-out, color 400ms ease-out" , 
                }}
                onClick={(e)=>{set_active(!active)}}
            ><EditIcon fontSize="small"/></Button>
        </AutoTooltip>

        <Popper
            sx={{
                left: "0",
                top: "0",
                width: "14%" , 
                height: "90%" , 
                opacity: 0.85 , 
                marginTop: "3rem" , 
                marginLeft: "0.2rem" , 
            }}
                        
            open = {active}
            transition
        >{({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
                <Paper sx = {{
                    paddingX: "1rem",
                    paddingY: "1rem" , 
                    width: "100%" , 
                    height: "100%" , 

                    backgroundColor: theme.my_palette.background.secondary , 
                    color: "white" , 
                }}>
                    <LeftEdit 
                        root = {props.root} 
                        idx_activated = {props.idx_activated} 
                        onActivateIdx = {props.onActivateIdx}
                    />
                </Paper>
            </Fade>
        )}
        </Popper>
    </>
}

let MyLink = (props: LinkProps)=>{
    let theme = React.useContext(ThemeContext)
    return <Link {...props} sx={{
        marginTop: "0.2rem",
        marginBottom: "0.3rem",
        ...theme.printer.fonts.body , 
        color: theme.my_palette.text.on_secondary , 
    }}></Link>
}

class LeftEdit extends React.Component<{
    root: AbstractNode , 
    idx_activated?: boolean
    onActivateIdx?: ()=>any
} , {}>{
    static contextType = ThemeContext
    constructor(props){
        super(props)
    }
    render(){
        let me = this
        let props = this.props
        let theme = this.context

        let active_style = {
            color: theme.my_palette.text.on_secondary , 
            backgroundColor: "rgba(30,60,40,0.5)"
        }
        let unactive_style = {
            backgroundColor: "rgba(130,170,160,0.5)",
            color: theme.my_palette.text.anti_on_primary ,
        }
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
            <Button 
                sx = {{
                    marginX: "1rem" , 
                    ...(props.idx_activated ? active_style : unactive_style) , 
                    "&:hover": {
                        ...(props.idx_activated ? unactive_style : active_style) , 
                        transition: "background-color 400ms ease-out, color 400ms ease-out"
                    },
                    transition: "background-color 400ms ease-out, color 400ms ease-out" , 

                }}
                onClick={()=>{
                    if(props.onActivateIdx){
                        props.onActivateIdx()
                    }
                }}
            >{props.idx_activated ? "停止显示" : "显示"}组件ID</Button>
            <div>根节点IDX: {props.root["idx"]}</div>
        </AutoStack></Box>
    }
}