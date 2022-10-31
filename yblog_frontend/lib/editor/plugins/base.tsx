import * as SlateReact from "slate-react"
import {
    EditorComponent , 
} from ".."

export {
    set_normalize_status , 
    get_normalize_status , 
}

export type {
    EditorPlugin , 
}

/** 某些检查只在特定状态下生效。 */
var status = {

    /** 当前是否在初始化文档。 */
    initializing: false , 

    /** 当前是否在粘贴对象。 */
    pasting: false , 

}

function set_normalize_status(val: Partial<typeof status>){
    status = {...status , ...val}
}
function get_normalize_status(key: "initializing" | "pasting"){
    return status[key]
}


type EditorPlugin = (editor: EditorComponent, slate: SlateReact.ReactEditor) => SlateReact.ReactEditor