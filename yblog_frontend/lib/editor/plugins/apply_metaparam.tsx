/** 
 * 这个模块描述和元参数以及概念类型有关的操作，需要slate把一些特定节点做特别处理s。
 * @module
 */

import * as Slate from "slate"
import * as SlateReact from "slate-react"

import { MetaParameters } from "../../core"
import { EditorComponent } from "../main"
import {
    slate_is_concept , 
} from "../utils"

export { set_inline , set_support }

/** 
 * 这个插件告诉编辑器所有 InlineNode 要作为 inline 样式渲染。
 * @param slate 这个插件服务的编辑器。
 * @returns slate
 */
function set_inline(editor: EditorComponent , slate: SlateReact.ReactEditor): SlateReact.ReactEditor{
    const isInline = slate.isInline // 保留原本的isinline判断函数。

    slate.isInline = (element: Slate.Element): boolean => {
        if(slate_is_concept(element)){
            let meta_params: MetaParameters = {}    
        
            let fir_ccpt = editor.get_core().get_printer().get_node_first_concept(element) // 获得节点的一级概念
            if(fir_ccpt){
                meta_params = fir_ccpt.meta_parameters
            }
            if(meta_params.force_inline || element.type == "inline")
                return true
            if(meta_params.force_block)
                return false
        }
        return isInline(element)
    }

    return slate
}
/** 
 * 这个插件告诉编辑器所有 SupportNode 要作为空节点处理。
 */
function set_support(editor: EditorComponent , slate: SlateReact.ReactEditor): SlateReact.ReactEditor{
    const isVoid = slate.isVoid

    slate.isVoid = (element: Slate.Element): boolean => {
        if(slate_is_concept(element)){
            let meta_params: MetaParameters = {}    
        
            let fir_ccpt = editor.get_core().get_printer().get_node_first_concept(element) // 获得节点的一级概念
            if(fir_ccpt){
                meta_params = fir_ccpt.meta_parameters
            }
            if(meta_params.force_void || element.type == "support"){
                return true
            }
        }

        return isVoid(element)
    }

    return slate
}
