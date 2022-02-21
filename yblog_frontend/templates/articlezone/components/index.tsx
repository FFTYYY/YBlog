import * as O from "./printers"
import * as E from "./editors"
import * as S from  "./styles"
import { YEditor } from "../../../lib"
import { Printer , EditorCore } from  "../../../lib"

export {withAllStyles , withAllEditors , withAllPrinters}

function withAllStyles(core:EditorCore): EditorCore{
    core.add_style(S.brightwords_style  )
    core.add_style(S.followwords_style  )
    core.add_style(S.mount_style        )
    core.add_style(S.display_style      )
    core.add_style(S.dimwords_style     )
    core.add_style(S.newpara_style      )
    core.add_style(S.sectioner_style    )
    core.add_style(S.ender_style        )
    core.add_style(S.strong_style       )
    return core
}

function withAllEditors(yeditor: YEditor): YEditor{
    yeditor.update_renderer(E.brightwords_editor   , "group"    , S.brightwords_style.name)
    yeditor.update_renderer(E.followwords_editor   , "group"    , S.followwords_style.name)
    yeditor.update_renderer(E.mount_editor         , "group"    , S.mount_style.name)
    yeditor.update_renderer(E.display_editor       , "group"    , S.display_style.name)
    yeditor.update_renderer(E.newpara_editor       , "support"  , S.newpara_style.name)
    yeditor.update_renderer(E.sectioner_editor     , "support"  , S.sectioner_style.name)
    yeditor.update_renderer(E.ender_editor         , "support"  , S.ender_style.name)
    yeditor.update_renderer(E.strong_editor        , "inline"   , S.strong_style.name)

    yeditor.update_renderer(E.paragraph_editor      , "paragraph" )

    return yeditor
}


function withAllPrinters(printer: Printer): Printer{
    printer.update_renderer(O.brightwords_printer   , "group"    , S.brightwords_style.name)
    printer.update_renderer(O.followwords_printer   , "group"    , S.followwords_style.name)
    printer.update_renderer(O.mount_printer         , "group"    , S.mount_style.name)
    printer.update_renderer(O.display_printer       , "group"    , S.display_style.name)
    printer.update_renderer(O.space_printer         , "support"  , S.newpara_style.name)
    printer.update_renderer(O.sectioner_printer     , "support"  , S.sectioner_style.name)
    printer.update_renderer(O.ender_printer         , "support"  , S.ender_style.name)
    printer.update_renderer(O.strong_printer        , "inline"   , S.strong_style.name)
    
    printer.update_renderer(O.paragraph_printer      , "paragraph")

    return printer
}
