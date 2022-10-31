/** 
 * 这个文件定义一个**渲染**一个完整的文档所需要的最小信息。
 * 包括：节点树的结构，以及样式列表。
 * 注意，这个节点树的结构是最终的，也就是
 * 注意，这个文件只描述抽象的样式，不涉及具体如何渲染。
 * @module
*/

import { Node } from "slate"
import { 
    StyleType , 
    StyledNodeFlag , 
    ValidParameter ,

    StyledNode , 
    GroupNode ,
    InlineNode , 
    SupportNode , 
    StructNode, 
    is_styled,  
} from "./elements"
import { text_prototype , paragraph_prototype , inline_prototype , group_prototype , struct_prototype, support_prototype , } from "./elements"

export {EditorCore , InlineStyle, GroupStyle , StructStyle , SupportStyle , AbstractStyle}
export type { Style }

type RootNotification_Function = (new_root: GroupNode)=>void

/** 将样式类型映射为节点类型。 */
interface StyleType2NodeType{
    inline: InlineNode
    group: GroupNode
    struct: StructNode
    support: SupportNode
    abstract: GroupNode
}

/** 描述一个抽象的编辑器，维护节点树和使用的样式 
 * `EditorCore`可以接受一系列『通知函数』，当节点树改变时进行广播。
 */
class EditorCore{

    /** 
     * 这个编辑器所使用的所有样式。 
     * 用类型+名称来检索。
     */
    styles: { [ST in StyleType]: {[name: string]: Style<ST> } }
    
    /** 当树结构改变时需要通知谁。 */
    notifications: {[key: string] : RootNotification_Function}

    /**
     * @param styles 初始的样式列表。
     * @param root_parameters 根节点的参数列表。
     */
    constructor(styles: Style<StyleType>[] ){
        this.styles = {
            "inline": {},
            "group": {}, 
            "struct": {},
            "support": {} ,  
            "abstract": {} , 
        }
        
        for(let style of styles){
            this.add_style(style)
        }

        this.notifications = {} // 当root修改时要通知的人的列表
    }

    /** 添加一个通知函数。 */
    public add_notificatioon(notif: RootNotification_Function , key: string){
        this.notifications[key] = notif
    }
    /** 删除一个通知函数。 */
    public remove_notificatioon(key: string){
        delete this.notifications[key]
    }

    /** 添加一个样式。 */
    public add_style<ST extends StyleType>(style: Style<ST>){
        (this.styles[style.type] as {[name: string]: Style<ST>})[style.name] = style // 日了狗了。
    }

    /** 获得一个样式。 */
    public get_style<ST extends StyleType>(type: ST, name: string): Style<ST>{
        return this.styles[type][name] as Style<ST>
    }
}

/** 一个样式的接口。 */
interface Style<ST extends StyleType>{

    /** 这个样式的类型。 */
    type: ST

    /** 这个样式的名称。 */
    name: string

    /** 这个样式的参数原型。 */
    parameter_prototype: ValidParameter , 

    /** 这个样式的参数注释 */
    parameter_labels?: ValidParameter<string> , 

    /** 这个样式的`flags`。 */
    flags: StyledNodeFlag , 

    /** 新建一个这个样式的节点。 */
    makenode?: () => StyleType2NodeType[ST]

    /** 如果这是一个抽象节点，那这个函数就是新建一个抽象节点。 */
    makehidden?: () => GroupNode
}


/** 描述一个内联样式的类。 */
class InlineStyle implements Style<"inline">{
    type: "inline" = "inline"
    name: string
    parameter_prototype: ValidParameter 
    flags: StyledNodeFlag
    makenode: ()=>InlineNode
    parameter_labels: ValidParameter<string>
    constructor(
        name: string , 
        parameter_prototype: ValidParameter , 
        parameter_labels: ValidParameter<string> = {} , 
        flags: StyledNodeFlag = {}, 
    ){
        this.name = name
        this.parameter_prototype = parameter_prototype
        this.flags = flags
        this.parameter_labels = parameter_labels
        this.makenode = ()=>inline_prototype(name , parameter_prototype , flags)
    }
}


/** 描述一个内段组样式的类。 */
class GroupStyle implements Style<"group">{
    type: "group" = "group"
    name: string
    parameter_prototype: ValidParameter 
    flags: StyledNodeFlag
    makenode: ()=>GroupNode
    parameter_labels: ValidParameter<string>
    constructor(
        name: string , 
        parameter_prototype: ValidParameter , 
        parameter_labels: ValidParameter<string> = {} , 
        flags: StyledNodeFlag = {}, 
    ){
        this.name = name
        this.parameter_prototype = parameter_prototype
        this.flags = flags
        this.parameter_labels = parameter_labels
        this.makenode = ()=>group_prototype(name , parameter_prototype , flags)
    }
}


/** 描述一个结构样式的类。 */
class StructStyle implements Style<"struct">{
    type: "struct" = "struct"
    name: string
    parameter_prototype: ValidParameter 
    flags: StyledNodeFlag
    makenode: ()=>StructNode
    parameter_labels: ValidParameter<string>
    constructor(
        name: string , 
        parameter_prototype: ValidParameter , 
        parameter_labels: ValidParameter<string> = {} , 
        flags: StyledNodeFlag = {}, 
    ){
        this.name = name
        this.parameter_prototype = parameter_prototype
        this.flags = flags
        this.parameter_labels = parameter_labels
        this.makenode = ()=>struct_prototype(name , parameter_prototype , flags)
    }
}


/** 描述一个辅助节点的类 */
class SupportStyle implements Style<"support">{
    type: "support" = "support"
    name: string
    parameter_prototype: ValidParameter 
    flags: StyledNodeFlag
    makenode: ()=>SupportNode
    parameter_labels: ValidParameter<string>
    constructor(
        name: string , 
        parameter_prototype: ValidParameter , 
        parameter_labels: ValidParameter<string> = {} , 
        flags: StyledNodeFlag = {}, 
    ){
        this.name = name
        this.parameter_prototype = parameter_prototype
        this.flags = flags
        this.parameter_labels = parameter_labels
        this.makenode = ()=>support_prototype(name , parameter_prototype , flags)
    }
}

/** 描述一个抽象节点的样式。注意抽象节点不使用makenode()而是makehidden() */
class AbstractStyle implements Style<"abstract">{
    type: "abstract" = "abstract"
    name: string
    parameter_prototype: ValidParameter 
    flags: StyledNodeFlag
    makehidden: () => GroupNode
    parameter_labels: ValidParameter<string>
    constructor(name: string , parameter_prototype: ValidParameter , parameter_labels: ValidParameter<string> = {}){
        this.name = name
        this.parameter_prototype = parameter_prototype
        this.parameter_labels = parameter_labels
        this.flags = {}
        
        this.makehidden = ()=>group_prototype(name , parameter_prototype)  
    }
}
