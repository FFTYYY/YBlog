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

    React.useEffect(()=>{
        regiester_func(space, position, 
            () => {
                set_act(true)
                if(extra_activate){
                    extra_activate()
                }
                eleref.current.scrollIntoView({block: "center", inline: "center"}) // 自动滚到
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
