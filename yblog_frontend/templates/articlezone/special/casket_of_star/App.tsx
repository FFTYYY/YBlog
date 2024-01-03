import React , { useState } from "react"

import {
	Printer , 
	GroupNode , 
	AbstractNode , 
	PrinterStructureBoxText , 
	GlobalInfoProvider , 
	DefaultPrinterComponent , 
	EditorCore , 
	PrinterCache , 
	ScrollBarBox , 

	ThemeContext , 
	ThemeProvider , 

	KeyEventManager, 
	AutoStack, 
	AutoTooltip , 
	TextIcon , 
} from "@ftyyy/ytext"


import { 
	createTheme as MUICreateTheme, 
	ThemeProvider as MUIThemeProvider ,  
} from "@mui/material/styles"

import "overlayscrollbars/overlayscrollbars.css"
import { OverlayScrollbars } from "overlayscrollbars"
import {
	Box , 
	CssBaseline,
	SvgIcon , 
	Divider , 
	AppBar, 
	Typography,
	styled, 
	Link , 
} from "@mui/material"
import {
    TreeItem , TreeView , 
    TreeItemProps, treeItemClasses , 
} from "@mui/lab"
import {
	ExpandMore as ArrowDropDownIcon , 
	ChevronRight as ArrowRightIcon , 
} from "@mui/icons-material"

import { TitleWord, my_theme } from "../../base/construction"
import { Interaction , BackendData, urls } from "../../base/interaction"
import { MathJaxContext , MathJaxInline , MathJaxBlock } from "../../base/construction"
import { renderers , default_renderers } from "../../base/concept"
import { parse_second_concepts } from "../../base/utils"
import { first_concepts } from "../../base/concept"
import { LeftBox, RightBox, TopBox } from "../../article_viewer/cards"
import { flush_math , MathJaxFlusher } from "../../base/construction/math"
import { LiuBian } from "../../assets"
import { MakeAbstract } from "../../base/concept/printers/abstract"
import { Nodetree } from "../../base/nodetree"
import type { info_item , raw_info_item } from "../../base/nodetree"

let ROOT_ID = 1 // 根节点的编号

let MyTypo = styled(Typography)({
	fontFamily: "Microsoft JhengHei" , 
	marginBottom: "0.2rem" , 
})

function MyTreeItem(props: {my_info: info_item}){

	let my_info = props.my_info

    let [ visible   , set_visible   ] = React.useState(true)
    React.useEffect(()=>{(async ()=>{
        let visibility = await Interaction.get.visibility(my_info.my_id)
        set_visible(!visibility.secret)
    })()})

	let my_title = <Box sx={{
		marginX: "0.5rem" , 
		marginY: "0.2rem" , 
		width: "95%" , 
		display: "flex" , 
	}}>
		<Link 
			sx = {{color: "inherit", width: "auto", display: "inline-block"}}
			href = {urls.view.content(my_info.my_id)} 
		>
			<MyTypo sx={{fontSize: "0.9rem"}}><TitleWord node_id={my_info.my_id}/></MyTypo>
		</Link>

		{visible ? <></> :
			<Box sx={{
				display: "inline-block", 
				marginLeft: "auto" , 
				right: 0,               
				paddingLeft: "0.4rem" , 
				
			}}>
				<AutoTooltip title="不让看"><Box>
					<TextIcon text="隐" fontSize="0.7rem" color="inherit"/>
				</Box></AutoTooltip>
			</ Box>
		}

	</Box>
	return <TreeItem nodeId={`${my_info.my_id}`} label={my_title}>{my_info.sons.map(son_info => {
		return <MyTreeItem my_info={son_info}/>
	})}</TreeItem>
}


interface App_State{

    /** 节点树。
    */
    nodetree: Nodetree

    /** 已经展开的节点，这是 mui TreeView 需要的状态。 */
    expanded: (string | number) [] 


	root_sons: number []
}

class App extends  React.Component<{} , App_State>{

	constructor(props: {}){
		super(props)
		
        this.state = {
            nodetree: new Nodetree([]) , 
            expanded: [] , 

            root_sons: [] , 
        }
	}

	async componentDidMount(){
		let me = this
		let raw_nodetree = await Interaction.get.nodetree(ROOT_ID) as raw_info_item[]
		this.setState( {
            nodetree: me.state.nodetree.update_rawinfo(raw_nodetree , ROOT_ID) , 
            expanded: Object.values(raw_nodetree).map( (val:raw_info_item)=>val[1] )
        } )
	}

