/** 这个组件将$$等数学符号转换为节点。 */
import { 
	Snackbar , SnackbarOrigin , Button , IconButton , Drawer , Paper, Typography, Divider, Box, TextField , Popover , InputAdornment , 
    LinearProgress  , 
} from "@mui/material"
import { Node , Point , Transforms } from "slate"
import { FlexibleItem } from "../../base/construction/framework"
import {
	YEditor , 
	AutoTooltip , 
	AutoIconButton , 
    has_children , 
    group_prototype, 
    AutoStack,
    paragraph_prototype, 
} 
from "../../../../lib"
import {
	Save as SaveIcon , 
	FileCopy as FileCopyIcon  , 
	DriveFolderUpload as DriveFolderUploadIcon , 
	DriveFileRenameOutline as DriveFileRenameOutlineIcon  , 
    AutoFixHigh as AutoFixHighIcon , 
} 
from "@mui/icons-material"

import { mathblock_style , mathinline_style } from "../../base/styles/styles"
import React from "react"

export { HandleMathBuutton }

async function sleep(time: number){
    return new Promise(resolve => setTimeout(resolve, time))
}

async function HandleMath(editor: YEditor, inlinestyle_name: string, blockstyle_name: string , update_progress: ()=>void){

    let now_prefer = undefined
    let left = undefined
    let left_point = undefined
    let right_point = undefined
    function _search_$(now_node: Node , now_path: number[]){

        if(left_point && right_point){
            return 
        }

        if(now_node["type"] == "group" && now_node["proxy_info"] && now_node["proxy_info"]["proxy_name"] == blockstyle_name){ // 不处理已经在块内的
            return
        }
        if(now_node["type"] == "inline" && now_node["proxy_info"] && now_node["proxy_info"]["proxy_name"] == inlinestyle_name){ // 不处理已经在块内的
            return
        }

        if(has_children(now_node)){
            for(let idx in now_node.children){
                let c = now_node.children[idx]
                _search_$(c , [...now_path , Number(idx)]) 
            }
            return 
        }

        let text = now_node.text
        for(let i = 0;i < text.length;i++){
            if(text[i] == "$"){
                if(i != 0 && text[i-1] == "\\"){ // 转义
                    continue
                }
                if(left == "$"){
                    right_point = {
                        path: now_path , 
                        offset: i+1 ,  
                    }
                    return 
                }
                if(left == "$$"){
                    if(i != text.length-1 && text[i+1] == "$"){
                        right_point = {
                            path: now_path , 
                            offset: i+2 ,  
                        }
                        return
                    }
                    continue
                }
                if(left == undefined){
                    if(i != text.length-1 && text[i+1] == "$" && now_prefer != "$"){
                        left = "$$"
                        left_point = {
                            path: now_path , 
                            offset: i ,  
                        }
                        i ++ // 跳过下一个
                        continue
                    }
                    else if(now_prefer != "$$"){
                        left = "$"
                        left_point = {
                            path: now_path , 
                            offset: i ,  
                        }
                        continue
                    }
                }
            }
        }
    }

    function search(prefer = undefined){
        left = undefined
        left_point = undefined
        right_point = undefined
        now_prefer = prefer
        _search_$(editor.get_root() , [])
        if(left_point && right_point){
            return [left , left_point , right_point]
        }
        return [undefined , undefined , undefined]
    }

    function _delete_$(now_node: Node , now_path: number[] , now_style: string[], now_idx: number , now_xdi: number){

        let flag_block = false
        let flag_inline = false

        if(now_node["type"] == "group" && now_node["proxy_info"] && now_node["proxy_info"]["proxy_name"] == blockstyle_name){
            flag_block = true
        }
        if(now_node["type"] == "inline" && now_node["proxy_info"] && now_node["proxy_info"]["proxy_name"] == inlinestyle_name){
            flag_inline = true
        }

        if(has_children(now_node)){
            let new_style = now_style
            if(flag_block){
                new_style = [...new_style , "$$"]
            }
            if(flag_inline){
                new_style = [...new_style , "$"]
            }
            for(let idx in now_node.children){
                let c = now_node.children[idx]
                let modified = _delete_$(
                    c , 
                    [...now_path , Number(idx)] , 
                    new_style ,
                    Number(idx) , 
                    now_node.children.length-1-Number(idx) , 
                ) 
                if(modified){
                    return true
                }
            }
            return false
        }

        let text = now_node.text
        let offset_from_head = -1
        let offset_to_head = -1
        let offset_from_end = -1
        let offset_to_end = -1
        if(now_style.length > 0 && now_style[now_style.length-1] == "$$"){
            if(now_idx == 0 && text.startsWith("$$")){
                offset_from_head = 0
                offset_to_head = 2
            }
            if(now_xdi == 0 && text.endsWith("$$")){
                offset_from_end = text.length - 2
                offset_to_end = text.length
            }
        }
        if(now_style.length > 0 && now_style[now_style.length-1] == "$"){
            if(now_idx == 0 && text.startsWith("$")){
                offset_from_head = 0
                offset_to_head = 1
            }
            if(now_xdi == 0 && text.endsWith("$")){
                offset_from_end = text.length - 1
                offset_to_end = text.length
            }
        }
        if(offset_from_head >= 0 || offset_to_head >= 0 || offset_from_end >= 0 || offset_to_end >= 0){
            
            if(offset_from_end >= 0){
                Transforms.delete(editor.get_slate() , {
                    at: {
                        anchor: {
                            path: now_path , 
                            offset: offset_from_end , 
                        } , 
                        focus: {
                            path: now_path , 
                            offset: offset_to_end , 
                        }
                    }
                })
            }
            if(offset_from_head >= 0){

                Transforms.delete(editor.get_slate() , {
                    at: {
                        anchor: {
                            path: now_path , 
                            offset: offset_from_head , 
                        } , 
                        focus: {
                            path: now_path , 
                            offset: offset_to_head , 
                        }
                    }
                })
            }

            return true
        }
        return false
    }

    async function normalize(){
        let delete_cnt = 0
        while(_delete_$(editor.get_root() , [] , [] , 0 , 0) && delete_cnt < 100){
            await sleep(10)
            delete_cnt ++
        }
        if(delete_cnt > 100){
            console.log("好多删除...")
        }
    }

    let maxcnt = 100
    let cnt = 0
    let proxy_block  = editor.proxies[ "group"][ blockstyle_name]
    let proxy_inline = editor.proxies["inline"][inlinestyle_name]

    while(cnt < maxcnt){
        let [_ , from , to] = search("$$")
        if(from == undefined){
            break
        }
        editor.wrap_nodes(proxy_block.makenode() , from , to , {split: true})
        await sleep(10)
        normalize()
        cnt ++
        update_progress()
    }
    while(cnt < maxcnt){
        let [_ , from , to] = search("$")
        if(from == undefined){
            break
        }
        editor.wrap_nodes(proxy_inline.makenode() , from , to , {split: true})
        await sleep(10)
        normalize()
        cnt ++
        update_progress()
    }

    if(cnt >= maxcnt){
        console.log("好多数学...")
    }
}

