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

export {
    TopMenu , 
}

/**
 * 
 * @param props.node_id 当前节点的id
 */
function TopMenu(props: {
    node_id: number , 
    level?: "high" | "low" , 
}){
    let [anchorel , set_anchorel] = React.useState<undefined | HTMLElement>(undefined)

    let level = props.level || "high"
    let anchor_orig = level == "high"? {
        vertical: "bottom" as "bottom",
        horizontal: "left" as "left",
    } : {
        vertical: "top" as "top",
        horizontal: "right" as "right",
    }

    return <><Button
            onClick = {(e)=>{set_anchorel(e.currentTarget)}}
            // underline = "always"
            // href = "#"
            sx = {{width: "100%"}}
        >
            Haha
        </Button>
        <Menu
            anchorEl = {anchorel}
            open = {anchorel != undefined}
            onClose = {()=>{set_anchorel(undefined)}}
            anchorOrigin = {anchor_orig}
            sx = {{
                marginLeft: "0.1rem"
            }}
        >
            <MenuItem 
                onClick={()=>{}}
                sx = {{
                    padding: 0,
                }}
            >
                <TopMenu 
                    level = "low"
                    node_id = {props.node_id}
                ></TopMenu>
            </MenuItem>
            <MenuItem 
                onClick={()=>{}}
                sx = {{padding: 0,}}
            >
                <TopMenu 
                    level = "low"
                    node_id = {props.node_id}
                ></TopMenu>
            </MenuItem>
        </Menu>
    </>
}