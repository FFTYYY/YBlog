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
import { 
    AllNodeTypes,
    ParagraphNode , 
    Node , 
    GroupNode , 
    InlineNode , 
    StructNode , 
    SupportNode , 
} from "../core"

import { EditorRenderer , EditorRendererProps } from "../editor"
import { 
    EditorParagraphBox as ParagraphBox , 
    EditorUnselecableBox as UnselecableBox, 
    EditorStructureTypography , 
    EditorComponentPaper as ComponentPaper , 
    EditorComponentEditingBox as ComponentEditorBox , 
} from "./uibase"

export { get_default_editors }

function get_default_block_editor<NodeType extends Node>(){
    return (props: EditorRendererProps<NodeType>) => {
        return <ComponentPaper sx={{border: "2px block"}}>
            <ComponentEditorBox>
                {props.children}
            </ComponentEditorBox>
        </ComponentPaper>
    }
}

function get_default_support_editor(){
    return (props: EditorRendererProps<SupportNode>) => (<ComponentPaper sx={{border: "2px block"}}>
    <UnselecableBox>
        {props.children}
    </UnselecableBox>
</ComponentPaper>)
}

function get_default_editors(): {[key in AllNodeTypes]: EditorRenderer}{
    return {
        "group"     : get_default_block_editor<GroupNode>() , 
        "inline"    : get_default_block_editor<InlineNode>() , 
        "structure" : get_default_block_editor<StructNode>() , 
        "support"   : get_default_support_editor() , 
        "abstract"  : (props) => <Box>{props.children}</Box> , 
        "paragraph" : (props) => <ParagraphBox>{props.children}</ParagraphBox> , 
        "text"      : (props) => <span>{props.children}</span> , 
    }
}

