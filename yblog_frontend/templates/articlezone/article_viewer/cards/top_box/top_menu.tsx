import React from "react"

import {
    Box,
    Link , 
    Button , 
    Menu , 
    MenuItem  , 
} from "@mui/material"

import {
    AutoStack , 
    Direction ,
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
    update_state?: (state: boolean)=>void 
}){
    let my_id = props.node_id
    let level = props.level || "high"
    let update_state = props.update_state || ( (s)=>{return ;} ) // 向父节点通知自身状态

    let mouseout_timer = undefined // 用来控制鼠标离开时间的timer
    let [mouse_in , _set_mouse_in] = React.useState<boolean> (false)

    let [sons, set_sons] = React.useState<number[]> ([])
    let [son_states, _set_son_states] = React.useState<{[son_id in string]: boolean}> ({})

    // 只要自身或者组件有一个活着，那就是活着
    function get_alive(){
        let alive = false
        if(mouse_in){
            alive = true
        }
        for(let son_id in sons){
            if(son_states[son_id]){
                alive = true
            }
        }
        return alive
    }

    // 设置鼠标进入的行为
    let set_mouse_in = (s: boolean) => {
        if(s){
            console.log("applied mouse in")
        }
        else{
            console.log("applied mouse out")
        }

        _set_mouse_in(s)
        if(s){
            if(mouseout_timer){
                clearTimeout(mouseout_timer)
            }
        }
        update_state(get_alive()) // 向父节点更新自身状态
    } 
    
    // 设置子节点状态
    let set_son_states = (son_states: {[son_id in string]: boolean}) => {
        _set_son_states(son_states)
        update_state(get_alive()) // 向父节点更新自身状态
    }

    // 获得子节点
    React.useEffect(()=>{(async ()=>{
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
        set_son_states({})
    })()} , [props.level, props.node_id])

    // 鼠标离开的行为
    function on_mouse_out(){
        console.log("mouseout!!")

        if(mouseout_timer){
            clearTimeout(mouseout_timer) // 先清除以前的
        }
        mouseout_timer = setTimeout(()=>{
            set_mouse_in(false)
            console.log("timeout!!!")
        }, 500)
    }

    // 获得子节点更新状态的方法
    function get_son_update_state(son_id: number){
        return (state: boolean)=>{
            if(state != son_states[son_id]){
                set_son_states({...son_states, son_id: state})
            }
            if(state){
                if(mouseout_timer){
                    clearTimeout(mouseout_timer)
                }
            }
        }
    }

    let link_ref = React.useRef<HTMLButtonElement>(undefined)
    return <><Button
            // onClick = {(e)=>{set_anchorel(e.currentTarget)}}

            onMouseOver = {()=>{set_mouse_in(true)}}
            // onMouseOut = {on_mouse_out}
            onMouseOut = {on_mouse_out}

            // underline = "always"
            // href = "#"
            ref = {link_ref}
            sx = {{width: "100%"}}
        >
            <TitleWord node_id = {props.node_id} />
        </Button>

        {sons.length <= 0 ? <></> : 
            <Menu
                anchorEl = {link_ref.current}
                open = {get_alive()}
                // onClose = {()=>{set_anchorel(undefined)}}
                anchorOrigin = {level == "high"? {
                    vertical: "bottom" as "bottom",
                    horizontal: "left" as "left",
                } : {
                    vertical: "top" as "top",
                    horizontal: "right" as "right",
                }}
                sx = {{
                    marginLeft: "0.1rem"
                }}
                // onMouseEnter = {()=>{set_mouse_in(true)}}
                autoFocus = {false}
            >{sons.map((son_id)=>{
                console.log(son_id)
                return <MenuItem 
                    sx = {{
                        padding: 0,
                    }}
                    autoFocus = {false}
                >
                    <TopMenu 
                        // update_state={()=>{get_son_update_state(son_id)}}
                        level = "low"
                        node_id = {son_id}
                    ></TopMenu>
                </MenuItem>
            })
            }</Menu>
        }
        
    </>
}