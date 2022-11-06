import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , Paper
} from "@mui/material"
import {
    TabContext  , 
    TabList  , 
    TabPanel   , 
} from "@mui/lab"

import {
    AbstractNode , 
} from "../../../lib"
import { Interaction , BackendData } from "../../../base/interaction"
import { LeftBasic } from "./left_basic"
import { LeftComments } from "./left_comments"
import { LeftEdit } from "./left_edit"
export {LeftBox}

class MyTablePanel extends React.Component<{value: string, children: any, active_tab: string}>{
    constructor(props){
        super(props)
    }
    render(){
        let {value, children, active_tab} = this.props
        return <Box sx={{
            display: active_tab == value ? "block" : "none" , 
            paddingLeft: "1.5rem" , 
        }}>{children}</Box>
    }
}

function LeftBox(props: {root: AbstractNode}){
    const [active_tab, set_active_tab] = React.useState("1");

    return <TabContext value={active_tab}><Box sx={{
        position: "absolute" , 
        height: "100%" , 
        width: "100%" , 
    }} >
        <Box sx={{position: "absolute", left: "0", width: "20%", height: "100%"}}>
            <TabList onChange={(e,v)=>set_active_tab(v)} variant="scrollable" scrollButtons="auto" orientation="vertical" sx={{width: "100%"}}>
                <Tab label="基本" value="1"/>
                <Tab label="留言" value="2"/>
                { BackendData.logged_in ? <Tab label="编辑" value="3"/> : <></> }
            </TabList >
        </Box>
        <Box sx={{position: "absolute", left: "20%", width: "80%", height: "100%"}} >
            <MyTablePanel value={"1"} active_tab={active_tab}><LeftBasic root={props.root}/></MyTablePanel>
            <MyTablePanel value={"2"} active_tab={active_tab}><LeftComments /></MyTablePanel>
            { BackendData.logged_in ? 
                <MyTablePanel value={"3"} active_tab={active_tab}><LeftEdit /></MyTablePanel>
            : <></> }
        </Box>
        
    </Box></TabContext>
}