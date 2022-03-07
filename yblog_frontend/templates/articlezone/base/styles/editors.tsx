import { Typography  , TextField } from "@mui/material"
import React from "react"
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

    set_node , 
} from "../../../../lib"
import { Interaction , url_from_root } from "../interaction"


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
    mathblock_editor , 
    mathinline_editor , 
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

var strong_editor = get_DefaultInlineEditor(  (p)=>p.label )

var paragraph_editor = DefaultParagraphEditor

var image_editor = get_DefaultDisplayerEditor(
    "图片" , 
    (parameters)=>!!(parameters.target) , 
    (props: {parameters: any}) => {
        let p = props.parameters
        let [ url , set_url ] = React.useState("")

        React.useEffect(()=>{(async ()=>{
            if(p.internal){
                let resource_info = await Interaction.get.resource_info(p.target)
                if(!resource_info.url){
                    set_url("")
                }
                else{
                    set_url(url_from_root(resource_info.url))
                }
                // 其实直接`set_url(resource_info.url)`也行，套一层`url_from_root`主要是为了调试方便。
            }
            else{
                set_url(p.target)
            }
        })()})


        let width = p.width > 0 ? `${p.width}rem` : "100%"
        let height = p.height > 0 ? `${p.height}rem` : "100%"
        return <img src={url || undefined } style={{
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


var delete_editor      = get_DefaultInlineEditor((p)=>p.label , (props)=><del>{props.children}</del>)
var link_editor        = get_DefaultInlineEditor((p)=>p.label , (props)=><u>{props.children}</u>)
var mathinline_editor  = get_DefaultInlineEditor((p)=>p.label , (props)=><u>{props.children}</u>)

let list_editor        = get_DefaultGroupEditor_with_RightBar( (p)=>p.label )


var mathblock_editor = get_DefaultGroupEditor_with_RightBar(
    (parameters) => parameters.label , 

    /** 在右侧提供一个用于快速输入退出符号的文本框。 */
    (props) => {
        let universal_props = {variant: "standard" as "standard" , sx: {width: "2rem"}}
        let label = <Typography sx={{fontSize: "0.7rem"}}>extra</Typography>
        let exit_default = props.element.parameters.exit || ""
        return <React.Fragment>
            <TextField {...universal_props} label={label} defaultValue={exit_default} onChange = {(e)=>{
                let val = e.target.value
                let node = props.element
                set_node(props.editor , node , {parameters: {...node.parameters, exit: val}})
            }}/>
        </React.Fragment>
    }  , 
)
