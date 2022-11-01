/** 
 * 这个模块处理每个节点的子节点。
 */

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
    NonLeafNode, 
    is_groupnode,
    is_textnode,
    is_inlinenode, 
    is_paragraphnode, 
    is_structnode,
    is_supportnode, 
} from "../lib"

import {
    create_group , 
    create_inline , 
    create_paragraph , 
    create_text , 
    create_support , 
    create_struct , 
} from "./convert_old_tree"

export {
    convert_children , 
}

function convert_children(node: Node){
    let to_add_before = [] as Node[]

    if(is_groupnode(node)){
        // 不能没有子节点。

        if(node.children.length == 0){ 
            node.children.push(create_paragraph([create_text("")]))
        }
        
        // 子节点不能是行内或者文本。
        node.children = node.children.reduce((lis , node)=>{
            if(is_textnode(node) || is_inlinenode(node)){
                return lis
            }
            return [...lis, node]
        }, [] as typeof node.children)

        if(node.children.length == 0){ 
            node.children.push(create_paragraph([create_text("")]))
        }

        // 第一个子节点必须是段落。
        if(!is_paragraphnode(node.children[0])){
            node.children = [...node.children, create_paragraph([create_text("")])]
        }
    }
    else if(is_inlinenode(node)){
        // 不能没有子节点。
        if(node.children.length == 0){ 
            node.children.push(create_text(""))
        }
        // 子节点不能是行内或者文本。
        node.children = node.children.reduce((lis , node)=>{
            if(is_textnode(node) || is_inlinenode(node)){
                return [...lis, node]
            }
            return [...lis]
        }, [] as typeof node.children)        
    }
    else if(is_structnode(node)){
        if(node.children.length > 0){
            // 子节点不能不是组
            node.children = node.children.reduce((lis , node)=>{
                if(is_groupnode(node)){
                    return [...lis, node]
                }
                return [...lis]
            }, [] as typeof node.children)        
        }
    }
    else if(is_supportnode(node)){
        // 不能没有子节点。
        if((node.children as any).length == 0){ 
            node.children = [create_text("") as {text: ""}]
        }
    }
    else if(is_paragraphnode(node)){
        // 不能没有子节点。
        if( node.children.length == 0){ 
            node.children.push(create_text(""))
        }

        node.children = node.children.reduce((lis , node)=>{
            if(is_textnode(node) || is_inlinenode(node)){
                return [...lis, node]
            }
            to_add_before.push(node) // 将多余的子节点提到最前。
            return [...lis]
        }, [] as typeof node.children)        
    }
    else{
        if(!is_textnode(node)){
            console.log(node)
        }
    }

    if(!is_textnode(node)){

        let flag = true
        for(let x = 0; x < 1000;x ++){
            flag = true

            for(let _subidx in node.children){
                let subidx = parseInt(_subidx)
                let subnode = node.children[subidx]
                let sub_to_add = convert_children(subnode)

                if(sub_to_add.length != 0){ // 如果有子节点申请要加人
                    node.children = [
                        ...node.children.slice(0,subidx) , 
                        ...sub_to_add,
                        ...node.children.slice(subidx) , 
                    ] as typeof node.children
                    flag = false
                    break
                }
            }
            if(flag){ // 没有子节点申请过加人，因此所有子节点都被处理过了。
                break
            }
            if(x == 999){
                console.log("convert_children: 处理了999次....")
            }
        }
    }

    return to_add_before
}

