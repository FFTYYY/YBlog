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
import { Interaction , BackendData , urls , url_from_root } from "../../base/interaction"
import { TitleWord } from "../../base/construction/titleword"


export { LeftBasic }


/** 这个组件显示一个导航区域。 
 * 导航区域会显示一个父节点和其全部子节点。
 * 子节点有一个按钮可以进入之。父节点有一个按钮可以进入其父节点。『进入』一个节点就是说将其作为新的父节点。
*/
class Navigation extends React.Component<{} , {

    /** 当前父节点的`id`。 */
    father_id: number

    /** 当前所有子节点的`id`。 */
    son_ids: number[]
}>{
    constructor(props){
        super(props)

        this.state = {
            father_id: BackendData.node_id , 
            son_ids: [] , // 当前展开的树节点。
        }
    }

    async set_father_id(new_father_id: number) {
        let son_ids = (await Interaction.get.son_ids(new_father_id)) as number []
        this.setState({father_id: new_father_id , son_ids: son_ids})
    }

    async componentDidMount() {
        this.set_father_id(BackendData.node_id)
    }

    /** 这个组件显示一行带按钮的文字。 */
    WordsWithButton(props:{words: any , onClick?: ((e)=>void) , title?: any, icon?: any, url: string}){
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

    /** 这个组件显示一个子节点的项。 */
    SubnodeItem(props: {node_id: number}){
        let me = this
        let node_id = props.node_id
        let [ have_sons , set_have_sons ] = React.useState(true) // 这个子节点是否还有子节点。
        let WordsWithButton = this.WordsWithButton.bind(this)

        React.useEffect(()=>{(async ()=>{
            let sons = await Interaction.get.son_ids(node_id)
            set_have_sons(sons.length > 0)
        })()})

        return <React.Fragment>{
            have_sons 
            ? <WordsWithButton // 有子节点
                words = {<TitleWord node_id={node_id} />} 
                title = "下行" 
                onClick = { ()=>me.set_father_id(node_id) }
                icon = {ArrowDownwardIcon}
                url = { urls.view.content(node_id) }
            />
            : <WordsWithButton // 不能再往下惹
                words = {<TitleWord node_id={node_id} />} 
                url = { urls.view.content(node_id) }
            />  
        }</React.Fragment>
    }

    /** 这个组件显示父节点的项。 */
    FathernodeItem(props: {node_id: number}){
        let me = this
        let node_id = props.node_id
        let WordsWithButton = this.WordsWithButton.bind(this)

        let [ father_id , set_father_id ] = React.useState(-1) // 当前父节点的父节点

        React.useEffect(()=>{(async ()=>{
            set_father_id(await Interaction.get.father_id(node_id))
        })()})

        return <React.Fragment>{
            father_id > 0
            ? <WordsWithButton  // 可以往上
                words = {<TitleWord node_id={node_id} />} 
                title = "上行" 
                onClick = { ()=>me.set_father_id(father_id)}
                icon = {ArrowUpwardIcon}
                url = { urls.view.content(node_id) }
            />
            : <WordsWithButton // 不能往上惹
                words = {<TitleWord node_id={node_id} />} 
                url = { urls.view.content(node_id) }
            />
        }</React.Fragment>
    }
    
    render(){

        let me = this
        let now_id       = this.state.father_id
        let now_son_ids  = this.state.son_ids
        let F = this.FathernodeItem.bind(this)
        let S = this.SubnodeItem.bind(this)

        return <Box sx={{marginTop: "0.5rem"}}><AutoStack force_direction="column">
            {<F node_id = {now_id}/>}
            <Box sx={{marginLeft: (theme)=>theme.printer.margins.level}}>{
                now_son_ids.map((son_id , idx)=><React.Fragment key={idx}><S node_id={son_id}/></React.Fragment>)
            }</Box>
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