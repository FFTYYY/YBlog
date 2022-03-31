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
import { withAllYEditorPlugins } from "../plugins/apply_all"
import { StyleCollector } from "../core/stylecollector"
import { GlobalInfoProvider , GlobalInfo } from "../globalinfo"
import { add_nodes } from "../behaviours"

import { YEditor } from "./editor"
export { DelayOperationsMixin }

class DelayOperationsMixin{

    /** 这个函数为编辑器的某个节点添加一个「稍后修改」。大多数情况是一个子编辑器进行的修改，为了防止焦点丢失等问题无法立刻应用。
     * @param key 应用关涉的节点编号。节点编号相同的操作会被覆盖。
     * @param subapply 等修改时调用的函数。
     */
    add_delay_operation(key: string, subapply: (fat: YEditor)=>void){
        let me = this as any as YEditor
        me.setState({delay_operations: {...me.state.delay_operations , [key]: subapply}})
    }

    /** 这个函数应用所有临时操作。 */
    apply_delay_operations(){
        let me = this as any as YEditor
        Object.values(me.state.delay_operations).map((subapply)=>{
            subapply(me)
        })
        me.setState({delay_operations: {}})
    }
}
