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

export {Renderer , default_renderer}


/** 这个组件定义一个通用的默认渲染器。 */
function default_renderer(props: {attributes: any , children: any}):any{
    return <Card {...props.attributes} sx={{marginLeft: "1%", marginRight: "1%"}}>{props.children}</Card>
}

/** 这个函数定义一个渲染器的基类。主要包括管理渲染组件的名称和类型到具体的渲染组件的映射。 */
class Renderer<RendererImplementation>{
    core: EditorCore
    default_renderers: {[nd in NodeType]: RendererImplementation}
    style_renderers  : {[nd in StyleType]: {[sty: string]: RendererImplementation}}
    
    constructor(core: EditorCore , default_renderers: {[nd in NodeType]: RendererImplementation}){
        this.core = core

        this.default_renderers = default_renderers
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
    get_renderer(nodetype: NodeType, stylename: string | undefined = undefined): RendererImplementation{
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
    update_renderer(renderer: RendererImplementation, nodetype: NodeType, stylename: string | undefined = undefined){
        if(stylename == undefined){
            this.default_renderers[nodetype] = renderer
        }
        if(nodetype == "text" || nodetype == "paragraph")
        throw new Error(`当 nodetype = ${nodetype}，stylename 不能不为 undefined。（stylename = ${stylename}）`)

        this.style_renderers[nodetype][stylename] = renderer
    }
}
