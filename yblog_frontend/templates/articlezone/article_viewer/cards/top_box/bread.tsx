

import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , Paper , Breadcrumbs ,
} from "@mui/material"
import {
    ArrowRight  as ArrowRightIcon , 
    KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon , 
    NavigateNext as NavigateNextIcon , 
    MoreHoriz  as ExpandCircleDownIcon , 
    
} from "@mui/icons-material"
import {
    TabContext  , 
    TabList  , 
    TabPanel   , 
} from "@mui/lab"

import {
    AbstractNode , 
    AutoTooltip, 
    ThemeContext , 
} from "@ftyyy/ytext"
import { Interaction , BackendData } from "../../../base/interaction"

import "./style.css"

import {
    TopMenu , 
} from "./bread_menu"

export {TopBread}

function TopBread(props: {
    root: AbstractNode
}){
    let my_id = BackendData.node_id
    let [fathers , set_fathers] = React.useState<number[]>([my_id])
    let [sons, set_sons]        = React.useState<number[]>([])
    let theme = React.useContext(ThemeContext)

    
    React.useEffect(()=>{(async ()=>{
        let now_id = my_id
        let father_ids = [my_id]
        for(let i = 0;i < 20;i ++){ // 最多20层
            let father_id = await Interaction.get.father_id(now_id)
            if(father_id <= 0){
                break
            }
            father_ids = [father_id, ...father_ids]
            now_id = father_id
        }
        set_fathers(father_ids)

        let son_ids = await Interaction.get.son_ids(my_id)
        set_sons(son_ids)
    })()} , [])

    let total = sons.length > 0 ? fathers.length + 1 : fathers.length
    let breads = fathers.map((father_id, idx)=>{
        return <TopMenu node_id={father_id} key={father_id} idx={idx} total={total}></TopMenu>
    })
    if(sons.length > 0){// 在最末尾加一个
        breads = [...breads, <TopMenu 
            node_id = {sons[0]} 
            key = {sons[0]} 
            idx = {total-1} 
            total = {total}
            element = {<AutoTooltip title={"子节点"}><ExpandCircleDownIcon /></AutoTooltip>}
        ></TopMenu>]
    }
    
    return <Breadcrumbs 
        sx = {{
            color: theme.my_palette.text.on_primary , 
        }}
        separator = {<ArrowRightIcon sx={{color: theme.my_palette.text.weak_on_primary}}/>}
    >{breads}</Breadcrumbs>
}

