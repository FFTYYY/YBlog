import * as React from "react"
import {
    Box , 
    Divider , 
    Checkbox  , 
    Typography , 
    Link , 
    IconButton , 
} from "@mui/material"
import {
    TreeItem , TreeView , 
    TreeItemProps, treeItemClasses , 
} from "@mui/lab"

import {
    ExpandMore as ExpandMoreIcon , 
    ChevronRight as ChevronRightIcon , 
    Save as SaveIcon , 
} from "@mui/icons-material"

import { DndProvider , useDrag , useDrop , DropTargetMonitor} from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { Interaction , BackendData , url_from_root } from "../base/interaction"
import { Nodetree } from "../base/nodetree"
import { TitleWord } from "../base/construction/titleword"
import type { info_item , raw_info_item } from "../base/nodetree"
import { AutoStack , AutoTooltip ,  } from "@ftyyy/ytext"

class SaveButton extends React.Component<{
    save_func: (()=>Promise<boolean>)
} , {
    snackbar_open: boolean
    status: boolean
}>{
    constructor(props){
        super(props)

        this.state = {
            snackbar_open: false , 
            status: false , 
        }
    }

    render(){
        let me = this

        return <React.Fragment>
            <AutoTooltip title="保存"><IconButton size="small" onClick = {()=>this.props.save_func()}>
                    <SaveIcon fontSize="small" color="primary"/>
            </IconButton></AutoTooltip>
        </React.Fragment>
    }
}



interface App_State{

    /** 节点树。
    */
    nodetree: Nodetree

    /** 已经展开的节点，这是 mui TreeView 需要的状态。 */
    expanded: (string | number) [] 
}

/** 只要祖先或者自己有一个不可见就返回`true`。 */
function is_secret(tree: Nodetree , node: info_item){
    if(node.secret)
        return true

    if(node.father_id > 0)
        return is_secret(tree , tree.id2node(node.father_id))
    return false
}

class App extends React.Component<{},App_State>{
    raw_nodetree?: raw_info_item[]
    constructor(props: {}){
        super(props)
        this.state = {
            nodetree: new Nodetree([]) , 
            expanded: [] , 
        }
    }


    /** 生命周期钩子。这个函数在初始化时向后端询问节点树的信息。 */
    async componentDidMount(){
        let raw_nodetree = []
        if(BackendData.shallow){
            raw_nodetree = await Interaction.get.shallowtree(BackendData.node_id) as raw_info_item[]
        }
        else{

            raw_nodetree = await Interaction.get.nodetree(BackendData.node_id) as raw_info_item[]
        }
        this.setState( {
            // 注意将自己的`id`作为根节点`id`传入。
            nodetree: this.state.nodetree.update_rawinfo(raw_nodetree , BackendData.node_id) , 

            expanded: Object.values(raw_nodetree).map( (val:raw_info_item)=>val[1] )
        } )
        this.raw_nodetree = raw_nodetree
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
        let node_is_secret = is_secret(this.state.nodetree , node)

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
                label = { 
                    <Box 
                        color = {node_is_secret ? "text.secondary" : "text.primary"}
                    ><AutoStack force_direction="row">
                        <Typography sx={{marginY: "auto"}}>[{my_id}] <TitleWord node_id={my_id}/></Typography>
                        <Checkbox 
                            onClick={(e)=>{e.stopPropagation()}} // 防止点击传递到`TreeItem`上。
                            defaultChecked = {node.secret}
                            onChange={(e)=>{
                                let new_tree = this.state.nodetree.deepcopy() // 复制一棵新的树
                                new_tree.id2node(my_id).secret = e.target.checked // 设置新树上的节点属性
                                this.setState({nodetree: new_tree})
                            }}
                        />
                        <Link href={url_from_root(`/edit/content/${my_id}`)}>编辑</Link>
                    </AutoStack></Box>
                }
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

        //TODO 做一个展开/折叠的样式，不然看起来像是有bug。
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
        let orig_raw_info = this.raw_nodetree
        let raw_info_convenient = orig_raw_info.reduce((obj,dat)=>{
            let [id,father_id,idx_in_father,secret] = dat
            obj[id] = [father_id,idx_in_father,secret]
            return obj
        } , {})
        let raw_info = this.state.nodetree.get_raw()
        let to_update = []
        for(let [id,father_id,idx_in_father,secret] of raw_info){
            let my_dat = [father_id,idx_in_father,secret]
            if( JSON.stringify(my_dat) != JSON.stringify(raw_info_convenient[id]) ){ // 如果有修改
                to_update.push([id,father_id,idx_in_father,secret])
            }
        }

        console.log(to_update.length)
        let status = true
        let bs = 50
        for(let i = 0;i < to_update.length;i += bs){
            status = status && (await Interaction.post.nodetree( {"nodetree": to_update.slice(i,i+bs)} , BackendData.node_id))
            console.log(`${i} / ${to_update.length}`) // TODO 搞成好看点的提示信息。
            console.log(status)
        }

		return status
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
            <Box sx={{
				marginRight: "1%"
			}}>
				<SaveButton save_func={me.save_nodetree.bind(me)}/>
			</Box>

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
