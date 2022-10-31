import { YEditor } from "./editor"
import type { EditorRenderer_Props , EditorRenderer_Func } from "./collectionmixin"

export {YEditor , default_editor_renderers}
export type {EditorRenderer_Props , EditorRenderer_Func}

let default_editor_renderers = {
    text      : (props: EditorRenderer_Props)=><span>{props.children}</span> , 
    inline    : (props: EditorRenderer_Props)=><span>{props.children}</span> , 
    paragraph : (props: EditorRenderer_Props)=><div>{props.children}</div> , 
    group     : (props: EditorRenderer_Props)=><div>{props.children}</div> , 
    struct    : (props: EditorRenderer_Props)=><div>{props.children}</div> , 
    support   : (props: EditorRenderer_Props)=><div>{props.children}</div> , 
}