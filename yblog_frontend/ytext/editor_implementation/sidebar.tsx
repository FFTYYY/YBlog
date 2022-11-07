/** 这个模块描述默认实现的按钮栏。
 * 无鼠标操作的约定：所有位置用 JSON.stringify([number, number]) 表示，其中前一个表示行（0/1/2/3=组/行内/支持/结构），后一个表示第几个对象。
 * @module
 */
import React  from "react"

import {
    IconButton , 
    Button , 
    Paper ,
    Divider , 
    Box, 
    PaperProps, 
    BoxProps , 
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

import {
    EditorComponent , 
} from "../editor"
import {
    AllConceptTypes, GlobalInfo , 
} from "../core"

import { 
    AutoStackedPopperWithButton , 
} from "./buttons"
import { 
    AutoStackButtons, ScrollBarBox , 
} from "./uibase"
import {
    MouselessElement , 
    DirectionKey, 
    SwitchPositionFunction , 
} from "./mouseless"


export {
    DefaultSidebar , 
    SPACE , 
    get_mouseless_space , 
    get_position , 
    get_run , 
}


const SPACE = "q"
const TYPENAMES = ["group" , "inline" , "support" , "structure"] as ["group" , "inline" , "support" , "structure"]

function get_mouseless_space(editor: EditorComponent){
    return {
        key: SPACE, 
        activate_position: get_activate_position() , 
        switch_position: get_switch_position(editor) , 
    }
}


function get_position(typename: Exclude<AllConceptTypes, "abstract">, idx: number){
    let typeidx = TYPENAMES.indexOf(typename)
    return JSON.stringify([typeidx, idx])
}

function get_extra_position(exidx: number){
    return JSON.stringify([exidx + TYPENAMES.length, 0])
}


function get_run(editor: EditorComponent, typename: Exclude<AllConceptTypes, "abstract">, pos_y: number){
    return ()=>{
        let concept_name = editor.get_core().get_sec_concept_list(typename)[pos_y]
        editor.new_concept_node(typename , concept_name)
    }
} 

function get_activate_position(){
    return (position_list: string[], cur_position: string): string | undefined => {
        if(cur_position != undefined){ // 如果之前已经选过值了，那就用之前的值。
            return cur_position
        }
        if(position_list.length == 0){
            return undefined
        }
        let positions = position_list.reduce((s,x)=>[...s, JSON.parse(x)], [])
        positions.sort((a: [number,number],b: [number,number])=>(a[0] == b[0]) ? (a[1] - b[1]) : (a[0] - b[0]))
        return JSON.stringify(positions[0]) // 最小的那个。
    }
} 

/** 这个函数以editor为参数，返回改变位置的函数。 */
function get_switch_position(editor: EditorComponent): SwitchPositionFunction{
    if(editor == undefined){
        return ()=>undefined
    }
    return (position_list: string[], cur_position: string, direction: DirectionKey) => {
        if(cur_position == undefined){ // 如果都没有选中过位置，那就用最小的。
             return get_activate_position()(position_list, cur_position)
        }

        let [pos_x , pos_y]: [number , number] = JSON.parse(cur_position)

        let xs = position_list.reduce((s,pos)=>[...s, JSON.parse(pos)[0]] , [] as number[]) // 获得所有x
        xs = Array.from( new Set(xs) )
        xs.sort((a,b)=>(parseInt(a) - parseInt(b)))
        let pos_x_in_xs = xs.indexOf(pos_x)

        if(direction == "ArrowUp"){
            pos_x_in_xs --
        }
        else if(direction  == "ArrowDown"){
            pos_x_in_xs ++
        }
        pos_x_in_xs = ((pos_x_in_xs % xs.length) + xs.length) % xs.length
        pos_x = xs[pos_x_in_xs]

        let ys = position_list.reduce((s,pos)=>{
            let [_x,_y] = JSON.parse(pos)
            return (_x == pos_x) ? [...s , _y] : s
        } , [] as number[])
        ys.sort((a,b)=>(parseInt(a) - parseInt(b)))
        let pos_y_in_ys = ys.indexOf(pos_y)
        if(pos_y_in_ys < 0){ // 如果没有找到，就用最后一个。
            pos_y_in_ys = ys.length - 1
        }
        if(direction == "ArrowLeft"){
            pos_y_in_ys --
        }
        else if(direction  == "ArrowRight"){
            pos_y_in_ys ++ 
        }
        pos_y_in_ys = ((pos_y_in_ys % ys.length) + ys.length) % ys.length
        pos_y = ys[pos_y_in_ys]

        return JSON.stringify([pos_x, pos_y])
    }
}

/** 每个小部分的容器。 */
class SideBarContainer extends React.Component<{children: React.ReactChild}>{
    constructor(props: {children: React.ReactChild}){
        super(props)
    }
    render(): React.ReactNode {
        let me = this
        return <ScrollBarBox 
            sx = {{
                maxWidth: "30rem" , 
            }}
            overflow = "auto"
        >{me.props.children}</ScrollBarBox>
    }
}

/** 这个组件是编辑器的右边工具栏的组件按钮部分。 
 * @param props.editor 所服务的编辑器。
 * @param props.extra 所要额外添加的按钮列表。
*/
function DefaultSidebar(props: {
    editor: EditorComponent
    extra?: (editor: EditorComponent) => {
        button: React.ReactElement
        run: ()=>void
    }[]
}){
    let editor = props.editor
    let extra = props.extra ? props.extra(editor) : []

    let icons = {
        group: CalendarViewDayIcon , 
        inline: CloseFullscreenIcon , 
        support: CoffeeIcon , 
        structure: QrCodeIcon , 
    }

    let refs = {
        group: React.useRef<AutoStackedPopperWithButton>() , 
        inline: React.useRef<AutoStackedPopperWithButton>() , 
        support: React.useRef<AutoStackedPopperWithButton>() , 
        structure: React.useRef<AutoStackedPopperWithButton>() , 
    }

    return <React.Fragment>
        {["group" , "inline" , "support" , "structure"].map ( (typename: Exclude<AllConceptTypes , "abstract">)=>{
            let Icon = icons[typename]
            let sec_concept_list = editor.get_core().get_sec_concept_list(typename)

            return <Box key={typename} sx={{marginX: "auto"}}>
                <MouselessElement 
                    space = {SPACE}
                    position = {get_position(typename , 0)}
                    run = {()=>{refs[typename].current ? refs[typename].current.run() : 0}}
                >
                    <AutoStackedPopperWithButton
                        poper_props     = {{
                            stacker: AutoStackButtons ,
                            component: SideBarContainer ,  
                            sx: {
                                opacity: "80%" , 
                            }
                        }}
                        outer_button    = {IconButton}
                        outer_props     = {{
                            children: <Icon /> , 
                        }}
                        label           = {typename}
                        ref             = {refs[typename]}
                    >{
                        sec_concept_list.map( (sec_ccpt , idx) => 
                            <Box key = {idx}   flexShrink = {0}>
                                <MouselessElement 
                                    space = {SPACE}
                                    position = {get_position(typename, idx + 1)} // 因为按钮本身要占一个位置，所以子按钮从1开始编号。
                                    run = {get_run(editor, typename, idx)}
                                >
                                    <Button 
                                        onClick = {e => editor.new_concept_node(typename , sec_ccpt)}
                                        variant = "text"
                                        sx = {{
                                            marginX: "0.1rem" ,
                                        }}
                                    >
                                        {sec_ccpt}
                                    </Button>
                                </MouselessElement>
                            </Box>
                        )
                    }</AutoStackedPopperWithButton>
                </MouselessElement>
            </Box>
        })}
        {Object.keys(extra).map(_exidx=>{
            let exidx = parseInt(_exidx)
            let exbutton = extra[exidx].button
            let exrun = extra[exidx].run
            return <Box sx={{marginX: "auto"}} key = {exidx}><MouselessElement 
                space = {SPACE}
                position = {get_extra_position(exidx)}
                run = {()=>{exrun ? exrun() : 0}}
            >{exbutton}</MouselessElement></Box>
        })}
    </React.Fragment>
}