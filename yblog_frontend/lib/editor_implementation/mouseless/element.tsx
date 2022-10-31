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

    React.useEffect(()=>{
        regiester_func(space, position, 
            () => {
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

    return <Box sx={{
        border: act? "2px solid #112233" : "none"
    }}>
        {children}
    </Box>
}
