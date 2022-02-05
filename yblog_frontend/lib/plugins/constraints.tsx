/** 
 * 这个模块提供所有约束。
 * @module
 */

import { Transforms, Element, Node , Editor } from "slate"
import { get_node_type , GroupNode , paragraph_prototype , text_prototype, InlineNode , inline_prototype } from "../core/elements"
import { is_same_node } from "../utils"

export { constraint_group , constraint_inline }

/**
 * 这个插件修复 group relation 相关的错误。具体来说，任何 relation 为 separating 的 group 节点之前都必须是 paragraph，而
 * 任何 relation 为 chaining 的 group 之前都必须是 group。如果一个 group 节点本身是兄弟中的第一个，则无所谓。
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

                if(subidx == 0) //自己是第一个元素
                    continue
                
                let last_node = node.children[subidx - 1]

                if(get_node_type(subnode) != "group") //不是 group ，我们不关心
                    continue
                let now_node = subnode as GroupNode

                // 不允许一个关系是 separating 的 group 节点前面还是 group
                if(get_node_type(last_node) == "group" && now_node.relation == "separating"){
                    Transforms.insertNodes(editor , paragraph_prototype() , {at: [...path,subidx]})
                    return
                }

                // TODO：设置这个条件会导致无法设置 relation 属性（要么在move的时候会被加一个paragraph，要么在修改属性的时候会被改回去...
                // 不允许一个关系是 chaining 的 group 节点前面不是 group
                // if(get_node_type(last_node) != "group" && now_node.relation == "chaining"){
                //     Transforms.setNodes<GroupNode>(editor , {relation: "separating"}, {at: [...path,subidx]})
                //     return
                // }
            }
        }
        normalizeNode(entry)
    }
    return editor
}


/** 
 * 这个插件修复与 inline 节点相关的错误。具体来说， inline 节点有且只有一个子节点，且这个子节点必须是 text 节点。
 * @param editor 这个constraint服务的编辑器。
 * @returns editor
 */
function constraint_inline(editor: Editor):Editor{
    const normalizeNode = editor.normalizeNode

    editor.normalizeNode = (entry:[Node, number[]]) => {
        const [node , path]: [Node, number[]] = entry

        if(get_node_type(node) == "inline"){
            let now_node = node as InlineNode

            // 修复没有子节点的情况
            if(now_node.children.length <= 0){
                Transforms.insertNodes(editor , text_prototype() , {at: [...path , 0]})
                return
            }

            // 修复有若干子节点的情况
            if(now_node.children.length > 1){
                // 删除原来的节点。
                Transforms.removeNodes(editor , {at: path})
                // 在原位置插入一个节点
                Transforms.insertNodes<InlineNode>(
                    editor , 
                    { ...now_node , children: [ text_prototype(Node.string(now_node)) ] } , 
                    { at: path }
                )
                return
            }

            //修复子节点不是text的情况
            if(get_node_type(now_node.children[0]) != "text"){
                // 删除原来的节点。
                Transforms.removeNodes(editor , {at: path})
                // 在原位置插入一个节点
                Transforms.insertNodes<InlineNode>(
                    editor , 
                    { ...now_node , children: [ text_prototype(Node.string(now_node)) ] } , 
                    { at: path }
                )
                return
            }
        }
        normalizeNode(entry)
    }

    return editor
}