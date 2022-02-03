import { GroupStyle , new_default_group , AbstractStyle} from "@ftyyy/ytext"

export { brightwords_style , followwords_style , dimwords_style , mount_style , display_style }
export { brightwords_erenderer , followwords_erenderer , mount_erenderer , display_erenderer }

var [brightwords_style , brightwords_erenderer] = new_default_group(
    "昭言" , 
    {
        title: "昭言" , 
        alias: "" , 
    } , 
)

var [followwords_style , followwords_erenderer] = new_default_group(
    "随言" , 
    {
        title: "随言" , 
    } , 
)

var dimwords_style = new AbstractStyle("穆言" , {})

var [ mount_style , mount_erenderer] = new_default_group(
    "裱示" , 
    {
        title: "裱示" , 
    } , 
)
var [ display_style , display_erenderer] = new_default_group(
    "彰示" , 
    {
        title: "彰示" , 
    } , 
)

