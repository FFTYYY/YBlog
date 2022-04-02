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
} from "../../../../lib"
import { LeftBasic } from "./left_basic"
import { LeftComments } from "./left_comments"

export {LeftBox}


function LeftBox(props: {root: GroupNode}){
    const [active_tab, set_active_tab] = React.useState("1");

    return <TabContext value={active_tab}><Box sx={{height: "100%"}}>
        <TabList onChange={(e,v)=>set_active_tab(v)} variant="scrollable" scrollButtons="auto">
            <Tab label = "基本" value = "1"/>
            <Tab label = "留言" value = "2"/>
        </TabList >
        <TabPanel value = "1" ><LeftBasic root={props.root}/></TabPanel>
        <TabPanel value = "2" ><LeftComments /></TabPanel>
    </Box></TabContext>
}