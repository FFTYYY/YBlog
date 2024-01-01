

import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , Paper , Breadcrumbs ,
} from "@mui/material"
import {
    KeyboardDoubleArrowLeft as KeyboardDoubleArrowLeftIcon , 
    KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon , 
} from "@mui/icons-material"
import {
    TabContext  , 
    TabList  , 
    TabPanel   , 
} from "@mui/lab"

import {
    AbstractNode , 
} from "@ftyyy/ytext"
import { Interaction , BackendData } from "../../../base/interaction"

import {
    TopMenu , 
} from "./top_menu"

export {TopBox}

function TopBox(props: {
    root: AbstractNode
}){
    let my_id = BackendData.node_id
    let [fathers , set_fathers] = React.useState<number[]>([my_id])
    
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
    })()} , [])
    
    return <Breadcrumbs>{fathers.map(father_id=>{
        return <TopMenu node_id = {father_id} key = {father_id}></TopMenu>
    })}</Breadcrumbs>
}