/** 这个组件提供输出器的基础定义。 
 * 输出器接受一个节点树，并输出一个渲染好的页面。
*/

import { Node } from "slate"
import React, { ContextType } from "react"
import { text_prototype , paragraph_prototype , inline_prototype , group_prototype , struct_prototype, support_prototype , } from "./core/elements"
import type { StyledNode , InlineNode , GroupNode , StructNode , SupportNode  } from "./core/elements"
import type { StyleType , NodeType } from "./core/elements"
import { get_node_type , is_styled } from "./core/elements"
import { EditorCore } from "./core/core"
import { StyleCollector } from "./core/stylecollector"
import { GlobalInfo , GlobalInfoProvider } from "./globalinfo"
import { DoSomething } from "./implementation/utils"

export { YPrinter , make_print_renderer , default_printer_renderers }
export type { 
    PrinterRenderFunc_Props , 
    EnterEffectFunc , 
    ExitEffectFunc , 
    PrinterRenderer , 
    PrinterContext , 
    PrinterEnv , 
}


type PrinterContext = any
type PrinterEnv = any

type EnterEffectFunc = (element: Node, env: PrinterEnv)                           => [PrinterEnv , PrinterContext]
type ExitEffectFunc  = (element: Node, env: PrinterEnv, context: PrinterContext)  => [PrinterEnv , PrinterContext]


/** 输出器组件。
 * 输出器会维护一系列渲染器，并使用对应的渲染器递归地渲染节点树。
 * 
 * 输出器给每个节点维护两套查找方式，一个是按标号（`idx`）查找，这个用来唯一地识别某个节点，另一个是按路径（`pathid`）查找，这个
 * 用来识别一些和路径相关的信息（比如自动滚动）。
*/
class YPrinter extends React.Component<{
    renderers: StyleCollector<PrinterRenderer>
    core: EditorCore
} , {
    /** 经过解析的根节点。 */
    root: GroupNode

    /** 当前上下文 */
    contexts: PrinterContext
}>{

    renderers: StyleCollector<PrinterRenderer>

    /** 编辑器核心。 */
    core: EditorCore

    /** 渲染出来的节点的引用。从路径映射到节点。 */
    sub_refs: {[key: string]: any}

    // TODELETE 这个没用的
    /** 用来记录自己在`core`处的`notification`。 */
    notification_key: number
    
    /**
     * 
     * @param props.printer 这个组件对应的输出器。
     */
    constructor(props){
        super(props)

        this.state = {
            root: group_prototype("root" , {}) , 
            contexts: {} , 
        }

        this.renderers = props.renderers
        this.core = props.core
        
        this.sub_refs = {}
    }

    /** 更新输出器的节点树信息。 
     * 注意输出器并不会从全局状态获取树信息，而是在特定操作下才更新。
     * 这样设计是因为实时刷新太慢了（尤其是数学公式很多的情况下，mathjax要人命...）。
     * 
     * @param fake 如果为`true`，则不更新状态，而是直接返回更新之后的值。
    */
    update(root: GroupNode , init_env = {} , fake = false){
        this.sub_refs = {}
        let [end_env , contexts] = this.build_envs(root , init_env , {} , [])
        if(fake){
            return [root , contexts , end_env]
        }
        this.setState({
            root: root , 
            contexts: contexts , 
        })
        return end_env
    }

    /** 根据路径生成节点的唯一的表示。
     */
    get_path_id(path: (number | string)[]): string{
        return JSON.stringify(path.map(x=>Number(x)))
    }

    /** 根据路径获得某个节点的`ref`。 
     * @param path 路径。
     * @param binding 是否是因为要绑定`ref`而调用此函数的。
    */
    get_ref(path: (number | string)[] , binding = false){
        let ref = this.sub_refs[this.get_path_id(path)]
        if(!binding){
            // 如果不是正在绑定`ref`，那么可以模糊地返回值。
            if(ref == undefined || ref.current == undefined)
                return undefined
        }
        return ref
    }

    /** 根据路径设置某个节点的`ref`。
     * 这个函数的唯一作用是初始化`ref`。
    */
    set_ref(path: (number | string)[] , val: any){
        this.sub_refs[this.get_path_id(path)] = val
        return path
    }
    

    /** 这个函数可以被主动调用，令编辑器滚动到指定元素。
     * @param path path数组。
     */
    scroll_to(path: number[]){

        let ref = this.get_ref(path)
        if(ref == undefined || ref.current == undefined){
            return 
        }
        ref.current.scrollIntoView({
            behavior: "smooth" , 
            block: "center"
        })
    }

    /** 这个函数在实际渲染组件之前，获得每个组件的环境。 
     * @param props._node 当前节点。
     * @param props.now_env 当前环境。
     * @param props.now_path 从根到当前节点的路径。
    */
    build_envs(_node: Node, now_env: PrinterEnv, contexts: PrinterContext, now_path: (number | string)[]){
        let path = now_path // 用路径表示的节点id。和node.idx不一样，这是视图相关的节点名。
        this.set_ref(path , React.createRef()) // 初始化 refs

        if(!("children" in _node)){
            return [ now_env , contexts ]            
        }

        let node = _node as Node & {children: Node[]}
        let type = get_node_type(node)
        let name: string | undefined = undefined
        if(is_styled(node)){
            name = node.name
        }
        
        let renderers = this.renderers
        let R = renderers.get(type , name)

        // 获得进入时的活动结果。
        let [_env , _context] = R.enter_effect(node , now_env)
        now_env = _env // 更新当前环境。

        // 递归地进入子节点。
        for(let subidx in node.children){
            [now_env , contexts] = this.build_envs(node.children[subidx] , now_env , contexts, [...now_path , subidx])
        }

        // 获得退出时的结果。
        let [new_env , new_context] = R.exit_effect(node , now_env , _context)
        
        // 注意，这里用路径作为上下文的键，因为段落节点没有 idx 。
        contexts[this.get_path_id(path)] = new_context // 更新此节点的上下文。

        return [new_env , contexts]
    }


    /** 递归地渲染节点。 
     * @param props.element 当前渲染的节点。
     * @param props.contexts 全体节点的上下文。
     * @param props.now_path 当前节点的路径。 
    */
    _sub_component(props: {element: Node , contexts: {[idx: number]: PrinterContext}, now_path: (number | string)[]}){
        let element = props.element
        let me = this
        let ThisFunction = this._sub_component.bind(this)
        let renderers = this.renderers
        let contexts = props.contexts
        let path = props.now_path // 用路径表示的节点id。和node.idx不一样，这是视图相关的节点名。
        
        type has_children = Node & {children: Node[]}
        type has_text = Node & {text: string}

        let type = get_node_type(element)
        if(type == "text"){
            let R = renderers.get("text")
            let anchor = <span style={{display: "hidden"}} ref={me.get_ref(path , true)}/>
            let text:any = (element as has_text).text
            return <React.Fragment>
                {anchor}
                <R.render_func element={element} context={{anchor: anchor}}>{text}</R.render_func>
            </React.Fragment>
        }
        let children = (element as has_children).children

        let name = undefined // 如果name是undefined，则get_renderer会返回默认样式。]
        let idx = undefined
        let styled = is_styled(element)
        let anchor = <span style={{display: "hidden"}} ref={me.get_ref(path , true)} />
        if(styled){
            name = (element as StyledNode).name
            idx = (element as StyledNode).idx
            anchor = <span style={{display: "hidden"}} ref={me.get_ref(path , true)} id={`yconcept-${idx}`}/>
        }
        
        let R = renderers.get(type , name)
        // XXX 注意 anchor 会储存到context中，这是一个不好的设计。
        return <React.Fragment>
            { anchor }
            <R.render_func element={ element } context={{ anchor: anchor , ...contexts[this.get_path_id(path)] }} >{
                Object.keys(children).map((subidx) => <ThisFunction
                    key      = {subidx}
                    element  = {children[subidx]} 
                    contexts = {contexts}
                    now_path = {[...path , subidx]}
                />)
            }</R.render_func>
        </React.Fragment>
    }

    render(){
        let me = this
        let R = this._sub_component.bind(this)
        
        let context = {
            "refs": me.sub_refs , 
            "root": me.state.root , 
            "core": me.core , 
            "renderers": me.renderers , 
            "contexts": me.state.contexts , 
            "printer": me , 
        }

        return <GlobalInfoProvider value={context}>
            <div className="mathjax_process">
                <R element={me.state.root} contexts={this.state.contexts} now_path={[]}></R>
            </div>
        </GlobalInfoProvider>
    }
}

