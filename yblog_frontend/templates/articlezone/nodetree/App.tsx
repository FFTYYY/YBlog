import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
// web.cjs is required for IE11 support
import { useSpring, animated } from 'react-spring';
import { TransitionProps } from '@mui/material/transitions';
import { axios } from "../utils"
import { DndProvider , useDrag , useDrop , DropTargetMonitor} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { node2path } from '@ftyyy/ytext/dist/lib';


type raw_info_item = [number,number,number] // 树项 id,father,idx_in_father
interface info_item {
    my_id: number
    father_id: number 
    sons: info_item[]
    idx_in_father? : number
}

interface App_State{
    nodetree: info_item
    expanded: (string | number) [] 
    id2node: { [my_ids: number] : info_item}
}

class App extends React.Component<{},App_State>{
    constructor(props: {}){
        super(props)
        this.state = {
            nodetree: {my_id: 0,father_id:0,sons:[]} , 
            expanded: [] , 
            id2node: {}
        }
    }

    /** 给定 nodetree，这个函数生成一个 id 到树节点的映射。 */
    generate_id2node(node: info_item, id2node: {[id: number]: info_item}){
        id2node[node.my_id] = node
        for(let nd of node.sons)
           this.generate_id2node(nd , id2node)
        return id2node
    }

    /** 约定：只能用这个函数更新 nodetree，永远不更新 id2node。 */
    setNodetree(nodetree: info_item){
        let id2node: {[id: number] : info_item} = this.generate_id2node(nodetree , {})
        this.setState( {nodetree: nodetree , id2node: id2node} )
    }

    async componentDidMount(){
        let raw_nodetree = (await axios.get( "/get_nodetree_info" )).data.data as raw_info_item[]
        
        this.setNodetree(this.raw_to_processed(raw_nodetree))
        this.setState({expanded: Object.values(raw_nodetree).map( (val:raw_info_item)=>val[1])})
    }

    /** 这个函数将三元组形式的描述转换成树形的描述。 */
    raw_to_processed(raw_nodetree: raw_info_item[]){
        raw_nodetree.sort(((x1: raw_info_item,x2: raw_info_item) => x1[2]<x2[2]?1:0)) // 按父节点内的顺序排序

        let _raw_to_processed = (father_id: number): info_item[] => {
            return Object.values( raw_nodetree.filter(x=>x[1] == father_id) ).map((val:raw_info_item)=>{ return {
                my_id: val[0],
                father_id: father_id,
                sons: _raw_to_processed(val[0])
            }})
        }

        return {
            my_id: -1,
            father_id: -1,
            sons: _raw_to_processed(-1)
        }
    }

    /** 这个函数将树形的描述转换成三元组的描述。 */
    processed_to_raw(nodetree: info_item){

        let _processed_to_raw = (node:info_item , idx_in_father: number): raw_info_item[] =>{
            let res = [ [node.my_id , node.father_id , idx_in_father] as raw_info_item ]
            if(node.my_id >= 0) // 不要包含一个编号小于0的节点。
                res = []

            for(let idx in node.sons){
                let subid = parseInt(idx)
                res = [...res , ... _processed_to_raw(node.sons[subid] , subid)]
            }
            return res
        }

        return _processed_to_raw( nodetree , -1 )
    }

    /** 将 id 转换为具体的 node。 */
    id2node(id: number){
        return this.state.id2node[id]
    }

    
    /** 询问 nodef 是否是 nodes 的父节点。
     */
    is_son(nodef: info_item , nodes: info_item): boolean{
        while(true){
            nodes = this.id2node(nodes.father_id)
            if(nodes.my_id == -1)
                break
            if(nodes.my_id == nodef.my_id)
                return true
        }
        return false
    }

    /** 暴力移动节点。我知道有更好的实现方式，但我懒得写了。 */
    move_node(to_move: info_item , new_father: info_item, new_idx: number){

        
        let new_nodetree = JSON.parse( JSON.stringify( this.state.nodetree ) )
        let new_id2node = this.generate_id2node(new_nodetree , {})
        
        let old_idx = to_move.idx_in_father as number // 待删除节点在父节点中的位置。

        // 转换到新树
        let old_father = new_id2node[to_move.father_id]
        new_father = new_id2node[new_father.my_id] 
        to_move = new_id2node[to_move.my_id]
        
        // 若是同子树移动，因为是先删除再插入，所以要将插入位置向前挪。
        if(old_father.my_id == new_father.my_id && old_idx < new_idx){
            new_idx --
        }
        
        // 删除
        let os = old_father.sons
        old_father.sons = [...os.slice(0,old_idx), ...os.slice(old_idx+1,os.length)]
        
        // 添加
        let ns = new_father.sons
        new_father.sons = [...ns.slice(0,new_idx) , ...[to_move] , ...ns.slice(new_idx,ns.length)]

        // 修改必要信息
        to_move.father_id = new_father.my_id

        this.setNodetree(new_nodetree)
    }

