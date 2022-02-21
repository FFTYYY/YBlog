import * as React from "react"
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles"
import {
    AutoStack , 
    AutoTooltip , 
} 
from "../../../lib"

import {
    Box , 
    Button , 
    IconButton , 
} from "@mui/material"
import {
    Save as SaveIcon , 
	ChevronRightRounded as ChevronRightIcon , 
	ChevronLeftRounded as ChevronLeftIcon , 
	Add as AddIcon , 
} 
from "@mui/icons-material"

export {FlexibleItem , FlexibleDrawer}

/** 用来提供伸缩元素是否展开的上下文。 */
const FlexibleOpen_Context = React.createContext(false)


/** 这个组件提供一个可伸缩的元素，这个元素根据上下文提供的是否展开信息可以渲染两种不同的组件。
 * @param props.close_item 未展开时候渲染的组件。
 * @param props.open_item 展开时候渲染的组件
 * @param props.no_button 如果为 false ，就在组件外面套一层 Button 。默认为 false 。
 */
function FlexibleItem(props: {close_item: any, open_item: any, no_button?: boolean, onClick?: (e:any)=>any} & any){
    let no_button = props.no_button || false
    // let Comp = (props: any) => no_button ? <Box {...props}></Box> : <Button {...props}></Button>
    let Comp = ( no_button ? Box : Button ) as typeof Button

    let props_other = {...props , ...{close_item: undefined, open_item: undefined , no_button:undefined}}
    return <FlexibleOpen_Context.Consumer>{(
        (is_open:boolean) => {
            return <Comp {...props_other}>{is_open ? props.open_item : props.close_item }</Comp>
        }
    )}</FlexibleOpen_Context.Consumer>
}

interface FlexibleDrawer_Props{
    sx?: any
}

interface FlexibleDrawer_State{
    open: boolean
}

/** 这个组件提供一个可伸缩的抽屉。当抽屉闭合时不会完全消失而是留下一条『缩略表示』。
 * 这个抽屉的每个元素需要以 FlexibleItem 来提供。
 * 和一般的抽屉不同，这个抽屉自己提供元素来控制开闭，无需外部控制。
 */
class FlexibleDrawer extends React.Component<FlexibleDrawer_Props , FlexibleDrawer_State>{
    constructor(props: FlexibleDrawer_Props){
        super(props)

        this.state = {
            open: false
        }
    }

    render(){
        let me = this

        return <Box 
                sx = {{
                    ...me.props.sx , 
                }}
            >
            <FlexibleOpen_Context.Provider value={me.state.open}>
                <AutoStack force_direction="column">
                    <FlexibleItem
                        close_item = {
                            <AutoTooltip title="展开"><IconButton size="small">
                                <ChevronRightIcon fontSize="small" color="primary"/>
                            </IconButton></AutoTooltip>
                        }
                        open_item = {<Button startIcon={<ChevronLeftIcon/>} color="primary">收敛</Button>}
                        onClick = {()=>{me.setState({open:!me.state.open})}}
                        no_button
                    />
                    {me.props.children}
                </AutoStack>
            </FlexibleOpen_Context.Provider>
        </Box>
    }
}


