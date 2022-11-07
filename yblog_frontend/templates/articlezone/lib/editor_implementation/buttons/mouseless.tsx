/**
 * 这个模块规定每个概念节点的按钮栏的无鼠标操作。
 * 约定：位置用`[节点编号,按钮编号]`来表示。
 * @module
 */

import React from "react"
import * as Slate from "slate"
import {
    ConceptNode
} from "../../core"
import {
    MouselessElement , 
    DirectionKey , 
    SwitchPositionFunction , 
} from "../mouseless"
import { 
    EditorComponent , 
    slate_is_concept , 
    slate_concept_father , 
    slate_idx_to_node , 
} from "../../editor"
import {
    EditorButtonInformation
} from "./base"

export {
    get_mouseless_space , 
    SPACE , 
    get_position , 
}

const SPACE = "e"

function get_mouseless_space(editor: EditorComponent){
    return {
        key: SPACE, 
        activate_position: get_activate_position(editor) , 
        switch_position: get_switch_position(editor) , 
    }
}

function get_position(node: Slate.Node & ConceptNode , idx: number){
    let node_idx = node.idx
    return JSON.stringify([node_idx, idx])
}

/** 从候选位置中看有没有以当前节点开头的位置。 */
function get_cancidate_idxs(node: Slate.Node & ConceptNode, position_list: string[]){
    let cancidate_idxs = position_list.reduce((s,x)=>{ // 所选中的节点有哪些候选的位置。
        let [nodeidx,subidx]: [number,number] = JSON.parse(x)
        if(nodeidx == node.idx){
            return [...s, subidx]
        }
        return s
    } , [] as number [])
    return cancidate_idxs
}

/** 获取离一个节点最近的有无鼠标元素的父亲。返回父亲和父亲的无鼠标元素列表。 */
function get_mouseless_father(editor: EditorComponent, node: Slate.Node & ConceptNode, position_list: string[], only_father: boolean): [Slate.Node & ConceptNode , number[]]{
    let now_node = node

    // 如果不想包括本节点，就先迭代一次。
    if(only_father){ 
        now_node = slate_concept_father(editor.get_slate(), now_node)
        if(now_node == undefined){ // 压根没找到父亲，直接离开
            return [undefined , []]
        }
    }

    let cancidate_idxs = get_cancidate_idxs(now_node, position_list) // 初始的（当前节点）的候选位置列表。

    // 如果找到了根节点或者找到了至少有一个候选节点的父亲，就离开。
    while(! (Slate.Editor.isEditor(now_node) || cancidate_idxs.length != 0)){
        now_node = slate_concept_father(editor.get_slate(), now_node)
        if(now_node == undefined){ // 压根没找到父亲，直接离开
            break
        }
        cancidate_idxs = get_cancidate_idxs(now_node, position_list)
    }

    if(Slate.Editor.isEditor(now_node) || cancidate_idxs.length == 0){ // 这不是什么也没找到吗
        return [undefined, cancidate_idxs]
    }

    return [now_node, cancidate_idxs]
}

function get_switch_position(editor: EditorComponent): SwitchPositionFunction{
    return (position_list: string[] , cur_position: string, direction: DirectionKey, all_keys: {[k:string]: boolean}): string =>{
        if(cur_position == undefined){
            return get_activate_position(editor)(position_list, cur_position)
        }

        let flag_multi = false // 是否有多个方向键同时按下，如果有，就进入父节点。
        for(let dir of ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"]){
            if(all_keys[dir] && dir != direction){
                flag_multi = true
            }
        }

        // 获得当前激活位置。
        let [now_idx, now_sub]: [number , number] = JSON.parse(cur_position)

        while(flag_multi){ // 同时按下多个方向键以进入父节点。
            let the_node = slate_idx_to_node(editor.get_slate(), now_idx)
            if(!the_node){ // 如果节点不存在，那么就跳过此环节。
                break
            }

            // 向上寻找父亲。
            let [father, cancidate_idxs] = get_mouseless_father(editor, the_node, position_list, true)
            if(father == undefined || cancidate_idxs.length == 0){ // 压根没找到父亲，直接离开
                break
            }

            cancidate_idxs.sort((a,b)=>a-b)
            return JSON.stringify([father.idx, cancidate_idxs[0]])
        }

        // 所选中的节点有哪些候选的位置。
        let cancidate_idxs = position_list.reduce<number[]>((s,x)=>{
            let [nodeidx,subidx]: [number,number] = JSON.parse(x)
            if(nodeidx == now_idx){
                return [...s, subidx]
            }
            return s
        } , [])
        cancidate_idxs.sort((a,b)=>a-b)
        
        // 目前激活的按钮的编号的排名。
        let now_sub_idx = cancidate_idxs.indexOf(now_sub)

        if(direction == "ArrowLeft" || direction == "ArrowUp"){
            now_sub_idx --
        }
        if(direction == "ArrowRight" || direction == "ArrowDown"){
            now_sub_idx ++
        }
        now_sub_idx = ((now_sub_idx % cancidate_idxs.length) + cancidate_idxs.length) % cancidate_idxs.length
        let new_sub = cancidate_idxs[now_sub_idx]

        return JSON.stringify([now_idx, new_sub])
    }
}

