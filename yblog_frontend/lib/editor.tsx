/** 这个文件定义面向用户的YEditor组件。
 * @module 
 */

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
} from "./core/elements"
import type { StyledNodeType , InlineNode , GroupNode , StructNode , SupportNode , StyleType , NodeType , StyledNode } from "./core/elements"
import { Proxy } from "./core/proxy"
import { get_node_type , is_styled , new_struct_child , ValidParameter } from "./core/elements"
import { EditorCore } from "./core/core"
import { withAllYEditorPlugins } from "./plugins/apply_all"
import { StyleCollector } from "./core/stylecollector"
import { GlobalInfoProvider , GlobalInfo } from "./globalinfo"
import { add_nodes } from "./behaviours"
import { rootShouldForwardProp } from "@mui/material/styles/styled";

export { YEditor }
export type { EditorRenderer_Props , EditorRenderer_Func}


/** Slate 需要的渲染函数的 props 。 */
interface SlateRenderer_Props{
    attributes: any
    children: Node[]

    element?: Node
    leaf?: Node
}

class RendererProxyMixin{

    renderers: StyleCollector<EditorRenderer_Func>

    /** `Editor`在用户界面提供的不是真正的`style`，因此需要用`proxy`来转换成真正的`style`。 */
    proxies: {[key in StyleType]: {[name: string]: Proxy}}

    /** 添加一个代理。 */
    add_proxy(proxy: Proxy){
        if(proxy.target_style.type != "abstract")
            this.proxies[proxy.target_style.type][proxy.target_style.name] = proxy
    }

    /** 询问一个代理。 */
    get_proxy(type: StyleType , name: string){
        return this.proxies[type][name]
    }

    /** 添加一个渲染器。 */
    get_renderer(nodetype: NodeType, stylename: string | undefined = undefined): EditorRenderer_Func{
        return this.renderers.get(nodetype , stylename)
    }

    /** 设置渲染器。 */
    set_renderer(val: EditorRenderer_Func, nodetype: NodeType, stylename: string | undefined = undefined){
        return this.renderers.set(val , nodetype , stylename)
    }

}

class DelayOprationsMixin{

    /** 所有需要『稍后应用』的操作。 */
    delay_operations: { [subnode_idx: number]: (fat: YEditor)=>void }

    /** 这个函数为编辑器的某个节点添加一个「稍后修改」。大多数情况是一个子编辑器进行的修改，为了防止焦点丢失等问题无法立刻应用。
     * @param key 应用关涉的节点编号。节点编号相同的操作会被覆盖。
     * @param subapply 等修改时调用的函数。
     */
    add_delay_operation(key: string, subapply: (fat: YEditor)=>void){
        this.delay_operations[key] = subapply
    }

    /** 这个函数应用临时操作。 */
    apply_delay_operations(){
        let me = this as any as YEditor
        Object.values(this.delay_operations).map((subapply)=>{
            subapply(me)
        } )
        this.delay_operations = {}
    }

}
/** Editor 的 renderer 可以接受的参数列表。 */
interface EditorRenderer_Props{
    editor: YEditor
    element: Node
    children: any[]
}

/** Editor 的子渲染组件的类型。*/
type EditorRenderer_Func = (props: EditorRenderer_Props) => any
class RenderMixin{
    
    /** 
     * 当 slate 改变 value 时通知自身的函数。
     */
    update_value(value: Node[]){
         let me = this as any as YEditor
         me.setState({root: {...me.state.root , children: value}})
         me.onUpdate(value)
    }

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
    }
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
    }
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
                    me.update_value(value)
                    me.onFocusChange()
                }}
            >
                <Editable
                    renderElement = {me.renderElement.bind(me)}
                    renderLeaf    = {me.renderLeaf.bind(me)}
                    onClick       = {e=>{me.onFocusChange()}}

                    onCopy = {async (e)=>{
                        return true // 虽然不知道是什么原理，但是返回`true`会使得`slate`只向粘贴板中输入文本。
                    }}

                    onKeyDown = {e=>me.onKeyDown(e)}
                    onKeyUp = {e=>me.onKeyUp(e)}
                    onKeyPress = {e=>{me.onKeyPress(e)}}
                />
            </Slate>
        </GlobalInfoProvider>
    }

}

