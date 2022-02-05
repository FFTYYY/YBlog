import { Editor , Node , Transforms } from "slate"
import { set_force_new_paragraph } from "./constraints"

export { withAllPlugins }

let plugins = [ set_force_new_paragraph ]

function withAllPlugins(editor: Editor): Editor{
    for(let plugin of plugins){
        editor = plugin(editor)
    }
    return editor
}