import { Editor , Node , Transforms } from "slate"
import { GroupNode , get_node_type , SupportNode } from "../../../../lib"
import { newpara_style } from "../../components/styles"

export { set_force_new_paragraph }

/** 这个插件强迫每个 GroupNode （包括根节点）的开头结尾都是 『新段』 节点。 */
function set_force_new_paragraph(editor:Editor): Editor{
    const normalizeNode = editor.normalizeNode
    const onChange = editor.onChange

    function goodson(subnode: Node){
        return get_node_type(subnode) == "support" && (subnode as SupportNode).name == newpara_style.name
    }

    // 检查一个节点是否违反 constraint ，需要新建节点。需要在哪一处位置新建就返回那个位置。返回 -1 表示无需新建节点。
    function goodfather(node: GroupNode){
        let numc = node.children.length
        if(numc == 0)
            return 0
        if(!goodson(node.children[0]))
            return 0
        if(!goodson(node.children[numc-1]))
            return numc
        return -1
    }

    editor.normalizeNode = (entry: [Node, number[]]) => {
        let [node , path] = entry

        if(get_node_type(node) == "group"){
            let check = goodfather(node as GroupNode)
            if(check >= 0)
                Transforms.insertNodes( editor , newpara_style.makenode() , {at: [...path,check]} )
        }

        normalizeNode(entry)
    }
    /** slate 的 normalizeNode 不会上溯到 editor 本身，所以这里修改 onChange 来规范 editor 。 */
    editor.onChange = ()=>{
        let check = goodfather(editor as GroupNode)
        if(check >= 0)
            Transforms.insertNodes( editor , newpara_style.makenode() , {at: [check]} )

        onChange()
    }

    return editor
}