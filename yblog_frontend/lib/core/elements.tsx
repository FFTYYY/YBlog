/** 这个文件定义所有节点类型
 * @module
 */

import { Node } from "slate"

export {
    text_prototype , 
    paragraph_prototype , 
    inline_prototype , 
    group_prototype , 
    struct_prototype , 
    support_prototype , 

    get_node_type , 
    is_styled , 
}
export type {
    BaseStyledNode as StyledNode, 
    InlineNode , 
    GroupNode , 
    StructNode , 
    SupportNode , 

    StyleType , 
    NodeType , 
}

/** 所有可能的有样式的节点类型。 */
type StyleType = "inline" | "group" | "struct" | "support" 

/** 所有可能的节点类型。 */
type NodeType = "text" | "paragraph" | "inline" | "group" | "struct" | "support" 

/** 所有可能的段组连接方式。 */
type GroupRelationType = "chaining" | "separating"

interface _BaseStyledNode{
    idx: number 
    type: StyleType 
    hiddens: GroupNode[] 
    name: string
    parameters: any
}
type BaseStyledNode = _BaseStyledNode & Node


interface _InlineNode extends _BaseStyledNode{
    children: [Node] // InlineNode只能有一个子节点
}
type InlineNode = _InlineNode & Node

interface _GroupNode extends _BaseStyledNode{
    relation: GroupRelationType
    children: Node[]
}
type GroupNode = _GroupNode & Node

interface _StructNode extends _BaseStyledNode{
    children: Node[]
}
type StructNode = _StructNode & Node


type SupportNode = _BaseStyledNode & Node

/** 这个函数为每个节点生成一个唯一的id */
var nodeid_count = 0
function gene_idx(){
    return nodeid_count ++
}

/** 总之新建一个text node。*/
function text_prototype(text: string = ""): Node{
    return {
        text: text , 
    }
}

/** 总之新建一个段落。 */
function paragraph_prototype(text:string = ""): Node{
    return {
        children: [text_prototype(text)] , 
    }
}

/** 新建一个行内样式。 */
function inline_prototype(name: string, parameter_proto: any): InlineNode{
    return {
        idx: gene_idx() , 
        type: "inline" , 
        name: name , 
        parameters: parameter_proto , 
        children: [ text_prototype("") ] , 
        hiddens: [] , 
    }
}

/** 新建一个组节点。 */
function group_prototype(name: string , parameter_proto: any): GroupNode{
    return {
        idx: gene_idx() , 
        type: "group" , 
        name: name , 

        parameters: parameter_proto , 
        relation: "separating" , 

        children: [paragraph_prototype()] , 
        hiddens: [] , 
    }
}

/** 新建一个结构节点。 */
function struct_prototype(name: string , parameter_proto: any): StructNode{
    return {
        idx: gene_idx() , 
        type: "struct" , 
        name: name , 

        parameters: parameter_proto , 

        children: [] , 
        hiddens: [] , 
    }
}

/** 新建一个辅助节点。 */
function support_prototype(name: string , parameter_proto: any): SupportNode{
    return {
        idx: gene_idx() , 
        type: "support" , 
        name: name , 
        parameters: parameter_proto , 
        children: [ text_prototype() ],
        hiddens: [] , 
    }
}

/** 这个函数给出一个字符串表示一个节点的类型 */
function get_node_type(node: Node): NodeType{

    if(is_styled(node))
        return node.type

    // 如果一个没有style的节点有children，就判断为段落，否则是文本
    let hasChildren = (node:any): node is {children: Node[]} => node["children"] != undefined
    if(hasChildren(node))
        return "paragraph"
    return "text"
}

/** 这个函数判断一个节点是否是样式节点 */
function is_styled(node: Node): node is BaseStyledNode{
    return node["type"] != undefined
}