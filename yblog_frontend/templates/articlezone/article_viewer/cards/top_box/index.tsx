import React  from "react"

import {
    AbstractNode , AutoStack , ThemeContext , Direction , DirectionValues , 
    ScrollBarBox , 
} from "@ftyyy/ytext"

import {
	Box , 
	CssBaseline,
	SvgIcon , 
	Divider , 
	AppBar , 
    Stack,  
    StackProps,
} from "@mui/material"


import { TopBread } from "./bread"
import { BasicInfoButton , CommentButton , AboutButton, EditButton} from "./top_buttons"
import { Interaction , BackendData } from "../../../base/interaction"

export { TopBox }

function MyAutoStack(props: {
    sx?: StackProps , 
    force_direction?: DirectionValues
    children?: any
    simple?: boolean
}){
    let flip_direction = ! props.simple // 如果是简单版本，就不翻转方向，否则翻转

    let subcomponent = (nowdir: DirectionValues) => {
        let newdir = flip_direction ? (nowdir == "row" ? "column" : "row") : nowdir
        return <Direction.Provider value={newdir}><Stack direction={nowdir} {...(props.sx || {})}>{
            props.children
        }</Stack></Direction.Provider>
    }
    
    if(props.force_direction != undefined){
        return subcomponent(props.force_direction)
    }

    return <Direction.Consumer>{nowdir => subcomponent(nowdir)}</Direction.Consumer> 
}



function TopBox(props: {
    root: AbstractNode , 
    
    idx_activated?: boolean , 
    onActivateIdx?: ()=>any , 
}){
    let theme = React.useContext(ThemeContext)
    return <MyAutoStack 
        force_direction = "row"
        sx={{width: "100%", height: "100%", overflow: "hidden"}}
    >
        <ScrollBarBox sx={{
            paddingX: "1rem" , 
            maxWidth: "80%",
            maxHeight: "100%" , 
            overflow: "auto" , 
            borderRight: "1px solid grey" , 
        }}>
            <TopBread root = {props.root}/>
        </ScrollBarBox>
        <Box sx={{
            textAlign: "right" , 
            marginLeft: "auto" , 
            paddingLeft: "0.8rem" , 
            paddingRight: "0.4rem" , 
            borderLeft: "1px solid grey"
        }}>
            {(!BackendData.logged_in) ? <></> : // 只有登录之后才能看到编辑按钮（只是显示方便，不会导致权限的实际提升）
                <EditButton 
                root = {props.root} 
                idx_activated = {props.idx_activated} 
                onActivateIdx = {props.onActivateIdx}
                />
            }
            <AboutButton />
            <CommentButton   root = {props.root} />
            <BasicInfoButton root = {props.root} />
        </Box>
    </MyAutoStack>
}