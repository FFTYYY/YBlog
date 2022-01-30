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

    /** 约定：只能用这个函数更新 nodetree，永远不更新 id2node。 */
    setNodetree(nodetree: info_item){

        let id2node: {[id: number] : info_item} = {}

        function _search(node: info_item){
            id2node[node.my_id] = node
            for(let nd of node.sons)
                _search(nd)
        }

        _search(nodetree)

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
            if(node.my_id < 0) // 不要包含一个编号小于0的节点。
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

    DroppableSpace(props: {node: info_item, expect_idx: number}){
        let me = this
        let node = props.node
        let expect_idx = props.expect_idx

        const [ { isOver } , drop] = useDrop(()=>({
            accept: "treeitem" , 
            drop: ()=>{console.log("???")} , 
            collect: (monitor) => ({
                isOver: monitor.isOver({shallow: true}) && monitor.canDrop(), 
            }) , 
            canDrop: (item: info_item)=>{
                return (node.my_id != item.my_id) && !me.is_son( item , node ) // 被拖动对象不能是自身的严格祖先
            } , 
        }))
    
        return <Box
            ref = {drop}
            sx = {{
                border: isOver ? "1px dashed grey" : "0" , 
                height: "4px" , 
            }}
        ></Box>
    }

    
    DragableTreeItem(props: {node: info_item, idx_in_father: number, children: any}){
        let me = this
        let node = props.node
        let my_id = node.my_id
        let father_id = node.father_id
        let idx_in_father = props.idx_in_father
        let DroppableSpace = this.DroppableSpace.bind(this)

        const [{ isDragging }, drag] = useDrag(() => ({
            type: "treeitem",
            item: node , 
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            })
        }))
        
        const [ { isOver } , drop] = useDrop(()=>({
            accept: "treeitem" , 
            drop: (item)=>{console.log("haha")} , 
            collect: (monitor) => ({
                isOver: monitor.isOver({shallow: true}) && monitor.canDrop() , 
            }) , 
            canDrop: (item: info_item)=>{
                return (node.my_id == item.my_id) || !me.is_son( item , node ) // 被拖动对象不能是自身的严格祖先
            } , 
        }))

        
        return <Box
            ref = {drop}
            sx = {{
                border: isOver ? "1px dashed grey" : "0" , 
            }}
        >
            <DroppableSpace node={ me.id2node(father_id) } expect_idx={idx_in_father} />
            <TreeItem 
                label = {`node-${my_id}`}
                nodeId = {`${my_id}`}
    
                ref = {drag} 
                onFocusCapture = {e => e.stopPropagation()} // 防止选择
                sx = {{
                    cursor: "move" , 
                    opacity: isDragging ? 0.5 : 1,
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

        return <>{Object.values(nownode.sons).map((subnode:info_item, idx:number)=>{
            return <DragableTreeItem key={idx} node={subnode} idx_in_father={idx}>
                {me.get_subtree(subnode)}
            </DragableTreeItem>
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
