import { brightwords_erenderer } from "./interface_renderer"
import { brightwords_orenderer } from "./output_renderer"
import { brightwords_style } from  "./styles"
import { YEditor } from "@ftyyy/ytext"
import { OutRenderer } from "@ftyyy/ytext"

export {withAllStyles_Editor , withAllStyles_Output}

function withAllStyles_Editor(yeditor:YEditor){
    yeditor.core.add_groupstyle(brightwords_style)
    yeditor.update_renderer(brightwords_erenderer , "group" , "昭言")

}

function withAllStyles_Output(output_renderer: OutRenderer){
    output_renderer.update_renderer( brightwords_orenderer, "group" , "昭言" )
}
