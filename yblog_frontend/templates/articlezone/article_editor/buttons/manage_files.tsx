/** 这个模块定义一个查看和管理本项目的文件的按钮。 */

import { 
	Snackbar , SnackbarOrigin , Button , IconButton , Drawer , Paper, Typography, Divider, Box, TextField
} from "@mui/material"
import {
	Save as SaveIcon , 
	FileCopy as FileCopyIcon  , 
	DriveFolderUpload as DriveFolderUploadIcon , 
	DriveFileRenameOutline as DriveFileRenameOutlineIcon  , 
} 
from "@mui/icons-material"

import React from "react"
import {
	AutoStack , 
	AutoTooltip , 
	AutoIconButton , 
} 
from "../../../../lib"
import { Interaction } from "../../base/interaction"
import { FlexibleItem } from "../../base/construction/framework"
import { PostSnackbar } from "../../base/construction/snackbar"

export {FileManageButton}

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
		let resources = ( await Interaction.get.resources() ) as [ id: number , name: string , url: string ][] 
		this.setState({resources: resources})
	}

	async componentDidMount(){
		this.effect()
	}

	// TODO 添加一个删除按钮
	SubCard(props: {id: number , name: string , url: string}){
		let me = this
		let [resource_id,name,url] = [props.id , props.name , props.url]
		let [newname , set_newname] = React.useState(props.name)
		let [rename_open , set_rename_open] = React.useState(false)
		let [upload_open , set_upload_open] = React.useState(false)
		let [rename_status , set_rename_status] = React.useState(false)
		let [upload_status , set_upload_status] = React.useState(false)

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
					defaultValue = {name} 
					fullWidth
					onChange = {(e)=>{set_newname(e.target.value)}}
				/>
				<TextField 
					variant = "standard" 
					label = "url" 
					defaultValue = {url} 
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
						set_rename_status(status)
						set_rename_open(true)
					}}
				/>
				<label>
					<input 
						type = "file"  
						style = {{display: "none"}}
						onChange = {async (e)=>{
							if(e.target.files.length <= 0){
								set_upload_status(false)
							}
							else{
								var form_data = new FormData()
								form_data.append("file" , e.target.files[0])
								let status = await Interaction.post.manage_recourse(true,form_data,resource_id)
								set_upload_status(status)

								if(status){
									me.effect()
								}
							}
							set_upload_open(true)
							
						}}
					/>
					<AutoIconButton 
						title = "替换文件"
						icon = {DriveFolderUploadIcon}
						component = "span"
					/>
				</label>
			</AutoStack></Box>

			<PostSnackbar 
				info_sucess = "修改文件名成功"
				info_fail = "修改文件名失败"
				open = {rename_open}
				status = {rename_status}
				onClose = {()=>{set_rename_open(false)}}
			/>
			
			<PostSnackbar 
				info_sucess = "上传文件成功"
				info_fail = "上传文件失败"
				open = {upload_open}
				status = {upload_status}
				onClose = {()=>{set_upload_open(false)}}
			/>

		</AutoStack></Paper>
	}

	render(){
		let me = this
		return <Box sx={(theme)=>({...theme.printer.typography.body})}><AutoStack force_direction="column">{
			me.state.resources.map((val , idx)=>{
				let [id, name , url] = val
				let SubCard = me.SubCard.bind(me)
				return <React.Fragment key={idx}>
					<SubCard id={id} name={name} url={url}/>
				</React.Fragment>
			})
		}</AutoStack></Box>
	}
	
}

function FileManageButton(props: {}){

	let [drawer_open , set_drawer_open] = React.useState(false)

	return <React.Fragment>
		<FlexibleItem
			close_item = {
				<AutoTooltip title="查看/管理文件"><IconButton size="small">
					<FileCopyIcon fontSize="small" color="primary"/>
				</IconButton></AutoTooltip>
			}
			open_item = {<Button startIcon={<FileCopyIcon/>} color="primary">查看/管理文件</Button>}
			onClick = {()=>{
				set_drawer_open(true)
			}}
			no_button
		/>
		<Drawer
			anchor = "left"
			open = {drawer_open}
			onClose = {()=>set_drawer_open(false)}
			ModalProps={{
				keepMounted: true,
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