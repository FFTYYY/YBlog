/** 这个模块提供一个上下文工具，这个工具不修改上下文或环境，而是从已知的上下文或环境中获得本节点的引用名。 */

import { 
    ContexterBase , 
    PreprocessInformation , 
    PreprocessFunction , 
} from "./base"
import { 
    Env , 
    Context , 
    Node , 
    ProcessedParameterList , 
    PrinterCacheItem , 
} from "../../core"

export {
    ReferenceContexter , 
}

type ReferenceCacheGenerateFunc<NodeType extends Node = Node> = (info: PreprocessInformation<NodeType>) => any

/** 
 * 这个上下文工具在印刷器缓存中生成节点的引用名。
 * 
*/
class ReferenceContexter<NodeType extends Node = Node> extends ContexterBase<NodeType , undefined , undefined>{
    get_reference: ReferenceCacheGenerateFunc<NodeType>

    constructor(get_reference: ReferenceCacheGenerateFunc<NodeType>){
        super("__reference" , undefined)
        this.get_reference = get_reference
    }

    exit(node: Readonly<NodeType>, parameters: Readonly<ProcessedParameterList>, env: Env, context: Context): [PrinterCacheItem, boolean] {
        let cache_val = this.get_reference({node,parameters,env,context})
        return [{[this.key]: cache_val} , true]
    }
}

