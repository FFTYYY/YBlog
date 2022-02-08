/** 这个模块定义所有修改文档的外部行为。 
 * @module
*/
import { non_selectable_prop , is_same_node , node2path } from "./utils"
import { StyledNode } from "./core/elements"
import { Transforms, Node, Editor } from "slate"
import { YEditor } from "./editor_interface"

export { set_node , replace_nodes , add_nodes , add_nodes_before , move_node , delete_node }

/** 这个函数修改节点的某个属性。相当于 slate.Transforms.setNodes */
function set_node<T extends Node = StyledNode>(editor: YEditor, node: T, new_val: Partial<T>){
    let root = editor.core.root
    if(is_same_node(node,root)){
        
        editor.core.update_root(new_val) // root 是唯一可以直接修改的节点。
        // TODO，直接修改root，不会引起react组件刷新。
        return 
    }

    Transforms.setNodes<T>(editor.slate , new_val , {at: node2path(editor.slate , node)})
}

/** 这个函数删除一个节点。 */
function delete_node(editor: YEditor, node: Node){
    Transforms.removeNodes(editor.slate , {at: node2path(editor.core.root , node)})
}

function move_node(editor: YEditor , node_from: Node, position_to: number[]){
    Transforms.moveNodes(editor.slate , {
        at: node2path(editor.core.root , node_from) , 
        to: position_to , 
    })
}

/** 这个函数插入一个或者系列节点。 */
function add_nodes(editor: YEditor , nodes: (Node[]) | Node, path: number[]){
    Transforms.insertNodes(editor.slate , nodes, {at: path})
}
/** 这个函数在某个节点前面插入一个或者系列节点。 */
function add_nodes_before(editor: YEditor , nodes: (Node[]) | Node, target_node: Node){
    Transforms.insertNodes(editor.slate , nodes, {at: node2path(editor.core.root,target_node)})
}

/** 这个函数把某个节点的全部子节点替换成给定节点。 */
function replace_nodes(editor: YEditor, father_node: StyledNode, nodes: Node[]){
    let root = editor.core.root

    let father_path = node2path(root , father_node)
    if(root.idx == father_node.idx)
        father_path = []
    let numc = father_node.children.length

    //把整个father删了
    if(numc > 0){
        Transforms.removeNodes<StyledNode>(editor.slate, {
            at: {
                anchor: {path: [...father_path,0] , offset: 0} , 
                focus: {path: [...father_path,numc-1] , offset: 0} , 
            }
        })
    }

    // 替换成新节点
    Transforms.insertNodes( editor.slate , nodes , {at: [...father_path , 0]} )
}