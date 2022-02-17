/** 这个模块定义所有前作用辅助器的基类。
 * @module
 */
import { Node } from "slate"
import { Printer } from "../../../printer"
import type { EnterEffectFunc , ExitEffectFunc } from "../../../printer"
import type { PrinterEnv , PrinterContext } from "../../../printer"

export { BasicEffector }
export type {OptionFunc}

type OptionFunc<NODETYPE,T> = (element: NODETYPE, env: PrinterEnv, context?: PrinterContext) => T


class BasicEffector<NODETYPE = Node>{
    env_key: string
    context_key: string
    _default_val: string
    constructor(env_key:string, context_key: string, default_val: any){
        this.env_key = env_key
        this.context_key = context_key
        this._default_val = default_val
    }
    enter_effect(element: NODETYPE, env: PrinterEnv, context:PrinterContext) : [PrinterEnv,PrinterContext] {
        return [env , {}]
    }
    exit_effect(element: NODETYPE, env: PrinterEnv, context:PrinterContext) : [PrinterEnv,PrinterContext] {
        return [env , context]
    }

    ensure_env(env: PrinterEnv): PrinterEnv{
        if(env[this.env_key] == undefined){
            env[this.env_key] = this._default_val
        }
        return env
    }

    get_env(env: PrinterEnv): any{
        env = this.ensure_env(env)
        return env[this.env_key]
    }

    set_env(env: PrinterEnv , val: any){
        env = this.ensure_env(env)
        env[this.env_key] = val
        return env
    }

    get_context(context: PrinterContext): any{
        return context[this.context_key]
    }

    set_context(context: PrinterContext , val: any): PrinterContext{
        context[this.context_key] = val
        return context
    }

    make_context(val: any): PrinterContext{
        return {[this.context_key]: val}
    }

    fuse_result(old_ret: [PrinterEnv , PrinterContext], new_ret: [PrinterEnv , PrinterContext]): [PrinterEnv , PrinterContext]{
        let [old_env , old_context] = old_ret
        let [new_env , new_context] = new_ret
        return [new_env , {...old_context , ...new_context}]
    }

    enter_fuse( element: NODETYPE, env: PrinterEnv , context: PrinterContext ): [PrinterEnv , PrinterContext]{
        return this.fuse_result( [env , context] , this.enter_effect(element , env , context) )
    }
    exit_fuse ( element: NODETYPE, env: PrinterEnv , context: PrinterContext ): [PrinterEnv , PrinterContext]{
        return this.fuse_result( [env , context] , this.exit_effect(element , env , context) )
    }
}