/** 这个模块提供一个上下文工具，这个工具不修改上下文或环境，而是从已知的上下文或环境中获得本节点的引用名。 */

import { 
    ContexterBase , 
    PreprocessInformation , 
    PreprocessFunction , 

    Env , 
    Context , 
    Node , 
    ProcessedParameterList , 
    PrinterCacheItem , 
} from "@ftyyy/ytext"

export {
    IndexContexter , 
}

export type{
    IndexItem
}

type IndexItem = {
    name: string
    node_path: number []
    sons: IndexItem [] 
}
interface EnvType{
    root: IndexItem
    cur_path: number[]
}
type IndexGenerateFunction<NodeType extends Node = Node> = (info: PreprocessInformation<NodeType>) => string

/** 
 * 这个上下文工具生成目录的条目。
 * 
*/
class IndexContexter<NodeType extends Node = Node> extends ContexterBase<NodeType , any , EnvType>{
    gene_index: IndexGenerateFunction<NodeType>

    constructor(gene_index: IndexGenerateFunction<NodeType>){
        super("__yblog_index" , {
            root: {name: "index", node_path: [], sons: []} , 
            cur_path: [] , 
        })
        
        this.gene_index = gene_index
    }

    enter(
        node: Readonly<NodeType>, 
        path: Readonly<number []>, 
        parameters: Readonly<ProcessedParameterList>, 
        env: Env, 
        context: Context , 
    ) {
        let index = this.gene_index({node,parameters,env,context})
        if(index == undefined){
            return 
        }

        let {root, cur_path} = this.get_env(env)
        let cur = root
        for(let i of cur_path){
            cur = cur.sons[i]
        }
        let new_idx = cur.sons.length

        cur.sons.push( {
            name: index , 
            node_path: JSON.parse(JSON.stringify(path)) , 
            sons: [] , 
        } )

        this.set_env(env, {
            root: root , 
            cur_path: [...cur_path, new_idx]
        })
    }
    exit(
        node: Readonly<NodeType>, 
        path: Readonly<number []>, 
        parameters: Readonly<ProcessedParameterList>, 
        env: Env, 
        context: Context , 
    ): [PrinterCacheItem, boolean]{
        
        let {root, cur_path} = this.get_env(env)
        this.set_env(env, {
            root: root, 
            cur_path: cur_path.slice(0,cur_path.length-1)
        })
        return [{} , true]
    }

}

