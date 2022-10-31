/** 这个模块提供一个前作用器，用来告知节点其前面的兄弟。 */
import { Node } from "slate"
import { BasicEffector } from "./base"
import type { OptionFunc } from "./base"
import type { EnterEffectFunc , ExitEffectFunc } from "../../../printer"
import type { PrinterEnv , PrinterContext } from "../../../printer"


export { BrotherEffector }

class BrotherEffector<NODETYPE = Node> extends BasicEffector<NODETYPE>{
    information: any

    /**
     * 
     * @param env_key 环境的键。
     * @param context_key 上下文的键。
     * @param information 要留给下一个兄弟的信息。
     */
    constructor(
        env_key: string , 
        context_key?: string , 
        information: any = {}, 
    ){
        if(context_key == undefined)
            context_key = env_key
        super(env_key , context_key , [undefined , information]) // 环境是一个列表，前者是元素，后者是信息。

        this.information = information
    }
    enter_effect(element: NODETYPE, env: PrinterEnv, context:PrinterContext) : [PrinterEnv,PrinterContext] {
        context = this.set_context( context , this.get_env(env) ) // 设置自己的上下文为自己所看到的兄弟。
        env = this.set_env(env , [undefined , {}]) // 清空第一个子节点所看到的兄弟。
        return [env , context]
    }
    exit_effect(element: NODETYPE, env: PrinterEnv, context:PrinterContext): [PrinterEnv,PrinterContext]{
        env = this.set_env(env , [element , this.information]) // 设置下一个节点所看到的兄弟为自己，并留下自己的信息。
        return [env , context]
    }

}