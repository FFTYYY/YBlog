/** 这个模块为每个二级概念转换其参数。 */

// TODO
import {
    GroupNode , 
    StructNode , 
    SupportNode , 
    InlineNode , 
    ParagraphNode , 
    TextNode , 
    Node , 
    validate , 
    ProcessedParameterList , 
    NonLeafNode , 

    is_concetnode , 
    is_textnode , 
    is_paragraphnode, 
    SecondClassConcept, 
} from "../templates/articlezone/lib"
import { create_paragraph } from "./convert_old_tree"

import {second_concepts } from "./second_concept"

export {convert_concept}

/** 好像也没啥嘛... */
function convert_concept(node: Node){
    let old_old = {...node}
    if(is_textnode(node)){
        return 
    }
    for(let x of node.children){
        convert_concept(x)
    }

    if(is_concetnode(node)){ // 转换所有ordering参数。
        if(node.parameters.ordering){
            let new_val = {
                chinese: "head" , 
                "arab-circle": "discuss" , 
                "chinese-bracket": "title" , 
                "arab-bracket": "list-separating" , 
                "arab": "list-separating" , 
                "arab-round-bracket": "list-chaining" , 
                "none": "none" , 
            }[node.parameters.ordering.val as string] as string

            if(new_val == undefined){
                console.log("bad ordering" , node.parameters.ordering.val)
                
            }
        }
        if(node.concept == "引用"){
            if(node.parameters.center != undefined){
                node.parameters["long"] = {
                    val: !node.parameters.center.val , 
                    type: "boolean" , 
                }
            }
            node.parameters["enter"] = {
                val: node.parameters.title.val as string , 
                type: "string" , 
            }
            node.parameters["exit"] = {
                val: node.parameters.close.val as boolean , 
                type: "boolean" , 
            }
        }
        if(node.concept == "读读论文-一项"){
            node.concept = "论文评论"
        }
        if(node.concept == "项目"){
            node.parameters.name = node.parameters.item
        }
        if(node.concept == "散文-一项-问题" || node.concept == "散文-一项-条件" || node.concept == "散文-一项-性质" || node.concept == "散文-一项-例题"){
            node.concept = "项目"
            node.parameters = {
                alias: node.parameters.alias ,
                name: {
                    val: node.concept.slice(node.concept.length - 2) , 
                    type: "string" , 
                }
            }
        }
        if(node.concept == "散文-札记-注"){
            node.concept = "传"
        }
        if(node.concept == "散文-札记-经"){
            node.concept = "经"
        }
        if(node.concept == "诗经说文-释" || node.concept == "诗经说文-字"){
            node.concept = "项目"
        }
        if(node.concept == "数学-讨论"){
            node.concept = "讨论"
        }
    }
    if(is_concetnode(node)){
        let node_ccpt = node.concept
        if(node.concept == "root" || node.concept == "struct-child"){
            return 
        }
        let ccpt: SecondClassConcept | undefined = undefined
        for(let ccptidx of Object.keys(second_concepts)){
            let f = second_concepts[ccptidx]
            if(f.name == node_ccpt){
                ccpt = f
                break
            }
        }
        if(ccpt == undefined){
            console.log("bad second concept")
            console.log(second_concepts)
            console.log(old_old)
            throw new Error()
        }
        for(let param_name in ccpt.default_override){
            if(node.parameters[param_name] == undefined){
                node.parameters[param_name] = ccpt.default_override[param_name]
            }
        }
        for(let param_name in node.parameters){
            if(ccpt.default_override[param_name] == undefined){
                if(node.parameters[param_name].val){
                    if(["clustering" , "ordering" , "label" , "title" , "close" , "prefix" , "suffix", "center"].indexOf(param_name) < 0){
                        console.log("deleting...", node.concept , "of" , param_name)
                    }
                }
                delete node.parameters[param_name]
            }
        }
        for(let param_name in node.parameters){
            node.parameters[param_name].type = ccpt.default_override[param_name].type
        }
    }
}

