/** 
 * 这个模块提供一些用于控制组件排列方向的组件。
 * 具体来说，Direction 上下文决定元素排列的方向，而当进入元素的子元素时，排列方向会翻转
 * （例如，纵向排列的元素的子元素则是横向排列的）。
 * @module
 */

import React, { useState } from "react"
import { 
    Paper , 
    ButtonGroup , 
    Popper , 
    Tooltip , 
    Stack , 
    Fade  , 
    PopperProps , 
    Box , 
} from "@mui/material"

export {
    AutoTooltip  , 
    Direction , 
    AutoStack , 
    SimpleAutoStack , 
    AutoStackedPopper , 
    AutoStackButtons , 
    ForceContain , 
}
export type {
    AutoStackedPopperProps , 
    DirectionValues , 
}

type DirectionValues = "row" | "column"

/** 这个上下文对象指示一个元素以何种方向布局。 */
const Direction = React.createContext<DirectionValues>("row")

/** 这个上下文对象指示是否可以将元素渲染到窗口外。 */
const ForceContain = React.createContext<boolean>(false)


/** 这个元素创建一个为一个对象创建 Tooltip ，但是会根据当前方向自动决定位置。 
 * @param title 要为元素创建的 Tooltip 的值。
 * @param children 子元素。由 React 自动提供。
 */
function AutoTooltip(props: {
    title?: string, 
    children?: any , 
}){
    let title = props.title || ""
    return <Direction.Consumer>{nowdir => { 
        return <Tooltip title={title} placement={nowdir == "row" ? "left" : "top"} key="tooltip">
            {props.children}
        </Tooltip>
    }}</Direction.Consumer>
}

/** 这个组件用于创建一个根据当前方向自动堆叠的对象。子元素会自动转向。
 * @param force_direction 强制设置一个当前方向。
 * @param children 子元素。由 React 自动提供。
 * @param simple 是否为一个小堆叠，如果为 true ，则子组件不会转向。
 */
function AutoStackButtons(props: {
    force_direction?: DirectionValues
    children?: any
    simple?: boolean
    buttongroup_props?: any
}){
    let flip_direction = ! props.simple // 如果是简单版本，就不翻转方向，否则翻转

    let subcomponent = (nowdir: DirectionValues) => {
        let orientation: "horizontal"|"vertical" = (nowdir == "row") ? "horizontal" : "vertical"
        let newdir = flip_direction ? (nowdir == "row" ? "column" : "row") : nowdir
        return <Direction.Provider value={newdir}><ButtonGroup orientation={orientation} {...props.buttongroup_props}>{
            props.children
        }</ButtonGroup></Direction.Provider>
    }
    
    if(props.force_direction != undefined){
        return subcomponent(props.force_direction)
    }

    return <Direction.Consumer>{nowdir => subcomponent(nowdir)}</Direction.Consumer> 
}


/** 这个组件用于创建一个根据当前方向自动堆叠的对象。子元素会自动转向。
 * @param props.force_direction 强制设置一个当前方向。
 * @param props.children 子元素。由 React 自动提供。
 * @param props.simple 是否为一个小堆叠，如果为 true ，则子组件不会转向。
 */
function AutoStack(props: {
    force_direction?: DirectionValues
    children?: any
    simple?: boolean
}){
    let flip_direction = ! props.simple // 如果是简单版本，就不翻转方向，否则翻转

    let subcomponent = (nowdir: DirectionValues) => {
        let newdir = flip_direction ? (nowdir == "row" ? "column" : "row") : nowdir
        return <Direction.Provider value={newdir}><Stack direction={nowdir}>{
            props.children
        }</Stack></Direction.Provider>
    }
    
    if(props.force_direction != undefined){
        return subcomponent(props.force_direction)
    }

    return <Direction.Consumer>{nowdir => subcomponent(nowdir)}</Direction.Consumer> 
}

/** 这个组件用于创建一个根据当前方向自动堆叠的对象。子元素不会自动转向。
 * 相当于 <AutoStack simple>
 * @param force_direction 强制设置一个当前方向。
 * @param children 子元素。由 React 自动提供。
 */
function SimpleAutoStack(props: {
    force_direction?: DirectionValues
    children?: any
}){
    let subcomponent = (nowdir: DirectionValues) => {
        return <Direction.Provider value={nowdir}><Stack direction={nowdir}>{
            props.children
        }</Stack></Direction.Provider>
    }
    
    if(props.force_direction != undefined){
        return subcomponent(props.force_direction)
    }
    return <Direction.Consumer>{nowdir => subcomponent(nowdir)}</Direction.Consumer> 
}
 
type AutoStackedPopperProps = PopperProps & {
    force_direction?: DirectionValues
    children?: any
    stacker?: any 
    anchorEl: any
    open: boolean
    component?: any 
}

/** 一个弹出框，但其会自动按照当前方向布局和定位。 */
class AutoStackedPopper extends React.Component<AutoStackedPopperProps>{

    /**  
     * @param props.force_direction 强制设置一个当前方向。
     * @param props.children 子元素。由 React 自动提供。
     * @param props.stacker 用什么组件来堆叠元素。默认为 AutoStack 。用户可以提供自己的堆叠方式。
     * @param props.anchorEl 定位元素。
     * @param props.open 是否打开。
     * @param props.component 用什么元素来作为弹出框的实体。默认为 Paper 。
     */
    constructor(props: AutoStackedPopperProps){
        super(props)
    }
    render(){
        let props = this.props
        let S = props.stacker || AutoStack
        let C = props.component || Paper

        let {
            force_direction , 
            children , 
            stacker , 
            anchorEl , 
            open , 
            component , 
            ...other_props 
        } = props
        
        let subcomponent = (nowdir: DirectionValues) => {
            return <ForceContain.Consumer>{force_contain => <Popper 
                anchorEl = {props.anchorEl} 
                open = {props.open}
                placement = {nowdir == "row" ? "right" : "bottom"}
                disablePortal = {force_contain}
                transition
                {...other_props}
            >{({ TransitionProps }) => (<Fade {...TransitionProps} timeout={350}>
                <Paper><C><S>
                    {props.children}
                </S></C></Paper>
            </Fade>)}</Popper>}</ForceContain.Consumer>
        }
    
        if(props.force_direction != undefined){
            return subcomponent(props.force_direction)
        }
        return <Direction.Consumer>{nowdir => subcomponent(nowdir)}</Direction.Consumer> 
    
    }
}
