/** 这个模块定义一个渲染器的核心。可以为编辑器和输出器共享。
 * @module
 */
import { text_prototype , paragraph_prototype , inline_prototype , group_prototype , struct_prototype, support_prototype , } from "./elements"
import type { StyledNode , InlineNode , GroupNode , StructNode , SupportNode , } from "./elements"
import type { StyleType , NodeType , StyledNodeType} from "./elements"
import { get_node_type , is_styled } from "./elements"
import { EditorCore } from "./core"
import Card from "@mui/material/Card"
import {Node} from "slate"

export {StyleCollector}


/** 这个函数定义一个将样式映射到某个值的对象。 
 * @typeParam VAL 值的类型。
 */
class StyleCollector<VAL>{

    /** 这个渲染器所服务的编辑器核心。 */
    core: EditorCore

    /** 每种节点类型默认的值。 */
    default_vals: {[nd in NodeType]?: VAL}

    /** 对于带样式的节点类型，储存的值。 */
    styled_vals  : {[nd in StyledNodeType]: {[sty: string]: VAL}}
    
    constructor(core: EditorCore , default_vals: {[nd in NodeType]?: VAL} = {}){
        this.core = core

        this.default_vals = default_vals
        this.styled_vals = {
            "inline"    : {} , 
            "group"     : {} , 
            "struct"    : {} , 
            "support"   : {} , 
        }
    }

    /** 询问一个样式对应的值。
     * @param nodetype 
     * 节点类型。如果 stylename 为 undefined 则必须为 text 或 paragraph，否则必须为 inline、group、struct、support 之一。
     * @param stylename 样式名。如果为 undefined 就表示无样式（使用默认渲染器）。
     * @returns 如果 stylename 是 undefined 或者没有找到渲染器，就范围这个节点类型的默认渲染器，否则返回找到的渲染器。
     */
    get(nodetype: NodeType, stylename: string | undefined = undefined): VAL{
        if(stylename == undefined){
            return this.default_vals[nodetype]
        }
        
        // 如果没找到默认 renderer，就返回这个 nodetype 的默认renderer。
        return this.styled_vals[nodetype][stylename] || this.default_vals[nodetype] 
    }

    /** 更新一个样式对应的值。
     * @param val 要修改的值。
     * @param nodetype 节点类型。
     * @param stylename 样式名。如果为 undefined 就表示更新默认渲染器。
     */
    set(val: VAL, nodetype: NodeType, stylename: string | undefined = undefined){        
        if(stylename == undefined){
            this.default_vals[nodetype] = val
            return 
        }

        this.styled_vals[nodetype][stylename] = val
    }
}
