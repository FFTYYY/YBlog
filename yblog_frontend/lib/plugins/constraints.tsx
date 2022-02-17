/** 
 * 这个模块提供所有约束。
 * @module
 */

import { Transforms, Element, Node , Editor } from "slate"
import { get_node_type , GroupNode , paragraph_prototype , text_prototype, InlineNode , inline_prototype } from "../core/elements"
import { is_same_node } from "../utils"

export { constraint_group }

/**
 * 这个插件修复 group relation 相关的错误。具体来说，任何 relation 为 separating 的 group 节点之前都必须是 paragraph，而
 * 任何 relation 为 chaining 的 group 之前都必须是 group。
 * 如果一个 group 节点本身是兄弟中的第一个，则其 relation 是无所谓的。
 * @param editor 这个constraint服务的编辑器。
 * @returns editor
 */
function constraint_group(editor: Editor): Editor{
    const normalizeNode = editor.normalizeNode

    editor.normalizeNode = (entry:[Node, number[]]) => {
        const [node , path]: [Node, number[]] = entry
        let idx = path.length - 1

        if("children" in node){
            for(let [subidx, subnode] of node.children.entries()){

                if(get_node_type(subnode) != "group") //不是 group ，我们不关心
                    continue
                let now_node = subnode as GroupNode

                if(subidx == 0){ // 第一个元素前面不可能有 GroupNode ，直接返回。
                    return 
                }
                
                let last_node = node.children[subidx - 1]

                // 不允许一个关系是 separating 的 group 节点前面还是 group
                if(get_node_type(last_node) == "group" && now_node.relation == "separating"){
                    Transforms.insertNodes(editor , paragraph_prototype() , {at: [...path,subidx]})
                    return
                }
            }
        }
        normalizeNode(entry)
    }
    return editor
}
