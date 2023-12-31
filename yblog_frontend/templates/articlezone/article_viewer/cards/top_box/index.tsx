

import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , Paper , 
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
    


    return <>
        <TopMenu node_id={my_id} />
    </>
}