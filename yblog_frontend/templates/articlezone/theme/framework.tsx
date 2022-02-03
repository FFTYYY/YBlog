import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export {FlexibleItem , FlexibleDrawer}

/** 用来提供伸缩元素是否展开的上下文。 */
const FlexibleOpen_Context = React.createContext(false)
FlexibleOpen_Context.displayName = "flexible_drawer_open"


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
        return <Paper>
            <FlexibleOpen_Context.Provider value={me.state.open}>
                <Stack>
                    <FlexibleItem
                        close_item = {">"}
                        open_item  = {"<"}
                        onClick = {(e:any)=>{me.setState({open:!me.state.open})}}
                    />
                    {me.props.children}
                </Stack>
            </FlexibleOpen_Context.Provider>
        </Paper>
    }
}


