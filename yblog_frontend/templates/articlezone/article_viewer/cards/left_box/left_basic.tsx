/** 这个模块定义左侧边栏的基本信息区。 */

import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , Chip , Paper , 
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
    AbstractNode , 
    ScrollBarBox , 
    PrinterStructureBoxText , 

    ThemeContext , 
    Theme , 
} from "@ftyyy/ytext"
import { Nodetree } from "../../../base/nodetree"
import type { raw_info_item } from "../../../base/nodetree"
import { Interaction , BackendData , urls , url_from_root } from "../../../base/interaction"
import { TitleWord } from "../../../base/construction/titleword"


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
        let son_ids = (await Interaction.get.son_ids(BackendData.node_id)) as number [] // 当前节点的子节点
        if(son_ids.length == 0){
            let father_id = (await Interaction.get.father_id(BackendData.node_id)) as number // 将当前节点的父节点作为父节点。
            this.set_father_id(father_id)
        }
        else{
            this.set_father_id(BackendData.node_id)
        }
    }

    /** 这个组件显示一行带按钮的文字。 */
    WordsWithButton(props:{words: any , onClick?: ((e)=>void) , title?: any, icon?: any, url: string}){
        let Icon = props.icon
        return <Box sx={{marginTop: "0.5rem"}}><AutoStack>
            <Box sx={{flex: "0 0 1.5rem"}} key="box">{
                Icon 
                ? <AutoTooltip title={props.title}><IconButton size="small" onClick={props.onClick}>
                    <Icon sx={{fontSize: "0.9rem"}}/>
                </IconButton></AutoTooltip>
                : <></>
            }</ Box>
            <Link 
                key = "link"
                sx = {{fontSize: "0.9rem"}} 
                underline = "hover" 
                href = {props.url}
                color = "text.primary"
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
                key = "word"
                words = {<TitleWord node_id={node_id} />} 
                title = "下行" 
                onClick = { ()=>me.set_father_id(node_id) }
                icon = {ArrowDownwardIcon}
                url = { urls.view.content(node_id) }
            />
            : <WordsWithButton // 不能再往下惹
                key = "word"
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
            <Box sx={{marginLeft: "1rem"}}>{
                now_son_ids.map((son_id , idx)=><React.Fragment key={idx}><S node_id={son_id}/></React.Fragment>)
            }</Box>
        </AutoStack></Box>
    }

}

/** 这个组件显示一些基本的信息。 */
class BasicInformation extends React.Component<{
    root: AbstractNode
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
        let time_info = await Interaction.get.create_time(BackendData.node_id)
        this.setState({
            create_time: time_info.create_time , 
            modify_time: time_info.modify_time , 
        })

    }

    render(){
        let me = this
        let title = this.props.root.parameters.title.val

        let ItemBox = (props: {title: string, content: string}) => { 
            let theme = React.useContext(ThemeContext)
            return <Box
                sx = {{marginBottom: "1rem"}}
            >
                <Typography color="text.secondary" sx={{
                    marginRight: theme.printer.margins.colon , 
                    fontSize: "0.5rem" , 
                    display: "inline-block" , 
                }}>{props.title}</Typography>
                <Typography sx={{fontSize: "0.8rem" , display: "inline-block" , }}>{props.content}</Typography>
            </Box>
        }
            
        return <Box>
            {/* <ItemBox title="题目" content={`${title}`} /> */}
            <ItemBox title="创建时间" content={me.state.create_time} />
            <ItemBox title="修改时间" content={me.state.modify_time} />
        </Box>
    }
}

/** 这个组件是左边基本信息部分的总体。 */
class LeftBasic extends React.Component<{root: AbstractNode}>{
    static contextType = ThemeContext
    constructor(props){
        super (props)
    }
    render(){
        let theme = this.context as Theme
        return <Box sx = {{
            ...theme.printer.fonts.body , 
            position: "absolute" , 
            top: "2%",
            bottom : "2%" ,  
            width: "100%" , 
        }}>
            <Box sx = {{
                position: "absolute" , 
                paddingLeft: "1rem", 
                paddingRight: "0.5rem", 
                paddingY: "0.25rem" , 
                backgroundColor: "background.default" , 
                top: "1%" , 
                left: "0" , 
                height: "23%" ,  
                width: "100%" , 
            }}>
                
                <Box sx={{textAlign: "right"}}><Chip  label="基本信息"  variant="outlined" color="secondary" size="small" /></Box>
                <ScrollBarBox sx = {{
                    position: "absolute" , 
                    top: "2.25rem" , 
                    bottom: "0.5rem", 
                    left: "1rem" , 
                    right: "0.25rem" , 
                    overflow: "auto" , 
                }}>
                    <BasicInformation root={this.props.root}/>
                </ScrollBarBox>
            </Box>

            <Box sx = {{
                position: "absolute" , 
                paddingX: "0.5rem", 
                paddingY: "0.25rem" , 
                backgroundColor: "background.default" , 
                top: "27%" , 
                bottom: "2%" , 
                width: "100%" , 
            }}>
                <Box sx={{textAlign: "right"}}><Chip  label="其他文章"  variant="outlined" color="secondary" size="small" /></Box>

                <ScrollBarBox sx = {{
                    position: "absolute" , 
                    top: "2.25rem" , 
                    bottom: "0.5rem", 
                    left: "0.5rem" , 
                    right: "0.25rem" , 
                    overflow: "auto" , 
                }}>
                    <Navigation />
                </ScrollBarBox>
            </Box>
        </Box>
    }
}