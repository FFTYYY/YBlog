/** 这个模块验证一棵树是不是合法的中间表示树。
 * @module
 */

import {
	TextNode , 
	ParagraphNode , 
} from "./intermidiate"

export {validate_parameters , validate}

function make_msg(path: number[], msg: string){
    return `node ${JSON.stringify(path)}: ${msg}`
}

/** 这个函数验证一棵树的参数列表是否合法。
 * @param parameters 要验证的参数列表。
 * @param gene_msg 如果不合法，如何生成错误信息。
 */
function validate_parameters(parameters: any, gene_msg: (s:string)=>string): [boolean , string]{
    if(typeof(parameters) != "object"){
        return [false , gene_msg(`parameters should be object, but it is ${typeof(parameters)}.`)]
    }
    for(let x in parameters){
        let item = parameters[x]
        
        if(["string" , "number" , "boolean" , "function"].indexOf(item["type"]) < 0){
            return [false , gene_msg(`type of ${x} is ${x["type"]}, which is not standard.`)]
        }

        if(item["type"] == "string" && typeof item["val"] != "string"){
            return [false , gene_msg(`the value of ${x} does not match its type, which is string.`)]
        }
        if(item["type"] == "number" && typeof item["val"] != "number"){
            return [false , gene_msg(`the value of ${x} does not match its type, which is number.`)]
        }
        if(item["type"] == "boolean" && typeof item["val"] != "boolean"){
            return [false , gene_msg(`the value of ${x} does not match its type, which is boolean.`)]
        }
        if(item["type"] == "function" && typeof item["val"] != "string"){ // XXX 需要进一步检查function吗？
            return [false , gene_msg(`the value of ${x} does not match its type, which is function.`)]
        }
    }
    return [true , ""]
}

function is_textnode(node: any): node is TextNode{
    return typeof(node["text"]) == "string"
}

/** 判断一个节点是不是段落。这里只看他是否有子节点。子节点是否合法的检查会在`validate()`中进行。 */
function is_paragraphnode(node: any): node is ParagraphNode{
    return node["children"] instanceof Array
}

/** 对所有概念节点通用的检查。 */
function universal_concept(node: any, path: number[]): [boolean , string]{

    // 检查children属性是否存在。
    if(!(node["children"] instanceof Array)){ 
        return [false , make_msg(path,`the type of property "children" should be Array, but it is not.`)]
    }

    // 检查children属性是否存在。
    if(node["children"].length <= 0){ 
        return [false , make_msg(path,`ConceptNode must have at least 1 child.`)]
    }


    // 检查参数列表是否合法。
    let [param_good , param_msg] = validate_parameters(node["parameters"] , (s: string) => make_msg(path , s))
    if(!param_good){ 
        return [false , param_msg]
    }

    // 检查idx是否存在
    if(typeof(node["idx"]) != "number"){ 
        return [false , make_msg(path,`the type of property "idx" should be number, but it is ${typeof(node["idx"])}.`)]
    }

    // 检查concept是否存在
    if(typeof(node["concept"]) != "string"){ 
        return [false , make_msg(path,`the type of property "concept" should be string, but it is ${typeof(node["concept"])}.`)]
    }
    
    // 检查abstrct是否存在
    if(!(node["abstract"] instanceof Array)){ 
        return [false , make_msg(path,`the type of property "abstract" should be Array, but it is not.`)]
    }

    // 检查abstract是否是abstract节点。
    for(let abs_idx in node["abstract"]){ 
        let x = node["abstract"][abs_idx]
        if(x["type"] != "abstract")
            return [false, make_msg(path,`the ${abs_idx}-th abstract is not an AbstractNode.`)]
        
        let [subgood , submsg] = validate(x, [])
        if(!subgood)
            return [false, make_msg(path,`the ${abs_idx}-th abstract is invalid. sub-message: ${submsg}`)]
    }


    return [true , ""]
}

