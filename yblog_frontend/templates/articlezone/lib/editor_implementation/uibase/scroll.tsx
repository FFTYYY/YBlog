/** 这个模块提供一个组件，这个组件向下提供滚动条。
 * @module
*/
import React from "react"
import {
    Box , 
    BoxProps , 
} from "@mui/material"
import {
    GlobalInfo , 
    GlobalInfoProvider , 
} from "../../core"
import Scrollbar from "smooth-scrollbar"

export { ScrollBarBox }

function ScrollBarBox(props: BoxProps){

    // let [my_scrollbar , set_sb] = React.useState<undefined | Scrollbar>(undefined)
    let scrollinfo = {scrollbar: undefined } // 我决定不把这个变量作为状态，因为useContext的更新有bug。

    let divref = React.useRef<HTMLDivElement>()
    let {children, ...other_props} = props
    
    React.useEffect(()=>{
        while(!(divref && divref.current)); // 等待ref创建
        
        let sb = Scrollbar.init(divref.current , {delegateTo: divref.current, renderByPixels: true})
        scrollinfo.scrollbar = sb
        sb.addListener(()=>{
            divref.current.dispatchEvent(new Event("scroll")) // 手动触发原生事件
        })
    } , [])


    return <GlobalInfoProvider value={{scrollinfo: scrollinfo}}>
        <Box {...other_props} data-scrollbar ref={divref}>{children}</Box>
    </GlobalInfoProvider>
}
