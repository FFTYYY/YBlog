import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link
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
    ArrowUpward as ArrowUpwardIcon , 
    ArrowDownward as ArrowDownwardIcon , 
} from "@mui/icons-material"

import {
	YEditor , 
	EditorCore , 
	Printer , 
	DefaultPrinter , 
	DefaultEditor , 
	AutoStack , 
    AutoTooltip , 

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

    /** 这个组件是左侧的导航栏。 */
    Navigation(props: {}){
        if(this.state.now_node_id == undefined){
            return <></>
        }
        let me = this
        let now_node = this.state.id2node[ this.state.now_node_id ]
        let now_sons = now_node.sons

        let TitleWord = this.TitleWord.bind(this)

        // TODO use a special theme for this

        let WordsWithButton = (props:{words: any , onClick?: ((e)=>void) , title?: any, icon?: any, url: string}) => {
            let Icon = props.icon
            return <Box sx={{marginTop: "0.5rem"}}><AutoStack>
                {
                    Icon 
                    ? <AutoTooltip title={props.title}><IconButton size="small" sx={{height: "1rem"}} onClick={props.onClick}>
                        <Icon sx={{fontSize: "0.8rem"}}/>
                    </IconButton></AutoTooltip>
                    : <></>
                }
                <Link 
                    sx = {(theme)=>({...theme.printer.typography.structure , fontSize: "0.8rem"})} 
                    underline = "hover" 
                    href = {props.url}
                >{props.words}</Link>
            </AutoStack></Box>
        }

        return <Box sx={{marginTop: "0.5rem"}}><AutoStack force_direction="column">
            {
                now_node.father_id >= 0
                ? <WordsWithButton  // 可以往上
                    words = {<TitleWord node_id={now_node.my_id} />} 
                    title = "上行" 
                    onClick = { ()=>me.setState({now_node_id: now_node.father_id})}
                    icon = {ArrowUpwardIcon}
                    url = {"#"} // TODO specify URL
                />
                : <WordsWithButton // 不能往上惹
                    words = {<TitleWord node_id={now_node.my_id} />} 
                    url = {"#"}
                />
            }
            

            {now_node.sons.map((subnode,idx)=>{
                return <Box sx={{marginLeft: (theme)=>theme.printer.margins.level}} key={idx}>
                    {
                        subnode.sons.length > 0 
                        ? <WordsWithButton // 有子节点
                            words = {<TitleWord node_id={subnode.my_id} />} 
                            title = "下行" 
                            onClick = { ()=>me.setState({now_node_id: subnode.my_id}) }
                            icon = {ArrowDownwardIcon}
                            url = {"#"}
                        />
                        : <WordsWithButton // 不能再往下惹
                            words = {<TitleWord node_id={subnode.my_id} />} 
                            url = {"#"}
                        />  
                    }
                </Box>
            })}
        </AutoStack></Box>
    }

    /** 这个组件是一个小框。 */
    ItemBox(props: {title: string, content: string}){ 
        return <Box
            sx = {(theme)=>({marginBottom: "1rem"})}
        >
            <Typography color="text.secondary" sx={{
                marginRight: (theme)=>theme.printer.margins.colon , 
                fontSize: "0.5rem" , 
                display: "inline-block" , 
            }}>{props.title}</Typography>
            <Typography sx={{fontSize: "0.8rem" , display: "inline-block" , }}>{props.content}</Typography>
        </Box>
    }


    render(){
        let me = this
        let title = this.props.core.root.parameters.title

        // TODO use theme
        let ItemBox = this.ItemBox.bind(this)
        let Navigation = this.Navigation.bind(this)
            
        return <Box sx = {(theme)=>({...theme.printer.typography.structure})}>
            <ItemBox title="题目" content={`${title}`} />
            <ItemBox title="创建时间" content={me.state.create_time} />
            <ItemBox title="修改时间" content={me.state.modify_time} />
            <Divider sx={{fontSize: "0.8rem"}}>导航</Divider>
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