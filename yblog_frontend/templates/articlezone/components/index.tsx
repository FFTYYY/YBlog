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
    yeditor.update_renderer(E.brightwords_editor   , "group" , S.brightwords_style.name)
    yeditor.update_renderer(E.followwords_editor   , "group" , S.followwords_style.name)
    yeditor.update_renderer(E.mount_editor         , "group" , S.mount_style.name)
    yeditor.update_renderer(E.display_editor       , "group" , S.display_style.name)
    yeditor.update_renderer(E.newpara_editor       , "support" , S.newpara_style.name)
    yeditor.update_renderer(E.sectioner_editor     , "support" , S.sectioner_style.name)
    yeditor.update_renderer(E.ender_editor         , "support" , S.ender_style.name)
    yeditor.update_renderer(E.strong_editor        , "inline" , S.strong_style.name)
    return yeditor
}


function withAllStyles_Output(output_renderer: OutRenderer): OutRenderer{
    output_renderer.update_renderer( O.brightwords_renderer  , "group" , S.brightwords_style.name )
    output_renderer.update_renderer( O.followwords_renderer  , "group" , S.followwords_style.name )
    output_renderer.update_renderer( O.mount_renderer        , "group" , S.mount_style.name )
    output_renderer.update_renderer( O.display_renderer      , "group" , S.display_style.name )
    output_renderer.update_renderer( O.sectioner_renderer    , "support" , S.sectioner_style.name)
    output_renderer.update_renderer( O.ender_renderer        , "support" , S.ender_style.name)

    return output_renderer
}
