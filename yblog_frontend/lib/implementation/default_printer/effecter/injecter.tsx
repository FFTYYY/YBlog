/** 这个模块定义一个前作用辅助器，用来帮助注入元素。
 * 
 */
import { Node } from "slate"
import { BasicEffector } from "./base"
import type { OptionFunc } from "./base"
import type { EnterEffectFunc , ExitEffectFunc } from "../../../printer"
import type { PrinterEnv , PrinterContext } from "../../../printer"


export { InjectEffector , ConsumeEffector }
export type { InjectFunction }

type InjectFunction<NT> = (props:{
    element: NT, 
    context: PrinterContext, 
}) => any

/** 这个前作用器允许节点向之后的节点的渲染函数注入一定的可渲染元素。 */
class InjectEffector<NT extends Node = Node> extends BasicEffector<NT>{
    pre_inject: InjectFunction<NT>
    suf_inject: InjectFunction<NT>

    constructor(
        env_key: string , 
        context_key: string , 
        pre_inject?: InjectFunction<NT> , 
        suf_inject?: InjectFunction<NT> , 
    ){
        // env 是一个等待注入的元素序列。
        super(env_key , context_key , [])

        this.pre_inject = pre_inject || ( (props)=><></>)
        this.suf_inject = suf_inject || ( (props)=><></>)
    }
    /** 在渲染自身之前注入。 */
    enter_effect(element: NT, env: PrinterEnv, context:PrinterContext) : [PrinterEnv,PrinterContext] {
        
        let PI = this.pre_inject


        // 将`to_inject`加入`env`。
        env = this.set_env(env , [
            ...this.get_env(env) , <PI element={element} context={context} />
        ])
        
        return [env , context]
    }
    /** 在渲染自身之后注入。 */
    exit_effct(element: NT, env: PrinterEnv, context:PrinterContext) : [PrinterEnv,PrinterContext] {
        
        let SI = this.suf_inject

        // 将 to_inject 加入 env。
        env = this.set_env(env , [
            ...this.get_env(env) , <SI element={element} context={context} />
        ])
        
        return [env , context]
    }

}

/** 这个元素接收`InjectEffector`注入的元素并提供给元素。*/
class ConsumeEffector<NT = Node> extends BasicEffector<NT>{
    constructor(
        env_key: string , 
        context_key: string , 
    ){
        super(env_key , context_key , [])
    }
    enter_effect(element: NT, env: PrinterEnv, context:PrinterContext) : [PrinterEnv,PrinterContext] {  
        let to_inject = this.get_env(env)
        env = this.set_env(env , []) // 清空环境
        return [env , this.make_context(to_inject)]
    }
}