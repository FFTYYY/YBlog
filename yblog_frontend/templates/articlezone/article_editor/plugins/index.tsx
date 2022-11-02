import { Editor , Node  } from "slate"
import { ReactEditor } from "slate-react"
import { 
    EditorComponent , 
} from "@ftyyy/ytext"

import * as C from "./constraints"

export { withAllPlugins}

let plugins = [ 
    C.set_force_sectioner ,
    C.set_style_ensure_parameters , 
]

function withAllPlugins(editor: EditorComponent, slate: ReactEditor): ReactEditor{
    for(let plugin of plugins){
        slate = plugin(editor , slate)
    }
    return slate
}