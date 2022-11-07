/** 这个模块定义editor的组件。
 * @module
 */
import React from "react"
import * as Slate from "slate"
import * as SlateReact from "slate-react"
import { withHistory } from "slate-history"
import produce from "immer"

import {
    Node , 
    GroupNode , 
    InlineNode , 
    StructNode ,
    AbstractNode , 
    SupportNode , 
    ParagraphNode , 
    TextNode , 
    Printer, 
    ParameterList,
    ConceptNode, 
    AllNodeTypes, 
    NonLeafNode, 

    GlobalInfoProvider, 
    AllConceptTypes, 
    ProcessedParameterList, 
} from "../core"

import {
    EditorRenderer , 
    EditorRendererProps , 
} from "./editor_renderer"

import {
    slate_is_concept , 
    slate_is_paragraph , 
    slate_is_same_concept_node , 
    slate_is_text , 
    slate_get_node_type, 
    DoSomething, 
} from "./utils"

import {
    EditorPlugin , 
    with_ytext_plugins , 
    set_normalize_status , 
} from "./plugins"

import {
    tree_op_mixin
} from "./treeopmixin"
import { UnexpectedParametersError } from "../exceptions"

export {
    EditorComponent , 
    EditorCore , 
}
export type {
    EditorComponentProps , 
    EditorRendererDict , 
    EditorDefaultRendererhDict , 
}

/** 用来保存概念的编辑器渲染。 */
interface EditorRendererDict{
    "group"     : {[name: string] : EditorRenderer<GroupNode>} , 
    "inline"    : {[name: string] : EditorRenderer<InlineNode>} , 
    "support"   : {[name: string] : EditorRenderer<SupportNode>} , 
    "structure" : {[name: string] : EditorRenderer<StructNode>} , 
    "abstract"  : {[name: string] : EditorRenderer<AbstractNode>} , 
}

/** 编辑器的默认渲染。 */
interface EditorDefaultRendererhDict{
    "group"     : EditorRenderer<GroupNode> , 
    "inline"    : EditorRenderer<InlineNode> , 
    "support"   : EditorRenderer<SupportNode> , 
    "structure" : EditorRenderer<StructNode> , 
    "abstract"  : EditorRenderer<AbstractNode> , 
    "paragraph" : EditorRenderer<ParagraphNode> , 
    "text"      : EditorRenderer<TextNode> , 
}

/** 编辑器核心。
 * 要创建一个编辑器，需要对每个一级概念指定一个渲染器。
 */
class EditorCore{
    renderers: EditorRendererDict 
    default_renderers: EditorDefaultRendererhDict 
    printer: Printer

    constructor(params: {
        renderers: EditorRendererDict , 
        default_renderers: EditorDefaultRendererhDict, 
        printer: Printer , 
    }){
        this.renderers = params.renderers 
        this.default_renderers = params.default_renderers 
        this.printer = params.printer 
    }

    get_sec_concept_list(type: AllConceptTypes){
        return Object.keys( this.get_printer().secondClassConcepts[type] )
    }

    get_fst_concept_list(type: AllConceptTypes){
        return Object.keys( this.get_printer().firstClassConcepts[type] )
    }

    get_printer(){
        return this.printer
    }

    gene_idx(){
        return Math.floor( Math.random() * 233333333)
    }

    /** 从一级概念查询一个渲染器。
     * @param type 查找的节点类型。
     * @param fst_concept 查找的概念名称。
     * 如果`type == "paragraph" || "text"`，那么`name`将会被忽略。
     * 反之，如果`type != "paragraph" && type != "text"`，那么`name`必须提供。
     */
    get_first_renderer(type: AllNodeTypes , fst_concept?: string): EditorRenderer{
        if(type != "paragraph" && type != "text"){// 概念节点。
            if(fst_concept == undefined)
                return this.default_renderers[type]

            let ret = this.renderers[type][fst_concept]
            if(ret == undefined){ // 如果没有找到这个概念的渲染器，就返回一个这个概念类型的默认渲染器。
                ret = this.default_renderers[type]
            }
            return ret
        }

        return this.default_renderers[type] // 在不是概念节点的情况下，直接返回默认渲染器。
    }
    /** 从二级概念查询一个渲染器。
     * @param type 查找的节点类型。
     * @param sec_concept 查找的概念名称。
     * 如果`type == "paragraph" || "text"`，那么`name`将会被忽略。
     * 反之，如果`type != "paragraph" && type != "text"`，那么`name`必须提供。
     */

