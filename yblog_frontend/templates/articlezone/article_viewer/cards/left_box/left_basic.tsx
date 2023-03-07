/** 这个模块定义左侧边栏的基本信息区。 */

import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , Chip , Paper , Avatar 
} from "@mui/material"
import {
    ExpandMore as ExpandMoreIcon , 
    ChevronRight as ChevronRightIcon , 
    ArrowUpward as ArrowUpwardIcon , 
    ArrowDownward as ArrowDownwardIcon , 
    DoNotTouch as DoNotTouchIcon  , 
    TaxiAlert  as TaxiAlertIcon ,
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
import { MathJaxFlusher } from "../../../base/construction/math"


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

    /** 杂陈节点的`id`。 */
    indis_ids: number[]
}>{
    constructor(props){
        super(props)

        this.state = {
            father_id: BackendData.node_id , 
            son_ids: [] , // 当前展开的树节点。
            indis_ids: [] , // 当前的杂陈节点。
        }
    }

    async set_father_id(new_father_id: number) {
        let son_ids = (await Interaction.get.son_ids(new_father_id)) as number []

        
        let indiscriminants = (await Interaction.get.indiscriminates(new_father_id)) as number []

        this.setState({
            father_id: new_father_id , 
            son_ids  : son_ids , 
            indis_ids: indiscriminants , 
        })
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
    WordsWithButton(props:{
        words: any , 
        title?: any, 
        icon?: any, 
        url: string, 
        onClick?: ((e)=>void) , 

        weak?: boolean, 
        indis?: boolean
    }){
        let Icon = props.icon
        
        let middle_width = "80%" // 中间部分的长度
        if(props.weak && props.indis)
            middle_width = "75%"

        return <Box sx={{marginTop: "0.5rem"}}>
            <Box key="box" sx={{display: "inline-block", width: "1.5rem", verticalAlign:"top"}}>{
                Icon 
                ? <AutoTooltip title={props.title}><IconButton size="small" onClick={props.onClick}>
                    <Icon sx={{fontSize: "0.9rem"}}/>
                </IconButton></AutoTooltip>
                : <></>
            }</ Box>

            <Box key="link" sx={{display: "inline-block", left: "1.5rem", width: middle_width }}>{
                <Link 
                    sx = {{fontSize: "0.9rem", textAlign: "left", }} 
                    underline = "hover" 
                    href = {props.url}
                    color = {"text.primary"}
                >{props.words}</Link>
            }</ Box>
            {
                props.weak ? 
                <Box key="unseen" sx={{display: "inline-block", right: 0, height: "1.2rem", position: "absolute"}}>
                    <AutoTooltip title="不让看"><DoNotTouchIcon color="secondary" sx={{fontSize: "1.2rem"}}/></AutoTooltip>
                </ Box>
                : <></>
            }
            {
                props.indis ? 
                <Box key="indis" sx={{display: "inline-block", right: "1.2rem", height: "1.2rem", position: "absolute"}}>
                    <AutoTooltip title="杂陈"><TaxiAlertIcon color="secondary" sx={{fontSize: "1.2rem"}}/></AutoTooltip>
                </ Box>
                : <></>
            }
        </Box>
    }

    /** 这个组件显示一个子节点的项。 
     * @param props.node_id 这个节点的`id`。
     * @param props.indis 这个节点是不是一个杂陈节点。
    */
    SubnodeItem(props: {node_id: number, indis?: boolean}){
        let me = this
        let node_id = props.node_id
        let [ have_sons , set_have_sons ] = React.useState(true) // 这个子节点是否还有子节点。
        let [ visible   , set_visible   ] = React.useState(false) // 这个节点是否不可见。
        let WordsWithButton = this.WordsWithButton.bind(this)

        React.useEffect(()=>{(async ()=>{
            let sons = await Interaction.get.son_ids(node_id)
            set_have_sons(sons.length > 0)

            let visibility = await Interaction.get.visibility(node_id)
            set_visible(!visibility.secret)
        })()})


        return <React.Fragment><MathJaxFlusher>{
            have_sons 
            ? <WordsWithButton // 有子节点
                key   = "word"
                words = {<TitleWord node_id={node_id} />} 
                title = "下行" 
                onClick = { ()=>me.set_father_id(node_id) }
                icon  = {ArrowDownwardIcon}
                url   = { urls.view.content(node_id) }
                weak  = { !visible}
                indis = { props.indis }
            />
            : <WordsWithButton // 不能再往下惹
                key   = "word"
                words = {<TitleWord node_id={node_id} />} 
                url   = { urls.view.content(node_id) }
                weak  = { !visible }
                indis = { props.indis }
            />  
        }</MathJaxFlusher></React.Fragment>
    }

    /** 这个组件显示父节点的项。 */
    FathernodeItem(props: {node_id: number}){
        let me = this
        let node_id = props.node_id
        let WordsWithButton = this.WordsWithButton.bind(this)

        let [ father_id , set_father_id ] = React.useState(-1) // 当前父节点的父节点
        let [ visible   , set_visible   ] = React.useState(true) // 当前父节点是否不可见。

        React.useEffect(()=>{(async ()=>{
            let _father_id = await Interaction.get.father_id(node_id)
            set_father_id(_father_id)

            let visibility = await Interaction.get.visibility(node_id)
            set_visible(!visibility.secret)
        })()})

        return <React.Fragment><MathJaxFlusher>{
            father_id > 0
            ? <WordsWithButton  // 可以往上
                words = {<TitleWord node_id={node_id} />} 
                title = "上行" 
                onClick = { ()=>me.set_father_id(father_id)}
                icon = {ArrowUpwardIcon}
                url = { urls.view.content(node_id) }
                weak = { !visible }
            />
            : <WordsWithButton // 不能往上惹
                words = {<TitleWord node_id={node_id} />} 
                url = { urls.view.content(node_id) }
                weak = { !visible }
            />
        }</MathJaxFlusher></React.Fragment>
    }
    
    render(){

        let me = this
        let now_id          = this.state.father_id
        let now_son_ids     = this.state.son_ids
        let now_indis_ids   = this.state.indis_ids
        let F = this.FathernodeItem.bind(this)
        let S = this.SubnodeItem.bind(this)


        return <Box sx={{marginTop: "0.5rem"}}><AutoStack force_direction="column">
            {<F node_id = {now_id}/>}
            <Box sx={{marginLeft: "1rem"}}>{
                now_indis_ids.map((son_id , idx)=><React.Fragment key={idx}><S node_id={son_id} indis/></React.Fragment>)
            }</Box>
            <Box sx={{marginLeft: "1rem"}}>{
                now_son_ids  .map((son_id , idx)=><React.Fragment key={idx}><S node_id={son_id}/></React.Fragment>)
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
    TLDR?: string , 
    vis_secret?: boolean 
    vis_indis?: boolean 
}>{
    constructor(props){
        super(props)

        this.state = {
            create_time: undefined , 
            modify_time: undefined , 
            TLDR: undefined , 

            vis_secret: undefined , // 是否不让看
            vis_indis : undefined , // 是否杂陈
        }
    }

    async componentDidMount() {
        let time_info = await Interaction.get.create_time(BackendData.node_id)
        let tldr = await Interaction.get.tldr(BackendData.node_id)
        let visibility = await Interaction.get.visibility(BackendData.node_id)
        this.setState({
            create_time: time_info.create_time , 
            modify_time: time_info.modify_time , 
            TLDR: tldr , 
            vis_secret: visibility.secret , 
            vis_indis : visibility.indiscriminate_provider , 

        })

    }

    render(){
        let me = this
        let title = this.props.root.parameters.title.val

        let ItemBox = (props: {title: string, content: any}) => { 
            let theme = React.useContext(ThemeContext)
            return <Box
                sx = {{marginBottom: "1rem"}}
            >
                <Typography color="text.secondary" sx={{
                    marginRight: theme.printer.margins.colon , 
                    fontSize: "0.5rem" , 
                    display: "inline-block" , 
                }}>{props.title}</Typography>
                <Typography sx={{fontSize: "0.8rem" , display: "inline-block" , whiteSpace: "pre-wrap"}}>{
                    props.content
                }</Typography>
            </Box>
        }
        
        let Vis = <></>
        if(BackendData.logged_in){
            Vis = <Box sx={{textAlign: "left"}}>
                {me.state.vis_secret ? <Chip  label="不让看"  variant="outlined" color="primary" size="small" /> : <></>}
                {me.state.vis_indis  ? <Chip  label="杂陈"    variant="outlined" color="primary" size="small" /> : <></>}
            </Box>
        }

        return <Box>
            {/* <ItemBox title="题目" content={`${title}`} /> */}
            <ItemBox title="创建时间" content={me.state.create_time} />
            <ItemBox title="修改时间" content={me.state.modify_time} />
            {
                me.state.TLDR ? 
                <MathJaxFlusher>
                    <ItemBox title="太长不看" content={me.state.TLDR} /> 
                </MathJaxFlusher>
                : <></>
            }
            {
                BackendData.logged_in ? 
                <ItemBox title="可见性" content={
                    <Box sx={{textAlign: "left"}}>
                        {me.state.vis_secret ? <Chip  label="不让看"  variant="outlined" color="info" size="small" /> : <></>}
                        {me.state.vis_indis  ? <Chip  label="杂陈"    variant="outlined" color="info" size="small" /> : <></>}
                    </Box>
                } /> : <></>
            }
    
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
                
                <Box sx={{textAlign: "right"}}><Chip  label="基本信息"  color="secondary" size="small" /></Box>
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
                <Box sx={{textAlign: "right"}}><Chip  label="其他文章"  color="secondary" size="small" /></Box>

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