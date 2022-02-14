import { 
    get_DefaultGroup_with_AppBar , 
    get_DefaultGroup_with_RightBar , 
    get_DefaultInline , 
    DefaultNewParagraph , 
    get_DefaultSplitter , 
    get_DefaultDisplayer , 
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
} 

var brightwords_editor = get_DefaultGroup_with_AppBar( 
    (parameters) => (parameters.title)
)

var followwords_editor = get_DefaultGroup_with_RightBar(
    (parameters) => "随言"
)

var mount_editor = get_DefaultGroup_with_RightBar(
    (parameters) => "裱示"
)

var display_editor = get_DefaultGroup_with_RightBar(
    (parameters) => "彰示"
)

var newpara_editor = DefaultNewParagraph
var sectioner_editor = get_DefaultSplitter(
    (parameters) => parameters.title
)
var ender_editor = get_DefaultSplitter(
    (parameters) => "章节"
)

var strong_editor = get_DefaultInline()

