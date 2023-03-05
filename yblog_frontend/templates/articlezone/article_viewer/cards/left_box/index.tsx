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
} from "@ftyyy/ytext"
import { Interaction , BackendData } from "../../../base/interaction"
import { LeftBasic } from "./left_basic"
import { LeftComments } from "./left_comments"
import { LeftEdit } from "./left_edit"
export {LeftBox}

// XXX 我想搞个渐变啥的...
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
    const [active_tab, set_active_tab] = React.useState("0");

    return <TabContext value={active_tab}><Box sx={{
        position: "absolute" , 
        height: "100%" , 
        width: "100%" , 
    }} >
        <Box sx={{position: "absolute", left: "0", width: "5rem", height: "100%"}}>
            <TabList onChange={(e,v)=>set_active_tab(v)} variant="scrollable" scrollButtons="auto" orientation="vertical" sx={{width: "100%"}}>
                <Tab label="信息" value="0"/>
                <Tab label="留言" value="1"/>
                { BackendData.logged_in ? <Tab label="编辑" value="3"/> : <></> }
            </TabList >
        </Box>
        <Box sx={{position: "absolute", left: "5rem", width: "80%", height: "100%"}} >
            <MyTablePanel value={"0"} active_tab={active_tab}><LeftBasic root={props.root}/></MyTablePanel>
            <MyTablePanel value={"1"} active_tab={active_tab}><LeftComments /></MyTablePanel>
            { BackendData.logged_in ? 
                <MyTablePanel value={"2"} active_tab={active_tab}><LeftEdit /></MyTablePanel>
            : <></> }
        </Box>
        
    </Box></TabContext>
}