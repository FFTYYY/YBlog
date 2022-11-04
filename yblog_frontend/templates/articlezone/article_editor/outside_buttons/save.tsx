import { 
    Snackbar , SnackbarOrigin , Button , IconButton
} from "@mui/material"
import {
    Save as SaveIcon
} 
from "@mui/icons-material"

import React from "react"
import {
    AutoStack , 
    AutoTooltip , 
} 
from "../../lib"

import { PostSnackbar } from "../../base"

export { SaveButton }

class SaveButton extends React.Component<{
    save_func: (()=>Promise<boolean>)
} , {
    snackbar_open: boolean
    status: boolean
}>{
    constructor(props){
        super(props)

        this.state = {
            snackbar_open: false , 
            status: false , 
        }
    }

    click(){
        this.props.save_func().then(ret=>{
            this.setState({
                status: ret , 
                snackbar_open: true , 
            })
        })
    }

    render(){
        let me = this

        return <React.Fragment>
            <AutoTooltip title="保存"><IconButton size="small" onClick = {()=>{
                me.click()
            }}>
                    <SaveIcon fontSize="small" color="primary"/>
            </IconButton></AutoTooltip>
            <PostSnackbar 
                info_sucess = "保存成功"
                info_fail = "保存失败"
                open = {me.state.snackbar_open}
                status = {me.state.status}
                onClose = {()=>me.setState({snackbar_open:false})}     
            />
        </React.Fragment>
    }
}

