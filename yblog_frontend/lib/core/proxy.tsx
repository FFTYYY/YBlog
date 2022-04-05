/**
 * @module
 * 这个文件定义编辑器的代理。
 * 
 * 编辑器在呈现函数的参数编辑时，并不直接呈现其参数，而是呈现代理的参数页面，而代理可以将代理参数合称为真实的参数。
 * 这样的设计有助于分离一个节点在编辑时和在渲染时的行为。
 * 
 */

import { Node } from "slate"
import type { StyleType , ValidParameter , ValidParameterItem } from "./elements"
import type { Style } from "./core"
export { Proxy }

/** 这个类描述一个代理。 
 * 任何代理以其名称（`name`）来标识。
 * 一个代理必须对应一个节点样式。
 * 用`fixed_parameters`和`default_parameters`来描述一个代理的行为。
*/
class Proxy{
    /** 这个代理的名称。 */
    name: string

    /** 这个代理所服务的样式。 */
    target_style: Style<StyleType>

    /** 这个代理希望将样式的哪些参数设置为固定的值。 */
    fixed_parameters: ValidParameter<ValidParameterItem | {type: "function" , val: string}>

    /** 这个代理希望重新设置哪些参数的初始值。
     * 注意，这里使用的值不必是样式本来有的值。
     */
    default_parameters: ValidParameter

    /** 创建一个代理。
     * @param name 这个代理的名称。
     * @param target_style 这个代理所服务的样式。
     * @param fixed_parameters 这个代理希望将样式的哪些参数设置为固定的值。
     * @param default_parameters 这个代理希望重新设置哪些参数的初始值。
     */
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

    /** 给定一个真实的参数列表，返回一个代理的参数列表。 
     * @param params 给出的真实参数列表。
    */
    get_proxy_parameters(params: ValidParameter){
        let ret = {}

        let merge = (a: any,b: any) => {
            if(typeof(a) != "object"){ // a是基本类型
                return b
            }
            if(a.length != undefined){ // a是数组
                return b
            }

            let ret = {...a}
            for(let k in b){
                if(b[k] != undefined){
                    if(typeof(b[k] == "object")){ // 合并子对象
                        ret[k] = {...ret[k] , ...b[k]}
                    }
                    else{
                        ret[k] = b[k]
                    }
                }
            }
            return ret
        }

        let ref = merge( merge(this.target_style.parameter_prototype , this.default_parameters) , params)
        for(let k in ref){
            if(this.fixed_parameters[k] == undefined){ // 只有当一个参数不是fixed时才是可修改的。
                ret[k] = merge(ret[k] , ref[k])
            }
        }
        return ret
    }

    /** 给定一个代理的参数列表，返回一个真实的参数列表。 
     * @param params 给出的代理参数列表。
    */
    get_real_parameters(params: ValidParameter){
        let ret = {}
        let ref = this.target_style.parameter_prototype // 默认值列表。
        for(let k in ref){

            if(this.fixed_parameters[k] != undefined){
                let v = this.fixed_parameters[k]
                if(v.type == "function"){
                    let func = (new Function(`return ${v.val}`))()
                    let new_v = func(params)
                    ret[k] = {
                        "val": new_v , 
                        "type": typeof new_v , 
                    }
                }
                else{
                    ret[k] = v
                }
            }
            else{
                if(params[k] == undefined){
                    if(this.default_parameters[k] == undefined){ // 使用原始的默认值
                        ret[k] = ref[k] 
                    }
                    else{ // 使用代理的默认值。
                        ret[k] = this.default_parameters[k]
                    }
                }
                else{ // 使用给出的值。
                    ret[k] = params[k] 
                }
            }
        }
        return ret
    }

    /** 创建一个这个代理所服务的样式的新节点。这个节点应用了代理（即设置了`proxy_info`属性）。 */
    makenode(){
        let node = this.target_style.makenode()
        node.proxy_info.proxy_name = this.name
        node.proxy_info.proxy_params = this.get_proxy_parameters(node.parameters) // 创建代理参数。
        node.parameters = this.get_real_parameters(node.proxy_info.proxy_params) // 更新真实参数。
        return node
    }

    /** 创建一个这个代理所服务的抽象样式的新节点。 */
    makehidden(){
        let node = this.target_style.makehidden()
        node.proxy_info.proxy_name = this.name
        node.proxy_info.proxy_params = this.get_proxy_parameters(node.parameters) // 创建代理参数。
        node.parameters = this.get_real_parameters(node.proxy_info.proxy_params) // 更新真实参数。
        return node
    }

    /** 询问这个抽象的样式的类型。 */
    get_styletype(){
        return this.target_style.type
    }
    /** 询问这个抽象的样式的名称。 */
    get_stylename(){
        return this.target_style.name
    }
}
