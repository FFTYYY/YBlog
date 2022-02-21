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
from "../../../lib"

export { SaveButton }

function SaveButton(props: {save_func: (()=>Promise<boolean>)}){

    let [snackbar_open , set_snackbar_open] = React.useState<boolean>(false)
    let [status , set_status] = React.useState<boolean>(false)

    return <React.Fragment>
        <FlexibleItem
            close_item = {
                <AutoTooltip title="保存"><IconButton size="small">
                    <SaveIcon fontSize="small" color="primary"/>
                </IconButton></AutoTooltip>
            }
            open_item = {<Button startIcon={<SaveIcon/>} color="primary">保存</Button>}
            onClick = {()=>{
                props.save_func().then(ret=>{
                    set_status(ret)
                    set_snackbar_open(true)
                })
            }}
            no_button
        />
        <Snackbar 
            anchorOrigin = {{vertical: "top" , horizontal: "center"}}
            open = {snackbar_open}
            message = {status ? "保存成功" : "保存失败"}
            onClose = {()=>set_snackbar_open(false)}
        />
    </React.Fragment>
}