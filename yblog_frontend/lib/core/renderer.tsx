/** 这个模块定义一个渲染器的核心。可以为编辑器和输出器共享。
 * @module
 */
import { text_prototype , paragraph_prototype , inline_prototype , group_prototype , struct_prototype, support_prototype , } from "./elements"
import type { StyledNode , InlineNode , GroupNode , StructNode , SupportNode , } from "./elements"
import type { StyleType , NodeType } from "./elements"
import { get_node_type , is_styled } from "./elements"
import { EditorCore } from "./editor_core"
import Card from "@mui/material/Card"
import {Node} from "slate"

export {Renderer}
export type { Renderer_Props_base , Renderer_Func}

 interface Renderer_Props_base{
    attributes: any
    children: any[]
    element?: Node
    leaf?: Node
}

function default_renderer(props: Renderer_Props_base & any):any{
    return <Card {...props.attributes} sx={{marginLeft: "1%", marginRight: "1%"}}>{props.children}</Card>
}

/** 一个合法的 Renderer 函数。 */
type Renderer_Func<RP = Renderer_Props_base> = (props: RP)=>any

//TODO：这个泛型没有实际上用上
class Renderer<Renderer_Props extends Renderer_Props_base>{
    core: EditorCore
    default_renderers: {[nd in NodeType]: Renderer_Func<Renderer_Props>}
    style_renderers  : {[nd in StyleType]: {[sty: string]: Renderer_Func<Renderer_Props>}}
    
    constructor(core: EditorCore){
        this.core = core

        this.default_renderers = {
            text      : (props: Renderer_Props)=><span {...props.attributes}>{props.children}</span> , 
            inline    : (props: Renderer_Props)=><span {...props.attributes}>{props.children}</span> , 
            paragraph : (props: Renderer_Props)=><div {...props.attributes}>{props.children}</div> , 
            group     : default_renderer , 
            struct    : default_renderer , 
            support   : default_renderer , 
        }
        this.style_renderers = {
            "inline"    : {} , 
            "group"     : {} , 
            "struct"    : {} , 
            "support"   : {} , 
        }
    }


    /** 确定一个渲染器。
     * @param nodetype 
     * 节点类型。如果 stylename 为 undefined 则必须为 text 或 paragraph，否则必须为 inline、group、struct、support 之一。
     * @param stylename 样式名。如果为 undefined 就表示无样式（使用默认渲染器）。
     * @returns 如果 stylename 是 undefined 或者没有找到渲染器，就范围这个节点类型的默认渲染器，否则返回找到的渲染器。
     */
    get_renderer(nodetype: NodeType, stylename: string | undefined = undefined): Renderer_Func<Renderer_Props>{
        if(stylename == undefined){
            return this.default_renderers[nodetype]
        }
        if(nodetype == "text" || nodetype == "paragraph")
            throw new Error(`当 nodetype = ${nodetype}，stylename 不能不为 undefined。（stylename = ${stylename}）`)
        
        // 如果没找到默认 renderer，就返回这个 nodetype 的默认renderer。
        return this.style_renderers[nodetype][stylename] || this.default_renderers[nodetype] 
    }

    /** 更新渲染器。
     * @param renderer 要传入的渲染器。
     * @param nodetype 节点类型。
     * @param stylename 样式名。如果为 undefined 就表示更新默认渲染器。
     */
    update_renderer(renderer: Renderer_Func<Renderer_Props>, nodetype: NodeType, stylename: string | undefined = undefined){
        if(stylename == undefined){
            this.default_renderers[nodetype] = renderer
        }
        if(nodetype == "text" || nodetype == "paragraph")
        throw new Error(`当 nodetype = ${nodetype}，stylename 不能不为 undefined。（stylename = ${stylename}）`)

        this.style_renderers[nodetype][stylename] = renderer
    }
}
