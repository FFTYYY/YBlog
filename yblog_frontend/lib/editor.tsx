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

import { text_prototype , paragraph_prototype , inline_prototype , group_prototype , struct_prototype, support_prototype , } from "./core/elements"
import type { StyledNodeType , InlineNode , GroupNode , StructNode , SupportNode , StyleType , NodeType } from "./core/elements"
import { get_node_type , is_styled , new_struct_child } from "./core/elements"
import { EditorCore } from "./core/editor_core"
import { withAllYEditorPlugins } from "./plugins/apply_all"
import { Renderer } from "./core/renderer"
import { GlobalInfoProvider , GlobalInfo } from "./globalinfo"
import { add_nodes } from "./behaviours"

export { YEditor }
export type { EditorRenderer_Props , EditorRenderer_Func , EditorMakeNode_Func}


interface YEditorComponent_Props{
    editor: YEditor                 // 目标YEditor对象
    onUpdate?: (newval:any)=>void    // 当节点改变时的回调函数
    onFocusChange?: ()=>void          // 点击或者修改
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onKeyUp?: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onKeyPress?: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

/** Slate 需要的渲染函数的 props 。 */
interface SlateRenderer_Props{
    attributes: any
    children: Node[]

    element?: Node
    leaf?: Node
}

/** 
 * 这个类定义了渲染YEditor的组件
 * 一个YEditor类负责储存数据，而_YEditorComponent类负责渲染组件。
 */
class _YEditorComponent extends React.Component<YEditorComponent_Props>{
    editor: YEditor
    core: EditorCore
    slate: ReactEditor
    onUpdate: (v: any) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onKeyUp: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onFocusChange: ()=>void
    // lazy_update_value: DoSomething

    /**
     * @param props.editor 与这个组件对应的YEditor。
     * @param props.onUpdate 当数据变化时的回调函数。这个函数不需要改变editor的值，因为这个改变会被自动完成。
     */
    constructor(props: YEditorComponent_Props){
        super(props)

        this.state = {
            clipboard: undefined
        }

        this.editor = props.editor
        this.core = this.editor.core
        this.slate = this.editor.slate

        this.onUpdate = props.onUpdate || ( (v) => {} ) // 这个函数用于通知外部自身的改变
        this.onKeyDown = props.onKeyDown || ( (v) => {} ) 
        this.onKeyUp = props.onKeyUp || ( (v) => {} ) 
        this.onKeyPress = props.onKeyPress || ( (v) => {} ) 
        this.onFocusChange = props.onFocusChange || ( () => {} ) // 这个函数用于通知外部自身的改变
    }

    /** 
     * 当 slate 改变 value 时通知自身的函数。
     */
    update_value(value: Node[]){
        this.core.update_children(value)
        this.onUpdate(value)
    }