    get_second_renderer(type: AllNodeTypes , sec_concept?: string): EditorRenderer{
        if(type == "paragraph" || type == "text"){
            return this.get_first_renderer(type, sec_concept)
        }
        let sec_ccpt = this.get_printer().get_second_concept(type, sec_concept)
        if(sec_ccpt == undefined){
            return this.default_renderers[type]
        }
        let first_concept_name = sec_ccpt.first_concept
        let fst_ccpt = this.get_printer().get_first_concept(type, first_concept_name)
        if(fst_ccpt == undefined){
            return this.default_renderers[type]
        }
        return this.get_first_renderer(type, fst_ccpt.name)
    }

    /** 这个函数直接从一个节点查询渲染器。 */
    get_node_renderer(node: Slate.Node & Node): EditorRenderer{
        let me = this
        if(slate_is_text(node)){ // 如果是文本节点，直接按类型查询。
            return me.get_first_renderer("text")
        }
        else if(slate_is_paragraph(node)){ // 如果是段落节点，直接按类型查询。
            return me.get_first_renderer("paragraph")
        }
        let concept = me.printer.get_node_first_concept(node)
        let concept_name = concept ? concept.name : undefined
        return me.get_first_renderer(node.type , concept_name) // 如果是概念节点，按类型和一级概念名查询。
    }

    /** 新建一个文本节点。 */
    create_text(text: string = ""): TextNode{
        return {
            text: text
        }
    }

    /** 新建一个段落节点。 */
    create_paragraph(text: string = ""): ParagraphNode{
        let me = this
        return {
            children: [this.create_text(text)]
        }
    }

    /** 新建一个组节点。 */
    create_group(name: string, relation: "separating" | "chaining" = "separating"): GroupNode{
        let me = this
        let sec_concept = this.printer.get_second_concept("group" , name)
        let parameters = sec_concept == undefined ? {} : {...sec_concept.default_override}

        return {
            type: "group" , 
            idx: this.gene_idx() , 
            concept: name , 
            parameters: parameters , 
            relation: relation , 
            children: [me.create_paragraph("")] , 
            abstract: [] , 
        }
    }

    /** 新建一个行内节点。 */
    create_inline(name: string, text: string = ""): InlineNode{
        let me = this
        let sec_concept = this.printer.get_second_concept("inline" , name)
        let parameters = sec_concept == undefined ? {} : {...sec_concept.default_override}

        return {
            type: "inline" , 
            idx: this.gene_idx() , 
            concept: name , 
            parameters: parameters , 
            children: [me.create_text(text)] , 
            abstract: [] , 
        }
    }

    /** 新建一个支撑节点。 */
    create_support(name: string): SupportNode{
        let me = this
        let sec_concept = this.printer.get_second_concept("support" , name)
        let parameters = sec_concept == undefined ? {} : {...sec_concept.default_override}

        return {
            type: "support" , 
            idx: this.gene_idx() , 
            concept: name , 
            parameters: parameters , 
            children: [{text: ""}] , 
            abstract: [] , 
        }
    }

    /** 新建一个结构节点。 */
    create_structure(name: string, relation: "separating" | "chaining" = "separating"): StructNode{
        let me = this
        let sec_concept = this.printer.get_second_concept("structure" , name)
        let parameters = sec_concept == undefined ? {} : {...sec_concept.default_override}

        return {
            type: "structure" , 
            idx: this.gene_idx() , 
            concept: name , 
            parameters: parameters , 
            children: [this.create_group("support-child", "chaining")] , 
            abstract: [] , 
            relation: relation , 
        }
    }

    /** 新建一个抽象节点。 */
    create_abstract(name: string): AbstractNode{
        let me = this
        let sec_concept = this.printer.get_second_concept("abstract" , name)
        let parameters = sec_concept == undefined ? {} : {...sec_concept.default_override}

        return {
            type: "abstract" , 
            idx: this.gene_idx() , 
            concept: name , 
            parameters: parameters , 
            children: [me.create_paragraph("")] , 
            abstract: [] , 
        }
    }

