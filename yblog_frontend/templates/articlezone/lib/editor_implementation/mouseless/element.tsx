import React from "react"
import {
    Box , 
} from "@mui/material"

import {
    MouselessRegister , 
    MouselessRun , 
    MouselessActivateOperation , 
    MouselessUnActivateOperation , 
} from "./manager"
import { GlobalInfo } from "../../core"
import Scrollbar from "smooth-scrollbar"

export {
    MouselessElement , 
}

export type {
    MouselessElementProps , 
}

interface MouselessElementProps{
    space: string
    position: string 
    run: MouselessRun
    children: React.ReactChild | React.ReactChild[]

    extra_activate?: MouselessActivateOperation
    extra_unactivate?: MouselessUnActivateOperation
}

function MouselessElement(props: MouselessElementProps){
    let {space, position, run, children, extra_activate, extra_unactivate} = props

    let [act, set_act] = React.useState(false)
    let [regiester_func, unregister_func] = React.useContext(MouselessRegister)
    let eleref = React.useRef<HTMLDivElement | undefined>(undefined)

    let globalinfo = React.useContext(GlobalInfo)

    React.useEffect(()=>{
        regiester_func(space, position, 
            () => {
                let scrollinfo = globalinfo["scrollinfo"] // 离本元素最近的滚动条。
                if(eleref && eleref.current && scrollinfo && scrollinfo.scrollbar){
                    let scrollbar = scrollinfo.scrollbar as Scrollbar
                    scrollbar.scrollIntoView(eleref.current )
                }

                set_act(true)
                if(extra_activate){
                    extra_activate()
                }
            }, 
            (new_pos) => {
                set_act(false)
                if(extra_unactivate){
                    extra_unactivate(new_pos)
                }

            }, run)
        return ()=>{
            unregister_func(space, position)
        }
    }, [])

    return <div ref={eleref}><Box sx={{
        border: act? "2px solid" : "none"
    }}>
        {children}
    </Box></div>
}
