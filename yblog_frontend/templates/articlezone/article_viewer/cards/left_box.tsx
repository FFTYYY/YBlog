import React from "react"

import {
    Tabs , Tab , Button , 
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
    PrinterStructureBoxText  , 
    PrinterParagraphBox , 
    PrinterPartBox , 
    PrinterNewLevelBox , 
    PrinterOldLevelBox , 
    PrinterBackgroundPaper , 
	get_DefaultStructPrinter , 
} from "../../../../lib"
import { get_node_information , post_node_information } from "../../utils/ineraction"
import { get_node_id } from "../../utils"
import { raw_to_processed , processed_to_raw , generate_id2node } from "../../utils/nodetree"
import type { raw_info_item , info_item } from "../../utils/nodetree"


export { LeftBox }



interface BasicInformation_Props{
    core: EditorCore
}

interface BasicInformation_State{
    create_time: any
    modify_time: any
    nodetree: info_item
    now_node_id: number
    id2node: {[key: number]: info_item}
}
class BasicInformation extends React.Component<BasicInformation_Props , BasicInformation_State>{
    constructor(props: BasicInformation_Props){
        super(props)

        this.state = {
            create_time: undefined , 
            modify_time: undefined , 

            nodetree: undefined , 
            id2node: undefined , 
            now_node_id: undefined , // 当前展开的树节点。
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

        let raw_nodetree = await get_node_information("get_nodetree_info" , "data" , 0) as raw_info_item[]
        let nodetree = raw_to_processed(raw_nodetree)
        this.setState({nodetree: nodetree , id2node: generate_id2node(nodetree) , now_node_id: get_node_id()})
    }

    /** 这个组件异步加载一个节点的标题，等加载好了就现实出来。 */
    TitleWord(props: {node_id: number}){
        let [title , set_title] = React.useState("")

        React.useEffect(()=>{(async ()=>{
            let root = await get_node_information("get_node" , "content" , props.node_id)
            set_title(root.parameters.title) 
        })()} , [])
        return <>{title}</>
    }

    Navigation(props: {}){
        if(this.state.now_node_id == undefined){
            return <></>
        }
        let now_node = this.state.id2node[ this.state.now_node_id ]
        let now_sons = now_node.sons

        let TitleWord = this.TitleWord.bind(this)

        
        return <Box sx={{marginTop: "1rem"}}>
            <Button>UP</Button><Typography><TitleWord node_id={now_node.my_id} /></Typography>
            {now_node.sons.map((subnode,idx)=>{
                return <Box sx={{marginLeft: (theme)=>theme.printer.margins.level}} key={idx}>
                    <Button>DW</Button><Typography><TitleWord node_id={subnode.my_id} /></Typography>
                </Box>
            })}
        </Box>
    }

    render(){
        let me = this
        let title = this.props.core.root.parameters.title

        // TODO use theme
        const ItemBox = (props: {title: string, content: string}) => <Box
            sx = {(theme)=>({marginBottom: "1rem"})}
        >
            <Typography color="text.secondary" sx={{
                marginRight: (theme)=>theme.printer.margins.colon , 
                fontSize: "0.5rem" , 
                display: "inline-block" , 
            }}>{props.title}</Typography>
            <Typography sx={{fontSize: "0.8rem" , display: "inline-block" , }}>{props.content}</Typography>
        </Box>

        let Navigation = this.Navigation.bind(this)
            
        return <Box sx = {(theme)=>({...theme.printer.typography.structure})}>
            <ItemBox title="题目" content={`${title}`} />
            <ItemBox title="创建时间" content={me.state.create_time} />
            <ItemBox title="修改时间" content={me.state.modify_time} />
            <Divider>导航</Divider>
            <Navigation />
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