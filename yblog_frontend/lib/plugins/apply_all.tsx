/**
 * 这个文件提供一个接口来一次性安装所有插件。作为插件模块的出口。
 * @module
 */

import { Editor } from "slate"

import { constraint_struct , constraint_relation , constraint_paste , constraint_group_start_with_blank } from "./constraints"
import { set_inline , set_support } from "./styles"
import { YEditor } from "../editor"

export {withAllYEditorPlugins}

var plugins: ((yeditor: YEditor , slate: Editor)=>Editor)[] = [
    constraint_struct , 
    constraint_relation , 
    constraint_paste , 
    set_inline , 
    set_support , 
    constraint_group_start_with_blank , 
]

function withAllYEditorPlugins(yeditor: YEditor , slate: Editor): Editor{
    for(let plg of plugins){
        slate = plg(yeditor , slate)
    }
    return slate
}