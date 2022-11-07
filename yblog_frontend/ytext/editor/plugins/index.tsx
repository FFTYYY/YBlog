import * as SlateReact from "slate-react"
import {
    EditorComponent , 
} from ".."

import {
    EditorPlugin
} from "./base"

import {
    set_inline , 
    set_support , 
} from "./apply_metaparam"
import {
    constraint_group_children , 
    constraint_inline_children , 
    constraint_struct_children , 
    constraint_paragraph_children , 
} from "./check_children"
import {
    constraint_paste , 
    constraint_relation ,
    constraint_abstract , 
    constraint_parameters , 
} from "./constraints"

export {
    set_normalize_status , 
    get_normalize_status
} from "./base"

export { 
    with_ytext_plugins , 
}

export type {
    EditorPlugin , 
}

let plugins: EditorPlugin[] = [
    set_inline , 
    set_support , 
    constraint_group_children , 
    constraint_inline_children , 
    constraint_struct_children , 
    constraint_paragraph_children , 
    constraint_paste , 
    constraint_relation ,
    constraint_abstract , 
    constraint_parameters , 
]

function with_ytext_plugins(editor: EditorComponent, slate: SlateReact.ReactEditor): SlateReact.ReactEditor{
    for(let plugin of plugins){
        slate = plugin(editor , slate)
    }
    return slate
}