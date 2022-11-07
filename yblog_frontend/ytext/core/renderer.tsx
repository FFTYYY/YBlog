/**
 * 这个模块定义印刷实现。
 * 每个一级概念都必须提供自己的印刷实现，另外段落也需要提供印刷实现。
 */

import {
    Node , 
    ParameterList , 
    AbstractNode , 
} from "./intermidiate"

export {
    PrinterRenderer , 
}
export type {
    Env , 
    Context , 
    PrinterEnterFunction , 
    PrinterExitFunction , 
    PrinterRenderFunctionProps , 
    PrinterRenderFunction , 
    ProcessedParameterList , 
    PrinterCacheItem , 
    PrinterCache , 
}

/** 渲染器所需要维护的环境。 */
type Env = {[key: string | number]: any}

/** 渲染器所需要维护的节点的上下文。 */
type Context = {[key: string | number]: any}

/** 印刷器的临时缓存的项目。 */
type PrinterCacheItem = {[key: string]: any}

/** 印刷器的临时缓存。 */
type PrinterCache = {[idx: number]: PrinterCacheItem}


/** 经过处理的参数列表。 */
type ProcessedParameterList = {[key: string]: any}

/** 进入时操作。注意，这个操作应是原地操作。 */
type PrinterEnterFunction<NodeType extends Node = Node> = (
    node: Readonly<NodeType>, 
    parameters: Readonly<ProcessedParameterList>, 
    env_draft: Env, 
    context_draft: Context
) => void

/** 离开时操作。 注意，这操作应是原地操作。*/
type PrinterExitFunction<NodeType extends Node = Node> = (
    node: Readonly<NodeType>, 
    parameters: Readonly<ProcessedParameterList>, 
    env_draft: Env, 
    context_draft: Context
) => [cache_result: PrinterCacheItem, finished: boolean]

/** 渲染器的渲染函数的props。 */
interface PrinterRenderFunctionProps<NodeType extends Node = Node> {

    /** 要渲染的节点。大多数情况下渲染器不应该访问节点，而应该从`context`和`parameters`获取需要的信息。 */
	readonly node: NodeType
    /** 经过预处理获得的`context`。 */
	readonly context: Context

    /** 经过处理的参数列表，这个参数还原成了一级概念的参数列表。 
     * 注意，这个列表的类型不是`PrinterParameterList`，因为其中已经去掉的类型的信息，而只是一个值的字典。
    */
    readonly parameters: {[key: string]: any}

    /** 子节点列表，这个是用来递归渲染用的。 */
	readonly children?: React.ReactElement

    /** 在抽象节点中可以额外传入的参数。 */
    readonly flags?: NodeType extends AbstractNode ? any : never
}

/** 渲染器的渲染函数。 */
type PrinterRenderFunction<NodeType extends Node = Node> = (
    (props: PrinterRenderFunctionProps<NodeType>) => React.ReactElement<PrinterRenderFunctionProps<NodeType>>
)

/** 总之是渲染器。 */
class PrinterRenderer<NodeType extends Node = Node>{

    /** 进入时操作。 */
	enter: PrinterEnterFunction<NodeType>

    /** 退出时操作。 */
	exit: PrinterExitFunction<NodeType>

    /** 渲染函数。 */
	renderer: PrinterRenderFunction<NodeType>

    /** 这个参数只对抽象节点有效。这一项将其作为一个节点的属性渲染，而`renderer`将其作为一棵树的根渲染。 
     * 只有抽象节点有这个属性。
    */
    renderer_as_property?: NodeType extends AbstractNode ? PrinterRenderFunction<NodeType> : never

    /**
     * 渲染器的构造函数。
     * @param funcs.enter 进入时操作。
     * @param funcs.exit 退出时操作。
     * @param funcs.renderer 渲染函数。
     */
    constructor(funcs:{
        enter?: PrinterEnterFunction<NodeType>, 
        exit?: PrinterExitFunction<NodeType>, 
        renderer: PrinterRenderFunction<NodeType> ,
        renderer_as_property?: NodeType extends AbstractNode ? PrinterRenderFunction<NodeType> : never , 
    }){
        this.enter = funcs.enter || ((n,p,e,c)=>{})
        this.exit = funcs.exit || ((n,p,e,c)=>[{}, true])
        this.renderer = funcs.renderer

        this.renderer_as_property = funcs.renderer_as_property
    }
}

