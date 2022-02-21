import { Global } from "@emotion/react"
import React from "react"

export {GlobalInfoProvider , GlobalInfo}

const GlobalInfo = React.createContext<{[key: string] : any}>({})

/** 这个组件用来代替`GlobalInfo.Provider`，其会自动合并提供的信息。 */
function GlobalInfoProvider(props:{
    value: {[key: string] : any}
    children: any
}){
    return <GlobalInfo.Consumer>{oldval => 
        <GlobalInfo.Provider value={ {...oldval , ...props.value} }>{props.children}</GlobalInfo.Provider>
    }</GlobalInfo.Consumer>
}