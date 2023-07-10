/** 这个模块提供一个上下文工具，来将一个链接所指向的节点加入到cache中。 */

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
    LinktoContexter , 
}

/** 
 * 这个上下文工具在印刷器缓存中链接所指向的节点。
*/
class LinktoContexter<NodeType extends Node = Node> extends ContexterBase<NodeType , undefined , undefined>{

    constructor(){
        super("__yblog_linkto" , undefined)
    }

    exit(
        node: Readonly<NodeType>, 
        path: Readonly<number []>, 
        parameters: Readonly<ProcessedParameterList>, 
        env: Env, 
        context: Context
    ): [PrinterCacheItem, boolean] {
        let cache_val = parameters.target_idx
        if(cache_val == undefined || cache_val <= 0){
            return [{},true]
        }
        return [{"linkto": cache_val} , true]
    }
}

