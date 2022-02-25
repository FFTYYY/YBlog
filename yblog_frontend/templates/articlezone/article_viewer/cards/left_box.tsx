import React from "react"

import {
    Tabs , Tab , 
    Box , 
} from "@mui/material"
import {
    TabContext  , 
    TabList  , 
    TabPanel   , 
} from "@mui/lab"

export { LeftBox }

function LeftBox(props){
    const [active_tab, set_active_tab] = React.useState("1");

    return <TabContext value={active_tab}><Box>
        <TabList onChange={(e,v)=>set_active_tab(v)}>
            <Tab label = "基本" value = "1"/>
            <Tab label = "留言" value = "2"/>
        </TabList >
        <TabPanel value=  "1">Item One</TabPanel>
        <TabPanel value=  "2">留言</TabPanel>
    </Box></TabContext>
}