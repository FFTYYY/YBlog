import React from "react"

import {
    Tabs , Tab , 
    Box , Divider , Typography
} from "@mui/material"
import {
    TabContext  , 
    TabList  , 
    TabPanel   , 
    useTreeItem , 
    TreeItemContentProps , 
} from "@mui/lab"

import {
    TreeItem , TreeView , 
    TreeItemProps, treeItemClasses , 
} from "@mui/lab"
import {
    ExpandMore as ExpandMoreIcon , 
    ChevronRight as ChevronRightIcon , 
} from "@mui/icons-material"

import {
	YEditor , 
	EditorCore , 
	Printer , 
	DefaultPrinter , 
	DefaultEditor , 
	AutoStack , 

	PrinterDivider , 
    PrinterWeakenText , 
    PrinterDisplayText , 
    PrinterTitleBoxText  , 
    PrinterParagraphBox , 
    PrinterPartBox , 
    PrinterNewLevelBox , 
    PrinterOldLevelBox , 
    PrinterBackgroundPaper , 
	get_DefaultStructPrinter , 
} from "../../../../lib"
import { get_node_information , post_node_information } from "../../utils/ineraction"
import { raw_to_processed , processed_to_raw } from "../../utils/nodetree"
import type { raw_info_item , info_item } from "../../utils/nodetree"


export { LeftBox }



interface BasicInformation_Props{
    core: EditorCore
}

interface BasicInformation_State{
    create_time: any
    modify_time: any
    nodetree: any

    /** 已经展开的节点，这是 mui TreeView 需要的状态。 */
    expanded: string [] 
}
class BasicInformation extends React.Component<BasicInformation_Props , BasicInformation_State>{
    constructor(props: BasicInformation_Props){
        super(props)

        this.state = {
            create_time: undefined , 
            modify_time: undefined , 
            nodetree: undefined , 
            expanded: [] , 
        }
    }

    get_my_treeitem(){
        return React.forwardRef((props: TreeItemContentProps , ref) => {
            const { classes, className, label, nodeId, icon: iconProp, expansionIcon, displayIcon } = props
            const { disabled, expanded, selected, focused, handleExpansion, handleSelection, preventSelection } = useTreeItem(nodeId)
            const icon = iconProp || expansionIcon || displayIcon

            return <Box
                className = {[
                    className , 
                    classes.root , 
                    classes.expanded ? expanded : "" , 
                    classes.selected ? selected : "" , 
                    classes.focused ? focused : "" , 
                    classes.disabled ? disabled : "" , 
                ].join(" ")}            
                ref = {ref}
            >
                <Box onClick = {(e)=>handleExpansion(e)} className={classes.iconContainer}>
                    {icon}
                </Box>
                <a className = {classes.label} href="http://www.baidu.com">
                    {label}
                </a>
            </Box>
        })
    }      
    /** 渲染某个节点的全部子节点。 
    */
    get_subtree(nownode: info_item){
        let me = this    
        let MyTreeItem = this.get_my_treeitem()

        function SubTree(props: {subnode: info_item}){
            let subnode = props.subnode
            let subid = subnode.my_id

            let [title , set_title] = React.useState("")

            React.useEffect(()=>{(async ()=>{
                let root = await get_node_information("get_node" , "content" , subid)
                set_title(root.parameters.title) 
            })()} , [])
            
            return <TreeItem
                label = {`${title}`}
                nodeId = {`${subid}`}
                ContentComponent = {MyTreeItem}
                // onFocusCapture = {e => e.stopPropagation()} // 防止选择
            >
                {me.get_subtree(subnode)}
            </TreeItem>

        }

        return <>{Object.values(nownode.sons).map((subnode:info_item, idx:number)=>{
            return <SubTree subnode={subnode} key={idx}/>
        })}</>  
    }

    async componentDidMount() {
        let time_info = await get_node_information("get_node_create_time")
        this.setState({
            create_time: time_info.create_time , 
            modify_time: time_info.modify_time , 
        })

        let raw_nodetree = await get_node_information("get_nodetree_info" , "data") as raw_info_item[]
        let nodetree = raw_to_processed(raw_nodetree)
        this.setState({nodetree: nodetree})

        let all_ids = raw_nodetree.map((x)=>`${x[0]}`)
        this.setState({expanded: all_ids})
    }

    render(){
        let me = this
        let title = this.props.core.root.parameters.title
            
        return <Box>
            <PrinterTitleBoxText>题目：{title}</PrinterTitleBoxText>
            <PrinterTitleBoxText>创建时间：{me.state.create_time}</PrinterTitleBoxText>
            <PrinterTitleBoxText>修改时间：{me.state.modify_time}</PrinterTitleBoxText>
            <TreeView
                expanded     = { me.state.expanded } // 将 me.state.expanded 转成字符串数组。
                onNodeToggle = { (e:any,nodeIds: string[])=>{me.setState({expanded:nodeIds})} } // 直接设置 me.state.expanded。
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}          
            >
                {me.state.nodetree ? me.get_subtree(me.state.nodetree) : undefined}
            </TreeView>
        </Box>
    }
}

function LeftBox(props: {core: EditorCore}){
    const [active_tab, set_active_tab] = React.useState("1");

    return <TabContext value={active_tab}><Box>
        <TabList onChange={(e,v)=>set_active_tab(v)} variant="scrollable" scrollButtons="auto">
            <Tab label = "基本" value = "1"/>
            <Tab label = "留言" value = "2"/>
            <Tab label = "哈哈" value = "3"/>
        </TabList >
        <TabPanel value=  "1"><BasicInformation core={props.core}/></TabPanel>
        <TabPanel value=  "2">留言</TabPanel>
        <TabPanel value=  "3">aaa</TabPanel>
    </Box></TabContext>
}