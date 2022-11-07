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
import "overlayscrollbars/overlayscrollbars.css"
import { OverlayScrollbars } from "overlayscrollbars"


export { ScrollBarBox }

/**
 * 注意，这个里面的所有东西都必须先被box包起来...
 */
class ScrollBarBox extends React.Component<BoxProps>{
    divref: React.RefObject<HTMLDivElement>
    os: OverlayScrollbars

    constructor(props: BoxProps){
        super(props)
        this.divref = React.createRef()
        this.os = undefined
    }

    componentDidMount(): void {
        while(!(this.divref && this.divref.current)); // 等待ref创建
        this.os = OverlayScrollbars(this.divref.current, {
            scrollbars:{
                autoHide: "leave", 
                autoHideDelay: 700 , 
            }
        });
    }

    render(){
        let {children, ...other_props} = this.props
        return <Box {...other_props} data-overlayscrollbars="" ref={this.divref}>{children}</Box>
    }
}

