/** 这个模块定义一个渲染器的核心。可以为编辑器和输出器共享。
 * @module
 */
import { text_prototype , paragraph_prototype , inline_prototype , group_prototype , struct_prototype, support_prototype , } from "./elements"
import type { StyledNode , InlineNode , GroupNode , StructNode , SupportNode , } from "./elements"
import type { StyleType , NodeType , StyledNodeType} from "./elements"
import { get_node_type , is_styled } from "./elements"
import { EditorCore } from "./editor_core"
import Card from "@mui/material/Card"
import {Node} from "slate"

export {Renderer}


/** 这个函数定义一个渲染器的基类。主要包括管理渲染组件的名称和类型到具体的渲染组件的映射。 
 * @typeParam SubRenderer 渲染器的成员。
 */
class Renderer<SubRenderer>{
    /** 这个渲染器所服务的编辑器核心。 */
    core: EditorCore

    /** 不同类型节点的默认渲染器。 */
    default_renderers: {[nd in NodeType]: SubRenderer}

    /** 不同类型的带样式节点的默认渲染器。 */
    style_renderers  : {[nd in StyledNodeType]: {[sty: string]: SubRenderer}}
    
    constructor(core: EditorCore , default_renderers: {[nd in NodeType]: SubRenderer}){
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
    get_renderer(nodetype: NodeType, stylename: string | undefined = undefined): SubRenderer{
        if(stylename == undefined){
            return this.default_renderers[nodetype]
        }
        
        // 如果没找到默认 renderer，就返回这个 nodetype 的默认renderer。
        return this.style_renderers[nodetype][stylename] || this.default_renderers[nodetype] 
    }

    /** 更新渲染器。
     * @param renderer 要传入的渲染器。
     * @param nodetype 节点类型。
     * @param stylename 样式名。如果为 undefined 就表示更新默认渲染器。
     */
    update_renderer(renderer: SubRenderer, nodetype: NodeType, stylename: string | undefined = undefined){        
        if(stylename == undefined){
            this.default_renderers[nodetype] = renderer
            return 
        }

        this.style_renderers[nodetype][stylename] = renderer
    }
}
