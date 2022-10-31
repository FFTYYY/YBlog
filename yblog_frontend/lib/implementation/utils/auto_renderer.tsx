/** 这个模块提供一个快捷工具，来帮助更方便地创建Printer。
 * @module
*/

import {
    ContexterBase , 
    PreprocessFunction , 
    PreprocessInformation , 
} from "../contexter"
import {
    PrinterRenderFunction , 
    PrinterRenderer , 
    Node , 
    ProcessedParameterList , 
    Env , 
    Context ,
    AbstractNode , 
} from "../../core"

export {auto_renderer}

/**
 * 这个函数帮助那些使用上下文工具列表的概念自动创建渲染函数。具体来说，这个函数会根据`contexters`自动创建`enter`和`exit`操作，而
 * 用户只需要指定`contexters`和`renderer`。
 * @param params.render_function 即`PrinterRenderer.renderer`
 * @param params.contexters 上下文工具列表。
 * @param params.render_function_as_property 当抽象节点作为节点属性渲染时的渲染器。只对抽象节点提供。
 */
function auto_renderer<NodeType extends Node = Node>({
    render_function , 
    contexters = [], 
    render_function_as_property = undefined , 
}: {
    render_function:  PrinterRenderFunction<NodeType>
    contexters?: PreprocessFunction<NodeType , ContexterBase<NodeType>>[]
    render_function_as_property?: NodeType extends AbstractNode ? PrinterRenderFunction<NodeType> : never
}): PrinterRenderer<NodeType>{
    return new PrinterRenderer({
        enter: (node: Readonly<NodeType>, parameters: Readonly<ProcessedParameterList>, env: Env, context: Context)=>{
            for(let cer of contexters){
                let contexter = cer({node , parameters , env , context}) // 创建contexter
                
                contexter.enter(node,parameters,env,context)
            }
        } , 
        exit: (node: Readonly<NodeType>, parameters: Readonly<ProcessedParameterList>, env: Env, context: Context)=>{
            let cache = {}
            let flag = true
            for(let cer of contexters){
                let contexter = cer({node , parameters , env , context}) // 创建contexter

                let [subcache , subflag] = contexter.exit(node,parameters,env,context)
                cache = {...cache , ...(subcache || {})} // 合并cache和cache
                flag = flag && subflag
            }
            return [cache , flag]
        } , 
        renderer: render_function , 
        renderer_as_property: render_function_as_property , 
})

}