/** 
 * 这个模块提供所有约束。
 * TODO 使用behaviors
 * @module
 */

import { Transforms, Element, Node , Editor } from "slate"
import { 
    get_node_type , 
    paragraph_prototype , 
    group_prototype , 
    text_prototype, 
    inline_prototype ,
    new_struct_child , 
} from "../core/elements"
import type {StructNode , GroupNode , InlineNode} from "../core/elements"
import { is_same_node } from "../implementation/utils"
import { JsxFragment } from "typedoc/dist/lib/utils/jsx.elements"

export { constraint_struct , constraint_relation }

/**
 * 这个插件修复所有和`StructNode`相关的错误。具体来说每个`StructNode`的子节点数必须恰好等于其`num_children`属性。
 * 且其所有子节点都必须是`GroupNode`。
 * @param editor 这个constraint服务的编辑器。
 * @returns editor
 */
 function constraint_struct(editor: Editor): Editor{
    const normalizeNode = editor.normalizeNode

    editor.normalizeNode = (entry:[Node, number[]]) => {
        const [_node , path]: [Node, number[]] = entry

        if(get_node_type(_node) == "struct"){
            let node = _node as StructNode
            if(node.children.length < node.num_children){
                // 在末尾添加一个group节点。
                let newnodes = []
                for(let i = 0;i < node.num_children - node.children.length;i++){
                    newnodes.push(new_struct_child())
                }
                Transforms.insertNodes<GroupNode>(editor , newnodes , {at: [...path,node.children.length]})
                return 
            }
            if(node.children.length > node.num_children){
                // 删除末尾的节点。
                Transforms.removeNodes(editor , {at: [...path,node.children.length-1]})
                return 
            }
            for(let subidx in node.children){
                let subnode = node.children[subidx]
                if( get_node_type(subnode) != "group"){
                    Transforms.removeNodes(editor , {at: [...path,parseInt(subidx)]})
                    return 
                }
            }
        }

        normalizeNode(entry)
    }
    return editor
}


/**
 * 这个插件修复带`relation`属性的节点相关的错误（`GroupNode`和`StructNode`）。
 * 具体来说，任何`relation`为`separating`的节点之前都必须是`paragraph`，而
 * 任何`relation`为`chaining`的`group`之前都必须是一个具有`relation`属性的节点。
 * 如果一个节点本身是兄弟中的第一个，则其`relation`是无所谓的。
 * @param editor 这个constraint服务的编辑器。
 * @returns editor
 */
function constraint_relation(editor: Editor): Editor{
    const normalizeNode = editor.normalizeNode

    let is_relation_type = (node: Node) => {
        return get_node_type(node) == "group" || get_node_type(node) == "struct"
    }

    editor.normalizeNode = (entry:[Node, number[]]) => {
        const [node , path]: [Node, number[]] = entry
        let idx = path.length - 1

        // 豁免`StructNode`的检查。
        if(("children" in node) && get_node_type(node) != "struct"){
            let flag = false // 见到过group或者struct没有
            for(let [subidx, subnode] of node.children.entries()){

                if(!is_relation_type(subnode)) //不是 group ，我们不关心
                    continue
                
                if(!flag){ // 当前是第一个group节点，我们不关心
                    flag = true
                    continue
                }
                flag = true

                let now_node = subnode as ( GroupNode | StructNode )

                if(subidx == 0){ // 第一个元素前面不可能有 GroupNode ，直接返回。
                    return 
                }
                
                let last_node = node.children[subidx - 1]

                // 不允许一个关系是 separating 的 group 节点前面还是 group
                if(is_relation_type(last_node)    && now_node.relation == "separating"){
                    Transforms.insertNodes(editor , paragraph_prototype() , {at: [...path,subidx]})
                    return
                }
                // 不允许一个关系是 chaining 的 group 节点前面不是 group
                if((!is_relation_type(last_node)) && now_node.relation == "chaining"){
                    Transforms.moveNodes(editor , {at: [...path,subidx-1] , to: [...path,subidx]})
                    return
                }
            }
        }
        normalizeNode(entry)
    }
    return editor
}
