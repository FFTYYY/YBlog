import {
    PrinterRenderer,
    PrinterRenderFunctionProps,
    TextNode , 
} from "@ftyyy/ytext"

import {
    MathJaxFlusher
} from "../../construction"

export {my_useless_renderer_text}

let my_useless_renderer_text = new PrinterRenderer({
    renderer(props: PrinterRenderFunctionProps):React.ReactElement<PrinterRenderFunctionProps>{
        let node = props.node as TextNode
        return <span style={{whiteSpace: "normal"}}><MathJaxFlusher>{node.text}</MathJaxFlusher></span>
    }
})
