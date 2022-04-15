/** 这个模块定义所有修改文档的外部行为。 
 * @module
*/
import { is_same_node , node2path } from "../implementation/utils"
import { StyledNode , ValidParameter } from "../core/elements"
import { Transforms, Node, Editor , Point } from "slate"
import { YEditor } from "./editor"
import { set_normalize_status } from "../plugins/constraints"
export { BehavioursMixin }

/** 这个混入对象提供所有跟节点树操作有关的函数。
 * 基本上就是`slate`的`Transforms`的代理。
 */
let BehavioursMixin = {
    
    /** 这个函数修改节点的某个属性。相当于`slate.Transforms.setNodes`。 */
    set_node<T extends Node = StyledNode>(node: T, new_val: Partial<T>){
        let me = this as any as YEditor
        if(me.is_root(node)){
            me.setState({root: {...me.state.root , ...new_val}})
            return 
        }
    
        Transforms.setNodes<T>(me.get_slate() , new_val , {at: node2path(me.get_slate() , node)})
    } , 
    /** 这个函数修改节点的某个属性。相当于`slate.Transforms.setNodes`。 */
    set_node_by_path<T extends Node = StyledNode>(path:number[] , new_val: Partial<T>){
        let me = this as any as YEditor
        if(path == []){
            me.setState({root: {...me.state.root , ...new_val}})
            return 
        }
    
        Transforms.setNodes<T>(me.get_slate() , new_val , {at: path})
    } , 

    /** 如果一个节点有代理，这个函数就修改代理，同时修改参数，否则只修改参数。 */
    auto_set_parameter(node: StyledNode, parameters: ValidParameter){
        let me = this as any as YEditor
        if(node.proxy_info && node.proxy_info.proxy_name){ // 这个节点有代理
            
            let new_proxy_params = {...node.proxy_info.proxy_params , ...parameters}
            let new_node = {...node , proxy_info: {...node.proxy_info ,  proxy_params: new_proxy_params}}
            let new_params = me.deproxy(new_node , new_proxy_params)

            // 同时设置参数和代理。
            me.set_node(node , {
                parameters: {...node.parameters , ...new_params} , 
                proxy_info: {
                    ... node.proxy_info , 
                    proxy_params: new_proxy_params , 
                }
            })
        }
        else{ // 只需要设置参数。
            me.set_node(node , {parameters: {...node.parameters , ...parameters} , })
        }
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

    /** 这个组件把节点的子节点提升到顶层。 */
    unwrap_node(node: Node){
        let me = this as any as YEditor
        Transforms.unwrapNodes(me.get_slate() , {at: node2path(me.get_root() , node)})
    } , 

    move_node_by_path(position_from: number[], position_to: number[]){
        let me = this as any as YEditor
        Transforms.moveNodes(me.get_slate() , {
            at: position_from , 
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

    /** 把当前选择的区域打包成一个节点。 
     * @param options.match 判断子节点中哪些要打包的函数。
     * @param options.split 是否允许分裂父节点。
    */
     wrap_selected_nodes<T extends Node & {children: Node[]} = StyledNode>(
        node: T, 
        options:{
            match?: (n:Node)=>boolean , 
            split?: boolean , 
        }
    ){
        let me = this as any as YEditor
        if(options.split){ // 分裂节点有可能造成多个相同`idx`的节点，因此需要开启特殊检查。
            set_normalize_status({pasting: true})
        }
        
        Transforms.wrapNodes<T>(
            me.get_slate() , 
            node , 
            {
                match: options.match , 
                split: options.split , 
            }
        )
    } , 

    /** 把当前选择的区域打包成一个节点。 
     * @param options.match 判断子节点中哪些要打包的函数。
     * @param options.split 是否允许分裂父节点。
    */
    wrap_nodes<T extends Node & {children: Node[]} = StyledNode>(
        node: T, 
        from: Point , 
        to: Point , 
        options:{
            match?: (n:Node)=>boolean , 
            split?: boolean , 
        }
    ){
        let me = this as any as YEditor
        if(options.split){ // 分裂节点有可能造成多个相同`idx`的节点，因此需要开启特殊检查。
            set_normalize_status({pasting: true})
        }
        
        Transforms.wrapNodes<T>(
            me.get_slate() , 
            node , 
            {
                at: {
                    anchor: from , 
                    focus: to , 
                } , 
                match: options.match , 
                split: options.split , 
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
