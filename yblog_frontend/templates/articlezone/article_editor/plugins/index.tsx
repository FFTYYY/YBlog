import { Editor , Node  } from "slate"
import { ReactEditor } from "slate-react"
import { 
    GroupNode , 
    get_node_type , 
    SupportNode , 
    is_certain_style, 
    paragraph_prototype , 
    YEditor , 
    is_styled , 
} from "../../../../lib"

import * as C from "./constraints"

export { withAllPlugins}

let plugins = [ 
    C.set_force_sectioner ,
    C.set_style_ensure_parameters , 
]

function withAllPlugins(editor: YEditor, slate: ReactEditor): ReactEditor{
    for(let plugin of plugins){
        slate = plugin(editor , slate)
    }
    return slate
}