    /** 这个组件创建一个空白占位符，用于作为树节点之间的可放置位置。
     * 
     * @param props.node 这个占位符的父节点。
     * @param props.expect_idx 如果放在这个占位符处，是第几个节点。
     */
    DroppableSpace(props: {node: info_item, expect_idx: number}){
        let me = this
        let node = props.node
        let expect_idx = props.expect_idx

        const [ { is_over_can_drop } , drop] = useDrop(()=>({
            accept: "treeitem" , 
            drop: (item: info_item , monitor: DropTargetMonitor)=>{
                if(!monitor.isOver({shallow: true}))
                    return

                me.move_node(item , node , expect_idx)
            } , 
            collect: (monitor) => ({
                is_over_can_drop: monitor.isOver({shallow: true}) && monitor.canDrop(), 
            }) , 
            canDrop: (item: info_item)=>{
                return (node.my_id != item.my_id) && !me.is_son( item , node ) // 被拖动对象不能是自身的严格祖先
            } , 
        }))
    
        return <Box
            ref = {drop}
            sx = {{
                border: is_over_can_drop ? "1px dashed grey" : "0" , 
                height: "6px" , 
            }}
        ></Box>
    }

    /** 这个组件创建一个可以拖动的树节点。
     * @param props.node 这个树节点对应的节点。
     * @param props.idx_in_father 这个树节点在父节点中的编号。
     * @param props.children 这个组件的子组件（由 React 自动创建）。
     */
    DragableTreeItem(props: {node: info_item, idx_in_father: number , children: any}){
        let me = this
        let node = props.node
        let my_id = node.my_id
        let father_id = node.father_id
        let idx_in_father = props.idx_in_father
        let DroppableSpace = this.DroppableSpace.bind(this)

        const [{ is_dragging }, drag] = useDrag(() => ({
            type: "treeitem",
            item: {...node , ...{idx_in_father: idx_in_father}} , // 附加上 idx_in_father 的信息。
            collect: (monitor) => ({
                is_dragging: monitor.isDragging()
            })
        }))
        
        const [ { is_over , can_drop } , drop] = useDrop(()=>({
            accept: "treeitem" , 
            drop: (item: info_item , monitor: DropTargetMonitor)=>{
                if(!monitor.isOver({shallow: true}))
                    return
                
                if(item.my_id == node.my_id) //不执行相同节点的移动。
                    return 
                me.move_node(item , node , node.sons.length)
            } , 
            collect: (monitor) => ({
                is_over: monitor.isOver({shallow: true}), 
                can_drop: monitor.canDrop() , 
            }) , 
            canDrop: (item: info_item)=>{
                return (node.my_id == item.my_id) || !me.is_son( item , node ) // 被拖动对象不能是自身的严格祖先
            } , 
        }))
        
        return <Box
            ref = { drop }
            sx = {{
               border: (is_over && can_drop) ? "1px dashed grey" : "0" , 
            }}
        >
            <DroppableSpace node={ me.id2node(father_id) } expect_idx={idx_in_father} />
            <TreeItem 
                label = {`node-${my_id}`}
                nodeId = {`${my_id}`}
    
                ref = { drag } 
                onFocusCapture = {e => e.stopPropagation()} // 防止选择
                sx = {{
                    cursor: "move" , 
                    opacity: is_dragging ? 0.5 : 1,
                }}
            >
                {props.children}
                <DroppableSpace node={node} expect_idx={node.sons.length} />
            </TreeItem>
        </Box>
    }
    

    /** 渲染某个节点的全部子节点。 */
    get_subtree(nownode: info_item){
        let me = this
        let DragableTreeItem = this.DragableTreeItem.bind(this)


        //TODO： 做一个展开/折叠的样式，不然看起来像是有bug。
        return <>{Object.values(nownode.sons).map((subnode:info_item, idx:number)=>{
            return <DragableTreeItem 
                key = {`${idx}`} 
                node = {subnode} 
                idx_in_father = {idx} 
                children = {me.get_subtree(subnode)} 
            />
        })}</>  
    }

    render(){
        let me = this
        return <div><p>haha</p>
            <DndProvider backend={HTML5Backend}><TreeView
            expanded     = { Object.values(me.state.expanded).map(value=>`${value}`) } // 将 me.state.expanded 转成字符串数组。
            onNodeToggle = { (e:any,nodeIds: string[])=>{me.setState({expanded:nodeIds})} } // 直接设置 me.state.expanded。
        >{me.get_subtree(me.state.nodetree)}</TreeView></DndProvider>
        <p>haha</p></div>
    }
}

export default App
