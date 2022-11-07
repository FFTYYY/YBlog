import * as React from "react"
import { Grid , Box } from "@mui/material"
import {
    get_default_abstract_renderer , 
    PrinterPartBox , 
    ScrollBarBox, 
} from "../../../../../ytext"

export {
    renderers
}


let renderer_comment = get_default_abstract_renderer({
    senario: "title" , 
    container: (props)=>{
        let {node,parameters,context,children} = props

        return <ScrollBarBox sx={{
            width: "auto" , 
            height: "auto" , 
            maxHeight: "80vh" , 
            overflow: "auto" , 
        }}>
            <PrinterPartBox>{children}</PrinterPartBox>
        </ScrollBarBox>
    }
})

let renderers = {
    abstract: {
        "穆言": renderer_comment , 
    } , 
}