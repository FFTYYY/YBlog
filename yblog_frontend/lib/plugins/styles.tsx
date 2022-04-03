/** 
 * 这个文件描述和样式有关的插件。
 * @module
 */

import { Transforms, Element, Node , Editor } from "slate"
import { get_node_type , GroupNode , paragraph_prototype , is_styled , StyledNode } from "../core/elements"

import { YEditor } from "../editor"
export { set_inline , set_support }

/** 
 * 这个插件告诉编辑器所有 InlineNode 要作为 inline 样式渲染。
 * @param slate 这个插件服务的编辑器。
 * @returns slate
 */
function set_inline(yeditor: YEditor , slate: Editor): Editor{
    const isInline = slate.isInline

    slate.isInline = (element: Element): boolean => {
        if(is_styled(element)){
            let node = element as StyledNode
            if(node.flags.forceInline)
                return true
            if(node.flags.forceBlock)
                return false
        }
        return isInline(element) || get_node_type(element) == "inline"
    }

    return slate
}
/** 
 * 这个插件告诉编辑器所有 SupportNode 要作为空节点处理。
 */
function set_support(yeditor: YEditor , slate: Editor): Editor{
    const isVoid = slate.isVoid

    slate.isVoid = (element: Element): boolean => {
        if(is_styled(element)){
            let node = element as StyledNode
            if(node.flags.forceVoid)
                return true
        }

        return isVoid(element) || get_node_type(element) == "support"
    }

    return slate
}
