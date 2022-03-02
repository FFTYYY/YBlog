import { axios , get_node_id } from "../utils"


var urls = {
    get:{
        content: (nodeid: number)       => `get_node_content/${nodeid}` , 
        nodetree: (nodeid: number)      => `get_nodetree/${nodeid}` , 
        concept: (nodeid: number)       => `get_node_concepts/${nodeid}` , 
        create_time: (nodeid: number)   => `get_node_create_time/${nodeid}` , 
        comments: (nodeid: number)      => `get_node_comments/${nodeid}` , 
    } , 
    post: {
        content: (nodeid: number) => `post_node_content/${nodeid}` , 
        comments: (nodeid: number) => `post_node_comments/${nodeid}` , 
        nodetree: (nodeid: number) => `post_nodetree/${nodeid}` , 
    }
}

async function get_node_information(urlmaker:(nodeid:number) => string , key?: string, node_id?: number){
    if(node_id == undefined)
        node_id = get_node_id()
    
    let data = (await axios.get(urlmaker(node_id))).data
    
    if(key != undefined)
        data = data[key]

    return data
}

async function post_node_information(urlmaker:(nodeid:number) => string, data: any , node_id?: number): Promise<boolean>{
    if(node_id == undefined)
        node_id = get_node_id()

    let status = (await axios.post( urlmaker(node_id) , data)).data.status

	return status
}


var Interaction = {
    get: {
        content     :(nodeid?: number) => get_node_information(urls.get.content     , "content"  , nodeid), 
        nodetree    :(nodeid?: number) => get_node_information(urls.get.nodetree    , "data"     , nodeid), 
        concept     :(nodeid?: number) => get_node_information(urls.get.concept     , "concepts" , nodeid), 
        create_time :(nodeid?: number) => get_node_information(urls.get.create_time , undefined  , nodeid), 
        comments    :(nodeid?: number) => get_node_information(urls.get.comments    , "comments" , nodeid), 
    } , 
    post: {
        content     :(data: any, nodeid?: number) => post_node_information(urls.post.content  , data , nodeid) , 
        nodetree    :(data: any, nodeid?: number) => post_node_information(urls.post.nodetree , data , nodeid) , 
        comments    :(data: any, nodeid?: number) => post_node_information(urls.post.comments , data , nodeid) , 
    }
}

export { Interaction }