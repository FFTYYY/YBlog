import { Node } from "slate"
import React from "react"
import { text_prototype , paragraph_prototype , inline_prototype , group_prototype , struct_prototype, support_prototype , } from "./core/elements"
import type { StyledNode , InlineNode , GroupNode , StructNode , SupportNode  } from "./core/elements"
import type { StyleType , NodeType } from "./core/elements"
import { get_node_type , is_styled } from "./core/elements"
import { EditorCore } from "./core/editor_core"
import { Renderer , default_renderer } from "./core/renderer"

export { OutRenderer , make_out_renderer}
export type { OutRenderer_Props }

interface OutRendererComponent_Props{
    renderer: OutRenderer
}

interface OutRendererComponent_State{
    root: GroupNode
}


/** 这个类是 OutRenderer 的组件类。*/
class _OutRendererComponent extends React.Component<OutRendererComponent_Props , OutRendererComponent_State>{
    renderer: OutRenderer
    core: EditorCore
    env_enters: { [idx: number]: any }
    env_exits : { [idx: number]: any }

    /**
     * 
     * @param props.renderer 这个组件对应的渲染器。
     */
    constructor(props: OutRendererComponent_Props){
        super(props)

        this.state = {
            root: group_prototype("root" , {})
        }

        this.renderer = props.renderer
        this.core = this.renderer.core
        
        this.core.add_notificatioon( this.root_notification.bind(this) )
        this.setState({root: this.core.root})

        this.env_enters = {}
        this.env_exits  = {}
    }

    /** core 通知自身改变的方法。 */
    root_notification(new_root: GroupNode){
        this.setState({root: new_root})
    }

    /** 递归地渲染节点。 */
    _sub_component(props: {element: Node}){
        let element = props.element
        let me = this
        let ThisFunction = this._sub_component.bind(this)
        let renderer = this.renderer
        
        type has_children = Node & {children: Node[]}
        type has_text = Node & {text: string}

        let type = get_node_type(element)
        if(type == "text"){
            let R = renderer.get_renderer("text")
            let text:any = (element as has_text).text
            if(text == "")
                text = <br />
            return <R.renderer_func attributes={{}} element={element} env_enter={{}} env_exit={{}}>{text}</R.renderer_func>
        }

        let name = undefined // 如果name是undefined，则get_renderer会返回默认样式。
        let styled = is_styled(element)
        if(styled){
            name = (element as StyledNode).name
        }
        
        let children = (element as has_children).children
        let R = renderer.get_renderer(type , name)
        return <R.renderer_func
            attributes={{}}
            element={element}
            children={
                Object.keys(children).map((num) => <ThisFunction
                    element = {children[num]} 
                    key = {num}
                />)
            }
            env_enter={ styled ? me.env_enters[(element as StyledNode).idx] : {} }        
            env_exit ={ styled ? me.env_exits [(element as StyledNode).idx] : {} }        
        />
    }

    /** 这个函数在实际渲染组件之前，获得每个组件的环境。 */
    build_envs(_node: Node, now_env: any = {}){
        if(!is_styled(_node)){
            if("children" in _node){
                for(let c of _node.children){
                    now_env = this.build_envs(c , now_env)
                }
            }
            return now_env
        }

        let node = _node as StyledNode
        
        let renderer = this.renderer
        let R = renderer.get_renderer(node.type , node.name)

        // TODO 换成深复制。
        now_env = R.pre_effect_enter(node , {...now_env})
        this.env_enters[node.idx] = now_env

        for(let c of node.children){
            now_env = this.build_envs(c , now_env)
        }
        now_env = R.pre_effect_exit(node , {...now_env})
        this.env_exits[node.idx] = now_env

        return now_env
    }

    render(){
        let me = this
        let R = this._sub_component.bind(this)

        this.env_enters = {} // 初始化环境
        this.env_exits  = {} // 初始化环境
        this.build_envs(me.state.root)

        return <R element={me.state.root}></R>
    }
}

function make_out_renderer(
    renderer_func: (props: OutRenderer_Props) => any, 
    pre_effect_enter?: (element: Node, env: any) => any , 
    pre_effect_exit?: (element: Node, env: any) => any , 
): RendererImp{
    pre_effect_enter = pre_effect_enter || ((element: Node, env: any)=>env)
    pre_effect_exit  = pre_effect_exit || ((element: Node, env: any)=>env)
    return {
        renderer_func: renderer_func , 
        pre_effect_enter: pre_effect_enter , 
        pre_effect_exit: pre_effect_exit , 
    }
}

interface OutRenderer_Props<NT = Node>{
    attributes: any
    children: any[]
    element: NT
    env_enter: any
    env_exit: any
}


/** 输出渲染器的渲染器实例。
 * 注意，在所有 pre_effect 方法中，允许直接修改 env 的成员，但不允许修改 env 的成员的成员。
 */
interface RendererImp{
    renderer_func: (props: OutRenderer_Props) => any
    
    /** 这个函数在进入节点时，提供一个环境。 */
    pre_effect_enter: (element: Node, env: any) => any

    /** 这个节点在退出节点时，提供一个环境。 */
    pre_effect_exit: (element: Node, env: any) => any
}



class OutRenderer extends Renderer<RendererImp>{

    static Component = _OutRendererComponent

    constructor(core: EditorCore){
        super(core , 
            {
                text      : make_out_renderer( (props: OutRenderer_Props)=><span {...props.attributes}>{props.children}</span>) , 
                inline    : make_out_renderer( (props: OutRenderer_Props)=><span {...props.attributes}>{props.children}</span>) , 
                paragraph : make_out_renderer( (props: OutRenderer_Props)=><div {...props.attributes}>{props.children}</div>) , 
                group     : make_out_renderer( default_renderer) , 
                struct    : make_out_renderer( default_renderer) , 
                support   : make_out_renderer( default_renderer) , 
            }
        )
    }

}

