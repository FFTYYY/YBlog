import { GroupStyle , InlineStyle , AbstractStyle , SupportStyle } from "../../../lib"

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
}

var brightwords_style = new GroupStyle   ("昭言"   , { title: "昭言" , alias: "" , })
var followwords_style = new GroupStyle   ("随言"   , {})
var mount_style       = new GroupStyle   ("裱示"   , {})
var display_style     = new GroupStyle   ("彰示"   , {})
var newpara_style     = new SupportStyle ("新段"   , {})
var sectioner_style   = new SupportStyle ("小节线" , { title: "" })
var ender_style       = new SupportStyle ("章节线" , {})
var strong_style      = new InlineStyle  ("强调"   , {})
var dimwords_style    = new AbstractStyle("穆言"   , {})

