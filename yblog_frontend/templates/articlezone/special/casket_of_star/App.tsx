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
	Paper, 
	LinkProps, 
} from "@mui/material"
import {
    TreeItem , TreeView , 
    TreeItemProps, treeItemClasses , 
} from "@mui/lab"
import {
	ExpandMore as ArrowDropDownIcon , 
	ChevronRight as ArrowRightIcon, 
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
import { float2chinese } from "../../base/utils"

let ROOT_ID = 1 // 根节点的编号

let MyTypo = styled(Typography)({
	fontFamily: "Microsoft JhengHei" , 
	marginBottom: "0.2rem" , 
})

let start_time = new Date().getTime()
let end_time   = undefined


// function MyLinkBox(props: {id: number, sx?: LinkProps["sx"]}){
// 	return <Box sx={{
// 		minWidth: "min(15%, 10rem)" , 
// 		textAlign: "center" ,
// 		display: "inline-block" ,  
// 		paddingX: "0.5rem" , 
// 	}}><MyLink {...props}/></Box>
function MyLinkBox(props: {id: number, sx?: LinkProps["sx"]}){
		return <Box><MyLink {...props}/></Box>
	}

function MyLink(props: {id: number, sx?: LinkProps["sx"]}){
	return <Link 
		sx = {{
			color: "inherit", 
			width: "auto", 
			display: "inline-block" , 
			...(props.sx || {})
		}}
		href = {urls.view.content(props.id)} 
	>
		<MyTypo sx={{fontSize: "0.9rem"}}><TitleWord node_id={props.id}/></MyTypo>
	</Link>
}

function MyTreeItem(props: {id?: number, label?: any, children?: any}){

	let my_id = props.id
	let my_label = props.label

    let [ visible   , set_visible   ] = React.useState(true)
    React.useEffect(()=>{(async ()=>{
        let visibility = await Interaction.get.visibility(my_id)
        set_visible(!visibility.secret)
    })()})

	let my_title = <Box sx={{
		marginX: "0.5rem" , 
		marginY: "0.2rem" , 
		width: "95%" , 
		display: "flex" , 
	}}>
		{my_id ? <MyLink id={my_id}/> : <></>}
		{my_label ? <Typography sx={{fontSize: "1rem", fontFamily: "SimHei"}}>
			{my_label}
		</Typography>
 		: <></>}

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
	return <TreeItem nodeId={`${my_id}`} label={my_title}>{props.children || <></>}</TreeItem>
}

function MyTreeItemAutoChildren(props: {my_info: info_item}){
	let my_info = props.my_info

	return <MyTreeItem id={my_info.my_id}>{my_info.sons.map(son_info => {
		return <MyTreeItemAutoChildren my_info={son_info}/>
	})}</MyTreeItem>
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

		let row_divider = <Divider orientation="vertical" variant="inset" flexItem sx={{
			marginX: "0.5rem" , 
			border: "1px dashed" , 
		}}/>
		let tree_root = me.state.nodetree.get_root().sons[0]
		
		let load_time = -1
		if (tree_root != undefined && end_time == undefined){
			end_time = new Date().getTime()
			load_time = (end_time - start_time) / 1000
			load_time = Math.ceil(load_time * 100 + 0.5) / 100
		}

		// TODO 不知道为什么build之后cssbaseline没有生效，需要手动加入背景和前景颜色。
		return <MUIThemeProvider theme={MUICreateTheme(my_theme.mui)}><ThemeProvider value={my_theme}><Box><ScrollBarBox sx={{
			position: "fixed" , 
			top: "2%" , 
			width: "50%" , 
			height: "96%" , 
			left: "25%" , 
			backgroundColor: "rgba(0,0,0,0)", 
			color: "text.primary" , 
			
			overflow: "auto" , 
		}}
		><CssBaseline />

			<MyTypo sx={{fontSize: "3rem"}}>星之器</MyTypo>
			
            <MyTypo sx={{fontSize: "1rem"}}>
				{"你在路边偶然捡到了一棵树，树根上写着几个大字『星之器』和几行小字。"}
				{"再仔细看看，你发现这棵树的每个节点上都写了一些文字。这些文本一定是种下这棵树的人写的吧。"}
			</MyTypo>
			<Box sx={{
				marginTop: "2.5rem" , 
				display: "flex" , 
				flexDirection: "row" , 
			}}>
				<Box sx={{
					borderRight: tree_root ? "1px dotted #999999" : 0 ,  
					paddingRight: "1rem" , 
				}}>
					<MyTypo sx={{fontSize: "1rem"}}>
						{"在树根『星之器』上，还列了一个目录，似乎写着树的主人自己比较喜欢的节点。"}
					</MyTypo>

					<Typography sx={{fontSize: "1rem", fontFamily: "SimHei", marginTop: "1rem" , marginBottom: "0.2rem"}}>
						{"数学笔记"}
					</Typography>
					<Box sx={{
						marginLeft: "2rem" , 
						// display: "flex" , 
						// flexDirection: "row" , 
						// flexWrap: "wrap", 
					}}>
						<MyLinkBox id={1188} />
						<MyLinkBox id={1231} />
						<MyLinkBox id={1078} />
						<MyLinkBox id={1136} />
						<MyLinkBox id={1321} />
						<MyLinkBox id={1362} />
						<MyLinkBox id={1293} />
						<MyLinkBox id={1125} />
						<MyLinkBox id={1061} />
						<MyLinkBox id={1177} />
						<MyLinkBox id={1307} />
						<MyLinkBox id={1305} />
						<MyLinkBox id={1409} />
						<MyLinkBox id={1288} />
						<MyLinkBox id={891} />
						<MyLinkBox id={818} />
						<MyLinkBox id={1231} />
						<MyLinkBox id={1078} />
						<MyLinkBox id={1136} />
						<MyLinkBox id={1321} />
						<MyLinkBox id={1362} />
						<MyLinkBox id={1293} />
						<MyLinkBox id={1125} />
						<MyLinkBox id={1061} />
						<MyLinkBox id={1177} />
						<MyLinkBox id={1307} />
						<MyLinkBox id={1305} />
						<MyLinkBox id={1409} />
						<MyLinkBox id={1288} />
						<MyLinkBox id={891} />
						<MyLinkBox id={818} />
					</Box>


					<Typography sx={{fontSize: "1rem", fontFamily: "SimHei", marginTop: "1rem" , marginBottom: "0.2rem"}}>
						{"古代文学札记"}
					</Typography>
					<Box sx={{marginLeft: "2rem"}}><MyLink id={219}></MyLink></Box>
					<Box sx={{marginLeft: "2rem"}}>
						<Box sx={{marginLeft: "2rem"}}><MyLink id={310}></MyLink></Box>
						<Box sx={{marginLeft: "2rem"}}><MyLink id={340}></MyLink></Box>
						<Box sx={{marginLeft: "2rem"}}><MyLink id={1004}></MyLink></Box>
						<Box sx={{marginLeft: "2rem"}}><MyLink id={369}></MyLink></Box>
						<Box sx={{marginLeft: "2rem"}}><MyLink id={263}></MyLink></Box>
						<Box sx={{marginLeft: "2rem"}}><MyLink id={255}></MyLink></Box>
						<Box sx={{marginLeft: "2rem"}}><MyLink id={863}></MyLink></Box>
						<Box sx={{marginLeft: "2rem"}}><MyLink id={385}></MyLink></Box>
						<Box sx={{marginLeft: "2rem"}}><MyLink id={274}></MyLink></Box>
						<Box sx={{marginLeft: "2rem"}}><MyLink id={287}></MyLink></Box>
						<Box sx={{marginLeft: "2rem"}}><MyLink id={298}></MyLink></Box>
					</Box>
					<Box sx={{marginLeft: "2rem"}}><MyLink id={871}></MyLink></Box>
					<Box sx={{marginLeft: "2rem"}}><MyLink id={1021}></MyLink></Box>
				</Box>

				{tree_root == undefined  ? <Box></Box> :<Box sx={{
					marginLeft: "1rem" , 
				}}>
					
					{/* <Box sx={{
						marginTop: "2rem" , 
						minWidth: "30%" , 
						paddingRight: "1rem", 
						// borderBottom: "1px solid black" , 
						display: "inline-block" , 
					}}>
						<Typography sx={{
							fontFamily: "Heiti" , 
						}}>目录</Typography>
					</Box> */}
					{/* <Divider variant = "middle" sx={{marginTop: "2rem", marginBottom: "1rem", visibility: "hidden"} } light ></Divider> */}
					<MyTypo sx={{fontSize: "1rem"}}>
						{`你花了${float2chinese(load_time)}秒仔细考察了这棵树，发现这棵树的所有节点组成了如下的结构。`}
					</MyTypo>
					<Box sx={{
						width: "90%" , 
						overflow: "auto" ,  
						marginY: "1rem" ,
					}}>
						<TreeView 
							defaultCollapseIcon = {<ArrowDropDownIcon fontSize="large"/>}
							defaultExpandIcon = {<ArrowRightIcon fontSize="large"/>}
							defaultExpanded = {[`${ROOT_ID}`]}
						>
							<MyTreeItemAutoChildren my_info = { tree_root }></MyTreeItemAutoChildren>

						</TreeView>
					</Box>
				</Box>}
			</Box>
			{tree_root == undefined ? <Box></Box> :<Box>
				<br />
				<MyTypo sx={{fontSize: "1rem"}}>
					{"在树根『星之器』的结尾，还写着几句诗，好像摘自一首晋代的乐府。想必这棵树的主人一定很喜欢这首诗吧。"}
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
			</Box>}

		</ScrollBarBox></Box></ThemeProvider></MUIThemeProvider>
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