    get_meta_param(node: Slate.Element & ConceptNode){
        let concpt = this.printer.get_node_first_concept(node)
        return concpt && concpt.meta_parameters
    }
    
}


type TreeOpeationsMixins = {
    set_node            : <NT extends Slate.Node & ConceptNode>                         (node: NT, new_val: Partial<NT>         ) => void
    set_node_by_path    : <NT extends Slate.Node & ConceptNode>                         (path:number[] , new_val: Partial<NT>   ) => void
    auto_set_parameter  : <NT extends Slate.Node & ConceptNode>                         (node: NT, parameters: ParameterList    ) => void
    delete_concept_node : <NT extends Slate.Node & ConceptNode>                         (node: NT                               ) => void
    delete_node_by_path : <NT extends Slate.Node              >                         (path: number[]                         ) => void
    delete_nodes_by_paths:<NT extends Slate.Node              >                         (paths: number[][]                      ) => void
    move_concept_node   : <NT extends Slate.Node & ConceptNode>                         (node_from: NT, posto: number[]         ) => void
    unwrap_node         : <NT extends Slate.Node & ConceptNode>                         (node: NT                               ) => void
    move_node_by_path   : <NT extends Slate.Node              >                         (posf: number[], posto: number[]        ) => void
    add_nodes           : <NT extends Slate.Node              >                         (nodes: (NT[]) | NT, path: number[]     ) => void
    add_nodes_before    : <NT extends Slate.Node, TT extends Slate.Node & ConceptNode>  (nodes: (NT[]) | NT, target_node: TT    ) => void
    add_nodes_after     : <NT extends Slate.Node, TT extends Slate.Node & ConceptNode>  (nodes: (NT[]) | NT, target_node: TT    ) => void
    add_nodes_here      : <NT extends Slate.Node              >                         (nodes: (NT[]) | NT                     ) => void
    replace_nodes       : <NT extends Slate.Node & ConceptNode, ST extends Slate.Node>  (father_node: NT, nodes: ST[]           ) => void
    wrap_selected_nodes : <NT extends Slate.BaseElement       >                         (node: NT, options:{
                                                                                            match?: (n:NT)=>boolean , 
                                                                                            split?: boolean , 
                                                                                        }) => void
    wrap_nodes          : <NT extends Slate.BaseElement       >                         (node: NT, from: Slate.Point, to: Slate.Point, 
                                                                                        options:{
                                                                                            match?: (n:NT)=>boolean , 
                                                                                            split?: boolean , 
                                                                                        }) => void
}

interface EditorComponentProps{
    editorcore: EditorCore 

    plugin?: EditorPlugin

    init_rootchildren?: (SlateReact.ReactEditor & AbstractNode)["children"] 

    init_rootproperty?: Omit<AbstractNode , "children">

    /** 节点树更新时的回调。 */
    onUpdate?: (v: any) => void

    /** 按键按下的回调。 */
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void

    /** 按键弹起的回调。 */
    onKeyUp?: (e: React.KeyboardEvent<HTMLDivElement>) => void

    /** 按键按下弹起的回调。 */
    onKeyPress?: (e: React.KeyboardEvent<HTMLDivElement>) => void

    /** 改变光标位置的回调。 */
    onFocusChange?: ()=>void
    
}
interface EditorComponent extends TreeOpeationsMixins{

    /** 节点树更新时的回调。 */
    onUpdate: (v: any) => void

    /** 按键按下的回调。 */
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void

    /** 按键弹起的回调。 */
    onKeyUp: (e: React.KeyboardEvent<HTMLDivElement>) => void

    /** 按键按下弹起的回调。 */
    onKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => void

    /** 改变光标位置的回调。 */
    onFocusChange: ()=>void
}

/**
 * 因为slate实际上是编辑`root`的`children`，所以`root`的property要单独处理。
 */
