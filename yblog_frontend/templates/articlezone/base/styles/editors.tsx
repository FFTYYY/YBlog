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
    get_param_val , 
} from "../../../../lib"
import { Interaction , url_from_root } from "../interaction"


export { 
    brightwords_editor , 
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
var subsection_editor   = get_DefaultGroupEditor_with_AppBar({get_label: (n)=>`次节：${get_param_val(n,"title")}`})
var normalwords_editor  = get_DefaultGroupEditor_with_RightBar({})
var formatted_editor    = get_DefaultGroupEditor_with_RightBar({})
var followwords_editor  = get_DefaultGroupEditor_with_RightBar({})
var mount_editor        = get_DefaultGroupEditor_with_RightBar({})
var display_editor      = get_DefaultGroupEditor_with_RightBar({})
var mathblock_editor    = get_DefaultGroupEditor_with_RightBar({
    rightbar_extra: (props) => {/** 在右侧提供一个用于快速输入退出符号的文本框。 */
        let universal_props = {variant: "standard" as "standard" , sx: {width: "2rem" , marginBottom: "0.5rem" , hright: "1rem"}}
        let label = <Typography sx={{fontSize: "0.7rem"}}>extra</Typography>
        let suffix_default = get_param_val(props.element , "suffix") // 注意，这里假设close必不用代理。
        return <React.Fragment>
            <TextField {...universal_props} label={label} defaultValue={suffix_default} onChange = {(e)=>{
                let val = e.target.value
                let node = props.element
                props.editor.auto_set_parameter( node , {suffix: {type: "string" , val: val}})
            }}/>
        </ React.Fragment>
    }
})
let subwords_editor     = get_DefaultGroupEditor_with_RightBar({})

var newpara_editor      = DefaultNewParagraphEditor
var sectioner_editor    = get_DefaultSplitterEditor({get_title: (n) => get_param_val(n,"title") as string})
var ender_editor        = get_DefaultSplitterEditor({get_title: () => "章节"})


var strong_editor       = get_DefaultInlineEditor({})
var delete_editor       = get_DefaultInlineEditor({surrounder: (props)=><del>{props.children}</del>  })
var link_editor         = get_DefaultInlineEditor({surrounder: (props)=><u>{props.children}</u>      })
var mathinline_editor   = get_DefaultInlineEditor({surrounder: (props)=><>{props.children}</>        })


var image_editor = get_DefaultDisplayerEditor({
    get_label: ()=>"图片" , 
    is_empty: (n)=>!!get_param_val(n , "target") , 
    render_element: (props) => {
        let [ url , set_url ] = React.useState("")
        let target = get_param_val(props.element , "target") as string
        let type = get_param_val(props.element , "type")

        React.useEffect(()=>{(async ()=>{
            if(type == "internal"){
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

        let p_width = get_param_val(props.element , "width")
        let p_height = get_param_val(props.element , "height")

        return <img src={url || undefined } style={{
            width: p_width > 0 ? `${p_width}rem` : "100%", 
            height: p_height > 0 ? `${p_height}rem` : "100%" , 
        }}/>
    } , 
})

var alignedwords_editor = get_DefaultStructEditor_with_RightBar({
    get_label: (n)=>get_param_val(n,"label") as string, 
    get_widths: (num,node)=>{
        return (get_param_val(node , "widths") as string).split(",").map(x=>x=="" ? 1 : parseInt(x))
    }
})




