import { Editor , Node , Transforms } from "slate"
import { 
    GroupNode , 
    get_node_type , 
    SupportNode , 
    is_certain_style, 
    paragraph_prototype , 
    YEditor , 
    is_styled , 
    set_node 
} from "../../../../lib"

import * as C from "./constraints"

export { withAllPlugins , set_normalize_status}

let set_normalize_status = C.set_normalize_status

let plugins = [ 
    C.set_force_sectioner ,
    C.set_style_ensure_parameters , 
]

function withAllPlugins(editor: YEditor): YEditor{
    for(let plugin of plugins){
        editor = plugin(editor)
    }
    return editor
}