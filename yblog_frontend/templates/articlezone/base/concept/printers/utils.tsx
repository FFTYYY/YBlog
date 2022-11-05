import {
    SecondClassConcept , 
    Node , 
    is_textnode , 
    ConceptNode , 
} from "../../../lib"

import {
    num2chinese
} from "../../utils"

export { 
    make_oerder_str , 
    idx2node , 
    node2string , 
    cut_str , 
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

function node2string(node: Node){
    if(is_textnode(node)){
        return node.text
    }
    return (node.children as Node[]).reduce((s: string,x: Node)=>s + node2string(x), "")
}

function cut_str(str: string, len: number = 100){
    if(str.length < len){
        return str
    }
    return str.slice(0,len) + "..."
}
