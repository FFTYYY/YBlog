/** 这个模块定义所有预处理时处理上下文的工具的基类。
 * @module
 */
import { 
    Env , 
    Context , 
    PrinterEnterFunction , 
    PrinterExitFunction , 
    ProcessedParameterList , 
    PrinterCacheItem , 
} from "../../core"
import { 
	Node , 

} from "../../core/intermidiate"
 
export { ContexterBase }
export type {
    PreprocessInformation , 
    PreprocessFunction , 
}
  
/** 在预处理阶段可以访问的信息。 */
interface PreprocessInformation<NodeType = Node>{
    node: Readonly<NodeType>
    parameters: Readonly<ProcessedParameterList>
    context: Context
    env: Env 
}

/** 在预处理阶段用于提供任何一个信息的函数。 */
type PreprocessFunction<NodeType = Node, ReturnType = any> = (info: PreprocessInformation<NodeType>) => ReturnType

/**
 * 这个类定义一个预处理时的处理上下文的工具的基类。
 * 每个上下文工具以这样的方式运作：
 * - 每个上下文工具有一个唯一的名称，其只会操作环境和上下文中对应名称的项目。
 * - 每个上下文工具提供三个方法：进入方法、退出方法和询问方法，其中前两个方法在预处理时使用，而询问方法则是在渲染时从上下文中读出
 *   所约定的数据。
 * - 每个上下文工具自行维护是否需要进行下一次迭代。
 * 
 * 在上下文工具中可以尽情修改`env`和`context`，因为已经事先使用了immer来确定不可变性。
 * 
 * 另外，需要注意，`Contexter`永远是无状态的，也就是说同一个`contexter`可以用在不同的对象上。
 * 
 TODO 是不是需要提供一个『如果已经确定不需要二次迭代，那么下一次进入就会自动跳过』的方法啊？
 */
class ContexterBase<NodeType = Node, ContextType = any, EnvType = any>{
    key: string
    get_default_val: ()=>EnvType

    /**
     * 上下文工具的构造函数。
     * @param key 本工具的唯一名称。
     * @param default_val 如果环境还没创建，默认的环境的方法。
     */
    constructor(key:string, default_val: EnvType){
        this.key = key
        this.get_default_val = ()=>( JSON.parse( JSON.stringify(default_val) ) ) // 深拷贝，避免被修改。

    }

    /** 进入时操作。子类需要重写这个函数。 */
    enter(node: Readonly<NodeType> , parameters: Readonly<ProcessedParameterList>, env: Env , context: Context){}
    
    /** 退出时操作。子类需要重写这个函数。 */
    exit(node: Readonly<NodeType> , parameters: Readonly<ProcessedParameterList>, env: Env , context: Context): [PrinterCacheItem, boolean]{
        return [{} , true]
    }

    /** 这个函数确保自己的环境存在，如果没有就创建一个。 */
    ensure_env(env: Env): void{
        if(env[this.key] == undefined){
            env[this.key] = this.get_default_val()
        }
    }

    /** 获得这个操作器对应的环境。 */
    get_env(env: Env): EnvType{
        this.ensure_env(env)
        return env[this.key]
    }

    /** 设置这个操作器对应的环境。 */
    set_env(env: Env , val: EnvType): void{
        this.ensure_env(env)
        env[this.key] = val
    }

    /** 获得这个操作器对应的上下文。 */
    get_context(context: Context): ContextType{
        return context[this.key]
    }

    /** 设置这个操作器对应的上下文。 */
    set_context(context: Context , val: ContextType): void{
        context[this.key] = val
    }
}