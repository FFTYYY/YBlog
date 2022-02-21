import { Node } from "slate"

import {
    get_DefaultGroupEditor_with_AppBar , 
    get_DefaultGroupEditor_with_RightBar , 
    get_DefaultInlineEditor , 
    DefaultNewParagraphEditor , 
    get_DefaultSplitterEditor , 
    get_DefaultDisplayerEditor , 
    DefaultParagraphEditor , 
    get_DefaultStructEditor_with_RightBar , 
    YEditor , 
} from "../../../lib"


export { 
    brightwords_editor , 
    followwords_editor , 
    mount_editor , 
    display_editor , 
    newpara_editor , 
    sectioner_editor , 
    ender_editor , 
    strong_editor , 
    paragraph_editor , 
} 

var brightwords_editor = get_DefaultGroupEditor_with_AppBar( 
    (parameters) => (parameters.title)
)

var followwords_editor = get_DefaultGroupEditor_with_RightBar(
    (parameters) => "随言"
)

var mount_editor = get_DefaultGroupEditor_with_RightBar(
    (parameters) => "裱示"
)

var display_editor = get_DefaultGroupEditor_with_RightBar(
    (parameters) => "彰示"
)

var newpara_editor = DefaultNewParagraphEditor
var sectioner_editor = get_DefaultSplitterEditor(
    (parameters) => parameters.title
)
var ender_editor = get_DefaultSplitterEditor(
    (parameters) => "章节"
)

var strong_editor = get_DefaultInlineEditor()

var paragraph_editor = DefaultParagraphEditor