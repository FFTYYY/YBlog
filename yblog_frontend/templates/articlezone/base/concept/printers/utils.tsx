
import {
    SecondClassConcept , 
    Node , 
    is_textnode , 
    ConceptNode , 
    is_groupnode , 
    is_inlinenode , 
} from "@ftyyy/ytext"

import {
    num2chinese
} from "../../utils"

export { 
    make_oerder_str , 
    idx2node , 
    node2string , 
    cut_str , 
    node2string_autotip , 
}



/** 根据给定的编号和编号格式，生成编号字符串。 */
function make_oerder_str(order: number , ordering: string){
	if(ordering == "head"){
		return num2chinese(order)
	}
	if(ordering == "discuss"){
		if(order > 0 && order <= 20){
			let m = ["①","②","③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮", "⑯", "⑰", "⑱","⑲", "⑳"]
			return m[order-1]
		}
		return `(${order})`
	}
	if(ordering == "title"){
		return `【${num2chinese(order)}】`
	}
	if(ordering == "list-separating"){
		return `[${order}]`
	}
	if(ordering == "list-chaining"){
		return `${order})`
	}
	return ""
}

function idx2node(root: Node, idx: number): ConceptNode | undefined{
    if(root["idx"] == idx){
        return root as ConceptNode
    }
    if(root["children"]){
        for(let x of root["children"]){
            let ret = idx2node(x , idx)
            if(ret){
                return ret
            }
        }
    }
    return undefined
}

/** 这个是一般的节点转字符串函数。这个函数会忠实地只转换叶子text节点。 */
function node2string(node: Node){
    if(is_textnode(node)){
        return node.text
    }
    let ret = (node.children as Node[]).reduce((s: string,x: Node)=>s + node2string(x), "")
    return ret
}

/** 这个是给autotooltip用的node2string。这个节点会给数学节点加上额外内容。 */
function node2string_autotip(node: Node){
    if(is_textnode(node)){
        return node.text
    }
    let ret = (node.children as Node[]).reduce((s: string,x: Node)=>s + node2string_autotip(x), "")
    if(is_groupnode(node) && node.concept == "数学-块"){
        return "$$" + ret + `\\text{${node?.parameters?.suffix?.val}}` + "$$"
    }
    if(is_inlinenode(node) && node.concept == "数学-行内"){
        return "$" + ret + "$"
    }
    return ret
}

function cut_str(str: string, len: number = 2000){
    if(str.length < len){
        return str
    }
    return str.slice(0,len) + "..."
}
