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
export { UtilsMixin }

let UtilsMixin = {

    /** 这个函数帮助用户构建按钮。返回一个函数，这个函数表示要新建对应*样式*节点时的行为。
     * @param nodetype 节点类型，必须是有样式节点之一。
     * @param stylename 样式名。
     */
    get_onClick(nodetype: StyledNodeType, stylename: string): ()=>void{
        let me = this as any as YEditor

        /** 创建节点的函数。 */
        let proxy = me.get_proxy(nodetype , stylename)

        if(nodetype == "group" || nodetype == "support" || nodetype == "struct")
        {        
            return () => {
                let node = proxy.makenode()
                me.add_nodes_here(node) // 在当前选中位置插入节点。
            }
        }
        if(nodetype == "inline"){

            return ()=>{
                let selection = me.state.slate.selection
                let flag = true
                if(selection != undefined)
                    flag = JSON.stringify(selection.anchor) == JSON.stringify(selection.focus) // 是否没有选择

                let node = proxy.makenode()

                if(flag){ // 如果没有选择任何东西，就新建节点。
                    me.add_nodes_here(node) // 在当前选中位置插入节点。
                }
                else{ // 如果有节点，就把所有子节点打包成一个inline节点。
                    me.wrap_nodes(node  , (n:Node)=>Text.isText(n)) // 所有子节点中是文本的那些。
                }
            }
        }

        return () => undefined
    } , 

    /** 获得用于渲染的节点树。 */
    get_root(){
        let me = this as any as YEditor

        function parse_node(original_node: Node){
            let node = {...original_node}
            if(is_styled(node)){
                node.parameters = me.get_real_parameters(node)
            }
            if(has_children(node)){
                node.children = node.children.map(subnode=>parse_node(subnode))
            }
            return node
        }

        return parse_node(me.state.root)
    } , 

    /** 对于一个有样式的节点，如果其有代理，就返回代理解析过的参数，否则返回本来的参数。 */
    get_real_parameters(node: StyledNode){
        let me = this as any as YEditor

        if(node.proxy_info.proxy_name && me.get_proxy(node.type , node.proxy_info.proxy_name)){
            let proxy = me.get_proxy(node.type , node.proxy_info.proxy_name)
            return proxy.get_real_parameters(node.proxy_info.proxy_params) // 将节点的参数替换成真实参数。
        }
        return node.parameters
    }  ,  

}
