/** 这个模块提供一个组件，这个组件向下提供滚动条。
 * 
 * @module
*/
// TODO 这个组件定义在editor_implementation中，但是printer的滚动方法却依赖之

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

class ScrollBarBox extends React.Component<BoxProps>{
    divref: React.RefObject<HTMLDivElement>
    scrollinfo: {scrollbar: Scrollbar | undefined}

    constructor(props: BoxProps){
        super(props)
        this.scrollinfo = {scrollbar: undefined}
        this.divref = React.createRef()
    }
    componentDidUpdate(prevProps: Readonly<BoxProps<"div", {}>>, prevState: Readonly<{}>, snapshot?: any): void {
        
        console.log("update!")
    }

    componentDidMount(): void {
        console.log("mount!")
        while(!(this.divref && this.divref.current)); // 等待ref创建
        
        let sb = Scrollbar.init(this.divref.current)
        this.scrollinfo.scrollbar = sb
        this.scrollinfo.scrollbar; // XXX 就你妈神奇，如果不观测一次这个变量，后面this.scrollinfo.scrollbar就会一直是undefined。
        sb.addListener(()=>{
            this.divref.current.dispatchEvent(new Event("scroll")) // 手动触发原生事件
        })
    }

    render(){
        let {children, ...other_props} = this.props
        console.log(other_props)
        return <GlobalInfoProvider value={{scrollinfo: this.scrollinfo}}>
            <Box  data-scrollbar ref={this.divref} {...other_props}>{children}</Box>
        </GlobalInfoProvider>
    }
}

