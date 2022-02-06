import { Editor , Node , Transforms } from "slate"
import * as C from "./constraints"

export { withAllPlugins }

let plugins = [ 
    C.set_force_new_paragraph_in_group , 
    C.set_force_new_para_in_sectioner , 
    C.set_force_sectioner ,
]

function withAllPlugins(editor: Editor): Editor{
    for(let plugin of plugins){
        editor = plugin(editor)
    }
    return editor
}