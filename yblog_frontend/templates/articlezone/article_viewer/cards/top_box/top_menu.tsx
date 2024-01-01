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
} from "@mui/material"

import {
    AutoStack , 
    Direction ,
    ScrollBarBox , 
} from "@ftyyy/ytext"

import {
    TitleWord , 
} from "../../../base/construction/titleword"
import { Interaction } from "../../../base"

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
    lower_level?: number
}){
    let my_id = props.node_id
    let level = props.level || "high"
    let lower_level = props.lower_level || 0

    let mouseout_timer = undefined // 用来控制鼠标离开时间的timer
    let [mouse_in , _set_mouse_in] = React.useState<boolean> (false)

    let [sons, set_sons] = React.useState<number[]> ([])

    // 设置鼠标进入的行为
    let set_mouse_in = (s: boolean) => {

        _set_mouse_in(s)
        if(s){
            if(mouseout_timer){
                clearTimeout(mouseout_timer)
            }
        }
    } 
    
    // 获得子节点
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
    return <><Button
            // onClick = {(e)=>{set_anchorel(e.currentTarget)}}

            onMouseOver = {()=>{set_mouse_in(true)}}
            onMouseOut = {get_on_mouse_out(100)}

            // underline = "always"
            // href = "#"
            ref = {link_ref}
            sx = {{width: "100%"}}
        >
            <TitleWord node_id = {props.node_id} />
        </Button>

        <ClickAwayListener onClickAway = {()=>{set_mouse_in(false)}}>
        {sons.length <= 0 ? <></> : 
            <Popper
                onMouseOver = {()=>{set_mouse_in(true)}}
                onMouseOut = {get_on_mouse_out(300)}
                anchorEl = {link_ref.current}
                open = {mouse_in}
                placement = {level == "high"? "bottom-start" : "right-start"}
                sx = {{
                    marginLeft: "0.1rem" , 
                }}
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
                
                // keepMounted          
            >{({ TransitionProps }) => (<Fade {...TransitionProps} timeout={200}><Box><ScrollBarBox
                sx = {{
                    width: "10rem" ,
                    maxHeight: "30rem",
                    marginBottom: "1rem" , 
                }}
            ><Paper 
                variant="outlined"
            >{sons.map((son_id)=>{
                return <TopMenu 
                        level = "low"
                        node_id = {son_id}
                        lower_level = {lower_level + 1}
                        key = {son_id}
                    ></TopMenu>
            })
            }</Paper></ScrollBarBox></Box></Fade>)}</Popper>
        }
        </ ClickAwayListener>
        
    </>
}