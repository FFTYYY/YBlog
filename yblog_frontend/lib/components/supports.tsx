/** 
 * 这个模块提供一些默认的 Support 节点的渲染器。
 * @module
 */

import { SupportNode , paragraph_prototype} from "../core/elements"
import { SupportStyle , EditorCore} from "../core/editor_core"
import type { EditorRenderer_Func , EditorRenderer_Props } from "../editor_interface"
import { YEditor } from "../editor_interface"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Transforms , Node } from "slate"
import { non_selectable_prop , is_same_node} from "../utils"
import { warning } from "../exceptions/warning";
import { node2path } from "../utils"
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import Grid         from "@mui/material/Grid"


export { newparagraph }

function newparagraph(name:string = "newparagraph"): [SupportStyle,EditorRenderer_Func]{
    let style = new SupportStyle(name , {})

    let renderer = (props: EditorRenderer_Props) => {
        let element = props.element as SupportNode
        let editor = props.editor
        return <ButtonGroup  
                {...non_selectable_prop} 
                {...props.attributes} 
                sx={{
                    width: "98%" , 
                    marginLeft: "1%" , 
                    marginRight: "1%" , 
                }}
                variant = "outlined"
                size = "small"
            > 
            <Button 
                onClick = { e => {
                    let my_path = node2path(editor.core.root , element) // 获取本节点的位置
                    if(my_path == undefined)
                        warning("节点不在节点树中！")
                    Transforms.insertNodes(editor.slate , paragraph_prototype() , {at: my_path})
                }}
                startIcon={<NorthIcon fontSize="small" />}
                fullWidth
            ></Button>
            <Button 
                onClick = { e => {
                    let my_path = node2path(editor.core.root , element) // 获取本节点的位置
                    if(my_path == undefined)
                        warning("节点不在节点树中！")
                    my_path[my_path.length - 1] ++ // 在下一个节点处插入
                    Transforms.insertNodes(editor.slate , paragraph_prototype() , {at: my_path})
                }}
                
                startIcon={<SouthIcon fontSize="small" />}
                fullWidth
            ></Button>
        </ButtonGroup >
    }
    
    return [style , renderer]
}

