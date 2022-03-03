import * as React from "react"
import {
    Box , 
    Divider , 
} from "@mui/material"
import {
    TreeItem , TreeView , 
    TreeItemProps, treeItemClasses , 
} from "@mui/lab"
import {
    ExpandMore as ExpandMoreIcon , 
    ChevronRight as ChevronRightIcon , 
} from "@mui/icons-material"

import { DndProvider , useDrag , useDrop , DropTargetMonitor} from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { get_node_id } from "../utils"
import { FlexibleDrawer , FlexibleItem } from "../construction/framework"
import { SaveButton } from "../construction/buttons"
import { Interaction } from "../base/interaction"
import { Nodetree } from "../base/nodetree"
import type { info_item , raw_info_item } from "../base/nodetree"

interface App_State{

    /** 节点树。
    */
    nodetree: Nodetree

    /** 已经展开的节点，这是 mui TreeView 需要的状态。 */
    expanded: (string | number) [] 
}

class App extends React.Component<{},App_State>{
    constructor(props: {}){
        super(props)
        this.state = {
            nodetree: new Nodetree([]) , 
            expanded: [] , 
        }
    }


    /** 生命周期钩子。这个函数在初始化时向后端询问节点树的信息。 */
    async componentDidMount(){
        let raw_nodetree = await Interaction.get.nodetree() as raw_info_item[]
        this.setState( {
            // 注意将自己的`id`作为根节点`id`传入。
            nodetree: this.state.nodetree.update_rawinfo(raw_nodetree , get_node_id()) , 

            expanded: Object.values(raw_nodetree).map( (val:raw_info_item)=>val[1] )
        } )
    }

    

    /** 在 nodetree 中移动节点的暴力实现。我知道有更好的实现方式，但我懒得写了。
     * 注意这个函数会更新组件的 nodetree 状态。
     * @param to_move 要移动的节点。
     * @param new_father 要移动到父节点。
     * @param new_idx 要移动到新的父节点下面的第几个位置。
    */
    move_node(to_move: info_item , new_father: info_item, new_idx: number){

        // 复制一棵新树。
        let new_nodetree = this.state.nodetree.deepcopy()
                
        let old_idx = to_move.idx_in_father as number // 待删除节点在父节点中的位置。

        // 将现有的节点转换到新树
        let old_father  = new_nodetree.id2node(to_move.father_id)
        new_father      = new_nodetree.id2node(new_father.my_id)
        to_move         = new_nodetree.id2node(to_move.my_id)
        
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

        this.setState({nodetree: new_nodetree})
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
        let nodetree = this.state.nodetree

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
                return (node.my_id != item.my_id) && !nodetree.is_son( item.my_id , node.my_id ) // 被拖动对象不能是自身的严格祖先
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

    /** 这个组件渲染一个节点树的节点。这个节点可以拖动也可以放置。
     * 当拖动一个节点放到某个节点上，表示将这个节点移动到目标节点的最后一个儿子处。
     * 也可以将一个节点拖到某个空隙（ DroppableSpace ）处。
     * 
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
        let nodetree = this.state.nodetree
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
                return (node.my_id == item.my_id) || !nodetree.is_son( item.my_id , node.my_id ) // 被拖动对象不能是自身的严格祖先
            } , 
        }))
        
        return <Box
            ref = { drop }
            sx = {{
               border: (is_over && can_drop) ? "1px dashed grey" : "0" , 
            }}
        >
            <DroppableSpace node={ nodetree.id2node(father_id) } expect_idx={idx_in_father} />
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
    

    /** 渲染某个节点的全部子节点。 
    */
    get_subtree(nownode: info_item){
        let me = this
        let DragableTreeItem = this.DragableTreeItem.bind(this)

        //TODO： 做一个展开/折叠的样式，不然看起来像是有bug。
        return <>{Object.values(nownode.sons).map((subnode:info_item, idx:number)=>{
            return <DragableTreeItem
                key = {`${idx}`} 
                node = {subnode} 
                idx_in_father = {idx} 
            >
                {me.get_subtree(subnode)}
            </DragableTreeItem>
        })}</>  
    }

    async save_nodetree(){
		return await Interaction.post.nodetree( {"nodetree": this.state.nodetree.get_raw()} )
    }

    render(){
        let me = this
        let nodetree = this.state.nodetree

        return <Box sx={{
                position: "absolute" , 
				top: "2%" ,
				left: "2%" , 
				height: "96%" , 
				width: "96%" , 
				display: "flex" ,
            }}>
            <FlexibleDrawer sx={{
				marginRight: "1%"
			}}>
				<SaveButton save_func={me.save_nodetree.bind(me)}/>
			</FlexibleDrawer>

            <Box sx={{
                position: "relative" ,
                width: "100%" , 
                flex: 1 , 
            }}>
                <Divider/>
                <DndProvider backend={HTML5Backend}><TreeView
                    expanded     = { Object.values(me.state.expanded).map(value=>`${value}`) } // 将 me.state.expanded 转成字符串数组。
                    onNodeToggle = { (e:any,nodeIds: string[])=>{me.setState({expanded:nodeIds})} } // 直接设置 me.state.expanded。
                    defaultCollapseIcon = {<ExpandMoreIcon />}
                    defaultExpandIcon = {<ChevronRightIcon />}              
                >{me.get_subtree(nodetree.get_root())}</TreeView></DndProvider>
                <Divider/>
            </Box>
        </Box>
    }
}

export default App