    /** 渲染函数
     * @param props.element 当前要渲染的节点。
     * @param props.attributes 当前元素的属性，这是slate要求的。
     * @param props.children 下层节点，这是slate要求的。
     * @private
     */
     renderElement(props: SlateRenderer_Props){
        let me = this
        let element = props.element  as BaseElement

        let type = get_node_type(element)
        let name = undefined // 如果name是undefined，则get_renderer会返回默认样式。
        if(is_styled(element)){
            name = element.name
        }
        
        // 取得的子渲染器。
        let R = this.editor.get_renderer(type , name)

        // 需要给 slate 提供的顶层属性。
        let slate_attributes = props.attributes

        // 子渲染器需要的 props 。
        let subprops = {
            element: element ,
            editor: me.editor , 
            children: props.children , 
        }

        // 如果这是个 inline 元素，就添加一个额外 style 。
        let extra_style = {}
        if(me.editor.slate.isInline(element))
            extra_style = {display: "inline-block"}

        return <div {...slate_attributes} style={extra_style}><R {...subprops}/></div>
    }
    renderLeaf(props: SlateRenderer_Props){
        let me = this
        let R = this.editor.get_renderer("text")

        // 需要给 slate 提供的顶层属性。
        let slate_attributes = props.attributes

        // 子渲染器需要的 props 。
        let subprops = {
            element: props.leaf ,
            editor: me.editor , 
            children: props.children , 
        }

        return <span {...slate_attributes}><R {...subprops}></R></span>
    }
    render(){
        // TODO 更好的复制粘贴
        let clipboard = navigator.clipboard
        let me = this
        let slate = me.editor.slate
        let context = {
            editor: me.editor , 
            slate: me.slate , 
            core: me.core , 
        }
        return <GlobalInfoProvider value={context}>
            <Slate 
                editor = {me.slate} 
                value = {[paragraph_prototype("")]} 
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

type EditorMakeNode_Func = (param: any)=>Node
type EditorProxy = {makenode: EditorMakeNode_Func , parameter_interface: any}


/** Editor 的 renderer 可以接受的参数列表。 */
interface EditorRenderer_Props{
    editor: YEditor
    element: Node
    children: any[]
}


/** Editor 的子渲染组件的类型。*/
type EditorRenderer_Func = (props: EditorRenderer_Props) => any

/** 这个组件定义一个编辑器。 */
class YEditor extends Renderer<EditorRenderer_Func>{

    /** `Editor`在用户界面提供的不是真正的`style`，因此需要用`proxy`来转换成真正的`style`。 */
    proxies: Renderer<EditorProxy>

    /** 所有需要『稍后应用』的操作。 */
    suboperations: { [subnode_idx: number]: (fat: YEditor)=>void }

    /** slate 编辑器。 */
    slate: ReactEditor

    static Component = _YEditorComponent
    
    constructor(core: EditorCore){
        super(core , 
            {
                text      : (props: EditorRenderer_Props)=><span>{props.children}</span> , 
                inline    : (props: EditorRenderer_Props)=><span>{props.children}</span> , 
                paragraph : (props: EditorRenderer_Props)=><div>{props.children}</div> , 
                group     : (props: EditorRenderer_Props)=><div>{props.children}</div> , 
                struct    : (props: EditorRenderer_Props)=><div>{props.children}</div> , 
                support   : (props: EditorRenderer_Props)=><div>{props.children}</div> , 
            }
        )

        this.slate  = withAllYEditorPlugins( withHistory( withReact(createEditor() as ReactEditor) ) ) as ReactEditor
        this.suboperations = {}

        this.proxies = new Renderer<EditorProxy>(core , {
            text      : {makenode: ()=>undefined , parameter_interface: {}} , 
            inline    : {makenode: ()=>undefined , parameter_interface: {}} , 
            paragraph : {makenode: ()=>undefined , parameter_interface: {}} , 
            group     : {makenode: ()=>undefined , parameter_interface: {}} , 
            struct    : {makenode: ()=>undefined , parameter_interface: {}} , 
            support   : {makenode: ()=>undefined , parameter_interface: {}} , 
        })
    }

    update_proxy(proxy: EditorProxy, prox_nodetype: StyledNodeType, prox_stylename?: string){
        return this.proxies.update_renderer(proxy, prox_nodetype, prox_stylename)
    }
    get_proxy(prox_nodetype: StyledNodeType, prox_stylename?: string): EditorMakeNode_Func{
        return this.proxies.get_renderer(prox_nodetype, prox_stylename)
    }

    /** 这个函数为编辑器的某个节点添加一个「稍后修改」。大多数情况是一个子编辑器进行的修改，为了防止焦点丢失等问题无法立刻应用。
     * @param idx 应用关涉的节点编号。节点编号相同的操作会被覆盖。
     * @param subapply 等修改时调用的函数。
     */
    add_suboperation(idx: string, subapply: (fat: YEditor)=>void){
        this.suboperations[idx] = subapply
    }

    /** 这个函数应用临时操作。 */
    apply_all(){
        let me = this
        Object.values(this.suboperations).map((subapply)=>{
            subapply(me)
        } )
        this.suboperations = {}
    }
    
    /** 这个函数帮助用户构建按钮。返回一个函数，这个函数表示要新建对应*样式*节点时的行为。
     * @param nodetype 节点类型，必须是有样式节点之一。
     * @param stylename 样式名。
     */
    get_onClick(prox_nodetype: StyledNodeType, prox_stylename: string): ()=>void{
        let me = this
        let root = me.core.root


        /** 创建节点的函数。 */
        let makenode = this.proxies.get_renderer(prox_nodetype , prox_stylename) || ( ()=>undefined )

        if(prox_nodetype == "group" || prox_nodetype == "support" || prox_nodetype == "struct")
        {        
            return () => {
                let node = makenode()
                Transforms.insertNodes(me.slate , node)
            }
        }        
        if(prox_nodetype == "inline"){

            return ()=>{
                let selection = me.slate.selection
                let flag = true
                if(selection != undefined)
                    flag = JSON.stringify(selection.anchor) == JSON.stringify(selection.focus) // 是否没有选择

                let node: InlineNode = makenode()

                if(flag){ // 如果没有选择任何东西，就新建节点。
                    Transforms.insertNodes(me.slate , node)
                }
                else{ // 如果有节点，就把所有子节点打包成一个inline节点。
                    Transforms.wrapNodes<InlineNode>(
                        me.slate , 
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
}

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
