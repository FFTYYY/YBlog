/** 这个模块提供一个组件，这个组件向下提供滚动条。
 * @module
*/
import React from "react"
import {
    Box , 
    BoxProps , 
} from "@mui/material"
import Scrollbar from "smooth-scrollbar"

export { ScrollBarBox }

function ScrollBarBox(props: BoxProps){
    React.useEffect(()=>{
        setTimeout(()=>Scrollbar.initAll() , 200)
    } , [])
    return <Box {...props} data-scrollbar/>
}
