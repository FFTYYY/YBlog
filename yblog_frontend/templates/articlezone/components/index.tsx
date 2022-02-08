import * as O from "./output_renderer"
import * as E from "./interface_renderer"
import * as S from  "./styles"
import { YEditor } from "../../../lib"
import { OutRenderer , EditorCore } from  "../../../lib"

export {withAllStyles_Editor , withAllStyles_Output , withAllStyles_Interface}

function withAllStyles_Editor(core:EditorCore): EditorCore{
    core.add_groupstyle(S.brightwords_style)
    core.add_groupstyle(S.followwords_style)
    core.add_groupstyle(S.mount_style)
    core.add_groupstyle(S.display_style)
    core.add_abstractstyle(S.dimwords_style)
    core.add_supportstyle(S.newpara_style)
    core.add_supportstyle(S.sectioner_style)
    core.add_supportstyle(S.ender_style)
    core.add_inlinestyle(S.strong_style)
    return core
}

function withAllStyles_Interface(yeditor: YEditor): YEditor{
    yeditor.update_renderer(E.brightwords_erenderer   , "group" , S.brightwords_style.name)
    yeditor.update_renderer(E.followwords_erenderer   , "group" , S.followwords_style.name)
    yeditor.update_renderer(E.mount_erenderer         , "group" , S.mount_style.name)
    yeditor.update_renderer(E.display_erenderer       , "group" , S.display_style.name)
    yeditor.update_renderer(E.newpara_erenderer       , "support" , S.newpara_style.name)
    yeditor.update_renderer(E.sectioner_erenderer     , "support" , S.sectioner_style.name)
    yeditor.update_renderer(E.ender_erenderer         , "support" , S.ender_style.name)
    yeditor.update_renderer(E.strong_erenderer        , "inline" , S.strong_style.name)
    return yeditor
}


function withAllStyles_Output(output_renderer: OutRenderer): OutRenderer{
    output_renderer.update_renderer( O.brightwords_orenderer  , "group" , S.brightwords_style.name )
    output_renderer.update_renderer( O.followwords_orenderer  , "group" , S.followwords_style.name )
    output_renderer.update_renderer( O.mount_orenderer        , "group" , S.mount_style.name )
    output_renderer.update_renderer( O.display_orenderer      , "group" , S.display_style.name )
    output_renderer.update_renderer( O.sectioner_orenderer    , "support" , S.sectioner_style.name)
    output_renderer.update_renderer( O.ender_orenderer        , "support" , S.ender_style.name)

    return output_renderer
}
