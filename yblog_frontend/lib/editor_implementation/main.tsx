/** 
 * 这个文件提供一个开箱即用的editor示例。
 * @module
 */
import React  from "react"

import {
    Accordion , 
    AccordionSummary , 
    Toolbar , 
    Typography , 
    IconButton , 
    Button , 
    Box , 
    Paper ,
    Divider , 
    Popover , 
} from "@mui/material"
import {
    CalendarViewDay as CalendarViewDayIcon , 
    CloseFullscreen as CloseFullscreenIcon , 
    Coffee as CoffeeIcon , 
    Settings as SettingsIcon , 
    QrCode as QrCodeIcon , 
} from "@mui/icons-material"
import { ThemeProvider , createTheme , styled } from "@mui/material/styles"
import type { Theme , ThemeOptions } from "@mui/material/styles"

import * as Slate from "slate"
import * as SlateReact from "slate-react"
import {
    EditorComponent , 
    EditorCore, 
    EditorComponentProps , 
} from "../editor"
import {
    ConceptNode , 
    GroupNode , 
    Node , 
    AllConceptTypes , 
    AllNodeTypes, 
    AbstractNode, 
} from "../core"

import { 
    DefaultParameterEditButton , 
    AutoStackedPopperWithButton , 
} from "./buttons"
import { 
    AutoStack , 
    AutoTooltip , 
    AutoStackedPopper , 
    AutoStackButtons , 
    default_editor_theme , 
} from "./uibase"
import {
    object_foreach , 
    merge_object ,

} from "./uibase"
import {
    KeyEventManager , 
    MouselessElement , 
    KeyDownUpFunctionProxy , 
    DirectionKey, 
} from "./mouseless"

import { 
    EditorBackgroundPaper , 
    EditorComponentEditingBox  ,
} from "./uibase"

import {
    DefaultSidebar , 
    get_mouseless_space as sidebar_get_mouseless_space , 
} from "./sidebar"
import {
    get_mouseless_space as buttons_get_mouseless_space
} from "./buttons"
export { DefaultEditorComponent }

type DefaultEditorComponentprops = EditorComponentProps & {
    theme?: ThemeOptions
    extra_buttons?: any
    onSave?: ()=>void // 保存时操作。

    sidebar_extra?: (editor: EditorComponent)=>{
        button: React.ReactElement
        run: ()=>void
    }[]
}

/** 
 * 这个组件提供一个开箱即用的默认编辑器组件。
 */
class DefaultEditorComponent extends React.Component <DefaultEditorComponentprops> {    
    onUpdate: (newval: Node[]) => void
    onFocusChange: ()=>void
    onSave: ()=> void

    editor_ref		: React.RefObject<EditorComponent>

    constructor(props: DefaultEditorComponentprops) {
        super(props)


        this.onUpdate = props.onUpdate || ((newval: Node[])=>{})
        this.onFocusChange  = props.onFocusChange || (()=>{})
        this.onSave = props.onSave || (()=>{})

        this.editor_ref = React.createRef<EditorComponent>()
    }

    get_editor(){
        if(this.editor_ref && this.editor_ref.current)
            return this.editor_ref.current
        return undefined
    }

    get_root(): AbstractNode | undefined{
        return this.get_editor()?.get_root()
    }

    componentDidMount(): void {
        let me = this

        while(!this.get_editor()); // 确保editor存在
    }

    render() {
    
        let paper_width   = {xs: "85%" , md: "90%" , xl: "95%"} // 纸张的宽度，
        let toolbar_width = {xs: "15%" , md: "10%" , xl: "5%"} // 工具栏的宽度。

        let theme = merge_object(default_editor_theme , this.props.theme)

        let me = this

        return <ThemeProvider theme={createTheme(theme)}><EditorBackgroundPaper>
            <KeyEventManager
                spaces = {[
                    sidebar_get_mouseless_space(me.get_editor()) , 
                    buttons_get_mouseless_space(me.get_editor()) , 
                ]}
                non_space_oprations = {[
                    {
                        key: "s" , 
                        on_activate: ()=>{me.onSave()}
                    }
                ]}
            >
                <Box sx = {{ 
                    position: "absolute" , 
                    height: "100%", 
                    width: paper_width, 
                    overflow: "auto", 
                }}><EditorComponentEditingBox>
                    <KeyDownUpFunctionProxy.Consumer>{([onkeydown , onkeyup])=>{
                        return <EditorComponent
                            ref 		        = {me.editor_ref} 

                            editorcore          = {me.props.editorcore}
                            plugin              = {me.props.plugin}
                            init_rootchildren   = {me.props.init_rootchildren}
                            init_rootproperty   = {me.props.init_rootproperty}

                            onUpdate            = {me.props.onUpdate}
                            onKeyPress          = {me.props.onKeyPress}
                            onFocusChange       = {me.props.onFocusChange}
                            
                            onKeyDown           = {onkeydown}
                            onKeyUp             = {onkeyup}
                        />
                    }}
                    </KeyDownUpFunctionProxy.Consumer>
                </EditorComponentEditingBox></Box>

                <Box sx = {{
                    position: "absolute", 
                    height: "100%", 
                    left: paper_width, 
                    width: toolbar_width
                }}>{(()=>{
                    let editor = me.get_editor()
                    let root = me.get_root()
                    if(!(editor && root)){
                        return <></>
                    }
                    return <AutoStack force_direction="column">
                        <DefaultParameterEditButton node={me.editor_ref.current?.get_root()} />
                        {/* <DefaultHiddenEditorButtons editor={editor} element={me.state.root} /> */}
                        {me.props.extra_buttons}
                        <Divider />
                        <DefaultSidebar 
                            editor = {me.get_editor()}
                            extra = {me.props.sidebar_extra}
                        />
                    </AutoStack>
                })()}</Box>
            </KeyEventManager>
        </EditorBackgroundPaper></ThemeProvider>
    }
}
