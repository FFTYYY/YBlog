/** 这个文件定义一个抽象的编辑器，主要包括这个编辑器可以使用的所有样式。
 * 只包含样式的名称和原型描述，而具体如何渲染则在interface中定义。
 * @module
*/

import { Editor , Node } from "slate"
import type { StyledNode , InlineNode , GroupNode , StructNode , SupportNode , } from "./elements"
import { text_prototype , paragraph_prototype , inline_prototype , group_prototype , struct_prototype, support_prototype , } from "./elements"

export {EditorCore , InlineStyle , GroupStyle , StructStyle , SupportStyle , AbstractStyle}

type RootNotification_Function = (new_root: GroupNode)=>void

/** 描述一个抽象的编辑器，维护节点树和使用的样式 */
class EditorCore{
    inlinestyles    : { [sty: string] : InlineStyle     }
    groupstyles     : { [sty: string] : GroupStyle      }
    structstyles    : { [sty: string] : StructStyle     }
    supportstyles   : { [sty: string] : SupportStyle    }
    abstractstyles  : { [sty: string] : AbstractStyle   }
    root: GroupNode
    notifications: RootNotification_Function[]

    /**
     * 
     * @param inlinestyles 初始的内联样式列表，也可以稍后通过 add_inlinestyle() 添加。
     * @param groupstyles 初始的组样式列表。
     * @param structstyles 初始的结构样式列表。
     * @param supportstyles 初始的辅助节点样式列表。
     * @param abstractstyles 初始的抽象节点样式列表。
     */
    constructor(
        inlinestyles    : InlineStyle   [] = [], 
        groupstyles     : GroupStyle    [] = [], 
        structstyles    : StructStyle   [] = [], 
        supportstyles   : SupportStyle  [] = [] ,
        abstractstyles  : AbstractStyle [] = [] , 
    ){
        this.inlinestyles   = {}
        this.groupstyles    = {}
        this.structstyles   = {}
        this.supportstyles  = {}
        this.abstractstyles = {}

        for(let style of inlinestyles)
            this.add_inlinestyle(style)
        for(let style of groupstyles)
            this.add_groupstyle(style)
        for(let style of structstyles)
            this.add_structstyle(style)
        for(let style of supportstyles)
            this.add_supportstyle(style)
        for(let style of abstractstyles)
            this.add_abstractstyle(style)

        this.root = group_prototype("root" , {}) //节点树
        this.notifications = [] // 当root修改时要通知的人的列表
    }

    /** 等价于 update_root({children: children}) */
    update_children(children: Node[]){
        return this.update_root({children: children})
    }

    /** 这个函数是外部改变 root 的唯一方式。 */
    update_root(new_root: any){
        this.root = {...this.root, ...new_root}
        for(let notif of this.notifications)
            notif(this.root)
    }

    /** 添加一个通知函数。 */
    add_notificatioon(notif: RootNotification_Function){
        this.notifications.push(notif)
    }

    add_inlinestyle(style: InlineStyle){
        this.inlinestyles[style.name] = style
    }

    add_groupstyle(style: GroupStyle){
        this.groupstyles[style.name] = style
    }

    add_structstyle(style: StructStyle){
        this.structstyles[style.name] = style
    }

    add_supportstyle(style: SupportStyle){
        this.supportstyles[style.name] = style
    }
    add_abstractstyle(style: AbstractStyle){
        this.abstractstyles[style.name] = style
    }
}

/** 编辑器所使用的样式描述的基类 。*/
class Style<NT>{
    name: string
    parameter_prototype: any
    prototype: ()=>NT
    
    /** 
     * @param name 这个样式的名称。
     * @param parameter_prototype 这个样式的参数的原型。
     * @param prototype 一个函数，调用返回这个样式的原型。
     */
    constructor(name: string, parameter_prototype: any, prototype: ()=>NT){
        this.name = name
        this.parameter_prototype = parameter_prototype
        this.prototype = prototype
    }

    /** 根据所拥有的原型信息生成一个原型节点 */
    makenode(): NT{
        return this.prototype()
    }

    /** 给prototype赋值 */
    update_prototype(prototype:()=>NT){
        this.prototype = prototype
    }

}

/** 描述一个内联样式的类 */
class InlineStyle extends Style<InlineNode>{

    constructor(name: string , parameter_prototype: any){
        super(name, parameter_prototype, ()=>inline_prototype(name , parameter_prototype))
    }

}

/** 描述一个组样式的类 */
class GroupStyle extends Style<GroupNode>{
    constructor(name: string , parameter_prototype: any){
        super(name, parameter_prototype, ()=>group_prototype(name , parameter_prototype))
    }

}

/** 描述一个结构样式的类 */
class StructStyle extends Style<StructNode>{
    declare prototype: ()=>StructNode

    constructor(name: string , parameter_prototype: any){
        super(name, parameter_prototype, ()=>struct_prototype(name , parameter_prototype))
    }

}

/** 描述一个辅助节点的类 */
class SupportStyle extends Style<SupportNode>{
    declare prototype: ()=>SupportNode

    constructor(name: string , parameter_prototype: any){
        super(name, parameter_prototype, ()=>support_prototype(name , parameter_prototype))
    }

}

/** 描述一个抽象节点的样式。注意抽象节点不使用makenode()而是makehidden() */
class AbstractStyle{
    name: string
    parameter_prototype: any

    constructor(name: string , parameter_prototype: any){
        this.name = name
        this.parameter_prototype = parameter_prototype
    }

    /** 生成一个下级抽象节点。 */
    makehidden(){
        return group_prototype(this.name , this.parameter_prototype)    
    }
}