	render(){
		let me = this


		let whitespace = <div style={{width:"1rem", display: "inline-block"}}></div>
		let starter = <LiuBian 
			style={{height: "0.7rem"}} 
			fill="#336688AA"
			strokeWidth="6px" 
			strokeColor="rgba(0,0,0,0.7)"
		/>
		let abstract_example_subcomp = <Box sx={{marginX: "0.3rem" , marginY: "0.2rem"}}><Typography sx={{
			fontFamily: "Dengxian"
		}}>
			就像这样。
			<br />
			话说为啥要叫穆言啊，这名字好怪。有没有更合适的叫法呢...
		</Typography></Box>
		let tree_root = me.state.nodetree.get_root().sons[0]

		// TODO 不知道为什么build之后cssbaseline没有生效，需要手动加入背景和前景颜色。
		return <MUIThemeProvider theme={MUICreateTheme(my_theme.mui)}><ThemeProvider value={my_theme}><Box sx={{
			position: "fixed" , 
			top: "2%" , 
			width: "50%" , 
			height: "96%" , 
			left: "25%" , 
			backgroundColor: "rgba(0,0,0,0)", 
			color: "text.primary" , 
		}}
		><CssBaseline />

			<MyTypo sx={{fontSize: "3rem"}}>星之器</MyTypo>
			
            <MyTypo sx={{fontSize: "1rem"}}>
				{"你在路边偶然捡到了一棵树，树根上写着几个大字『星之器』和几行小字。"}
				{"再仔细看看，你发现每个节点上都写了一些文字，这使得每个节点都是独特的。"}
				{tree_root == undefined ? "" : "并且，这些节点是如下排列的。"}
			</MyTypo>

			{tree_root == undefined ? <></> :<>
				<ScrollBarBox sx={{
					width: "min( max(30%, 20rem) , 50%)" , 
					maxHeight: "calc(100% - 18rem)" ,
					overflow: "auto" ,  
					marginY: "0.5rem" ,
					marginX: "auto" , 
				}}>
					<TreeView 
						defaultCollapseIcon = {<ArrowDropDownIcon fontSize="large"/>}
						defaultExpandIcon = {<ArrowRightIcon fontSize="large"/>}
						defaultExpanded = {[`${ROOT_ID}`]}
					>
						<MyTreeItem my_info = { tree_root }></MyTreeItem>

					</TreeView>
				</ScrollBarBox>
			</>}
            <MyTypo sx={{fontSize: "1rem"}}>
				{"在树根『星之器』的结尾，还写着几句诗，好像摘自一首晋代的乐府。想必种这棵树的人很喜欢这首诗吧。"}
			</MyTypo>
			<Box sx={{
				marginY: "0.5rem" , 
				marginLeft: "2rem" , 
				textAlign: "center" , 
			}}>
				<MyTypo sx={{
					fontFamily: "Kaiti" , 
					fontSize: "1.1rem" , 
				}}>荠与麦兮夏零，兰桂践霜逾馨。禄命悬天难明，妾心结意丹青，何忧君心中倾。</MyTypo>
			</Box>

		</Box></ThemeProvider></MUIThemeProvider>
	}
}

export default App


/**
 * 
 * 			<Box sx={{
				marginLeft: "2rem" , 
			}}>
				<MyTypo sx={{fontSize: "0.9rem" }}>{starter}{whitespace}
					{"每个节点都是唯一的根节点的后代。如果一个节点有子节点，那么这个节点就被称为『集』，否则称为『章』。"}
				</MyTypo>

				<MyTypo sx={{fontSize: "0.9rem"}}>{starter}{whitespace}
					{"有些文本上加注了一些注释文本。"}
					<MakeAbstract subcomp={abstract_example_subcomp}>
						{"这样的文本称为一个『穆言』"}
					</MakeAbstract>
					{"。只需要把鼠标移动到绿色小三角形上或者点击就可以看到了。"}
				</MyTypo>

				<MyTypo sx={{fontSize: "0.9rem"}}>{starter}{whitespace}
					{"还有一些特殊的节点类型。"}
					{"但是我懒得写了，所以就这样吧。"}
				</MyTypo>
			</Box>

 */