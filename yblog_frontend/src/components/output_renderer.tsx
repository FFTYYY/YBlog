import { OutRenderer_Props } from "@ftyyy/ytext"
import { Node } from "slate"
export {brightwords_orenderer}

function brightwords_orenderer(props: OutRenderer_Props){
    return <div {...props.attributes}>{props.children}</div>
}