interface PrinterRenderFunc_Props{
    children: any
    element: Node
    context: PrinterContext
}

/** 一个输出渲染器的渲染器类。
 * 每个渲染器应该包括三个部分：渲染函数和两个前作用函数。
 * 前作用函数用来执行必要的带副作用的操作
 * 在渲染之前，会首先进行前作用生成环境，然后在渲染时可以调用生成的环境。
 * 所有前作用函数以深度优先的形式调用，在进入一个节点时，调用 enter_effect ， 退出一个节点时，调用 exit_effect 。
 * 环境是全局共享的，建议把节点的私人属性用节点 id 区分开来。
 */
interface PrinterRenderer{
    render_func: (props: PrinterRenderFunc_Props) => any
    enter_effect: EnterEffectFunc
    exit_effect: ExitEffectFunc
}

/** 这个函数帮助快速生成没有前作用器的渲染器。 */
function make_print_renderer(
    render_func: (props: PrinterRenderFunc_Props) => any , 
    enter_effect: EnterEffectFunc = (e,v)=>[v,{}] , 
    exit_effect: ExitEffectFunc = (e,v,c)=>[v,c] , 
){
    return {
        render_func: render_func , 
        enter_effect: enter_effect , 
        exit_effect: exit_effect , 
    }
}

/** 默认的渲染器列表。这个变量可以在创建`YPrinters`时作为`renderers`的默认值。 */
let default_printer_renderers = {
    text      : make_print_renderer((props: PrinterRenderFunc_Props)=><>{props.children}</>) , 
    inline    : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
    paragraph : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
    group     : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
    struct    : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
    support   : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
}

/*
class Printer extends StyleCollector<PrinterRenderer>{

    static Component = _PrinterComponent

    constructor(core: EditorCore){
        super(core , 
            {
                text      : make_print_renderer((props: PrinterRenderFunc_Props)=><>{props.children}</>) , 
                inline    : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
                paragraph : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
                group     : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
                struct    : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
                support   : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
            }
        )
    }
}
*/
