/** 这个组件提供输出器的基础定义。 */

import { Node } from "slate"
import React from "react"
import { text_prototype , paragraph_prototype , inline_prototype , group_prototype , struct_prototype, support_prototype , } from "./core/elements"
import type { StyledNode , InlineNode , GroupNode , StructNode , SupportNode  } from "./core/elements"
import type { StyleType , NodeType } from "./core/elements"
import { get_node_type , is_styled } from "./core/elements"
import { EditorCore } from "./core/editor_core"
import { Renderer } from "./core/renderer"
import { GlobalInfo , GlobalInfoProvider } from "./globalinfo"

export { Printer , make_print_renderer }
export type { 
    PrinterComponent_Props , 
    PrinterRenderFunc_Props , 
    EnterEffectFunc , 
    ExitEffectFunc , 
    PrinterRenderer , 
    PrinterContext , 
    PrinterEnv , 
}

type PrinterContext = any
type PrinterEnv = any

interface PrinterComponent_Props{
    printer: Printer
}

interface PrinterComponent_State{
    root: GroupNode
}


type EnterEffectFunc = (element: Node, env: PrinterEnv)                           => [PrinterEnv , PrinterContext]
type ExitEffectFunc  = (element: Node, env: PrinterEnv, context: PrinterContext)  => [PrinterEnv , PrinterContext]


/** 这个类是 Printer 的组件类。*/
class _PrinterComponent extends React.Component<PrinterComponent_Props , PrinterComponent_State>{

    /** 使用的输出器。 */
    printer: Printer

    /** 编辑器核心。 */
    core: EditorCore

    /** 渲染出来的节点的引用。从路径映射到节点。 */
    my_refs: {[key: string]: any}

    /**
     * 
     * @param props.printer 这个组件对应的输出器。
     */
    constructor(props: PrinterComponent_Props){
        super(props)

        this.state = {
            root: group_prototype("root" , {})
        }

        this.printer = props.printer
        this.core = this.printer.core
        
        let me = this
        this.core.add_notificatioon( (new_root: GroupNode)=>me.setState({root: new_root}) )
        this.setState({root: this.core.root})
        
        this.my_refs = {}
    }

    /** 这个函数可以被主动调用，令编辑器滚动到指定元素。
     * @param path_id path数组字符串化以后的值（JSON.stringify(path)）。注意 path_id 只到inline节点的上一层。
     */
    scroll_to(path_id: string){
        // TODO 如果是新建一行，调用这个函数的时候这行还没创建好，因此会返回undefined。（不过好像问题也不大就是了...）
        if(this.my_refs[path_id] == undefined || this.my_refs[path_id].current == undefined){
            return 
        }
        this.my_refs[path_id].current.scrollIntoView({
            behavior: "smooth" , 
            block: "center"
        })
    }


    /** 递归地渲染节点。 
     * @param props.element 当前渲染的节点。
     * @param props.contexts 全体节点的上下文。
     * @param props.now_path 当前节点的路径。 
    */
    _sub_component(props: {element: Node , contexts: {[idx: number]: PrinterContext}, now_path: number[]}){
        let element = props.element
        let me = this
        let ThisFunction = this._sub_component.bind(this)
        let printer = this.printer
        let contexts = props.contexts
        let path_id = JSON.stringify(props.now_path) // 用路径表示的节点id。和node.idx不一样，这是视图相关的节点名。
        
        type has_children = Node & {children: Node[]}
        type has_text = Node & {text: string}

        let type = get_node_type(element)
        if(type == "text"){
            let R = printer.get_renderer("text")

            let text:any = (element as has_text).text
            return <React.Fragment>
                <span style={{display: "hidden"}} ref={me.my_refs[path_id]}/>
                <R.render_func element={element} context={{}}>{text}</R.render_func>
            </React.Fragment>
        }
        let children = (element as has_children).children

        let name = undefined // 如果name是undefined，则get_renderer会返回默认样式。
        let styled = is_styled(element)
        if(styled){
            name = (element as StyledNode).name
        }
        
        let R = printer.get_renderer(type , name)
        return <React.Fragment>
            <span style={{display: "hidden"}} ref={me.my_refs[path_id]}/>
            <R.render_func element={ element } context={contexts[path_id] } >{
                Object.keys(children).map((subidx) => <ThisFunction
                    key      = {subidx}
                    element  = {children[subidx]} 
                    contexts = {contexts}
                    now_path = {[...props.now_path , parseInt(subidx)]}
                />)
            }</R.render_func>
        </React.Fragment>
    }

    /** 这个函数在实际渲染组件之前，获得每个组件的环境。 
     * @param props._node 当前节点。
     * @param props.now_env 当前环境。
     * @param props.now_path 从根到当前节点的路径。
    */
    build_envs(_node: Node, now_env: PrinterEnv, contexts: PrinterContext, now_path: number[]){
        let path_id = JSON.stringify(now_path) // 用路径表示的节点id。和node.idx不一样，这是视图相关的节点名。
        this.my_refs[path_id] = React.createRef() // 初始化 refs

        if(!("children" in _node)){
            return [ now_env , contexts ]            
        }


        let node = _node as Node & {children: Node[]}
        let type = get_node_type(node)
        let name: string | undefined = undefined
        if(is_styled(node)){
            name = node.name
        }
        
        let printer = this.printer
        let R = printer.get_renderer(type , name)

        // 获得进入时的活动结果。
        let [_env , _context] = R.enter_effect(node , now_env)
        now_env = _env // 更新当前环境。

        // 递归地进入子节点。
        for(let subidx in node.children){
            [now_env , contexts] = this.build_envs(node.children[subidx] , now_env , contexts, [...now_path , parseInt(subidx)])
        }

        // 获得退出时的结果。
        let [new_env , new_context] = R.exit_effect(node , now_env , _context)
        
        // 注意，这里用路径作为上下文的键，因为段落节点没有 idx 。
        contexts[path_id] = new_context // 更新此节点的上下文。

        return [new_env , contexts]
    }

    render(){
        let me = this
        let R = this._sub_component.bind(this)

        me.my_refs = {}
        let [_ , contexts] = this.build_envs(me.state.root , {} , {} , [])

        let context = {
            "refs": me.my_refs , 
            "root": me.state.root , 
            "core": me.core , 
            "printer": me.printer , 
            "printer_component": me , 
        }

        return <GlobalInfoProvider value={context}>
            <R element={me.state.root} contexts={contexts} now_path={[]}></R>
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

class Printer extends Renderer<PrinterRenderer>{

    static Component = _PrinterComponent

    constructor(core: EditorCore){
        super(core , 
            {
                text      : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
                inline    : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
                paragraph : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
                group     : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
                struct    : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
                support   : make_print_renderer((props: PrinterRenderFunc_Props)=><span>{props.children}</span>) , 
            }
        )
    }

}

