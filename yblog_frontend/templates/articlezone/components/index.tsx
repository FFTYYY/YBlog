import { brightwords_erenderer } from "./interface_renderer"
import { brightwords_orenderer } from "./output_renderer"
import { brightwords_style } from  "./styles"
import { YEditor } from "@ftyyy/ytext"
import { OutRenderer , EditorCore } from  "@ftyyy/ytext"

export {withAllStyles_Editor , withAllStyles_Output , withAllStyles_Interface}

function withAllStyles_Editor(core:EditorCore): EditorCore{
    core.add_groupstyle(brightwords_style)
    return core
}

function withAllStyles_Interface(yeditor: YEditor): YEditor{
    yeditor.update_renderer(brightwords_erenderer , "group" , "昭言")
    return yeditor
}


function withAllStyles_Output(output_renderer: OutRenderer): OutRenderer{
    output_renderer.update_renderer( brightwords_orenderer, "group" , "昭言" )
    return output_renderer
}
