import * as O from "./printers"
import * as E from "./editors"
import * as S from  "./styles"
import { YEditor , StyleCollector } from "../../../../lib"
import { EditorCore , Proxy } from  "../../../../lib"
import { GroupStyle , InlineStyle , AbstractStyle , SupportStyle , StructStyle , StyleType } from "../../../../lib"
import type { EditorRenderer_Func , PrinterRenderer } from "../../../../lib"

export { withAllStyles , withAllPrinters , withAllEditors , make_proxy , withNecessaryProxies }

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
    [S.subwords_style.name]     : [S.subwords_style     , E.subwords_editor     , O.subwords_printer] , 
    [S.mathinline_style.name]   : [S.mathinline_style   , E.mathinline_editor   , O.mathinline_printer] , 
    [S.mathblock_style.name]    : [S.mathblock_style    , E.mathblock_editor    , O.mathblock_printer] , 
    [S.formatted_style.name]    : [S.formatted_style    , E.formatted_editor    , O.formatted_printer] , 
    [S.subsection_style.name]   : [S.subsection_style   , E.subsection_editor   , O.subsection_printer] , 
}

function withAllStyles(core:EditorCore): EditorCore{
    for(let name in style_editor_printer){
        let style = style_editor_printer[name][0]
        core.add_style(style)
    }
    return core
}
function withAllPrinters(printer: StyleCollector<PrinterRenderer>): StyleCollector<PrinterRenderer>{
    for(let name in style_editor_printer){
        let style = style_editor_printer[name][0]
        if(style.type == "abstract"){
            continue
        }
        let printer_func = style_editor_printer[name][2]
        printer.set(printer_func , style.type , style.name)
    }
    printer.set( O.paragraph_printer , "paragraph" )
    return printer
}
function withAllEditors(editor: StyleCollector<EditorRenderer_Func>): StyleCollector<EditorRenderer_Func>{
    for(let name in style_editor_printer){
        let style = style_editor_printer[name][0]
        if(style.type == "abstract"){
            continue
        }
        let editor_func = style_editor_printer[name][1]
        editor.set(editor_func , style.type , style.name)
    }

    editor.set( E.paragraph_editor , "paragraph" )
    return editor
}

function withNecessaryProxies(proxies: {[key in StyleType]: {[name: string]: Proxy}}){
    proxies["support"][S.newpara_style.name] = make_proxy(S.newpara_style.name , S.newpara_style.name , {} , {})
    proxies["support"][S.sectioner_style.name] = make_proxy(S.sectioner_style.name , S.sectioner_style.name , {} , {})
    proxies["support"][S.ender_style.name] = make_proxy(S.ender_style.name , S.ender_style.name , {} , {})
    proxies["group"][S.subsection_style.name] = make_proxy(S.subsection_style.name , S.subsection_style.name , {} , {})
    return proxies
}



function make_proxy(meta_name:string , name: string , fixed_params: any, default_params: any){
    let [meta_style , meta_editor , meta_printer] = style_editor_printer[meta_name]
    let proxy = new Proxy(name , meta_style , fixed_params , default_params)
    return proxy
}


// function make_new_style(meta_name:string , proxy_name: string , fixed_params: any, default_params: any){
//     let [meta_style , meta_editor , meta_printer] = style_editor_printer[meta_name]
//     let meta_type = type2class[meta_style.type]
    
//     let parameters = {...meta_style.parameter_prototype , ...default_params} // TODO 使用 fixed_params
//     let parameter_labels = meta_style.parameter_labels
//     let flags = meta_style.flags 

//     let style = new meta_type(meta_name , parameters , parameter_labels , flags)
//     style.proxy = name

//     return [style , meta_editor , meta_printer]
// }

// function apply_style(
//     core:EditorCore , 
//     editor: YEditor , 
//     printer: Printer , 
//     style: any , 
//     style_editor: EditorRenderer_Func , 
//     style_printer: PrinterRenderer , 
// ): [EditorCore , YEditor , Printer]{
//     core.add_style(style)
//     editor.update_renderer (style_editor  , style.type , style.name)
//     printer.update_renderer(style_printer , style.type , style.name)
//     return [core , editor , printer]
// }
