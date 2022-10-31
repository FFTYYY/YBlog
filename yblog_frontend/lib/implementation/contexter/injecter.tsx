/** 这个模块定义一对上下文工具，用来在节点之间传递信息。
 * 具体来说，这个模块定义了一个『注射器』（Injector）和『接收器』（Consumer）。
 * 注射器可以向环境中发射一个信息，这个信息用一个key来编号，之后的节点可以通过接收器来接收这个信息，通过key来配对。
 * 注射器是不特定的，任何一个带有注射器且处理相同key的节点都可以处理此信息。
 */
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


export { InjectContexter , ConsumerContexter }

/** 这个上下文工具允许节点向之后的节点的渲染函数注入一定的可渲染元素。 
 * 注射器会在环境内创造以特定的名称定义的环境，每个环境内又被`infokey`分为若干个子环境，每个子环境是一个数组，包含所有以
 * 这个infokey注射的信息。每次Consumer会取出所有的信息并处理。
 * 
 * 注意这里类型定义其实不严谨，env中并非所有项目都是`InfoType`（所有`Injecter`都共用一个`env`，但是他们的`InfoType`不一定一样）。
 * 但是在实现中只会关心`env[this.infotype]`（这一点由所有函数都首先调用`this.get_subenv`来保证），而这一项一定是`InfoType`类型
 * 的，所以不会有问题。
 * 
*/
class InjectContexter<NodeType extends Node = Node, InfoType = any> extends ContexterBase<
    NodeType , 
    undefined , 
    {[infokey: string]: InfoType[]}
>{
    /**
     * 『注射器』上下文工具的构造函数。
     * @param infokey 要注射的信息配对使用的key。
     * @param infos.preinfo 在进入节点时（先序）生成的信息。 
     * @param infos.aftinfo 在离开节点时（后序）生成的信息。
     * 
     */
    infokey: string
    preinfo: PreprocessFunction<NodeType , InfoType | undefined>
    aftinfo: PreprocessFunction<NodeType , InfoType | undefined>
    constructor(
        infokey: string, infos: {
            preinfo?: PreprocessFunction<NodeType , InfoType | undefined>, 
            aftinfo?: PreprocessFunction<NodeType , InfoType | undefined>
        }
    ){
        super("__injector_consumer" , {})
        this.infokey = infokey
        this.preinfo = infos.preinfo || ( (info)=>undefined )
        this.aftinfo = infos.aftinfo || ( (info)=>undefined )
    }

    /** 这个函数自动创建（如果不存在的话）对应的环境项目和信息项目，并返回本注射器使用的信息项目。 
     * 所有注射器函数在操作`env`之前都应该调用这个函数，来保证只操作自己的项目。
    */
    get_subenv(env: Env){
        this.ensure_env(env)
        let e = this.get_env(env)
        // 确保本信息的数组存在。
        if(e[this.infokey] == undefined){
            e[this.infokey] = []
        }
        return e[this.infokey]
    }
    enter(node: Readonly<NodeType>, parameters: Readonly<ProcessedParameterList>, env: Env, context: Context): void {
        let e = this.get_subenv(env)
        let theinfo = this.preinfo({node,parameters,env,context})
        if(theinfo != undefined)
            e.push( theinfo )
    }
    exit(node: Readonly<NodeType>, parameters: Readonly<ProcessedParameterList>, env: Env, context: Context): [PrinterCacheItem, boolean] {
        let e = this.get_subenv(env)
        let theinfo = this.aftinfo({node,parameters,env,context})
        if(theinfo != undefined)
            e.push( theinfo )
        return [{} , true]
    }
}

/** 这个上下文工具接收注射器提供的信息，并提供给节点。*/
class ConsumerContexter<NodeType extends Node = Node , InfoType = any> extends ContexterBase<
    NodeType , 
    InfoType [] , 
    {[infokey: string]: InfoType[]}
>{
    infokey: string

    /** 接收器（Injector）上下文工具的构造函数。
     * @param infokey 要接收的信息配对使用的key。
     */
    constructor(
        infokey: string , 
    ){
        super("__injector_consumer" , {})
        this.infokey = infokey
    }

    /** 这个函数自动创建（如果不存在的话）对应的环境项目和信息项目，并返回本接收器使用的信息项目。 
     * 所有接收器函数在操作`env`之前都应该调用这个函数，来保证只操作自己的项目。
    */
    get_subenv(env: Env){
        this.ensure_env(env)
        let e = this.get_env(env)
        // 确保本信息的数组存在。
        if(e[this.infokey] == undefined){
            e[this.infokey] = []
        }
        return e[this.infokey]
    }
    set_subenv(env: Env, val: InfoType[]){
        this.ensure_env(env)
        let e = this.get_env(env)
        e[this.infokey] = val
    }

    set_context(context: Context, val: InfoType[]){
        if(context[this.key] == undefined){
            context[this.key] = {}
        }
        context[this.key][this.infokey] = val
    }
    get_context(context: Context): InfoType[]{
        if(context[this.key] == undefined){
            context[this.key] = {}
        }
        return context[this.key][this.infokey]
    }

    enter(node: Readonly<NodeType>, parameters: Readonly<ProcessedParameterList>, env: Env, context: Context): void {
        let info = [...this.get_subenv(env)] // 复制已有的信息。其实不用这么写，不过也无所谓吧。
        this.set_subenv(env , []) // 删除已经吃到的信息。
        this.set_context(context , info)
    }
}