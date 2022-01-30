import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
// web.cjs is required for IE11 support
import { useSpring, animated } from 'react-spring';
import { TransitionProps } from '@mui/material/transitions';
import { axios } from "../utils"

type info_item = [number,number,number] // 树项

interface App_State{
    nodetree: info_item[] // id,father_id,index
    expanded: (string | number) []
}

class App extends React.Component<{},App_State>{
    constructor(props: {}){
        super(props)
        this.state = {
            nodetree: [] , 
            expanded: [] , 
        }
    }

    async componentDidMount(){
        let nodetree = (await axios.get( "/get_nodetree_info" )).data.data as info_item[]
        nodetree.sort((x1: info_item,x2: info_item):number => ( (x1[1] == x2[1]) ? (x1[2] < x2[2]) : (x1[1] < x2[1]) ) ? 1 : 0  ) // 按父节点id排序
        
        this.setState({nodetree: nodetree})
        this.setState({expanded: Object.values(nodetree).map( (val:info_item)=>val[1])})
    }

    /** 渲染某个节点的全部子节点。 */
    get_subtree(father_id: number){
        let me = this
        let subtree = this.state.nodetree.filter(x=>x[1] == father_id)
        return <>{Object.keys(subtree).map((key:string, idx:number)=>{
            let [my_id , father_id , idx_in_father] = subtree[idx]
            return <TreeItem key={key} nodeId={`${my_id}`} label={
                `node-${my_id}`
            }>
                {me.get_subtree(my_id)}
            </TreeItem>
        })}</>
    }

    render(){
        let me = this
        return <TreeView
            expanded     = { Object.values(me.state.expanded).map(value=>`${value}`) } // 将 me.state.expanded 转成字符串数组。
            onNodeToggle = { (e:any,nodeIds: string[])=>{me.setState({expanded:nodeIds})} } // 直接设置 me.state.expanded。
        >{me.get_subtree(-1)}</TreeView>
    }
}

export default App
