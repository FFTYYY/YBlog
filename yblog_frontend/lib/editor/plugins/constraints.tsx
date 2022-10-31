/** 
 * 这个模块提供所有约束。
 * @module
 */

import * as Slate from "slate"
import * as SlateReact from "slate-react"
 
import {
    slate_is_concept , 
    slate_is_paragraph , 
    slate_is_text , 

    EditorComponent , 
} from ".."

import {
    StructNode , 
    GroupNode , 
    InlineNode , 
    Node , 
    TextNode, 
} from "../../core"

import {
    set_normalize_status , 
    get_normalize_status
} from "./base"

export {
    constraint_paste , 
    constraint_relation , 
    constraint_abstract , 
}


/** 这个插件要求所有节点的`idx`互不相同。
 * 为了效率，只在复制粘贴时开启检查（因为只有粘贴可能导致此问题）。
 */
function constraint_paste(editor: EditorComponent , slate: SlateReact.ReactEditor): SlateReact.ReactEditor{
    const normalizeNode = slate.normalizeNode

    slate.normalizeNode = (entry:[Node, number[]]) => {
        
        if(!get_normalize_status("pasting")){ // 如果没有在粘贴，就直接退出。
            normalizeNode(entry)
            return 
        }

        let idxs = {}
        for(let [node,path] of Slate.Node.descendants(slate)){
            if(!slate_is_concept(node)){
                continue
            }
            if(idxs[node.idx]){
                editor.set_node(node , {idx: editor.get_core().gene_idx()}) // 为当前节点重新生成编号。
                return 
            }
            idxs[node.idx] = true
        }

        //如果检查了所有地方，都没有问题，就认为粘贴结束。
        set_normalize_status({pasting: false} )

        normalizeNode(entry)
    }
    return slate
}


/**
 * 这个插件修复带`relation`属性的节点相关的错误（`GroupNode`和`StructNode`）。
 * 具体来说，任何`relation`为`separating`的节点之前都必须是`paragraph`，而
 * 任何`relation`为`chaining`的`group`之前都必须是一个具有`relation`属性的节点。
 * 如果一个节点本身是兄弟中的第一个，则其`relation`是无所谓的。
 * @param slate 这个constraint服务的编辑器。
 * @returns slate
 */
function constraint_relation(editor: EditorComponent , slate: SlateReact.ReactEditor): SlateReact.ReactEditor{
    const normalizeNode = slate.normalizeNode

    let is_relation_type = (node: Slate.Node): node is GroupNode | StructNode => {
        return slate_is_concept(node) && (node.type == "group" || node.type == "structure")
    }

    slate.normalizeNode = (entry:[Node, number[]]) => {
        const [node , path]: [Node, number[]] = entry

        if(get_normalize_status("initializing")){
            normalizeNode(entry)
            return 
        }
        
        // 检查所有概念节点的子节点，但是豁免StructNode，因为他的子节点的组节点不用以paragraph开头
        // 也豁免InlineNode，因为他的子节点一定不是组节点
        // 注意，根节点的子节点也要检查。
        if( (slate_is_concept(node) && node.type != "structure" && node.type != "inline") || (Slate.Editor.isEditor(node))){ 
            let flag = false // 见到过group或者struct没有
            for(let [subidx, subnode] of node.children.entries()){

                if(!is_relation_type(subnode)) //不是group或者struct，我们不关心
                    continue
                
                if(!flag){ // 当前是第一个group节点，我们不关心
                    flag = true
                    continue
                }
                flag = true

                if(subidx == 0){ // 第一个元素前面不可能有 GroupNode ，直接返回。
                    continue 
                }
                
                let last_node = node.children[subidx - 1] // 前一个节点。

                // 不允许一个关系是 separating 的节点前面还是 group 或者 struct。
                if(is_relation_type(last_node) && subnode.relation == "separating"){
                    editor.add_nodes(editor.get_core().create_paragraph() , [...path,subidx])
                    return
                }

                // 不允许一个关系是 chaining 的节点前面不是 group 或者 struct。
                if((!is_relation_type(last_node)) && subnode.relation == "chaining"){
                    editor.move_node_by_path([...path,subidx-1] , [...path,subidx]) // 将当前节点向前移动。
                    return
                }
            }
        }
        normalizeNode(entry)
    }
    return slate
}

/**
 * 这个插件修复抽象节点不是抽象节点的错误。
 * @param slate 这个constraint服务的编辑器。
 * @returns slate
 */
 function constraint_abstract(editor: EditorComponent , slate: SlateReact.ReactEditor): SlateReact.ReactEditor{
    const normalizeNode = slate.normalizeNode

    slate.normalizeNode = (entry:[Node, number[]]) => {
        const [node , path]: [Node, number[]] = entry

        if(get_normalize_status("initializing")){
            normalizeNode(entry)
            return 
        }
        
        if(slate_is_concept(node)){
            for(let [absidx, absnode] of node.abstract.entries()){
                if(!slate_is_concept(absnode, "abstract")){
                    editor.set_node_by_path(path, {
                        abstract: [...node.abstract.slice(0,absidx), ...node.abstract.slice(absidx+1)]
                    })
                    return 
                }
            }
        }
        normalizeNode(entry)
    }
    return slate
}
