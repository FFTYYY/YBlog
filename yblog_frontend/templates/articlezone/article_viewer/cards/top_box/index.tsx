import React  from "react"

import {
    AbstractNode , AutoStack , ThemeContext
} from "@ftyyy/ytext"

import {
	Box , 
	CssBaseline,
	SvgIcon , 
	Divider , 
	AppBar , 
} from "@mui/material"


import { TopBread } from "./bread"
import { BasicInfoButton , CommentButton , AboutButton, EditButton} from "./top_buttons"
import { Interaction , BackendData } from "../../../base/interaction"

export { TopBox }

function TopBox(props: {
    root: AbstractNode , 
    
    idx_activated?: boolean , 
    onActivateIdx?: ()=>any , 
}){
    let theme = React.useContext(ThemeContext)
    return <AutoStack force_direction="row">
        <Box sx={{
            paddingX: "1rem" , 
            maxWidth: "80%",
            overflow: "auto" , 
        }}>
            <TopBread root = {props.root}/>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem sx={{
            borderColor: theme.extra_paltte.text.on_primary , 
            borderWidth: "1px"
        }}/>
        <Box sx={{
            textAlign: "right" , 
            marginLeft: "auto" , 
        }}>
            {(!BackendData.logged_in) ? <></> : // 只有登录之后才能看到编辑按钮（只是显示方便，不会导致权限的实际提升）
                <EditButton 
                root = {props.root} 
                idx_activated = {props.idx_activated} 
                onActivateIdx = {props.onActivateIdx}
                />
            }
            <CommentButton   root = {props.root} />
            <BasicInfoButton root = {props.root} />
            <AboutButton />
        </Box>
    </AutoStack>
}