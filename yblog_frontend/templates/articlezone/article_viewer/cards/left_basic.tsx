/** 这个模块定义左侧边栏的基本信息区。 */

import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , Chip
} from "@mui/material"
import {
    ExpandMore as ExpandMoreIcon , 
    ChevronRight as ChevronRightIcon , 
    ArrowUpward as ArrowUpwardIcon , 
    ArrowDownward as ArrowDownwardIcon , 
} from "@mui/icons-material"

import {
	EditorCore , 
	AutoStack , 
    AutoTooltip , 
} from "../../../../lib"
import { Nodetree } from "../../base/nodetree"
import type { raw_info_item } from "../../base/nodetree"
import { Interaction , BackendData } from "../../base/interaction"


export { LeftBasic }

/** 这个组件异步加载一个节点的标题，等加载好了就现实出来。 */
class TitleWord extends React.Component<{node_id: number} , {title: string | undefined}>{
    constructor(props){
        super(props)

        this.state = {
            title: undefined
        }
    }

    async componentDidMount() {
        let root = await Interaction.get.content(this.props.node_id)
        this.setState({title: root.parameters.title}) 
    }

    render(){
        return <>{this.state.title}</>
    }
}

/** 这个组件显示一个导航区域。 
 * 导航区域会显示一个父节点和其全部子节点。
 * 子节点有一个按钮可以进入之。父节点有一个按钮可以进入其父节点。『进入』一个节点就是说将其作为新的父节点。
*/
class Navigation extends React.Component<{} , {

    /** 总的节点树。 */
    nodetree: Nodetree

    /** 当前父节点的`id`。 */
    now_node_id: number
}>{
    constructor(props){
        super(props)

        this.state = {
            nodetree: undefined , 
            now_node_id: undefined , // 当前展开的树节点。
        }
    }

    async componentDidMount() {
        let raw_nodetree = await Interaction.get.nodetree(0) as raw_info_item[]
        this.setState({nodetree: new Nodetree(raw_nodetree) , now_node_id: BackendData.node_id})
    }

    render(){

        if(this.state.now_node_id == undefined){
            return <></>
        }
        let me = this
        let now_node = this.state.nodetree.id2node( this.state.now_node_id )

        // TODO use a special theme for this
        let WordsWithButton = (props:{words: any , onClick?: ((e)=>void) , title?: any, icon?: any, url: string}) => {
            let Icon = props.icon
            return <Box sx={{marginTop: "0.5rem"}}><AutoStack>
                {
                    Icon 
                    ? <AutoTooltip title={props.title}><IconButton size="small" sx={{height: "0.9rem", marginY: "auto"}} onClick={props.onClick}>
                        <Icon sx={{fontSize: "0.9rem"}}/>
                    </IconButton></AutoTooltip>
                    : <></>
                }
                <Link 
                    sx = {(theme)=>({fontSize: "0.9rem"})} 
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

}

/** 这个组件显示一些基本的信息。 */
class BasicInformation extends React.Component<{
    core: EditorCore
} , {
    create_time: any , 
    modify_time: any , 
}>{
    constructor(props){
        super(props)

        this.state = {
            create_time: undefined , 
            modify_time: undefined , 
        }
    }

    async componentDidMount() {
        let time_info = await Interaction.get.create_time()
        this.setState({
            create_time: time_info.create_time , 
            modify_time: time_info.modify_time , 
        })

    }

    render(){
        let me = this
        let title = this.props.core.root.parameters.title

        // TODO use theme
        let ItemBox = (props: {title: string, content: string}) => { 
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
            
        return <React.Fragment>
            <ItemBox title="题目" content={`${title}`} />
            <ItemBox title="创建时间" content={me.state.create_time} />
            <ItemBox title="修改时间" content={me.state.modify_time} />
        </React.Fragment>
    }
}

/** 这个组件是左边基本信息部分的总体。 */
class LeftBasic extends React.Component<{core: EditorCore}>{
    constructor(props){
        super (props)
    }
    render(){
        return <Box sx = {(theme)=>({...theme.printer.typography.body})}>
            <BasicInformation core={this.props.core}/>
            <Divider sx={{fontSize: "0.8rem"}}><Chip sx={{fontSize: "0.8rem"}} label="导航" /></Divider>
            <Navigation />
        </Box>
    }
}