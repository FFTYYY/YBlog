import { 
    Snackbar , SnackbarOrigin , Button , IconButton
} from "@mui/material"
import {
    AssistWalker  as AssistWalkerIcon 
} 
from "@mui/icons-material"

import {
    Interaction , 
    BackendData , 
} from "../../base/interaction"

import React from "react"
import {
    AutoStack , 
    AutoTooltip , 
} 
from "@ftyyy/ytext"

export { GenerateTLDRButton }

class GenerateTLDRButton extends React.Component<{
    onSuccess?: ()=>any
}, {
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

    render(){
        let me = this

        return <React.Fragment>
            <AutoTooltip title="生成摘要"><IconButton size="small" onClick = {()=>{
                Interaction.post.tldr(BackendData.node_id).then(()=>{
                    let o = me.props.onSuccess
                    if(o){o()}
                })
            }}>
                <AssistWalkerIcon fontSize="small" color="primary"/>
            </IconButton></AutoTooltip>
        </React.Fragment>
    }
}

