import * as O from "./printers"
import * as E from "./editors"
import * as S from  "./styles"
import { YEditor } from "../../../../lib"
import { Printer , EditorCore } from  "../../../../lib"
import { GroupStyle , InlineStyle , AbstractStyle , SupportStyle , StructStyle , } from "../../../../lib"
import type { EditorRenderer_Func , PrinterRenderer , } from "../../../../lib"

export {withNecessaryStyle , make_new_style , apply_style , withNecessaryEditor , withNecessaryPrinter}

var type2class = {
    group: GroupStyle , 
    inline: InlineStyle , 
    abstract: AbstractStyle , 
    support: SupportStyle , 
    struct: StructStyle , 
}

var style_editor_printer: {
    [key: string]: [GroupStyle | InlineStyle | AbstractStyle | SupportStyle | StructStyle , any , any]
} = {
    [S.brightwords_style.name]  : [S.brightwords_style  , E.brightwords_editor  , O.brightwords_printer] , 
    [S.followwords_style.name]  : [S.followwords_style  , E.followwords_editor  , O.followwords_printer] , 
    [S.mount_style.name]        : [S.mount_style        , E.mount_editor        , O.mount_printer] , 
    [S.display_style.name]      : [S.display_style      , E.display_editor      , O.display_printer] , 
    [S.dimwords_style.name]     : [S.dimwords_style     , undefined             , undefined] , 
    [S.newpara_style.name]      : [S.newpara_style      , E.newpara_editor      , undefined] , 
    [S.sectioner_style.name]    : [S.sectioner_style    , E.sectioner_editor    , O.sectioner_printer] , 
    [S.ender_style.name]        : [S.ender_style        , E.ender_editor        , O.ender_printer] , 
    [S.strong_style.name]       : [S.strong_style       , E.strong_editor       , O.strong_printer] , 
    [S.normalwords_style.name]  : [S.normalwords_style  , E.normalwords_editor  , O.normalwords_printer] , 
    [S.alignedwords_style.name] : [S.alignedwords_style , E.alignedwords_editor , O.alignedwords_printer] , 
    [S.image_style.name]        : [S.image_style        , E.image_editor        , O.image_printer] , 
    [S.delete_style.name]       : [S.delete_style       , E.delete_editor       , O.delete_printer] , 
    [S.link_style.name]         : [S.link_style         , E.link_editor         , O.link_printer] , 
    [S.list_style.name]         : [S.list_style         , E.list_editor         , O.list_printer] , 
}

function make_new_style(meta_name:string , name: string , fixed_params: any, default_params: any , extra_params: any){
    let [meta_style , meta_editor , meta_printer] = style_editor_printer[meta_name]
    let meta_type = type2class[meta_style.type]
    
    let parameters = {...meta_style.parameter_prototype , ...fixed_params , ...default_params , ...extra_params}
    let flags = meta_style.flags 

    let style = new meta_type(name , parameters , flags)

    return [style , meta_editor , meta_printer]
}

function apply_style(
    core:EditorCore , 
    editor: YEditor , 
    printer: Printer , 
    style: any , 
    style_editor: EditorRenderer_Func , 
    style_printer: PrinterRenderer , 
): [EditorCore , YEditor , Printer]{
    core.add_style(style)
    editor.update_renderer (style_editor  , style.type , style.name)
    printer.update_renderer(style_printer , style.type , style.name)
    return [core , editor , printer]
}

function withNecessaryStyle(core: EditorCore): EditorCore{
    core.add_style(S.newpara_style      )
    core.add_style(S.sectioner_style    )
    core.add_style(S.ender_style        )
    return core
}

function withNecessaryEditor(editor: YEditor): YEditor{
    editor.update_renderer(E.paragraph_editor      , "paragraph" )
    
    editor.update_renderer(E.newpara_editor       , "support"  , S.newpara_style.name)
    editor.update_renderer(E.sectioner_editor     , "support"  , S.sectioner_style.name)
    editor.update_renderer(E.ender_editor         , "support"  , S.ender_style.name)
    return editor
}
function withNecessaryPrinter(printer: Printer): Printer{
    printer.update_renderer(O.paragraph_printer      , "paragraph")
    
    printer.update_renderer(O.space_printer         , "support"  , S.newpara_style.name)
    printer.update_renderer(O.sectioner_printer     , "support"  , S.sectioner_style.name)
    printer.update_renderer(O.ender_printer         , "support"  , S.ender_style.name)
    return printer
}


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
