import { GroupStyle , InlineStyle , AbstractStyle , SupportStyle , StructStyle } from "../../../../lib"

export { 
    brightwords_style , 
    followwords_style , 
    dimwords_style , 
    mount_style , 
    display_style , 
    newpara_style , 
    sectioner_style , 
    ender_style , 
    strong_style , 
    normalwords_style , 
    image_style , 
    alignedwords_style , 
    delete_style , 
    link_style , 
    subwords_style , 
    mathinline_style , 
    mathblock_style ,
    formatted_style , 
}

var brightwords_style = new GroupStyle   ("昭言"   , { title: "昭言" , alias: "" })
var normalwords_style = new GroupStyle   ("常言"   , { label: "常言" , order: false , starting: "" , ending: "" })
var followwords_style = new GroupStyle   ("随言"   , { label: "随言" , enter: "" , exit: "" })
var alignedwords_style= new StructStyle  ("齐言"   , { label: "齐言" , widths: "1"})
let subwords_style    = new GroupStyle   ("属言"   , { label: "属言" , order: true})
var mount_style       = new GroupStyle   ("裱示"   , { label: "裱示" , enter: "" , exit: "" })
var display_style     = new GroupStyle   ("彰示"   , { label: "彰示" , })
var formatted_style   = new GroupStyle   ("格示"   , { label: "格示" , format: ""})
var newpara_style     = new SupportStyle ("新段"   , {})
var sectioner_style   = new SupportStyle ("小节线" , { title: "" , alone: false , })
var ender_style       = new SupportStyle ("章节线" , {})
var strong_style      = new InlineStyle  ("强调"   , { label: "强调" })
var delete_style      = new InlineStyle  ("刊调"   , { label: "刊调" })
let link_style        = new InlineStyle  ("链调"   , { target: "" , index: false})
var image_style       = new SupportStyle ("图调"   , { label: "图片" , target: "" , internal: true , width: 10 , height: -1} , {forceInline: true})
var dimwords_style    = new AbstractStyle("穆言"   , {})
var mathinline_style  = new InlineStyle  ("数学调" , { label: "数学"})
var mathblock_style   = new GroupStyle   ("数学言" , { label: "数学" , exit: "", environ: "align"})

