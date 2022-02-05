import { brightwords_orenderer , followwords_orenderer , mount_orenderer , display_orenderer } from "./output_renderer"
import { brightwords_erenderer , followwords_erenderer , mount_erenderer , display_erenderer , newpara_erenderer } from "./interface_renderer"
import { brightwords_style , followwords_style , dimwords_style , mount_style , display_style , newpara_style } from  "./styles"
import { YEditor } from "../../../lib"
import { OutRenderer , EditorCore } from  "../../../lib"

export {withAllStyles_Editor , withAllStyles_Output , withAllStyles_Interface}

function withAllStyles_Editor(core:EditorCore): EditorCore{
    core.add_groupstyle(brightwords_style)
    core.add_groupstyle(followwords_style)
    core.add_groupstyle(mount_style)
    core.add_groupstyle(display_style)
    core.add_abstractstyle(dimwords_style)
    core.add_supportstyle(newpara_style)
    return core
}

function withAllStyles_Interface(yeditor: YEditor): YEditor{
    yeditor.update_renderer(brightwords_erenderer   , "group" , "昭言")
    yeditor.update_renderer(followwords_erenderer   , "group" , "随言")
    yeditor.update_renderer(mount_erenderer         , "group" , "裱示")
    yeditor.update_renderer(display_erenderer       , "group" , "彰示")
    yeditor.update_renderer(newpara_erenderer       , "support" , "新段")
    return yeditor
}


function withAllStyles_Output(output_renderer: OutRenderer): OutRenderer{
    output_renderer.update_renderer( brightwords_orenderer  , "group" , "昭言" )
    output_renderer.update_renderer( followwords_orenderer  , "group" , "随言" )
    output_renderer.update_renderer( mount_orenderer        , "group" , "裱示" )
    output_renderer.update_renderer( display_orenderer      , "group" , "彰示" )
    return output_renderer
}
