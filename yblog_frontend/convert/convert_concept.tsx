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
    is_paragraphnode , 
} from "../lib"

export {convert_concept}

/** 好像也没啥嘛... */
function convert_concept(node: Node){
    if(is_textnode(node)){
        return 
    }
    for(let x of node.children){
        convert_concept(x)
    }

    if(is_concetnode(node)){
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
    }
}

