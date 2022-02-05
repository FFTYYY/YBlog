/**
 * 这个文件提供一个接口来一次性安装所有插件。作为插件模块的出口。
 * @module
 */

import { Editor } from "slate"

import { constraint_group , constraint_inline } from "./constraints"
import { set_inline , set_support } from "./styles"

export {withAllYEditorPlugins}

var plugins: ((editor: Editor)=>Editor)[] = [
    constraint_group , 
    constraint_inline , 
    set_inline , 
    set_support , 
]

function withAllYEditorPlugins(editor: Editor): Editor{
    for(let plg of plugins){
       editor = plg(editor)
    }
    return editor
}