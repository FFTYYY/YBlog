import { axios , get_node_id } from "."

export {get_node_information , post_node_information}

async function get_node_information(url:string , key?: string, node_id?: number){
    if(node_id == undefined)
        node_id = get_node_id()
    
    let data = (await axios.get(`/${url}/${node_id}`)).data
    
    if(key != undefined)
        data = data[key]

    return data
}

async function post_node_information(url:string, data: any , node_id?: number){
    if(node_id == undefined)
        node_id = get_node_id()

    let status = (await axios.post( `/${url}/${node_id}` , data)).data.status

	return status
}