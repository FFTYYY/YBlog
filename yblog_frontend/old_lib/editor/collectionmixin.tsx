import React from "react";
import { createEditor , Node , BaseEditor , Path , BaseElement } from "slate"
import { Slate, Editable, withReact, ReactEditor} from "slate-react"
import { Editor , Point , Text } from "slate"
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
import { withAllYEditorPlugins } from "../plugins/apply_all"
import { StyleCollector } from "../core/stylecollector"
import { GlobalInfoProvider , GlobalInfo } from "../globalinfo"

import { YEditor } from "./editor"
export { CollectionMixin }
export type { EditorRenderer_Props , EditorRenderer_Func }

/** Editor 的 renderer 可以接受的参数列表。 */
interface EditorRenderer_Props{
    editor: YEditor
    element: Node
    children: any[]
}

/** Editor 的子渲染组件的类型。*/
type EditorRenderer_Func = (props: EditorRenderer_Props) => any

/** 这个混入对象实现了所有和查询有关的操作。 */
let CollectionMixin = {
 
    /** 询问一个代理。 */
    get_proxy(type: StyleType , name: string){
        let me = this as any as YEditor
        return me.proxies[type][name]
    } , 

    /** 添加一个渲染器。 */
    get_renderer(nodetype: NodeType, stylename: string | undefined = undefined): EditorRenderer_Func{
        let me = this as any as YEditor
        return me.renderers.get(nodetype , stylename)
    } , 
}

