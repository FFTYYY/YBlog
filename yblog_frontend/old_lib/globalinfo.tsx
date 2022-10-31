/** 这个模块允许在渲染过程中为子渲染器提供一些全局参数，而不用层层传递。
 * @module
 */

import { Global } from "@emotion/react"
import React from "react"

export {GlobalInfoProvider , GlobalInfo}

/** 全局信息的上下文。 */
const GlobalInfo = React.createContext<{[key: string] : any}>({})

/** 这个组件用来代替`GlobalInfo.Provider`，如果有多个`GlobalInfo`嵌套，其会自动合并信息。 */
function GlobalInfoProvider(props:{
    value: {[key: string] : any}
    children: any
}){
    return <GlobalInfo.Consumer>{oldval => 
        <GlobalInfo.Provider value={ {...oldval , ...props.value} }>{props.children}</GlobalInfo.Provider>
    }</GlobalInfo.Consumer>
}