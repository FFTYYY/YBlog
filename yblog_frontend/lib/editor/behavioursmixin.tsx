/** 这个模块定义所有修改文档的外部行为。 
 * @module
*/
import { is_same_node , node2path } from "../implementation/utils"
import { StyledNode } from "../core/elements"
import { Transforms, Node, Editor } from "slate"
import { YEditor } from "./editor"

export { BehavioursMixin }

let BehavioursMixin = {
    
    /** 这个函数修改节点的某个属性。相当于 slate.Transforms.setNodes */
    set_node<T extends Node = StyledNode>(node: T, new_val: Partial<T>){
        let me = this as any as YEditor
        if(me.is_root(node)){
            me.setState({root: {...me.state.root , ...new_val}})
            return 
        }
    
        Transforms.setNodes<T>(me.get_slate() , new_val , {at: node2path(me.get_slate() , node)})
    } , 

    /** 这个函数删除一个节点。 */
    delete_node(node: Node){
        let me = this as any as YEditor
        Transforms.removeNodes(me.get_slate() , {at: node2path(me.get_slate() , node)})
    } , 

    /** 这个函数删除一个节点。 */
    delete_node_by_path(path: number[]){
        let me = this as any as YEditor
        Transforms.removeNodes(me.get_slate() , {at: path})
    } , 
    
    /** 这个函数把一个节点移动到另一个位置。 */
    move_node(node_from: Node, position_to: number[]){
        let me = this as any as YEditor
        Transforms.moveNodes(me.get_slate() , {
            at: node2path(me.get_slate() , node_from) , 
            to: position_to , 
        })
    } , 

        
    /** 这个函数插入一个或者系列节点。 */
    add_nodes(nodes: (Node[]) | Node, path: number[]){
        let me = this as any as YEditor
        Transforms.insertNodes(me.get_slate() , nodes, {at: path})
    } , 

    /** 这个函数在某个节点前面插入一个或者系列节点。 */
    add_nodes_before(nodes: (Node[]) | Node, target_node: Node){
        let me = this as any as YEditor
        Transforms.insertNodes(me.get_slate() , nodes, {at: node2path(me.get_slate(),target_node)})
    } , 

    /** 这个函数在某个节点后面插入一个或者系列节点。 */
    add_nodes_after(nodes: (Node[]) | Node, target_node: Node){
        let me = this as any as YEditor
        let path = node2path(me.get_slate(),target_node)
        path[path.length-1] ++
        Transforms.insertNodes(me.get_slate() , nodes, {at: path})
    } , 

    /** 这个函数在选中位置插入节点。 */
    add_nodes_here(nodes: (Node[]) | Node){
        let me = this as any as YEditor
        Transforms.insertNodes(me.get_slate() , nodes)
    } , 

    /** 把一个有层次的节点打包成一个节点。 */
    wrap_nodes<T extends Node & {children: Node[]} = StyledNode>(node: T, match: (n:Node)=>boolean){
        let me = this as any as YEditor
        Transforms.wrapNodes<T>(
            me.get_slate() , 
            node , 
            { 
                match: match , 
                split: true , 
            }
        )
    } , 

    /** 这个函数把某个节点的全部子节点替换成给定节点。 */
    replace_nodes(father_node: StyledNode, nodes: Node[]){
        let me = this as any as YEditor

        let root = me.get_slate()

        let father_path = node2path(root , father_node)
        if(me.is_root(father_node))
            father_path = []

        let numc = father_node.children.length

        //把整个father删了
        if(numc > 0){
            Transforms.removeNodes<StyledNode>(me.get_slate(), {
                at: {
                    anchor: {path: [...father_path,0] , offset: 0} , 
                    focus: {path: [...father_path,numc-1] , offset: 0} , 
                }
            })
        }

        // 替换成新节点
        Transforms.insertNodes( me.get_slate() , nodes , {at: [...father_path , 0]} )
    } , 

}
