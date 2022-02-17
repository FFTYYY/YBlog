/** 
 * 这个模块提供一些默认的 Group 的渲染器。
 * @module
 */

import React, {useState , createRef} from "react"


import {
    Typography , 
    Button , 
    Menu , 
    MenuItem , 
    Drawer , 
    AppBar , 
    Box , 
    AccordionDetails , 
    Popper , 
    Tooltip , 
    Switch , 
    Toolbar , 
    Paper , 
    Grid , 
    IconButton , 
    Divider  , 
    Container , 
} 
from "@mui/material"
import type {
    PaperProps
} 
from "@mui/material"

import {
    KeyboardArrowDown as KeyboardArrowDownIcon
 } from "@mui/icons-material"


import { Node, Editor } from "slate"

import { GroupNode , StyledNode , paragraph_prototype , get_node_type } from "../../core/elements"
import type { EditorRenderer_Func , EditorRenderer_Props } from "../../editor"
import { YEditor } from "../../editor"
import { add_nodes , set_node , add_nodes_before , move_node } from "../../behaviours"

import { is_same_node , node2path } from "../../utils"

import { DefaultParameterEditButton , DefaultCloseButton , AutoStackedPopperWithButton } from "./universe/buttons"
import { DefaultHidden } from "./hidden"

import { AutoTooltip  , AutoStack , Direction , SimpleAutoStack , AutoStackedPopper} from "../basic"
import { ComponentPaper , ComponentEditorBox , UnselecableBox} from "./basic"

import type { UniversalComponent_Props } from "./universe" 

export { get_DefaultGroup_with_AppBar , get_DefaultGroup_with_RightBar}

/** 为 Group 类型的节点定制的 Paper ，在节点前后相连时会取消前后距离。 */
let GroupPaper = (props: PaperProps & {element: GroupNode}) => <ComponentPaper {...props} 
    sx = { props.element.relation == "chaining" ? { marginTop: "0" } : {} }
/>

/** 这个函数返回一个默认的带应用栏的 group 组件。用于比较大的 group 组件。
 * @param get_title 从参数列表获得 title 的方法。
 * @param appbar_extra 要额外向 appbar 里添加的组件。
 * @param surrounder 包裹内容区域的组件。
 * @returns 一个用于渲染group的组件。
 */
function get_DefaultGroup_with_AppBar(
    get_title:((parameters:any)=>string) = ((parameters:any)=>parameters.title) , 
    appbar_extra: (props: UniversalComponent_Props) => any = (props) => <></> , 
    surrounder: (props: UniversalComponent_Props & {children: any}) => any = (props) => <>{props.children}</>
): EditorRenderer_Func{
    // 渲染器
    return (props: EditorRenderer_Props) => {
        let element = props.element as GroupNode
        let title = get_title(element.parameters)
        let editor = props.editor
        let E = appbar_extra
        let SUR = surrounder

        return <GroupPaper element={element}>
            <AutoStack force_direction="column">
                <UnselecableBox>
                    <Toolbar><AutoStack>
                        <Typography>{title}</Typography>
                        <DefaultParameterEditButton editor={editor} element={element}/>         
                        <DefaultHidden              editor={editor} element={element} />
                        <DefaultGroupSwicth         editor={editor} element={element} />
                        <DefaultCloseButton         editor={editor} element={element} />
                        <E                          editor={editor} element={element}/>
                    </AutoStack></Toolbar>
                </UnselecableBox >
                <Divider />
                <ComponentEditorBox autogrow>
                    <SUR editor={editor} element={element}>{props.children}</SUR>
                </ComponentEditorBox>
            </AutoStack>
        </GroupPaper>
    }
}

/** 这个函数返回一个默认的group组件，但是各种选项等都被折叠在右侧的一个小按钮内。用于比较小的group。
 * @param get_title 从参数列表获得title的方法。
 * @param rightbar_extra 要额外向添加的组件。
 * @param surrounder 包裹内容区域的组件。
 * @returns 一个用于渲染group的组件。
*/
function get_DefaultGroup_with_RightBar(
    get_title:((parameters:any)=>string) = ((parameters:any)=>parameters.title) , 
    rightbar_extra: (props: UniversalComponent_Props) => any = (props) => <></> , 
    surrounder: (props: UniversalComponent_Props & {children: any}) => any = (props) => <>{props.children}</>
): EditorRenderer_Func{

    return (props: EditorRenderer_Props) => {
        let element = props.element as GroupNode
        let title = get_title(element.parameters)
        let editor = props.editor
        let E = rightbar_extra
        let SUR = surrounder

        return <GroupPaper element={element}>
            <AutoStack force_direction="row">
                <ComponentEditorBox autogrow>
                    <SUR editor={editor} element={element}>{props.children}</SUR>
                </ComponentEditorBox>                
                <UnselecableBox>
                    <SimpleAutoStack>
                        <Typography variant="overline">{title}</Typography>
                        <E editor={editor} element={element}/>
                        <AutoStackedPopperWithButton
                            close_on_otherclick
                            button_class = {IconButton}
                            button_props = {{
                                size: "small" , 
                                children: <KeyboardArrowDownIcon fontSize="small"/> , 
                            }}
                            title = "展开"
                        >
                            <DefaultParameterEditButton editor={editor} element={element}/>
                            <DefaultHidden      editor={editor} element={element} />
                            <DefaultGroupSwicth editor={editor} element={element} />
                            <DefaultCloseButton editor={editor} element={element} />
                        </AutoStackedPopperWithButton>
                    </SimpleAutoStack>
                </UnselecableBox>
            </AutoStack>
        </GroupPaper>
    }
}


/** 这个组件给一个 Group 组件提供一个开关，用于控制 Group 的 relation 。 
 * @param props.editor 服务的编辑器。
 * @param props.element 服务的节点。
*/
function DefaultGroupSwicth(props: {editor: YEditor , element: Node}){
    let element = props.element as GroupNode
    let editor = props.editor

    let [ checked , set_checked ] = useState(element.relation == "chaining") // 开关是否打开

    /** 处理开关的逻辑。 */
    function switch_check_change(e: any & {target: any & {checked: boolean}}){
        let checked = e.target.checked
        set_checked(checked)

        if(checked == false){ // 从开到关
            add_nodes_before(editor , paragraph_prototype() , element)
            set_node(editor , element , { relation: "separating" })
        }
        if(checked == true){ // 从关到开
            
            set_node( editor , element , { relation: "chaining" } )

            let node_path = node2path(editor.slate , element)
            let depth = node_path.length - 1
            let bro_path = undefined
            for(let i = node_path[depth]-1;i >= 0;i--){
                let new_path = [...node_path]
                new_path[depth] = i

                let tar_node = Node.descendant(editor.slate , new_path)
                if(get_node_type(tar_node) == "group"){
                    bro_path = new_path
                    break
                }
            }
            if(bro_path != undefined){
                bro_path[depth] ++
                move_node(editor , element , bro_path)
            }
        }

    }

    return <AutoTooltip title = "贴合"><Switch checked={checked} onChange={switch_check_change}></Switch></AutoTooltip>
}