/** 这个函数是位置函数的备用方案，当在祖先节点中找不到一个带无鼠标元素的概念节点时，就去兄弟节点中找。 */
function activate_position_brother(editor: EditorComponent, position_list: string[], cur_position: string): string{
    let selection = editor.get_slate().selection
    if(!selection){ // 如果光标不在编辑器上
        return undefined
    }

    let now_path = selection.anchor.path // 如果光标在编辑器上，那么就选择光标开始位置作为当前节点。
    let my_idx = now_path[now_path.length-2] || 0 // 自己在父节点中的位置
    now_path = now_path.slice(0,now_path.length-2) // 向上两格，之所以要向上两格是为了跳出text，然后再跳出一格。

    let father_node = Slate.Editor.node(editor.get_slate(), now_path)[0] // 父节点
    let children = father_node["children"] as (Slate.Node[] | undefined)
    if(!children){
        return cur_position
    }
    let res_node: Slate.Node & ConceptNode = undefined
    let res_cancidate_idxs = []
    for(let _subidx in children){ // 枚举父节点的子节点。
        let subidx = parseInt(_subidx)
        if(subidx >= my_idx){ // 不要管后面的节点。
            break
        }
        let subnode = children[subidx]
        if(!slate_is_concept(subnode)){ // 跳过非概念节点。
            continue
        }
        let cancidate_idxs = get_cancidate_idxs(subnode, position_list) // 当前节点的候选位置列表。
        if(cancidate_idxs.length > 0){ // 如果有候选位置，那么就可以
            res_node = subnode
            res_cancidate_idxs = cancidate_idxs
        }
    }
    if(!res_node){
        return cur_position
    }
    res_cancidate_idxs.sort((a,b)=>a-b)
    return JSON.stringify([res_node.idx, res_cancidate_idxs[0]])
}

function get_activate_position(editor: EditorComponent){
    return (position_list: string[], cur_position: string): string => {
        let selection = editor.get_slate().selection
        if(!selection){ // 如果光标不在编辑器上
            return undefined
        }

        // 向上寻找概念节点。
        let now_path = selection.anchor.path // 如果光标在编辑器上，那么就选择光标开始位置作为当前节点。
        while(now_path.length > 0 && !slate_is_concept(Slate.Editor.node(editor.get_slate(), now_path)[0])){
            now_path = now_path.slice(0,now_path.length-1) // 反复向上寻找，直到找到一个概念节点。
        }
        let now_node = Slate.Editor.node(editor.get_slate(), now_path)[0]
        if(now_path.length == 0 || !slate_is_concept(now_node)){ // 如果退到了根节点，就退出。
            return activate_position_brother(editor, position_list, cur_position)
        }

        // 向上寻找一个带无鼠标元素的概念节点。
        let [the_node, cancidate_idxs] = get_mouseless_father(editor, now_node, position_list, false)
        if(the_node == undefined){
            return activate_position_brother(editor, position_list, cur_position)
        }

        let now_idx = the_node.idx

        if(cur_position != undefined){
            let [old_nodeidx, _] = JSON.parse(cur_position)
            if(old_nodeidx == now_idx){ // 如果还在之前的节点内，那么就保留原来的位置。
                return cur_position 
            }
        }
        
        cancidate_idxs.sort((a,b)=>a-b)
        return JSON.stringify([now_idx, cancidate_idxs[0]])
    }
}
