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

    EditorUnselecableBox , 
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
    subwords_editor , 
    mathblock_editor , 
    mathinline_editor , 
    formatted_editor , 
    subsection_editor , 
} 

var paragraph_editor = DefaultParagraphEditor

var brightwords_editor  = get_DefaultGroupEditor_with_AppBar({})
var subsection_editor   = get_DefaultGroupEditor_with_AppBar({get_label: (p)=>`次节：${p.title}`})
var normalwords_editor  = get_DefaultGroupEditor_with_RightBar({})
var formatted_editor    = get_DefaultGroupEditor_with_RightBar({})
var followwords_editor  = get_DefaultGroupEditor_with_RightBar({})
var mount_editor        = get_DefaultGroupEditor_with_RightBar({})
var display_editor      = get_DefaultGroupEditor_with_RightBar({})
var mathblock_editor    = get_DefaultGroupEditor_with_RightBar({
    rightbar_extra: (props) => {/** 在右侧提供一个用于快速输入退出符号的文本框。 */
        let universal_props = {variant: "standard" as "standard" , sx: {width: "2rem"}}
        let label = <Typography sx={{fontSize: "0.7rem"}}>extra</Typography>
        let exit_default = props.element.parameters.exit.val || "" // 注意，这里假设exit必不用代理。
        return <React.Fragment>
            <TextField {...universal_props} label={label} defaultValue={exit_default} onChange = {(e)=>{
                let val = e.target.value
                let node = props.element
                props.editor.set_node( node , {parameters: {...node.parameters, exit: {type: "string" , val: val}}})
            }}/>
        </ React.Fragment>
    }
})
let subwords_editor     = get_DefaultGroupEditor_with_RightBar({})

var newpara_editor      = DefaultNewParagraphEditor
var sectioner_editor    = get_DefaultSplitterEditor({get_title: (p) => p.title})
var ender_editor        = get_DefaultSplitterEditor({get_title: () => "章节"})


var strong_editor       = get_DefaultInlineEditor({})
var delete_editor       = get_DefaultInlineEditor({surrounder: (props)=><del>{props.children}</del>  })
var link_editor         = get_DefaultInlineEditor({surrounder: (props)=><u>{props.children}</u>      })
var mathinline_editor   = get_DefaultInlineEditor({surrounder: (props)=><>{props.children}</>        })


var image_editor = get_DefaultDisplayerEditor({
    get_label: ()=>"图片" , 
    is_empty: (p)=>!!(p.target) , 
    render_element: (props) => {
        let p = props.parameters
        let [ url , set_url ] = React.useState("")
        let target = p.target.val as string

        React.useEffect(()=>{(async ()=>{
            if(p.internal){
                let resource_info = await Interaction.get.resource_info(target)
                if(!resource_info.url){
                    set_url("")
                }
                else{
                    set_url(url_from_root(resource_info.url))
                }
                // 其实直接`set_url(resource_info.url)`也行，套一层`url_from_root`主要是为了调试方便。
            }
            else{
                set_url(target)
            }
        })()})


        let width = p.width.val > 0 ? `${p.width}rem` : "100%"
        let height = p.height.val > 0 ? `${p.height}rem` : "100%"
        return <img src={url || undefined } style={{
            width: width, 
            height: height , 
        }}/>
    } , 
})

var alignedwords_editor = get_DefaultStructEditor_with_RightBar({
    get_label: (p)=>p.label.val as string, 
    get_widths: (n,p)=>{
        return p.widths.split(",").map(x=>x=="" ? 1 : parseInt(x))
    }
})




