/** 这个模块提供一些基础设施。
 * @module
 */

import React from "react"

export {FilledStyle , ScrollFilledStyle , ComponentStyle}

/**
 * 一个填满父元素的元素。
 */
let FilledStyle = {
    width: "100%" , 
    height: "100%" , 
    overflow: "hidden" ,     
} as React.CSSProperties 


/** 一个填满父元素的元素，但是可以滚动。 */
let ScrollFilledStyle = {
    width: "100%" , 
    height: "100%" , 
    overflow: "auto" ,     
} as React.CSSProperties

let ComponentStyle = {
    marginLeft: "10px" , 
    marginRight: "10px" , 
    marginBottom: "10px" , 
    marginTop: "10px" , 
} as React.CSSProperties