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
from "@ftyyy/ytext"

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

    render(){
        let me = this

        return <React.Fragment>
            <AutoTooltip title="保存"><IconButton size="small" onClick = {()=>this.props.save_func()}>
                    <SaveIcon fontSize="small" color="primary"/>
            </IconButton></AutoTooltip>
        </React.Fragment>
    }
}

