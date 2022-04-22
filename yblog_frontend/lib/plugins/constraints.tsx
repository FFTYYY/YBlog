/** 
 * 这个模块提供所有约束。
 * TODO 使用behaviors
 * @module
 */

import { Element, Node , Editor } from "slate"
import { 
    get_node_type , 
    paragraph_prototype , 
    group_prototype , 
    text_prototype, 
    inline_prototype ,
    new_struct_child , 
    is_styled , 
    gene_idx , 
} from "../core/elements"
import type {StructNode , GroupNode , InlineNode} from "../core/elements"
import { YEditor } from "../editor"
import { is_same_node } from "../implementation/utils"
import { JsxFragment } from "typedoc/dist/lib/utils/jsx.elements"
import { editor } from "@ftyyy/ytext/dist/lib"

export { constraint_struct , constraint_relation , set_normalize_status , get_normalize_status , constraint_paste , constraint_group_start_with_blank }

/** 某些检查只在特定状态下生效。 */
var status = {

    /** 当前是否在初始化文档。 */
    initializing: false , 

    /** 当前是否在粘贴对象。 */
    pasting: false , 

}

function set_normalize_status(val){
    status = {...status , ...val}
}
function get_normalize_status(key){
    return status[key]
}

/** 这个插件强迫GroupNode以空白开头，这是为了让InjectEffector正常工作。 */
function constraint_group_start_with_blank(yeditor: YEditor, slate: Editor): Editor{
    const normalizeNode = slate.normalizeNode
    slate.normalizeNode = (entry: [Node, number[]]) => {
        let [_node , path] = entry

        if(get_normalize_status("initializing")){
            normalizeNode(entry)
            return 
        }

        if(is_styled(_node) && _node.type == "group"){
            let node = _node as GroupNode
            if(node.children.length == 0){
                yeditor.add_nodes( paragraph_prototype() , [...path , 0] )
                return 
            }

            // TODO
        }

        normalizeNode(entry)
    }
    return slate
}



/** 这个插件要求所有节点的`idx`互不相同。
 * 为了效率，只在复制粘贴时开启检查（因为只有粘贴可能导致此问题）。
 */
function constraint_paste(yeditor: YEditor , slate: Editor): Editor{
    const normalizeNode = slate.normalizeNode

    slate.normalizeNode = (entry:[Node, number[]]) => {

        if(!get_normalize_status("pasting")){ // 如果没有在粘贴，就直接退出。
            normalizeNode(entry)
            return 
        }

        let idxs = {}
        for(let [node,path] of Node.descendants(slate)){
            if(!is_styled(node)){
                continue
            }
            if(idxs[node.idx]){
                yeditor.set_node(node , {idx: gene_idx()}) // 为当前节点重新生成编号。
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
 * 这个插件修复所有和`StructNode`相关的错误。具体来说每个`StructNode`的子节点数必须恰好等于其`num_children`属性。
 * 且其所有子节点都必须是`GroupNode`。
 * @param editor 这个constraint服务的编辑器。
 * @returns editor
 */
 function constraint_struct(yeditor: YEditor , slate: Editor): Editor{
    const normalizeNode = slate.normalizeNode

    slate.normalizeNode = (entry:[Node, number[]]) => {
        const [_node , path]: [Node, number[]] = entry

        if(get_node_type(_node) == "struct"){
            let node = _node as StructNode
            if(node.children.length < node.num_children){
                // 在末尾添加一个group节点。
                let newnodes = []
                for(let i = 0;i < node.num_children - node.children.length;i++){
                    newnodes.push(new_struct_child())
                }
                yeditor.add_nodes(newnodes , [...path,node.children.length])
                return 
            }
            if(node.children.length > node.num_children){
                // 删除末尾的节点。
                yeditor.delete_node_by_path([...path,node.children.length-1])
                return 
            }
            for(let subidx in node.children){
                let subnode = node.children[subidx]
                if( get_node_type(subnode) != "group"){
                    yeditor.delete_node_by_path([...path,parseInt(subidx)])
                    return 
                }
            }
        }

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
function constraint_relation(yeditor: YEditor , slate: Editor): Editor{
    const normalizeNode = slate.normalizeNode

    let is_relation_type = (node: Node) => {
        return get_node_type(node) == "group" || get_node_type(node) == "struct"
    }

    slate.normalizeNode = (entry:[Node, number[]]) => {
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
                    yeditor.add_nodes(paragraph_prototype() , [...path,subidx])
                    return
                }
                // 不允许一个关系是 chaining 的 group 节点前面不是 group
                if((!is_relation_type(last_node)) && now_node.relation == "chaining"){
                    yeditor.move_node_by_path([...path,subidx-1] , [...path,subidx])
                    return
                }
            }
        }
        normalizeNode(entry)
    }
    return slate
}
