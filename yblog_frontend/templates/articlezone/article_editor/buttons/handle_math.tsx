/** 这个组件将$$等数学符号转换为节点。 */
import { 
	Snackbar , SnackbarOrigin , Button , IconButton , Drawer , Paper, Typography, Divider, Box, TextField , Popover , InputAdornment
} from "@mui/material"
import { Node } from "slate"
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

function HandleMath(editor: YEditor, inlinestyle_name: string, blockstyle_name: string){

    function _handle(now_node: Node , now_path: number[]){
        // console.log(now_node)

        if(has_children(now_node)){
            for(let idx in now_node.children){
                let c = now_node.children[idx]
                if(_handle(c , [...now_path , Number(idx)])){ // 只要修复了一处，就立刻返回。
                    return true
                }
            }
            return 
        }

        // TODO 可能用Transforms.collapse会比较好
        let text = now_node.text
        let match_inline = /([^\$]|^)(\$[^\$]+?\$)([^\$]|$)/.exec(text)
        let match_block  = /\$\$[^\$]+?\$\$/.exec(text)
        if(match_inline){
            let match = match_inline
            let match_start = match.index + match[1].length // `match[1]`匹配的是开头字符
            let match_tex = match[2] // `match[2]`匹配中间只要部分
            let match_end = match.index + match[1].length + match_tex.length // 总之是`match_tex`结束的位置。

            let before_text = text.slice(0,match_start)
            let end_text = text.slice(match_end,text.length)
            let inner_text = match_tex.slice(1 , match_tex.length-1)

            let mathinline_proxy = editor.proxies["inline"][inlinestyle_name]
            let new_node = mathinline_proxy.makenode()
            new_node.children = [{text: inner_text}]

            // editor.set_node(now_node , new_node)

            editor.delete_node_by_path(now_path)
            editor.add_nodes([
                {text: before_text} , 
                new_node , 
                {text: end_text} , 
            ] , now_path )
            

            return true
        }

        if(match_block){
            let match = match_block
            let match_start = match.index
            let match_tex = match[0]
            let match_end = match.index + match_tex.length

            let before_text = text.slice(0,match_start)
            let end_text = text.slice(match_end,text.length)
            let inner_text = match_tex.slice(2 , match_tex.length-2)

            let mathblock_proxy = editor.proxies["group"][blockstyle_name]
            let new_node = mathblock_proxy.makenode()
            new_node.children = [{text: inner_text}]

            let new_node_left = paragraph_prototype(before_text)
            let new_node_right = paragraph_prototype(end_text)

            editor.delete_node_by_path(now_path)
            editor.add_nodes( [
                new_node_left , 
                new_node , 
                new_node_right , 
            ] , now_path )
            

            return true    
        }

        return false
    }

    let cnt = 0
    while(_handle(editor.get_root() , [])){
        cnt ++
        if(cnt > 0){
            console.log("太多数学...")
            break
        }
    }
}

function HandleMathBuutton(props: {get_editor: ()=>YEditor}){ // 弟啊你神经啊
    const [anchor, set_anchor] = React.useState<HTMLButtonElement | null>(null)
    const [inlinemath, set_inlinemath] = React.useState<string>("数学-行内")
    const [blockmath, set_blockmath] = React.useState<string>("数学-块")
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
            <Button
                variant = "outlined"
                sx = {{width: "50%" , marginX: "auto" , marginY: "0.5rem"}}
                onClick = {()=>{
                    HandleMath(props.get_editor() , inlinemath , blockmath)
                }}
            >开始！</Button>
        </AutoStack></Popover>
    </React.Fragment>

}