import * as Slate from "slate"
import * as SlateReact from "slate-react"
import { 
    slate_is_concept , 
    set_normalize_status , 
    get_normalize_status, 
    ConceptNode , 

    EditorComponent, 
    AllConceptTypes, 
} from "@ftyyy/ytext"
import { 
    sectioner_style , 
    ender_style  
} from "../../base/concept/first_concepts"

export { set_force_sectioner , set_style_ensure_parameters }

function slate_is_style(node: Slate.Node, type: AllConceptTypes , concept: string){
    return slate_is_concept(node , type) && node.concept == concept
}

/** 这个插件强迫编辑器的开头恰好是小节线，结尾恰好是章节线。且章节线不能出现在结尾以外的位置。 */
function set_force_sectioner(editor: EditorComponent, slate: SlateReact.ReactEditor): SlateReact.ReactEditor{
    const normalizeNode = slate.normalizeNode

    slate.normalizeNode = (entry: [Slate.Node, number[]]) => {
        let [_node , path] = entry

        if(get_normalize_status("initializing")){
            normalizeNode(entry)
            return 
        }

        if(path.length == 0){
            let node = _node as Slate.Editor
            let nc = node.children.length

            // 开头不是小节线的情况。
            if(nc == 0 || !slate_is_style(node.children[0] ,  "support" , "小节线") ){
                editor.add_nodes(editor.get_core().create_support("小节线") , [0])
                return 
            }

            // 结尾不是章节线的情况。
            if(!slate_is_style(node.children[nc-1] ,  "support" , "章节线")){
                editor.add_nodes(editor.get_core().create_support("章节线") , [nc])
                return 
            }
        }

        if(slate_is_style(_node , "support" , "章节线")){
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
function set_style_ensure_parameters(editor: EditorComponent, slate: SlateReact.ReactEditor): SlateReact.ReactEditor{
    const normalizeNode = slate.normalizeNode

    /** 
     * @param init 目前的参数
     * @param ref 作为参考的参数列表
     * @param must 这些参数必须完全一致
     * @return 修复之后的参数列表以及是否进行了修复。
     */
    let fix_parameters = (init , ref , must = {}) => {
        let newp = {...init}
        let flag = false

        // 确保参数的项目一致。
        for(let k in ref){
            if(newp[k] == undefined){ // 有不一样的参数
                newp[k] = ref[k]
                flag = true
            }
        }
        for(let k in newp){
            if(ref[k] == undefined){ // 有多余的参数。
                delete newp[k]
                flag = true
            }
        }

        // 确保choices一致
        for(let k in newp){
            if(newp[k].type == "choice"){ // 更新choices的选项
                if( JSON.stringify(newp[k].choices) != JSON.stringify(ref[k].choices)){
                    newp[k] = {
                        val: newp[k].val , 
                        type: "choice" ,
                        choices: ref[k].choices , 
                    }
                    flag = true
                }
            }
        }

        // 确保完全一致
        for(let k in must){
            if(newp[k].val != ref[k].val){
                newp[k] = {...newp[k] , val: ref[k].val}
                flag = true
            }
        }

        return [newp , flag]
    }    

    slate.normalizeNode = (entry: [Slate.Node, number[]]) => {
        let [node , path] = entry

        if(slate_is_concept(node)){
            // TODO
        }
        
        normalizeNode(entry)
    }
    return slate
}
