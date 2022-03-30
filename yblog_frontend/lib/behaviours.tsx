/** 这个模块定义所有修改文档的外部行为。 
 * @module
*/
import { is_same_node , node2path } from "./implementation/utils"
import { StyledNode } from "./core/elements"
import { Transforms, Node, Editor } from "slate"
import { YEditor } from "./editor"

export { set_node , replace_nodes , add_nodes , add_nodes_before , move_node , delete_node , add_nodes_after , delete_node_by_path }

function is_root(node: Node){
    return node["operations"] != undefined
}

/** 这个函数修改节点的某个属性。相当于 slate.Transforms.setNodes */
function set_node<T extends Node = StyledNode>(editor: YEditor, node: T, new_val: Partial<T>){
    let root = editor.slate
    if(is_root(node)){
        
        // editor.core.update_root(new_val) // root 是唯一可以直接修改的节点。
        // TODO，直接修改root，不会引起react组件刷新。
        return 
    }

    Transforms.setNodes<T>(editor.slate , new_val , {at: node2path(editor.slate , node)})
}

/** 这个函数删除一个节点。 */
function delete_node(editor: YEditor, node: Node){
    Transforms.removeNodes(editor.slate , {at: node2path(editor.slate , node)})
}

/** 这个函数删除一个节点。 */
function delete_node_by_path(editor: YEditor, path: number[]){
    Transforms.removeNodes(editor.slate , {at: path})
}


function move_node(editor: YEditor , node_from: Node, position_to: number[]){
    Transforms.moveNodes(editor.slate , {
        at: node2path(editor.slate , node_from) , 
        to: position_to , 
    })
}

/** 这个函数插入一个或者系列节点。 */
function add_nodes(editor: YEditor , nodes: (Node[]) | Node, path: number[]){
    Transforms.insertNodes(editor.slate , nodes, {at: path})
}
/** 这个函数在某个节点前面插入一个或者系列节点。 */
function add_nodes_before(editor: YEditor , nodes: (Node[]) | Node, target_node: Node){
    Transforms.insertNodes(editor.slate , nodes, {at: node2path(editor.slate,target_node)})
}

/** 这个函数在某个节点后面插入一个或者系列节点。 */
function add_nodes_after(editor: YEditor , nodes: (Node[]) | Node, target_node: Node){
    let path = node2path(editor.slate,target_node)
    path[path.length-1] ++
    Transforms.insertNodes(editor.slate , nodes, {at: path})
}

/** 这个函数把某个节点的全部子节点替换成给定节点。 */
function replace_nodes(editor: YEditor, father_node: StyledNode, nodes: Node[]){
    let root = editor.slate

    let father_path = node2path(root , father_node)
    if(is_root(father_node))
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