/** 验证一棵树是不是合法的中间表示树。
 * @param tree 要验证的树。
 * @return 第一个返回值说明这棵树是否合法，第二个返回值说明其为何不合法（如果不合法的话）。
 */
function validate(tree: any, path: number[] = []): [boolean , string]{
    let node = tree
    if(node["type"] == undefined){ // 是文本或者段落节点。

        //检查是否是text节点。
        if(is_textnode(node))
            return [true , ""]

        // 检查是否存在children属性。
        if(!is_paragraphnode(node)){
            return [false, make_msg(path, "unknown node type.")]
        }

        // 检查children是否合法。
        for(let chil_idx in node.children){
            let x = node.children[chil_idx]
            if(!is_textnode(x) && x["type"] != "inline" && x["type"] != "support"){
                return [false, make_msg(path, `the ${chil_idx}-th children of a paragraph is not text, inline nor support.`)]
            }
        }
    }
    else{ //是概念节点。
        if(["inline" , "abstract" , "support" , "structure" , "group"].indexOf(node["type"]) < 0){
            return [false, make_msg(path, `unknown concept type ${node["type"]}.`)]
        }
        if(node["type"] == "inline"){ // inline节点。

            // 概念节点通用的检查。
            let [univ_res , univ_msg] = universal_concept(node , path) 
            if(!univ_res){
                return [false , univ_msg]
            }

            // 检查children是否是文本或者行内。
            for(let chil_idx in node.children){
                let x = node.children[chil_idx]
                if((!is_textnode(x)) && (x["type"] != "inline")){
                    return [false, make_msg(path, `the ${chil_idx}-th children of the inline node is not text nor inline.`)]
                }
            }
        }
        if(node["type"] == "group"){ // 组节点

            // 概念节点通用的检查。
            let [univ_res , univ_msg] = universal_concept(node , path) 
            if(!univ_res){
                return [false , univ_msg]
            }

            // 检查relation
            if(node["relation"] != "chaining" && node["relation"] != "separating"){
                return [false , make_msg(path,`node "relation" should be either "chaining" or "separating", but turns out to be ${node["relation"]}.`)]
            }

            // 检查children是否是不是文本或者行内。
            for(let chil_idx in node.children){
                let x = node.children[chil_idx]
                if((is_textnode(x)) || (x["type"] == "inline")){
                    return [false, make_msg(path, `the ${chil_idx}-th children of the group node is text or inline.`)]
                }
            }
        }
        if(node["type"] == "support"){ // support节点。

            // 概念节点通用的检查。
            let [univ_res , univ_msg] = universal_concept(node , path) 
            if(!univ_res){
                return [false , univ_msg]
            }

            // 检查是否有子节点。
            if(node["children"].length != 1){
                return [false , make_msg(path,`support node should only have 1 child.`)]
            }
        }
        if(node["type"] == "structure"){ // support节点。

            // 概念节点通用的检查。
            let [univ_res , univ_msg] = universal_concept(node , path) 
            if(!univ_res){
                return [false , univ_msg]
            }

            // 检查relation
            if(node["relation"] != "chaining" && node["relation"] != "separating"){
                return [false , make_msg(path,`node "relation" should be either "chaining" or "separating", but turns out to be ${node["relation"]}.`)]
            }

                // 检查children是否都是组节点。
                for(let chil_idx in node.children){
                    let x = node.children[chil_idx]
                    if(x["type"] != "group"){
                        return [false, make_msg(path, `the ${chil_idx}-th children of the structure node is not group.`)]
                    }
                }
            
        }
    }

    // 递归检查子节点是否合法。
    for(let chil_idx in node.children){
        let x = node.children[chil_idx]
        let [sub_good , sub_msg] = validate(x , [...path , parseInt(chil_idx)])
        if(!sub_good){
            return [false , sub_msg]
        }
    }

    return [true , ""]

}