function HandleMathBuutton(props: {get_editor: ()=>YEditor}){ // 弟啊你神经啊
    const [anchor, set_anchor] = React.useState<HTMLButtonElement | null>(null)
    const [inlinemath, set_inlinemath] = React.useState<string>("数学-行内")
    const [blockmath, set_blockmath] = React.useState<string>("数学-块")
    const [progress, set_progress] = React.useState<number>(0)
    const [terminating, set_terminating] = React.useState<boolean>(false)

    let get_$_num = ()=>{ // 询问当前还有多少个$
        let editor = props.get_editor()
        let root = editor.get_root()
        let match = Node.string(root).match(/\$/g)
        return match ? match.length : 0
    }

    return <React.Fragment>
        <FlexibleItem
            close_item = {
                <AutoTooltip title="处理数学"><IconButton size="small">
                    <AutoFixHighIcon fontSize="small" color="primary"/>
                </IconButton></AutoTooltip>
            }
            open_item = {<Button startIcon={<AutoFixHighIcon/>} color="primary">处理数学</Button>}
            onClick = {(e)=>{
                set_anchor(e.currentTarget)
            }}
            no_button
        />
        <Popover
            open = {Boolean(anchor)}
            anchorEl = {anchor}
            onClose = {()=>{set_anchor(undefined)}}
            anchorOrigin = {{
                vertical: "center" ,
                horizontal: "right" ,
            }}
            transformOrigin = {{
                vertical: "center" ,
                horizontal: "left" ,
            }}
            sx = {{
                paddingX: "4rem" , 
                paddingY: "2rem" , 
            }}
        ><AutoStack force_direction = "column">
            <TextField
                label = "行内公式的Style名"
                defaultValue = {inlinemath}
                InputProps = {{
                    startAdornment: <InputAdornment position="start">$...$ = </InputAdornment>,
                }}
                sx = {{marginBottom: "0.5rem" , marginTop: "1rem"}}
                onChange = {(e)=>{
                    set_inlinemath(e.target.value)
                }}
            /> 
            <TextField
                label = "块级公式的Style名"
                defaultValue = {blockmath}
                InputProps = {{
                    startAdornment: <InputAdornment position="start">$$...$$ = </InputAdornment>,
                }}
                sx = {{marginY: "0.5rem"}}
                onChange = {(e)=>{
                    set_blockmath(e.target.value)
                }}
            />
            <Typography>进度：{
                parseInt(String(progress * 10000)) / 100
            }%{terminating ? "（暂停）": ""}</Typography>
            <LinearProgress  
                variant = "determinate"
                value = {progress * 100}
            />
            <Button
                variant = "outlined"
                sx = {{width: "50%" , marginX: "auto" , marginY: "0.5rem"}}
                onClick = {async ()=>{
                    let init_$num = get_$_num()
                    set_terminating(false)
                    await HandleMath(props.get_editor() , inlinemath , blockmath , ()=>{
                        let $num = get_$_num()
                        let new_progress = 0
                        if(init_$num == 0){
                            new_progress = 1
                        }
                        else{
                            new_progress = 1 - $num / init_$num
                        }
                        if(new_progress != progress){
                            set_progress(new_progress)
                        }
                    })
                    set_terminating(true)
                }}
            >开始！</Button>
        </AutoStack></Popover>
    </React.Fragment>

}