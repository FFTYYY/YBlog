/** 这个模块为一般段落提供样式。 
 * module
*/
import {
    Grid , 
    Box , 
    Stack , 
    IconButton , 
    Typography , 
    Paper , 
} from "@mui/material"

import type { EditorRenderer_Func , EditorRenderer_Props } from "../../editor"
import { ParagraphBox , ComponentPaper} from "./basic"

export { DefaultParagraph }

function DefaultParagraph(props: EditorRenderer_Props){
    return <ParagraphBox>{props.children}</ParagraphBox>
}

