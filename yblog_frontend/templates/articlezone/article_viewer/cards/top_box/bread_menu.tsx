import React from "react"

import {
    Box,
    Link , 
    Button , 
    Menu , 
    MenuItem,  
    Popper, 
    Paper , 
    Fade , 
    ClickAwayListener , 
    Chip , 
} from "@mui/material"


import {
    AutoStack , 
    Direction ,
    ScrollBarBox , 
    ThemeContext , 
    AutoTooltip , 
    TextIcon , 
} from "@ftyyy/ytext"

import {
    TitleWord , 
} from "../../../base/construction/titleword"
import {
    MathJaxFlusher , 
} from "../../../base/construction/math"
import { Interaction , urls } from "../../../base"


export {
    TopMenu , 
}

// TODO 
/**
 * 
 * @param props.node_id 当前节点的id
 * @param props.level 如果设为`top`则会将menu显示在button下方，否则显示在右侧。
 */
function TopMenu(props: {
    node_id: number , 
    level?: "high" | "low" , 
    lower_order?: number , // 在lower中是第几个
    lower_level?: number , 
}){
    let my_id = props.node_id
    let level = props.level || "high"
    let lower_level = props.lower_level || 0
    let lower_order = props.lower_order

    let theme = React.useContext(ThemeContext)

    // 设置鼠标进入的行为
    let mouseout_timer = undefined // 用来控制鼠标离开时间的timer
    let [mouse_in , _set_mouse_in] = React.useState<boolean> (false)
    let set_mouse_in = (s: boolean) => {

        _set_mouse_in(s)
        if(s){
            if(mouseout_timer){
                clearTimeout(mouseout_timer)
            }
        }
    } 

    // 节点是否可见
    let [ visible   , set_visible   ] = React.useState(true)
    React.useEffect(()=>{(async ()=>{
        let visibility = await Interaction.get.visibility(my_id)
        set_visible(!visibility.secret)
    })()})

    
    // 获得子节点
    let [sons, set_sons] = React.useState<number[]> ([])
    React.useEffect(()=>{(async ()=>{
        if(lower_level > 4){ // 不能太深
            return 
        }
        if(level == "high"){
            let father_id = await Interaction.get.father_id(my_id)
            if(father_id > 0){
                let brother_ids = await Interaction.get.son_ids(father_id)
                set_sons(brother_ids)
            }
            else{
                let son_ids = await Interaction.get.son_ids(my_id)
                set_sons(son_ids)
            }
        }
        else{
            let son_ids = await Interaction.get.son_ids(my_id)
            set_sons(son_ids)
        }
    
    })()} , [props.level, props.node_id, props.lower_level])

    // 鼠标离开的行为
    function get_on_mouse_out(timeout: number){
        return () => {
            if(mouseout_timer){
                clearTimeout(mouseout_timer) // 先清除以前的
            }
            mouseout_timer = setTimeout(()=>{
                set_mouse_in(false)
            }, timeout)
        }
    }

    let link_ref = React.useRef<HTMLButtonElement>(undefined)
    return <MathJaxFlusher>
        <Link 
            href = {urls.view.content(my_id)}
            target = "_blank"
            underline = "none"
        ><Button
            onMouseOver = {()=>{set_mouse_in(true)}}
            onMouseOut = {get_on_mouse_out(100)}

            ref = {link_ref}
            sx = {{
                marginX: "0.2rem" ,  
                width: "calc(100% - 0.4rem)", 
                justifyContent: "flex-start" , 
                textAlign: "left" , 
                ...(level == "high" ? {whiteSpace: "nowarp"} : {}) ,  
            
                paddingX: "0.2rem",
                minHeight: "1.3rem",
                paddingY: "0.1rem" , 
                marginY: level == "high" ? "0.4rem" : "0.1rem",
                minWidth: "1rem", 
                
                color: theme.my_palette.text.on_primary , 
                backgroundColor: theme.my_palette.background.primary , 
                "&:hover": {
                    backgroundColor: theme.my_palette.background.anti_primary,
                    color: theme.my_palette.text.anti_on_primary , 
                    transition: "background-color 400ms ease-out, color 400ms ease-out"
                },
                transition: "background-color 400ms ease-out, color 400ms ease-out" , 
            }}
        >

            <TitleWord node_id = {props.node_id} />
            {visible ? <></> :
                <Box key="unseen" sx={{
                    display: "inline-block", 
                    marginLeft: "auto" , 
                    right: 0,               
                    paddingLeft: "0.4rem" , 
                }}>
                    <AutoTooltip title="不让看"><Box>
                        <TextIcon text="隐" fontSize="0.7rem" color="inherit"/>
                    </Box></AutoTooltip>
                </ Box>
            }

        </Button></Link>

        <ClickAwayListener onClickAway = {()=>{set_mouse_in(false)}}>
        {sons.length <= 0 ? <></> : 
            <Popper
                onMouseOver = {()=>{set_mouse_in(true)}}
                onMouseOut = {get_on_mouse_out(300)}
                anchorEl = {link_ref.current}
                open = {mouse_in}
                placement = {level == "high"? "bottom-start" : "right-start"}
                transition
                modifiers={[
                    {
                        name: "preventOverflow",
                        enabled: true,
                        options: {
                            altAxis: true,
                            altBoundary: false,
                            tether: false,
                            rootBoundary: "document",
                            padding: 8,
                        },
                    },
                ]}
            >{({ TransitionProps }) => (<Fade {...TransitionProps} timeout={200}><Box><ScrollBarBox
                sx = {{
                    marginLeft: "0.3rem" , 
                    marginTop: level == "high" ? "0.5rem" : (lower_order == 0 ? 0 : "-1.5rem") , 
                    marginBottom: "1rem" , 
                    
                    minWidth: "5rem" , 
                    maxWidth: "15rem" ,
                    maxHeight: "30rem",
                    borderRadius: 1,
                }}
            ><Box 
                sx = {{
                    paddingY: "0.5rem" , 
                    backgroundColor: theme.my_palette.background.primary , 
                    color: theme.my_palette.text.on_primary , 
                    opacity: 0.85 , 
                }}
            >{sons.map((son_id, lower_order)=>{
                return <TopMenu 
                    level = "low"
                    node_id = {son_id}
                    lower_level = {lower_level + 1}
                    key = {son_id}
                    lower_order = {lower_order}
                ></TopMenu>
            })
            }</Box></ScrollBarBox></Box></Fade>)}</Popper>
        }
        </ ClickAwayListener>
    </MathJaxFlusher>
}