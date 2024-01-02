import React from "react"

import {
    Tabs , Tab , Button , IconButton , 
    Box , Divider , Typography , Link , Chip , Paper , Avatar, Popover 
} from "@mui/material"
import {
    ArrowUpward as ArrowUpwardIcon , 
    ArrowDownward as ArrowDownwardIcon , 
    Description as DescriptionIcon , 
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
	TextIcon , 
} from "@ftyyy/ytext"
import { Nodetree } from "../../../../base/nodetree"
import type { raw_info_item } from "../../../../base/nodetree"
import { Interaction , BackendData , urls , url_from_root } from "../../../../base/interaction"
import { TitleWord } from "../../../../base/construction/titleword"
import { MathJaxFlusher } from "../../../../base/construction/math"
import { ButtonBase } from "./base"

export {BasicInfoButton}

function BasicInfoButton(props: {root: AbstractNode}){
    return <ButtonBase button_content={<DescriptionIcon fontSize="small" />} title="基本信息">
        <BasicInformation root={props.root}/>
    </ButtonBase>
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
                <Typography color="text.default" sx={{
                    marginRight: theme.printer.margins.colon , 
                    display: "inline-block" , 
                    ...theme.printer.fonts.structure , 
                    color: theme.my_palette.text.on_secondary , 
                }}>{props.title}</Typography>
                <Typography sx={{
                    ...theme.printer.fonts.structure ,
                    display: "inline-block" , 
                    whiteSpace: "pre-wrap" , 
                    color: theme.my_palette.text.weak_on_secondary , 
                }}>{
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
