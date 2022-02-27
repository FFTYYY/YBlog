/** 这个模块定义一个前作用辅助器，用来帮助生成编号。
 * 
 */
import { Node } from "slate"
import { BasicEffector } from "./base"
import type { OptionFunc } from "./base"
import type { EnterEffectFunc , ExitEffectFunc } from "../../../printer"
import type { PrinterEnv , PrinterContext } from "../../../printer"


export { OrderEffector }

class OrderEffector<NODETYPE = Node> extends BasicEffector<NODETYPE>{
    clear_order: OptionFunc<NODETYPE,boolean>

    constructor(
        env_key: string , 
        context_key?: string , 
        clear_order: OptionFunc<NODETYPE,boolean> = (e,v,c)=>false, 
    ){
        if(context_key == undefined)
            context_key = env_key
        super(env_key , context_key , [0])
        
        this.clear_order = clear_order
    }
    enter_effect(element: NODETYPE, env: PrinterEnv, context:PrinterContext) : [PrinterEnv,PrinterContext] {
        env = this.ensure_env(env)
        let order = [...this.get_env(env)] // 防止修改。

        // 把当前层级清零。
        if(this.clear_order(element, env)){
            order[order.length-1] = 0
        }
        order[order.length-1] ++ // 增加当前层级。

        let new_order = [...order , 0] // 增加下一层级的值。

        return [this.set_env(env , new_order) , this.make_context(order)]
    }
    exit_effect(element: NODETYPE, env: PrinterEnv, context:PrinterContext): [PrinterEnv,PrinterContext]{
        
        let order = this.get_env( env )
        order = order.slice(0,order.length-1) // 删除最后一个元素，复原层级。

        return [this.set_env(env , order) , context]
    }

}