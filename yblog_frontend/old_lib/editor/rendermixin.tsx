import React from "react";
import { createEditor , Node , BaseEditor , Path , BaseElement } from "slate"
import { Slate, Editable, withReact, ReactEditor} from "slate-react"
import { Editor, Transforms , Point , Text } from "slate"
import { withHistory } from "slate-history"

import {
    Card , 
    Box , 
    Container , 
} from "@mui/material"

import {
    text_prototype , 
    paragraph_prototype , 
    inline_prototype , 
    group_prototype , 
    struct_prototype, 
    support_prototype , 
    has_children , 
} from "../core/elements"
import type { StyledNodeType , InlineNode , GroupNode , StructNode , SupportNode , StyleType , NodeType , StyledNode } from "../core/elements"
import { Proxy } from "../core/proxy"
import { get_node_type , is_styled , new_struct_child , ValidParameter } from "../core/elements"
import { EditorCore } from "../core/core"
import { set_normalize_status } from "../plugins/constraints"
import { StyleCollector } from "../core/stylecollector"
import { GlobalInfoProvider , GlobalInfo } from "../globalinfo"

import { YEditor } from "./editor"

export { RenderMixin }
export type { SlateRenderer_Props }

/** Slate 需要的渲染函数的 props 。 */
interface SlateRenderer_Props{
    attributes: any
    children: Node[]

    element?: Node
    leaf?: Node
}

/** 这个混入对象实现所有和渲染编辑器相关的操作。 */
let RenderMixin = {
    
    /** 
     * 当 slate 改变 value 时通知自身的函数。
     */
    update_value(value: Node[]){
        let me = this as any as YEditor
        me.setState({root: {...me.state.root , children: value}})
        me.onUpdate(value)
    } , 

    /** 渲染函数
     * @param props.element 当前要渲染的节点。
     * @param props.attributes 当前元素的属性，这是slate要求的。
     * @param props.children 下层节点，这是slate要求的。
     * @private
     */
    renderElement(props: SlateRenderer_Props){
        let me = this as any as YEditor
        let element = props.element  as BaseElement

        let type = get_node_type(element)
        let name = undefined // 如果name是undefined，则get_renderer会返回默认样式。
        if(is_styled(element)){
            name = element.name
        }
        
        // 取得的子渲染器。
        let R = me.get_renderer(type , name)

        // 需要给 slate 提供的顶层属性。
        let slate_attributes = props.attributes

        // 子渲染器需要的 props 。
        let subprops = {
            editor: me , 
            element: element ,
            children: props.children , 
        }
        
        // 如果这是个 inline 元素，就添加一个额外 style 。
        let extra_style = {}
        if(me.state.slate.isInline(element))
            extra_style = {display: "inline-block"}
        
        return <div {...slate_attributes} style={extra_style}><R {...subprops}/></div>
    } , 

    renderLeaf(props: SlateRenderer_Props){
        let me = this as any as YEditor

        let R = me.get_renderer("text")

        // 需要给 slate 提供的顶层属性。
        let slate_attributes = props.attributes

        // 子渲染器需要的 props 。
        let subprops = {
            editor: me  , 
            element: props.leaf ,
            children: props.children , 
        }
        return <span {...slate_attributes}><R {...subprops}></R></span>
    } , 

    render(){    
        let me = this as any as YEditor

        let slate = me.state.slate
    
        let context = {
            editor: me , 
            slate: me.state.slate , 
            core: me.core , 
        }
        
        return <GlobalInfoProvider value={context}>
            <Slate 
                editor = {slate} 
                value = {me.state.root.children} 
                onChange = {value => {
                    if(JSON.stringify(value) == JSON.stringify(this.state.root.children)){
                        return
                    }
                    me.update_value(value)
                    me.onFocusChange()
                }}
            >
                <Editable
                    renderElement = {me.renderElement.bind(me)}
                    renderLeaf    = {me.renderLeaf.bind(me)}
                    onClick       = {e=>{me.onFocusChange()}}
    
                    onCopy = {(e)=>{
                        return true // 虽然不知道是什么原理，但是返回`true`会使得`slate`只向粘贴板中输入文本。
                    }}

                    onPaste = {()=>{
                        set_normalize_status({pasting: true})
                        return false
                    }}
    
                    onKeyDown = {e=>me.onKeyDown(e)}
                    onKeyUp = {e=>me.onKeyUp(e)}
                    onKeyPress = {e=>{me.onKeyPress(e)}}
                />
            </Slate>
        </GlobalInfoProvider>
    } ,     
}

