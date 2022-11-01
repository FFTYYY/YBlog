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

export {specify_concept}

/** 好像也没啥嘛... */
function specify_concept(node: Node){
    if(is_textnode(node)){
        return 
    }
    if(is_paragraphnode(node)){
        for(let x of node.children){
            specify_concept(x)
        }
        return 
    }

    return 
}