class EditorComponent extends React.Component<EditorComponentProps , {
    slate: SlateReact.ReactEditor
    root_property: Omit<AbstractNode , "children">
    root_children: (SlateReact.ReactEditor & AbstractNode)["children"]
}>{
    
    update_debounce: DoSomething<Slate.Node[]>
    constructor(props:EditorComponentProps){
        super(props)

        this.onUpdate       = props.onUpdate        || (()=>{})
        this.onKeyDown      = props.onKeyDown       || (()=>{})
        this.onKeyUp        = props.onKeyUp         || (()=>{})
        this.onKeyPress     = props.onKeyPress      || (()=>{})
        this.onFocusChange  = props.onFocusChange   || (()=>{})
        this.use_tree_op_mixin()
        
        let me = this
        
        let with_outer_plugin = props.plugin || ((x,y)=>y)
        
        let default_root = this.get_core().create_abstract("root") as AbstractNode
        let [default_root_children, default_root_but_children] = (()=>{
            let {children, ..._} = default_root
            return [children, _] // 把默认根节点拆成儿子和非儿子的部分。
        })()
        
        this.state = {
            slate: with_outer_plugin(me , 
                with_ytext_plugins(me , 
                    withHistory(
                        SlateReact.withReact(
                            Slate.createEditor() as SlateReact.ReactEditor
                        ) 
                    )
                )
            ), 
            root_children: props.init_rootchildren || default_root_children , 
            root_property: props.init_rootproperty || default_root_but_children , 
        }

        this.update_debounce = new DoSomething((val)=>{this.update_value(val)} , 500)
    }

    get_core(){
        return this.props.editorcore
    }

    /** 将`root_children`和`root_property`组合成一棵树。 */
    get_root(): Readonly<AbstractNode>{
        return {
            ...this.state.root_property ,
            children: this.state.root_children , 
        }
    }

    set_root_children(root_children: (SlateReact.ReactEditor & AbstractNode)["children"]){
        this.setState({root_children: root_children})
    }

    set_root(root_property: Omit<Partial<AbstractNode>, "children">){
        this.setState({root_property: {...this.state.root_property , ...root_property}})
    }

    get_editorcore(){
        return this.get_core()
    }

    get_slate(){
        return this.state.slate
    }

    use_tree_op_mixin(){
        let me = this
        this.set_node               = (node, new_val        ) => tree_op_mixin.set_node             (me , node, new_val)
        this.set_node_by_path       = (path , new_val       ) => tree_op_mixin.set_node_by_path     (me,path, new_val)
        this.auto_set_parameter     = (node, parameters     ) => tree_op_mixin.auto_set_parameter   (me,node, parameters)
        this.delete_concept_node    = (node                 ) => tree_op_mixin.delete_concept_node  (me,node)
        this.delete_node_by_path    = (path                 ) => tree_op_mixin.delete_node_by_path  (me,path)
        this.move_concept_node      = (node_from, posto     ) => tree_op_mixin.move_concept_node    (me,node_from, posto)
        this.unwrap_node            = (node                 ) => tree_op_mixin.unwrap_node          (me,node)
        this.move_node_by_path      = (posfr, posto         ) => tree_op_mixin.move_node_by_path    (me,posfr, posto)
        this.add_nodes              = (nodes, path          ) => tree_op_mixin.add_nodes            (me,nodes, path)
        this.add_nodes_before       = (nodes, target_node   ) => tree_op_mixin.add_nodes_before     (me,nodes,target_node )
        this.add_nodes_after        = (nodes, target_node   ) => tree_op_mixin.add_nodes_after      (me,nodes, target_node)
        this.add_nodes_here         = (nodes                ) => tree_op_mixin.add_nodes_here       (me,nodes)
        this.wrap_selected_nodes    = (node, options        ) => tree_op_mixin.wrap_selected_nodes  (me,node, options)
        this.wrap_nodes             = (node,fr,to,options   ) => tree_op_mixin.wrap_nodes           (me,node, fr, to, options)
        this.replace_nodes          = (father_node, nodes   ) => tree_op_mixin.replace_nodes        (me,father_node, nodes)  
        this.delete_nodes_by_paths  = (paths                ) => tree_op_mixin.delete_nodes_by_paths(me, paths)
    }

    /** 
     * 当 slate 改变 value 时通知自身的函数。
    */
    update_value(value: Slate.Node[]){
        this.setState({
            root_children: value as (SlateReact.ReactEditor & AbstractNode)["children"]
        })
        this.onUpdate(value)
    }

    /** 渲染函数
     * @param props.element 当前要渲染的节点。
     * @param props.attributes 当前元素的属性，这是slate要求的。
     * @param props.children 下层节点，这是slate要求的。
     * @private
     */
    renderElement(props: SlateReact.RenderElementProps){
        let me = this
        let node = props.element as Slate.Element & NonLeafNode
                
        // 取得的子渲染器。
        let R = me.get_core().get_node_renderer(node)

        // 需要给 slate 提供的顶层属性。
        let slate_attributes = props.attributes

        // 子渲染器需要的 props 。
        let subprops = {
            editor: me , 
            node: node ,
            children: props.children , 
        }
        
        // 如果这是个 inline 元素，就添加一个额外 style 。
        let isinline = false
        if(slate_is_concept(node)){
            let meta_param = this.get_core().get_meta_param(node)
            if(meta_param && meta_param.force_inline){
                isinline = true
            }
            if(node.type == "inline"){
                isinline = true
            }
        }

        if(isinline){
            return <span {...slate_attributes}><R {...subprops}/></span>
        }
        return <div {...slate_attributes}><R {...subprops}/></div>
    }

    renderLeaf(props: SlateReact.RenderLeafProps){
        let me = this

        let R = me.get_core().get_first_renderer("text")

        // 需要给 slate 提供的顶层属性。
        let slate_attributes = props.attributes

        // 子渲染器需要的 props 。
        let subprops = {
            editor: me  , 
            node: props.leaf ,
            children: props.children , 
        }
        return <span {...slate_attributes}><R {...subprops}></R></span>
    }

    render(){    
        let me = this

        let slate = me.state.slate
    
        let context = {
            editor: me , 
            slate: me.state.slate , 
            core: me.get_core() , 
        }
        
        let root_children = this.state.root_children

        return <GlobalInfoProvider value={context}>
            <SlateReact.Slate 
                editor = {slate} 
                value = {root_children} 
                onChange = {value => {
                    if(JSON.stringify(value) == JSON.stringify(this.state.root_children)){
                        // 实际上没有改变，就不更新了。
                        return
                    }
                    me.update_debounce.go(value)
                    me.onFocusChange()
                }}
            >
                <SlateReact.Editable
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
    
                    onKeyDown   = {e=>me.onKeyDown(e)}
                    onKeyUp     = {e=>me.onKeyUp(e)}
                    onKeyPress  = {e=>me.onKeyPress(e)}
                />
            </SlateReact.Slate>
        </GlobalInfoProvider>
    }

    /** 在当前位置新建一个指定概念的节点。 */
    new_concept_node(type: Exclude<AllConceptTypes,"abstract">, sec_ccpt: string){
        let me = this

        if(type == "support"){
            let node = me.get_editorcore().create_support(sec_ccpt)
            me.add_nodes_here(node) // 在当前选中位置插入节点。
            return 
        }
        if(type == "structure"){        
            let node = me.get_editorcore().create_structure(sec_ccpt)
            me.add_nodes_here(node) // 在当前选中位置插入节点。
            return 
        }
        if(type == "group"){
            let selection = me.get_slate().selection
            let flag = true
            if (selection != undefined)
                flag = JSON.stringify(selection.anchor) == JSON.stringify(selection.focus) // 是否没有选择
            
            let node = me.get_editorcore().create_group(sec_ccpt)
            if(flag){ // 没有选东西，直接添加节点
                me.add_nodes_here(node) // 在当前选中位置插入节点。
            }
            else{ // 选了东西，打包节点。
                me.wrap_selected_nodes(node , {split: false})
            }
            return 
        }
        if(type == "inline"){
            let selection = me.get_slate().selection
            let flag = true // 是否没有选择任何东西
            if(selection != undefined)
                flag = JSON.stringify(selection.anchor) == JSON.stringify(selection.focus) // 是否没有选择

            let node = me.get_editorcore().create_inline(sec_ccpt , "")

            if(flag){ // 如果没有选择任何东西，就新建节点。
                me.add_nodes_here(node) // 在当前选中位置插入节点。
            }
            else{ // 如果有节点，就把所有子节点打包成一个inline节点。
                me.wrap_selected_nodes(node  , {split: true}) // 还是应该允许inline节点嵌套的...
            }
            return 
        }

        throw new UnexpectedParametersError("这这不能")
    }
}

