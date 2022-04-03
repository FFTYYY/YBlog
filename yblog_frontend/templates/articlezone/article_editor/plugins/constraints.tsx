import { Editor , Node , Transforms} from "slate"
import { ReactEditor } from "slate-react"
import { 
    GroupNode , 
    get_node_type , 
    SupportNode , 
    is_certain_style, 
    paragraph_prototype , 
    YEditor , 
    is_styled , 
    set_normalize_status , 
    get_normalize_status , 
} from "../../../../lib"
import type { StyledNode } from "../../../../lib"
import { newpara_style , sectioner_style , ender_style  } from "../../base/styles/styles"

export { set_force_sectioner , set_style_ensure_parameters }

/** 这个插件强迫编辑器的开头恰好是小节线，结尾恰好是章节线。且章节线不能出现在结尾以外的位置。 */
function set_force_sectioner(editor: YEditor, slate: ReactEditor): ReactEditor{
    const normalizeNode = slate.normalizeNode
    slate.normalizeNode = (entry: [Node, number[]]) => {
        let [_node , path] = entry

        if(get_normalize_status("initializing")){
            normalizeNode(entry)
            return 
        }

        if(path.length == 0){
            let node = _node as {children: Node[]} & typeof _node
            let nc = node.children.length

            // 开头不是小节线的情况。
            if(nc == 0 || !is_certain_style(node.children[0] ,  "support" , "小节线") ){
                editor.add_nodes(sectioner_style.makenode() , [0])
                return 
            }

            // 结尾不是章节线的情况。
            if(!is_certain_style(node.children[nc-1] ,  "support" , "章节线")){
                editor.add_nodes(ender_style.makenode() , [nc])
                return 
            }
        }

        if(is_certain_style(_node , "support" , "章节线")){
            if(path.length != 1 || path[0] != slate.children.length-1){ // 不是最后一个节点
                editor.delete_node_by_path(path)
                return 
            }
        }

        normalizeNode(entry)
    }
    return slate
}

/** 这个插件强迫每个有样式的节点具有其参数原型所规定的参数。 */
function set_style_ensure_parameters(editor: YEditor, slate: ReactEditor): ReactEditor{
    const normalizeNode = slate.normalizeNode

    slate.normalizeNode = (entry: [Node, number[]]) => {
        let [_node , path] = entry

        if(is_styled(_node)){
            let node = _node as StyledNode

            let style_type = node.type
            let style_name = node.name
            let style = editor.core.get_style(style_type , style_name)
            if(style == undefined){ // 一些内建样式之类的
                normalizeNode(entry)
                return 
            }
            let p = style.parameter_prototype
            let new_parameters = {...node.parameters}
            let flag = false // 是否进行了修正
            for(let k of Object.keys(p)){
                if(new_parameters[k] == undefined){
                    new_parameters[k] = p[k]
                    flag = true
                }
            }

            if(flag){ // 有修改
                if(node.proxy_info && node.proxy_info.proxy_name){ // 有代理，则需要更新代理
                    let proxy = editor.get_proxy(style_type , node.proxy_info.proxy_name)
                    let new_proxy_params = proxy.get_proxy_parameters(new_parameters)
                    editor.set_node( node , {
                        parameters: new_parameters , 
                        proxy_info: {
                            ...node.proxy_info , 
                            proxy_params: new_proxy_params
                        }
                    })
                }
                else{ // 只需要设置参数
                    editor.set_node( node , {parameters: new_parameters})
                }
                return
            }
        }
        
        normalizeNode(entry)
    }
    return slate
}


// /** 这个插件强迫每个小节线上方都恰好是『新段』节点，下方恰好是一个空白段落。 
//  * TODO 现在不需要了。
// */
// function set_force_new_para_in_sectioner(editor: Editor): Editor{
//     const normalizeNode = editor.normalizeNode

//     editor.normalizeNode = (entry: [Node, number[]]) => {
//         let [node , path] = entry

//         if("children" in node){
//             for(let [subidx, subnode] of node.children.entries()){
                
//                 // 不是小节线也不是章节线，我们不关心。
//                 if(!(is_certain_style(subnode,"support","小节线") || is_certain_style(subnode,"support","章节线")))
//                     continue
                
                
//                 if(subidx != 0){ // 前一个节点必须是新段，除非自己是第一个。
//                     let last_node = node.children[subidx - 1]
//                     if(!is_certain_style(last_node , "support" , "新段")){
//                         Transforms.insertNodes(editor , newpara_style.makenode() , {at: [...path,subidx]})
//                         return 
//                     }

//                 }
//                 if(subidx != node.children.length-1){ // 后一个节点必须是新段，除非自己是最后一个。
//                     let next_node = node.children[subidx + 1]

//                     // flag: next_node 是否是一个空段落
//                     if( get_node_type(next_node) != "paragraph" || Node.string(next_node) != "" ){
//                         Transforms.insertNodes(editor , paragraph_prototype("") , {at: [...path,subidx+1]})
//                         return 
//                     }
//                 }
//             }
//         }

//         normalizeNode(entry)
//     }

//     return editor
// }

// /** 这个插件强迫每个 GroupNode （不包括根节点）的开头结尾都是 『新段』 节点。 
//  * TODO 现在也不需要了
// */
// function set_force_new_paragraph_in_group(editor:Editor): Editor{
//     const normalizeNode = editor.normalizeNode

//     // 检查这个节点是否是新段节点。
//     function goodson(subnode: Node){
//         return get_node_type(subnode) == "support" && (subnode as SupportNode).name == newpara_style.name
//     }

//     // 检查一个节点是否违反 constraint ，需要新建节点。需要在哪一处位置新建就返回那个位置。返回 -1 表示无需新建节点。
//     function goodfather(node: GroupNode){
//         let numc = node.children.length
//         if(numc == 0)
//             return 0
//         if(!goodson(node.children[0]))
//             return 0
//         if(!goodson(node.children[numc-1]))
//             return numc
//         return -1
//     }

//     editor.normalizeNode = (entry: [Node, number[]]) => {
//         let [node , path] = entry

//         if(get_node_type(node) == "group" && path.length != 0){
//             let check = goodfather(node as GroupNode)
//             if(check >= 0)
//                 Transforms.insertNodes( editor , newpara_style.makenode() , {at: [...path,check]} )
//         }

//         normalizeNode(entry)
//     }

//     return editor
// }
