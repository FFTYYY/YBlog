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
import { set_normalize_status } from "../plugins/constraints"
import { YEditor } from "./editor"
export { UtilsMixin }

import {Transforms} from "slate"

/** 这个混入对象实现一些实用功能。 */
let UtilsMixin = {

    /** 这个函数帮助用户构建按钮。返回一个函数，这个函数表示要新建对应*样式*节点时的行为。
     * @param nodetype 节点类型，必须是有样式节点之一。
     * @param stylename 样式名。
     */
    get_onClick(nodetype: StyledNodeType, stylename: string): ()=>void{
        let me = this as any as YEditor

        /** 创建节点的函数。 */
        let proxy = me.get_proxy(nodetype , stylename)

        if(nodetype == "support" || nodetype == "struct")
        {        
            return () => {
                let node = proxy.makenode()
                me.add_nodes_here(node) // 在当前选中位置插入节点。
            }
        }
        if(nodetype == "group"){
            return ()=>{
                let selection = me.get_slate().selection
                let flag = true
                if (selection != undefined)
                    flag = JSON.stringify(selection.anchor) == JSON.stringify(selection.focus) // 是否没有选择
                
                let node = proxy.makenode()
                if(flag){ // 没有选东西，直接添加节点
                    me.add_nodes_here(node) // 在当前选中位置插入节点。
                }
                else{ // 选了东西，打包节点。
                    me.wrap_selected_nodes(node , {split: false})
                }
            }
        }
        if(nodetype == "inline"){

            return ()=>{
                let selection = me.get_slate().selection
                let flag = true // 是否没有选择任何东西
                if(selection != undefined)
                    flag = JSON.stringify(selection.anchor) == JSON.stringify(selection.focus) // 是否没有选择

                let node = proxy.makenode()

                if(flag){ // 如果没有选择任何东西，就新建节点。
                    me.add_nodes_here(node) // 在当前选中位置插入节点。
                }
                else{ // 如果有节点，就把所有子节点打包成一个inline节点。
                    me.wrap_selected_nodes(node  , {match: (n:Node)=>Text.isText(n) , split: true}) // 所有子节点中是文本的那些。
                }
            }
        }

        return () => undefined
    } , 

    /** 获得用于渲染的节点树。 */
    get_root(){
        let me = this as any as YEditor
        return me.state.root
    } , 

    /** 对于一个有样式的节点，如果其有代理，就返回代理解析过的参数，否则返回本来的参数。 */
    deproxy(node: StyledNode , proxy_params?: ValidParameter){
        let me = this as any as YEditor

        proxy_params = proxy_params || node.proxy_info.proxy_params
        if(proxy_params == undefined){
            return node.parameters
        }

        if(node.proxy_info.proxy_name && me.get_proxy(node.type , node.proxy_info.proxy_name)){
            let proxy = me.get_proxy(node.type , node.proxy_info.proxy_name)
            return proxy.get_real_parameters(proxy_params) // 将节点的参数替换成真实参数。
        }
        return node.parameters
    }  ,  

}
