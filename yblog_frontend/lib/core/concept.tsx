/** 这个模块定义概念类，包括一级概念和二级概念。 
 * @module
*/

import { ParameterValue , ParameterList, AllConceptTypes } from './intermidiate'
export type {
    MetaParameters , 
    FixedParameterValue , 
    FixedParameterList , 
}
export {
    FirstClassConcept , 
    SecondClassConcept , 
}

/** 元参数列表的接口。
 * 元参数列表应该作为一级概念的一部分。
 */
 interface MetaParameters{

    /** 是否强制节点渲染为行内样式。 */
	force_inline?: boolean,

    /** 是否强制节点渲染为块级样式。 */
	force_block?: boolean,

    /** 是否强制没有子节点。 */
	force_void?: boolean,
}

/** 固定参数项的可行类型。 */
type FixedParameterValue = ParameterValue | {"type": "function" , val: string}

/** 固定参数项的参数列表。 */
interface FixedParameterList{[key: string]: FixedParameterValue}

/** 一级概念。 
 * 一级概念被二级概念继承以形成真正的概念。
 * 一级概念提供参数原型、元参数，以及印刷方法。
*/
class FirstClassConcept{
    /** 对应的节点类型。 */
    type: AllConceptTypes

    /** 概念的名称。一级概念的名称和类型的二元组是其唯一标志。 */
    name: string

    /** 参数列表。 */
    parameter_prototype: ParameterList
    
    /** 元参数列表。如果没有提供会默认把所有项都设置为`undefined`。 */
    meta_parameters: MetaParameters

    constructor({
        type , 
        name , 
        parameter_prototype = {} ,
        meta_parameters = {} , 
    } : {
        type: "group" | "inline" | "structure" | "support" | "abstract" , 
        name: string , 
        parameter_prototype?: ParameterList , 
        meta_parameters?: MetaParameters , 
    }){
        this.type = type
        this.name = name
        this.meta_parameters = meta_parameters || {}
        this.parameter_prototype = parameter_prototype || {
            force_inline: undefined , 
            force_block: undefined , 
            force_void: undefined , 
        }
    }
}


// XXX 是否需要面向对象？（getter / setter）？
/** 二级概念。
 * 二级概念继承一级概念以形成真正的概念。之所以这么设计，是为了让概念可以在编辑中动态创建而免于编程。
 * 二级概念描述如何重写一级概念的参数。
 */
class SecondClassConcept{
    /** 对应的一级概念类型。 */
    type: AllConceptTypes

    /** 对应的一级概念名称。 */
    first_concept: string

    /** 二级概念名称。类型和名称是检索一个二级概念的唯一标志。 */
    name: string

    /** 要修改哪些参数的默认值。 */
    default_override: ParameterList
    /** 要固定哪些参数的值。 */
    fixed_override: FixedParameterList

    constructor({
        type, 
        first_concept , 
        name , 
        default_override = {} , 
        fixed_override = {} , 
    }:{
        type: "group" | "inline" | "structure" | "support" | "abstract" , 
        first_concept: string , 
        name: string , 
        default_override?: ParameterList , 
        fixed_override?: FixedParameterList , 
    }){
        this.type = type
        this.first_concept = first_concept
        this.name = name
        this.default_override = default_override || {}
        this.fixed_override = fixed_override || {}
    }
}
