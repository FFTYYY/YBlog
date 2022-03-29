/**
 * @module
 * 这个文件定义编辑器的代理。
 * 编辑器所看到的节点，是经过代理的，这样可以让编辑器更灵活地操作节点参数。
 */

import { Node } from "slate"
import type { StyleType , ValidParameter , ValidParameterItem } from "./elements"
import type { Style } from "./core"
export {}

/** 这个类描述一个抽象的代理。 */
class Proxy{
    name: string
    target_style: Style<StyleType>
    fixed_parameters: ValidParameter<ValidParameterItem | {type: "function" , val: string}>
    default_parameters: ValidParameter

    constructor(
        name: string , 
        target_style: Style<StyleType>, 
        fixed_parameters: ValidParameter , 
        default_parameters: ValidParameter , 
    ){
        this.name = name
        this.target_style = target_style
        this.fixed_parameters = fixed_parameters
        this.default_parameters = default_parameters
    }

    /** 返回一个代理的参数列表。 */
    get_proxy_parameters(){
        return this.default_parameters
    }

    /** 给定一个代理的参数列表，返回一个真实的参数列表。 */
    get_real_parameters(params: ValidParameter){
        for(let k in this.target_style.parameter_prototype){
            if(this.fixed_parameters[k] != undefined){
                let v = this.fixed_parameters[k]
                if(v.type == "function")
            }
        }
    }
}
