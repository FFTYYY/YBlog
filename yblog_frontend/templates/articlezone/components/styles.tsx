import { GroupStyle , new_default_group , AbstractStyle , newparagraph , new_splitter , new_default_iniline} from "../../../lib"
import { SupportNode , paragraph_prototype} from "../../../lib"
import { SupportStyle , EditorCore} from "../../../lib"
import type { EditorRenderer_Func , EditorRenderer_Props } from "../../../lib"
import { YEditor } from "../../../lib"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Transforms , Node } from "slate"
import { non_selectable_prop , is_same_node} from"../../../lib"
import { node2path } from "../../../lib"
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import Grid         from "@mui/material/Grid"

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
export { 
    brightwords_erenderer , 
    followwords_erenderer , 
    mount_erenderer , 
    display_erenderer , 
    newpara_erenderer , 
    sectioner_erenderer , 
    ender_erenderer , 
    strong_erenderer , 
}

var [brightwords_style , brightwords_erenderer] = new_default_group("昭言" , {
    title: "昭言" , 
    alias: "" , 
})

var [followwords_style , followwords_erenderer] = new_default_group( "随言" , {
    title: "随言" , 
})

var dimwords_style = new AbstractStyle("穆言" , {})

var [ mount_style , mount_erenderer] = new_default_group( "裱示" , {
    title: "裱示" , 
})

var [ display_style , display_erenderer] = new_default_group("彰示" , {
    title: "彰示" , 
})

var [newpara_style , newpara_erenderer] = newparagraph("新段")

var [sectioner_style , sectioner_erenderer] = new_splitter("小节线" , {
    title: "" ,
})

var [ender_style , ender_erenderer] = new_splitter("章节线" , {
    title: "" ,
})

var [strong_style , strong_erenderer] = new_default_iniline("强调")