/** 
 * 这个模块提供所有约束。
 * @module
 */

import * as Slate from "slate"
import * as SlateReact from "slate-react"

import {
    slate_is_concept , 
    slate_is_paragraph , 
    slate_is_text , 

    EditorComponent , 
} from ".."

import {
    StructNode , 
    GroupNode , 
    InlineNode , 
    Node , 
    TextNode, 
    is_paragraphnode, 

} from "../../core"

import {
    set_normalize_status , 
    get_normalize_status
} from "./base"

export {
    constraint_group_children , 
    constraint_inline_children , 
    constraint_struct_children , 
    constraint_paragraph_children , 
}


/** 这个插件规范组节点的子节点类型（不能是文本或者行内）。
*/
function constraint_group_children(editor: EditorComponent , slate: SlateReact.ReactEditor): SlateReact.ReactEditor{
    const normalizeNode = slate.normalizeNode
    slate.normalizeNode = (entry: [Node, number[]]) => {
        let [node , path] = entry

        if(get_normalize_status("initializing")){
            normalizeNode(entry)
            return 
        }

        if(slate_is_concept(node , "group") || slate_is_concept(node , "abstract")){
            
            // 不能没有子节点。
            if(node.children.length == 0){ 
                editor.add_nodes( editor.get_core().create_paragraph("") , [...path , 0] )
                return 
            }
            
            // 子节点不能是行内或者文本。
            if(slate_is_concept(node.children[0], "inline") || slate_is_text(node.children[0])){ 
                editor.delete_node_by_path([...path, 0])
                return 
            }

            // 第一个子节点必须是段落。
            if(!is_paragraphnode(node.children[0])){
                editor.add_nodes( editor.get_core().create_paragraph("") , [...path , 0] )
                return 
            }
        }

        normalizeNode(entry)
    }
    return slate
}



/** 这个插件规范组节点的子节点类型（不能是文本或者行内）。
*/
function constraint_inline_children(editor: EditorComponent , slate: SlateReact.ReactEditor): SlateReact.ReactEditor{
    const normalizeNode = slate.normalizeNode
    slate.normalizeNode = (entry: [Node, number[]]) => {
        let [node , path] = entry

        if(get_normalize_status("initializing")){
            normalizeNode(entry)
            return 
        }

        if(slate_is_concept(node , "inline")){
            
            // 不能没有子节点。
            if( node.children.length == 0){ 
                editor.add_nodes( editor.get_core().create_text("") , [...path , 0] )
                return 
            }
                        
            // 子节点不能不是行内或者文本
            if(! (slate_is_concept(node.children[0], "inline") || slate_is_text(node.children[0]))){ 
                editor.delete_node_by_path([...path, 0])
                return 
            }
        }

        normalizeNode(entry)
    }
    return slate
}

/** 这个插件规范组节点的子节点类型（不能是文本或者行内）。
*/
function constraint_struct_children(editor: EditorComponent , slate: SlateReact.ReactEditor): SlateReact.ReactEditor{
    const normalizeNode = slate.normalizeNode
    slate.normalizeNode = (entry: [Node, number[]]) => {
        let [node , path] = entry

        if(get_normalize_status("initializing")){
            normalizeNode(entry)
            return 
        }

        if(slate_is_concept(node , "structure")){
            
            if(node.children.length > 0){
                // XXX 可以没有子节点...对吗？
                // 子节点不能不是组
                if(! (slate_is_concept(node.children[0], "group"))){ 
                    editor.delete_node_by_path([...path, 0])
                    return 
                }
            }
        }

        normalizeNode(entry)
    }
    return slate
}

/** 这个插件规范段落的子节点类型。
*/
function constraint_paragraph_children(editor: EditorComponent , slate: SlateReact.ReactEditor): SlateReact.ReactEditor{
    const normalizeNode = slate.normalizeNode
    slate.normalizeNode = (entry: [Node, number[]]) => {
        let [node , path] = entry
        
        if(get_normalize_status("initializing")){
            normalizeNode(entry)
            return 
        }
        
        if(slate_is_paragraph(node)){
            // 不能没有子节点。
            if( node.children.length == 0){ 
                editor.add_nodes( editor.get_core().create_text("") , [...path , 0] )
                return 
            }
            

            // 子节点不能不是行内或者文本
            if(! (slate_is_concept(node.children[0], "inline") || slate_is_text(node.children[0]))){ 
                editor.move_node_by_path([...path,0] , path) // 拿到自己后面去。
                // editor.delete_node_by_path([...path, 0])
                return 
            }
        }

        normalizeNode(entry)
    }
    return slate
}

