import { 
    Snackbar , SnackbarOrigin , Button , IconButton
} from "@mui/material"
import {
    Save as SaveIcon
} 
from "@mui/icons-material"

import { FlexibleItem } from "./framework"
import React from "react"
import {
    AutoStack , 
    AutoTooltip , 
} 
from "@ftyyy/ytext"

export { PostSnackbar }

function PostSnackbar(props: {
    info_sucess: string , 
    info_fail: string , 
    open: boolean , 
    status: boolean , 
    onClose: ()=>void , 
}){
    return <Snackbar 
        anchorOrigin = {{vertical: "top" , horizontal: "center"}}
        open = {props.open}
        message = {props.status ? props.info_sucess : props.info_fail}
        onClose = { ()=>props.onClose() }
    />
}
