/** 这个文件定义面向用户的YEditor组件。
 * @module 
 */

import React from "react"
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

export { YEditor }
import { UtilsMixin } from "./utilsmixin"
import { DelayOperationsMixin } from "./delayoperationsmixin"
import { CollectionMixin } from "./collectionmixin"
import { RenderMixin } from "./rendermixin"
import { BehavioursMixin } from "./behavioursmixin"
import type { EditorRenderer_Props , EditorRenderer_Func } from "./collectionmixin"
import type { SlateRenderer_Props } from "./rendermixin"


class YEditor extends React.Component<{
    core: EditorCore
    proxies: {[key in StyleType]: {[name: string]: Proxy}}
    renderers: StyleCollector<EditorRenderer_Func>

    bindref?: (ref:YEditor)=>void
    onUpdate?: (newval:any)=>void    // 当节点改变时的回调函数
    onFocusChange?: ()=>void          // 点击或者修改
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onKeyUp?: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onKeyPress?: (e: React.KeyboardEvent<HTMLDivElement>) => void

    plugin?: (editor: YEditor , slate: ReactEditor) => ReactEditor
},{
    slate: ReactEditor
    root: GroupNode
    delay_operations: { [subnode_idx: number]: (fat: YEditor)=>void }
}> {
    proxies: {[key in StyleType]: {[name: string]: Proxy}}
    renderers: StyleCollector<EditorRenderer_Func>
    core: EditorCore
    onUpdate: (v: any) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onKeyUp: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onFocusChange: ()=>void
    bindref: (ref:YEditor)=>void

    // delay-operation mixins
    add_delay_operation: (key: string, subapply: (fat: YEditor)=>void)=>void
    apply_delay_operations: ()=>void
    
    // collector mixins
    get_proxy: (type: StyleType , name: string) => Proxy
    get_renderer: (nodetype: NodeType, stylename?: string ) => EditorRenderer_Func
    
    // render mixins
    update_value: (value: Node[]) => void
    renderElement: (props: SlateRenderer_Props) => any
    renderLeaf: (props: SlateRenderer_Props) => any
    // render: () => JSX.Element

    // utils mixins
    get_onClick: (nodetype: StyledNodeType, stylename: string) => ( ()=>void )
    get_root: ()=>GroupNode
    deproxy: (node: StyledNode , proxy_params?: ValidParameter) => ValidParameter
    
    // behaviours mixins
    set_node: <T extends Node = StyledNode>(node: T, new_val: Partial<T>) => void
    delete_node: (node: Node) => void
    move_node: (node_from: Node, position_to: number[]) => void
    add_nodes: (nodes: (Node[]) | Node, path: number[]) => void
    add_nodes_before: (nodes: (Node[]) | Node, target_node: Node) => void
    add_nodes_after: (nodes: (Node[]) | Node, target_node: Node) => void
    replace_nodes: (father_node: StyledNode, nodes: Node[]) => void
    add_nodes_here: (nodes: (Node[]) | Node) => void
    wrap_nodes: <T extends Node & {children: Node[]} = StyledNode>(node: T, match: (n:Node)=>boolean) => void
    delete_node_by_path: (path: number[]) => void
    auto_set_parameter: (node: StyledNode, parameters: ValidParameter) => void

    use_mixins(){

        Object.assign(this , DelayOperationsMixin)
        Object.assign(this , CollectionMixin)
        Object.assign(this , RenderMixin)
        Object.assign(this , UtilsMixin)
        Object.assign(this , BehavioursMixin)
    }

    constructor(props){
        super(props)

        this.core = props.core
        this.onUpdate       = props.onUpdate        || (()=>{})
        this.onKeyDown      = props.onKeyDown       || (()=>{})
        this.onKeyUp        = props.onKeyUp         || (()=>{})
        this.onKeyPress     = props.onKeyPress      || (()=>{})
        this.onFocusChange  = props.onFocusChange   || (()=>{})
        this.bindref        = props.bindref         || (()=>{})

        this.renderers  = props.renderers
        this.proxies    = props.proxies

        let me = this
        let withOutherPlugin = this.props.plugin || ((x,y)=>y)

        this.state = {
            slate: withOutherPlugin(me , withAllYEditorPlugins( withReact(createEditor() as ReactEditor) ) as ReactEditor), 
            root: group_prototype("root" , {
                title: {type: "string" , val: ""} , 
            }) , 
            delay_operations: {} , 
        }

        this.use_mixins()
    }

    componentDidMount(){
        this.bindref(this)
    }

    get_slate(){
        return this.state.slate
    }
    set_slate(slate: ReactEditor){
        this.setState({slate: slate})
    }

    /** 返回储存了的渲染器的名称列表 */
    get_renderer_names(): {[type in StyledNodeType]?: string[]}{
        return Object.keys(this.renderers).reduce((obj , k)=>({...obj , k: Object.keys(this.renderers[k])}) , {})
    }
    /** 返回储存了的代理的名称列表 */
    get_proxy_names(type?: StyledNodeType): {[type in StyledNodeType]?: string[]} | string[]{
        if(type == undefined)
            return Object.keys(this.proxies).reduce((obj , k)=>({...obj , k: Object.keys(this.proxies[k])}) , {})
        return this.proxies[type] ? Object.keys(this.proxies[type]) : []
    }

    is_root(node: Node){
        return is_styled(node) && node.idx == this.state.root.idx
    }
}
// applyMixins(YEditor , [CollectionMixin , DelayOperationsMixin , RenderMixin , UtilsMixin])

// Object.assign(YEditor.prototype, CollectionMixin.prototype)
// Object.assign(YEditor.prototype, DelayOperationsMixin.prototype)
// Object.assign(YEditor.prototype, RenderMixin.prototype)
// Object.assign(YEditor.prototype, UtilsMixin.prototype)
// console.log(YEditor.prototype)

// function applyMixins(derivedCtor: any, constructors: any[]) {
//     constructors.forEach((baseCtor) => {
//         Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
//             Object.defineProperty(
//                 derivedCtor.prototype,
//                 name,
//                 Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
//                 Object.create(null)
//             )
//         })
//     })
//     console.log(derivedCtor.prototype)
// }


/* 以下是写了一半的把当前选区转换为group的代码
let selection = me.slate.selection

if (selection == undefined)
    return undefined

let point_bef = selection.anchor
let point_aft = selection.focus
if(Point.isAfter(point_bef , point_aft))
    [ point_bef , point_aft ] = [point_aft , point_bef]

let nodes: [Node,Path][] = Array.from( Node.elements(root , {from: point_bef.path, to: point_aft.path}) )
*/
