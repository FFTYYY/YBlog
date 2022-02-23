/** 
 * 这个文件定义一个抽象的编辑器，描述了一个编辑器可以使用的所有样式，以及具体的节点树。
 * 注意，这个文件只描述抽象的样式，不涉及具体如何渲染。
 * @module
*/

import { Node } from "slate"
import type { 
    StyleType , 
    StyledNodeFlag , 
    ValidParameter ,

    StyledNode , 
    GroupNode ,
    InlineNode , 
    SupportNode , 
    StructNode ,  
} from "./elements"
import { text_prototype , paragraph_prototype , inline_prototype , group_prototype , struct_prototype, support_prototype , } from "./elements"

export {EditorCore , InlineStyle , GroupStyle , StructStyle , SupportStyle , AbstractStyle}

type RootNotification_Function = (new_root: GroupNode)=>void

/** 将样式类型映射为节点类型。 */
interface StyleType2NodeType{
    inline: InlineNode
    group: GroupNode
    struct: StructNode
    support: SupportNode
    abstract: Node
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
    
    /** 这个文档的具体的树结构。 */
    root: GroupNode

    /** 当树结构改变时需要通知谁。 */
    notifications: RootNotification_Function[]

    /**
     * @param styles 初始的样式列表。
     * @param root_parameters 根节点的参数列表。
     */
    constructor(styles: Style<StyleType>[] , root_parameters: ValidParameter){
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

        this.root = group_prototype("root" , root_parameters) //节点树
        this.notifications = [] // 当root修改时要通知的人的列表
    }

    /** 
     * 这个函数直接修改`root.children`。
     * 等价于`update_root({children: children})`。
     */
    public update_children(children: Node[]){
        return this.update_root({children: children})
    }

    /** 
     * 这个函数是外部改变 root 的唯一方式。 
     */
    public update_root(new_root: any){
        this.root = {...this.root, ...new_root}
        for(let notif of this.notifications)
            notif(this.root)
    }

    /** 添加一个通知函数。 */
    public add_notificatioon(notif: RootNotification_Function){
        this.notifications.push(notif)
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
    constructor(name: string , parameter_prototype: any , flags: StyledNodeFlag = {}){
        this.name = name
        this.parameter_prototype = parameter_prototype
        this.flags = flags
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
    constructor(name: string , parameter_prototype: any , flags: StyledNodeFlag = {}){
        this.name = name
        this.parameter_prototype = parameter_prototype
        this.flags = flags
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
    constructor(name: string , parameter_prototype: any , flags: StyledNodeFlag = {}){
        this.name = name
        this.parameter_prototype = parameter_prototype
        this.flags = flags
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
    constructor(name: string , parameter_prototype: any , flags: StyledNodeFlag = {}){
        this.name = name
        this.parameter_prototype = parameter_prototype
        this.flags = flags
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

    constructor(name: string , parameter_prototype: any){
        this.name = name
        this.parameter_prototype = parameter_prototype
        this.flags = {}
        
        this.makehidden = ()=>group_prototype(name , parameter_prototype)  
    }
}
