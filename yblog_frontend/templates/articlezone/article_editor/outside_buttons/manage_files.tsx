/** 这个模块定义一个查看和管理本项目的文件的按钮。 */

import { 
	Snackbar , SnackbarOrigin , Button , IconButton , Drawer , Paper, Typography, Divider, Box, TextField , Popover
} from "@mui/material"
import {
	Save as SaveIcon , 
	FileCopy as FileCopyIcon  , 
	DriveFolderUpload as DriveFolderUploadIcon , 
	DriveFileRenameOutline as DriveFileRenameOutlineIcon  , 
	Close as CloseIcon , 
} 
from "@mui/icons-material"

import React, { useEffect } from "react"
import {
	AutoStack , 
	AutoTooltip , 
	AutoIconButton , 
} 
from "../../../../ytext"
import { BackendData, Interaction } from "../../base/interaction"
import { useSnackbar  } from "notistack"

export {FileManageButton, UploadFileButton}

function UploadFileButton(){
	return <Box sx={{marginX: "auto"}}><label>
		<input 
			type = "file"  
			style = {{
				display: "none" , 
			}}
			onChange = {(e)=>{
				if(e.target.files.length > 0){
					var form_data = new FormData()
					form_data.append("file" , e.target.files[0])
					Interaction.post.file(form_data , BackendData.node_id)
				}
			}}
		/>
		
		<AutoIconButton 
			title = "上传"
			icon = {DriveFolderUploadIcon}
			component = "span"
			size = "small"
			icon_props = {{
				sx: {
					marginLeft: "-0.1rem" , 
					color: "#b5dfff" ,  // 这就是primary，但是他会把theme理解成ytext的默认theme，不知道为啥...
				}
			}}
		/>
	</label></Box>
}

/**
 * 这个组件提供一个删除文件的按钮，在删除时会有一个弹出框进行二次询问。
 * @param props.resource_id 资源的`id`。
 * @param props.onSuccess 删除成功的回调。
 */
function DeleteFileButton(props: {resource_id: number , onSuccess?: ()=>void}){
	let [ pop_anchor , set_pop_anchor ] = React.useState<HTMLButtonElement | undefined>(undefined)

	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	return <React.Fragment>
		<AutoIconButton 
			title = "删除资源"
			icon = {CloseIcon}
			onClick = {async (e)=>{
				set_pop_anchor(e.currentTarget)
			}}
		/>
		<Popover
			anchorEl = {pop_anchor}
			open = {!!pop_anchor}
			onClose = {e=>set_pop_anchor(undefined)}
			anchorOrigin = {{
				vertical: "center" , 
				horizontal: "right" , 
			}}
		>
			<Button
				onClick = {async (e)=>{
					let status = await Interaction.post.delete_resource(props.resource_id)
					enqueueSnackbar(status ? "删除成功" : "删除失败")
					set_pop_anchor(undefined)

					if(status && props.onSuccess){
						props.onSuccess()
					}
				}}
			>确定？</Button>
		</Popover>
	</React.Fragment>
}

function SubCard(props: {id: number , name: string , url: string , onSuccess?: ()=>void}){
	let [resource_id,name,url] = [props.id , props.name , props.url]
	let [newname , set_newname] = React.useState(name)

	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	useEffect(()=>{ // 当`props`更新的时候，`state`也要跟着更新。
		set_newname(name)
	} , [name])

	let onSuccess = props.onSuccess || (()=>{})

	return <Paper variant="outlined" sx={{
		position: "relative" , 
		marginTop: "1rem" , 
		marginX: "1rem" , 
		marginBottom: "1rem" ,
		paddingY: "0.7rem" , 
	}}><AutoStack force_direction="row">
		<Box sx={{flex: 1}}><AutoStack>
			<TextField 
				variant = "standard" 
				label = "name" 
				value = {newname} 
				fullWidth
				onChange = {(e)=>{set_newname(e.target.value)}}
			/>
			<TextField 
				variant = "standard" 
				label = "url" 
				value = {url} 
				fullWidth 
				sx = {{marginTop: "1rem"}}
				InputProps = {{
					readOnly: true,
				}}
			/>
		</AutoStack></Box>
		<Box><AutoStack>
			{/* 我觉得不需要显示id吧大概 */}
			{/* <Typography>ID: {resource_id}</Typography> */}
			<AutoIconButton 
				title = "更改资源名"
				icon = {DriveFileRenameOutlineIcon}
				onClick = {async (e)=>{
					let data = {name: newname}
					let status = await Interaction.post.manage_recourse(false, data, resource_id)
					enqueueSnackbar(status ? "修改文件名成功": "修改文件名失败")
				}}
			/>

			<label>
				<input 
					type = "file"  
					style = {{display: "none"}}
					onChange = {async (e)=>{
						let flag = false
						if(e.target.files.length <= 0){
							flag = false
						}
						else{
							var form_data = new FormData()
							form_data.append("file" , e.target.files[0])
							let status = await Interaction.post.manage_recourse(true,form_data,resource_id)
							flag = status

							if(status){
								onSuccess()
							}
						}
						enqueueSnackbar(flag ? "上传文件成功": "上传文件失败")
						
					}}
				/>
				<AutoIconButton 
					title = "替换文件"
					icon = {DriveFolderUploadIcon}
					component = "span"
				/>
			</label>
			<DeleteFileButton resource_id={resource_id} onSuccess = {onSuccess}/>
		</AutoStack></Box>
		
	</AutoStack></Paper>
}


class FileManager extends React.Component<{} , {
	resources: [id: number , name: string , url: string][]
}>{
	constructor(props){
		super(props)

		this.state = {
			resources: []
		}
	}

	async effect(){
		let resources = ( await Interaction.get.resources(BackendData.node_id) ) as [ id: number , name: string , url: string ][] 
		this.setState({resources: resources})
		this.forceUpdate()
	}

	async componentDidMount(){
		this.effect()
	}

	render(){
		let me = this
		return <Box sx={(theme)=>({...theme.fonts.body})}><AutoStack force_direction="column">{
			me.state.resources.map((val , idx)=>{
				let [id, name , url] = val
				return <React.Fragment key={idx}>
					<SubCard id={id} name={name} url={url} onSuccess={()=>{me.effect()}}/>
				</React.Fragment>
			})
		}</AutoStack></Box>
	}
	
}

function FileManageButton(props: {}){

	let [drawer_open , set_drawer_open] = React.useState(false)

	return <React.Fragment>
		<AutoTooltip title="查看/管理文件"><IconButton size="small" onClick = {()=>{
				set_drawer_open(true)
			}}>
			<FileCopyIcon fontSize="small" color="primary" />
		</IconButton></AutoTooltip>
		<Drawer
			anchor = "left"
			open = {drawer_open}
			onClose = {()=>set_drawer_open(false)}
			ModalProps={{
				keepMounted: false,
			}}
			SlideProps = {{
				onExited: () => {
					
				}
			}}
			PaperProps  = {{sx: { width: "40%" }}}
	
		>
			<FileManager />
		</Drawer>

	</React.Fragment>
}