import { Node } from "slate"

import {
    get_DefaultGroupEditor_with_AppBar , 
    get_DefaultGroupEditor_with_RightBar , 
    get_DefaultInlineEditor , 
    DefaultNewParagraphEditor , 
    get_DefaultSplitterEditor , 
    get_DefaultDisplayerEditor , 
    DefaultParagraphEditor , 
    get_DefaultStructEditor_with_RightBar , 
    YEditor , 
} from "../../../lib"


export { 
    brightwords_editor , 
    normalwords_editor , 
    followwords_editor , 
    mount_editor , 
    display_editor , 
    newpara_editor , 
    sectioner_editor , 
    ender_editor , 
    strong_editor , 
    paragraph_editor , 
    image_editor , 
    alignedwords_editor , 
    delete_editor , 
    link_editor , 
    list_editor , 
} 

var brightwords_editor = get_DefaultGroupEditor_with_AppBar( 
    (parameters) => parameters.title
)


var normalwords_editor = get_DefaultGroupEditor_with_RightBar(
    (parameters) => parameters.label
)

var followwords_editor = get_DefaultGroupEditor_with_RightBar(
    (parameters) => parameters.label
)

var mount_editor = get_DefaultGroupEditor_with_RightBar(
    (parameters) => parameters.label
)

var display_editor = get_DefaultGroupEditor_with_RightBar(
    (parameters) => parameters.label
)

var newpara_editor = DefaultNewParagraphEditor
var sectioner_editor = get_DefaultSplitterEditor(
    (parameters) => parameters.title
)
var ender_editor = get_DefaultSplitterEditor(
    (parameters) => "章节"
)

var strong_editor = get_DefaultInlineEditor()

var paragraph_editor = DefaultParagraphEditor

var image_editor = get_DefaultDisplayerEditor(
    "图片" , 
    (parameters)=>!!(parameters.url) , 
    (props: {parameters: any}) => {
        let p = props.parameters
        let width = p.width > 0 ? `${p.width}rem` : "100%"
        let height = p.height > 0 ? `${p.height}rem` : "100%"
        return <img src={p.url} style={{
            width: width, 
            height: height , 
        }}/>
    }
)

var alignedwords_editor = get_DefaultStructEditor_with_RightBar(
    (p)=>p.title , 
    (n,p)=>{
        return p.widths.split(",").map(x=>x=="" ? 1 : parseInt(x))
    }
)


var delete_editor      = get_DefaultInlineEditor("刊调" , (props)=><del>{props.children}</del>)
var link_editor        = get_DefaultInlineEditor("链调" , (props)=><u>{props.children}</u>)

let list_editor        = get_DefaultGroupEditor_with_RightBar( (p)=>p.label )