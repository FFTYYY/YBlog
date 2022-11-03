/** 这个模块提供一些基础定义。 
 * @module
*/

import React from "react"

import * as Slate from "slate"
import {
    ConceptNode, 
    ParameterList , 
    ProcessedParameterList , 
} from "../core"

export type {
    EditorNodeInfoFunction , 
}


type EditorNodeInfoFunction<NodeType extends ConceptNode = ConceptNode, ValueType = any> = (node: NodeType & Slate.Node, parameters: ProcessedParameterList) => ValueType