class UtilsMixin{

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
                Transforms.insertNodes(me.state.slate , node)
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
                    Transforms.insertNodes(me.state.slate , node)
                }
                else{ // 如果有节点，就把所有子节点打包成一个inline节点。
                    Transforms.wrapNodes<InlineNode>(
                        me.state.slate , 
                        node , 
                        { 
                            match: (n:Node)=>Text.isText(n) , // 所有子节点中是文本的那些。
                            split: true , 
                        }
                    )
                }
            }
        }

        return () => undefined
    }

    /** 获得用于渲染的节点树。 */
    public get_root(){
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

        return parse_node(me.state.slate)
    }

    /** 对于一个有样式的节点，如果其有代理，就返回代理解析过的参数，否则返回本来的参数。 */
    public get_real_parameters(node: StyledNode){
        let me = this as any as YEditor

        if(node.proxy_info.proxy_name && me.get_proxy(node.type , node.proxy_info.proxy_name)){
            let proxy = me.get_proxy(node.type , node.proxy_info.proxy_name)
            return proxy.get_real_parameters(node.proxy_info.proxy_params) // 将节点的参数替换成真实参数。
        }
        return node.parameters
    }    

}

class YEditor extends React.Component<{
    core: EditorCore
    onUpdate?: (newval:any)=>void    // 当节点改变时的回调函数
    onFocusChange?: ()=>void          // 点击或者修改
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onKeyUp?: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onKeyPress?: (e: React.KeyboardEvent<HTMLDivElement>) => void
},{
    slate: ReactEditor
    root: GroupNode
}> implements RendererProxyMixin , DelayOprationsMixin , RenderMixin , UtilsMixin {
    core: EditorCore
    onUpdate: (v: any) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onKeyUp: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onFocusChange: ()=>void

    delay_operations: { [subnode_idx: number]: (fat: YEditor)=>void }
    add_delay_operation: (key: string, subapply: (fat: YEditor)=>void)=>void
    apply_delay_operations: ()=>void
    
    proxies: {[key in StyleType]: {[name: string]: Proxy}}
    renderers: StyleCollector<EditorRenderer_Func>
    add_proxy: (proxy: Proxy) => void
    get_proxy: (type: StyleType , name: string) => Proxy
    get_renderer: (nodetype: NodeType, stylename?: string ) => EditorRenderer_Func
    set_renderer: (val: EditorRenderer_Func, nodetype: NodeType, stylename?: string ) => void
    
    update_value: (value: Node[]) => void
    renderElement: (props: SlateRenderer_Props) => any
    renderLeaf: (props: SlateRenderer_Props) => any
    render: () => any

    get_onClick: (nodetype: StyledNodeType, stylename: string) => ( ()=>void )
    get_root: ()=>Node
    get_real_parameters: (node: StyledNode) => ValidParameter
    

    constructor(props){
        super(props)

        this.core = props.core
        this.onUpdate       = props.onUpdate        || (()=>{})
        this.onKeyDown      = props.onKeyDown       || (()=>{})
        this.onKeyUp        = props.onKeyUp         || (()=>{})
        this.onKeyPress     = props.onKeyPress      || (()=>{})
        this.onFocusChange  = props.onFocusChange   || (()=>{})

        this.renderers = new StyleCollector<EditorRenderer_Func>(this.core , {
            text      : (props: EditorRenderer_Props)=><span>{props.children}</span> , 
            inline    : (props: EditorRenderer_Props)=><span>{props.children}</span> , 
            paragraph : (props: EditorRenderer_Props)=><div>{props.children}</div> , 
            group     : (props: EditorRenderer_Props)=><div>{props.children}</div> , 
            struct    : (props: EditorRenderer_Props)=><div>{props.children}</div> , 
            support   : (props: EditorRenderer_Props)=><div>{props.children}</div> , 
        })

        this.proxies = {
            inline: {},
            group: {}, 
            struct: {},
            support: {} ,  
            abstract: {} , 
        }

        this.state = {
            slate: withReact(createEditor() as ReactEditor) , 
            root: group_prototype("root" , {
                title: {type: "string" , val: ""} , 
            }) , 
        }

        this.delay_operations = {}
    }

    get_slate(){
        return this.state.slate
    }

    /** 返回储存了的渲染器的名称列表 */
    get_renderer_names(): {[type in StyledNodeType]?: string[]}{
        return Object.keys(this.renderers).reduce((obj , k)=>({...obj , k: Object.keys(this.renderers[k])}) , {})
    }
    /** 返回储存了的代理的名称列表 */
    get_proxy_names(type?: StyledNodeType): {[type in StyledNodeType]?: string[]} | string[]{
        if(type == undefined)
            return Object.keys(this.proxies).reduce((obj , k)=>({...obj , k: Object.keys(this.renderers[k])}) , {})
        return Object.keys(this.renderers[type])
    }
}
Object.assign(YEditor.prototype, RendererProxyMixin.prototype)
Object.assign(YEditor.prototype, DelayOprationsMixin.prototype)
Object.assign(YEditor.prototype, RenderMixin.prototype)
Object.assign(YEditor.prototype, UtilsMixin.prototype)




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
