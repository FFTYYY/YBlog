import { text_prototype , paragraph_prototype , inline_prototype , group_prototype , struct_prototype, support_prototype , } from "./core/elements"
import type { StyledNode , InlineNode , GroupNode , StructNode , SupportNode  } from "./core/elements"
import type { StyleType , NodeType } from "./core/elements"
import { get_node_type , is_styled } from "./core/elements"
import { EditorCore } from "./core/editor_core"
import Card from "@mui/material/Card"
import { Renderer } from "./core/renderer"
import { Editor } from "slate"
import { Node , BaseText , BaseElement} from "slate"
import React from "react"

export { OutRenderer }
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
            return <R attributes={{}} element={element}>{text}</R>
        }

        let name = undefined // 如果name是undefined，则get_renderer会返回默认样式。
        if(is_styled(element)){
            name = element.name
        }
        
        let children = (element as has_children).children
        let R = renderer.get_renderer(type , name)
        return <R 
            attributes={{}}
            element={element}
            children={
                Object.keys(children).map((num) => <ThisFunction
                    element={children[num]} 
                    key={num}
                />)
            }
        />
    }

    render(){
        let me = this
        let R = this._sub_component.bind(this)
        return <R element={me.state.root}></R>
    }
}

interface OutRenderer_Props<NT = Node>{
    attributes: any
    children: any[]
    element: NT
}

interface OutRenderer_State{
    value: Node[]
}

class OutRenderer extends Renderer<OutRenderer_Props>{

    static Component = _OutRendererComponent

    constructor(core: EditorCore){
        super(core)
    }

}

