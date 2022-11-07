/** 
 * 这个模块定义编辑器的渲染器。
 * 和印刷器不一样，编辑器没有预处理节点，因此每个渲染器只是一个渲染函数。
 * @module
 */


import * as Slate from "slate"
import React from "react"

import {
    Node , 
} from "../core"
import {
    EditorComponent , 
} from "./main"

export type {EditorRendererProps , EditorRenderer}

/** 编辑器的渲染器接收的的props */
interface EditorRendererProps<NodeType extends Node & Slate.Node>{
    node: NodeType
    children: Slate.Node[]
}

/** 编辑器的渲染器。 */
type EditorRenderer<NodeType extends Node = Node> = (props: EditorRendererProps<NodeType>)=>React.ReactElement

